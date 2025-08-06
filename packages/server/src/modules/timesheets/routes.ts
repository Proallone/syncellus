import { Router } from "express";
import { createTimesheets, deleteTimesheet, getTimesheetById, getTimesheets, patchTimesheet } from "@syncellus/modules/timesheets/controller.js";
import { validate } from "@syncellus/middlewares/validator.middleware.js";
import { TimesheetPostSchema, TimesheetUpdateSchema } from "@syncellus/modules/timesheets/schema.js";
import { authMiddleware } from "@syncellus/middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getTimesheets);
router.get("/:id", getTimesheetById);
router.post("/", validate(TimesheetPostSchema), createTimesheets);
router.patch("/:id", validate(TimesheetUpdateSchema), patchTimesheet);
router.delete("/:id", deleteTimesheet);

export default router;
