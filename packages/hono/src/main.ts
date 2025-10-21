import { Hono } from 'hono';
import { logger } from 'hono/logger';
import healthRouter from "./modules/health/routes.ts";

const app = new Hono().basePath("/api/v1");

app.use(logger())
app.route("/health", healthRouter)

Deno.serve({ port: Number(Deno.env.get("PORT")) || 3001 }, app.fetch)
