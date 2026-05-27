import { useState } from "react";

const locations = [
  { id: "isiolo", name: "Isiolo", project: "VisionFund loan distribution surveys", x: 295, y: 175 },
  { id: "kilifi", name: "Kilifi", project: "MVC mapping — 800+ households", x: 365, y: 290 },
  { id: "nairobi", name: "Nairobi / Kibera", project: "Hope for Kibera NGO", x: 270, y: 250 },
  { id: "migori", name: "Migori", project: "Rongo University research", x: 165, y: 250 },
];

export function KenyaMap() {
  const [active, setActive] = useState<string | null>(null);
  const current = locations.find((l) => l.id === active);

  return (
    <div className="grid md:grid-cols-5 gap-8 items-center">
      <div className="md:col-span-3 relative">
        <svg viewBox="0 0 500 450" className="w-full h-auto" aria-label="Kenya fieldwork map">
          {/* Simplified Kenya outline */}
          <path
            d="M 80 140 L 120 110 L 200 100 L 280 95 L 360 105 L 420 130 L 430 200 L 410 260 L 390 320 L 370 360 L 340 390 L 280 410 L 220 405 L 170 380 L 130 340 L 100 290 L 75 230 L 70 180 Z"
            fill="color-mix(in oklab, var(--primary) 12%, transparent)"
            stroke="color-mix(in oklab, var(--primary) 40%, transparent)"
            strokeWidth="2"
          />
          {locations.map((loc) => (
            <g
              key={loc.id}
              onMouseEnter={() => setActive(loc.id)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setActive(loc.id)}
              className="cursor-pointer"
            >
              <circle
                cx={loc.x}
                cy={loc.y}
                r="18"
                fill="var(--accent)"
                opacity="0.2"
                className={active === loc.id ? "animate-ping" : ""}
              />
              <circle cx={loc.x} cy={loc.y} r="8" fill="var(--accent)" stroke="white" strokeWidth="2" />
              <text
                x={loc.x}
                y={loc.y - 16}
                textAnchor="middle"
                className="text-xs font-bold fill-foreground"
              >
                {loc.name}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <div className="md:col-span-2 space-y-3">
        {locations.map((loc) => (
          <button
            key={loc.id}
            onMouseEnter={() => setActive(loc.id)}
            onClick={() => setActive(loc.id)}
            className={`w-full text-left p-4 rounded-xl border transition-all ${
              active === loc.id
                ? "border-accent bg-accent/10 shadow-[var(--shadow-soft)]"
                : "border-border bg-card hover:border-accent/50"
            }`}
          >
            <p className="font-semibold text-foreground">{loc.name}</p>
            <p className="text-xs text-muted-foreground mt-1">{loc.project}</p>
          </button>
        ))}
        {current && (
          <p className="text-xs text-accent font-medium">→ {current.project}</p>
        )}
      </div>
    </div>
  );
}
