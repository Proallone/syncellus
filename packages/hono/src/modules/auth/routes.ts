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

const router = new Hono();

router.post("/register", async (c) => {
	const { email, password } = await c.req.json(); //TODO add validation
	const newUser = await registerNewUser({ email, password });
	//   this.logger.info({ email, action: "register" }, "Registration attempt"); //TODO add global logger

	//   return sendResponse(res, HttpStatus.CREATED, {
	//     message: "Registration successful",
	//     data: newUser,
	//     schema: UserInformationResponse,
	//   });
	c.status(HttpStatus.CREATED);
	return c.json({ message: "Registration succesfull", data: newUser }); //TODO add response sanitization
});

router.post("/login", async (c) => {
	const { user } = await c.req.json();
	// this.logger.info({ public_id: user.public_id }, "User login attempt"); //TODO add global logger
	const accessToken = await issueLoginToken(user);

	c.status(HttpStatus.OK);
	return c.json({ message: "Login successful", data: { accessToken } });
});

router.post("/verify-email", async (c) => {
	const { token } = await c.req.json();
	// this.logger.info({ action: "verify-email" }, "Verification attempt"); // TODO add global logger
	verifyAccountEmail(token);

	c.status(HttpStatus.OK);
	return c.json({ message: "Email verified successfully" });
});

router.post("forgot-password", async (c) => {
	const { email } = await c.req.json();
	// this.logger.info(
	//   { email, action: "forgot-password" },
	//   "Password reset requested",
	// ); //TODO add global logger
	await issuePasswordResetToken(email);
	c.status(HttpStatus.OK);
	return c.json({});
});

router.post("/reset-password", async (c) => {
	const { token, newPassword } = await c.req.json();
	// this.logger.info({ action: "reset-password" }, "Password reset attempt"); //TODO add global logger
	await performPasswordReset(token, newPassword);
	c.status(HttpStatus.OK);
	return c.json({});
});

router.get("/me", async (c) => {
	const { user } = await c.req.json();
	// this.logger.info(
	//   { userId: user.public_id, action: "get-profile" },
	//   "Profile requested",
	// ); //TODO add global logger

	const profile = await findUserByPublicID(user.public_id);

	c.status(HttpStatus.OK);
	return c.json({ message: "This account information", data: profile }); //TODO sanitize response
});

export default router;
