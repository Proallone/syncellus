import { Router } from "express";
import {
    createEmployee,
    createTimesheetForEmployee,
    deleteEmployee,
    getEmployee,
    getEmployees,
    getTimesheetsByEmployeeId,
    patchEmployee
} from "./controller.js";
import { validateInput } from "../../middlewares/validator.middleware.js";
import {
    employeePostSchema,
    employeePatchSchema,
    employeesGetSchema
} from "./schema.js";
import { timesheetPostSchema } from "../timesheets/schema.js";

const router = Router();

router.post("/", validateInput(employeePostSchema), createEmployee);
router.get("/", validateInput(employeesGetSchema), getEmployees);
router.get("/:id", getEmployee);
router.patch("/:id", validateInput(employeePatchSchema), patchEmployee);
router.delete("/:id", deleteEmployee);

router.get("/:employeeId/timesheets", getTimesheetsByEmployeeId);
router.post(
    "/:employeeId/timesheets",
    validateInput(timesheetPostSchema),
    createTimesheetForEmployee
);

export default router;
