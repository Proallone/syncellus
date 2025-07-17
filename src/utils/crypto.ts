import bcrypt from "bcrypt";

const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

const compareHash = async (password: string, passwordHash: string) => {
    return await bcrypt.compare(password, passwordHash);
};

export { hashPassword, compareHash };
