'use client';

/**
 * Teacher Portal — STEP 10: Profile. Read-only by design — see
 * app/api/teacher/profile for why (advisor's spec section 9: no
 * teacher-editable sensitive fields).
 */

import { useEffect, useState } from 'react';
import { Loader2, User } from 'lucide-react';
import TeacherShell from '@/components/teacher/TeacherShell';
import { supabase } from '@/lib/supabase/client';

type Teacher = { name: string; email: string | null; status: string; access_valid_until: string | null; created_at: string };

function fmtDate(iso: string | null): string {
  return iso ? new Date(iso).toLocaleDateString('de-DE') : '—';
}
async function authHeader(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-3" style={{ borderBottom: '1px solid var(--color-border-soft)' }}>
      <div className="text-xs mb-1" style={{ color: 'var(--color-text-faint)' }}>{label}</div>
      <div className="text-sm">{value}</div>
    </div>
  );
}

function ProfilContent() {
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    authHeader()
      .then((headers) => fetch('/api/teacher/profile', { headers }))
      .then(async (res) => {
        if (!res.ok) throw new Error('Fehler beim Laden.');
        setTeacher((await res.json()).teacher);
      })
      .catch((e: Error) => setError(e.message));
  }, []);

  if (error) return <div className="rounded-xl p-4 text-sm" style={{ background: 'var(--color-danger-light)', color: 'var(--color-danger)' }}>{error}</div>;
  if (!teacher) return <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-muted)' }}><Loader2 size={16} className="animate-spin" /> Daten werden geladen…</div>;

  return (
    <div className="max-w-md rounded-2xl p-6" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'var(--color-primary-light)' }}>
          <User size={22} color="var(--color-primary-hover)" />
        </div>
        <div>
          <div className="font-semibold">{teacher.name}</div>
          <div className="text-xs" style={{ color: 'var(--color-text-faint)' }}>{teacher.status === 'active' ? 'Aktiv' : 'Inaktiv'}</div>
        </div>
      </div>
      <Field label="Name" value={teacher.name} />
      <Field label="E-Mail" value={teacher.email ?? '—'} />
      <Field label="Status" value={teacher.status === 'active' ? 'Aktiv' : 'Inaktiv'} />
      <Field label="Dozent seit" value={fmtDate(teacher.created_at)} />
      <Field label="Zugang gültig bis" value={fmtDate(teacher.access_valid_until)} />
      <p className="text-xs mt-4" style={{ color: 'var(--color-text-faint)' }}>
        Änderungen an Provision, Codes oder Kontodaten können nur von einem Administrator vorgenommen werden.
      </p>
    </div>
  );
}

export default function TeacherProfilePage() {
  return (
    <TeacherShell title="Profil">
      <ProfilContent />
    </TeacherShell>
  );
}
