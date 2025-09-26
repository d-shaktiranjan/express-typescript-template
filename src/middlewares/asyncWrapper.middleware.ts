import { NextFunction, Request, RequestHandler, Response } from "express";
import { logger } from "lorin";

import { DEBUG } from "@/config/constants";
import { APP_MESSAGES } from "@/config/messages";
import { errorResponse } from "@/utils/apiResponse.utils";

const asyncWrapper = (requestHandler: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(requestHandler(req, res, next)).catch((error) => {
            const message = DEBUG ? error.message : APP_MESSAGES.SERVER_ERROR;
            if (DEBUG) logger.error(error);
            return errorResponse(res, message, {
                statusCode: error.statusCode || 400,
                errors: error.errors || null,
            });
        });
    };
};

export default asyncWrapper;
