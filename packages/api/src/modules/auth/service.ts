import {
	activateUserAccount,
	deleteEmailVerificationTokenByID,
	deleteEmailVerificationTokensByUserID,
	deletePasswordResetTokenByID,
	deletePasswordResetTokensByUserID,
	getUserRoles,
	getUserScopes,
	insertEmailVerificationToken,
	insertNewUser,
	insertPasswordResetToken,
	insertRefreshToken,
	revokeRefreshToken,
	revokeUserRefreshTokens,
	selectEmailVerificationTokenByHash,
	selectPasswordResetTokenByHash,
	selectRefreshTokenByHash,
	selectUserByEmail,
	selectUserByID,
	selectUserByPublicID,
	updateUserPassword,
	verifyUserEmail,
} from "@syncellus/modules/auth/repository.ts";
import { generate as uuidv7 } from "@std/uuid/unstable-v7";
import { nanoid } from "@syncellus/utils/nanoid.ts";
import { compareHash, generateToken, hashPassword, sha256 } from "@syncellus/utils/crypto.ts";
import { HTTPException } from "hono/http-exception";
import { HttpStatus } from "@syncellus/common/http.ts";
import { MailService } from "@syncellus/modules/mail/service.ts";
import { NodemailerProvider } from "@syncellus/modules/mail/providers/NodemailerProvider.ts";
import { ConfigService } from "@syncellus/config/config.ts";
import { sign } from "hono/jwt";
import type { Context } from "hono";

//TODO maybe rethink how to better handle accessing mail service
const mailProvider = new NodemailerProvider();
const mailService = new MailService(mailProvider);

export const registerNewUser = async (
	user: { email: string; password: string },
) => { //TODO replace with zod infered type
	const existing = await selectUserByEmail(user.email);
	if (existing) throw new HTTPException(HttpStatus.CONFLICT, { message: `User ${user.email} already exists` });

	const newUser = await insertNewUser({
		id: uuidv7(),
		public_id: nanoid(),
		email: user.email,
		password: await hashPassword(user.password),
	});

	const verificationToken = generateToken();
	const tokenHash = await sha256(verificationToken);

	await deleteEmailVerificationTokensByUserID(newUser.id);
	await insertEmailVerificationToken({
		id: uuidv7(),
		user_id: newUser.id,
		token_hash: tokenHash,
	});

	const config = ConfigService.getInstance();
	const verificationLink = `${config.APP_URL}/auth/verify-email?token=${verificationToken}`;

	await mailService.sendWelcome(
		user.email,
		newUser.email,
		verificationLink,
	);

	return newUser;
};

export const verifyUserCredentials = async (email: string, password: string, c: Context): Promise<boolean> => {
	const userFromDb = await selectUserByEmail(email);
	if (!userFromDb) return false;

	const match = compareHash(password, userFromDb.password!);
	if (!match) return false;
	c.set("user_public_id", userFromDb.public_id); //TODO find a nicer place?
	return match;
};

export const issueLoginToken = async (userPublicId: string) => {
	const roles = await getUserRoles(userPublicId);
	const scopes = await getUserScopes(userPublicId);
	const { JWT_TOKEN_EXPIRATION, JWT_TOKEN_SECRET } = ConfigService.getInstance();
	const payload = {
		sub: userPublicId,
		roles,
		scopes,
		exp: Math.floor(Date.now() / 1000) + 60 * JWT_TOKEN_EXPIRATION, //? in minutes (TODO address later in milisec)
	};
	const token = await sign(payload, JWT_TOKEN_SECRET);
	return token;
};

export const issueRefreshToken = async (userPublicId: string) => {
	const { JWT_REFRESH_TOKEN_EXPIRATION, JWT_TOKEN_SECRET } = ConfigService.getInstance();

	const payload = {
		sub: userPublicId,
		exp: Math.floor(Date.now() / 1000) + 60 * JWT_REFRESH_TOKEN_EXPIRATION, //? in minutes (TODO address later in milisec)
	};

	const refreshToken = await sign(payload, JWT_TOKEN_SECRET);
	const user = await selectUserByPublicID(userPublicId);

	if (!user) {
		throw new HTTPException(HttpStatus.NOT_FOUND, { message: `User with public ID ${userPublicId} not found during issuing refresh token` });
	}

	await revokeUserRefreshTokens(user.id!); //? this will invalidate all currently issued refresh tokens so user might be logged out from other devices
	await insertRefreshToken({ id: uuidv7(), token_hash: await sha256(refreshToken), user_id: user.id! });
	return refreshToken;
};

export const verifyAccountEmail = async (token: string) => {
	const tokenHash = await sha256(token);
	const tokenRecord = await selectEmailVerificationTokenByHash(
		tokenHash,
	);

	if (!tokenRecord) {
		throw new HTTPException(HttpStatus.BAD_REQUEST, { message: "Invalid email verification token" });
	}

	if (tokenRecord.expires_at < new Date()) {
		await deleteEmailVerificationTokenByID(tokenRecord.id); //TODO what if fails?
		throw new HTTPException(HttpStatus.NOT_FOUND, { message: "Expired email verification token" });
	}

	const user = await selectUserByID(tokenRecord.user_id);
	if (!user) {
		throw new HTTPException(HttpStatus.NOT_FOUND, { message: "User not found for this email verification token" });
	}

	await verifyUserEmail(user.id!); //TODO what if fails?
	await deleteEmailVerificationTokensByUserID(user.id!); //TODO what if fails? maybe add delete all user tokens?
	await activateUserAccount(user.id!);
	return true;
};

export const issuePasswordResetToken = async (email: string) => {
	const user = await selectUserByEmail(email);

	if (!user) throw new HTTPException(HttpStatus.NOT_FOUND, { message: `User with email ${email} not found` });

	const resetToken = generateToken();
	const tokenHash = await sha256(resetToken);

	await deletePasswordResetTokensByUserID(user.id!);
	await insertPasswordResetToken({
		id: uuidv7(),
		user_id: user.id!,
		token_hash: tokenHash,
	});

	const { APP_URL } = ConfigService.getInstance();
	const resetLink = `${APP_URL}/auth/reset-password?token=${resetToken}`;

	await mailService.sendPasswordReset(user.email!, resetLink);
	return resetLink;
};

export const performPasswordReset = async (
	token: string,
	newPassword: string,
) => {
	const tokenHash = await sha256(token);
	const tokenRecord = await selectPasswordResetTokenByHash(
		tokenHash,
	);

	if (!tokenRecord) throw new HTTPException(HttpStatus.NOT_FOUND, { message: "Invalid password reset token" });

	if (tokenRecord.expires_at < new Date()) {
		await deletePasswordResetTokenByID(tokenRecord.id);
		throw new HTTPException(HttpStatus.NOT_FOUND, { message: "Expired password reset token" });
	}

	const user = await selectUserByID(tokenRecord.user_id);
	if (!user) throw new HTTPException(HttpStatus.NOT_FOUND, { message: "User not found for this reset token" });

	const hashedPassword = await hashPassword(newPassword);

	await updateUserPassword(user.id!, hashedPassword);
	await deletePasswordResetTokensByUserID(user.id!);
};

export const findUserByPublicID = async (public_id: string) => {
	const user = await selectUserByPublicID(public_id);
	if (!user) {
		throw new HTTPException(HttpStatus.UNAUTHORIZED, { message: `User with public_id ${public_id} not found` });
	}
	return user;
};

export const verifyRefreshToken = async (token: string) => {
	const tokenHash = await sha256(token);
	const tokenRecord = await selectRefreshTokenByHash(tokenHash);

	if (!tokenRecord) {
		throw new HTTPException(HttpStatus.NOT_FOUND, { message: "Invalid refresh token" });
	}

	if (tokenRecord.expires_at < new Date()) {
		await deletePasswordResetTokenByID(tokenRecord.id);
		throw new HTTPException(HttpStatus.NOT_FOUND, { message: "Expired refresh token" });
	}
	const user = await selectUserByID(tokenRecord.id);

	if (!user) {
		throw new HTTPException(HttpStatus.NOT_FOUND, { message: `User not found` });
	}

	const newRefreshToken = await issueRefreshToken(user.public_id!);
	await revokeRefreshToken(tokenRecord.id);
	return newRefreshToken;
};
