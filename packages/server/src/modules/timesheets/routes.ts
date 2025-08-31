import { Router } from "express";
import { TimesheetController } from "@syncellus/modules/timesheets/controller.js";
import { validate } from "@syncellus/middlewares/validator.middleware.js";
import { TimesheetPostSchema, TimesheetUpdateSchema } from "@syncellus/modules/timesheets/schema.js";
import { TimesheetRepository } from "@syncellus/modules/timesheets/repository.js";
import { DatabaseService } from "@syncellus/database/database.js";
import { TimesheetService } from "@syncellus/modules/timesheets/service.js";
import { hw } from "@syncellus/utils/handlerWrapper.js";
import { authenticate } from "@syncellus/middlewares/auth.middleware.js";

const router = Router();
const db = DatabaseService.getInstance();

const repo = new TimesheetRepository(db);
const service = new TimesheetService(repo);
const controller = new TimesheetController(service);

router.use(authenticate("jwt"));

router.get("/", hw(controller.getTimesheets));
router.get("/:id", hw(controller.getTimesheetById));
router.post("/", validate(TimesheetPostSchema), hw(controller.createTimesheets));
router.patch("/:id", validate(TimesheetUpdateSchema), hw(controller.patchTimesheet));
router.delete("/:id", hw(controller.deleteTimesheet));

export default router;
