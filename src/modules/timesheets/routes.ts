import { Router } from "express";
import {
    createTimesheet,
    getTimesheetById,
    getTimesheets
} from "./controller.js";
import { validateInput } from "../../middlewares/validator.middleware.js";
import { timesheetPostSchema } from "./schema.js";

const router = Router();

router.get("/", getTimesheets);
router.get("/:id", getTimesheetById);
router.post("/", validateInput(timesheetPostSchema), createTimesheet);

export default router;
