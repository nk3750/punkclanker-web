import Link from "next/link";
import SectionHeader from "./SectionHeader";

interface LogEntry {
  timestamp: string;
  action: string;
  count?: number;
  titles?: string[];
  catalogTotal?: number;
  summary: string;
}

interface DayLog {
  date: string;
  label: string;
  entries: LogEntry[];
}

function iconForAction(action: string): string {
  if (action.includes("seed") || action.includes("movie")) return "📄";
  if (action.includes("tweet") || action.includes("social") || action.includes("twitter")) return "🐦";
  if (action.includes("list")) return "🎯";
  if (action.includes("hidden")) return "💎";
  if (action.includes("leaving")) return "⏳";
  if (action.includes("award")) return "🏆";
  if (action.includes("meta")) return "✏️";
  if (action.includes("collection")) return "🎭";
  if (action.includes("dispatch")) return "⚡";
  if (action.includes("backlink")) return "🔗";
  return "⚙️";
}

function formatTime(timestamp: string): string {
  try {
    const dt = new Date(timestamp);
    return dt.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "America/Los_Angeles",
    });
  } catch {
    return "--:--";
  }
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
  } catch {
    return [];
  }
}

export default async function ActivityFeed() {
  const days = await getRecentActivity();
  const totalEntries = days.reduce((sum, d) => sum + d.entries.length, 0);

  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <SectionHeader command="LIVE OPS LOG" />
          <Link
            href="/log"
            className="text-xs font-mono text-zinc-600 hover:text-accent-cyan transition-colors"
          >
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
                <div className="space-y-2">
                  {day.entries.slice(0, 5).map((entry, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 text-sm font-mono group"
                    >
                      <span className="text-zinc-600 shrink-0 w-12 text-right">
                        {formatTime(entry.timestamp)}
                      </span>
                      <span className="shrink-0">{iconForAction(entry.action)}</span>
                      <span className="text-zinc-400 leading-relaxed">
                        {entry.summary}
                        {entry.catalogTotal && (
                          <span className="ml-2 text-xs text-zinc-700">
                            [{entry.catalogTotal.toLocaleString()} in catalog]
                          </span>
                        )}
                      </span>
                    </div>
                  ))}
                  {day.entries.length > 5 && (
                    <p className="text-xs text-zinc-700 font-mono ml-15 pl-16">
                      +{day.entries.length - 5} more →{" "}
                      <Link href="/log" className="hover:text-accent-cyan transition-colors">
                        view all
                      </Link>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-zinc-800/40 flex items-center justify-between">
          <p className="text-xs font-mono text-zinc-700">
            {totalEntries} actions logged in the last 3 days
          </p>
          <Link
            href="/log"
            className="text-xs font-mono text-zinc-600 hover:text-accent-cyan transition-colors"
          >
            full history →
          </Link>
        </div>
      </div>
    </section>
  );
}
