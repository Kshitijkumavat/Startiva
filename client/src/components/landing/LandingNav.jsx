import { useEffect, useState } from "react";
import { ChevronRight, Menu } from "lucide-react";
import Logo from "./Logo";

export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? "border-b border-[#DBE2EF] bg-white/50 shadow-sm backdrop-blur"
          : "border-b border-transparent bg-transparent backdrop-blur-[2px]"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Logo />

        <div className="hidden items-center gap-8 text-sm font-medium text-[#3E4C5E] md:flex">
          <a href="#problem" className="transition hover:text-[#112D4E]">
            Problem
          </a>
          <a href="#features" className="transition hover:text-[#112D4E]">
            Features
          </a>
          <a href="#how-it-works" className="transition hover:text-[#112D4E]">
            How it works
          </a>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="/login"
            className="text-sm font-medium text-[#3E4C5E] transition hover:text-[#112D4E]"
          >
            Sign in
          </a>
          <a
            href="#get-started"
            className="inline-flex items-center gap-2 rounded-lg bg-[#112D4E] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-[#0C223B] hover:shadow-lg"
          >
            Get started
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>

        <button className="grid h-10 w-10 place-items-center rounded-lg border border-[#DBE2EF] bg-white text-[#3E4C5E] md:hidden">
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </nav>
  );
}