import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, Database, FileSpreadsheet, Globe, LineChart, Map, Smartphone, TerminalSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PageLayout } from "@/components/PageLayout";
import { SectionHeading } from "@/components/SectionHeading";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "Tools & Tech Stack — Kelvin Wambua | M&E Toolkit" },
      { name: "description", content: "The data collection, analysis and visualization tools Kelvin Wambua uses for M&E and humanitarian research: ODK, KoboToolbox, R, SPSS, Power BI, Excel, QGIS." },
      { property: "og:title", content: "Tools & Tech Stack — Kelvin Wambua" },
      { property: "og:description", content: "Field-tested M&E and data analysis toolkit." },
    ],
  }),
  component: ToolsPage,
});

const tools = [
  { icon: Smartphone, name: "ODK Collect", category: "Data Collection", desc: "Mobile data collection with offline support and skip logic." },
  { icon: Smartphone, name: "KoboToolbox", category: "Data Collection", desc: "Form design, deployment and live data dashboards." },
  { icon: TerminalSquare, name: "R", category: "Statistical Analysis", desc: "Statistical modeling, regression, and reproducible reporting." },
  { icon: BarChart3, name: "SPSS", category: "Statistical Analysis", desc: "Survey analysis, descriptive and inferential statistics." },
  { icon: LineChart, name: "Power BI", category: "Visualization", desc: "Interactive dashboards for stakeholders and donors." },
  { icon: FileSpreadsheet, name: "Excel", category: "Analysis", desc: "Pivot tables, lookups, and rapid data cleaning." },
  { icon: Map, name: "QGIS", category: "Geospatial", desc: "GIS mapping, spatial analysis and household geo-coding." },
  { icon: Database, name: "XLSForm", category: "Form Design", desc: "Standardized form authoring for ODK / Kobo." },
  { icon: Globe, name: "Google Sheets", category: "Collaboration", desc: "Real-time field data collaboration and validation." },
];

const categories = Array.from(new Set(tools.map((t) => t.category)));

function ToolsPage() {
  return (
    <PageLayout>
      <section className="section-pad bg-[var(--gradient-soft)]">
        <div className="container-prose">
          <SectionHeading
            eyebrow="Toolkit"
            title={<>The stack behind <span className="gradient-text">measurable impact</span></>}
            description="Field-tested tools I use to collect, clean, analyze and visualize humanitarian data."
          />
        </div>
      </section>

      <section className="pb-20">
        <div className="container-prose space-y-12">
          {categories.map((cat) => (
            <div key={cat}>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4">{cat}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tools.filter((t) => t.category === cat).map((t) => (
                  <Card key={t.name} className="p-6 hover-lift border-border">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
                      <t.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-foreground">{t.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
