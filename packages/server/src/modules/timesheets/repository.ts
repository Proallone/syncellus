import type { Insertable, Updateable, Kysely } from "kysely";
import type { DB, TimesheetsEntries } from "@syncellus/types/db.js";
export class TimesheetRepository {
    constructor(private readonly db: Kysely<DB>) {}

    public insertTimesheetsInDb = async (timesheets: Insertable<TimesheetsEntries[]>) => {
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

    public updateTimesheetByIdInDb = async (timesheet: Updateable<TimesheetsEntries>) => {
        return await this.db.updateTable("timesheets_entries").set(timesheet).where("id", "=", timesheet.id).returningAll().executeTakeFirst();
    };

    public deleteTimesheetFromDb = async (id: string) => {
        return await this.db.deleteFrom("timesheets_entries").where("id", "=", id).executeTakeFirstOrThrow();
    };
}
