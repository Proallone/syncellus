import type { NewTimesheet, Timesheet, TimesheetUpdate } from "@syncellus/types/database.js";
import type { DeleteResult } from "kysely";

export interface ITimesheetsRepository {
    selectAllTimesheetsFromDb(): Promise<Timesheet[]>;
    selectTimesheetByIdFromDb(id: string): Promise<Timesheet>;
    insertTimesheetsInDb(timesheets: NewTimesheet[]): Promise<Timesheet[]>;
    selectTimesheetsByEmployeeIdFromDb(employeeId: string): Promise<Timesheet[]>;
    updateTimesheetByIdInDb(timesheet: TimesheetUpdate): Promise<Timesheet>;
    deleteTimesheetFromDb(id: string): Promise<DeleteResult>;
}

export interface ITimesheetsService {
    insertNewTimesheets(timesheets: NewTimesheet[]): Promise<Timesheet[]>;
    selectAllTimesheets(): Promise<Timesheet[]>;
    selectOneTimesheetById(id: string): Promise<Timesheet>;
    updateTimesheetById(timesheet: TimesheetUpdate): Promise<Timesheet>;
    deleteTimesheetById(id: string): Promise<DeleteResult>;
    selectAllTimesheetsByEmployeeId(id: string): Promise<Timesheet[]>;
}
