import { Router } from "express";
import {
    createTimesheet,
    deleteTimesheet,
    getTimesheetById,
    getTimesheets,
    patchTimesheet
} from "./controller.js";
import { validate } from "../../middlewares/validator.middleware.js";
import { timesheetPostSchema, timesheetUpdateSchema } from "./schema.js";

const router = Router();

router.get("/", getTimesheets);
router.get("/:id", getTimesheetById);
router.post("/", validate(timesheetPostSchema), createTimesheet);
router.patch("/:id", validate(timesheetUpdateSchema), patchTimesheet);
router.delete("/:id", deleteTimesheet);

export default router;
