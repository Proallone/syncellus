import { Router } from "express";
import { validate } from "@syncellus/middlewares/validator.middleware.js";
import { AuthSchema, ForgotPasswordSchema, ResetPasswordSchema } from "@syncellus/modules/auth/schema.js";
import { AuthRepository } from "./repository.js";
import { AuthService } from "./service.js";
import { AuthController } from "./controller.js";
import { DatabaseService } from "@syncellus/database/database.js";
import { LoggerService } from "@syncellus/core/logger.js";
import passport from "passport";
import { NodemailerProvider } from "@syncellus/modules/mailer/providers/NodemailerProvider.js";
import { MailService } from "@syncellus/modules/mailer/service.js";
import { hw } from "@syncellus/utils/handlerWrapper.js";

const router = Router();
const db = DatabaseService.getInstance();

const repo = new AuthRepository(db);
const logger = LoggerService.getInstance();

const mailer = new NodemailerProvider();
const mailService = new MailService(mailer);

const service = new AuthService(repo, mailService);
const controller = new AuthController(service, logger);

router.post("/register", validate(AuthSchema), hw(controller.register));
router.post("/forgot-password", validate(ForgotPasswordSchema), hw(controller.forgotPassword));
router.post("/reset-password", validate(ResetPasswordSchema), hw(controller.resetPassword));
router.post("/login", validate(AuthSchema), passport.authenticate("local", { session: false }), hw(controller.login)); //TODO cleanup?
router.get("/me", passport.authenticate("jwt", { session: false }), hw(controller.getMeInformation));

export default router;
