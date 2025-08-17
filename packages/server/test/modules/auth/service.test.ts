import { describe, it, expect, vi, beforeEach } from "vitest";
import { AuthService } from "@syncellus/modules/auth/service.js";
import { eventBus } from "@syncellus/core/eventBus.js";
import { HttpError } from "@syncellus/errors/HttpError.js";
import Jwt from "jsonwebtoken";

vi.mock("@syncellus/configs/config.js", () => ({
    default: { jwt_secret: "test-secret" }
}));

vi.mock("@syncellus/core/eventBus.js", () => ({
    eventBus: { emit: vi.fn() }
}));

vi.mock("@syncellus/utils/crypto.js", () => ({
    hashPassword: vi.fn(async (pwd: string) => `hashed-${pwd}`),
    compareHash: vi.fn()
}));

vi.mock("@syncellus/errors/HttpError.js", () => ({
    HttpError: class MockHttpError extends Error {
        status: number;
        constructor(status: number, message: string) {
            super(message);
            this.status = status;
        }
    }
}));

vi.mock("jsonwebtoken", () => ({
    default: {
        sign: vi.fn()
    }
}));

import { hashPassword, compareHash } from "@syncellus/utils/crypto.js";

describe("AuthService", () => {
    let mockRepo: any;
    let service: AuthService;

    beforeEach(() => {
        vi.clearAllMocks();

        mockRepo = {
            selectUserByEmailFromDb: vi.fn(),
            insertNewUserToDb: vi.fn()
        };

        service = new AuthService(mockRepo);
    });

    it("should insert a new user if email does not exist", async () => {
        const newUser = { email: "test@example.com", password: "secret" };
        mockRepo.selectUserByEmailFromDb.mockResolvedValue(null);
        mockRepo.insertNewUserToDb.mockResolvedValue({ id: "0198b9dc-7515-71fc-bf31-23fa1057ffd1", public_id: "84ghpuj191", ...newUser, password: "hashed-secret" });

        const result = await service.insertNewUser(newUser);

        expect(mockRepo.selectUserByEmailFromDb).toHaveBeenCalledWith("test@example.com");
        expect(hashPassword).toHaveBeenCalledWith("secret");
        expect(mockRepo.insertNewUserToDb).toHaveBeenCalledWith({
            ...newUser,
            password: "hashed-secret"
        });
        expect(eventBus.emit).toHaveBeenCalledWith("user.created", { id: "0198b9dc-7515-71fc-bf31-23fa1057ffd1", public_id: "84ghpuj191", ...newUser, password: "hashed-secret" });
        expect(result).toEqual({ id: "0198b9dc-7515-71fc-bf31-23fa1057ffd1", public_id: "84ghpuj191", ...newUser, password: "hashed-secret" });
    });

    it("should return an accessToken for valid credentials", async () => {
        const credentials = { email: "user@example.com", password: "password123" };
        const userFromDb = { id: "user-123", email: "user@example.com", password: "hashed-password", role: "user" };

        mockRepo.selectUserByEmailFromDb.mockResolvedValue(userFromDb);
        (compareHash as ReturnType<typeof vi.fn>).mockResolvedValue(true);
        (Jwt.sign as ReturnType<typeof vi.fn>).mockReturnValue("mocked_access_token");

        const result = await service.verifyUserCredentials(credentials);

        expect(mockRepo.selectUserByEmailFromDb).toHaveBeenCalledWith("user@example.com");
        expect(compareHash).toHaveBeenCalledWith("password123", "hashed-password");
        expect(Jwt.sign).toHaveBeenCalledWith({ id: userFromDb.id, role: userFromDb.role }, "test-secret", { expiresIn: "30m" });
        expect(result).toEqual({ accessToken: "mocked_access_token" });
    });

    it("should throw HttpError 401 if user does not exist", async () => {
        const credentials = { email: "nonexistent@example.com", password: "anypassword" };
        mockRepo.selectUserByEmailFromDb.mockResolvedValue(null);

        // Expect the function to throw an HttpError
        await expect(service.verifyUserCredentials(credentials)).rejects.toThrow(HttpError);
        await expect(service.verifyUserCredentials(credentials)).rejects.toHaveProperty("status", 401);
        await expect(service.verifyUserCredentials(credentials)).rejects.toThrow("Invalid credentials");

        expect(mockRepo.selectUserByEmailFromDb).toHaveBeenCalledWith("nonexistent@example.com");
        expect(compareHash).not.toHaveBeenCalled(); // Should not call compareHash if user not found
        expect(Jwt.sign).not.toHaveBeenCalled(); // Should not generate token
    });

    it("should throw HttpError 401 if password does not match", async () => {
        const credentials = { email: "user@example.com", password: "wrongpassword" };
        const userFromDb = { id: "user-123", email: "user@example.com", password: "hashed-correct-password", role: "user" };

        mockRepo.selectUserByEmailFromDb.mockResolvedValue(userFromDb);
        // Mock compareHash to return false for a mismatch
        (compareHash as ReturnType<typeof vi.fn>).mockResolvedValue(false);

        // Expect the function to throw an HttpError
        await expect(service.verifyUserCredentials(credentials)).rejects.toThrow(HttpError);
        await expect(service.verifyUserCredentials(credentials)).rejects.toHaveProperty("status", 401);
        await expect(service.verifyUserCredentials(credentials)).rejects.toThrow("Invalid credentials");

        expect(mockRepo.selectUserByEmailFromDb).toHaveBeenCalledWith("user@example.com");
        expect(compareHash).toHaveBeenCalledWith("wrongpassword", "hashed-correct-password");
        expect(Jwt.sign).not.toHaveBeenCalled(); // Should not generate token if password mismatches
    });
});
