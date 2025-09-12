import type { Request, Response } from "express";
import type { NewTimesheet } from "@syncellus/types/database.js";
import type { TimesheetService } from "@syncellus/modules/timesheets/service.js";
import type { NewTimesheetBody } from "@syncellus/types/index.js";
import { sendResponse } from "@syncellus/utils/responseBuilder.js";
import { NotFoundError } from "@syncellus/errors/http.js";
import { HttpStatus } from "@syncellus/core/http.js";
import { TypedRequest } from "@syncellus/types/express.js";

export class TimesheetController {
    constructor(private readonly service: TimesheetService) {}

    public createTimesheets = async (req: TypedRequest<NewTimesheetBody>, res: Response) => {
        const body = Array.isArray(req.body) ? req.body : [req.body]; //TODO move this out of the controller
        const timesheets: NewTimesheet[] = body.map((timesheet) => ({ ...timesheet }));
        const newTimesheet = await this.service.insertNewTimesheets(timesheets);

        return sendResponse(res, HttpStatus.CREATED, { message: "Timesheet creation successful", data: newTimesheet });
    };

    public getTimesheets = async (_req: Request, res: Response) => {
        const timeshets = await this.service.selectAllTimesheets();

        return sendResponse(res, HttpStatus.OK, { message: "Timesheets fetched", data: timeshets });
    };

    public getTimesheetById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const timesheet = await this.service.selectOneTimesheetById(id);
        if (!timesheet) throw new NotFoundError(`Timesheet with ID ${id} not found!`);

        return sendResponse(res, HttpStatus.OK, { message: `Timesheed ${id} fetched`, data: timesheet });
    };

    public patchTimesheet = async (req: Request, res: Response) => {
        const {
            body,
            params: { id }
        } = req;
        const patched = await this.service.updateTimesheetById({ id, ...body });
        if (!patched) throw new NotFoundError(`Timesheet with ID ${id} not found!`);

        return sendResponse(res, HttpStatus.OK, { message: `Timesheed ${id} updated`, data: patched });
    };

    public deleteTimesheet = async (req: Request, res: Response) => {
        const { id } = req.params;
        const deletion = await this.service.deleteTimesheetById(id);
        if (!deletion) throw new NotFoundError(`Timesheet with ID ${id} not found!`);

        return sendResponse(res, HttpStatus.OK, { message: `Timesheed ${id} deleted`, data: deletion });
    };
}
