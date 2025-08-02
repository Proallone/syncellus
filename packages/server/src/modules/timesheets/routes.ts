import { Router } from "express";
import { createTimesheet, deleteTimesheet, getTimesheetById, getTimesheets, patchTimesheet } from "@syncellus/modules/timesheets/controller.js";
import { validate } from "@syncellus/middlewares/validator.middleware.js";
import { TimesheetPostSchema, TimesheetUpdateSchema } from "@syncellus/modules/timesheets/schema.js";

const router = Router();

router.get("/", getTimesheets);
router.get("/:id", getTimesheetById);
router.post("/", validate(TimesheetPostSchema), createTimesheet);
router.patch("/:id", validate(TimesheetUpdateSchema), patchTimesheet);
router.delete("/:id", deleteTimesheet);

export default router;
