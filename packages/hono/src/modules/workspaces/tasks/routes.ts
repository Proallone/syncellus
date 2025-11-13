import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import { AppConfig } from "../../../config/config.ts";
import { verify } from "hono/utils/jwt/jwt";

type Variables = { user_public_id: string };

// const logger = LoggerService.getInstance();
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
	return c.json({});
});

router.post("/", async (c) => {
	return c.json({});
});

router.get("/:id", async (c) => {
	return c.json({});
});

router.patch(
	"/:id",
	async (c) => {
		return c.json({});
	},
);

router.delete("/:id", async (c) => {
	return c.json({});
});

//TODO later
// router.get("/team/:teamID/tasks")
// router.post("/team/:teamID/tasks")
// router.get("/team/:teamID/tasks/:taskID")
// router.patch("/team/:teamID/tasks/:taskID")
// router.delete("/team/:teamID/tasks/:taskID")

export default router;
