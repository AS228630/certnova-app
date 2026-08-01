import type { Metadata } from 'next';
import CvPageClient from '@/components/cv/CvPageClient';

export const metadata: Metadata = {
  title: 'Ataullah Senmas | Software Engineer & IT Specialist',
  description: 'Portfolio & Lebenslauf von Ataullah Senmas.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function CvPage() {
  return <CvPageClient />;
}
