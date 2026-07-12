"use client";

import { useState } from "react";
import type { Company } from "@/lib/companiesData";
import CertificationsHero from "@/components/certifications/CertificationsHero";
import CertificationsStats from "@/components/certifications/CertificationsStats";
import PopularProvidersCarousel from "@/components/certifications/PopularProvidersCarousel";
import AllProvidersGrid from "@/components/certifications/AllProvidersGrid";
import CertificationsCTA from "@/components/certifications/CertificationsCTA";
import Footer from "@/components/Footer";

// Wires the search box in CertificationsHero (which previously kept its
// own useState but never used it to filter anything) to the real,
// already-working filter logic that lives in AllProvidersGrid — rather
// than duplicating that filter here, both components now share one
// query value, so typing in the hero search box scrolls-to-relevant
// results in the same list below, with no second disconnected filter.
export default function CertificationsPageClient({ companies }: { companies: Company[] }) {
  const [query, setQuery] = useState("");
  const featured = companies.slice(0, 4);

  return (
    <>
      <CertificationsHero query={query} onQueryChange={setQuery} />
      <CertificationsStats />
      {query.trim().length === 0 && <PopularProvidersCarousel companies={featured} />}
      <AllProvidersGrid companies={companies} query={query} onQueryChange={setQuery} />
      <CertificationsCTA />
      <Footer />
    </>
  );
}
