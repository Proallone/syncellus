import type { NewTimesheet, TimesheetUpdate } from "@syncellus/types/database.js";
import type { TimesheetRepository } from "@syncellus/modules/timesheets/repository.js";

export class TimesheetService {
    constructor(private readonly repo: TimesheetRepository) {}

    public insertNewTimesheets = async (timesheets: NewTimesheet[]) => {
        return await this.repo.insertTimesheetsInDb(timesheets);
    };

    public selectAllTimesheets = async () => {
        return await this.repo.selectAllTimesheetsFromDb();
    };

    public selectOneTimesheetById = async (id: number) => {
        return await this.repo.selectTimesheetByIdFromDb(id);
    };

    public updateTimesheetById = async (timeshet: TimesheetUpdate) => {
        return await this.repo.updateTimesheetByIdInDb(timeshet);
    };

    public deleteTimesheetById = async (id: number) => {
        return await this.repo.deleteTimesheetFromDb(id);
    };

    public selectAllTimesheetsByEmployeeId = async (id: string) => {
        return await this.repo.selectTimesheetsByEmployeeIdFromDb(id);
    };
}
