import type { WorkspacesTimesheets } from "@syncellus/types/database.d.ts";
import type { Insertable, Updateable } from "kysely";
import { DatabaseService } from "@syncellus/database/database.ts";

const db = DatabaseService.getInstance();

export const insertTimesheetsInDb = async (
	timesheets: Insertable<WorkspacesTimesheets>[],
) => {
	return await db.insertInto("workspaces.timesheets").values(timesheets)
		.returningAll().execute();
};

export const selectAllTimesheetsFromDb = async () => {
	return await db.selectFrom("workspaces.timesheets").selectAll()
		.execute();
};

export const selectTimesheetByIdFromDb = async (id: string) => {
	return await db.selectFrom("workspaces.timesheets").selectAll().where(
		"id",
		"=",
		id,
	).executeTakeFirst();
};

export const selectTimesheetsByEmployeeIdFromDb = async (employeeId: string) => {
	return await db.selectFrom("workspaces.timesheets").selectAll().where(
		"user_id",
		"=",
		employeeId,
	).execute();
};

export const updateTimesheetByIdInDb = async (
	timesheet: Updateable<WorkspacesTimesheets>,
) => {
	return await db.updateTable("workspaces.timesheets").set(timesheet)
		.where("id", "=", timesheet.id!).returningAll().executeTakeFirst();
};

export const deleteTimesheetFromDb = async (id: string) => {
	return await db.deleteFrom("workspaces.timesheets").where(
		"id",
		"=",
		id,
	).executeTakeFirstOrThrow();
};
