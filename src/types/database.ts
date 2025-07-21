import {
    ColumnType,
    Generated,
    Insertable,
    Selectable,
    Updateable
} from "kysely";

export interface Database {
    employees: EmployeeTable;
    timesheets: TimesheetTable;
}

export interface EmployeeTable {
    id: Generated<number>;
    name: string;
    surname: string;
    email: string;
    password: string;
    createdAt: ColumnType<Date, string | undefined, never>;
    modifiedAt: ColumnType<Date, string | undefined, never>;
}

export type Employee = Selectable<EmployeeTable>;
export type NewEmployee = Insertable<EmployeeTable>;
export type EmployeeUpdate = Updateable<EmployeeTable>;

export interface TimesheetTable {
    id: Generated<number>;
    employee_id: number;
    createdAt: ColumnType<Date, string | undefined, never>;
    modifiedAt: ColumnType<Date, string | undefined, never>;
    start_hour: ColumnType<Date, string>;
    end_hour: ColumnType<Date, string>;
    hours_worked: number;
    approved: boolean;
}

export type Timesheet = Selectable<TimesheetTable>;
export type NewTimesheet = Insertable<TimesheetTable>;
export type TimesheetUpdate = Updateable<TimesheetTable>;
