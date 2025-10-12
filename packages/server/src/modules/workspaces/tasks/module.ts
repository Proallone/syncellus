import { DatabaseService } from "@syncellus/database/database.ts";
import { TasksController } from "@syncellus/modules/workspaces/tasks/controller.ts";
import { TasksRepository } from "@syncellus/modules/workspaces/tasks/repository.ts";
import { TasksService } from "@syncellus/modules/workspaces/tasks/service.ts";

export function buildTasksModule() {
    const db = DatabaseService.getInstance();

    const repo = new TasksRepository(db);
    const service = new TasksService(repo);
    const controller = new TasksController(service);

    return controller;
}
