import type { WorkspacesTeams } from "@syncellus/types/database.d.ts";
import type { DeleteResult, Insertable, Selectable, Updateable } from "kysely";

export interface ITeamsRepository {
  selectAllTeamsFromDB(): Promise<Selectable<WorkspacesTeams>[]>;
  selectTeamByIDFromDB(id: string): Promise<Selectable<WorkspacesTeams>>;
  selectTeamByPublicIDFromDB(
    public_id: string,
  ): Promise<Selectable<WorkspacesTeams>>;
  insertTeamsToDB(
    team: Insertable<WorkspacesTeams>,
  ): Promise<Selectable<WorkspacesTeams>[]>;
  updateTeamByIDInDB(
    id: string,
    data: Updateable<WorkspacesTeams>,
  ): Promise<Selectable<WorkspacesTeams>>;
  deleteTeamByIDFromDB(id: string): Promise<DeleteResult>;
}

export interface ITeamsService {
  insertNewTeams(
    owner_id: string,
    teams: Insertable<WorkspacesTeams>[],
  ): Promise<Selectable<WorkspacesTeams>[]>;
  selectAllTeams(): Promise<Selectable<WorkspacesTeams>[]>;
  selectOneTeamByID(id: string): Promise<Selectable<WorkspacesTeams>>;
  selectOneTeamByPublicID(
    public_id: string,
  ): Promise<Selectable<WorkspacesTeams>>;
  updateTeamByID(
    id: string,
    team: Updateable<WorkspacesTeams>,
  ): Promise<Selectable<WorkspacesTeams>>;
  deleteTeamByID(id: string): Promise<DeleteResult>;
}
