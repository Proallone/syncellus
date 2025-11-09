import { Hono } from 'hono';
import { logger } from 'hono/logger';
import healthRouter from "@syncellus/hono/modules/health/routes.ts";
import authRouter from "@syncellus/hono/modules/auth/routes.ts";

const app = new Hono().basePath("/api/v1");;

app.use(logger())
app.route("/health", healthRouter);
app.route("/auth", authRouter);


Deno.serve({ port: Number(Deno.env.get("PORT")) || 3001 }, app.fetch)
