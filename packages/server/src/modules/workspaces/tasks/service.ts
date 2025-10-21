import type { TasksRepository } from "@syncellus/modules/workspaces/tasks/repository.ts";
import type { WorkspacesTasks } from "@syncellus/types/database.d.ts";
import type { Insertable, Updateable } from "kysely";
import { uuidv7 } from "uuidv7";
import type { ITasksService } from "@syncellus/modules/workspaces/tasks/types.d.ts";

export class TasksService implements ITasksService {
  constructor(private readonly repo: TasksRepository) {}

  public insertNewTasks = async (tasks: Insertable<WorkspacesTasks>[]) => {
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

  public updateTaskByID = async (
    id: string,
    task: Updateable<WorkspacesTasks>,
  ) => {
    return await this.repo.updateTaskByIDInDB(id, task);
  };

  public deleteTaskByID = async (id: string) => {
    return await this.repo.deleteTaskByIDinDB(id);
  };
}
