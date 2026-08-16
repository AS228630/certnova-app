import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alle Bewertungen",
  description: "Eine vollständige, durchsuchbare Übersicht aller Bewertungen unserer Lernenden ist in Arbeit.",
  alternates: {
    canonical: "https://www.certcoach.de/reviews",
  },
};

export default function ReviewsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
