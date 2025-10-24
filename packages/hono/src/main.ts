import { Hono } from 'hono';
import { logger } from 'hono/logger';
import healthRouter from "./modules/health/routes.ts";
import { createDependencies } from "./modules/health/mod.ts";

const app = new Hono<{ Variables: { deps: ReturnType<typeof createDependencies> } }>().basePath("/api/v1");;

app.use(logger())

const deps = createDependencies();

app.use('*', async (c, next) => {
    c.set('deps', deps);
    await next();
});

app.route("/health", healthRouter)


Deno.serve({ port: Number(Deno.env.get("PORT")) || 3001 }, app.fetch)
