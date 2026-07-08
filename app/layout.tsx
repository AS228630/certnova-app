import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "./globals.css";

export const metadata: Metadata = {
  title: "CertCoach – Lerne. Übe. Zertifiziere dich.",
  description:
    "CertCoach: Deine All-in-One-Plattform, um IT-Skills aufzubauen, Zertifikate zu erhalten und deinen Traumjob zu bekommen.",
};

import ThemeProvider from "@/components/ThemeProvider";
import LocaleProvider from "@/components/LocaleProvider";

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
            __html: `try{var t=localStorage.getItem('certcoach-theme')||'dark';document.documentElement.classList.add(t);}catch(e){document.documentElement.classList.add('dark');}
try{var l=localStorage.getItem('certcoach-locale')||'de';document.documentElement.lang=l;document.documentElement.dir=(l==='fa'||l==='ar')?'rtl':'ltr';}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-text">
        <ThemeProvider>
          <LocaleProvider>{children}</LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
