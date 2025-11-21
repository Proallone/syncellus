export interface Config {
	PORT: number;
	NODE_ENV: string;
	DEBUG: boolean;
	DATABASE_URL: string;
	JWT_TOKEN_SECRET: string;
	JWT_TOKEN_EXPIRATION: number;
	JWT_REFRESH_TOKEN_EXPIRATION: number;
	CRYPTO_HMAC_KEY: string;
	SMTP_HOST: string;
	SMTP_PORT: number;
	APP_URL: string;
}
