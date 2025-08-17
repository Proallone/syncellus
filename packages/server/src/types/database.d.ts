import type { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely";

export interface Database {
    users: UsersTable;
    employees: EmployeeTable;
    timesheets: TimesheetTable;
}

export interface UsersTable {
    id: Generated<string>;
    public_id: Generated<string>;
    email: string;
    password: string;
    createdAt: ColumnType<Date, string | undefined, never>;
    modifiedAt: ColumnType<Date, string | undefined, never>;
    is_active: Generated<number>;
    role: string;
}

export type User = Selectable<UsersTable>;
export type NewUser = Insertable<UsersTable>;
export type UserUpdate = Updateable<UsersTable>;

export interface EmployeeTable {
    id: Generated<string>;
    user_id: string;
    name: string | undefined;
    surname: string | undefined;
    createdAt: ColumnType<Date, string | undefined, never>;
    modifiedAt: ColumnType<Date, string | undefined, never>;
}

export type Employee = Selectable<EmployeeTable>;
export type NewEmployee = Insertable<EmployeeTable>;
export type EmployeeUpdate = Updateable<EmployeeTable>;

export interface TimesheetTable {
    id: Generated<string>;
    employee_id: string;
    createdAt: ColumnType<Date, string | undefined, never>;
    modifiedAt: ColumnType<Date, string | undefined, never>;
    date: ColumnType<Date, string>;
    start_hour: ColumnType<Date, string>;
    end_hour: ColumnType<Date, string>;
    hours_worked: Generated<number>;
    status: Generated<string>;
}

export type Timesheet = Selectable<TimesheetTable>;
export type NewTimesheet = Insertable<TimesheetTable>;
export type TimesheetUpdate = Updateable<TimesheetTable>;
