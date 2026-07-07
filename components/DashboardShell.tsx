"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { supabase } from "@/lib/supabase/client";
import { UserContext } from "@/components/UserContext";
import { useUserProgressStore } from "@/lib/store/userProgressStore";
import { useCertProgressStore } from "@/lib/store/certProgressStore";
import { getFullName } from "@/lib/supabase/useUser";

export default function DashboardShell({
  children,
  requireAuth = true,
}: {
  children: React.ReactNode;
  requireAuth?: boolean;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  // Public pages (requireAuth=false) render immediately as guests; only
  // gated pages block on the session check to avoid flashing real content.
  const [checked, setChecked] = useState(!requireAuth);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      if (!data.session) {
        if (requireAuth) {
          router.replace("/login");
          return;
        }
        setChecked(true);
        return;
      }
      setUser(data.session.user);
      setChecked(true);
      useUserProgressStore.getState().load(data.session.user.id, getFullName(data.session.user));
      useCertProgressStore.getState().loadAll(data.session.user.id);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setUser(null);
        useUserProgressStore.getState().reset();
        useCertProgressStore.getState().reset();
        if (requireAuth) {
          router.replace("/login");
        }
        return;
      }
      setUser(session.user);
      setChecked(true);
      useUserProgressStore.getState().load(session.user.id, getFullName(session.user));
      useCertProgressStore.getState().loadAll(session.user.id);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [router, requireAuth]);

  // Avoid flashing mock content before we know whether someone is logged in.
  if (!checked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <p className="text-sm text-text-muted">Wird geladen …</p>
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ user }}>
      <div className="flex min-h-screen flex-col lg:flex-row">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex min-w-0 flex-1 flex-col pb-16 lg:pb-0">
          <Header onMenuClick={() => setSidebarOpen(true)} />
          {children}
          <BottomNav />
        </div>
      </div>
    </UserContext.Provider>
  );
}
