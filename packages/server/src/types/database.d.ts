import type { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely";

export interface Database {
    auth_users: UsersTable;
    auth_roles: RolesTable;
    auth_scopes: ScopesTable;
    auth_role_scopes: RoleScopesTable;
    auth_user_roles: UserRolesTable;
    auth_password_reset_tokens: PasswordResetTokensTable;
    auth_email_verification_tokens: EmailVerificationTokensTable;
    accounts_profiles: ProfilesTable;
    timesheets_entries: TimesheetTable;
    workspaces_teams: TeamsTable;
    workspaces_team_members: TeamMembersTable;
    workspaces_team_roles: TeamRolesTable;
}

export interface UsersTable {
    id: Generated<string>;
    public_id: Generated<string>;
    email: string;
    password: string;
    created_at: ColumnType<Date, string | undefined, never>;
    modified_at: ColumnType<Date, string | undefined, never>;
    verified: Generated<number>;
    active: Generated<number>;
}

export type User = Selectable<UsersTable>;
export type NewUser = Insertable<UsersTable>;
export type UserUpdate = Updateable<UsersTable>;

export interface RolesTable {
    id: Generated<string>;
    name: string;
    description: string;
    created_at: ColumnType<Date, string | undefined, never>;
    modified_at: ColumnType<Date, string | undefined, never>;
}

export type Role = Selectable<RolesTable>;
export type NewRole = Insertable<RolesTable>;
export type RoleUpdate = Updateable<RolesTable>;

export interface ScopesTable {
    id: Generated<string>;
    scope: string;
    description: string;
    created_at: ColumnType<Date, string | undefined, never>;
    modified_at: ColumnType<Date, string | undefined, never>;
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
    created_at: ColumnType<Date, string | undefined, never>;
}

export type PasswordResetToken = Selectable<PasswordResetTokensTable>;
export type NewPasswordResetToken = Insertable<PasswordResetTokensTable>;
export type PasswordResetTokenUpdate = Updateable<PasswordResetTokensTable>;

export interface EmailVerificationTokensTable {
    id: Generated<string>;
    user_id: string;
    token_hash: string;
    expires_at: ColumnType<string | undefined, never>;
    created_at: ColumnType<Date, string | undefined, never>;
}

export type EmailVerificationToken = Selectable<EmailVerificationTokensTable>;
export type NewEmailVerificationToken = Insertable<EmailVerificationTokensTable>;
export type EmailVerificationTokenUpdate = Updateable<EmailVerificationTokensTable>;

export interface ProfilesTable {
    id: Generated<string>;
    user_id: string;
    name: string | undefined;
    surname: string | undefined;
    created_at: ColumnType<Date, string | undefined, never>;
    modified_at: ColumnType<Date, string | undefined, never>;
}

export type Employee = Selectable<ProfilesTable>;
export type NewEmployee = Insertable<ProfilesTable>;
export type EmployeeUpdate = Updateable<ProfilesTable>;

export interface TimesheetTable {
    id: Generated<string>;
    employee_id: string;
    created_at: ColumnType<Date, string | undefined, never>;
    modified_at: ColumnType<Date, string | undefined, never>;
    date: ColumnType<Date, string>;
    start_hour: ColumnType<Date, string>;
    end_hour: ColumnType<Date, string>;
    hours_worked: Generated<number>;
    status: Generated<string>;
}

export type Timesheet = Selectable<TimesheetTable>;
export type NewTimesheet = Insertable<TimesheetTable>;
export type TimesheetUpdate = Updateable<TimesheetTable>;

export interface TeamsTable {
    id: Generated<string>;
    public_id: Generated<string>;
    owner_id: string;
    name: string;
    created_at: ColumnType<Date, string | undefined, never>;
    modified_at: ColumnType<Date, string | undefined, never>;
}

export type Team = Selectable<TeamsTable>;
export type NewTeam = Insertable<TeamsTable>;
export type TeamUpdate = Updateable<TeamsTable>;

export interface TeamMembersTable {
    team_id: Generated<string>;
    user_id: Generated<string>;
    role_id: Generated<string>;
    created_at: ColumnType<Date, string | undefined, never>;
    modified_at: ColumnType<Date, string | undefined, never>;
}

export type TeamMember = Selectable<TeamMembersTable>;
export type NewTeamMember = Insertable<TeamMembersTable>;
export type TeamMemberUpdate = Updateable<TeamMembersTable>;

export interface TeamRolesTable {
    id: Generated<string>;
    name: string;
    description: string;
    created_at: ColumnType<Date, string | undefined, never>;
    modified_at: ColumnType<Date, string | undefined, never>;
}

export type TeamRole = Selectable<TeamRolesTable>;
export type NewTeamRole = Insertable<TeamRolesTable>;
export type TeamRoleUpdate = Updateable<TeamRolesTable>;
