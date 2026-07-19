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
//
// Launch scope: only the 6 featured companies (Microsoft, AWS, Cisco,
// CompTIA, Linux, ITIL) are shown anywhere on this page — grid,
// carousel, and search all filter to `featured` only. The other 15
// companies stay fully defined in lib/companiesData.ts (nothing
// deleted) so unlocking one later is a one-line flag flip, but they
// are completely absent from the UI until then, per instruction.
export default function CertificationsPageClient({ companies }: { companies: Company[] }) {
  const [query, setQuery] = useState("");
  const visibleCompanies = companies.filter((c) => c.featured);
  const featured = visibleCompanies.slice(0, 4);

  return (
    <>
      <CertificationsHero query={query} onQueryChange={setQuery} />
      <CertificationsStats />
      {query.trim().length === 0 && <PopularProvidersCarousel companies={featured} />}
      <AllProvidersGrid companies={visibleCompanies} query={query} onQueryChange={setQuery} />
      <CertificationsCTA />
      <Footer />
    </>
  );
}
