import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_DATA } from '../data/initialData';

const DashboardContext = createContext();

const STORAGE_KEYS = {
  DONORS: 'ngo_erp_donors_v1',
  BENEFICIARIES: 'ngo_erp_beneficiaries_v1',
  PROJECTS: 'ngo_erp_projects_v1',
  VOLUNTEERS: 'ngo_erp_volunteers_v1',
  TRANSACTIONS: 'ngo_erp_transactions_v1',
  STAFF: 'ngo_erp_staff_v1',
  CAMPAIGNS: 'ngo_erp_campaigns_v1',
  INVENTORY: 'ngo_erp_inventory_v1',
  COMPLIANCE: 'ngo_erp_compliance_v1',
  ACTIVITIES: 'ngo_erp_activities_v1'
};

const INITIAL_ACTIVITIES = [
  { id: 'act-1', text: '₹7,50,000 CSR Grant approved by TATA Trust CSR Fund', time: '10 mins ago', type: 'donation', icon: 'Coins' },
  { id: 'act-2', text: 'Pooja Kumari & Family enrolled into Project Shiksha', time: '45 mins ago', type: 'beneficiary', icon: 'UserCheck' },
  { id: 'act-3', text: 'Mobile Clinic Diesel Voucher #VCR-2610-118 recorded (₹48,500)', time: '2 hours ago', type: 'expense', icon: 'Receipt' },
  { id: 'act-4', text: 'New volunteer Priya Sundaram assigned to Project Shiksha', time: '3 hours ago', type: 'volunteer', icon: 'HeartHandshake' },
  { id: 'act-5', text: 'Section 80G renewal audit passed with Grade A compliance', time: 'Yesterday', type: 'compliance', icon: 'ShieldCheck' }
];

export const DashboardProvider = ({ children }) => {
  // Navigation Tab State
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Helper to load from localStorage with fallback
  const loadState = (key, fallback) => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(`Error loading state for key ${key}:`, e);
    }
    return fallback;
  };

  // State definitions with localStorage initialization
  const [donors, setDonors] = useState(() => loadState(STORAGE_KEYS.DONORS, INITIAL_DATA.donors));
  const [beneficiaries, setBeneficiaries] = useState(() => loadState(STORAGE_KEYS.BENEFICIARIES, INITIAL_DATA.beneficiaries));
  const [projects, setProjects] = useState(() => loadState(STORAGE_KEYS.PROJECTS, INITIAL_DATA.projects));
  const [volunteers, setVolunteers] = useState(() => loadState(STORAGE_KEYS.VOLUNTEERS, INITIAL_DATA.volunteers));
  const [transactions, setTransactions] = useState(() => loadState(STORAGE_KEYS.TRANSACTIONS, INITIAL_DATA.transactions));
  const [staff, setStaff] = useState(() => loadState(STORAGE_KEYS.STAFF, INITIAL_DATA.staff));
  const [campaigns, setCampaigns] = useState(() => loadState(STORAGE_KEYS.CAMPAIGNS, INITIAL_DATA.campaigns));
  const [inventory, setInventory] = useState(() => loadState(STORAGE_KEYS.INVENTORY, INITIAL_DATA.inventory));
  const [compliance, setCompliance] = useState(() => loadState(STORAGE_KEYS.COMPLIANCE, INITIAL_DATA.compliance));
  const [activities, setActivities] = useState(() => loadState(STORAGE_KEYS.ACTIVITIES, INITIAL_ACTIVITIES));

  // Toast Notification state
  const [toasts, setToasts] = useState([]);

  const addToast = (type, title, message) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    const newToast = { id, type, title, message };
    setToasts((prev) => [newToast, ...prev.slice(0, 4)]); // Keep at most 5

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const logActivity = (text, type = 'general', icon = 'Activity') => {
    const newAct = {
      id: 'act-' + Date.now(),
      text,
      time: 'Just now',
      type,
      icon
    };
    setActivities((prev) => [newAct, ...prev.slice(0, 19)]);
  };

  // Sync state changes into localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DONORS, JSON.stringify(donors));
  }, [donors]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BENEFICIARIES, JSON.stringify(beneficiaries));
  }, [beneficiaries]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VOLUNTEERS, JSON.stringify(volunteers));
  }, [volunteers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
  }, [activities]);

  // Actions for Donors
  const addDonor = (donorData) => {
    const id = `DON-${1000 + donors.length + 1}`;
    const newDonor = {
      id,
      ...donorData,
      amount: Number(donorData.amount) || 0,
      date: donorData.date || new Date().toISOString().split('T')[0],
      taxExemption80G: donorData.taxExemption80G !== false
    };
    setDonors([newDonor, ...donors]);
    logActivity(`New donation of ₹${newDonor.amount.toLocaleString('en-IN')} received from ${newDonor.name}`, 'donation', 'Coins');
    addToast('success', 'Donation Added Successfully', `Recorded ₹${newDonor.amount.toLocaleString('en-IN')} from ${newDonor.name}`);
    return newDonor;
  };

  const deleteDonor = (id) => {
    const donor = donors.find((d) => d.id === id);
    setDonors(donors.filter((d) => d.id !== id));
    logActivity(`Donation record ${id} (${donor ? donor.name : ''}) was removed`, 'general', 'Trash2');
    addToast('info', 'Record Deleted', `Donor record #${id} removed from system.`);
  };

  // Actions for Beneficiaries
  const addBeneficiary = (beneficiaryData) => {
    const id = `BEN-${2000 + beneficiaries.length + 1}`;
    const newBeneficiary = {
      id,
      ...beneficiaryData,
      status: beneficiaryData.status || 'Pending',
      date: beneficiaryData.date || new Date().toISOString().split('T')[0]
    };
    setBeneficiaries([newBeneficiary, ...beneficiaries]);
    logActivity(`Beneficiary registered: ${newBeneficiary.name} for ${newBeneficiary.category} Aid`, 'beneficiary', 'UserCheck');
    addToast('success', 'Beneficiary Registered', `${newBeneficiary.name} registered under ${newBeneficiary.category}.`);
    return newBeneficiary;
  };

  const deleteBeneficiary = (id) => {
    const ben = beneficiaries.find((b) => b.id === id);
    setBeneficiaries(beneficiaries.filter((b) => b.id !== id));
    logActivity(`Beneficiary record ${id} (${ben ? ben.name : ''}) removed`, 'general', 'Trash2');
    addToast('info', 'Record Deleted', `Beneficiary #${id} has been removed.`);
  };

  const toggleBeneficiaryStatus = (id) => {
    setBeneficiaries((prev) =>
      prev.map((b) => {
        if (b.id === id) {
          const nextStatus = b.status === 'Verified' ? 'Pending' : 'Verified';
          addToast('success', 'Verification Updated', `${b.name} is now marked as ${nextStatus}`);
          logActivity(`Beneficiary status updated: ${b.name} -> ${nextStatus}`, 'beneficiary', 'ShieldCheck');
          return { ...b, status: nextStatus };
        }
        return b;
      })
    );
  };

  // Actions for Projects
  const addProject = (projectData) => {
    const id = `PRJ-${3000 + projects.length + 1}`;
    const newProject = {
      id,
      ...projectData,
      targetBudget: Number(projectData.targetBudget) || 0,
      fundsUsed: Number(projectData.fundsUsed) || 0,
      beneficiariesCount: Number(projectData.beneficiariesCount) || 0,
      status: projectData.status || 'Active',
      startDate: projectData.startDate || new Date().toISOString().split('T')[0]
    };
    setProjects([newProject, ...projects]);
    logActivity(`New program launched: "${newProject.name}" (Budget: ₹${newProject.targetBudget.toLocaleString('en-IN')})`, 'project', 'FolderKanban');
    addToast('success', 'Project Created', `Project "${newProject.name}" is now active in program registry.`);
    return newProject;
  };

  const deleteProject = (id) => {
    const prj = projects.find((p) => p.id === id);
    setProjects(projects.filter((p) => p.id !== id));
    logActivity(`Project "${prj ? prj.name : id}" was removed`, 'general', 'Trash2');
    addToast('info', 'Record Deleted', `Project #${id} removed.`);
  };

  // Actions for Volunteers
  const addVolunteer = (volunteerData) => {
    const id = `VOL-${4000 + volunteers.length + 1}`;
    const newVolunteer = {
      id,
      ...volunteerData,
      hoursLogged: Number(volunteerData.hoursLogged) || 0,
      status: volunteerData.status || 'Active',
      joinedDate: volunteerData.joinedDate || new Date().toISOString().split('T')[0]
    };
    setVolunteers([newVolunteer, ...volunteers]);
    logActivity(`Volunteer onboarded: ${newVolunteer.name} (${newVolunteer.skills})`, 'volunteer', 'HeartHandshake');
    addToast('success', 'Volunteer Onboarded', `${newVolunteer.name} has joined the volunteer network.`);
    return newVolunteer;
  };

  const deleteVolunteer = (id) => {
    const vol = volunteers.find((v) => v.id === id);
    setVolunteers(volunteers.filter((v) => v.id !== id));
    logActivity(`Volunteer ${vol ? vol.name : id} offboarded`, 'general', 'Trash2');
    addToast('info', 'Record Deleted', `Volunteer record #${id} removed.`);
  };

  // Actions for Finance / Transactions
  const addTransaction = (txnData) => {
    const id = `TXN-${5000 + transactions.length + 1}`;
    const voucherNo = `VCR-${new Date().getFullYear().toString().slice(-2)}${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${100 + transactions.length + 1}`;
    const newTxn = {
      id,
      voucherNo,
      ...txnData,
      amount: Number(txnData.amount) || 0,
      date: txnData.date || new Date().toISOString().split('T')[0],
      approvalStatus: txnData.approvalStatus || 'Approved',
      billAttachment: txnData.billAttachment || 'Bill_Receipt_Verified.pdf',
      recordedBy: txnData.recordedBy || 'Finance Operations'
    };
    setTransactions([newTxn, ...transactions]);
    const isExpense = newTxn.type === 'Expense';
    logActivity(`${isExpense ? 'Expense voucher recorded' : 'Income received'}: ₹${newTxn.amount.toLocaleString('en-IN')} for ${newTxn.title}`, isExpense ? 'expense' : 'donation', isExpense ? 'Receipt' : 'Coins');
    addToast('success', `${isExpense ? 'Expense Voucher' : 'Transaction'} Recorded`, `₹${newTxn.amount.toLocaleString('en-IN')} - ${newTxn.title}`);
    return newTxn;
  };

  const deleteTransaction = (id) => {
    const txn = transactions.find((t) => t.id === id);
    setTransactions(transactions.filter((t) => t.id !== id));
    logActivity(`Voucher ${txn ? txn.voucherNo : id} removed from ledger`, 'general', 'Trash2');
    addToast('info', 'Record Deleted', `Transaction voucher #${id} removed.`);
  };

  // Reset to default mock records for client presentation
  const resetToDefaults = () => {
    setDonors(INITIAL_DATA.donors);
    setBeneficiaries(INITIAL_DATA.beneficiaries);
    setProjects(INITIAL_DATA.projects);
    setVolunteers(INITIAL_DATA.volunteers);
    setTransactions(INITIAL_DATA.transactions);
    setStaff(INITIAL_DATA.staff);
    setCampaigns(INITIAL_DATA.campaigns);
    setInventory(INITIAL_DATA.inventory);
    setCompliance(INITIAL_DATA.compliance);
    setActivities(INITIAL_ACTIVITIES);

    localStorage.removeItem(STORAGE_KEYS.DONORS);
    localStorage.removeItem(STORAGE_KEYS.BENEFICIARIES);
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.VOLUNTEERS);
    localStorage.removeItem(STORAGE_KEYS.TRANSACTIONS);
    localStorage.removeItem(STORAGE_KEYS.ACTIVITIES);

    addToast('info', 'Demo Reset Completed', 'All module mock records restored to initial demo presentation state.');
  };

  // Dynamic calculated aggregates
  const totalDonations = donors.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
  const totalExpenses = transactions
    .filter((t) => t.type === 'Expense')
    .reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
  const totalIncomeTransactions = transactions
    .filter((t) => t.type === 'Income')
    .reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
  const totalFundsPool = totalDonations + totalIncomeTransactions;
  const netSurplus = totalFundsPool - totalExpenses;

  const activeProjectsCount = projects.filter((p) => p.status === 'Active').length;
  const totalBeneficiariesReached = projects.reduce((acc, curr) => acc + (Number(curr.beneficiariesCount) || 0), 0) + beneficiaries.length;
  const totalVolunteersCount = volunteers.length;
  const activeVolunteersCount = volunteers.filter((v) => v.status === 'Active').length;

  return (
    <DashboardContext.Provider
      value={{
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        sidebarOpen,
        setSidebarOpen,
        // Data & Setters
        donors,
        beneficiaries,
        projects,
        volunteers,
        transactions,
        staff,
        campaigns,
        inventory,
        compliance,
        activities,
        // Actions
        addDonor,
        deleteDonor,
        addBeneficiary,
        deleteBeneficiary,
        toggleBeneficiaryStatus,
        addProject,
        deleteProject,
        addVolunteer,
        deleteVolunteer,
        addTransaction,
        deleteTransaction,
        resetToDefaults,
        // Toast
        toasts,
        addToast,
        removeToast,
        // Metrics
        metrics: {
          totalDonations,
          totalExpenses,
          totalFundsPool,
          netSurplus,
          activeProjectsCount,
          totalProjectsCount: projects.length,
          totalBeneficiariesReached,
          beneficiariesCount: beneficiaries.length,
          totalVolunteersCount,
          activeVolunteersCount
        }
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

