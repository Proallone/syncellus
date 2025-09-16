import type { DB, AuthEmailVerificationTokens, AuthPasswordResetTokens, AuthUsers } from "@syncellus/types/database.js";
import type { IAuthRepository } from "@syncellus/modules/auth/types.js";
import { DeleteResult, Insertable, Kysely, Selectable } from "kysely";

export class AuthRepository implements IAuthRepository {
    constructor(private readonly db: Kysely<DB>) {}

    public insertNewUser = async (user: Insertable<AuthUsers>): Promise<Selectable<AuthUsers>> => {
        return await this.db.insertInto("auth_users").values(user).returningAll().executeTakeFirstOrThrow();
    };

    public verifyUserEmail = async (id: string) => {
        return await this.db.updateTable("auth_users").set({ verified: 1 }).where("id", "=", id).executeTakeFirst();
    };

    public selectUserByEmail = async (email: string): Promise<Selectable<AuthUsers> | undefined> => {
        return await this.db.selectFrom("auth_users").selectAll().where("email", "=", email).executeTakeFirst();
    };

    public selectUserByID = async (id: string): Promise<Selectable<AuthUsers> | undefined> => {
        return await this.db.selectFrom("auth_users").selectAll().where("id", "=", id).executeTakeFirst();
    };

    public selectUserByPublicID = async (public_id: string): Promise<Selectable<AuthUsers> | undefined> => {
        return await this.db.selectFrom("auth_users").selectAll().where("public_id", "=", public_id).executeTakeFirst();
    };

    public updateUserPassword = async (id: string, newPassword: string): Promise<Selectable<AuthUsers> | undefined> => {
        return await this.db.updateTable("auth_users").set({ password: newPassword }).where("id", "=", id).returningAll().executeTakeFirst();
    };

    public getUserRoles = async (user_public_id: string): Promise<string[]> => {
        const user = await this.selectUserByPublicID(user_public_id);
        if (!user) return [];

        const roles = await this.db
            .selectFrom("auth_user_roles")
            .innerJoin("auth_roles", "auth_user_roles.role_id", "auth_roles.id")
            .select("auth_roles.name")
            .where("auth_user_roles.user_id", "=", user.id)
            .execute();

        return roles.map((role) => role.name);
    };

    public getUserScopes = async (user_public_id: string): Promise<string[]> => {
        const user = await this.selectUserByPublicID(user_public_id);
        if (!user) return [];

        const scopes = await this.db
            .selectFrom("auth_user_roles")
            .innerJoin("auth_role_scopes", "auth_user_roles.role_id", "auth_role_scopes.role_id")
            .innerJoin("auth_scopes", "auth_role_scopes.scope_id", "auth_scopes.id")
            .select("auth_scopes.scope")
            .where("auth_user_roles.user_id", "=", user.id)
            .execute();

        return scopes.map((scope) => scope.scope);
    };

    public insertPasswordResetToken = async (entry: Insertable<AuthPasswordResetTokens>) => {
        return await this.db.insertInto("auth_password_reset_tokens").values(entry).returningAll().executeTakeFirstOrThrow();
    };

    public selectPasswordResetTokenByHash = async (tokenHash: string) => {
        return await this.db.selectFrom("auth_password_reset_tokens").selectAll().where("auth_password_reset_tokens.token_hash", "=", tokenHash).executeTakeFirst();
    };

    public deletePasswordResetTokenByID = async (id: string): Promise<DeleteResult> => {
        return await this.db.deleteFrom("auth_password_reset_tokens").where("auth_password_reset_tokens.id", "=", id).executeTakeFirst();
    };

    public deletePasswordResetTokensByUserID = async (user_id: string): Promise<DeleteResult> => {
        return await this.db.deleteFrom("auth_password_reset_tokens").where("auth_password_reset_tokens.user_id", "=", user_id).executeTakeFirst();
    };

    public insertEmailVerificationToken = async (entry: Insertable<AuthEmailVerificationTokens>) => {
        return await this.db.insertInto("auth_email_verification_tokens").values(entry).returningAll().executeTakeFirst();
    };

    public selectEmailVerificationTokenByHash = async (tokenHash: string) => {
        return await this.db.selectFrom("auth_email_verification_tokens").selectAll().where("auth_email_verification_tokens.token_hash", "=", tokenHash).executeTakeFirst();
    };

    public deleteEmailVerificationTokenByID = async (id: string): Promise<DeleteResult> => {
        return await this.db.deleteFrom("auth_email_verification_tokens").where("auth_email_verification_tokens.id", "=", id).executeTakeFirst();
    };

    public deleteEmailVerificationTokensByUserID = async (user_id: string): Promise<DeleteResult> => {
        return await this.db.deleteFrom("auth_email_verification_tokens").where("auth_email_verification_tokens.user_id", "=", user_id).executeTakeFirst();
    };
}
