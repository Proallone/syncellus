import { Hono } from "hono";
import {
	findUserByPublicID,
	issueLoginToken,
	issuePasswordResetToken,
	performPasswordReset,
	registerNewUser,
	verifyAccountEmail,
} from "@syncellus/hono/modules/auth/service.ts";
import { HttpStatus } from "@syncellus/hono/common/http.ts";
import { basicAuth } from "hono/basic-auth";
import { LoggerService } from "@syncellus/hono/common/logger.ts";
import { sValidator } from "@hono/standard-validator";
import { z } from "@zod/zod";
import { bearerAuth } from "hono/bearer-auth";
import { verifyBasic, verifyJWT } from "@syncellus/hono/middlewares/auth.middleware.ts";
import { forgotPasswordSchema, registerSchema, resetPasswordSchema, verifyEmailSchema } from "@syncellus/hono/modules/auth/schema.ts";

type Variables = { user_public_id: string };

const logger = LoggerService.getInstance();
const router = new Hono<{ Variables: Variables }>();

router.post("/register", sValidator("json", registerSchema), async (c) => {
	const { email, password } = await c.req.valid("json");
	const newUser = await registerNewUser({ email, password });
	logger.info({ email, action: "register" }, "Registration attempt");

	c.status(HttpStatus.CREATED);
	return c.json({ message: "Registration succesfull", data: newUser }); //TODO add response sanitization
});

router.post(
	"/login",
	basicAuth({
		verifyUser: verifyBasic,
	}),
	async (c) => {
		const userPublicId = c.get("user_public_id");
		logger.info({ public_id: userPublicId }, "User login attempt");
		const accessToken = await issueLoginToken(userPublicId);

		return c.json({ message: "Login successful", data: { accessToken } });
	},
);

router.post("/verify-email", sValidator("json", verifyEmailSchema), async (c) => {
	const { token } = await c.req.valid("json");
	logger.info({ action: "verify-email" }, "Verification attempt");
	verifyAccountEmail(token);

	return c.json({ message: "Email verified successfully" });
});

router.post("forgot-password", sValidator("json", forgotPasswordSchema), async (c) => {
	const { email } = await c.req.valid("json");
	logger.info({ email, action: "forgot-password" }, "Password reset requested");
	await issuePasswordResetToken(email);
	return c.json({}); //TODO finish
});

router.post("/reset-password", sValidator("json", resetPasswordSchema), async (c) => {
	const { token, newPassword } = await c.req.valid("json");
	logger.info({ action: "reset-password" }, "Password reset attempt");
	await performPasswordReset(token, newPassword);
	return c.json({}); //TODO finish
});

router.get(
	"/me",
	bearerAuth({
		verifyToken: verifyJWT,
	}),
	async (c) => {
		const userPublicID = c.get("user_public_id");
		logger.info({ userId: userPublicID, action: "get-profile" }, "Profile requested");
		const profile = await findUserByPublicID(userPublicID);

		return c.json({ message: "This account information", data: profile }); //TODO sanitize response
	},
);

export default router;
