import { Response } from "express";
import { APP_MESSAGES, GENERIC_MESSAGES } from "../config/messages";

const apiResponse = (
    res: Response,
    message: string,
    statusCode: number,
    data: object | null,
    metaData: object | null,
    isSuccess: boolean,
    errors: Record<string, string[]> | null,
) => {
    const responseObject = {
        isSuccess,
        message,
        ...(metaData && { metaData }),
        ...(data && { data }),
        ...(errors && { errors }),
    };
    return res.status(statusCode).json(responseObject);
};

export const successResponse = (
    res: Response,
    message: string = APP_MESSAGES.REQUEST_SUCCESS,
    statusCode: number = 200,
    data: object | null = null,
    metaData: object | null = null,
) => apiResponse(res, message, statusCode, data, metaData, true, null);

export const errorResponse = (
    res: Response,
    message: string = APP_MESSAGES.REQUEST_FAILED,
    statusCode: number = 400,
    errors: Record<string, string[]> | null = null,
) => apiResponse(res, message, statusCode, null, null, false, errors);

export const noContentResponse = (res: Response) => {
    return successResponse(res, GENERIC_MESSAGES.NO_CONTENT, 204);
};
