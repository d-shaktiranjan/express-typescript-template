import { NextFunction, Request, Response } from "express";
import aw from "./asyncWrapper.middleware";

const requestBodyMiddleware = aw(
    async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body) req.body = {};
        next();
    },
);

export default requestBodyMiddleware;
