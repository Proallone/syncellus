import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest";
import { FileMigrationProvider, Kysely, Migrator, SqliteDialect } from "kysely";
import Database from "better-sqlite3-multiple-ciphers";
import { AuthRepository } from "@syncellus/modules/auth/repository.js";
import { Database as DB } from "@syncellus/types/database.js";
import { DatabaseService } from "@syncellus/database/database.js";
import * as path from "path";
import { promises as fs } from "fs";

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
            console.error(error);
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
            id: "0198bbd8-6935-7da6-b4a7-f9642482c3c7",
            public_id: "0123456789",
            email: "test@mail.com",
            password: "testpasswd"
        };

        // Act
        const result = await repo.insertNewUser(user);

        // Assert
        expect(result).toBeInstanceOf(Object);
        expect(result).toHaveProperty("id");
        expect(result).toHaveProperty("email", user.email);
        expect(result).toHaveProperty("created_at");
        expect(result).toHaveProperty("modified_at");
    });
    it("should throw for user payload with missing email", async () => {
        // Arrange
        const db = DatabaseService.getInstance();
        const repo = new AuthRepository(db);
        const user = {
            public_id: "0123456789",
            password: "passwd"
        };

        // Act & Assert
        await expect(repo.insertNewUser(user)).rejects.toThrow(/NOT NULL constraint failed: users.email/);
    });

    it("should throw for user payload with missing public_id", async () => {
        // Arrange
        const db = DatabaseService.getInstance();
        const repo = new AuthRepository(db);
        const user = {
            email: "test@mail.com",
            password: "passwd"
        };

        // Act & Assert
        await expect(repo.insertNewUser(user)).rejects.toThrow(/NOT NULL constraint failed: users.public_id/);
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
        await expect(repo.insertNewUser(user)).rejects.toThrow(/table users has no column named notpassword/);
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
        await expect(repo.insertNewUser(user)).rejects.toThrow(/table users has no column named notemail/);
    });

    it("should throw for user payload with missing password", async () => {
        // Arrange
        const db = DatabaseService.getInstance();
        const repo = new AuthRepository(db);
        const user = {
            public_id: "0123456789",
            email: "test@mail.com"
        };

        // Act & Assert
        await expect(repo.insertNewUser(user)).rejects.toThrow(/NOT NULL constraint failed: users.password/);
    });

    it("should find a user by email if they exist", async () => {
        // Arrange
        const db = DatabaseService.getInstance();
        const repo = new AuthRepository(db);
        const userCredentials = {
            id: "0198bbd8-6935-7743-8d79-51eee3fe7d92",
            public_id: "9876543210",
            email: "findme@mail.com",
            password: "securepassword"
        };
        const insertedUser = await repo.insertNewUser(userCredentials);

        // Act
        const foundUser = await repo.selectUserByEmail(userCredentials.email);

        // Assert
        expect(foundUser).toBeInstanceOf(Object);
        expect(foundUser).toEqual(
            expect.objectContaining({
                public_id: insertedUser.public_id,
                email: userCredentials.email,
                role: "employee",
                password: userCredentials.password
            })
        );
    });

    it("should return null if user not found by email", async () => {
        // Arrange
        const db = DatabaseService.getInstance();
        const repo = new AuthRepository(db);
        const nonExistentEmail = "nonexistent@mail.com";

        // Act
        const foundUser = await repo.selectUserByEmail(nonExistentEmail);

        // Assert
        expect(foundUser).toBeUndefined();
    });
});
