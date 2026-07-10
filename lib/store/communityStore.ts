import { create } from "zustand";
import { supabase } from "@/lib/supabase/client";

export type PostType = "discussion" | "question" | "achievement" | "resource";

export type CommunityPost = {
  id: string;
  userId: string | null;
  postType: PostType;
  title: string;
  body: string;
  tags: string[];
  resourceUrl: string | null;
  resourceLabel: string | null;
  isResolved: boolean;
  isSample: boolean;
  sampleAuthorName: string | null;
  sampleAuthorRole: string | null;
  authorName: string;
  authorRole: string | null;
  likeCount: number;
  commentCount: number;
  likedByMe: boolean;
  createdAt: string;
};

export type CommunityComment = {
  id: string;
  postId: string;
  userId: string;
  authorName: string;
  body: string;
  createdAt: string;
};

type CommunityState = {
  userId: string | null;
  userName: string;
  posts: CommunityPost[];
  comments: Record<string, CommunityComment[]>; // postId -> comments
  loaded: boolean;

  load: (userId: string, userName: string) => Promise<void>;
  createPost: (input: { postType: PostType; title: string; body: string; tags?: string[] }) => Promise<void>;
  toggleLike: (postId: string) => Promise<void>;
  loadComments: (postId: string) => Promise<void>;
  addComment: (postId: string, body: string) => Promise<void>;
  reset: () => void;
};

export const useCommunityStore = create<CommunityState>((set, get) => ({
  userId: null,
  userName: "",
  posts: [],
  comments: {},
  loaded: false,

  load: async (userId: string, userName: string) => {
    const [{ data: posts }, { data: likes }, { data: profiles }] = await Promise.all([
      supabase.from("community_posts").select("*").order("created_at", { ascending: false }).limit(100),
      supabase.from("community_post_likes").select("post_id, user_id"),
      supabase.from("profiles").select("id, full_name"),
    ]);

    const nameByUserId = new Map((profiles ?? []).map((p) => [p.id, p.full_name as string]));
    const likeCountByPost = new Map<string, number>();
    const likedByMeSet = new Set<string>();
    for (const l of likes ?? []) {
      likeCountByPost.set(l.post_id, (likeCountByPost.get(l.post_id) ?? 0) + 1);
      if (l.user_id === userId) likedByMeSet.add(l.post_id);
    }

    // Comment counts fetched separately (lightweight count query per post
    // would be N+1; instead fetch all comments once and tally here).
    const { data: allComments } = await supabase.from("community_comments").select("post_id");
    const commentCountByPost = new Map<string, number>();
    for (const c of allComments ?? []) {
      commentCountByPost.set(c.post_id, (commentCountByPost.get(c.post_id) ?? 0) + 1);
    }

    const mapped: CommunityPost[] = (posts ?? []).map((p) => ({
      id: p.id,
      userId: p.user_id,
      postType: p.post_type,
      title: p.title,
      body: p.body,
      tags: p.tags ?? [],
      resourceUrl: p.resource_url,
      resourceLabel: p.resource_label,
      isResolved: p.is_resolved,
      isSample: p.is_sample,
      sampleAuthorName: p.sample_author_name,
      sampleAuthorRole: p.sample_author_role,
      authorName: p.is_sample ? (p.sample_author_name ?? "—") : (nameByUserId.get(p.user_id) ?? "—"),
      authorRole: p.is_sample ? p.sample_author_role : null,
      likeCount: p.is_sample ? p.sample_like_count : (likeCountByPost.get(p.id) ?? 0),
      commentCount: p.is_sample ? p.sample_comment_count : (commentCountByPost.get(p.id) ?? 0),
      likedByMe: likedByMeSet.has(p.id),
      createdAt: p.created_at,
    }));

    set({ userId, userName, posts: mapped, loaded: true });
  },

  createPost: async ({ postType, title, body, tags = [] }) => {
    const { userId } = get();
    if (!userId) return;
    const { data, error } = await supabase
      .from("community_posts")
      .insert({ user_id: userId, post_type: postType, title, body, tags, is_sample: false })
      .select("*")
      .single();
    if (error || !data) return;

    const newPost: CommunityPost = {
      id: data.id,
      userId: data.user_id,
      postType: data.post_type,
      title: data.title,
      body: data.body,
      tags: data.tags ?? [],
      resourceUrl: data.resource_url,
      resourceLabel: data.resource_label,
      isResolved: data.is_resolved,
      isSample: false,
      sampleAuthorName: null,
      sampleAuthorRole: null,
      authorName: get().userName,
      authorRole: null,
      likeCount: 0,
      commentCount: 0,
      likedByMe: false,
      createdAt: data.created_at,
    };
    set((s) => ({ posts: [newPost, ...s.posts] }));
  },

  toggleLike: async (postId: string) => {
    const { userId } = get();
    if (!userId) return;
    const post = get().posts.find((p) => p.id === postId);
    if (!post || post.isSample) return; // sample posts show a static count, not interactively likeable

    const nowLiked = !post.likedByMe;
    set((s) => ({
      posts: s.posts.map((p) =>
        p.id === postId ? { ...p, likedByMe: nowLiked, likeCount: p.likeCount + (nowLiked ? 1 : -1) } : p
      ),
    }));

    if (nowLiked) {
      await supabase.from("community_post_likes").insert({ post_id: postId, user_id: userId });
    } else {
      await supabase.from("community_post_likes").delete().eq("post_id", postId).eq("user_id", userId);
    }
  },

  loadComments: async (postId: string) => {
    const { data: comments } = await supabase
      .from("community_comments")
      .select("*")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    const userIds = Array.from(new Set((comments ?? []).map((c) => c.user_id)));
    const { data: profiles } = userIds.length
      ? await supabase.from("profiles").select("id, full_name").in("id", userIds)
      : { data: [] };
    const nameByUserId = new Map((profiles ?? []).map((p) => [p.id, p.full_name as string]));

    const mapped: CommunityComment[] = (comments ?? []).map((c) => ({
      id: c.id,
      postId: c.post_id,
      userId: c.user_id,
      authorName: nameByUserId.get(c.user_id) ?? "—",
      body: c.body,
      createdAt: c.created_at,
    }));

    set((s) => ({ comments: { ...s.comments, [postId]: mapped } }));
  },

  addComment: async (postId: string, body: string) => {
    const { userId, userName } = get();
    if (!userId) return;
    const { data, error } = await supabase
      .from("community_comments")
      .insert({ post_id: postId, user_id: userId, body })
      .select("*")
      .single();
    if (error || !data) return;

    const newComment: CommunityComment = {
      id: data.id,
      postId: data.post_id,
      userId: data.user_id,
      authorName: userName,
      body: data.body,
      createdAt: data.created_at,
    };
    set((s) => ({
      comments: { ...s.comments, [postId]: [...(s.comments[postId] ?? []), newComment] },
      posts: s.posts.map((p) => (p.id === postId ? { ...p, commentCount: p.commentCount + 1 } : p)),
    }));
  },

  reset: () => set({ userId: null, userName: "", posts: [], comments: {}, loaded: false }),
}));
