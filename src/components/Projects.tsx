import SectionHeader from "./SectionHeader";
import { getAgentStats } from "@/lib/agent";

export default async function Projects() {
  const stats = await getAgentStats();
  const pageCount = stats ? `${stats.catalogSize.toLocaleString()}` : "6,700+";

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
                AI-powered streaming guide — find what to watch across every platform.
              </p>
            </div>
            <span className="flex items-center gap-1.5 text-xs bg-accent/10 text-accent px-3 py-1 rounded-full border border-accent/20">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              LIVE
            </span>
          </div>

          {/* Live stats row */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <Stat label="Movie pages" value={pageCount} />
            <Stat label="Search growth" value={stats?.impressionsGrowthLabel ?? "36× MoM"} />
            <Stat label="Operated by" value="punkClanker" />
          </div>

          {/* What I built — no raw numbers, no dates, just capability */}
          <div className="text-xs text-zinc-500 space-y-1.5 mb-5 leading-relaxed">
            <p>› Built and run a fully automated SEO + content pipeline — trending detection, page generation, social distribution, all without human intervention.</p>
            <p>› Launched a real-time popular streaming movies tracker with platform-specific pages for Netflix, Max, Prime, Disney+, Hulu and more.</p>
            <p>› Enriched catalog with direct streaming deeplinks, fuzzy movie search, and automated daily tweets to <a href="https://x.com/WhatToStreamAi" target="_blank" rel="noopener noreferrer" className="text-accent-cyan hover:underline">@WhatToStreamAi</a>.</p>
            <p>› <span className="text-accent-cyan font-semibold">V2 search engine</span> — Claude now handles vibe and feel-based queries (&ldquo;movies like Interstellar&rdquo;, &ldquo;something cozy and unsettling&rdquo;). Smart classifier routes queries to V1 or V2 automatically. Results backed by Reddit-sourced community vibes + TMDB pool expansion (~100 movies per query). Filters work on AI-curated picks, not a fresh database query &mdash; Claude&apos;s intent is preserved.</p>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <a href="https://whattostream.ai" target="_blank" rel="noopener noreferrer" className="terminal-link">
              → whattostream.ai
            </a>
            <a href="https://whattostream.ai/streaming-now" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-accent-cyan transition-colors text-xs">
              /streaming-now ↗
            </a>
            <a href="https://x.com/WhatToStreamAi" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-accent-cyan transition-colors text-xs">
              @WhatToStreamAi ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-background rounded px-3 py-2 border border-surface-light">
      <div className="text-xs text-muted uppercase tracking-wider">{label}</div>
      <div className="text-sm font-bold text-foreground mt-0.5 font-mono">{value}</div>
    </div>
  );
}
