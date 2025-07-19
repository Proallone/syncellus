import { z } from "zod";

const authSignInSchema = z.object({
    body: z.object({
        email: z.email(),
        password: z.string().min(8).max(40)
    })
});

export { authSignInSchema };
