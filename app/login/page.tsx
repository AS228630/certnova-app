import type { Metadata } from "next";
import { Suspense } from "react";
import AuthCard from "@/components/AuthCard";

export const metadata: Metadata = {
  title: "Anmelden – CertCoach",
  description: "Melde dich bei CertCoach an und setze deine Lernreise fort.",
  // Same reasoning as /register's fix in this same audit round: /login
  // is linked with many different ?redirect= values across the site.
  alternates: { canonical: "https://www.certcoach.de/login" },
};

export default function LoginPage() {
  return (
    <Suspense>
      <AuthCard initialMode="login" />
    </Suspense>
  );
}
