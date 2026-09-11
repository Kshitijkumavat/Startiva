'use client'

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

export default function FeaturesSection() {
  const features = [
    {
      id: 1,
      eyebrow: "Deal pipeline",
      icon: "ti-layout-kanban",
      title: "Visual pipeline that moves with you.",
      description:
        "Track every lead from first contact to closed deal - all in one place.",
      reverse: false,
      render: () => (
        <div className="w-full">
          <div className="overflow-hidden rounded-lg border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-sky-50">
            {[
              { name: "Acme Corp", stage: "Proposal", color: "#1D9E75", amount: "$4,200" },
              { name: "Nova Labs", stage: "Negotiation", color: "#5DCAA5", amount: "$2,800" },
              { name: "Pear Inc.", stage: "Outreach", color: "#9FE1CB", amount: "$1,500" },
              { name: "Studio K", stage: "New", color: "#E1F5EE", amount: "$900" },
            ].map(({ name, stage, color, amount }, i, arr) => (
              <div
                key={name}
                className={`flex items-center justify-between gap-3 px-4 py-2.5 text-sm ${
                  i !== arr.length - 1 ? "border-b border-slate-100" : ""
                }`}
              >
                <span className="font-medium text-slate-900">{name}</span>
                <span className="flex items-center gap-1.5 text-slate-500">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
                  {stage}
                </span>
                <span className="font-semibold text-teal-700">{amount}</span>
              </div>
            ))}
          </div>

          <div className="mt-3 flex gap-3">
            <div className="flex-1 rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3">
              <p className="text-xl font-semibold text-slate-950">$9.4k</p>
              <p className="text-xs font-medium text-emerald-700">Pipeline value</p>
            </div>
            <div className="flex-1 rounded-lg border border-sky-100 bg-sky-50 px-4 py-3">
              <p className="text-xl font-semibold text-slate-950">4</p>
              <p className="text-xs font-medium text-sky-700">Active deals</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      eyebrow: "Revenue",
      icon: "ti-chart-bar",
      title: "Track payments at a glance.",
      description: "See what's paid, pending, and overdue in seconds.",
      reverse: true,
      render: () => (
        <div className="w-full">
          <div className="flex h-24 w-full items-end gap-2 rounded-lg bg-gradient-to-br from-sky-50 via-white to-amber-50 px-4 pb-3 pt-5">
            {[
              { height: 40, color: "#38BDF8" },
              { height: 55, color: "#14B8A6" },
              { height: 35, color: "#F59E0B" },
              { height: 80, color: "#22C55E" },
              { height: 60, color: "#A78BFA" },
              { height: 70, color: "#06B6D4" },
              { height: 90, color: "#10B981" },
            ].map(({ height, color }, i) => (
              <div
                key={i}
                className="flex-1 rounded-t shadow-sm"
                style={{ height: `${height}%`, background: color }}
              />
            ))}
          </div>
          <div className="mt-3 flex gap-3">
            <div className="flex-1 rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3">
              <p className="text-xl font-semibold text-slate-950">$18.2k</p>
              <p className="text-xs font-medium text-emerald-700">Paid this month</p>
            </div>
            <div className="flex-1 rounded-lg border border-amber-100 bg-amber-50 px-4 py-3">
              <p className="text-xl font-semibold text-slate-950">$3.1k</p>
              <p className="text-xs font-medium text-amber-700">Overdue</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      eyebrow: "Activity feed",
      icon: "ti-activity",
      title: "Know what your team is up to.",
      description: "Real-time log of every action across your workspace.",
      reverse: false,
      render: () => (
        <div className="flex w-full flex-col rounded-lg bg-gradient-to-br from-indigo-50 via-white to-rose-50 px-4">
          {[
            { text: "Deal Acme Corp moved to Proposal", time: "2 min ago", color: "bg-indigo-500" },
            { text: "Payment of $1,200 marked received", time: "18 min ago", color: "bg-emerald-500" },
            { text: "Priya added a new contact", time: "1 hr ago", color: "bg-rose-500" },
            { text: "Follow-up reminder set for Nova Labs", time: "3 hr ago", color: "bg-sky-500" },
          ].map(({ text, time, color }, i, arr) => (
            <div
              key={i}
              className={`flex items-start gap-3 py-3 ${
                i !== arr.length - 1 ? "border-b border-slate-100" : ""
              }`}
            >
              <div className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${color}`} />
              <div>
                <p className="text-sm leading-5 text-slate-800">{text}</p>
                <p className="mt-0.5 text-xs text-slate-400">{time}</p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 4,
      eyebrow: "Shared inbox",
      icon: "ti-messages",
      title: "Reply to leads without switching tabs.",
      description: "Email threads, right inside your CRM.",
      reverse: true,
      render: () => (
        <div className="w-full overflow-hidden rounded-lg border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-cyan-50">
          <div className="flex flex-col gap-2.5 p-4">
            <p className="text-center text-xs text-slate-400">Today, 10:42 AM</p>
            <div className="max-w-[75%] self-start rounded-xl rounded-bl-sm bg-white px-4 py-2.5 text-sm leading-5 text-slate-800 shadow-sm ring-1 ring-violet-100">
              Hey, can you send over the proposal?
            </div>
            <div className="max-w-[75%] self-end rounded-xl rounded-br-sm bg-gradient-to-r from-teal-600 to-sky-600 px-4 py-2.5 text-sm leading-5 text-white shadow-sm">
              Sure! Sending it right now.
            </div>
            <div className="max-w-[75%] self-start rounded-xl rounded-bl-sm bg-white px-4 py-2.5 text-sm leading-5 text-slate-800 shadow-sm ring-1 ring-violet-100">
              Perfect, thank you!
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 5,
      eyebrow: "Smart tagging",
      icon: "ti-tags",
      title: "Organize contacts your way.",
      description: "Custom tags to filter, segment and prioritize your leads instantly.",
      reverse: false,
      render: () => (
        <div className="flex w-full flex-wrap gap-2 rounded-lg bg-gradient-to-br from-slate-50 via-white to-teal-50 p-5">
          {[
            { label: "Hot lead", tone: "border-rose-200 bg-rose-50 text-rose-700" },
            { label: "Paid", tone: "border-emerald-200 bg-emerald-50 text-emerald-700" },
            { label: "Follow up", tone: "border-amber-200 bg-amber-50 text-amber-700" },
            { label: "Enterprise", tone: "border-indigo-200 bg-indigo-50 text-indigo-700" },
            { label: "Student", tone: "border-sky-200 bg-sky-50 text-sky-700" },
            { label: "Closed", tone: "border-teal-200 bg-teal-50 text-teal-700" },
            { label: "Demo done", tone: "border-violet-200 bg-violet-50 text-violet-700" },
          ].map(({ label, tone }) => (
            <span
              key={label}
              className={`rounded-full border px-3 py-1 text-xs font-medium ${tone}`}
            >
              {label}
            </span>
          ))}
        </div>
      ),
    },
  ]

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const sectionRefs = features.map(() => useRef(null))

  const rawProgress = features.map((_, index) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useScroll({
      target: sectionRefs[index],
      offset: ["start 85%", "start 35%"],
    }).scrollYProgress
  )

  const scrollYProgress = rawProgress.map((progress) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useSpring(progress, { stiffness: 120, damping: 24, mass: 0.6 })
  )

  const opacityContents = scrollYProgress.map((progress) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform(progress, [0, 1], [0, 1])
  )

  const clipProgresses = scrollYProgress.map((progress) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform(progress, [0, 1], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"])
  )

  const translateContents = scrollYProgress.map((progress) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform(progress, [0, 1], [24, 0])
  )

  const scaleContents = scrollYProgress.map((progress) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform(progress, [0, 1], [0.96, 1])
  )

  return (
    <section id="features" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto mb-16 max-w-3xl text-center">
        <p className="landing-eyebrow">Features</p>
        <h2 className="landing-section-title mt-4">
          Everything your team needs to close deals.
        </h2>
      </div>

      <div className="mx-auto flex max-w-5xl flex-col gap-20 md:gap-28">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            ref={sectionRefs[index]}
            className={`flex flex-col items-center gap-8 md:min-h-[50vh] md:flex-row md:items-center md:justify-between md:gap-16 ${
              feature.reverse ? "md:flex-row-reverse" : ""
            }`}
          >
            <motion.div
              style={{ y: translateContents[index] }}
              className="w-full text-center md:w-[38%] md:text-left"
            >
              <p className="landing-ui-label mb-2 flex items-center justify-center gap-1.5 text-teal-700 md:justify-start">
                <i className={`ti ${feature.icon} text-[13px]`} aria-hidden="true" />
                {feature.eyebrow}
              </p>
              <h3 className="landing-card-title text-3xl">{feature.title}</h3>
              <p className="landing-card-copy mt-3 text-slate-600">
                {feature.description}
              </p>
            </motion.div>

            <motion.div
              style={{
                opacity: opacityContents[index],
                clipPath: clipProgresses[index],
                scale: scaleContents[index],
              }}
              className="relative w-full rounded-xl border border-slate-200 bg-white/90 p-5 shadow-[0_12px_40px_rgb(0,0,0,0.08)] backdrop-blur-sm md:w-[52%]"
            >
              {feature.render()}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  )
}