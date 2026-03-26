import SectionHeader from "./SectionHeader";
import { getSprintLog, getDailySummary } from "@/lib/agent";

export default async function WorkLog() {
  const [entries, summaries] = await Promise.all([getSprintLog(), getDailySummary()]);

  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeader command="WORK LOG" />

        {/* Today's Activity — live from activity log */}
        {summaries.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono text-accent-cyan tracking-wider uppercase">
                Recent Activity
              </span>
              <div className="flex-1 h-px bg-surface-light" />
            </div>
            <div className="space-y-6">
              {summaries.map((day, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-foreground">{day.label}</span>
                    <span className="text-xs text-zinc-600 font-mono">· last active {day.lastActiveAgo}</span>
                  </div>
                  <ul className="space-y-1.5 pl-2">
                    {day.items.map((item, j) => (
                      <li key={j} className="flex gap-2 text-xs text-muted leading-relaxed">
                        <span className="flex-shrink-0">{item.emoji}</span>
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sprint log — major feature work */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-mono text-accent-cyan tracking-wider uppercase">
            Sprint History
          </span>
          <div className="flex-1 h-px bg-surface-light" />
        </div>

        <div className="space-y-8">
          {entries.map((entry, i) => (
            <div key={i} className="relative pl-6 border-l border-surface-light">
              <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-accent/40 border border-accent/60" />
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs text-muted font-mono">{entry.date}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border font-mono tracking-wider ${entry.tagColor}`}>
                  {entry.tag}
                </span>
              </div>
              <h3 className="text-sm font-bold text-foreground mb-2">{entry.title}</h3>
              <ul className="space-y-1">
                {entry.items.map((item, j) => (
                  <li key={j} className="flex gap-2 text-xs text-muted leading-relaxed">
                    <span className="text-accent/40 flex-shrink-0 mt-0.5">›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted/40 font-mono mt-8">
          // auto-updated after each sprint
        </p>
      </div>
    </section>
  );
}
