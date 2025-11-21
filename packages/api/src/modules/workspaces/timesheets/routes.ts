import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import { deleteTimesheetById, insertNewTimesheets, selectAllTimesheets, selectOneTimesheetById } from "@syncellus/modules/workspaces/timesheets/service.ts";
import { HTTPException } from "hono/http-exception";
import { HttpStatus } from "@syncellus/common/http.ts";
import { sValidator } from "@hono/standard-validator";
import { verifyJWT } from "@syncellus/middlewares/auth.middleware.ts";
import { timesheetsSchema } from "@syncellus/modules/workspaces/timesheets/schema.ts";

type Variables = { user_public_id: string };

const router = new Hono<{ Variables: Variables }>();

//TODO deduplicate logic with auth routes (and other in the future)
router.use(
	"*",
	bearerAuth({
		verifyToken: verifyJWT,
	}),
);

router.get("/", async (c) => {
	const timesheets = await selectAllTimesheets();

	return c.json({ message: "Timesheets fetched", data: timesheets });
});

router.get("/:id", async (c) => {
	const id = c.req.param("id");
	const timesheet = await selectOneTimesheetById(id);
	if (!timesheet) {
		throw new HTTPException(HttpStatus.NOT_FOUND, { message: `Timesheet with ID ${id} not found!` });
	}

	return c.json({ message: `Timesheet with ID ${id} fetched`, data: timesheet });
});

router.post(
	"/",
	sValidator("json", timesheetsSchema),
	async (c) => {
		const timesheets = await c.req.valid("json");
		// const userPublicID = c.get("user_public_id");
		const newTimesheets = await insertNewTimesheets(timesheets);
		return c.json({ message: `Timesheets creation successfull`, data: newTimesheets });
	},
);

router.patch(
	"/:id",
	async (c) => {
		//TODO implement
		const userPublicID = c.get("user_public_id");
		return c.json({ userPublicID });
	},
);

router.delete("/:id", async (c) => {
	const id = c.req.param("id");
	const deletion = await deleteTimesheetById(id);
	if (deletion.numDeletedRows) {
		throw new HTTPException(HttpStatus.NOT_FOUND, { message: `Timesheet with ID ${id} not found` });
	}
	c.status(HttpStatus.ACCEPTED);
	return c.json({ message: `Timesheet with ID ${id} deleted` });
});

export default router;
