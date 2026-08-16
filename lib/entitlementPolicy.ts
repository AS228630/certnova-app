// Central Entitlement Architecture (advisor spec item 16): every place
// in the app that gates a feature should call canAccess(isPro, feature)
// instead of checking `isPro` (or `!isPro`) directly inline. Today there
// is exactly one paid tier, so canAccess is a thin wrapper around that
// single boolean — but it is the ONE place that fact lives. If CertCoach
// ever adds a second tier (e.g. a Labs-only plan), only this file
// changes; every call site (API routes, GatedLabStage, PremiumGateModal
// callers, CtaBanner, etc.) keeps working without being touched.
//
// Works identically on the server (given the isPro resolved by
// lib/entitlements.ts's resolveEntitlement()) and on the client (given
// the isPro read from lib/store/subscriptionStore.ts) — both ultimately
// trace back to the same real, RLS-protected `subscriptions` table row;
// this function never itself decides what a user is entitled to, it
// only maps a resolved plan state onto named features.

export type Feature =
  | "labs_full"
  | "practice_questions_full"
  | "exam_simulation_full"
  | "ai_coach"
  | "detailed_analytics"
  | "certificate_tracking";

/**
 * Every feature below is Premium-only today (CertCoach has exactly one
 * paid tier), so this collapses to "return isPro" — but call sites
 * should still name the feature they're checking (canAccess(isPro,
 * "labs_full"), not just `isPro`), so that the day a second tier exists,
 * updating this one function is enough.
 */
export function canAccess(isPro: boolean, feature: Feature): boolean {
  // Every feature listed above happens to be Premium-only today, so this
  // is intentionally just `isPro` regardless of which one was asked
  // about — `feature` exists so call sites are self-documenting and so
  // a future non-binary plan only requires changing this one line.
  void feature;
  return isPro;
}
