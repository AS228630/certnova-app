import type { Metadata } from "next";
import AuthCard from "@/components/AuthCard";

export const metadata: Metadata = {
  title: "Registrieren – CertCoach",
  description: "Erstelle dein CertCoach-Konto und starte deine Lernreise.",
};

export default function RegisterPage() {
  return <AuthCard initialMode="register" />;
}
