import { z } from "zod";

const AccountsBasePayload = z.strictObject({
    user_id: z.string(),
    name: z.string().min(3).max(255),
    surname: z.string().min(3).max(255)
});

const AccountsPostPayload = AccountsBasePayload.required();
const AccountsUpdatePayload = AccountsBasePayload.partial();

const AccountsGetQuery = z.object({
    active: z.boolean().optional()
});

const AccountsGetSchema = z.object({
    query: AccountsGetQuery
});

const AccountsPostSchema = z.object({
    body: AccountsPostPayload
});

const AccountsUpdateSchema = z.object({
    body: AccountsUpdatePayload
});

export { AccountsPostPayload, AccountsUpdatePayload, AccountsGetQuery, AccountsGetSchema, AccountsPostSchema, AccountsUpdateSchema as AccountsPatchSchema };
