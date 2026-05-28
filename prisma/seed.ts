import {
  PrismaClient,
  Division,
  Position,
  AcademicYear,
  GameStatus,
  CommitStatus,
  Gender,
  type Player,
} from "@prisma/client";

const prisma = new PrismaClient();

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
// 60 representative programs
// ---------------------------------------------------------------------------
const TEAMS = [
  // ── Men's DI (20) ──────────────────────────────────────────────────────
  { name: "Maryland Terrapins",           shortName: "UMD-M",   mascot: "Testudo",          conference: "Big Ten",      division: Division.DI,   gender: Gender.MENS,   state: "MD", city: "College Park",   primaryColor: "#E03A3E", founded: 1932 },
  { name: "Duke Blue Devils",             shortName: "DUKE-M",  mascot: "Blue Devil",       conference: "ACC",          division: Division.DI,   gender: Gender.MENS,   state: "NC", city: "Durham",         primaryColor: "#003087", founded: 1960 },
  { name: "Virginia Cavaliers",           shortName: "UVA-M",   mascot: "Cavalier",         conference: "ACC",          division: Division.DI,   gender: Gender.MENS,   state: "VA", city: "Charlottesville",primaryColor: "#232D4B", founded: 1970 },
  { name: "Syracuse Orange",              shortName: "SYR-M",   mascot: "Otto",             conference: "ACC",          division: Division.DI,   gender: Gender.MENS,   state: "NY", city: "Syracuse",        primaryColor: "#F76900", founded: 1916 },
  { name: "Notre Dame Fighting Irish",    shortName: "ND-M",    mascot: "Leprechaun",       conference: "ACC",          division: Division.DI,   gender: Gender.MENS,   state: "IN", city: "Notre Dame",      primaryColor: "#0C2340", founded: 1981 },
  { name: "Penn State Nittany Lions",     shortName: "PSU-M",   mascot: "Nittany Lion",     conference: "Big Ten",      division: Division.DI,   gender: Gender.MENS,   state: "PA", city: "State College",   primaryColor: "#002D62", founded: 1969 },
  { name: "Johns Hopkins Blue Jays",      shortName: "JHU-M",   mascot: "Blue Jay",         conference: "Big Ten",      division: Division.DI,   gender: Gender.MENS,   state: "MD", city: "Baltimore",       primaryColor: "#002D72", founded: 1883 },
  { name: "Cornell Big Red",              shortName: "COR-M",   mascot: "Big Red Bear",     conference: "Ivy League",   division: Division.DI,   gender: Gender.MENS,   state: "NY", city: "Ithaca",          primaryColor: "#B31B1B", founded: 1892 },
  { name: "Princeton Tigers",             shortName: "PRI-M",   mascot: "Tiger",            conference: "Ivy League",   division: Division.DI,   gender: Gender.MENS,   state: "NJ", city: "Princeton",       primaryColor: "#FF671F", founded: 1881 },
  { name: "Denver Pioneers",              shortName: "DEN-M",   mascot: "Ruckus",           conference: "Big East",     division: Division.DI,   gender: Gender.MENS,   state: "CO", city: "Denver",          primaryColor: "#8B2232", founded: 1966 },
  { name: "Georgetown Hoyas",             shortName: "GEO-M",   mascot: "Jack the Bulldog", conference: "Big East",     division: Division.DI,   gender: Gender.MENS,   state: "DC", city: "Washington",      primaryColor: "#041E42", founded: 1973 },
  { name: "Loyola Maryland Greyhounds",   shortName: "LOY-M",   mascot: "Everest",          conference: "Patriot League",division: Division.DI,  gender: Gender.MENS,   state: "MD", city: "Baltimore",       primaryColor: "#006633", founded: 1953 },
  { name: "Navy Midshipmen",              shortName: "NAVY-M",  mascot: "Bill the Goat",    conference: "Patriot League",division: Division.DI,  gender: Gender.MENS,   state: "MD", city: "Annapolis",       primaryColor: "#00205B", founded: 1963 },
  { name: "Towson Tigers",                shortName: "TOW-M",   mascot: "Tiger",            conference: "CAA",          division: Division.DI,   gender: Gender.MENS,   state: "MD", city: "Towson",          primaryColor: "#F6A01A", founded: 1970 },
  { name: "Stony Brook Seawolves",        shortName: "SBU-M",   mascot: "Wolfie",           conference: "CAA",          division: Division.DI,   gender: Gender.MENS,   state: "NY", city: "Stony Brook",     primaryColor: "#990000", founded: 1998 },
  { name: "Albany Great Danes",           shortName: "ALB-M",   mascot: "Damien",           conference: "America East", division: Division.DI,   gender: Gender.MENS,   state: "NY", city: "Albany",          primaryColor: "#461660", founded: 1968 },
  { name: "Yale Bulldogs",                shortName: "YALE-M",  mascot: "Handsome Dan",     conference: "Ivy League",   division: Division.DI,   gender: Gender.MENS,   state: "CT", city: "New Haven",       primaryColor: "#00356B", founded: 1883 },
  { name: "Ohio State Buckeyes",          shortName: "OSU-M",   mascot: "Brutus",           conference: "Big Ten",      division: Division.DI,   gender: Gender.MENS,   state: "OH", city: "Columbus",        primaryColor: "#BB0000", founded: 2010 },
  { name: "Rutgers Scarlet Knights",      shortName: "RUT-M",   mascot: "Scarlet Knight",   conference: "Big Ten",      division: Division.DI,   gender: Gender.MENS,   state: "NJ", city: "New Brunswick",   primaryColor: "#CC0033", founded: 1970 },
  { name: "North Carolina Tar Heels",     shortName: "UNC-M",   mascot: "Rameses",          conference: "ACC",          division: Division.DI,   gender: Gender.MENS,   state: "NC", city: "Chapel Hill",     primaryColor: "#7BAFD4", founded: 1965 },

  // ── Men's DII (10) ─────────────────────────────────────────────────────
  { name: "Le Moyne Dolphins",            shortName: "LEM-M",   mascot: "Dolphin",          conference: "NE10",         division: Division.DII,  gender: Gender.MENS,   state: "NY", city: "Syracuse",        primaryColor: "#006400", founded: 1967 },
  { name: "Limestone Saints",             shortName: "LMS-M",   mascot: "Saint",            conference: "SAC",          division: Division.DII,  gender: Gender.MENS,   state: "SC", city: "Gaffney",         primaryColor: "#0032A0", founded: 1996 },
  { name: "Mercyhurst Lakers",            shortName: "MCY-M",   mascot: "Laker",            conference: "PSAC",         division: Division.DII,  gender: Gender.MENS,   state: "PA", city: "Erie",            primaryColor: "#003082", founded: 1990 },
  { name: "West Chester Golden Rams",     shortName: "WCU-M",   mascot: "Golden Ram",       conference: "PSAC",         division: Division.DII,  gender: Gender.MENS,   state: "PA", city: "West Chester",    primaryColor: "#4A0082", founded: 1988 },
  { name: "Lenoir-Rhyne Bears",           shortName: "LRU-M",   mascot: "Bear",             conference: "SAC",          division: Division.DII,  gender: Gender.MENS,   state: "NC", city: "Hickory",         primaryColor: "#CC0000", founded: 2001 },
  { name: "Assumption Greyhounds",        shortName: "ASS-M",   mascot: "Greyhound",        conference: "NE10",         division: Division.DII,  gender: Gender.MENS,   state: "MA", city: "Worcester",       primaryColor: "#003087", founded: 1983 },
  { name: "Tampa Spartans",               shortName: "TAM-M",   mascot: "Spartan",          conference: "SSC",          division: Division.DII,  gender: Gender.MENS,   state: "FL", city: "Tampa",           primaryColor: "#C8102E", founded: 1999 },
  { name: "Adelphi Panthers",             shortName: "ADL-M",   mascot: "Panther",          conference: "NE10",         division: Division.DII,  gender: Gender.MENS,   state: "NY", city: "Garden City",     primaryColor: "#3C1053", founded: 1972 },
  { name: "Catawba Indians",              shortName: "CAT-M",   mascot: "Indian",           conference: "SAC",          division: Division.DII,  gender: Gender.MENS,   state: "NC", city: "Salisbury",       primaryColor: "#C8102E", founded: 2003 },
  { name: "Newberry Wolves",              shortName: "NEW-M",   mascot: "Wolf",             conference: "SAC",          division: Division.DII,  gender: Gender.MENS,   state: "SC", city: "Newberry",        primaryColor: "#840020", founded: 2000 },

  // ── Men's DIII (10) ────────────────────────────────────────────────────
  { name: "Middlebury Panthers",          shortName: "MID-M",   mascot: "Panther",          conference: "NESCAC",       division: Division.DIII, gender: Gender.MENS,   state: "VT", city: "Middlebury",      primaryColor: "#003A70", founded: 1974 },
  { name: "Tufts Jumbos",                 shortName: "TUF-M",   mascot: "Jumbo",            conference: "NESCAC",       division: Division.DIII, gender: Gender.MENS,   state: "MA", city: "Medford",         primaryColor: "#3E8EDE", founded: 1972 },
  { name: "Salisbury Sea Gulls",          shortName: "SAL-M",   mascot: "Sea Gull",         conference: "CAC",          division: Division.DIII, gender: Gender.MENS,   state: "MD", city: "Salisbury",       primaryColor: "#CC0000", founded: 1983 },
  { name: "Cortland Red Dragons",         shortName: "COR3-M",  mascot: "Red Dragon",       conference: "SUNYAC",       division: Division.DIII, gender: Gender.MENS,   state: "NY", city: "Cortland",        primaryColor: "#CC0000", founded: 1958 },
  { name: "Ithaca Bombers",               shortName: "ITH-M",   mascot: "Bomber",           conference: "Empire 8",     division: Division.DIII, gender: Gender.MENS,   state: "NY", city: "Ithaca",          primaryColor: "#003087", founded: 1972 },
  { name: "RPI Engineers",                shortName: "RPI-M",   mascot: "Puckman",          conference: "Liberty League",division: Division.DIII,gender: Gender.MENS,   state: "NY", city: "Troy",            primaryColor: "#C8102E", founded: 1958 },
  { name: "Washington & Lee Generals",    shortName: "WLU-M",   mascot: "General",          conference: "Old Dominion", division: Division.DIII, gender: Gender.MENS,   state: "VA", city: "Lexington",       primaryColor: "#003087", founded: 1967 },
  { name: "Gettysburg Bullets",           shortName: "GET-M",   mascot: "Bullet",           conference: "Centennial",   division: Division.DIII, gender: Gender.MENS,   state: "PA", city: "Gettysburg",      primaryColor: "#F77F00", founded: 1969 },
  { name: "Amherst Mammoths",             shortName: "AMH-M",   mascot: "Mammoth",          conference: "NESCAC",       division: Division.DIII, gender: Gender.MENS,   state: "MA", city: "Amherst",         primaryColor: "#3F0080", founded: 1973 },
  { name: "Denison Big Red",              shortName: "DEN3-M",  mascot: "Big Red",          conference: "NCAC",         division: Division.DIII, gender: Gender.MENS,   state: "OH", city: "Granville",       primaryColor: "#CC0000", founded: 1979 },

  // ── Women's DI (12) ────────────────────────────────────────────────────
  { name: "Maryland Terrapins Women",     shortName: "UMD-W",   mascot: "Testudo",          conference: "Big Ten",      division: Division.DI,   gender: Gender.WOMENS, state: "MD", city: "College Park",   primaryColor: "#E03A3E", founded: 1976 },
  { name: "North Carolina Tar Heels Women",shortName:"UNC-W",   mascot: "Rameses",          conference: "ACC",          division: Division.DI,   gender: Gender.WOMENS, state: "NC", city: "Chapel Hill",     primaryColor: "#7BAFD4", founded: 1978 },
  { name: "Virginia Cavaliers Women",     shortName: "UVA-W",   mascot: "Cavalier",         conference: "ACC",          division: Division.DI,   gender: Gender.WOMENS, state: "VA", city: "Charlottesville",primaryColor: "#232D4B", founded: 1980 },
  { name: "Syracuse Orange Women",        shortName: "SYR-W",   mascot: "Otto",             conference: "ACC",          division: Division.DI,   gender: Gender.WOMENS, state: "NY", city: "Syracuse",        primaryColor: "#F76900", founded: 1981 },
  { name: "Northwestern Wildcats Women",  shortName: "NU-W",    mascot: "Willie Wildcat",   conference: "Big Ten",      division: Division.DI,   gender: Gender.WOMENS, state: "IL", city: "Evanston",        primaryColor: "#4E2A84", founded: 1980 },
  { name: "Penn State Nittany Lions Women",shortName:"PSU-W",   mascot: "Nittany Lion",     conference: "Big Ten",      division: Division.DI,   gender: Gender.WOMENS, state: "PA", city: "State College",   primaryColor: "#002D62", founded: 1978 },
  { name: "Florida Gators Women",         shortName: "UFL-W",   mascot: "Albert Gator",     conference: "SEC",          division: Division.DI,   gender: Gender.WOMENS, state: "FL", city: "Gainesville",     primaryColor: "#0021A5", founded: 2014 },
  { name: "Georgia Bulldogs Women",       shortName: "UGA-W",   mascot: "Uga",              conference: "SEC",          division: Division.DI,   gender: Gender.WOMENS, state: "GA", city: "Athens",          primaryColor: "#BA0C2F", founded: 2015 },
  { name: "Stanford Cardinal Women",      shortName: "STAN-W",  mascot: "Tree",             conference: "Pac-12",       division: Division.DI,   gender: Gender.WOMENS, state: "CA", city: "Stanford",        primaryColor: "#8C1515", founded: 1993 },
  { name: "USC Trojans Women",            shortName: "USC-W",   mascot: "Tommy Trojan",     conference: "Pac-12",       division: Division.DI,   gender: Gender.WOMENS, state: "CA", city: "Los Angeles",     primaryColor: "#990000", founded: 2001 },
  { name: "Princeton Tigers Women",       shortName: "PRI-W",   mascot: "Tiger",            conference: "Ivy League",   division: Division.DI,   gender: Gender.WOMENS, state: "NJ", city: "Princeton",       primaryColor: "#FF671F", founded: 1978 },
  { name: "Notre Dame Fighting Irish Women",shortName:"ND-W",   mascot: "Leprechaun",       conference: "ACC",          division: Division.DI,   gender: Gender.WOMENS, state: "IN", city: "Notre Dame",      primaryColor: "#0C2340", founded: 1982 },

  // ── Women's DII (5) ────────────────────────────────────────────────────
  { name: "Adelphi Panthers Women",       shortName: "ADL-W",   mascot: "Panther",          conference: "NE10",         division: Division.DII,  gender: Gender.WOMENS, state: "NY", city: "Garden City",     primaryColor: "#3C1053", founded: 1980 },
  { name: "Le Moyne Dolphins Women",      shortName: "LEM-W",   mascot: "Dolphin",          conference: "NE10",         division: Division.DII,  gender: Gender.WOMENS, state: "NY", city: "Syracuse",        primaryColor: "#006400", founded: 1977 },
  { name: "West Chester Golden Rams Women",shortName:"WCU-W",   mascot: "Golden Ram",       conference: "PSAC",         division: Division.DII,  gender: Gender.WOMENS, state: "PA", city: "West Chester",    primaryColor: "#4A0082", founded: 1985 },
  { name: "Tampa Spartans Women",         shortName: "TAM-W",   mascot: "Spartan",          conference: "SSC",          division: Division.DII,  gender: Gender.WOMENS, state: "FL", city: "Tampa",           primaryColor: "#C8102E", founded: 2005 },
  { name: "Mercyhurst Lakers Women",      shortName: "MCY-W",   mascot: "Laker",            conference: "PSAC",         division: Division.DII,  gender: Gender.WOMENS, state: "PA", city: "Erie",            primaryColor: "#003082", founded: 1993 },

  // ── Women's DIII (3) ───────────────────────────────────────────────────
  { name: "Middlebury Panthers Women",    shortName: "MID-W",   mascot: "Panther",          conference: "NESCAC",       division: Division.DIII, gender: Gender.WOMENS, state: "VT", city: "Middlebury",      primaryColor: "#003A70", founded: 1978 },
  { name: "William Smith Herons",         shortName: "WMS-W",   mascot: "Heron",            conference: "Liberty League",division: Division.DIII,gender: Gender.WOMENS, state: "NY", city: "Geneva",          primaryColor: "#800000", founded: 1979 },
  { name: "Salisbury Sea Gulls Women",    shortName: "SAL-W",   mascot: "Sea Gull",         conference: "CAC",          division: Division.DIII, gender: Gender.WOMENS, state: "MD", city: "Salisbury",       primaryColor: "#CC0000", founded: 1987 },
];

const FIRST_NAMES = ["Liam","Mason","Aiden","Lucas","Ethan","Noah","Owen","Jake","Cole","Tyler","Ryan","Jack","Alex","Sean","Kyle","Brendan","Connor","Derek","Garrett","Hunter","Ian","Jason","Kevin","Logan","Matt","Nick","Oliver","Patrick","Quinn","Reed","Sam","Travis","Wyatt","Zach","Ben","Carter","Dylan","Evan","Finn","Grant","Emma","Olivia","Sophia","Isabella","Mia","Ava","Harper","Ella","Abigail","Emily","Madison","Elizabeth","Sofia","Avery","Scarlett","Victoria","Aria","Grace","Chloe","Penelope"];
const LAST_NAMES  = ["Smith","Johnson","Williams","Brown","Jones","Miller","Davis","Wilson","Moore","Taylor","Anderson","Thomas","Jackson","White","Harris","Martin","Thompson","Garcia","Martinez","Robinson","Clark","Rodriguez","Lewis","Lee","Walker","Hall","Allen","Young","Hernandez","King","Wright","Lopez","Hill","Scott","Green","Adams","Baker","Nelson","Carter","Mitchell"];
const POSITIONS: Position[] = [Position.ATTACK, Position.MIDFIELD, Position.DEFENSE, Position.GOALIE, Position.FACEOFF, Position.LSM];
const YEARS: AcademicYear[]  = [AcademicYear.FRESHMAN, AcademicYear.SOPHOMORE, AcademicYear.JUNIOR, AcademicYear.SENIOR, AcademicYear.GRADUATE];
const HOMETOWNS = [
  { city: "Baltimore",    state: "MD" }, { city: "Garden City",  state: "NY" },
  { city: "Annapolis",    state: "MD" }, { city: "Haverford",    state: "PA" },
  { city: "Bethesda",     state: "MD" }, { city: "Fairfield",    state: "CT" },
  { city: "Ridgewood",    state: "NJ" }, { city: "Charlotte",    state: "NC" },
  { city: "Denver",       state: "CO" }, { city: "Manhasset",    state: "NY" },
  { city: "Naperville",   state: "IL" }, { city: "Wellesley",    state: "MA" },
  { city: "McLean",       state: "VA" }, { city: "Westport",     state: "CT" },
  { city: "Oyster Bay",   state: "NY" },
];

async function main() {
  console.log("🌱 Seeding LaxHub...\n");

  // ── 1. Teams ──────────────────────────────────────────────────────────
  console.log("  → Teams...");
  const teams = await Promise.all(
    TEAMS.map((t) =>
      prisma.team.upsert({
        where: { shortName: t.shortName },
        update: {},
        create: t,
      })
    )
  );
  console.log(`     ✓ ${teams.length} teams`);

  // ── 2. Players (5 per team = 300 total) ───────────────────────────────
  console.log("  → Players...");
  const players: Player[] = [];
  for (const team of teams) {
    for (let i = 0; i < 5; i++) {
      const ht = pick(HOMETOWNS);
      const player = await prisma.player.create({
        data: {
          firstName:   pick(FIRST_NAMES),
          lastName:    pick(LAST_NAMES),
          number:      randInt(1, 99),
          position:    pick(POSITIONS),
          year:        pick(YEARS),
          heightIn:    randInt(64, 78),
          weightLbs:   randInt(150, 230),
          hometown:    ht.city,
          homeState:   ht.state,
          teamId:      team.id,
        },
      });
      players.push(player);
    }
  }
  console.log(`     ✓ ${players.length} players`);

  // ── 3. Games (50 games, DI men's teams only for realism) ─────────────
  console.log("  → Games...");
  const diMensTeams = teams.filter(
    (t) => t.division === Division.DI && t.gender === Gender.MENS
  );
  const diWomensTeams = teams.filter(
    (t) => t.division === Division.DI && t.gender === Gender.WOMENS
  );
  const season = 2025;
  const games = [];

  async function makeGames(pool: typeof teams, count: number) {
    for (let i = 0; i < count; i++) {
      const shuffled = [...pool].sort(() => Math.random() - 0.5);
      const home = shuffled[0];
      const away = shuffled[1];
      const daysBack = randInt(1, 80);
      const played   = daysBack > 5;
      const hs = played ? randInt(6, 18) : null;
      const as = played ? randInt(6, 18) : null;

      const game = await prisma.game.create({
        data: {
          season,
          week:       Math.ceil((i + 1) / 2),
          gameDate:   daysAgo(daysBack),
          homeTeamId: home.id,
          awayTeamId: away.id,
          homeScore:  hs,
          awayScore:  as,
          status:     played ? GameStatus.FINAL : GameStatus.SCHEDULED,
          venue:      `${home.city} Field`,
          attendance: played ? randInt(1500, 12000) : null,
          isPlayoff:  false,
        },
      });
      games.push(game);

      if (played) {
        const homePlayers = players.filter((p) => p.teamId === home.id);
        const awayPlayers = players.filter((p) => p.teamId === away.id);
        for (const p of [...homePlayers, ...awayPlayers]) {
          const isG = p.position === Position.GOALIE;
          await prisma.playerStat.create({
            data: {
              playerId:        p.id,
              gameId:          game.id,
              goals:           isG ? 0 : randInt(0, 4),
              assists:         isG ? 0 : randInt(0, 3),
              points:          isG ? 0 : randInt(0, 5),
              shots:           isG ? 0 : randInt(0, 8),
              shotsOnGoal:     isG ? 0 : randInt(0, 5),
              groundBalls:     randInt(0, 5),
              causedTurnovers: randInt(0, 3),
              turnovers:       randInt(0, 3),
              faceoffsWon:     p.position === Position.FACEOFF ? randInt(3, 12) : 0,
              faceoffsLost:    p.position === Position.FACEOFF ? randInt(2, 10) : 0,
              saves:           isG ? randInt(5, 15) : 0,
              goalsAllowed:    isG ? randInt(6, 16) : 0,
              minutesPlayed:   randInt(20, 60),
            },
          });
        }
        for (const t of [home, away]) {
          const fo = randInt(15, 30);
          await prisma.teamGameStat.create({
            data: {
              teamId:           t.id,
              gameId:           game.id,
              goals:            t.id === home.id ? (hs ?? 0) : (as ?? 0),
              assists:          randInt(4, 14),
              shots:            randInt(20, 45),
              shotsOnGoal:      randInt(12, 30),
              groundBalls:      randInt(15, 35),
              causedTurnovers:  randInt(5, 15),
              turnovers:        randInt(5, 15),
              faceoffsWon:      fo,
              faceoffsTotal:    fo + randInt(10, 25),
              clearingPct:      parseFloat((randInt(70, 98) / 100).toFixed(2)),
              emoPossessions:   randInt(2, 8),
              emoGoals:         randInt(0, 4),
              saves:            randInt(5, 15),
            },
          });
        }
      }
    }
  }

  await makeGames(diMensTeams, 30);
  await makeGames(diWomensTeams, 20);
  console.log(`     ✓ ${games.length} games`);

  // ── 4. Recruiting Commits (30) ────────────────────────────────────────
  console.log("  → Recruiting commits...");
  for (let i = 0; i < 30; i++) {
    const ht   = pick(HOMETOWNS);
    const team = pick(teams);
    await prisma.recruitingCommit.create({
      data: {
        firstName:    pick(FIRST_NAMES),
        lastName:     pick(LAST_NAMES),
        position:     pick(POSITIONS),
        gradYear:     pick([2026, 2027, 2028]),
        hometown:     ht.city,
        homeState:    ht.state,
        teamId:       team.id,
        commitDate:   daysAgo(randInt(1, 120)),
        stars:        randInt(3, 5),
        nationalRank: randInt(1, 150),
        positionRank: randInt(1, 40),
        stateRank:    randInt(1, 25),
        status:       pick([CommitStatus.COMMITTED, CommitStatus.SIGNED]),
      },
    });
  }
  console.log("     ✓ 30 recruiting commits");

  // ── 5. Rankings ───────────────────────────────────────────────────────
  console.log("  → Rankings...");
  for (const week of [1, 2, 3, 4]) {
    for (const genderPool of [diMensTeams, diWomensTeams]) {
      const shuffled = [...genderPool].sort(() => Math.random() - 0.5);
      for (let rank = 0; rank < Math.min(shuffled.length, 10); rank++) {
        await prisma.teamRanking.upsert({
          where: {
            teamId_season_week_source: {
              teamId: shuffled[rank].id,
              season,
              week,
              source: "LaxHub Poll",
            },
          },
          update: {},
          create: {
            teamId:        shuffled[rank].id,
            season,
            week,
            rank:          rank + 1,
            prevRank:      week > 1 ? randInt(1, 10) : null,
            source:        "LaxHub Poll",
            wins:          randInt(0, week * 2),
            losses:        randInt(0, week),
            pointsFor:     randInt(50, 200),
            pointsAgainst: randInt(40, 180),
          },
        });
      }
    }
  }

  const attackers = players.filter((p) => p.position === Position.ATTACK).slice(0, 15);
  for (let i = 0; i < attackers.length; i++) {
    await prisma.playerRanking.upsert({
      where: {
        playerId_season_week_category_source: {
          playerId: attackers[i].id,
          season,
          week: 4,
          category: "goals",
          source: "LaxHub",
        },
      },
      update: {},
      create: {
        playerId:  attackers[i].id,
        season,
        week:      4,
        rank:      i + 1,
        prevRank:  i > 0 ? i : null,
        category:  "goals",
        source:    "LaxHub",
        statValue: randInt(10, 45),
      },
    });
  }
  console.log("     ✓ rankings");

  // ── 6. News Articles ──────────────────────────────────────────────────
  console.log("  → News articles...");
  const articles = [
    { title: "Maryland Surges to Top of Big Ten Standings",        tags: ["Maryland","Big Ten","rankings"],       daysBack: 2  },
    { title: "Duke's Attack Sets Single-Season Scoring Record",    tags: ["Duke","ACC","records"],                daysBack: 5  },
    { title: "2026 Recruiting Class Shaping Up to Be Historic",    tags: ["recruiting","class-of-2026"],         daysBack: 8  },
    { title: "Virginia Goalie Named ACC Defensive Player of Week", tags: ["Virginia","ACC","defense"],           daysBack: 10 },
    { title: "Northwestern Women Undefeated Through Seven Games",  tags: ["Northwestern","Big Ten","women"],     daysBack: 3  },
    { title: "NCAA Expands DI Tournament Field to 18 Teams",       tags: ["NCAA","tournament"],                  daysBack: 14 },
    { title: "Denver Pioneers Climb to No. 3 in Big East Poll",    tags: ["Denver","Big East","rankings"],       daysBack: 6  },
    { title: "Top 2027 Recruits Making Early Official Visits",     tags: ["recruiting","class-of-2027"],         daysBack: 12 },
  ];
  for (const a of articles) {
    const summary = `${a.title}. Full coverage, analysis, and stats inside.`;
    await prisma.newsArticle.upsert({
      where:  { slug: slugify(a.title) },
      update: {},
      create: {
        title:       a.title,
        slug:        slugify(a.title),
        summary,
        body:        `<p>${summary} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>`,
        author:      "LaxHub Staff",
        tags:        a.tags,
        published:   true,
        publishedAt: daysAgo(a.daysBack),
      },
    });
  }
  console.log("     ✓ 8 news articles");

  console.log("\n✅ Seed complete!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
