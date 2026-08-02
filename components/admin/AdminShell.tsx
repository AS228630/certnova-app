'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ChevronDown, Moon, Bell, Menu, X } from 'lucide-react';
import AdminGuard from './AdminGuard';
import { ADMIN_NAV_SECTIONS, ADMIN_NAV_BY_SLUG, type AdminNavItem } from '@/lib/admin/navItems';

function currentTitle(pathname: string): { title: string; subtitle: string } {
  if (pathname === '/admin-senmas') {
    return { title: 'Dashboard', subtitle: 'Übersicht & Systemstatistiken' };
  }
  const slug = pathname.replace(/^\/admin-senmas\/?/, '');
  const item = ADMIN_NAV_BY_SLUG[slug];
  if (item) return { title: item.label, subtitle: item.description };
  return { title: 'Admin Panel', subtitle: '' };
}

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="flex-1 overflow-y-auto py-4 px-3">
      <Link
        href="/admin-senmas"
        onClick={onNavigate}
        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium mb-4"
        style={
          pathname === '/admin-senmas'
            ? { background: 'var(--color-primary)', color: '#fff' }
            : { color: 'var(--color-text-muted)' }
        }
      >
        <LayoutDashboard size={17} />
        Dashboard
      </Link>

      {ADMIN_NAV_SECTIONS.map((section) => (
        <div key={section.label} className="mb-4">
          <div className="text-[10px] tracking-wider px-3 mb-1.5" style={{ color: 'var(--color-text-faint)' }}>
            {section.label}
          </div>
          {section.items.map((item: AdminNavItem) => {
            const href = `/admin-senmas/${item.slug}`;
            const active = pathname === href;
            return (
              <Link
                key={item.slug}
                href={href}
                onClick={onNavigate}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm mb-0.5 hover:opacity-90"
                style={
                  active
                    ? { background: 'var(--color-primary-light)', color: 'var(--color-primary-hover)' }
                    : { color: 'var(--color-text-muted)' }
                }
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}

function SidebarHeader() {
  return (
    <div className="flex items-center gap-2 px-5 h-20" style={{ borderBottom: '1px solid var(--color-border-soft)' }}>
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white"
        style={{ background: 'linear-gradient(135deg,#7C3AED,#3B82F6)' }}
      >
        C
      </div>
      <div>
        <div className="text-sm font-bold leading-tight">CertCoach</div>
        <div className="text-[11px]" style={{ color: 'var(--color-text-faint)' }}>Admin Panel</div>
      </div>
    </div>
  );
}

function SidebarFooter() {
  return (
    <div className="p-4 flex items-center gap-3" style={{ borderTop: '1px solid var(--color-border-soft)' }}>
      <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: 'var(--color-primary)' }}>
        AS
      </div>
      <div className="min-w-0">
        <div className="text-xs font-semibold truncate">Ataullah Senmas</div>
        <div className="text-[11px] flex items-center gap-1" style={{ color: 'var(--color-text-faint)' }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-success)' }} />
          Online
        </div>
      </div>
    </div>
  );
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { title, subtitle } = currentTitle(pathname);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  // Closing on navigation is handled explicitly by each Link's onNavigate,
  // the backdrop click, and the X button below — no effect needed.

  return (
    <AdminGuard>
      <div className="flex min-h-screen" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
        {/* Desktop sidebar */}
        <aside
          className="hidden lg:flex flex-col shrink-0"
          style={{ width: 280, background: 'var(--color-sidebar-bg)', borderRight: '1px solid var(--color-border-soft)' }}
        >
          <SidebarHeader />
          <NavLinks pathname={pathname} />
          <SidebarFooter />
        </aside>

        {/* Mobile drawer + backdrop */}
        {mobileNavOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div
              className="absolute inset-0"
              style={{ background: 'rgba(0,0,0,0.55)' }}
              onClick={() => setMobileNavOpen(false)}
            />
            <aside
              className="relative flex flex-col w-[280px] max-w-[85vw] h-full"
              style={{ background: 'var(--color-sidebar-bg)', borderRight: '1px solid var(--color-border-soft)' }}
            >
              <div className="flex items-center justify-between px-4 h-16 shrink-0" style={{ borderBottom: '1px solid var(--color-border-soft)' }}>
                <span className="text-sm font-bold">CertCoach Admin</span>
                <button onClick={() => setMobileNavOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-panel)' }}>
                  <X size={16} />
                </button>
              </div>
              <NavLinks pathname={pathname} onNavigate={() => setMobileNavOpen(false)} />
              <SidebarFooter />
            </aside>
          </div>
        )}

        {/* Main */}
        <div className="flex-1 min-w-0 flex flex-col">
          <header
            className="h-20 flex items-center justify-between px-4 sm:px-6 shrink-0"
            style={{ background: 'var(--color-topbar-bg)', borderBottom: '1px solid var(--color-border-soft)' }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setMobileNavOpen(true)}
                className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}
                aria-label="Menü öffnen"
              >
                <Menu size={17} />
              </button>
              <div className="min-w-0">
                <h1 className="text-lg font-bold truncate">{title}</h1>
                {subtitle && <p className="text-xs truncate hidden sm:block" style={{ color: 'var(--color-text-faint)' }}>{subtitle}</p>}
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                className="hidden md:flex items-center gap-2 text-xs px-3 py-2 rounded-xl"
                style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text-muted)' }}
              >
                Heute
                <ChevronDown size={14} />
              </button>
              <button className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
                <Moon size={16} />
              </button>
              <button className="relative w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
                <Bell size={16} />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] flex items-center justify-center text-white" style={{ background: 'var(--color-danger)' }}>3</span>
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">{children}</main>
        </div>
      </div>
    </AdminGuard>
  );
}
