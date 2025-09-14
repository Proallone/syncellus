import { Router } from "express";
import { hw } from "@syncellus/utils/handlerWrapper.js";
import { authenticate } from "@syncellus/middlewares/auth.middleware.js";
import { validate } from "@syncellus/middlewares/validator.middleware.js";
import { buildTimesheetsModule } from "@syncellus/modules/workspaces/timesheets/module.js";
import { TimesheetPostSchema, TimesheetUpdateSchema } from "@syncellus/modules/workspaces/timesheets/schema.js";

const router = Router();

router.use(authenticate("jwt"));

const controller = buildTimesheetsModule();
router.get("/", hw(controller.getTimesheets));
router.get("/:id", hw(controller.getTimesheetById));
router.post("/", validate(TimesheetPostSchema), hw(controller.createTimesheets));
router.patch("/:id", validate(TimesheetUpdateSchema), hw(controller.patchTimesheet));
router.delete("/:id", hw(controller.deleteTimesheet));

export default router;
