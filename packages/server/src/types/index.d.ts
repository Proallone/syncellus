import z from "zod";
import type { AuthBasePayload, ForgotPasswordPayload, ResetPasswordPayload } from "@syncellus/modules/auth/schema.js";
import type { AccountsGetQuery, AccountsPostPayload, AccountsUpdatePayload } from "@syncellus/modules/accounts/schema.ts";
import type { Request } from "express";
import { TimesheetPostPayload } from "@syncellus/modules/timesheets/schema.ts";

export interface Config {
    PORT: number;
    NODE_ENV: string;
    JWT_TOKEN_SECRET: string;
    DATABASE_KEY: string;
    CRYPTO_HMAC_KEY: string;
    SMTP_HOST: string;
    SMTP_PORT: number;
}

export type AuthCredentials = z.infer<typeof AuthBasePayload>;
export type GetEmployeeQuery = z.infer<typeof AccountsGetQuery>;

export interface DbHealthResponse {
    sqlite_version: string;
}

export interface UserJWTPayload {
    public_id: string;
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
export type NewTimesheetBody = z.infer<typeof TimesheetPostPayload>;
export type NewAccountBody = z.infer<typeof AccountsPostPayload>;
export type UpdateAccoundBody = z.infer<typeof AccountsUpdatePayload>;

export type ForgotPasswordRequestBody = z.infer<typeof ForgotPasswordPayload>;
export type ResetPasswordRequestBody = z.infer<typeof ResetPasswordPayload>;
