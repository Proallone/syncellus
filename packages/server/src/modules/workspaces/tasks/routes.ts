import { authenticate } from "@syncellus/middlewares/auth.middleware.ts";
import { validate } from "@syncellus/middlewares/validator.middleware.ts";
import { buildTasksModule } from "@syncellus/modules/workspaces/tasks/module.ts";
import {
  WorkspaceTaskPostSchema,
  WorkspaceTaskUpdateSchema,
} from "@syncellus/modules/workspaces/tasks/schema.ts";
import { hw } from "@syncellus/utils/handlerWrapper.ts";
import { Router } from "express";

const router = Router();

router.use(authenticate("jwt"));

const controller = buildTasksModule();
router.get("/", hw(controller.getTasks));
router.post("/", validate(WorkspaceTaskPostSchema), hw(controller.createTasks));
router.get("/:id", hw(controller.getTaskByID));
router.patch(
  "/:id",
  validate(WorkspaceTaskUpdateSchema),
  hw(controller.patchTask),
);
router.delete("/:id", hw(controller.deleteTask));

//TODO later
// router.get("/team/:teamID/tasks")
// router.post("/team/:teamID/tasks")
// router.get("/team/:teamID/tasks/:taskID")
// router.patch("/team/:teamID/tasks/:taskID")
// router.delete("/team/:teamID/tasks/:taskID")

export default router;
