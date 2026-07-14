// The publishable key is specifically designed to be safe in frontend
// code (unlike the secret key, which lives only in server-side
// environment variables and is never imported here).
export const STRIPE_PUBLISHABLE_KEY =
  "pk_test_51Tt6SmBpO8ZQFF1a3tUL8zhKk4gnTqs7MyXeWwUw0yqcUI3T7IuWTQOrtQoIEE2drApggZasjJHAcpba9HtO1ZSn001P637kDy";

export const PLAN_PRICES = {
  monthly: { amount: 1900, label: "Monatlich", interval: "month" as const },
  yearly: { amount: 15900, label: "Jährlich", interval: "year" as const },
};
