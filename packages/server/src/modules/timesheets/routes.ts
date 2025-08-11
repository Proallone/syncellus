import { Router } from "express";
import { TimesheetController } from "@syncellus/modules/timesheets/controller.js";
import { validate } from "@syncellus/middlewares/validator.middleware.js";
import { TimesheetPostSchema, TimesheetUpdateSchema } from "@syncellus/modules/timesheets/schema.js";
import { authMiddleware } from "@syncellus/middlewares/auth.middleware.js";
import { TimesheetRepository } from "./repository.js";
import { DatabaseService } from "@syncellus/database/database.js";
import { TimesheetService } from "./service.js";

const router = Router();
const db = DatabaseService.getInstance();

const repo = new TimesheetRepository(db);
const service = new TimesheetService(repo);
const controller = new TimesheetController(service);

router.use(authMiddleware);

router.get("/", controller.getTimesheets);
router.get("/:id", controller.getTimesheetById);
router.post("/", validate(TimesheetPostSchema), controller.createTimesheets);
router.patch("/:id", validate(TimesheetUpdateSchema), controller.patchTimesheet);
router.delete("/:id", controller.deleteTimesheet);

export default router;
