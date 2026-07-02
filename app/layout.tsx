import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "./globals.css";

export const metadata: Metadata = {
  title: "CertCoach – Lerne. Übe. Zertifiziere dich.",
  description:
    "CertCoach: Deine All-in-One-Plattform, um IT-Skills aufzubauen, Zertifikate zu erhalten und deinen Traumjob zu bekommen.",
};

import ThemeProvider from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('certcoach-theme')||'dark';document.documentElement.classList.add(t);}catch(e){document.documentElement.classList.add('dark');}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-text">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
