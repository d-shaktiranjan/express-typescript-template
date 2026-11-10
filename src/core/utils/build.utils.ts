import { writeFileSync } from "fs";
import { logger } from "lorin";

import path from "path";
import { copyDocsAssets } from "@/modules/docs/docs.utils";

const timestamp = new Date().toISOString();
const buildId = `build_${timestamp.replace(/[-:.TZ]/g, "")}`;

const buildInfo = {
    buildId,
    lastUpdated: timestamp,
};

copyDocsAssets(
    path.resolve("src/modules/docs"),
    path.resolve("dist/modules/docs"),
);

writeFileSync("build-info.json", JSON.stringify(buildInfo, null, 2));
logger.success(`Build completed at ${timestamp} — ID: ${buildId}`);
