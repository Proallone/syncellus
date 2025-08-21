import { Router } from "express";
import { validate } from "@syncellus/middlewares/validator.middleware.js";
import { EmployeeController } from "@syncellus/modules/accounts/controller.js";
import { EmployeePostSchema, EmployeePatchSchema, EmployeesGetSchema } from "@syncellus/modules/accounts/schema.js";
import { TimesheetPostSchema } from "@syncellus/modules/timesheets/schema.js";
// import { authMiddleware } from "@syncellus/middlewares/auth.middleware.js";
import { requireRole } from "@syncellus/middlewares/role.middleware.js";
import { EmployeeRepository } from "@syncellus/modules/accounts/repository.js";
import { DatabaseService } from "@syncellus/database/database.js";
import { EmployeeService } from "@syncellus/modules/accounts/service.js";
import { eventBus } from "@syncellus/core/eventBus.js";
import { UserCreatedHandler } from "./events.js";
import { TimesheetService } from "../timesheets/service.js";
import { TimesheetRepository } from "../timesheets/repository.js";
import { LoggerService } from "@syncellus/core/logger.js";
import passport from "passport";

const router = Router();
const db = DatabaseService.getInstance();

const repo = new EmployeeRepository(db);
const service = new EmployeeService(repo);

const timesheetRepo = new TimesheetRepository(db);
const timesheetService = new TimesheetService(timesheetRepo);

const controller = new EmployeeController(service, timesheetService);
const logger = LoggerService.getInstance();
new UserCreatedHandler(eventBus, repo, logger).register();

// router.use(authMiddleware);
router.use(passport.authenticate("jwt", { session: false }));

router.post("/", requireRole(["admin"]), validate(EmployeePostSchema), controller.createEmployee);
router.get("/", validate(EmployeesGetSchema), controller.getEmployees);
router.get("/:id", controller.getEmployee);
router.patch("/:id", validate(EmployeePatchSchema), controller.patchEmployee);
router.delete("/:id", requireRole(["admin"]), controller.deleteEmployee);

router.get("/:employeeId/timesheets", controller.getTimesheetsByEmployeeId);
router.post("/:employeeId/timesheets", validate(TimesheetPostSchema), controller.createTimesheetForEmployee);

export default router;
