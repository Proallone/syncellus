import { Router } from "express";
import { DatabaseService } from "@syncellus/database/database.js";
import { hw } from "@syncellus/utils/handlerWrapper.js";
import { authenticate } from "@syncellus/middlewares/auth.middleware.js";
import { WorkspacesRepository } from "@syncellus/modules/workspaces/repository.js";
import { WorkspacesService } from "@syncellus/modules/workspaces/service.js";
import { WorkspacesController } from "@syncellus/modules/workspaces/controller.js";
import { validate } from "@syncellus/middlewares/validator.middleware.js";
import { WorkspaceTeamPostSchema, WorkspaceTeamUpdateSchema } from "./schema.js";

const router = Router();
const db = DatabaseService.getInstance();

const repo = new WorkspacesRepository(db);
const service = new WorkspacesService(repo);

const controller = new WorkspacesController(service);

router.use(authenticate("jwt"));

router.get("/teams", hw(controller.getTeams));
router.post("/teams", validate(WorkspaceTeamPostSchema), hw(controller.createTeams)); //TODO add schema validation
router.get("/teams/:id", hw(controller.getTeamByID));
router.patch("/teams/:id", validate(WorkspaceTeamUpdateSchema), hw(controller.patchTeam));
router.delete("/teams/:id", hw(controller.deleteTeam));

export default router;
