import { z } from "zod";

const employeeGetQuery = z.object({
    is_active: z.enum(["true", "false"]).optional(),
    role: z.enum(['employee', 'manager', 'admin']).optional(), //todo fix later so multiple roles are available to query
});

const employeesGetSchema = z.object({
    query: employeeGetQuery
});

const employeePostPayload = z.object({
    name: z.string().min(3).max(255),
    surname: z.string().min(3).max(255)
});

const employeePostSchema = z.object({
    body: employeePostPayload
});

const employeeUpdatePayload = z.object({
    name: z.string().min(3).max(255).optional(),
    surname: z.string().min(3).max(255).optional()
});

const employeePatchSchema = z.object({
    body: employeeUpdatePayload
});

export {
    employeePostPayload,
    employeePostSchema,
    employeeUpdatePayload,
    employeePatchSchema,
    employeeGetQuery,
    employeesGetSchema
};
