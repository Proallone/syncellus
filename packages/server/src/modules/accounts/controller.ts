import type { Request, Response } from "express";
import type { AccountsService } from "@syncellus/modules/accounts/service.js";
import type { EmployeeUpdate, NewTimesheet } from "@syncellus/types/database.js";
import type { TimesheetService } from "@syncellus/modules/timesheets/service.js";
import { uuidv7 } from "uuidv7";
import { sendResponse } from "@syncellus/utils/responseBuilder.js";
import { HttpStatus } from "@syncellus/core/http.js";
import { NotFoundError } from "@syncellus/errors/http.js";
import { TypedRequest } from "@syncellus/types/express.js";
import { NewAccountBody } from "@syncellus/types/index.js";

export class AccountsController {
    constructor(
        private readonly service: AccountsService,
        private readonly timesheetService: TimesheetService
    ) {}

    public createAccount = async (req: TypedRequest<NewAccountBody>, res: Response) => {
        const employee = req.body;
        const newEmployee = await this.service.insertNewAccount(employee);
        return sendResponse(res, HttpStatus.CREATED, { message: "Account created", data: newEmployee });
    };

    public getAccounts = async (req: Request, res: Response) => {
        const { query } = req;
        const employees = await this.service.selectAllAccounts(query);
        return sendResponse(res, HttpStatus.OK, { message: "Accounts data fetched", data: employees });
    };

    public getOneAccount = async (req: Request, res: Response) => {
        const { id } = req.params;
        const employee = await this.service.selectOneAccountById(id);
        if (!employee) throw new NotFoundError(`Account with ID ${id} not found!`);
        return sendResponse(res, HttpStatus.OK, { message: "Account data fetched", data: employee });
    };

    public updateAccount = async (req: TypedRequest<EmployeeUpdate>, res: Response) => {
        const { id } = req.params;
        const data = req.body;
        const update: EmployeeUpdate = {
            id,
            ...data
        };
        const patched = await this.service.updateAccountById(update);
        if (!patched) throw new NotFoundError(`Account with ID ${id} not found!`);
        return sendResponse(res, HttpStatus.OK, { message: `Account ${id} updated successfully`, data: patched });
    };

    public deleteAccount = async (req: Request, res: Response) => {
        const { id } = req.params;
        const deletion = await this.service.deleteAccountById(id);
        if (!deletion.numDeletedRows) throw new NotFoundError(`Account with ID ${id} not found!`);
        return sendResponse(res, HttpStatus.OK, { message: `Account ${id} deleted successfully`, data: deletion });
    };

    public getTimesheetsByAccount = async (req: Request, res: Response) => {
        const { employeeId } = req.params;
        const timesheets = await this.timesheetService.selectAllTimesheetsByEmployeeId(employeeId);

        if (!timesheets || timesheets.length === 0) throw new NotFoundError(`No timesheets found for this account with the given criteria.`);
        return sendResponse(res, HttpStatus.OK, { message: `Timesheets for account ${employeeId} fetched`, data: timesheets });
    };

    public createTimesheetForAccount = async (req: Request, res: Response) => {
        const { employeeId } = req.params;
        const body = Array.isArray(req.body) ? req.body : [req.body];

        const timesheets: NewTimesheet[] = body.map((timesheet) => ({ id: uuidv7(), employee_id: employeeId, ...timesheet }));

        const newTimesheet = await this.timesheetService.insertNewTimesheets(timesheets);
        return sendResponse(res, HttpStatus.CREATED, { message: `New timesheet for account ${employeeId} created`, data: newTimesheet });
    };
}
