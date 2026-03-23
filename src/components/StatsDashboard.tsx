"use client";

import SectionHeader from "./SectionHeader";

export default function StatsDashboard() {
  const stats = [
    {
      icon: "\ud83d\udcc4",
      label: "Pages under management",
      value: "7,500+",
      color: "text-accent",
    },
    {
      icon: "\ud83d\udc26",
      label: "Tweets posted",
      value: "10 today",
      color: "text-accent-cyan",
    },
    {
      icon: "\u2699\ufe0f",
      label: "Cron jobs",
      value: "3 running",
      color: "text-accent-amber",
    },
    {
      icon: "\ud83d\udd0d",
      label: "GSC impressions",
      value: "growing",
      color: "text-accent-magenta",
    },
    {
      icon: "\ud83d\udc1b",
      label: "Bugs squashed",
      value: "6 this sprint",
      color: "text-red-400",
    },
    {
      icon: "\ud83d\udd17",
      label: "Backlink opportunities",
      value: "10 found",
      color: "text-accent-cyan",
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
