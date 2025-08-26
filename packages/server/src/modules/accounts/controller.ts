import type { Request, Response } from "express";
import type { EmployeeService } from "@syncellus/modules/accounts/service.js";
import type { EmployeeUpdate, NewEmployee, NewTimesheet } from "@syncellus/types/database.js";
import type { TimesheetService } from "@syncellus/modules/timesheets/service.js";
import { uuidv7 } from "uuidv7";
import { sendResponse } from "@syncellus/utils/responseBuilder.js";
import { HttpStatus } from "@syncellus/core/http.js";
import { NotFoundError } from "@syncellus/errors/errors.js";
import { handlerWrapper } from "@syncellus/utils/handlerWrapper.js";

export class EmployeeController {
    constructor(
        private readonly service: EmployeeService,
        private readonly timesheetService: TimesheetService
    ) {}

    public createEmployee = handlerWrapper(async (req: Request, res: Response) => {
        const { body } = req;
        const employee: NewEmployee = {
            ...body
        };
        const newEmployee = await this.service.insertNewEmployee(employee);
        return sendResponse(res, HttpStatus.CREATED, { message: "Profile created", data: newEmployee });
    });

    public getEmployees = handlerWrapper(async (req: Request, res: Response) => {
        const { query } = req;
        const employees = await this.service.selectAllEmployees(query);
        return sendResponse(res, HttpStatus.OK, { message: "Profiles data fetched", data: employees });
    });

    public getEmployee = handlerWrapper(async (req: Request, res: Response) => {
        const { id } = req.params;
        const employee = await this.service.selectOneEmployeeById(id);
        if (!employee) throw new NotFoundError(`Employee with ID ${id} not found!`);
        return sendResponse(res, HttpStatus.OK, { message: "Profile data fetched", data: employee });
    });

    public patchEmployee = handlerWrapper(async (req: Request, res: Response) => {
        const { id } = req.params;
        const { body } = req;
        const data: EmployeeUpdate = {
            id,
            ...body
        };
        const patched = await this.service.updateEmployeeById(data);
        if (!patched) throw new NotFoundError(`Employee with ID ${id} not found!`);
        return sendResponse(res, HttpStatus.OK, { message: `Profile ${id} updated successfully`, data: patched });
    });

    public deleteEmployee = handlerWrapper(async (req: Request, res: Response) => {
        const { id } = req.params;
        const deletion = await this.service.deleteEmployeeById(id);
        if (!deletion.numDeletedRows) throw new NotFoundError(`Employee with ID ${id} not found!`);
        return sendResponse(res, HttpStatus.OK, { message: `Profile ${id} deleted successfully`, data: deletion });
    });

    public getTimesheetsByEmployeeId = handlerWrapper(async (req: Request, res: Response) => {
        const { employeeId } = req.params;
        const timesheets = await this.timesheetService.selectAllTimesheetsByEmployeeId(employeeId);

        if (!timesheets || timesheets.length === 0) throw new NotFoundError(`No timesheets found for this employee with the given criteria.`);
        return sendResponse(res, HttpStatus.OK, { message: `Timesheets for user ${employeeId} fetched`, data: timesheets });
    });

    public createTimesheetForEmployee = handlerWrapper(async (req: Request, res: Response) => {
        const { employeeId } = req.params;
        const body = Array.isArray(req.body) ? req.body : [req.body];

        const timesheets: NewTimesheet[] = body.map((timesheet) => ({ id: uuidv7(), employee_id: employeeId, ...timesheet }));

        const newTimesheet = await this.timesheetService.insertNewTimesheets(timesheets);
        return sendResponse(res, HttpStatus.CREATED, { message: `New timesheet for user ${employeeId} created`, data: newTimesheet });
    });
}
