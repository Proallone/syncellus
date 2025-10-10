import { authenticate } from "@syncellus/middlewares/auth.middleware.js";
import { validate } from "@syncellus/middlewares/validator.middleware.js";
import { buildAccountsModule } from "@syncellus/modules/accounts/module.js";
import { AccountsGetSchema, AccountsPatchSchema, AccountsPostSchema } from "@syncellus/modules/accounts/schema.js";
import { hw } from "@syncellus/utils/handlerWrapper.js";
import { Router } from "express";

const router = Router();

const { controller } = buildAccountsModule();

router.use(authenticate("jwt"));

router.post("/", validate(AccountsPostSchema), hw(controller.createAccount));
router.get("/", validate(AccountsGetSchema), hw(controller.getAccounts));
router.get("/:id", hw(controller.getOneAccount));
router.patch("/:id", validate(AccountsPatchSchema), hw(controller.updateAccount));
router.delete("/:id", hw(controller.deleteAccount));

export default router;
