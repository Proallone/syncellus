import type { RequestHandler } from "express";
import passport from "passport";

/**
 * Returns a configured Passport.ts authentication middleware.
 * @param strategy The name of the Passport strategy to use (e.g., 'local', 'jwt').
 * @returns An Express RequestHandler.
 */
export const authenticate = (strategy: string): RequestHandler =>
  passport.authenticate(strategy, { session: false });
