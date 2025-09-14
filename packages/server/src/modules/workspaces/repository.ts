import type { Database, NewTeam, NewTeamTask, TeamTaskUpdate, TeamUpdate } from "@syncellus/types/database.js";
import type { Kysely } from "kysely";
import type { IWorkspacesRepository } from "./types.js";

export class WorkspacesRepository implements IWorkspacesRepository {
    constructor(private readonly db: Kysely<Database>) {}

    public selectAllTeamsFromDB = async () => {
        return await this.db.selectFrom("workspaces_teams").selectAll().execute();
    };

    public selectTeamByIDFromDB = async (id: string) => {
        return await this.db.selectFrom("workspaces_teams").selectAll().where("id", "=", id).executeTakeFirst();
    };

    public selectTeamByPublicIDFromDB = async (public_id: string) => {
        return await this.db.selectFrom("workspaces_teams").selectAll().where("public_id", "=", public_id).executeTakeFirst();
    };

    public insertTeamsToDB = async (teams: NewTeam[]) => {
        return await this.db.insertInto("workspaces_teams").values(teams).returningAll().execute();
    };

    public updateTeamByIDInDB = async (id: string, data: TeamUpdate) => {
        return await this.db.updateTable("workspaces_teams").set(data).where("id", "=", id).returningAll().executeTakeFirstOrThrow();
    };

    public deleteTeamByIDFromDB = async (id: string) => {
        return await this.db.deleteFrom("workspaces_teams").where("id", "=", id).executeTakeFirstOrThrow();
    };

    public selectAllTasksFromDB = async () => {
        return await this.db.selectFrom("workspaces_team_tasks").selectAll().execute();
    };

    public selectTaskByIDFromDB = async (id: string) => {
        return await this.db.selectFrom("workspaces_team_tasks").selectAll().where("id", "=", id).executeTakeFirst();
    };

    public insertTasksToDB = async (tasks: NewTeamTask[]) => {
        return await this.db.insertInto("workspaces_team_tasks").values(tasks).returningAll().execute();
    };

    public updateTaskByIDInDB = async (id: string, task: TeamTaskUpdate) => {
        return await this.db.updateTable("workspaces_team_tasks").set(task).where("id", "=", id).returningAll().executeTakeFirstOrThrow();
    };

    public deleteTaskByIDinDB = async (id: string) => {
        return await this.db.deleteFrom("workspaces_team_tasks").where("id", "=", id).executeTakeFirstOrThrow();
    };
}
