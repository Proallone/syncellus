import { z } from "zod";

export const UserInformationResponse = z.object({
    public_id: z.string().length(10),
    email: z.email(),
    createdAt: z.preprocess((val: string) => new Date(val.replace(" ", "T") + "Z").toISOString(), z.iso.datetime()),
    modifiedAt: z.preprocess((val: string) => new Date(val.replace(" ", "T") + "Z").toISOString(), z.iso.datetime())
});
