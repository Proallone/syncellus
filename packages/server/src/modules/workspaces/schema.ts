import { z } from "zod";

const WokrspaceTeamBasePayload = z.strictObject({
    name: z.string().max(256)
});

export const SingleWorkspaceTeamPostPayload = WokrspaceTeamBasePayload.required();
export const WorkspaceTeamUpdatePayload = WokrspaceTeamBasePayload.partial();

export const WorkspaceTeamPostPayload = z.union([SingleWorkspaceTeamPostPayload, z.array(SingleWorkspaceTeamPostPayload)]);

export const WorkspaceTeamPostSchema = z.object({
    body: WorkspaceTeamPostPayload
});

export const WorkspaceTeamUpdateSchema = z.object({
    body: SingleWorkspaceTeamPostPayload
});
