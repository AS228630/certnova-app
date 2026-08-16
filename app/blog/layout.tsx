import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Artikel zu IT-Themen, Lerntipps und Zertifizierungen von CertCoach.",
  alternates: {
    canonical: "https://www.certcoach.de/blog",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
