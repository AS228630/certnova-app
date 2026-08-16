import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und rechtliche Angaben zu CertCoach gemäß § 5 TMG.",
  alternates: { canonical: "https://www.certcoach.de/impressum" },
};

export default function ImpressumLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
