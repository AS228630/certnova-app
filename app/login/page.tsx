import type { Metadata } from "next";
import { Suspense } from "react";
import AuthCard from "@/components/AuthCard";

export const metadata: Metadata = {
  title: "Anmelden – CertCoach",
  description: "Melde dich bei CertCoach an und setze deine Lernreise fort.",
};

export default function LoginPage() {
  return (
    <Suspense>
      <AuthCard initialMode="login" />
    </Suspense>
  );
}
