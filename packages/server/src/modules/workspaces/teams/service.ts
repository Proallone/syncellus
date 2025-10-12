import { WorkspacesRepository } from "@syncellus/modules/workspaces/teams/repository.ts";
import type { ITeamsService } from "@syncellus/modules/workspaces/teams/types.d.ts";
import type { WorkspacesTeams } from "@syncellus/types/database.d.ts";
import { nanoid } from "@syncellus/utils/nanoid.ts";
import type { Insertable, Updateable } from "kysely";
import { uuidv7 } from "uuidv7";

export class TeamsService implements ITeamsService {
    constructor(private readonly repo: WorkspacesRepository) {}

    public insertNewTeams = async (owner_id: string, teams: Insertable<WorkspacesTeams>[]) => {
        const values = teams.map((team) => {
            return { id: uuidv7(), public_id: nanoid(), owner_id: owner_id, ...team };
        });
        return await this.repo.insertTeamsToDB(values);
    };

    public selectAllTeams = async () => {
        return await this.repo.selectAllTeamsFromDB();
    };

    public selectOneTeamByID = async (id: string) => {
        return await this.repo.selectTeamByIDFromDB(id);
    };

    public selectOneTeamByPublicID = async (public_id: string) => {
        return await this.repo.selectTeamByPublicIDFromDB(public_id);
    };

    public updateTeamByID = async (id: string, team: Updateable<WorkspacesTeams>) => {
        return await this.repo.updateTeamByIDInDB(id, team);
    };

    public deleteTeamByID = async (id: string) => {
        return await this.repo.deleteTeamByIDFromDB(id);
    };
}
