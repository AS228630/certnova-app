import type { Metadata } from "next";

// Account/redemption action page, not discoverable content — noindex.
export const metadata: Metadata = {
  robots: { index: false },
};

export default function LicenseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
