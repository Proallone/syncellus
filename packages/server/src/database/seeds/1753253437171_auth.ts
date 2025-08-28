import type { Kysely } from "kysely";
import type { Database, NewUser } from "@syncellus/types/database.js";

const users: NewUser[] = [
    {
        id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
        public_id: "84ghpuj191",
        email: "bartek@test.com",
        password: "$argon2id$v=19$m=65536,t=3,p=4$hNK3M9yxMNNz/i+4SbHHKA$ac3903HBtHQ8nUD2ZAWdzUEfkioUpYDgEDlwItDrSG8",
        active: 1
    },
    {
        id: "0189f7ea-ae2f-72b9-9be8-9c3c5a60214f",
        public_id: "vigdb4t07d",
        email: "bartek@admin.com",
        password: "$argon2id$v=19$m=65536,t=3,p=4$hNK3M9yxMNNz/i+4SbHHKA$ac3903HBtHQ8nUD2ZAWdzUEfkioUpYDgEDlwItDrSG8",
        active: 1
    },
    {
        id: "0189f7ea-ae2f-72b9-9be8-9c3d224082ef",
        public_id: "pffza5gbco",
        email: "bartek@manager.com",
        password: "$argon2id$v=19$m=65536,t=3,p=4$hNK3M9yxMNNz/i+4SbHHKA$ac3903HBtHQ8nUD2ZAWdzUEfkioUpYDgEDlwItDrSG8",
        active: 1
    },
    {
        id: "0198e817-6726-75fb-be07-6edf8bdd9421",
        public_id: "081ddcee2d",
        email: "bartek@inactive.com",
        password: "$argon2id$v=19$m=65536,t=3,p=4$hNK3M9yxMNNz/i+4SbHHKA$ac3903HBtHQ8nUD2ZAWdzUEfkioUpYDgEDlwItDrSG8",
        active: 0
    }
];

export async function seed(db: Kysely<Database>): Promise<void> {
    await db.insertInto("auth_users").values(users).execute();
}
