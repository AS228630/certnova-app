"use client";

import { useState } from "react";
import { HelpCircle, Lightbulb, Trophy, Link2, X } from "lucide-react";
import { useCommunityStore, type PostType } from "@/lib/store/communityStore";
import { useLocale } from "@/components/LocaleProvider";

const postTypeButtons: { type: PostType; icon: typeof HelpCircle; labelKey: string; color: string }[] = [
  { type: "question", icon: HelpCircle, labelKey: "community.askQuestion", color: "text-primary" },
  { type: "discussion", icon: Lightbulb, labelKey: "community.shareTip", color: "text-warning" },
  { type: "achievement", icon: Trophy, labelKey: "community.shareAchievement", color: "text-success" },
  { type: "resource", icon: Link2, labelKey: "community.shareResource", color: "text-blue-400" },
];

export default function ComposePost() {
  const { t } = useLocale();
  const userName = useCommunityStore((s) => s.userName);
  const createPost = useCommunityStore((s) => s.createPost);

  const [open, setOpen] = useState(false);
  const [postType, setPostType] = useState<PostType>("discussion");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function openWith(type: PostType) {
    setPostType(type);
    setOpen(true);
  }

  async function submit() {
    if (!title.trim()) return;
    setSubmitting(true);
    await createPost({ postType, title: title.trim(), body: body.trim() });
    setSubmitting(false);
    setTitle("");
    setBody("");
    setOpen(false);
  }

  return (
    <div className="rounded-2xl border border-border-soft bg-panel p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-sm font-bold text-primary">
          {userName ? userName.charAt(0).toUpperCase() : "?"}
        </div>
        <button
          onClick={() => setOpen(true)}
          className="w-full rounded-lg border border-border-soft bg-panel-alt px-4 py-2.5 text-left text-sm text-text-faint hover:border-primary/40"
        >
          {t("community.composePlaceholder")}
        </button>
      </div>

      {open && (
        <div className="mt-4 space-y-3 border-t border-border-soft pt-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-text-faint">{t(postTypeButtons.find((b) => b.type === postType)!.labelKey)}</p>
            <button onClick={() => setOpen(false)} className="text-text-faint hover:text-text">
              <X size={16} />
            </button>
          </div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t("community.titlePlaceholder")}
            className="w-full rounded-lg border border-border-soft bg-panel-alt px-3 py-2.5 text-sm font-semibold text-text placeholder:text-text-faint focus:border-primary focus:outline-none"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={t("community.bodyPlaceholder")}
            rows={3}
            className="w-full resize-none rounded-lg border border-border-soft bg-panel-alt px-3 py-2.5 text-sm text-text placeholder:text-text-faint focus:border-primary focus:outline-none"
          />
          <button
            onClick={submit}
            disabled={!title.trim() || submitting}
            className="w-full rounded-lg bg-primary py-2.5 text-sm font-bold text-white disabled:opacity-40"
          >
            {t("community.publishCta")}
          </button>
        </div>
      )}

      {!open && (
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {postTypeButtons.map((b) => (
            <button
              key={b.type}
              onClick={() => openWith(b.type)}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-border-soft py-2 text-xs font-semibold text-text-muted hover:bg-panel-alt"
            >
              <b.icon size={14} className={b.color} />
              {t(b.labelKey)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
