import { HttpStatus } from "@syncellus/core/http.ts";
import { NotFoundError } from "@syncellus/errors/http.ts";
import type { TasksService } from "@syncellus/modules/workspaces/tasks/service.ts";
import type { WorkspacesTeams } from "@syncellus/types/database.d.ts";
import { sendResponse } from "@syncellus/utils/responseBuilder.ts";
import type { Request, Response } from "express";
import type { Selectable } from "kysely";

export class TasksController {
  constructor(private readonly service: TasksService) {}

  public createTasks = async (req: Request, res: Response) => {
    const body = Array.isArray(req.body) ? req.body : [req.body];
    const tasks: Selectable<WorkspacesTeams>[] = body.map((team) => ({
      ...team,
    }));
    const newTasks = await this.service.insertNewTasks(tasks);

    return sendResponse(res, HttpStatus.CREATED, {
      message: `Task creation successful`,
      data: newTasks,
    });
  };

  public getTasks = async (_req: Request, res: Response) => {
    const tasks = await this.service.selectAllTasks();

    return sendResponse(res, HttpStatus.OK, {
      message: "TGasks fetched",
      data: tasks,
    });
  };

  public getTaskByID = async (req: Request, res: Response) => {
    const { id } = req.params;
    const task = await this.service.selectTaskByID(id);
    if (!task) throw new NotFoundError(`Task with ID ${id} not found!`);

    return sendResponse(res, HttpStatus.OK, {
      message: `Task with ID ${id} fetched`,
      data: task,
    });
  };

  public patchTask = async (req: Request, res: Response) => {
    const {
      body,
      params: { id },
    } = req;
    const patched = await this.service.updateTaskByID(id, body);
    if (!patched) throw new NotFoundError(`Task with ID ${id} not found!`);

    return sendResponse(res, HttpStatus.OK, {
      message: `Task with ID ${id} updated`,
      data: patched,
    });
  };

  public deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletion = await this.service.deleteTaskByID(id);
    if (!deletion.numDeletedRows) {
      throw new NotFoundError(`Task with ID ${id} not fount!`);
    }

    return sendResponse(res, HttpStatus.OK, {
      message: `Task with ID ${id} deleted`,
    });
  };
}
