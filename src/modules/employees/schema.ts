import { z } from "zod";

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
    employeePatchSchema
};
