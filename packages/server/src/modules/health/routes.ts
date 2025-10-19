import { buildHealthModule } from "@syncellus/modules/health/module.ts";
import { hw } from "@syncellus/utils/handlerWrapper.ts";
import { Router } from "express";

const router = Router();
const controller = buildHealthModule();

router.get("/", hw(controller.getApplicationHealth));
router.get("/database", hw(controller.getDatabaseHealth));
router.get("/full", hw(controller.getFullHealth));

export default router;
