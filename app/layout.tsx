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
import { Analytics } from "@vercel/analytics/react";

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
        {/* Real visitor analytics (page views, referrers, countries,
            devices) via Vercel's built-in analytics — free on the plan
            this project already runs on, zero extra config beyond this
            component, and view the numbers at vercel.com under this
            project's "Analytics" tab. This tracks visits, not purchases:
            there is no real payment system on the site yet (the
            "Upgrade to Pro" button has no backend behind it), so nobody
            has actually purchased anything to report on. */}
        <Analytics />
      </body>
    </html>
  );
}
