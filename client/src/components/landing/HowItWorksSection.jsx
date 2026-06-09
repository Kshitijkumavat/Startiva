import { useEffect, useRef } from "react";
import { steps } from "./landingData";

const stepMeta = [
  { tag: "Access", icon: "ti-key" },
  { tag: "Organize", icon: "ti-layout-board" },
  { tag: "Close", icon: "ti-circle-check" },
  { tag: "Launch", icon: "ti-rocket" },
];

export default function HowItWorksSection() {
  const tlRef = useRef(null);
  const spineFillRef = useRef(null);
  const dotRefs = useRef([]);
  const contentRefs = useRef([]);

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;

    function update() {
      const rect = tl.getBoundingClientRect();
      const windowH = window.innerHeight;
      const total = rect.height + windowH;
      const travelled = windowH - rect.top;
      const pct = Math.max(0, Math.min(100, (travelled / total) * 100));

      spineFillRef.current.style.height = `${pct}%`;

      dotRefs.current.forEach((dot, i) => {
        if (!dot) return;
        const dotRect = dot.getBoundingClientRect();
        const dotCenter = dotRect.top + dotRect.height / 2;
        const lit = dotCenter < windowH * 0.65; 
        dot.classList.toggle("hiw-dot-lit", lit);
        contentRefs.current[i]?.classList.toggle("hiw-content-lit", lit);
      });
    }

    window.addEventListener("scroll", update, { passive: true });
    update(); 
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <section id="how-it-works" className="bg-[#f7f8fc] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        <div className="mb-16 text-center">
          <p className="landing-eyebrow">
            How it works
          </p>
          <h2 className="landing-section-title mt-4">
            Up and running in minutes.
          </h2>
          <p className="landing-section-copy mx-auto mt-5 max-w-2xl">
            A simple sales workflow that moves from setup to closed deals without changing tools.
          </p>
        </div>

        <div ref={tlRef} className="relative flex flex-col items-center">

          <div className="absolute bottom-5 left-1/2 top-5 w-px -translate-x-1/2 overflow-hidden rounded-full bg-slate-200">
            <div
              ref={spineFillRef}
              className="absolute left-0 top-0 w-full rounded-full bg-teal-500 transition-[height] duration-300"
              style={{ height: "0%" }}
            />
          </div>

          {steps.map(({ icon: Icon, title, text }, i) => {
            const isLeft = i % 2 === 0;
            const meta = stepMeta[i] ?? { tag: "Step", icon: "ti-circle" };
            const num = String(i + 1).padStart(2, "0");

            const content = (
              <div
                ref={(el) => (contentRefs.current[i] = el)}
                className={`pt-1 opacity-40 transition-opacity duration-300 ${
                  isLeft ? "text-right pr-8" : "text-left pl-8"
                }`}
              >
                <p className={`mb-2 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest text-slate-400 ${isLeft ? "justify-end" : "justify-start"}`}>
                  <i className={`ti ${meta.icon}`} style={{ fontSize: 13 }} aria-hidden="true" />
                  {num} — {meta.tag}
                </p>
                <h3 className="text-2xl font-medium leading-tight text-slate-950 sm:text-3xl">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-500">{text}</p>
              </div>
            );

            const dot = (
              <div className="flex w-14 shrink-0 justify-center">
                <div
                  ref={(el) => (dotRefs.current[i] = el)}
                  className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-xs font-medium text-white transition-all duration-300"
                >
                  {num}
                </div>
              </div>
            );

            return (
              <div
                key={title}
                className="mb-16 grid w-full last:mb-0"
                style={{ gridTemplateColumns: "1fr 56px 1fr" }}
              >
                {isLeft ? (
                  <>
                    {content}
                    {dot}
                    <div />
                  </>
                ) : (
                  <>
                    <div />
                    {dot}
                    {content}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .hiw-dot-lit {
          transform: scale(1.1);
          background: #0F6E56 !important;
          box-shadow: 0 0 0 4px #E1F5EE;
        }
        .hiw-content-lit {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
}