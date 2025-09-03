import type { Response } from "express";
import type { ZodObject } from "zod";

interface ApiResponse<T = unknown> {
    success?: boolean;
    message?: string;
    data?: T;
    meta?: Record<string, unknown>;
    schema?: ZodObject;
}

export const sendResponse = <T>(res: Response, statusCode: number, options: ApiResponse<T>) => {
    let responseData = options.data ?? null;

    // If a schema is provided, sanitize the data
    if (options.schema && responseData !== null) {
        // safely cast the result to `T` because schema defines it
        responseData = options.schema.parse(responseData) as T;
    }

    return res.status(statusCode).json({
        success: options.success ?? true,
        message: options.message,
        data: responseData, // use the sanitized version!
        meta: options.meta ?? null
    });
};
