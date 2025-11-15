import type { WorkspacesTimesheets } from "@syncellus/hono/types/database.d.ts";
import type { Insertable, Updateable } from "kysely";
import { generate as uuidv7 } from "@std/uuid/unstable-v7";
import {
	deleteTimesheetFromDb,
	insertTimesheetsInDb,
	selectAllTimesheetsFromDb,
	selectTimesheetByIdFromDb,
	selectTimesheetsByEmployeeIdFromDb,
	updateTimesheetByIdInDb,
} from "@syncellus/hono/modules/workspaces/worksheets/repository.ts";

export const insertNewTimesheets = async (
	timesheets: Insertable<WorkspacesTimesheets>[],
) => {
	const values = timesheets.map((timesheet) => {
		return { ...timesheet, id: uuidv7() };
	});
	return await insertTimesheetsInDb(values);
};

export const selectAllTimesheets = async () => {
	return await selectAllTimesheetsFromDb();
};

export const selectOneTimesheetById = async (id: string) => {
	return await selectTimesheetByIdFromDb(id);
};

export const updateTimesheetById = async (
	timesheet: Updateable<WorkspacesTimesheets>,
) => {
	return await updateTimesheetByIdInDb(timesheet);
};

export const deleteTimesheetById = async (id: string) => {
	return await deleteTimesheetFromDb(id);
};

export const selectAllTimesheetsByEmployeeId = async (id: string) => {
	return await selectTimesheetsByEmployeeIdFromDb(id);
};
