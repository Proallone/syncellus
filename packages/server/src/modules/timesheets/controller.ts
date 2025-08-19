import type { Request, Response, NextFunction } from "express";
import type { NewTimesheet, TimesheetUpdate } from "@syncellus/types/database.js";
import type { TimesheetService } from "@syncellus/modules/timesheets/service.js";

export class TimesheetController {
    constructor(private readonly service: TimesheetService) {}
    public createTimesheets = async (req: Request, res: Response, next: NextFunction) => {
        const body = Array.isArray(req.body) ? req.body : [req.body]; //TODO move this out of the controller
        const timesheets: NewTimesheet[] = body.map((timesheet) => ({ ...timesheet }));
        try {
            const newTimesheet = await this.service.insertNewTimesheets(timesheets);
            return res.status(201).json(newTimesheet);
        } catch (error) {
            next(error);
        }
    };

    public getTimesheets = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const timeshets = await this.service.selectAllTimesheets();
            return res.status(200).send(timeshets);
        } catch (error) {
            next(error);
        }
    };

    public getTimesheetById = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const timesheet = await this.service.selectOneTimesheetById(id);
            if (!timesheet) {
                return res.status(404).send({
                    message: `Timesheet with ID ${id} not found!`
                });
            }
            return res.status(200).send(timesheet);
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
            if (!patched) {
                return res.status(404).send({
                    message: `Timesheet with ID ${id} not found!`
                });
            }
            return res.status(200).send(patched);
        } catch (error) {
            next(error);
        }
    };

    public deleteTimesheet = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const deletion = await this.service.deleteTimesheetById(id);
            if (!deletion) {
                return res.status(404).send({
                    message: `Timesheet with ID ${id} not found!`
                });
            }
            return res.status(200).send({
                message: `Timesheet with ID ${id} deleted!`
            });
        } catch (error) {
            next(error);
        }
    };
}
