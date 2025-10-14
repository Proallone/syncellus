import type { WorkspacesTasks } from "@syncellus/types/database.d.ts";
import type { DeleteResult, Insertable, Selectable, Updateable } from "kysely";

export interface ITasksRepository {
  selectAllTasksFromDB(): Promise<Selectable<WorkspacesTasks>[]>;
  selectTaskByIDFromDB(id: string): Promise<Selectable<WorkspacesTasks>>;
  insertTasksToDB(
    tasks: Insertable<WorkspacesTasks>[],
  ): Promise<Selectable<WorkspacesTasks>[]>;
  updateTaskByIDInDB(
    id: string,
    task: Updateable<WorkspacesTasks>,
  ): Promise<Selectable<WorkspacesTasks>>;
  deleteTaskByIDinDB(id: string): Promise<DeleteResult>;
}

export interface ITasksService {
  insertNewTasks(
    tasks: Insertable<WorkspacesTasks>[],
  ): Promise<Selectable<WorkspacesTasks>[]>;
  selectAllTasks(): Promise<Selectable<WorkspacesTasks>[]>;
  selectTaskByID(id: string): Promise<Selectable<WorkspacesTasks>>;
  updateTaskByID(
    id: string,
    task: Updateable<WorkspacesTasks>,
  ): Promise<Selectable<WorkspacesTasks>>;
  deleteTaskByID(id: string): Promise<DeleteResult>;
}
