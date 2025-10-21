import { z } from "zod";

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
    switch (issue.code) {
        case z.ZodIssueCode.invalid_type:
            if (issue.received === "undefined" || issue.received === "null") {
                return { message: "This field is required" };
            }
            if (issue.expected === "string") {
                return { message: "Please enter text" };
            }
            if (issue.expected === "number") {
                return { message: "Please enter a number" };
            }
            return { message: `Invalid value type` };

        case z.ZodIssueCode.too_small:
            if (issue.type === "string") {
                return { message: `Minimum ${issue.minimum} characters required` };
            }
            if (issue.type === "number") {
                return {
                    message: `Number must be greater than or equal to ${issue.minimum}`,
                };
            }
            return { message: `Value is too small` };

        case z.ZodIssueCode.too_big:
            if (issue.type === "string") {
                return { message: `Maximum ${issue.maximum} characters allowed` };
            }
            if (issue.type === "number") {
                return {
                    message: `Number must be less than or equal to ${issue.maximum}`,
                };
            }
            return { message: `Value is too large` };

        case z.ZodIssueCode.invalid_string:
            if (issue.validation === "email") {
                return { message: "Please enter a valid email address" };
            }
            if (issue.validation === "url") {
                return { message: "Please enter a valid URL" };
            }
            return { message: "Invalid text format" };

        case z.ZodIssueCode.invalid_date:
            return { message: "Please enter a valid date" };

        case z.ZodIssueCode.custom:
            return { message: issue.message || "Invalid value" };

        default:
            return { message: ctx.defaultError };
    }
};

export { customErrorMap };

/*
SUMMARY:
This file defines a custom error map for Zod schema validation.
It replaces Zod’s default error messages with clearer, user-friendly text.
Each case in the switch statement handles a specific Zod issue type:
- invalid_type → missing or wrong data type (e.g. required field, string, number)
- too_small / too_big → enforces minimum and maximum constraints for strings and numbers
- invalid_string → handles email and URL validation errors
- invalid_date → ensures valid date input
- custom → uses a custom message when provided
If none match, it falls back to Zod’s default error message.
*/
