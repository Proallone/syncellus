import * as argon2 from "argon2";
import { crypto } from "@std/crypto/crypto";

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
 * @param tokenLength Optional token length (defaults to 32)
 * @returns A random token as a hexadecimal string.
 */
export const generateToken = (tokenLength: number = 32): string => {
	const buffer = new Uint8Array(tokenLength);
	crypto.getRandomValues(buffer);
	return toHex(buffer);
};

/**
 * Creates a SHA-256 hash of an input string.
 * @param token The string to be hashed.
 * @returns The SHA-256 hash as a hexadecimal string.
 */
export const sha256 = async (token: string): Promise<string> => {
	const tokenEncoded = new TextEncoder().encode(token);
	const digest = await crypto.subtle.digest("SHA-256", tokenEncoded); //TODO consider BLAKE3 for better performance
	const hashBuffer = new Uint8Array(digest);
	return toHex(hashBuffer);
};

/**
 * Converts a byte array (Uint8Array) into a hexadecimal string.
 * @param bytes The byte array to convert.
 * @returns The hexadecimal representation of the byte array.
 */
const toHex = (bytes: Uint8Array): string =>
	Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");