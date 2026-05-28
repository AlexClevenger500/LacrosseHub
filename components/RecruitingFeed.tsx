import Link from "next/link";

interface Recruit {
  name: string;
  position: string;
  gradYear: number;
  stars: number;
  hometown: string;
  team: string;
  rank: number;
}

const POSITION_COLORS: Record<string, string> = {
  Attack:  "bg-red-900/60 text-red-300",
  Midfield:"bg-blue-900/60 text-blue-300",
  Defense: "bg-green-900/60 text-green-300",
  Goalie:  "bg-yellow-900/60 text-yellow-300",
  Faceoff: "bg-purple-900/60 text-purple-300",
  LSM:     "bg-teal-900/60 text-teal-300",
};

function Stars({ count }: { count: number }) {
  return (
    <span className="text-yellow-400 text-xs tracking-tighter">
      {"★".repeat(count)}{"☆".repeat(5 - count)}
    </span>
  );
}

export default function RecruitingFeed({ recruits }: { recruits: Recruit[] }) {
  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
        <h2 className="font-bold text-white text-sm uppercase tracking-wide">Top Recruits</h2>
        <Link href="/recruiting" className="text-xs text-blue-500 hover:text-blue-400 transition-colors">
          Full Board →
        </Link>
      </div>
      <div className="divide-y divide-gray-800">
        {recruits.map((r) => (
          <div
            key={r.rank}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800/40 transition-colors"
          >
            <span className="text-gray-600 font-mono text-sm w-5 flex-shrink-0 text-center">
              {r.rank}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Link
                  href={`/recruiting/${encodeURIComponent(r.name.toLowerCase().replace(/\s+/g, "-"))}`}
                  className="font-semibold text-white hover:text-blue-400 transition-colors text-sm"
                >
                  {r.name}
                </Link>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded font-medium ${POSITION_COLORS[r.position] ?? "bg-gray-800 text-gray-400"}`}
                >
                  {r.position}
                </span>
                <span className="text-xs text-gray-500">'{String(r.gradYear).slice(2)}</span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <Stars count={r.stars} />
                <span className="text-xs text-gray-500">{r.hometown}</span>
              </div>
            </div>
            <div className="flex-shrink-0 text-right">
              <span className="text-xs text-gray-400">{r.team}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
