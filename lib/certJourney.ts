import type { Certification } from "@/lib/companiesData";

export type PhaseStat = {
  label: string;
  value: string;
  icon: "check" | "circle" | "clock";
};

export type Phase = {
  key: "learn" | "labs" | "exam";
  step: number;
  title: string;
  subtitle: string;
  weight: number;
  percent: number;
  illustration: "learn" | "labs" | "exam";
  stats: PhaseStat[];
  ctaLabel: string;
  unlocked: boolean;
  unlockHint: string;
};

export type ActivityItem = {
  icon: "learn" | "labs" | "exam";
  title: string;
  subtitle: string;
  time: string;
};

export type TrendPoint = {
  label: string;
  value: number;
};

export type CertJourney = {
  reviewCount: number;
  duration: string;
  phases: Phase[];
  overallPercent: number;
  themesTotal: number;
  themesDone: number;
  trend: TrendPoint[];
  activities: ActivityItem[];
};

function computeOverall(phases: Phase[]) {
  const raw = phases.reduce((sum, p) => sum + (p.percent * p.weight) / 100, 0);
  return Math.round(raw * 10) / 10;
}

const AZ_104_JOURNEY: CertJourney = {
  reviewCount: 1245,
  duration: "20-25 Stunden",
  themesTotal: 60,
  themesDone: 17,
  trend: [
    { label: "13. Mai", value: 4 },
    { label: "17. Mai", value: 9 },
    { label: "24. Mai", value: 14 },
    { label: "31. Mai", value: 17 },
    { label: "7. Jun", value: 21 },
    { label: "14. Jun", value: 24 },
    { label: "21. Jun", value: 28 },
  ],
  activities: [
    { icon: "learn", title: "Modul abgeschlossen", subtitle: "Einführung in Azure", time: "Heute, 10:30" },
    { icon: "labs", title: "Lab abgeschlossen", subtitle: "Erstellen einer virtuellen Maschine", time: "Gestern, 14:20" },
    { icon: "exam", title: "Übungstest begonnen", subtitle: "Übungstest 1", time: "20. Mai, 00:15" },
    { icon: "learn", title: "Modul abgeschlossen", subtitle: "Verwalten von Identitäten", time: "18. Mai, 16:45" },
  ],
  phases: [
    {
      key: "learn",
      step: 1,
      title: "Lernen",
      subtitle: "Wissen aufbauen",
      weight: 40,
      percent: 40,
      illustration: "learn",
      stats: [
        { label: "Module", value: "8 / 20", icon: "check" },
        { label: "Videos", value: "24 / 60", icon: "circle" },
        { label: "Quiz", value: "12 / 30", icon: "circle" },
        { label: "Dauer", value: "10h 25m", icon: "clock" },
      ],
      ctaLabel: "Module anzeigen",
      unlocked: true,
      unlockHint: "Verfügbar",
    },
    {
      key: "labs",
      step: 2,
      title: "Praxis-Labore",
      subtitle: "Fähigkeiten üben",
      weight: 35,
      percent: 25,
      illustration: "labs",
      stats: [
        { label: "Labs", value: "5 / 20", icon: "check" },
        { label: "Aufgaben", value: "12 / 40", icon: "check" },
        { label: "Dauer", value: "6h 30m", icon: "clock" },
      ],
      ctaLabel: "Labore anzeigen",
      unlocked: false,
      unlockHint: "Wird freigeschaltet, wenn Lernen zu 70% abgeschlossen ist",
    },
    {
      key: "exam",
      step: 3,
      title: "Prüfungs-Simulation",
      subtitle: "Prüfung vorbereiten",
      weight: 25,
      percent: 15,
      illustration: "exam",
      stats: [
        { label: "Übungstests", value: "1 / 6", icon: "circle" },
        { label: "Fragen beantwortet", value: "30 / 200", icon: "circle" },
        { label: "Durchschnitt", value: "68%", icon: "clock" },
      ],
      ctaLabel: "Übungstests anzeigen",
      unlocked: false,
      unlockHint: "Wird freigeschaltet, wenn Labs zu 70% abgeschlossen sind",
    },
  ],
  overallPercent: 28.6,
};

function genericJourney(cert: Certification): CertJourney {
  const p1 = Math.min(100, Math.round(cert.progress * 1.6));
  const p2 = Math.min(100, Math.round(cert.progress * 0.9));
  const p3 = Math.min(100, Math.round(cert.progress * 0.5));

  const phases: Phase[] = [
    {
      key: "learn",
      step: 1,
      title: "Lernen",
      subtitle: "Wissen aufbauen",
      weight: 40,
      percent: p1,
      illustration: "learn",
      stats: [
        { label: "Module", value: `${Math.round((p1 / 100) * 20)} / 20`, icon: "check" },
        { label: "Videos", value: `${Math.round((p1 / 100) * 60)} / 60`, icon: "circle" },
        { label: "Quiz", value: `${Math.round((p1 / 100) * 30)} / 30`, icon: "circle" },
        { label: "Dauer", value: "8h 00m", icon: "clock" },
      ],
      ctaLabel: "Module anzeigen",
      unlocked: true,
      unlockHint: "Verfügbar",
    },
    {
      key: "labs",
      step: 2,
      title: "Praxis-Labore",
      subtitle: "Fähigkeiten üben",
      weight: 35,
      percent: p2,
      illustration: "labs",
      stats: [
        { label: "Labs", value: `${Math.round((p2 / 100) * 15)} / 15`, icon: "check" },
        { label: "Aufgaben", value: `${Math.round((p2 / 100) * 30)} / 30`, icon: "check" },
        { label: "Dauer", value: "5h 00m", icon: "clock" },
      ],
      ctaLabel: "Labore anzeigen",
      unlocked: p1 >= 70,
      unlockHint: "Wird freigeschaltet, wenn Lernen zu 70% abgeschlossen ist",
    },
    {
      key: "exam",
      step: 3,
      title: "Prüfungs-Simulation",
      subtitle: "Prüfung vorbereiten",
      weight: 25,
      percent: p3,
      illustration: "exam",
      stats: [
        { label: "Übungstests", value: `${Math.round((p3 / 100) * 5)} / 5`, icon: "circle" },
        { label: "Fragen beantwortet", value: `${Math.round((p3 / 100) * 150)} / 150`, icon: "circle" },
        { label: "Durchschnitt", value: p3 > 0 ? "60%" : "–", icon: "clock" },
      ],
      ctaLabel: "Übungstests anzeigen",
      unlocked: p2 >= 70,
      unlockHint: "Wird freigeschaltet, wenn Labs zu 70% abgeschlossen sind",
    },
  ];

  return {
    reviewCount: 340,
    duration: "15-20 Stunden",
    themesTotal: 40,
    themesDone: Math.round((cert.progress / 100) * 40),
    trend: [
      { label: "Start", value: 0 },
      { label: "Woche 2", value: Math.round(cert.progress * 0.3) },
      { label: "Woche 4", value: Math.round(cert.progress * 0.6) },
      { label: "Heute", value: cert.progress },
    ],
    activities: [
      { icon: "learn", title: "Modul abgeschlossen", subtitle: "Erste Schritte", time: "Kürzlich" },
    ],
    phases,
    overallPercent: computeOverall(phases),
  };
}

export function getCertJourney(cert: Certification): CertJourney {
  if (cert.id === "az-104") return AZ_104_JOURNEY;
  return genericJourney(cert);
}
