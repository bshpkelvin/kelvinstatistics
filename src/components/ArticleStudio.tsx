import { useCallback, useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { FilePlus2, Loader2, Pencil, Send, Eye, EyeOff, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  adminDeleteArticle,
  adminListArticles,
  adminSaveArticle,
  adminSetArticlePublished,
} from "@/lib/articles.functions";

type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  is_published: boolean;
  created_at: string;
  published_at: string | null;
};

type EditorValues = Omit<Article, "id" | "created_at" | "published_at"> & { id?: string };

const emptyArticle: EditorValues = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "Field Notes",
  is_published: false,
};

function makeSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function ArticleStudio() {
  const list = useServerFn(adminListArticles);
  const save = useServerFn(adminSaveArticle);
  const setPublished = useServerFn(adminSetArticlePublished);
  const remove = useServerFn(adminDeleteArticle);
  const [articles, setArticles] = useState<Article[]>([]);
  const [article, setArticle] = useState<EditorValues>(emptyArticle);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      setArticles((await list()) as Article[]);
    } catch {
      toast.error("Your articles could not be loaded.");
    } finally {
      setLoading(false);
    }
  }, [list]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const updateField = <K extends keyof EditorValues>(key: K, value: EditorValues[K]) => {
    setArticle((current) => ({ ...current, [key]: value }));
  };

  const startNew = () => setArticle({ ...emptyArticle });

  const startEdit = (item: Article) => {
    setArticle({
      id: item.id,
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt,
      content: item.content,
      category: item.category,
      is_published: item.is_published,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const saveArticle = async (isPublished: boolean) => {
    if (article.title.trim().length < 2) {
      toast.error("Add a title before saving.");
      return;
    }
    if (isPublished && !article.content.trim()) {
      toast.error("Add the article text before publishing.");
      return;
    }
    setSaving(true);
    try {
      await save({ data: { ...article, is_published: isPublished } });
      toast.success(isPublished ? "Article published." : "Draft saved.");
      startNew();
      await refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save this article.");
    } finally {
      setSaving(false);
    }
  };

  const togglePublished = async (item: Article) => {
    try {
      await setPublished({ data: { id: item.id, is_published: !item.is_published } });
      toast.success(item.is_published ? "Article moved to drafts." : "Article published.");
      await refresh();
    } catch {
      toast.error("Unable to update this article.");
    }
  };

  const deleteArticle = async (item: Article) => {
    if (!window.confirm(`Delete “${item.title}” permanently?`)) return;
    try {
      await remove({ data: { id: item.id } });
      if (article.id === item.id) startNew();
      toast.success("Article deleted.");
      await refresh();
    } catch {
      toast.error("Unable to delete this article.");
    }
  };

  return (
    <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(19rem,0.85fr)]">
      <section aria-labelledby="article-editor-title">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 id="article-editor-title" className="text-xl font-bold text-foreground">
              {article.id ? "Edit article" : "Write an article"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">Save a draft or publish it to your articles page.</p>
          </div>
          {article.id && (
            <Button type="button" variant="outline" size="sm" onClick={startNew}>
              <FilePlus2 className="mr-2 h-4 w-4" /> New
            </Button>
          )}
        </div>

        <Card className="mt-5 space-y-5 border-border p-5 sm:p-6">
          <div>
            <label htmlFor="article-title" className="text-sm font-medium text-foreground">Title</label>
            <Input
              id="article-title"
              className="mt-2"
              maxLength={180}
              placeholder="Give your article a clear title"
              value={article.title}
              onChange={(event) => {
                const title = event.target.value;
                setArticle((current) => ({
                  ...current,
                  title,
                  slug:
                    current.id || (current.slug && current.slug !== makeSlug(current.title))
                      ? current.slug
                      : makeSlug(title),
                }));
              }}
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="article-category" className="text-sm font-medium text-foreground">Category</label>
              <Input
                id="article-category"
                className="mt-2"
                maxLength={80}
                value={article.category}
                onChange={(event) => updateField("category", event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="article-slug" className="text-sm font-medium text-foreground">Article link</label>
              <Input
                id="article-slug"
                className="mt-2"
                maxLength={180}
                value={article.slug}
                onChange={(event) => updateField("slug", makeSlug(event.target.value))}
              />
            </div>
          </div>
          <div>
            <label htmlFor="article-excerpt" className="text-sm font-medium text-foreground">Short introduction</label>
            <Textarea
              id="article-excerpt"
              className="mt-2"
              rows={3}
              maxLength={500}
              placeholder="A brief introduction shown beside your article title"
              value={article.excerpt}
              onChange={(event) => updateField("excerpt", event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="article-content" className="text-sm font-medium text-foreground">Article text</label>
            <Textarea
              id="article-content"
              className="mt-2 min-h-72 leading-7"
              rows={14}
              maxLength={40000}
              placeholder="Write your article here. Separate paragraphs with a blank line."
              value={article.content}
              onChange={(event) => updateField("content", event.target.value)}
            />
            <p className="mt-2 text-right text-xs text-muted-foreground">{article.content.length} / 40,000</p>
          </div>
          <div className="flex flex-wrap gap-2 border-t border-border pt-5">
            <Button type="button" variant="outline" disabled={saving} onClick={() => saveArticle(false)}>
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Save draft
            </Button>
            <Button type="button" disabled={saving} onClick={() => saveArticle(true)}>
              <Send className="mr-2 h-4 w-4" /> Publish article
            </Button>
          </div>
        </Card>
      </section>

      <section aria-labelledby="article-list-title">
        <div>
          <h2 id="article-list-title" className="text-xl font-bold text-foreground">Your articles</h2>
          <p className="mt-1 text-sm text-muted-foreground">{articles.length} saved · {articles.filter((item) => item.is_published).length} published</p>
        </div>
        {loading ? (
          <p className="mt-5 text-sm text-muted-foreground">Loading articles…</p>
        ) : articles.length === 0 ? (
          <p className="mt-5 border-t border-border py-5 text-sm text-muted-foreground">Your first article will appear here.</p>
        ) : (
          <ul className="mt-5 divide-y divide-border border-y border-border">
            {articles.map((item) => (
              <li key={item.id} className="py-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-accent">{item.category}</span>
                    <h3 className="mt-1 break-words font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-1 break-all text-xs text-muted-foreground">/insights/{item.slug}</p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {item.is_published ? "Published" : "Draft"}
                  </span>
                </div>
                {item.excerpt && <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{item.excerpt}</p>}
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button type="button" size="sm" variant="outline" onClick={() => startEdit(item)}>
                    <Pencil className="mr-1.5 h-3.5 w-3.5" /> Edit
                  </Button>
                  <Button type="button" size="sm" variant="outline" onClick={() => togglePublished(item)}>
                    {item.is_published ? <EyeOff className="mr-1.5 h-3.5 w-3.5" /> : <Eye className="mr-1.5 h-3.5 w-3.5" />}
                    {item.is_published ? "Unpublish" : "Publish"}
                  </Button>
                  <Button type="button" size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => deleteArticle(item)}>
                    <Trash2 className="mr-1.5 h-3.5 w-3.5" /> Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}