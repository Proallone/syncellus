import { DatabaseService } from "@syncellus/database/database.ts";
import type { DeleteResult, Insertable, Selectable } from "kysely";
import type { AuthEmailVerificationTokens, AuthPasswordResetTokens, AuthRefreshTokens, AuthUsers } from "@syncellus/types/database.d.ts";

export class AuthRepository {
	private static readonly db = DatabaseService.getInstance();

	public static insertNewUser = async (
		user: Insertable<AuthUsers>,
	) => {
		return await AuthRepository.db.insertInto("auth.users").values(user).returning([
			"auth.users.id",
			"auth.users.public_id",
			"auth.users.email",
			"auth.users.active",
			"auth.users.verified",
			"auth.users.created_at",
			"auth.users.modified_at",
		])
			.executeTakeFirstOrThrow();
	};

	public static verifyUserEmail = async (id: string) => {
		return await AuthRepository.db.updateTable("auth.users").set({ verified: true })
			.where("id", "=", id).executeTakeFirst();
	};

	public static activateUserAccount = async (id: string) => {
		return await AuthRepository.db.updateTable("auth.users").set({ active: true }).where("id", "=", id).executeTakeFirst();
	};

	public static deactivateUserAccount = async (id: string) => {
		return await AuthRepository.db.updateTable("auth.users").set({ active: false }).where("id", "=", id).executeTakeFirst();
	};

	public static selectUserByEmail = async (
		email: string,
	) => {
		return await AuthRepository.db.selectFrom("auth.users").selectAll().where(
			"email",
			"=",
			email,
		).executeTakeFirst();
	};

	public static selectUserByID = async (
		id: string,
	) => {
		return await AuthRepository.db.selectFrom("auth.users").selectAll().where(
			"id",
			"=",
			id,
		).executeTakeFirst();
	};

	public static selectUserByPublicID = async (
		public_id: string,
	) => {
		return await AuthRepository.db.selectFrom("auth.users_view").select([
			"auth.users_view.id",
			"auth.users_view.public_id",
			"auth.users_view.email",
			"auth.users_view.created_at",
			"auth.users_view.modified_at",
			"auth.users_view.verified",
			"auth.users_view.active",
		]).where(
			"public_id",
			"=",
			public_id,
		).executeTakeFirst();
	};

	public static updateUserPassword = async (
		id: string,
		newPassword: string,
	): Promise<Selectable<AuthUsers> | undefined> => {
		return await AuthRepository.db.updateTable("auth.users").set({
			password: newPassword,
		}).where("id", "=", id).returningAll().executeTakeFirst();
	};

	public static getUserRoles = async (
		user_public_id: string,
	): Promise<string[]> => {
		const user = await AuthRepository.selectUserByPublicID(user_public_id);
		if (!user) return [];

		//TODO replace with view read
		const roles = await AuthRepository.db
			.selectFrom("auth.user_roles")
			.innerJoin("auth.roles", "auth.user_roles.role_id", "auth.roles.id")
			.select("auth.roles.name")
			.where("auth.user_roles.user_id", "=", user.id)
			.execute();

		return roles.map((role) => role.name);
	};

	public static getUserScopes = async (
		user_public_id: string,
	): Promise<string[]> => {
		const user = await AuthRepository.selectUserByPublicID(user_public_id);
		if (!user) return [];

		//TODO replace with view read
		const scopes = await AuthRepository.db
			.selectFrom("auth.user_roles")
			.innerJoin(
				"auth.role_scopes",
				"auth.user_roles.role_id",
				"auth.role_scopes.role_id",
			)
			.innerJoin("auth.scopes", "auth.role_scopes.scope_id", "auth.scopes.id")
			.select("auth.scopes.scope")
			.where("auth.user_roles.user_id", "=", user.id)
			.execute();

		return scopes.map((scope) => scope.scope);
	};

	public static insertPasswordResetToken = async (
		entry: Insertable<AuthPasswordResetTokens>,
	) => {
		return await AuthRepository.db.insertInto("auth.password_reset_tokens").values(entry)
			.returningAll().executeTakeFirstOrThrow();
	};

	public static selectPasswordResetTokenByHash = async (tokenHash: string) => {
		return await AuthRepository.db.selectFrom("auth.password_reset_tokens").selectAll()
			.where("auth.password_reset_tokens.token_hash", "=", tokenHash)
			.executeTakeFirst();
	};

	public static deletePasswordResetTokenByID = async (
		id: string,
	): Promise<DeleteResult> => {
		return await AuthRepository.db.deleteFrom("auth.password_reset_tokens").where(
			"auth.password_reset_tokens.id",
			"=",
			id,
		).executeTakeFirst();
	};

	public static deletePasswordResetTokensByUserID = async (
		user_id: string,
	): Promise<DeleteResult> => {
		return await AuthRepository.db.deleteFrom("auth.password_reset_tokens").where(
			"auth.password_reset_tokens.user_id",
			"=",
			user_id,
		).executeTakeFirst();
	};

	public static insertEmailVerificationToken = async (
		entry: Insertable<AuthEmailVerificationTokens>,
	) => {
		return await AuthRepository.db.insertInto("auth.email_verification_tokens").values(
			entry,
		).returningAll().executeTakeFirst();
	};

	public static selectEmailVerificationTokenByHash = async (tokenHash: string) => {
		return await AuthRepository.db.selectFrom("auth.email_verification_tokens")
			.selectAll().where(
				"auth.email_verification_tokens.token_hash",
				"=",
				tokenHash,
			).executeTakeFirst();
	};

	public static deleteEmailVerificationTokenByID = async (
		id: string,
	): Promise<DeleteResult> => {
		return await AuthRepository.db.deleteFrom("auth.email_verification_tokens").where(
			"auth.email_verification_tokens.id",
			"=",
			id,
		).executeTakeFirst();
	};

	public static deleteEmailVerificationTokensByUserID = async (
		user_id: string,
	): Promise<DeleteResult> => {
		return await AuthRepository.db.deleteFrom("auth.email_verification_tokens").where(
			"auth.email_verification_tokens.user_id",
			"=",
			user_id,
		).executeTakeFirst();
	};

	public static insertRefreshToken = async (
		entry: Insertable<AuthRefreshTokens>,
	) => {
		return await AuthRepository.db.insertInto("auth.refresh_tokens").values(entry)
			.returningAll().executeTakeFirstOrThrow();
	};

	public static revokeRefreshToken = async (id: string) => {
		return await AuthRepository.db.updateTable("auth.refresh_tokens").set({ revoked_at: new Date() }).where("id", "=", id).executeTakeFirst();
	};

	public static revokeUserRefreshTokens = async (user_id: string) => {
		return await AuthRepository.db.updateTable("auth.refresh_tokens").set({ revoked_at: new Date() }).where((eb) =>
			eb.and({
				"auth.refresh_tokens.user_id": user_id,
				"auth.refresh_tokens.revoked_at": null,
			})
		).execute();
	};

	public static selectRefreshTokenByHash = async (tokenHash: string) => {
		return await AuthRepository.db.selectFrom("auth.refresh_tokens").selectAll()
			.where("auth.refresh_tokens.token_hash", "=", tokenHash)
			.executeTakeFirst();
	};
}
