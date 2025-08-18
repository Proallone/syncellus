import z from "zod";
import type { AuthBasePayload } from "@syncellus/modules/auth/schema.js";
import type { employeeGetQuery } from "@syncellus/modules/employees/schema.js";
import type { Request } from "express";

export interface Config {
    port: number;
    nodeEnv: string;
    jwt_secret: string;
}

export type AuthCredentials = z.infer<typeof AuthBasePayload>;
export type GetEmployeeQuery = z.infer<typeof employeeGetQuery>;

export interface DbHealthResponse {
    sqlite_version: string;
}

export interface UserJWTPayload {
    public_id: string;
    role: string;
}

export interface AuthRequest extends Request {
    user?: UserJWTPayload;
}

export interface AppError extends Error {
    status?: number;
}

export interface Credentials {
    email: string;
    password: string;
}
