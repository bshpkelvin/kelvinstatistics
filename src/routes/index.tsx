import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Download, BarChart3, Database, Users, Sparkles, MapPin, Briefcase, GraduationCap, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageLayout } from "@/components/PageLayout";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { TrustedBy } from "@/components/TrustedBy";
import { KenyaMap } from "@/components/KenyaMap";
import portrait from "@/assets/kelvin-portrait.webp";
import dataImg from "@/assets/data-analysis.jpg";
import fieldImg from "@/assets/fieldwork-1.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kelvin Wambua — M&E Specialist & Data Analyst | Nairobi, Kenya" },
      { name: "description", content: "Portfolio of Kelvin Wambua — Monitoring & Evaluation specialist and data analyst transforming community data into measurable humanitarian impact across Kenya." },
      { property: "og:title", content: "Kelvin Wambua — Turning Data into Impact" },
      { property: "og:description", content: "M&E specialist, data analyst and humanitarian practitioner based in Nairobi." },
      { property: "og:image", content: portrait },
      { name: "twitter:image", content: portrait },
    ],
    links: [{ rel: "preload", as: "image", href: portrait, fetchPriority: "high" }],
  }),
  component: HomePage,
});

const stats = [
  { label: "Communities Reached", value: 20, suffix: "+", icon: MapPin },
  { label: "Surveys Conducted", value: 5000, suffix: "+", icon: BarChart3, formatK: true },
  { label: "Children Supported", value: 156, suffix: "+", icon: Heart },
  { label: "Funds Mobilized", value: 10, prefix: "$", suffix: "K+", icon: Sparkles },
];

const skillGroups = [
  {
    icon: Database,
    title: "Technical",
    color: "from-primary to-primary-glow",
    items: ["Data Analysis", "Statistical Modeling", "ODK Collect", "KoboToolbox", "Excel & Power BI", "Data Visualization"],
  },
  {
    icon: BarChart3,
    title: "M&E",
    color: "from-accent to-primary-glow",
    items: ["Survey Design", "Data Collection", "Impact Assessment", "Logframes", "Reporting", "Theory of Change"],
  },
  {
    icon: Users,
    title: "Soft Skills",
    color: "from-primary-glow to-accent",
    items: ["Communication", "Teamwork", "Problem-solving", "Field Coordination", "Leadership", "Adaptability"],
  },
];

function HomePage() {
  return (
    <PageLayout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-soft)]" />
        <div
          className="absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-30 blur-3xl"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div
          className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "var(--gradient-accent)" }}
        />
        <div className="relative container-prose pt-12 md:pt-20 pb-20 md:pb-28 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase text-accent">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              Available for Consulting
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] text-foreground">
              Hi, I'm <span className="gradient-text">Kelvin Wambua</span>.
            </h1>
            <p className="mt-5 text-lg md:text-xl text-foreground/80 font-medium max-w-2xl">
              Monitoring & Evaluation Specialist · Data Analyst · Humanitarian Practitioner
            </p>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Turning data into impact for resilient communities — one survey, one insight, one
              transformed life at a time.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="group">
                <Link to="/projects">
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">Contact Me</Link>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <a href="/cv-kelvin-wambua.pdf" download>
                  <Download className="mr-2 h-4 w-4" /> Download CV
                </a>
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl border border-border bg-card/50 backdrop-blur p-4 hover-lift">
                  <s.icon className="h-5 w-5 text-accent" />
                  <p className="mt-2 text-2xl font-bold text-foreground">
                    {s.formatK ? (
                      <>
                        <AnimatedCounter end={5} suffix="K+" />
                      </>
                    ) : (
                      <AnimatedCounter end={s.value as number} prefix={s.prefix} suffix={s.suffix} />
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 animate-scale-in">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-4 rounded-3xl bg-[var(--gradient-hero)] opacity-20 blur-2xl" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-elegant)]">
                <img
                  src={portrait}
                  alt="Kelvin Wambua, M&E specialist"
                  width={768}
                  height={1814}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-primary/90 to-transparent">
                  <p className="text-primary-foreground text-sm font-semibold">Kelvin Wambua</p>
                  <p className="text-primary-foreground/80 text-xs">Nairobi, Kenya</p>
                </div>
              </div>
              <div className="absolute -left-6 top-10 hidden md:block animate-float rounded-2xl border border-border bg-card p-3 shadow-[var(--shadow-soft)]">
                <BarChart3 className="h-5 w-5 text-accent" />
                <p className="mt-1 text-xs font-semibold">Real-time analytics</p>
              </div>
              <div className="absolute -right-6 bottom-20 hidden md:block animate-float rounded-2xl border border-border bg-card p-3 shadow-[var(--shadow-soft)]" style={{ animationDelay: "1.5s" }}>
                <Heart className="h-5 w-5 text-accent" />
                <p className="mt-1 text-xs font-semibold">Community first</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section-pad">
        <div className="container-prose grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1 animate-fade-up">
            <div className="relative">
              <img
                src={dataImg}
                alt="Data analysis workspace"
                width={1280}
                height={854}
                loading="lazy"
                className="rounded-2xl border border-border shadow-[var(--shadow-elegant)] hover-lift"
              />
              <div className="absolute -bottom-6 -right-6 hidden md:block bg-card border border-border rounded-2xl p-5 shadow-[var(--shadow-elegant)] max-w-xs">
                <GraduationCap className="h-6 w-6 text-accent" />
                <p className="mt-2 text-sm font-semibold text-foreground">BSc Applied Statistics with Computing</p>
                <p className="text-xs text-muted-foreground">Rongo University, Kenya</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2">
            <SectionHeading
              align="left"
              eyebrow="About Me"
              title={<>Data with purpose. <span className="gradient-text">People at the centre.</span></>}
            />
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm a Monitoring & Evaluation practitioner and data analyst with hands-on
                humanitarian experience across Kenya. My work spans survey design, mobile data
                collection, statistical analysis, and translating evidence into decisions that
                improve programs and lives.
              </p>
              <p>
                I hold a degree in <strong className="text-foreground">Applied Statistics with
                Computing</strong> from Rongo University and have served on the
                <strong className="text-foreground"> THRIVE Project with World Vision Kenya</strong>,
                conducting fieldwork in Isiolo, Kilifi and beyond. I'm passionate about data-driven
                decision-making, community resilience, and making evidence work for those who
                need it most.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-foreground"><Briefcase className="h-3 w-3 text-accent" /> 3+ yrs field experience</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-foreground"><MapPin className="h-3 w-3 text-accent" /> Nairobi, Kenya</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-foreground"><Heart className="h-3 w-3 text-accent" /> NGO Founder</span>
            </div>
            <div className="mt-8">
              <Button asChild>
                <Link to="/about">Read full story <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="section-pad bg-[var(--gradient-soft)]">
        <div className="container-prose">
          <SectionHeading
            eyebrow="Skills & Expertise"
            title={<>Built for <span className="gradient-text">measurable impact</span></>}
            description="A blend of statistical rigour, M&E craft, and human-centred fieldwork."
          />
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {skillGroups.map((g, i) => (
              <Card
                key={g.title}
                className="p-6 hover-lift border-border animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${g.color} text-primary-foreground`}>
                  <g.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-foreground">{g.title}</h3>
                <ul className="mt-4 space-y-2">
                  {g.items.map((it) => (
                    <li key={it} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {it}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad">
        <div className="container-prose">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-[var(--gradient-hero)] p-10 md:p-16">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${fieldImg})`, backgroundSize: "cover", backgroundPosition: "center" }} />
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-primary-foreground">Let's build evidence that drives change.</h3>
                <p className="mt-4 text-primary-foreground/85">
                  Available for M&E consulting, data analysis projects, and humanitarian collaborations.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <Button asChild size="lg" variant="secondary">
                  <Link to="/contact">Start a Project</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <Link to="/ngo">Support My NGO</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
