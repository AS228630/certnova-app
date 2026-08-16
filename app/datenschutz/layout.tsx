import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Wie CertCoach personenbezogene Daten verarbeitet und schützt.",
  alternates: { canonical: "https://www.certcoach.de/datenschutz" },
};

export default function DatenschutzLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
