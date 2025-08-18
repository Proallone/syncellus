import { describe, it, expect } from "vitest";
import { hashPassword, compareHash } from "../../src/utils/crypto.js"; // Assuming your crypto.js now uses argon2

describe("Crypto utils (Argon2)", () => {
    it("should hash a password with a valid Argon2 format", async () => {
        // Arrange
        const password = "testpassword";

        // Act
        const hash = await hashPassword(password);

        // Assert
        // Argon2 hashes have a specific structure, typically starting with $argon2id$
        // followed by version, cost parameters (m, t, p), salt, and the hash itself.
        // Example: $argon2id$v=19$m=65536,t=3,p=4$c2FsdHNvZnNhbHQ$somehashvalue
        const argon2Regex = /^\$argon2(?:i|d|id)\$v=\d+\$m=\d+,t=\d+,p=\d+\$[A-Za-z0-9+/]+={0,2}\$[A-Za-z0-9+/]+={0,2}$/;
        expect(hash).toMatch(argon2Regex);
    });

    it("should produce a different hash for the same password on consecutive calls", async () => {
        // Arrange
        const password = "testpassword";

        // Act
        const hash1 = await hashPassword(password);
        const hash2 = await hashPassword(password);

        // Assert
        // Argon2, like bcrypt, uses a random salt, so identical inputs yield different hashes.
        expect(hash1).not.toEqual(hash2);
    });

    describe("compareHash", () => {
        let passwordHash: string;
        const password = "testpassword";
        const wrongPassword = "wrongpassword";

        it("should create a hash to be used in comparison tests", async () => {
            // Act
            passwordHash = await hashPassword(password);

            // Assert
            expect(passwordHash.length).toBeGreaterThan(0);
            // Optionally, you can re-check the format here too for robustness
            const argon2Regex = /^\$argon2(?:i|d|id)\$v=\d+\$m=\d+,t=\d+,p=\d+\$[A-Za-z0-9+/]+={0,2}\$[A-Za-z0-9+/]+={0,2}$/;
            expect(passwordHash).toMatch(argon2Regex);
        });

        it("should return true for a correct password", async () => {
            // Act
            // The compareHash function should correctly handle the Argon2 verification
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
