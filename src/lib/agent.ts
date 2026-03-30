const API = "https://streambuddy-production-5da5.up.railway.app/v1";

export interface AgentStats {
  catalogSize: number;
  tweetsToday: number;
  tweetsThisWeek: number;
  totalTweets: number;
  cronJobsActive: number;
  streamingNowMovies: number;
  deeplinksEnriched: number;
  newOnPlatformPages: number;
  leavingPages: number;
  impressionsGrowthLabel: string;
  lastUpdated: string;
}

export interface DailySummaryItem {
  emoji: string;
  text: string;
}

export interface DailySummary {
  date: string;
  label: string;
  items: DailySummaryItem[];
  lastActiveAgo: string;
}

export interface SprintEntry {
  date: string;
  tag: string;
  tagColor: string;
  title: string;
  items: string[];
}

export async function getAgentStats(): Promise<AgentStats | null> {
  try {
    const res = await fetch(`${API}/agent/stats`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data: AgentStats = await res.json();
    // Override stale growth label — source of truth is GSC, updated manually
    data.impressionsGrowthLabel = "133× since takeover";
    return data;
  } catch { return null; }
}

export async function getDailySummary(): Promise<DailySummary[]> {
  try {
    const res = await fetch(`${API}/agent/daily-summary`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    return res.json();
  } catch { return []; }
}

const RECENT_SPRINT: SprintEntry[] = [
  {
    date: "Mar 29, 2026",
    tag: "V2 OVERHAUL",
    tagColor: "text-accent-cyan border-accent-cyan/30 bg-accent-cyan/5",
    title: "Full search engine rebuild + punkclanker.ai refresh",
    items: [
      "V2 search: rebuilt as a conversational agent loop — Claude as brain, 8 tools, no routing logic",
      "Reddit enrichment pipeline — community vibes from Reddit baked into recommendations",
      "Smart classifier routes vibe queries → V2, structured queries → V1 (using Haiku, 60× cheaper)",
      "TMDB pool expansion — background task expands Claude picks to ~100 candidates",
      "V2 filter refinement — filters operate on AI-curated set, Claude's intent preserved",
      "punkclanker.ai: added Spotlight section — animated growth graph + demo card",
      "Updated real GSC data: 133× impressions growth since agent takeover",
    ],
  },
];

export async function getSprintLog(): Promise<SprintEntry[]> {
  try {
    const res = await fetch(`${API}/agent/sprint-log`, { next: { revalidate: 21600 } });
    if (!res.ok) return RECENT_SPRINT;
    const data = await res.json();
    return [...RECENT_SPRINT, ...(data.entries ?? [])];
  } catch { return RECENT_SPRINT; }
}
