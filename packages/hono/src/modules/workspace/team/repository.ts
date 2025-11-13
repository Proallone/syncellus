import type { Insertable, Updateable } from "kysely";
import type { WorkspacesTeams } from "@syncellus/hono/types/database.d.ts";
import { DatabaseService } from "@syncellus/hono/database/database.ts";

const db = DatabaseService.getInstance();

export const selectAllTeamsFromDB = async () => {
	return await db.selectFrom("workspaces.teams").selectAll().execute();
};

export const selectTeamByIDFromDB = async (id: string) => {
	return await db.selectFrom("workspaces.teams").selectAll().where(
		"id",
		"=",
		id,
	).executeTakeFirst();
};

export const selectTeamByPublicIDFromDB = async (public_id: string) => {
	return await db.selectFrom("workspaces.teams").selectAll().where(
		"public_id",
		"=",
		public_id,
	).executeTakeFirst();
};

export const insertTeamsToDB = async (teams: Insertable<WorkspacesTeams>[]) => {
	return await db.insertInto("workspaces.teams").values(teams)
		.returningAll().execute();
};

export const updateTeamByIDInDB = async (
	id: string,
	data: Updateable<WorkspacesTeams>,
) => {
	return await db.updateTable("workspaces.teams").set(data).where(
		"id",
		"=",
		id,
	).returningAll().executeTakeFirstOrThrow();
};

export const deleteTeamByIDFromDB = async (id: string) => {
	return await db.deleteFrom("workspaces.teams").where("id", "=", id)
		.executeTakeFirstOrThrow();
};
