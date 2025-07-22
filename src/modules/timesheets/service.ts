import type { NewTimesheet, TimesheetUpdate } from "../../types/database.js";
import {
    insertTimesheetInDb,
    selectAllTimesheetsFromDb,
    selectTimesheetByIdFromDb,
    updateTimesheetByIdInDb,
    deleteTimesheetFromDb
} from "./repository.js";

const insertNewTimesheet = async (timesheet: NewTimesheet) => {
    return await insertTimesheetInDb(timesheet);
};

const selectAllTimesheets = async () => {
    return await selectAllTimesheetsFromDb();
};

const selectOneTimesheetById = async (id: number) => {
    return await selectTimesheetByIdFromDb(id);
};

const updateTimesheetById = async (timeshet: TimesheetUpdate) => {
    return await updateTimesheetByIdInDb(timeshet);
};

const deleteTimesheetById = async (id: number) => {
    return await deleteTimesheetFromDb(id);
};

export {
    insertNewTimesheet,
    selectAllTimesheets,
    selectOneTimesheetById,
    updateTimesheetById,
    deleteTimesheetById
};
