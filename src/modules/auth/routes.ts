import { Router } from "express";
import { validate } from "../../middlewares/validator.middleware.js";
import { authSignInSchema } from "./schema.js";
import { signUp, signIn } from "./controller.js";

const router = Router();

router.post("/signup", validate(authSignInSchema), signUp);
router.post("/signin", validate(authSignInSchema), signIn);

export default router;
