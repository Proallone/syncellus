import { Router } from "express";
import { validate } from "@syncellus/middlewares/validator.middleware.js";
import { AuthSchema, ForgotPasswordSchema, ResetPasswordSchema, VerifyEmailSchema } from "@syncellus/modules/auth/schemas/request.js";
import { hw } from "@syncellus/utils/handlerWrapper.js";
import { authenticate } from "@syncellus/middlewares/auth.middleware.js";
import { buildAuthModule } from "@syncellus/modules/auth/module.js";

const router = Router();
const controller = buildAuthModule();

router.post("/register", validate(AuthSchema), hw(controller.register));
router.post("/verify-email", validate(VerifyEmailSchema), hw(controller.verifyEmail));
router.post("/forgot-password", validate(ForgotPasswordSchema), hw(controller.forgotPassword));
router.post("/reset-password", validate(ResetPasswordSchema), hw(controller.resetPassword));
router.post("/login", validate(AuthSchema), authenticate("local"), hw(controller.login));
router.get("/me", authenticate("jwt"), hw(controller.getProfile));

export default router;
