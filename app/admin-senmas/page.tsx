'use client';

/**
 * Admin Dashboard — main content.
 *
 * STATUS: Wired to real data via /api/admin/dashboard-summary (see that
 * route for exactly which tables each number comes from, and the one
 * documented limitation: `subscriptions` is not a transaction ledger,
 * so revenue figures are best-effort, not exact accounting). No number
 * on this page is hardcoded anymore.
 *
 * Still open (see docs/admin-dashboard-plan.md and the Aug 11 2026
 * senior-advisor chat for the full list):
 *   - No `payouts` table yet -> "Offene Auszahlungen" is honestly shown
 *     as "nicht verfuegbar", not a fake number.
 *   - No `audit_logs` table yet -> "Letzte Aktivitaeten" is assembled
 *     from real row timestamps (coupons/groups/subscriptions created
 *     or updated), not a dedicated audit trail.
 *   - Stripe/E-Mail/Cloud-Storage health checks are not implemented ->
 *     shown as "Unbekannt", not defaulted to fake "Online".
 */

import Link from 'next/link';
import { useEffect, useState } from 'react';
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
  HelpCircle,
  XCircle,
  RefreshCw,
  Loader2,
  type LucideIcon,
} from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

// ---------------------------------------------------------------------------
// Types matching app/api/admin/dashboard-summary/route.ts
// ---------------------------------------------------------------------------

type SystemComponentStatus = { status: 'online' | 'down' | 'unknown'; latencyMs?: number; note?: string };

type DashboardSummary = {
  kpi: {
    revenue: { currentCents: number; previousCents: number; changePercent: number | null };
    sales: { current: number; previous: number; changePercent: number | null };
    activeStudents: { current: number; changePercent: number | null };
    teacherCodes: { active: number; total: number; changePercent: number | null };
    payouts: { available: boolean; note?: string };
  };
  revenueChart: { date: string; revenueCents: number; commissionCents: number }[];
  recentActivity: { type: string; text: string; sub: string; time: string }[];
  teacherCoupons: {
    id: string;
    code: string;
    teacher_name: string;
    extra_days: number;
    commission_rate: number;
    is_active: boolean;
    stats: { count: number; revenueCents: number; commissionCents: number };
  }[];
  students: { id: string; name: string; email: string; plan: string; active: boolean }[];
  b2bGroups: { id: string; name: string; type: string; total_licenses: number; usedLicenses: number; is_active: boolean }[];
  systemStatus: {
    webServer: SystemComponentStatus;
    database: SystemComponentStatus;
    stripe: SystemComponentStatus;
    email: SystemComponentStatus;
    storage: SystemComponentStatus;
  };
  totals: { studentsTotal: number };
};

function fmtEuro(cents: number): string {
  return '€' + (cents / 100).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtPercent(p: number | null): string {
  return p === null ? '—' : `${p >= 0 ? '+' : ''}${p.toFixed(1)}%`;
}

function fmtRelativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const min = Math.round(diffMs / 60000);
  if (min < 1) return 'gerade eben';
  if (min < 60) return `vor ${min} Min.`;
  const h = Math.round(min / 60);
  if (h < 24) return `vor ${h} Std.`;
  return `vor ${Math.round(h / 24)} Tg.`;
}

async function authHeader(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

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

function RevenueChart({ data }: { data: DashboardSummary['revenueChart'] }) {
  const w = 720;
  const h = 220;
  const padY = 16;
  const max = Math.max(...data.map((d) => d.revenueCents), 1);
  const step = data.length > 1 ? w / (data.length - 1) : w;

  const pathFor = (key: 'revenueCents' | 'commissionCents') =>
    data
      .map((d, i) => {
        const x = i * step;
        const y = h - padY - (d[key] / max) * (h - padY * 2);
        return `${i === 0 ? 'M' : 'L'}${x},${y}`;
      })
      .join(' ');

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-56">
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1={0} x2={w} y1={(h / 4) * i} y2={(h / 4) * i} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
      ))}
      <path d={pathFor('revenueCents')} fill="none" stroke="#7C3AED" strokeWidth={2.5} />
      <path d={pathFor('commissionCents')} fill="none" stroke="#22C55E" strokeWidth={2.5} />
      {data.map((d, i) => {
        const x = i * step;
        const yR = h - padY - (d.revenueCents / max) * (h - padY * 2);
        const yC = h - padY - (d.commissionCents / max) * (h - padY * 2);
        return (
          <g key={d.date}>
            <circle cx={x} cy={yR} r={3.5} fill="#7C3AED" />
            <circle cx={x} cy={yC} r={3.5} fill="#22C55E" />
          </g>
        );
      })}
    </svg>
  );
}

function StatCardView({
  label,
  value,
  changePercent,
  icon: Icon,
  iconBg,
}: {
  label: string;
  value: string;
  changePercent: number | null;
  icon: LucideIcon;
  iconBg: string;
}) {
  const positive = (changePercent ?? 0) >= 0;
  const Trend = positive ? TrendingUp : TrendingDown;
  return (
    <div className="rounded-2xl p-5 flex flex-col gap-3 min-w-[190px]" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${iconBg}26` }}>
        <Icon size={18} color={iconBg} />
      </div>
      <div>
        <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{label}</div>
        <div className="text-2xl font-bold mt-1" style={{ color: 'var(--color-text)' }}>{value}</div>
      </div>
      <div className="flex items-center gap-1 text-xs" style={{ color: changePercent === null ? 'var(--color-text-faint)' : positive ? 'var(--color-success)' : 'var(--color-danger)' }}>
        {changePercent !== null && <Trend size={13} />}
        <span>{fmtPercent(changePercent)}</span>
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
      style={{ background: active ? 'var(--color-success-light)' : 'var(--color-danger-light)', color: active ? 'var(--color-success)' : 'var(--color-danger)' }}
    >
      {active ? 'Aktiv' : 'Inaktiv'}
    </span>
  );
}

function SystemRow({ label, s }: { label: string; s: SystemComponentStatus }) {
  const icon =
    s.status === 'online' ? <CheckCircle2 size={14} color="var(--color-success)" /> :
    s.status === 'down' ? <XCircle size={14} color="var(--color-danger)" /> :
    <HelpCircle size={14} color="var(--color-text-faint)" />;
  const text = s.status === 'online' ? 'Online' : s.status === 'down' ? 'Offline' : 'Unbekannt';
  const color = s.status === 'online' ? 'var(--color-success)' : s.status === 'down' ? 'var(--color-danger)' : 'var(--color-text-faint)';
  return (
    <li className="flex items-center justify-between text-sm">
      <span className="flex items-center gap-2">{icon}{label}</span>
      <span className="text-xs" style={{ color }}>{text}{s.latencyMs !== undefined ? ` · ${s.latencyMs}ms` : ''}</span>
    </li>
  );
}

// ---------------------------------------------------------------------------
// Page content
// ---------------------------------------------------------------------------

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastLoaded, setLastLoaded] = useState<Date | null>(null);
  const [secondsSinceLoad, setSecondsSinceLoad] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  async function fetchSummary(): Promise<DashboardSummary> {
    const res = await fetch('/api/admin/dashboard-summary', { headers: await authHeader() });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      const message =
        j.error === 'admin_not_configured' ? 'ADMIN_EMAILS ist in Vercel noch nicht konfiguriert.' :
        j.error === 'not_admin' ? 'Kein Admin-Zugriff fuer dieses Konto.' :
        'Dashboard konnte nicht geladen werden.';
      throw new Error(message);
    }
    return (await res.json()) as DashboardSummary;
  }

  function applyResult(json: DashboardSummary) {
    setData(json);
    setLastLoaded(new Date());
    setSecondsSinceLoad(0);
  }

  function reload() {
    setError(null);
    fetchSummary()
      .then(applyResult)
      .catch((e: Error) => setError(e.message))
      .finally(() => setRefreshing(false));
  }

  useEffect(() => {
    fetchSummary()
      .then(applyResult)
      .catch((e: Error) => setError(e.message))
      .finally(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    if (!lastLoaded) return;
    const id = setInterval(() => {
      setSecondsSinceLoad(Math.max(0, Math.round((Date.now() - lastLoaded.getTime()) / 1000)));
    }, 1000);
    return () => clearInterval(id);
  }, [lastLoaded]);

  function handleRefresh() {
    setRefreshing(true);
    reload();
  }

  if (error) {
    return (
      <div className="rounded-2xl p-8 text-center" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
        <p className="text-sm mb-3" style={{ color: 'var(--color-danger)' }}>{error}</p>
        <button onClick={reload} className="text-sm font-medium px-4 py-2 rounded-lg text-white" style={{ background: 'var(--color-primary)' }}>
          Erneut versuchen
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="animate-spin" size={22} color="var(--color-text-faint)" />
      </div>
    );
  }

  const { kpi, revenueChart, recentActivity, teacherCoupons, students, b2bGroups, systemStatus } = data;

  return (
    <>
      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        <StatCardView label="Gesamtumsatz (Monat)" value={fmtEuro(kpi.revenue.currentCents)} changePercent={kpi.revenue.changePercent} icon={Wallet} iconBg="#7C3AED" />
        <StatCardView label="Verkaeufe (Monat)" value={String(kpi.sales.current)} changePercent={kpi.sales.changePercent} icon={Wallet} iconBg="#3B82F6" />
        <StatCardView label="Aktive Studenten" value={kpi.activeStudents.current.toLocaleString('de-DE')} changePercent={kpi.activeStudents.changePercent} icon={GraduationCap} iconBg="#22C55E" />
        <StatCardView label="Dozenten-Codes" value={String(kpi.teacherCodes.active)} changePercent={kpi.teacherCodes.changePercent} icon={Ticket} iconBg="#F59E0B" />
        <div className="rounded-2xl p-5 flex flex-col gap-3 min-w-[190px]" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#EF444426' }}>
            <TrendingDown size={18} color="#EF4444" />
          </div>
          <div>
            <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Offene Auszahlungen</div>
            <div className="text-lg font-semibold mt-1" style={{ color: 'var(--color-text-faint)' }}>Nicht verfuegbar</div>
          </div>
          <div className="text-[11px]" style={{ color: 'var(--color-text-faint)' }}>Noch keine payouts-Tabelle</div>
        </div>
      </div>

      {/* Revenue + Activity + Status */}
      <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_1fr_1fr] gap-4">
        <SectionCard
          title="Umsatz-Uebersicht"
          action={
            <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--color-text-muted)' }}>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: '#7C3AED' }} />Umsatz (€)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: '#22C55E' }} />Provisionen (€)</span>
            </div>
          }
        >
          <RevenueChart data={revenueChart} />
          <div className="flex justify-between text-[11px] mt-1" style={{ color: 'var(--color-text-faint)' }}>
            {revenueChart.map((d) => <span key={d.date}>{d.date.slice(5)}</span>)}
          </div>
        </SectionCard>

        <SectionCard title="Letzte Aktivitaeten" action={<Link href="/admin-senmas/audit-logs" className="text-xs" style={{ color: 'var(--color-primary)' }}>Alle Aktivitaeten</Link>}>
          {recentActivity.length === 0 ? (
            <p className="text-xs" style={{ color: 'var(--color-text-faint)' }}>Noch keine Aktivitaeten.</p>
          ) : (
            <ul className="space-y-4">
              {recentActivity.map((a, i) => (
                <li key={a.text + a.time + i} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: 'var(--color-primary)' }} />
                  <div className="min-w-0">
                    <div className="text-sm truncate">{a.text}</div>
                    <div className="text-xs truncate" style={{ color: 'var(--color-text-faint)' }}>{a.sub}</div>
                  </div>
                  <span className="ml-auto text-[11px] shrink-0" style={{ color: 'var(--color-text-faint)' }}>{fmtRelativeTime(a.time)}</span>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>

        <SectionCard title="System-Status">
          <ul className="space-y-3">
            <SystemRow label="Web Server" s={systemStatus.webServer} />
            <SystemRow label="Datenbank" s={systemStatus.database} />
            <SystemRow label="Stripe" s={systemStatus.stripe} />
            <SystemRow label="E-Mail Service" s={systemStatus.email} />
            <SystemRow label="Cloud Storage" s={systemStatus.storage} />
          </ul>
          <div className="mt-4 pt-3 flex items-center justify-between text-[11px]" style={{ borderTop: '1px solid var(--color-divider)', color: 'var(--color-text-faint)' }}>
            {lastLoaded ? `Letzte Pruefung: vor ${secondsSinceLoad}s` : ''}
            <button onClick={handleRefresh} aria-label="Aktualisieren">
              <RefreshCw size={12} className={refreshing ? 'animate-spin' : ''} />
            </button>
          </div>
        </SectionCard>
      </div>

      {/* Three overview tables */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <SectionCard
          title="Dozenten-Codes (Uebersicht)"
          action={
            <Link href="/admin-senmas/dozenten-codes" className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg text-white" style={{ background: 'var(--color-primary)' }}>
              <Plus size={13} /> Neuer Code
            </Link>
          }
        >
          {teacherCoupons.length === 0 ? (
            <p className="text-xs" style={{ color: 'var(--color-text-faint)' }}>Noch keine Dozenten-Codes.</p>
          ) : (
            <div className="space-y-3">
              {teacherCoupons.map((d) => (
                <div key={d.id} className="flex items-center justify-between text-xs">
                  <span className="px-2 py-1 rounded-md font-mono text-white text-[11px]" style={{ background: 'var(--color-primary)' }}>{d.code}</span>
                  <span style={{ color: 'var(--color-text-muted)' }}>{d.teacher_name}</span>
                  <span style={{ color: 'var(--color-text-faint)' }}>+{d.extra_days} Tage</span>
                  <span style={{ color: 'var(--color-text-faint)' }}>{Math.round(d.commission_rate * 100)}%</span>
                  <span className="font-semibold">{fmtEuro(d.stats.revenueCents)}</span>
                  <StatusPill active={d.is_active} />
                </div>
              ))}
            </div>
          )}
          <Link href="/admin-senmas/dozenten-codes" className="block text-center mt-4 text-xs" style={{ color: 'var(--color-primary)' }}>
            Alle Dozenten-Codes anzeigen
          </Link>
        </SectionCard>

        <SectionCard title="Studenten (Uebersicht)" action={<Link href="/admin-senmas/studenten" className="text-xs" style={{ color: 'var(--color-primary)' }}>Alle Studenten</Link>}>
          {students.length === 0 ? (
            <p className="text-xs" style={{ color: 'var(--color-text-faint)' }}>Noch keine Studenten.</p>
          ) : (
            <div className="space-y-3">
              {students.map((s) => (
                <div key={s.id} className="flex items-center gap-3 text-xs">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0" style={{ background: 'var(--color-primary)' }}>
                    {s.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate" style={{ color: 'var(--color-text)' }}>{s.name}</div>
                    <div className="truncate" style={{ color: 'var(--color-text-faint)' }}>{s.email}</div>
                  </div>
                  <span style={{ color: 'var(--color-text-faint)' }}>{s.plan}</span>
                  <StatusPill active={s.active} />
                </div>
              ))}
            </div>
          )}
          <Link href="/admin-senmas/studenten" className="block text-center mt-4 text-xs" style={{ color: 'var(--color-primary)' }}>
            Alle Studenten anzeigen
          </Link>
        </SectionCard>

        <SectionCard
          title="B2B & Gruppen (Uebersicht)"
          action={
            <Link href="/admin-senmas/b2b-gruppen" className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg text-white" style={{ background: 'var(--color-primary)' }}>
              <Plus size={13} /> Neue Gruppe
            </Link>
          }
        >
          {b2bGroups.length === 0 ? (
            <p className="text-xs" style={{ color: 'var(--color-text-faint)' }}>Noch keine Gruppen.</p>
          ) : (
            <div className="space-y-3">
              {b2bGroups.map((g) => (
                <div key={g.id} className="flex items-center justify-between text-xs">
                  <div>
                    <div style={{ color: 'var(--color-text)' }}>{g.name}</div>
                    <div style={{ color: 'var(--color-text-faint)' }}>{g.type}</div>
                  </div>
                  <span style={{ color: 'var(--color-text-faint)' }}>{g.usedLicenses}/{g.total_licenses}</span>
                  <StatusPill active={g.is_active} />
                </div>
              ))}
            </div>
          )}
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
            <Link href={q.href} className="mt-auto text-xs py-2 rounded-lg font-medium text-center" style={{ background: 'var(--color-panel-alt)', color: 'var(--color-text-muted)' }}>
              Oeffnen
            </Link>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-[11px] pt-2" style={{ color: 'var(--color-text-faint)' }}>
        <span>© 2026 CertCoach. Alle Rechte vorbehalten.</span>
        <span>Version 2.1.0 — echte Daten</span>
      </div>
    </>
  );
}
