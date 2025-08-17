import pino, { type Logger } from "pino";

export class LoggerService {
    private static instance: Logger | null = null;
    private constructor() {} //? prevent `new LoggerService()`

    public static getInstance(): Logger {
        if (!LoggerService.instance) {
            LoggerService.instance = pino({
                level: "info",
                transport: {
                    target: "pino-pretty",
                    options: {
                        colorize: true
                    }
                }
            });
        }
        return LoggerService.instance;
    }
}
