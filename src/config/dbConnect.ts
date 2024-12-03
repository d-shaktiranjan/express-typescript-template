import { connect } from "mongoose";
import { MONGO_URI } from "./constants";
import { DB_MESSAGES } from "./messages";

const connectToDB = () => {
    if (typeof MONGO_URI == "undefined")
        throw new Error(DB_MESSAGES.URI_MISSING);
    connect(MONGO_URI)
        .then(() => console.log(DB_MESSAGES.CONNECTED))
        .catch((error: unknown) => {
            if (error instanceof Error)
                console.log(DB_MESSAGES.FAILED, error.message);
        });
};
export default connectToDB;
