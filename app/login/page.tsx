import type { Metadata } from "next";
import AuthCard from "@/components/AuthCard";

export const metadata: Metadata = {
  title: "Anmelden – CertCoach",
  description: "Melde dich bei CertCoach an und setze deine Lernreise fort.",
};

export default function LoginPage() {
  return <AuthCard initialMode="login" />;
}
