import type { Metadata } from "next";

// Only ever reachable via a real, single-use emailed recovery link -
// noindex, matching the same reasoning as /kuendigen and /license.
export const metadata: Metadata = {
  robots: { index: false },
};

export default function UpdatePasswordLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
