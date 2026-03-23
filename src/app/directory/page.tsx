import Link from "next/link";
import FilterableSection from "@/components/FilterableSection";
import MovieSearch from "@/components/MovieSearch";

const API_BASE = process.env.WHATTOSTREAM_API_URL
  ? `${process.env.WHATTOSTREAM_API_URL}/growth`
  : "https://streambuddy-production-5da5.up.railway.app/v1/growth";

interface AwardItem {
  slug: string;
  awardName: string;
  movieCount: number;
}
interface HiddenGemItem {
  slug: string;
  platformName: string;
  movieCount: number;
}
interface LeavingItem {
  slug: string;
  platformName: string;
  movieCount: number;
  year: number;
  month: number;
}
interface CollectionItem {
  slug: string;
  collectionName: string;
  movieCount: number;
}
interface PersonItem {
  slug: string;
  name: string;
  movieCount: number;
}
interface ListItem {
  slug: string;
  genreName: string;
  platformName: string;
  movieCount: number;
}
interface DecadeItem {
  slug: string;
  genreName: string;
  decadeLabel: string;
  movieCount: number;
}

async function fetchJSON<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

function SectionBlock({
  id,
  title,
  count,
  children,
}: {
  id: string;
  title: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-lg md:text-xl font-bold text-accent-cyan glow-cyan uppercase tracking-wider">
          <span className="text-accent-magenta">{">"}</span> {title}
        </h2>
        <span className="text-xs bg-surface-light border border-accent-cyan/20 text-accent-cyan px-2 py-0.5 rounded-full">
          {count}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {children}
      </div>
    </section>
  );
}

function DirectoryLink({
  href,
  label,
  subtitle,
}: {
  href: string;
  label: string;
  subtitle?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-2 px-3 py-2 rounded border border-transparent hover:border-accent-cyan/20 hover:bg-surface-light/50 transition-all"
    >
      <span className="text-accent-cyan group-hover:underline text-sm truncate">
        {label}
      </span>
      {subtitle && (
        <span className="text-muted text-xs shrink-0">({subtitle})</span>
      )}
      <span className="text-accent-cyan/50 text-xs ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        ↗
      </span>
    </a>
  );
}

function ComingSoon({ label }: { label: string }) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-lg md:text-xl font-bold text-muted uppercase tracking-wider">
          <span className="text-accent-magenta">{">"}</span> {label}
        </h2>
        <span className="text-xs bg-surface-light border border-muted/20 text-muted px-2 py-0.5 rounded-full">
          coming soon
        </span>
      </div>
    </div>
  );
}

export default async function DirectoryPage() {
  const [awardsData, gemsData, leavingData, collectionsData, personsData, listsData, decadesData] =
    await Promise.all([
      fetchJSON<{ awards: AwardItem[] }>(`${API_BASE}/awards`),
      fetchJSON<{ hiddenGems: HiddenGemItem[] }>(`${API_BASE}/hidden-gems`),
      fetchJSON<{ leaving: LeavingItem[] }>(`${API_BASE}/leaving`),
      fetchJSON<{ collections: CollectionItem[] }>(`${API_BASE}/collections`),
      fetchJSON<{ persons: PersonItem[] }>(`${API_BASE}/persons`),
      fetchJSON<{ lists: ListItem[] }>(`${API_BASE}/lists`),
      fetchJSON<{ decades: DecadeItem[] }>(`${API_BASE}/decades`),
    ]);

  const awards = awardsData?.awards ?? [];
  const hiddenGems = gemsData?.hiddenGems ?? [];
  const leaving = (leavingData as unknown as { pages: LeavingItem[] })?.pages ?? [];
  const collections = collectionsData?.collections ?? [];
  const persons = personsData?.persons ?? [];
  const lists = listsData?.lists ?? [];
  const decades = decadesData?.decades ?? [];

  const totalPages =
    awards.length +
    hiddenGems.length +
    leaving.length +
    collections.length +
    persons.length +
    lists.length +
    decades.length;

  return (
    <main className="min-h-screen bg-background px-6 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        {/* Back link */}
        <Link
          href="/"
          className="text-sm text-muted hover:text-accent-cyan transition-colors mb-8 inline-block"
        >
          ← back to home
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-accent-cyan glow-cyan mb-3 tracking-tight">
            PAGES DIRECTORY
          </h1>
          <p className="text-muted text-sm md:text-base max-w-2xl">
            Every page punkClanker manages — live data from{" "}
            <a
              href="https://whattostream.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="terminal-link"
            >
              WhatToStream.ai
            </a>
          </p>
          <p className="text-xs text-muted mt-2 opacity-60">
            {totalPages} pages indexed
          </p>
        </div>

        {/* Movie Search */}
        <MovieSearch />

        {/* Divider */}
        <div className="text-surface-light text-xs mb-12 select-none overflow-hidden" style={{ letterSpacing: "-1px" }}>
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        </div>

        {/* Awards */}
        {awards.length > 0 ? (
          <SectionBlock id="awards" title="Awards" count={awards.length}>
            {awards.map((a) => (
              <DirectoryLink
                key={a.slug}
                href={`https://whattostream.ai/awards/${a.slug}`}
                label={a.awardName}
                subtitle={`${a.movieCount} titles`}
              />
            ))}
          </SectionBlock>
        ) : (
          <ComingSoon label="Awards" />
        )}

        {/* Hidden Gems */}
        {hiddenGems.length > 0 ? (
          <SectionBlock id="hidden-gems" title="Hidden Gems" count={hiddenGems.length}>
            {hiddenGems.map((g) => (
              <DirectoryLink
                key={g.slug}
                href={`https://whattostream.ai/hidden-gems/${g.slug}`}
                label={g.platformName}
                subtitle={`${g.movieCount} titles`}
              />
            ))}
          </SectionBlock>
        ) : (
          <ComingSoon label="Hidden Gems" />
        )}

        {/* Leaving */}
        {leaving.length > 0 ? (
          <SectionBlock id="leaving" title="Leaving Soon" count={leaving.length}>
            {leaving.map((l) => (
              <DirectoryLink
                key={l.slug}
                href={`https://whattostream.ai/leaving/${l.slug}`}
                label={`Leaving ${l.platformName} — ${new Date(l.year, l.month - 1).toLocaleString('default', { month: 'long', year: 'numeric' })}`}
                subtitle={`${l.movieCount} titles`}
              />
            ))}
          </SectionBlock>
        ) : (
          <ComingSoon label="Leaving Soon" />
        )}

        {/* Collections */}
        {collections.length > 0 ? (
          <SectionBlock id="collections" title="Collections" count={collections.length}>
            {collections.map((c) => (
              <DirectoryLink
                key={c.slug}
                href={`https://whattostream.ai/collection/${c.slug}`}
                label={c.collectionName}
                subtitle={`${c.movieCount} titles`}
              />
            ))}
          </SectionBlock>
        ) : (
          <ComingSoon label="Collections" />
        )}

        {/* Decades */}
        {decades.length > 0 ? (
          <FilterableSection
            id="decades"
            title="Decades"
            count={decades.length}
            items={decades.map((d) => ({
              label: `Best ${d.genreName} of the ${d.decadeLabel}`,
              subtitle: `${d.movieCount} titles`,
              href: `https://whattostream.ai/decade/${d.slug}`,
            }))}
          />
        ) : (
          <ComingSoon label="Decades" />
        )}

        {/* Persons */}
        {persons.length > 0 ? (
          <FilterableSection
            id="persons"
            title="Persons"
            count={persons.length}
            items={persons.map((p) => ({
              label: p.name,
              subtitle: `${p.movieCount} titles`,
              href: `https://whattostream.ai/person/${p.slug}`,
            }))}
          />
        ) : (
          <ComingSoon label="Persons" />
        )}

        {/* Lists */}
        {lists.length > 0 ? (
          <FilterableSection
            id="lists"
            title="Lists"
            count={lists.length}
            items={lists.map((l) => ({
              label: `Best ${l.genreName} on ${l.platformName}`,
              subtitle: `${l.movieCount} titles`,
              href: `https://whattostream.ai/best/${l.slug}`,
            }))}
          />
        ) : (
          <ComingSoon label="Lists" />
        )}

        {/* Footer */}
        <div className="text-surface-light text-xs mt-8 mb-8 select-none overflow-hidden" style={{ letterSpacing: "-1px" }}>
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        </div>
        <div className="text-center text-muted text-xs opacity-30 tracking-widest">
          █████ END DIRECTORY █████
        </div>
      </div>
    </main>
  );
}
