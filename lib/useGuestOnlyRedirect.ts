"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

/** Redirects an already-signed-in user away from a guest-only marketing
 * page (landing page, pricing, the public certifications preview) to
 * /dashboard, so a logged-in user never sees the guest version of these
 * pages again until they explicitly log out. Returns `checking: true`
 * while the session check is in flight, so callers can render nothing
 * (or a lightweight loading state) rather than flashing the guest content
 * for a moment before the redirect happens. */
export function useGuestOnlyRedirect() {
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      if (data.session) {
        router.replace("/dashboard");
        return;
      }
      setChecking(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.replace("/dashboard");
      }
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [router]);

  return { checking };
}
