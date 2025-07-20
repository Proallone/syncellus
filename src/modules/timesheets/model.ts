import db from "../../database/database.js";

export interface Timesheet {
    id?: number;
    employee_id: number;
    date: string;
    start_hour: string;
    end_hour: string;
    hours_worked: string;
    approved: boolean;
}

const createTimesheetInDb = async (timesheet: Timesheet) => {
    const query = db.prepare(
        "INSERT INTO timesheets (employee_id, date, start_hour, end_hour) VALUES (?, ?, ?, ?) RETURNING id, employee_id, createdAt, modifiedAt, date, start_hour, end_hour, hours_worked, approved;"
    );
    return query.get(
        timesheet.employee_id,
        timesheet.date,
        timesheet.start_hour,
        timesheet.end_hour
    );
};

export { createTimesheetInDb };
