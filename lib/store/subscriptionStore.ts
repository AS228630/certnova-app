import { create } from "zustand";
import { supabase } from "@/lib/supabase/client";

export type SubscriptionPlan = "free" | "monthly" | "yearly";
export type SubscriptionStatus = "active" | "canceled" | "past_due" | "incomplete";

export type Subscription = {
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  current_period_end: string | null;
};

type SubscriptionState = {
  subscription: Subscription | null;
  loading: boolean;
  // True only once a real "active" paid row has been read from the
  // subscriptions table — never assumed, never defaulted to true. A
  // brand-new or free user has no row here, so this stays false, and
  // the Sidebar's upgrade prompt keeps showing (an honest empty state,
  // not a fabricated Pro badge).
  isPro: boolean;
  load: (userId: string) => Promise<void>;
  reset: () => void;
};

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscription: null,
  loading: true,
  isPro: false,

  load: async (userId: string) => {
    set({ loading: true });
    const { data } = await supabase
      .from("subscriptions")
      .select("plan, status, current_period_end")
      .eq("user_id", userId)
      .maybeSingle();

    const subscription = (data as Subscription) ?? null;
    const isPro = !!subscription && subscription.plan !== "free" && subscription.status === "active";

    set({ subscription, isPro, loading: false });
  },

  reset: () => set({ subscription: null, isPro: false, loading: true }),
}));
