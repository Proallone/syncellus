import type { NewTeamTask, TeamTask, TeamTaskUpdate } from "@syncellus/types/database.js";
import type { DeleteResult } from "kysely";

export interface ITasksRepository {
    selectAllTasksFromDB(): Promise<TeamTask[]>;
    selectTaskByIDFromDB(id: string): Promise<TeamTask>;
    insertTasksToDB(tasks: NewTeamTask[]): Promise<TeamTask[]>;
    updateTaskByIDInDB(id: string, task: TeamTaskUpdate): Promise<TeamTask>;
    deleteTaskByIDinDB(id: string): Promise<DeleteResult>;
}

export interface ITasksService {
    insertNewTeamTasks(tasks: NewTeamTask[]): Promise<TeamTask[]>;
    selectAllTasks(): Promise<TeamTask[]>;
    selectTaskByID(id: string): Promise<TeamTask>;
    updateTaskByID(id: string, task: TeamTaskUpdate): Promise<TeamTask>;
    deleteTaskByID(id: string): Promise<DeleteResult>;
}
