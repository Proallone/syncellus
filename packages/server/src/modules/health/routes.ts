import { Router } from "express";
import { HealthController } from "@syncellus/modules/health/controller.js";
import { HealthRepository } from "@syncellus/modules/health/repository.js";
import { DatabaseService } from "@syncellus/database/database.js";
import { HealthService } from "./service.js";

const router = Router();
const db = DatabaseService.getInstance();

const repo = new HealthRepository(db);
const service = new HealthService(repo);
const controller = new HealthController(service);

router.get("/", controller.getApplicationHealth);
router.get("/database", controller.getDatabaseHealth);

export default router;
