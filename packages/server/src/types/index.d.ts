import z from "zod";
import type { AuthBasePayload, ForgotPasswordPayload, ResetPasswordPayload } from "@syncellus/modules/auth/schema.js";
import type { employeeGetQuery } from "@syncellus/modules/accounts/schema.ts";
import type { Request } from "express";

export interface Config {
    PORT: number;
    NODE_ENV: string;
    JWT_TOKEN_SECRET: string;
    DATABASE_KEY: string;
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

export type AuthRequestBody = z.infer<typeof AuthBasePayload>;
export type ForgotPasswordRequestBody = z.infer<typeof ForgotPasswordPayload>;
export type ResetPasswordRequestBody = z.infer<typeof ResetPasswordPayload>;
