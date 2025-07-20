import { z } from "zod";

const userPostSchema = z.object({
    body: z.object({
        name: z.string().min(3).max(255),
        surname: z.string().min(3).max(255),
        email: z.email(),
        password: z.string().min(8).max(40)
    })
});

const userPatchSchema = z.object({
    body: z.object({
        name: z.string().min(3).max(255).optional(),
        surname: z.string().min(3).max(255).optional(),
        email: z.email().optional(),
        password: z.string().min(8).max(40).optional()
    })
});

export { userPostSchema, userPatchSchema };
