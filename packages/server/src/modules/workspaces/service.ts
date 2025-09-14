import type { IWorkspacesService } from "./types.js";
import type { NewTeam, NewTeamTask, TeamTaskUpdate, TeamUpdate } from "@syncellus/types/database.js";
import { WorkspacesRepository } from "./repository.js";
import { uuidv7 } from "uuidv7";
import { nanoid } from "@syncellus/utils/nanoid.js";

export class WorkspacesService implements IWorkspacesService {
    constructor(private readonly repo: WorkspacesRepository) {}

    public insertNewTeams = async (owner_id: string, teams: NewTeam[]) => {
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

    public updateTeamByID = async (id: string, team: TeamUpdate) => {
        return await this.repo.updateTeamByIDInDB(id, team);
    };

    public deleteTeamByID = async (id: string) => {
        return await this.repo.deleteTeamByIDFromDB(id);
    };

    public insertNewTeamTasks = async (tasks: NewTeamTask[]) => {
        const values = tasks.map((task) => {
            return { id: uuidv7(), ...task };
        });
        return await this.repo.insertTasksToDB(values);
    };

    public selectAllTasks = async () => {
        return await this.repo.selectAllTasksFromDB();
    };

    public selectTaskByID = async (id: string) => {
        return await this.repo.selectTaskByIDFromDB(id);
    };

    public updateTaskByID = async (id: string, task: TeamTaskUpdate) => {
        return await this.repo.updateTaskByIDInDB(id, task);
    };

    public deleteTaskByID = async (id: string) => {
        return await this.repo.deleteTaskByIDinDB(id);
    };
}
