import { ChevronRight, Menu } from "lucide-react";
import Logo from "./Logo";

export default function LandingNav() {
  return (
    <nav className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Logo />
        <div className="hidden items-center gap-8 text-sm font-semibold text-slate-600 md:flex">
          <a href="#problem" className="transition hover:text-slate-950">
            Problem
          </a>
          <a href="#features" className="transition hover:text-slate-950">
            Features
          </a>
          <a href="#how-it-works" className="transition hover:text-slate-950">
            How it works
          </a>
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <a href="/login" className="text-sm font-bold text-slate-600 transition hover:text-slate-950">
            Sign in
          </a>
          <a
            href="#get-started"
            className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg"
          >
            Get started
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
        <button className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-700 md:hidden">
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </nav>
  );
}
