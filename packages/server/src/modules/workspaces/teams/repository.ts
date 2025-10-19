import type { ITeamsRepository } from "@syncellus/modules/workspaces/teams/types.d.ts";
import type { DB, WorkspacesTeams } from "@syncellus/types/database.d.ts";
import type { Insertable, Kysely, Updateable } from "kysely";

export class WorkspacesRepository implements ITeamsRepository {
  constructor(private readonly db: Kysely<DB>) {}

  public selectAllTeamsFromDB = async () => {
    return await this.db.selectFrom("workspaces.teams").selectAll().execute();
  };

  public selectTeamByIDFromDB = async (id: string) => {
    return await this.db.selectFrom("workspaces.teams").selectAll().where(
      "id",
      "=",
      id,
    ).executeTakeFirst();
  };

  public selectTeamByPublicIDFromDB = async (public_id: string) => {
    return await this.db.selectFrom("workspaces.teams").selectAll().where(
      "public_id",
      "=",
      public_id,
    ).executeTakeFirst();
  };

  public insertTeamsToDB = async (teams: Insertable<WorkspacesTeams>[]) => {
    return await this.db.insertInto("workspaces.teams").values(teams)
      .returningAll().execute();
  };

  public updateTeamByIDInDB = async (
    id: string,
    data: Updateable<WorkspacesTeams>,
  ) => {
    return await this.db.updateTable("workspaces.teams").set(data).where(
      "id",
      "=",
      id,
    ).returningAll().executeTakeFirstOrThrow();
  };

  public deleteTeamByIDFromDB = async (id: string) => {
    return await this.db.deleteFrom("workspaces.teams").where("id", "=", id)
      .executeTakeFirstOrThrow();
  };
}
