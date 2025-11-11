import { Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";
import { logger } from "hono/logger";
import healthRouter from "@syncellus/hono/modules/health/routes.ts";
import authRouter from "@syncellus/hono/modules/auth/routes.ts";
const app = new Hono().basePath("/api/v1");

app.use(logger());
app.use(secureHeaders());
app.route("/health", healthRouter);
app.route("/auth", authRouter);

Deno.serve({ port: Number(Deno.env.get("PORT")) || 3001 }, app.fetch);
