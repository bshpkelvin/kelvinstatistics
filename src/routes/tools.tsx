import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, Database, FileSpreadsheet, Globe, LineChart, Map, Smartphone, TerminalSquare, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
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

type Tool = {
  icon: typeof Smartphone;
  name: string;
  category: string;
  tagline: string;
  what: string;
  role: string;
  projects: string[];
  skills: string[];
};

const tools: Tool[] = [
  {
    icon: Smartphone,
    name: "ODK Collect",
    category: "Data Collection",
    tagline: "Mobile-first, offline-capable data collection",
    what: "Open Data Kit (ODK) is an open-source suite for building survey forms, deploying them to Android devices, and aggregating responses — even in areas without internet connectivity.",
    role: "My primary field tool for structured household surveys. I designed XLSForms with skip logic, GPS capture and image attachments, trained enumerators to use ODK Collect offline, and synced data back to the server once connectivity was restored.",
    projects: ["Hope for Kibera child mapping (156+ children)", "World Vision Kenya household surveys"],
    skills: ["XLSForm authoring", "Skip logic & constraints", "GPS & media capture", "Enumerator training"],
  },
  {
    icon: Smartphone,
    name: "KoboToolbox",
    category: "Data Collection",
    tagline: "Humanitarian-grade form design & live dashboards",
    what: "KoboToolbox is a free, humanitarian-focused platform (developed with the Harvard Humanitarian Initiative) for building forms, deploying them to field teams, and viewing live response dashboards.",
    role: "Used for rapid-deployment assessments where stakeholders needed live dashboards before fieldwork ended. I built multilingual forms, managed user roles, and exported clean datasets straight into R and Power BI.",
    projects: ["VisionFund Kenya client assessments", "Community baseline studies in Kilifi & Isiolo"],
    skills: ["Form deployment", "Multilingual surveys", "Live monitoring", "Data export pipelines"],
  },
  {
    icon: TerminalSquare,
    name: "R",
    category: "Statistical Analysis",
    tagline: "Reproducible statistics & reporting",
    what: "R is a programming language built for statistics, data manipulation and graphics, widely used in academic and humanitarian research.",
    role: "My go-to for any analysis that has to be defensible and reproducible — regression models, cross-tabs, weighted survey analysis, and R Markdown reports that regenerate the moment new data arrives.",
    projects: ["Impact evaluation regression models", "Reproducible donor reports"],
    skills: ["dplyr / tidyverse", "ggplot2", "Regression & hypothesis testing", "R Markdown reporting"],
  },
  {
    icon: BarChart3,
    name: "SPSS",
    category: "Statistical Analysis",
    tagline: "Classic survey & social science analytics",
    what: "IBM SPSS is a statistical software suite widely used in social science research for survey analysis, descriptive statistics, and inferential testing.",
    role: "Used during university research and consultancy work where SPSS was the required tool. I ran frequencies, cross-tabs, chi-square tests and reliability analysis for questionnaire validation.",
    projects: ["Rongo University research projects", "Questionnaire validation studies"],
    skills: ["Descriptive statistics", "Chi-square & t-tests", "Cronbach's alpha", "Data recoding"],
  },
  {
    icon: LineChart,
    name: "Power BI",
    category: "Visualization",
    tagline: "Stakeholder & donor dashboards",
    what: "Microsoft Power BI is a business analytics platform for building interactive dashboards and reports from multiple data sources.",
    role: "I turn raw monitoring data into dashboards that program managers and donors actually use — drill-downs by location, beneficiary type and time period, refreshed on a schedule from Kobo / Sheets.",
    projects: ["M&E dashboards for World Vision programs", "Hope for Kibera impact dashboard"],
    skills: ["DAX measures", "Data modeling", "Drill-through reports", "Scheduled refresh"],
  },
  {
    icon: FileSpreadsheet,
    name: "Excel",
    category: "Analysis",
    tagline: "Rapid cleaning, pivots & validation",
    what: "Microsoft Excel remains the universal spreadsheet tool for data cleaning, pivot analysis, and quick reporting across every team I work with.",
    role: "First stop for cleaning messy field exports — deduplication, pivot tables, VLOOKUP/XLOOKUP joins, conditional formatting for QA flags, and donor-ready summary tables.",
    projects: ["Data cleaning across every M&E project", "Budget tracking for Hope for Kibera"],
    skills: ["Pivot tables", "XLOOKUP / INDEX-MATCH", "Conditional formatting", "Data validation"],
  },
  {
    icon: Map,
    name: "QGIS",
    category: "Geospatial",
    tagline: "Mapping & spatial analysis",
    what: "QGIS is a free, open-source Geographic Information System for creating maps, analyzing spatial data, and visualizing geo-tagged datasets.",
    role: "Used to turn GPS coordinates from field surveys into maps that show where vulnerable households actually live — by ward, sub-county and proximity to services.",
    projects: ["Household geo-mapping in Kilifi", "Service-access analysis for NGO programs"],
    skills: ["Shapefile handling", "Choropleth maps", "Spatial joins", "Map layout & export"],
  },
  {
    icon: Database,
    name: "XLSForm",
    category: "Form Design",
    tagline: "Standardized form authoring",
    what: "XLSForm is a form standard that lets you author complex ODK/Kobo surveys in Excel — using rows for questions and columns for logic, constraints and translations.",
    role: "How I design every survey before it touches a phone. Multi-language labels, conditional sections, choice filters and validation rules — all version-controlled in a spreadsheet.",
    projects: ["All ODK & Kobo survey instruments"],
    skills: ["Choice filters", "Cascading selects", "Multi-language forms", "Validation constraints"],
  },
  {
    icon: Globe,
    name: "Google Sheets",
    category: "Collaboration",
    tagline: "Real-time team collaboration",
    what: "Google Sheets is a cloud spreadsheet that allows multiple users to edit, comment and validate data simultaneously in real time.",
    role: "Where field coordinators and I meet — daily enumerator tracking, shared QA logs, and quick pivots when stakeholders ask for numbers between formal reporting cycles.",
    projects: ["Field coordination for Hope for Kibera", "Shared QA logs across teams"],
    skills: ["QUERY & ARRAYFORMULA", "Importrange", "Shared validation workflows", "Apps Script basics"],
  },
];

const categories = Array.from(new Set(tools.map((t) => t.category)));

function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="text-left w-full group focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
          aria-label={`Open details for ${tool.name}`}
        >
          <Card className="p-6 hover-lift border-border h-full transition-all group-hover:border-primary/40 group-hover:shadow-[var(--shadow-soft)]">
            <div className="flex items-start justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
                <Icon className="h-6 w-6" />
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-foreground">{tool.name}</h3>
            <p className="mt-1 text-xs font-medium text-accent">{tool.tagline}</p>
            <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{tool.what}</p>
            <p className="mt-4 text-xs font-semibold text-primary inline-flex items-center gap-1">
              View role & projects <ArrowRight className="h-3 w-3" />
            </p>
          </Card>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <DialogTitle className="text-2xl">{tool.name}</DialogTitle>
              <DialogDescription className="text-accent font-medium">
                {tool.category} · {tool.tagline}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground mb-2">
              What it is
            </h4>
            <p className="text-sm text-foreground/90 leading-relaxed">{tool.what}</p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground mb-2">
              The role it played
            </h4>
            <p className="text-sm text-foreground/90 leading-relaxed">{tool.role}</p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground mb-2">
              Used in
            </h4>
            <ul className="space-y-1.5">
              {tool.projects.map((p) => (
                <li key={p} className="text-sm text-foreground/90 flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground mb-2">
              Key skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {tool.skills.map((s) => (
                <Badge key={s} variant="secondary" className="rounded-full">
                  {s}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ToolsPage() {
  return (
    <PageLayout>
      <section className="section-pad bg-[var(--gradient-soft)]">
        <div className="container-prose">
          <SectionHeading
            eyebrow="Toolkit"
            title={<>The stack behind <span className="gradient-text">measurable impact</span></>}
            description="Field-tested tools I use to collect, clean, analyze and visualize humanitarian data. Tap any tool to see what it is and the role it played in real projects."
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
                  <ToolCard key={t.name} tool={t} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
