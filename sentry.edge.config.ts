import * as Sentry from "@sentry/nextjs";

// Edge-runtime counterpart (middleware / edge API routes) — this
// project doesn't currently use middleware.ts, but Next.js expects this
// file to exist alongside the client/server configs when using
// @sentry/nextjs, and it costs nothing to have ready for when it does.
Sentry.init({
  dsn: process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0,
  enabled: process.env.NODE_ENV === "production",
});
