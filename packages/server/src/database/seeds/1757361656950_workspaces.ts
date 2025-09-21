import type {
    DB,
    WorkspacesInvitationStatuses,
    WorkspacesTasks,
    WorkspacesTeamMembers,
    WorkspacesTeamRoles,
    WorkspacesTeams,
    WorkspacesTimesheets,
    WorkspacesTimesheetStatuses
} from "@syncellus/types/database.js";
import type { Insertable, Kysely } from "kysely";
import { schema } from "../migrations/1757352818919_workspaces.js";

// replace `any` with your database interface.
export async function seed(db: Kysely<DB>): Promise<void> {
    // seed code goes here...
    // note: this function is mandatory. you must implement this function.
    const teams: Insertable<WorkspacesTeams>[] = [
        {
            id: "01992aed-cc90-71a0-b867-1d86fae1028a",
            public_id: "pgz2er7wwv",
            owner_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            name: "My first team"
        },
        {
            id: "01992aee-637a-72a6-a0f8-3f493d5e5a0b",
            public_id: "3zgx2ieb3x",
            owner_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            name: "My second team"
        },
        {
            id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            public_id: "k4vn86f2l5",
            owner_id: "0189f7ea-ae2f-72b9-9be8-9c3d224082ef",
            name: "Beattles"
        }
    ];

    const members: Insertable<WorkspacesTeamMembers>[] = [
        {
            team_id: "01992aed-cc90-71a0-b867-1d86fae1028a",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            role_id: "01993f74-e0f5-7325-936c-4c03d8789a1d"
        },
        {
            team_id: "01992aed-cc90-71a0-b867-1d86fae1028a",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3c5a60214f",
            role_id: "01993f76-34a9-725e-956a-082fe4867ee7"
        },
        {
            team_id: "01992aed-cc90-71a0-b867-1d86fae1028a",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3d224082ef",
            role_id: "01993f76-34a9-725e-956a-082fe4867ee7"
        },
        {
            team_id: "01992aed-cc90-71a0-b867-1d86fae1028a",
            user_id: "0198e817-6726-75fb-be07-6edf8bdd9421",
            role_id: "01993f76-34a9-725e-956a-082fe4867ee7"
        },
        {
            team_id: "01992aee-637a-72a6-a0f8-3f493d5e5a0b",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            role_id: "01993f76-34a9-725e-956a-082fe4867ee7"
        }
    ];

    const roles: Insertable<WorkspacesTeamRoles>[] = [
        {
            id: "01993f74-e0f5-7325-936c-4c03d8789a1d",
            name: "Owner",
            description: "Team owner role"
        },
        {
            id: "01993f76-34a9-725e-956a-082fe4867ee7",
            name: "Member",
            description: "Team member role"
        }
    ];

    const tasks: Insertable<WorkspacesTasks>[] = [
        {
            id: "01994771-49cc-7459-a52d-375358c173f5",
            team_id: "01992aed-cc90-71a0-b867-1d86fae1028a",
            name: "Default task",
            description: "Default task for a team"
        },
        {
            id: "01992aee-637a-72a6-a0f8-3f493d5e5a0b",
            team_id: "01992aed-cc90-71a0-b867-1d86fae1028a",
            name: "Default task",
            description: "Default task for a team"
        },
        {
            id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            team_id: "01992aed-cc90-71a0-b867-1d86fae1028a",
            name: "Default task",
            description: "Default task for a team"
        }
    ];

    const timesheets: Insertable<WorkspacesTimesheets>[] = [
        {
            id: "0198b9b5-233d-70c1-85c1-047614b54ffc",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01994771-49cc-7459-a52d-375358c173f5",
            start_time: "2025-07-20T07:30:00Z",
            end_time: "2025-07-20T17:00:00Z",
            status_id: 0
        },
        {
            id: "0198b9b5-233d-7139-896b-098ca02e83a3",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01992aee-637a-72a6-a0f8-3f493d5e5a0b",
            start_time: "2025-07-20T07:30:00Z",
            end_time: "2025-07-20T17:00:00Z",
            status_id: 1
        },
        {
            id: "0198b9b5-233d-7780-9d94-0df6f1d7e92e",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3c5a60214f",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-07-20T07:30:00Z",
            end_time: "2025-07-20T17:00:00Z",
            status_id: 2
        },
        {
            id: "0198b9b5-233d-771d-b29a-76856073c97e",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3d224082ef",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-07-20T07:30:00Z",
            end_time: "2025-07-20T17:00:00Z",
            status_id: 3
        }
    ];

    const timesheetStatuses: WorkspacesTimesheetStatuses[] = [
        {
            id: 0,
            name: "draft"
        },
        {
            id: 1,
            name: "submitted"
        },
        {
            id: 2,
            name: "approved"
        },
        {
            id: 3,
            name: "rejected"
        }
    ];

    const invitationStatuses: WorkspacesInvitationStatuses[] = [
        {
            id: 0,
            name: "pending"
        },
        {
            id: 1,
            name: "accepted"
        },
        {
            id: 2,
            name: "rejected"
        }
    ];

    await db.insertInto(`${schema}.invitation_statuses`).values(invitationStatuses).execute();
    await db.insertInto(`${schema}.timesheet_statuses`).values(timesheetStatuses).execute();
    await db.insertInto(`${schema}.team_roles`).values(roles).execute();
    await db.insertInto(`${schema}.teams`).values(teams).execute();
    await db.insertInto(`${schema}.team_members`).values(members).execute();
    await db.insertInto(`${schema}.tasks`).values(tasks).execute();
    await db.insertInto(`${schema}.timesheets`).values(timesheets).execute();
}
