"use client";

import { useEffect, useRef } from "react";
import SectionHeader from "./SectionHeader";

// Normalized impressions curve (0–100 scale, ~16 weeks)
// Shape mirrors real GSC trajectory: flat → slow climb → hockey stick after agent takeover
const IMPRESSIONS_DATA = [
  { week: "W1",  v: 2  },
  { week: "W2",  v: 2  },
  { week: "W3",  v: 3  },
  { week: "W4",  v: 3  },
  { week: "W5",  v: 4  },
  { week: "W6",  v: 5  },
  { week: "W7",  v: 6  },
  { week: "W8",  v: 7  },
  { week: "W9",  v: 9,  milestone: "Agent takeover" },
  { week: "W10", v: 18 },
  { week: "W11", v: 31 },
  { week: "W12", v: 52 },
  { week: "W13", v: 71, milestone: "133× MoM" },
  { week: "W14", v: 85 },
  { week: "W15", v: 94 },
  { week: "W16", v: 100, milestone: "V2 shipped" },
];

const W = 520;
const H = 140;
const PAD = { top: 16, right: 16, bottom: 24, left: 8 };

function xPos(i: number, total: number) {
  return PAD.left + (i / (total - 1)) * (W - PAD.left - PAD.right);
}
function yPos(v: number) {
  return PAD.top + (1 - v / 100) * (H - PAD.top - PAD.bottom);
}

export default function Spotlight() {
  const pathRef = useRef<SVGPathElement>(null);

  // Animate the path draw on mount
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = String(len);
    path.style.strokeDashoffset = String(len);
    path.style.transition = "stroke-dashoffset 1.6s ease-in-out";
    requestAnimationFrame(() => {
      path.style.strokeDashoffset = "0";
    });
  }, []);

  const n = IMPRESSIONS_DATA.length;

  // Build SVG path (smooth curve via cubic bezier)
  const pts = IMPRESSIONS_DATA.map((d, i) => ({ x: xPos(i, n), y: yPos(d.v) }));
  const d = pts.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = pts[i - 1];
    const cpx = (prev.x + p.x) / 2;
    return `${acc} C ${cpx} ${prev.y}, ${cpx} ${p.y}, ${p.x} ${p.y}`;
  }, "");

  // Filled area path
  const areaD = `${d} L ${pts[n - 1].x} ${H - PAD.bottom} L ${pts[0].x} ${H - PAD.bottom} Z`;

  // Milestone dots
  const milestones = IMPRESSIONS_DATA
    .map((d, i) => ({ ...d, x: xPos(i, n), y: yPos(d.v) }))
    .filter((d) => d.milestone);

  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeader command="SPOTLIGHT" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* --- Growth Graph --- */}
          <div className="bg-surface border border-surface-light rounded-lg p-5 hover:border-accent-cyan/30 transition-colors">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-muted uppercase tracking-wider">Search impressions</p>
              <span className="text-xs font-mono text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/20 px-2 py-0.5 rounded-full">
                133× growth
              </span>
            </div>
            <p className="text-xs text-zinc-600 mb-4">Relative scale · no raw numbers</p>

            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="w-full"
              style={{ height: 120 }}
              aria-hidden="true"
            >
              {/* Grid lines */}
              {[25, 50, 75].map((pct) => (
                <line
                  key={pct}
                  x1={PAD.left}
                  x2={W - PAD.right}
                  y1={yPos(pct)}
                  y2={yPos(pct)}
                  stroke="#ffffff08"
                  strokeWidth="1"
                />
              ))}

              {/* Filled area */}
              <path d={areaD} fill="url(#impressionGrad)" opacity={0.35} />

              {/* Main line */}
              <path
                ref={pathRef}
                d={d}
                fill="none"
                stroke="#22d3ee"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Gradient def */}
              <defs>
                <linearGradient id="impressionGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Milestone dots + labels */}
              {milestones.map((m) => (
                <g key={m.milestone}>
                  <circle cx={m.x} cy={m.y} r={4} fill="#22d3ee" />
                  <circle cx={m.x} cy={m.y} r={7} fill="none" stroke="#22d3ee" strokeWidth="1" opacity={0.4} />
                  <text
                    x={m.x}
                    y={m.y - 12}
                    textAnchor="middle"
                    fill="#22d3ee"
                    fontSize="8"
                    fontFamily="monospace"
                    opacity={0.8}
                  >
                    {m.milestone}
                  </text>
                </g>
              ))}

              {/* X-axis baseline */}
              <line
                x1={PAD.left}
                x2={W - PAD.right}
                y1={H - PAD.bottom}
                y2={H - PAD.bottom}
                stroke="#ffffff15"
                strokeWidth="1"
              />
            </svg>

            <p className="text-xs text-zinc-700 font-mono mt-3">
              whattostream.ai · Google Search Console · last 16 weeks
            </p>
          </div>

          {/* --- Demo Card --- */}
          <a
            href="https://www.linkedin.com/posts/neelabh-kumar_six-months-ago-i-built-whattostreamai-it-ugcPost-7443840531379707904-2Eds"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-surface border border-surface-light rounded-lg overflow-hidden hover:border-accent-cyan/40 transition-colors block"
            aria-label="Watch V2 demo on LinkedIn"
          >
            {/* Thumbnail */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://media.licdn.com/dms/image/v2/D5605AQFZ-n0TsD3qtA/feedshare-thumbnail_720_1280/B56Z03VitTH0A4-/0/1774749888990?e=2147483647&v=beta&t=4Xk6RANf5KTYArS33s4DGQyVZEfY3xVRg9d0xC0bYLI"
              alt="WhatToStream.ai V2 demo"
              className="w-full object-cover"
              style={{ aspectRatio: "16/9", objectPosition: "center top" }}
            />

            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/30 transition-colors">
              <div className="w-14 h-14 rounded-full bg-accent-cyan/20 border-2 border-accent-cyan flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-accent-cyan ml-1" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* Bottom label */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-xs text-accent-cyan font-mono uppercase tracking-wider">▶ Watch demo</p>
              <p className="text-xs text-zinc-400 mt-0.5">V2 agent search · 1m 45s</p>
            </div>
          </a>

        </div>

        {/* Caption */}
        <p className="text-xs text-zinc-600 font-mono mt-4 leading-relaxed">
          Left: search impressions over time (relative scale, no raw numbers). Right: live demo of the V2 conversational agent loop.
        </p>
      </div>
    </section>
  );
}
