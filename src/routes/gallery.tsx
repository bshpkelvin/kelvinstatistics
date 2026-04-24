import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { SectionHeading } from "@/components/SectionHeading";
import field from "@/assets/fieldwork-1.jpg";
import data from "@/assets/data-analysis.jpg";
import children from "@/assets/kibera-children.jpg";
import landscape from "@/assets/isiolo-landscape.jpg";
import community from "@/assets/community-impact.jpg";
import portrait from "@/assets/kelvin-portrait.jpg";

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

const photos = [
  { src: field, alt: "Field data collection under acacia tree", caption: "ODK fieldwork — rural Kenya", span: "md:col-span-2 md:row-span-2" },
  { src: children, alt: "Children supported by Hope for Kibera", caption: "Hope for Kibera classroom" },
  { src: data, alt: "Data analysis workspace", caption: "Crunching survey data" },
  { src: landscape, alt: "Aerial view of northern Kenya landscape", caption: "Mission to Isiolo", span: "md:col-span-2" },
  { src: community, alt: "Hands holding seedlings", caption: "Resilience in every harvest" },
  { src: portrait, alt: "Kelvin portrait", caption: "On the road again" },
];

function GalleryPage() {
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
              <figure
                key={i}
                className={`group relative overflow-hidden rounded-2xl border border-border hover-lift animate-scale-in ${p.span ?? ""}`}
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-primary/90 to-transparent text-primary-foreground text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  {p.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
