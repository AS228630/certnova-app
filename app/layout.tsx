import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CertCoach – Lerne. Übe. Zertifiziere dich.",
  description:
    "CertCoach: Deine All-in-One-Plattform, um IT-Skills aufzubauen, Zertifikate zu erhalten und deinen Traumjob zu bekommen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-bg text-text">{children}</body>
    </html>
  );
}
