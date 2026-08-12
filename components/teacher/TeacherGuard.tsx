'use client';

/**
 * TeacherGuard — restricts /portal to accounts that are real, active
 * teachers, per Teacher Portal STEP 3 (Authorization / Data Isolation).
 *
 * Unlike AdminGuard (which can check a static NEXT_PUBLIC_ADMIN_EMAILS
 * list client-side), there's no equivalent public list of teacher
 * emails — and there shouldn't be, that would leak teacher identities
 * to every visitor's browser bundle. So this guard calls
 * /api/teacher/me, which runs the real server-side check
 * (lib/teacher/requireTeacher.ts) against the teachers table. This is
 * the actual authorization boundary; every /api/teacher/* route
 * enforces the same check independently, so this guard is a UX
 * convenience (redirect before rendering), never the only line of
 * defense.
 */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabaseUser } from '@/lib/supabase/useUser';
import { supabase } from '@/lib/supabase/client';

export default function TeacherGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useSupabaseUser();
  const router = useRouter();
  const [status, setStatus] = useState<'checking' | 'authorized' | 'denied'>('checking');

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace('/login?redirect=/portal');
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      const token = data.session?.access_token;
      fetch('/api/teacher/me', { headers: token ? { Authorization: `Bearer ${token}` } : {} })
        .then((res) => {
          if (res.ok) {
            setStatus('authorized');
          } else {
            setStatus('denied');
            router.replace('/dashboard');
          }
        })
        .catch(() => {
          setStatus('denied');
          router.replace('/dashboard');
        });
    });
  }, [loading, user, router]);

  if (status !== 'authorized') {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ background: 'var(--color-bg)', color: 'var(--color-text-muted)' }}>
        <p className="text-sm">{status === 'denied' ? 'Kein Zugriff — Weiterleitung…' : 'Zugriff wird geprüft…'}</p>
      </div>
    );
  }

  return <>{children}</>;
}
