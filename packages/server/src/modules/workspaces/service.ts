import type { NewTeam } from "@syncellus/types/database.js";
import { WorkspacesRepository } from "./repository.js";
import { uuidv7 } from "uuidv7";
import { nanoid } from "@syncellus/utils/nanoid.js";

export class WorkspacesService {
    constructor(private readonly repo: WorkspacesRepository) {}

    public insertNewTeam = async (team: NewTeam) => {
        return await this.repo.insertTeamToDB({ id: uuidv7(), public_id: nanoid(), ...team });
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
