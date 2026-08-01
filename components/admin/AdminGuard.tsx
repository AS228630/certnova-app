'use client';

/**
 * AdminGuard — restricts access to the admin panel to a specific,
 * configured set of owner email addresses.
 *
 * IMPORTANT — read before relying on this in production:
 * This check happens entirely in the browser (same pattern already used
 * by DashboardShell for the student dashboard — see components/DashboardShell.tsx).
 * It is enough to stop casual/accidental access (someone guessing the
 * /admin URL) but it is NOT a substitute for real server-side
 * authorization. Once real student/financial data is wired into this
 * panel, the underlying API routes and/or Supabase Row Level Security
 * policies must independently verify the caller is an admin — never
 * trust this client-side check alone for anything sensitive.
 *
 * Configuration: set NEXT_PUBLIC_ADMIN_EMAILS in the Vercel project's
 * environment variables to a comma-separated list of allowed emails,
 * e.g. NEXT_PUBLIC_ADMIN_EMAILS=owner@example.com,second-admin@example.com
 */

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabaseUser } from '@/lib/supabase/useUser';

function getAllowedEmails(): string[] {
  const raw = process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? '';
  return raw
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useSupabaseUser();
  const router = useRouter();

  const allowedEmails = useMemo(() => getAllowedEmails(), []);
  const email = user?.email?.toLowerCase();
  const authorized = !!email && allowedEmails.includes(email);
  const checked = !loading;

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace('/login?redirect=/admin');
      return;
    }
    if (!authorized) {
      router.replace('/dashboard');
    }
  }, [loading, user, authorized, router]);

  if (!checked || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ background: 'var(--color-bg)', color: 'var(--color-text-muted)' }}>
        <p className="text-sm">Zugriff wird geprüft…</p>
      </div>
    );
  }

  if (!authorized) {
    // Brief message while the redirect above takes effect.
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ background: 'var(--color-bg)', color: 'var(--color-text-muted)' }}>
        <p className="text-sm">Kein Zugriff — Weiterleitung…</p>
      </div>
    );
  }

  return <>{children}</>;
}
