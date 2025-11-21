import { Hono } from "hono";
import teamsRouter from "@syncellus/modules/workspaces/teams/routes.ts";
import tasksRouter from "@syncellus/modules/workspaces/tasks/routes.ts";
import timesheets from "@syncellus/modules/workspaces/timesheets/routes.ts";

const router = new Hono();

router.route("/teams", teamsRouter);
router.route("/tasks", tasksRouter);
router.route("/timesheets", timesheets);

export default router;
