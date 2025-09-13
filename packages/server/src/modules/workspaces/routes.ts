import { Router } from "express";
import { hw } from "@syncellus/utils/handlerWrapper.js";
import { authenticate } from "@syncellus/middlewares/auth.middleware.js";
import { validate } from "@syncellus/middlewares/validator.middleware.js";
import { WorkspaceTeamPostSchema, WorkspaceTeamUpdateSchema } from "./schema.js";
import { buildWorkspacesModule } from "./module.js";

const router = Router();
const { controller } = buildWorkspacesModule();

router.use(authenticate("jwt"));

router.get("/teams", hw(controller.getTeams));
router.post("/teams", validate(WorkspaceTeamPostSchema), hw(controller.createTeams));
router.get("/teams/:id", hw(controller.getTeamByID));
router.patch("/teams/:id", validate(WorkspaceTeamUpdateSchema), hw(controller.patchTeam));
router.delete("/teams/:id", hw(controller.deleteTeam));

export default router;
