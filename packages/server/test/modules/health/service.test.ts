import { describe, it, expect, vi, beforeEach } from "vitest";
import { HealthService } from "../../../src/modules/health/service.js";
import { HealthRepository } from "../../../src/modules/health/repository.js";
import { Kysely } from "kysely";
import { Database } from "better-sqlite3";

vi.mock("../../../src/modules/health/repository.js", () => {
    class MockHealthRepository {
        getDatabaseVersionFromDb = vi.fn();
    }

    return { HealthRepository: MockHealthRepository };
});

describe("Health Service", () => {
    let healthService: HealthService;
    let mockRepo: HealthRepository;

    beforeEach(() => {
        vi.clearAllMocks();

        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        mockRepo = new HealthRepository({} as Kysely<Database>);

        healthService = new HealthService(mockRepo);
    });

    it('getApplicationStatus should return a "Healthy" status object', () => {
        // Act
        const status = healthService.getApplicationStatus();
        // Assert
        expect(status).toEqual({ status: "Healthy" });
    });

    describe("getDatabaseStatus", () => {
        it("should return a healthy status and database version from the repository", async () => {
            // Arrange
            const mockDbVersion = { sqlite_version: "3.42.0" };
            vi.mocked(mockRepo.getDatabaseVersionFromDb).mockResolvedValue(mockDbVersion);

            // Act
            const result = await healthService.getDatabaseStatus();

            // Assert
            expect(result).toEqual({
                status: "Healthy",
                sqlite_version: "3.42.0"
            });

            // Assert that the mock method was called.
            expect(mockRepo.getDatabaseVersionFromDb).toHaveBeenCalledTimes(1);
        });

        it("should handle a rejected repository promise gracefully", async () => {
            // Arrange
            const errorMessage = "Database connection failed";
            vi.mocked(mockRepo.getDatabaseVersionFromDb).mockRejectedValue(new Error(errorMessage));

            // Act & Assert
            await expect(healthService.getDatabaseStatus()).rejects.toThrow(errorMessage);

            // Verify that the repository method was still called
            expect(mockRepo.getDatabaseVersionFromDb).toHaveBeenCalledTimes(1);
        });
    });
});
