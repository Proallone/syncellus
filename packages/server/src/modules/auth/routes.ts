import { Router } from "express";
import { validate } from "@syncellus/middlewares/validator.middleware.js";
import { AuthSchema, ForgotPasswordSchema, ResetPasswordSchema, VerifyEmailSchema } from "@syncellus/modules/auth/schemas/request.js";
import { AuthRepository } from "./repository.js";
import { AuthService } from "./service.js";
import { AuthController } from "./controller.js";
import { DatabaseService } from "@syncellus/database/database.js";
import { LoggerService } from "@syncellus/core/logger.js";
import { NodemailerProvider } from "@syncellus/modules/mailer/providers/NodemailerProvider.js";
import { MailService } from "@syncellus/modules/mailer/service.js";
import { hw } from "@syncellus/utils/handlerWrapper.js";
import { authenticate } from "@syncellus/middlewares/auth.middleware.js";

const router = Router();
const db = DatabaseService.getInstance();

const repo = new AuthRepository(db);
const logger = LoggerService.getInstance();

const mailer = new NodemailerProvider();
const mailService = new MailService(mailer);

const service = new AuthService(repo, mailService);
const controller = new AuthController(service, logger);

router.post("/register", validate(AuthSchema), hw(controller.register));
router.post("/verify-email", validate(VerifyEmailSchema), hw(controller.verifyEmail));
router.post("/forgot-password", validate(ForgotPasswordSchema), hw(controller.forgotPassword));
router.post("/reset-password", validate(ResetPasswordSchema), hw(controller.resetPassword));
router.post("/login", validate(AuthSchema), authenticate("local"), hw(controller.login));
router.get("/me", authenticate("jwt"), hw(controller.getMeInformation));

export default router;
