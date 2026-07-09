import { getCompany, type Certification, translateCertDescription } from "./companiesData";
import de from "@/lib/i18n/dictionaries/de";
import en from "@/lib/i18n/dictionaries/en";
import fa from "@/lib/i18n/dictionaries/fa";
import ar from "@/lib/i18n/dictionaries/ar";
import uk from "@/lib/i18n/dictionaries/uk";
import es from "@/lib/i18n/dictionaries/es";
import fr from "@/lib/i18n/dictionaries/fr";
import ru from "@/lib/i18n/dictionaries/ru";
import tr from "@/lib/i18n/dictionaries/tr";

const JOURNEY_DICTS: Record<string, typeof de> = { de, en, fa, ar, uk, es, fr, ru, tr };
function journeyDict(locale: string) {
  return (JOURNEY_DICTS[locale] ?? de).journeyGen;
}

export type PhaseStat = {
  label: string;
  done: number;
  total: number;
  isTime?: boolean;
};

export type JourneyPhase = {
  key: "lernen" | "labore" | "pruefung";
  step: number;
  title: string;
  subtitle: string;
  weight: number; // contribution to overall progress, in %
  completion: number; // 0-100 within this phase
  stats: PhaseStat[];
  cta: string;
  unlocked: boolean;
  unlockHint?: string;
};

export type ProgressPoint = { label: string; value: number };

export type ActivityItem = {
  icon: "book" | "flask" | "clipboard" | "graduation";
  title: string;
  subtitle: string;
  timestamp: string;
};

export type CertJourney = {
  code: string;
  title: string;
  level: string;
  rating: number;
  reviewCount: number;
  duration: string;
  longDescription: string;
  themesDone: number;
  themesTotal: number;
  overallProgress: number;
  phases: JourneyPhase[];
  history: ProgressPoint[];
  activity: ActivityItem[];
};

const AZ_104_JOURNEY: CertJourney = {
  code: "AZ-104",
  title: "Azure Administrator Associate",
  level: "Intermediate",
  rating: 4.8,
  reviewCount: 1245,
  duration: "20-25 Stunden",
  longDescription:
    "Verwalten von Azure-Identitäten, Governance, Speicher, Compute und virtuellen Netzwerken in der Cloud.",
  themesDone: 17,
  themesTotal: 60,
  overallProgress: 28.6,
  phases: [
    {
      key: "lernen",
      step: 1,
      title: "Lernen",
      subtitle: "Wissen aufbauen",
      weight: 40,
      completion: 40,
      stats: [
        { label: "Module", done: 8, total: 20 },
        { label: "Videos", done: 24, total: 60 },
        { label: "Quiz", done: 12, total: 30 },
        { label: "Dauer", done: 10, total: 10, isTime: true },
      ],
      cta: "Module anzeigen",
      unlocked: true,
    },
    {
      key: "labore",
      step: 2,
      title: "Praxis-Labore",
      subtitle: "Fähigkeiten üben",
      weight: 35,
      completion: 25,
      stats: [
        { label: "Labs", done: 5, total: 20 },
        { label: "Aufgaben", done: 12, total: 40 },
        { label: "Dauer", done: 6, total: 6, isTime: true },
      ],
      cta: "Labore anzeigen",
      unlocked: true,
    },
    {
      key: "pruefung",
      step: 3,
      title: "Prüfungs-Simulation",
      subtitle: "Prüfung vorbereiten",
      weight: 25,
      completion: 15,
      stats: [
        { label: "Übungstests", done: 1, total: 6 },
        { label: "Fragen beantwortet", done: 30, total: 200 },
        { label: "Durchschnitt", done: 68, total: 100 },
      ],
      cta: "Übungstests anzeigen",
      unlocked: true,
    },
  ],
  history: [
    { label: "13. Mai", value: 5 },
    { label: "17. Mai", value: 10 },
    { label: "24. Mai", value: 14 },
    { label: "31. Mai", value: 18 },
    { label: "7. Jun", value: 20 },
    { label: "14. Jun", value: 24 },
    { label: "21. Jun", value: 28 },
  ],
  activity: [
    { icon: "graduation", title: "Modul abgeschlossen", subtitle: "Einführung in Azure", timestamp: "Heute, 10:30" },
    { icon: "flask", title: "Lab abgeschlossen", subtitle: "Erstellen einer virtuellen Maschine", timestamp: "Gestern, 14:20" },
    { icon: "clipboard", title: "Übungstest begonnen", subtitle: "Übungstest 1", timestamp: "20. Mai, 00:15" },
    { icon: "graduation", title: "Modul abgeschlossen", subtitle: "Verwalten von Identitäten", timestamp: "18. Mai, 16:45" },
  ],
};

// Simple deterministic hash so every non-hero cert still gets varied (but
// stable across renders) placeholder numbers instead of identical clones.
function hash(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

function generateJourney(cert: Certification, locale: string = "de"): CertJourney {
  const jt = journeyDict(locale);
  const h = hash(cert.id);
  const base = cert.progress ?? h % 60;
  const lernenPct = Math.min(100, base + (h % 15));
  const laborePct = Math.max(0, Math.min(100, base - 10 + (h % 12)));
  const pruefungPct = Math.max(0, Math.min(100, base - 25 + (h % 8)));
  const overall = Math.round((lernenPct * 0.4 + laborePct * 0.35 + pruefungPct * 0.25) * 10) / 10;
  const themesTotal = 40 + (h % 30);
  const themesDone = Math.round((overall / 100) * themesTotal);

  return {
    code: cert.code,
    title: cert.title,
    level: cert.level,
    rating: 4.4 + (h % 5) * 0.1,
    reviewCount: 200 + (h % 900),
    duration: `${10 + (h % 15)}-${20 + (h % 15)} ${jt.hoursUnit}`,
    longDescription: translateCertDescription(cert, cert.title.split(" ")[0], locale),
    themesDone,
    themesTotal,
    overallProgress: overall,
    phases: [
      {
        key: "lernen",
        step: 1,
        title: jt.phaseLearnTitle,
        subtitle: jt.phaseLearnSubtitle,
        weight: 40,
        completion: lernenPct,
        stats: [
          { label: jt.statModulesJ, done: Math.round((lernenPct / 100) * 20), total: 20 },
          { label: jt.statVideosJ, done: Math.round((lernenPct / 100) * 50), total: 50 },
          { label: jt.statQuizJ, done: Math.round((lernenPct / 100) * 25), total: 25 },
          { label: jt.statDurationJ, done: 8, total: 8, isTime: true },
        ],
        cta: jt.ctaShowModules,
        unlocked: true,
      },
      {
        key: "labore",
        step: 2,
        title: jt.phaseLabsTitle,
        subtitle: jt.phaseLabsSubtitle,
        weight: 35,
        completion: laborePct,
        stats: [
          { label: jt.statLabsJ, done: Math.round((laborePct / 100) * 15), total: 15 },
          { label: jt.statTasksJ, done: Math.round((laborePct / 100) * 30), total: 30 },
          { label: jt.statDurationJ, done: 5, total: 5, isTime: true },
        ],
        cta: jt.ctaShowLabs,
        unlocked: lernenPct >= 30,
        unlockHint: lernenPct >= 30 ? undefined : jt.unlockAt30,
      },
      {
        key: "pruefung",
        step: 3,
        title: jt.phaseExamTitle,
        subtitle: jt.phaseExamSubtitle,
        weight: 25,
        completion: pruefungPct,
        stats: [
          { label: jt.statPracticeTestsJ, done: Math.round((pruefungPct / 100) * 6), total: 6 },
          { label: jt.statQuestionsAnsweredJ, done: Math.round((pruefungPct / 100) * 150), total: 150 },
          { label: jt.statAverageJ, done: 60, total: 100 },
        ],
        cta: jt.ctaShowPracticeTests,
        unlocked: true,
      },
    ],
    history: Array.from({ length: 7 }).map((_, i) => ({
      label: `${jt.weekLabel} ${i + 1}`,
      value: Math.round((overall / 6) * i),
    })),
    activity: [
      { icon: "graduation", title: jt.activityModuleCompleted, subtitle: cert.title, timestamp: jt.todayLabel },
      { icon: "flask", title: jt.activityLabCompleted, subtitle: `${jt.activityExerciseFor} ${cert.title}`, timestamp: jt.yesterdayLabel },
    ],
  };
}

export function getCertJourney(companySlug: string, certId: string, locale: string = "de"): CertJourney | undefined {
  const company = getCompany(companySlug);
  const cert = company?.certs.find((c) => c.id === certId);
  if (!company || !cert) return undefined;

  if (companySlug === "microsoft" && certId === "az-104") return applyAz104Translation(AZ_104_JOURNEY, locale);
  return generateJourney(cert, locale);
}

// AZ-104 has its own hand-authored journey (real numbers, not generated),
// so it needs its own small override for the same repeated phase/stat/cta
// strings plus its two unique prose fields (duration, longDescription).
function applyAz104Translation(journey: CertJourney, locale: string): CertJourney {
  const jt = journeyDict(locale);
  const az104Duration: Partial<Record<string, string>> = {
    en: "20-25 hours",
    fa: "۲۰ تا ۲۵ ساعت",
    ar: "20-25 ساعة",
    uk: "20-25 годин",
    es: "20-25 horas",
    fr: "20-25 heures",
    ru: "20-25 часов",
    tr: "20-25 saat",
  };
  const az104Desc: Partial<Record<string, string>> = {
    en: "Managing Azure identities, governance, storage, compute, and virtual networks in the cloud.",
    fa: "مدیریت هویت‌های Azure، حاکمیت، ذخیره‌سازی، محاسبات و شبکه‌های مجازی تو کلاود.",
    ar: "إدارة هويات Azure والحوكمة والتخزين والحوسبة والشبكات الظاهرية في السحابة.",
    uk: "Керування ідентичностями Azure, врядуванням, сховищем, обчисленнями та віртуальними мережами в хмарі.",
    es: "Gestión de identidades de Azure, gobernanza, almacenamiento, cómputo y redes virtuales en la nube.",
    fr: "Gestion des identités Azure, de la gouvernance, du stockage, du calcul et des réseaux virtuels dans le cloud.",
    ru: "Управление удостоверениями Azure, governance, хранилищем, вычислениями и виртуальными сетями в облаке.",
    tr: "Bulutta Azure kimliklerini, yönetişimi, depolamayı, işlemi ve sanal ağları yönetme.",
  };
  return {
    ...journey,
    duration: az104Duration[locale] ?? journey.duration,
    longDescription: az104Desc[locale] ?? journey.longDescription,
    phases: journey.phases.map((p) => {
      if (p.key === "lernen") {
        return {
          ...p,
          title: jt.phaseLearnTitle,
          subtitle: jt.phaseLearnSubtitle,
          stats: p.stats.map((s) => ({
            ...s,
            label: { Module: jt.statModulesJ, Videos: jt.statVideosJ, Quiz: jt.statQuizJ, Dauer: jt.statDurationJ }[s.label] ?? s.label,
          })),
          cta: jt.ctaShowModules,
        };
      }
      if (p.key === "labore") {
        return {
          ...p,
          title: jt.phaseLabsTitle,
          subtitle: jt.phaseLabsSubtitle,
          stats: p.stats.map((s) => ({
            ...s,
            label: { Labs: jt.statLabsJ, Aufgaben: jt.statTasksJ, Dauer: jt.statDurationJ }[s.label] ?? s.label,
          })),
          cta: jt.ctaShowLabs,
        };
      }
      return {
        ...p,
        title: jt.phaseExamTitle,
        subtitle: jt.phaseExamSubtitle,
        stats: p.stats.map((s) => ({
          ...s,
          label:
            { Übungstests: jt.statPracticeTestsJ, "Fragen beantwortet": jt.statQuestionsAnsweredJ, Durchschnitt: jt.statAverageJ }[
              s.label
            ] ?? s.label,
        })),
        cta: jt.ctaShowPracticeTests,
      };
    }),
    history: journey.history.map((h, i) => ({ ...h, label: `${jt.weekLabel} ${i + 1}` })),
  };
}
