import { ReactNode } from "react";



const ChartCard=({ title, subtitle, children, className = "", action })=> {
  return (
    <div className={`rounded-xl border border-border bg-card p-5 flex flex-col ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
        {action}
      </div>
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}
export default ChartCard