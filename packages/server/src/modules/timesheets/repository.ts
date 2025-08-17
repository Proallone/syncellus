import type { Database, NewTimesheet, TimesheetUpdate } from "@syncellus/types/database.js";
import type { Kysely } from "kysely";

export class TimesheetRepository {
    constructor(private readonly db: Kysely<Database>) {}

    public insertTimesheetsInDb = async (timesheets: NewTimesheet[]) => {
        return this.db.insertInto("timesheets").values(timesheets).returningAll().execute();
    };

    public selectAllTimesheetsFromDb = async () => {
        return await this.db.selectFrom("timesheets").selectAll().execute();
    };

    public selectTimesheetByIdFromDb = async (id: number) => {
        return await this.db.selectFrom("timesheets").selectAll().where("id", "=", id).executeTakeFirst();
    };

    public selectTimesheetsByEmployeeIdFromDb = async (employeeId: string) => {
        return await this.db.selectFrom("timesheets").selectAll().where("employee_id", "=", employeeId).execute();
    };

    public updateTimesheetByIdInDb = async (timesheet: TimesheetUpdate) => {
        return await this.db.updateTable("timesheets").set(timesheet).where("id", "=", Number(timesheet.id)).returningAll().executeTakeFirst();
    };

    public deleteTimesheetFromDb = async (id: number) => {
        return await this.db.deleteFrom("timesheets").where("id", "=", id).executeTakeFirstOrThrow();
    };
}
