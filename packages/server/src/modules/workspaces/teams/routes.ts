import { Router } from "express";
import { hw } from "@syncellus/utils/handlerWrapper.js";
import { authenticate } from "@syncellus/middlewares/auth.middleware.js";
import { validate } from "@syncellus/middlewares/validator.middleware.js";
import { buildTeamsModule } from "@syncellus/modules/workspaces/teams/module.js";
import { WorkspaceTeamPostSchema, WorkspaceTeamUpdateSchema } from "@syncellus/modules/workspaces/teams/schema.js";

const router = Router();

router.use(authenticate("jwt"));

const controller = buildTeamsModule();
router.get("/", hw(controller.getTeams));
router.post("/", validate(WorkspaceTeamPostSchema), hw(controller.createTeams));
router.get("/:id", hw(controller.getTeamByID));
router.patch("/:id", validate(WorkspaceTeamUpdateSchema), hw(controller.patchTeam));
router.delete("/:id", hw(controller.deleteTeam));

export default router;
