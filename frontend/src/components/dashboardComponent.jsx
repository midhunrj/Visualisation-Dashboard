'use client';

import { useEffect, useState } from 'react';
//import api from '../services/api';
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
      .filter((val) => val && String(val).trim() !== ""); // Remove empty items
    return ["all", ...new Set(values)]; // Add 'all' as the default first option
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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Blackcoffer Insights Dashboard</h1>
      <p>Total Records: {all.length}</p>

     <FilterBar
    filters={filters}
    setFilters={setFilters}
    options={safeOptions}
  />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
  <StatCard title="Total Records" value={all.length} />
  <StatCard title="Countries" value={25} />
  <StatCard title="Topic" value={40} />
  <StatCard title="Avg Intensity" value={4.2} />
</div>
      <main className="mx-auto max-w-[1600px] px-6 py-6 space-y-6">
        {error && (
          <div className="rounded-xl border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
            Failed to load data: {(error).message}
          </div>
        )}

        {/* Filters */}
        {isLoading ? (
          <Skeleton className="h-32 w-full" />
        ) : (
          <FilterBar filters={filters} setFilters={setFilters} options={safeOptions} />
        )}

        {/* KPI strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading ? (
            <>
              <Skeleton className="h-28" />
              <Skeleton className="h-28" />
              <Skeleton className="h-28" />
              <Skeleton className="h-28" />
            </>
          ) : (
            <>
              <KPICard
                label="Insights"
                value={filtered.length.toLocaleString()}
                hint={`${((filtered.length / Math.max(all.length, 1)) * 100).toFixed(1)}% of total`}
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

        {/* Charts grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <ChartCard
            title="Average intensity by sector"
            subtitle="Top sectors by signal strength"
            className="lg:col-span-2"
          >
            {isLoading ? <Skeleton className="h-[300px]" /> : <IntensityBySector data={filtered} />}
          </ChartCard>
          <ChartCard title="Region distribution" subtitle="Share of insights by region">
            {isLoading ? <Skeleton className="h-[300px]" /> : <RegionPie data={filtered} />}
          </ChartCard>

          <ChartCard
            title="Trends over time"
            subtitle="Insight volume & intensity by start year"
            className="lg:col-span-2"
          >
            {isLoading ? <Skeleton className="h-[300px]" /> : <TrendsByYear data={filtered} />}
          </ChartCard>
          <ChartCard
            title="Likelihood × Relevance"
            subtitle="Bubble = record density"
          >
            {isLoading ? <Skeleton className="h-[300px]" /> : <LikelihoodRelevanceScatter data={filtered} />}
          </ChartCard>

          <ChartCard title="Top countries" subtitle="By number of insights">
            {isLoading ? <Skeleton className="h-[300px]" /> : <TopCountries data={filtered} />}
          </ChartCard>
          <ChartCard
            title="Top topics"
            subtitle="Most discussed themes"
            className="lg:col-span-2"
          >
            {isLoading ? <Skeleton className="h-[300px]" /> : <TopTopics data={filtered} />}
          </ChartCard>

          <ChartCard
            title="PESTLE breakdown"
            subtitle="Political, Economic, Social, Technological, Legal, Environmental"
            className="lg:col-span-3"
          >
            {isLoading ? <Skeleton className="h-[300px]" /> : <PestleBars data={filtered} />}
          </ChartCard>
        </div>
        {isLoading ? <Skeleton className="h-96" /> : <InsightsTable data={filtered} />}

        <footer className="flex items-center justify-center gap-2 py-6 text-xs text-muted-foreground">
          <Globe2 className="h-3.5 w-3.5" />
          Built with React + TanStack · Recharts · Tailwind
        </footer>
      </main>
    </div>
  );
}

export default Dashboard

//   const all = data ?? [];
//   const filtered = useMemo(() => applyFilters(all, filters), [all, filters]);


// import { Skeleton } from "@/components/ui/skeleton";
// import KPICard from './kpiCards';

    //const [data,setData]=useState('')
//   const [filters, setFilters] = useState({
//   topic: '',
//   country: '',
//   region: '',
// });

// useEffect(() => {
//   fetchData();
// }, [filters]);
//   const fetchData = async () => {
//     try {
//       const response = await userServices.get('/data');
//       setData(response.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };


// function Dashboard() {
  
//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-xl">
//         <div className="mx-auto max-w-[1600px] px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-chart-1 to-chart-2 shadow-lg">
//               <Sparkles className="h-5 w-5 text-primary-foreground" />
//             </div>
//             <div>
//               <h1 className="text-base font-bold text-foreground leading-tight">Insight Pulse</h1>
//               <p className="text-[11px] text-muted-foreground">Strategic intelligence dashboard</p>
//             </div>
//           </div>
//           <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
//             <span className="flex h-2 w-2 rounded-full bg-chart-3 animate-pulse" />
//             Live · {all.length.toLocaleString()} records loaded
//           </div>
//         </div>
//       </header>



//         {/* Table */}
        
//     </div>
//   );
// }
