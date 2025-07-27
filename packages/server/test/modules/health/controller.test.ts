import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import app from "../../../src/app.js";
import { getApplicationStatus, getDatabaseVersion } from "../../../src/modules/health/service.js";

vi.mock("../../../src/modules/health/service.js");

describe("Health Controller", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("GET /health", () => {
        it("should return a 200 status and the application status message", async () => {
            // Arrange
            const mockStatus = "Healthy!";
            vi.mocked(getApplicationStatus).mockReturnValue(mockStatus);

            // Act
            const response = await request(app).get("/health");

            // Assert
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                message: mockStatus
            });
            // Verify that the service function was called
            expect(getApplicationStatus).toHaveBeenCalledTimes(1);
        });
    });

    describe("GET /health/database", () => {
        it("should return a 200 status and the database version", async () => {
            // Arrange
            const mockDbVersion = { status: "Healthy", sqlite_version: "3.51.0" };
            vi.mocked(getDatabaseVersion).mockResolvedValue(mockDbVersion);

            // Act
            const response = await request(app).get("/health/database");

            // Assert
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockDbVersion);
            expect(getDatabaseVersion).toHaveBeenCalledTimes(1);
        });

        it("should handle errors from the service and return a 500 status", async () => {
            // Arrange
            vi.mocked(getDatabaseVersion).mockRejectedValue(new Error("Database connection failed"));

            // Act
            const response = await request(app).get("/health/database");

            // Assert
            expect(response.status).toBe(500);
            expect(response.body.message).toBe("Internal Server Error");
            expect(getDatabaseVersion).toHaveBeenCalledTimes(1);
        });
    });
});
