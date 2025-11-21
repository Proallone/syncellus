import type { WorkspacesTasks } from "@syncellus/types/database.d.ts";
import type { Insertable, Updateable } from "kysely";
import { generate as uuidv7 } from "@std/uuid/unstable-v7";
import {
	deleteTaskByIDinDB,
	insertTasksToDB,
	selectAllTasksFromDB,
	selectTaskByIDFromDB,
	updateTaskByIDInDB,
} from "@syncellus/modules/workspaces/tasks/repository.ts";

export const insertNewTasks = async (tasks: Insertable<WorkspacesTasks>[]) => {
	const values = tasks.map((task) => {
		return { id: uuidv7(), name: task.name, team_id: task.team_id };
	});
	return await insertTasksToDB(values);
};

export const selectAllTasks = async () => {
	return await selectAllTasksFromDB();
};

export const selectTaskByID = async (id: string) => {
	return await selectTaskByIDFromDB(id);
};

export const updateTaskByID = async (
	id: string,
	task: Updateable<WorkspacesTasks>,
) => {
	return await updateTaskByIDInDB(id, task);
};

export const deleteTaskByID = async (id: string) => {
	return await deleteTaskByIDinDB(id);
};
