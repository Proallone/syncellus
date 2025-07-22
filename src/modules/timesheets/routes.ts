import { Router } from "express";
import {
    createTimesheet,
    deleteTimesheet,
    getTimesheetById,
    getTimesheets,
    patchTimesheet
} from "./controller.js";
import { validateInput } from "../../middlewares/validator.middleware.js";
import { timesheetPostSchema, timesheetUpdateSchema } from "./schema.js";

const router = Router();

router.get("/", getTimesheets);
router.get("/:id", getTimesheetById);
router.post("/", validateInput(timesheetPostSchema), createTimesheet);
router.patch("/:id", validateInput(timesheetUpdateSchema), patchTimesheet);
router.delete("/:id", deleteTimesheet);

export default router;
