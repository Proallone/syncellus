import { authenticate } from "@syncellus/middlewares/auth.middleware.js";
import { validate } from "@syncellus/middlewares/validator.middleware.js";
import { buildTasksModule } from "@syncellus/modules/workspaces/tasks/module.js";
import { WorkspaceTaskPostSchema, WorkspaceTaskUpdateSchema } from "@syncellus/modules/workspaces/tasks/schema.js";
import { hw } from "@syncellus/utils/handlerWrapper.js";
import { Router } from "express";

const router = Router();

router.use(authenticate("jwt"));

const controller = buildTasksModule();
router.get("/", hw(controller.getTasks));
router.post("/", validate(WorkspaceTaskPostSchema), hw(controller.createTasks));
router.get("/:id", hw(controller.getTaskByID));
router.patch("/:id", validate(WorkspaceTaskUpdateSchema), hw(controller.patchTask));
router.delete("/:id", hw(controller.deleteTask));

//TODO later
// router.get("/team/:teamID/tasks")
// router.post("/team/:teamID/tasks")
// router.get("/team/:teamID/tasks/:taskID")
// router.patch("/team/:teamID/tasks/:taskID")
// router.delete("/team/:teamID/tasks/:taskID")

export default router;
