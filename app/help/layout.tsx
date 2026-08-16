import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hilfe & Support",
  description: "Antworten und Support rund um CertCoach: Konto, Zahlung, Zertifizierungen und mehr.",
  alternates: { canonical: "https://www.certcoach.de/help" },
};

export default function HelpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
