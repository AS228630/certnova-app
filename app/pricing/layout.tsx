import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preise",
  description:
    "CertCoach Preise: Lerne kostenlos mit Learn, Labs und Übungsfragen. Premium ab €14,99/Monat für vollständigen Zugriff auf alle Zertifizierungen.",
  alternates: {
    canonical: "https://www.certcoach.de/pricing",
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
