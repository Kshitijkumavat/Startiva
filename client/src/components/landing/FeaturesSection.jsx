import { features } from "./landingData";

export default function FeaturesSection() {
  return (
    <section id="features" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        <div className="mx-auto max-w-2xl text-center mb-10">
          <p className="text-xs font-medium uppercase tracking-widest text-teal-700">Features</p>
          <h2 className="mt-3 text-3xl font-medium text-slate-950 sm:text-4xl">
            Everything your team needs to close deals.
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3">

          <div className="row-span-2 rounded-xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-slate-300">
            <p className="mb-2 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-teal-700">
              <i className="ti ti-layout-kanban text-[13px]" aria-hidden="true" /> Deal pipeline
            </p>
            <h3 className="text-sm font-medium text-slate-950">Visual pipeline that moves with you.</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
              Track every lead from first contact to closed deal — all in one place.
            </p>

            <div className="mt-4 overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
              {[
                { name: "Acme Corp", stage: "Proposal", color: "#1D9E75", amount: "$4,200" },
                { name: "Nova Labs", stage: "Negotiation", color: "#5DCAA5", amount: "$2,800" },
                { name: "Pear Inc.", stage: "Outreach", color: "#9FE1CB", amount: "$1,500" },
                { name: "Studio K", stage: "New", color: "#E1F5EE", amount: "$900" },
              ].map(({ name, stage, color, amount }, i, arr) => (
                <div
                  key={name}
                  className={`flex items-center justify-between px-3 py-2 text-[11px] ${i !== arr.length - 1 ? "border-b border-slate-100" : ""}`}
                >
                  <span className="font-medium text-slate-900">{name}</span>
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
                    {stage}
                  </span>
                  <span className="font-medium text-teal-700">{amount}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 flex gap-2">
              <div className="flex-1 rounded-lg bg-slate-50 px-3 py-2.5">
                <p className="text-lg font-medium text-slate-950">$9.4k</p>
                <p className="text-[10px] text-slate-500">Pipeline value</p>
              </div>
              <div className="flex-1 rounded-lg bg-slate-50 px-3 py-2.5">
                <p className="text-lg font-medium text-slate-950">4</p>
                <p className="text-[10px] text-slate-500">Active deals</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-slate-300">
            <p className="mb-2 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-teal-700">
              <i className="ti ti-chart-bar text-[13px]" aria-hidden="true" /> Revenue
            </p>
            <h3 className="text-sm font-medium text-slate-950">Track payments at a glance.</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
              See what's paid, pending, and overdue in seconds.
            </p>
            <div className="mt-4 flex h-14 items-end gap-1.5 px-1">
              {[40, 55, 35, 80, 60, 70, 90].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t"
                  style={{
                    height: `${h}%`,
                    background: i === 3 || i === 6 ? "#1D9E75" : "#E1F5EE",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-slate-300">
            <p className="mb-2 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-teal-700">
              <i className="ti ti-activity text-[13px]" aria-hidden="true" /> Activity feed
            </p>
            <h3 className="text-sm font-medium text-slate-950">Know what your team is up to.</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
              Real-time log of every action across your workspace.
            </p>
            <div className="mt-3 flex flex-col">
              {[
                { text: "Deal Acme Corp moved to Proposal", time: "2 min ago" },
                { text: "Payment of $1,200 marked received", time: "18 min ago" },
                { text: "Priya added a new contact", time: "1 hr ago" },
              ].map(({ text, time }, i, arr) => (
                <div
                  key={i}
                  className={`flex items-start gap-2.5 py-2 ${i !== arr.length - 1 ? "border-b border-slate-100" : ""}`}
                >
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                  <div>
                    <p className="text-[11px] leading-snug text-slate-800">{text}</p>
                    <p className="mt-0.5 text-[10px] text-slate-400">{time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-slate-300">
            <p className="mb-2 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-teal-700">
              <i className="ti ti-messages text-[13px]" aria-hidden="true" /> Shared inbox
            </p>
            <h3 className="text-sm font-medium text-slate-950">Reply to leads without switching tabs.</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
              Email threads, right inside your CRM.
            </p>
            <div className="mt-3 overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
              <div className="flex flex-col gap-2 p-3">
                <p className="text-center text-[10px] text-slate-400">Today, 10:42 AM</p>
                <div className="max-w-[80%] self-start rounded-xl rounded-bl-sm bg-slate-200 px-3 py-2 text-[11px] leading-snug text-slate-800">
                  Hey, can you send over the proposal?
                </div>
                <div className="max-w-[80%] self-end rounded-xl rounded-br-sm bg-teal-600 px-3 py-2 text-[11px] leading-snug text-white">
                  Sure! Sending it right now.
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-slate-300">
            <p className="mb-2 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-teal-700">
              <i className="ti ti-tags text-[13px]" aria-hidden="true" /> Smart tagging
            </p>
            <h3 className="text-sm font-medium text-slate-950">Organize contacts your way.</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
              Custom tags to filter, segment and prioritize your leads instantly.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {[
                { label: "Hot lead", green: true },
                { label: "Paid", green: true },
                { label: "Follow up", green: false },
                { label: "Enterprise", green: false },
                { label: "Student", green: false },
                { label: "Closed", green: true },
                { label: "Demo done", green: false },
              ].map(({ label, green }) => (
                <span
                  key={label}
                  className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${
                    green
                      ? "border-teal-200 bg-teal-50 text-teal-700"
                      : "border-slate-200 bg-slate-50 text-slate-500"
                  }`}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
      <style>{`@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');`}</style>
    </section>
  );
}