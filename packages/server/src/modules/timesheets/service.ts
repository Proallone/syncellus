import type { NewTimesheet, TimesheetUpdate } from "@syncellus/types/database.js";
import {
    insertTimesheetsInDb,
    selectAllTimesheetsFromDb,
    selectTimesheetByIdFromDb,
    updateTimesheetByIdInDb,
    deleteTimesheetFromDb,
    selectTimesheetsByEmployeeIdFromDb
} from "@syncellus/modules/timesheets/repository.js";

const insertNewTimesheets = async (timesheets: NewTimesheet[]) => {
    return await insertTimesheetsInDb(timesheets);
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

export { insertNewTimesheets, selectAllTimesheets, selectOneTimesheetById, updateTimesheetById, deleteTimesheetById, selectAllTimesheetsByEmployeeId };
