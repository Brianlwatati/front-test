import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Enrollment | App",
  description: "Dashboard and enrollment management for the student enrollment app.",
};

export default function WebappLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col">
        <header className="border-b border-slate-800 bg-slate-950/95 px-6 py-4 backdrop-blur-xl">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-sky-500/20 text-sky-300 ring-1 ring-sky-500/20">
                SE
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Student Enrollment</p>
                <h1 className="text-xl font-semibold text-white">Admin console</h1>
              </div>
            </div>

            <div className="hidden items-center gap-4 md:flex">
              <button className="rounded-full border border-slate-800 bg-slate-900/80 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-700 hover:bg-slate-800">
                Notifications
              </button>
              <button className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-400">
                New student
              </button>
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col lg:flex-row">
          <aside className="w-full border-b border-slate-800 bg-slate-950/95 px-6 py-8 lg:w-[300px] lg:border-r lg:border-b-0">
            <div className="space-y-6">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Navigation</p>
                <div className="mt-4 space-y-2">
                  <Link
                    href="/dashboard"
                    className="block rounded-3xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm font-medium text-slate-100 transition hover:border-slate-700 hover:bg-slate-900"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/enrollment"
                    className="block rounded-3xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm font-medium text-slate-100 transition hover:border-slate-700 hover:bg-slate-900"
                  >
                    Enrollment
                  </Link>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_0_60px_rgba(15,23,42,0.18)]">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Quick stats</p>
                <div className="mt-4 grid gap-4">
                  <div className="rounded-3xl bg-slate-950/90 p-4">
                    <p className="text-sm text-slate-400">Active enrollments</p>
                    <p className="mt-2 text-2xl font-semibold text-white">312</p>
                  </div>
                  <div className="rounded-3xl bg-slate-950/90 p-4">
                    <p className="text-sm text-slate-400">New signups</p>
                    <p className="mt-2 text-2xl font-semibold text-white">48</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1 bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-6xl rounded-[2rem] bg-white/90 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
