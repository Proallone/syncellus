import { DatabaseService } from "@syncellus/database/database.js";
import { WorkspacesRepository } from "@syncellus/modules/workspaces/teams/repository.js";
import { TeamsService } from "@syncellus/modules/workspaces/teams/service.js";
import { TeamsController } from "@syncellus/modules/workspaces/teams/controller.js";

export function buildTeamsModule() {
    const db = DatabaseService.getInstance();

    const repo = new WorkspacesRepository(db);
    const service = new TeamsService(repo);
    const controller = new TeamsController(service);

    return controller;
}
