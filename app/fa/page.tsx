import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, ShieldCheck, Sparkles, Route } from "lucide-react";

export const metadata: Metadata = {
  title: "گواهینامه‌های آی‌تی، دوره‌های زبان و مربی هوش مصنوعی | CertCoach",
  description:
    "با CertCoach برای گواهینامه‌های AWS، مایکروسافت، سیسکو و دیگر گواهینامه‌های آی‌تی آماده شو. آزمایشگاه‌های عملی، سؤالات تمرینی، مربی هوش مصنوعی و مسیرهای یادگیری ساختاریافته — رایگان شروع کن.",
  alternates: {
    canonical: "https://www.certcoach.de/fa",
    languages: {
      de: "https://www.certcoach.de",
      en: "https://www.certcoach.de/en",
      fa: "https://www.certcoach.de/fa",
    },
  },
};

const FEATURES = [
  { icon: BookOpen, title: "یادگیری عملی", desc: "لب‌ها و پروژه‌های عملی برای تجربه‌ی واقعی." },
  { icon: ShieldCheck, title: "گواهینامه‌های معتبر", desc: "گواهینامه‌های معتبر بین‌المللی برای شغلت." },
  { icon: Sparkles, title: "مربی هوش مصنوعی", desc: "مربی شخصی هوش مصنوعی‌ات همراهت تو یادگیریه." },
  { icon: Route, title: "مسیرهای یادگیری", desc: "مسیرهای ساختاریافته برای موفقیت فردی." },
];

export default function FarsiLandingPage() {
  return (
    <main dir="rtl" lang="fa" className="min-h-screen bg-[#0a0a12] text-white">
      <div className="mx-auto max-w-5xl px-6 py-20 text-center">
        <span className="mb-6 inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/70">
          پلتفرم شماره یک آموزش فناوری اطلاعات در آلمان، اتریش و سوئیس
        </span>
        <h1 className="font-bold text-4xl leading-tight sm:text-5xl">
          آینده‌ات از اینجا شروع می‌شه
          <br />
          <span className="text-violet-400">با مهارت‌های جدید</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-white/70">
          از متخصصان یاد بگیر، گواهینامه‌های معتبر بگیر و شغلی که می‌خوای رو بساز. از Microsoft و AWS
          تا CompTIA و Cisco.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/register"
            className="flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold hover:bg-violet-500"
          >
            رایگان شروع کن
            <ArrowRight size={16} className="rotate-180" />
          </Link>
          <Link
            href="/zertifizierungen"
            className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold hover:bg-white/5"
          >
            دوره‌ها رو کشف کن
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 pb-24">
        <h2 className="mb-8 text-center text-2xl font-bold">چرا CertCoach؟</h2>
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
        <p>© ۲۰۲۶ CertCoach. با ❤️ در آلمان ساخته شده</p>
        <p className="mt-2">
          <Link href="/" className="underline hover:text-white/70">Deutsch</Link>
          {" · "}
          <Link href="/en" className="underline hover:text-white/70">English</Link>
        </p>
      </div>
    </main>
  );
}
