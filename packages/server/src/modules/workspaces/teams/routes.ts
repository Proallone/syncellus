import { authenticate } from "@syncellus/middlewares/auth.middleware.ts";
import { validate } from "@syncellus/middlewares/validator.middleware.ts";
import { buildTeamsModule } from "@syncellus/modules/workspaces/teams/module.ts";
import {
  WorkspaceTeamPostSchema,
  WorkspaceTeamUpdateSchema,
} from "@syncellus/modules/workspaces/teams/schema.ts";
import { hw } from "@syncellus/utils/handlerWrapper.ts";
import { Router } from "express";

const router = Router();

router.use(authenticate("jwt"));

const controller = buildTeamsModule();
router.get("/", hw(controller.getTeams));
router.post("/", validate(WorkspaceTeamPostSchema), hw(controller.createTeams));
router.get("/:id", hw(controller.getTeamByID));
router.patch(
  "/:id",
  validate(WorkspaceTeamUpdateSchema),
  hw(controller.patchTeam),
);
router.delete("/:id", hw(controller.deleteTeam));

export default router;
