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

// constant imports
import { CORS_ORIGIN, PORT } from "./config/constants";
import { APP_MESSAGES } from "./config/messages";

// util imports
import { apiMetaData } from "./utils/global.utils";

// DB import & connect
import connectToDB from "./config/dbConnect";
connectToDB();

const app = express();

// middleware usages
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use("/public", static_("public"));

app.get("/", (req: Request, res: Response) => {
    const host = req.protocol + "://" + req.get("host") + req.originalUrl;
    apiMetaData.host = host;
    res.json(apiMetaData);
});

app.listen(PORT, () => {
    console.log(APP_MESSAGES.RUNNING);
});
