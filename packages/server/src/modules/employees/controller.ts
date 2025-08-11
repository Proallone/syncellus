import type { Request, Response, NextFunction } from "express";
import type { EmployeeService } from "@syncellus/modules/employees/service.js";
import type { EmployeeUpdate, NewEmployee, NewTimesheet } from "@syncellus/types/database.js";
import type { TimesheetService } from "@syncellus/modules/timesheets/service.js";

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
            return res.status(201).json(newEmployee);
        } catch (error) {
            next(error);
        }
    };

    public getEmployees = async (req: Request, res: Response, next: NextFunction) => {
        const { query } = req;
        try {
            const employees = await this.service.selectAllEmployees(query);
            return res.status(200).json(employees);
        } catch (error) {
            next(error);
        }
    };

    public getEmployee = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const employee = await this.service.selectOneEmployeeById(Number(id));
            if (!employee) {
                return res.status(404).send({
                    message: `Employee with ID ${id} not found!`
                });
            }
            return res.json(employee);
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
            if (!patched) {
                return res.status(404).send({
                    message: `Employee with ID ${id} not found!`
                });
            }
            return res.status(200).send(patched);
        } catch (error) {
            next(error);
        }
    };

    public deleteEmployee = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const deletion = await this.service.deleteEmployeeById(Number(id));
            if (!deletion.numDeletedRows) {
                return res.status(404).send({
                    message: `Employee with ID ${id} not found!`
                });
            }
            return res.status(200).send({
                message: `Employee with ID ${id} deleted!`
            });
        } catch (error) {
            next(error);
        }
    };

    public getTimesheetsByEmployeeId = async (req: Request, res: Response, next: NextFunction) => {
        const { employeeId } = req.params;

        try {
            const timesheets = await this.timesheetService.selectAllTimesheetsByEmployeeId(Number(employeeId));

            if (!timesheets || timesheets.length === 0) {
                return res.status(404).json({
                    message: "No timesheets found for this employee with the given criteria."
                });
            }

            return res.status(200).send(timesheets);
        } catch (error) {
            next(error);
        }
    };

    public createTimesheetForEmployee = async (req: Request, res: Response, next: NextFunction) => {
        const { employeeId } = req.params;
        const body = Array.isArray(req.body) ? req.body : [req.body];

        const timesheets: NewTimesheet[] = body.map((timesheet) => ({ employee_id: employeeId, ...timesheet }));

        try {
            const newTimesheet = await this.timesheetService.insertNewTimesheets(timesheets);
            return res.status(201).json(newTimesheet);
        } catch (error) {
            next(error);
        }
    };
}
