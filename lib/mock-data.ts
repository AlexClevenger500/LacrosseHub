// Static mock data used by server components until the DB is reachable from this env.
// Shapes match the Prisma query results used in page.tsx.

export const mockRankingsMens = [
  { rank: 1,  prevRank: 2,  team: { name: "Maryland Terrapins",        shortName: "UMD-M",  primaryColor: "#E03A3E" }, wins: 8, losses: 1 },
  { rank: 2,  prevRank: 1,  team: { name: "Duke Blue Devils",           shortName: "DUKE-M", primaryColor: "#003087" }, wins: 8, losses: 1 },
  { rank: 3,  prevRank: 4,  team: { name: "Virginia Cavaliers",         shortName: "UVA-M",  primaryColor: "#232D4B" }, wins: 7, losses: 2 },
  { rank: 4,  prevRank: 3,  team: { name: "Notre Dame Fighting Irish",  shortName: "ND-M",   primaryColor: "#0C2340" }, wins: 7, losses: 2 },
  { rank: 5,  prevRank: 5,  team: { name: "Penn State Nittany Lions",   shortName: "PSU-M",  primaryColor: "#002D62" }, wins: 6, losses: 2 },
  { rank: 6,  prevRank: 7,  team: { name: "Syracuse Orange",            shortName: "SYR-M",  primaryColor: "#F76900" }, wins: 6, losses: 3 },
  { rank: 7,  prevRank: 6,  team: { name: "North Carolina Tar Heels",   shortName: "UNC-M",  primaryColor: "#7BAFD4" }, wins: 6, losses: 3 },
  { rank: 8,  prevRank: 9,  team: { name: "Cornell Big Red",            shortName: "COR-M",  primaryColor: "#B31B1B" }, wins: 5, losses: 3 },
  { rank: 9,  prevRank: 8,  team: { name: "Johns Hopkins Blue Jays",    shortName: "JHU-M",  primaryColor: "#002D72" }, wins: 5, losses: 4 },
  { rank: 10, prevRank: 10, team: { name: "Denver Pioneers",            shortName: "DEN-M",  primaryColor: "#8B2232" }, wins: 5, losses: 4 },
];

export const mockRankingsWomens = [
  { rank: 1,  prevRank: 1,  team: { name: "Northwestern Wildcats",      shortName: "NU-W",   primaryColor: "#4E2A84" }, wins: 9, losses: 0 },
  { rank: 2,  prevRank: 3,  team: { name: "North Carolina Women",       shortName: "UNC-W",  primaryColor: "#7BAFD4" }, wins: 8, losses: 1 },
  { rank: 3,  prevRank: 2,  team: { name: "Maryland Terrapins Women",   shortName: "UMD-W",  primaryColor: "#E03A3E" }, wins: 7, losses: 1 },
  { rank: 4,  prevRank: 4,  team: { name: "Virginia Cavaliers Women",   shortName: "UVA-W",  primaryColor: "#232D4B" }, wins: 7, losses: 2 },
  { rank: 5,  prevRank: 6,  team: { name: "Penn State Women",           shortName: "PSU-W",  primaryColor: "#002D62" }, wins: 6, losses: 2 },
  { rank: 6,  prevRank: 5,  team: { name: "Syracuse Orange Women",      shortName: "SYR-W",  primaryColor: "#F76900" }, wins: 6, losses: 3 },
  { rank: 7,  prevRank: 7,  team: { name: "Stanford Cardinal Women",    shortName: "STAN-W", primaryColor: "#8C1515" }, wins: 5, losses: 3 },
  { rank: 8,  prevRank: 9,  team: { name: "Princeton Tigers Women",     shortName: "PRI-W",  primaryColor: "#FF671F" }, wins: 5, losses: 3 },
  { rank: 9,  prevRank: 8,  team: { name: "Notre Dame Women",           shortName: "ND-W",   primaryColor: "#0C2340" }, wins: 5, losses: 4 },
  { rank: 10, prevRank: 10, team: { name: "Florida Gators Women",       shortName: "UFL-W",  primaryColor: "#0021A5" }, wins: 4, losses: 4 },
];

export const mockScores = [
  { id: "g1", homeTeam: "Maryland",     awayTeam: "Johns Hopkins", homeScore: 14, awayScore: 9,  gameDate: "2025-05-10", gender: "Men's DI"   },
  { id: "g2", homeTeam: "Virginia",     awayTeam: "Syracuse",      homeScore: 11, awayScore: 10, gameDate: "2025-05-10", gender: "Men's DI"   },
  { id: "g3", homeTeam: "Northwestern", awayTeam: "Penn State",    homeScore: 16, awayScore: 7,  gameDate: "2025-05-10", gender: "Women's DI" },
  { id: "g4", homeTeam: "Duke",         awayTeam: "Notre Dame",    homeScore: 13, awayScore: 12, gameDate: "2025-05-09", gender: "Men's DI"   },
  { id: "g5", homeTeam: "UNC",          awayTeam: "Stanford",      homeScore: 14, awayScore: 11, gameDate: "2025-05-09", gender: "Women's DI" },
  { id: "g6", homeTeam: "Cornell",      awayTeam: "Princeton",     homeScore: 10, awayScore: 8,  gameDate: "2025-05-08", gender: "Men's DI"   },
];

export const mockRecruits = [
  { name: "Jake Morrison",    position: "Attack",  gradYear: 2026, stars: 5, hometown: "Garden City, NY",  team: "Maryland",    rank: 1  },
  { name: "Connor Walsh",     position: "Midfield",gradYear: 2026, stars: 5, hometown: "Bethesda, MD",     team: "Duke",        rank: 2  },
  { name: "Ryan O'Brien",     position: "Defense", gradYear: 2026, stars: 4, hometown: "Fairfield, CT",    team: "Virginia",    rank: 3  },
  { name: "Tyler Brooks",     position: "Goalie",  gradYear: 2026, stars: 4, hometown: "Manhasset, NY",    team: "Notre Dame",  rank: 4  },
  { name: "Ethan Clarke",     position: "Attack",  gradYear: 2027, stars: 5, hometown: "Ridgewood, NJ",   team: "Syracuse",    rank: 5  },
  { name: "Logan Pierce",     position: "Midfield",gradYear: 2027, stars: 4, hometown: "Charlotte, NC",    team: "Penn State",  rank: 6  },
];

export const mockNews = [
  {
    slug: "maryland-surges-to-top-of-big-ten-standings",
    title: "Maryland Surges to Top of Big Ten Standings",
    summary: "The Terrapins extended their winning streak to six games with a dominant 14–9 win over Johns Hopkins.",
    author: "LaxHub Staff",
    publishedAt: "2025-05-10",
    tags: ["Maryland", "Big Ten"],
    imageColor: "#E03A3E",
  },
  {
    slug: "dukes-attack-sets-single-season-scoring-record",
    title: "Duke's Attack Sets Single-Season Scoring Record",
    summary: "Blue Devils attackmen combined for 87 goals through 10 games, breaking the ACC program record.",
    author: "LaxHub Staff",
    publishedAt: "2025-05-09",
    tags: ["Duke", "ACC"],
    imageColor: "#003087",
  },
  {
    slug: "northwestern-women-undefeated-through-seven-games",
    title: "Northwestern Women Undefeated Through Seven Games",
    summary: "The Wildcats remain perfect on the season after a dominant 16–7 victory over Penn State.",
    author: "LaxHub Staff",
    publishedAt: "2025-05-08",
    tags: ["Northwestern", "Big Ten", "Women's"],
    imageColor: "#4E2A84",
  },
  {
    slug: "2026-recruiting-class-shaping-up-to-be-historic",
    title: "2026 Recruiting Class Shaping Up to Be Historic",
    summary: "Several top-10 national recruits have already committed, with major programs landing elite talent early.",
    author: "LaxHub Staff",
    publishedAt: "2025-05-07",
    tags: ["Recruiting", "Class of 2026"],
    imageColor: "#1a3a1a",
  },
];
