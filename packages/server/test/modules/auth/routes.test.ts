import { describe, it, expect, vi } from "vitest";
import { Router } from "express";

// Mock dependencies
const passportAuthenticateMiddleware = vi.fn((_req, _res, next) => next());

vi.mock("passport", () => ({
    default: {
        authenticate: vi.fn(() => passportAuthenticateMiddleware)
    }
}));

const validateMiddleware = vi.fn((_req, _res, next) => next());
vi.mock("@syncellus/middlewares/validator.middleware.js", () => ({
    validate: vi.fn().mockImplementation(() => validateMiddleware)
}));

vi.mock("@syncellus/modules/auth/schema.js", () => ({
    AuthSchema: "fake-schema"
}));

const signUpHandler = vi.fn();
const signInHandler = vi.fn();
vi.mock("@syncellus/modules/auth/controller.js", () => {
    return {
        AuthController: vi.fn().mockImplementation(() => ({
            signUp: signUpHandler,
            signIn: signInHandler
        }))
    };
});

vi.mock("@syncellus/modules/auth/service.js", () => ({ AuthService: vi.fn() }));

vi.mock("@syncellus/modules/auth/repository.js", () => ({ AuthRepository: vi.fn() }));

vi.mock("@syncellus/database/database.js", () => ({
    DatabaseService: { getInstance: vi.fn() }
}));

vi.mock("@syncellus/core/logger.js", () => ({
    LoggerService: { getInstance: vi.fn() }
}));

describe("Auth Router", () => {
    it("should register /signup and /signin routes", async () => {
        const routerModule = await import("@syncellus/modules/auth/routes.js");
        const router = routerModule.default;

        const routes = (router as Router).stack.map((layer: any) => ({
            path: layer.route?.path,
            method: Object.keys(layer.route?.methods || {})[0],
            handlers: layer.route?.stack.map((s: any) => s.handle)
        }));

        expect(routes).toEqual([
            {
                path: "/signup",
                method: "post",
                handlers: [validateMiddleware, signUpHandler]
            },
            {
                path: "/signin",
                method: "post",
                handlers: [validateMiddleware, passportAuthenticateMiddleware, signInHandler]
            }
        ]);
    });
});
