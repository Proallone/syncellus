import type { Request, Response, NextFunction, RequestHandler } from "express";

type MaybePromise<T> = T | Promise<T>;

type AnyRequestHandler<Req extends Request = Request, Res extends Response = Response> = (req: Req, res: Res, next: NextFunction) => MaybePromise<unknown>;

/**
 * Express async handler wrapper.
 *
 * @description Catches errors from async handlers and passes them to the next middleware.
 *
 * @template {import("express").Request} Req
 * @template {import("express").Response} Res
 *
 * @param {import("./types").AnyRequestHandler<Req, Res>} fn - The handler to wrap.
 *
 * @returns {import("express").RequestHandler} The wrapped handler.
 */
export const hw =
    <Req extends Request = Request, Res extends Response = Response>(fn: AnyRequestHandler<Req, Res>): RequestHandler =>
    (req, res, next) => {
        Promise.resolve(fn(req as Req, res as Res, next)).catch(next);
    };
