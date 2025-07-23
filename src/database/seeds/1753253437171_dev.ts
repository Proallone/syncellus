import type { Kysely } from "kysely";
import type { Database, NewTimesheet, NewUser } from "../../types/database.js";

const users: NewUser[] = [
    {
        email: "bartek@test.com",
        password:
            "$2a$12$VTsLufkVlFbUtCSuE31ku.D1uLlSNpC4/uZAMKm0QWF/j5SmPBXcC",
        role: "employee"
    },
    {
        email: "bartek@admin.com",
        password:
            "$2a$12$VTsLufkVlFbUtCSuE31ku.D1uLlSNpC4/uZAMKm0QWF/j5SmPBXcC",
        role: "admin"
    },
    {
        email: "bartek@manager.com",
        password:
            "$2a$12$VTsLufkVlFbUtCSuE31ku.D1uLlSNpC4/uZAMKm0QWF/j5SmPBXcC",
        role: "manager"
    }
];

const timesheets: NewTimesheet[] = [
    {
        employee_id: 1,
        date: "2025-05-20",
        start_hour: "08:40",
        end_hour: "16:20"
    },
    {
        employee_id: 2,
        date: "2025-05-20",
        start_hour: "09:00",
        end_hour: "17:00"
    },
    {
        employee_id: 3,
        date: "2025-05-20",
        start_hour: "08:00",
        end_hour: "16:30"
    },
    {
        employee_id: 1,
        date: "2025-05-21",
        start_hour: "09:15",
        end_hour: "17:30"
    },
    {
        employee_id: 2,
        date: "2025-05-21",
        start_hour: "08:30",
        end_hour: "16:50"
    },
    {
        employee_id: 3,
        date: "2025-05-21",
        start_hour: "09:00",
        end_hour: "17:00"
    },
    {
        employee_id: 1,
        date: "2025-05-22",
        start_hour: "08:00",
        end_hour: "16:00"
    },
    {
        employee_id: 2,
        date: "2025-05-22",
        start_hour: "09:00",
        end_hour: "17:00"
    },
    {
        employee_id: 3,
        date: "2025-05-22",
        start_hour: "08:45",
        end_hour: "17:15"
    },
    {
        employee_id: 1,
        date: "2025-05-23",
        start_hour: "09:00",
        end_hour: "17:00"
    },
    {
        employee_id: 2,
        date: "2025-05-23",
        start_hour: "08:15",
        end_hour: "16:30"
    },
    {
        employee_id: 3,
        date: "2025-05-23",
        start_hour: "09:30",
        end_hour: "17:45"
    },
    {
        employee_id: 1,
        date: "2025-05-26",
        start_hour: "08:30",
        end_hour: "16:45"
    },
    {
        employee_id: 2,
        date: "2025-05-26",
        start_hour: "09:00",
        end_hour: "17:00"
    },
    {
        employee_id: 3,
        date: "2025-05-26",
        start_hour: "08:10",
        end_hour: "16:50"
    },
    {
        employee_id: 1,
        date: "2025-05-27",
        start_hour: "09:00",
        end_hour: "17:10"
    },
    {
        employee_id: 2,
        date: "2025-05-27",
        start_hour: "08:45",
        end_hour: "17:00"
    },
    {
        employee_id: 3,
        date: "2025-05-27",
        start_hour: "09:15",
        end_hour: "17:30"
    },
    {
        employee_id: 1,
        date: "2025-05-28",
        start_hour: "08:00",
        end_hour: "16:15"
    },
    {
        employee_id: 2,
        date: "2025-05-28",
        start_hour: "09:30",
        end_hour: "17:45"
    },
    {
        employee_id: 3,
        date: "2025-05-28",
        start_hour: "08:30",
        end_hour: "17:00"
    },
    {
        employee_id: 1,
        date: "2025-05-29",
        start_hour: "08:45",
        end_hour: "17:00"
    },
    {
        employee_id: 2,
        date: "2025-05-29",
        start_hour: "09:00",
        end_hour: "17:00"
    },
    {
        employee_id: 3,
        date: "2025-05-29",
        start_hour: "08:00",
        end_hour: "16:30"
    },
    {
        employee_id: 1,
        date: "2025-05-30",
        start_hour: "09:00",
        end_hour: "17:00"
    },
    {
        employee_id: 2,
        date: "2025-05-30",
        start_hour: "08:30",
        end_hour: "16:45"
    },
    {
        employee_id: 3,
        date: "2025-05-30",
        start_hour: "09:00",
        end_hour: "17:15"
    },
    {
        employee_id: 1,
        date: "2025-06-02",
        start_hour: "08:00",
        end_hour: "16:00"
    },
    {
        employee_id: 2,
        date: "2025-06-02",
        start_hour: "09:00",
        end_hour: "17:00"
    },
    {
        employee_id: 3,
        date: "2025-06-02",
        start_hour: "08:45",
        end_hour: "17:00"
    },
    {
        employee_id: 1,
        date: "2025-06-03",
        start_hour: "09:15",
        end_hour: "17:30"
    },
    {
        employee_id: 2,
        date: "2025-06-03",
        start_hour: "08:30",
        end_hour: "16:50"
    },
    {
        employee_id: 3,
        date: "2025-06-03",
        start_hour: "09:00",
        end_hour: "17:00"
    },
    {
        employee_id: 1,
        date: "2025-06-04",
        start_hour: "08:00",
        end_hour: "16:00"
    },
    {
        employee_id: 2,
        date: "2025-06-04",
        start_hour: "09:00",
        end_hour: "17:00"
    },
    {
        employee_id: 3,
        date: "2025-06-04",
        start_hour: "08:45",
        end_hour: "17:15"
    },
    {
        employee_id: 1,
        date: "2025-06-05",
        start_hour: "09:00",
        end_hour: "17:00"
    },
    {
        employee_id: 2,
        date: "2025-06-05",
        start_hour: "08:15",
        end_hour: "16:30"
    },
    {
        employee_id: 3,
        date: "2025-06-05",
        start_hour: "09:30",
        end_hour: "17:45"
    },
    {
        employee_id: 1,
        date: "2025-06-06",
        start_hour: "08:30",
        end_hour: "16:45"
    },
    {
        employee_id: 2,
        date: "2025-06-06",
        start_hour: "09:00",
        end_hour: "17:00"
    },
    {
        employee_id: 3,
        date: "2025-06-06",
        start_hour: "08:10",
        end_hour: "16:50"
    }
];

export async function seed(db: Kysely<Database>): Promise<void> {
    await db.insertInto("users").values(users).execute();
    await db.insertInto("timesheets").values(timesheets).execute();
}
