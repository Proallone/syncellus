import { Hono } from "hono";
import {
	findUserByPublicID,
	issueLoginToken,
	issuePasswordResetToken,
	performPasswordReset,
	registerNewUser,
	verifyAccountEmail,
	verifyUserCredentials,
} from "@syncellus/hono/modules/auth/service.ts";
import { HttpStatus } from "@syncellus/hono/common/http.ts";
import { basicAuth } from "hono/basic-auth";
import { LoggerService } from "@syncellus/hono/common/logger.ts";
import { sValidator } from "@hono/standard-validator";
import { z } from "@zod/zod";
import { bearerAuth } from "hono/bearer-auth";
import { verify } from "hono/jwt";
import { AppConfig } from "@syncellus/hono/config/config.ts";

type Variables = { user_public_id: string };

const logger = LoggerService.getInstance();
const router = new Hono<{ Variables: Variables }>();

router.use(
	"/login",
	basicAuth({
		verifyUser: async (username, password, c) => {
			return await verifyUserCredentials(
				{
					username,
					password,
				},
				c,
			);
		},
	}),
);

const registerSchema = z.strictObject({
	email: z.email(),
	password: z.string().min(8).max(40),
});

router.post("/register", sValidator("json", registerSchema), async (c) => {
	const { email, password } = await c.req.valid("json");
	const newUser = await registerNewUser({ email, password });
	logger.info({ email, action: "register" }, "Registration attempt");

	c.status(HttpStatus.CREATED);
	return c.json({ message: "Registration succesfull", data: newUser }); //TODO add response sanitization
});

router.post("/login", async (c) => {
	const userPublicId = c.get("user_public_id");
	logger.info({ public_id: userPublicId }, "User login attempt");
	const accessToken = await issueLoginToken(userPublicId);

	c.status(HttpStatus.OK);
	return c.json({ message: "Login successful", data: { accessToken } });
});

const verifyEmailSchema = z.strictObject({
	token: z.string().length(64),
});

router.post("/verify-email", sValidator("json", verifyEmailSchema), async (c) => {
	const { token } = await c.req.valid("json");
	logger.info({ action: "verify-email" }, "Verification attempt");
	verifyAccountEmail(token);

	c.status(HttpStatus.OK);
	return c.json({ message: "Email verified successfully" });
});

const forgotPasswordSchema = z.strictObject({
	email: z.email(),
});

router.post("forgot-password", sValidator("json", forgotPasswordSchema), async (c) => {
	const { email } = await c.req.valid("json");
	logger.info({ email, action: "forgot-password" }, "Password reset requested");
	await issuePasswordResetToken(email);
	c.status(HttpStatus.OK);
	return c.json({});
});

const resetPasswordSchema = z.strictObject({
	token: z.string().length(64),
	newPassword: z.string().min(8).max(40),
});

router.post("/reset-password", sValidator("json", resetPasswordSchema), async (c) => {
	const { token, newPassword } = await c.req.valid("json");
	logger.info({ action: "reset-password" }, "Password reset attempt");
	await performPasswordReset(token, newPassword);
	c.status(HttpStatus.OK);
	return c.json({});
});

router.use(
	"/me",
	bearerAuth({
		verifyToken: async (token, c) => {
			const jwtKey = AppConfig.getInstance().JWT_TOKEN_SECRET;
			const claims = await verify(token, jwtKey);
			c.set("user_public_id", claims.sub);
			return Boolean(claims);
		},
	}),
);

router.get("/me", async (c) => {
	const userPublicID = c.get("user_public_id");
	logger.info({ userId: userPublicID, action: "get-profile" }, "Profile requested");
	const profile = await findUserByPublicID(userPublicID);

	c.status(HttpStatus.OK);
	return c.json({ message: "This account information", data: profile }); //TODO sanitize response
});

export default router;
