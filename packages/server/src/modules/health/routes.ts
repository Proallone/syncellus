import { Router } from "express";
import { HealthController } from "@syncellus/modules/health/controller.js";
import { HealthRepository } from "@syncellus/modules/health/repository.js";
import { DatabaseService } from "@syncellus/database/database.js";
import { HealthService } from "@syncellus/modules/health/service.js";
import { hw } from "@syncellus/utils/handlerWrapper.js";

const router = Router();
const db = DatabaseService.getInstance();

const repo = new HealthRepository(db);
const service = new HealthService(repo);
const controller = new HealthController(service);

router.get("/", hw(controller.getApplicationHealth));
router.get("/database", hw(controller.getDatabaseHealth));
router.get("/full", hw(controller.getFullHealth));

export default router;
