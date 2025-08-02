import { Router } from "express";
import { validate } from "@syncellus/middlewares/validator.middleware.js";
import { createEmployee, createTimesheetForEmployee, deleteEmployee, getEmployee, getEmployees, getTimesheetsByEmployeeId, patchEmployee } from "@syncellus/modules/employees/controller.js";
import { EmployeePostSchema, EmployeePatchSchema, EmployeesGetSchema } from "@syncellus/modules/employees/schema.js";
import { TimesheetPostSchema } from "@syncellus/modules/timesheets/schema.js";
import { authMiddleware } from "@syncellus/middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.post("/", validate(EmployeePostSchema), createEmployee);
router.get("/", validate(EmployeesGetSchema), getEmployees);
router.get("/:id", getEmployee);
router.patch("/:id", validate(EmployeePatchSchema), patchEmployee);
router.delete("/:id", deleteEmployee);

router.get("/:employeeId/timesheets", getTimesheetsByEmployeeId);
router.post("/:employeeId/timesheets", validate(TimesheetPostSchema), createTimesheetForEmployee);

export default router;
