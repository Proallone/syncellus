import { describe, it, expect, vi, beforeEach } from "vitest";
import { Kysely, SqliteDialect } from "kysely";
import Database from "better-sqlite3";
import { HealthRepository } from "@syncellus/modules/health/repository.js";
import type { Database as DB } from "@syncellus/types/database.js";
import { DatabaseService } from "@syncellus/database/database.js";

vi.mock("@syncellus/database/database", () => {
    const inMemoryDb = new Database(":memory:");
    const mockKyselyDb = new Kysely<DB>({
        dialect: new SqliteDialect({
            database: inMemoryDb
        })
    });

    const mockDatabaseService = {
        getInstance: vi.fn(() => mockKyselyDb)
    };

    return {
        DatabaseService: mockDatabaseService
    };
});

describe("Health Repository", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should return the SQLite database version", async () => {
        // Arrange
        const db = DatabaseService.getInstance();
        const repo = new HealthRepository(db);

        // Act
        const result = await repo.getDatabaseVersionFromDb();

        // Assert
        expect(result).toBeInstanceOf(Object);
        expect(result).toHaveProperty("sqlite_version");
        expect(typeof result.sqlite_version).toBe("string");
        expect(result.sqlite_version.length).toBeGreaterThan(0);
    });
});
