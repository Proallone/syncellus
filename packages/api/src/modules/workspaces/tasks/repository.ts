import type { Insertable, Updateable } from "kysely";

import { DatabaseService } from "@syncellus/database/database.ts";
import { WorkspacesTasks } from "@syncellus/types/database.d.ts";

const db = DatabaseService.getInstance();

export const selectAllTasksFromDB = async () => {
	return await db.selectFrom("workspaces.tasks").selectAll().execute();
};

export const selectTaskByIDFromDB = async (id: string) => {
	return await db.selectFrom("workspaces.tasks").selectAll().where(
		"id",
		"=",
		id,
	).executeTakeFirst();
};

export const insertTasksToDB = async (tasks: Insertable<WorkspacesTasks>[]) => {
	return await db.insertInto("workspaces.tasks").values(tasks)
		.returningAll().execute();
};

export const updateTaskByIDInDB = async (
	id: string,
	task: Updateable<WorkspacesTasks>,
) => {
	return await db.updateTable("workspaces.tasks").set(task).where(
		"id",
		"=",
		id,
	).returningAll().executeTakeFirstOrThrow();
};

export const deleteTaskByIDinDB = async (id: string) => {
	return await db.deleteFrom("workspaces.tasks").where("id", "=", id)
		.executeTakeFirstOrThrow();
};
