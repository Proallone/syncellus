import { Context } from "hono";
import { verify } from "hono/utils/jwt/jwt";
import { AppConfig } from "@syncellus/hono/config/config.ts";

export const VerifyJWT = async (token: string, c: Context) => {
	const { JWT_TOKEN_SECRET } = AppConfig.getInstance();
	const claims = await verify(token, JWT_TOKEN_SECRET);
	c.set("user_public_id", claims.sub);
	return Boolean(claims); //TODO this should be revisited
};
