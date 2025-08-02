import type { Request, Response, NextFunction } from "express";

import { insertNewEmployee, selectAllEmployees, selectOneEmployeeById, updateEmployeeById, deleteEmployeeById } from "@syncellus/modules/employees/service.js";
import type { EmployeeUpdate, NewEmployee, NewTimesheet } from "@syncellus/types/database.js";
import { insertNewTimesheet, selectAllTimesheetsByEmployeeId } from "@syncellus/modules/timesheets/service.js";

const createEmployee = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    const employee: NewEmployee = {
        ...body
    };
    try {
        const newEmployee = await insertNewEmployee(employee);
        return res.status(201).json(newEmployee);
    } catch (error) {
        next(error);
    }
};

const getEmployees = async (req: Request, res: Response, next: NextFunction) => {
    const { query } = req;
    try {
        const employees = await selectAllEmployees(query);
        return res.status(200).json(employees);
    } catch (error) {
        next(error);
    }
};

const getEmployee = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const employee = await selectOneEmployeeById(Number(id));
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

const patchEmployee = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { body } = req;
    const data: EmployeeUpdate = {
        id,
        ...body
    };
    try {
        const patched = await updateEmployeeById(data);
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

const deleteEmployee = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const deletion = await deleteEmployeeById(Number(id));
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

const getTimesheetsByEmployeeId = async (req: Request, res: Response, next: NextFunction) => {
    const { employeeId } = req.params;

    try {
        const timesheets = await selectAllTimesheetsByEmployeeId(Number(employeeId));

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

const createTimesheetForEmployee = async (req: Request, res: Response, next: NextFunction) => {
    const { employeeId } = req.params;
    const { body } = req;
    const timesheet: NewTimesheet = {
        employee_id: employeeId,
        ...body
    };
    try {
        const newTimesheet = await insertNewTimesheet(timesheet);
        return res.status(201).json(newTimesheet);
    } catch (error) {
        next(error);
    }
};

export { createEmployee, getEmployees, getEmployee, patchEmployee, deleteEmployee, getTimesheetsByEmployeeId, createTimesheetForEmployee };
