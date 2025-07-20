import { Request, Response, NextFunction } from "express";
import { createTimesheetInDb, Timesheet } from "./model.js";

const createTimesheet = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const timesheet: Timesheet = { ...req.body };
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
    res.status(200).json({ test: "test timesheet get all" });
};

const getTimesheetById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(201).json({ test: `test timesheet get id = ${req.params}` });
};

export { createTimesheet, getTimesheets, getTimesheetById };
