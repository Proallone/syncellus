import type { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely";

export interface Database {
    auth_users: UsersTable;
    accounts_profiles: ProfilesTable;
    timesheets_entries: TimesheetTable;
}

export interface UsersTable {
    id: Generated<string>;
    public_id: Generated<string>;
    email: string;
    password: string;
    createdAt: ColumnType<Date, string | undefined, never>;
    modifiedAt: ColumnType<Date, string | undefined, never>;
    active: Generated<number>;
}

export type User = Selectable<UsersTable>;
export type NewUser = Insertable<UsersTable>;
export type UserUpdate = Updateable<UsersTable>;

export interface RolesTable {
    id: Generated<string>;
    name: string;
    description: string;
    createdAt: ColumnType<Date, string | undefined, never>;
    modifiedAt: ColumnType<Date, string | undefined, never>;
}

export type Role = Selectable<RolesTable>;
export type NewRole = Insertable<RolesTable>;
export type RoleUpdate = Updateable<RolesTable>;

export interface ProfilesTable {
    id: Generated<string>;
    user_id: string;
    name: string | undefined;
    surname: string | undefined;
    createdAt: ColumnType<Date, string | undefined, never>;
    modifiedAt: ColumnType<Date, string | undefined, never>;
}

export type Employee = Selectable<ProfilesTable>;
export type NewEmployee = Insertable<ProfilesTable>;
export type EmployeeUpdate = Updateable<ProfilesTable>;

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
