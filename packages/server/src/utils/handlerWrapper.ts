import type { Request, Response, NextFunction, RequestHandler } from "express";

type MaybePromise<T> = T | Promise<T>;

type AnyRequestHandler<Req extends Request = Request, Res extends Response = Response> = (req: Req, res: Res, next: NextFunction) => MaybePromise<unknown>;

export const handlerWrapper =
    <Req extends Request = Request, Res extends Response = Response>(fn: AnyRequestHandler<Req, Res>): RequestHandler =>
    (req, res, next) => {
        Promise.resolve(fn(req as Req, res as Res, next)).catch(next);
    };
