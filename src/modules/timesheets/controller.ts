import { Request, Response, NextFunction } from "express";
import { createTimesheetInDb, getAllTimesheets } from "./model.js";
import type { NewTimesheet } from "../../types/database.js";

const createTimesheet = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const timesheet: NewTimesheet = { ...req.body };
        const newTimesheet = await createTimesheetInDb(timesheet);
        res.status(201).json(newTimesheet);
    } catch (error) {
        next(error);
    }
};

const getTimesheets = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const timeshets = await getAllTimesheets();
    res.status(200).send(timeshets);
};

const getTimesheetById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(201).json({ test: `test timesheet get id = ${req.params}` });
};

export { createTimesheet, getTimesheets, getTimesheetById };
