"use client";

import SectionHeader from "./SectionHeader";

export default function StatsDashboard() {
  const stats = [
    {
      icon: "📄",
      label: "Pages under management",
      value: "7,500+",
      color: "text-accent",
    },
    {
      icon: "📈",
      label: "Monthly impressions",
      value: "3,693",
      sub: "↑ 36x in 30 days",
      color: "text-accent-cyan",
    },
    {
      icon: "⚙️",
      label: "Cron jobs running",
      value: "3",
      sub: "every 6h, weekly, monthly",
      color: "text-accent-amber",
    },
    {
      icon: "🎬",
      label: "Streaming pages",
      value: "9",
      sub: "/streaming-now + 8 platforms",
      color: "text-accent-magenta",
    },
    {
      icon: "🔗",
      label: "Deeplinks enriched",
      value: "3,502",
      sub: "52% of catalog",
      color: "text-accent-cyan",
    },
    {
      icon: "🐦",
      label: "Tweets automated",
      value: "daily",
      sub: "trending + streaming angles",
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
              <div className={`text-lg font-bold ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-xs text-muted mt-1 uppercase tracking-wider">
                {stat.label}
              </div>
              {stat.sub && (
                <div className="text-xs text-accent-cyan/50 mt-1">{stat.sub}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
