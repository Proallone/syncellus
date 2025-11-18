import z from "@zod/zod";

export const registerSchema = z.strictObject({
	email: z.email(),
	password: z.string().min(8).max(40),
});

export const verifyEmailSchema = z.strictObject({
	token: z.string().length(64),
});

export const forgotPasswordSchema = z.strictObject({
	email: z.email(),
});

export const resetPasswordSchema = z.strictObject({
	token: z.string().length(64),
	newPassword: z.string().min(8).max(40),
});

export const refreshTokenSchema = z.strictObject({
	refreshToken: z.string(),
});
