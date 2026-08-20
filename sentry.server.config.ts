import * as Sentry from "@sentry/nextjs";

// Server-side counterpart to sentry.client.config.ts — catches errors
// thrown in API routes, server components, and server actions. Same
// env-var-gated, no-op-until-configured setup; see that file's comments.
Sentry.init({
  dsn: process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0,
  enabled: process.env.NODE_ENV === "production",
});
