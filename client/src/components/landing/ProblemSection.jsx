import { painPoints } from "./landingData";

export default function ProblemSection() {
  return (
    <section id="problem" className="border-y border-slate-200 bg-white px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-sm font-bold uppercase text-cyan-700">Sound familiar?</p>
        <h2 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">The messy parts of selling, simplified.</h2>
        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {painPoints.map(({ icon: Icon, title }) => (
            <article
              key={title}
              className="group rounded-xl border border-slate-200 bg-slate-50 p-6 text-left transition duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:bg-white hover:shadow-xl hover:shadow-slate-200/70"
            >
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-white text-slate-700 shadow-sm transition group-hover:bg-cyan-600 group-hover:text-white">
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-5 text-base font-bold leading-6 text-slate-900">{title}</p>
            </article>
          ))}
        </div>
        <p className="mt-7 text-sm font-semibold text-slate-500">There's a better way.</p>
      </div>
    </section>
  );
}
