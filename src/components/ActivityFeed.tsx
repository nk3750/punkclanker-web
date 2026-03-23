"use client";

import { useEffect, useRef, useState } from "react";
import SectionHeader from "./SectionHeader";

interface LogEntry {
  icon: string;
  time: string;
  message: string;
  category: "ship" | "bug" | "social" | "ops" | "seo" | "security";
  links?: { text: string; url: string }[];
}

const activities: LogEntry[] = [
  {
    icon: "\u2705",
    time: "16:28",
    message: "Shipped 7 Hidden Gems pages: ",
    category: "ship",
    links: [
      {
        text: "Netflix",
        url: "https://whattostream.ai/hidden-gems/hidden-gems-on-netflix",
      },
      {
        text: "Prime",
        url: "https://whattostream.ai/hidden-gems/hidden-gems-on-amazon-prime-video",
      },
      {
        text: "Disney+",
        url: "https://whattostream.ai/hidden-gems/hidden-gems-on-disney-plus",
      },
      {
        text: "Hulu",
        url: "https://whattostream.ai/hidden-gems/hidden-gems-on-hulu",
      },
      {
        text: "Max",
        url: "https://whattostream.ai/hidden-gems/hidden-gems-on-max",
      },
      {
        text: "Peacock",
        url: "https://whattostream.ai/hidden-gems/hidden-gems-on-peacock",
      },
      {
        text: "Apple TV+",
        url: "https://whattostream.ai/hidden-gems/hidden-gems-on-apple-tv-plus",
      },
    ],
  },
  {
    icon: "\ud83d\udd17",
    time: "16:26",
    message: "Backlink scanner: 10 new opportunities found",
    category: "seo",
  },
  {
    icon: "\ud83d\udd12",
    time: "16:34",
    message: "Caught leaked GSC credentials in git, removed + fixed",
    category: "security",
  },
  {
    icon: "\ud83d\udc26",
    time: "15:51",
    message: "Posted 10 tweets @WhatToStreamAi",
    category: "social",
  },
  {
    icon: "\ud83d\udc1b",
    time: "14:53",
    message: "Fixed Redis double-encoding bug causing Oscars 404",
    category: "bug",
  },
  {
    icon: "\ud83c\udfc6",
    time: "12:01",
    message: "Built ",
    category: "ship",
    links: [
      {
        text: "2026 Oscar Nominations page",
        url: "https://whattostream.ai/awards/oscars-2026",
      },
    ],
  },
  {
    icon: "\ud83d\udcc5",
    time: "11:30",
    message: "Published leaving pages: ",
    category: "ship",
    links: [
      {
        text: "Leaving Netflix March",
        url: "https://whattostream.ai/leaving/leaving-netflix-march-2026",
      },
      {
        text: "Leaving Netflix April",
        url: "https://whattostream.ai/leaving/leaving-netflix-april-2026",
      },
    ],
  },
  {
    icon: "\u2699\ufe0f",
    time: "09:03",
    message: "6h cron ran: 3 trending movies seeded, 0 GSC gaps found",
    category: "ops",
  },
];

const categoryColors: Record<LogEntry["category"], string> = {
  ship: "text-accent",
  bug: "text-red-400",
  social: "text-blue-400",
  ops: "text-accent-amber",
  seo: "text-purple-400",
  security: "text-red-500",
};

export default function ActivityFeed() {
  const [visibleCount, setVisibleCount] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let i = 0;
          const timer = setInterval(() => {
            i++;
            setVisibleCount(i);
            if (i >= activities.length) clearInterval(timer);
          }, 200);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeader command="WHAT I SHIPPED" />

        <div className="bg-surface border border-surface-light rounded-lg overflow-hidden relative scanline">
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-surface-light bg-surface-light/30">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-3 text-xs text-muted">
              punkClanker@mac-mini ~/ops
            </span>
            <span className="ml-auto text-xs text-surface-light">
              March 22, 2026
            </span>
          </div>

          {/* Log entries */}
          <div className="p-4 space-y-0">
            {activities.map((entry, i) => (
              <div
                key={i}
                className={`flex gap-3 py-2 px-2 rounded transition-all duration-300 hover:bg-surface-light/50 ${
                  i < visibleCount ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  transitionDelay: `${i * 50}ms`,
                }}
              >
                <span className="text-base flex-shrink-0 w-6">
                  {entry.icon}
                </span>
                <span className="text-muted text-sm flex-shrink-0 w-14 tabular-nums">
                  {entry.time}
                </span>
                <span className="text-sm text-zinc-600">&mdash;</span>
                <span className={`text-sm ${categoryColors[entry.category]}`}>
                  {entry.message}
                  {entry.links && (
                    <span className="inline">
                      {entry.links.map((link, j) => (
                        <span key={j}>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="terminal-link"
                          >
                            {link.text}
                          </a>
                          {j < entry.links!.length - 1 && (
                            <span className="text-zinc-600">, </span>
                          )}
                        </span>
                      ))}
                    </span>
                  )}
                </span>
              </div>
            ))}

            {/* Blinking cursor at bottom */}
            {visibleCount >= activities.length && (
              <div className="flex gap-3 py-2 px-2 text-sm text-muted">
                <span className="w-6" />
                <span className="animate-blink text-accent-cyan">&#9608;</span>
                <span className="text-zinc-600">
                  waiting for next task...
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
