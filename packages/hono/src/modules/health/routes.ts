import { Hono } from "hono";

const router = new Hono<{ Variables: { deps: any } }>();

router.get("/app", async (c) => {
    const { healthService } = c.get('deps');
    const res = await healthService.getApplicationStatus();
    return c.json(res);
});

router.get("/database", async (c) => {
    const { healthService } = c.get('deps');

    const res = await healthService.getDatabaseStatus();
    return c.json(res);
});

router.get("/full", async (c) => {
    const { healthService } = c.get('deps');
    const app = await healthService.getApplicationStatus();
    const db = await healthService.getDatabaseStatus();
    return c.json({ app, db });
});

export default router;
