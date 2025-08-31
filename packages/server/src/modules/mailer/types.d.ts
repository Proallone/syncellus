export interface Mail {
    to: string;
    subject: string;
    html?: string;
    text?: string;
}

export interface IMailProvider {
    send(mail: Mail): Promise<void>;
}

export interface IMailService {
    sendWelcome(to: string, username: string): Promise<void>;
    sendPasswordReset(to: string, resetLink: string): Promise<void>;
}
