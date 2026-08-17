import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analysen",
  description: "Detaillierte Auswertungen deines Lernfortschritts über alle Zertifizierungen hinweg.",
  alternates: { canonical: "https://www.certcoach.de/analytics" },
};

export default function AnalyticsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
