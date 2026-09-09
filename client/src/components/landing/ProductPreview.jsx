import { useEffect, useRef, useState } from "react";
import { CheckCircle2, FileText, Send, Users } from "lucide-react";
import PipelineCard from "./PipelineCard";

function useCountUp(target, start, duration = 900) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!start || startedRef.current) return;
    startedRef.current = true;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setValue(target);
      return;
    }

    let raf;
    const startTime = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); 
      setValue(target * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);

  return value;
}

function formatK(value) {
  return `$${value.toFixed(1)}k`;
}

const TEAM = [
  { name: "Aarav", pct: 75, dot: "bg-cyan-100", bar: "bg-cyan-500" },
  { name: "Maya", pct: 50, dot: "bg-amber-100", bar: "bg-amber-500" },
  { name: "Jordan", pct: 66.67, dot: "bg-violet-100", bar: "bg-violet-500" },
];

export default function ProductPreview() {
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const newAmount = useCountUp(8.2, inView);
  const proposalAmount = useCountUp(14.8, inView);
  const wonAmount = useCountUp(6.4, inView);
  const readyToCollect = useCountUp(12.4, inView);

  return (
    <div
      ref={containerRef}
      className="landing-float relative mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-200/70"
    >
      <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 sm:p-5">
        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
            </div>
            <p className="text-sm font-semibold text-slate-950">Deal command center</p>
            <p className="text-xs font-medium text-slate-500">Pipeline, proposals, and payments in one place</p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            <CheckCircle2 className="h-3.5 w-3.5" />
            {formatK(readyToCollect)} ready to collect
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.85fr_1.35fr_0.9fr]">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <p className="landing-ui-label text-slate-500">Team</p>
              <Users className="h-4 w-4 text-slate-400" />
            </div>
            <div className="space-y-3">
              {TEAM.map((member) => (
                <div key={member.name} className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-full ${member.dot}`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-700">{member.name}</p>
                    <div className="mt-1 h-1.5 rounded-full bg-slate-100">
                      <div
                        className={`h-1.5 rounded-full ${member.bar} transition-[width] duration-[900ms] ease-out`}
                        style={{ width: inView ? `${member.pct}%` : "0%" }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <PipelineCard title="New" amount={formatK(newAmount)} tone="bg-cyan-500" items={["Campus app", "Brand refresh"]} />
            <PipelineCard title="Proposal" amount={formatK(proposalAmount)} tone="bg-amber-500" items={["AI tutor pilot", "Creator CRM"]} />
            <PipelineCard title="Won" amount={formatK(wonAmount)} tone="bg-emerald-500" items={["Design sprint"]} />
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-950 p-4 text-white shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <p className="landing-ui-label text-slate-400">Proposal</p>
              <FileText className="h-4 w-4 text-slate-400" />
            </div>
            <p className="text-sm font-semibold">AI tutor pilot</p>
            <p className="mt-2 text-xs leading-5 text-slate-400">
              Scope, milestones, and payment terms generated from your discovery notes.
            </p>
            <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-950 transition hover:bg-cyan-100">
              <Send className="h-3.5 w-3.5" />
              Send proposal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}