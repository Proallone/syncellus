import { Hono } from "hono";
import { HealthService } from "./service.ts";

const router = new Hono();

router.get("/app", async (c) => {
    const res = await HealthService.getApplicationStatus();
    return c.json(res);
});

router.get("/database", async (c) => {
    const res = await HealthService.getDatabaseStatus();
    return c.json(res);
});

router.get("/full", async (c) => {
    const app = await HealthService.getApplicationStatus();
    const db = await HealthService.getDatabaseStatus();
    return c.json({ app, db });
});

export default router;
