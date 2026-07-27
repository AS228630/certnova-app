import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, ShieldCheck, Sparkles, Route } from "lucide-react";

export const metadata: Metadata = {
  title: "Certifications IT, cours de langues et coaching IA | CertCoach",
  description:
    "Prépare-toi aux certifications AWS, Microsoft, Cisco et plus avec CertCoach. Labs pratiques, questions d'entraînement, un coach IA et des parcours d'apprentissage structurés — commence gratuitement.",
  alternates: {
    canonical: "https://www.certcoach.de/fr",
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
      "x-default": "https://www.certcoach.de",
    },
  },
};

const FEATURES = [
  { icon: BookOpen, title: "Apprends en pratiquant", desc: "Labs et projets pratiques pour une expérience réelle." },
  { icon: ShieldCheck, title: "Certificats reconnus", desc: "Certificats reconnus à l'international pour ta carrière." },
  { icon: Sparkles, title: "Coach IA", desc: "Ton coach IA personnel t&apos;accompagne pendant l&apos;apprentissage." },
  { icon: Route, title: "Parcours d'apprentissage", desc: "Parcours structurés conçus pour ta réussite individuelle." }
];

export default function FrenchLandingPage() {
  return (
    <main dir="ltr" className="min-h-screen bg-[#0a0a12] text-white">
      <div className="mx-auto max-w-5xl px-6 py-20 text-center">
        <span className="mb-6 inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/70">
          Plateforme d&apos;apprentissage IT n°1 en DACH
        </span>
        <h1 className="font-bold text-4xl leading-tight sm:text-5xl">
          Ton avenir commence
          <br />
          <span className="text-violet-400">avec de nouvelles compétences</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-white/70">
          Apprends auprès d&apos;experts, obtiens des certificats reconnus et construis la carrière que tu veux. De Microsoft et AWS à CompTIA et Cisco.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/register"
            className="flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold hover:bg-violet-500"
          >
            Commencer gratuitement
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/zertifizierungen"
            className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold hover:bg-white/5"
          >
            Découvrir les cours
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 pb-24">
        <h2 className="mb-8 text-center text-2xl font-bold">Pourquoi CertCoach ?</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <f.icon size={22} className="mb-3 text-violet-400" />
              <p className="mb-1.5 text-sm font-bold">{f.title}</p>
              <p className="text-xs text-white/60">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-white/40">
        <p>© 2026 CertCoach. Fait avec ❤️ en Allemagne</p>
        <p className="mt-2">
          <Link href="/" className="underline hover:text-white/70">Deutsch</Link>
          {" · "}
          <Link href="/en" className="underline hover:text-white/70">English</Link>
          {" · "}
          <Link href="/fa" className="underline hover:text-white/70">فارسی</Link>
        </p>
      </div>
    </main>
  );
}
