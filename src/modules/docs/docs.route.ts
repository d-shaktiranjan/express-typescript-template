import { Router, static as static_ } from "express";
import type { NextFunction, Request, Response } from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";

import { errorResponse } from "@/core/utils/apiResponse.utils";
import { DOCS_DIRECTORY, MARKDOWN_PREVIEW_DIRECTORY } from "./docs.config";
import { createDocsController, getOpenApiDocument } from "./docs.controller";
import { openApiDocument } from "./openapi.document";

export const createDocsRouter = (directory = DOCS_DIRECTORY): Router => {
    const router = Router();
    const controller = createDocsController(directory);

    router.get("/openapi.json", getOpenApiDocument);
    router.get("/changelog/preview-assets/marked.js", (_req, res) => {
        res.sendFile("marked.umd.js", {
            root: path.dirname(require.resolve("marked")),
        });
    });
    router.get("/changelog/preview-assets/purify.js", (_req, res) => {
        res.sendFile("purify.min.js", {
            root: path.dirname(require.resolve("dompurify")),
        });
    });
    router.use(
        "/changelog/preview-assets",
        static_(MARKDOWN_PREVIEW_DIRECTORY, {
            index: false,
            fallthrough: false,
        }),
    );
    router.get("/changelog", controller.getChangelog);
    router.get("/changelog/:fileName/raw", controller.getRawDocument);
    router.get("/changelog/:fileName", controller.getDocument);
    router.use(
        "/",
        swaggerUi.serve,
        swaggerUi.setup(openApiDocument, {
            customSiteTitle: "Express API Docs",
            swaggerOptions: {
                deepLinking: true,
                displayRequestDuration: true,
                filter: true,
                requestSnippetsEnabled: true,
                tryItOutEnabled: true,
            },
        }),
    );
    router.use(
        (
            error: Error & { status?: number },
            _req: Request,
            res: Response,
            next: NextFunction,
        ) => {
            if (res.headersSent) {
                next(error);
                return;
            }
            errorResponse(
                res,
                error.status === 404
                    ? "Document not found."
                    : "Unable to load documentation.",
                { statusCode: error.status === 404 ? 404 : 500 },
            );
        },
    );
    return router;
};

export default createDocsRouter();
