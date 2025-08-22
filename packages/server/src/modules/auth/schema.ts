import { z } from "zod";

const AuthBasePayload = z.strictObject({
    email: z.email(),
    password: z.string().min(8).max(40)
});

const AuthSchema = z.object({
    body: AuthBasePayload
});

const PasswordResetPayload = z.strictObject({
    email: z.email()
});

const PasswordResetSchema = z.object({
    body: PasswordResetPayload
});

export { AuthSchema, AuthBasePayload, PasswordResetSchema, PasswordResetPayload };
