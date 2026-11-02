import React, { useState } from 'react';
import {
  Briefcase,
  Megaphone,
  Boxes,
  ShieldCheck,
  Globe,
  KeyRound,
  CheckCircle2,
  Clock,
  Plus,
  ExternalLink,
  Download,
  AlertTriangle,
  Lock,
  Eye,
  Check,
  FileText,
  Building,
  Calendar,
  Sparkles
} from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export const PlaceholderTab = ({ tabId }) => {
  const { staff, campaigns, inventory, compliance, addToast } = useDashboard();

  // 1. HR & Staff View
  if (tabId === 'hr') {
    return (
      <div className="space-y-6">
        <div className="bg-white/95 rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
                Executive HR, Core Personnel & Field Officers
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-800 border border-indigo-200 font-mono">
                {staff.length} Permanent Staff
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Payroll allocations, executive contracts, and regional field deployment rosters
            </p>
          </div>
          <button
            onClick={() => addToast('info', 'HR Portal Active', 'Initiated new personnel onboarding requisition')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-extrabold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 rounded-xl shadow-md shadow-indigo-700/20 ring-1 ring-indigo-400/30 transition transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Staff Member</span>
          </button>
        </div>

        <div className="bg-white/95 rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 text-slate-400 uppercase tracking-wider text-[10px] font-bold border-b border-slate-200/80">
                <tr>
                  <th className="py-3.5 px-5">Staff Member & ID</th>
                  <th className="py-3.5 px-4">Executive Designation</th>
                  <th className="py-3.5 px-4">Department</th>
                  <th className="py-3.5 px-4">Monthly Compensation</th>
                  <th className="py-3.5 px-4">Tenure Horizon</th>
                  <th className="py-3.5 px-5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {staff.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="font-bold text-slate-900 text-sm">{m.name}</div>
                      <span className="font-mono text-indigo-700 text-[11px] font-semibold">{m.id}</span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{m.role}</td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">{m.department}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{m.salary}</td>
                    <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">Since {m.joinDate}</td>
                    <td className="py-3.5 px-5 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // 2. Campaigns View
  if (tabId === 'campaigns') {
    return (
      <div className="space-y-6">
        <div className="bg-white/95 rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
                Crowdfunding Campaigns & Matched CSR Drives
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-50 text-purple-800 border border-purple-200 font-mono">
                {campaigns.length} Initiatives
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Public crowd appeal portals with institutional corporate matching grants
            </p>
          </div>
          <button
            onClick={() => addToast('info', 'New Campaign', 'Opened corporate grant matching wizard')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-extrabold text-white bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 rounded-xl shadow-md shadow-purple-700/20 ring-1 ring-purple-400/30 transition transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            <span>Launch Campaign</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {campaigns.map((cmp) => {
            const percent = Math.min(100, Math.round((cmp.raised / cmp.goal) * 100));
            return (
              <div key={cmp.id} className="bg-white/95 rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                      {cmp.id}
                    </span>
                    <h3 className="font-extrabold text-base text-slate-900">{cmp.title}</h3>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      cmp.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}
                  >
                    {cmp.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold font-mono">
                    <span className="text-emerald-700">Raised: ₹{cmp.raised.toLocaleString('en-IN')}</span>
                    <span className="text-slate-400">Target: ₹{cmp.goal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700" style={{ width: `${percent}%` }} />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span className="font-semibold">{cmp.donorsCount} Corporate & Micro Contributors</span>
                  <span className="font-mono text-[11px] text-slate-400">Ends {cmp.endDate}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 3. Inventory & Assets View
  if (tabId === 'inventory') {
    return (
      <div className="space-y-6">
        <div className="bg-white/95 rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
                Relief Fleet, Field Hardware & Capital Assets
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200 font-mono">
                4 Hub Locations
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Capital equipment valuation, medical van fleet tracking, and nutrition stock hubs
            </p>
          </div>
          <button
            onClick={() => addToast('info', 'Procurement Log', 'Asset inward voucher created')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-extrabold text-white bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 rounded-xl shadow-md shadow-teal-700/20 ring-1 ring-teal-400/30 transition transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            <span>Stock Inward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {inventory.map((item) => (
            <div key={item.id} className="bg-white/95 rounded-2xl p-5 border border-slate-200 shadow-xs flex items-start justify-between hover:shadow-xl transition-all duration-300">
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  {item.id}
                </span>
                <h4 className="font-extrabold text-slate-900 text-sm">{item.item}</h4>
                <div className="text-xs text-slate-500 flex items-center gap-2">
                  <span>Hub: <strong className="text-slate-800">{item.location}</strong></span>
                  <span>•</span>
                  <span>Quantity: <strong className="text-slate-800 font-mono">{item.qty} units</strong></span>
                </div>
                <div className="text-xs font-bold text-emerald-700 pt-1 font-mono">
                  Asset Value: {item.value}
                </div>
              </div>

              <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                {item.condition}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 4. Compliance & Audits View
  if (tabId === 'compliance') {
    return (
      <div className="space-y-6">
        <div className="bg-white/95 rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
                Statutory, Legal & Tax Compliance Vault
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono">
                100% Audit Cleared
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Section 80G, Section 12A, FCRA Foreign Contributions, and Ministry of Corporate Affairs filings
            </p>
          </div>
          <button
            onClick={() => addToast('success', 'Certificates Exported', 'Statutory compliance audit package downloaded in ZIP bundle')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-extrabold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition shadow-2xs border border-slate-200"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Download All Certificates</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {compliance.map((c, i) => (
            <div key={i} className="bg-white/95 rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    {c.cert}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium">{c.authority}</p>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
                  {c.status}
                </span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Certificate Identifier:</span>
                  <span className="font-mono font-bold text-slate-800">{c.certNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Validity Horizon:</span>
                  <span className="font-mono font-bold text-emerald-700">{c.validUntil}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 5. Website CMS View
  if (tabId === 'cms') {
    return (
      <div className="space-y-6">
        <div className="bg-white/95 rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
                Public Website CMS & Transparency Disclosure
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-800 border border-indigo-200 font-mono">
                Live Public Gateway
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Control public portal impact stories, donor walls, and audited transparency releases
            </p>
          </div>
          <button
            onClick={() => addToast('success', 'CMS Published', 'Public story published to Agape Hope Federation web portal')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-extrabold text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 rounded-xl shadow-md shadow-emerald-700/20 ring-1 ring-emerald-400/30 transition transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            <span>Publish New Story</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white/95 rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3 hover:shadow-xl transition-all duration-300">
            <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-emerald-100 text-emerald-800 uppercase font-mono">
              Featured Hero Story
            </span>
            <h4 className="font-extrabold text-slate-900 text-sm">
              "How 500 Tribal Girls In Rajasthan Are Accessing STEM Labs"
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              Field report detailing digital classroom deployments and solar-powered learning centers.
            </p>
            <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-100 flex justify-between font-mono">
              <span>Oct 2026</span>
              <span className="text-emerald-700 font-bold">1,840 Reads</span>
            </div>
          </div>

          <div className="bg-white/95 rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3 hover:shadow-xl transition-all duration-300">
            <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-sky-100 text-sky-800 uppercase font-mono">
              Case Study
            </span>
            <h4 className="font-extrabold text-slate-900 text-sm">
              "Zero-Hunger Hubs: Rescuing 2,500 kg Surplus Food Weekly"
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              How banquet collaborations prevented food wastage and nourished 3,100 slum children.
            </p>
            <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-100 flex justify-between font-mono">
              <span>Oct 2026</span>
              <span className="text-emerald-700 font-bold">2,310 Reads</span>
            </div>
          </div>

          <div className="bg-white/95 rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3 hover:shadow-xl transition-all duration-300">
            <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-amber-100 text-amber-800 uppercase font-mono">
              Annual Report
            </span>
            <h4 className="font-extrabold text-slate-900 text-sm">
              "FY 2025-26 Audited Impact & Statutory Financial Statement"
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              Comprehensive transparency disclosure with Deloitte third-party audit clearance.
            </p>
            <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-100 flex justify-between font-mono">
              <span>PDF Ready</span>
              <span
                onClick={() => addToast('info', 'Annual Report', 'Downloaded FY 2025-26 Statutory Transparency PDF')}
                className="text-indigo-600 font-bold cursor-pointer hover:underline"
              >
                Download PDF
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 6. User Roles & RBAC View
  if (tabId === 'roles') {
    const rolesList = [
      {
        role: 'Super Administrator',
        holder: 'Dr. Aniket Roy (Executive Director)',
        access: 'Full Ledger Write, Statutory Voucher Approvals, Bank Wire Settlements & Board Audits',
        badge: 'Root Access'
      },
      {
        role: 'Chief Financial Controller',
        holder: 'Sunil Grover (Finance Head)',
        access: 'Record Expense Vouchers, Auto-Generate 80G Receipts, Bank Reconciliations & Ledger Exports',
        badge: 'Finance Gate'
      },
      {
        role: 'Director of Programs',
        holder: 'Dr. Rohini Deshmukh',
        access: 'Launch Missions, Direct Aid Recipient Authorizations, Volunteer Squad Matching & Field Audits',
        badge: 'Program Lead'
      },
      {
        role: 'Field Logistics Officer',
        holder: 'Arjun Verma',
        access: 'Grassroots Beneficiary Applications, Fuel Log Requisitions, Relief Kit Stock Inward',
        badge: 'Field Ops'
      }
    ];

    return (
      <div className="space-y-6">
        <div className="bg-white/95 rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
                Role-Based Access Control (RBAC) & Security Policy
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-900 text-white font-mono">
                4 Tier Security
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Least-privilege security policy protecting donor confidentiality & financial disburse rights
            </p>
          </div>
          <button
            onClick={() => addToast('info', 'Security Policy', 'Access matrix audited and compliant with ISO 27001')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-extrabold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition shadow-2xs border border-slate-200"
          >
            <Lock className="w-4 h-4 text-slate-500" />
            <span>Audit Permissions</span>
          </button>
        </div>

        <div className="space-y-3.5">
          {rolesList.map((r, i) => (
            <div key={i} className="bg-white/95 rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-xl transition-all duration-300">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-slate-900 text-sm">{r.role}</h4>
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-slate-100 text-slate-700 font-mono">
                    {r.badge}
                  </span>
                </div>
                <p className="text-xs font-semibold text-emerald-700">{r.holder}</p>
                <p className="text-xs text-slate-500">{r.access}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-xl border border-emerald-200 flex items-center gap-1.5 shadow-2xs">
                  <Check className="w-3.5 h-3.5" />
                  Cryptographically Authorized
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/95 rounded-2xl p-12 text-center border border-slate-200">
      <h3 className="text-base font-bold text-slate-800">Operational Module Active</h3>
      <p className="text-xs text-slate-500 mt-1">This module is currently loaded.</p>
    </div>
  );
};
