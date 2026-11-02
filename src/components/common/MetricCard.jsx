import React from 'react';
import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';

export const MetricCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend = 'up',
  trendValue,
  accent = 'emerald',
  sparklineData = [35, 45, 40, 55, 60, 58, 75, 82],
  onClick
}) => {
  const accentConfigs = {
    emerald: {
      border: 'border-slate-200/80 hover:border-emerald-300',
      iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-200/50',
      glow: 'hover:shadow-xl hover:shadow-emerald-500/10',
      sparkStroke: '#10b981',
      sparkFill: 'rgba(16, 185, 129, 0.08)'
    },
    indigo: {
      border: 'border-slate-200/80 hover:border-indigo-300',
      iconBg: 'bg-indigo-50 text-indigo-600 border border-indigo-200/50',
      glow: 'hover:shadow-xl hover:shadow-indigo-500/10',
      sparkStroke: '#6366f1',
      sparkFill: 'rgba(99, 102, 241, 0.08)'
    },
    amber: {
      border: 'border-slate-200/80 hover:border-amber-300',
      iconBg: 'bg-amber-50 text-amber-600 border border-amber-200/50',
      glow: 'hover:shadow-xl hover:shadow-amber-500/10',
      sparkStroke: '#f59e0b',
      sparkFill: 'rgba(245, 158, 11, 0.08)'
    },
    rose: {
      border: 'border-slate-200/80 hover:border-rose-300',
      iconBg: 'bg-rose-50 text-rose-600 border border-rose-200/50',
      glow: 'hover:shadow-xl hover:shadow-rose-500/10',
      sparkStroke: '#f43f5e',
      sparkFill: 'rgba(244, 63, 94, 0.08)'
    },
    sky: {
      border: 'border-slate-200/80 hover:border-sky-300',
      iconBg: 'bg-sky-50 text-sky-600 border border-sky-200/50',
      glow: 'hover:shadow-xl hover:shadow-sky-500/10',
      sparkStroke: '#0ea5e9',
      sparkFill: 'rgba(14, 165, 233, 0.08)'
    }
  };

  const config = accentConfigs[accent] || accentConfigs.emerald;

  // Generate SVG path for sparkline
  const minVal = Math.min(...sparklineData);
  const maxVal = Math.max(...sparklineData);
  const range = maxVal - minVal || 1;
  const width = 110;
  const height = 36;
  const step = width / (sparklineData.length - 1);

  const points = sparklineData.map((d, i) => {
    const x = i * step;
    const y = height - ((d - minVal) / range) * (height - 8) - 4;
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(' L ')}`;
  const areaD = `M 0,${height} L ${points.join(' L ')} L ${width},${height} Z`;

  return (
    <div
      onClick={onClick}
      className={`group relative bg-white/95 rounded-2xl p-5 border shadow-xs transition-all duration-300 ease-out ${config.border} ${config.glow} ${
        onClick ? 'cursor-pointer hover:-translate-y-1' : ''
      }`}
    >
      {/* Top Row: Title & Icon */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            {title}
          </span>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight tabular-nums font-mono">
            {value}
          </h3>
        </div>

        {Icon && (
          <div className={`p-2.5 rounded-xl transition-all duration-300 group-hover:scale-110 shadow-2xs ${config.iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* Middle Row: Micro Sparkline */}
      <div className="mt-3 flex items-center justify-between">
        <div className="w-28 h-9 overflow-hidden">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
            <path d={areaD} fill={config.sparkFill} />
            <path
              d={pathD}
              fill="none"
              stroke={config.sparkStroke}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {trendValue && (
          <span
            className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-md text-[11px] shadow-2xs ${
              trend === 'up'
                ? 'text-emerald-700 bg-emerald-500/10 border border-emerald-500/20'
                : 'text-rose-700 bg-rose-500/10 border border-rose-500/20'
            }`}
          >
            {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {trendValue}
          </span>
        )}
      </div>

      {/* Bottom Subtitle Row */}
      <div className="mt-3 pt-2.5 border-t border-slate-100/90 flex items-center justify-between text-[11px] text-slate-500">
        <span className="truncate font-medium">{subtitle || 'Updated live from ledger'}</span>
        <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:text-emerald-600 transition-opacity" />
      </div>
    </div>
  );
};
