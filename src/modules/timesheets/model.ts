import { db } from "../../database/database.js";
import type { NewTimesheet } from "../../types/database.js";

export interface Timesheet {
    id?: number;
    employee_id: number;
    date: string;
    start_hour: string;
    end_hour: string;
    hours_worked: string;
    approved: boolean;
}

const createTimesheetInDb = async (timesheet: NewTimesheet) => {
    return db
        .insertInto("timesheets")
        .values(timesheet)
        .returningAll()
        .executeTakeFirst();
};

const getAllTimesheets = async () => {
    return await db.selectFrom("timesheets").selectAll().execute();
};

const getTimesheetById = async (id: number) => {
    return await db
        .selectFrom("timesheets")
        .selectAll()
        .where("id", "=", id)
        .executeTakeFirstOrThrow();
};

const deleteTimesheet = async (id: number) => {
    return await db
        .deleteFrom("timesheets")
        .where("id", "=", id)
        .executeTakeFirstOrThrow();
};

export { createTimesheetInDb, getAllTimesheets, getTimesheetById };
