import { z } from "zod";

export const UserInformationResponse = z.object({
    public_id: z.string().length(10),
    email: z.email(),
    created_at: z.preprocess((val: string) => new Date(val.replace(" ", "T") + "Z").toISOString(), z.iso.datetime()), //TODO move this to repo
    modified_at: z.preprocess((val: string) => new Date(val.replace(" ", "T") + "Z").toISOString(), z.iso.datetime()) //TODO move this to repo
});
