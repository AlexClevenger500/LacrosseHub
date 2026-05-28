import Link from "next/link";

interface Article {
  slug: string;
  title: string;
  summary: string;
  author: string;
  publishedAt: string;
  tags: string[];
  imageColor: string;
}

export default function NewsGrid({ articles }: { articles: Article[] }) {
  const [featured, ...rest] = articles;

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-white text-sm uppercase tracking-wide">Latest News</h2>
        <Link href="/news" className="text-xs text-blue-500 hover:text-blue-400 transition-colors">
          All News →
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Featured */}
        <Link
          href={`/news/${featured.slug}`}
          className="lg:col-span-2 group relative rounded-xl overflow-hidden border border-gray-800 hover:border-gray-600 transition-all bg-gray-900"
        >
          <div
            className="h-48 lg:h-56 w-full opacity-40 group-hover:opacity-50 transition-opacity"
            style={{ background: `linear-gradient(135deg, ${featured.imageColor}, #111827)` }}
          />
          <div className="absolute inset-0 p-5 flex flex-col justify-end">
            <div className="flex gap-2 mb-2 flex-wrap">
              {featured.tags.map((t) => (
                <span key={t} className="text-xs bg-blue-900/60 text-blue-300 px-2 py-0.5 rounded">
                  {t}
                </span>
              ))}
            </div>
            <h3 className="text-white font-bold text-lg leading-snug group-hover:text-blue-300 transition-colors line-clamp-2">
              {featured.title}
            </h3>
            <p className="text-gray-400 text-sm mt-1 line-clamp-2">{featured.summary}</p>
            <p className="text-gray-600 text-xs mt-2">{featured.author} · {new Date(featured.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
          </div>
        </Link>

        {/* Side stack */}
        <div className="flex flex-col gap-3">
          {rest.map((a) => (
            <Link
              key={a.slug}
              href={`/news/${a.slug}`}
              className="group flex gap-3 bg-gray-900 border border-gray-800 rounded-xl p-3 hover:border-gray-600 transition-all"
            >
              <div
                className="w-16 h-16 flex-shrink-0 rounded-lg opacity-70 group-hover:opacity-90 transition-opacity"
                style={{ background: `linear-gradient(135deg, ${a.imageColor}, #1f2937)` }}
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-white text-sm font-semibold leading-snug group-hover:text-blue-300 transition-colors line-clamp-2">
                  {a.title}
                </h3>
                <p className="text-gray-500 text-xs mt-1">
                  {new Date(a.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
