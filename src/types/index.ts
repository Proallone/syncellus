import z from "zod";
import { authSignInPayload } from "../modules/auth/schema.js";
import { employeeGetQuery } from "../modules/employees/schema.js";

export type AuthCredentials = z.infer<typeof authSignInPayload>;
export type GetEmployeeQuery = z.infer<typeof employeeGetQuery>;


export interface DbHealthResponse {
  sqlite_version: string
}
