import React, { useState } from 'react';
import { DashboardProvider, useDashboard } from './context/DashboardContext';
import { Sidebar } from './components/common/Sidebar';
import { Navbar } from './components/common/Navbar';
import { ToastContainer } from './components/common/Toast';
import { ActionModals } from './components/modals/ActionModals';

// View Pages
import { OverviewTab } from './pages/OverviewTab';
import { DonorsTab } from './pages/DonorsTab';
import { BeneficiariesTab } from './pages/BeneficiariesTab';
import { ProjectsTab } from './pages/ProjectsTab';
import { VolunteersTab } from './pages/VolunteersTab';
import { FinanceTab } from './pages/FinanceTab';
import { PlaceholderTab } from './pages/PlaceholderTab';

const DashboardContent = () => {
  const { activeTab } = useDashboard();
  const [modalType, setModalType] = useState(null); // 'donor' | 'beneficiary' | 'project' | 'volunteer' | 'expense'

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800 antialiased">
      {/* Navigation Sidebar */}
      <Sidebar />

      {/* Main Operations Pane */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <Navbar onOpenModal={(type) => setModalType(type)} />

        {/* Dynamic Operational Content View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
          {activeTab === 'overview' && <OverviewTab onOpenModal={setModalType} />}
          {activeTab === 'donors' && <DonorsTab onOpenModal={setModalType} />}
          {activeTab === 'beneficiaries' && <BeneficiariesTab onOpenModal={setModalType} />}
          {activeTab === 'projects' && <ProjectsTab onOpenModal={setModalType} />}
          {activeTab === 'volunteers' && <VolunteersTab onOpenModal={setModalType} />}
          {activeTab === 'finance' && <FinanceTab onOpenModal={setModalType} />}

          {/* ERP & Governance Views */}
          {['hr', 'campaigns', 'inventory', 'compliance', 'cms', 'roles'].includes(activeTab) && (
            <PlaceholderTab tabId={activeTab} />
          )}
        </main>
      </div>

      {/* Global Interactive Modals */}
      <ActionModals modalType={modalType} onClose={() => setModalType(null)} />

      {/* Sweet Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
}

export default App;

