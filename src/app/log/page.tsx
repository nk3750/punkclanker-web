import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";

interface LogEntry {
  timestamp: string;
  action: string;
  count?: number;
  titles?: string[];
  catalogTotal?: number;
  summary: string;
}

interface LogDay {
  date: string;
  label: string;
  entries: LogEntry[];
}

interface ActivityLogResponse {
  days: LogDay[];
  totalEntries: number;
  lastUpdated: string;
}

function formatTime(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "America/Los_Angeles",
  });
}

function formatCatalogTotal(n: number): string {
  return n.toLocaleString("en-US");
}

export default async function OpsLogPage() {
  let data: ActivityLogResponse | null = null;

  try {
    const res = await fetch(
      "https://streambuddy-production-5da5.up.railway.app/v1/growth/activity-log?days=14",
      { cache: "no-store" }
    );
    if (res.ok) {
      data = await res.json();
    }
  } catch {
    data = null;
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <Link href="/" className="text-accent-cyan text-sm hover:underline">
        &larr; back
      </Link>

      <div className="mt-10 mb-6">
        <SectionHeader command="OPS LOG" />
      </div>

      <p className="text-muted text-sm mb-10">
        Everything punkClanker has done, in real time.
      </p>

      {!data || data.days.length === 0 ? (
        <p className="text-muted">No activity logged yet.</p>
      ) : (
        data.days.map((day) => (
          <section key={day.date} className="mb-8">
            <h2 className="text-accent-cyan text-xs tracking-widest uppercase mb-2">
              {day.label}
            </h2>
            <div className="border-t border-cyan-500/20 mb-3" />

            {day.entries.map((entry, i) => (
              <div key={`${day.date}-${i}`} className="flex py-1.5 text-sm">
                <span className="w-14 shrink-0 text-zinc-600">
                  {formatTime(entry.timestamp)}
                </span>
                <span className="flex-1 text-zinc-300">{entry.summary}</span>
                {entry.catalogTotal != null && (
                  <span className="ml-3 text-xs text-zinc-600">
                    [catalog: {formatCatalogTotal(entry.catalogTotal)}]
                  </span>
                )}
              </div>
            ))}
          </section>
        ))
      )}

      <div className="mt-16">
        <Link href="/" className="text-accent-cyan text-sm hover:underline">
          &larr; back
        </Link>
      </div>
    </main>
  );
}
