import { Router } from "express";
import { validate } from "../../middlewares/validator.middleware.js";
import { createEmployee, createTimesheetForEmployee, deleteEmployee, getEmployee, getEmployees, getTimesheetsByEmployeeId, patchEmployee } from "./controller.js";
import { EmployeePostSchema, EmployeePatchSchema, EmployeesGetSchema } from "./schema.js";
import { TimesheetPostSchema } from "../timesheets/schema.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/", validate(EmployeePostSchema), createEmployee);
router.get("/", authMiddleware, validate(EmployeesGetSchema), getEmployees);
router.get("/:id", getEmployee);
router.patch("/:id", validate(EmployeePatchSchema), patchEmployee);
router.delete("/:id", deleteEmployee);

router.get("/:employeeId/timesheets", getTimesheetsByEmployeeId);
router.post("/:employeeId/timesheets", validate(TimesheetPostSchema), createTimesheetForEmployee);

export default router;
