import type { Mailer } from "@syncellus/modules/mailer/types.js";

export class MailService {
    constructor(private readonly mailer: Mailer) {}

    async sendPasswordReset(to: string, resetLink: string) {
        const subject = "Reset your password";
        const html = `
            <p>Click the link below to reset your password:</p>
            <a href="${resetLink}">${resetLink}</a> `;

        const text = `Reset your password: ${resetLink}`;

        await this.mailer.send({ to, subject, html, text });
    }
}
