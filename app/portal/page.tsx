'use client';

/**
 * Teacher Portal — STEP 4: Dashboard. Talks to /api/teacher/dashboard,
 * which is scoped exclusively to the authenticated teacher's own data
 * (see lib/teacher/requireTeacher.ts). No hardcoded numbers, no sample
 * data — a teacher with zero students correctly sees zeros.
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader2, GraduationCap, TrendingUp, Wallet, Clock } from 'lucide-react';
import TeacherShell from '@/components/teacher/TeacherShell';
import { supabase } from '@/lib/supabase/client';

type Dashboard = {
  teacherName: string;
  summary: { totalStudents: number; newStudents30d: number; earnedCents: number; pendingCents: number; paidCents: number; activeCodes: number; totalCodes: number };
  activityChart: { date: string; count: number }[];
};

function fmtEuro(cents: number): string {
  return '€ ' + (cents / 100).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

async function authHeader(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function KpiCard({ icon: Icon, iconBg, label, value }: { icon: typeof GraduationCap; iconBg: string; label: string; value: string }) {
  return (
    <div className="rounded-2xl p-5 flex items-center gap-3" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${iconBg}26` }}>
        <Icon size={18} color={iconBg} />
      </div>
      <div className="min-w-0">
        <div className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>{label}</div>
        <div className="text-lg font-bold">{value}</div>
      </div>
    </div>
  );
}

function ActivityChart({ data }: { data: { date: string; count: number }[] }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <div className="flex items-end gap-2 h-32">
      {data.map((d) => (
        <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full rounded-t-md" style={{ height: `${(d.count / max) * 96 + 4}px`, background: 'var(--color-primary)' }} />
          <span className="text-[10px]" style={{ color: 'var(--color-text-faint)' }}>{d.date.slice(5)}</span>
        </div>
      ))}
    </div>
  );
}

function DashboardContent() {
  const [data, setData] = useState<Dashboard | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    authHeader()
      .then((headers) => fetch('/api/teacher/dashboard', { headers }))
      .then(async (res) => {
        if (!res.ok) throw new Error('Fehler beim Laden.');
        setData(await res.json());
      })
      .catch((e: Error) => setError(e.message));
  }, []);

  if (error) return <div className="rounded-xl p-4 text-sm" style={{ background: 'var(--color-danger-light)', color: 'var(--color-danger)' }}>{error}</div>;
  if (!data) return <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-muted)' }}><Loader2 size={16} className="animate-spin" /> Daten werden geladen…</div>;

  return (
    <div>
      <p className="text-sm mb-5" style={{ color: 'var(--color-text-muted)' }}>Willkommen, {data.teacherName}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <KpiCard icon={GraduationCap} iconBg="#22C55E" label="Meine Studenten" value={String(data.summary.totalStudents)} />
        <KpiCard icon={TrendingUp} iconBg="#3B82F6" label="Neue Studenten (30 Tage)" value={String(data.summary.newStudents30d)} />
        <KpiCard icon={Wallet} iconBg="#7C3AED" label="Provision verdient" value={fmtEuro(data.summary.earnedCents)} />
        <KpiCard icon={Clock} iconBg="#F59E0B" label="Ausstehend" value={fmtEuro(data.summary.pendingCents)} />
      </div>

      <div className="rounded-2xl p-5 mb-6" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
        <h3 className="text-sm font-semibold mb-4">Meine Referral-Aktivität (letzte 7 Tage)</h3>
        {data.activityChart.every((d) => d.count === 0) ? (
          <p className="text-xs" style={{ color: 'var(--color-text-faint)' }}>Noch keine Aktivität in den letzten 7 Tagen.</p>
        ) : (
          <ActivityChart data={data.activityChart} />
        )}
      </div>

      <div className="flex gap-3 text-sm">
        <Link href="/portal/codes" className="px-4 py-2 rounded-lg text-white" style={{ background: 'var(--color-primary)' }}>Meine Codes ansehen</Link>
        <Link href="/portal/provision" className="px-4 py-2 rounded-lg" style={{ background: 'var(--color-panel-alt)', color: 'var(--color-text-muted)' }}>Provisionen ansehen</Link>
      </div>
    </div>
  );
}

export default function TeacherDashboardPage() {
  return (
    <TeacherShell title="Dashboard">
      <DashboardContent />
    </TeacherShell>
  );
}
