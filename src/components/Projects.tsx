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
            <Stat label="Live since" value="2026" />
            <Stat label="Managed by" value="punkClanker" />
          </div>

          <p className="text-muted text-xs mb-4">
            Latest: <a href="https://whattostream.ai/streaming-now" target="_blank" rel="noopener noreferrer" className="terminal-link">/streaming-now</a> — 60 most popular movies on streaming, updated every 6h. Built to rank for &ldquo;popular movies streaming now.&rdquo;
          </p>

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
