import type { Insertable, Updateable } from "kysely";
import type { WorkspacesTeams } from "@syncellus/types/database.d.ts";
import { DatabaseService } from "@syncellus/database/database.ts";

const db = DatabaseService.getInstance();

const TEAMS_TABLE = "workspaces.teams" as const;

export const selectAllTeamsFromDB = async () => {
	return await db.selectFrom(TEAMS_TABLE).selectAll().execute();
};

export const selectTeamByIDFromDB = async (id: string) => {
	return await db.selectFrom(TEAMS_TABLE).selectAll().where(
		"id",
		"=",
		id,
	).executeTakeFirst();
};

export const selectTeamByPublicIDFromDB = async (public_id: string) => {
	return await db.selectFrom(TEAMS_TABLE).selectAll().where(
		"public_id",
		"=",
		public_id,
	).executeTakeFirst();
};

export const insertTeamsToDB = async (team: Insertable<WorkspacesTeams>) => {
	return await db.insertInto(TEAMS_TABLE).values(team)
		.returningAll().executeTakeFirstOrThrow();
};

export const updateTeamByIDInDB = async (
	id: string,
	data: Updateable<WorkspacesTeams>,
) => {
	return await db.updateTable(TEAMS_TABLE).set(data).where(
		"id",
		"=",
		id,
	).returningAll().executeTakeFirstOrThrow();
};

export const deleteTeamByIDFromDB = async (id: string) => {
	return await db.deleteFrom(TEAMS_TABLE).where("id", "=", id)
		.executeTakeFirstOrThrow();
};
