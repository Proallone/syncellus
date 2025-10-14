import { DatabaseService } from "@syncellus/database/database.ts";
import { TeamsController } from "@syncellus/modules/workspaces/teams/controller.ts";
import { WorkspacesRepository } from "@syncellus/modules/workspaces/teams/repository.ts";
import { TeamsService } from "@syncellus/modules/workspaces/teams/service.ts";

export function buildTeamsModule() {
  const db = DatabaseService.getInstance();

  const repo = new WorkspacesRepository(db);
  const service = new TeamsService(repo);
  const controller = new TeamsController(service);

  return controller;
}
