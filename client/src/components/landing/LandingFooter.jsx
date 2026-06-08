import Logo from "./Logo";

export default function LandingFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <Logo inverted />
          <span className="text-sm font-medium text-slate-400">Built by founders, for founders.</span>
        </div>
        <div className="flex gap-5 text-sm font-semibold text-slate-300">
          <a href="#" className="transition hover:text-white">
            Privacy
          </a>
          <a href="#" className="transition hover:text-white">
            Terms
          </a>
          <a href="#" className="transition hover:text-white">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
