import React, { useState } from 'react';
import {
  HeartHandshake,
  Plus,
  Trash2,
  Clock,
  Mail,
  Phone,
  Briefcase,
  CheckCircle2,
  Zap,
  Award,
  Star
} from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { StatusBadge } from '../components/common/StatusBadge';

export const VolunteersTab = ({ onOpenModal }) => {
  const { volunteers, deleteVolunteer, searchQuery } = useDashboard();
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredVolunteers = volunteers.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.skills.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (v.assignedProject && v.assignedProject.toLowerCase().includes(searchQuery.toLowerCase())) ||
      v.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || v.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalHoursLogged = volunteers.reduce((acc, curr) => acc + (Number(curr.hoursLogged) || 0), 0);
  const activeCount = volunteers.filter((v) => v.status === 'Active').length;

  const getInitials = (name) => {
    if (!name) return 'VF';
    const parts = name.split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const avatarGradients = [
    'from-amber-600 to-yellow-500',
    'from-emerald-600 to-teal-500',
    'from-indigo-600 to-blue-500',
    'from-purple-600 to-pink-500',
    'from-sky-600 to-cyan-500'
  ];

  return (
    <div className="space-y-6">
      {/* Top Statistical Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white/95 rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Volunteer Network</span>
            <h3 className="text-2xl font-black text-slate-900 font-mono">
              {volunteers.length} Fellows
            </h3>
            <span className="text-[11px] text-amber-700 font-semibold">Trained & Grassroots Deployed</span>
          </div>
          <div className="p-3 bg-amber-50 rounded-2xl text-amber-600 border border-amber-100">
            <HeartHandshake className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white/95 rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Community Hours Contributed</span>
            <h3 className="text-2xl font-black text-emerald-600 font-mono">
              {totalHoursLogged} Hours
            </h3>
            <span className="text-[11px] text-slate-500 font-medium">Certified Volunteer Service</span>
          </div>
          <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 border border-emerald-100">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white/95 rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Active Field Missions</span>
            <h3 className="text-2xl font-black text-indigo-600 font-mono">
              {activeCount} Deployed
            </h3>
            <span className="text-[11px] text-slate-500 font-medium">Real-time Squad Availability</span>
          </div>
          <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600 border border-indigo-100">
            <Zap className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Action & Filter Bar */}
      <div className="bg-white/95 rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
              Volunteer Force & Skill Deployment Directory
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 font-mono">
              {filteredVolunteers.length} Active
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Skill-matching and assignment roster with certified volunteer hours tracking
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center bg-slate-100/90 p-1 rounded-xl text-xs font-bold text-slate-600 border border-slate-200/60">
            {['All', 'Active', 'Available'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  statusFilter === st ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <button
            onClick={() => onOpenModal('volunteer')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-extrabold text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 rounded-xl shadow-md shadow-amber-700/20 ring-1 ring-amber-400/30 transition transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            <span>Onboard Volunteer</span>
          </button>
        </div>
      </div>

      {/* Main Volunteers Table */}
      <div className="bg-white/95 rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-400 uppercase tracking-wider text-[10px] font-bold border-b border-slate-200/80">
              <tr>
                <th className="py-3.5 px-5">Volunteer Fellow</th>
                <th className="py-3.5 px-4">Core Competency & Skills</th>
                <th className="py-3.5 px-4">Allocated Mission</th>
                <th className="py-3.5 px-4">Service Hours</th>
                <th className="py-3.5 px-4">Contact Coordinates</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredVolunteers.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-14 text-center text-slate-400">
                    <HeartHandshake className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                    <p className="font-bold text-sm text-slate-700">No volunteers match filter</p>
                    <p className="text-xs text-slate-400 mt-1">Click "Onboard Volunteer" to register fellows.</p>
                  </td>
                </tr>
              ) : (
                filteredVolunteers.map((vol, idx) => (
                  <tr key={vol.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${
                            avatarGradients[idx % avatarGradients.length]
                          } flex items-center justify-center text-white text-xs font-black shadow-xs shrink-0`}
                        >
                          {getInitials(vol.name)}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition">
                            {vol.name}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5 text-slate-400 text-[11px]">
                            <span className="font-mono text-amber-700 font-semibold">{vol.id}</span>
                            {vol.joinedDate && (
                              <>
                                <span>•</span>
                                <span className="font-mono">Since {vol.joinedDate}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
                        {vol.skills}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-800 line-clamp-1 max-w-[200px]" title={vol.assignedProject}>
                        {vol.assignedProject || 'General Emergency Squad'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 font-black text-slate-900 font-mono text-xs">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        <span>{vol.hoursLogged} hrs</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5 text-[11px]">
                        {vol.email && (
                          <div className="flex items-center gap-1 text-slate-500 truncate">
                            <Mail className="w-3 h-3 text-slate-400" />
                            <span className="truncate">{vol.email}</span>
                          </div>
                        )}
                        {vol.phone && (
                          <div className="flex items-center gap-1 text-slate-500 font-mono">
                            <Phone className="w-3 h-3 text-slate-400" />
                            <span>{vol.phone}</span>
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <StatusBadge status={vol.status} />
                    </td>

                    <td className="py-3.5 px-5 text-right">
                      <button
                        onClick={() => deleteVolunteer(vol.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                        title="Delete Volunteer Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
