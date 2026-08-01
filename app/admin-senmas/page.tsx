'use client';

/**
 * Admin Dashboard — main content.
 *
 * STATUS: Visual implementation matching the approved mockup, built with
 * mock data so it can be reviewed end-to-end. The sidebar/topbar/auth
 * guard live in app/admin/layout.tsx (components/admin/AdminShell.tsx) —
 * this file is only the page content. Every sidebar link and every
 * "Öffnen"/"Alle X anzeigen" button below now routes to a real page
 * (app/admin/[slug]/page.tsx), which currently shows an honest
 * "In Entwicklung" placeholder — see docs/admin-dashboard-plan.md for
 * the build-out plan.
 *
 * Still NOT done, in this order:
 *   1. Set NEXT_PUBLIC_ADMIN_EMAILS in Vercel (guard allows nobody until
 *      configured — see components/admin/AdminGuard.tsx).
 *   2. Wire each section below to real Supabase queries.
 *   3. Add server-side authorization once real data is connected.
 */

import Link from 'next/link';
import {
  Ticket,
  GraduationCap,
  Folder,
  Mail,
  Wallet,
  Settings,
  HardDrive,
  Plus,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  RefreshCw,
  type LucideIcon,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Mock data — replace with real Supabase queries before shipping.
// ---------------------------------------------------------------------------

type StatCard = {
  label: string;
  value: string;
  delta: string;
  positive: boolean;
  icon: LucideIcon;
  iconBg: string;
  spark: number[];
};

const STAT_CARDS: StatCard[] = [
  { label: 'Gesamtumsatz (Monat)', value: '€24.680,00', delta: '18,4%', positive: true, icon: Wallet, iconBg: '#7C3AED', spark: [4, 6, 5, 8, 7, 10, 12] },
  { label: 'Verkäufe (Monat)', value: '248', delta: '14,7%', positive: true, icon: Wallet, iconBg: '#3B82F6', spark: [3, 4, 4, 6, 5, 7, 8] },
  { label: 'Aktive Studenten', value: '1.847', delta: '11,2%', positive: true, icon: GraduationCap, iconBg: '#22C55E', spark: [5, 5, 6, 6, 7, 8, 9] },
  { label: 'Dozenten-Codes', value: '78', delta: '5,6%', positive: true, icon: Ticket, iconBg: '#F59E0B', spark: [6, 6, 7, 6, 7, 7, 8] },
  { label: 'Offene Auszahlungen', value: '€3.930,00', delta: '3,1%', positive: false, icon: TrendingDown, iconBg: '#EF4444', spark: [9, 8, 8, 7, 7, 6, 6] },
];

const REVENUE_SERIES: { day: string; umsatz: number; provisionen: number }[] = [
  { day: '15.07', umsatz: 7000, provisionen: 4200 },
  { day: '16.07', umsatz: 14500, provisionen: 10200 },
  { day: '17.07', umsatz: 18200, provisionen: 13800 },
  { day: '18.07', umsatz: 19600, provisionen: 15400 },
  { day: '19.07', umsatz: 21200, provisionen: 16600 },
  { day: '20.07', umsatz: 22800, provisionen: 18500 },
  { day: '21.07', umsatz: 24680, provisionen: 19600 },
];

const RECENT_ACTIVITY = [
  { text: 'Neuer Student registriert', sub: 'max.mustermann@example.com', time: 'vor 5 Min.', color: '#3B82F6' },
  { text: 'Zahlung erhalten', sub: '€69,99 von Anna Müller', time: 'vor 12 Min.', color: '#22C55E' },
  { text: 'Dozenten-Code erstellt', sub: 'Code "MICHAEL10" wurde erstellt', time: 'vor 28 Min.', color: '#7C3AED' },
  { text: 'Gruppen-Lizenz erstellt', sub: '50 Lizenzen für "WBS Training"', time: 'vor 1 Std.', color: '#F59E0B' },
  { text: 'Auszahlung beantragt', sub: '€1.470,00 von Michael', time: 'vor 2 Std.', color: '#EF4444' },
];

const SYSTEM_STATUS = [
  { name: 'Web Server' },
  { name: 'Datenbank' },
  { name: 'Stripe' },
  { name: 'E-Mail Service' },
  { name: 'Cloud Storage' },
];

const DOZENTEN_CODES = [
  { code: 'ARND10', name: 'Arnd', tag: '#7C3AED', giftDays: 10, commission: 50, revenue: '€4.560,00', active: true },
  { code: 'MICHAEL10', name: 'Michael', tag: '#3B82F6', giftDays: 10, commission: 50, revenue: '€2.940,00', active: true },
  { code: 'SARAH10', name: 'Sarah', tag: '#F59E0B', giftDays: 10, commission: 50, revenue: '€2.280,00', active: true },
  { code: 'DAVID10', name: 'David', tag: '#22C55E', giftDays: 10, commission: 50, revenue: '€1.920,00', active: true },
  { code: 'JULIA10', name: 'Julia', tag: '#EF4444', giftDays: 10, commission: 50, revenue: '€660,00', active: false },
];

const STUDENTEN = [
  { name: 'Max Mustermann', email: 'max.mustermann@example.com', plan: 'Premium', status: true },
  { name: 'Anna Müller', email: 'anna.mueller@example.com', plan: 'Premium', status: true },
  { name: 'Thomas Schmidt', email: 'thomas.schmidt@example.com', plan: 'Basic', status: true },
  { name: 'Jessica Weber', email: 'jessica.weber@example.com', plan: 'Premium', status: true },
  { name: 'Lukas Hoffmann', email: 'lukas.hoffmann@example.com', plan: 'Basic', status: false },
];

const B2B_GROUPS = [
  { name: 'WBS Training', type: 'Unternehmen', licenses: 50, used: 32, active: true },
  { name: 'IT Academy Berlin', type: 'Bildungseinrichtung', licenses: 100, used: 75, active: true },
  { name: 'Tech Solutions GmbH', type: 'Unternehmen', licenses: 25, used: 10, active: true },
  { name: 'DevSchool', type: 'Bildungseinrichtung', licenses: 30, used: 18, active: false },
];

const QUICK_ACTIONS: { icon: LucideIcon; title: string; sub: string; color: string; href: string }[] = [
  { icon: Folder, title: 'Karriere-Dokumente', sub: 'Private Links & Dokumente verwalten', color: '#F59E0B', href: '/admin-senmas/karriere-dokumente' },
  { icon: Mail, title: 'E-Mails & Berichte', sub: 'E-Mails senden & Berichte exportieren', color: '#3B82F6', href: '/admin-senmas/berichte-exporte' },
  { icon: Wallet, title: 'Auszahlungen', sub: 'Auszahlungsanfragen verwalten', color: '#22C55E', href: '/admin-senmas/auszahlungen' },
  { icon: Settings, title: 'System-Einstellungen', sub: 'Allgemeine Einstellungen', color: '#8991AE', href: '/admin-senmas/einstellungen' },
  { icon: HardDrive, title: 'Backup & Sicherheit', sub: 'Backup erstellen & sichern', color: '#7C3AED', href: '/admin-senmas/backup-restore' },
];

// ---------------------------------------------------------------------------
// Small presentational helpers
// ---------------------------------------------------------------------------

function Sparkline({ values, color }: { values: number[]; color: string }) {
  const w = 90;
  const h = 28;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const step = w / (values.length - 1);
  const points = values
    .map((v, i) => `${i * step},${h - ((v - min) / range) * h}`)
    .join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <polyline points={points} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RevenueChart() {
  const w = 720;
  const h = 220;
  const padY = 16;
  const max = Math.max(...REVENUE_SERIES.map((d) => d.umsatz));
  const step = w / (REVENUE_SERIES.length - 1);

  const pathFor = (key: 'umsatz' | 'provisionen') =>
    REVENUE_SERIES.map((d, i) => {
      const x = i * step;
      const y = h - padY - (d[key] / max) * (h - padY * 2);
      return `${i === 0 ? 'M' : 'L'}${x},${y}`;
    }).join(' ');

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-56">
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1={0} x2={w} y1={(h / 4) * i} y2={(h / 4) * i} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
      ))}
      <path d={pathFor('umsatz')} fill="none" stroke="#7C3AED" strokeWidth={2.5} />
      <path d={pathFor('provisionen')} fill="none" stroke="#22C55E" strokeWidth={2.5} />
      {REVENUE_SERIES.map((d, i) => {
        const x = i * step;
        const yU = h - padY - (d.umsatz / max) * (h - padY * 2);
        const yP = h - padY - (d.provisionen / max) * (h - padY * 2);
        return (
          <g key={d.day}>
            <circle cx={x} cy={yU} r={3.5} fill="#7C3AED" />
            <circle cx={x} cy={yP} r={3.5} fill="#22C55E" />
          </g>
        );
      })}
    </svg>
  );
}

function StatCardView({ card }: { card: StatCard }) {
  const Icon = card.icon;
  const Trend = card.positive ? TrendingUp : TrendingDown;
  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-3 min-w-[190px]"
      style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}
    >
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${card.iconBg}26` }}>
          <Icon size={18} color={card.iconBg} />
        </div>
        <Sparkline values={card.spark} color={card.iconBg} />
      </div>
      <div>
        <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{card.label}</div>
        <div className="text-2xl font-bold mt-1" style={{ color: 'var(--color-text)' }}>{card.value}</div>
      </div>
      <div className="flex items-center gap-1 text-xs" style={{ color: card.positive ? 'var(--color-success)' : 'var(--color-danger)' }}>
        <Trend size={13} />
        <span>{card.delta}</span>
        <span style={{ color: 'var(--color-text-faint)' }}>vs. letzter Monat</span>
      </div>
    </div>
  );
}

function SectionCard({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-5" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}

function StatusPill({ active }: { active: boolean }) {
  return (
    <span
      className="text-[11px] px-2 py-0.5 rounded-full font-medium"
      style={{
        background: active ? 'var(--color-success-light)' : 'var(--color-danger-light)',
        color: active ? 'var(--color-success)' : 'var(--color-danger)',
      }}
    >
      {active ? 'Aktiv' : 'Inaktiv'}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Page content
// ---------------------------------------------------------------------------

export default function AdminDashboardPage() {
  return (
    <>
      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {STAT_CARDS.map((c) => (
          <StatCardView key={c.label} card={c} />
        ))}
      </div>

      {/* Revenue + Activity + Status */}
      <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_1fr_1fr] gap-4">
        <SectionCard
          title="Umsatz-Übersicht"
          action={
            <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--color-text-muted)' }}>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: '#7C3AED' }} />Umsatz (€)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: '#22C55E' }} />Provisionen (€)</span>
            </div>
          }
        >
          <RevenueChart />
          <div className="flex justify-between text-[11px] mt-1" style={{ color: 'var(--color-text-faint)' }}>
            {REVENUE_SERIES.map((d) => <span key={d.day}>{d.day}</span>)}
          </div>
        </SectionCard>

        <SectionCard
          title="Letzte Aktivitäten"
          action={<Link href="/admin-senmas/audit-logs" className="text-xs" style={{ color: 'var(--color-primary)' }}>Alle Aktivitäten</Link>}
        >
          <ul className="space-y-4">
            {RECENT_ACTIVITY.map((a) => (
              <li key={a.text + a.time} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: a.color }} />
                <div className="min-w-0">
                  <div className="text-sm truncate">{a.text}</div>
                  <div className="text-xs truncate" style={{ color: 'var(--color-text-faint)' }}>{a.sub}</div>
                </div>
                <span className="ml-auto text-[11px] shrink-0" style={{ color: 'var(--color-text-faint)' }}>{a.time}</span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard
          title="System-Status"
          action={<Link href="/admin-senmas/system-status" className="text-xs" style={{ color: 'var(--color-success)' }}>Alle Systeme OK</Link>}
        >
          <ul className="space-y-3">
            {SYSTEM_STATUS.map((s) => (
              <li key={s.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={14} color="var(--color-success)" />
                  {s.name}
                </span>
                <span className="text-xs" style={{ color: 'var(--color-text-faint)' }}>Online</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-3 flex items-center justify-between text-[11px]" style={{ borderTop: '1px solid var(--color-divider)', color: 'var(--color-text-faint)' }}>
            Letzte Prüfung: vor 2 Minuten
            <RefreshCw size={12} />
          </div>
        </SectionCard>
      </div>

      {/* Three overview tables */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <SectionCard
          title="Dozenten-Codes (Übersicht)"
          action={
            <Link href="/admin-senmas/dozenten-codes" className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg text-white" style={{ background: 'var(--color-primary)' }}>
              <Plus size={13} /> Neuer Code
            </Link>
          }
        >
          <div className="space-y-3">
            {DOZENTEN_CODES.map((d) => (
              <div key={d.code} className="flex items-center justify-between text-xs">
                <span className="px-2 py-1 rounded-md font-mono text-white text-[11px]" style={{ background: d.tag }}>{d.code}</span>
                <span style={{ color: 'var(--color-text-muted)' }}>{d.name}</span>
                <span style={{ color: 'var(--color-text-faint)' }}>+{d.giftDays} Tage</span>
                <span style={{ color: 'var(--color-text-faint)' }}>{d.commission}%</span>
                <span className="font-semibold">{d.revenue}</span>
                <StatusPill active={d.active} />
              </div>
            ))}
          </div>
          <Link href="/admin-senmas/dozenten-codes" className="block text-center mt-4 text-xs" style={{ color: 'var(--color-primary)' }}>
            Alle Dozenten-Codes anzeigen
          </Link>
        </SectionCard>

        <SectionCard
          title="Studenten (Übersicht)"
          action={<Link href="/admin-senmas/studenten" className="text-xs" style={{ color: 'var(--color-primary)' }}>Alle Studenten</Link>}
        >
          <div className="space-y-3">
            {STUDENTEN.map((s) => (
              <div key={s.email} className="flex items-center gap-3 text-xs">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0" style={{ background: 'var(--color-primary)' }}>
                  {s.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate" style={{ color: 'var(--color-text)' }}>{s.name}</div>
                  <div className="truncate" style={{ color: 'var(--color-text-faint)' }}>{s.email}</div>
                </div>
                <span style={{ color: 'var(--color-text-faint)' }}>{s.plan}</span>
                <StatusPill active={s.status} />
              </div>
            ))}
          </div>
          <Link href="/admin-senmas/studenten" className="block text-center mt-4 text-xs" style={{ color: 'var(--color-primary)' }}>
            Alle Studenten anzeigen
          </Link>
        </SectionCard>

        <SectionCard
          title="B2B & Gruppen (Übersicht)"
          action={
            <Link href="/admin-senmas/b2b-gruppen" className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg text-white" style={{ background: 'var(--color-primary)' }}>
              <Plus size={13} /> Neue Gruppe
            </Link>
          }
        >
          <div className="space-y-3">
            {B2B_GROUPS.map((g) => (
              <div key={g.name} className="flex items-center justify-between text-xs">
                <div>
                  <div style={{ color: 'var(--color-text)' }}>{g.name}</div>
                  <div style={{ color: 'var(--color-text-faint)' }}>{g.type}</div>
                </div>
                <span style={{ color: 'var(--color-text-faint)' }}>{g.used}/{g.licenses}</span>
                <StatusPill active={g.active} />
              </div>
            ))}
          </div>
          <Link href="/admin-senmas/b2b-gruppen" className="block text-center mt-4 text-xs" style={{ color: 'var(--color-primary)' }}>
            Alle Gruppen anzeigen
          </Link>
        </SectionCard>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {QUICK_ACTIONS.map((q) => (
          <div key={q.title} className="rounded-2xl p-5 flex flex-col gap-3" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${q.color}26` }}>
              <q.icon size={18} color={q.color} />
            </div>
            <div>
              <div className="text-sm font-semibold">{q.title}</div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--color-text-faint)' }}>{q.sub}</div>
            </div>
            <Link
              href={q.href}
              className="mt-auto text-xs py-2 rounded-lg font-medium text-center"
              style={{ background: 'var(--color-panel-alt)', color: 'var(--color-text-muted)' }}
            >
              Öffnen
            </Link>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-[11px] pt-2" style={{ color: 'var(--color-text-faint)' }}>
        <span>© 2026 CertCoach. Alle Rechte vorbehalten.</span>
        <span>Version 2.0.0 (UI-Vorschau — noch nicht mit echten Daten verbunden)</span>
      </div>
    </>
  );
}
