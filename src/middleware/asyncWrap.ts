import { Request, Response, NextFunction } from 'express';

type RequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

const asyncWrap = (func: RequestHandler): RequestHandler =>
    (req: Request, res: Response, next: NextFunction) =>
        Promise.resolve(func(req, res, next)).catch(next);

export default asyncWrap;
