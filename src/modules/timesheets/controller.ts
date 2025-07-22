import { Request, Response, NextFunction } from "express";
import type { NewTimesheet, TimesheetUpdate } from "../../types/database.js";
import {
    deleteTimesheetById,
    insertNewTimesheet,
    selectAllTimesheets,
    selectOneTimesheetById,
    updateTimesheetById
} from "./service.js";

const createTimesheet = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const timesheet: NewTimesheet = { ...req.body };
        const newTimesheet = await insertNewTimesheet(timesheet);
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
    const timeshets = await selectAllTimesheets();
    res.status(200).send(timeshets);
};

const getTimesheetById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const timesheet = await selectOneTimesheetById(Number(id));
    if (!timesheet)
        return res
            .status(404)
            .send({ message: `Timesheet with ID ${id} not found!` });
    return res.status(200).send(timesheet);
};

const patchTimesheet = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const data: TimesheetUpdate = { id, ...body };
        const patched = await updateTimesheetById(data);
        if (!patched)
            return res
                .status(404)
                .send({ message: `Timesheet with ID ${id} not found!` });
        return res.status(200).send(patched);
    } catch (error) {
        next(error);
    }
};

const deleteTimesheet = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    try {
        const deletion = await deleteTimesheetById(Number(id));
        if (!deletion)
            return res
                .status(404)
                .send({ message: `Timesheet with ID ${id} not found!` });
        return res
            .status(200)
            .send({ message: `Timesheet with ID ${id} deleted!` });
    } catch (error) {
        next(error);
    }
};

export {
    createTimesheet,
    getTimesheets,
    getTimesheetById,
    patchTimesheet,
    deleteTimesheet
};
