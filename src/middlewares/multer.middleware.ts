import { randomBytes } from "crypto";
import { NextFunction, Request, Response } from "express";
import multer, { diskStorage } from "multer";

import { GENERIC_MESSAGES } from "../config/messages";
import { errorResponse } from "../utils/apiResponse.utils";

const storage = diskStorage({
    destination: (req, file, cb) => {
        const path = "./temp";
        cb(null, path);
    },
    filename: (req, file, cb) => {
        const fileExtension = file.originalname.split(".").pop();
        const filenameWithoutExtension = file.originalname
            .toLowerCase()
            .replace(/\s+/g, "-") // sanitize filename and handle spaces
            .split(".")[0];

        cb(
            null,
            `${filenameWithoutExtension}_${Date.now()}_${randomBytes(6).toString("hex")}.${fileExtension}`,
        );
    },
});

export const fileSizeLimitErrorHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (err && err instanceof Error)
        return errorResponse(res, {
            message: GENERIC_MESSAGES.FILE_SIZE_ERROR,
            statusCode: 413,
        });

    next();
};

export default multer({
    storage,
    limits: {
        fileSize: 50 * 1024 * 1024, // 50 MB file size limit
    },
});
