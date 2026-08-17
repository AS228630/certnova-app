import type { Metadata } from "next";

// Genuinely personal, interactive feature (real conversation memory,
// real user goals) — noindex, not SEO metadata, matching /profile and
// /dashboard. Guest-accessible (requireAuth=false on the page itself)
// doesn't change this: there's no static content here for Google to
// usefully index, same reasoning as /dashboard.
export const metadata: Metadata = {
  robots: { index: false },
};

export default function AiCoachLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
