import type { WorkspacesTimesheets } from "@syncellus/types/database.d.ts";
import type { DeleteResult, Insertable, Selectable, Updateable } from "kysely";

export interface ITimesheetsRepository {
    selectAllTimesheetsFromDb(): Promise<Selectable<WorkspacesTimesheets>[]>;
    selectTimesheetByIdFromDb(id: string): Promise<Selectable<WorkspacesTimesheets>>;
    insertTimesheetsInDb(timesheets: Insertable<WorkspacesTimesheets>[]): Promise<Selectable<WorkspacesTimesheets>[]>;
    selectTimesheetsByEmployeeIdFromDb(employeeId: string): Promise<Selectable<WorkspacesTimesheets>[]>;
    updateTimesheetByIdInDb(timesheet: Updateable<WorkspacesTimesheets>): Promise<Selectable<WorkspacesTimesheets>>;
    deleteTimesheetFromDb(id: string): Promise<DeleteResult>;
}

export interface ITimesheetsService {
    insertNewTimesheets(timesheets: Insertable<WorkspacesTimesheets>[][]): Promise<Selectable<WorkspacesTimesheets>[]>;
    selectAllTimesheets(): Promise<Selectable<WorkspacesTimesheets>[]>;
    selectOneTimesheetById(id: string): Promise<Selectable<WorkspacesTimesheets>>;
    updateTimesheetById(timesheet: Updateable<WorkspacesTimesheets>): Promise<Selectable<WorkspacesTimesheets>>;
    deleteTimesheetById(id: string): Promise<DeleteResult>;
    selectAllTimesheetsByEmployeeId(id: string): Promise<Selectable<WorkspacesTimesheets>[]>;
}
