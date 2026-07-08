"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, GraduationCap, Bot, Award, User } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

const items = [
  { href: "/dashboard", labelKey: "bottomNav.dashboard", icon: Home },
  { href: "/learning-paths", labelKey: "bottomNav.learn", icon: GraduationCap },
  { href: "/ai-coach", labelKey: "bottomNav.aiCoach", icon: Bot },
  { href: "/certifications", labelKey: "bottomNav.certificates", icon: Award },
  { href: "/profile", labelKey: "bottomNav.profile", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { t } = useLocale();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-around border-t border-border-soft bg-panel px-1 py-2 lg:hidden">
      {items.map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-1 flex-col items-center gap-1 rounded-lg px-2 py-1.5 text-[10px] font-medium ${
              active ? "text-primary" : "text-text-faint"
            }`}
          >
            <Icon size={20} />
            <span>{t(item.labelKey)}</span>
            {active && <span className="mt-0.5 h-0.5 w-5 rounded-full bg-primary" />}
          </Link>
        );
      })}
    </nav>
  );
}
