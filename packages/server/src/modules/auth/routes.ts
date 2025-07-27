import { Router } from "express";
import { validate } from "../../middlewares/validator.middleware.js";
import { AuthSchema } from "./schema.js";
import { signUp, signIn } from "./controller.js";

const router = Router();

router.post("/signup", validate(AuthSchema), signUp);
router.post("/signin", validate(AuthSchema), signIn);

export default router;
