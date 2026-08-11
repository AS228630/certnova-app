'use client';

/**
 * Teacher detail page — per docs section 29/30 of the Dozenten-Codes
 * spec: all codes, referred students, and the real commission_ledger
 * balance for one teacher. Talks to /api/admin/teachers/[id].
 */

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2, Ticket, GraduationCap, Wallet, TrendingUp } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

type Detail = {
  teacher: { id: string; name: string; email: string | null; user_id: string | null; access_valid_until: string | null; status: string; created_at: string };
  codes: { id: string; code: string; extra_days: number; commission_rate: number; is_active: boolean; stats: { revenueCents: number; usedCount: number } }[];
  students: { studentUserId: string; name: string; email: string; codeUsed: string; bonusDays: number; referredAt: string; subscriptionStatus: string | null; amountPaidCents: number }[];
  summary: { codesCount: number; studentsReferred: number; firstPurchases: number; revenueGeneratedCents: number; earnedCents: number; reversedCents: number; paidCents: number; pendingCents: number };
};

function fmtEuro(cents: number): string {
  return '€ ' + (cents / 100).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtDate(iso: string | null): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('de-DE');
}

async function authHeader(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function StatCard({ icon: Icon, iconBg, label, value }: { icon: typeof Ticket; iconBg: string; label: string; value: string }) {
  return (
    <div className="rounded-2xl p-4 flex items-center gap-3" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
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

export default function TeacherDetailPage({ params }: { params: Promise<{ teacherId: string }> }) {
  const { teacherId } = use(params);
  const [detail, setDetail] = useState<Detail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    authHeader()
      .then((headers) => fetch(`/api/admin/teachers/${teacherId}`, { headers }))
      .then(async (res) => {
        if (!res.ok) {
          const j = await res.json().catch(() => ({}));
          throw new Error(j.error === 'TEACHER_NOT_FOUND' ? 'Dozent nicht gefunden.' : 'Fehler beim Laden.');
        }
        setDetail(await res.json());
      })
      .catch((e: Error) => setError(e.message));
  }, [teacherId]);

  return (
    <div>
      <Link href="/admin-senmas/dozenten-codes" className="inline-flex items-center gap-2 text-sm mb-4" style={{ color: 'var(--color-primary)' }}>
        <ArrowLeft size={15} /> Zurück zu Dozenten-Codes
      </Link>

      {error && <div className="rounded-xl p-4 text-sm" style={{ background: 'var(--color-danger-light)', color: 'var(--color-danger)' }}>{error}</div>}

      {!detail && !error && (
        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
          <Loader2 size={16} className="animate-spin" /> Wird geladen…
        </div>
      )}

      {detail && (
        <>
          <div className="mb-5">
            <h2 className="text-xl font-bold">{detail.teacher.name}</h2>
            <p className="text-sm" style={{ color: 'var(--color-text-faint)' }}>
              {detail.teacher.email ?? 'Keine E-Mail hinterlegt'} · Dozent seit {fmtDate(detail.teacher.created_at)}
              {detail.teacher.user_id && ` · Login aktiv bis ${fmtDate(detail.teacher.access_valid_until)}`}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            <StatCard icon={Ticket} iconBg="#7C3AED" label="Codes" value={String(detail.summary.codesCount)} />
            <StatCard icon={GraduationCap} iconBg="#22C55E" label="Geworbene Studenten" value={String(detail.summary.studentsReferred)} />
            <StatCard icon={TrendingUp} iconBg="#3B82F6" label="Erstkäufe" value={String(detail.summary.firstPurchases)} />
            <StatCard icon={Wallet} iconBg="#F59E0B" label="Umsatz generiert" value={fmtEuro(detail.summary.revenueGeneratedCents)} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
            <StatCard icon={Wallet} iconBg="#7C3AED" label="Provision verdient" value={fmtEuro(detail.summary.earnedCents)} />
            <StatCard icon={Wallet} iconBg="#F59E0B" label="Ausstehend" value={fmtEuro(detail.summary.pendingCents)} />
            <StatCard icon={Wallet} iconBg="#22C55E" label="Ausgezahlt" value={fmtEuro(detail.summary.paidCents)} />
            <StatCard icon={Wallet} iconBg="#EF4444" label="Storniert" value={fmtEuro(detail.summary.reversedCents)} />
          </div>
          <div className="mb-6">
            <Link href="/admin-senmas/auszahlungen" className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg text-white" style={{ background: 'var(--color-primary)' }}>
              <Wallet size={15} /> Auszahlung erstellen
            </Link>
          </div>

          <h3 className="text-sm font-semibold mb-3">Codes dieses Dozenten</h3>
          <div className="rounded-2xl overflow-x-auto mb-6" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border-soft)' }}>
                  {['Code', 'Bonustage', 'Provision', 'Verwendet', 'Umsatz', 'Status'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium" style={{ color: 'var(--color-text-faint)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {detail.codes.length === 0 ? (
                  <tr><td colSpan={6} className="px-4 py-6 text-center text-sm" style={{ color: 'var(--color-text-faint)' }}>Keine Codes.</td></tr>
                ) : detail.codes.map((c) => (
                  <tr key={c.id} style={{ borderBottom: '1px solid var(--color-border-soft)' }}>
                    <td className="px-4 py-3"><span className="font-mono text-xs px-2 py-1 rounded" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary-hover)' }}>{c.code}</span></td>
                    <td className="px-4 py-3" style={{ color: 'var(--color-text-faint)' }}>+{c.extra_days} Tage</td>
                    <td className="px-4 py-3" style={{ color: 'var(--color-text-faint)' }}>{Math.round(c.commission_rate * 100)}%</td>
                    <td className="px-4 py-3">{c.stats.usedCount}</td>
                    <td className="px-4 py-3 font-semibold">{fmtEuro(c.stats.revenueCents)}</td>
                    <td className="px-4 py-3">
                      <span className="text-[11px] px-2 py-0.5 rounded-full font-medium" style={{ background: c.is_active ? 'var(--color-success-light)' : 'var(--color-danger-light)', color: c.is_active ? 'var(--color-success)' : 'var(--color-danger)' }}>
                        {c.is_active ? 'Aktiv' : 'Inaktiv'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-sm font-semibold mb-3">Geworbene Studenten</h3>
          <div className="rounded-2xl overflow-x-auto" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border-soft)' }}>
                  {['Student', 'Code', 'Beigetreten', 'Bonustage', 'Abo-Status', 'Umsatz'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium whitespace-nowrap" style={{ color: 'var(--color-text-faint)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {detail.students.length === 0 ? (
                  <tr><td colSpan={6} className="px-4 py-6 text-center text-sm" style={{ color: 'var(--color-text-faint)' }}>Noch keine geworbenen Studenten.</td></tr>
                ) : detail.students.map((s) => (
                  <tr key={s.studentUserId} style={{ borderBottom: '1px solid var(--color-border-soft)' }}>
                    <td className="px-4 py-3">
                      <div>{s.name}</div>
                      <div className="text-xs" style={{ color: 'var(--color-text-faint)' }}>{s.email}</div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">{s.codeUsed}</td>
                    <td className="px-4 py-3 whitespace-nowrap" style={{ color: 'var(--color-text-faint)' }}>{fmtDate(s.referredAt)}</td>
                    <td className="px-4 py-3" style={{ color: 'var(--color-text-faint)' }}>+{s.bonusDays}</td>
                    <td className="px-4 py-3" style={{ color: 'var(--color-text-faint)' }}>{s.subscriptionStatus ?? '—'}</td>
                    <td className="px-4 py-3 font-semibold">{fmtEuro(s.amountPaidCents)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
