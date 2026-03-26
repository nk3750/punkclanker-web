import Link from "next/link";
import SectionHeader from "./SectionHeader";

interface LogEntry {
  timestamp: string;
  action: string;
  count?: number;
  titles?: string[];
  catalogTotal?: number;
  summary: string;
  tweetId?: string;
  tweetUrl?: string;
}

interface DayLog {
  date: string;
  label: string;
  entries: LogEntry[];
}

function formatTime(timestamp: string): string {
  try {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit", minute: "2-digit", hour12: false,
      timeZone: "America/Los_Angeles",
    });
  } catch { return "--:--"; }
}

function humanize(entry: LogEntry): { icon: string; text: string; link?: string } {
  const { action, count, titles, summary } = entry;
  const n = count || 0;
  const title = titles?.[0];

  if (action === "tweet_posted") {
    const link = entry.tweetUrl || "https://x.com/WhatToStreamAi";
    return {
      icon: "🐦",
      text: title ? `Tweeted about ${title}` : "Posted to @WhatToStreamAi",
      link,
    };
  }
  if (action.includes("trending")) {
    if (n === 0) return { icon: "📈", text: "Checked trending — catalog up to date" };
    return { icon: "📈", text: `Spotted ${n} trending movie${n !== 1 ? "s" : ""} and added ${n !== 1 ? "them" : "it"} to the catalog` };
  }
  if (action === "movie_catalog_seeded" || action.includes("seed")) {
    if (n === 0) return { icon: "📄", text: "Catalog check — nothing new to add" };
    if (n === 1 && title) return { icon: "📄", text: `Added ${title} to the catalog` };
    return { icon: "📄", text: `Added ${n} movie${n !== 1 ? "s" : ""} to the catalog` };
  }
  if (action.includes("meta")) {
    if (n === 0) return { icon: "✏️", text: "Reviewed search metadata — no changes needed" };
    return { icon: "✏️", text: `Rewrote metadata on ${n} page${n !== 1 ? "s" : ""} to improve click-through` };
  }
  if (action.includes("list")) {
    if (n === 0) return { icon: "🎯", text: "Checked list pages" };
    return { icon: "🎯", text: `Built ${n} new genre × platform list page${n !== 1 ? "s" : ""}` };
  }
  if (action.includes("hidden_gem")) {
    if (n === 0) return { icon: "💎", text: "Hidden gems check complete" };
    return { icon: "💎", text: `Published hidden gems pages for ${n} platform${n !== 1 ? "s" : ""}` };
  }
  if (action.includes("leaving")) {
    return { icon: "⏳", text: "Updated leaving-soon pages with expiry dates" };
  }
  if (action.includes("new_on")) {
    return { icon: "🆕", text: "Updated 'new on streaming' pages across platforms" };
  }
  if (action.includes("award")) {
    return { icon: "🏆", text: "Refreshed awards and nominations pages" };
  }
  if (action.includes("collection")) {
    if (n === 0) return { icon: "🎭", text: "Collection pages checked" };
    return { icon: "🎭", text: `Built ${n} franchise and collection hub${n !== 1 ? "s" : ""}` };
  }
  if (action.includes("person")) {
    if (n === 0) return { icon: "🎬", text: "Person pages checked" };
    return { icon: "🎬", text: `Published ${n} actor/director filmography page${n !== 1 ? "s" : ""}` };
  }
  if (action.includes("dispatch")) {
    return { icon: "⚡", text: "Processed content pipeline and queued social posts" };
  }
  if (action.includes("streaming_now")) {
    return { icon: "🔥", text: "Refreshed popular streaming movies list" };
  }
  if (action.includes("deeplink")) {
    if (n === 0) return { icon: "🔗", text: "Deeplink check complete" };
    return { icon: "🔗", text: `Added direct watch links to ${n} movie page${n !== 1 ? "s" : ""}` };
  }
  // Fallback: clean up the raw summary
  if (summary) {
    return { icon: "⚙️", text: summary.charAt(0).toUpperCase() + summary.slice(1) };
  }
  return { icon: "⚙️", text: action.replace(/_/g, " ") };
}

async function getRecentActivity(): Promise<DayLog[]> {
  try {
    const res = await fetch(
      "https://streambuddy-production-5da5.up.railway.app/v1/growth/activity-log?days=3",
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.days ?? [];
  } catch { return []; }
}

export default async function ActivityFeed() {
  const days = await getRecentActivity();

  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <SectionHeader command="OPS LOG" />
          <Link href="/log" className="text-xs font-mono text-zinc-600 hover:text-accent-cyan transition-colors">
            full log →
          </Link>
        </div>

        {days.length === 0 ? (
          <p className="text-zinc-600 font-mono text-sm">No activity logged yet.</p>
        ) : (
          <div className="space-y-8">
            {days.map((day) => (
              <div key={day.date}>
                <p className="text-xs font-mono text-zinc-600 uppercase tracking-widest mb-3">
                  {day.label}
                </p>
                <div className="space-y-2.5">
                  {day.entries.slice(0, 6).map((entry, i) => {
                    const { icon, text, link } = humanize(entry);
                    return (
                      <div key={i} className="flex items-start gap-3 text-sm font-mono group">
                        <span className="text-zinc-600 shrink-0 w-11 text-right text-xs pt-0.5">
                          {formatTime(entry.timestamp)}
                        </span>
                        <span className="shrink-0">{icon}</span>
                        <span className="text-zinc-400 leading-relaxed">
                          {link ? (
                            <a href={link} target="_blank" rel="noopener noreferrer"
                              className="hover:text-accent-cyan transition-colors underline underline-offset-2">
                              {text}
                            </a>
                          ) : text}
                        </span>
                      </div>
                    );
                  })}
                  {day.entries.length > 6 && (
                    <p className="text-xs text-zinc-700 font-mono pl-[3.5rem]">
                      +{day.entries.length - 6} more ·{" "}
                      <Link href="/log" className="hover:text-accent-cyan transition-colors">view all</Link>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
