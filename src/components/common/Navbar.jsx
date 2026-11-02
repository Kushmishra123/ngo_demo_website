import React, { useState } from 'react';
import {
  Menu,
  Search,
  RotateCcw,
  Plus,
  Bell,
  HeartHandshake,
  Coins,
  UserCheck,
  FolderPlus,
  Receipt,
  ExternalLink,
  ChevronDown,
  Calendar,
  Sparkles,
  Command,
  CheckCircle2,
  Building
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

export const Navbar = ({ onOpenModal }) => {
  const {
    sidebarOpen,
    setSidebarOpen,
    searchQuery,
    setSearchQuery,
    resetToDefaults,
    activities,
    activeTab
  } = useDashboard();

  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const getPageInfo = (tab) => {
    const titles = {
      overview: { title: 'Executive Command Center', desc: 'Real-time fiscal oversight, grassroots impact metrics & mission progress' },
      donors: { title: 'Donor & Grant Management', desc: '80G Tax Exemption receipts, recurring contributions & institutional CSR grants' },
      beneficiaries: { title: 'Direct Aid Recipient Registry', desc: 'Biometric verification, family aid dossiers & grassroots field monitoring' },
      projects: { title: 'Field Missions & Programs', desc: 'Multi-state capital deployments, progress milestones & fund utilization' },
      volunteers: { title: 'Volunteer Force Deployment', desc: 'Fellowship mobilization, skill matching & community field service hours' },
      finance: { title: 'Financial Ledger & Audited Vouchers', desc: 'Double-entry voucher system, digital bill archives & statutory compliance' },
      hr: { title: 'HR & Personnel Management', desc: 'Core staffing roster, compensation structure & field coordinator assignments' },
      campaigns: { title: 'Crowdfunding & CSR Drives', desc: 'Special disaster relief campaigns, corporate matching & progress tracking' },
      inventory: { title: 'Relief Inventory & Capital Assets', desc: 'Solar medical fleet, dry nutrition stocks & educational equipment logistics' },
      compliance: { title: 'Statutory Compliance Vault', desc: 'Permanent 12A, 80G renewals, FCRA filings & Darpan portal registrations' },
      cms: { title: 'Public Web Gateway CMS', desc: 'Public transparency disclosure, impact stories & audited annual reports' },
      roles: { title: 'Role-Based Access Control (RBAC)', desc: 'Enterprise security policy, cryptographic audit trails & permission gates' }
    };
    return titles[tab] || { title: 'Operations Console', desc: 'Agape Hope Federation Master Enterprise Management' };
  };

  const pageInfo = getPageInfo(activeTab);

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 px-4 sm:px-6 py-3 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left Side: Sidebar Toggle & Page Info */}
        <div className="flex items-center gap-3.5">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
            aria-label="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                {pageInfo.title}
              </h1>
              <span className="hidden xl:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
                FY 2026-27
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden md:block">
              {pageInfo.desc}
            </p>
          </div>
        </div>

        {/* Right Side: Command Search, Reset Demo, Quick Action, Activity Bell, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Executive Search Box */}
          <div className="relative hidden lg:block w-64 xl:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search ledger, donors, projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-14 py-1.5 text-xs bg-slate-100/80 border border-slate-200/60 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all placeholder:text-slate-400 font-medium"
            />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white border border-slate-200 rounded">
              ⌘K
            </span>
          </div>

          {/* Reset Demo Button */}
          <button
            onClick={resetToDefaults}
            title="Reset dataset back to pristine initial state for demonstration"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-600 bg-slate-100/90 hover:bg-slate-200/90 border border-slate-200 rounded-xl transition-all shadow-2xs group"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform duration-500" />
            <span className="hidden xl:inline">Reset Demo</span>
          </button>

          {/* Quick "+ New Action" Menu */}
          <div className="relative">
            <button
              onClick={() => setShowQuickActions(!showQuickActions)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 rounded-xl shadow-md shadow-emerald-700/20 ring-1 ring-emerald-400/30 transition-all transform hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" />
              <span>Record Action</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-80" />
            </button>

            {showQuickActions && (
              <div
                className="absolute right-0 mt-2 w-60 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/80 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                onClick={() => setShowQuickActions(false)}
              >
                <div className="px-3.5 py-1.5 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Direct Ledger Operations
                </div>
                <button
                  onClick={() => onOpenModal('donor')}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition"
                >
                  <div className="p-1 rounded-lg bg-emerald-100 text-emerald-700">
                    <Coins className="w-3.5 h-3.5" />
                  </div>
                  Record Donation / Grant
                </button>
                <button
                  onClick={() => onOpenModal('beneficiary')}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition"
                >
                  <div className="p-1 rounded-lg bg-sky-100 text-sky-700">
                    <UserCheck className="w-3.5 h-3.5" />
                  </div>
                  Register Aid Recipient
                </button>
                <button
                  onClick={() => onOpenModal('project')}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition"
                >
                  <div className="p-1 rounded-lg bg-indigo-100 text-indigo-700">
                    <FolderPlus className="w-3.5 h-3.5" />
                  </div>
                  Launch New Mission
                </button>
                <button
                  onClick={() => onOpenModal('volunteer')}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition"
                >
                  <div className="p-1 rounded-lg bg-purple-100 text-purple-700">
                    <HeartHandshake className="w-3.5 h-3.5" />
                  </div>
                  Onboard Field Volunteer
                </button>
                <button
                  onClick={() => onOpenModal('expense')}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-rose-50 hover:text-rose-800 transition border-t border-slate-100"
                >
                  <div className="p-1 rounded-lg bg-rose-100 text-rose-700">
                    <Receipt className="w-3.5 h-3.5" />
                  </div>
                  Authorize Expense Voucher
                </button>
              </div>
            )}
          </div>

          {/* Activity Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition"
              aria-label="Activity Feed"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white"></span>
            </button>

            {showNotifications && (
              <div
                className="absolute right-0 mt-2 w-80 sm:w-96 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/90 p-4 z-50"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-slate-900">Live Audit Stream</span>
                    <span className="px-2 py-0.5 text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-bold">
                      {activities.length} Events
                    </span>
                  </div>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-xs text-slate-400 hover:text-slate-600 font-medium"
                  >
                    Dismiss
                  </button>
                </div>

                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto mt-2 pr-1">
                  {activities.slice(0, 6).map((act) => (
                    <div key={act.id} className="py-2.5 flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0 shadow-xs shadow-emerald-500/50" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-800 font-medium leading-snug">{act.text}</p>
                        <span className="text-[10px] text-slate-400 mt-0.5 block font-mono">{act.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Executive Profile Avatar */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
            <div className="relative">
              <div className="w-8.5 h-8.5 rounded-full bg-gradient-to-tr from-slate-900 to-slate-800 flex items-center justify-center text-emerald-400 text-xs font-black ring-2 ring-emerald-500/30 shadow-xs">
                AH
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white"></span>
            </div>
            <div className="hidden sm:block leading-tight text-left">
              <div className="text-xs font-bold text-slate-900">Dr. Aniket Roy</div>
              <div className="text-[10px] font-semibold text-emerald-700">Executive Director</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
