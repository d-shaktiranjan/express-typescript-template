import { readFileSync } from "fs";
import { TAG } from "../config/constants";

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
