//import { Insight } from "@/lib/insights";
import { ExternalLink } from "lucide-react";

function intensityColor(v) {
  if (v >= 10) return "text-chart-5 bg-chart-5/10 border-chart-5/30";
  if (v >= 6) return "text-chart-4 bg-chart-4/10 border-chart-4/30";
  if (v >= 3) return "text-chart-2 bg-chart-2/10 border-chart-2/30";
  return "text-chart-3 bg-chart-3/10 border-chart-3/30";
}

const InsightsTable=({ data })=> {
  const rows = data.slice(0, 50);
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-border">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Insights feed</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Showing {rows.length} of {data.length} records
          </p>
        </div>
      </div>
      <div className="overflow-x-auto max-h-[480px] overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-card z-10">
            <tr className="text-left text-[10px] font-medium uppercase tracking-wider text-muted-foreground border-b border-border">
              <th className="px-5 py-3">Title</th>
              <th className="px-3 py-3">Sector</th>
              <th className="px-3 py-3">Region</th>
              <th className="px-3 py-3">Country</th>
              <th className="px-3 py-3 text-right">Intensity</th>
              <th className="px-3 py-3 text-right">Likelihood</th>
              <th className="px-3 py-3 text-right">Relevance</th>
              <th className="px-3 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((d, i) => (
              <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="px-5 py-3 max-w-md">
                  <p className="text-foreground line-clamp-1 text-xs">{d.title || d.insight}</p>
                  <p className="text-muted-foreground text-[11px] mt-0.5 line-clamp-1">{d.topic} · {d.pestle}</p>
                </td>
                <td className="px-3 py-3 text-muted-foreground text-xs">{d.sector || "—"}</td>
                <td className="px-3 py-3 text-muted-foreground text-xs">{d.region || "—"}</td>
                <td className="px-3 py-3 text-muted-foreground text-xs">{d.country || "—"}</td>
                <td className="px-3 py-3 text-right">
                  <span className={`inline-flex items-center justify-center min-w-[2rem] px-2 py-0.5 rounded-md text-xs font-medium border ${intensityColor(d.intensity)}`}>
                    {d.intensity}
                  </span>
                </td>
                <td className="px-3 py-3 text-right text-foreground tabular-nums text-xs">{d.likelihood || "—"}</td>
                <td className="px-3 py-3 text-right text-foreground tabular-nums text-xs">{d.relevance || "—"}</td>
                <td className="px-3 py-3">
                  {d.url && (
                    <a
                      href={d.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InsightsTable
