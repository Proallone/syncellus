import { z } from "zod";

const authSignInPayload = z.object({
    email: z.email(),
    password: z.string().min(8).max(40)
});

const authSignInSchema = z.object({
    body: authSignInPayload
});

export { authSignInSchema, authSignInPayload };
