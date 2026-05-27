const orgs = [
  "World Vision Kenya",
  "VisionFund Kenya",
  "KCB Leadership Centre",
  "Rongo University",
  "THRIVE Project",
  "Hope for Kibera",
];

export function TrustedBy() {
  return (
    <section className="py-12 border-y border-border bg-card/40">
      <div className="container-prose">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Trusted by organizations across Kenya
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {orgs.map((o) => (
            <span
              key={o}
              className="text-sm md:text-base font-semibold text-foreground/60 hover:text-foreground transition-colors"
            >
              {o}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
