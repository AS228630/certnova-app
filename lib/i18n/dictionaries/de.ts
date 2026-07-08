// Base dictionary (German — the site's original language). Every other
// dictionary should have the exact same key structure; missing keys
// automatically fall back to this one at runtime.
const de = {
  nav: {
    dashboard: "Dashboard",
    learningPaths: "Lernpfade",
    certifications: "Zertifizierungen",
    languageCourses: "Sprachkurse",
    projects: "Projekte",
    community: "Community",
    news: "Aktuelles",
    analytics: "Analysen",
    interview: "Interview-Vorbereitung",
    aiCoach: "KI Coach",
    settings: "Einstellungen",
    help: "Hilfe & Support",
    logout: "Abmelden",
    profile: "Profil",
    new: "Neu",
    beta: "BETA",
  },
  sidebar: {
    proUpgrade: "Pro Upgrade",
    proUpgradeDesc: "Schalte alle Funktionen frei, unbegrenzte Labs und KI-gestützte Werkzeuge.",
    upgradeNow: "Upgrade starten",
    streak: "Deine Lernserie 🔥",
    daysInARow: "Tage in Folge",
    darkMode: "Dark Mode",
  },
  header: {
    searchPlaceholder: "Nach Kursen, Labs, Fragen suchen...",
    freePlan: "Kostenloser Plan",
  },
  landingNav: {
    courses: "Kurse",
    certifications: "Zertifizierungen",
    learningPaths: "Lernpfade",
    resources: "Ressourcen",
    pricing: "Preise",
    login: "Anmelden",
    getStarted: "Jetzt starten",
  },
  bottomNav: {
    dashboard: "Dashboard",
    learn: "Lernen",
    aiCoach: "KI Coach",
    certificates: "Zertifikate",
    profile: "Profil",
  },
  footer: {
    platform: "Plattform",
    resources: "Ressourcen",
    legal: "Rechtliches",
    tagline: "Deine All-in-One-Plattform für IT-Skills, Sprachen und Karriereentwicklung.",
    copyright: "© 2026 CertCoach · Made with ❤️ in Germany",
  },
  common: {
    save: "Speichern",
    cancel: "Abbrechen",
    close: "Schließen",
    loading: "Lädt...",
    continue: "Weiter",
    back: "Zurück",
  },
};

export default de;
export type Dictionary = typeof de;
