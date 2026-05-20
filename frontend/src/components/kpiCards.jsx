
const ACCENTS = {
  indigo: 'from-indigo-500/20 to-transparent text-indigo-600 dark:text-indigo-400',
  cyan: 'from-cyan-500/20 to-transparent text-cyan-600 dark:text-cyan-400',
  mint: 'from-emerald-500/20 to-transparent text-emerald-600 dark:text-emerald-400',
  amber: 'from-amber-500/20 to-transparent text-amber-600 dark:text-amber-400',
};

const KPICard = ({
  label,
  value,
  hint,
  icon: Icon,
  accent = 'indigo',
}) => {
  const iconColor = ACCENTS[accent].split(' ').pop();

  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${ACCENTS[accent]} opacity-60 pointer-events-none`}
      />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {label}
          </p>
          <p className="mt-2 text-3xl font-bold tabular-nums text-slate-900 dark:text-slate-100">
            {value}
          </p>
          {hint && (
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {hint}
            </p>
          )}
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 ${iconColor}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default KPICard;