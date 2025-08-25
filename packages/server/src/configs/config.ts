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
        const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;
        const DATABASE_KEY = process.env.DATABASE_KEY;
        const CRYPTO_HMAC_KEY = process.env.CRYPTO_HMAC_KEY;
        const SMTP_HOST = process.env.SMTP_HOST;
        const SMTP_PORT = process.env.STMP_PORT;

        if (!JWT_TOKEN_SECRET) {
            throw new Error("Critical: JWT_TOKEN_SECRET is not set.");
        }

        const isDev = ["dev", "development", "test"].includes(NODE_ENV || "development");
        if (!DATABASE_KEY && !isDev) {
            throw new Error("Critical: DATABASE_KEY is not set for production.");
        }

        return {
            PORT: Number(PORT) || 3000,
            NODE_ENV: NODE_ENV || "development",
            JWT_TOKEN_SECRET: JWT_TOKEN_SECRET,
            DATABASE_KEY: DATABASE_KEY || "",
            CRYPTO_HMAC_KEY: CRYPTO_HMAC_KEY || "",
            SMTP_HOST: SMTP_HOST || "",
            SMTP_PORT: Number(SMTP_PORT) || 1025
        };
    }
}
