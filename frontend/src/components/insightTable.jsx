

import { ExternalLink } from "lucide-react";


function intensityColor(v) {
  if (v >= 10) {
    return "text-red-600 bg-red-100 border-red-200 dark:text-red-400 dark:bg-red-900/30 dark:border-red-800";
  }

  if (v >= 6) {
    return "text-amber-600 bg-amber-100 border-amber-200 dark:text-amber-400 dark:bg-amber-900/30 dark:border-amber-800";
  }

  if (v >= 3) {
    return "text-cyan-600 bg-cyan-100 border-cyan-200 dark:text-cyan-400 dark:bg-cyan-900/30 dark:border-cyan-800";
  }


  return "text-emerald-600 bg-emerald-100 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-900/30 dark:border-emerald-800";
}

const InsightsTable = ({ data }) => {
  const rows = data.slice(0, 50);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
      
      <div className="flex items-center justify-between border-b border-gray-200 p-5 dark:border-gray-700">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Insights Feed
          </h3>

          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
            Showing {rows.length} of {data.length} records
          </p>
        </div>
      </div>

    
      <div className="max-h-[480px] overflow-x-auto overflow-y-auto">
        <table className="w-full text-sm">
          
          <thead className="sticky top-0 z-10 bg-white dark:bg-gray-900">
            <tr className="border-b border-gray-200 text-left text-[10px] font-medium uppercase tracking-wider text-gray-500 dark:border-gray-700 dark:text-gray-400">
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
              <tr
                key={i}
                className="border-b border-gray-100 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/50"
              >
        
                <td className="max-w-md px-5 py-3">
                  <p className="line-clamp-1 text-xs text-gray-900 dark:text-gray-100">
                    {d.title || d.insight}
                  </p>

                  <p className="mt-0.5 line-clamp-1 text-[11px] text-gray-500 dark:text-gray-400">
                    {d.topic} · {d.pestle}
                  </p>
                </td>

                
                <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400">
                  {d.sector || "—"}
                </td>

                
                <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400">
                  {d.region || "—"}
                </td>

                
                <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400">
                  {d.country || "—"}
                </td>

                
                <td className="px-3 py-3 text-right">
                  <span
                    className={`inline-flex min-w-[2rem] items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium ${intensityColor(
                      d.intensity
                    )}`}
                  >
                    {d.intensity ?? "—"}
                  </span>
                </td>

                
                <td className="px-3 py-3 text-right text-xs tabular-nums text-gray-900 dark:text-gray-100">
                  {d.likelihood || "—"}
                </td>

                
                <td className="px-3 py-3 text-right text-xs tabular-nums text-gray-900 dark:text-gray-100">
                  {d.relevance || "—"}
                </td>

                
                <td className="px-3 py-3">
                  {d.url && (
                    <a
                      href={d.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 transition-colors hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-400"
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
};

export default InsightsTable;