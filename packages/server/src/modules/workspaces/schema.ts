import { z } from "zod";

const WorkspaceTeamBasePayload = z.strictObject({
    name: z.string().max(256)
});

export const SingleWorkspaceTeamPostPayload = WorkspaceTeamBasePayload.required();
export const WorkspaceTeamUpdatePayload = WorkspaceTeamBasePayload.partial();

export const WorkspaceTeamPostPayload = z.union([SingleWorkspaceTeamPostPayload, z.array(SingleWorkspaceTeamPostPayload)]);

export const WorkspaceTeamPostSchema = z.object({
    body: WorkspaceTeamPostPayload
});

export const WorkspaceTeamUpdateSchema = z.object({
    body: SingleWorkspaceTeamPostPayload
});

const WorkspaceTeamTaskBasePayload = z.strictObject({
    team_id: z.uuidv7(),
    name: z.string().max(256),
    description: z.string().max(256)
});

export const SingleWorkspaceTeamTaskPostPayload = WorkspaceTeamTaskBasePayload.required();
export const WorkspaceTeamTaskUpdatePayload = WorkspaceTeamTaskBasePayload.partial();

export const WorkspaceTeamTaskPostSchema = z.object({
    body: WorkspaceTeamPostPayload
});

export const WorkspaceTeamTaskUpdateSchema = z.object({
    body: SingleWorkspaceTeamPostPayload
});
