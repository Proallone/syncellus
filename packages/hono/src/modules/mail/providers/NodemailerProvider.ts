import { AppConfig } from "@syncellus/hono/config/config.ts";
import type { IMailProvider, Mail } from "@syncellus/hono/modules/mail/types.d.ts";
import nodemailer, { type Transporter } from "nodemailer";

export class NodemailerProvider implements IMailProvider {
	private readonly transporter: Transporter;

	constructor() {
		const { SMTP_HOST, SMTP_PORT } = AppConfig.getInstance();
		this.transporter = nodemailer.createTransport({
			host: SMTP_HOST,
			port: SMTP_PORT,
			//TODO finish
		});
	}

	async verify() {
		return await this.transporter.verify();
	}

	async send(mail: Mail) {
		return await this.transporter.sendMail({
			from: "do-not-reply@syncellus.com", //TODO add to config?
			to: mail.to,
			subject: mail.subject,
			text: mail.text,
			html: mail.html,
		});
	}
}
