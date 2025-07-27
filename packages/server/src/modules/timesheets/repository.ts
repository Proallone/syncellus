import { db } from "../../database/database.js";
import type { NewTimesheet, TimesheetUpdate } from "../../types/database.js";

export interface Timesheet {
    id?: number;
    employee_id: number;
    date: string;
    start_hour: string;
    end_hour: string;
    hours_worked: string;
    approved: boolean;
}

const insertTimesheetInDb = async (timesheet: NewTimesheet) => {
    return db.insertInto("timesheets").values(timesheet).returningAll().executeTakeFirst();
};

const selectAllTimesheetsFromDb = async () => {
    return await db.selectFrom("timesheets").selectAll().execute();
};

const selectTimesheetByIdFromDb = async (id: number) => {
    return await db.selectFrom("timesheets").selectAll().where("id", "=", id).executeTakeFirst();
};

const selectTimesheetsByEmployeeIdFromDb = async (employeeId: number) => {
    return await db.selectFrom("timesheets").selectAll().where("employee_id", "=", employeeId).execute();
};

const updateTimesheetByIdInDb = async (timesheet: TimesheetUpdate) => {
    return await db.updateTable("timesheets").set(timesheet).where("id", "=", Number(timesheet.id)).returningAll().executeTakeFirst();
};

const deleteTimesheetFromDb = async (id: number) => {
    return await db.deleteFrom("timesheets").where("id", "=", id).executeTakeFirstOrThrow();
};

export { insertTimesheetInDb, selectAllTimesheetsFromDb, selectTimesheetByIdFromDb, selectTimesheetsByEmployeeIdFromDb, updateTimesheetByIdInDb, deleteTimesheetFromDb };
