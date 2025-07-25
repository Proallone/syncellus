import { z } from "zod";

const timesheetPostPayload = z.object({
    date: z.iso.date(),
    start_hour: z.iso.time(),
    end_hour: z.iso.time()
});

const timesheetPostSchema = z.object({
    body: timesheetPostPayload
});

const timesheetUpdatePayload = z.object({
    date: z.iso.date().optional(),
    start_hour: z.iso.time().optional(),
    end_hour: z.iso.time().optional()
});

const timesheetUpdateSchema = z.object({
    body: timesheetUpdatePayload
});

export { timesheetPostPayload, timesheetPostSchema, timesheetUpdatePayload, timesheetUpdateSchema };
