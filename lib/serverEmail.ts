// Server-side email sending via EmailJS's REST API — reuses the same
// EmailJS account already configured for the client-side contact form
// (see lib/emailjsConfig.ts), but calling it from a server route
// instead of the browser needs two things the owner must set up once:
//
//   1. EmailJS Dashboard → Account → Security → enable
//      "Allow EmailJS API for non-browser applications" (it's blocked
//      by default specifically to stop this kind of server call from
//      a stranger's script — enabling it plus the private key below
//      is what makes this route's call trusted instead).
//   2. Add EMAILJS_PRIVATE_KEY (from that same Security page) as a
//      server-only environment variable in Vercel — never
//      NEXT_PUBLIC_-prefixed, this one must never reach the browser.
//
// Until both exist, sendServerEmail() returns ok: false rather than
// throwing, so callers can fail the request cleanly with a clear
// "not configured yet" error instead of a confusing crash.
export async function sendServerEmail(
  templateId: string,
  templateParams: Record<string, string>
): Promise<{ ok: boolean }> {
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;
  if (!privateKey) return { ok: false };

  try {
    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: "service_nmxsfh8",
        template_id: templateId,
        user_id: "fglutleVgCqfqQBJE",
        accessToken: privateKey,
        template_params: templateParams,
      }),
    });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}
