import type { Request } from "express";
import type { User } from "@syncellus/types/database.d.ts";
export interface TypedRequest<T> extends Request {
    body: T;
}
declare namespace Express {
    export interface Request {
        user?: User;
    }
}
