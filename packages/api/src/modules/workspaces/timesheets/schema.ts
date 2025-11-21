import z from "@zod/zod";

export const timesheetsSchema = z.strictObject({
	user_id: z.uuidv7(), //TODO maybe not a part of payload?
	task_id: z.uuidv7(),
	timesheets: z.array(z.strictObject({
		start_time: z.iso.datetime(),
		end_time: z.iso.datetime(),
	})).min(
		1,
		"The 'timesheets' array must not be empty.",
	),
});
