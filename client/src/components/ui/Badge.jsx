const variants = {
  NEW: "bg-blue-100 text-blue-700", CONTACTED: "bg-yellow-100 text-yellow-700",
  QUALIFIED: "bg-green-100 text-green-700", LOST: "bg-red-100 text-red-700",
  PROSPECT: "bg-slate-100 text-slate-600", PROPOSAL_SENT: "bg-blue-100 text-blue-700",
  NEGOTIATION: "bg-purple-100 text-purple-700", CLOSED_WON: "bg-green-100 text-green-700",
  CLOSED_LOST: "bg-red-100 text-red-700", DRAFT: "bg-slate-100 text-slate-600",
  SENT: "bg-blue-100 text-blue-700", ACCEPTED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700", PENDING: "bg-yellow-100 text-yellow-700",
  RECEIVED: "bg-green-100 text-green-700", OVERDUE: "bg-red-100 text-red-700",
  OWNER: "bg-blue-100 text-blue-900", ADMIN: "bg-purple-100 text-purple-700",
  MEMBER: "bg-slate-100 text-slate-600",
};

export default function Badge({ label }) {
  const style = variants[label] || "bg-slate-100 text-slate-600";
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${style}`}>
      {label?.replace("_", " ")}
    </span>
  );
}