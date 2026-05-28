import Link from "next/link";
import RankingsTable  from "@/components/RankingsTable";
import ScoreTicker    from "@/components/ScoreTicker";
import RecruitingFeed from "@/components/RecruitingFeed";
import NewsGrid       from "@/components/NewsGrid";
import {
  mockRankingsMens,
  mockRankingsWomens,
  mockScores,
  mockRecruits,
  mockNews,
} from "@/lib/mock-data";

const STATS = [
  { label: "DI Programs",  value: "74"   },
  { label: "DII Programs", value: "55"   },
  { label: "DIII Programs",value: "230+" },
  { label: "Active Players",value: "25k+" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-gray-800">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-gray-950 to-gray-950 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.15),transparent)] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-900/30 border border-blue-800/40 rounded-full px-3 py-1 mb-5">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-blue-300 font-medium">2025 Season · Live</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
              The Home of<br />
              <span className="text-blue-400">Lacrosse Analytics</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Rankings, scores, recruiting, and deep stats for every NCAA lacrosse
              program — men&apos;s and women&apos;s, DI through DIII.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/rankings"
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors"
              >
                View Rankings
              </Link>
              <Link
                href="/teams"
                className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-5 py-2.5 rounded-lg border border-gray-700 transition-colors"
              >
                Browse Teams
              </Link>
            </div>
          </div>

          {/* Quick stats */}
          <div className="mt-12 flex flex-wrap gap-8">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-black text-white">{s.value}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wide mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main content ────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">

        {/* Rankings row */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
            Week 4 · Top 10 Polls
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RankingsTable
              rows={mockRankingsMens}
              title="Men's DI"
              href="/rankings/mens"
            />
            <RankingsTable
              rows={mockRankingsWomens}
              title="Women's DI"
              href="/rankings/womens"
            />
          </div>
        </section>

        {/* Scores + Recruiting row */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <ScoreTicker scores={mockScores} />
          </div>
          <div className="lg:col-span-2">
            <RecruitingFeed recruits={mockRecruits} />
          </div>
        </section>

        {/* News */}
        <NewsGrid articles={mockNews} />

        {/* Division browser */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
            Browse by Division
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: "Men's DI",    href: "/teams?div=di&gender=mens",    count: "74"  },
              { label: "Women's DI",  href: "/teams?div=di&gender=womens",  count: "115" },
              { label: "Men's DII",   href: "/teams?div=dii&gender=mens",   count: "50"  },
              { label: "Women's DII", href: "/teams?div=dii&gender=womens", count: "55"  },
              { label: "Men's DIII",  href: "/teams?div=diii&gender=mens",  count: "195" },
              { label: "Women's DIII",href: "/teams?div=diii&gender=womens",count: "220" },
            ].map((d) => (
              <Link
                key={d.href}
                href={d.href}
                className="bg-gray-900 border border-gray-800 hover:border-blue-700 hover:bg-gray-800/60 rounded-xl p-4 text-center transition-all group"
              >
                <p className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors">
                  {d.count}
                </p>
                <p className="text-xs text-gray-500 mt-1">{d.label}</p>
              </Link>
            ))}
          </div>
        </section>

      </div>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-black text-white">
            Lax<span className="text-blue-500">Hub</span>
          </span>
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} LaxHub. Not affiliated with the NCAA.
          </p>
          <div className="flex gap-4 text-xs text-gray-600">
            <Link href="/about" className="hover:text-gray-400 transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-gray-400 transition-colors">Privacy</Link>
            <Link href="/contact" className="hover:text-gray-400 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
