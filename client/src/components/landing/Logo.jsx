import { Sparkles } from "lucide-react";

export default function Logo({ inverted = false }) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`grid h-9 w-9 place-items-center rounded-lg shadow-sm ${
          inverted ? "bg-white text-slate-950" : "bg-slate-950 text-white"
        }`}
      >
        <Sparkles className="h-4 w-4" strokeWidth={2.4} />
      </div>
      <span className={`font-semibold ${inverted ? "text-sm text-white" : "text-base text-slate-950"}`}>Startiva</span>
    </div>
  );
}
