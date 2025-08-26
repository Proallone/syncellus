import path from "path";
import fs from "fs";
import Handlebars from "handlebars";

export const compileTemplate = (name: string) => {
    const filePath = path.join(path.resolve(import.meta.dirname, "../"), "templates", `${name}.hbs`);
    const source = fs.readFileSync(filePath, "utf-8");
    return Handlebars.compile(source);
};
