import type { Mailer } from "@syncellus/modules/mailer/types.js";
import path from "path";
import fs from "fs";
import Handlebars from "handlebars";

const compileTemplate = (name: string) => {
    const filePath = path.join(import.meta.dirname, "templates", `${name}.hbs`);
    const source = fs.readFileSync(filePath, "utf-8");
    return Handlebars.compile(source);
};
export class MailService {
    constructor(private readonly mailer: Mailer) {}

    async sendPasswordReset(to: string, resetLink: string) {
        const template = compileTemplate("passwordReset");
        const html = template({ resetLink });
        const subject = "Reset your password";

        await this.mailer.send({ to, subject, html });
    }
}
