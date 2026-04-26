import { createFileRoute } from "@tanstack/react-router";
import { Award, Calendar, MapPin } from "lucide-react";
import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { SectionHeading } from "@/components/SectionHeading";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/certifications")({
  head: () => ({
    meta: [
      { title: "Certifications — Kelvin Wambua | Trainings & Workshops" },
      {
        name: "description",
        content:
          "Certifications, professional trainings, and workshops completed by Kelvin Wambua in Monitoring & Evaluation, inclusion, financial literacy, and data-driven development.",
      },
      { property: "og:title", content: "Certifications — Kelvin Wambua" },
      {
        property: "og:description",
        content: "Professional trainings and certificates supporting Kelvin Wambua's M&E and data work.",
      },
    ],
  }),
  component: CertificationsPage,
});

const certifications = [
  {
    title: "Gender Inclusion in Financial Literacy and Disability Inclusion",
    provider: "KCB Leadership Centre",
    period: "Certificate of Participation",
    location: "Nairobi, Kenya",
    details:
      "A transformative workshop focused on equitable access, disability inclusion, and gender-responsive financial literacy for inclusive community development.",
  },
] as const;

function CertificationsPage() {
  const [selectedCertificate, setSelectedCertificate] = useState<(typeof certifications)[number] | null>(null);

  return (
    <PageLayout>
      <section className="section-pad bg-[var(--gradient-soft)]">
        <div className="container-prose">
          <SectionHeading
            eyebrow="Certifications"
            title={<>Verified learning. <span className="gradient-text">Practical impact.</span></>}
            description="Professional trainings and workshops that strengthen my work in inclusive, evidence-led community programming."
          />
        </div>
      </section>

      <section className="pb-16">
        <div className="container-prose">
          <div className="mx-auto grid max-w-4xl gap-5">
            {certifications.map((certificate) => (
              <button
                key={certificate.title}
                type="button"
                onClick={() => setSelectedCertificate(certificate)}
                className="group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl"
              >
                <Card className="p-6 border-border hover-lift transition-colors group-hover:border-accent/50">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[var(--gradient-hero)] text-primary-foreground shadow-[var(--shadow-soft)]">
                      <Award className="h-6 w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {certificate.period}</span>
                        <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3 text-accent" /> {certificate.location}</span>
                      </div>
                      <h1 className="mt-3 text-xl font-bold text-foreground sm:text-2xl">{certificate.title}</h1>
                      <p className="mt-1 text-sm font-semibold text-accent">{certificate.provider}</p>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{certificate.details}</p>
                      <p className="mt-4 text-sm font-semibold text-primary">Click to view certificate status</p>
                    </div>
                  </div>
                </Card>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!selectedCertificate} onOpenChange={(open) => !open && setSelectedCertificate(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedCertificate?.title}</DialogTitle>
            <DialogDescription>{selectedCertificate?.provider}</DialogDescription>
          </DialogHeader>
          <div className="rounded-lg border border-accent/30 bg-accent/10 p-5 text-center">
            <Award className="mx-auto h-10 w-10 text-accent" />
            <p className="mt-3 text-lg font-bold text-foreground">Certificate available upon request</p>
          </div>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}