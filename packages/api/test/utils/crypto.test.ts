import { describe, it, expect } from "vitest";
import { hashPassword, compareHash } from "../../src/utils/crypto";

describe("Crypto utils", () => {
    it("should hash a password with a valid bcrypt format", async () => {
        // Arrange
        const password = "testpassword";

        // Act
        const hash = await hashPassword(password);

        // Assert
        // A bcrypt hash has a specific structure: $2b$10$ and then 53 characters.
        const bcryptRegex = /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/;
        expect(hash).toMatch(bcryptRegex);
    });

    it("should produce a different hash for the same password on consecutive calls", async () => {
        // Arrange
        const password = "testpassword";

        // Act
        const hash1 = await hashPassword(password);
        const hash2 = await hashPassword(password);

        // Assert
        expect(hash1).not.toEqual(hash2);
    });

    describe("compareHash", () => {
        let passwordHash: string;
        const password = "testpassword";
        const wrongPassword = "wrongpassword";

        it("should create a hash to be used in comparison tests", async () => {
            passwordHash = await hashPassword(password);
            expect(passwordHash.length).toBeGreaterThan(0);
        });

        it("should return true for a correct password", async () => {
            // Act
            const result = await compareHash(password, passwordHash);

            // Assert
            expect(result).toBe(true);
        });

        it("should return false for an incorrect password", async () => {
            // Act
            const result = await compareHash(wrongPassword, passwordHash);

            // Assert
            expect(result).toBe(false);
        });
    });
});
