import { DatabaseService } from "@syncellus/database/database.js";
import { WorkspacesRepository } from "@syncellus/modules/workspaces/repository.js";
import { WorkspacesService } from "@syncellus/modules/workspaces/service.js";
import { WorkspacesController } from "@syncellus/modules/workspaces/controller.js";

export function buildWorkspacesModule() {
    const db = DatabaseService.getInstance();

    const repo = new WorkspacesRepository(db);
    const service = new WorkspacesService(repo);
    const controller = new WorkspacesController(service);

    return { controller };
}
