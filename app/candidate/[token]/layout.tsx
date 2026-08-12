import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: { index: false, follow: false, noarchive: true },
  title: 'Private Candidate Profile',
};

export default function CandidateShareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
