import type { Request, Response } from "express";
import { readFile } from "fs/promises";
import path from "path";

import { errorResponse } from "@/core/utils/apiResponse.utils";
import {
    DOCS_ASSETS_DIRECTORY,
    MARKDOWN_PREVIEW_DIRECTORY,
} from "./docs.config";
import { getDocumentFiles } from "./docs.service";
import { escapeHtml } from "./docs.utils";
import { openApiDocument } from "./openapi.document";

export const getOpenApiDocument = (_req: Request, res: Response): void => {
    res.type("application/json").send(JSON.stringify(openApiDocument));
};

export const createDocsController = (directory: string) => ({
    getChangelog: async (_req: Request, res: Response): Promise<void> => {
        const [files, template] = await Promise.all([
            getDocumentFiles(directory),
            readFile(
                path.join(DOCS_ASSETS_DIRECTORY, "changelog.html"),
                "utf8",
            ),
        ]);
        const items = files.length
            ? files
                  .map((fileName) => {
                      const type = escapeHtml(
                          fileName.slice(0, fileName.indexOf(".")),
                      );
                      return `<li class="document-item" data-document-type="${type}"><a class="document-link" href="/docs/changelog/${encodeURIComponent(fileName)}"><span class="document-badge" data-document-type="${type}">${type}</span><span>${escapeHtml(fileName)}</span></a></li>`;
                  })
                  .join("")
            : '<li class="empty-state">No documentation files found.</li>';
        res.type("html").send(
            template.replace("{{DOCUMENT_ITEMS}}", () => items),
        );
    },
    getDocument: async (req: Request, res: Response): Promise<void> => {
        const files = await getDocumentFiles(directory);
        const fileName = req.params.fileName;
        if (typeof fileName !== "string" || !files.includes(fileName)) {
            errorResponse(res, "Document not found.", { statusCode: 404 });
            return;
        }
        res.sendFile("index.html", { root: MARKDOWN_PREVIEW_DIRECTORY });
    },
    getRawDocument: async (req: Request, res: Response): Promise<void> => {
        const files = await getDocumentFiles(directory);
        const fileName = req.params.fileName;
        if (typeof fileName !== "string" || !files.includes(fileName)) {
            errorResponse(res, "Document not found.", { statusCode: 404 });
            return;
        }
        res.set("X-Content-Type-Options", "nosniff")
            .type("text/plain")
            .sendFile(fileName, { root: directory });
    },
});
