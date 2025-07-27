import z from "zod";
import { AuthBasePayload } from "../modules/auth/schema.js";
import { employeeGetQuery } from "../modules/employees/schema.js";

export type AuthCredentials = z.infer<typeof AuthBasePayload>;
export type GetEmployeeQuery = z.infer<typeof employeeGetQuery>;

export interface DbHealthResponse {
    sqlite_version: string;
}
