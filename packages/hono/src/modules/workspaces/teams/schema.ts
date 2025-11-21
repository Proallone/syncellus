import { z } from "@zod/zod";

export const workspaceTeamSchema = z.strictObject({
	name: z.string().max(256),
});
