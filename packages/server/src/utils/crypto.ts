import * as argon2 from "argon2";
import { createHash, randomBytes } from "node:crypto";

/**
 * Hashes a plaintext password using Argon2.
 * @param password The plaintext password to hash.
 * @returns A Promise that resolves to the hashed password string.
 */
export const hashPassword = async (password: string): Promise<string> => {
  return await argon2.hash(password);
};

/**
 * Compares a plaintext password with a hashed password using Argon2.
 * @param password The plaintext password to compare.
 * @param passwordHash The hashed password to compare against.
 * @returns A Promise that resolves to a boolean indicating if the passwords match.
 */
export const compareHash = async (
  password: string,
  passwordHash: string,
): Promise<boolean> => {
  return await argon2.verify(passwordHash, password);
};

/**
 * Generates a cryptographically secure random token.
 * @returns A random token as a hexadecimal string.
 */
export const generateToken = (): string => {
  return randomBytes(32).toString("hex");
};

/**
 * Creates a SHA-256 hash of an input string.
 * @param token The string to be hashed.
 * @returns The SHA-256 hash as a hexadecimal string.
 */
export const sha256 = (token: string) => {
  return createHash("sha256").update(token).digest("hex");
};
