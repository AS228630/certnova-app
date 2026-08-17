import type { Metadata } from "next";
import { Suspense } from "react";
import AuthCard from "@/components/AuthCard";

export const metadata: Metadata = {
  title: "Registrieren – CertCoach",
  description: "Erstelle dein CertCoach-Konto und starte deine Lernreise.",
  // Real gap found during a full-site audit: /register is now linked
  // from many places with a different ?redirect= each time (Practice,
  // Labs, Exam, Sidebar all pass their own return path) - without an
  // explicit canonical, each of those query-string variations could be
  // treated as separate duplicate-content URLs by Google. All of them
  // are the exact same page.
  alternates: { canonical: "https://www.certcoach.de/register" },
};

export default function RegisterPage() {
  return (
    <Suspense>
      <AuthCard initialMode="register" />
    </Suspense>
  );
}
