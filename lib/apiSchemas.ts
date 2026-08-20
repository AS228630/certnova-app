import { z } from "zod";

// Runtime request-body validation for the public/user-facing API
// routes — previously these just did `as { field?: string }` type
// assertions, which TypeScript enforces at compile time but does
// nothing at runtime: a malformed or malicious body (wrong type, way
// too long, unexpected shape) would sail straight through to whatever
// the handler does with it. Centralized here so each route's schema is
// easy to find and review together rather than scattered inline.

export const cvAccessSchema = z.object({
  code: z.string().trim().min(1).max(200),
});

export const redeemLicenseSchema = z.object({
  code: z.string().trim().min(1).max(100),
  accessToken: z.string().trim().min(1),
});

export const createCheckoutSessionSchema = z.object({
  plan: z.enum(["monthly", "yearly"]),
  accessToken: z.string().trim().min(1),
  widerrufConsent: z.boolean().optional(),
  couponCode: z.string().trim().max(100).optional(),
  returnTo: z.string().trim().max(500).optional(),
});

export const cancelSubscriptionSchema = z.object({
  accessToken: z.string().trim().min(1),
  email: z.string().trim().email().max(320).optional(),
});

export const aiCoachSchema = z.object({
  accessToken: z.string().trim().min(1),
  mode: z.enum(["general", "interview"]).optional(),
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(4000),
      })
    )
    .min(1)
    .max(50),
});

export const candidateAccessCodeSchema = z.object({
  code: z.string().trim().min(1).max(100),
});

export const practiceQuestionsSchema = z.object({
  accessToken: z.string().trim().min(1).optional(),
  locale: z.string().trim().max(10).optional(),
});
