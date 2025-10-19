import { z } from "@zod/zod";

const WorkspaceTaskBasePayload = z.strictObject({
  team_id: z.uuidv7(),
  name: z.string().max(256),
  description: z.string().max(256),
});

export const SingleWorkspaceTaskPostPayload = WorkspaceTaskBasePayload
  .required();
export const WorkspaceTaskUpdatePayload = WorkspaceTaskBasePayload.partial();

export const WorkspaceTaskPostSchema = z.object({
  body: WorkspaceTaskBasePayload,
});

export const WorkspaceTaskUpdateSchema = z.object({
  body: SingleWorkspaceTaskPostPayload,
});
