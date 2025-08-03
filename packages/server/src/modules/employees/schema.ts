import { z } from "zod";

const EmployeeBasePayload = z.strictObject({
    user_id: z.int().gt(0),
    name: z.string().min(3).max(255),
    surname: z.string().min(3).max(255)
});

const EmployeePostPayload = EmployeeBasePayload.required();
const EmployeeUpdatePalyoad = EmployeeBasePayload.partial();

const employeeGetQuery = z.object({
    is_active: z.enum(["true", "false"]).optional(),
    role: z.enum(["employee", "manager", "admin"]).optional() //TODO fix later so multiple roles are available to query
});

const EmployeesGetSchema = z.object({
    query: employeeGetQuery
});

const EmployeePostSchema = z.object({
    body: EmployeePostPayload
});

const EmployeePatchSchema = z.object({
    body: EmployeeUpdatePalyoad
});

export { EmployeePostPayload, EmployeePostSchema, EmployeeUpdatePalyoad, EmployeePatchSchema, employeeGetQuery, EmployeesGetSchema };
