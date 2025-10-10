import { LoggerService } from "@syncellus/core/logger.js";
import { AuthController } from "@syncellus/modules/auth/controller.js";
import { AuthRepository } from "@syncellus/modules/auth/repository.js";
import { AuthService } from "@syncellus/modules/auth/service.js";
import type { Database as DB, User } from "@syncellus/types/database.js";
import type { NextFunction, Request, Response } from "express";
import { Kysely } from "kysely";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@syncellus/modules/auth/service.js", () => {
    class MockAuthService {
        insertNewUser = vi.fn();
        verifyUserCredentials = vi.fn();
    }
    return { AuthService: MockAuthService };
});

vi.spyOn(LoggerService, "getInstance").mockReturnValue({
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn()
} as any);

describe("Auth Controller", () => {
    let controller: AuthController;
    let mockService: AuthService;
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        vi.clearAllMocks();

        const mockRepo = new AuthRepository({} as Kysely<DB>);
        mockService = new AuthService(mockRepo);
        const logger = LoggerService.getInstance();

        controller = new AuthController(mockService, logger);

        mockReq = {};
        mockRes = {
            status: vi.fn().mockImplementation(() => mockRes as Response),
            json: vi.fn().mockImplementation(() => mockRes as Response),
            send: vi.fn().mockImplementation(() => mockRes as Response)
        } as unknown as Response;
        mockNext = vi.fn();
    });

    describe("signUp", () => {
        it("should return a 201 status with the signedup user", async () => {
            // Arrange
            const mockedUser: User = {
                id: "0198bd9b-b260-7096-a1fd-743dfd7a3b71",
                public_id: "nixdm4t01d",
                email: "test@mail.com",
                password: "password",
                created_at: new Date(),
                modified_at: new Date(),
                active: 1
            };
            vi.mocked(mockService.registerNewUser).mockResolvedValue(mockedUser);

            // Act
            await controller.register(mockReq as Request, mockRes as Response, mockNext);

            // Assert
            expect(mockService.registerNewUser).toHaveBeenCalledTimes(1);
            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith(mockedUser);
        });

        it("should return 409 if the user already exists", async () => {
            mockReq.body = { email: "test@mail.com", password: "secret" };

            vi.mocked(mockService.registerNewUser).mockResolvedValue(undefined);

            await controller.register(mockReq as Request, mockRes as Response, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(409);
            expect(mockRes.send).toHaveBeenCalledWith({
                message: "User with email test@mail.com already exists!"
            });
        });

        it("should call next(error) if insertNewUser throws", async () => {
            const error = new Error("db error");
            vi.mocked(mockService.registerNewUser).mockRejectedValue(error);

            await controller.register(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });
    describe("signIn", () => {
        it("should return a 200 status with the signedin user", async () => {
            // Arrange
            const mockedServiceResponse = { user: { public_id: "testid1", role: "employee" } };
            vi.mocked(mockService.verifyUserCredentials).mockResolvedValue(mockedServiceResponse);

            // Act
            controller.login(mockReq as Request, mockRes as Response);

            // Assert
            expect(mockService.verifyUserCredentials).toHaveBeenCalledTimes(1);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(mockedServiceResponse);
        });

        it("should return 200 and a token when credentials are valid", async () => {
            mockReq.body = { email: "test@mail.com", password: "secret" };

            vi.mocked(mockService.verifyUserCredentials).mockResolvedValue({
                user: {
                    public_id: "userid1"
                }
            });

            controller.login(mockReq as Request, mockRes as Response);

            expect(mockService.verifyUserCredentials).toHaveBeenCalledWith(mockReq.body);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Successfull sign in!",
                accessToken: "fake-token"
            });
        });

        it("should call next(error) if verifyUserCredentials throws", async () => {
            const error = new Error("invalid creds");
            vi.mocked(mockService.verifyUserCredentials).mockRejectedValue(error);

            controller.login(mockReq as Request, mockRes as Response);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });
});
