import { Router } from "express";
import { validate } from "../../middlewares/validator.middleware.js";
import { createEmployee, createTimesheetForEmployee, deleteEmployee, getEmployee, getEmployees, getTimesheetsByEmployeeId, patchEmployee } from "./controller.js";
import { employeePostSchema, employeePatchSchema, employeesGetSchema } from "./schema.js";
import { timesheetPostSchema } from "../timesheets/schema.js";

const router = Router();

router.post("/", validate(employeePostSchema), createEmployee);
router.get("/", validate(employeesGetSchema), getEmployees);
router.get("/:id", getEmployee);
router.patch("/:id", validate(employeePatchSchema), patchEmployee);
router.delete("/:id", deleteEmployee);

router.get("/:employeeId/timesheets", getTimesheetsByEmployeeId);
router.post("/:employeeId/timesheets", validate(timesheetPostSchema), createTimesheetForEmployee);

export default router;
