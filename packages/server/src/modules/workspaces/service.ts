import type { IWorkspacesService } from "./types.js";
import type { NewTeam } from "@syncellus/types/database.js";
import { WorkspacesRepository } from "./repository.js";
import { uuidv7 } from "uuidv7";
import { nanoid } from "@syncellus/utils/nanoid.js";

export class WorkspacesService implements IWorkspacesService {
    constructor(private readonly repo: WorkspacesRepository) {}

    public insertNewTeams = async (owner_id: string, teams: NewTeam[]) => {
        const values = teams.map((team) => {
            return { id: uuidv7(), public_id: nanoid(), owner_id: owner_id, ...team };
        });
        return await this.repo.insertTeamToDB(values);
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

    public updateTeamByID = async (id: string, team: NewTeam) => {
        return await this.repo.updateTeamByIDInDB(id, team);
    };

    public deleteTeamByID = async (id: string) => {
        return await this.repo.deleteTeamByIDFromDB(id);
    };
}
