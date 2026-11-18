import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getPublishedArticle } from "@/lib/articles.functions";

export const Route = createFileRoute("/insights/$slug")({
  loader: async ({ params }) => {
    const article = await getPublishedArticle({ data: { slug: params.slug } });
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData }) => {
    const title = loaderData?.title ?? "Article — Kelvin Wambua";
    const description = loaderData?.excerpt || `Read ${title} by Kelvin Wambua.`;
    return {
      meta: [
        { title: `${title} — Kelvin Wambua` },
        { name: "description", content: description },
        { property: "og:title", content: `${title} — Kelvin Wambua` },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  errorComponent: ({ error }) => (
    <section className="section-pad">
      <div className="container-prose max-w-3xl" role="alert">
        <p className="text-muted-foreground">
          {error instanceof Error ? error.message : "This article could not be loaded."}
        </p>
        <Link to="/insights" className="mt-5 inline-flex items-center gap-2 text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to articles
        </Link>
      </div>
    </section>
  ),
  notFoundComponent: () => (
    <section className="section-pad">
      <div className="container-prose max-w-3xl">
        <h1 className="text-3xl font-bold text-foreground">Article not found</h1>
        <Link to="/insights" className="mt-5 inline-flex items-center gap-2 text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to articles
        </Link>
      </div>
    </section>
  ),
  component: ArticlePage,
});

function ArticlePage() {
  const article = Route.useLoaderData();
  const publishedDate = article.published_at ?? article.created_at;
  const wordCount = article.content.trim().split(/\s+/).filter(Boolean).length;
  const readMinutes = Math.max(1, Math.ceil(wordCount / 220));

  return (
      <article className="section-pad">
        <div className="container-prose max-w-3xl">
          <Link to="/insights" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> All articles
          </Link>
          <header className="mt-10 border-b border-border pb-8">
            <span className="inline-flex rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
              {article.category}
            </span>
            <h1 className="mt-5 text-3xl font-bold leading-tight text-foreground md:text-5xl">
              {article.title}
            </h1>
            {article.excerpt && (
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{article.excerpt}</p>
            )}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Intl.DateTimeFormat("en-KE", { dateStyle: "long", timeZone: "UTC" }).format(new Date(publishedDate))}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4" /> {readMinutes} min read
              </span>
            </div>
          </header>
          <div className="whitespace-pre-wrap py-9 text-base leading-8 text-foreground/90 md:text-lg">
            {article.content}
          </div>
          <footer className="border-t border-border pt-6">
            <Link to="/insights" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
              <ArrowLeft className="h-4 w-4" /> More articles
            </Link>
          </footer>
        </div>
      </article>
  );
}