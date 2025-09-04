import { z } from "zod";

export const AuthBasePayload = z.strictObject({
    email: z.email(),
    password: z.string().min(8).max(40)
});

export const AuthSchema = z.object({
    body: AuthBasePayload
});

export const ForgotPasswordPayload = z.strictObject({
    email: z.email()
});

export const ForgotPasswordSchema = z.object({
    body: ForgotPasswordPayload
});

export const ResetPasswordPayload = z.strictObject({
    token: z.string().length(64),
    newPassword: z.string().min(8).max(40)
});

export const ResetPasswordSchema = z.object({
    body: ResetPasswordPayload
});

export const VerifyEmailPayload = z.strictObject({
    token: z.string().length(64)
});

export const VerifyEmailSchema = z.object({
    body: VerifyEmailPayload
});
