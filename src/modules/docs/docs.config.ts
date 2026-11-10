import path from "path";

export const DOCS_DIRECTORY = path.resolve("docs");
export const DOCS_ASSETS_DIRECTORY = __dirname;
export const MARKDOWN_PREVIEW_DIRECTORY = path.join(
    DOCS_ASSETS_DIRECTORY,
    "markdown-preview",
);
export const DOCUMENT_FILE_PATTERN = /^(CHANGELOG|DOCUMENT|MIGRATION)\..+\.md$/;
