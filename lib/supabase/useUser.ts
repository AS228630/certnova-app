"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";

export function useSupabaseUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}

function metaName(user: User | null): string | undefined {
  const meta = user?.user_metadata as
    | { full_name?: string; name?: string; user_name?: string }
    | undefined;
  return meta?.full_name || meta?.name || meta?.user_name;
}

/** First name only, for friendly greetings ("Guten Morgen, Arman!"). */
export function getFirstName(user: User | null): string {
  const full = metaName(user);
  if (full) return full.trim().split(/\s+/)[0];
  if (user?.email) return user.email.split("@")[0];
  return "Lernender";
}

/** Full display name, for headers / profile menus. */
export function getFullName(user: User | null): string {
  const full = metaName(user);
  if (full) return full;
  if (user?.email) return user.email.split("@")[0];
  return "Lernender";
}
