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
        ],
      },
    ];
    // Note: a Content-Security-Policy header is intentionally not set
    // here yet — CertCoach loads resources from several external
    // origins (Vercel Analytics, Stripe Checkout redirect, flagcdn.com
    // flag images, Supabase, EmailJS), and a CSP needs every one of
    // those explicitly allow-listed or it silently breaks things like
    // fonts or the checkout redirect. Add it as a deliberate follow-up
    // once every external origin in use has been enumerated and tested.
  },
};

export default nextConfig;
