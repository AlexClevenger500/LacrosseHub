import Link from "next/link";

interface RankingRow {
  rank: number;
  prevRank: number | null;
  team: { name: string; shortName: string; primaryColor: string };
  wins: number;
  losses: number;
}

function Trend({ rank, prev }: { rank: number; prev: number | null }) {
  if (!prev) return <span className="text-gray-600 text-xs w-6 text-center">—</span>;
  const diff = prev - rank;
  if (diff > 0)  return <span className="text-green-500 text-xs w-6 text-center">▲{diff}</span>;
  if (diff < 0)  return <span className="text-red-500  text-xs w-6 text-center">▼{Math.abs(diff)}</span>;
  return <span className="text-gray-500 text-xs w-6 text-center">—</span>;
}

export default function RankingsTable({
  rows,
  title,
  href,
}: {
  rows: RankingRow[];
  title: string;
  href: string;
}) {
  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
        <h2 className="font-bold text-white text-sm uppercase tracking-wide">{title}</h2>
        <Link href={href} className="text-xs text-blue-500 hover:text-blue-400 transition-colors">
          Full Rankings →
        </Link>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-500 text-xs border-b border-gray-800">
            <th className="px-4 py-2 text-left w-10">#</th>
            <th className="px-2 py-2 w-8"></th>
            <th className="px-2 py-2 text-left">Team</th>
            <th className="px-4 py-2 text-right">W–L</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.team.shortName}
              className="border-b border-gray-800/50 hover:bg-gray-800/40 transition-colors"
            >
              <td className="px-4 py-2.5 text-gray-400 font-mono font-bold text-sm">
                {row.rank}
              </td>
              <td className="px-2 py-2.5">
                <Trend rank={row.rank} prev={row.prevRank} />
              </td>
              <td className="px-2 py-2.5">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-sm flex-shrink-0"
                    style={{ backgroundColor: row.team.primaryColor }}
                  />
                  <Link
                    href={`/teams/${row.team.shortName.toLowerCase()}`}
                    className="text-white hover:text-blue-400 transition-colors font-medium leading-tight"
                  >
                    {row.team.name}
                  </Link>
                </div>
              </td>
              <td className="px-4 py-2.5 text-right text-gray-400 font-mono text-xs">
                {row.wins}–{row.losses}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
