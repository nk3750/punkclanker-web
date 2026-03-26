import SectionHeader from "./SectionHeader";
import { getSprintLog } from "@/lib/agent";

export default async function WorkLog() {
  const entries = await getSprintLog();

  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeader command="SPRINT LOG" />

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
          {`// auto-updated after each sprint`}
        </p>
      </div>
    </section>
  );
}
