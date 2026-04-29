import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, Compass, GraduationCap, Heart, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageLayout } from "@/components/PageLayout";
import { SectionHeading } from "@/components/SectionHeading";
import portrait from "@/assets/professional-profile-kelvin.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Kelvin Wambua — M&E Specialist & Data Analyst" },
      { name: "description", content: "Learn about Kelvin Wambua's journey: Applied Statistics graduate from Rongo University, M&E officer with World Vision Kenya, and humanitarian leader." },
      { property: "og:title", content: "About Kelvin Wambua" },
      { property: "og:description", content: "M&E specialist passionate about data-driven humanitarian impact in Kenya." },
      { property: "og:image", content: portrait },
      { name: "twitter:image", content: portrait },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: Target, title: "Evidence First", text: "Every recommendation is grounded in clean, validated data and rigorous analysis." },
  { icon: Heart, title: "People-Centred", text: "Communities are partners, not subjects. Their dignity guides every interaction." },
  { icon: Compass, title: "Field Tested", text: "From Isiolo's plains to Kilifi's coast, my methods are forged by real-world fieldwork." },
  { icon: Award, title: "Impact Driven", text: "Measurement only matters if it improves programs and changes lives." },
];

function AboutPage() {
  return (
    <PageLayout>
      <section className="section-pad bg-[var(--gradient-soft)]">
        <div className="container-prose grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 animate-scale-in">
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-[var(--gradient-hero)] opacity-20 blur-2xl" />
              <img src={portrait} alt="Professional portrait of Kelvin Wambua" width={1086} height={1478} className="relative aspect-[4/5] w-full rounded-3xl border border-border object-cover object-[center_28%] shadow-[var(--shadow-elegant)]" />
            </div>
          </div>
          <div className="lg:col-span-7 animate-fade-up">
            <SectionHeading
              align="left"
              eyebrow="My Story"
              title={<>From statistics classrooms to <span className="gradient-text">community fields</span></>}
            />
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I grew up curious about how numbers tell the story of people — what they reveal, what they hide, and how
                they can be used to lift communities up. That curiosity became a calling.
              </p>
              <p>
                After completing my degree in <strong className="text-foreground">Applied Statistics with Computing at
                Rongo University</strong>, I joined the humanitarian sector with a mission: to make sure data
                serves people, not just reports.
              </p>
              <p>
                With <strong className="text-foreground">World Vision Kenya</strong> on the THRIVE Project, I led
                household surveys, mobile data collection with ODK, and analysis that informed how loans, training and
                resilience interventions reached families across Isiolo, Kilifi and beyond.
              </p>
              <p>
                Today, I split my time between professional M&E consulting and running
                <strong className="text-foreground"> Hope for Kibera</strong>, a community organization I founded that has
                supported 156+ children and mobilised over $10,000 in funding for education and basic needs.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/contact">Work with me <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/experience">See my experience</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-prose">
          <SectionHeading eyebrow="What I Stand For" title={<>Values that shape my <span className="gradient-text">practice</span></>} />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <Card key={v.title} className="p-6 hover-lift border-border animate-fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[var(--gradient-soft)]">
        <div className="container-prose">
          <SectionHeading eyebrow="Education" title="Academic Background" />
          <div className="mt-10 max-w-2xl mx-auto">
            <Card className="p-6 border-border hover-lift">
              <div className="flex gap-4">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[var(--gradient-hero)] text-primary-foreground">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-accent font-semibold">Bachelor's Degree</p>
                  <h3 className="mt-1 text-lg font-bold text-foreground">BSc Applied Statistics with Computing</h3>
                  <p className="text-sm text-muted-foreground">Rongo University, Kenya</p>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    Focused on statistical inference, computational methods, R/Python programming,
                    survey methodology, and applied research design.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
