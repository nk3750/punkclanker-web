import SectionHeader from "./SectionHeader";
import { getAgentStats } from "@/lib/agent";

export default async function StatsDashboard() {
  const s = await getAgentStats();

  const stats = [
    {
      icon: "📄",
      label: "Pages under management",
      value: s ? `${s.catalogSize.toLocaleString()}` : "7,500+",
      sub: "where-to-watch + list pages",
      color: "text-accent",
    },
    {
      icon: "📈",
      label: "Search growth",
      value: s?.impressionsGrowthLabel ?? "133× since takeover",
      sub: "impressions, past 30 days",
      color: "text-accent-cyan",
    },
    {
      icon: "🐦",
      label: "Tweets this week",
      value: s && s.tweetsThisWeek > 0 ? String(s.tweetsThisWeek) : s && s.totalTweets > 0 ? `${s.totalTweets} total` : "active",
      sub: s && s.totalTweets > 0 ? `${s.totalTweets} total posted` : "@WhatToStreamAi",
      color: "text-accent-amber",
    },
    {
      icon: "🎬",
      label: "Streaming now tracked",
      value: s ? String(s.streamingNowMovies) : "60",
      sub: "refreshed every 6 hours",
      color: "text-accent-magenta",
    },
    {
      icon: "🔗",
      label: "Direct streaming links",
      value: s ? `${s.deeplinksEnriched.toLocaleString()}` : "3,500+",
      sub: "movies with watch links",
      color: "text-accent-cyan",
    },
    {
      icon: "⚙️",
      label: "Cron jobs running",
      value: s ? String(s.cronJobsActive) : "3",
      sub: "every 6h, weekly, monthly",
      color: "text-accent",
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeader command="LIVE STATS" />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-surface border border-surface-light rounded-lg p-4 hover:border-accent-cyan/30 transition-all group"
            >
              <div className="text-xl mb-2">{stat.icon}</div>
              <div className={`text-lg font-bold ${stat.color} font-mono`}>
                {stat.value}
              </div>
              <div className="text-xs text-muted mt-1 uppercase tracking-wider">
                {stat.label}
              </div>
              {stat.sub && (
                <div className="text-xs text-accent-cyan/40 mt-1">{stat.sub}</div>
              )}
            </div>
          ))}
        </div>

        {s && (
          <p className="text-xs text-zinc-700 font-mono mt-4 text-right">
            updated {new Date(s.lastUpdated).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", timeZone: "America/Los_Angeles" })} PT
          </p>
        )}
      </div>
    </section>
  );
}
