import { Router } from "express";
import { hw } from "@syncellus/utils/handlerWrapper.js";
import { authenticate } from "@syncellus/middlewares/auth.middleware.js";
import { validate } from "@syncellus/middlewares/validator.middleware.js";
import { WorkspaceTeamPostSchema, WorkspaceTeamUpdateSchema } from "@syncellus/modules/workspaces/teams/schema.js";
import { buildTeamsModule } from "@syncellus/modules/workspaces/teams/module.js";
import { buildTasksModule } from "@syncellus/modules/workspaces/tasks/module.js";
import { WorkspaceTeamTaskPostSchema, WorkspaceTeamTaskUpdateSchema } from "@syncellus/modules/workspaces/tasks/schema.js";

const router = Router();

router.use(authenticate("jwt"));

const teamsController = buildTeamsModule();
router.get("/teams", hw(teamsController.getTeams));
router.post("/teams", validate(WorkspaceTeamPostSchema), hw(teamsController.createTeams));
router.get("/teams/:id", hw(teamsController.getTeamByID));
router.patch("/teams/:id", validate(WorkspaceTeamUpdateSchema), hw(teamsController.patchTeam));
router.delete("/teams/:id", hw(teamsController.deleteTeam));

const tasksController = buildTasksModule();
router.get("/tasks", hw(tasksController.getTasks));
router.post("/tasks", validate(WorkspaceTeamTaskPostSchema), hw(tasksController.createTasks));
router.get("/tasks/:id", hw(tasksController.getTaskByID));
router.patch("/tasks/:id", validate(WorkspaceTeamTaskUpdateSchema), hw(tasksController.patchTask));
router.delete("/tasks/:id", hw(tasksController.deleteTask));

//TODO later
// router.get("/team/:teamID/tasks")
// router.post("/team/:teamID/tasks")
// router.get("/team/:teamID/tasks/:taskID")
// router.patch("/team/:teamID/tasks/:taskID")
// router.delete("/team/:teamID/tasks/:taskID")

export default router;
