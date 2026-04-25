import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Database, MapPinned, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageLayout } from "@/components/PageLayout";
import { SectionHeading } from "@/components/SectionHeading";
import dataImg from "@/assets/data-analysis.jpg";
import fieldImg from "@/assets/fieldwork-1.jpg";
import landscape from "@/assets/isiolo-landscape.jpg";
import gotuIsiolo from "@/assets/gotu-isiolo-visionfund.jpg";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Kelvin Wambua | M&E & Data Analysis Portfolio" },
      { name: "description", content: "Selected M&E and data analysis projects: VisionFund Kenya loan distribution survey, MVC mapping in Kilifi, and ODK-based data collection systems." },
      { property: "og:title", content: "Projects — Kelvin Wambua" },
      { property: "og:description", content: "M&E and data projects across Kenya's humanitarian sector." },
      { property: "og:image", content: dataImg },
      { name: "twitter:image", content: dataImg },
    ],
  }),
  component: ProjectsPage,
});

const projects = [
  {
    icon: Database,
    title: "Loan Distribution Survey Analysis",
    client: "VisionFund Kenya · World Vision THRIVE",
    image: gotuIsiolo,
    description:
      "Spent an insightful field day in Gotu, Isiolo County conducting surveys and community data collection with Vision Fund Kenya, capturing rural perspectives on challenges, opportunities, and resilience.",
    tools: ["ODK Collect", "Excel", "R", "Power BI"],
    outcomes: [
      "Engaged community members in Gotu, Isiolo County",
      "Identified 3 program adjustments adopted by management",
      "Translated field insights into data-driven decision-making",
    ],
  },
  {
    icon: MapPinned,
    title: "MVC Mapping Project — Kilifi",
    client: "World Vision Kenya",
    image: landscape,
    description:
      "Coordinated geospatial mapping and household profiling of Most Vulnerable Children (MVC) to inform child-focused programming and case management in coastal Kilifi.",
    tools: ["KoboToolbox", "GPS Mapping", "QGIS", "Excel"],
    outcomes: [
      "Mapped 800+ MVC households",
      "Built case-management ready dataset",
      "Strengthened referral pathways with local partners",
    ],
  },
  {
    icon: Smartphone,
    title: "ODK Data Collection Systems",
    client: "Multi-project deployments",
    image: fieldImg,
    description:
      "Designed and deployed end-to-end mobile data collection workflows — from form logic and skip patterns to enumerator training and real-time data quality checks.",
    tools: ["ODK Collect", "KoboToolbox", "XLSForm", "Google Sheets"],
    outcomes: [
      "Cut survey turnaround time by 60%",
      "Trained 25+ field enumerators",
      "Reduced data entry errors to <2%",
    ],
  },
];

function ProjectsPage() {
  return (
    <PageLayout>
      <section className="section-pad bg-[var(--gradient-soft)]">
        <div className="container-prose">
          <SectionHeading
            eyebrow="Selected Work"
            title={<>Projects that turned data into <span className="gradient-text">decisions</span></>}
            description="A selection of M&E and data analysis assignments delivered across Kenya's humanitarian and development sector."
          />
        </div>
      </section>

      <section className="pb-20">
        <div className="container-prose space-y-12">
          {projects.map((p, i) => (
            <Card
              key={p.title}
              className="overflow-hidden border-border hover-lift animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className={`grid lg:grid-cols-2 gap-0 ${i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""}`}>
                <div className="relative aspect-video lg:aspect-auto overflow-hidden">
                  <img src={p.image} alt={p.title} loading="lazy" width={1280} height={854} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                </div>
                <div className="p-8 md:p-10 flex flex-col">
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent">
                      <p.icon className="h-5 w-5" />
                    </div>
                    <p className="text-xs uppercase tracking-wider text-accent font-semibold">{p.client}</p>
                  </div>
                  <h3 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">{p.title}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{p.description}</p>

                  <div className="mt-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-foreground">Tools</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {p.tools.map((t) => (
                        <span key={t} className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-foreground">Outcomes</p>
                    <ul className="mt-2 space-y-1.5">
                      {p.outcomes.map((o) => (
                        <li key={o} className="flex gap-2 text-sm text-muted-foreground">
                          <ArrowUpRight className="h-4 w-4 shrink-0 text-accent" />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="section-pad bg-[var(--gradient-soft)]">
        <div className="container-prose text-center">
          <SectionHeading title={<>Have a project in mind?</>} description="I love working on data and M&E challenges across the humanitarian sector." />
          <div className="mt-8">
            <Button asChild size="lg">
              <Link to="/contact">Let's collaborate <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
