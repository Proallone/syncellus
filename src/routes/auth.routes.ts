import { Router } from "express";
import { validateInput } from "../middlewares/validator.middleware.js";
import { authSignInSchema } from "../schemas/auth.schema.js";
import { signIn } from "../controllers/auth.controller.js";

const router = Router();

router.post("/signin", validateInput(authSignInSchema), signIn);

export default router;
