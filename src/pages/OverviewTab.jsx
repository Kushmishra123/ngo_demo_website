import React from 'react';
import {
  Coins,
  TrendingDown,
  FolderKanban,
  Users,
  HeartHandshake,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  Calendar,
  CheckCircle2,
  Award,
  Wallet,
  PieChart,
  ArrowRight,
  TrendingUp,
  Landmark,
  BadgePercent,
  Sparkles
} from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { MetricCard } from '../components/common/MetricCard';
import { StatusBadge } from '../components/common/StatusBadge';

export const OverviewTab = ({ onOpenModal }) => {
  const {
    metrics,
    donors,
    projects,
    beneficiaries,
    transactions,
    activities,
    setActiveTab
  } = useDashboard();

  // Financial calculations
  const totalFunds = metrics.totalFundsPool;
  const expensePercentage = totalFunds > 0 ? Math.min(100, Math.round((metrics.totalExpenses / totalFunds) * 100)) : 0;
  const reservePercentage = 100 - expensePercentage;

  // Breakdown of beneficiaries by intervention pillar
  const categories = [
    { name: 'Education & Scholars', count: 520, percent: 38, color: 'bg-emerald-500' },
    { name: 'Mobile Healthcare Clinics', count: 4200, percent: 32, color: 'bg-indigo-500' },
    { name: 'Zero-Hunger Food Relief', count: 3100, percent: 18, color: 'bg-amber-500' },
    { name: 'Clean Water & Borewells', count: 1850, percent: 12, color: 'bg-teal-500' }
  ];

  // SVG Area Chart points for Inflow vs Outflow
  // 6 months trend simulation (May to Oct 2026)
  const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
  const inflowData = [4.2, 5.8, 6.4, 8.1, 7.5, 9.8]; // in Lakhs
  const outflowData = [3.1, 4.0, 4.8, 5.9, 6.2, 7.1];

  // Chart dimension helpers
  const chartWidth = 560;
  const chartHeight = 160;
  const maxVal = 11;
  const stepX = chartWidth / (months.length - 1);

  const getPoints = (data) =>
    data.map((val, idx) => {
      const x = idx * stepX;
      const y = chartHeight - (val / maxVal) * (chartHeight - 20) - 10;
      return { x, y };
    });

  const inflowPoints = getPoints(inflowData);
  const outflowPoints = getPoints(outflowData);

  const inflowPath = `M ${inflowPoints.map((p) => `${p.x},${p.y}`).join(' L ')}`;
  const inflowArea = `M 0,${chartHeight} L ${inflowPoints.map((p) => `${p.x},${p.y}`).join(' L ')} L ${chartWidth},${chartHeight} Z`;

  const outflowPath = `M ${outflowPoints.map((p) => `${p.x},${p.y}`).join(' L ')}`;
  const outflowArea = `M 0,${chartHeight} L ${outflowPoints.map((p) => `${p.x},${p.y}`).join(' L ')} L ${chartWidth},${chartHeight} Z`;

  return (
    <div className="space-y-6">
      {/* Executive Welcome Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#061712] via-[#09221b] to-[#0d1624] text-white p-6 sm:p-8 shadow-xl border border-emerald-900/40">
        {/* Ambient background glows */}
        <div className="absolute right-0 top-0 -mt-16 -mr-16 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 -mb-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-semibold backdrop-blur-md border border-emerald-400/25">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Statutory Compliance: FCRA • 12A • 80G Certified</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span className="text-emerald-400 font-bold">Audit Grade AAA+</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Agape Hope Federation Impact Operations
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Unified command center overseeing grassroots program deployments, audited voucher ledgers, direct beneficiary verifications, and corporate CSR capital pools across India.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenModal('donor')}
              className="px-4.5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Coins className="w-4 h-4 text-slate-950" />
              <span>Record Donation</span>
            </button>

            <button
              onClick={() => onOpenModal('beneficiary')}
              className="px-4.5 py-2.5 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs rounded-xl backdrop-blur-md border border-white/20 transition-all flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              <span>Register Recipient</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5 Core Executive Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard
          title="Total Donations & Grants"
          value={`₹${metrics.totalDonations.toLocaleString('en-IN')}`}
          subtitle={`${donors.length} active donors`}
          icon={Coins}
          accent="emerald"
          trend="up"
          trendValue="+18.4% MoM"
          sparklineData={[35, 42, 50, 48, 65, 72, 85, 94]}
          onClick={() => setActiveTab('donors')}
        />

        <MetricCard
          title="Audited Disbursements"
          value={`₹${metrics.totalExpenses.toLocaleString('en-IN')}`}
          subtitle={`${transactions.filter((t) => t.type === 'Expense').length} approved vouchers`}
          icon={TrendingDown}
          accent="rose"
          trend="down"
          trendValue="On Budget"
          sparklineData={[28, 30, 45, 42, 55, 60, 58, 64]}
          onClick={() => setActiveTab('finance')}
        />

        <MetricCard
          title="Field Deployments"
          value={`${metrics.activeProjectsCount} / ${metrics.totalProjectsCount}`}
          subtitle="Missions live on field"
          icon={FolderKanban}
          accent="indigo"
          trend="up"
          trendValue="100% on track"
          sparklineData={[40, 45, 48, 60, 65, 75, 80, 92]}
          onClick={() => setActiveTab('projects')}
        />

        <MetricCard
          title="Beneficiaries Reached"
          value={metrics.totalBeneficiariesReached.toLocaleString('en-IN')}
          subtitle={`${beneficiaries.filter((b) => b.status === 'Verified').length} direct verifications`}
          icon={Users}
          accent="sky"
          trend="up"
          trendValue="+142 this wk"
          sparklineData={[50, 60, 68, 75, 82, 88, 95, 100]}
          onClick={() => setActiveTab('beneficiaries')}
        />

        <MetricCard
          title="Volunteer Fellows"
          value={metrics.totalVolunteersCount.toString()}
          subtitle={`${metrics.activeVolunteersCount} active on ground`}
          icon={HeartHandshake}
          accent="amber"
          trend="up"
          trendValue="339 hrs logged"
          sparklineData={[30, 38, 44, 52, 60, 70, 78, 86]}
          onClick={() => setActiveTab('volunteers')}
        />
      </div>

      {/* Middle Grid: Dynamic SVG Fiscal Trend Chart & Capital Reserves */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inflow vs Outflow Visual Curve Chart */}
        <div className="lg:col-span-2 bg-white/95 rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-900 text-sm tracking-tight">
                  Fiscal Momentum & Cash Flow Trajectory
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Live Ledger
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Monthly Funds Inflow (Grants & Donations) vs Field Program Outflow (₹ in Lakhs)
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5 text-emerald-700">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>Inflow (Donations)</span>
              </div>
              <div className="flex items-center gap-1.5 text-rose-600">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span>Outflow (Disbursed)</span>
              </div>
            </div>
          </div>

          {/* SVG Smooth Curve Area Chart */}
          <div className="pt-3">
            <div className="h-44 w-full">
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="inflowGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="outflowGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Gridlines */}
                {[0, 40, 80, 120].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    y1={y}
                    x2={chartWidth}
                    y2={y}
                    stroke="#f1f5f9"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                ))}

                {/* Area fills */}
                <path d={inflowArea} fill="url(#inflowGrad)" />
                <path d={outflowArea} fill="url(#outflowGrad)" />

                {/* Outflow Line */}
                <path
                  d={outflowPath}
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Inflow Line */}
                <path
                  d={inflowPath}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Points */}
                {inflowPoints.map((p, i) => (
                  <circle
                    key={`in-${i}`}
                    cx={p.x}
                    cy={p.y}
                    r="4"
                    fill="#10b981"
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="hover:r-6 transition-all cursor-pointer"
                  />
                ))}

                {outflowPoints.map((p, i) => (
                  <circle
                    key={`out-${i}`}
                    cx={p.x}
                    cy={p.y}
                    r="4"
                    fill="#f43f5e"
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="hover:r-6 transition-all cursor-pointer"
                  />
                ))}
              </svg>
            </div>

            {/* Month labels */}
            <div className="flex justify-between text-[11px] font-semibold text-slate-400 pt-2 px-1">
              {months.map((m) => (
                <span key={m}>{m} 2026</span>
              ))}
            </div>
          </div>
        </div>

        {/* Capital Reserves & Statutory Ratios */}
        <div className="bg-white/95 rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-5 flex flex-col justify-between">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Statutory Reserve Ratio
              </span>
              <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                85.2% Program Deploy
              </span>
            </div>
            <h4 className="text-lg font-black text-slate-900 font-mono">
              ₹{metrics.netSurplus.toLocaleString('en-IN')}
            </h4>
            <p className="text-xs text-slate-500">Unrestricted operational reserve</p>
          </div>

          {/* Allocation Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-600">Disbursed: {expensePercentage}%</span>
              <span className="text-emerald-700">Reserve Pool: {reservePercentage}%</span>
            </div>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
              <div
                style={{ width: `${expensePercentage}%` }}
                className="bg-rose-500 transition-all duration-500"
                title={`Disbursed: ₹${metrics.totalExpenses.toLocaleString('en-IN')}`}
              />
              <div
                style={{ width: `${reservePercentage}%` }}
                className="bg-emerald-500 transition-all duration-500"
                title={`Available Reserve: ₹${metrics.netSurplus.toLocaleString('en-IN')}`}
              />
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Total Program Inflow:</span>
              <span className="font-bold text-slate-800 font-mono">₹{metrics.totalFundsPool.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Field Disbursements:</span>
              <span className="font-bold text-rose-600 font-mono">₹{metrics.totalExpenses.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between border-t border-slate-200/80 pt-2 font-bold">
              <span className="text-slate-700">Surplus Balance:</span>
              <span className="text-emerald-700 font-mono">₹{metrics.netSurplus.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>Exceeds FCRA statutory threshold of 80% direct public aid deployment.</span>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Pillars of Impact & Live Audit Events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Intervention Pillars */}
        <div className="bg-white/95 rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">Intervention Pillars Reach</h3>
              <p className="text-xs text-slate-400">Distribution across active programs</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 font-mono">
              {metrics.totalBeneficiariesReached.toLocaleString('en-IN')} Lives
            </span>
          </div>

          <div className="space-y-3.5 pt-1">
            {categories.map((c) => (
              <div key={c.name} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-700">{c.name}</span>
                  <span className="text-slate-500 font-mono font-medium">{c.count} Reached ({c.percent}%)</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${c.color} rounded-full`} style={{ width: `${c.percent}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Direct verified dossier records:</span>
            <span className="font-bold text-slate-800 font-mono">{beneficiaries.length} verified</span>
          </div>
        </div>

        {/* Live Operational Events */}
        <div className="lg:col-span-2 bg-white/95 rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">Real-time Operational & Ledger Stream</h3>
              <p className="text-xs text-slate-400">Directly synchronized events and voucher authorizations</p>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              Live Synced
            </span>
          </div>

          <div className="divide-y divide-slate-100 max-h-56 overflow-y-auto pr-1">
            {activities.slice(0, 5).map((act) => (
              <div key={act.id} className="py-2.5 flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0 shadow-xs shadow-emerald-500/50" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-800 font-medium leading-relaxed">{act.text}</p>
                  <span className="text-[10px] text-slate-400 mt-0.5 block font-mono">{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Field Projects Milestone Portfolio */}
      <div className="bg-white/95 rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base tracking-tight">
              Mission Milestone Deployments
            </h3>
            <p className="text-xs text-slate-400">
              Grassroots project budgets, lead managers & execution status
            </p>
          </div>
          <button
            onClick={() => setActiveTab('projects')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 self-start sm:self-auto transition"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-400 uppercase tracking-wider text-[10px] font-bold border-y border-slate-100">
              <tr>
                <th className="py-3 px-4">Mission</th>
                <th className="py-3 px-4">Program Lead</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Fund Utilization</th>
                <th className="py-3 px-4">Lives Impacted</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {projects.slice(0, 4).map((prj) => {
                const percent = Math.min(100, Math.round((prj.fundsUsed / prj.targetBudget) * 100));
                return (
                  <tr key={prj.id} className="hover:bg-slate-50/80 transition group">
                    <td className="py-3.5 px-4 font-bold text-slate-900 group-hover:text-emerald-700 transition">
                      <div>{prj.name}</div>
                      <span className="text-[10px] font-mono text-slate-400">{prj.id}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">{prj.manager}</td>
                    <td className="py-3.5 px-4 text-slate-600">{prj.location}</td>
                    <td className="py-3.5 px-4 min-w-[180px]">
                      <div className="flex items-center justify-between text-[11px] mb-1 font-semibold">
                        <span className="text-slate-800 font-mono">₹{prj.fundsUsed.toLocaleString('en-IN')}</span>
                        <span className="text-slate-400 font-mono">/ ₹{prj.targetBudget.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            percent > 90 ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-800 font-mono">
                      {prj.beneficiariesCount.toLocaleString('en-IN')} Lives
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={prj.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
