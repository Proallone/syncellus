import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest";
import { FileMigrationProvider, Kysely, Migrator, SqliteDialect } from "kysely";
import Database from "better-sqlite3";
import { AuthRepository } from "../../../src/modules/auth/repository.js";
import { Database as DB } from "../../../src/types/database.js";
import { DatabaseService } from "../../../src/database/database.js";
import * as path from "path";
import { promises as fs } from "fs";

vi.mock("../../../src/database/database", () => {
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

describe("Auth Repository", () => {
    beforeAll(async () => {
        const db = DatabaseService.getInstance();

        const migrator = new Migrator({
            db,
            provider: new FileMigrationProvider({
                fs,
                path,
                migrationFolder: path.join(__dirname, "../../../src/database/migrations")
            })
        });

        const { error } = await migrator.migrateToLatest();
        if (error) {
            throw new Error("Migration failed!");
        }
    });

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should return newly created user", async () => {
        // Arrange
        const db = DatabaseService.getInstance();
        const repo = new AuthRepository(db);
        const user = {
            email: "test@mail.com",
            password: "testpasswd"
        };

        // Act
        const result = await repo.insertNewUserToDb(user);

        // Assert
        expect(result).toBeInstanceOf(Object);
        expect(result).toHaveProperty("id");
        expect(result).toHaveProperty("email", user.email);
        expect(result).toHaveProperty("createdAt");
        expect(result).toHaveProperty("modifiedAt");
    });
    it("should throw for user payload with missing email", async () => {
        // Arrange
        const db = DatabaseService.getInstance();
        const repo = new AuthRepository(db);
        const user = {
            password: "passwd"
        };

        // Act & Assert
        await expect(repo.insertNewUserToDb(user)).rejects.toThrow(/NOT NULL constraint failed: users.email/);
    });

    it("should throw for user payload with incorrect password property", async () => {
        // Arrange
        const db = DatabaseService.getInstance();
        const repo = new AuthRepository(db);
        const user = {
            email: "test@test.com",
            notpassword: "passwd"
        };

        // Act & Assert
        await expect(repo.insertNewUserToDb(user)).rejects.toThrow(/table users has no column named notpassword/);
    });

    it("should throw for user payload with incorrect email property", async () => {
        // Arrange
        const db = DatabaseService.getInstance();
        const repo = new AuthRepository(db);
        const user = {
            notemail: "test@test.com",
            notpassword: "passwd"
        };

        // Act & Assert
        await expect(repo.insertNewUserToDb(user)).rejects.toThrow(/table users has no column named notemail/);
    });

    it("should throw for user payload with missing password", async () => {
        // Arrange
        const db = DatabaseService.getInstance();
        const repo = new AuthRepository(db);
        const user = {
            email: "test@mail.com"
        };

        // Act & Assert
        await expect(repo.insertNewUserToDb(user)).rejects.toThrow(/NOT NULL constraint failed: users.password/);
    });

    it("should find a user by email if they exist", async () => {
        // Arrange
        const db = DatabaseService.getInstance();
        const repo = new AuthRepository(db);
        const userCredentials = {
            email: "findme@mail.com",
            password: "securepassword"
        };
        const insertedUser = await repo.insertNewUserToDb(userCredentials);

        // Act
        const foundUser = await repo.selectUserByEmailFromDb(userCredentials.email);

        // Assert
        expect(foundUser).toBeInstanceOf(Object);
        expect(foundUser).toEqual(
            expect.objectContaining({
                id: insertedUser?.id,
                email: userCredentials.email,
                role: "employee" //default value
            })
        );
    });

    it("should return null if user not found by email", async () => {
        // Arrange
        const db = DatabaseService.getInstance();
        const repo = new AuthRepository(db);
        const nonExistentEmail = "nonexistent@mail.com";

        // Act
        const foundUser = await repo.selectUserByEmailFromDb(nonExistentEmail);

        // Assert
        expect(foundUser).toBeUndefined();
    });
});
