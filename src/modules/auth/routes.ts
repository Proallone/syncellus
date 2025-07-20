import { Router } from "express";
import { validateInput } from "../../middlewares/validator.middleware.js";
import { authSignInSchema } from "./schema.js";
import { signIn } from "./controller.js";

const router = Router();

router.post("/signin", validateInput(authSignInSchema), signIn);

export default router;
