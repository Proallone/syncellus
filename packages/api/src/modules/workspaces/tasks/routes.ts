import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import { deleteTaskByID, insertNewTasks, selectAllTasks, selectTaskByID, updateTaskByID } from "@syncellus/modules/workspaces/tasks/service.ts";
import { HttpStatus } from "@syncellus/common/http.ts";
import { sValidator } from "@hono/standard-validator";
import { HTTPException } from "hono/http-exception";
import { verifyJWT } from "@syncellus/middlewares/auth.middleware.ts";
import { workspaceTaskSchema } from "@syncellus/modules/workspaces/tasks/schema.ts";

type Variables = { user_public_id: string };

// const logger = LoggerService.getInstance();
const router = new Hono<{ Variables: Variables }>();

//TODO deduplicate logic with auth routes (and other in the future)
router.use(
	"*",
	bearerAuth({
		verifyToken: verifyJWT,
	}),
);

router.get("/", async (c) => {
	const tasks = await selectAllTasks();

	return c.json({
		message: "Tasks fetched",
		data: tasks,
	});
});

router.post("/", sValidator("json", workspaceTaskSchema), async (c) => {
	const task = c.req.valid("json");
	// const userPublicID = c.get("user_public_id");
	const newTask = await insertNewTasks(task); //TODO add createdBy?
	c.status(HttpStatus.CREATED);
	return c.json({ message: "Task creation successfull", data: newTask });
});

router.get("/:id", async (c) => {
	const id = c.req.param("id");
	const task = await selectTaskByID(id);
	if (!task) throw new HTTPException(HttpStatus.NOT_FOUND, { message: `Task with ID ${id} not found!` });

	return c.json({ message: `Task with ID ${id} fetched`, data: task });
});

router.patch(
	"/:id",
	sValidator("json", workspaceTaskSchema.partial()),
	async (c) => {
		const id = c.req.param("id");
		const data = c.req.valid("json");
		const updatedTask = await updateTaskByID(id, data);
		c.status(HttpStatus.ACCEPTED);
		return c.json({ message: `Task with ID ${id} updated`, data: updatedTask });
	},
);

router.delete("/:id", async (c) => {
	const id = c.req.param("id");
	const deletion = await deleteTaskByID(id);
	if (!deletion.numDeletedRows) {
		throw new HTTPException(HttpStatus.NOT_FOUND, { message: `Tas with ID ${id} not found!` });
	}
	return c.json({ message: `Task with ID ${id} deleted` });
});

export default router;
