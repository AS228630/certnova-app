"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import FreeRegistrationGate from "./FreeRegistrationGate";

/**
 * Every "Kostenlos starten"/"Jetzt registrieren" CTA across the site's
 * marketing and landing pages used to be a plain <Link href="/register">
 * — a real, repeated complaint: clicking any of them yanked the person
 * to the old disruptive full-page register form instead of the
 * lightweight Stage 5 modal already used everywhere else (Practice,
 * Labs, Exam, Sidebar, Stage 4). This is a drop-in replacement with the
 * exact same props shape (className + children) so each call site only
 * needed its tag name changed, not its layout.
 */
export default function RegisterTriggerLink({
  className,
  children,
  returnTo,
}: {
  className?: string;
  children: React.ReactNode;
  /** Defaults to the current page — most of these CTAs live on a
   * marketing page with nothing to "return to" mid-content, so landing
   * back on that same page after registering is the right default. */
  returnTo?: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      {open && (
        <FreeRegistrationGate returnTo={returnTo ?? pathname ?? "/dashboard"} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
