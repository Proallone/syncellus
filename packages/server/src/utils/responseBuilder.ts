import type { Response } from "express";

interface ApiResponse<T = unknown> {
    success?: boolean;
    message?: string;
    data?: T;
    meta?: Record<string, unknown>;
}

export const sendResponse = <T>(res: Response, statusCode: number, options: ApiResponse<T>) => {
    return res.status(statusCode).json({
        success: options.success || true,
        message: options.message,
        data: options.data ?? null,
        meta: options.meta ?? null
    });
};
