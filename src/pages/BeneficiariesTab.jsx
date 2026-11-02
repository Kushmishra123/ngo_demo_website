import React, { useState } from 'react';
import {
  Users,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  ShieldCheck,
  MapPin,
  Phone,
  FileCheck2,
  Heart,
  Search,
  Filter
} from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { StatusBadge } from '../components/common/StatusBadge';

export const BeneficiariesTab = ({ onOpenModal }) => {
  const {
    beneficiaries,
    deleteBeneficiary,
    toggleBeneficiaryStatus,
    searchQuery
  } = useDashboard();

  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredBeneficiaries = beneficiaries.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.location && b.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (b.aidProvided && b.aidProvided.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = categoryFilter === 'All' || b.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const verifiedCount = beneficiaries.filter((b) => b.status === 'Verified').length;
  const pendingCount = beneficiaries.filter((b) => b.status === 'Pending').length;

  return (
    <div className="space-y-6">
      {/* Top Statistical Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white/95 rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Enrolled Recipients</span>
            <h3 className="text-2xl font-black text-slate-900 font-mono">
              {beneficiaries.length} Families
            </h3>
            <span className="text-[11px] text-sky-700 font-semibold">Grassroots Field Dossiers</span>
          </div>
          <div className="p-3 bg-sky-50 rounded-2xl text-sky-600 border border-sky-100">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white/95 rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Verified & Field Inspected</span>
            <h3 className="text-2xl font-black text-emerald-600 font-mono">
              {verifiedCount} Verified
            </h3>
            <span className="text-[11px] text-slate-500 font-medium">Biometric & Aadhaar Linked</span>
          </div>
          <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 border border-emerald-100">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white/95 rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Pending Field Clearance</span>
            <h3 className="text-2xl font-black text-amber-600 font-mono">
              {pendingCount} Applications
            </h3>
            <span className="text-[11px] text-slate-500 font-medium">Field Officer Review Queue</span>
          </div>
          <div className="p-3 bg-amber-50 rounded-2xl text-amber-600 border border-amber-100">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Action & Filter Bar */}
      <div className="bg-white/95 rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
              Direct Beneficiary & Aid Verification Registry
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-50 text-sky-800 border border-sky-200 font-mono">
              {filteredBeneficiaries.length} Dossiers
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Transparent grassroots delivery tracking with click-to-verify functionality
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-700 cursor-pointer"
          >
            <option value="All">All Intervention Pillars</option>
            <option value="Education">Education Aid</option>
            <option value="Medical">Medical Support</option>
            <option value="Food">Food / Ration Kits</option>
            <option value="Shelter">Shelter & Relief</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-700 cursor-pointer"
          >
            <option value="All">All Verification Statuses</option>
            <option value="Verified">Verified Only</option>
            <option value="Pending">Pending Audit</option>
          </select>

          <button
            onClick={() => onOpenModal('beneficiary')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-extrabold text-white bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 rounded-xl shadow-md shadow-sky-700/20 ring-1 ring-sky-400/30 transition transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            <span>Register Beneficiary</span>
          </button>
        </div>
      </div>

      {/* Main Beneficiaries Table */}
      <div className="bg-white/95 rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-400 uppercase tracking-wider text-[10px] font-bold border-b border-slate-200/80">
              <tr>
                <th className="py-3.5 px-5">Beneficiary / Representative</th>
                <th className="py-3.5 px-4">Pillar</th>
                <th className="py-3.5 px-4">Aid Provided / Equipment</th>
                <th className="py-3.5 px-4">Cluster / Ward Location</th>
                <th className="py-3.5 px-4">Enrolled Date</th>
                <th className="py-3.5 px-4 text-center">Verification Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredBeneficiaries.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-14 text-center text-slate-400">
                    <Users className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                    <p className="font-bold text-sm text-slate-700">No beneficiaries match filters</p>
                    <p className="text-xs text-slate-400 mt-1">Click "Register Beneficiary" to add records.</p>
                  </td>
                </tr>
              ) : (
                filteredBeneficiaries.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="py-3.5 px-5">
                      <div className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition">
                        {b.name}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-slate-400 text-[11px]">
                        <span className="font-mono text-sky-700 font-semibold">{b.id}</span>
                        {b.aadhaarLast4 && (
                          <>
                            <span>•</span>
                            <span className="text-slate-500 font-mono">ID: •••• {b.aadhaarLast4}</span>
                          </>
                        )}
                        {b.contact && (
                          <>
                            <span>•</span>
                            <span className="text-slate-500 flex items-center gap-0.5">
                              <Phone className="w-3 h-3 text-slate-400" />
                              {b.contact}
                            </span>
                          </>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                        {b.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-800 line-clamp-2 max-w-[220px]">
                        {b.aidProvided || 'Standard Humanitarian Kit'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-start gap-1 text-slate-600 max-w-[180px]">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{b.location || 'Central Staging Camp'}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">
                      {b.date}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => toggleBeneficiaryStatus(b.id)}
                        className="transition transform hover:scale-105"
                        title="Click to toggle status between Verified & Pending"
                      >
                        <StatusBadge status={b.status} />
                      </button>
                    </td>

                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => toggleBeneficiaryStatus(b.id)}
                          className={`p-1.5 rounded-lg transition ${
                            b.status === 'Verified'
                              ? 'text-emerald-600 hover:bg-emerald-50'
                              : 'text-amber-600 hover:bg-amber-50'
                          }`}
                          title={b.status === 'Verified' ? 'Revoke to Pending' : 'Approve to Verified'}
                        >
                          <ShieldCheck className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteBeneficiary(b.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          title="Delete Beneficiary Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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
