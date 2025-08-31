import { describe, it, expect, vi, beforeEach } from "vitest";
import { HealthController } from "@syncellus/modules/health/controller.js";
import { HealthService } from "@syncellus/modules/health/service.js";
import type { Request, Response, NextFunction } from "express";
import { HealthRepository } from "@syncellus/modules/health/repository.js";
import type { Database as DB } from "@syncellus/types/database.js";
import { Kysely } from "kysely";
import type { DatabaseHealthResponse, ServiceHealthResponse } from "@syncellus/modules/health/types.js";

// Mock the HealthService dependency using the same class-based factory pattern.
vi.mock("@syncellus/modules/health/service.js", () => {
    class MockHealthService {
        getApplicationStatus = vi.fn();
        getDatabaseStatus = vi.fn();
    }
    return { HealthService: MockHealthService };
});

describe("Health Controller", () => {
    // Declare the controller instance and mock dependencies.
    let controller: HealthController;
    let mockService: HealthService;
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        // Clear all mocks before each test.
        vi.clearAllMocks();

        const mockRepo = new HealthRepository({} as Kysely<DB>);
        mockService = new HealthService(mockRepo);

        // Instantiate the controller, injecting the mocked service.
        controller = new HealthController(mockService);

        // Create mock Express request and response objects.
        // The mock 'res' object needs to handle chaining, so 'status' returns 'this'.
        mockReq = {};
        mockRes = {
            status: vi.fn().mockImplementation(() => mockRes as Response),
            json: vi.fn().mockImplementation(() => mockRes as Response),
            send: vi.fn().mockImplementation(() => mockRes as Response)
        } as unknown as Response;
        mockNext = vi.fn();
    });

    describe("getApplicationHealth", () => {
        it("should return a 200 status with the application health status", () => {
            // Arrange
            const mockStatus: ServiceHealthResponse = { status: "Healthy" };
            // Mock the service method to return the expected value.
            vi.mocked(mockService.getApplicationStatus).mockReturnValue(mockStatus);

            // Act
            controller.getApplicationHealth(mockReq as Request, mockRes as Response);

            // Assert
            expect(mockService.getApplicationStatus).toHaveBeenCalledTimes(1);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.send).toHaveBeenCalledWith(mockStatus);
        });
    });

    describe("getDatabaseHealth", () => {
        it("should return a 200 status with the database version on success", async () => {
            // Arrange
            const mockVersion: DatabaseHealthResponse = { status: "Healthy", sqlite_version: "3.42.0" };
            // Mock the service's async method to resolve with the expected value.
            vi.mocked(mockService.getDatabaseStatus).mockResolvedValue(mockVersion);

            // Act
            await controller.getDatabaseHealth(mockReq as Request, mockRes as Response, mockNext);

            // Assert
            expect(mockService.getDatabaseStatus).toHaveBeenCalledTimes(1);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(mockVersion);
            expect(mockNext).not.toHaveBeenCalled();
        });

        it("should call the next function with the error on failure", async () => {
            // Arrange
            const mockError = new Error("Database connection failed");
            // Mock the service's async method to reject with an error.
            vi.mocked(mockService.getDatabaseStatus).mockRejectedValue(mockError);

            // Act
            await controller.getDatabaseHealth(mockReq as Request, mockRes as Response, mockNext);

            // Assert
            expect(mockService.getDatabaseStatus).toHaveBeenCalledTimes(1);
            expect(mockRes.status).not.toHaveBeenCalled();
            expect(mockRes.json).not.toHaveBeenCalled();
            expect(mockNext).toHaveBeenCalledWith(mockError);
        });
    });
});
