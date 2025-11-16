import { Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";
import { logger } from "hono/logger";
import healthRouter from "@syncellus/hono/modules/health/routes.ts";
import authRouter from "@syncellus/hono/modules/auth/routes.ts";
import workspacesRouter from "@syncellus/hono/modules/workspaces/routes.ts";
import { AppConfig } from "@syncellus/hono/config/config.ts";
import { HTTPException } from "hono/http-exception";
import { JwtTokenExpired, JwtTokenInvalid } from "hono/utils/jwt/types";
import { HttpStatus } from "@syncellus/hono/common/http.ts";

const app = new Hono().basePath("/api/v1");

app.use(logger());
app.use(secureHeaders());

app.route("/health", healthRouter);
app.route("/auth", authRouter);
app.route("/workspaces", workspacesRouter);

app.onError((error, c) => {
	if (error instanceof HTTPException) {
		console.error(error);
		return error.getResponse(); //TODO make better
	} else if (error instanceof JwtTokenInvalid) {
		c.status(HttpStatus.UNAUTHORIZED);
		return c.json({ message: "Invalid JWT token", data: undefined });
	} else if (error instanceof JwtTokenExpired) {
		c.status(HttpStatus.UNAUTHORIZED);
		return c.json({ message: "Expired JWT token", data: undefined });
	}
	c.status(HttpStatus.INTERNAL_SERVER_ERROR);
	return new Response("An unexpected error occurred");
});

const port = AppConfig.getInstance().PORT;
Deno.serve({ port: port }, app.fetch);
