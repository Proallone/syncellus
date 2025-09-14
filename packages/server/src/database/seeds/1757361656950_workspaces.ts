import type { Database, NewTeam, NewTeamMember, NewTeamRole, NewTeamTask } from "@syncellus/types/database.js";
import type { Kysely } from "kysely";

// replace `any` with your database interface.
export async function seed(db: Kysely<Database>): Promise<void> {
    // seed code goes here...
    // note: this function is mandatory. you must implement this function.
    const teams: NewTeam[] = [
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

    const members: NewTeamMember[] = [
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

    const roles: NewTeamRole[] = [
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

    const tasks: NewTeamTask[] = [
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

    await db.insertInto("workspaces_team_roles").values(roles).execute();
    await db.insertInto("workspaces_teams").values(teams).execute();
    await db.insertInto("workspaces_team_members").values(members).execute();
    await db.insertInto("workspaces_team_tasks").values(tasks).execute();
}
