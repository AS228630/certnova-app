import type { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";

export const metadata: Metadata = {
  title: "IT-Zertifizierungen, Sprachkurse & KI-Coaching | CertCoach",
  description:
    "Bereite dich mit CertCoach praxisnah auf AWS-, Microsoft-, Google Cloud- und weitere IT-Zertifizierungen vor. Labs, Übungsfragen, KI Coach und strukturierte Lernpfade — kostenlos starten.",
  alternates: {
    canonical: "https://www.certcoach.de",
    languages: {
      de: "https://www.certcoach.de",
      en: "https://www.certcoach.de/en",
      fa: "https://www.certcoach.de/fa",
      ar: "https://www.certcoach.de/ar",
      uk: "https://www.certcoach.de/uk",
      es: "https://www.certcoach.de/es",
      fr: "https://www.certcoach.de/fr",
      ru: "https://www.certcoach.de/ru",
      tr: "https://www.certcoach.de/tr",
      "x-default": "https://www.certcoach.de/en",
    },
  },
};

export default function Page() {
  return <HomePageClient />;
}
