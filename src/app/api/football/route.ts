import { NextRequest, NextResponse } from "next/server";

export const revalidate = 3600; // data updates daily

const LEAGUES: Record<string, { file: string; name: string }> = {
  tr: { file: "tr.1", name: "Süper Lig" },
  en: { file: "en.1", name: "Premier League" },
  es: { file: "es.1", name: "La Liga" },
};

const SEASONS = ["2026-27", "2025-26", "2024-25", "2023-24"];

type Score = { ft?: number[] } | number[];

interface RawMatch {
  round: string;
  date: string;
  time?: string;
  team1: string;
  team2: string;
  score?: Score;
}

interface Match {
  round: string;
  date: string;
  time: string;
  team1: string;
  team2: string;
  score: number[] | null;
  finished: boolean;
}

interface Standing {
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  pts: number;
}

function ftOf(score: Score | undefined): number[] | null {
  if (!score) return null;
  if (Array.isArray(score)) return score.length >= 2 ? score : null;
  if (Array.isArray(score.ft)) return score.ft.length >= 2 ? score.ft : null;
  return null;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const league = searchParams.get("league") || "tr";
  const season = searchParams.get("season") || SEASONS[0];

  const info = LEAGUES[league];
  if (!info) {
    return NextResponse.json({ error: "unknown league" }, { status: 400 });
  }
  if (!SEASONS.includes(season)) {
    return NextResponse.json({ error: "unknown season" }, { status: 400 });
  }

  // Try requested season, then fall back to older ones if missing
  const candidateSeasons = [season, ...SEASONS.filter((s) => s !== season)];
  let usedSeason = season;
  let raw: { name: string; matches: RawMatch[] } | null = null;
  for (const cand of candidateSeasons) {
    const url = `https://raw.githubusercontent.com/openfootball/football.json/master/${cand}/${info.file}.json`;
    try {
      const res = await fetch(url, { next: { revalidate: 3600 } });
      if (res.ok) {
        raw = await res.json();
        usedSeason = cand;
        break;
      }
    } catch {
      // try next
    }
  }
  if (!raw) {
    return NextResponse.json(
      { error: "fetch failed", detail: "no season data available" },
      { status: 502 }
    );
  }

  const today = new Date().toISOString().slice(0, 10);

  const matches: Match[] = raw.matches.map((m) => {
    const ft = ftOf(m.score);
    const finished = !!ft && m.date <= today;
    return {
      round: m.round,
      date: m.date,
      time: m.time || "",
      team1: m.team1,
      team2: m.team2,
      score: ft,
      finished,
    };
  });

  // standings from finished matches
  const table = new Map<string, Standing>();
  const ensure = (team: string) => {
    if (!table.has(team)) {
      table.set(team, {
        team,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        gf: 0,
        ga: 0,
        gd: 0,
        pts: 0,
      });
    }
    return table.get(team)!;
  };

  for (const m of matches) {
    if (!m.finished || !m.score) continue;
    const [g1, g2] = m.score;
    const t1 = ensure(m.team1);
    const t2 = ensure(m.team2);
    t1.played++;
    t2.played++;
    t1.gf += g1;
    t1.ga += g2;
    t2.gf += g2;
    t2.ga += g1;
    if (g1 > g2) {
      t1.won++;
      t1.pts += 3;
      t2.lost++;
    } else if (g1 < g2) {
      t2.won++;
      t2.pts += 3;
      t1.lost++;
    } else {
      t1.drawn++;
      t2.drawn++;
      t1.pts++;
      t2.pts++;
    }
  }
  for (const t of table.values()) t.gd = t.gf - t.ga;

  const standings = [...table.values()].sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.gd !== a.gd) return b.gd - a.gd;
    if (b.gf !== a.gf) return b.gf - a.gf;
    return a.team.localeCompare(b.team);
  });

  const rounds = [...new Set(matches.map((m) => m.round))];

  // current round: round containing today, else next upcoming, else last
  let currentRound = rounds[0];
  const roundDates = new Map<string, { min: string; max: string }>();
  for (const r of rounds) {
    const ds = matches.filter((m) => m.round === r).map((m) => m.date);
    roundDates.set(r, { min: ds.reduce((a, b) => (a < b ? a : b)), max: ds.reduce((a, b) => (a > b ? a : b)) });
  }
  const containing = rounds.find((r) => {
    const d = roundDates.get(r)!;
    return d.min <= today && today <= d.max;
  });
  if (containing) {
    currentRound = containing;
  } else {
    const upcoming = rounds.find((r) => roundDates.get(r)!.min >= today);
    currentRound = upcoming || rounds[rounds.length - 1];
  }

  return NextResponse.json({
    name: raw.name,
    league,
    leagueName: info.name,
    season: usedSeason,
    requestedSeason: season,
    seasons: SEASONS,
    rounds,
    currentRound,
    matches,
    standings,
  });
}
