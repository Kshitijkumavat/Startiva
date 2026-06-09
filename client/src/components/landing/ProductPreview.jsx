import { CheckCircle2, FileText, Send, Users } from "lucide-react";
import PipelineCard from "./PipelineCard";

export default function ProductPreview() {
  return (
    <div className="landing-float relative mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-200/70">
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
            $12.4k ready to collect
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.85fr_1.35fr_0.9fr]">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <p className="landing-ui-label text-slate-500">Team</p>
              <Users className="h-4 w-4 text-slate-400" />
            </div>
            <div className="space-y-3">
              {["Aarav", "Maya", "Jordan"].map((name, index) => (
                <div key={name} className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-full ${["bg-cyan-100", "bg-amber-100", "bg-violet-100"][index]}`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-700">{name}</p>
                    <div className="mt-1 h-1.5 rounded-full bg-slate-100">
                      <div className={`h-1.5 rounded-full ${["w-3/4 bg-cyan-500", "w-1/2 bg-amber-500", "w-2/3 bg-violet-500"][index]}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <PipelineCard title="New" amount="$8.2k" tone="bg-cyan-500" items={["Campus app", "Brand refresh"]} />
            <PipelineCard title="Proposal" amount="$14.8k" tone="bg-amber-500" items={["AI tutor pilot", "Creator CRM"]} />
            <PipelineCard title="Won" amount="$6.4k" tone="bg-emerald-500" items={["Design sprint"]} />
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
