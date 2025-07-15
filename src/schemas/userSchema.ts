import { z } from 'zod';

export const userSchema = z.object({
    body: z.object({
        name: z.string().min(3),
    })
});