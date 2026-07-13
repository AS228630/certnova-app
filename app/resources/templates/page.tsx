"use client";

import { useState } from "react";
import { FileText, Copy, Check, Download } from "lucide-react";
import LandingHeader from "@/components/LandingHeader";
import Footer from "@/components/Footer";
import { useLocale } from "@/components/LocaleProvider";
import { useGuestOnlyRedirect } from "@/lib/useGuestOnlyRedirect";

type Template = { id: string; titleKey: string; descKey: string; items: string[] };

// Real, usable checklist content (not placeholder text) — genuinely
// useful IT-career checklists a learner can read, copy, or check off
// directly on the page. Not downloadable PDF files (which would need
// real file hosting we don't have), but real, complete content.
const TEMPLATES: Template[] = [
  {
    id: "cv",
    titleKey: "resTemplates.cvTitle",
    descKey: "resTemplates.cvDesc",
    items: [
      "resTemplates.cvItem1",
      "resTemplates.cvItem2",
      "resTemplates.cvItem3",
      "resTemplates.cvItem4",
      "resTemplates.cvItem5",
      "resTemplates.cvItem6",
      "resTemplates.cvItem7",
    ],
  },
  {
    id: "interview",
    titleKey: "resTemplates.interviewTitle",
    descKey: "resTemplates.interviewDesc",
    items: [
      "resTemplates.interviewItem1",
      "resTemplates.interviewItem2",
      "resTemplates.interviewItem3",
      "resTemplates.interviewItem4",
      "resTemplates.interviewItem5",
      "resTemplates.interviewItem6",
    ],
  },
  {
    id: "planner",
    titleKey: "resTemplates.plannerTitle",
    descKey: "resTemplates.plannerDesc",
    items: [
      "resTemplates.plannerItem1",
      "resTemplates.plannerItem2",
      "resTemplates.plannerItem3",
      "resTemplates.plannerItem4",
      "resTemplates.plannerItem5",
    ],
  },
  {
    id: "examchecklist",
    titleKey: "resTemplates.examTitle",
    descKey: "resTemplates.examDesc",
    items: [
      "resTemplates.examItem1",
      "resTemplates.examItem2",
      "resTemplates.examItem3",
      "resTemplates.examItem4",
      "resTemplates.examItem5",
      "resTemplates.examItem6",
    ],
  },
  {
    id: "notes",
    titleKey: "resTemplates.notesTitle",
    descKey: "resTemplates.notesDesc",
    items: [
      "resTemplates.notesItem1",
      "resTemplates.notesItem2",
      "resTemplates.notesItem3",
      "resTemplates.notesItem4",
    ],
  },
];

function TemplateCard({ template }: { template: Template }) {
  const { t } = useLocale();
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [copied, setCopied] = useState(false);

  function toggle(i: number) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  function copyAll() {
    const text = `${t(template.titleKey)}\n\n${template.items.map((k) => `- ${t(k)}`).join("\n")}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="rounded-2xl border border-border-soft bg-panel p-5">
      <div className="mb-1 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <FileText size={18} className="text-primary" />
          <h2 className="font-bold text-text">{t(template.titleKey)}</h2>
        </div>
        <button onClick={copyAll} className="flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold text-text-faint hover:bg-panel-alt hover:text-text">
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? t("resTemplates.copied") : t("resTemplates.copyAll")}
        </button>
      </div>
      <p className="mb-4 text-xs text-text-faint">{t(template.descKey)}</p>
      <ul className="space-y-2">
        {template.items.map((itemKey, i) => (
          <li key={itemKey}>
            <label className="flex cursor-pointer items-start gap-2.5 text-sm">
              <input
                type="checkbox"
                checked={checked.has(i)}
                onChange={() => toggle(i)}
                className="mt-0.5 accent-primary"
              />
              <span className={checked.has(i) ? "text-text-faint line-through" : "text-text-muted"}>{t(itemKey)}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TemplatesPage() {
  const { t } = useLocale();
  const { checking } = useGuestOnlyRedirect();

  if (checking) return null;

  return (
    <div className="min-h-screen bg-bg">
      <LandingHeader />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Download size={22} className="text-primary" />
          <h1 className="text-2xl font-extrabold text-text sm:text-3xl">{t("resTemplates.pageTitle")}</h1>
        </div>
        <p className="mt-2 max-w-2xl text-sm text-text-muted">{t("resTemplates.pageDesc")}</p>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {TEMPLATES.map((tpl) => (
            <TemplateCard key={tpl.id} template={tpl} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
