import z from "@zod/zod";

export const workspaceTaskSchema = z.strictObject({
	team_id: z.uuidv7(),
	name: z.string().max(256),
	description: z.string().max(256),
});
