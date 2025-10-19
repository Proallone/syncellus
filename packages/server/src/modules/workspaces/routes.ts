import { authenticate } from "@syncellus/middlewares/auth.middleware.ts";
import tasksRouter from "@syncellus/modules/workspaces/tasks/routes.ts";
import teamsRouter from "@syncellus/modules/workspaces/teams/routes.ts";
import timesheetsRouter from "@syncellus/modules/workspaces/timesheets/routes.ts";
import { Router } from "express";

const router = Router();

router.use(authenticate("jwt"));

router.use("/teams", teamsRouter);
router.use("/tasks", tasksRouter);
router.use("/timesheets", timesheetsRouter);

export default router;
