// Next.js calls this once when a new server instance starts (both the
// real Node.js server and any edge runtime instance). Loading the
// runtime-specific Sentry config here — rather than importing it at
// the top of every route — is the documented way to initialize Sentry
// for App Router server/edge code.
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }
  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}
