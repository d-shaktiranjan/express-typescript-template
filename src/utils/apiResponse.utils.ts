import { Response } from "express";

export const successResponse = (
    res: Response,
    options: {
        message: string;
        statusCode?: number;
        data?: object | null;
        meta?: object | null;
    },
): void => {
    if (!options.statusCode) options.statusCode = 200;
    return apiResponse(res, true, options as ApiResponseOptions);
};

export const errorResponse = (
    res: Response,
    options: {
        message: string;
        statusCode?: number;
        errors?: Record<string, string[]> | null;
    },
): void => {
    if (!options.statusCode) options.statusCode = 400;
    return apiResponse(res, false, options as ApiResponseOptions);
};

interface ApiResponseOptions {
    message: string;
    statusCode: number;
    data?: object;
    meta?: object;
    errors?: Record<string, string[]>;
}

function apiResponse(
    res: Response,
    isSuccess: boolean,
    options: ApiResponseOptions,
) {
    const responseObject = {
        isSuccess,
        message: options.message,
        ...(options.meta && { meta: options.meta }),
        ...(options.data && { data: options.data }),
        ...(options.errors && { errors: options.errors }),
    };
    res.status(options.statusCode).json(responseObject);
}
