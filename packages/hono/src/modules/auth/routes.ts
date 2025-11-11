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

router.post("/register", async (c) => {
	const { email, password } = await c.req.json(); //TODO add validation
	const newUser = await registerNewUser({ email, password });
	logger.info({ email, action: "register" }, "Registration attempt");

	//   return sendResponse(res, HttpStatus.CREATED, {
	//     message: "Registration successful",
	//     data: newUser,
	//     schema: UserInformationResponse,
	//   });
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

router.post("/verify-email", async (c) => {
	const { token } = await c.req.json();
	logger.info({ action: "verify-email" }, "Verification attempt");
	verifyAccountEmail(token);

	c.status(HttpStatus.OK);
	return c.json({ message: "Email verified successfully" });
});

router.post("forgot-password", async (c) => {
	const { email } = await c.req.json();
	logger.info({ email, action: "forgot-password" }, "Password reset requested");
	await issuePasswordResetToken(email);
	c.status(HttpStatus.OK);
	return c.json({});
});

router.post("/reset-password", async (c) => {
	const { token, newPassword } = await c.req.json();
	logger.info({ action: "reset-password" }, "Password reset attempt");
	await performPasswordReset(token, newPassword);
	c.status(HttpStatus.OK);
	return c.json({});
});

router.get("/me", async (c) => {
	const { user } = await c.req.json();
	logger.info({ userId: user.public_id, action: "get-profile" }, "Profile requested");
	const profile = await findUserByPublicID(user.public_id);

	c.status(HttpStatus.OK);
	return c.json({ message: "This account information", data: profile }); //TODO sanitize response
});

export default router;
