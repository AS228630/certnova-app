import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, ShieldCheck, Sparkles, Route } from "lucide-react";

export const metadata: Metadata = {
  title: "شهادات تقنية المعلومات، دورات لغة والتدريب بالذكاء الاصطناعي | CertCoach",
  description:
    "استعد لشهادات AWS وMicrosoft وCisco وغيرها مع CertCoach. مختبرات عملية، أسئلة تدريبية، مدرب ذكاء اصطناعي، ومسارات تعلم منظمة — ابدأ مجانًا.",
  alternates: {
    canonical: "https://www.certcoach.de/ar",
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
  { icon: BookOpen, title: "تعلّم عمليًا", desc: "مختبرات ومشاريع عملية لخبرة حقيقية." },
  { icon: ShieldCheck, title: "شهادات معتمدة", desc: "شهادات معترف بها دوليًا لمسيرتك المهنية." },
  { icon: Sparkles, title: "مدرب ذكاء اصطناعي", desc: "مدربك الشخصي بالذكاء الاصطناعي يرافقك أثناء التعلم." },
  { icon: Route, title: "مسارات تعلم", desc: "مسارات منظمة مصممة لنجاحك الفردي." }
];

export default function ArabicLandingPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#0a0a12] text-white">
      <div className="mx-auto max-w-5xl px-6 py-20 text-center">
        <span className="mb-6 inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/70">
          منصة التعلم رقم ١ لتقنية المعلومات في ألمانيا والنمسا وسويسرا
        </span>
        <h1 className="font-bold text-4xl leading-tight sm:text-5xl">
          مستقبلك يبدأ
          <br />
          <span className="text-violet-400">بمهارات جديدة</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-white/70">
          تعلّم من الخبراء، احصل على شهادات معترف بها، وابنِ المسيرة المهنية التي تريدها. من Microsoft وAWS إلى CompTIA وCisco.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/register"
            className="flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold hover:bg-violet-500"
          >
            ابدأ مجانًا
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/zertifizierungen"
            className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold hover:bg-white/5"
          >
            اكتشف الدورات
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 pb-24">
        <h2 className="mb-8 text-center text-2xl font-bold">لماذا CertCoach؟</h2>
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
        <p>© 2026 CertCoach. صُنع بـ ❤️ في ألمانيا</p>
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
