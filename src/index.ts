// package imports
import cors from "cors";
import "dotenv/config";
import express, {
    Request,
    Response,
    json,
    static as static_,
    urlencoded,
} from "express";
import { logger, loggerMiddleware } from "lorin";

// constant imports
import { CORS_ORIGIN, PORT } from "./config/constants";
import { APP_MESSAGES } from "./config/messages";

// util imports
import apiMetaData from "./utils/apiMeta.utils";

// DB import & connect
import connectToDB from "./config/dbConnect";
import requestBodyMiddleware from "./middlewares/body.middleware";
connectToDB();

const app = express();

// middleware usages
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(requestBodyMiddleware);
app.use(loggerMiddleware);
app.use("/public", static_("public"));
app.set("trust proxy", true);

app.get("/", (req: Request, res: Response) => {
    const host = req.protocol + "://" + req.get("host") + req.originalUrl;
    apiMetaData.host = host;
    res.json(apiMetaData);
});

app.listen(PORT, () => {
    logger.success(APP_MESSAGES.RUNNING);
});
