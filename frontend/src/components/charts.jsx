import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area, PieChart, Pie, Cell, Legend, ScatterChart, Scatter, ZAxis } from "recharts";
import { Insight } from "../utils/insights";
import { byYear, groupAvg, groupCount } from "../utils/insights";

const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
  "var(--chart-7)",
];

const tooltipStyle = {
  backgroundColor: "var(--popover)",
  border: "1px solid var(--border)",
  borderRadius: 8,
  fontSize: 12,
  color: "var(--popover-foreground)",
} 

const axisProps = {
  stroke: "var(--muted-foreground)",
  tick: { fill: "var(--muted-foreground)", fontSize: 11 },
  tickLine: false,
  axisLine: { stroke: "var(--border)" },
} 

export const IntensityBySector=({ data })=> {
  const rows = groupAvg(data, "sector", "intensity", 12);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={rows} margin={{ top: 10, right: 10, left: -10, bottom: 60 }}>
        <defs>
          <linearGradient id="g-int" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={1} />
            <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0.6} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey="name" {...axisProps} angle={-35} textAnchor="end" interval={0} height={70} />
        <YAxis {...axisProps} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--muted)", opacity: 0.3 }} />
        <Bar dataKey="value" fill="url(#g-int)" radius={[6, 6, 0, 0]} name="Avg intensity" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export const TrendsByYear=({ data })=> {
  const rows = byYear(data);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={rows} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="g-count" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.6} />
            <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="g-rel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-3)" stopOpacity={0.5} />
            <stop offset="100%" stopColor="var(--chart-3)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey="year" {...axisProps} />
        <YAxis {...axisProps} />
        <Tooltip contentStyle={tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: 11, color: "var(--muted-foreground)" }} />
        <Area type="monotone" dataKey="count" stroke="var(--chart-2)" strokeWidth={2} fill="url(#g-count)" name="Insights" />
        <Area type="monotone" dataKey="intensity" stroke="var(--chart-3)" strokeWidth={2} fill="url(#g-rel)" name="Avg intensity" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export const RegionPie=({ data })=> {
  const rows = groupCount(data, "region", 8);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Tooltip contentStyle={tooltipStyle} />
        <Pie
          data={rows}
          dataKey="value"
          nameKey="name"
          innerRadius={55}
          outerRadius={95}
          paddingAngle={2}
          stroke="var(--background)"
          strokeWidth={2}
        >
          {rows.map((_, i) => (
            <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
          ))}
        </Pie>
        <Legend
          layout="vertical"
          align="right"
          verticalAlign="middle"
          wrapperStyle={{ fontSize: 11, color: "var(--muted-foreground)", paddingLeft: 12 }}
          formatter={(v) => <span style={{ color: "var(--foreground)" }}>{v}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export const TopCountries=({ data })=> {
  const rows = groupCount(data, "country", 10).reverse();
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={rows} layout="vertical" margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
        <XAxis type="number" {...axisProps} />
        <YAxis type="category" dataKey="name" {...axisProps} width={130} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--muted)", opacity: 0.3 }} />
        <Bar dataKey="value" fill="var(--chart-2)" radius={[0, 6, 6, 0]} name="Insights" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export const TopTopics=({ data })=> {
  const rows = groupCount(data, "topic", 12);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={rows} margin={{ top: 10, right: 10, left: -10, bottom: 60 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey="name" {...axisProps} angle={-35} textAnchor="end" interval={0} height={70} />
        <YAxis {...axisProps} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--muted)", opacity: 0.3 }} />
        <Bar dataKey="value" fill="var(--chart-4)" radius={[6, 6, 0, 0]} name="Insights" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export const PestleBars=({ data })=> {
  const rows = groupCount(data, "pestle", 10);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={rows} margin={{ top: 10, right: 10, left: -10, bottom: 40 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey="name" {...axisProps} angle={-25} textAnchor="end" interval={0} height={60} />
        <YAxis {...axisProps} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--muted)", opacity: 0.3 }} />
        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
          {rows.map((_, i) => (
            <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export const LikelihoodRelevanceScatter=({ data })=> {
  // bucket by (likelihood, relevance) to get bubble size
  const map = new Map();
  data.forEach((d) => {
    const x = Number(d.likelihood) || 0;
    const y = Number(d.relevance) || 0;
    if (!x || !y) return;
    const k = `${x}-${y}`;
    const cur = map.get(k) ?? { x, y, z: 0, intensity: 0, n: 0 };
    cur.z += 1;
    cur.intensity += Number(d.intensity) || 0;
    cur.n += 1;
    map.set(k, cur);
  });
  const rows = Array.from(map.values()).map((r) => ({
    x: r.x,
    y: r.y,
    z: r.z,
    intensity: +(r.intensity / r.n).toFixed(1),
  }));
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart margin={{ top: 10, right: 10, left: -10, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis type="number" dataKey="x" name="Likelihood" {...axisProps} />
        <YAxis type="number" dataKey="y" name="Relevance" {...axisProps} />
        <ZAxis type="number" dataKey="z" range={[60, 800]} name="Records" />
        <Tooltip
          contentStyle={tooltipStyle}
          cursor={{ strokeDasharray: "3 3" }}
          formatter={(value, name) => [value, name]}
        />
        <Scatter data={rows} fill="var(--chart-1)" fillOpacity={0.7} />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
