import { z } from "zod";

const AuthBasePayload = z.strictObject({
    email: z.email(),
    password: z.string().min(8).max(40)
});

const AuthSchema = z.object({
    body: AuthBasePayload
});

const ForgotPasswordPayload = z.strictObject({
    email: z.email()
});

const ForgotPasswordSchema = z.object({
    body: ForgotPasswordPayload
});

const ResetPasswordPayload = z.strictObject({
    email: z.email(),
    token: z.jwt()
});

const ResetPasswordSchema = z.object({
    body: ResetPasswordPayload
});
export { AuthSchema, AuthBasePayload, ForgotPasswordSchema, ForgotPasswordPayload, ResetPasswordPayload, ResetPasswordSchema };
