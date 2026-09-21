"use client";

import { LazyMotion, domAnimation, m } from "motion/react";

const Pin = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M16 3a1 1 0 0 1 .117 1.993l-.117 .007v4.764l1.894 3.789a1 1 0 0 1 .1 .331l.006 .116v2a1 1 0 0 1 -.883 .993l-.117 .007h-4v4a1 1 0 0 1 -1.993 .117l-.007 -.117v-4h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-2a1 1 0 0 1 .06 -.34l.046 -.107l1.894 -3.791v-4.762a1 1 0 0 1 -.117 -1.993l.117 -.007h8z" />
  </svg>
);

const steps = [
  {
    tag: "Access",
    icon: "ti-key",
    title: "Sign up & connect",
    description:
      "Create your workspace and connect your email in minutes — no setup calls, no imports required.",
    theme: {
      pin: "text-teal-500",
      badgeBg: "bg-teal-600",
      cardBg: "bg-teal-50",
      cardBorder: "border-teal-100",
      tagText: "text-teal-700",
      accentLine: "from-teal-400 to-teal-200",
    },
  },
  {
    tag: "Organize",
    icon: "ti-layout-board",
    title: "Set up your pipeline",
    description:
      "Add your leads and stages, or start from a template built for your kind of sales cycle.",
    theme: {
      pin: "text-sky-500",
      badgeBg: "bg-sky-600",
      cardBg: "bg-sky-50",
      cardBorder: "border-sky-100",
      tagText: "text-sky-700",
      accentLine: "from-sky-400 to-sky-200",
    },
  },
  {
    tag: "Close",
    icon: "ti-circle-check",
    title: "Track every deal",
    description:
      "Move deals through stages, log activity automatically, and never lose track of a follow-up.",
    theme: {
      pin: "text-violet-500",
      badgeBg: "bg-violet-600",
      cardBg: "bg-violet-50",
      cardBorder: "border-violet-100",
      tagText: "text-violet-700",
      accentLine: "from-violet-400 to-violet-200",
    },
  },
  {
    tag: "Launch",
    icon: "ti-rocket",
    title: "Get paid, grow faster",
    description:
      "Send invoices, track payments, and see your revenue trends without leaving the CRM.",
    theme: {
      pin: "text-amber-500",
      badgeBg: "bg-amber-500",
      cardBg: "bg-amber-50",
      cardBorder: "border-amber-100",
      tagText: "text-amber-700",
      accentLine: "from-amber-400 to-amber-200",
    },
  },
];

const CARD_POSITIONS = [
  { className: "md:absolute md:top-0 md:left-[15%]", rotate: "rotate-6" },
  { className: "md:absolute md:top-[140px] md:right-[15%]", rotate: "-rotate-6" },
  { className: "md:absolute md:top-[420px] md:left-[15%]", rotate: "rotate-6" },
  { className: "md:absolute md:top-[560px] md:right-[10%]", rotate: "-rotate-6" },
];

function Card({ number, step, className, rotate, index }) {
  const { tag, icon, title, description, theme } = step;

  return (
    <m.div
      className={`group relative w-full md:w-[280px] ${className}`}
      initial={{ opacity: 0, y: 40, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: parseInt(rotate.replace(/\D/g, "")) * (rotate.startsWith("-") ? -1 : 1) }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ rotate: 0, scale: 1.06, y: -6 }}
    >
      <div
        className={`rounded-[25px] border border-slate-100 bg-white p-2 shadow-[0px_10px_24px_0px_rgba(15,23,42,0.08)] transition-shadow duration-300 group-hover:shadow-[0px_18px_36px_0px_rgba(15,23,42,0.14)]`}
      >
        <m.div
          animate={{ rotate: [0, -6, 6, 0] }}
          transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 + index, ease: "easeInOut" }}
          className="mx-auto mb-5 w-fit"
        >
          <Pin className={theme.pin} />
        </m.div>

        <div
          className={`relative flex h-full flex-col overflow-hidden rounded-[15px] border ${theme.cardBorder} ${theme.cardBg} p-[16px]`}
        >
          {/* subtle accent glow in the corner */}
          <div
            className={`pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br ${theme.accentLine} opacity-40 blur-xl`}
          />

          <div className="relative flex items-center gap-2.5">
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${theme.badgeBg} text-white shadow-sm`}
            >
              <i className={`ti ${icon}`} style={{ fontSize: 15 }} aria-hidden="true" />
            </span>
            <p className={`text-[10px] font-semibold uppercase tracking-widest ${theme.tagText}`}>
              {number} — {tag}
            </p>
          </div>

          <h3 className="relative mb-2 mt-3 text-2xl font-semibold leading-none text-slate-900">
            {title}
          </h3>
          <p className="relative text-sm/5 tracking-tight text-slate-500">{description}</p>
        </div>
      </div>
    </m.div>
  );
}

export default function HowItWorksSection() {
  const height = 780;

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="how-it-works"
        className="relative overflow-hidden bg-[#f7f8fc] px-4 py-20 sm:px-6 lg:px-8"
      >
        {/* Ambient floating color blobs behind everything, gently drifting */}
        <m.div
          className="pointer-events-none absolute left-[8%] top-10 h-64 w-64 rounded-full bg-teal-200/30 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <m.div
          className="pointer-events-none absolute right-[10%] top-1/3 h-72 w-72 rounded-full bg-violet-200/25 blur-3xl"
          animate={{ x: [0, -25, 0], y: [0, -15, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <m.div
          className="pointer-events-none absolute bottom-10 left-1/3 h-56 w-56 rounded-full bg-amber-200/25 blur-3xl"
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 mx-auto mb-16 max-w-3xl text-center">
          <p className="landing-eyebrow">How it works</p>
          <h2 className="landing-section-title mt-4">Up and running in minutes.</h2>
          <p className="landing-section-copy mx-auto mt-5 max-w-2xl">
            A simple sales workflow that moves from setup to closed deals without changing tools.
          </p>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl">
          <div
            className="relative mx-auto flex w-full max-w-[1000px] flex-col space-y-8 md:block md:h-[var(--md-height)] md:space-y-0"
            style={{ "--md-height": `${height}px` }}
          >
            {/* Dashed connector line linking each card, animated like a flowing thread */}
            <svg
              className="pointer-events-none absolute left-0 top-0 z-0 hidden h-full w-full md:block"
              viewBox={`0 0 1000 ${height}`}
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="hiw-line" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2DD4BF" />
                  <stop offset="35%" stopColor="#38BDF8" />
                  <stop offset="70%" stopColor="#A78BFA" />
                  <stop offset="100%" stopColor="#FBBF24" />
                </linearGradient>
              </defs>
              <m.path
                d="M290 150 C 500 150, 550 270, 710 270 C 850 270, 500 350, 290 450 C 290 560, 550 640, 750 640"
                stroke="url(#hiw-line)"
                strokeWidth="2"
                strokeDasharray="8 6"
                fill="none"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                opacity="0.6"
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: -140 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </svg>

            {steps.map((step, index) => {
              const position = CARD_POSITIONS[index % CARD_POSITIONS.length];
              return (
                <Card
                  key={step.title}
                  number={String(index + 1).padStart(2, "0")}
                  step={step}
                  rotate={position.rotate}
                  className={position.className}
                  index={index}
                />
              );
            })}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}