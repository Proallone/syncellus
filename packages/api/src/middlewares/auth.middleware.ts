import { verify } from "hono/utils/jwt/jwt";
import { ConfigService } from "@syncellus/config/config.ts";
import { verifyUserCredentials } from "@syncellus/modules/auth/service.ts";
import type { Context } from "hono";

export const verifyBasic = async (email: string, password: string, c: Context) => {
	return await verifyUserCredentials(
		email,
		password,
		c,
	);
};

export const verifyJWT = async (token: string, c: Context) => {
	const { JWT_TOKEN_SECRET } = ConfigService.getInstance();
	const claims = await verify(token, JWT_TOKEN_SECRET);
	c.set("user_public_id", claims.sub);
	return Boolean(claims); //TODO this should be revisited
};
