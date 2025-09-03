import { describe, it, expect } from "vitest";
import { AuthSchema, AuthBasePayload } from "@syncellus/modules/auth/schemas/request.js";

describe("AuthBasePayload", () => {
    it("should validate a correct email and password", () => {
        const data = { email: "test@mail.com", password: "strongpassword" };
        const parsed = AuthBasePayload.parse(data);
        expect(parsed).toEqual(data);
    });

    it("should reject invalid email", () => {
        expect(() => AuthBasePayload.parse({ email: "invalid", password: "strongpassword" })).toThrowError();
    });

    it("should reject password shorter than 8 characters", () => {
        expect(() => AuthBasePayload.parse({ email: "test@mail.com", password: "short" })).toThrowError();
    });

    it("should reject password longer than 40 characters", () => {
        const longPassword = "a".repeat(41);
        expect(() => AuthBasePayload.parse({ email: "test@mail.com", password: longPassword })).toThrowError();
    });

    it("should reject unexpected extra fields", () => {
        expect(() =>
            AuthBasePayload.parse({
                email: "test@mail.com",
                password: "strongpassword",
                extra: "not-allowed"
            })
        ).toThrowError();
    });
});

describe("AuthSchema", () => {
    it("should validate request body correctly", () => {
        const req = {
            body: { email: "test@mail.com", password: "strongpassword" }
        };
        const parsed = AuthSchema.parse(req);
        expect(parsed).toEqual(req);
    });

    it("should reject invalid body", () => {
        const badReq = {
            body: { email: "invalid", password: "123" }
        };
        expect(() => AuthSchema.parse(badReq)).toThrowError();
    });
});
