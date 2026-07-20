import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  delta: string;
}

export function StatCard({ icon: Icon, label, value, delta }: StatCardProps) {
  return (
    <div className="relative rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-lg bg-[#124768]/10">
        <Icon className="size-4 text-[#124768]" />
      </div>
      <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{value}</p>
      <p className="mt-1 text-sm font-medium text-emerald-600">{delta}</p>
    </div>
  );
}
