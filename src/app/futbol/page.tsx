"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type Match = {
  round: string;
  date: string;
  time: string;
  team1: string;
  team2: string;
  score: number[] | null;
  finished: boolean;
};

type Standing = {
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  pts: number;
};

type Data = {
  name: string;
  league: string;
  leagueName: string;
  season: string;
  requestedSeason?: string;
  seasons: string[];
  rounds: string[];
  currentRound: string;
  matches: Match[];
  standings: Standing[];
};

const LEAGUES = [
  { id: "tr", label: "Süper Lig", flag: "🇹🇷" },
  { id: "en", label: "Premier League", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { id: "es", label: "La Liga", flag: "🇪🇸" },
];

function FutbolPageInner() {
  const searchParams = useSearchParams();
  const initialLeague = searchParams.get("league") || "tr";
  const initialSeason = searchParams.get("season") || "2026-27";
  const [league, setLeague] = useState(initialLeague);
  const [season, setSeason] = useState(initialSeason);
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRound, setSelectedRound] = useState<string | null>(null);
  const [tab, setTab] = useState<"standings" | "fixtures">("standings");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(`/api/football?league=${league}&season=${season}`)
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        if (d.error) {
          setError(d.error);
          setData(null);
        } else {
          setData(d);
          setSelectedRound(d.currentRound);
          if (d.season && d.season !== season) setSeason(d.season);
        }
      })
      .catch(() => {
        if (!cancelled) setError("Veri alınamadı");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [league, season]);

  const roundMatches = data
    ? data.matches.filter((m) => m.round === selectedRound)
    : [];

  const roundIndex = data ? data.rounds.indexOf(selectedRound ?? "") : -1;

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-white/60 transition-colors hover:text-white"
          >
            ← Ana sayfa
          </Link>
          <h1 className="text-2xl font-bold">⚽ Futbol</h1>
          <div className="w-20" />
        </div>

        {/* League tabs */}
        <div className="mb-4 flex flex-wrap gap-2">
          {LEAGUES.map((l) => (
            <button
              key={l.id}
              onClick={() => setLeague(l.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                league === l.id
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                  : "border border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              {l.flag} {l.label}
            </button>
          ))}
        </div>

        {/* Season selector */}
        <div className="mb-6 flex items-center gap-3">
          <label className="text-sm text-white/60">Sezon:</label>
          <select
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white focus:outline-none"
          >
            {(data?.seasons ?? ["2026-27", "2025-26", "2024-25"]).map((s) => (
              <option key={s} value={s} className="bg-[#0a0a0f]">
                {s}
              </option>
            ))}
          </select>
          {data && (
            <span className="text-sm text-white/50">{data.name}</span>
          )}
          {data && data.requestedSeason && data.requestedSeason !== data.season && (
            <span className="text-xs text-yellow-400">
              ({data.requestedSeason} verisi yok, {data.season} gösteriliyor)
            </span>
          )}
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-emerald-500" />
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        {data && !loading && (
          <>
            {/* Tab switcher */}
            <div className="mb-4 flex gap-1 rounded-xl border border-white/10 bg-white/5 p-1">
              <button
                onClick={() => setTab("standings")}
                className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                  tab === "standings"
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Puan Durumu
              </button>
              <button
                onClick={() => setTab("fixtures")}
                className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                  tab === "fixtures"
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Fikstür
              </button>
            </div>

            {tab === "standings" && (
              <StandingsTable standings={data.standings} />
            )}

            {tab === "fixtures" && (
              <Fixtures
                rounds={data.rounds}
                selectedRound={selectedRound}
                setSelectedRound={setSelectedRound}
                roundIndex={roundIndex}
                matches={roundMatches}
              />
            )}
          </>
        )}
      </div>
    </main>
  );
}

function StandingsTable({ standings }: { standings: Standing[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wider text-white/50">
            <th className="px-3 py-3">#</th>
            <th className="px-3 py-3">Takım</th>
            <th className="px-2 py-3 text-center">O</th>
            <th className="px-2 py-3 text-center">G</th>
            <th className="px-2 py-3 text-center">B</th>
            <th className="px-2 py-3 text-center">M</th>
            <th className="px-2 py-3 text-center">AG</th>
            <th className="px-2 py-3 text-center">YG</th>
            <th className="px-2 py-3 text-center">AV</th>
            <th className="px-2 py-3 text-center font-bold">P</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((s, i) => (
            <tr
              key={s.team}
              className="border-b border-white/5 transition-colors hover:bg-white/5"
            >
              <td className="px-3 py-2.5 font-mono text-white/60">{i + 1}</td>
              <td className="px-3 py-2.5 font-medium">{s.team}</td>
              <td className="px-2 py-2.5 text-center">{s.played}</td>
              <td className="px-2 py-2.5 text-center">{s.won}</td>
              <td className="px-2 py-2.5 text-center">{s.drawn}</td>
              <td className="px-2 py-2.5 text-center">{s.lost}</td>
              <td className="px-2 py-2.5 text-center">{s.gf}</td>
              <td className="px-2 py-2.5 text-center">{s.ga}</td>
              <td className="px-2 py-2.5 text-center">{s.gd}</td>
              <td className="px-2 py-2.5 text-center font-bold text-emerald-400">
                {s.pts}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Fixtures({
  rounds,
  selectedRound,
  setSelectedRound,
  roundIndex,
  matches,
}: {
  rounds: string[];
  selectedRound: string | null;
  setSelectedRound: (r: string) => void;
  roundIndex: number;
  matches: Match[];
}) {
  const go = (dir: -1 | 1) => {
    const i = roundIndex + dir;
    if (i < 0 || i >= rounds.length) return;
    setSelectedRound(rounds[i]);
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-2">
        <button
          onClick={() => go(-1)}
          disabled={roundIndex <= 0}
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm disabled:opacity-30"
        >
          ← Önceki
        </button>
        <select
          value={selectedRound ?? ""}
          onChange={(e) => setSelectedRound(e.target.value)}
          className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white focus:outline-none"
        >
          {rounds.map((r) => (
            <option key={r} value={r} className="bg-[#0a0a0f]">
              {r}
            </option>
          ))}
        </select>
        <button
          onClick={() => go(1)}
          disabled={roundIndex >= rounds.length - 1}
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm disabled:opacity-30"
        >
          Sonraki →
        </button>
      </div>

      <div className="space-y-2">
        {matches.map((m, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3"
          >
            <div className="flex-1 text-sm">{m.team1}</div>
            <div className="mx-4 text-center">
              {m.score ? (
                <span className="font-bold text-emerald-400">
                  {m.score[0]} - {m.score[1]}
                </span>
              ) : (
                <span className="text-xs text-white/40">{m.time || "vs"}</span>
              )}
            </div>
            <div className="flex-1 text-right text-sm">{m.team2}</div>
          </div>
        ))}
        {matches.length === 0 && (
          <p className="py-8 text-center text-sm text-white/50">
            Bu hafta için maç bulunamadı.
          </p>
        )}
      </div>
    </div>
  );
}

export default function FutbolPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0f]" />}>
      <FutbolPageInner />
    </Suspense>
  );
}
