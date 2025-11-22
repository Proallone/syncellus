import { Hono } from "hono";
import {
	findUserByPublicID,
	issueLoginToken,
	issuePasswordResetToken,
	issueRefreshToken,
	performPasswordReset,
	registerNewUser,
	verifyAccountEmail,
} from "@syncellus/modules/auth/service.ts";
import { HttpStatus } from "@syncellus/common/http.ts";
import { basicAuth } from "hono/basic-auth";
import { LoggerService } from "@syncellus/common/logger.ts";
import { sValidator } from "@hono/standard-validator";
import { bearerAuth } from "hono/bearer-auth";
import { verifyBasic, verifyJWT } from "@syncellus/middlewares/auth.middleware.ts";
import { forgotPasswordSchema, refreshTokenSchema, registerSchema, resetPasswordSchema, verifyEmailSchema } from "@syncellus/modules/auth/schema.ts";
import { verify } from "hono/utils/jwt/jwt";
import { ConfigService } from "@syncellus/config/config.ts";
import { HTTPException } from "hono/http-exception";

type Variables = { user_public_id: string };

const logger = LoggerService.getInstance();
const router = new Hono<{ Variables: Variables }>();

router.post("/register", sValidator("json", registerSchema), async (c) => {
	const { email, password } = c.req.valid("json");
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
		const refreshToken = await issueRefreshToken(userPublicId);

		return c.json({ message: "Login successful", data: { accessToken, refreshToken } });
	},
);

router.post("/verify-email", sValidator("json", verifyEmailSchema), async (c) => {
	const { token } = c.req.valid("json");
	logger.info({ action: "verify-email" }, "Verification attempt");
	await verifyAccountEmail(token);

	return c.json({ message: "Email verified successfully" });
});

router.post("forgot-password", sValidator("json", forgotPasswordSchema), async (c) => {
	const { email } = c.req.valid("json");
	logger.info({ email, action: "forgot-password" }, "Password reset requested");
	await issuePasswordResetToken(email);
	return c.json({
		message: `Password reset process started successfully - mail with details sent to ${email}`,
	});
});

router.post("/reset-password", sValidator("json", resetPasswordSchema), async (c) => {
	const { token, newPassword } = c.req.valid("json");
	logger.info({ action: "reset-password" }, "Password reset attempt");
	await performPasswordReset(token, newPassword);
	return c.json({
		message: "Password reset successfully",
	});
});

router.post("/refresh-token", sValidator("json", refreshTokenSchema), async (c) => {
	const { refreshToken } = c.req.valid("json");
	logger.info({ action: "refresh-token" }, "JWT token refresh attempt");
	const { JWT_TOKEN_SECRET } = ConfigService.getInstance();
	const valid = await verify(refreshToken, JWT_TOKEN_SECRET);

	if (!valid) throw new HTTPException(HttpStatus.UNAUTHORIZED, { message: "Unauthorized!" });

	const accessToken = await issueLoginToken(valid.sub as string);
	const newRefreshToken = await issueRefreshToken(valid.sub as string);
	return c.json({
		message: "Issued new token pair",
		data: {
			accessToken,
			refreshToken: newRefreshToken,
		},
	});
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
