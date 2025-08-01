import z from "zod";
import { AuthBasePayload } from "../modules/auth/schema.js";
import { employeeGetQuery } from "../modules/employees/schema.js";
import type { Request } from "express";

export type AuthCredentials = z.infer<typeof AuthBasePayload>;
export type GetEmployeeQuery = z.infer<typeof employeeGetQuery>;

export interface DbHealthResponse {
    sqlite_version: string;
}

export interface User {
    id: number;
    role: string;
}

export interface AuthRequest extends Request {
    user?: User;
}
