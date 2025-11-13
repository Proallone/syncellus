import { Hono } from "hono";
import teamsRouter from "./teams/routes.ts";
import tasksRouter from "./tasks/routes.ts";

const router = new Hono();

router.route("/teams", teamsRouter);
router.route("/tasks", tasksRouter);

export default router;
