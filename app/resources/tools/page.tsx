"use client";

import { useState } from "react";
import { Network, Braces, FileCode, KeyRound, Router } from "lucide-react";
import LandingHeader from "@/components/LandingHeader";
import Footer from "@/components/Footer";
import { useLocale } from "@/components/LocaleProvider";
import { useGuestOnlyRedirect } from "@/lib/useGuestOnlyRedirect";
import SubnetCalculator from "@/components/resources/SubnetCalculator";
import JsonFormatter from "@/components/resources/JsonFormatter";
import YamlValidator from "@/components/resources/YamlValidator";
import PasswordGenerator from "@/components/resources/PasswordGenerator";
import CommonPortsReference from "@/components/resources/CommonPortsReference";

const TOOLS = [
  { id: "subnet", icon: Network, labelKey: "resTools.tabSubnet", Comp: SubnetCalculator },
  { id: "json", icon: Braces, labelKey: "resTools.tabJson", Comp: JsonFormatter },
  { id: "yaml", icon: FileCode, labelKey: "resTools.tabYaml", Comp: YamlValidator },
  { id: "password", icon: KeyRound, labelKey: "resTools.tabPassword", Comp: PasswordGenerator },
  { id: "ports", icon: Router, labelKey: "resTools.tabPorts", Comp: CommonPortsReference },
] as const;

export default function ItToolsPage() {
  const { t } = useLocale();
  const { checking } = useGuestOnlyRedirect();
  const [active, setActive] = useState<(typeof TOOLS)[number]["id"]>("subnet");

  if (checking) return null;
  const ActiveComp = TOOLS.find((tool) => tool.id === active)!.Comp;

  return (
    <div className="min-h-screen bg-bg">
      <LandingHeader />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-extrabold text-text sm:text-3xl">{t("resTools.pageTitle")}</h1>
        <p className="mt-2 max-w-2xl text-sm text-text-muted">{t("resTools.pageDesc")}</p>

        <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-1">
          {TOOLS.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActive(tool.id)}
              className={`flex shrink-0 items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${
                active === tool.id ? "border-primary bg-primary-light text-primary" : "border-border-soft text-text-muted hover:bg-panel-alt"
              }`}
            >
              <tool.icon size={15} />
              {t(tool.labelKey)}
            </button>
          ))}
        </div>

        <div className="mt-6">
          <ActiveComp />
        </div>
      </main>
      <Footer />
    </div>
  );
}
