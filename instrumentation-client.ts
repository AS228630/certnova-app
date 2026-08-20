import * as Sentry from "@sentry/nextjs";

// Client-side Sentry init. Reads NEXT_PUBLIC_SENTRY_DSN from the
// environment — deliberately not hardcoded. Until that env var is set
// in Vercel, Sentry.init() with an undefined DSN is a documented no-op
// (the SDK stays loaded but silently does nothing), so this file is
// safe to ship before the account/project exists.
//
// Named instrumentation-client.ts (not sentry.client.config.ts) per the
// current Next.js App Router file-system convention this SDK version
// expects — the old filename is a leftover pattern from older guides
// and is silently never loaded on this Next.js version.
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  // Errors only for now, not full session/performance tracing — keeps
  // this within Sentry's free tier without needing to think about
  // trace sampling on day one. Can be raised later once real traffic
  // patterns are known.
  tracesSampleRate: 0,
  // Don't spam Sentry with expected/harmless noise during local
  // development — only report from the real deployed site.
  enabled: process.env.NODE_ENV === "production",
});

// Required by the SDK to report client-side page navigations as part
// of the same breadcrumb trail as any error that follows them — makes
// "what did the user click right before this crashed" visible in
// Sentry instead of just the crash in isolation.
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
