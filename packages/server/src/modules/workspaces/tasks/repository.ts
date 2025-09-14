import type { Database, NewTask, TaskUpdate } from "@syncellus/types/database.js";
import type { Kysely } from "kysely";
import type { ITasksRepository } from "@syncellus/modules/workspaces/tasks/types.js";

export class TasksRepository implements ITasksRepository {
    constructor(private readonly db: Kysely<Database>) {}

    public selectAllTasksFromDB = async () => {
        return await this.db.selectFrom("workspaces_tasks").selectAll().execute();
    };

    public selectTaskByIDFromDB = async (id: string) => {
        return await this.db.selectFrom("workspaces_tasks").selectAll().where("id", "=", id).executeTakeFirst();
    };

    public insertTasksToDB = async (tasks: NewTask[]) => {
        return await this.db.insertInto("workspaces_tasks").values(tasks).returningAll().execute();
    };

    public updateTaskByIDInDB = async (id: string, task: TaskUpdate) => {
        return await this.db.updateTable("workspaces_tasks").set(task).where("id", "=", id).returningAll().executeTakeFirstOrThrow();
    };

    public deleteTaskByIDinDB = async (id: string) => {
        return await this.db.deleteFrom("workspaces_tasks").where("id", "=", id).executeTakeFirstOrThrow();
    };
}
