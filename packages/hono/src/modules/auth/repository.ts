import { DatabaseService } from "@syncellus/hono/database/database.ts";
import type { DeleteResult, Insertable, Selectable } from "kysely";
import type {
  AuthEmailVerificationTokens,
  AuthPasswordResetTokens,
  AuthUsers,
} from "@syncellus/hono/types/database.d.ts";

const db = DatabaseService.getInstance();

export const insertNewUser = async (
  user: Insertable<AuthUsers>,
): Promise<Selectable<AuthUsers>> => {
  return await db.insertInto("auth.users").values(user).returningAll()
    .executeTakeFirstOrThrow();
};

export const verifyUserEmail = async (id: string) => {
  return await db.updateTable("auth.users").set({ verified: true })
    .where("id", "=", id).executeTakeFirst();
};

export const selectUserByEmail = async (
  email: string,
): Promise<Selectable<AuthUsers> | undefined> => {
  return await db.selectFrom("auth.users_view").selectAll().where(
    "email",
    "=",
    email,
  ).executeTakeFirst();
};

export const selectUserByID = async (
  id: string,
): Promise<Selectable<AuthUsers> | undefined> => {
  return await db.selectFrom("auth.users_view").selectAll().where(
    "id",
    "=",
    id,
  ).executeTakeFirst();
};

export const selectUserByPublicID = async (
  public_id: string,
): Promise<Selectable<AuthUsers> | undefined> => {
  return await db.selectFrom("auth.users_view").selectAll().where(
    "public_id",
    "=",
    public_id,
  ).executeTakeFirst();
};

export const updateUserPassword = async (
  id: string,
  newPassword: string,
): Promise<Selectable<AuthUsers> | undefined> => {
  return await db.updateTable("auth.users").set({
    password: newPassword,
  }).where("id", "=", id).returningAll().executeTakeFirst();
};

export const getUserRoles = async (
  user_public_id: string,
): Promise<string[]> => {
  const user = await selectUserByPublicID(user_public_id);
  if (!user) return [];

  //TODO replace with view read
  const roles = await db
    .selectFrom("auth.user_roles")
    .innerJoin("auth.roles", "auth.user_roles.role_id", "auth.roles.id")
    .select("auth.roles.name")
    .where("auth.user_roles.user_id", "=", user.id)
    .execute();

  return roles.map((role) => role.name);
};

export const getUserScopes = async (
  user_public_id: string,
): Promise<string[]> => {
  const user = await selectUserByPublicID(user_public_id);
  if (!user) return [];

  //TODO replace with view read
  const scopes = await db
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

export const insertPasswordResetToken = async (
  entry: Insertable<AuthPasswordResetTokens>,
) => {
  return await db.insertInto("auth.password_reset_tokens").values(entry)
    .returningAll().executeTakeFirstOrThrow();
};

export const selectPasswordResetTokenByHash = async (tokenHash: string) => {
  return await db.selectFrom("auth.password_reset_tokens").selectAll()
    .where("auth.password_reset_tokens.token_hash", "=", tokenHash)
    .executeTakeFirst();
};

export const deletePasswordResetTokenByID = async (
  id: string,
): Promise<DeleteResult> => {
  return await db.deleteFrom("auth.password_reset_tokens").where(
    "auth.password_reset_tokens.id",
    "=",
    id,
  ).executeTakeFirst();
};

export const deletePasswordResetTokensByUserID = async (
  user_id: string,
): Promise<DeleteResult> => {
  return await db.deleteFrom("auth.password_reset_tokens").where(
    "auth.password_reset_tokens.user_id",
    "=",
    user_id,
  ).executeTakeFirst();
};

export const insertEmailVerificationToken = async (
  entry: Insertable<AuthEmailVerificationTokens>,
) => {
  return await db.insertInto("auth.email_verification_tokens").values(
    entry,
  ).returningAll().executeTakeFirst();
};

export const selectEmailVerificationTokenByHash = async (tokenHash: string) => {
  return await db.selectFrom("auth.email_verification_tokens")
    .selectAll().where(
      "auth.email_verification_tokens.token_hash",
      "=",
      tokenHash,
    ).executeTakeFirst();
};

export const deleteEmailVerificationTokenByID = async (
  id: string,
): Promise<DeleteResult> => {
  return await db.deleteFrom("auth.email_verification_tokens").where(
    "auth.email_verification_tokens.id",
    "=",
    id,
  ).executeTakeFirst();
};

export const deleteEmailVerificationTokensByUserID = async (
  user_id: string,
): Promise<DeleteResult> => {
  return await db.deleteFrom("auth.email_verification_tokens").where(
    "auth.email_verification_tokens.user_id",
    "=",
    user_id,
  ).executeTakeFirst();
};
