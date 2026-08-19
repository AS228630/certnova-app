import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      // Old candidate-profile share-link URL format
      // (/candidate/{name-slug}/{token}) -> new short format
      // (/c/{token}). Per the advisor's final URL design decision:
      // the URL got shorter (128-bit token instead of 256-bit, no
      // cosmetic name segment anymore), but no previously-issued link
      // should silently break — this preserves the {token} segment
      // exactly and just changes the path shape around it. The old
      // long token still hashes and verifies correctly either way
      // (verifyShareToken doesn't care about token length), so an
      // old-format link keeps working via this redirect even though
      // new links are issued in the shorter /c/{token} form.
      {
        source: '/candidate/:slug/:token',
        destination: '/c/:token',
        permanent: false,
      },
    ];
  },
  async headers() {
    // Every external origin the site actually loads/connects to at
    // runtime, enumerated by grepping the codebase rather than assumed:
    // Supabase (DB/auth/storage), EmailJS (contact form), flagcdn.com
    // (language-course flag images), Vercel Analytics/Speed Insights
    // (same-origin script + its data-collection endpoint). Stripe
    // Checkout is NOT loaded in an iframe or via Stripe.js — the app
    // creates a session server-side and does a full-page
    // `window.location.href` redirect to it, so it needs no CSP
    // allowance beyond the browser's normal top-level navigation.
    //
    // script-src/style-src keep 'unsafe-inline': Next.js's own
    // hydration payload and ~70 components' inline `style={{...}}`
    // attributes both rely on it. Removing that requires a nonce-based
    // strict CSP wired through middleware and tested against every
    // page before shipping — a separate, larger follow-up, not bundled
    // into this first real CSP. Even with 'unsafe-inline' script-src,
    // this CSP still blocks the actual common attack it exists for:
    // an XSS payload loading attacker-controlled JS/CSS/images from a
    // domain that isn't in this list.
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://flagcdn.com https://*.supabase.co",
      "font-src 'self' data:",
      "connect-src 'self' https://*.supabase.co https://api.emailjs.com https://vitals.vercel-insights.com https://va.vercel-scripts.com",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          // Prevents the site from being embedded in an iframe on another
          // domain (clickjacking protection).
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Stops the browser from guessing content types away from what
          // the server declared (MIME-sniffing protection).
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Only send the origin (not the full URL/path) as a referrer to
          // other sites, while still sending full referrer info same-site.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Forces HTTPS for a year, including subdomains, once a browser
          // has seen this header once.
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          // Disables browser features we don't use, so an XSS bug can't
          // abuse them either.
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // Restricts which origins scripts/styles/images/connections can
          // come from at all — the actual defense against an XSS payload
          // exfiltrating data or loading attacker JS from elsewhere.
          { key: "Content-Security-Policy", value: csp },
        ],
      },
    ];
  },
};

export default nextConfig;
