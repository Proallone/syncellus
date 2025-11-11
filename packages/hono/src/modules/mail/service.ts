import type {
  IMailProvider,
  IMailService,
} from "@syncellus/hono/modules/mail/types.d.ts";
import { compileTemplate } from "@syncellus/hono/modules/mail/utils/compileTemplate.ts";

//TODO fix 500 if mailer provider is not available
export class MailService implements IMailService {
  constructor(private readonly mailer: IMailProvider) { }

  async verify() {
    return await this.mailer.verify();
  }

  async sendWelcome(to: string, username: string, verificationLink: string) {
    const template = await compileTemplate("auth_welcome");
    const data = {
      appName: "Syncellus",
      username,
      currentYear: new Date().getFullYear().toString(),
      verificationLink,
    };
    const html = template(data);
    const subject = "Welcome to Syncellus";

    await this.mailer.send({ to, subject, html });
  }

  async sendPasswordReset(to: string, resetLink: string) {
    const template = await compileTemplate("auth_password_reset");
    const expiration_minutes = 15; // TODO move to a config and unify with other places?
    const html = template({ resetLink, expiration_minutes });
    const subject = "Reset your password";

    await this.mailer.send({ to, subject, html });
  }

  async sendTeamInvitation(to: string, teamName: string, inviterName: string) {
    const template = await compileTemplate("workspaces_team_invitation");
    const data = {
      appName: "Syncellus",
      teamName,
      currentYear: new Date().getFullYear().toString(),
      inviterName,
      invitedEmail: to,
    };
    const html = template(data);
    const subject = "Syncellus team invitation";

    await this.mailer.send({ to, subject, html });
  }
}
