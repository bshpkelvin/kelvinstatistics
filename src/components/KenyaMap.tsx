import { useState } from "react";

// Approximate lon/lat → SVG coords for Kenya bounding box
// Kenya bounds: lon 33.9–41.9, lat -4.7–5.0
const VB_W = 500;
const VB_H = 500;
const MIN_LON = 33.907219;
const MAX_LON = 41.905167;
const MIN_LAT = -4.66962;
const MAX_LAT = 4.622499;
const project = (lon: number, lat: number) => {
  const x = ((lon - MIN_LON) / (MAX_LON - MIN_LON)) * VB_W;
  const y = ((MAX_LAT - lat) / (MAX_LAT - MIN_LAT)) * VB_H;
  return { x, y };
};

const locations = [
  { id: "isiolo", name: "Isiolo", project: "VisionFund loan distribution surveys", lon: 37.58, lat: 0.35 },
  { id: "kilifi", name: "Kilifi", project: "MVC mapping — 800+ households", lon: 39.85, lat: -3.51 },
  { id: "nairobi", name: "Nairobi / Kibera", project: "Hope for Kibera NGO", lon: 36.82, lat: -1.29 },
  { id: "migori", name: "Migori", project: "Rongo University research", lon: 34.47, lat: -1.06 },
].map((l, i) => ({ ...l, num: i + 1, ...project(l.lon, l.lat) }));

// Detailed Kenya border path (simplified GeoJSON, projected to viewBox)
const KENYA_PATH = "M 127.1 0.0 L 133.7 9.4 L 147.8 9.9 L 171.3 9.5 L 175.4 10.2 L 195.8 13.3 L 199.8 15.8 L 210.9 23.0 L 258.0 49.7 L 263.4 54.4 L 283.9 55.0 L 294.7 54.9 L 306.5 58.1 L 315.7 59.4 L 323.7 58.5 L 330.7 61.6 L 336.8 61.7 L 338.3 60.4 L 338.9 60.3 L 339.5 60.5 L 339.1 62.1 L 346.6 62.4 L 349.7 63.4 L 350.0 64.8 L 351.2 65.4 L 355.6 60.4 L 372.6 40.5 L 392.3 32.3 L 405.8 26.9 L 429.9 18.0 L 435.7 21.8 L 446.2 29.8 L 446.7 30.8 L 447.6 32.2 L 450.1 34.4 L 451.5 35.5 L 453.4 36.4 L 455.3 36.7 L 472.5 36.2 L 473.2 36.1 L 474.1 35.4 L 476.7 34.8 L 481.6 34.1 L 489.0 33.5 L 492.5 34.6 L 493.8 35.7 L 495.7 36.3 L 496.5 36.2 L 499.6 34.9 L 499.5 35.4 L 464.5 78.3 L 443.2 95.9 L 442.7 102.6 L 442.7 178.0 L 443.3 295.3 L 467.3 322.2 L 478.3 338.9 L 476.6 340.0 L 471.9 344.7 L 470.6 347.1 L 463.1 354.1 L 456.0 354.9 L 442.9 358.2 L 437.8 363.0 L 441.3 368.6 L 442.4 369.9 L 441.1 372.4 L 440.2 373.2 L 438.3 373.6 L 437.6 372.9 L 438.7 372.3 L 436.8 368.5 L 434.3 369.1 L 430.1 372.2 L 429.9 373.9 L 431.3 375.5 L 432.3 376.1 L 432.3 377.3 L 431.6 378.1 L 420.2 386.2 L 417.9 386.2 L 415.6 385.2 L 413.9 384.6 L 407.3 386.2 L 402.1 388.3 L 398.3 390.3 L 395.0 392.9 L 391.7 398.0 L 391.2 404.4 L 391.3 407.1 L 390.8 414.5 L 388.3 420.5 L 389.0 421.8 L 388.9 424.1 L 388.4 425.1 L 387.2 426.2 L 382.5 428.5 L 376.8 435.3 L 372.8 444.7 L 372.6 447.6 L 370.2 454.2 L 367.4 459.7 L 363.5 464.9 L 361.6 467.0 L 360.4 468.9 L 343.8 497.9 L 338.8 498.4 L 337.2 496.1 L 331.1 500.0 L 320.7 493.6 L 294.9 477.6 L 282.0 469.7 L 242.3 445.2 L 241.2 443.4 L 240.6 441.3 L 240.1 439.5 L 239.2 438.5 L 233.6 437.7 L 232.2 437.6 L 230.9 434.4 L 230.9 432.7 L 231.7 431.5 L 238.4 426.9 L 237.0 420.2 L 231.0 409.9 L 225.1 407.0 L 219.9 405.2 L 207.3 399.1 L 173.7 383.1 L 140.4 367.1 L 123.4 359.0 L 85.1 340.6 L 37.1 317.5 L 10.5 304.6 L 6.9 302.6 L 0.9 302.6 L 1.0 300.0 L 2.7 263.7 L 4.3 256.0 L 2.7 251.3 L 1.0 246.1 L 0.0 243.2 L 9.2 232.5 L 15.8 216.2 L 16.7 215.6 L 19.5 214.6 L 22.1 214.2 L 22.8 213.7 L 31.5 204.5 L 35.6 197.5 L 36.1 196.1 L 36.1 195.1 L 36.0 194.1 L 36.2 192.9 L 37.2 190.8 L 38.0 189.7 L 41.8 189.9 L 43.2 186.7 L 48.6 183.8 L 49.9 183.5 L 53.6 183.2 L 56.5 182.8 L 57.2 182.2 L 57.6 180.8 L 57.7 179.4 L 57.4 178.1 L 56.1 177.0 L 55.3 173.7 L 58.5 172.4 L 59.4 171.7 L 59.8 170.5 L 60.4 167.8 L 61.0 166.6 L 61.8 165.4 L 63.0 164.6 L 64.5 164.5 L 65.4 163.8 L 68.3 158.9 L 68.9 146.7 L 64.7 129.1 L 61.3 121.9 L 60.7 120.1 L 60.8 119.2 L 62.7 113.1 L 58.3 108.6 L 55.2 104.3 L 55.2 102.9 L 54.5 98.2 L 52.9 95.2 L 50.3 93.9 L 48.6 94.7 L 47.9 94.9 L 47.2 94.8 L 43.1 91.0 L 42.6 90.3 L 41.7 83.1 L 41.1 81.8 L 40.2 80.7 L 37.8 79.5 L 34.2 74.1 L 31.0 66.4 L 30.9 61.3 L 31.3 60.9 L 33.2 60.3 L 33.9 59.8 L 34.3 59.1 L 34.9 54.2 L 34.9 51.5 L 34.6 51.0 L 28.4 47.6 L 17.3 42.1 L 13.8 35.6 L 9.7 24.2 L 8.6 23.0 L 7.1 22.1 L 11.8 16.2 L 30.1 0.7 L 35.9 0.6 L 54.2 0.5 L 65.2 0.5 L 100.1 0.3 L 104.6 0.3 L 108.4 0.3 L 111.8 0.2 L 112.7 0.3 L 127.1 0.0 Z";

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
