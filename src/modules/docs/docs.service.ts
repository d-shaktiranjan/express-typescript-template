import { readdir } from "fs/promises";

import { DOCUMENT_FILE_PATTERN } from "./docs.config";

export const getDocumentFiles = async (
    directory: string,
): Promise<string[]> => {
    try {
        const entries = await readdir(directory, { withFileTypes: true });
        return entries
            .filter(
                (entry) =>
                    entry.isFile() && DOCUMENT_FILE_PATTERN.test(entry.name),
            )
            .map((entry) => entry.name)
            .sort((first, second) => first.localeCompare(second));
    } catch (error) {
        if (
            error instanceof Error &&
            "code" in error &&
            error.code === "ENOENT"
        )
            return [];
        throw error;
    }
};
