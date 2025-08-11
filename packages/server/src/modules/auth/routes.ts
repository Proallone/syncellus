import { Router } from "express";
import { validate } from "@syncellus/middlewares/validator.middleware.js";
import { AuthSchema } from "@syncellus/modules/auth/schema.js";
import { AuthRepository } from "./repository.js";
import { AuthService } from "./service.js";
import { AuthController } from "./controller.js";
import { db } from "@syncellus/database/database.js";

const router = Router();

const repo = new AuthRepository(db);
const service = new AuthService(repo);
const controller = new AuthController(service);

router.post("/signup", validate(AuthSchema), controller.signUp);
router.post("/signin", validate(AuthSchema), controller.signIn);

export default router;
