'use client';

import { useEffect, useState } from 'react';
import StatCard from './statCard';
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Activity, BarChart3, Gauge, Globe2, Sparkles, Target } from "lucide-react";
import { applyFilters, avg, EMPTY_FILTERS, fetchFilterOptions, fetchInsights } from "../utils/insights"
import {
  IntensityBySector,
  LikelihoodRelevanceScatter,
  PestleBars,
  RegionPie,
  TopCountries,
  TopTopics,
  TrendsByYear,
} from "./charts";
import KPICard from './kpiCards';

import { userServices } from '@/utils/userInterceptor';
import ChartCard from './chartCard';
import FilterBar from './filterBar';
import InsightsTable from './insightTable';
import { ThemeToggle } from './themetoggle';
const Skeleton = ({ className }) => (
  <div className={`animate-pulse rounded-lg bg-gray-200 ${className}`} />
);


const Dashboard=()=> {
//     const { data, isLoading, error } = useQuery({
//     queryKey: ["insights"],
//     queryFn: fetchInsights,
//     staleTime: Infinity,
//   });

  const [filters, setFilters] = useState(EMPTY_FILTERS);
const {
  data:all = [],
  isLoading,
  error,
} = useQuery({
  queryKey: ["insights", filters],
  queryFn: () => fetchInsights(filters),
  staleTime: 5 * 60 * 1000,
});



 const {
  data:options = {},
  isLoading: isOptionsLoading,
} = useQuery({
  queryKey: ["filter-options"],
  queryFn: fetchFilterOptions,
  staleTime: Infinity,
});
//   const all = useMemo(() => {
//     if (!data) return [];
//     return Array.isArray(data) ? data : (data.insights || data.data || []);
//   }, [data]);

//   const filtered = useMemo(() => applyFilters(all, filters), [all, filters]);
const filtered=all

const safeOptions = useMemo(() => {
  const getUniqueValues = (key) => {
    const values = all
      .map((item) => item[key])
      .filter((val) => val && String(val).trim() !== ""); 
    return ["all", ...new Set(values)]; 
  }
return {
    sectors: getUniqueValues("sector"),
    regions: getUniqueValues("region"),
    countries: getUniqueValues("country"),
    topics: getUniqueValues("topic"),
    pestles: getUniqueValues("pestle"),
    sources: getUniqueValues("source"),
    startYears: getUniqueValues("start_year"),
    endYears: getUniqueValues("end_year"),
  };
}, [all])

  return (

<div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
  
  
  <div className="px-6 py-6">
    <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
      Blackcoffer Insights Dashboard
    </h1>

    <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
      Total Records: {all.length.toLocaleString()}
    </p>
  </div>


  <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">
    <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4">
      
     
      <div className="flex items-center gap-3">
        <div
          className="
            flex h-10 w-10 items-center justify-center
            rounded-xl
            bg-gradient-to-br
            from-violet-600
            to-cyan-500
            text-white
            shadow-lg
            shadow-violet-500/30
            dark:from-violet-500
            dark:to-cyan-400
            dark:shadow-violet-500/40
          "
        >
          <Sparkles className="h-5 w-5" />
        </div>

        <div>
          <h1 className="text-base font-bold leading-tight text-slate-900 dark:text-slate-100">
            Insight Pulse
          </h1>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Strategic intelligence dashboard
          </p>
        </div>
      </div>

      
      <div className="hidden items-center gap-2 text-xs text-slate-500 dark:text-slate-400 md:flex">
        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse dark:bg-emerald-400" />
        Live · {all.length.toLocaleString()} records loaded
      </div>

      
      <ThemeToggle />
    </div>
  </header>

  
  <main className="mx-auto max-w-[1600px] space-y-6 px-6 py-6">
    
    
    {error && (
      <div
        className="
          rounded-xl
          border border-red-300
          bg-red-50
          p-4
          text-sm
          text-red-600
          dark:border-red-900
          dark:bg-red-950/30
          dark:text-red-400
        "
      >
        Failed to load data: {error.message}
      </div>
    )}

    
    {isLoading ? (
      <Skeleton className="h-32 w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
    ) : (
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        options={safeOptions}
      />
    )}


    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {isLoading ? (
        <>
          <Skeleton className="h-28 rounded-2xl bg-slate-200 dark:bg-slate-800" />
          <Skeleton className="h-28 rounded-2xl bg-slate-200 dark:bg-slate-800" />
          <Skeleton className="h-28 rounded-2xl bg-slate-200 dark:bg-slate-800" />
          <Skeleton className="h-28 rounded-2xl bg-slate-200 dark:bg-slate-800" />
        </>
      ) : (
        <>
          <KPICard
            label="Insights"
            value={filtered.length.toLocaleString()}
            hint={`${(
              (filtered.length / Math.max(all.length, 1)) *
              100
            ).toFixed(1)}% of total`}
            icon={BarChart3}
            accent="indigo"
          />

          <KPICard
            label="Avg Intensity"
            value={avg(filtered, "intensity")}
            hint="signal strength"
            icon={Activity}
            accent="cyan"
          />

          <KPICard
            label="Avg Likelihood"
            value={avg(filtered, "likelihood")}
            hint="of materializing"
            icon={Gauge}
            accent="mint"
          />

          <KPICard
            label="Avg Relevance"
            value={avg(filtered, "relevance")}
            hint="to business"
            icon={Target}
            accent="amber"
          />
        </>
      )}
    </div>

    
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <ChartCard
        title="Average intensity by sector"
        subtitle="Top sectors by signal strength"
        className="lg:col-span-2"
      >
        {isLoading ? (
          <Skeleton className="h-[300px] rounded-2xl bg-slate-200 dark:bg-slate-800" />
        ) : (
          <IntensityBySector data={filtered} />
        )}
      </ChartCard>

      <ChartCard
        title="Region distribution"
        subtitle="Share of insights by region"
      >
        {isLoading ? (
          <Skeleton className="h-[300px] rounded-2xl bg-slate-200 dark:bg-slate-800" />
        ) : (
          <RegionPie data={filtered} />
        )}
      </ChartCard>

      <ChartCard
        title="Trends over time"
        subtitle="Insight volume & intensity by start year"
        className="lg:col-span-2"
      >
        {isLoading ? (
          <Skeleton className="h-[300px] rounded-2xl bg-slate-200 dark:bg-slate-800" />
        ) : (
          <TrendsByYear data={filtered} />
        )}
      </ChartCard>

      <ChartCard
        title="Likelihood × Relevance"
        subtitle="Bubble = record density"
      >
        {isLoading ? (
          <Skeleton className="h-[300px] rounded-2xl bg-slate-200 dark:bg-slate-800" />
        ) : (
          <LikelihoodRelevanceScatter data={filtered} />
        )}
      </ChartCard>

      <ChartCard
        title="Top countries"
        subtitle="By number of insights"
      >
        {isLoading ? (
          <Skeleton className="h-[300px] rounded-2xl bg-slate-200 dark:bg-slate-800" />
        ) : (
          <TopCountries data={filtered} />
        )}
      </ChartCard>

      <ChartCard
        title="Top topics"
        subtitle="Most discussed themes"
        className="lg:col-span-2"
      >
        {isLoading ? (
          <Skeleton className="h-[300px] rounded-2xl bg-slate-200 dark:bg-slate-800" />
        ) : (
          <TopTopics data={filtered} />
        )}
      </ChartCard>

      <ChartCard
        title="PESTLE breakdown"
        subtitle="Political, Economic, Social, Technological, Legal, Environmental"
        className="lg:col-span-3"
      >
        {isLoading ? (
          <Skeleton className="h-[300px] rounded-2xl bg-slate-200 dark:bg-slate-800" />
        ) : (
          <PestleBars data={filtered} />
        )}
      </ChartCard>
    </div>


    {isLoading ? (
      <Skeleton className="h-96 rounded-2xl bg-slate-200 dark:bg-slate-800" />
    ) : (
      <InsightsTable data={filtered} />
    )}

    
    <footer className="flex items-center justify-center gap-2 py-6 text-xs text-slate-500 dark:text-slate-400">
      <Globe2 className="h-3.5 w-3.5" />
      Built with React + TanStack · Recharts · Tailwind
    </footer>
  </main>
</div>
  );
}

export default Dashboard
