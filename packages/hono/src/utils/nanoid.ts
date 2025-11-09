import { customAlphabet } from "nanoid";

const alphabet = "1234567890abcdef"; //? we want simple, human readable ids
const length = 10; //? not too long so user can memorize them

export const nanoid = customAlphabet(alphabet, length);
