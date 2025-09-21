import type { TeamsService } from "@syncellus/modules/workspaces/teams/service.js";
import type { Request, Response } from "express";
import type { AuthUsers, WorkspacesTeams } from "@syncellus/types/database.js";
import type { Selectable } from "kysely";
import { sendResponse } from "@syncellus/utils/responseBuilder.js";
import { HttpStatus } from "@syncellus/core/http.js";
import { NotFoundError } from "@syncellus/errors/http.js";

export class TeamsController {
    constructor(private readonly service: TeamsService) {}

    public createTeams = async (req: Request, res: Response) => {
        const body = Array.isArray(req.body) ? req.body : [req.body];
        const teams: Selectable<WorkspacesTeams>[] = body.map((team) => ({ ...team }));
        const user = req.user as AuthUsers;
        const newTeams = await this.service.insertNewTeams(user.id, teams);

        return sendResponse(res, HttpStatus.CREATED, { message: `Team creation successful`, data: newTeams });
    };

    public getTeams = async (_req: Request, res: Response) => {
        const teams = await this.service.selectAllTeams();

        return sendResponse(res, HttpStatus.OK, { message: "Teams fetched", data: teams });
    };

    public getTeamByID = async (req: Request, res: Response) => {
        const { id } = req.params;
        const team = await this.service.selectOneTeamByID(id);
        if (!team) throw new NotFoundError(`Team with ID ${id} not found!`);

        return sendResponse(res, HttpStatus.OK, { message: `Team with ID ${id} fetched`, data: team });
    };

    public patchTeam = async (req: Request, res: Response) => {
        const {
            body,
            params: { id }
        } = req;
        const patched = await this.service.updateTeamByID(id, body);
        if (!patched) throw new NotFoundError(`Team with ID ${id} not found!`);

        return sendResponse(res, HttpStatus.OK, { message: `Team with ID ${id} updated`, data: patched });
    };

    public deleteTeam = async (req: Request, res: Response) => {
        const { id } = req.params;
        const deletion = await this.service.deleteTeamByID(id);
        if (!deletion.numDeletedRows) throw new NotFoundError(`Team with ID ${id} not fount!`);

        return sendResponse(res, HttpStatus.OK, { message: `Team with ID ${id} deleted` });
    };
}
