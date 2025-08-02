import { db } from "@syncellus/database/database.js";
import type { NewUser } from "@syncellus/types/database.js";

const insertNewUserToDb = async (user: NewUser) => {
    return await db.insertInto("users").values(user).returning(["id", "email", "createdAt", "modifiedAt", "is_active", "role"]).executeTakeFirst();
};

const selectUserByEmailFromDb = async (email: string) => {
    return await db.selectFrom("users").select(["id", "role", "password"]).where("email", "=", email).executeTakeFirst();
};

export { insertNewUserToDb, selectUserByEmailFromDb };
