
import { ArrowRight, Sparkles } from "lucide-react";
import GlowBadge from "./GlowBadge";
import ProductPreview from "./ProductPreview";
import { Typewriter } from "../ui/typewriter-text";

export default function HeroSection() {
  return (
    <section className="relative px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(125% 125% at 50% 10%, #fff 40%, #475569 100%)",
        }}
      />
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <GlowBadge>
            <Sparkles className="h-4 w-4" />
            Built for student founders
          </GlowBadge>
          <h1 className="landing-rise landing-hero-title mx-auto mt-6 max-w-4xl">
            The CRM built for student founders.
          </h1>
          <p className="landing-rise landing-section-copy mx-auto mt-5 max-w-2xl sm:text-lg sm:leading-8">
            Manage leads, close deals, and track payments in one lightweight workspace for 2-5 person founding teams.
          </p>
          <div id="get-started" className="landing-rise mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/register"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-300 transition duration-300 hover:-translate-y-0.5 hover:bg-slate-800 sm:w-auto"
            >
              Get started free
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-800 transition duration-300 hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-md sm:w-auto"
            >
              See how it works
            </a>
          </div>
        </div>

        <div className="mt-12">
          <ProductPreview />
        </div>
      </div>
    </section>
  );
}
