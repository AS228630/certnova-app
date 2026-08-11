import {
  Ticket,
  GraduationCap,
  Building2,
  Folder,
  CreditCard,
  Repeat,
  Wallet,
  ArrowLeftRight,
  Mail,
  BarChart3,
  Bell,
  Settings,
  ScrollText,
  Activity,
  HardDrive,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';

export type AdminNavItem = {
  /** URL segment under /admin-senmas/<slug>. */
  slug: string;
  label: string;
  icon: LucideIcon;
  description: string;
};

export type AdminNavSection = {
  label: string;
  items: AdminNavItem[];
};

export const ADMIN_NAV_SECTIONS: AdminNavSection[] = [
  {
    label: 'MANAGEMENT',
    items: [
      { slug: 'dozenten-codes', label: 'Dozenten-Codes', icon: Ticket, description: 'Referral-Codes der Dozenten anlegen, Provisionen einsehen und monatliche Berichte verwalten.' },
      { slug: 'studenten', label: 'Studenten', icon: GraduationCap, description: 'Alle registrierten Studenten, ihre Abonnements und ihren Zugriffsstatus verwalten.' },
      { slug: 'b2b-gruppen', label: 'B2B & Gruppen', icon: Building2, description: 'Gruppen-Lizenzen für Unternehmen und Bildungseinrichtungen verwalten.' },
      { slug: 'karriere-dokumente', label: 'Karriere-Dokumente', icon: Folder, description: 'Private Links und Dokumente für Bewerbungen verwalten.' },
    ],
  },
  {
    label: 'FINANZEN',
    items: [
      { slug: 'zahlungen', label: 'Zahlungen', icon: CreditCard, description: 'Alle eingegangenen Zahlungen einsehen.' },
      { slug: 'abonnements', label: 'Abonnements', icon: Repeat, description: 'Laufende Abonnements und ihre Laufzeiten verwalten.' },
      { slug: 'auszahlungen', label: 'Auszahlungen', icon: Wallet, description: 'Auszahlungsanfragen der Dozenten prüfen und bearbeiten.' },
      { slug: 'transaktionen', label: 'Transaktionen', icon: ArrowLeftRight, description: 'Vollständiges Transaktionsprotokoll einsehen.' },
    ],
  },
  {
    label: 'KOMMUNIKATION',
    items: [
      { slug: 'emails-vorlagen', label: 'E-Mails & Vorlagen', icon: Mail, description: 'E-Mail-Vorlagen verwalten und Nachrichten versenden.' },
      { slug: 'berichte-exporte', label: 'Berichte & Exporte', icon: BarChart3, description: 'Berichte erstellen und Daten exportieren.' },
      { slug: 'benachrichtigungen', label: 'Benachrichtigungen', icon: Bell, description: 'Systembenachrichtigungen konfigurieren.' },
    ],
  },
  {
    label: 'SYSTEM',
    items: [
      { slug: 'team', label: 'Team & Rollen', icon: ShieldCheck, description: 'Admin-Zugriffe und Rollen (RBAC) verwalten.' },
      { slug: 'einstellungen', label: 'Einstellungen', icon: Settings, description: 'Allgemeine Systemeinstellungen verwalten.' },
      { slug: 'audit-logs', label: 'Audit Logs', icon: ScrollText, description: 'Protokoll aller administrativen Aktionen einsehen.' },
      { slug: 'system-status', label: 'System-Status', icon: Activity, description: 'Detaillierten Status aller Systemdienste einsehen.' },
      { slug: 'backup-restore', label: 'Backup & Restore', icon: HardDrive, description: 'Backups erstellen und wiederherstellen.' },
    ],
  },
];

/** Flat lookup, e.g. for the [slug] page and the topbar title. */
export const ADMIN_NAV_BY_SLUG: Record<string, AdminNavItem> = Object.fromEntries(
  ADMIN_NAV_SECTIONS.flatMap((s) => s.items).map((item) => [item.slug, item])
);
