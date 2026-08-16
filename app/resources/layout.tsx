import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ressourcen",
  description: "Cheat-Sheets, E-Books, Anleitungen, Vorlagen, Tools und Webinare für deine IT-Zertifizierung — von CertCoach.",
  alternates: { canonical: "https://www.certcoach.de/resources" },
};

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
