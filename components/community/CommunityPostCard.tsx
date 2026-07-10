"use client";

import { useState } from "react";
import { Heart, MessageCircle, Bookmark, MoreHorizontal, FileText, Download } from "lucide-react";
import type { CommunityPost } from "@/lib/store/communityStore";
import { useCommunityStore } from "@/lib/store/communityStore";
import { useLocale } from "@/components/LocaleProvider";

function timeAgo(iso: string, locale: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const diffMin = Math.round(diffMs / 60000);
  if (diffMin < 60) return new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(-diffMin, "minute");
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(-diffHr, "hour");
  const diffDay = Math.round(diffHr / 24);
  return new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(-diffDay, "day");
}

export default function CommunityPostCard({ post }: { post: CommunityPost }) {
  const { t, locale } = useLocale();
  const toggleLike = useCommunityStore((s) => s.toggleLike);
  const loadComments = useCommunityStore((s) => s.loadComments);
  const addComment = useCommunityStore((s) => s.addComment);
  const comments = useCommunityStore((s) => s.comments[post.id]);

  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState("");

  async function openComments() {
    setShowComments((v) => !v);
    if (!showComments && !comments) {
      await loadComments(post.id);
    }
  }

  async function submitComment() {
    const body = commentInput.trim();
    if (!body || post.isSample) return;
    setCommentInput("");
    await addComment(post.id, body);
  }

  return (
    <div className="rounded-2xl border border-border-soft bg-panel p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-sm font-bold text-primary">
            {post.authorName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-bold text-text">{post.authorName}</p>
              {post.isSample && (
                <span className="rounded-full bg-warning/15 px-1.5 py-0.5 text-[9px] font-bold uppercase text-warning">
                  {t("community.sampleBadge")}
                </span>
              )}
            </div>
            <p className="text-xs text-text-faint">
              {post.authorRole ? `${post.authorRole} · ` : ""}
              {timeAgo(post.createdAt, locale)}
            </p>
          </div>
        </div>
        <button className="text-text-faint hover:text-text">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <h3 className="mt-3 font-bold text-text">{post.title}</h3>
      <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-text-muted">{post.body}</p>

      {post.resourceUrl && (
        <a
          href={post.resourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center gap-2 rounded-lg border border-border-soft bg-panel-alt p-3 text-sm text-text hover:border-primary/40"
        >
          <FileText size={16} className="text-primary" />
          <span className="flex-1 truncate">{post.resourceLabel ?? post.resourceUrl}</span>
          <Download size={14} className="text-text-faint" />
        </a>
      )}

      {post.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-panel-alt px-2 py-0.5 text-[11px] text-text-faint">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-3 flex items-center gap-4 border-t border-border-soft pt-3 text-sm text-text-faint">
        <button
          onClick={() => toggleLike(post.id)}
          disabled={post.isSample}
          className={`flex items-center gap-1.5 hover:text-danger disabled:cursor-not-allowed disabled:opacity-60 ${
            post.likedByMe ? "text-danger" : ""
          }`}
        >
          <Heart size={16} className={post.likedByMe ? "fill-danger" : ""} />
          {post.likeCount}
        </button>
        <button onClick={openComments} className="flex items-center gap-1.5 hover:text-text">
          <MessageCircle size={16} />
          {post.commentCount}
        </button>
        <button className="ml-auto hover:text-text">
          <Bookmark size={16} />
        </button>
      </div>

      {showComments && (
        <div className="mt-3 space-y-3 border-t border-border-soft pt-3">
          {post.isSample ? (
            <p className="text-xs text-text-faint">{t("community.sampleNoComments")}</p>
          ) : (
            <>
              {(comments ?? []).map((c) => (
                <div key={c.id} className="flex gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-panel-alt text-[11px] font-bold text-text-muted">
                    {c.authorName.charAt(0).toUpperCase()}
                  </div>
                  <div className="rounded-lg bg-panel-alt px-3 py-2 text-xs">
                    <p className="font-bold text-text">{c.authorName}</p>
                    <p className="mt-0.5 text-text-muted">{c.body}</p>
                  </div>
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && submitComment()}
                  placeholder={t("community.commentPlaceholder")}
                  className="w-full rounded-lg border border-border-soft bg-panel-alt px-3 py-2 text-xs text-text placeholder:text-text-faint focus:border-primary focus:outline-none"
                />
                <button
                  onClick={submitComment}
                  disabled={!commentInput.trim()}
                  className="rounded-lg bg-primary px-3 py-2 text-xs font-bold text-white disabled:opacity-40"
                >
                  {t("community.sendCta")}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
