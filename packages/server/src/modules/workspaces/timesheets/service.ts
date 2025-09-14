import type { NewTimesheet, TimesheetUpdate } from "@syncellus/types/database.js";
import type { TimesheetsRepository } from "@syncellus/modules/workspaces/timesheets/repository.js";
import { ITimesheetsService } from "@syncellus/modules/workspaces/timesheets/types.js";

export class TimesheetsService implements ITimesheetsService {
    constructor(private readonly repo: TimesheetsRepository) {}

    public insertNewTimesheets = async (timesheets: NewTimesheet[]) => {
        return await this.repo.insertTimesheetsInDb(timesheets);
    };

    public selectAllTimesheets = async () => {
        return await this.repo.selectAllTimesheetsFromDb();
    };

    public selectOneTimesheetById = async (id: string) => {
        return await this.repo.selectTimesheetByIdFromDb(id);
    };

    public updateTimesheetById = async (timesheet: TimesheetUpdate) => {
        return await this.repo.updateTimesheetByIdInDb(timesheet);
    };

    public deleteTimesheetById = async (id: string) => {
        return await this.repo.deleteTimesheetFromDb(id);
    };

    public selectAllTimesheetsByEmployeeId = async (id: string) => {
        return await this.repo.selectTimesheetsByEmployeeIdFromDb(id);
    };
}
