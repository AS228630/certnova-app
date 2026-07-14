import type { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";

export const metadata: Metadata = {
  title: "IT-Zertifizierungen, Sprachkurse & KI-Coaching",
  description:
    "Bereite dich mit CertCoach praxisnah auf AWS-, Microsoft-, Google Cloud- und weitere IT-Zertifizierungen vor. Labs, Übungsfragen, KI Coach und strukturierte Lernpfade — kostenlos starten.",
  alternates: {
    canonical: "https://www.certcoach.de",
  },
};

export default function Page() {
  return <HomePageClient />;
}
