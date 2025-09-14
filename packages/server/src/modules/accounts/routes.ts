import { Router } from "express";
import { validate } from "@syncellus/middlewares/validator.middleware.js";
import { AccountsPostSchema, AccountsPatchSchema, AccountsGetSchema } from "@syncellus/modules/accounts/schema.js";
import { TimesheetPostSchema } from "@syncellus/modules/workspaces/timesheets/schema.js";
import { hw } from "@syncellus/utils/handlerWrapper.js";
import { authenticate } from "@syncellus/middlewares/auth.middleware.js";
import { buildAccountsModule } from "@syncellus/modules/accounts/module.js";

const router = Router();

const { controller } = buildAccountsModule();

router.use(authenticate("jwt"));

router.post("/", validate(AccountsPostSchema), hw(controller.createAccount));
router.get("/", validate(AccountsGetSchema), hw(controller.getAccounts));
router.get("/:id", hw(controller.getOneAccount));
router.patch("/:id", validate(AccountsPatchSchema), hw(controller.updateAccount));
router.delete("/:id", hw(controller.deleteAccount));

router.get("/:accountId/timesheets", hw(controller.getTimesheetsByAccount));
router.post("/:accountId/timesheets", validate(TimesheetPostSchema), hw(controller.createTimesheetForAccount));

export default router;
