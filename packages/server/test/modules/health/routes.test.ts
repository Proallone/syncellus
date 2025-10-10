import { Router } from "express";
import { describe, expect, it, vi } from "vitest";

const getApplicationHealthHandler = vi.fn();
const getDatabaseHealthHandler = vi.fn();
vi.mock("@syncellus/modules/health/controller.js", () => {
    return {
        HealthController: vi.fn().mockImplementation(() => ({
            getApplicationHealth: getApplicationHealthHandler,
            getDatabaseHealth: getDatabaseHealthHandler
        }))
    };
});

vi.mock("@syncellus/modules/health/service.js", () => ({ HealthService: vi.fn() }));

vi.mock("@syncellus/modules/health/repository.js", () => ({ HealthRepository: vi.fn() }));

vi.mock("@syncellus/database/database.js", () => ({
    DatabaseService: { getInstance: vi.fn() }
}));

describe("Health Router", () => {
    it("should register /health and /health/database routes", async () => {
        const routerModule = await import("@syncellus/modules/health/routes.js");
        const router = routerModule.default;

        const routes = (router as Router).stack.map((layer: any) => ({
            path: layer.route?.path,
            method: Object.keys(layer.route?.methods || {})[0],
            handlers: layer.route?.stack.map((s: any) => s.handle)
        }));

        expect(routes).toEqual([
            {
                path: "/",
                method: "get",
                handlers: [getApplicationHealthHandler]
            },
            {
                path: "/database",
                method: "get",
                handlers: [getDatabaseHealthHandler]
            }
        ]);
    });
});
