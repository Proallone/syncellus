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

/**
 * This file augments the Express module types to include properties
 * that are set on the `req.user` object after authentication.
 *
 * This is the standard way to inform TypeScript about custom properties
 * that are not part of the default Express type definitions.
 */
declare namespace Express {
    /**
     * Represents a custom User object from your authentication system.
     * This augments the default Express.User type.
     */
    export interface User {
        /**
         * The unique identifier for the user.
         */
        id: string;

        /**
         * Optional: The user's email address.
         */
        email?: string;
    }
}
