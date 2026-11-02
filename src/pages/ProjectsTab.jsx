import React, { useState } from 'react';
import {
  FolderKanban,
  Plus,
  Trash2,
  Calendar,
  MapPin,
  Users,
  Target,
  ArrowRight,
  TrendingUp,
  Award,
  Wallet,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { StatusBadge } from '../components/common/StatusBadge';

export const ProjectsTab = ({ onOpenModal }) => {
  const { projects, deleteProject, searchQuery } = useDashboard();
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.manager.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.location && p.location.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = filterStatus === 'All' || p.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const totalTargetBudget = projects.reduce((acc, curr) => acc + (Number(curr.targetBudget) || 0), 0);
  const totalFundsSpent = projects.reduce((acc, curr) => acc + (Number(curr.fundsUsed) || 0), 0);
  const totalBeneficiaries = projects.reduce((acc, curr) => acc + (Number(curr.beneficiariesCount) || 0), 0);

  return (
    <div className="space-y-6">
      {/* Top Portfolio Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white/95 rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Program Commitment</span>
            <h3 className="text-2xl font-black text-slate-900 font-mono">
              ₹{totalTargetBudget.toLocaleString('en-IN')}
            </h3>
            <span className="text-[11px] text-slate-500 font-medium">{projects.length} Field Mission Milestones</span>
          </div>
          <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600 border border-indigo-100">
            <FolderKanban className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white/95 rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Audited Deployments Spent</span>
            <h3 className="text-2xl font-black text-emerald-600 font-mono">
              ₹{totalFundsSpent.toLocaleString('en-IN')}
            </h3>
            <span className="text-[11px] text-emerald-700 font-semibold">
              {Math.round((totalFundsSpent / (totalTargetBudget || 1)) * 100)}% Overall Burn Rate
            </span>
          </div>
          <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 border border-emerald-100">
            <Wallet className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white/95 rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Target Community Reach</span>
            <h3 className="text-2xl font-black text-slate-900 font-mono">
              {totalBeneficiaries.toLocaleString('en-IN')}
            </h3>
            <span className="text-[11px] text-slate-500 font-medium">Marginalized Citizens Reached</span>
          </div>
          <div className="p-3 bg-purple-50 rounded-2xl text-purple-600 border border-purple-100">
            <Users className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Action & Filter Bar */}
      <div className="bg-white/95 rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
              Mission & Project Deployments
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-800 border border-indigo-200 font-mono">
              {filteredProjects.length} Active
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Transparent budget tracking with lead manager responsibility matrices
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center bg-slate-100/90 p-1 rounded-xl text-xs font-bold text-slate-600 border border-slate-200/60">
            {['All', 'Active', 'Completed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filterStatus === status ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <button
            onClick={() => onOpenModal('project')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-extrabold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 rounded-xl shadow-md shadow-indigo-700/20 ring-1 ring-indigo-400/30 transition transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            <span>Launch New Mission</span>
          </button>
        </div>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredProjects.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white/95 rounded-2xl border border-slate-200">
            <FolderKanban className="w-12 h-12 mx-auto text-slate-300 mb-2" />
            <p className="font-bold text-slate-700">No mission deployments found</p>
            <p className="text-xs text-slate-400 mt-1">Click "Launch New Mission" to initiate a program.</p>
          </div>
        ) : (
          filteredProjects.map((project) => {
            const percentUsed = Math.min(
              100,
              Math.round((Number(project.fundsUsed) / (Number(project.targetBudget) || 1)) * 100)
            );
            const remaining = Math.max(0, Number(project.targetBudget) - Number(project.fundsUsed));

            return (
              <div
                key={project.id}
                className="bg-white/95 rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  {/* Top Pill Row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                          {project.id}
                        </span>
                        <StatusBadge status={project.status} />
                      </div>
                      <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-700 transition">
                        {project.name}
                      </h3>
                    </div>

                    <button
                      onClick={() => deleteProject(project.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                      title="Delete Mission"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {project.description && (
                    <p className="text-xs text-slate-600 mt-3 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  )}

                  {/* Metadata Matrix */}
                  <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Lead Manager</span>
                      <span className="font-semibold text-slate-800">{project.manager}</span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Territory Focus</span>
                      <div className="flex items-center gap-1 font-semibold text-slate-800 truncate">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{project.location || 'Pan-India'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar & Financials */}
                  <div className="mt-5 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Budget Burn Rate</span>
                      <span className="font-black text-slate-900 font-mono">{percentUsed}%</span>
                    </div>

                    <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          percentUsed >= 100
                            ? 'bg-blue-500'
                            : percentUsed > 80
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                        }`}
                        style={{ width: `${percentUsed}%` }}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-1 text-center font-mono">
                      <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                        <span className="text-[9px] uppercase font-bold text-slate-400 block font-sans">Spent</span>
                        <span className="text-xs font-bold text-slate-800">₹{Number(project.fundsUsed).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                        <span className="text-[9px] uppercase font-bold text-slate-400 block font-sans">Remaining</span>
                        <span className="text-xs font-bold text-emerald-700">₹{remaining.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                        <span className="text-[9px] uppercase font-bold text-slate-400 block font-sans">Budget</span>
                        <span className="text-xs font-bold text-slate-900">₹{Number(project.targetBudget).toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer of Card */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-700 font-bold font-mono">
                    <Users className="w-4 h-4 text-emerald-600" />
                    <span>{Number(project.beneficiariesCount || 0).toLocaleString('en-IN')} Beneficiaries</span>
                  </div>

                  {project.startDate && (
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{project.startDate}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
