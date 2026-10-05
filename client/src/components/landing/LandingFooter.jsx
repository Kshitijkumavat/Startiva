export default function LandingFooter() {
  const linkGroups = [
    {
      title: "PRODUCT",
      links: ["Pipeline", "Payments", "Activity feed", "Shared inbox", "Tagging"],
    },
    {
      title: "ABOUT US",
      links: ["Our story", "Careers", "Sustainability", "Press & media"],
    },
    {
      title: "HELP & SUPPORT",
      links: ["FAQs", "Onboarding", "Track your data", "Contact us"],
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-white px-4 sm:px-6 lg:px-8">
      {/* Full-bleed illustration as the actual footer background,
          not nested inside a sub-card — sits behind everything below. */}
      <div className="absolute inset-x-0 bottom-0 h-[60%] min-h-[280px]">
        <img
          src="/footer-illustration.png"
          alt=""
          className="h-full w-full object-cover object-bottom"
        />
        {/* fade so the top of the image blends into the white content
            above instead of cutting in with a hard edge */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white via-white/70 to-transparent" />
      </div>

      {/* Content sits above the background image */}
      <div className="relative z-10 mx-auto max-w-7xl pt-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2">
              <i className="ti ti-layout-kanban text-[20px] text-teal-700" aria-hidden="true" />
              <span className="landing-card-title text-lg">Startiva</span>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-500">
              The CRM built for startups — track pipeline, get paid, and stay
              close to every customer.
            </p>
            <div className="mt-5 flex flex-col gap-2.5 text-sm text-slate-600">
              <a href="mailto:hello@startiva.com" className="flex items-center gap-2 transition hover:text-teal-700">
                <i className="ti ti-mail text-[15px] text-slate-400" aria-hidden="true" />
                hello@startiva.com
              </a>
              <span className="flex items-center gap-2">
                <i className="ti ti-phone text-[15px] text-slate-400" aria-hidden="true" />
                +91 00000 00000
              </span>
              <span className="flex items-center gap-2">
                <i className="ti ti-map-pin text-[15px] text-slate-400" aria-hidden="true" />
                Pune, India
              </span>
            </div>
          </div>

          {/* Link columns */}
          {linkGroups.map((group) => (
            <div key={group.title}>
              <p className="landing-ui-label text-teal-700">{group.title}</p>
              <ul className="mt-4 flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-slate-500 transition hover:text-slate-950">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <p className="landing-ui-label text-teal-700">NEWSLETTER</p>
            <p className="mt-4 text-sm leading-6 text-slate-500">
              Subscribe to get updates on new features, tips & product news.
            </p>
            <form className="mt-4 flex items-center gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none"
              />
              <button
                type="submit"
                className="flex shrink-0 items-center justify-center rounded-lg bg-teal-700 px-3.5 py-2.5 text-white transition hover:bg-teal-800"
                aria-label="Subscribe"
              >
                <i className="ti ti-arrow-right text-[16px]" aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>

        {/* Spacer so the illustration has room to show beneath the columns
            before the bottom bar appears */}
        <div className="h-40 sm:h-52" />

        {/* Bottom bar: socials left, legal links right */}
        <div className="flex flex-col gap-4 border-t border-slate-200/70 bg-transparent py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-4">
            {[
              { label: "Facebook", icon: "ti-brand-facebook" },
              { label: "Twitter", icon: "ti-brand-twitter" },
              { label: "Instagram", icon: "ti-brand-instagram" },
              { label: "LinkedIn", icon: "ti-brand-linkedin" },
            ].map(({ label, icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-teal-50 hover:text-teal-700"
              >
                <i className={`ti ${icon} text-[14px]`} aria-hidden="true" />
              </a>
            ))}
          </div>

          <div className="flex gap-6 bg-transparent text-sm text-slate-700">
            <a href="#" className="transition hover:text-slate-950">Privacy Policy</a>
            <a href="#" className="transition hover:text-slate-950">Terms of Service</a>
            <a href="#" className="transition hover:text-slate-950">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}