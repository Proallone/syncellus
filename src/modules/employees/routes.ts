import { Router } from "express";
import {
    createEmployee,
    deleteEmployee,
    getEmployee,
    getEmployees,
    patchEmployee
} from "./controller.js";
import { validateInput } from "../../middlewares/validator.middleware.js";
import { employeePostSchema, employeePatchSchema } from "./schema.js";

const router = Router();

router.post("/", validateInput(employeePostSchema), createEmployee);
router.get("/", getEmployees);
router.get("/:id", getEmployee);
router.patch("/:id", validateInput(employeePatchSchema), patchEmployee);
router.delete("/:id", deleteEmployee);

export default router;
