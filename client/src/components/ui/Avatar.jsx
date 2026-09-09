function getInitials(name) {
  return name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "??";
}

const colors = ["bg-blue-500", "bg-purple-500", "bg-green-500", "bg-orange-500", "bg-pink-500", "bg-slate-700"];

export default function Avatar({ name, size = "md" }) {
  const color = colors[(name?.charCodeAt(0) || 0) % colors.length];
  const sizes = { sm: "w-7 h-7 text-xs", md: "w-9 h-9 text-sm", lg: "w-11 h-11 text-base" };
  return (
    <div className={`${color} ${sizes[size]} rounded-full flex items-center justify-center text-white font-semibold shrink-0`}>
      {getInitials(name)}
    </div>
  );
}