import { z } from "zod";

const timesheetPostSchema = z.object({
    body: z.object({
        date: z.iso.date(),
        start_hour: z.iso.time(),
        end_hour: z.iso.time()
    })
});

export { timesheetPostSchema };
