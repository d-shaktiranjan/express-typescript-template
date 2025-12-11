import { logger } from "lorin";
import { connect } from "mongoose";

import { MONGO_URI } from "./constants";
import { DB_MESSAGES } from "./messages";

const connectToDB = () => {
    if (typeof MONGO_URI == "undefined")
        throw new Error(DB_MESSAGES.URI_MISSING);
    connect(MONGO_URI)
        .then(() => logger.success(DB_MESSAGES.CONNECTED))
        .catch((error: unknown) => {
            if (error instanceof Error)
                logger.error(`${DB_MESSAGES.FAILED} ${error}`);
        });
};
export default connectToDB;
