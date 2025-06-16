import { readFileSync } from "fs";
import { TAG } from "../config/constants";

const getAppMetadata = () => {
    const packageJson = readFileSync("package.json", "utf8");
    const { name, version, license } = JSON.parse(packageJson);
    return { name, version, license };
};

const getRunningBranch = () => {
    const file = readFileSync(".git/HEAD", "utf8");
    return file.replace("ref: refs/heads/", "").replaceAll("\n", "");
};

export const apiMetaData = {
    ...getAppMetadata(),
    tag: TAG,
    host: "",
    runningBranch: getRunningBranch(),
    documentation: null,
};
