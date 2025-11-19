import { Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";
import { logger } from "hono/logger";
import healthRouter from "@syncellus/hono/modules/health/routes.ts";
import authRouter from "@syncellus/hono/modules/auth/routes.ts";
import accountsRouter from "@syncellus/hono/modules/accounts/routes.ts";
import workspacesRouter from "@syncellus/hono/modules/workspaces/routes.ts";
import { ConfigService } from "@syncellus/hono/config/config.ts";
import { HTTPException } from "hono/http-exception";
import { JwtTokenExpired, JwtTokenInvalid } from "hono/utils/jwt/types";
import { HttpStatus } from "@syncellus/hono/common/http.ts";

const API_BASE_PATH = "/api/v1";
const app = new Hono().basePath(API_BASE_PATH);

app.use(logger());
app.use(secureHeaders());

app.route("/health", healthRouter);
app.route("/auth", authRouter);
app.route("/accounts", accountsRouter);
app.route("/workspaces", workspacesRouter);

app.onError((error, c) => {
	if (error instanceof HTTPException) {
		console.error(error);
		return error.getResponse(); //TODO make better
	} else if (error instanceof JwtTokenInvalid) {
		c.status(HttpStatus.UNAUTHORIZED);
		return c.json({ message: "Invalid JWT token" });
	} else if (error instanceof JwtTokenExpired) {
		c.status(HttpStatus.UNAUTHORIZED);
		return c.json({ message: "JWT token expired" });
	}
	c.status(HttpStatus.INTERNAL_SERVER_ERROR);
	return new Response("An unexpected error occurred");
});

const { PORT } = ConfigService.getInstance();
Deno.serve({ port: PORT }, app.fetch);
