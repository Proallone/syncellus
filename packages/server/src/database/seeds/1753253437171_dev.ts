import type { Kysely } from "kysely";
import type { Database, NewEmployee, NewTimesheet, NewUser } from "@syncellus/types/database.js";

const users: NewUser[] = [
    {
        id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
        public_id: "84ghpuj191",
        email: "bartek@test.com",
        password: "$2a$12$VTsLufkVlFbUtCSuE31ku.D1uLlSNpC4/uZAMKm0QWF/j5SmPBXcC",
        role: "employee"
    },
    {
        id: "0189f7ea-ae2f-72b9-9be8-9c3c5a60214f",
        public_id: "vigdb4t07d",
        email: "bartek@admin.com",
        password: "$2a$12$VTsLufkVlFbUtCSuE31ku.D1uLlSNpC4/uZAMKm0QWF/j5SmPBXcC",
        role: "admin"
    },
    {
        id: "0189f7ea-ae2f-72b9-9be8-9c3d224082ef",
        public_id: "pffza5gbco",
        email: "bartek@manager.com",
        password: "$2a$12$VTsLufkVlFbUtCSuE31ku.D1uLlSNpC4/uZAMKm0QWF/j5SmPBXcC",
        role: "manager"
    }
];

const employees: NewEmployee[] = [
    {
        id: "0198b988-0a22-71af-990a-7dce68a5114f",
        user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
        name: "Bartosz",
        surname: "Testowy"
    },
    {
        id: "0198b988-4ae8-7270-9d2f-7d5ab175dd79",
        user_id: "0189f7ea-ae2f-72b9-9be8-9c3c5a60214f",
        name: "Erik",
        surname: "Turing"
    },
    {
        id: "0198b988-5f96-73a2-89b2-483cb2cd4e64",
        user_id: "0189f7ea-ae2f-72b9-9be8-9c3d224082ef",
        name: "Elisabeth",
        surname: "Turner"
    }
];

// These are the randomly generated statuses for each entry.
// The actual values will vary if you run a random generator yourself.
const timesheets: NewTimesheet[] = [
    {
        employee_id: "0198b988-0a22-71af-990a-7dce68a5114f",
        date: "2025-05-20",
        start_hour: "08:40",
        end_hour: "16:20",
        status: "submitted"
    },
    {
        employee_id: "0198b988-4ae8-7270-9d2f-7d5ab175dd79",
        date: "2025-05-20",
        start_hour: "09:00",
        end_hour: "17:00",
        status: "approved"
    },
    {
        employee_id: "0198b988-5f96-73a2-89b2-483cb2cd4e64",
        date: "2025-05-20",
        start_hour: "08:00",
        end_hour: "16:30",
        status: "draft"
    },
    {
        employee_id: "0198b988-0a22-71af-990a-7dce68a5114f",
        date: "2025-05-21",
        start_hour: "09:15",
        end_hour: "17:30",
        status: "rejected"
    }
];

export async function seed(db: Kysely<Database>): Promise<void> {
    await db.insertInto("users").values(users).execute();
    await db.insertInto("employees").values(employees).execute();
    await db.insertInto("timesheets").values(timesheets).execute();
}
