'use client';

/**
 * Teacher Portal — STEP 7: My Students. Talks to /api/teacher/students,
 * scoped exclusively to this teacher's own referrals. Deliberately
 * does NOT show payment amounts or other admin-only financial detail
 * about a student, per the advisor's privacy rule.
 */

import { useEffect, useState } from 'react';
import { Loader2, GraduationCap } from 'lucide-react';
import TeacherShell from '@/components/teacher/TeacherShell';
import { supabase } from '@/lib/supabase/client';

type Student = { name: string; email: string; codeUsed: string; bonusDays: number; registeredAt: string; subscriptionStatus: string };

const STATUS_LABELS: Record<string, string> = { active: 'Aktiv', canceled: 'Gekündigt', past_due: 'Zahlung überfällig', incomplete: 'Unvollständig', free: 'Kostenlos', unknown: '—' };

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('de-DE');
}

async function authHeader(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function StudentsContent() {
  const [students, setStudents] = useState<Student[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    authHeader()
      .then((headers) => fetch('/api/teacher/students', { headers }))
      .then(async (res) => {
        if (!res.ok) throw new Error('Fehler beim Laden.');
        setStudents((await res.json()).students);
      })
      .catch((e: Error) => setError(e.message));
  }, []);

  if (error) return <div className="rounded-xl p-4 text-sm" style={{ background: 'var(--color-danger-light)', color: 'var(--color-danger)' }}>{error}</div>;
  if (!students) return <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-muted)' }}><Loader2 size={16} className="animate-spin" /> Daten werden geladen…</div>;

  if (students.length === 0) {
    return (
      <div className="rounded-2xl p-10 flex flex-col items-center text-center gap-3" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
        <GraduationCap size={28} color="var(--color-text-faint)" />
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Noch keine Studenten über Ihre Referral-Codes.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-x-auto" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
      <table className="w-full text-sm">
        <thead>
          <tr style={{ borderBottom: '1px solid var(--color-border-soft)' }}>
            {['Student', 'Code', 'Beigetreten', 'Bonustage', 'Abo-Status'].map((h) => (
              <th key={h} className="text-left px-4 py-3 text-xs font-medium whitespace-nowrap" style={{ color: 'var(--color-text-faint)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--color-border-soft)' }}>
              <td className="px-4 py-3">
                <div>{s.name}</div>
                <div className="text-xs" style={{ color: 'var(--color-text-faint)' }}>{s.email}</div>
              </td>
              <td className="px-4 py-3 font-mono text-xs">{s.codeUsed}</td>
              <td className="px-4 py-3 whitespace-nowrap" style={{ color: 'var(--color-text-faint)' }}>{fmtDate(s.registeredAt)}</td>
              <td className="px-4 py-3" style={{ color: 'var(--color-text-faint)' }}>+{s.bonusDays}</td>
              <td className="px-4 py-3">{STATUS_LABELS[s.subscriptionStatus] ?? s.subscriptionStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function TeacherStudentsPage() {
  return (
    <TeacherShell title="Studenten">
      <StudentsContent />
    </TeacherShell>
  );
}
