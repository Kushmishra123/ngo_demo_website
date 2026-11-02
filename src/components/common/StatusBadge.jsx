import React from 'react';
import { CheckCircle2, Clock, Check, AlertCircle, RefreshCw, Zap, TrendingUp, TrendingDown, ShieldCheck } from 'lucide-react';

export const StatusBadge = ({ status, type = 'status' }) => {
  const normalized = (status || '').toLowerCase().trim();

  // 1. Verified / Approved / Active
  if (normalized === 'verified' || normalized === 'approved' || normalized === 'active') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-tight bg-emerald-500/10 text-emerald-700 border border-emerald-500/25 shadow-2xs">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-xs shadow-emerald-500/50"></span>
        {status}
      </span>
    );
  }

  // 2. Pending / Planning
  if (normalized === 'pending' || normalized === 'planning') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-tight bg-amber-500/10 text-amber-700 border border-amber-500/25 shadow-2xs">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
        {status}
      </span>
    );
  }

  // 3. Completed
  if (normalized === 'completed') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-tight bg-blue-500/10 text-blue-700 border border-blue-500/25 shadow-2xs">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
        {status}
      </span>
    );
  }

  // 4. Available
  if (normalized === 'available') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-tight bg-indigo-500/10 text-indigo-700 border border-indigo-500/25 shadow-2xs">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
        {status}
      </span>
    );
  }

  // 5. On Leave / Rejected
  if (normalized === 'on leave' || normalized === 'rejected') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-tight bg-rose-500/10 text-rose-700 border border-rose-500/25 shadow-2xs">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
        {status}
      </span>
    );
  }

  // 6. Recurring Frequency
  if (normalized === 'recurring') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-tight bg-purple-500/10 text-purple-700 border border-purple-500/25 shadow-2xs">
        <RefreshCw className="w-3 h-3 text-purple-600 animate-[spin_4s_linear_infinite]" />
        Recurring
      </span>
    );
  }

  // 7. One-Time Frequency
  if (normalized === 'one-time') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold text-slate-600 bg-slate-100 border border-slate-200">
        One-Time
      </span>
    );
  }

  // 8. Income Transaction
  if (normalized === 'income') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-300">
        <TrendingUp className="w-3 h-3 text-emerald-600" />
        + Income
      </span>
    );
  }

  // 9. Expense Transaction
  if (normalized === 'expense') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-extrabold bg-rose-50 text-rose-700 border border-rose-300">
        <TrendingDown className="w-3 h-3 text-rose-600" />
        - Expense
      </span>
    );
  }

  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
      {status}
    </span>
  );
};
