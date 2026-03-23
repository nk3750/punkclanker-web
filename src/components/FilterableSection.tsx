"use client";

import { useState, useMemo } from "react";

interface FilterableItem {
  label: string;
  subtitle?: string;
  href: string;
}

export default function FilterableSection({
  id,
  title,
  count,
  items,
}: {
  id: string;
  title: string;
  count: number;
  items: FilterableItem[];
}) {
  const [filter, setFilter] = useState("");

  const filtered = useMemo(() => {
    if (!filter) return items.slice(0, 12);
    const q = filter.toLowerCase();
    return items.filter((item) => item.label.toLowerCase().includes(q));
  }, [filter, items]);

  return (
    <section id={id} className="mb-12">
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="flex items-center gap-3">
          <h2 className="text-lg md:text-xl font-bold text-accent-cyan glow-cyan uppercase tracking-wider">
            <span className="text-accent-magenta">{">"}</span> {title}
          </h2>
          <span className="text-xs bg-surface-light border border-accent-cyan/20 text-accent-cyan px-2 py-0.5 rounded-full">
            {count}
          </span>
        </div>
        <div className="ml-auto">
          <input
            type="text"
            placeholder="filter..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-transparent border border-surface-light focus:border-accent-cyan text-accent-cyan placeholder-muted text-xs px-2 py-1 rounded outline-none font-mono transition-colors"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-3 py-2 rounded border border-transparent hover:border-accent-cyan/20 hover:bg-surface-light/50 transition-all"
            >
              <span className="text-accent-cyan group-hover:underline text-sm truncate">
                {item.label}
              </span>
              {item.subtitle && (
                <span className="text-muted text-xs shrink-0">
                  ({item.subtitle})
                </span>
              )}
              <span className="text-accent-cyan/50 text-xs ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                ↗
              </span>
            </a>
          ))
        ) : (
          <p className="text-muted text-xs col-span-full">no results</p>
        )}
      </div>
    </section>
  );
}
