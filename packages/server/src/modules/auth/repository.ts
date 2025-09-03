import type { Database, NewPasswordResetToken, NewUser, User } from "@syncellus/types/database.js";
import type { IAuthRepository } from "@syncellus/modules/auth/types.js";
import { DeleteResult, Kysely } from "kysely";

export class AuthRepository implements IAuthRepository {
    constructor(private readonly db: Kysely<Database>) {}

    public insertNewUser = async (user: NewUser) => {
        return await this.db.insertInto("auth_users").values(user).returningAll().executeTakeFirst();
    };

    public selectUserByEmail = async (email: string) => {
        return await this.db.selectFrom("auth_users").selectAll().where("email", "=", email).executeTakeFirst();
    };

    public selectUserByID = async (id: string) => {
        return await this.db.selectFrom("auth_users").select(["id"]).where("id", "=", id).executeTakeFirst();
    };

    public selectUserByPublicID = async (public_id: string): Promise<User> => {
        return await this.db.selectFrom("auth_users").selectAll().where("public_id", "=", public_id).executeTakeFirst();
    };

    public updateUserPassword = async (id: string, newPassword: string) => {
        return await this.db.updateTable("auth_users").set({ password: newPassword }).where("id", "=", id).returningAll().executeTakeFirst();
    };

    public getUserRoles = async (user_public_id: string): Promise<string[]> => {
        const { id } = await this.selectUserByPublicID(user_public_id);
        const roles = await this.db
            .selectFrom("auth_user_roles")
            .innerJoin("auth_roles", "auth_user_roles.role_id", "auth_roles.id")
            .select("auth_roles.name")
            .where("auth_user_roles.user_id", "=", id)
            .execute();

        return roles.map((role) => role.name);
    };

    public getUserScopes = async (user_public_id: string): Promise<string[]> => {
        const { id } = await this.selectUserByPublicID(user_public_id);

        const scopes = await this.db
            .selectFrom("auth_user_roles")
            .innerJoin("auth_role_scopes", "auth_user_roles.role_id", "auth_role_scopes.role_id")
            .innerJoin("auth_scopes", "auth_role_scopes.scope_id", "auth_scopes.id")
            .select("auth_scopes.scope")
            .where("auth_user_roles.user_id", "=", id)
            .execute();

        return scopes.map((scope) => scope.scope);
    };

    public insertPasswordResetToken = async (entry: NewPasswordResetToken) => {
        return await this.db.insertInto("auth_password_reset_tokens").values(entry).returningAll().executeTakeFirst();
    };

    public selectPasswordResetTokenByHash = async (tokenHash: string) => {
        return await this.db.selectFrom("auth_password_reset_tokens").selectAll().where("auth_password_reset_tokens.token_hash", "=", tokenHash).executeTakeFirst();
    };

    public deletePasswordResetTokenByID = async (id: string): Promise<DeleteResult> => {
        return await this.db.deleteFrom("auth_password_reset_tokens").where("auth_password_reset_tokens.id", "=", id).executeTakeFirst();
    };
}
