import type { WorkspacesTeams } from "@syncellus/hono/types/database.d.ts";
import { nanoid } from "@syncellus/hono/utils/nanoid.ts";
import type { Insertable, Updateable } from "kysely";
import { generate as uuidv7 } from "@std/uuid/unstable-v7";
import {
	deleteTeamByIDFromDB,
	insertTeamsToDB,
	selectAllTeamsFromDB,
	selectTeamByIDFromDB,
	selectTeamByPublicIDFromDB,
	updateTeamByIDInDB,
} from "@syncellus/hono/modules//workspace/team/repository.ts";
import { selectUserByPublicID } from "../../auth/repository.ts";

export const insertNewTeams = async (
	ownerPublicID: string,
	teams: Insertable<WorkspacesTeams>[],
) => {
	const owner = await selectUserByPublicID(ownerPublicID);
	const values = teams.map((team) => {
		return { id: uuidv7(), public_id: nanoid(), owner_id: owner?.id!, name: team.name };
	});
	return await insertTeamsToDB(values);
};

export const selectAllTeams = async () => {
	return await selectAllTeamsFromDB();
};

export const selectOneTeamByID = async (id: string) => {
	return await selectTeamByIDFromDB(id);
};
//
export const selectOneTeamByPublicID = async (public_id: string) => {
	return await selectTeamByPublicIDFromDB(public_id);
};

export const updateTeamByID = async (
	id: string,
	team: Updateable<WorkspacesTeams>,
) => {
	return await updateTeamByIDInDB(id, team);
};

export const deleteTeamByID = async (id: string) => {
	return await deleteTeamByIDFromDB(id);
};
