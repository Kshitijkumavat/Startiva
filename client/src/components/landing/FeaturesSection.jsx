export default function FeaturesSection() {
  return (
    <section id="features" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="landing-eyebrow">Features</p>
          <h2 className="landing-section-title mt-4">
            Everything your team needs to close deals.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="row-span-2 rounded-xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-slate-300">
            <p className="landing-ui-label mb-2 flex items-center gap-1.5 text-teal-700">
              <i className="ti ti-layout-kanban text-[13px]" aria-hidden="true" /> Deal pipeline
            </p>
            <h3 className="landing-card-title">Visual pipeline that moves with you.</h3>
            <p className="landing-card-copy mt-2">
              Track every lead from first contact to closed deal - all in one place.
            </p>

            <div className="mt-4 overflow-hidden rounded-lg border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-sky-50">
              {[
                { name: "Acme Corp", stage: "Proposal", color: "#1D9E75", amount: "$4,200" },
                { name: "Nova Labs", stage: "Negotiation", color: "#5DCAA5", amount: "$2,800" },
                { name: "Pear Inc.", stage: "Outreach", color: "#9FE1CB", amount: "$1,500" },
                { name: "Studio K", stage: "New", color: "#E1F5EE", amount: "$900" },
              ].map(({ name, stage, color, amount }, i, arr) => (
                <div
                  key={name}
                  className={`flex items-center justify-between gap-3 px-3 py-2 text-xs ${i !== arr.length - 1 ? "border-b border-slate-100" : ""}`}
                >
                  <span className="font-medium text-slate-900">{name}</span>
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
                    {stage}
                  </span>
                  <span className="font-semibold text-teal-700">{amount}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 flex gap-2">
              <div className="flex-1 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2.5">
                <p className="text-lg font-semibold text-slate-950">$9.4k</p>
                <p className="text-xs font-medium text-emerald-700">Pipeline value</p>
              </div>
              <div className="flex-1 rounded-lg border border-sky-100 bg-sky-50 px-3 py-2.5">
                <p className="text-lg font-semibold text-slate-950">4</p>
                <p className="text-xs font-medium text-sky-700">Active deals</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-slate-300">
            <p className="landing-ui-label mb-2 flex items-center gap-1.5 text-teal-700">
              <i className="ti ti-chart-bar text-[13px]" aria-hidden="true" /> Revenue
            </p>
            <h3 className="landing-card-title">Track payments at a glance.</h3>
            <p className="landing-card-copy mt-2">See what's paid, pending, and overdue in seconds.</p>
            <div className="mt-4 flex h-14 items-end gap-1.5 rounded-lg bg-gradient-to-br from-sky-50 via-white to-amber-50 px-2 pb-1.5 pt-3">
              {[
                { height: 40, color: "#38BDF8" },
                { height: 55, color: "#14B8A6" },
                { height: 35, color: "#F59E0B" },
                { height: 80, color: "#22C55E" },
                { height: 60, color: "#A78BFA" },
                { height: 70, color: "#06B6D4" },
                { height: 90, color: "#10B981" },
              ].map(({ height, color }, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t shadow-sm"
                  style={{ height: `${height}%`, background: color }}
                />
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-slate-300">
            <p className="landing-ui-label mb-2 flex items-center gap-1.5 text-teal-700">
              <i className="ti ti-activity text-[13px]" aria-hidden="true" /> Activity feed
            </p>
            <h3 className="landing-card-title">Know what your team is up to.</h3>
            <p className="landing-card-copy mt-2">Real-time log of every action across your workspace.</p>
            <div className="mt-3 flex flex-col rounded-lg bg-gradient-to-br from-indigo-50 via-white to-rose-50 px-3">
              {[
                { text: "Deal Acme Corp moved to Proposal", time: "2 min ago", color: "bg-indigo-500" },
                { text: "Payment of $1,200 marked received", time: "18 min ago", color: "bg-emerald-500" },
                { text: "Priya added a new contact", time: "1 hr ago", color: "bg-rose-500" },
              ].map(({ text, time, color }, i, arr) => (
                <div
                  key={i}
                  className={`flex items-start gap-2.5 py-2 ${i !== arr.length - 1 ? "border-b border-slate-100" : ""}`}
                >
                  <div className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${color}`} />
                  <div>
                    <p className="text-xs leading-5 text-slate-800">{text}</p>
                    <p className="mt-0.5 text-[11px] text-slate-400">{time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-slate-300">
            <p className="landing-ui-label mb-2 flex items-center gap-1.5 text-teal-700">
              <i className="ti ti-messages text-[13px]" aria-hidden="true" /> Shared inbox
            </p>
            <h3 className="landing-card-title">Reply to leads without switching tabs.</h3>
            <p className="landing-card-copy mt-2">Email threads, right inside your CRM.</p>
            <div className="mt-3 overflow-hidden rounded-lg border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-cyan-50">
              <div className="flex flex-col gap-2 p-3">
                <p className="text-center text-[11px] text-slate-400">Today, 10:42 AM</p>
                <div className="max-w-[80%] self-start rounded-xl rounded-bl-sm bg-white px-3 py-2 text-xs leading-5 text-slate-800 shadow-sm ring-1 ring-violet-100">
                  Hey, can you send over the proposal?
                </div>
                <div className="max-w-[80%] self-end rounded-xl rounded-br-sm bg-gradient-to-r from-teal-600 to-sky-600 px-3 py-2 text-xs leading-5 text-white shadow-sm">
                  Sure! Sending it right now.
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-slate-300">
            <p className="landing-ui-label mb-2 flex items-center gap-1.5 text-teal-700">
              <i className="ti ti-tags text-[13px]" aria-hidden="true" /> Smart tagging
            </p>
            <h3 className="landing-card-title">Organize contacts your way.</h3>
            <p className="landing-card-copy mt-2">
              Custom tags to filter, segment and prioritize your leads instantly.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {[
                { label: "Hot lead", tone: "border-rose-200 bg-rose-50 text-rose-700" },
                { label: "Paid", tone: "border-emerald-200 bg-emerald-50 text-emerald-700" },
                { label: "Follow up", tone: "border-amber-200 bg-amber-50 text-amber-700" },
                { label: "Enterprise", tone: "border-indigo-200 bg-indigo-50 text-indigo-700" },
                { label: "Student", tone: "border-sky-200 bg-sky-50 text-sky-700" },
                { label: "Closed", tone: "border-teal-200 bg-teal-50 text-teal-700" },
                { label: "Demo done", tone: "border-violet-200 bg-violet-50 text-violet-700" },
              ].map(({ label, tone }) => (
                <span
                  key={label}
                  className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${tone}`}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
