import type { IMailService, IMailProvider } from "@syncellus/modules/mailer/types.js";
import { compileTemplate } from "@syncellus/modules/mailer/utils/compileTemplate.js";

export class MailService implements IMailService {
    constructor(private readonly mailer: IMailProvider) {}

    async sendWelcome(to: string, username: string) {
        const template = compileTemplate("welcome");
        const data = {
            appName: "Syncellus",
            username: username,
            currentYear: new Date().getFullYear().toString()
        };
        const html = template(data);
        const subject = "Welcome to Syncellus";

        await this.mailer.send({ to, subject, html });
    }

    async sendPasswordReset(to: string, resetLink: string) {
        const template = compileTemplate("passwordReset");
        const html = template({ resetLink });
        const subject = "Reset your password";

        await this.mailer.send({ to, subject, html });
    }
}
