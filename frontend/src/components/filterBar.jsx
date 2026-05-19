'use client';

const  FilterBar=({ filters, setFilters, options })=> {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <select
        className="border rounded-lg p-2"
        value={filters.topic}
        onChange={(e) =>
          setFilters({ ...filters, topic: e.target.value })
        }
      >
        <option value="">All Topics</option>
        {options.topics?.map((topic) => (
          <option key={topic} value={topic}>
            {topic}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterBar