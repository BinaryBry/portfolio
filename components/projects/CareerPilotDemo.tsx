"use client";

import { useMemo, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Pencil, Plus, RotateCcw, Search, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A browser-only recreation of CareerPilot's core flow (CRUD + dashboard) using
 * SAMPLE data. The real app is Flask + SQLite; this demo is labeled as such.
 */

type Status = "Applied" | "Interview" | "Offer" | "Rejected";
const STATUSES: Status[] = ["Applied", "Interview", "Offer", "Rejected"];

type Application = { id: number; company: string; role: string; status: Status; date: string; notes: string };

const SAMPLE: Application[] = [
  { id: 1, company: "Northwind Labs", role: "Software Engineering Intern", status: "Interview", date: "2026-10-02", notes: "Technical round scheduled; review SQL joins" },
  { id: 2, company: "Bluefin Security", role: "Security Analyst Intern", status: "Applied", date: "2026-10-09", notes: "Referred by a classmate" },
  { id: 3, company: "Atlas Robotics", role: "Backend Developer Intern", status: "Rejected", date: "2026-09-21", notes: "" },
  { id: 4, company: "Copperline Financial", role: "Technology Analyst Intern", status: "Offer", date: "2026-09-14", notes: "Offer deadline in two weeks" },
  { id: 5, company: "Lumen Health", role: "Full-Stack Developer Intern", status: "Applied", date: "2026-10-18", notes: "" },
  { id: 6, company: "Quarry Data", role: "Data Engineering Intern", status: "Interview", date: "2026-10-11", notes: "Recruiter screen went well" },
  { id: 7, company: "Harbor Cloud", role: "Cloud Security Intern", status: "Applied", date: "2026-10-24", notes: "Applied through career fair" },
  { id: 8, company: "Pinecrest Software", role: "Software Engineering Intern", status: "Rejected", date: "2026-09-28", notes: "Auto-reject after OA" },
];

const statusStyle: Record<Status, { dot: string; text: string; bar: string }> = {
  Applied: { dot: "bg-fg/70", text: "text-fg/80", bar: "bg-fg/60" },
  Interview: { dot: "bg-violet", text: "text-violet", bar: "bg-violet" },
  Offer: { dot: "bg-pink", text: "text-pink", bar: "bg-pink" },
  Rejected: { dot: "bg-subtle", text: "text-subtle", bar: "bg-white/15" },
};

type Draft = { company: string; role: string; status: Status; date: string; notes: string };
const emptyDraft = (): Draft => ({ company: "", role: "", status: "Applied", date: new Date().toISOString().slice(0, 10), notes: "" });

function pct(n: number, d: number) {
  return d === 0 ? "0%" : `${Math.round((n / d) * 100)}%`;
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function CareerPilotDemo() {
  const [apps, setApps] = useState<Application[]>(SAMPLE);
  const [filter, setFilter] = useState<Status | "All">("All");
  const [query, setQuery] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draft, setDraft] = useState<Draft>({ company: "", role: "", status: "Applied", date: "2026-11-15", notes: "" });
  const [error, setError] = useState("");
  const nextId = useRef(SAMPLE.length + 1);

  const counts = useMemo(() => {
    const c: Record<Status, number> = { Applied: 0, Interview: 0, Offer: 0, Rejected: 0 };
    apps.forEach((a) => (c[a.status] += 1));
    return c;
  }, [apps]);

  const total = apps.length;
  const reachedInterview = counts.Interview + counts.Offer;

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return apps
      .filter((a) => filter === "All" || a.status === filter)
      .filter((a) => !q || a.company.toLowerCase().includes(q) || a.role.toLowerCase().includes(q) || a.notes.toLowerCase().includes(q))
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [apps, filter, query]);

  function openAdd() {
    setEditingId(null);
    setDraft(emptyDraft());
    setError("");
    setFormOpen(true);
  }

  function openEdit(app: Application) {
    setEditingId(app.id);
    setDraft({ company: app.company, role: app.role, status: app.status, date: app.date, notes: app.notes });
    setError("");
    setFormOpen(true);
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    const company = draft.company.trim();
    const role = draft.role.trim();
    if (!company || !role) {
      setError("Company and role are required.");
      return;
    }
    if (editingId === null) {
      setApps((prev) => [{ id: nextId.current++, company, role, status: draft.status, date: draft.date, notes: draft.notes.trim() }, ...prev]);
    } else {
      setApps((prev) => prev.map((a) => (a.id === editingId ? { ...a, company, role, status: draft.status, date: draft.date, notes: draft.notes.trim() } : a)));
    }
    setFormOpen(false);
    setEditingId(null);
  }

  function updateStatus(id: number, status: Status) {
    setApps((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  }

  function remove(id: number) {
    setApps((prev) => prev.filter((a) => a.id !== id));
    if (editingId === id) setFormOpen(false);
  }

  function reset() {
    setApps(SAMPLE);
    setFilter("All");
    setQuery("");
    setFormOpen(false);
    nextId.current = SAMPLE.length + 1;
  }

  const stats = [
    { label: "Applications sent", value: String(total), hint: "total logged" },
    { label: "Interview rate", value: pct(reachedInterview, total), hint: "reached interview or offer" },
    { label: "Offer rate", value: pct(counts.Offer, total), hint: "of all applications" },
    { label: "Active", value: String(counts.Applied + counts.Interview), hint: "awaiting a decision" },
  ];

  const fieldBase =
    "w-full rounded-lg border border-line-strong bg-ink/60 px-3 text-[13.5px] text-fg placeholder:text-subtle focus:border-violet/60 focus:outline-none";
  const inputClass = `${fieldBase} h-10`;

  return (
    <div className="overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-[0_50px_120px_-50px_rgba(242,167,200,0.25)]">
      {/* window chrome */}
      <div className="flex items-center justify-between gap-3 border-b border-line bg-white/[0.02] px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
          </div>
          <span className="font-mono text-[12px] text-muted">careerpilot / dashboard</span>
        </div>
        <span className="rounded-full border border-violet/30 bg-violet/10 px-2.5 py-0.5 font-mono text-[10.5px] text-violet">
          Interactive demo · sample data
        </span>
      </div>

      <div className="p-4 md:p-6">
        {/* stats */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-line bg-ink/40 p-4">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-subtle">{s.label}</p>
              <motion.p
                key={s.value}
                initial={{ opacity: 0.4, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-[28px] font-semibold leading-none tracking-[-0.04em] text-fg"
              >
                {s.value}
              </motion.p>
              <p className="mt-1.5 text-[11.5px] text-subtle">{s.hint}</p>
            </div>
          ))}
        </div>

        {/* status breakdown */}
        <div className="mt-5">
          <div className="flex h-2 w-full overflow-hidden rounded-full bg-white/[0.04]" role="img" aria-label="Applications by status">
            {STATUSES.map((s) => (
              <motion.div
                key={s}
                className={statusStyle[s].bar}
                animate={{ width: total ? `${(counts[s] / total) * 100}%` : "0%" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </div>
          <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1">
            {STATUSES.map((s) => (
              <span key={s} className="inline-flex items-center gap-1.5 text-[12px] text-muted">
                <span className={cn("size-1.5 rounded-full", statusStyle[s].dot)} />
                {s} <span className="font-mono text-subtle">{counts[s]}</span>
              </span>
            ))}
          </div>
        </div>

        {/* toolbar */}
        <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-1" role="tablist" aria-label="Filter by status">
            {(["All", ...STATUSES] as const).map((s) => (
              <button
                key={s}
                type="button"
                role="tab"
                aria-selected={filter === s}
                onClick={() => setFilter(s)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-[12.5px] transition-colors",
                  filter === s ? "bg-white/[0.09] text-fg" : "text-muted hover:text-fg"
                )}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <label className="relative flex-1 md:w-56 md:flex-none">
              <span className="sr-only">Search applications</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-subtle" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search company, role, notes"
                className={cn(fieldBase, "h-9 pl-8")}
              />
            </label>
            <button
              type="button"
              onClick={openAdd}
              className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-fg px-3 text-[13px] font-medium text-ink transition-colors hover:bg-white"
            >
              <Plus className="size-3.5" /> Add
            </button>
          </div>
        </div>

        {/* add / edit form */}
        <AnimatePresence initial={false}>
          {formOpen ? (
            <motion.form
              key="form"
              onSubmit={submit}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-4 rounded-xl border border-violet/25 bg-violet/[0.04] p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[13px] font-medium text-fg">{editingId === null ? "New application" : "Edit application"}</p>
                  <button type="button" onClick={() => setFormOpen(false)} aria-label="Close form" className="text-subtle hover:text-fg">
                    <X className="size-4" />
                  </button>
                </div>
                <div className="grid gap-3 md:grid-cols-[1fr_1.3fr_0.8fr_0.9fr_auto]">
                  <label>
                    <span className="sr-only">Company</span>
                    <input className={inputClass} placeholder="Company" value={draft.company} onChange={(e) => setDraft({ ...draft, company: e.target.value })} />
                  </label>
                  <label>
                    <span className="sr-only">Role</span>
                    <input className={inputClass} placeholder="Role" value={draft.role} onChange={(e) => setDraft({ ...draft, role: e.target.value })} />
                  </label>
                  <label>
                    <span className="sr-only">Status</span>
                    <select className={inputClass} value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value as Status })}>
                      {STATUSES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span className="sr-only">Date applied</span>
                    <input type="date" className={inputClass} value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} />
                  </label>
                  <button type="submit" className="h-10 rounded-lg bg-violet px-4 text-[13px] font-medium text-ink transition-colors hover:bg-violet/90">
                    {editingId === null ? "Save" : "Update"}
                  </button>
                </div>
                <label className="mt-3 block">
                  <span className="sr-only">Notes</span>
                  <input className={inputClass} placeholder="Notes (optional): referral, next step, deadline…" value={draft.notes} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} />
                </label>
                {error ? <p className="mt-2 text-[12px] text-pink" role="alert">{error}</p> : null}
              </div>
            </motion.form>
          ) : null}
        </AnimatePresence>

        {/* table */}
        <div className="mt-4 overflow-x-auto rounded-xl border border-line">
          <table className="w-full min-w-[600px] text-left text-[13.5px]">
            <thead>
              <tr className="border-b border-line font-mono text-[10.5px] uppercase tracking-[0.14em] text-subtle">
                <th scope="col" className="px-4 py-3 font-normal">Company</th>
                <th scope="col" className="px-4 py-3 font-normal">Role</th>
                <th scope="col" className="px-4 py-3 font-normal">Status</th>
                <th scope="col" className="px-4 py-3 font-normal">Applied</th>
                <th scope="col" className="px-4 py-3 font-normal"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence initial={false}>
                {visible.map((a) => (
                  <motion.tr
                    key={a.id}
                    initial={{ opacity: 0, backgroundColor: "rgba(183,166,247,0.08)" }}
                    animate={{ opacity: 1, backgroundColor: "rgba(183,166,247,0)" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="group border-b border-line last:border-b-0"
                  >
                    <td className="px-4 py-3 font-medium text-fg">{a.company}</td>
                    <td className="px-4 py-3 text-muted">
                      {a.role}
                      {a.notes ? <span className="mt-0.5 block max-w-[260px] truncate text-[12px] text-subtle">{a.notes}</span> : null}
                    </td>
                    <td className="px-4 py-2">
                      <label className="relative inline-flex items-center">
                        <span className="sr-only">Status for {a.company}</span>
                        <span className={cn("pointer-events-none absolute left-2.5 size-1.5 rounded-full", statusStyle[a.status].dot)} />
                        <select
                          value={a.status}
                          onChange={(e) => updateStatus(a.id, e.target.value as Status)}
                          className={cn(
                            "h-8 cursor-pointer appearance-none rounded-full border border-line bg-transparent pl-6 pr-3 text-[12.5px] hover:border-line-strong focus:outline-none",
                            statusStyle[a.status].text
                          )}
                        >
                          {STATUSES.map((s) => (
                            <option key={s} className="bg-surface text-fg">{s}</option>
                          ))}
                        </select>
                      </label>
                    </td>
                    <td className="px-4 py-3 font-mono text-[12px] text-muted">{formatDate(a.date)}</td>
                    <td className="px-3 py-2">
                      <div className="flex justify-end gap-1 opacity-60 transition-opacity group-hover:opacity-100">
                        <button type="button" onClick={() => openEdit(a)} aria-label={`Edit ${a.company}`} className="rounded-md p-1.5 text-muted hover:bg-white/[0.06] hover:text-fg">
                          <Pencil className="size-3.5" />
                        </button>
                        <button type="button" onClick={() => remove(a.id)} aria-label={`Delete ${a.company}`} className="rounded-md p-1.5 text-muted hover:bg-pink/10 hover:text-pink">
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {visible.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-[13px] text-subtle">
                    No applications match. Try another filter, or add one.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-start gap-3 rounded-xl border border-dashed border-line-strong px-4 py-3">
          <span className="mt-0.5 shrink-0 rounded-full bg-violet/10 px-2 py-0.5 font-mono text-[10.5px] text-violet">Planned · phase 4</span>
          <p className="text-[12.5px] leading-relaxed text-muted">
            Success Pattern Analyzer: groups these same records by role type (e.g. Python- vs. Java-focused) and compares response
            rates. The numbers will be computed with SQL-style aggregation; an LLM will only explain them in plain English.
          </p>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[12px] text-subtle">
          <p>Runs in your browser with made-up companies. The real CareerPilot runs on Flask + SQLite.</p>
          <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 hover:text-fg">
            <RotateCcw className="size-3" /> Reset demo
          </button>
        </div>
      </div>
    </div>
  );
}
