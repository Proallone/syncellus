import * as argon2 from "argon2";

/**
 * Hashes a plaintext password using Argon2.
 * @param password The plaintext password to hash.
 * @returns A Promise that resolves to the hashed password string.
 */
const hashPassword = async (password: string): Promise<string> => {
    try {
        const h = await argon2.hash(password);
        console.info(h);
        return h;
    } catch (err) {
        console.error(err);
    }
};

/**
 * Compares a plaintext password with a hashed password using Argon2.
 * @param password The plaintext password to compare.
 * @param passwordHash The hashed password to compare against.
 * @returns A Promise that resolves to a boolean indicating if the passwords match.
 */
const compareHash = async (password: string, passwordHash: string): Promise<boolean> => {
    return await argon2.verify(passwordHash, password);
};

export { hashPassword, compareHash };
