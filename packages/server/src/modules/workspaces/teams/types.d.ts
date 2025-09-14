import type { NewTeam, Team, TeamUpdate } from "@syncellus/types/database.js";
import type { DeleteResult } from "kysely";

export interface ITeamsRepository {
    selectAllTeamsFromDB(): Promise<Team[]>;
    selectTeamByIDFromDB(id: string): Promise<Team>;
    selectTeamByPublicIDFromDB(public_id: string): Promise<Team>;
    insertTeamsToDB(team: NewTeam): Promise<Team[]>;
    updateTeamByIDInDB(id: string, data: TeamUpdate): Promise<Team>;
    deleteTeamByIDFromDB(id: string): Promise<DeleteResult>;
}

export interface ITeamsService {
    insertNewTeams(owner_id: string, teams: NewTeam[]): Promise<Team[]>;
    selectAllTeams(): Promise<Team[]>;
    selectOneTeamByID(id: string): Promise<Team>;
    selectOneTeamByPublicID(public_id: string): Promise<Team>;
    updateTeamByID(id: string, team: TeamUpdate): Promise<Team>;
    deleteTeamByID(id: string): Promise<DeleteResult>;
}
