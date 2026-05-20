'use client';
import { RotateCcw } from "lucide-react";
import { EMPTY_FILTERS } from "../utils/insights";

const FIELDS = [
  { key: "end_year", label: "End Year", optionsKey: "endYears" },
  { key: "start_year", label: "Start Year", optionsKey: "startYears" },
  { key: "topic", label: "Topic", optionsKey: "topics" },
  { key: "sector", label: "Sector", optionsKey: "sectors" },
  { key: "region", label: "Region", optionsKey: "regions" },
  { key: "pestle", label: "PESTLE", optionsKey: "pestles" },
  { key: "source", label: "Source", optionsKey: "sources" },
  { key: "country", label: "Country", optionsKey: "countries" },
];

const FilterBar = ({ filters, setFilters, options = {} }) => {
  const handleChange = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  const handleReset = () => {
    setFilters(EMPTY_FILTERS);
  };

  return (
    <div
      className="
        rounded-xl
        border border-slate-200
        bg-white/60
        backdrop-blur
        p-4
        shadow-sm
        dark:border-slate-800
        dark:bg-slate-900/60
      "
    >
      
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Filters
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Refine the dataset across 8 dimensions
          </p>
        </div>

    
        <button
          type="button"
          onClick={handleReset}
          className="
            inline-flex items-center gap-2
            rounded-md
            px-3 py-2
            text-xs font-medium
            text-slate-500
            transition-colors
            hover:bg-slate-100
            hover:text-slate-900
            dark:text-slate-400
            dark:hover:bg-slate-800
            dark:hover:text-slate-100
          "
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </button>
      </div>

    
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8">
        {FIELDS.map(({ key, label, optionsKey }) => {
          const selectOptions = options[optionsKey] || ["all"];

          return (
            <div key={key} className="flex flex-col gap-1">
              
              <label
                className="
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-wider
                  text-slate-500
                  dark:text-slate-400
                "
              >
                {label}
              </label>

              
              <select
                value={filters[key] || "all"}
                onChange={(e) => handleChange(key, e.target.value)}
                className="
                  h-9
                  w-full
                  rounded-md
                  border border-slate-200
                  bg-white/50
                  px-3
                  text-xs
                  text-slate-900
                  outline-none
                  transition

                  focus:border-violet-500
                  focus:ring-2
                  focus:ring-violet-500/20

                  dark:border-slate-700
                  dark:bg-slate-800/70
                  dark:text-slate-100
                  dark:focus:border-violet-400
                  dark:focus:ring-violet-400/20
                "
              >
                <option
                  value="all"
                  className="bg-white text-slate-900 dark:bg-slate-800 dark:text-slate-100"
                >
                  All {label}
                </option>

                {selectOptions
                  .filter((option) => option !== "all")
                  .map((option) => (
                    <option
                      key={option}
                      value={option}
                      className="bg-white text-slate-900 dark:bg-slate-800 dark:text-slate-100"
                    >
                      {option}
                    </option>
                  ))}
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterBar;