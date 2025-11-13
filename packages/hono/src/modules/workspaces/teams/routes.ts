import { Hono } from "hono";
// import { LoggerService } from "@syncellus/hono/common/logger.ts";
import { deleteTeamByID, insertNewTeams, selectAllTeams, selectOneTeamByID } from "@syncellus/hono/modules/workspaces/teams/service.ts";
import { HttpStatus } from "@syncellus/hono/common/http.ts";
import { HTTPException } from "hono/http-exception";
import { sValidator } from "@hono/standard-validator";
import { z } from "@zod/zod";

type Variables = { user_public_id: string };

// const logger = LoggerService.getInstance();
const router = new Hono<{ Variables: Variables }>();

router.get("/", async (c) => {
	const teams = await selectAllTeams();
	c.status(HttpStatus.OK);
	return c.json({
		message: "Teams fetched",
		data: teams,
	});
});

const workspaceTeamSchema = z.strictObject({
	name: z.string().max(256),
});

router.post("/", sValidator("json", workspaceTeamSchema), async (c) => {
	const team = await c.req.valid("json");
	const userPublicID = c.get("user_public_id");

	const newTeam = await insertNewTeams(userPublicID, team);

	c.status(HttpStatus.CREATED);
	return c.json({ message: "Registration succesfull", data: newTeam });
});

router.get("/:id", async (c) => {
	const id = c.req.param("id");
	const team = await selectOneTeamByID(id);
	if (!team) throw new HTTPException(HttpStatus.NOT_FOUND, { message: `Team with ID ${id} not found!` });

	c.status(HttpStatus.OK);
	return c.json({
		message: `Team with ID ${id} fetched`,
		data: team,
	});
});

router.delete("/:id", async (c) => {
	const id = c.req.param("id");
	const deletion = await deleteTeamByID(id);
	if (!deletion.numDeletedRows) {
		throw new HTTPException(HttpStatus.NOT_FOUND, { message: `Team with ID ${id} not found!` });
	}

	c.status(HttpStatus.OK);
	return c.json({
		message: `Team with ID ${id} deleted`,
	});
});

export default router;
