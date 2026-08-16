import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Widerrufsrecht",
  description: "Informationen zum gesetzlichen Widerrufsrecht bei CertCoach.",
  alternates: { canonical: "https://www.certcoach.de/widerrufsrecht" },
};

export default function WiderrufsrechtLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
