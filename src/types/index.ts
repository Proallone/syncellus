import z from "zod";
import { authSignInPayload } from "../modules/auth/schema.js";

export type AuthCredentials = z.infer<typeof authSignInPayload>;
