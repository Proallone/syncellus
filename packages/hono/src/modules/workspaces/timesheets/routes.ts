import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import { verify } from "hono/utils/jwt/jwt";
import { AppConfig } from "@syncellus/hono/config/config.ts";
import { deleteTimesheetById, insertNewTimesheets, selectAllTimesheets, selectOneTimesheetById } from "./service.ts";
import { HTTPException } from "hono/http-exception";
import { HttpStatus } from "../../../common/http.ts";
import z from "@zod/zod";
import { sValidator } from "@hono/standard-validator";

type Variables = { user_public_id: string };

const router = new Hono<{ Variables: Variables }>();

//TODO deduplicate logic with auth routes (and other in the future)
router.use(
	"*",
	bearerAuth({
		verifyToken: async (token, c) => {
			const jwtKey = AppConfig.getInstance().JWT_TOKEN_SECRET;
			const claims = await verify(token, jwtKey);
			c.set("user_public_id", claims.sub);
			return Boolean(claims);
		},
	}),
);

router.get("/", async (c) => {
	const timesheets = await selectAllTimesheets();
	c.status(HttpStatus.OK);
	return c.json({ message: "Timesheets fetched", data: timesheets });
});

router.get("/:id", async (c) => {
	const id = c.req.param("id");
	const timesheet = await selectOneTimesheetById(id);
	if (!timesheet) {
		throw new HTTPException(HttpStatus.NOT_FOUND, { message: `Timesheet with ID ${id} not found!` });
	}
	c.status(HttpStatus.OK);
	return c.json({ message: `Timesheet with ID ${id} fetched`, data: timesheet });
});

const timesheetsSchema = z.strictObject({
	user_id: z.uuidv7(), //TODO maybe not a part of payload?
	task_id: z.uuidv7(),
	timesheets: z.array(z.strictObject({
		start_time: z.iso.datetime(),
		end_time: z.iso.datetime(),
	})).min(
		1,
		"The 'timesheets' array must not be empty.",
	),
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
