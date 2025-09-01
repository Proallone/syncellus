import type { Request } from "express";
import type { UserJWTPayload } from "@syncellus/types/index.d.ts";
export interface TypedRequest<T> extends Request {
    body: T;
}

declare global {
    namespace Express {
        //TODO fix
        interface User extends UserJWTPayload {} // eslint-disable-line @typescript-eslint/no-empty-object-type
    }
}
