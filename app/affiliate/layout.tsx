import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Programm",
  description: "Ein strukturiertes Partnerprogramm mit Provisionen befindet sich aktuell im Aufbau bei CertCoach.",
  alternates: { canonical: "https://www.certcoach.de/affiliate" },
};

export default function AffiliateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
