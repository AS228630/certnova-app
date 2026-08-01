'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import ComingSoonPanel from '@/components/admin/ComingSoonPanel';
import { ADMIN_NAV_BY_SLUG } from '@/lib/admin/navItems';

export default function AdminSectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const item = ADMIN_NAV_BY_SLUG[slug];

  if (!item) notFound();

  return <ComingSoonPanel icon={item.icon} label={item.label} description={item.description} />;
}
