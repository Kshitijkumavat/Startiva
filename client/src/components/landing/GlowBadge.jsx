export default function GlowBadge({ children }) {
  return (
    <div className="landing-rise landing-glow-runner inline-flex rounded-full p-px">
      <span className="relative z-10 inline-flex items-center gap-2 rounded-full bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-800">
        {children}
      </span>
    </div>
  );
}
