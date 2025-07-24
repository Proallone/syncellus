import type { Request, Response, NextFunction } from "express";

import {
    insertNewEmployee,
    selectAllEmployees,
    selectOneEmployeeById,
    updateEmployeeById,
    deleteEmployeeById
} from "./service.js";
import type {
    EmployeeUpdate,
    NewEmployee,
    NewTimesheet
} from "../../types/database.js";
import {
    insertNewTimesheet,
    selectAllTimesheetsByEmployeeId
} from "../timesheets/service.js";

const createEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const employee: NewEmployee = { ...req.body };
    const newEmployee = await insertNewEmployee(employee);
    return res.status(201).json(newEmployee);
};

const getEmployees = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const employees = await selectAllEmployees();
    return res.status(200).json(employees);
};

const getEmployee = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const employee = await selectOneEmployeeById(Number(id));
    if (!employee)
        return res
            .status(404)
            .send({ message: `Employee with ID ${id} not found!` });

    return res.json(employee);
};

const patchEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const data: EmployeeUpdate = { id, ...body };
        const patched = await updateEmployeeById(data);
        if (!patched)
            return res
                .status(404)
                .send({ message: `Employee with ID ${id} not found!` });
        return res.status(200).send(patched);
    } catch (error) {
        next(error);
    }
};

const deleteEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    try {
        const deletion = await deleteEmployeeById(Number(id));
        if (!deletion)
            return res
                .status(404)
                .send({ message: `Employee with ID ${id} not found!` });
        return res
            .status(200)
            .send({ message: `Employee with ID ${id} deleted!` });
    } catch (error) {
        next(error);
    }
};

const getTimesheetsByEmployeeId = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { employeeId } = req.params;

    const timesheets = await selectAllTimesheetsByEmployeeId(
        Number(employeeId)
    );
    return res.status(200).send(timesheets);
};

const createTimesheetForEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { employeeId } = req.params;
    const timesheet: NewTimesheet = { ...req.body, employee_id: employeeId };
    const newTimesheet = await insertNewTimesheet(timesheet);
    return res.status(201).json(newTimesheet);
};

export {
    createEmployee,
    getEmployees,
    getEmployee,
    patchEmployee,
    deleteEmployee,
    getTimesheetsByEmployeeId,
    createTimesheetForEmployee
};
