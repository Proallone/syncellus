import { z } from "zod";

/**
 * Defines the schema for a single worksheet entry within the array.
 * It uses `z.string().datetime()` to validate the ISO 8601 format for
 * start and end times, ensuring both date and time are present.
 */
export const WorksheetBasePayload = z.strictObject({
    start_time: z.iso.datetime(),
    end_time: z.iso.datetime()
});

/**
 * Defines the complete schema for a new Timesheets submission.
 * It expects a top-level object with a user ID, a task ID, and an array of
 * worksheet entries.
 */
export const TimesheetsPostPayload = z.strictObject({
    user_id: z.uuidv7(),
    task_id: z.uuidv7(),
    timesheets: z.array(WorksheetBasePayload).min(1, "The 'timesheets' array must not be empty.")
});

/**
 * Defines the schema for a Timesheets update.
 * Using `.partial()` makes all fields optional, allowing a user to update
 * any combination of the top-level fields (like task_id) or the entire
 * `Timesheets` array.
 */
export const TimesheetsUpdatePayload = TimesheetsPostPayload.partial();

/**
 * The full schema for a POST request body, containing the new Timesheets payload.
 */
export const TimesheetsPostSchema = z.object({
    body: TimesheetsPostPayload
});

/**
 * The full schema for a PATCH/PUT request body, containing the update payload.
 */
export const TimesheetsUpdateSchema = z.object({
    body: TimesheetsUpdatePayload
});
