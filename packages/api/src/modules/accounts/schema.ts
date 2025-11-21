import { z } from "@zod/zod";

export const accountSchema = z.strictObject({
	user_id: z.string(),
	name: z.string().min(3).max(255),
	surname: z.string().min(3).max(255),
});
