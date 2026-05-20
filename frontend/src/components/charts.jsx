
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";

import { byYear, groupAvg, groupCount } from "../utils/insights";

const CHART_COLORS = [
  "#7c3aed", // violet-600
  "#06b6d4", // cyan-500
  "#10b981", // emerald-500
  "#f59e0b", // amber-500
  "#ef4444", // red-500
  "#ec4899", // pink-500
  "#3b82f6", // blue-500
];


const tooltipStyle = {
  backgroundColor: "#ffffff", // white
  border: "1px solid #e2e8f0", // slate-200
  borderRadius: 8,
  fontSize: 12,
  color: "#0f172a", // slate-900
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
};


const axisProps = {
  stroke: "#64748b", // slate-500
  tick: {
    fill: "#64748b", // slate-500
    fontSize: 11,
  },
  tickLine: false,
  axisLine: {
    stroke: "#e2e8f0", // slate-200
  },
};


const GRID_COLOR = "#e2e8f0"; // slate-200


const CURSOR_FILL = "#f1f5f9"; // slate-100


const BACKGROUND_COLOR = "#ffffff"; // white


const FOREGROUND_COLOR = "#0f172a"; // slate-900


const LEGEND_TEXT_COLOR = "#64748b"; // slate-500


export const IntensityBySector = ({ data }) => {
  const rows = groupAvg(data, "sector", "intensity", 12);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={rows}
        margin={{ top: 10, right: 10, left: -10, bottom: 60 }}
      >
        <defs>
          <linearGradient id="g-int" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={CHART_COLORS[0]}
              stopOpacity={1}
            />
            <stop
              offset="100%"
              stopColor={CHART_COLORS[1]}
              stopOpacity={0.6}
            />
          </linearGradient>
        </defs>

        <CartesianGrid
          strokeDasharray="3 3"
          stroke={GRID_COLOR}
          vertical={false}
        />

        <XAxis
          dataKey="name"
          {...axisProps}
          angle={-35}
          textAnchor="end"
          interval={0}
          height={70}
        />

        <YAxis {...axisProps} />

        <Tooltip
          contentStyle={tooltipStyle}
          cursor={{
            fill: CURSOR_FILL,
            opacity: 0.3,
          }}
        />

        <Bar
          dataKey="value"
          fill="url(#g-int)"
          radius={[6, 6, 0, 0]}
          name="Avg intensity"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export const TrendsByYear = ({ data }) => {
  const rows = byYear(data);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={rows}
        margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
      >
        <defs>
          <linearGradient id="g-count" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={CHART_COLORS[1]}
              stopOpacity={0.6}
            />
            <stop
              offset="100%"
              stopColor={CHART_COLORS[1]}
              stopOpacity={0}
            />
          </linearGradient>

          <linearGradient id="g-rel" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={CHART_COLORS[2]}
              stopOpacity={0.5}
            />
            <stop
              offset="100%"
              stopColor={CHART_COLORS[2]}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>

        <CartesianGrid
          strokeDasharray="3 3"
          stroke={GRID_COLOR}
          vertical={false}
        />

        <XAxis dataKey="year" {...axisProps} />
        <YAxis {...axisProps} />

        <Tooltip contentStyle={tooltipStyle} />

        <Legend
          wrapperStyle={{
            fontSize: 11,
            color: LEGEND_TEXT_COLOR,
          }}
        />

        <Area
          type="monotone"
          dataKey="count"
          stroke={CHART_COLORS[1]}
          strokeWidth={2}
          fill="url(#g-count)"
          name="Insights"
        />

        <Area
          type="monotone"
          dataKey="intensity"
          stroke={CHART_COLORS[2]}
          strokeWidth={2}
          fill="url(#g-rel)"
          name="Avg intensity"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};


export const RegionPie = ({ data }) => {
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
          stroke={BACKGROUND_COLOR}
          strokeWidth={2}
        >
          {rows.map((_, i) => (
            <Cell
              key={i}
              fill={CHART_COLORS[i % CHART_COLORS.length]}
            />
          ))}
        </Pie>

        <Legend
          layout="vertical"
          align="right"
          verticalAlign="middle"
          wrapperStyle={{
            fontSize: 11,
            color: LEGEND_TEXT_COLOR,
            paddingLeft: 12,
          }}
          formatter={(value) => (
            <span style={{ color: FOREGROUND_COLOR }}>
              {value}
            </span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};


export const TopCountries = ({ data }) => {
  const rows = groupCount(data, "country", 10).reverse();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={rows}
        layout="vertical"
        margin={{ top: 4, right: 16, left: 0, bottom: 0 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={GRID_COLOR}
          horizontal={false}
        />

        <XAxis type="number" {...axisProps} />

        <YAxis
          type="category"
          dataKey="name"
          {...axisProps}
          width={130}
        />

        <Tooltip
          contentStyle={tooltipStyle}
          cursor={{
            fill: CURSOR_FILL,
            opacity: 0.3,
          }}
        />

        <Bar
          dataKey="value"
          fill={CHART_COLORS[1]}
          radius={[0, 6, 6, 0]}
          name="Insights"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};


export const TopTopics = ({ data }) => {
  const rows = groupCount(data, "topic", 12);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={rows}
        margin={{ top: 10, right: 10, left: -10, bottom: 60 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={GRID_COLOR}
          vertical={false}
        />

        <XAxis
          dataKey="name"
          {...axisProps}
          angle={-35}
          textAnchor="end"
          interval={0}
          height={70}
        />

        <YAxis {...axisProps} />

        <Tooltip
          contentStyle={tooltipStyle}
          cursor={{
            fill: CURSOR_FILL,
            opacity: 0.3,
          }}
        />

        <Bar
          dataKey="value"
          fill={CHART_COLORS[3]}
          radius={[6, 6, 0, 0]}
          name="Insights"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};


export const PestleBars = ({ data }) => {
  const rows = groupCount(data, "pestle", 10);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={rows}
        margin={{ top: 10, right: 10, left: -10, bottom: 40 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={GRID_COLOR}
          vertical={false}
        />

        <XAxis
          dataKey="name"
          {...axisProps}
          angle={-25}
          textAnchor="end"
          interval={0}
          height={60}
        />

        <YAxis {...axisProps} />

        <Tooltip
          contentStyle={tooltipStyle}
          cursor={{
            fill: CURSOR_FILL,
            opacity: 0.3,
          }}
        />

        <Bar
          dataKey="value"
          radius={[6, 6, 0, 0]}
        >
          {rows.map((_, i) => (
            <Cell
              key={i}
              fill={CHART_COLORS[i % CHART_COLORS.length]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};


export const LikelihoodRelevanceScatter = ({ data }) => {
  const map = new Map();

  data.forEach((d) => {
    const x = Number(d.likelihood) || 0;
    const y = Number(d.relevance) || 0;

    if (!x || !y) return;

    const key = `${x}-${y}`;

    const current =
      map.get(key) ?? {
        x,
        y,
        z: 0,
        intensity: 0,
        n: 0,
      };

    current.z += 1;
    current.intensity += Number(d.intensity) || 0;
    current.n += 1;

    map.set(key, current);
  });

  const rows = Array.from(map.values()).map((row) => ({
    x: row.x,
    y: row.y,
    z: row.z,
    intensity: +(row.intensity / row.n).toFixed(1),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart
        margin={{ top: 10, right: 10, left: -10, bottom: 10 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={GRID_COLOR}
        />

        <XAxis
          type="number"
          dataKey="x"
          name="Likelihood"
          {...axisProps}
        />

        <YAxis
          type="number"
          dataKey="y"
          name="Relevance"
          {...axisProps}
        />

        <ZAxis
          type="number"
          dataKey="z"
          range={[60, 800]}
          name="Records"
        />

        <Tooltip
          contentStyle={tooltipStyle}
          cursor={{ strokeDasharray: "3 3" }}
          formatter={(value, name) => [value, name]}
        />

        <Scatter
          data={rows}
          fill={CHART_COLORS[0]}
          fillOpacity={0.7}
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};