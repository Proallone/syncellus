import { Router } from "express";
import { hw } from "@syncellus/utils/handlerWrapper.js";
import { authenticate } from "@syncellus/middlewares/auth.middleware.js";
import { validate } from "@syncellus/middlewares/validator.middleware.js";
import { WorkspaceTeamPostSchema, WorkspaceTeamTaskPostSchema, WorkspaceTeamTaskUpdateSchema, WorkspaceTeamUpdateSchema } from "./schema.js";
import { buildWorkspacesModule } from "./module.js";

const router = Router();
const { controller } = buildWorkspacesModule();

router.use(authenticate("jwt"));

router.get("/teams", hw(controller.getTeams));
router.post("/teams", validate(WorkspaceTeamPostSchema), hw(controller.createTeams));
router.get("/teams/:id", hw(controller.getTeamByID));
router.patch("/teams/:id", validate(WorkspaceTeamUpdateSchema), hw(controller.patchTeam));
router.delete("/teams/:id", hw(controller.deleteTeam));

router.get("/tasks", hw(controller.getTasks));
router.post("/tasks", validate(WorkspaceTeamTaskPostSchema), hw(controller.createTasks));
router.get("/tasks/:id", hw(controller.getTaskByID));
router.patch("/tasks/:id", validate(WorkspaceTeamTaskUpdateSchema), hw(controller.patchTask));
router.delete("/tasks/:id", hw(controller.deleteTask));

//TODO later
// router.get("/team/:teamID/tasks")
// router.post("/team/:teamID/tasks")
// router.get("/team/:teamID/tasks/:taskID")
// router.patch("/team/:teamID/tasks/:taskID")
// router.delete("/team/:teamID/tasks/:taskID")

export default router;
