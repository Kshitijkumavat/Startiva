import { painPoints } from "./landingData";

const problemDetails = [
  {
    label: "Scattered",
    text: "Lead notes, owners, and next steps end up living in different tools.",
    tone: "from-sky-50 to-cyan-50 border-sky-100 text-sky-700",
    iconTone: "bg-sky-100 text-sky-700 ring-sky-200",
  },
  {
    label: "Manual",
    text: "Proposal work slows down when every scope starts from a blank page.",
    tone: "from-violet-50 to-fuchsia-50 border-violet-100 text-violet-700",
    iconTone: "bg-violet-100 text-violet-700 ring-violet-200",
  },
  {
    label: "Missed",
    text: "Payment updates and overdue follow-ups are easy to lose track of.",
    tone: "from-amber-50 to-orange-50 border-amber-100 text-amber-700",
    iconTone: "bg-amber-100 text-amber-700 ring-amber-200",
  },
];

export default function ProblemSection() {
  return (
    <section
      id="problem"
      className="relative overflow-hidden border-y border-slate-200 bg-white px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.12),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(245,158,11,0.10),_transparent_30%)]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="landing-eyebrow">Sound familiar?</p>
          <h2 className="landing-section-title mt-4">
            Selling should not feel like managing five different workspaces.
          </h2>
          <p className="landing-section-copy mx-auto mt-5 max-w-2xl">
            Student teams move fast, but sales work gets messy when leads, proposals, and payments are split across tabs.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {painPoints.map(({ icon: Icon, title }, index) => {
            const detail = problemDetails[index];

            return (
              <article
                key={title}
                className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br ${detail.tone} p-5 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70`}
              >
                <div className="absolute right-4 top-4 text-5xl font-semibold leading-none text-white/70">
                  0{index + 1}
                </div>

                <div className="relative">
                  <div className={`grid h-12 w-12 place-items-center rounded-xl ring-1 transition duration-300 group-hover:scale-105 ${detail.iconTone}`}>
                    <Icon className="h-5 w-5" />
                  </div>

                  <p className="landing-ui-label mt-6">{detail.label}</p>
                  <h3 className="landing-card-title mt-2">{title}</h3>
                  <p className="landing-card-copy mt-3">{detail.text}</p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mx-auto mt-8 flex max-w-2xl items-center justify-center gap-3 rounded-full border border-cyan-100 bg-cyan-50/80 px-5 py-3 text-center text-sm font-medium text-cyan-800 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-cyan-500" />
          There's a better way to keep the whole sales motion together.
        </div>
      </div>
    </section>
  );
}
