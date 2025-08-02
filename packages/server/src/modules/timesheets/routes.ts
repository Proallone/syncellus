import { Router } from "express";
import { createTimesheet, deleteTimesheet, getTimesheetById, getTimesheets, patchTimesheet } from "@syncellus/modules/timesheets/controller.js";
import { validate } from "@syncellus/middlewares/validator.middleware.js";
import { TimesheetPostSchema, TimesheetUpdateSchema } from "@syncellus/modules/timesheets/schema.js";
import { authMiddleware } from "@syncellus/middlewares/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, getTimesheets);
router.get("/:id", authMiddleware, getTimesheetById);
router.post("/", authMiddleware, validate(TimesheetPostSchema), createTimesheet);
router.patch("/:id", authMiddleware, validate(TimesheetUpdateSchema), patchTimesheet);
router.delete("/:id", authMiddleware, deleteTimesheet);

export default router;
