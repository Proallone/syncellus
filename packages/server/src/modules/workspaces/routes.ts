import { authenticate } from "@syncellus/middlewares/auth.middleware.js";
import tasksRouter from "@syncellus/modules/workspaces/tasks/routes.js";
import teamsRouter from "@syncellus/modules/workspaces/teams/routes.js";
import timesheetsRouter from "@syncellus/modules/workspaces/timesheets/routes.js";
import { Router } from "express";

const router = Router();

router.use(authenticate("jwt"));

router.use("/teams", teamsRouter);
router.use("/tasks", tasksRouter);
router.use("/timesheets", timesheetsRouter);

export default router;
