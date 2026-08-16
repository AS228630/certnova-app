import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CertCoach für Unternehmen",
  description: "Teamlizenzen, zentrales Reporting und individuelle Lernpfade für Unternehmen — bald verfügbar.",
  alternates: {
    canonical: "https://www.certcoach.de/business",
  },
};

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
