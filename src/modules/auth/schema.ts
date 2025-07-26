import { z } from "zod";

const AuthBasePayload = z.object({
    email: z.email(),
    password: z.string().min(8).max(40)
});

const AuthSchema = z.object({
    body: AuthBasePayload
});

export { AuthSchema, AuthBasePayload };
