"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, GraduationCap, Bot, Award, User } from "lucide-react";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/learning-paths", label: "Lernen", icon: GraduationCap },
  { href: "/ai-coach", label: "KI Coach", icon: Bot },
  { href: "/certifications", label: "Zertifikate", icon: Award },
  { href: "/profile", label: "Profil", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

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
            <span>{item.label}</span>
            {active && <span className="mt-0.5 h-0.5 w-5 rounded-full bg-primary" />}
          </Link>
        );
      })}
    </nav>
  );
}
