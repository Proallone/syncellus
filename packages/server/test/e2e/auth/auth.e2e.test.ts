// tests/auth.e2e.test.ts

import { Database as DB } from "@syncellus/types/database.js";
import Database from "better-sqlite3-multiple-ciphers";
import { promises as fs } from "fs";
import { FileMigrationProvider, Kysely, Migrator, SqliteDialect } from "kysely";
import * as path from "path";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import app from "../../../src/app.js";

let db: Kysely<DB> | undefined = undefined;

describe("Auth E2E", () => {
    beforeAll(async () => {
        const inMemoryDb = new Database(":memory:");
        db = new Kysely<DB>({
            dialect: new SqliteDialect({
                database: inMemoryDb
            })
        });

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

    afterAll(async () => {
        await db.destroy();
    });

    it("should register a new user", async () => {
        const res = await request(app).post("/auth/register").send({ email: "test@example.com", password: "StrongPass123!" });

        expect(res.status).toBe(201);
        expect(res.body.data).toHaveProperty("email", "test@example.com");
    });

    it("should reject duplicate registration", async () => {
        const res = await request(app).post("/auth/register").send({ email: "test@example.com", password: "AnotherPass123!" });

        expect(res.status).toBe(409); // Conflict
    });

    it("should allow login after registration", async () => {
        const res = await request(app).post("/auth/login").send({ email: "test@example.com", password: "StrongPass123!" });

        expect(res.status).toBe(200);
        expect(res.body.data).toHaveProperty("accessToken");
    });

    it("should request password reset", async () => {
        const res = await request(app).post("/auth/forgot-password").send({ email: "test@example.com" });

        expect(res.status).toBe(200);
        expect(res.body.message).toContain("Password reset process started");
    });

    it("should return current user info (/me)", async () => {
        const loginRes = await request(app).post("/auth/login").send({ email: "test@example.com", password: "StrongPass123!" });

        const token = loginRes.body.data.accessToken;

        const res = await request(app).get("/auth/me").set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.data).toHaveProperty("public_id");
    });
});
