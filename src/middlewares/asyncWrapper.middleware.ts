import { NextFunction, Request, RequestHandler, Response } from "express";
import { DEBUG } from "../config/constants";
import { APP_MESSAGES } from "../config/messages";
import { errorResponse } from "../utils/apiResponse";

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
