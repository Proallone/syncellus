import { buildHealthModule } from "@syncellus/modules/health/module.js";
import { hw } from "@syncellus/utils/handlerWrapper.js";
import { Router } from "express";

const router = Router();
const controller = buildHealthModule();

router.get("/", hw(controller.getApplicationHealth));
router.get("/database", hw(controller.getDatabaseHealth));
router.get("/full", hw(controller.getFullHealth));

export default router;
