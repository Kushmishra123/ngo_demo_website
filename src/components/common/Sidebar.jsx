import React from 'react';
import {
  LayoutDashboard,
  Heart,
  Users,
  FolderKanban,
  HeartHandshake,
  Receipt,
  Briefcase,
  Megaphone,
  Boxes,
  ShieldCheck,
  Globe,
  KeyRound,
  Sparkles,
  ChevronRight,
  X,
  ExternalLink,
  Crown
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

export const Sidebar = () => {
  const {
    activeTab,
    setActiveTab,
    sidebarOpen,
    setSidebarOpen,
    donors,
    beneficiaries,
    projects,
    volunteers,
    transactions
  } = useDashboard();

  const pendingBeneficiariesCount = beneficiaries.filter((b) => b.status === 'Pending').length;
  const activeProjectsCount = projects.filter((p) => p.status === 'Active').length;

  const primaryNavItems = [
    {
      id: 'overview',
      label: 'Executive Overview',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'donors',
      label: 'Donors & Grants',
      icon: Heart,
      badge: donors.length,
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
    },
    {
      id: 'beneficiaries',
      label: 'Beneficiary Registry',
      icon: Users,
      badge: pendingBeneficiariesCount ? `${pendingBeneficiariesCount} new` : beneficiaries.length,
      badgeColor: pendingBeneficiariesCount ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-slate-800 text-slate-300'
    },
    {
      id: 'projects',
      label: 'Missions & Projects',
      icon: FolderKanban,
      badge: `${activeProjectsCount} live`,
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
    },
    {
      id: 'volunteers',
      label: 'Volunteer Force',
      icon: HeartHandshake,
      badge: volunteers.length,
      badgeColor: 'bg-slate-800 text-slate-300'
    },
    {
      id: 'finance',
      label: 'Finance & Vouchers',
      icon: Receipt,
      badge: transactions.length,
      badgeColor: 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
    }
  ];

  const erpNavItems = [
    {
      id: 'hr',
      label: 'HR & Personnel',
      icon: Briefcase,
      badge: '4 Staff'
    },
    {
      id: 'campaigns',
      label: 'Crowdfunding & CSR',
      icon: Megaphone,
      badge: '3 Active'
    },
    {
      id: 'inventory',
      label: 'Relief Logistics Hub',
      icon: Boxes,
      badge: '4 Hubs'
    },
    {
      id: 'compliance',
      label: 'Compliance Vault',
      icon: ShieldCheck,
      badge: '100% Cleared'
    },
    {
      id: 'cms',
      label: 'Public Website CMS',
      icon: Globe,
      badge: 'Live'
    },
    {
      id: 'roles',
      label: 'RBAC Access Control',
      icon: KeyRound,
      badge: null
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-30 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-72 bg-[#090D16] text-slate-300 flex flex-col border-r border-slate-800/80 transition-all duration-300 ease-in-out shrink-0 select-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'
        }`}
      >
        {/* Brand Header */}
        <div className="h-18 flex items-center justify-between px-5 border-b border-slate-800/80 bg-[#060910]">
          <div className="flex items-center gap-3.5 overflow-hidden">
            {/* Custom Radiant Organization Crest */}
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-700 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25 shrink-0 ring-1 ring-emerald-400/30">
              <Sparkles className="w-5 h-5 text-emerald-100" />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-amber-400 rounded-full border-2 border-slate-900 flex items-center justify-center">
                <Crown className="w-1.5 h-1.5 text-slate-950" />
              </div>
            </div>

            {sidebarOpen && (
              <div className="leading-tight truncate">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-[13px] text-white tracking-wider uppercase font-mono">
                    AGAPE HOPE
                  </span>
                  <span className="text-[9px] uppercase font-black px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 tracking-wider">
                    FEDERATION
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium tracking-tight mt-0.5">
                  Operations & ERP Console
                </p>
              </div>
            )}
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6">
          {/* Main Operational Modules */}
          <div>
            {sidebarOpen && (
              <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Core Operations
              </p>
            )}
            <nav className="space-y-1">
              {primaryNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      if (window.innerWidth < 1024) setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group relative ${
                      isActive
                        ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-700/30 ring-1 ring-emerald-400/30'
                        : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                    }`}
                    title={item.label}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                          isActive ? 'text-white' : 'text-slate-400 group-hover:text-emerald-400'
                        }`}
                      />
                      {sidebarOpen && <span className="tracking-tight">{item.label}</span>}
                    </div>

                    {sidebarOpen && item.badge && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono tabular-nums ${
                          isActive
                            ? 'bg-emerald-800/80 text-emerald-100 border border-emerald-400/20'
                            : item.badgeColor || 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}

                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-emerald-400 rounded-r-full"></span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* ERP & Governance */}
          <div>
            {sidebarOpen && (
              <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                ERP & Governance
              </p>
            )}
            <nav className="space-y-1">
              {erpNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      if (window.innerWidth < 1024) setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group relative ${
                      isActive
                        ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-700/30 ring-1 ring-emerald-400/30'
                        : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                    }`}
                    title={item.label}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                          isActive ? 'text-white' : 'text-slate-400 group-hover:text-emerald-400'
                        }`}
                      />
                      {sidebarOpen && <span className="tracking-tight">{item.label}</span>}
                    </div>

                    {sidebarOpen && item.badge && (
                      <span
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full font-mono ${
                          isActive
                            ? 'bg-emerald-800/80 text-emerald-100'
                            : 'bg-slate-800/80 text-slate-400'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}

                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-emerald-400 rounded-r-full"></span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Footer / System Status */}
        {sidebarOpen ? (
          <div className="p-3.5 border-t border-slate-800/80 bg-[#060910]">
            <div className="p-3 bg-gradient-to-br from-slate-900 to-slate-950 rounded-xl border border-slate-800/80 shadow-inner">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Statutory Grade: AAA
                </span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                FCRA, 80G & 12A Compliant • LocalStorage Active
              </p>
            </div>
          </div>
        ) : null}
      </aside>
    </>
  );
};
