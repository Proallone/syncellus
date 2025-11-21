import { Hono } from "hono";
import { sValidator } from "@hono/standard-validator";
import { accountSchema } from "@syncellus/modules/accounts/schema.ts";
import { deleteAccountById, insertNewAccount, selectAllAccounts, selectOneAccountById, updateAccountById } from "@syncellus/modules/accounts/service.ts";
import { HttpStatus } from "@syncellus/common/http.ts";
import { HTTPException } from "hono/http-exception";
import { bearerAuth } from "hono/bearer-auth";
import { verifyJWT } from "@syncellus/middlewares/auth.middleware.ts";

const router = new Hono();

//TODO deduplicate logic with auth routes (and other in the future)
router.use(
	"*",
	bearerAuth({
		verifyToken: verifyJWT,
	}),
);

router.post("/", sValidator("json", accountSchema), async (c) => {
	const body = await c.req.valid("json");
	const newAccount = await insertNewAccount(body);
	c.status(HttpStatus.CREATED);
	return c.json({ message: `New account with ID ${newAccount.id} created`, data: newAccount });
});

router.get("/", async (c) => {
	const accounts = await selectAllAccounts();
	return c.json({ message: "Accounts data", data: accounts });
});

router.get("/:id", async (c) => {
	const id = c.req.param("id");
	const account = await selectOneAccountById(id);
	return c.json({ message: `Account with ID ${id} fetched`, data: account });
});

router.patch(
	"/:id",
	sValidator("json", accountSchema.partial()),
	async (c) => {
		const id = c.req.param("id");
		const data = await c.req.valid("json");
		const update = { id, ...data };
		const result = await updateAccountById(update);
		return c.json({ message: `Account with ID ${id} updated successfully`, data: result });
	},
);

router.delete("/:id", async (c) => {
	const id = c.req.param("id");
	const deletion = await deleteAccountById(id);
	if (!deletion.numDeletedRows) {
		throw new HTTPException(HttpStatus.NOT_FOUND, { message: `Account with ID ${id} not found!` });
	}
	return c.json({ message: `Account with ID ${id} deleted successfully` });
});

export default router;
