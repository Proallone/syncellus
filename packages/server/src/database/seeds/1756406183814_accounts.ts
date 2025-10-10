import type { AccountsProfiles, DB } from "@syncellus/types/database.js";
import type { Insertable, Kysely } from "kysely";
import { schema } from "../migrations/1756406769551_accounts.js";

const accounts: Insertable<AccountsProfiles>[] = [
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
    },
    {
        id: "0198e819-d89c-75a6-9a61-c076ede5ac1c",
        user_id: "0198e817-6726-75fb-be07-6edf8bdd9421",
        name: "Victor",
        surname: "Vector"
    }
];

export async function seed(db: Kysely<DB>): Promise<void> {
    await db.insertInto(`${schema}.profiles`).values(accounts).execute();
}
