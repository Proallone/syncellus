import { describe, it, expect, vi, beforeEach } from "vitest";
import { AuthService } from "@syncellus/modules/auth/service.js";
import { eventBus } from "@syncellus/core/eventBus.js";

// Mock config
vi.mock("@syncellus/configs/config.js", () => ({
    default: { jwt_secret: "test-secret" }
}));

// Mock eventBus
vi.mock("@syncellus/core/eventBus.js", () => ({
    eventBus: { emit: vi.fn() }
}));

// Mock crypto utils
vi.mock("@syncellus/utils/crypto.js", () => ({
    hashPassword: vi.fn(async (pwd: string) => `hashed-${pwd}`),
    compareHash: vi.fn()
}));

// Mock HttpError
vi.mock("@syncellus/errors/HttpError.js", () => ({
    HttpError: class MockHttpError extends Error {
        status: number;
        constructor(status: number, message: string) {
            super(message);
            this.status = status;
        }
    }
}));

// Import after mocks so we get the mocked version
import { hashPassword } from "@syncellus/utils/crypto.js";

describe("AuthService", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        mockRepo.insertNewUserToDb.mockResolvedValue({ id: 1, ...newUser, password: "hashed-secret" });

        const result = await service.insertNewUser(newUser);

        expect(mockRepo.selectUserByEmailFromDb).toHaveBeenCalledWith("test@example.com");
        expect(hashPassword).toHaveBeenCalledWith("secret");
        expect(mockRepo.insertNewUserToDb).toHaveBeenCalledWith({
            ...newUser,
            password: "hashed-secret"
        });
        expect(eventBus.emit).toHaveBeenCalledWith("user.created", { id: 1, ...newUser, password: "hashed-secret" });
        expect(result).toEqual({ id: 1, ...newUser, password: "hashed-secret" });
    });
});
