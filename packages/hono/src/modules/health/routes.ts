import { Hono } from "hono";
import { getApplicationStatus, getDatabaseStatus } from "@syncellus/hono/modules//health/service.ts";

const router = new Hono();

router.get("/app", async (c) => {
	const res = await getApplicationStatus();
	return c.json(res);
});

router.get("/database", async (c) => {
	const res = await getDatabaseStatus();
	return c.json(res);
});

router.get("/full", async (c) => {
	const app = await getApplicationStatus();
	const db = await getDatabaseStatus();
	return c.json({ app, db });
});

export default router;
