import { z } from "zod";

const WorkspaceTeamTaskBasePayload = z.strictObject({
    team_id: z.uuidv7(),
    name: z.string().max(256),
    description: z.string().max(256)
});

export const SingleWorkspaceTeamTaskPostPayload = WorkspaceTeamTaskBasePayload.required();
export const WorkspaceTeamTaskUpdatePayload = WorkspaceTeamTaskBasePayload.partial();

export const WorkspaceTeamTaskPostSchema = z.object({
    body: WorkspaceTeamTaskBasePayload
});

export const WorkspaceTeamTaskUpdateSchema = z.object({
    body: SingleWorkspaceTeamTaskPostPayload
});
