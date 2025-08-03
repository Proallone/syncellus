import { z } from "zod";

const TimesheetBasePayload = z.strictObject({
    employee_id: z.number(), //TODO move this to be server provisioned based on jwt
    date: z.iso.date(),
    start_hour: z.iso.time(),
    end_hour: z.iso.time()
});

const TimesheetPostPayload = TimesheetBasePayload.required();
const TimesheetUpdatePayload = TimesheetBasePayload.partial();

const TimesheetPostSchema = z.object({
    body: TimesheetPostPayload
});

const TimesheetUpdateSchema = z.object({
    body: TimesheetUpdatePayload
});

export { TimesheetPostPayload, TimesheetPostSchema, TimesheetUpdatePayload, TimesheetUpdateSchema };
