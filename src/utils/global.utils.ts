import { readFileSync } from "fs";

import { TAG } from "../config/constants";
import { GENERIC_MESSAGES } from "../config/messages";
import ApiError from "../libs/ApiError.lib";

const getAppVersion = () => {
    const packageJson = readFileSync("package.json", "utf8");
    const version = JSON.parse(packageJson).version;
    return version;
};

const getRunningBranch = () => {
    const file = readFileSync(".git/HEAD", "utf8");
    return file.replace("ref: refs/heads/", "").replaceAll("\n", "");
};

export const apiMetaData = {
    version: getAppVersion(),
    tag: TAG,
    host: "",
    runningBranch: getRunningBranch(),
    documentation: null,
    license: null,
};

export const nullChecker = (elementObject: Record<string, unknown>) => {
    const errors: Record<string, string[]> = {};

    for (const [key, value] of Object.entries(elementObject)) {
        if (!Object.prototype.hasOwnProperty.call(elementObject, key)) continue;

        if (value == null || (typeof value === "string" && value.trim() === ""))
            errors[key] = [`The ${key} ${GENERIC_MESSAGES.REQUIRED}`];
    }
    if (Object.keys(errors).length > 0)
        throw new ApiError(GENERIC_MESSAGES.FIELD_ERROR, 400, errors);
};
