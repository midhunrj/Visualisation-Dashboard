import { baseURL } from "./config";

export const EMPTY_FILTERS = {
  end_year: "all",
  start_year: "all",
  topic: "all",
  sector: "all",
  region: "all",
  pestle: "all",
  source: "all",
  country: "all",
};

export async function fetchInsightsd() {
  const res = await fetch("/jsondata.json");
  if (!res.ok) throw new Error("Failed to load data");
  return res.json();
}

export async function fetchInsights(filters = {}) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value && value !== "all") {
      params.append(key, value);
    }
  });

  const url = `${baseURL}/insights?${params.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch insights");
  }

  const data = await response.json();

  return data.insights;
}

export async function fetchFilterOptions() {
  const response = await fetch(`${baseURL}/insights/filters`);

  if (!response.ok) {
    throw new Error("Failed to fetch filter options");
  }

  const data = await response.json();

  
  return data.filters;
}

export function uniqueValues(data, key) {
  const set = new Set();
  data.forEach((d) => {
    const v = String(d[key] ?? "").trim();
    if (v) set.add(v);
  });
  return Array.from(set).sort();
}

export function applyFilters(data, f){
  return data.filter((d) => {
    if (f.end_year !== "all" && String(d.end_year) !== f.end_year) return false;
    if (f.start_year !== "all" && String(d.start_year) !== f.start_year) return false;
    if (f.topic !== "all" && d.topic !== f.topic) return false;
    if (f.sector !== "all" && d.sector !== f.sector) return false;
    if (f.region !== "all" && d.region !== f.region) return false;
    if (f.pestle !== "all" && d.pestle !== f.pestle) return false;
    if (f.source !== "all" && d.source !== f.source) return false;
    if (f.country !== "all" && d.country !== f.country) return false;
    return true;
  });
}

export function groupAvg(
  data,
  key,
  metric,
  limit = 10,
) {
  const map = new Map();
  data.forEach((d) => {
    const k = String(d[key] ?? "").trim();
    if (!k) return;
    const v = Number(d[metric]) || 0;
    const cur = map.get(k) ?? { sum: 0, count: 0 };
    cur.sum += v;
    cur.count += 1;
    map.set(k, cur);
  });
  return Array.from(map.entries())
    .map(([name, { sum, count }]) => ({ name, value: +(sum / count).toFixed(2), count }))
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
}

export function groupCount(data, key, limit = 10) {
  const map = new Map();
  data.forEach((d) => {
    const k = String(d[key] ?? "").trim();
    if (!k) return;
    map.set(k, (map.get(k) ?? 0) + 1);
  });
  return Array.from(map.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
}

export function byYear(data) {
  const map = new Map();
  data.forEach((d) => {
    const y = d.start_year || d.end_year || "";
    if (!y) return;
    const cur = map.get(y) ?? { year: y, count: 0, intensity: 0, likelihood: 0, relevance: 0, n: 0 };
    cur.count += 1;
    cur.intensity += (d.intensity) || 0;
    cur.likelihood += (d.likelihood) || 0;
    cur.relevance += (d.relevance) || 0;
    cur.n += 1;
    map.set(y, cur);
  });
  return Array.from(map.values())
    .map((r) => ({
      year: r.year,
      count: r.count,
      intensity: +(r.intensity / r.n).toFixed(2),
      likelihood: +(r.likelihood / r.n).toFixed(2),
      relevance: +(r.relevance / r.n).toFixed(2),
    }))
    .sort((a, b) =>(a.year) - (b.year));
}

export function avg(data, key) {
  if (!data.length) return 0;
  const sum = data.reduce((s, d) => s + ((d[key]) || 0), 0);
  return +(sum / data.length).toFixed(2);
}
