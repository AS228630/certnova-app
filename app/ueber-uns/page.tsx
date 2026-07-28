import type { Metadata } from "next";
import UeberUnsPageClient from "./UeberUnsPageClient";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "CertCoach wurde von Ataullah Senmas gegründet, um IT- und Sprachkenntnisse für jeden zugänglich zu machen — mit strukturierten Lernpfaden, praktischen Labs und KI-Unterstützung.",
  alternates: {
    canonical: "https://www.certcoach.de/ueber-uns",
  },
};

export default function UeberUnsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Ataullah Senmas",
            jobTitle: "Software Engineer",
            alumniOf: {
              "@type": "CollegeOrUniversity",
              name: "ITMO University",
              address: "Saint Petersburg, Russia",
            },
            worksFor: {
              "@type": "Organization",
              name: "CertCoach",
              url: "https://www.certcoach.de",
            },
            homeLocation: {
              "@type": "Place",
              name: "Germany",
            },
            // sameAs (links to Ataullah's own verified LinkedIn/GitHub/etc.
            // profiles) intentionally omitted for now, same reasoning as
            // the Organization schema in layout.tsx - add real profile
            // URLs here once those accounts actually exist.
          }),
        }}
      />
      <UeberUnsPageClient />
    </>
  );
}
