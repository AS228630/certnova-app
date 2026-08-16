import type { Metadata } from 'next';
import AdminShell from '@/components/admin/AdminShell';

// The admin panel must never be indexed — set here (a Server Component
// layout) since every page under it is 'use client' and can't export
// metadata directly itself.
export const metadata: Metadata = {
  robots: { index: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
