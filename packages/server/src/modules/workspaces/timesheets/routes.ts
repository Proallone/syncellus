import { authenticate } from "@syncellus/middlewares/auth.middleware.ts";
import { validate } from "@syncellus/middlewares/validator.middleware.ts";
import { buildTimesheetsModule } from "@syncellus/modules/workspaces/timesheets/module.ts";
import {
  TimesheetsPostSchema,
  TimesheetsUpdateSchema,
} from "@syncellus/modules/workspaces/timesheets/schema.ts";
import { hw } from "@syncellus/utils/handlerWrapper.ts";
import { Router } from "express";

const router = Router();

router.use(authenticate("jwt"));

const controller = buildTimesheetsModule();
router.get("/", hw(controller.getTimesheets));
router.get("/:id", hw(controller.getTimesheetById));
router.post(
  "/",
  validate(TimesheetsPostSchema),
  hw(controller.createTimesheets),
);
router.patch(
  "/:id",
  validate(TimesheetsUpdateSchema),
  hw(controller.patchTimesheet),
);
router.delete("/:id", hw(controller.deleteTimesheet));

export default router;
