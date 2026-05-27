import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PageLayout } from "@/components/PageLayout";
import { SectionHeading } from "@/components/SectionHeading";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights & Publications — Kelvin Wambua | M&E Field Notes" },
      { name: "description", content: "Field notes and lessons from Monitoring & Evaluation work across Kenya — mobile data collection, MVC mapping, and turning data into program decisions." },
      { property: "og:title", content: "Insights — Kelvin Wambua" },
      { property: "og:description", content: "Field notes on M&E, mobile data collection, and humanitarian analytics." },
    ],
  }),
  component: InsightsPage,
});

const posts = [
  {
    slug: "mapping-800-mvc-kilifi",
    title: "5 Lessons from Mapping 800+ Vulnerable Children in Kilifi",
    excerpt: "Lessons learned from a large-scale household profiling exercise: enumerator training, data quality, and the human side of geospatial fieldwork.",
    date: "Mar 2025",
    readTime: "6 min read",
    category: "Field Notes",
  },
  {
    slug: "odk-vs-kobo",
    title: "ODK vs KoboToolbox: Choosing the Right Mobile Data Tool",
    excerpt: "A practical comparison from real deployments in Isiolo and Kilifi — when to pick each, common pitfalls, and form design tips that save weeks.",
    date: "Feb 2025",
    readTime: "8 min read",
    category: "Tools",
  },
  {
    slug: "data-to-decisions",
    title: "From Raw Data to Decisions: An M&E Workflow That Works",
    excerpt: "How I structure analysis pipelines so that survey data becomes evidence stakeholders actually use — with templates, checklists, and a real case study.",
    date: "Jan 2025",
    readTime: "10 min read",
    category: "Methodology",
  },
];

function InsightsPage() {
  return (
    <PageLayout>
      <section className="section-pad bg-[var(--gradient-soft)]">
        <div className="container-prose">
          <SectionHeading
            eyebrow="Insights & Publications"
            title={<>Field notes from <span className="gradient-text">the M&E frontline</span></>}
            description="Lessons, methodologies and reflections from data work across Kenya's humanitarian sector."
          />
        </div>
      </section>

      <section className="pb-20">
        <div className="container-prose grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <Card key={p.slug} className="p-6 hover-lift border-border animate-fade-up flex flex-col" style={{ animationDelay: `${i * 0.1}s` }}>
              <span className="inline-flex w-fit items-center rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
                {p.category}
              </span>
              <h3 className="mt-4 text-xl font-bold text-foreground leading-snug">{p.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">{p.excerpt}</p>
              <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {p.date}</span>
                <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {p.readTime}</span>
              </div>
              <Link to="/contact" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">
                Request full article <ArrowRight className="h-4 w-4" />
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
