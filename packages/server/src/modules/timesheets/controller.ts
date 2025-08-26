import type { Request, Response, NextFunction } from "express";
import type { NewTimesheet, TimesheetUpdate } from "@syncellus/types/database.js";
import type { TimesheetService } from "@syncellus/modules/timesheets/service.js";
import { sendResponse } from "@syncellus/utils/responseBuilder.js";
import { NotFoundError } from "@syncellus/errors/Errors.js";

export class TimesheetController {
    constructor(private readonly service: TimesheetService) {}
    public createTimesheets = async (req: Request, res: Response, next: NextFunction) => {
        const body = Array.isArray(req.body) ? req.body : [req.body]; //TODO move this out of the controller
        const timesheets: NewTimesheet[] = body.map((timesheet) => ({ ...timesheet }));
        try {
            const newTimesheet = await this.service.insertNewTimesheets(timesheets);
            return sendResponse(res, 201, { message: "Timesheet creation successful", data: newTimesheet });
        } catch (error) {
            next(error);
        }
    };

    public getTimesheets = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const timeshets = await this.service.selectAllTimesheets();
            return sendResponse(res, 200, { message: "Timesheets fetched", data: timeshets });
        } catch (error) {
            next(error);
        }
    };

    public getTimesheetById = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const timesheet = await this.service.selectOneTimesheetById(id);
            if (!timesheet) throw new NotFoundError(`Timesheet with ID ${id} not found!`);
            return sendResponse(res, 200, { message: `Timesheed ${id} fetched`, data: timesheet });
        } catch (error) {
            next(error);
        }
    };

    public patchTimesheet = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const { body } = req;
        const data: TimesheetUpdate = {
            id,
            ...body
        };
        try {
            const patched = await this.service.updateTimesheetById(data);
            if (!patched) throw new NotFoundError(`Timesheet with ID ${id} not found!`);
            return sendResponse(res, 200, { message: `Timesheed ${id} updated`, data: patched });
        } catch (error) {
            next(error);
        }
    };

    public deleteTimesheet = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const deletion = await this.service.deleteTimesheetById(id);
            if (!deletion) throw new NotFoundError(`Timesheet with ID ${id} not found!`);
            return sendResponse(res, 200, { message: `Timesheed ${id} deleted`, data: deletion });
        } catch (error) {
            next(error);
        }
    };
}
