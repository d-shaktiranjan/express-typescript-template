import express from "express";
import {
    mkdtempSync,
    mkdirSync,
    readFileSync,
    rmSync,
    symlinkSync,
    writeFileSync,
} from "fs";
import { tmpdir } from "os";
import path from "path";
import request from "supertest";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { createDocsRouter } from "@/modules/docs/docs.route";
import { copyDocsAssets } from "@/modules/docs/docs.utils";

let directory: string;
let app: express.Express;

beforeEach(() => {
    directory = mkdtempSync(path.join(tmpdir(), "template-docs-"));
    app = express();
    app.use("/docs", createDocsRouter(directory));
});
afterEach(() => rmSync(directory, { recursive: true, force: true }));

const documentName = "CHANGELOG.feature-test.md";
const markdown = "# Example changelog\n\n- Added an endpoint.\n";

describe("API documentation", () => {
    it("serves Swagger UI and its assets", async () => {
        const redirect = await request(app).get("/docs").expect(301);
        expect(redirect.headers.location).toBe("/docs/");
        const response = await request(app).get("/docs/").expect(200);
        expect(response.text).toContain("Express API Docs");
        expect(response.text).toContain("swagger-ui");
        await request(app)
            .get("/docs/swagger-ui.css")
            .expect("Content-Type", /css/)
            .expect(200);
        await request(app)
            .get("/docs/swagger-ui-bundle.js")
            .expect("Content-Type", /javascript/)
            .expect(200);
    });

    it("serves the raw OpenAPI document", async () => {
        const response = await request(app)
            .get("/docs/openapi.json")
            .expect("Content-Type", /json/)
            .expect(200);
        expect(response.body.openapi).toBe("3.1.0");
        expect(response.body.paths["/"].get.operationId).toBe("getApiMetadata");
        expect(response.body).not.toHaveProperty("isSuccess");
        expect(JSON.stringify(response.body)).not.toContain("Juuno");
    });

    it("lists supported documents with escaped filenames", async () => {
        const escapedName = "DOCUMENT.<img onerror=alert(1)>.md";
        for (const name of [
            documentName,
            "DOCUMENT.guide.md",
            "MIGRATION.example.md",
            escapedName,
            "README.md",
        ]) {
            writeFileSync(path.join(directory, name), markdown);
        }
        mkdirSync(path.join(directory, "CHANGELOG.directory.md"));
        const response = await request(app).get("/docs/changelog").expect(200);
        expect(response.text).toContain(documentName);
        expect(response.text).toContain("DOCUMENT.guide.md");
        expect(response.text).toContain("MIGRATION.example.md");
        expect(response.text).toContain("&lt;img onerror=alert(1)&gt;");
        expect(response.text).not.toContain("<img onerror");
        expect(response.text).not.toContain("README.md");
        expect(response.text).not.toContain("CHANGELOG.directory.md");
        expect(response.text).toContain(`/docs/changelog/${documentName}`);
    });

    it("shows an empty state when no documents exist", async () => {
        const response = await request(app).get("/docs/changelog/").expect(200);
        expect(response.text).toContain("No documentation files found.");
    });

    it("shows an empty state if the docs directory is absent", async () => {
        rmSync(directory, { recursive: true });
        const response = await request(app).get("/docs/changelog").expect(200);
        expect(response.text).toContain("No documentation files found.");
    });

    it("serves document preview and the raw Markdown", async () => {
        writeFileSync(path.join(directory, documentName), markdown);
        const preview = await request(app)
            .get(`/docs/changelog/${documentName}/`)
            .expect("Content-Type", /html/)
            .expect(200);
        expect(preview.text).toContain("/docs/changelog/preview-assets/app.js");
        expect(preview.text).toContain("Copy Raw");
        expect(preview.text).toContain("Download Raw");
        expect(preview.text).not.toContain("cdn.jsdelivr.net");
        const raw = await request(app)
            .get(`/docs/changelog/${documentName}/raw`)
            .expect("Content-Type", /text\/plain/)
            .expect(200);
        expect(raw.text).toBe(markdown);
        expect(raw.headers["x-content-type-options"]).toBe("nosniff");
    });

    it.each([
        "missing.md",
        "COC.md",
        "%2e%2e%2fpackage.json",
        "CHANGELOG.link.md",
    ])("rejects unlisted or unsafe file %s", async (name) => {
        writeFileSync(path.join(directory, "COC.md"), "Private");
        symlinkSync(
            path.join(directory, "COC.md"),
            path.join(directory, "CHANGELOG.link.md"),
        );
        for (const suffix of ["", "/raw"]) {
            const response = await request(app)
                .get(`/docs/changelog/${name}${suffix}`)
                .expect(404);
            expect(response.body).toMatchObject({
                isSuccess: false,
                message: "Document not found.",
            });
        }
    });

    it.each(["app.js", "style.css", "marked.js", "purify.js"])(
        "serves local preview asset %s",
        async (name) => {
            const response = await request(app)
                .get(`/docs/changelog/preview-assets/${name}`)
                .expect(200);
            expect(response.text.length).toBeGreaterThan(100);
        },
    );

    it("returns a standard error for missing assets", async () => {
        const response = await request(app)
            .get("/docs/changelog/preview-assets/missing.js")
            .expect(404);
        expect(response.body.isSuccess).toBe(false);
    });

    it("copies all documentation assets for production", () => {
        const source = path.resolve("src/modules/docs");
        const destination = path.join(directory, "dist/modules/docs");
        copyDocsAssets(source, destination);
        for (const name of [
            "changelog.html",
            "markdown-preview/index.html",
            "markdown-preview/app.js",
            "markdown-preview/style.css",
        ]) {
            expect(readFileSync(path.join(destination, name), "utf8")).toBe(
                readFileSync(path.join(source, name), "utf8"),
            );
        }
    });
});
