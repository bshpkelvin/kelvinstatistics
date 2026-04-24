import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BookOpen, DollarSign, HandHeart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageLayout } from "@/components/PageLayout";
import { SectionHeading } from "@/components/SectionHeading";
import children from "@/assets/kibera-children.jpg";
import community from "@/assets/community-impact.jpg";

export const Route = createFileRoute("/ngo")({
  head: () => ({
    meta: [
      { title: "Hope for Kibera — Founded by Kelvin Wambua" },
      { name: "description", content: "Hope for Kibera is a community organisation founded by Kelvin Wambua supporting 156+ vulnerable children with education, meals and mentorship in Nairobi's Kibera." },
      { property: "og:title", content: "Hope for Kibera — Community Impact" },
      { property: "og:description", content: "156+ children supported. $10,000+ raised. Building hope, one child at a time." },
      { property: "og:image", content: children },
      { name: "twitter:image", content: children },
    ],
  }),
  component: NgoPage,
});

const impact = [
  { icon: Users, value: "156+", label: "Children Supported" },
  { icon: DollarSign, value: "$10K+", label: "Funds Mobilised" },
  { icon: BookOpen, value: "8", label: "Schools Partnered" },
  { icon: HandHeart, value: "30+", label: "Volunteers Engaged" },
];

function NgoPage() {
  return (
    <PageLayout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={children} alt="Children supported by Hope for Kibera" width={1280} height={854} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
        </div>
        <div className="relative container-prose py-24 md:py-32">
          <div className="max-w-2xl text-primary-foreground animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-3 py-1 text-xs font-semibold tracking-wide uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> NGO Founder
            </span>
            <h1 className="mt-5 text-4xl md:text-6xl font-extrabold leading-tight">Hope for Kibera</h1>
            <p className="mt-4 text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
              Building hope for vulnerable children in Nairobi — one school fee, one meal, one
              mentorship at a time.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" variant="secondary" asChild>
                <a href="#impact">View Impact <ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <a href="mailto:hope@kibera.org">Partner with Us</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="impact" className="section-pad">
        <div className="container-prose">
          <SectionHeading eyebrow="Our Impact" title={<>Real numbers. <span className="gradient-text">Real lives.</span></>} />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impact.map((s, i) => (
              <Card key={s.label} className="p-6 text-center hover-lift border-border animate-fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[var(--gradient-hero)] text-primary-foreground">
                  <s.icon className="h-6 w-6" />
                </div>
                <p className="mt-4 text-4xl font-extrabold text-foreground">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[var(--gradient-soft)]">
        <div className="container-prose grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <img src={community} alt="Community impact" width={1280} height={854} loading="lazy" className="rounded-3xl border border-border shadow-[var(--shadow-elegant)]" />
          </div>
          <div>
            <SectionHeading
              align="left"
              eyebrow="Our Mission"
              title={<>Education unlocks <span className="gradient-text">generational change</span></>}
            />
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Hope for Kibera was born from a simple belief: every child, regardless of their
                postcode, deserves the dignity of education and the chance to dream.
              </p>
              <p>
                Working in one of Africa's largest informal settlements, we partner with families,
                local schools and donors to keep vulnerable children in school. We provide tuition
                support, learning materials, weekly meals and structured mentorship.
              </p>
              <p>
                Every shilling and every hour is tracked through the same M&E discipline I bring to
                professional projects — because accountability is how trust is earned.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <a href="mailto:hope@kibera.org">Donate <ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
              <Button variant="outline" asChild>
                <a href="mailto:hope@kibera.org">Volunteer</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
