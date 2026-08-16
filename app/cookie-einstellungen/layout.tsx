import type { Metadata } from "next";

// A settings/preferences action page, not informational content —
// noindex, matching the same reasoning as /kuendigen and /license.
export const metadata: Metadata = {
  robots: { index: false },
};

export default function CookieEinstellungenLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
