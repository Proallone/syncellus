import { z } from "@zod/zod";

const WorkspaceTeamBasePayload = z.strictObject({
  name: z.string().max(256),
});

export const SingleWorkspaceTeamPostPayload = WorkspaceTeamBasePayload
  .required();
export const WorkspaceTeamUpdatePayload = WorkspaceTeamBasePayload.partial();

export const WorkspaceTeamPostPayload = z.union([
  SingleWorkspaceTeamPostPayload,
  z.array(SingleWorkspaceTeamPostPayload),
]);

export const WorkspaceTeamPostSchema = z.object({
  body: WorkspaceTeamPostPayload,
});

export const WorkspaceTeamUpdateSchema = z.object({
  body: SingleWorkspaceTeamPostPayload,
});
