import { Router } from "express";
import { validate } from "@syncellus/middlewares/validator.middleware.js";
import { AuthSchema } from "@syncellus/modules/auth/schema.js";
import { AuthRepository } from "./repository.js";
import { AuthService } from "./service.js";
import { AuthController } from "./controller.js";
import { DatabaseService } from "@syncellus/database/database.js";
import { LoggerService } from "@syncellus/core/logger.js";

const router = Router();
const db = DatabaseService.getInstance();

const repo = new AuthRepository(db);
const service = new AuthService(repo);
const logger = LoggerService.getInstance();
const controller = new AuthController(service, logger);

router.post("/signup", validate(AuthSchema), controller.signUp);
router.post("/signin", validate(AuthSchema), controller.signIn);

export default router;
