"use client";

import { FormEvent, useState } from "react";

type Match = {
  match: number;
  matchId: number;
  fixture: string;
  homeTeam: string;
  awayTeam: string;
  odds: {
    home: number;
    draw: number;
    away: number;
  };
  predictions: {
    prediction1: string;
    prediction2: string;
    prediction3: string;
    prediction4: string;
  };
};

type ApiResponse = {
  totalFixtures: number;
  matchday: number;
  teams: Match[];
};

export default function MatchesPage() {
  const [jsonText, setJsonText] = useState<string>("[]");
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setResult(null);

    let parsedData;
    try {
      parsedData = JSON.parse(jsonText);
    } catch {
      setError("Invalid JSON. Please fix formatting and try again.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/matches/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: parsedData }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.message || "Failed to process JSON data.");
      }

      setResult(payload);
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : String(fetchError));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">

        {/* HEADER */}
        <section className="rounded-[2rem] bg-white p-8 shadow">
          <h1 className="text-2xl font-semibold">Matches Processor</h1>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              rows={10}
              className="w-full rounded-xl border p-3 text-sm"
            />

            <button
              disabled={isLoading}
              className="rounded-xl bg-blue-600 px-5 py-2 text-white"
            >
              {isLoading ? "Processing..." : "Submit"}
            </button>
          </form>
        </section>

        {/* SUMMARY */}
        {result && (
          <section className="rounded-2xl bg-white p-6 shadow">
            <h2 className="text-xl font-semibold">
              Matchday {result.matchday}
            </h2>
            <p className="text-sm text-slate-500">
              Total Fixtures: {result.totalFixtures}
            </p>
          </section>
        )}

        {/* MATCH LIST */}
        {result && (
          <section className="grid gap-4 md:grid-cols-2">
            {result.teams.map((match) => (
              <div
                key={match.matchId}
                className="rounded-2xl border bg-white p-5 shadow-sm"
              >
                <h3 className="font-semibold text-lg">
                  {match.homeTeam} vs {match.awayTeam}
                </h3>

                <p className="text-xs text-slate-500">
                  Match ID: {match.matchId}
                </p>

                {/* ODDS */}
                <div className="mt-3">
                  <p className="text-sm font-medium">Odds</p>
                  <div className="flex gap-3 text-sm text-slate-600">
                    <span>H: {match.odds.home}</span>
                    <span>D: {match.odds.draw}</span>
                    <span>A: {match.odds.away}</span>
                  </div>
                </div>

                {/* PREDICTIONS */}
                <div className="mt-3">
                  <p className="text-sm font-medium">Predictions</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="rounded bg-slate-100 px-2 py-1">
                      {match.predictions.prediction1}
                    </span>
                    <span className="rounded bg-slate-100 px-2 py-1">
                      {match.predictions.prediction2}
                    </span>
                    <span className="rounded bg-slate-100 px-2 py-1">
                      {match.predictions.prediction3}
                    </span>
                    <span className="rounded bg-slate-100 px-2 py-1">
                      {match.predictions.prediction4}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* ERROR */}
        {error && (
          <div className="rounded-xl bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}
      </div>
    </main>
  );
}