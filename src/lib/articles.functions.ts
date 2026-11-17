import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";
import { requireAdmin } from "@/lib/comments.functions";

function createPublicReader(url: string, key: string) {
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
}

function getPublicReader() {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) throw new Error("Article reading is unavailable.");
  return createPublicReader(url, key);
}

export const listPublishedArticles = createServerFn({ method: "GET" }).handler(async () => {
  const client = getPublicReader();
  const { data, error } = await client
    .from("articles")
    .select("id, title, slug, excerpt, category, created_at, published_at")
    .eq("is_published", true)
    .order("published_at", { ascending: false });
  if (error) throw new Error("Unable to load articles.");
  return data ?? [];
});

export const getPublishedArticle = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.object({ slug: z.string().min(1).max(180) }).parse(input))
  .handler(async ({ data }) => {
    const client = getPublicReader();
    const { data: article, error } = await client
      .from("articles")
      .select("id, title, slug, excerpt, content, category, created_at, published_at")
      .eq("slug", data.slug)
      .eq("is_published", true)
      .maybeSingle();
    if (error) throw new Error("Unable to load this article.");
    return article;
  });

export const adminListArticles = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("articles")
    .select("id, title, slug, excerpt, content, category, is_published, created_at, published_at")
    .order("updated_at", { ascending: false });
  if (error) throw new Error("Unable to load your articles.");
  return data ?? [];
});

const articleInputSchema = z
  .object({
    id: z.string().uuid().optional(),
    title: z.string().trim().min(2).max(180),
    slug: z.string().trim().min(1).max(180).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    excerpt: z.string().trim().max(500),
    content: z.string().max(40000),
    category: z.string().trim().min(1).max(80),
    is_published: z.boolean(),
  })
  .superRefine((article, context) => {
    if (article.is_published && !article.content.trim()) {
      context.addIssue({ code: z.ZodIssueCode.custom, path: ["content"], message: "Add article text before publishing." });
    }
  });

export const adminSaveArticle = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => articleInputSchema.parse(input))
  .handler(async ({ data }) => {
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const articleFields = {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      category: data.category,
      is_published: data.is_published,
    };

    if (data.id) {
      let publishedAt: string | null = null;
      if (data.is_published) {
        const { data: existing, error: lookupError } = await supabaseAdmin
          .from("articles")
          .select("published_at")
          .eq("id", data.id)
          .maybeSingle();
        if (lookupError || !existing) throw new Error("This article could not be found.");
        publishedAt = existing.published_at ?? new Date().toISOString();
      }
      const { error } = await supabaseAdmin
        .from("articles")
        .update({ ...articleFields, published_at: publishedAt })
        .eq("id", data.id);
      if (error) {
        if (error.code === "23505") throw new Error("That article link is already in use.");
        throw new Error("Unable to save this article.");
      }
      return { id: data.id };
    }

    const { data: article, error } = await supabaseAdmin
      .from("articles")
      .insert({
        ...articleFields,
        published_at: data.is_published ? new Date().toISOString() : null,
      })
      .select("id")
      .single();
    if (error) {
      if (error.code === "23505") throw new Error("That article link is already in use.");
      throw new Error("Unable to save this article.");
    }
    return { id: article.id };
  });

export const adminSetArticlePublished = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid(), is_published: z.boolean() }).parse(input))
  .handler(async ({ data }) => {
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: existing, error: lookupError } = await supabaseAdmin
      .from("articles")
      .select("published_at")
      .eq("id", data.id)
      .maybeSingle();
    if (lookupError || !existing) throw new Error("This article could not be found.");
    const { error } = await supabaseAdmin
      .from("articles")
      .update({
        is_published: data.is_published,
        published_at: data.is_published ? existing.published_at ?? new Date().toISOString() : null,
      })
      .eq("id", data.id);
    if (error) throw new Error("Unable to update this article.");
    return { ok: true as const };
  });

export const adminDeleteArticle = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("articles").delete().eq("id", data.id);
    if (error) throw new Error("Unable to delete this article.");
    return { ok: true as const };
  });