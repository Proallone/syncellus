import { z } from "zod";

export const userSchema = z.object({
    body: z.object({
        name: z.string().min(3),
        surname: z.string().min(3),
        email: z.email()
    })
});
