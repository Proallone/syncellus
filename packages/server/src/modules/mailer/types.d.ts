export interface Mail {
    to: string;
    subject: string;
    html?: string;
    text?: string;
}

export interface IMailProvider {
    verify(): Promise<boolean>;
    send(mail: Mail): Promise<void>;
}

export interface IMailService {
    verify(): Promise<boolean>;
    sendWelcome(to: string, username: string, verificationLink: string): Promise<void>;
    sendPasswordReset(to: string, resetLink: string): Promise<void>;
}
