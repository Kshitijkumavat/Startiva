
import ArrowFillButton from "../ui/ArrowFillButton";
import ProductPreview from "./ProductPreview";

export default function HeroSection() {
  return (
    <section className="relative px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <br />
          <h1 className="landing-rise landing-hero-title mx-auto mt-6 max-w-4xl">
            The CRM built for student founders.
          </h1>
          <p className="landing-rise landing-section-copy mx-auto mt-5 max-w-2xl sm:text-lg sm:leading-8">
            Manage leads, close deals, and track payments in one lightweight workspace for 2-5 person founding teams.
          </p>
          <div id="get-started" className="landing-rise mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ArrowFillButton
              btnText="Get started free"
              href="/register"
              bgColor="#1b395bff"
              textColor="#ffffff"
              fillBgColor="#ffffff"
              fillTextColor="#1b395bff"
              hoverFillBgColor="#ffffff"
              hoverFillTextColor="#1b395bff"
            />
            <a
              href="#how-it-works"
              className="inline-flex h-[48px] w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/80 px-7 text-sm font-semibold text-slate-800 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-white hover:shadow-md sm:h-[50px] sm:w-auto sm:text-[15px]"
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
