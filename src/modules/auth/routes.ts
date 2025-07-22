import { Router } from "express";
import { validateInput } from "../../middlewares/validator.middleware.js";
import { authSignInSchema } from "./schema.js";
import { signUp, signIn } from "./controller.js";

const router = Router();

router.post("/signup", validateInput(authSignInSchema), signUp);
router.post("/signin", validateInput(authSignInSchema), signIn);

export default router;
