import { cpSync, mkdirSync } from "fs";
import path from "path";

export const escapeHtml = (value: string): string =>
    value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");

export const copyDocsAssets = (source: string, destination: string): void => {
    mkdirSync(destination, { recursive: true });
    cpSync(
        path.join(source, "changelog.html"),
        path.join(destination, "changelog.html"),
    );
    cpSync(
        path.join(source, "markdown-preview"),
        path.join(destination, "markdown-preview"),
        { recursive: true },
    );
};
