import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { SectionHeading } from "@/components/SectionHeading";
import { listPublishedArticles } from "@/lib/articles.functions";

export const Route = createFileRoute("/insights/")({
  loader: () => listPublishedArticles(),
  head: () => ({
    meta: [
      { title: "Articles & Field Notes — Kelvin Wambua" },
      { name: "description", content: "Read articles by Kelvin Wambua on monitoring and evaluation, field research, data, and community impact in Kenya." },
      { property: "og:title", content: "Articles & Field Notes — Kelvin Wambua" },
      { property: "og:description", content: "Articles on monitoring and evaluation, field research, data, and community impact in Kenya." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  errorComponent: () => (
    <PageLayout>
      <section className="section-pad">
        <div className="container-prose max-w-3xl text-center text-muted-foreground">
          Articles are unavailable right now. Please try again later.
        </div>
      </section>
    </PageLayout>
  ),
  notFoundComponent: () => <p className="py-8 text-center text-muted-foreground">No articles found.</p>,
  component: InsightsIndexPage,
});

function InsightsIndexPage() {
  const articles = Route.useLoaderData();

  return (
    <>
      <section className="section-pad bg-[var(--gradient-soft)]">
        <div className="container-prose">
          <SectionHeading
            eyebrow="Articles & Field Notes"
            title={<>Ideas from the <span className="gradient-text">field</span></>}
            description="Writing on monitoring and evaluation, research, data, and community impact across Kenya."
          />
        </div>
      </section>
      <section className="pb-20">
        <div className="container-prose max-w-5xl">
          {articles.length === 0 ? (
            <div className="mx-auto max-w-xl border-y border-border py-12 text-center">
              <h2 className="text-2xl font-bold text-foreground">New writing is on its way</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">Articles and field notes will appear here as they are published.</p>
            </div>
          ) : (
            <ul className="divide-y divide-border border-y border-border">
              {articles.map((article) => {
                const publishedDate = article.published_at ?? article.created_at;
                return (
                  <li key={article.id} className="py-7 md:py-9">
                    <article className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-8">
                      <div>
                        <span className="text-xs font-semibold uppercase text-accent">{article.category}</span>
                        <h2 className="mt-2 text-2xl font-bold leading-snug text-foreground md:text-3xl">
                          <Link to="/insights/$slug" params={{ slug: article.slug }} className="transition-colors hover:text-primary">
                            {article.title}
                          </Link>
                        </h2>
                        {article.excerpt && <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">{article.excerpt}</p>}
                        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{new Intl.DateTimeFormat("en-KE", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(publishedDate))}</span>
                        </div>
                      </div>
                      <Link to="/insights/$slug" params={{ slug: article.slug }} aria-label={`Read ${article.title}`} className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary">
                        Read article <ArrowRight className="h-4 w-4" />
                      </Link>
                    </article>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}