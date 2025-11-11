import { Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";
import { logger } from "hono/logger";
import healthRouter from "@syncellus/hono/modules/health/routes.ts";
import authRouter from "@syncellus/hono/modules/auth/routes.ts";
import { AppConfig } from "@syncellus/hono/config/config.ts";
import { HTTPException } from "hono/http-exception";

const app = new Hono().basePath("/api/v1");

app.use(logger());
app.use(secureHeaders());

app.route("/health", healthRouter);
app.route("/auth", authRouter);

app.onError((error, _c) => {
	if (error instanceof HTTPException) {
		console.error(error);
		return error.getResponse(); //TODO make better
	}

	return new Response("An unexpected error occurred");
});

const port = AppConfig.getInstance().PORT;
Deno.serve({ port: port }, app.fetch);
