import type { Database } from "@syncellus/types/database.js";
import type { AuthCredentials } from "@syncellus/types/index.js";
import { Kysely } from "kysely";

export class AuthRepository {
    constructor(private readonly db: Kysely<Database>) {}

    public insertNewUserToDb = async (user: AuthCredentials) => {
        return await this.db.insertInto("users").values(user).returning(["id", "email", "createdAt", "modifiedAt", "is_active", "role"]).executeTakeFirst();
    };

    public selectUserByEmailFromDb = async (email: string) => {
        return await this.db.selectFrom("users").select(["id", "email", "role", "password"]).where("email", "=", email).executeTakeFirst();
    };
}
