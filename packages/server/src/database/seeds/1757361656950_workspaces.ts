import type {
    DB,
    WorkspacesInvitationStatuses,
    WorkspacesTasks,
    WorkspacesTeamMembers,
    WorkspacesTeamRoles,
    WorkspacesTeams,
    WorkspacesTimesheetStatuses,
    WorkspacesTimesheets
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
        },
        {
            id: "0198b9b5-233d-7e3e-ab71-5c3b10b01b63",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01994771-49cc-7459-a52d-375358c173f5",
            start_time: "2025-07-21T08:00:00Z",
            end_time: "2025-07-21T16:30:00Z",
            status_id: 0
        },
        {
            id: "0198b9b5-233d-82d3-9f5b-166e51f2115e",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01992aee-637a-72a6-a0f8-3f493d5e5a0b",
            start_time: "2025-07-21T08:00:00Z",
            end_time: "2025-07-21T16:30:00Z",
            status_id: 1
        },
        {
            id: "0198b9b5-233d-86c0-9d0b-337b5d12224d",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3c5a60214f",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-07-21T08:00:00Z",
            end_time: "2025-07-21T16:30:00Z",
            status_id: 2
        },
        {
            id: "0198b9b5-233d-89ee-910f-7f5b80a1c321",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3d224082ef",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-07-21T08:00:00Z",
            end_time: "2025-07-21T16:30:00Z",
            status_id: 3
        },
        {
            id: "0198b9b5-233d-90c7-a9a3-5c3b10b01b63",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01994771-49cc-7459-a52d-375358c173f5",
            start_time: "2025-07-22T09:00:00Z",
            end_time: "2025-07-22T17:00:00Z",
            status_id: 0
        },
        {
            id: "0198b9b5-233d-94d8-9b8e-166e51f2115e",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01992aee-637a-72a6-a0f8-3f493d5e5a0b",
            start_time: "2025-07-22T09:00:00Z",
            end_time: "2025-07-22T17:00:00Z",
            status_id: 1
        },
        {
            id: "0198b9b5-233d-98e3-a22c-337b5d12224d",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3c5a60214f",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-07-22T09:00:00Z",
            end_time: "2025-07-22T17:00:00Z",
            status_id: 2
        },
        {
            id: "0198b9b5-233d-9c3e-908a-7f5b80a1c321",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3d224082ef",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-07-22T09:00:00Z",
            end_time: "2025-07-22T17:00:00Z",
            status_id: 3
        },
        {
            id: "0198b9b5-233d-a0a9-8a9d-128c70a1e345",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01994771-49cc-7459-a52d-375358c173f5",
            start_time: "2025-07-23T08:30:00Z",
            end_time: "2025-07-23T17:30:00Z",
            status_id: 0
        },
        {
            id: "0198b9b5-233d-a4b0-9f0e-346d81f2115e",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01992aee-637a-72a6-a0f8-3f493d5e5a0b",
            start_time: "2025-07-23T08:30:00Z",
            end_time: "2025-07-23T17:30:00Z",
            status_id: 1
        },
        {
            id: "0198b9b5-233d-a8de-c21c-5f8b9e1a1c32",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3c5a60214f",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-07-23T08:30:00Z",
            end_time: "2025-07-23T17:30:00Z",
            status_id: 2
        },
        {
            id: "0198b9b5-233d-ac7a-9a0e-7c9d0f1b2c43",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3d224082ef",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-07-23T08:30:00Z",
            end_time: "2025-07-23T17:30:00Z",
            status_id: 3
        },
        {
            id: "0198b9b5-233d-af7c-9b1b-2d7c8e1a1c32",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01994771-49cc-7459-a52d-375358c173f5",
            start_time: "2025-07-24T07:45:00Z",
            end_time: "2025-07-24T16:45:00Z",
            status_id: 0
        },
        {
            id: "0198b9b5-233d-b4b1-c8a7-4f8a9e1d2b3c",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01992aee-637a-72a6-a0f8-3f493d5e5a0b",
            start_time: "2025-07-24T07:45:00Z",
            end_time: "2025-07-24T16:45:00Z",
            status_id: 1
        },
        {
            id: "0198b9b5-233d-b8d4-a0f1-6a9c1d2e3f40",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3c5a60214f",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-07-24T07:45:00Z",
            end_time: "2025-07-24T16:45:00Z",
            status_id: 2
        },
        {
            id: "0198b9b5-233d-bd1e-b2d9-8c0d1e2f3a4b",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3d224082ef",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-07-24T07:45:00Z",
            end_time: "2025-07-24T16:45:00Z",
            status_id: 3
        },
        {
            id: "0198b9b5-233d-c1a7-e3f4-0d1e2f3a4b5c",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01994771-49cc-7459-a52d-375358c173f5",
            start_time: "2025-07-25T08:15:00Z",
            end_time: "2025-07-25T17:15:00Z",
            status_id: 0
        },
        {
            id: "0198b9b5-233d-c6a8-f5e6-2c3d4e5f6a7b",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01992aee-637a-72a6-a0f8-3f493d5e5a0b",
            start_time: "2025-07-25T08:15:00Z",
            end_time: "2025-07-25T17:15:00Z",
            status_id: 1
        },
        {
            id: "0198b9b5-233d-cb7f-d8c9-4a5b6c7d8e9f",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3c5a60214f",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-07-25T08:15:00Z",
            end_time: "2025-07-25T17:15:00Z",
            status_id: 2
        },
        {
            id: "0198b9b5-233d-d03b-a9b0-6b7c8d9e0f12",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3d224082ef",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-07-25T08:15:00Z",
            end_time: "2025-07-25T17:15:00Z",
            status_id: 3
        },
        {
            id: "0198b9b5-233d-d45a-c1f0-8c9d0e1f2a3b",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01994771-49cc-7459-a52d-375358c173f5",
            start_time: "2025-07-26T07:30:00Z",
            end_time: "2025-07-26T16:00:00Z",
            status_id: 0
        },
        {
            id: "0198b9b5-233d-d871-f5b2-a0d1e2f3a4b5",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01992aee-637a-72a6-a0f8-3f493d5e5a0b",
            start_time: "2025-07-26T07:30:00Z",
            end_time: "2025-07-26T16:00:00Z",
            status_id: 1
        },
        {
            id: "0198b9b5-233d-ddc5-a8e9-c0d1e2f3a4b5",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3c5a60214f",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-07-26T07:30:00Z",
            end_time: "2025-07-26T16:00:00Z",
            status_id: 2
        },
        {
            id: "0198b9b5-233d-e21b-c1f0-e1f2a3b4c5d6",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3d224082ef",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-07-26T07:30:00Z",
            end_time: "2025-07-26T16:00:00Z",
            status_id: 3
        },
        {
            id: "0198b9b5-233d-e6b3-a9b0-0d1e2f3a4b5c",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01994771-49cc-7459-a52d-375358c173f5",
            start_time: "2025-07-27T08:00:00Z",
            end_time: "2025-07-27T17:00:00Z",
            status_id: 0
        },
        {
            id: "0198b9b5-233d-eb8c-b0c1-2d3e4f5a6b7c",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01992aee-637a-72a6-a0f8-3f493d5e5a0b",
            start_time: "2025-07-27T08:00:00Z",
            end_time: "2025-07-27T17:00:00Z",
            status_id: 1
        },
        {
            id: "0198b9b5-233d-f01f-d2c3-4d5e6f7a8b9c",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3c5a60214f",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-07-27T08:00:00Z",
            end_time: "2025-07-27T17:00:00Z",
            status_id: 2
        },
        {
            id: "0198b9b5-233d-f4b7-a8e9-6d7e8f9a0b1c",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3d224082ef",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-07-27T08:00:00Z",
            end_time: "2025-07-27T17:00:00Z",
            status_id: 3
        },
        {
            id: "0198b9b5-233e-07a8-b9c0-1d2e3f4a5b6c",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01994771-49cc-7459-a52d-375358c173f5",
            start_time: "2025-07-28T07:30:00Z",
            end_time: "2025-07-28T16:30:00Z",
            status_id: 0
        },
        {
            id: "0198b9b5-233e-0cb3-d4e5-3f4a5b6c7d8e",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01992aee-637a-72a6-a0f8-3f493d5e5a0b",
            start_time: "2025-07-28T07:30:00Z",
            end_time: "2025-07-28T16:30:00Z",
            status_id: 1
        },
        {
            id: "0198b9b5-233e-11f8-f6a7-5d8e9f0a1b2c",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3c5a60214f",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-07-28T07:30:00Z",
            end_time: "2025-07-28T16:30:00Z",
            status_id: 2
        },
        {
            id: "0198b9b5-233e-16a2-a9b0-7d8e9f0a1b2c",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3d224082ef",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-07-28T07:30:00Z",
            end_time: "2025-07-28T16:30:00Z",
            status_id: 3
        },
        {
            id: "0198b9b5-233e-1b2c-b3d4-9f0a1b2c3d4e",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01994771-49cc-7459-a52d-375358c173f5",
            start_time: "2025-07-29T08:45:00Z",
            end_time: "2025-07-29T17:00:00Z",
            status_id: 0
        },
        {
            id: "0198b9b5-233e-20d4-c4e5-bc6d7e8f9a0b",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01992aee-637a-72a6-a0f8-3f493d5e5a0b",
            start_time: "2025-07-29T08:45:00Z",
            end_time: "2025-07-29T17:00:00Z",
            status_id: 1
        },
        {
            id: "0198b9b5-233e-25f1-d5e6-df0a1b2c3d4e",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3c5a60214f",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-07-29T08:45:00Z",
            end_time: "2025-07-29T17:00:00Z",
            status_id: 2
        },
        {
            id: "0198b9b5-233e-2b7e-e6f7-fd8e9f0a1b2c",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3d224082ef",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-07-29T08:45:00Z",
            end_time: "2025-07-29T17:00:00Z",
            status_id: 3
        },
        {
            id: "0198b9b5-233e-30f1-f7a8-0d1e2f3a4b5c",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01994771-49cc-7459-a52d-375358c173f5",
            start_time: "2025-07-30T07:30:00Z",
            end_time: "2025-07-30T16:00:00Z",
            status_id: 0
        },
        {
            id: "0198b9b5-233e-35a9-a9b0-2f3a4b5c6d7e",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01992aee-637a-72a6-a0f8-3f493d5e5a0b",
            start_time: "2025-07-30T07:30:00Z",
            end_time: "2025-07-30T16:00:00Z",
            status_id: 1
        },
        {
            id: "0198b9b5-233e-3a87-b9c0-4f5a6b7c8d9e",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3c5a60214f",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-07-30T07:30:00Z",
            end_time: "2025-07-30T16:00:00Z",
            status_id: 2
        },
        {
            id: "0198b9b5-233e-3f56-c21c-6d7e8f9a0b1c",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3d224082ef",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-07-30T07:30:00Z",
            end_time: "2025-07-30T16:00:00Z",
            status_id: 3
        },
        {
            id: "0198b9b5-233e-43c1-d4e5-8f9a0b1c2d3e",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01994771-49cc-7459-a52d-375358c173f5",
            start_time: "2025-07-31T08:15:00Z",
            end_time: "2025-07-31T17:15:00Z",
            status_id: 0
        },
        {
            id: "0198b9b5-233e-48a3-e5f6-a0b1c2d3e4f5",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01992aee-637a-72a6-a0f8-3f493d5e5a0b",
            start_time: "2025-07-31T08:15:00Z",
            end_time: "2025-07-31T17:15:00Z",
            status_id: 1
        },
        {
            id: "0198b9b5-233e-4d1a-f6a7-b1c2d3e4f5a6",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3c5a60214f",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-07-31T08:15:00Z",
            end_time: "2025-07-31T17:15:00Z",
            status_id: 2
        },
        {
            id: "0198b9b5-233e-51c0-a8e9-c2d3e4f5a6b7",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3d224082ef",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-07-31T08:15:00Z",
            end_time: "2025-07-31T17:15:00Z",
            status_id: 3
        },
        {
            id: "0198b9b5-233e-561b-b9c0-d3e4f5a6b7c8",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01994771-49cc-7459-a52d-375358c173f5",
            start_time: "2025-08-01T07:30:00Z",
            end_time: "2025-08-01T16:00:00Z",
            status_id: 0
        },
        {
            id: "0198b9b5-233e-5a6b-c2d3-e4f5a6b7c8d9",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01992aee-637a-72a6-a0f8-3f493d5e5a0b",
            start_time: "2025-08-01T07:30:00Z",
            end_time: "2025-08-01T16:00:00Z",
            status_id: 1
        },
        {
            id: "0198b9b5-233e-5f12-d5e6-f7a8b9c0d1e2",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3c5a60214f",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-08-01T07:30:00Z",
            end_time: "2025-08-01T16:00:00Z",
            status_id: 2
        },
        {
            id: "0198b9b5-233e-63f5-e6f7-0d1e2f3a4b5c",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3d224082ef",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-08-01T07:30:00Z",
            end_time: "2025-08-01T16:00:00Z",
            status_id: 3
        },
        {
            id: "0198b9b5-233e-68a9-f0a1-2b3c4d5e6f7a",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01994771-49cc-7459-a52d-375358c173f5",
            start_time: "2025-08-02T08:00:00Z",
            end_time: "2025-08-02T17:00:00Z",
            status_id: 0
        },
        {
            id: "0198b9b5-233e-6d12-a1b2-4c5d6e7f8a9b",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01992aee-637a-72a6-a0f8-3f493d5e5a0b",
            start_time: "2025-08-02T08:00:00Z",
            end_time: "2025-08-02T17:00:00Z",
            status_id: 1
        },
        {
            id: "0198b9b5-233e-72e7-c3d4-6f7a8b9c0d1e",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3c5a60214f",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-08-02T08:00:00Z",
            end_time: "2025-08-02T17:00:00Z",
            status_id: 2
        },
        {
            id: "0198b9b5-233e-77a3-e4f5-8d9e0f1a2b3c",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3d224082ef",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-08-02T08:00:00Z",
            end_time: "2025-08-02T17:00:00Z",
            status_id: 3
        },
        {
            id: "0198b9b5-233e-7c5e-f5a6-ad2e3f4a5b6c",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01994771-49cc-7459-a52d-375358c173f5",
            start_time: "2025-08-03T07:45:00Z",
            end_time: "2025-08-03T16:45:00Z",
            status_id: 0
        },
        {
            id: "0198b9b5-233e-81c9-a1b2-ce4d5e6f7a8b",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01992aee-637a-72a6-a0f8-3f493d5e5a0b",
            start_time: "2025-08-03T07:45:00Z",
            end_time: "2025-08-03T16:45:00Z",
            status_id: 1
        },
        {
            id: "0198b9b5-233e-86b0-c2d3-e0f1a2b3c4d5",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3c5a60214f",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-08-03T07:45:00Z",
            end_time: "2025-08-03T16:45:00Z",
            status_id: 2
        },
        {
            id: "0198b9b5-233e-8b1d-d4e5-f2a3b4c5d6e7",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3d224082ef",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-08-03T07:45:00Z",
            end_time: "2025-08-03T16:45:00Z",
            status_id: 3
        },
        {
            id: "0198b9b5-233e-90c2-e6f7-0d1e2f3a4b5c",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01994771-49cc-7459-a52d-375358c173f5",
            start_time: "2025-08-04T08:30:00Z",
            end_time: "2025-08-04T17:30:00Z",
            status_id: 0
        },
        {
            id: "0198b9b5-233e-95d1-a9b0-2b3c4d5e6f7a",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01992aee-637a-72a6-a0f8-3f493d5e5a0b",
            start_time: "2025-08-04T08:30:00Z",
            end_time: "2025-08-04T17:30:00Z",
            status_id: 1
        },
        {
            id: "0198b9b5-233e-9a1f-b2c3-4d5e6f7a8b9c",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3c5a60214f",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-08-04T08:30:00Z",
            end_time: "2025-08-04T17:30:00Z",
            status_id: 2
        },
        {
            id: "0198b9b5-233e-9f0e-d4e5-6b7c8d9e0f12",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3d224082ef",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-08-04T08:30:00Z",
            end_time: "2025-08-04T17:30:00Z",
            status_id: 3
        },
        {
            id: "0198b9b5-233e-a3d8-e5f6-8c9d0e1f2a3b",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01994771-49cc-7459-a52d-375358c173f5",
            start_time: "2025-08-05T07:30:00Z",
            end_time: "2025-08-05T16:00:00Z",
            status_id: 0
        },
        {
            id: "0198b9b5-233e-a892-a9b0-ad2e3f4a5b6c",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01992aee-637a-72a6-a0f8-3f493d5e5a0b",
            start_time: "2025-08-05T07:30:00Z",
            end_time: "2025-08-05T16:00:00Z",
            status_id: 1
        },
        {
            id: "0198b9b5-233e-ac7f-b2c3-bf4a5b6c7d8e",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3c5a60214f",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-08-05T07:30:00Z",
            end_time: "2025-08-05T16:00:00Z",
            status_id: 2
        },
        {
            id: "0198b9b5-233e-b12e-d4e5-d1e2f3a4b5c6",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3d224082ef",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-08-05T07:30:00Z",
            end_time: "2025-08-05T16:00:00Z",
            status_id: 3
        },
        {
            id: "0198b9b5-233e-b6a8-f5b2-a0d1e2f3a4b5",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01994771-49cc-7459-a52d-375358c173f5",
            start_time: "2025-08-06T08:00:00Z",
            end_time: "2025-08-06T17:00:00Z",
            status_id: 0
        },
        {
            id: "0198b9b5-233e-bb3f-a9b0-c0d1e2f3a4b5",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01992aee-637a-72a6-a0f8-3f493d5e5a0b",
            start_time: "2025-08-06T08:00:00Z",
            end_time: "2025-08-06T17:00:00Z",
            status_id: 1
        },
        {
            id: "0198b9b5-233e-c01e-c21c-e1f2a3b4c5d6",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3c5a60214f",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-08-06T08:00:00Z",
            end_time: "2025-08-06T17:00:00Z",
            status_id: 2
        },
        {
            id: "0198b9b5-233e-c4f1-d5e6-f7a8b9c0d1e2",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3d224082ef",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-08-06T08:00:00Z",
            end_time: "2025-08-06T17:00:00Z",
            status_id: 3
        },
        {
            id: "0198b9b5-233e-c9e7-e7a8-1d2e3f4a5b6c",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01994771-49cc-7459-a52d-375358c173f5",
            start_time: "2025-08-07T07:30:00Z",
            end_time: "2025-08-07T16:30:00Z",
            status_id: 0
        },
        {
            id: "0198b9b5-233e-cec0-f6a7-3f4a5b6c7d8e",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01992aee-637a-72a6-a0f8-3f493d5e5a0b",
            start_time: "2025-08-07T07:30:00Z",
            end_time: "2025-08-07T16:30:00Z",
            status_id: 1
        },
        {
            id: "0198b9b5-233e-d3a9-a9b0-5d8e9f0a1b2c",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3c5a60214f",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-08-07T07:30:00Z",
            end_time: "2025-08-07T16:30:00Z",
            status_id: 2
        },
        {
            id: "0198b9b5-233e-d891-b0c1-7d8e9f0a1b2c",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3d224082ef",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-08-07T07:30:00Z",
            end_time: "2025-08-07T16:30:00Z",
            status_id: 3
        },
        {
            id: "0198b9b5-233e-dd3b-c2d3-9f0a1b2c3d4e",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01994771-49cc-7459-a52d-375358c173f5",
            start_time: "2025-08-08T08:45:00Z",
            end_time: "2025-08-08T17:00:00Z",
            status_id: 0
        },
        {
            id: "0198b9b5-233e-e2c7-d4e5-bc6d7e8f9a0b",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01992aee-637a-72a6-a0f8-3f493d5e5a0b",
            start_time: "2025-08-08T08:45:00Z",
            end_time: "2025-08-08T17:00:00Z",
            status_id: 1
        },
        {
            id: "0198b9b5-233e-e7a0-e6f7-df0a1b2c3d4e",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3c5a60214f",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-08-08T08:45:00Z",
            end_time: "2025-08-08T17:00:00Z",
            status_id: 2
        },
        {
            id: "0198b9b5-233e-ecb4-f7a8-fd8e9f0a1b2c",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3d224082ef",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-08-08T08:45:00Z",
            end_time: "2025-08-08T17:00:00Z",
            status_id: 3
        },
        {
            id: "0198b9b5-233f-02d1-a9b0-1d2e3f4a5b6c",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01994771-49cc-7459-a52d-375358c173f5",
            start_time: "2025-08-09T07:30:00Z",
            end_time: "2025-08-09T16:00:00Z",
            status_id: 0
        },
        {
            id: "0198b9b5-233f-074a-b2c3-3f4a5b6c7d8e",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01992aee-637a-72a6-a0f8-3f493d5e5a0b",
            start_time: "2025-08-09T07:30:00Z",
            end_time: "2025-08-09T16:00:00Z",
            status_id: 1
        },
        {
            id: "0198b9b5-233f-0c5f-c21c-5d8e9f0a1b2c",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3c5a60214f",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-08-09T07:30:00Z",
            end_time: "2025-08-09T16:00:00Z",
            status_id: 2
        },
        {
            id: "0198b9b5-233f-11b3-d4e5-7d8e9f0a1b2c",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3d224082ef",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-08-09T07:30:00Z",
            end_time: "2025-08-09T16:00:00Z",
            status_id: 3
        },
        {
            id: "0198b9b5-233f-163a-e6f7-9f0a1b2c3d4e",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01994771-49cc-7459-a52d-375358c173f5",
            start_time: "2025-08-10T08:00:00Z",
            end_time: "2025-08-10T17:00:00Z",
            status_id: 0
        },
        {
            id: "0198b9b5-233f-1bd0-f7a8-ad2e3f4a5b6c",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01992aee-637a-72a6-a0f8-3f493d5e5a0b",
            start_time: "2025-08-10T08:00:00Z",
            end_time: "2025-08-10T17:00:00Z",
            status_id: 1
        },
        {
            id: "0198b9b5-233f-20b1-a9b0-cd4d5e6f7a8b",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3c5a60214f",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-08-10T08:00:00Z",
            end_time: "2025-08-10T17:00:00Z",
            status_id: 2
        },
        {
            id: "0198b9b5-233f-256e-b0c1-e0f1a2b3c4d5",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3d224082ef",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-08-10T08:00:00Z",
            end_time: "2025-08-10T17:00:00Z",
            status_id: 3
        },
        {
            id: "0198b9b5-233f-2a3b-c2d3-0d1e2f3a4b5c",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01994771-49cc-7459-a52d-375358c173f5",
            start_time: "2025-08-11T07:45:00Z",
            end_time: "2025-08-11T16:45:00Z",
            status_id: 0
        },
        {
            id: "0198b9b5-233f-2f1d-d4e5-2d3e4f5a6b7c",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01992aee-637a-72a6-a0f8-3f493d5e5a0b",
            start_time: "2025-08-11T07:45:00Z",
            end_time: "2025-08-11T16:45:00Z",
            status_id: 1
        },
        {
            id: "0198b9b5-233f-33b2-e6f7-4d5e6f7a8b9c",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3c5a60214f",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-08-11T07:45:00Z",
            end_time: "2025-08-11T16:45:00Z",
            status_id: 2
        },
        {
            id: "0198b9b5-233f-38a3-f7a8-6b7c8d9e0f12",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3d224082ef",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-08-11T07:45:00Z",
            end_time: "2025-08-11T16:45:00Z",
            status_id: 3
        },
        {
            id: "0198b9b5-233f-3d90-a9b0-8c9d0e1f2a3b",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01994771-49cc-7459-a52d-375358c173f5",
            start_time: "2025-08-12T08:15:00Z",
            end_time: "2025-08-12T17:15:00Z",
            status_id: 0
        },
        {
            id: "0198b9b5-233f-42a1-c0c1-ad2e3f4a5b6c",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01992aee-637a-72a6-a0f8-3f493d5e5a0b",
            start_time: "2025-08-12T08:15:00Z",
            end_time: "2025-08-12T17:15:00Z",
            status_id: 1
        },
        {
            id: "0198b9b5-233f-47c3-d2e3-bf4a5b6c7d8e",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3c5a60214f",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-08-12T08:15:00Z",
            end_time: "2025-08-12T17:15:00Z",
            status_id: 2
        },
        {
            id: "0198b9b5-233f-4c8e-e4f5-d1e2f3a4b5c6",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3d224082ef",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-08-12T08:15:00Z",
            end_time: "2025-08-12T17:15:00Z",
            status_id: 3
        },
        {
            id: "0198b9b5-233f-51a8-f5a6-e3f4a5b6c7d8",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01994771-49cc-7459-a52d-375358c173f5",
            start_time: "2025-08-13T07:30:00Z",
            end_time: "2025-08-13T16:00:00Z",
            status_id: 0
        },
        {
            id: "0198b9b5-233f-561b-a1b2-0d1e2f3a4b5c",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01992aee-637a-72a6-a0f8-3f493d5e5a0b",
            start_time: "2025-08-13T07:30:00Z",
            end_time: "2025-08-13T16:00:00Z",
            status_id: 1
        },
        {
            id: "0198b9b5-233f-5b7c-c3d4-2f3a4b5c6d7e",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3c5a60214f",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-08-13T07:30:00Z",
            end_time: "2025-08-13T16:00:00Z",
            status_id: 2
        },
        {
            id: "0198b9b5-233f-6081-e4f5-4b5c6d7e8f9a",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3d224082ef",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-08-13T07:30:00Z",
            end_time: "2025-08-13T16:00:00Z",
            status_id: 3
        },
        {
            id: "0198b9b5-233f-65b2-a9b0-6d7e8f9a0b1c",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01994771-49cc-7459-a52d-375358c173f5",
            start_time: "2025-08-14T08:00:00Z",
            end_time: "2025-08-14T17:00:00Z",
            status_id: 0
        },
        {
            id: "0198b9b5-233f-6a7f-c2d3-8f9a0b1c2d3e",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01992aee-637a-72a6-a0f8-3f493d5e5a0b",
            start_time: "2025-08-14T08:00:00Z",
            end_time: "2025-08-14T17:00:00Z",
            status_id: 1
        },
        {
            id: "0198b9b5-233f-6fa1-d4e5-ad2e3f4a5b6c",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3c5a60214f",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-08-14T08:00:00Z",
            end_time: "2025-08-14T17:00:00Z",
            status_id: 2
        },
        {
            id: "0198b9b5-233f-74d1-e6f7-c3d4e5f6a7b8",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3d224082ef",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-08-14T08:00:00Z",
            end_time: "2025-08-14T17:00:00Z",
            status_id: 3
        },
        {
            id: "0198b9b5-233f-798c-f7a8-e4f5a6b7c8d9",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01994771-49cc-7459-a52d-375358c173f5",
            start_time: "2025-08-15T07:45:00Z",
            end_time: "2025-08-15T16:45:00Z",
            status_id: 0
        },
        {
            id: "0198b9b5-233f-7e3e-a1b2-0d1e2f3a4b5c",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01992aee-637a-72a6-a0f8-3f493d5e5a0b",
            start_time: "2025-08-15T07:45:00Z",
            end_time: "2025-08-15T16:45:00Z",
            status_id: 1
        },
        {
            id: "0198b9b5-233f-83a9-b2c3-2d3e4f5a6b7c",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3c5a60214f",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-08-15T07:45:00Z",
            end_time: "2025-08-15T16:45:00Z",
            status_id: 2
        },
        {
            id: "0198b9b5-233f-88b1-c21c-4d5e6f7a8b9c",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3d224082ef",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-08-15T07:45:00Z",
            end_time: "2025-08-15T16:45:00Z",
            status_id: 3
        },
        {
            id: "0198b9b5-233f-8d6c-d4e5-6f7a8b9c0d1e",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01994771-49cc-7459-a52d-375358c173f5",
            start_time: "2025-08-16T08:15:00Z",
            end_time: "2025-08-16T17:15:00Z",
            status_id: 0
        },
        {
            id: "0198b9b5-233f-924a-e6f7-8d9e0f1a2b3c",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01992aee-637a-72a6-a0f8-3f493d5e5a0b",
            start_time: "2025-08-16T08:15:00Z",
            end_time: "2025-08-16T17:15:00Z",
            status_id: 1
        },
        {
            id: "0198b9b5-233f-9721-f7a8-ad2e3f4a5b6c",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3c5a60214f",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-08-16T08:15:00Z",
            end_time: "2025-08-16T17:15:00Z",
            status_id: 2
        },
        {
            id: "0198b9b5-233f-9c0d-a9b0-c0d1e2f3a4b5",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3d224082ef",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-08-16T08:15:00Z",
            end_time: "2025-08-16T17:15:00Z",
            status_id: 3
        },
        {
            id: "0198b9b5-233f-a0e2-c1c2-e1f2a3b4c5d6",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01994771-49cc-7459-a52d-375358c173f5",
            start_time: "2025-08-17T07:30:00Z",
            end_time: "2025-08-17T16:00:00Z",
            status_id: 0
        },
        {
            id: "0198b9b5-233f-a5a4-d2e3-0d1e2f3a4b5c",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01992aee-637a-72a6-a0f8-3f493d5e5a0b",
            start_time: "2025-08-17T07:30:00Z",
            end_time: "2025-08-17T16:00:00Z",
            status_id: 1
        },
        {
            id: "0198b9b5-233f-aa4e-e4f5-2f3a4b5c6d7e",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3c5a60214f",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-08-17T07:30:00Z",
            end_time: "2025-08-17T16:00:00Z",
            status_id: 2
        },
        {
            id: "0198b9b5-233f-af1b-f7a8-4b5c6d7e8f9a",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3d224082ef",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-08-17T07:30:00Z",
            end_time: "2025-08-17T16:00:00Z",
            status_id: 3
        },
        {
            id: "0198b9b5-233f-b4c5-a9b0-6d7e8f9a0b1c",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01994771-49cc-7459-a52d-375358c173f5",
            start_time: "2025-08-18T08:00:00Z",
            end_time: "2025-08-18T17:00:00Z",
            status_id: 0
        },
        {
            id: "0198b9b5-233f-b9d2-b2c3-8f9a0b1c2d3e",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01992aee-637a-72a6-a0f8-3f493d5e5a0b",
            start_time: "2025-08-18T08:00:00Z",
            end_time: "2025-08-18T17:00:00Z",
            status_id: 1
        },
        {
            id: "0198b9b5-233f-bf1c-d4e5-ad2e3f4a5b6c",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3c5a60214f",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-08-18T08:00:00Z",
            end_time: "2025-08-18T17:00:00Z",
            status_id: 2
        },
        {
            id: "0198b9b5-233f-c3ea-e6f7-c3d4e5f6a7b8",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3d224082ef",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-08-18T08:00:00Z",
            end_time: "2025-08-18T17:00:00Z",
            status_id: 3
        },
        {
            id: "0198b9b5-233f-c8d4-f7a8-e4f5a6b7c8d9",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01994771-49cc-7459-a52d-375358c173f5",
            start_time: "2025-08-19T07:45:00Z",
            end_time: "2025-08-19T16:45:00Z",
            status_id: 0
        },
        {
            id: "0198b9b5-233f-cde1-a9b0-0d1e2f3a4b5c",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01992aee-637a-72a6-a0f8-3f493d5e5a0b",
            start_time: "2025-08-19T07:45:00Z",
            end_time: "2025-08-19T16:45:00Z",
            status_id: 1
        },
        {
            id: "0198b9b5-233f-d239-c2d3-2f3a4b5c6d7e",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3c5a60214f",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-08-19T07:45:00Z",
            end_time: "2025-08-19T16:45:00Z",
            status_id: 2
        },
        {
            id: "0198b9b5-233f-d74a-d4e5-4d5e6f7a8b9c",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3d224082ef",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-08-19T07:45:00Z",
            end_time: "2025-08-19T16:45:00Z",
            status_id: 3
        },
        {
            id: "0198b9b5-233f-dc9e-e6f7-6f7a8b9c0d1e",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01994771-49cc-7459-a52d-375358c173f5",
            start_time: "2025-08-20T08:15:00Z",
            end_time: "2025-08-20T17:15:00Z",
            status_id: 0
        },
        {
            id: "0198b9b5-233f-e1a5-f7a8-8d9e0f1a2b3c",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01992aee-637a-72a6-a0f8-3f493d5e5a0b",
            start_time: "2025-08-20T08:15:00Z",
            end_time: "2025-08-20T17:15:00Z",
            status_id: 1
        },
        {
            id: "0198b9b5-233f-e6bc-a9b0-ad2e3f4a5b6c",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3c5a60214f",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-08-20T08:15:00Z",
            end_time: "2025-08-20T17:15:00Z",
            status_id: 2
        },
        {
            id: "0198b9b5-233f-eb51-c2d3-bf4a5b6c7d8e",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3d224082ef",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-08-20T08:15:00Z",
            end_time: "2025-08-20T17:15:00Z",
            status_id: 3
        },
        {
            id: "0198b9b5-233f-f06b-d4e5-d1e2f3a4b5c6",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01994771-49cc-7459-a52d-375358c173f5",
            start_time: "2025-08-21T07:30:00Z",
            end_time: "2025-08-21T16:00:00Z",
            status_id: 0
        },
        {
            id: "0198b9b5-233f-f519-e6f7-f2a3b4c5d6e7",
            user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
            task_id: "01992aee-637a-72a6-a0f8-3f493d5e5a0b",
            start_time: "2025-08-21T07:30:00Z",
            end_time: "2025-08-21T16:00:00Z",
            status_id: 1
        },
        {
            id: "0198b9b5-233f-fa5a-f7a8-0d1e2f3a4b5c",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3c5a60214f",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-08-21T07:30:00Z",
            end_time: "2025-08-21T16:00:00Z",
            status_id: 2
        },
        {
            id: "0198b9b5-2340-00f1-a9b0-2f3a4b5c6d7e",
            user_id: "0189f7ea-ae2f-72b9-9be8-9c3d224082ef",
            task_id: "01992aee-dbfe-7035-82b2-d5859e3e315f",
            start_time: "2025-08-21T07:30:00Z",
            end_time: "2025-08-21T16:00:00Z",
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
