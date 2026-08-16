import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner werden",
  description: "Interessiert an einer Zusammenarbeit mit CertCoach? Wir sind offen für Partnerschaften mit Bildungseinrichtungen und Unternehmen.",
  alternates: { canonical: "https://www.certcoach.de/partner" },
};

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
