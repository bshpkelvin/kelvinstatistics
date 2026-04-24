import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase, Calendar, MapPin, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageLayout } from "@/components/PageLayout";
import { SectionHeading } from "@/components/SectionHeading";
import fieldImg from "@/assets/fieldwork-1.jpg";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Kelvin Wambua | World Vision Kenya, THRIVE Project" },
      { name: "description", content: "Professional experience of Kelvin Wambua: M&E officer with World Vision Kenya's THRIVE Project, ODK Collect data collection, VisionFund Kenya loan surveys, and fieldwork in Isiolo and Kilifi." },
      { property: "og:title", content: "Experience — Kelvin Wambua" },
      { property: "og:description", content: "M&E experience across humanitarian and development projects in Kenya." },
      { property: "og:image", content: fieldImg },
      { name: "twitter:image", content: fieldImg },
    ],
  }),
  component: ExperiencePage,
});

const roles = [
  {
    title: "Monitoring & Evaluation Officer",
    org: "World Vision Kenya — THRIVE Project",
    period: "2023 — Present",
    location: "Isiolo, Kilifi, Nairobi",
    points: [
      "Designed and deployed mobile data collection tools using ODK Collect across 5+ counties.",
      "Led household survey of 1,200+ VisionFund Kenya loan recipients to assess income resilience.",
      "Cleaned, analysed and visualised survey data informing program adaptation and donor reporting.",
      "Coordinated field enumerator teams in Isiolo and Kilifi during multi-week data collection cycles.",
      "Contributed to MVC mapping fieldwork supporting child-focused programming in Kilifi.",
    ],
  },
  {
    title: "Founder & Lead Coordinator",
    org: "Hope for Kibera",
    period: "2022 — Present",
    location: "Nairobi, Kenya",
    points: [
      "Founded community organisation supporting vulnerable children with school fees, meals and mentoring.",
      "Mobilised over $10,000 in donations and partnerships supporting 156+ children to date.",
      "Built simple M&E systems to track attendance, performance, and well-being indicators.",
    ],
  },
  {
    title: "Research Assistant — Statistics Department",
    org: "Rongo University",
    period: "2021 — 2022",
    location: "Migori, Kenya",
    points: [
      "Supported statistical analysis of student research projects using R and SPSS.",
      "Tutored undergraduates on survey design, sampling, and inferential statistics.",
    ],
  },
];

function ExperiencePage() {
  return (
    <PageLayout>
      <section className="section-pad bg-[var(--gradient-soft)]">
        <div className="container-prose">
          <SectionHeading
            eyebrow="Experience"
            title={<>Field-tested. <span className="gradient-text">Evidence-driven.</span></>}
            description="A timeline of roles where I've turned data into decisions and decisions into impact."
          />
        </div>
      </section>

      <section className="pb-16">
        <div className="container-prose">
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
            <div className="space-y-12">
              {roles.map((role, i) => (
                <div
                  key={role.title}
                  className={`relative flex flex-col md:flex-row gap-6 animate-fade-up ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  style={{ animationDelay: `${i * 0.12}s` }}
                >
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-6 grid h-8 w-8 place-items-center rounded-full bg-[var(--gradient-hero)] text-primary-foreground border-4 border-background shadow-[var(--shadow-soft)]">
                    <Briefcase className="h-3.5 w-3.5" />
                  </div>
                  <div className="md:w-1/2 pl-14 md:pl-0 md:px-8">
                    <Card className="p-6 hover-lift border-border">
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {role.period}</span>
                        <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3 text-accent" /> {role.location}</span>
                      </div>
                      <h3 className="mt-3 text-lg font-bold text-foreground">{role.title}</h3>
                      <p className="text-sm font-semibold text-accent">{role.org}</p>
                      <ul className="mt-4 space-y-2">
                        {role.points.map((p) => (
                          <li key={p} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[var(--gradient-soft)]">
        <div className="container-prose">
          <SectionHeading eyebrow="Testimonials" title={<>What collaborators <span className="gradient-text">say</span></>} />
          <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                quote:
                  "Kelvin brings both statistical rigour and a genuine field instinct. His data work consistently informed sharper program decisions.",
                name: "Program Manager",
                role: "World Vision Kenya",
              },
              {
                quote:
                  "Reliable, methodical, and deeply community-minded. Kelvin is the kind of M&E professional you want on every project.",
                name: "Field Supervisor",
                role: "THRIVE Project",
              },
            ].map((t, i) => (
              <Card key={i} className="p-7 hover-lift border-border animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <Quote className="h-6 w-6 text-accent" />
                <p className="mt-3 text-foreground/90 italic leading-relaxed">"{t.quote}"</p>
                <div className="mt-5 pt-5 border-t border-border">
                  <p className="font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild>
              <Link to="/projects">Explore my projects <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
