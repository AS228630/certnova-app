"use client";

import LandingHeader from "@/components/LandingHeader";
import Footer from "@/components/Footer";
import CertificationsGuestPage from "@/components/certifications/CertificationsGuestPage";
import { useLocale } from "@/components/LocaleProvider";
import { useGuestOnlyRedirect } from "@/lib/useGuestOnlyRedirect";
import { SiGoogle } from "react-icons/si";
import { getCompanyIcon } from "@/lib/vendorIcons";

// Real catalog companies only — no logos for companies the platform
// doesn't actually have certifications for.
const trustLogos = [
  { name: "Google", render: () => <SiGoogle size={22} /> },
  { name: "Microsoft", render: () => getCompanyIcon("microsoft", 22) },
  { name: "AWS", render: () => getCompanyIcon("aws", 22) },
  { name: "IBM", render: () => getCompanyIcon("ibm", 22) },
  { name: "Cisco", render: () => getCompanyIcon("cisco", 22) },
  { name: "Oracle", render: () => getCompanyIcon("oracle", 22) },
];

export default function ZertifizierungenPage() {
  const { t } = useLocale();
  const { checking } = useGuestOnlyRedirect();

  if (checking) return null;

  return (
    <div className="min-h-screen bg-bg">
      <LandingHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <CertificationsGuestPage />

        <section className="mt-14">
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-wide text-text-faint">
            {t("landing.trustedByTitle")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-70 grayscale">
            {trustLogos.map((l) => (
              <span key={l.name} className="flex items-center gap-2 text-text-muted">
                {l.render()}
                <span className="text-base font-semibold">{l.name}</span>
              </span>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
