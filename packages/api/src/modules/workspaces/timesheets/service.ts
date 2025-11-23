import type { WorkspacesTimesheets } from "@syncellus/types/database.d.ts";
import type { Insertable, Updateable } from "kysely";
import {
	deleteTimesheetFromDb,
	insertTimesheetsInDb,
	selectAllTimesheetsFromDb,
	selectTimesheetByIdFromDb,
	selectTimesheetsByEmployeeIdFromDb,
	updateTimesheetByIdInDb,
} from "@syncellus/modules/workspaces/timesheets/repository.ts";
import { UUID } from "@syncellus/utils/Generators.ts";

export const insertNewTimesheets = async (
	timesheets: Insertable<WorkspacesTimesheets>[],
) => {
	const values = timesheets.map((timesheet) => {
		return { ...timesheet, id: UUID.generateV7() };
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
