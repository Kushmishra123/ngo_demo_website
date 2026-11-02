import React, { useState } from 'react';
import {
  Coins,
  Plus,
  Trash2,
  Download,
  Filter,
  Search,
  CheckCircle2,
  FileSpreadsheet,
  Receipt,
  Mail,
  Calendar,
  Building,
  User,
  ExternalLink,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { StatusBadge } from '../components/common/StatusBadge';

export const DonorsTab = ({ onOpenModal }) => {
  const { donors, deleteDonor, searchQuery, addToast } = useDashboard();
  const [filterType, setFilterType] = useState('All');
  const [selectedCampaign, setSelectedCampaign] = useState('All');

  const filteredDonors = donors.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.campaign.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = filterType === 'All' || d.type === filterType;
    const matchesCampaign = selectedCampaign === 'All' || d.campaign === selectedCampaign;

    return matchesSearch && matchesType && matchesCampaign;
  });

  const totalFilteredAmount = filteredDonors.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
  const recurringCount = donors.filter((d) => d.type === 'Recurring').length;

  // Export CSV
  const exportCSV = () => {
    const headers = ['ID,Name,Email,Amount,Type,Campaign,Date,PaymentMethod,PAN'];
    const rows = filteredDonors.map(
      (d) =>
        `"${d.id}","${d.name}","${d.email}","${d.amount}","${d.type}","${d.campaign}","${d.date}","${d.paymentMethod || 'Online'}","${d.panNumber || 'N/A'}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Agape_Hope_Federation_Donors_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('success', 'Report Exported', 'Donor audit register downloaded in CSV format.');
  };

  const getInitials = (name) => {
    if (!name) return 'DN';
    const parts = name.split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const avatarGradients = [
    'from-emerald-600 to-teal-500',
    'from-indigo-600 to-blue-500',
    'from-purple-600 to-pink-500',
    'from-amber-600 to-yellow-500',
    'from-rose-600 to-red-500'
  ];

  return (
    <div className="space-y-6">
      {/* Top Metric Cards for Donors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white/95 rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Philanthropic Inflow</span>
            <h3 className="text-2xl font-black text-slate-900 font-mono">
              ₹{totalFilteredAmount.toLocaleString('en-IN')}
            </h3>
            <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              100% Tax Deductible (80G)
            </span>
          </div>
          <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 border border-emerald-100">
            <Coins className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white/95 rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Recurring CSR & Sustaining</span>
            <h3 className="text-2xl font-black text-slate-900 font-mono">
              {recurringCount} Patrons
            </h3>
            <span className="text-[11px] text-slate-500 font-medium">Monthly Auto-Debit Grants</span>
          </div>
          <div className="p-3 bg-purple-50 rounded-2xl text-purple-600 border border-purple-100">
            <Building className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white/95 rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">80G Certificates Issued</span>
            <h3 className="text-2xl font-black text-slate-900 font-mono">
              {donors.length} Verified
            </h3>
            <span className="text-[11px] text-slate-500 font-medium">Instant Income Tax Portal Sync</span>
          </div>
          <div className="p-3 bg-sky-50 rounded-2xl text-sky-600 border border-sky-100">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Top Action & Filter Bar */}
      <div className="bg-white/95 rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
              Donor & Contribution Registry
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono">
              {filteredDonors.length} Records
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Full audit history with automated 80G tax exemptions & PAN verification
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Frequency Filter Pills */}
          <div className="flex items-center bg-slate-100/90 p-1 rounded-xl text-xs font-bold text-slate-600 border border-slate-200/60">
            {['All', 'One-time', 'Recurring'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filterType === type ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition shadow-2xs"
            title="Download CSV Statement"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => onOpenModal('donor')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-extrabold text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 rounded-xl shadow-md shadow-emerald-700/20 ring-1 ring-emerald-400/30 transition transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Donation / Donor</span>
          </button>
        </div>
      </div>

      {/* Main Donors Table */}
      <div className="bg-white/95 rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-400 uppercase tracking-wider text-[10px] font-bold border-b border-slate-200/80">
              <tr>
                <th className="py-3.5 px-5">Donor Details</th>
                <th className="py-3.5 px-4">Donation (₹)</th>
                <th className="py-3.5 px-4">Frequency</th>
                <th className="py-3.5 px-4">Targeted Campaign</th>
                <th className="py-3.5 px-4">Date & Gateway</th>
                <th className="py-3.5 px-4 text-center">80G Certificate</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredDonors.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-14 text-center text-slate-400">
                    <Coins className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                    <p className="font-bold text-sm text-slate-700">No donor records match criteria</p>
                    <p className="text-xs text-slate-400 mt-1">Try resetting filters or click "+ Add Donation / Donor".</p>
                  </td>
                </tr>
              ) : (
                filteredDonors.map((donor, idx) => (
                  <tr key={donor.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${
                            avatarGradients[idx % avatarGradients.length]
                          } flex items-center justify-center text-white text-xs font-black shadow-xs shrink-0`}
                        >
                          {getInitials(donor.name)}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition truncate">
                            {donor.name}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5 text-slate-400 text-[11px]">
                            <span className="font-mono text-emerald-700 font-semibold">{donor.id}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1 text-slate-500 truncate">
                              <Mail className="w-3 h-3 text-slate-400" />
                              {donor.email}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-black text-slate-900 text-sm font-mono tabular-nums">
                        ₹{Number(donor.amount).toLocaleString('en-IN')}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <StatusBadge status={donor.type} />
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-800 line-clamp-1 max-w-[200px]" title={donor.campaign}>
                        {donor.campaign}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1 text-slate-600 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-mono text-[11px]">{donor.date}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        {donor.paymentMethod || 'Online NEFT'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      {donor.taxExemption80G !== false ? (
                        <button
                          onClick={() => addToast('success', '80G Certificate Ready', `Downloaded 80G Tax Receipt for ${donor.name} (PAN: ${donor.panNumber || 'ABCDE1234F'})`)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition shadow-2xs"
                          title="Click to download 80G tax receipt"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Generated</span>
                        </button>
                      ) : (
                        <span className="text-slate-400 text-[11px]">N/A</span>
                      )}
                    </td>

                    <td className="py-3.5 px-5 text-right">
                      <button
                        onClick={() => deleteDonor(donor.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                        title="Delete Donor Record"
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
