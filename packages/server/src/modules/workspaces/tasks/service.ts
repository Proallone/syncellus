import type { ITasksService } from "./types.js";
import type { NewTeamTask, TeamTaskUpdate } from "@syncellus/types/database.js";
import { TasksRepository } from "@syncellus/modules/workspaces/tasks/repository.js";
import { uuidv7 } from "uuidv7";

export class TasksService implements ITasksService {
    constructor(private readonly repo: TasksRepository) {}

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
