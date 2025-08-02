import { logger } from "@syncellus/core/logger.js";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";

type MiddlewareFunction = (req: Request, res: Response, next: NextFunction) => void;

type validate = (
    schema: z.ZodObject<{
        body?: z.ZodTypeAny;
        query?: z.ZodTypeAny;
        params?: z.ZodTypeAny;
    }>
) => MiddlewareFunction;

const validate: validate =
    (schema): MiddlewareFunction =>
    (req, res, next) => {
        const result = schema.safeParse({
            body: req.body,
            query: req.query,
            params: req.params
        });

        if (!result.success) {
            logger.warn(`Invalid body payload for endpoint ${req.originalUrl} by ${req.ip}. Invalid body: ${JSON.stringify(req.body)}`);
            return res.status(400).json({
                status: "error",
                message: "Validation failed",
                errors: result.error.issues.map((err) => ({
                    path: err.path.join("."),
                    message: err.message,
                    code: err.code
                }))
            });
        }

        next();
    };

export { validate };
