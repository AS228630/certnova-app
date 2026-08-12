'use client';

/**
 * Teacher Portal shell — sidebar + header, styled with the same design
 * tokens as the rest of CertCoach (components/admin/AdminShell.tsx
 * uses the identical --color-* variables) so the portal doesn't look
 * like a separate product, per the advisor's explicit instruction.
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Ticket, GraduationCap, Wallet, Banknote, User } from 'lucide-react';
import TeacherGuard from './TeacherGuard';

const NAV = [
  { href: '/portal', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/portal/codes', label: 'Meine Codes', icon: Ticket },
  { href: '/portal/studenten', label: 'Studenten', icon: GraduationCap },
  { href: '/portal/provision', label: 'Provision', icon: Wallet },
  { href: '/portal/auszahlungen', label: 'Auszahlungen', icon: Banknote },
  { href: '/portal/profil', label: 'Profil', icon: User },
];

export default function TeacherShell({ children, title }: { children: React.ReactNode; title: string }) {
  const pathname = usePathname();

  return (
    <TeacherGuard>
      <div className="flex min-h-screen" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
        <aside className="w-[240px] shrink-0 hidden md:flex flex-col" style={{ background: 'var(--color-panel)', borderRight: '1px solid var(--color-border-soft)' }}>
          <div className="px-5 py-5" style={{ borderBottom: '1px solid var(--color-border-soft)' }}>
            <div className="text-lg font-bold">CertCoach</div>
            <div className="text-xs" style={{ color: 'var(--color-text-faint)' }}>Dozenten-Portal</div>
          </div>
          <nav className="flex-1 py-4 px-3">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm mb-1"
                  style={active ? { background: 'var(--color-primary)', color: '#fff' } : { color: 'var(--color-text-muted)' }}
                >
                  <item.icon size={17} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="flex-1 min-w-0">
          <header className="px-6 py-5" style={{ borderBottom: '1px solid var(--color-border-soft)' }}>
            <h1 className="text-xl font-bold">{title}</h1>
          </header>
          <div className="p-6">{children}</div>
        </main>
      </div>
    </TeacherGuard>
  );
}
