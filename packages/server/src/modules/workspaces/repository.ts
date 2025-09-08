import type { Database, NewTeam, TeamUpdate } from "@syncellus/types/database.js";
import type { Kysely } from "kysely";

export class WorkspacesRepository {
    constructor(private readonly db: Kysely<Database>) {}

    public selectAllTeamsFromDB = async () => {
        return await this.db.selectFrom("workspaces_teams").selectAll().execute();
    };

    public selectTeamByIDFromDB = async (id: string) => {
        return await this.db.selectFrom("workspaces_teams").selectAll().where("id", "=", id).execute();
    };

    public selectTeamByPublicIDFromDB = async (public_id: string) => {
        return await this.db.selectFrom("workspaces_teams").selectAll().where("public_id", "=", public_id).execute();
    };

    public insertTeamToDB = async (team: NewTeam) => {
        return await this.db.insertInto("workspaces_teams").values(team).returningAll().executeTakeFirstOrThrow();
    };

    public updateTeamByIDInDB = async (id: string, data: TeamUpdate) => {
        return await this.db.updateTable("workspaces_teams").set(data).where("id", "=", id).returningAll().executeTakeFirstOrThrow();
    };

    public deleteTeamByIDFromDB = async (id: string) => {
        return await this.db.deleteFrom("workspaces_teams").where("id", "=", id).executeTakeFirstOrThrow();
    };
}
