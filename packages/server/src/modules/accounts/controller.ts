import { HttpStatus } from "@syncellus/core/http.js";
import { NotFoundError } from "@syncellus/errors/http.js";
import type { AccountsService } from "@syncellus/modules/accounts/service.js";
import type { AccountsProfiles } from "@syncellus/types/database.js";
import type { TypedRequest } from "@syncellus/types/express.js";
import type { NewAccountBody } from "@syncellus/types/index.js";
import { sendResponse } from "@syncellus/utils/responseBuilder.js";
import type { Request, Response } from "express";
import type { Updateable } from "kysely";

export class AccountsController {
    constructor(private readonly service: AccountsService) {}

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

    public updateAccount = async (req: TypedRequest<Updateable<AccountsProfiles>>, res: Response) => {
        const { id } = req.params;
        const data = req.body;
        const update: Updateable<AccountsProfiles> = {
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
}
