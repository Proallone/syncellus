import { z } from "zod";

export const UserInformationResponse = z.object({
    public_id: z.string().length(10),
    email: z.email(),
    created_at: z.date(),
    modified_at: z.date()
});
