import type { DB, WorkspacesTimesheets } from "@syncellus/types/database.js";
import type { Insertable, Kysely, Updateable } from "kysely";
import { ITimesheetsRepository } from "@syncellus/modules/workspaces/timesheets/types.js";

export class TimesheetsRepository implements ITimesheetsRepository {
    constructor(private readonly db: Kysely<DB>) {}

    public insertTimesheetsInDb = async (timesheets: Insertable<WorkspacesTimesheets>[]) => {
        return this.db.insertInto("workspaces_timesheets").values(timesheets).returningAll().execute();
    };

    public selectAllTimesheetsFromDb = async () => {
        return await this.db.selectFrom("workspaces_timesheets").selectAll().execute();
    };

    public selectTimesheetByIdFromDb = async (id: string) => {
        return await this.db.selectFrom("workspaces_timesheets").selectAll().where("id", "=", id).executeTakeFirst();
    };

    public selectTimesheetsByEmployeeIdFromDb = async (employeeId: string) => {
        return await this.db.selectFrom("workspaces_timesheets").selectAll().where("employee_id", "=", employeeId).execute();
    };

    public updateTimesheetByIdInDb = async (timesheet: Updateable<WorkspacesTimesheets>) => {
        return await this.db.updateTable("workspaces_timesheets").set(timesheet).where("id", "=", timesheet.id).returningAll().executeTakeFirst();
    };

    public deleteTimesheetFromDb = async (id: string) => {
        return await this.db.deleteFrom("workspaces_timesheets").where("id", "=", id).executeTakeFirstOrThrow();
    };
}
