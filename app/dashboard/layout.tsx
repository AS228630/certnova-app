import type { Metadata } from "next";

// Genuinely personal page (real streak, progress, AI-coach-driven
// recommendations) — noindex, matching /profile and /ai-coach. Guest-
// accessible (requireAuth=false on the page itself) doesn't change
// this: nothing here is static content Google should show in results.
export const metadata: Metadata = {
  robots: { index: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
