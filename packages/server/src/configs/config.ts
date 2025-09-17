import type { Config } from "@syncellus/types/index.js";

export class AppConfig {
    private static config: Config | null = null;

    private constructor() {}
    public static getInstance(): Config {
        if (!AppConfig.config) {
            AppConfig.config = AppConfig.loadConfig();
        }
        return AppConfig.config;
    }

    private static loadConfig(): Config {
        const PORT = process.env.PORT;
        const NODE_ENV = process.env.NODE_ENV;
        const DEBUG = process.env.DEBUG;
        const DATABASE_URL = process.env.DATABASE_URL;
        const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;
        const CRYPTO_HMAC_KEY = process.env.CRYPTO_HMAC_KEY;
        const SMTP_HOST = process.env.SMTP_HOST;
        const SMTP_PORT = process.env.STMP_PORT;
        const APP_URL = process.env.APP_URL;

        if (!JWT_TOKEN_SECRET) {
            throw new Error("Critical: JWT_TOKEN_SECRET is not set.");
        }

        return {
            PORT: Number(PORT) || 3000,
            NODE_ENV: NODE_ENV || "development",
            DEBUG: Boolean(DEBUG) || false,
            DATABASE_URL: DATABASE_URL || "",
            JWT_TOKEN_SECRET: JWT_TOKEN_SECRET,
            CRYPTO_HMAC_KEY: CRYPTO_HMAC_KEY || "",
            SMTP_HOST: SMTP_HOST || "",
            SMTP_PORT: Number(SMTP_PORT) || 1025,
            APP_URL: APP_URL
        };
    }
}
