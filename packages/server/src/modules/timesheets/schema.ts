import { z } from "zod";

const TimesheetBasePayload = z.strictObject({
    employee_id: z.number(), //TODO move this to be server provisioned based on jwt
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
