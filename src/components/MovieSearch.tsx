"use client";

import { useState, useEffect, useRef } from "react";

const API_BASE =
  process.env.NEXT_PUBLIC_WHATTOSTREAM_API_URL ||
  "https://streambuddy-production-5da5.up.railway.app/v1";

interface SearchResult {
  tmdbId: number;
  slug: string;
  title: string;
  year: number | null;
  poster: string | null;
  streamingOn: string[];
}

export default function MovieSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setSearched(false);
      setOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setLoading(true);
      try {
        const res = await fetch(
          `${API_BASE}/growth/catalog/search?q=${encodeURIComponent(query.trim())}&limit=10`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error("search failed");
        const data = await res.json();
        setResults(data.results ?? []);
        setSearched(true);
        setOpen(true);
      } catch (e: unknown) {
        if (e instanceof DOMException && e.name === "AbortError") return;
        setResults([]);
        setSearched(true);
        setOpen(true);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={containerRef} className="relative mb-10 w-full max-w-2xl">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => searched && setOpen(true)}
          placeholder='Search 7,500+ movies... 🔍'
          className="w-full bg-surface border border-accent-cyan/30 text-accent-cyan placeholder:text-muted/50 rounded px-4 py-3 text-sm font-mono focus:outline-none focus:border-accent-cyan focus:shadow-[0_0_10px_rgba(0,255,240,0.15)] transition-all"
        />
        {loading && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted animate-pulse font-mono">
            searching...
          </span>
        )}
      </div>

      {open && (
        <div className="absolute z-50 top-full mt-1 w-full bg-surface border border-accent-cyan/20 rounded shadow-[0_0_20px_rgba(0,255,240,0.08)] max-h-[400px] overflow-y-auto">
          {results.length === 0 && searched && !loading && (
            <div className="px-4 py-6 text-center text-muted text-sm font-mono">
              No results found
            </div>
          )}
          {results.map((r) => (
            <a
              key={r.tmdbId}
              href={`https://whattostream.ai/where-to-watch/${r.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2 hover:bg-surface-light/50 border-b border-accent-cyan/5 last:border-b-0 transition-colors group"
            >
              {r.poster ? (
                <img
                  src={r.poster}
                  alt={r.title}
                  width={40}
                  height={60}
                  className="w-[40px] h-[60px] object-cover rounded shrink-0"
                />
              ) : (
                <div className="w-[40px] h-[60px] bg-surface-light rounded shrink-0 flex items-center justify-center text-muted text-[10px] font-mono">
                  N/A
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="text-sm text-accent-cyan group-hover:underline truncate font-mono">
                  {r.title}
                  {r.year && (
                    <span className="text-muted ml-1">({r.year})</span>
                  )}
                </div>
                {r.streamingOn.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {r.streamingOn.map((p) => (
                      <span
                        key={p}
                        className="text-[10px] bg-accent-cyan/10 text-accent-cyan/80 px-1.5 py-0.5 rounded font-mono"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <span className="text-accent-cyan/50 text-xs shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                ↗
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
