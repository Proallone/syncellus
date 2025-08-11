import { Router } from "express";
import { validate } from "@syncellus/middlewares/validator.middleware.js";
import { EmployeeController } from "@syncellus/modules/employees/controller.js";
import { EmployeePostSchema, EmployeePatchSchema, EmployeesGetSchema } from "@syncellus/modules/employees/schema.js";
import { TimesheetPostSchema } from "@syncellus/modules/timesheets/schema.js";
import { authMiddleware } from "@syncellus/middlewares/auth.middleware.js";
import { requireRole } from "@syncellus/middlewares/role.middleware.js";
import { EmployeeRepository } from "@syncellus/modules/employees/repository.js";
import { db } from "@syncellus/database/database.js";
import { EmployeeService } from "@syncellus/modules/employees/service.js";
import { eventBus } from "@syncellus/core/eventBus.js";
import { UserCreatedHandler } from "./events.js";
import { TimesheetService } from "../timesheets/service.js";
import { TimesheetRepository } from "../timesheets/repository.js";

const router = Router();
const repo = new EmployeeRepository(db);
const service = new EmployeeService(repo);

const timesheetRepo = new TimesheetRepository(db);
const timesheetService = new TimesheetService(timesheetRepo);

const controller = new EmployeeController(service, timesheetService);
new UserCreatedHandler(eventBus, repo).register();

router.use(authMiddleware);

router.post("/", requireRole(["admin"]), validate(EmployeePostSchema), controller.createEmployee);
router.get("/", validate(EmployeesGetSchema), controller.getEmployees);
router.get("/:id", controller.getEmployee);
router.patch("/:id", validate(EmployeePatchSchema), controller.patchEmployee);
router.delete("/:id", requireRole(["admin"]), controller.deleteEmployee);

router.get("/:employeeId/timesheets", controller.getTimesheetsByEmployeeId);
router.post("/:employeeId/timesheets", validate(TimesheetPostSchema), controller.createTimesheetForEmployee);

export default router;
