import { Router } from "express";
import { validate } from "@syncellus/middlewares/validator.middleware.js";
import { AuthSchema } from "@syncellus/modules/auth/schema.js";
import { signUp, signIn } from "@syncellus/modules/auth/controller.js";

const router = Router();

router.post("/signup", validate(AuthSchema), signUp);
router.post("/signin", validate(AuthSchema), signIn);

export default router;
