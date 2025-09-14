import type { Database, NewTimesheet, TimesheetUpdate } from "@syncellus/types/database.js";
import type { Kysely } from "kysely";

export class TimesheetRepository {
    constructor(private readonly db: Kysely<Database>) {}

    public insertTimesheetsInDb = async (timesheets: NewTimesheet[]) => {
        return this.db.insertInto("timesheets_entries").values(timesheets).returningAll().execute();
    };

    public selectAllTimesheetsFromDb = async () => {
        return await this.db.selectFrom("timesheets_entries").selectAll().execute();
    };

    public selectTimesheetByIdFromDb = async (id: string) => {
        return await this.db.selectFrom("timesheets_entries").selectAll().where("id", "=", id).executeTakeFirst();
    };

    public selectTimesheetsByEmployeeIdFromDb = async (employeeId: string) => {
        return await this.db.selectFrom("timesheets_entries").selectAll().where("employee_id", "=", employeeId).execute();
    };

    public updateTimesheetByIdInDb = async (timesheet: TimesheetUpdate) => {
        return await this.db.updateTable("timesheets_entries").set(timesheet).where("id", "=", timesheet.id).returningAll().executeTakeFirst();
    };

    public deleteTimesheetFromDb = async (id: string) => {
        return await this.db.deleteFrom("timesheets_entries").where("id", "=", id).executeTakeFirstOrThrow();
    };
}
