import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Barrierefreiheit",
  description: "Wie CertCoach an einer barrierefreien Nutzung arbeitet.",
  alternates: { canonical: "https://www.certcoach.de/barrierefreiheit" },
};

export default function BarrierefreiheitLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
