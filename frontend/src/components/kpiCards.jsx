import  LucideIcon  from "lucide-react";


const ACCENTS = {
  indigo: "from-chart-1/20 to-chart-1/0 text-chart-1",
  cyan: "from-chart-2/20 to-chart-2/0 text-chart-2",
  mint: "from-chart-3/20 to-chart-3/0 text-chart-3",
  amber: "from-chart-4/20 to-chart-4/0 text-chart-4",
} 

const KPICard=({ label, value, hint, icon: Icon, accent = "indigo" })=> {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-card p-5">
      <div className={`absolute inset-0 bg-gradient-to-br ${ACCENTS[accent]} opacity-60 pointer-events-none`} />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-bold tabular-nums text-foreground">{value}</p>
          {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-background/50 ${ACCENTS[accent].split(" ").pop()}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

export default KPICard