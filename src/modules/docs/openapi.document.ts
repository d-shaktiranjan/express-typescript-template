export const openApiDocument = {
    openapi: "3.1.0",
    info: {
        title: "Express API",
        version: "0.0.1",
        description:
            "Interactive API documentation for this Express template. [View changelogs and guides](/docs/changelog).",
    },
    servers: [{ url: "/" }],
    tags: [{ name: "System", description: "Application metadata" }],
    paths: {
        "/": {
            get: {
                tags: ["System"],
                operationId: "getApiMetadata",
                summary: "Get API metadata",
                description:
                    "Returns package, environment, Git, and optional build metadata directly as a JSON object.",
                responses: {
                    "200": {
                        description: "API metadata",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        name: { type: "string" },
                                        version: { type: "string" },
                                        description: { type: "string" },
                                        license: { type: "string" },
                                        tag: { type: "string" },
                                        host: { type: "string" },
                                        runningBranch: { type: "string" },
                                        commitHash: { type: "string" },
                                        buildId: { type: "string" },
                                        lastUpdated: {
                                            type: "string",
                                            format: "date-time",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
} as const;
