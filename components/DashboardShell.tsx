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
import { useProfileStore } from "@/lib/store/profileStore";
import { useCertProgressStore } from "@/lib/store/certProgressStore";
import { useLessonCompletionStore } from "@/lib/store/lessonCompletionStore";
import { useAiCoachStore } from "@/lib/store/aiCoachStore";
import { useInterviewStore } from "@/lib/store/interviewStore";
import { useLanguageCourseStore } from "@/lib/store/languageCourseStore";
import { useCommunityStore } from "@/lib/store/communityStore";
import { useLiveRoomStore } from "@/lib/store/liveRoomStore";
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

    function loadForUser(u: User) {
      setUser(u);
      setChecked(true);
      useUserProgressStore.getState().load(u.id, getFullName(u));
      useProfileStore.getState().load(u.id);
      useCertProgressStore.getState().loadAll(u.id);
      useAiCoachStore.getState().load(u.id);
      useInterviewStore.getState().load(u.id);
      useLanguageCourseStore.getState().load(u.id);
      useCommunityStore.getState().load(u.id, getFullName(u));
      useLiveRoomStore.getState().setUser(u.id, getFullName(u));
      useLiveRoomStore.getState().loadRooms();
    }

    async function checkSession() {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;

      if (data.session) {
        loadForUser(data.session.user);
        return;
      }

      if (!requireAuth) {
        setChecked(true);
        return;
      }

      // getSession() reads from local storage and is documented to
      // sometimes return null momentarily right after a navigation, even
      // though the user is genuinely still signed in (the session just
      // hasn't finished rehydrating yet). Before redirecting to /login,
      // double-check with getUser(), which verifies against Supabase's
      // servers rather than trusting local state — this avoids bouncing a
      // legitimately signed-in user out of the app when clicking between
      // pages.
      const { data: userData } = await supabase.auth.getUser();
      if (!mounted) return;

      if (userData.user) {
        const { data: refreshed } = await supabase.auth.getSession();
        if (!mounted) return;
        if (refreshed.session) {
          loadForUser(refreshed.session.user);
          return;
        }
      }

      router.replace("/login");
    }

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setUser(null);
        useUserProgressStore.getState().reset();
        useProfileStore.getState().reset();
        useCertProgressStore.getState().reset();
        useAiCoachStore.getState().reset();
        useInterviewStore.getState().reset();
        useLanguageCourseStore.getState().reset();
        useCommunityStore.getState().reset();
        useLiveRoomStore.getState().reset();
        useLessonCompletionStore.getState().reset();
        if (requireAuth) {
          router.replace("/login");
        }
        return;
      }
      loadForUser(session.user);
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
