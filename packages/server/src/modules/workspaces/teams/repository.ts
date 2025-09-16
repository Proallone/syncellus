import type { DB, WorkspacesTeams } from "@syncellus/types/database.js";
import type { Insertable, Kysely, Updateable } from "kysely";
import type { ITeamsRepository } from "@syncellus/modules/workspaces/teams/types.js";

export class WorkspacesRepository implements ITeamsRepository {
    constructor(private readonly db: Kysely<DB>) {}

    public selectAllTeamsFromDB = async () => {
        return await this.db.selectFrom("workspaces_teams").selectAll().execute();
    };

    public selectTeamByIDFromDB = async (id: string) => {
        return await this.db.selectFrom("workspaces_teams").selectAll().where("id", "=", id).executeTakeFirst();
    };

    public selectTeamByPublicIDFromDB = async (public_id: string) => {
        return await this.db.selectFrom("workspaces_teams").selectAll().where("public_id", "=", public_id).executeTakeFirst();
    };

    public insertTeamsToDB = async (teams: Insertable<WorkspacesTeams>[]) => {
        return await this.db.insertInto("workspaces_teams").values(teams).returningAll().execute();
    };

    public updateTeamByIDInDB = async (id: string, data: Updateable<WorkspacesTeams>) => {
        return await this.db.updateTable("workspaces_teams").set(data).where("id", "=", id).returningAll().executeTakeFirstOrThrow();
    };

    public deleteTeamByIDFromDB = async (id: string) => {
        return await this.db.deleteFrom("workspaces_teams").where("id", "=", id).executeTakeFirstOrThrow();
    };
}
