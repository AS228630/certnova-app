// The only two real, purchasable plans — moved out of the now-deleted
// PlanSelectionStep.tsx (replaced site-wide by the shared
// components/pricing/PricingPanel.tsx) so PaymentStep doesn't import a
// type from a component that no longer exists.
export type PlanId = "monthly" | "yearly";
