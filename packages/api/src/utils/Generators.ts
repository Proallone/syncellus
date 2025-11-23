import { customAlphabet } from "nanoid";
import { generate } from "@std/uuid/unstable-v7";

export class NanoID {
	private static readonly ALPHABET = "1234567890abcdef";
	private static readonly LENGHT = 10;
	private static readonly idGenerator = customAlphabet(NanoID.ALPHABET, NanoID.LENGHT);

	public static generate(): string {
		return NanoID.idGenerator();
	}
}

export class UUID {
	public static generateV7(): string {
		return generate();
	}
}