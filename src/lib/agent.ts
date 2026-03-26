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
    return res.json();
  } catch { return null; }
}

export async function getDailySummary(): Promise<DailySummary[]> {
  try {
    const res = await fetch(`${API}/agent/daily-summary`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    return res.json();
  } catch { return []; }
}

export async function getSprintLog(): Promise<SprintEntry[]> {
  try {
    const res = await fetch(`${API}/agent/sprint-log`, { next: { revalidate: 21600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.entries ?? [];
  } catch { return []; }
}
