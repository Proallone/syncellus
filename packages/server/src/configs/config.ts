import type { Config } from "@syncellus/types/index.js";

const config: Config = {
    PORT: Number(process.env.PORT) || 3000,
    NODE_ENV: process.env.NODE_ENV || "development",
    JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET || "",
    DATABASE_KEY: process.env.DATABASE_KEY || ""
};

export default config;
