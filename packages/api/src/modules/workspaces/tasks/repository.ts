import type { Insertable, Updateable } from "kysely";

import { DatabaseService } from "@syncellus/database/database.ts";
import { WorkspacesTasks } from "@syncellus/types/database.d.ts";

const db = DatabaseService.getInstance();

const TASKS_TABLE = "workspaces.tasks" as const;

export const selectAllTasksFromDB = async () => {
	return await db.selectFrom(TASKS_TABLE).selectAll().execute();
};

export const selectTaskByIDFromDB = async (id: string) => {
	return await db.selectFrom(TASKS_TABLE).selectAll().where(
		"id",
		"=",
		id,
	).executeTakeFirst();
};

export const insertTasksToDB = async (tasks: Insertable<WorkspacesTasks>[]) => {
	return await db.insertInto(TASKS_TABLE).values(tasks)
		.returningAll().execute();
};

export const updateTaskByIDInDB = async (
	id: string,
	task: Updateable<WorkspacesTasks>,
) => {
	return await db.updateTable(TASKS_TABLE).set(task).where(
		"id",
		"=",
		id,
	).returningAll().executeTakeFirstOrThrow();
};

export const deleteTaskByIDinDB = async (id: string) => {
	return await db.deleteFrom(TASKS_TABLE).where("id", "=", id)
		.executeTakeFirstOrThrow();
};
