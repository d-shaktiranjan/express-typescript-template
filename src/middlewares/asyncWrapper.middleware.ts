import { Request, Response, NextFunction, RequestHandler } from "express";
import { errorResponse } from "../utils/apiResponse";
import { DEBUG } from "../config/constants";
import { APP_MESSAGES } from "../config/messages";

const asyncWrapper = (requestHandler: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(requestHandler(req, res, next)).catch((error) => {
            const message = DEBUG ? error.message : APP_MESSAGES.SERVER_ERROR;
            if (DEBUG) console.log(error);
            return errorResponse(
                res,
                message,
                error.statusCode || 400,
                error.errors,
            );
        });
    };
};

export default asyncWrapper;
