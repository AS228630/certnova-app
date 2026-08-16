import type { Metadata } from "next";

// Private, signed-in-only feature (DashboardShell requireAuth default) —
// noindex, not SEO metadata, matching /profile and /dashboard.
export const metadata: Metadata = {
  robots: { index: false },
};

export default function CoachLiveLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
