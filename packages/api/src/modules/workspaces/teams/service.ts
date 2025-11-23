import type { WorkspacesTeams } from "@syncellus/types/database.d.ts";
import { NanoID, UUID } from "@syncellus/utils/Generators.ts";
import type { Updateable } from "kysely";
import {
	deleteTeamByIDFromDB,
	insertTeamsToDB,
	selectAllTeamsFromDB,
	selectTeamByIDFromDB,
	selectTeamByPublicIDFromDB,
	updateTeamByIDInDB,
} from "@syncellus/modules//workspaces/teams/repository.ts";
import { AuthRepository } from "@syncellus/modules/auth/repository.ts";
import { HTTPException } from "hono/http-exception";
import { HttpStatus } from "@syncellus/common/http.ts";

export const insertNewTeams = async (
	ownerPublicID: string,
	teamName: string,
) => {
	const owner = await AuthRepository.selectUserByPublicID(ownerPublicID);
	if (!owner) throw new HTTPException(HttpStatus.NOT_FOUND, { message: `User with public ID ${ownerPublicID} not found` });
	const newTeam = { id: UUID.generateV7(), public_id: NanoID.generate(), owner_id: owner.id!, name: teamName };
	return await insertTeamsToDB(newTeam);
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
