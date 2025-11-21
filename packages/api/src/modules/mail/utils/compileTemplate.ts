import Handlebars from "handlebars";
import { join, resolve } from "@std/path";

export const compileTemplate = async (name: string) => {
	const filePath = join(
		resolve(import.meta.dirname!, "../"),
		"templates",
		`${name}.hbs`,
	);
	const source = await Deno.readTextFile(filePath);
	return Handlebars.compile(source);
};
