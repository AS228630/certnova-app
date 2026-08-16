import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IT-Zertifizierungen entdecken",
  description: "Entdecke IT-Zertifizierungen von Microsoft, AWS, Google Cloud, Cisco, CompTIA und mehr — kostenlos starten mit CertCoach.",
  alternates: { canonical: "https://www.certcoach.de/zertifizierungen" },
};

export default function ZertifizierungenLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
