import type { Config } from "@syncellus/types/index.d.ts";

export class ConfigService {
	private static config: Config | null = null;

	private constructor() {}
	public static getInstance(): Config {
		if (!ConfigService.config) {
			ConfigService.config = ConfigService.loadConfig();
		}
		return ConfigService.config;
	}

	private static loadConfig(): Config {
		const PORT = Deno.env.get("PORT");
		const NODE_ENV = Deno.env.get("NODE_ENV");
		const DEBUG = Deno.env.get("DEBUG");
		const DATABASE_URL = Deno.env.get("DATABASE_URL");
		const JWT_TOKEN_SECRET = Deno.env.get("JWT_TOKEN_SECRET");
		const JWT_TOKEN_EXPIRATION = Deno.env.get("JWT_TOKEN_EXPIRATION");
		const JWT_REFRESH_TOKEN_EXPIRATION = Deno.env.get("JWT_REFRESH_TOKEN_EXPIRATION");
		const CRYPTO_HMAC_KEY = Deno.env.get("CRYPTO_HMAC_KEY");
		const SMTP_HOST = Deno.env.get("SMTP_HOST");
		const SMTP_PORT = Deno.env.get("STMP_PORT");
		const APP_URL = Deno.env.get("APP_URL");

		if (!JWT_TOKEN_SECRET) {
			throw new Error("Critical: JWT_TOKEN_SECRET is not set.");
		}

		return {
			PORT: Number(PORT) || 3000,
			NODE_ENV: NODE_ENV || "development",
			DEBUG: Boolean(DEBUG) || false,
			DATABASE_URL: DATABASE_URL || "",
			JWT_TOKEN_SECRET: JWT_TOKEN_SECRET,
			JWT_TOKEN_EXPIRATION: Number(JWT_TOKEN_EXPIRATION),
			JWT_REFRESH_TOKEN_EXPIRATION: Number(JWT_REFRESH_TOKEN_EXPIRATION),
			CRYPTO_HMAC_KEY: CRYPTO_HMAC_KEY || "",
			SMTP_HOST: SMTP_HOST || "",
			SMTP_PORT: Number(SMTP_PORT) || 1025,
			APP_URL: APP_URL || "",
		};
	}
}
