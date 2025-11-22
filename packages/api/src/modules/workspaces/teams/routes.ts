import { Hono } from "hono";
// import { LoggerService } from "@syncellus/common/logger.ts";
import { deleteTeamByID, insertNewTeams, selectAllTeams, selectOneTeamByID } from "@syncellus/modules/workspaces/teams/service.ts";
import { HttpStatus } from "@syncellus/common/http.ts";
import { HTTPException } from "hono/http-exception";
import { sValidator } from "@hono/standard-validator";
import { verifyJWT } from "@syncellus/middlewares/auth.middleware.ts";
import { bearerAuth } from "hono/bearer-auth";
import { workspaceTeamSchema } from "@syncellus/modules/workspaces/teams/schema.ts";

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
	const teams = await selectAllTeams();

	return c.json({
		message: "Teams fetched",
		data: teams,
	});
});

router.post("/", sValidator("json", workspaceTeamSchema), async (c) => {
	const team = c.req.valid("json");
	const userPublicID = c.get("user_public_id");

	const newTeam = await insertNewTeams(userPublicID, team);

	c.status(HttpStatus.CREATED);
	return c.json({ message: "Team creation succesfull", data: newTeam });
});

router.get("/:id", async (c) => {
	const id = c.req.param("id");
	const team = await selectOneTeamByID(id);
	if (!team) throw new HTTPException(HttpStatus.NOT_FOUND, { message: `Team with ID ${id} not found!` });

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

	return c.json({
		message: `Team with ID ${id} deleted`,
	});
});

export default router;
