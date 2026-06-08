import { steps } from "./landingData";

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-20 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-cyan-200/20 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-5xl">
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <p className="text-sm font-bold uppercase text-cyan-700">How it Works</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
            Up and running in minutes.
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-cyan-200 via-slate-200 to-transparent md:block" />

          <div className="space-y-8">
            {steps.map(({ icon: Icon, title, text }, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={title}
                  className="grid items-center gap-8 md:grid-cols-2"
                >
                  <div
                    className={`${
                      isLeft ? "md:pr-14" : "md:order-2 md:pl-14"
                    }`}
                  >
                    <div className="group relative rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl">
                      
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-50/0 to-cyan-100/0 opacity-0 transition duration-300 group-hover:opacity-100" />

                      <div className="relative z-10">
                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 ring-1 ring-cyan-100 transition duration-300 group-hover:scale-110">
                          <Icon className="h-5 w-5 text-cyan-700" />
                        </div>

                        <div className="mb-3 flex items-center gap-3">
                          <span className="text-sm font-medium text-cyan-700">
                            Step {index + 1}
                          </span>
                        </div>

                        <h3 className="text-xl font-semibold text-slate-950">
                          {title}
                        </h3>

                        <p className="mt-3 text-sm leading-7 text-slate-600">
                          {text}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`relative hidden md:flex ${
                      isLeft ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div className="absolute left-1/2 top-1/2 h-px w-full -translate-y-1/2 bg-slate-200" />

                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-cyan-200 bg-white shadow-md ring-8 ring-slate-50">
                      <span className="text-sm font-semibold text-cyan-700">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}