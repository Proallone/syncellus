import { Router } from "express";
import { getApplicationHealth, getDatabaseHealth } from "@syncellus/modules/health/controller.js";

const router = Router();

router.get("/", getApplicationHealth);
router.get("/database", getDatabaseHealth);

export default router;
