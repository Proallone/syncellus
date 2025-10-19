import type { TimesheetsRepository } from "@syncellus/modules/workspaces/timesheets/repository.ts";
import type { ITimesheetsService } from "@syncellus/modules/workspaces/timesheets/types.d.ts";
import type { WorkspacesTimesheets } from "@syncellus/types/database.d.ts";
import type { Insertable, Updateable } from "kysely";
import { uuidv7 } from "uuidv7";

export class TimesheetsService implements ITimesheetsService {
  constructor(private readonly repo: TimesheetsRepository) {}

  public insertNewTimesheets = async (
    timesheets: Insertable<WorkspacesTimesheets>[],
  ) => {
    const values = timesheets.map((timesheet) => {
      return { id: uuidv7(), ...timesheet };
    });
    return await this.repo.insertTimesheetsInDb(values);
  };

  public selectAllTimesheets = async () => {
    return await this.repo.selectAllTimesheetsFromDb();
  };

  public selectOneTimesheetById = async (id: string) => {
    return await this.repo.selectTimesheetByIdFromDb(id);
  };

  public updateTimesheetById = async (
    timesheet: Updateable<WorkspacesTimesheets>,
  ) => {
    return await this.repo.updateTimesheetByIdInDb(timesheet);
  };

  public deleteTimesheetById = async (id: string) => {
    return await this.repo.deleteTimesheetFromDb(id);
  };

  public selectAllTimesheetsByEmployeeId = async (id: string) => {
    return await this.repo.selectTimesheetsByEmployeeIdFromDb(id);
  };
}
