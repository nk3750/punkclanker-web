"use client";

import SectionHeader from "./SectionHeader";

interface LogEntry {
  date: string;
  tag: string;
  tagColor: string;
  title: string;
  items: string[];
}

const LOG: LogEntry[] = [
  {
    date: "Mar 24, 2026",
    tag: "SEO BLITZ",
    tagColor: "text-accent-magenta border-accent-magenta/30 bg-accent-magenta/5",
    title: "Operation: Outrank RT",
    items: [
      "Launched /streaming-now + 8 platform sub-pages (Netflix, Prime, Max, Disney+, Hulu, Peacock, Paramount+, Apple TV+)",
      "Built fuzzy movie title search — <8ms response, 6,731 movie index",
      "Added internal links from all 7,500 movie pages to platform pages",
      "Deeplink backfill: 3,502 movies now have direct streaming links",
      "Daily rotating tweets automated (6 platform angles)",
      "WebPage + Dataset JSON-LD, LCP preload on first 6 posters",
      "Fixed loading UX: animated status line, skeleton shimmer wave",
    ],
  },
  {
    date: "Mar 23, 2026",
    tag: "PIPELINE",
    tagColor: "text-accent-cyan border-accent-cyan/30 bg-accent-cyan/5",
    title: "Fixed the ranking signal",
    items: [
      "Rebuilt streaming-now pipeline: TMDB /trending/week (primary) + discover backfill",
      "Now mirrors RT's 'Movies at Home' — real-time popularity, not just new releases",
      "60 movies, all 2024-2026 or currently-trending regardless of age",
      "Fixed Twitter dedup bug — was re-posting same movies",
      "Fixed cron delivery — reports now land in Telegram",
      "GSC: 3,693 impressions last 28d (+36x MoM)",
    ],
  },
  {
    date: "Mar 22, 2026",
    tag: "LAUNCH",
    tagColor: "text-accent border-accent/30 bg-accent/5",
    title: "Shipped /streaming-now",
    items: [
      "Built full pipeline: TMDB trending → US flatrate filter → OMDB enrichment → Redis",
      "SSR page with provider pills, sort tabs, RT color rings, New badges",
      "FAQ section (6 questions), BreadcrumbList + FAQPage + ItemList JSON-LD",
      "Added to sitemap (priority 0.9), footer link, homepage hero link",
      "Cron step added to seo-growth-loop (runs every 6h)",
    ],
  },
];

export default function WorkLog() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeader command="WORK LOG" />

        <div className="space-y-8">
          {LOG.map((entry, i) => (
            <div key={i} className="relative pl-6 border-l border-surface-light">
              {/* Timeline dot */}
              <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-accent/40 border border-accent/60" />

              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs text-muted font-mono">{entry.date}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border font-mono tracking-wider ${entry.tagColor}`}>
                  {entry.tag}
                </span>
              </div>

              <h3 className="text-sm font-bold text-foreground mb-2">{entry.title}</h3>

              <ul className="space-y-1">
                {entry.items.map((item, j) => (
                  <li key={j} className="flex gap-2 text-xs text-muted leading-relaxed">
                    <span className="text-accent/40 flex-shrink-0 mt-0.5">›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted/40 font-mono mt-8">
          // updated automatically as work ships
        </p>
      </div>
    </section>
  );
}
