import type { Request, Response, NextFunction } from "express";
import type { EmployeeService } from "@syncellus/modules/accounts/service.js";
import type { EmployeeUpdate, NewEmployee, NewTimesheet } from "@syncellus/types/database.js";
import type { TimesheetService } from "@syncellus/modules/timesheets/service.js";
import { uuidv7 } from "uuidv7";
import { sendResponse } from "@syncellus/utils/responseBuilder.js";
import { HttpStatus } from "@syncellus/core/http.js";
import { NotFoundError } from "@syncellus/errors/errors.js";

export class EmployeeController {
    constructor(
        private readonly service: EmployeeService,
        private readonly timesheetService: TimesheetService
    ) {}

    public createEmployee = async (req: Request, res: Response, next: NextFunction) => {
        const { body } = req;
        const employee: NewEmployee = {
            ...body
        };
        try {
            const newEmployee = await this.service.insertNewEmployee(employee);
            return sendResponse(res, HttpStatus.CREATED, { message: "Profile created", data: newEmployee });
        } catch (error) {
            next(error);
        }
    };

    public getEmployees = async (req: Request, res: Response, next: NextFunction) => {
        const { query } = req;
        try {
            const employees = await this.service.selectAllEmployees(query);
            return sendResponse(res, HttpStatus.OK, { message: "Profiles data fetched", data: employees });
        } catch (error) {
            next(error);
        }
    };

    public getEmployee = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const employee = await this.service.selectOneEmployeeById(id);
            if (!employee) throw new NotFoundError(`Employee with ID ${id} not found!`);
            return sendResponse(res, HttpStatus.OK, { message: "Profile data fetched", data: employee });
        } catch (error) {
            next(error);
        }
    };

    public patchEmployee = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const { body } = req;
        const data: EmployeeUpdate = {
            id,
            ...body
        };
        try {
            const patched = await this.service.updateEmployeeById(data);
            if (!patched) throw new NotFoundError(`Employee with ID ${id} not found!`);
            return sendResponse(res, HttpStatus.OK, { message: `Profile ${id} updated successfully`, data: patched });
        } catch (error) {
            next(error);
        }
    };

    public deleteEmployee = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const deletion = await this.service.deleteEmployeeById(id);
            if (!deletion.numDeletedRows) throw new NotFoundError(`Employee with ID ${id} not found!`);
            return sendResponse(res, HttpStatus.OK, { message: `Profile ${id} deleted successfully`, data: deletion });
        } catch (error) {
            next(error);
        }
    };

    public getTimesheetsByEmployeeId = async (req: Request, res: Response, next: NextFunction) => {
        const { employeeId } = req.params;

        try {
            const timesheets = await this.timesheetService.selectAllTimesheetsByEmployeeId(employeeId);

            if (!timesheets || timesheets.length === 0) throw new NotFoundError(`No timesheets found for this employee with the given criteria.`);
            return sendResponse(res, HttpStatus.OK, { message: `Timesheets for user ${employeeId} fetched`, data: timesheets });
        } catch (error) {
            next(error);
        }
    };

    public createTimesheetForEmployee = async (req: Request, res: Response, next: NextFunction) => {
        const { employeeId } = req.params;
        const body = Array.isArray(req.body) ? req.body : [req.body];

        const timesheets: NewTimesheet[] = body.map((timesheet) => ({ id: uuidv7(), employee_id: employeeId, ...timesheet }));

        try {
            const newTimesheet = await this.timesheetService.insertNewTimesheets(timesheets);
            return sendResponse(res, HttpStatus.CREATED, { message: `New timesheet for user ${employeeId} created`, data: newTimesheet });
        } catch (error) {
            next(error);
        }
    };
}
