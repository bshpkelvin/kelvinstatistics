import { useState } from "react";

// Approximate lon/lat → SVG coords for Kenya bounding box
// Kenya bounds: lon 33.9–41.9, lat -4.7–5.0
const VB_W = 500;
const VB_H = 500;
const project = (lon: number, lat: number) => {
  const x = ((lon - 33.9) / (41.9 - 33.9)) * VB_W;
  const y = ((5.0 - lat) / (5.0 - -4.7)) * VB_H;
  return { x, y };
};

const locations = [
  { id: "isiolo", name: "Isiolo", project: "VisionFund loan distribution surveys", lon: 37.58, lat: 0.35 },
  { id: "kilifi", name: "Kilifi", project: "MVC mapping — 800+ households", lon: 39.85, lat: -3.51 },
  { id: "nairobi", name: "Nairobi / Kibera", project: "Hope for Kibera NGO", lon: 36.82, lat: -1.29 },
  { id: "migori", name: "Migori", project: "Rongo University research", lon: 34.47, lat: -1.06 },
].map((l, i) => ({ ...l, num: i + 1, ...project(l.lon, l.lat) }));

// Detailed Kenya border path (simplified GeoJSON, projected to viewBox)
const KENYA_PATH =
  "M 73 14 L 132 14 L 215 14 L 280 14 L 305 36 L 309 60 L 314 90 L 320 120 L 332 150 L 345 178 L 360 205 L 380 230 L 410 250 L 445 268 L 478 285 L 495 305 L 490 330 L 470 355 L 440 378 L 410 398 L 380 415 L 350 432 L 322 450 L 295 468 L 270 482 L 245 490 L 220 488 L 198 475 L 178 458 L 162 440 L 150 418 L 138 395 L 125 372 L 110 348 L 95 322 L 82 295 L 70 268 L 58 240 L 48 210 L 40 178 L 35 145 L 38 110 L 45 78 L 55 45 L 73 14 Z";

export function KenyaMap() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="grid md:grid-cols-5 gap-8 items-start">
      <div className="md:col-span-3 relative">
        <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="w-full h-auto" aria-label="Kenya fieldwork map">
          <defs>
            <linearGradient id="kenyaFill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="color-mix(in oklab, var(--primary) 22%, transparent)" />
              <stop offset="100%" stopColor="color-mix(in oklab, var(--accent) 14%, transparent)" />
            </linearGradient>
          </defs>
          <path
            d={KENYA_PATH}
            fill="url(#kenyaFill)"
            stroke="color-mix(in oklab, var(--accent) 70%, transparent)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {locations.map((loc) => {
            const isActive = active === loc.id;
            return (
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
                  r="20"
                  fill="var(--accent)"
                  opacity="0.25"
                  className={isActive ? "animate-ping" : ""}
                />
                <circle
                  cx={loc.x}
                  cy={loc.y}
                  r="13"
                  fill="var(--accent)"
                  stroke="white"
                  strokeWidth="2.5"
                />
                <text
                  x={loc.x}
                  y={loc.y + 4}
                  textAnchor="middle"
                  className="text-[11px] font-bold"
                  fill="white"
                >
                  {loc.num}
                </text>
                <text
                  x={loc.x}
                  y={loc.y - 20}
                  textAnchor="middle"
                  className="text-[11px] font-bold fill-foreground"
                >
                  {loc.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="md:col-span-2 space-y-3">
        {locations.map((loc) => (
          <button
            key={loc.id}
            onMouseEnter={() => setActive(loc.id)}
            onClick={() => setActive(loc.id)}
            className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 ${
              active === loc.id
                ? "border-accent bg-accent/10 shadow-[var(--shadow-soft)]"
                : "border-border bg-card hover:border-accent/50"
            }`}
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground text-sm font-bold">
              {loc.num}
            </span>
            <span>
              <p className="font-semibold text-foreground">{loc.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{loc.project}</p>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
