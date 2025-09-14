import type { Request, Response } from "express";
import type { NewTeam } from "@syncellus/types/database.js";
import { sendResponse } from "@syncellus/utils/responseBuilder.js";
import { HttpStatus } from "@syncellus/core/http.js";
import { NotFoundError } from "@syncellus/errors/http.js";
import type { TasksService } from "@syncellus/modules/workspaces/tasks/service.js";

export class TasksController {
    constructor(private readonly service: TasksService) {}

    public createTasks = async (req: Request, res: Response) => {
        const body = Array.isArray(req.body) ? req.body : [req.body];
        const tasks: NewTeam[] = body.map((team) => ({ ...team }));
        const newTasks = await this.service.insertNewTeamTasks(tasks);

        return sendResponse(res, HttpStatus.CREATED, { message: `Team task creation successful`, data: newTasks });
    };

    public getTasks = async (_req: Request, res: Response) => {
        const tasks = await this.service.selectAllTasks();

        return sendResponse(res, HttpStatus.OK, { message: "Teams tasks fetched", data: tasks });
    };

    public getTaskByID = async (req: Request, res: Response) => {
        const { id } = req.params;
        const task = await this.service.selectTaskByID(id);
        if (!task) throw new NotFoundError(`Team task with ID ${id} not found!`);

        return sendResponse(res, HttpStatus.OK, { message: `Team task with ID ${id} fetched`, data: task });
    };

    public patchTask = async (req: Request, res: Response) => {
        const {
            body,
            params: { id }
        } = req;
        const patched = await this.service.updateTaskByID(id, body);
        if (!patched) throw new NotFoundError(`Team task with ID ${id} not found!`);

        return sendResponse(res, HttpStatus.OK, { message: `Team task with ID ${id} updated`, data: patched });
    };

    public deleteTask = async (req: Request, res: Response) => {
        const { id } = req.params;
        const deletion = await this.service.deleteTaskByID(id);
        if (!deletion) throw new NotFoundError(`Team task with ID ${id} not fount!`);

        return sendResponse(res, HttpStatus.OK, { message: `Team task with ID ${id} deleted` });
    };
}
