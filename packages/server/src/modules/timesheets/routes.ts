import { Router } from "express";
import { validate } from "@syncellus/middlewares/validator.middleware.js";
import { TimesheetPostSchema, TimesheetUpdateSchema } from "@syncellus/modules/timesheets/schema.js";
import { hw } from "@syncellus/utils/handlerWrapper.js";
import { authenticate } from "@syncellus/middlewares/auth.middleware.js";
import { buildTimesheetsModule } from "@syncellus/modules/timesheets/module.js";

const router = Router();
const { controller } = buildTimesheetsModule();

router.use(authenticate("jwt"));

router.get("/", hw(controller.getTimesheets));
router.get("/:id", hw(controller.getTimesheetById));
router.post("/", validate(TimesheetPostSchema), hw(controller.createTimesheets));
router.patch("/:id", validate(TimesheetUpdateSchema), hw(controller.patchTimesheet));
router.delete("/:id", hw(controller.deleteTimesheet));

export default router;
