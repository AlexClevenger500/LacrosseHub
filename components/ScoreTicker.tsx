import Link from "next/link";

interface Score {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  gameDate: string;
  gender: string;
}

function ScoreCard({ game }: { game: Score }) {
  const homeWon = game.homeScore > game.awayScore;
  return (
    <Link
      href={`/scores/${game.id}`}
      className="block bg-gray-900 border border-gray-800 rounded-lg p-3 hover:border-gray-600 hover:bg-gray-800/60 transition-all"
    >
      <div className="text-xs text-gray-500 mb-2">{game.gender}</div>
      <div className="flex justify-between items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className={`font-semibold truncate ${homeWon ? "text-white" : "text-gray-400"}`}>
            {game.homeTeam}
          </p>
          <p className={`font-semibold truncate ${!homeWon ? "text-white" : "text-gray-400"}`}>
            {game.awayTeam}
          </p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className={`font-bold font-mono text-lg leading-tight ${homeWon ? "text-white" : "text-gray-400"}`}>
            {game.homeScore}
          </p>
          <p className={`font-bold font-mono text-lg leading-tight ${!homeWon ? "text-white" : "text-gray-400"}`}>
            {game.awayScore}
          </p>
        </div>
      </div>
      <p className="text-xs text-gray-600 mt-2">
        {new Date(game.gameDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })} · Final
      </p>
    </Link>
  );
}

export default function ScoreTicker({ scores }: { scores: Score[] }) {
  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
        <h2 className="font-bold text-white text-sm uppercase tracking-wide">Recent Scores</h2>
        <Link href="/scores" className="text-xs text-blue-500 hover:text-blue-400 transition-colors">
          All Scores →
        </Link>
      </div>
      <div className="p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2">
        {scores.map((g) => (
          <ScoreCard key={g.id} game={g} />
        ))}
      </div>
    </div>
  );
}
