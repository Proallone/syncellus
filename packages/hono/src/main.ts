import { Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";
import { logger } from "hono/logger";
import healthRouter from "@syncellus/hono/modules/health/routes.ts";
import authRouter from "@syncellus/hono/modules/auth/routes.ts";
import { AppConfig } from "@syncellus/hono/config/config.ts";

const app = new Hono().basePath("/api/v1");

app.use(logger());
app.use(secureHeaders());

app.route("/health", healthRouter);
app.route("/auth", authRouter);

const port = AppConfig.getInstance().PORT;
Deno.serve({ port: port }, app.fetch);
