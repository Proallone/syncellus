import { z } from "zod";

const TimesheetBasePayload = z.strictObject({
    user_id: z.uuidv7(), //TODO move this to be server provisioned based on jwt
    task_id: z.uuidv7(),
    date: z.iso.date(),
    start_hour: z.iso.time(),
    end_hour: z.iso.time()
});

const SingleTimesheetPostPayload = TimesheetBasePayload.required();
const TimesheetUpdatePayload = TimesheetBasePayload.partial();

const TimesheetPostPayload = z.union([SingleTimesheetPostPayload, z.array(SingleTimesheetPostPayload)]);

const TimesheetPostSchema = z.object({
    body: TimesheetPostPayload
});

const TimesheetUpdateSchema = z.object({
    body: SingleTimesheetPostPayload
});

export { TimesheetPostPayload, TimesheetPostSchema, TimesheetUpdatePayload, TimesheetUpdateSchema };
