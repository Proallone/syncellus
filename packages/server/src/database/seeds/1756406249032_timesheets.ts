import type { Kysely } from "kysely";
import type { Database, NewTimesheet } from "@syncellus/types/database.js";

const timesheets: NewTimesheet[] = [
    {
        id: "0198b9b5-233d-70c1-85c1-047614b54ffc",
        employee_id: "0198b988-0a22-71af-990a-7dce68a5114f",
        date: "2025-05-20",
        start_hour: "08:40",
        end_hour: "16:20",
        status: "submitted"
    },
    {
        id: "0198b9b5-233d-7139-896b-098ca02e83a3",
        employee_id: "0198b988-4ae8-7270-9d2f-7d5ab175dd79",
        date: "2025-05-20",
        start_hour: "09:00",
        end_hour: "17:00",
        status: "approved"
    },
    {
        id: "0198b9b5-233d-7780-9d94-0df6f1d7e92e",
        employee_id: "0198b988-5f96-73a2-89b2-483cb2cd4e64",
        date: "2025-05-20",
        start_hour: "08:00",
        end_hour: "16:30",
        status: "draft"
    },
    {
        id: "0198b9b5-233d-771d-b29a-76856073c97e",
        employee_id: "0198b988-0a22-71af-990a-7dce68a5114f",
        date: "2025-05-21",
        start_hour: "09:15",
        end_hour: "17:30",
        status: "rejected"
    }
];

export async function seed(db: Kysely<Database>): Promise<void> {
    await db.insertInto("timesheets_entries").values(timesheets).execute();
}
