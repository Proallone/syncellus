import type { ITasksRepository } from "@syncellus/modules/workspaces/tasks/types.d.ts";
import type { DB, WorkspacesTasks } from "@syncellus/types/database.d.ts";
import type { Insertable, Kysely, Updateable } from "kysely";

export class TasksRepository implements ITasksRepository {
    constructor(private readonly db: Kysely<DB>) {}

    public selectAllTasksFromDB = async () => {
        return await this.db.selectFrom("workspaces.tasks").selectAll().execute();
    };

    public selectTaskByIDFromDB = async (id: string) => {
        return await this.db.selectFrom("workspaces.tasks").selectAll().where("id", "=", id).executeTakeFirst();
    };

    public insertTasksToDB = async (tasks: Insertable<WorkspacesTasks>[]) => {
        return await this.db.insertInto("workspaces.tasks").values(tasks).returningAll().execute();
    };

    public updateTaskByIDInDB = async (id: string, task: Updateable<WorkspacesTasks>) => {
        return await this.db.updateTable("workspaces.tasks").set(task).where("id", "=", id).returningAll().executeTakeFirstOrThrow();
    };

    public deleteTaskByIDinDB = async (id: string) => {
        return await this.db.deleteFrom("workspaces.tasks").where("id", "=", id).executeTakeFirstOrThrow();
    };
}
