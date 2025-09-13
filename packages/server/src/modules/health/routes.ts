import { Router } from "express";
import { hw } from "@syncellus/utils/handlerWrapper.js";
import { buildHealthModule } from "@syncellus/modules/health/module.js";

const router = Router();
const { controller } = buildHealthModule();

router.get("/", hw(controller.getApplicationHealth));
router.get("/database", hw(controller.getDatabaseHealth));
router.get("/full", hw(controller.getFullHealth));

export default router;
