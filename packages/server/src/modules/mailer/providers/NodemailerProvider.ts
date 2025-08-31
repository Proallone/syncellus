import nodemailer, { type Transporter } from "nodemailer";
import type { Mail, IMailProvider } from "@syncellus/modules/mailer/types.js";
import { AppConfig } from "@syncellus/configs/config.js";

export class NodemailerProvider implements IMailProvider {
    private readonly transporter: Transporter;

    constructor() {
        const { SMTP_HOST, SMTP_PORT } = AppConfig.getInstance();
        this.transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: SMTP_PORT
            //TODO finish
        });
    }

    async send(mail: Mail) {
        await this.transporter.sendMail({
            from: "do-not-reply@syncellus.com", //TODO add to config?
            to: mail.to,
            subject: mail.subject,
            text: mail.text,
            html: mail.html
        });
    }
}
