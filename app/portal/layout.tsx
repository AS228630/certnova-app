import type { Metadata } from "next";

// Real SEO/professionalism gap found and fixed during a full-site audit:
// none of /portal's pages had any robots directive at all (unlike
// /admin-senmas, /profile, /dashboard, and the private certification
// routes, which already correctly noindex). Set here rather than per
// page since every /portal/* page is 'use client' and can't export
// metadata directly.
export const metadata: Metadata = {
  robots: { index: false },
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
