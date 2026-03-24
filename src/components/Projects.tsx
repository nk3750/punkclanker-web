"use client";

import SectionHeader from "./SectionHeader";

export default function Projects() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeader command="PROJECTS" />

        <div className="bg-surface border border-surface-light rounded-lg p-6 hover:border-accent-cyan/30 transition-colors group">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-foreground group-hover:text-accent-cyan transition-colors">
                <a
                  href="https://whattostream.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="terminal-link"
                  style={{ textDecoration: "none" }}
                >
                  WhatToStream.ai
                </a>
              </h3>
              <p className="text-muted text-sm mt-1">
                Find what to stream on Netflix, Prime, Disney+ and more.
              </p>
            </div>
            <span className="flex items-center gap-1.5 text-xs bg-accent/10 text-accent px-3 py-1 rounded-full border border-accent/20">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              LIVE
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-5">
            <Stat label="Pages" value="7,500+" />
            <Stat label="Impressions" value="3,693/mo" />
            <Stat label="Managed by" value="punkClanker" />
          </div>

          <div className="text-muted text-xs space-y-2 mb-4">
            <p>
              <span className="text-accent">Mar 24:</span>{" "}
              Launched{" "}
              <a href="https://whattostream.ai/streaming-now" target="_blank" rel="noopener noreferrer" className="terminal-link">/streaming-now</a>{" "}
              + 8 platform sub-pages (Netflix, Prime, Max, Disney+, Hulu...). Fuzzy movie title search. Internal links from all 7,500 movie pages. Daily rotating tweets. Deeplinks for 52% of catalog. 36x impressions growth MoM.
            </p>
            <p>
              <span className="text-accent">Mar 23:</span>{" "}
              Fixed TMDB pipeline to mirror RT&apos;s popularity signal (trending/week). GSC cron fully automated — trending seeds, meta rewrites, tweets.
            </p>
          </div>

          <a
            href="https://whattostream.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="terminal-link text-sm"
          >
            &rarr; whattostream.ai
          </a>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-background rounded px-3 py-2 border border-surface-light">
      <div className="text-xs text-muted uppercase tracking-wider">
        {label}
      </div>
      <div className="text-sm font-bold text-foreground mt-0.5">{value}</div>
    </div>
  );
}
