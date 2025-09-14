import type { NewTask, Task, TaskUpdate } from "@syncellus/types/database.js";
import type { DeleteResult } from "kysely";

export interface ITasksRepository {
    selectAllTasksFromDB(): Promise<Task[]>;
    selectTaskByIDFromDB(id: string): Promise<Task>;
    insertTasksToDB(tasks: NewTask[]): Promise<Task[]>;
    updateTaskByIDInDB(id: string, task: TaskUpdate): Promise<Task>;
    deleteTaskByIDinDB(id: string): Promise<DeleteResult>;
}

export interface ITasksService {
    insertNewTasks(tasks: NewTask[]): Promise<Task[]>;
    selectAllTasks(): Promise<Task[]>;
    selectTaskByID(id: string): Promise<Task>;
    updateTaskByID(id: string, task: TaskUpdate): Promise<Task>;
    deleteTaskByID(id: string): Promise<DeleteResult>;
}
