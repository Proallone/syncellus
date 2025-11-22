import type { WorkspacesTimesheets } from "@syncellus/types/database.d.ts";
import type { Insertable, Updateable } from "kysely";
import { DatabaseService } from "@syncellus/database/database.ts";

const db = DatabaseService.getInstance();

const TIMESHEETS_TABLE = "workspaces.timesheets" as const;

export const insertTimesheetsInDb = async (
	timesheets: Insertable<WorkspacesTimesheets>[],
) => {
	return await db.insertInto(TIMESHEETS_TABLE).values(timesheets)
		.returningAll().execute();
};

export const selectAllTimesheetsFromDb = async () => {
	return await db.selectFrom(TIMESHEETS_TABLE).selectAll()
		.execute();
};

export const selectTimesheetByIdFromDb = async (id: string) => {
	return await db.selectFrom(TIMESHEETS_TABLE).selectAll().where(
		"id",
		"=",
		id,
	).executeTakeFirst();
};

export const selectTimesheetsByEmployeeIdFromDb = async (employeeId: string) => {
	return await db.selectFrom(TIMESHEETS_TABLE).selectAll().where(
		"user_id",
		"=",
		employeeId,
	).execute();
};

export const updateTimesheetByIdInDb = async (
	timesheet: Updateable<WorkspacesTimesheets>,
) => {
	return await db.updateTable(TIMESHEETS_TABLE).set(timesheet)
		.where("id", "=", timesheet.id!).returningAll().executeTakeFirst();
};

export const deleteTimesheetFromDb = async (id: string) => {
	return await db.deleteFrom(TIMESHEETS_TABLE).where(
		"id",
		"=",
		id,
	).executeTakeFirstOrThrow();
};
