import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, ShieldCheck, Sparkles, Route } from "lucide-react";

export const metadata: Metadata = {
  title: "IT Certifications, Language Courses & AI Coaching | CertCoach",
  description:
    "Prepare for AWS, Microsoft, Cisco and other IT certifications with CertCoach. Hands-on labs, practice questions, an AI coach, and structured learning paths — start for free.",
  alternates: {
    canonical: "https://www.certcoach.de/en",
    languages: {
      de: "https://www.certcoach.de",
      en: "https://www.certcoach.de/en",
      fa: "https://www.certcoach.de/fa",
    },
  },
};

const FEATURES = [
  { icon: BookOpen, title: "Learn hands-on", desc: "Hands-on labs and projects for real practical experience." },
  { icon: ShieldCheck, title: "Recognized Certificates", desc: "Internationally recognized certificates for your career." },
  { icon: Sparkles, title: "AI Coach", desc: "Your personal AI coach accompanies you while learning." },
  { icon: Route, title: "Learning Paths", desc: "Structured paths designed for your individual success." },
];

export default function EnglishLandingPage() {
  return (
    <main className="min-h-screen bg-[#0a0a12] text-white">
      <div className="mx-auto max-w-5xl px-6 py-20 text-center">
        <span className="mb-6 inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/70">
          #1 IT Learning Platform in DACH
        </span>
        <h1 className="font-bold text-4xl leading-tight sm:text-5xl">
          Your future begins
          <br />
          <span className="text-violet-400">with new skills</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-white/70">
          Learn from experts, earn recognized certificates, and build the career you want. From
          Microsoft and AWS to CompTIA and Cisco.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/register"
            className="flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold hover:bg-violet-500"
          >
            Start for free
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/zertifizierungen"
            className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold hover:bg-white/5"
          >
            Discover courses
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 pb-24">
        <h2 className="mb-8 text-center text-2xl font-bold">Why CertCoach?</h2>
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
        <p>© 2026 CertCoach. Made with ❤️ in Germany</p>
        <p className="mt-2">
          <Link href="/" className="underline hover:text-white/70">Deutsch</Link>
          {" · "}
          <Link href="/fa" className="underline hover:text-white/70">فارسی</Link>
        </p>
      </div>
    </main>
  );
}
