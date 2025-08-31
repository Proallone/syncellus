import { Router } from "express";
import { TimesheetController } from "@syncellus/modules/timesheets/controller.js";
import { validate } from "@syncellus/middlewares/validator.middleware.js";
import { TimesheetPostSchema, TimesheetUpdateSchema } from "@syncellus/modules/timesheets/schema.js";
// import { authMiddleware } from "@syncellus/middlewares/auth.middleware.js";
import { TimesheetRepository } from "@syncellus/modules/timesheets/repository.js";
import { DatabaseService } from "@syncellus/database/database.js";
import { TimesheetService } from "@syncellus/modules/timesheets/service.js";
import passport from "passport";

const router = Router();
const db = DatabaseService.getInstance();

const repo = new TimesheetRepository(db);
const service = new TimesheetService(repo);
const controller = new TimesheetController(service);

router.use(passport.authenticate("jwt", { session: false }));

router.get("/", controller.getTimesheets);
router.get("/:id", controller.getTimesheetById);
router.post("/", validate(TimesheetPostSchema), controller.createTimesheets);
router.patch("/:id", validate(TimesheetUpdateSchema), controller.patchTimesheet);
router.delete("/:id", controller.deleteTimesheet);

export default router;
