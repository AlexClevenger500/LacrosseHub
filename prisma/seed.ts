import { PrismaClient, Division, Position, AcademicYear, GameStatus, CommitStatus } from "@prisma/client";

const prisma = new PrismaClient();

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function slugify(text: string) {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

const TEAMS = [
  { name: "Maryland Terrapins",       shortName: "UMD",  mascot: "Testudo",     conference: "Big Ten",    division: Division.DI,   state: "MD", city: "College Park",  primaryColor: "#E03A3E" },
  { name: "Duke Blue Devils",         shortName: "DUKE", mascot: "Blue Devil",  conference: "ACC",        division: Division.DI,   state: "NC", city: "Durham",        primaryColor: "#003087" },
  { name: "Virginia Cavaliers",       shortName: "UVA",  mascot: "Cavalier",    conference: "ACC",        division: Division.DI,   state: "VA", city: "Charlottesville", primaryColor: "#232D4B" },
  { name: "Syracuse Orange",          shortName: "SYR",  mascot: "Otto",        conference: "ACC",        division: Division.DI,   state: "NY", city: "Syracuse",      primaryColor: "#F76900" },
  { name: "Notre Dame Fighting Irish",shortName: "ND",   mascot: "Leprechaun",  conference: "ACC",        division: Division.DI,   state: "IN", city: "Notre Dame",    primaryColor: "#0C2340" },
  { name: "Penn State Nittany Lions", shortName: "PSU",  mascot: "Nittany Lion",conference: "Big Ten",    division: Division.DI,   state: "PA", city: "State College", primaryColor: "#002D62" },
  { name: "Johns Hopkins Blue Jays",  shortName: "JHU",  mascot: "Blue Jay",    conference: "Big Ten",    division: Division.DI,   state: "MD", city: "Baltimore",     primaryColor: "#002D72" },
  { name: "Cornell Big Red",          shortName: "COR",  mascot: "Big Red Bear",conference: "Ivy League", division: Division.DI,   state: "NY", city: "Ithaca",        primaryColor: "#B31B1B" },
  { name: "Princeton Tigers",         shortName: "PRI",  mascot: "Tiger",       conference: "Ivy League", division: Division.DI,   state: "NJ", city: "Princeton",     primaryColor: "#FF671F" },
  { name: "Denver Pioneers",          shortName: "DEN",  mascot: "Pioneer",     conference: "Big East",   division: Division.DI,   state: "CO", city: "Denver",        primaryColor: "#8B2232" },
];

const FIRST_NAMES = ["Liam","Mason","Aiden","Lucas","Ethan","Noah","Owen","Jake","Cole","Tyler","Ryan","Jack","Alex","Sean","Kyle","Brendan","Connor","Derek","Garrett","Hunter","Ian","Jason","Kevin","Logan","Matt","Nick","Oliver","Patrick","Quinn","Reed","Sam","Travis","Wyatt","Zach","Ben","Carter","Dylan","Evan","Finn","Grant"];
const LAST_NAMES  = ["Smith","Johnson","Williams","Brown","Jones","Miller","Davis","Wilson","Moore","Taylor","Anderson","Thomas","Jackson","White","Harris","Martin","Thompson","Garcia","Martinez","Robinson","Clark","Rodriguez","Lewis","Lee","Walker","Hall","Allen","Young","Hernandez","King","Wright","Lopez","Hill","Scott","Green","Adams","Baker","Nelson","Carter","Mitchell"];

const POSITIONS: Position[] = [Position.ATTACK, Position.MIDFIELD, Position.DEFENSE, Position.GOALIE, Position.FACEOFF, Position.LSM];
const YEARS: AcademicYear[]  = [AcademicYear.FRESHMAN, AcademicYear.SOPHOMORE, AcademicYear.JUNIOR, AcademicYear.SENIOR, AcademicYear.GRADUATE];

const HOMETOWNS = [
  { city: "Baltimore",     state: "MD" },
  { city: "Annapolis",     state: "MD" },
  { city: "Garden City",   state: "NY" },
  { city: "Manhasset",     state: "NY" },
  { city: "Haverford",     state: "PA" },
  { city: "Bethesda",      state: "MD" },
  { city: "Fairfield",     state: "CT" },
  { city: "Ridgewood",     state: "NJ" },
  { city: "Charlotte",     state: "NC" },
  { city: "Denver",        state: "CO" },
];

// ---------------------------------------------------------------------------
// Seed
// ---------------------------------------------------------------------------

async function main() {
  console.log("🌱 Seeding database...");

  // ------------------------------------------------------------------
  // 1. Teams (10)
  // ------------------------------------------------------------------
  console.log("  → Creating teams...");
  const teams = await Promise.all(
    TEAMS.map((t) =>
      prisma.team.upsert({
        where: { shortName: t.shortName },
        update: {},
        create: { ...t, founded: randInt(1890, 1980) },
      })
    )
  );
  console.log(`     ✓ ${teams.length} teams`);

  // ------------------------------------------------------------------
  // 2. Players (50 – 5 per team)
  // ------------------------------------------------------------------
  console.log("  → Creating players...");
  const players = [];
  for (const team of teams) {
    for (let i = 0; i < 5; i++) {
      const hometown = pick(HOMETOWNS);
      const player = await prisma.player.create({
        data: {
          firstName:  pick(FIRST_NAMES),
          lastName:   pick(LAST_NAMES),
          number:     randInt(1, 99),
          position:   pick(POSITIONS),
          year:       pick(YEARS),
          heightIn:   randInt(66, 78),
          weightLbs:  randInt(160, 230),
          hometown:   hometown.city,
          homeState:  hometown.state,
          teamId:     team.id,
        },
      });
      players.push(player);
    }
  }
  console.log(`     ✓ ${players.length} players`);

  // ------------------------------------------------------------------
  // 3. Games (20)
  // ------------------------------------------------------------------
  console.log("  → Creating games...");
  const games = [];
  const season = 2025;
  for (let i = 0; i < 20; i++) {
    const shuffled = [...teams].sort(() => Math.random() - 0.5);
    const homeTeam = shuffled[0];
    const awayTeam = shuffled[1];
    const daysBack  = randInt(1, 90);
    const isPlayed  = daysBack > 7;
    const homeScore = isPlayed ? randInt(6, 18) : null;
    const awayScore = isPlayed ? randInt(6, 18) : null;

    const game = await prisma.game.create({
      data: {
        season,
        week:       Math.ceil(i / 2) + 1,
        gameDate:   daysAgo(daysBack),
        homeTeamId: homeTeam.id,
        awayTeamId: awayTeam.id,
        homeScore,
        awayScore,
        status:     isPlayed ? GameStatus.FINAL : GameStatus.SCHEDULED,
        venue:      `${homeTeam.city} Stadium`,
        attendance: isPlayed ? randInt(2000, 15000) : null,
        isPlayoff:  i >= 18,
      },
    });
    games.push(game);

    // PlayerStats for played games
    if (isPlayed) {
      const homePlayers = players.filter((p) => p.teamId === homeTeam.id);
      const awayPlayers = players.filter((p) => p.teamId === awayTeam.id);

      for (const player of [...homePlayers, ...awayPlayers]) {
        const isGoalie = player.position === Position.GOALIE;
        await prisma.playerStat.create({
          data: {
            playerId:       player.id,
            gameId:         game.id,
            goals:          isGoalie ? 0 : randInt(0, 4),
            assists:        isGoalie ? 0 : randInt(0, 3),
            points:         isGoalie ? 0 : randInt(0, 5),
            shots:          isGoalie ? 0 : randInt(0, 8),
            shotsOnGoal:    isGoalie ? 0 : randInt(0, 5),
            groundBalls:    randInt(0, 5),
            causedTurnovers:randInt(0, 3),
            turnovers:      randInt(0, 3),
            faceoffsWon:    player.position === Position.FACEOFF ? randInt(3, 12) : 0,
            faceoffsLost:   player.position === Position.FACEOFF ? randInt(2, 10) : 0,
            saves:          isGoalie ? randInt(5, 15) : 0,
            goalsAllowed:   isGoalie ? randInt(6, 16) : 0,
            minutesPlayed:  randInt(20, 60),
          },
        });
      }

      // TeamGameStats
      for (const team of [homeTeam, awayTeam]) {
        const fo = randInt(15, 30);
        await prisma.teamGameStat.create({
          data: {
            teamId:          team.id,
            gameId:          game.id,
            goals:           team.id === homeTeam.id ? (homeScore ?? 0) : (awayScore ?? 0),
            assists:         randInt(4, 14),
            shots:           randInt(20, 45),
            shotsOnGoal:     randInt(12, 30),
            groundBalls:     randInt(15, 35),
            causedTurnovers: randInt(5, 15),
            turnovers:       randInt(5, 15),
            faceoffsWon:     fo,
            faceoffsTotal:   fo + randInt(10, 25),
            clearingPct:     parseFloat((randInt(70, 98) / 100).toFixed(2)),
            emoPossessions:  randInt(2, 8),
            emoGoals:        randInt(0, 4),
            saves:           randInt(5, 15),
          },
        });
      }
    }
  }
  console.log(`     ✓ ${games.length} games`);

  // ------------------------------------------------------------------
  // 4. Recruiting Commits (15)
  // ------------------------------------------------------------------
  console.log("  → Creating recruiting commits...");
  const commitFirstNames = FIRST_NAMES.slice(0, 15);
  const gradYears = [2026, 2027, 2028];

  for (let i = 0; i < 15; i++) {
    const hometown = pick(HOMETOWNS);
    const team     = pick(teams);
    await prisma.recruitingCommit.create({
      data: {
        firstName:    commitFirstNames[i],
        lastName:     pick(LAST_NAMES),
        position:     pick(POSITIONS),
        gradYear:     pick(gradYears),
        hometown:     hometown.city,
        homeState:    hometown.state,
        teamId:       team.id,
        commitDate:   daysAgo(randInt(1, 120)),
        stars:        randInt(3, 5),
        nationalRank: randInt(1, 100),
        positionRank: randInt(1, 30),
        stateRank:    randInt(1, 20),
        status:       pick([CommitStatus.COMMITTED, CommitStatus.SIGNED]),
      },
    });
  }
  console.log("     ✓ 15 recruiting commits");

  // ------------------------------------------------------------------
  // 5. Team Rankings (10 teams × 4 weeks)
  // ------------------------------------------------------------------
  console.log("  → Creating team rankings...");
  const rankingWeeks = [1, 2, 3, 4];
  for (const week of rankingWeeks) {
    const shuffled = [...teams].sort(() => Math.random() - 0.5);
    for (let rank = 0; rank < shuffled.length; rank++) {
      await prisma.teamRanking.create({
        data: {
          teamId:       shuffled[rank].id,
          season,
          week,
          rank:         rank + 1,
          prevRank:     week > 1 ? randInt(1, 10) : null,
          source:       "LaxHub Poll",
          wins:         randInt(0, week * 2),
          losses:       randInt(0, week),
          pointsFor:    randInt(50, 200),
          pointsAgainst:randInt(40, 180),
        },
      });
    }
  }
  console.log("     ✓ team rankings");

  // ------------------------------------------------------------------
  // 6. Player Rankings (top scorers)
  // ------------------------------------------------------------------
  console.log("  → Creating player rankings...");
  const attackers = players.filter((p) => p.position === Position.ATTACK).slice(0, 10);
  for (let rank = 0; rank < attackers.length; rank++) {
    await prisma.playerRanking.create({
      data: {
        playerId:  attackers[rank].id,
        season,
        week:      4,
        rank:      rank + 1,
        prevRank:  rank > 0 ? rank : null,
        category:  "goals",
        source:    "LaxHub",
        statValue: randInt(10, 40),
      },
    });
  }
  console.log("     ✓ player rankings");

  // ------------------------------------------------------------------
  // 7. News Articles (5)
  // ------------------------------------------------------------------
  console.log("  → Creating news articles...");
  const articles = [
    {
      title: "Maryland Surges to Top of Big Ten Standings",
      summary: "The Terrapins extended their winning streak to six games with a dominant performance.",
      tags: ["Maryland", "Big Ten", "rankings"],
    },
    {
      title: "Duke's Attack Sets Single-Season Scoring Record",
      summary: "Blue Devils attackmen have combined for 87 goals through 10 games.",
      tags: ["Duke", "ACC", "records"],
    },
    {
      title: "2026 Recruiting Class Shaping Up to Be Elite",
      summary: "Several top-10 national recruits have made their college decisions early.",
      tags: ["recruiting", "class-of-2026"],
    },
    {
      title: "Virginia Goalie Named ACC Defensive Player of the Week",
      summary: "The sophomore posted 14 saves in Saturday's win over Syracuse.",
      tags: ["Virginia", "ACC", "defense"],
    },
    {
      title: "NCAA Unveils Expanded Tournament Field for 2025",
      summary: "Eight additional at-large bids will be available starting this season.",
      tags: ["NCAA", "tournament", "news"],
    },
  ];

  for (const article of articles) {
    await prisma.newsArticle.create({
      data: {
        title:       article.title,
        slug:        slugify(article.title),
        summary:     article.summary,
        body:        `<p>${article.summary} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>`,
        author:      "LaxHub Staff",
        tags:        article.tags,
        published:   true,
        publishedAt: daysAgo(randInt(1, 30)),
      },
    });
  }
  console.log("     ✓ 5 news articles");

  console.log("\n✅ Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
