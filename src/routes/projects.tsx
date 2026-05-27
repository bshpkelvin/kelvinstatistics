import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ArrowUpRight, Camera, ChevronDown, Cross, Database, MapPinned, Radio, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PageLayout } from "@/components/PageLayout";
import { SectionHeading } from "@/components/SectionHeading";
import dataImg from "@/assets/data-analysis.jpg";
import fieldImg from "@/assets/fieldwork-1.jpg";
import landscape from "@/assets/isiolo-landscape.jpg";
import gotuIsiolo from "@/assets/gotu-isiolo-visionfund.jpg";
import faithPurposeMedia from "@/assets/faith-purpose-media-production.png";

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

type Category = "All" | "M&E" | "Data Analysis" | "Community" | "Media";

const projects: Array<{
  icon: typeof Database;
  title: string;
  client: string;
  image: string;
  description: string;
  tools: string[];
  outcomes: string[];
  category: Exclude<Category, "All">;
}> = [
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
    category: "Data Analysis",
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
    category: "M&E",
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
    category: "M&E",
  },
];

const categories: Category[] = ["All", "M&E", "Data Analysis", "Community", "Media"];

function ProjectsPage() {
  const [isFaithOpen, setIsFaithOpen] = useState(false);
  const [isEncouragementOpen, setIsEncouragementOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered = activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);

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

      <section className="pb-20">
        <div className="container-prose">
          <div
            role="button"
            tabIndex={0}
            onClick={() => setIsFaithOpen((open) => !open)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setIsFaithOpen((open) => !open);
              }
            }}
            className="group relative block w-full overflow-hidden rounded-3xl border border-primary/15 bg-card/70 p-0 text-left shadow-[var(--shadow-elegant)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-expanded={isFaithOpen}
          >
            <div className="absolute inset-0 opacity-20">
              <img src={faithPurposeMedia} alt="" aria-hidden="true" className="h-full w-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(135deg,color-mix(in_oklab,var(--primary)_88%,transparent),color-mix(in_oklab,var(--primary-glow)_42%,transparent),color-mix(in_oklab,var(--background)_85%,transparent))]" />
            <div className="absolute right-8 top-8 h-32 w-px rotate-45 bg-primary-foreground/35 blur-[1px]" />
            <div className="absolute right-4 top-20 h-px w-36 -rotate-12 bg-primary-foreground/25 blur-[1px]" />
            <div className="absolute left-8 top-8 hidden h-24 w-24 place-items-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground md:grid animate-float">
              <Cross className="h-10 w-10" />
            </div>

            <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:p-10">
              <div className="flex min-h-[220px] flex-col justify-between rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 p-5 backdrop-blur-md">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground">
                    <Radio className="h-3.5 w-3.5" /> Faith & Purpose
                  </div>
                  <h3 className="mt-5 text-3xl font-extrabold leading-tight text-primary-foreground md:text-4xl">
                    Serving Through Purpose
                  </h3>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3 text-primary-foreground/85">
                  <span className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/10 p-3 text-xs font-semibold">Streams</span>
                  <span className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/10 p-3 text-xs font-semibold">Cameras</span>
                  <span className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/10 p-3 text-xs font-semibold">Impact</span>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-primary-foreground/80">Media Production · Gospel Impact</p>
                    <blockquote className="mt-3 max-w-3xl text-xl font-bold leading-relaxed text-primary-foreground md:text-2xl">
                      “Go into all the world and preach the gospel to all creation.” – Mark 16:15
                    </blockquote>
                  </div>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground transition-transform duration-500 group-hover:scale-110">
                    <ChevronDown className={`h-5 w-5 transition-transform duration-500 ${isFaithOpen ? "rotate-180" : ""}`} />
                  </span>
                </div>

                <div className={`grid transition-all duration-500 ease-out ${isFaithOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <div className="mt-6 rounded-2xl border border-primary-foreground/15 bg-background/85 p-5 shadow-[var(--shadow-soft)] backdrop-blur-md">
                      <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                        <Camera className="h-4 w-4" /> Purpose-driven production
                      </div>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-base">
                        Through media and technology, we are able to reach lives beyond physical walls. Every stream, every camera angle, and every moment captured is an opportunity to share the message of hope, love, and salvation through Jesus Christ. This work is more than production—it is ministry. Let your gifts shine and be used for a greater purpose.
                      </p>
                      <Button
                        type="button"
                        className="mt-5 shadow-[var(--shadow-glow)] transition-transform duration-300 hover:scale-[1.02]"
                        onClick={(event) => {
                          event.stopPropagation();
                          setIsEncouragementOpen(true);
                        }}
                      >
                        Follow Christ Today
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={isEncouragementOpen} onOpenChange={setIsEncouragementOpen}>
        <DialogContent className="overflow-hidden border-primary/20 bg-background/95 shadow-[var(--shadow-glow)] backdrop-blur-xl sm:max-w-2xl">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_35%),radial-gradient(circle_at_bottom_right,color-mix(in_oklab,var(--primary-glow)_16%,transparent),transparent_38%)]" />
          <div className="pointer-events-none absolute right-12 top-10 h-28 w-px rotate-45 bg-primary/25 blur-[1px]" />
          <div className="pointer-events-none absolute right-4 top-24 h-px w-32 -rotate-12 bg-primary/20 blur-[1px]" />
          <DialogHeader className="relative">
            <DialogTitle className="text-2xl font-bold text-foreground">My Journey with God</DialogTitle>
            <DialogDescription className="space-y-4 pt-3 text-left text-sm leading-7 text-muted-foreground md:text-base">
              <span className="block">
                My journey is a testimony of God’s grace and guidance. From my education in Applied Statistics with Computing to my work in Monitoring & Evaluation and humanitarian service, every step has been ordered by God. Through opportunities at World Vision Kenya and the growth of Hope for Kibera, I have seen how God uses purpose to transform lives.
              </span>
              <span className="block">
                Serving in media at church has also shown me that ministry is not only on the pulpit—it is in the skills we use daily. God has been the foundation of everything I have achieved, opening doors, providing strength, and giving direction even in uncertain moments.
              </span>
              <span className="block">
                Everything I have accomplished is not by my own strength, but by God’s favor and purpose. My life is a reflection of His work, and my desire is to continue serving, impacting lives, and walking in His calling.
              </span>
              <span className="block rounded-2xl border border-primary/15 bg-primary/10 p-4 font-semibold text-foreground">
                Choose Christ today, and allow Him to guide your path and purpose.
              </span>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

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
