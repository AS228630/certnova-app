import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Presse",
  description: "Informationen und Kontakt für Medienanfragen zu CertCoach.",
  alternates: { canonical: "https://www.certcoach.de/presse" },
};

export default function PresseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
