"use client";

import { FormEvent, useState } from "react";

export default function MatchesPage() {
  const [jsonText, setJsonText] = useState<string>("[]");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setResult(null);

    let parsedData;
    try {
      parsedData = JSON.parse(jsonText);
    } catch (parseError) {
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

      const payload = await response.json().catch(() => null);
      if (!response.ok) {
        const serverMessage = payload && typeof payload === "object" && "message" in payload ? String((payload as any).message) : response.statusText;
        throw new Error(serverMessage || "Failed to process JSON data.");
      }

      setResult(JSON.stringify(payload, null, 2));
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : String(fetchError));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <section className="rounded-[2rem] bg-white p-8 shadow-[0_25px_80px_rgba(15,23,42,0.08)]">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Matches processor</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900">Paste JSON and send it to the backend</h1>
            </div>
            <p className="max-w-xl text-sm text-slate-600">
              Enter JSON data below, then submit it for backend processing. The result will appear in the output panel.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="flex flex-col w-full max-w-full overflow-hidden">
              <label htmlFor="json-input" className="mb-2 block text-sm font-medium text-slate-700">
                JSON input
              </label>
              <textarea
                id="json-input"
                value={jsonText}
                onChange={(event) => setJsonText(event.target.value)}
                rows={16}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                placeholder="Paste your JSON data here..."
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center justify-center rounded-3xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {isLoading ? "Processing…" : "Send to backend"}
              </button>
              <p className="text-sm text-slate-500">
                Tip: make sure the JSON is valid before submitting.
              </p>
            </div>
          </form>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr] items-start">
            <div className=" overflow-hidden rounded-3xl border border-slate-200 bg-slate-950/95 p-6 text-slate-100 shadow-[0_15px_30px_rgba(15,23,42,0.08)]">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Raw request</p>
              <pre className="mt-4 max-h-[360px] overflow-auto whitespace-pre-wrap break-words text-sm text-slate-100">
                {jsonText}
              </pre>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_15px_30px_rgba(15,23,42,0.08)]">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Backend response</p>
                {error ? <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700">Error</span> : null}
              </div>
              <div className="mt-4 min-h-[220px] overflow-auto rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900">
                {error ? (
                  <pre className="whitespace-pre-wrap text-rose-700">{error}</pre>
                ) : result ? (
                  <pre className="whitespace-pre-wrap">{result}</pre>
                ) : (
                  <p className="text-sm text-slate-500">No result yet. Submit JSON to see backend output.</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
