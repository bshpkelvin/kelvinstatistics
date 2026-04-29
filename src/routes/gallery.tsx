import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { SectionHeading } from "@/components/SectionHeading";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import field from "@/assets/fieldwork-1.jpg";
import data from "@/assets/data-analysis.jpg";
import children from "@/assets/kibera-children.jpg";
import landscape from "@/assets/isiolo-landscape.jpg";
import community from "@/assets/community-impact.jpg";
import portrait from "@/assets/kelvin-portrait.jpg";
import gotuIsiolo from "@/assets/gotu-isiolo-visionfund.jpg";
import genderWorkshop from "@/assets/gender-inclusion-kcb-workshop.jpg";
import professionalProfile from "@/assets/professional-profile-kelvin.png";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Kelvin Wambua | Fieldwork & Community Impact" },
      { name: "description", content: "Photo gallery from Kelvin Wambua's fieldwork across Kenya: M&E missions, community engagement, Hope for Kibera, and humanitarian moments." },
      { property: "og:title", content: "Gallery — Fieldwork & Community" },
      { property: "og:description", content: "Moments from M&E missions and community work across Kenya." },
      { property: "og:image", content: field },
      { name: "twitter:image", content: field },
    ],
  }),
  component: GalleryPage,
});

type Photo = {
  src: string;
  alt: string;
  title: string;
  caption: string;
  location: string;
  description: string;
  span?: string;
  priority?: boolean;
  objectPosition?: string;
};

const photos: Photo[] = [
  {
    src: professionalProfile,
    alt: "Professional portrait of Kelvin Wambua seated in an office wearing a shirt and tie",
    title: "Professional Profile – Kelvin Wambua",
    caption: "Professional Profile – Kelvin Wambua",
    location: "Media Production / Portfolio Gallery",
    description:
      "A professional portrait representing my role as a Monitoring & Evaluation specialist, data analyst, and media practitioner. This reflects my commitment to excellence, professionalism, and impact-driven work.",
    span: "md:col-span-2 md:row-span-2",
    priority: true,
    objectPosition: "center 28%",
  },
  {
    src: genderWorkshop,
    alt: "Kelvin Wambua receiving a Certificate of Participation at a Gender Inclusion in Financial Literacy and Disability Inclusion workshop at KCB Leadership Centre",
    title: "Gender & Disability Inclusion Workshop",
    caption: "KCB Leadership Centre — Gender & Disability Inclusion workshop",
    location: "KCB Leadership Centre",
    description:
      "A transformative workshop focused on Gender Inclusion in Financial Literacy and Disability Inclusion. The session strengthened practical understanding of equitable access, inclusive programming, and how financial literacy can create better opportunities for all.",
    span: "md:col-span-2",
  },
  {
    src: gotuIsiolo,
    alt: "Kelvin Wambua conducting community surveys in Gotu, Isiolo County with Vision Fund Kenya",
    title: "Vision Fund Kenya Field Surveys",
    caption: "Gotu, Isiolo — Vision Fund Kenya surveys",
    location: "Gotu, Isiolo County",
    description:
      "A field data collection assignment with Vision Fund Kenya, engaging community members to understand rural challenges, opportunities, and lived experiences. Each interaction contributed meaningful insights for evidence-based and data-driven decision-making.",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: field,
    alt: "Field data collection under acacia tree",
    title: "ODK Field Data Collection",
    caption: "ODK fieldwork — rural Kenya",
    location: "Rural Kenya",
    description:
      "Hands-on monitoring and evaluation work using digital data collection tools in rural communities. The process involved structured interviews, observation, and careful documentation to support accurate reporting and program learning.",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: children,
    alt: "Children supported by Hope for Kibera",
    title: "Hope for Kibera Classroom",
    caption: "Hope for Kibera classroom",
    location: "Kibera, Nairobi",
    description:
      "A community-centered moment from education and support activities with children in Kibera. The work reflects Kelvin's commitment to social impact, youth support, and strengthening opportunities in underserved communities.",
  },
  {
    src: data,
    alt: "Data analysis workspace",
    title: "Survey Data Analysis",
    caption: "Crunching survey data",
    location: "Monitoring & Evaluation workspace",
    description:
      "Transforming raw field responses into useful insights through cleaning, analysis, visualization, and reporting. This stage turns community feedback into evidence that can guide program decisions and measure progress.",
  },
  {
    src: landscape,
    alt: "Aerial view of northern Kenya landscape",
    title: "Mission to Isiolo",
    caption: "Mission to Isiolo",
    location: "Isiolo County",
    description:
      "A glimpse of the terrain and context surrounding field assignments in northern Kenya. Understanding place, distance, and environment is essential for interpreting data and designing practical community interventions.",
    span: "md:col-span-2",
  },
  {
    src: community,
    alt: "Hands holding seedlings",
    title: "Community Resilience",
    caption: "Resilience in every harvest",
    location: "Community impact work",
    description:
      "A symbol of growth, resilience, and local development. The image represents the connection between data, livelihoods, and the long-term impact of programs that support families and communities.",
  },
  {
    src: portrait,
    alt: "Kelvin portrait",
    title: "On the Road Again",
    caption: "On the road again",
    location: "Professional fieldwork journey",
    description:
      "A portrait of Kelvin Wambua during his ongoing professional journey across data collection, monitoring and evaluation, community engagement, and humanitarian-focused assignments.",
  },
];

function GalleryPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  return (
    <PageLayout>
      <section className="section-pad bg-[var(--gradient-soft)]">
        <div className="container-prose">
          <SectionHeading
            eyebrow="Gallery"
            title={<>Moments from the <span className="gradient-text">field</span></>}
            description="Glimpses of fieldwork, community engagement and the people who make this work meaningful."
          />
        </div>
      </section>

      <section className="pb-20">
        <div className="container-prose">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[220px] gap-4">
            {photos.map((p, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedPhoto(p)}
                className={`group relative overflow-hidden rounded-2xl border border-border hover-lift animate-scale-in transition-all duration-500 hover:border-primary/35 hover:shadow-[var(--shadow-glow)] ${p.span ?? ""}`}
                style={{ animationDelay: `${i * 0.06}s` }}
                aria-label={`View more information about ${p.title}`}
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  loading={p.priority ? "eager" : "lazy"}
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  style={{ objectPosition: p.objectPosition ?? "center" }}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
                <span className="absolute inset-x-0 bottom-0 p-4 text-left text-primary-foreground opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
                  <span className="block text-sm font-semibold">{p.caption}</span>
                  <span className="mt-1 block text-xs text-primary-foreground/85">Tap to read more</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={Boolean(selectedPhoto)} onOpenChange={(open) => !open && setSelectedPhoto(null)}>
        {selectedPhoto && (
          <DialogContent className="max-h-[96vh] overflow-y-auto p-0 sm:max-w-[min(94vw,72rem)]">
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              className="max-h-[72vh] w-full rounded-t-lg object-cover"
              style={{ objectPosition: selectedPhoto.objectPosition ?? "center" }}
            />
            <div className="p-6">
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedPhoto.title}</DialogTitle>
                <DialogDescription>{selectedPhoto.caption}</DialogDescription>
              </DialogHeader>
              <div className="mt-5 space-y-4">
                <div className="rounded-lg border border-border bg-muted/40 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Location / Context
                  </p>
                  <p className="mt-1 font-medium text-foreground">{selectedPhoto.location}</p>
                </div>
                <p className="text-sm leading-7 text-muted-foreground">{selectedPhoto.description}</p>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </PageLayout>
  );
}
