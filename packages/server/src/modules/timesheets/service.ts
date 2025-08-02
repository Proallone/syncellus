import type { NewTimesheet, TimesheetUpdate } from "@syncellus/types/database.js";
import {
    insertTimesheetInDb,
    selectAllTimesheetsFromDb,
    selectTimesheetByIdFromDb,
    updateTimesheetByIdInDb,
    deleteTimesheetFromDb,
    selectTimesheetsByEmployeeIdFromDb
} from "@syncellus/modules/timesheets/repository.js";

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

const selectAllTimesheetsByEmployeeId = async (id: number) => {
    return await selectTimesheetsByEmployeeIdFromDb(id);
};

export { insertNewTimesheet, selectAllTimesheets, selectOneTimesheetById, updateTimesheetById, deleteTimesheetById, selectAllTimesheetsByEmployeeId };
