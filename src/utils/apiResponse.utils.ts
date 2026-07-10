import { Response } from "express";

import { APP_MESSAGES } from "@/config/messages";
import type { Pagination } from "@/libs/CustomInterface.lib";

interface ApiResponseMeta {
    [key: string]: unknown;
    pagination?: Pagination;
}

export const successResponse = <T>(
    res: Response,
    message: string,
    options: {
        statusCode?: number;
        data?: T;
        meta?: ApiResponseMeta | null;
    } = {},
) => {
    if (!options.statusCode) options.statusCode = 200;
    if (options.statusCode < 200 || options.statusCode >= 300)
        throw new Error(APP_MESSAGES.INVALID_SUCCESS_CODE);

    return apiResponse(res, true, message, {
        statusCode: options.statusCode,
        data: options.data || null,
        meta: options.meta || null,
    });
};

export const errorResponse = (
    res: Response,
    message: string,
    options: {
        statusCode?: number;
        errors?: Record<string, string[]> | null;
    } = {},
): void => {
    if (!options.statusCode) options.statusCode = 400;
    if (options.statusCode < 400 || options.statusCode >= 600)
        throw new Error(APP_MESSAGES.INVALID_ERROR_CODE);

    return apiResponse(res, false, message, {
        statusCode: options.statusCode,
        errors: options.errors || null,
    });
};

interface ApiResponseOptions<T> {
    statusCode: number;
    data?: T;
    meta?: ApiResponseMeta | null;
    errors?: Record<string, string[]> | null;
}

function apiResponse<T>(
    res: Response,
    isSuccess: boolean,
    message: string,
    options: ApiResponseOptions<T>,
) {
    const responseObject = {
        isSuccess,
        message,
        ...(options.meta && { meta: options.meta }),
        ...(options.data && { data: options.data }),
        ...(options.errors && { errors: options.errors }),
    };
    res.status(options.statusCode).json(responseObject);
}
