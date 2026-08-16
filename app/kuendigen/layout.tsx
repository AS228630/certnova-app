import type { Metadata } from "next";

// Legally required (§312k BGB) to stay permanently reachable and
// non-login-gated, but it's a transactional account action, not
// content anyone should land on via search — noindex.
export const metadata: Metadata = {
  robots: { index: false },
};

export default function KuendigenLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
