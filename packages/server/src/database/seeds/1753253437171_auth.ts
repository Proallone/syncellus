import type { Kysely } from "kysely";
import type { Database, NewRole, NewRoleScope, NewScope, NewUser, NewUserRole } from "@syncellus/types/database.js";

const users: NewUser[] = [
    {
        id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
        public_id: "84ghpuj191",
        email: "bartek@test.com",
        password: "$argon2id$v=19$m=65536,t=3,p=4$hNK3M9yxMNNz/i+4SbHHKA$ac3903HBtHQ8nUD2ZAWdzUEfkioUpYDgEDlwItDrSG8",
        verified: 0,
        active: 1
    },
    {
        id: "0189f7ea-ae2f-72b9-9be8-9c3c5a60214f",
        public_id: "vigdb4t07d",
        email: "bartek@admin.com",
        password: "$argon2id$v=19$m=65536,t=3,p=4$hNK3M9yxMNNz/i+4SbHHKA$ac3903HBtHQ8nUD2ZAWdzUEfkioUpYDgEDlwItDrSG8",
        verified: 1,
        active: 1
    },
    {
        id: "0189f7ea-ae2f-72b9-9be8-9c3d224082ef",
        public_id: "pffza5gbco",
        email: "bartek@manager.com",
        password: "$argon2id$v=19$m=65536,t=3,p=4$hNK3M9yxMNNz/i+4SbHHKA$ac3903HBtHQ8nUD2ZAWdzUEfkioUpYDgEDlwItDrSG8",
        verified: 1,
        active: 1
    },
    {
        id: "0198e817-6726-75fb-be07-6edf8bdd9421",
        public_id: "081ddcee2d",
        email: "bartek@inactive.com",
        password: "$argon2id$v=19$m=65536,t=3,p=4$hNK3M9yxMNNz/i+4SbHHKA$ac3903HBtHQ8nUD2ZAWdzUEfkioUpYDgEDlwItDrSG8",
        verified: 1,
        active: 0
    }
];

const roles: NewRole[] = [
    {
        id: "0198f237-5cc2-7328-a024-03b986c7b3b5",
        name: "admin",
        description: "Standard administrator role"
    },
    {
        id: "0198f237-5cc2-70d7-a6c2-25f3796ee756",
        name: "user",
        description: "Standard user role"
    }
];

const scopes: NewScope[] = [
    {
        id: "0198f237-5cc2-76be-92fb-9e00e52ad827",
        scope: "auth_users:read",
        description: "read scope for auth_users"
    },
    {
        id: "0198f237-5cc2-7980-a50f-e0ff18289301",
        scope: "auth_users:write",
        description: "write scope for auth_users"
    }
];

const role_scopes: NewRoleScope[] = [
    {
        role_id: "0198f237-5cc2-7328-a024-03b986c7b3b5",
        scope_id: "0198f237-5cc2-76be-92fb-9e00e52ad827"
    },
    {
        role_id: "0198f237-5cc2-7328-a024-03b986c7b3b5",
        scope_id: "0198f237-5cc2-7980-a50f-e0ff18289301"
    },
    {
        role_id: "0198f237-5cc2-70d7-a6c2-25f3796ee756",
        scope_id: "0198f237-5cc2-7980-a50f-e0ff18289301"
    }
];

const user_roles: NewUserRole[] = [
    {
        user_id: "0189f7ea-ae2c-7809-8aeb-b819cf5e9e7f",
        role_id: "0198f237-5cc2-70d7-a6c2-25f3796ee756"
    },
    {
        user_id: "0189f7ea-ae2f-72b9-9be8-9c3c5a60214f",
        role_id: "0198f237-5cc2-7328-a024-03b986c7b3b5"
    },
    {
        user_id: "0189f7ea-ae2f-72b9-9be8-9c3d224082ef",
        role_id: "0198f237-5cc2-70d7-a6c2-25f3796ee756"
    },
    {
        user_id: "0198e817-6726-75fb-be07-6edf8bdd9421",
        role_id: "0198f237-5cc2-70d7-a6c2-25f3796ee756"
    }
];

export async function seed(db: Kysely<Database>): Promise<void> {
    await db.insertInto("auth_users").values(users).execute();
    await db.insertInto("auth_roles").values(roles).execute();
    await db.insertInto("auth_scopes").values(scopes).execute();
    await db.insertInto("auth_role_scopes").values(role_scopes).execute();
    await db.insertInto("auth_user_roles").values(user_roles).execute();
}
