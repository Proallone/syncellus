import type { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely";

export interface Database {
    auth_users: UsersTable;
    auth_roles: RolesTable;
    auth_scopes: ScopesTable;
    auth_role_scopes: RoleScopesTable;
    auth_user_roles: UserRolesTable;
    auth_password_reset_tokens: PasswordResetTokensTable;
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

export interface ScopesTable {
    id: Generated<string>;
    scope: string;
    description: string;
    createdAt: ColumnType<Date, string | undefined, never>;
    modifiedAt: ColumnType<Date, string | undefined, never>;
}

export type Scope = Selectable<ScopesTable>;
export type NewScope = Insertable<ScopesTable>;
export type ScopeUpdate = Updateable<ScopesTable>;

export interface RoleScopesTable {
    role_id: Generated<string>;
    scope_id: Generated<string>;
}

export type RoleScope = Selectable<RoleScopesTable>;
export type NewRoleScope = Insertable<RoleScopesTable>;
export type RoleScopeUpdate = Updateable<RoleScopesTable>;

export interface UserRolesTable {
    user_id: Generated<string>;
    role_id: Generated<string>;
}

export type UserRole = Selectable<UserRolesTable>;
export type NewUserRole = Insertable<UserRolesTable>;
export type UserRoleUpdate = Updateable<UserRolesTable>;

export interface PasswordResetTokensTable {
    id: Generated<string>;
    user_id: string;
    token_hash: string;
    expires_at: ColumnType<string | undefined, never>;
    createdAt: ColumnType<Date, string | undefined, never>;
}

export type PasswordResetToken = Selectable<PasswordResetTokensTable>;
export type NewPasswordResetToken = Insertable<PasswordResetTokensTable>;
export type PasswordResetTokenUpdate = Updateable<PasswordResetTokensTable>;

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
