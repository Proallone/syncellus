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
    token: z.jwt(),
    newPassword: z.string().min(8).max(40)
});

export const ResetPasswordSchema = z.object({
    body: ResetPasswordPayload
});

export const MeData = z.object({
    public_id: z.string().length(10),
    email: z.email(),
    createdAt: z.iso.datetime(),
    modifiedAt: z.iso.datetime()
});
