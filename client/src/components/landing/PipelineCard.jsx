export default function PipelineCard({ title, amount, tone, items }) {
  return (
    <div className="min-w-0 rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="text-xs font-bold text-slate-700">{title}</p>
        <span className={`h-2 w-2 rounded-full ${tone}`} />
      </div>
      <p className="mb-3 text-lg font-bold text-slate-950">{amount}</p>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item} className="rounded-md border border-slate-100 bg-slate-50 p-2">
            <div className="mb-2 h-2 rounded-full bg-slate-300" />
            <p className="truncate text-[11px] font-semibold text-slate-500">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
