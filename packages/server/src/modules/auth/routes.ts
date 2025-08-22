import { Router } from "express";
import { validate } from "@syncellus/middlewares/validator.middleware.js";
import { AuthSchema, ForgotPasswordSchema, ResetPasswordSchema } from "@syncellus/modules/auth/schema.js";
import { AuthRepository } from "./repository.js";
import { AuthService } from "./service.js";
import { AuthController } from "./controller.js";
import { DatabaseService } from "@syncellus/database/database.js";
import { LoggerService } from "@syncellus/core/logger.js";
import passport from "passport";

const router = Router();
const db = DatabaseService.getInstance();

const repo = new AuthRepository(db);
const logger = LoggerService.getInstance();
const service = new AuthService(repo);
const controller = new AuthController(service, logger);

router.post("/register", validate(AuthSchema), controller.register);
router.post("/forgot-password", validate(ForgotPasswordSchema), controller.forgotPassword);
router.post("/reset-password", validate(ResetPasswordSchema), controller.resetPassword);
router.post("/login", validate(AuthSchema), passport.authenticate("local", { session: false }), controller.login); //TODO cleanup?

export default router;
