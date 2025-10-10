import { eventBus } from "@syncellus/core/eventBus.js";
import { HttpError } from "@syncellus/errors/http.js";
import { AuthService } from "@syncellus/modules/auth/service.js";
import Jwt from "jsonwebtoken";
import { customAlphabet } from "nanoid";
import { uuidv7 } from "uuidv7";
import { beforeEach, describe, expect, it, vi } from "vitest";

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

vi.mock("uuidv7", () => ({ uuidv7: vi.fn() }));

vi.mock("nanoid", () => ({
    customAlphabet: vi.fn()
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

import { compareHash, hashPassword } from "@syncellus/utils/crypto.js";

describe("AuthService", () => {
    let mockRepo: any;
    let mockMailer: any;
    let service: AuthService;

    beforeEach(() => {
        vi.clearAllMocks();

        mockRepo = {
            selectUserByEmailFromDb: vi.fn(),
            insertNewUserToDb: vi.fn()
        };

        mockMailer = {
            sendWelcome: vi.fn(),
            sendPasswordReset: vi.fn()
        };

        service = new AuthService(mockRepo, mockMailer);
    });

    it("should insert a new user if email does not exist", async () => {
        const newUser = { email: "test@example.com", password: "secret" };

        // Arrange mocks
        (uuidv7 as unknown as ReturnType<typeof vi.fn>).mockReturnValue("0198b9dc-7515-71fc-bf31-23fa1057ffd1");

        const fakeNanoid = vi.fn().mockReturnValue("84ghpuj191");
        (customAlphabet as unknown as ReturnType<typeof vi.fn>).mockReturnValue(fakeNanoid);

        mockRepo.selectUserByEmailFromDb.mockResolvedValue(null);
        mockRepo.insertNewUserToDb.mockResolvedValue({
            id: "0198b9dc-7515-71fc-bf31-23fa1057ffd1",
            public_id: "84ghpuj191",
            ...newUser,
            password: "hashed-secret"
        });

        // Act
        const result = await service.registerNewUser(newUser);

        // Assert
        expect(mockRepo.selectUserByEmailFromDb).toHaveBeenCalledWith("test@example.com");
        expect(hashPassword).toHaveBeenCalledWith("secret");
        expect(fakeNanoid).toHaveBeenCalled(); // ensures public_id generator called
        expect(mockRepo.insertNewUserToDb).toHaveBeenCalledWith({
            id: "0198b9dc-7515-71fc-bf31-23fa1057ffd1",
            public_id: "84ghpuj191",
            ...newUser,
            password: "hashed-secret"
        });
        expect(eventBus.emit).toHaveBeenCalledWith("user.created", {
            id: "0198b9dc-7515-71fc-bf31-23fa1057ffd1",
            public_id: "84ghpuj191",
            ...newUser,
            password: "hashed-secret"
        });
        expect(result).toEqual({
            id: "0198b9dc-7515-71fc-bf31-23fa1057ffd1",
            public_id: "84ghpuj191",
            ...newUser,
            password: "hashed-secret"
        });
    });

    it("should return an accessToken for valid credentials", async () => {
        const credentials = { email: "user@example.com", password: "password123" };
        const userFromDb = { id: "userid-123", public_id: "user-123", email: "user@example.com", password: "hashed-password", role: "user" };

        mockRepo.selectUserByEmailFromDb.mockResolvedValue(userFromDb);
        (compareHash as ReturnType<typeof vi.fn>).mockResolvedValue(true);
        (Jwt.sign as ReturnType<typeof vi.fn>).mockReturnValue("mocked_access_token");

        const result = await service.verifyUserCredentials(credentials);

        expect(mockRepo.selectUserByEmailFromDb).toHaveBeenCalledWith("user@example.com");
        expect(compareHash).toHaveBeenCalledWith("password123", "hashed-password");
        expect(result).toEqual({ message: "Successful sign in!", accessToken: "mocked_access_token" });
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
