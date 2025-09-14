import type { NewTeam, NewTeamTask, Team, TeamTask, TeamTaskUpdate, TeamUpdate } from "@syncellus/types/database.js";
import type { DeleteResult } from "kysely";

export interface IWorkspacesRepository {
    selectAllTeamsFromDB(): Promise<Team[]>;
    selectTeamByIDFromDB(id: string): Promise<Team>;
    selectTeamByPublicIDFromDB(public_id: string): Promise<Team>;
    insertTeamsToDB(team: NewTeam): Promise<Team[]>;
    updateTeamByIDInDB(id: string, data: TeamUpdate): Promise<Team>;
    deleteTeamByIDFromDB(id: string): Promise<DeleteResult>;

    selectAllTasksFromDB(): Promise<TeamTask[]>;
    selectTaskByIDFromDB(id: string): Promise<TeamTask>;
    insertTasksToDB(tasks: NewTeamTask[]): Promise<TeamTask[]>;
    updateTaskByIDInDB(id: string, task: TeamTaskUpdate): Promise<TeamTask>;
    deleteTaskByIDinDB(id: string): Promise<DeleteResult>;
}

export interface IWorkspacesService {
    insertNewTeams(owner_id: string, teams: NewTeam[]): Promise<Team[]>;
    selectAllTeams(): Promise<Team[]>;
    selectOneTeamByID(id: string): Promise<Team>;
    selectOneTeamByPublicID(public_id: string): Promise<Team>;
    updateTeamByID(id: string, team: TeamUpdate): Promise<Team>;
    deleteTeamByID(id: string): Promise<DeleteResult>;

    insertNewTeamTasks(tasks: NewTeamTask[]): Promise<TeamTask[]>;
    selectAllTasks(): Promise<TeamTask[]>;
    selectTaskByID(id: string): Promise<TeamTask>;
    updateTaskByID(id: string, task: TeamTaskUpdate): Promise<TeamTask>;
    deleteTaskByID(id: string): Promise<DeleteResult>;
}
