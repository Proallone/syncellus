import pino, { type Logger } from "pino";

export class LoggerService {
  private static instance: Logger | null = null;
  private constructor() {} //? prevent `new LoggerService()`

  public static getInstance(): Logger {
    if (!LoggerService.instance) {
      LoggerService.instance = pino({
        level: Deno.env.get("LOG_LEVEL") || "info",
      });
    }
    return LoggerService.instance;
  }
}
