import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useDashboard } from '../../context/DashboardContext';
import {
  Coins,
  UserCheck,
  FolderPlus,
  HeartHandshake,
  Receipt,
  UploadCloud,
  FileCheck2,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

export const ActionModals = ({ modalType, onClose }) => {
  const {
    addDonor,
    addBeneficiary,
    addProject,
    addVolunteer,
    addTransaction,
    projects
  } = useDashboard();

  // Donor Form State
  const [donorForm, setDonorForm] = useState({
    name: '',
    email: '',
    amount: '',
    type: 'One-time',
    campaign: 'Girl Child Education Initiative',
    date: new Date().toISOString().split('T')[0],
    paymentMethod: 'UPI / Razorpay',
    panNumber: '',
    taxExemption80G: true
  });

  // Beneficiary Form State
  const [beneficiaryForm, setBeneficiaryForm] = useState({
    name: '',
    category: 'Education',
    status: 'Verified',
    aidProvided: '',
    location: '',
    contact: '',
    aadhaarLast4: '',
    date: new Date().toISOString().split('T')[0]
  });

  // Project Form State
  const [projectForm, setProjectForm] = useState({
    name: '',
    manager: '',
    category: 'Education',
    targetBudget: '',
    fundsUsed: '0',
    beneficiariesCount: '',
    location: '',
    status: 'Active',
    description: '',
    startDate: new Date().toISOString().split('T')[0]
  });

  // Volunteer Form State
  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
    assignedProject: projects.length > 0 ? projects[0].name : 'General Emergency Squad',
    status: 'Active',
    hoursLogged: '0',
    joinedDate: new Date().toISOString().split('T')[0]
  });

  // Expense Form State
  const [expenseForm, setExpenseForm] = useState({
    title: '',
    category: 'Relief Supplies',
    amount: '',
    billAttachment: 'Voucher_Invoice_Oct26.pdf',
    approvalStatus: 'Approved',
    date: new Date().toISOString().split('T')[0],
    recordedBy: 'Finance Operations'
  });

  // Error state
  const [error, setError] = useState('');

  // Handle Submissions
  const handleDonorSubmit = (e) => {
    e.preventDefault();
    if (!donorForm.name.trim()) return setError('Please enter donor or company name');
    if (!donorForm.amount || Number(donorForm.amount) <= 0) return setError('Please enter a valid donation amount');
    if (!donorForm.email.trim()) return setError('Please enter a valid donor email address');

    addDonor(donorForm);
    setError('');
    onClose();
  };

  const handleBeneficiarySubmit = (e) => {
    e.preventDefault();
    if (!beneficiaryForm.name.trim()) return setError('Please enter recipient or family name');
    if (!beneficiaryForm.aidProvided.trim()) return setError('Please specify aid support kit description');

    addBeneficiary(beneficiaryForm);
    setError('');
    onClose();
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    if (!projectForm.name.trim()) return setError('Please enter mission name');
    if (!projectForm.manager.trim()) return setError('Please enter designated program manager');
    if (!projectForm.targetBudget || Number(projectForm.targetBudget) <= 0) return setError('Please enter target budget');

    addProject(projectForm);
    setError('');
    onClose();
  };

  const handleVolunteerSubmit = (e) => {
    e.preventDefault();
    if (!volunteerForm.name.trim()) return setError('Please enter volunteer name');
    if (!volunteerForm.skills.trim()) return setError('Please specify core competencies or skills');

    addVolunteer(volunteerForm);
    setError('');
    onClose();
  };

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    if (!expenseForm.title.trim()) return setError('Please enter voucher description');
    if (!expenseForm.amount || Number(expenseForm.amount) <= 0) return setError('Please enter a valid amount');

    addTransaction({
      ...expenseForm,
      type: 'Expense'
    });
    setError('');
    onClose();
  };

  if (!modalType) return null;

  return (
    <>
      {/* 1. ADD DONOR / DONATION MODAL */}
      {modalType === 'donor' && (
        <Modal
          isOpen={true}
          onClose={onClose}
          title="Record Donation / Grant"
          subtitle="Generate automated 80G tax receipt and post immediately to statutory ledger"
        >
          <form onSubmit={handleDonorSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-bold">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Donor Full Name / Corporate Entity *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Chandra / Infosys Foundation"
                  value={donorForm.name}
                  onChange={(e) => setDonorForm({ ...donorForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none transition font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Email Address (For Tax Receipt) *
                </label>
                <input
                  type="email"
                  required
                  placeholder="donor@example.com"
                  value={donorForm.email}
                  onChange={(e) => setDonorForm({ ...donorForm, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none transition font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Donation Amount (₹) *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="50000"
                  value={donorForm.amount}
                  onChange={(e) => setDonorForm({ ...donorForm, amount: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none transition font-mono font-black text-slate-900"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Frequency Type
                </label>
                <select
                  value={donorForm.type}
                  onChange={(e) => setDonorForm({ ...donorForm, type: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none transition font-bold"
                >
                  <option value="One-time">One-time Donation</option>
                  <option value="Recurring">Monthly Recurring</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Payment Gateway
                </label>
                <select
                  value={donorForm.paymentMethod}
                  onChange={(e) => setDonorForm({ ...donorForm, paymentMethod: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none transition font-bold"
                >
                  <option value="UPI / Razorpay">UPI / Razorpay</option>
                  <option value="Bank Transfer (NEFT)">Bank Transfer (NEFT)</option>
                  <option value="Institutional Wire">Institutional Wire</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Cheque / DD">Cheque / Demand Draft</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Targeted Mission / Campaign
                </label>
                <select
                  value={donorForm.campaign}
                  onChange={(e) => setDonorForm({ ...donorForm, campaign: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none transition font-medium"
                >
                  <option value="Girl Child Education Initiative">Girl Child Education Initiative</option>
                  <option value="Rural Mobile Medical Clinics">Rural Mobile Medical Clinics</option>
                  <option value="Clean Water & Sanitation Drive">Clean Water & Sanitation Drive</option>
                  <option value="Emergency Malnutrition Relief">Emergency Malnutrition Relief</option>
                  <option value="Skill Center for Rural Youths">Skill Center for Rural Youths</option>
                  <option value="Agape Hope Federation Corpus Fund">Agape Hope Federation Corpus Fund</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Authorized Date
                </label>
                <input
                  type="date"
                  value={donorForm.date}
                  onChange={(e) => setDonorForm({ ...donorForm, date: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none transition font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  PAN Number (Mandatory for 80G Deduction)
                </label>
                <input
                  type="text"
                  placeholder="e.g. ABCDE1234F"
                  maxLength={10}
                  value={donorForm.panNumber}
                  onChange={(e) => setDonorForm({ ...donorForm, panNumber: e.target.value.toUpperCase() })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none transition font-mono uppercase font-black"
                />
              </div>

              <div className="flex items-center pt-6">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={donorForm.taxExemption80G}
                    onChange={(e) => setDonorForm({ ...donorForm, taxExemption80G: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                  />
                  <span className="text-xs font-bold text-slate-700">
                    Generate Section 80G Tax Exemption Certificate
                  </span>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-extrabold text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 rounded-xl shadow-md shadow-emerald-700/20 ring-1 ring-emerald-400/30 transition transform hover:-translate-y-0.5"
              >
                Commit Donation to Ledger
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* 2. REGISTER BENEFICIARY MODAL */}
      {modalType === 'beneficiary' && (
        <Modal
          isOpen={true}
          onClose={onClose}
          title="Register Beneficiary Dossier"
          subtitle="Direct aid onboarding with field inspection & ID verification"
        >
          <form onSubmit={handleBeneficiarySubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-bold">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Beneficiary / Family Representative *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anita Devi & 3 Dependents"
                  value={beneficiaryForm.name}
                  onChange={(e) => setBeneficiaryForm({ ...beneficiaryForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none transition font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Intervention Pillar *
                </label>
                <select
                  value={beneficiaryForm.category}
                  onChange={(e) => setBeneficiaryForm({ ...beneficiaryForm, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none transition font-bold"
                >
                  <option value="Education">Education Aid & Scholarships</option>
                  <option value="Medical">Medical Treatment & Diagnostics</option>
                  <option value="Food">Food / Dry Ration Support</option>
                  <option value="Shelter">Shelter & Emergency Relief</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Aid Provided / Specific Support Kit Description *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Monthly Nutrition Basket + Pediatric Antibiotics"
                value={beneficiaryForm.aidProvided}
                onChange={(e) => setBeneficiaryForm({ ...beneficiaryForm, aidProvided: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none transition font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Cluster Location / Basti / Ward
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ward 12, Malviya Nagar Slum Cluster"
                  value={beneficiaryForm.location}
                  onChange={(e) => setBeneficiaryForm({ ...beneficiaryForm, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none transition font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Contact Mobile Number
                </label>
                <input
                  type="text"
                  placeholder="+91 98765 43210"
                  value={beneficiaryForm.contact}
                  onChange={(e) => setBeneficiaryForm({ ...beneficiaryForm, contact: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none transition font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  National ID / Aadhaar Last 4 Digits
                </label>
                <input
                  type="text"
                  maxLength={4}
                  placeholder="e.g. 5491"
                  value={beneficiaryForm.aadhaarLast4}
                  onChange={(e) => setBeneficiaryForm({ ...beneficiaryForm, aadhaarLast4: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none transition font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Field Verification Status
                </label>
                <select
                  value={beneficiaryForm.status}
                  onChange={(e) => setBeneficiaryForm({ ...beneficiaryForm, status: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none transition font-bold"
                >
                  <option value="Verified">Verified (Field Officer Inspected)</option>
                  <option value="Pending">Pending Background Audit</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-extrabold text-white bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 rounded-xl shadow-md shadow-sky-700/20 ring-1 ring-sky-400/30 transition transform hover:-translate-y-0.5"
              >
                Enroll Beneficiary
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* 3. CREATE PROJECT MODAL */}
      {modalType === 'project' && (
        <Modal
          isOpen={true}
          onClose={onClose}
          title="Launch Field Mission"
          subtitle="Deploy authorized project milestone with designated manager and budget caps"
        >
          <form onSubmit={handleProjectSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-bold">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Mission / Project Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Project Roshni: Solar Night Schools"
                  value={projectForm.name}
                  onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none transition font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Lead Program Manager *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Rohini Deshmukh"
                  value={projectForm.manager}
                  onChange={(e) => setProjectForm({ ...projectForm, manager: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none transition font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Target Budget (₹) *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="1500000"
                  value={projectForm.targetBudget}
                  onChange={(e) => setProjectForm({ ...projectForm, targetBudget: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none transition font-mono font-black text-slate-900"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Initial Funds Spent (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={projectForm.fundsUsed}
                  onChange={(e) => setProjectForm({ ...projectForm, fundsUsed: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none transition font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Target Beneficiaries Count
                </label>
                <input
                  type="number"
                  placeholder="1200"
                  value={projectForm.beneficiariesCount}
                  onChange={(e) => setProjectForm({ ...projectForm, beneficiariesCount: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none transition font-mono font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Regional Focus
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bastar Tribal Belt, CG"
                  value={projectForm.location}
                  onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none transition font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Status
                </label>
                <select
                  value={projectForm.status}
                  onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none transition font-bold"
                >
                  <option value="Active">Active & Deploying</option>
                  <option value="Planning">In Planning / CSR Sanction</option>
                  <option value="Completed">Completed & Audited</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Mission Description & Scope
              </label>
              <textarea
                rows={3}
                placeholder="Brief summary of program goals, targeted communities, and key performance indicators..."
                value={projectForm.description}
                onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none transition font-medium"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-extrabold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 rounded-xl shadow-md shadow-indigo-700/20 ring-1 ring-indigo-400/30 transition transform hover:-translate-y-0.5"
              >
                Authorize Mission
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* 4. ONBOARD VOLUNTEER MODAL */}
      {modalType === 'volunteer' && (
        <Modal
          isOpen={true}
          onClose={onClose}
          title="Onboard Volunteer Fellow"
          subtitle="Field volunteer talent registration, skill matching & assignment"
        >
          <form onSubmit={handleVolunteerSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-bold">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Volunteer Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Siddharth Mukherjee"
                  value={volunteerForm.name}
                  onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none transition font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Core Skills & Domain *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Teaching / Paramedic / Web Design"
                  value={volunteerForm.skills}
                  onChange={(e) => setVolunteerForm({ ...volunteerForm, skills: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none transition font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="volunteer@domain.com"
                  value={volunteerForm.email}
                  onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none transition font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="+91 99887 66554"
                  value={volunteerForm.phone}
                  onChange={(e) => setVolunteerForm({ ...volunteerForm, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none transition font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Assigned Project / Mission
                </label>
                <select
                  value={volunteerForm.assignedProject}
                  onChange={(e) => setVolunteerForm({ ...volunteerForm, assignedProject: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none transition font-bold"
                >
                  <option value="General Emergency Squad">General Emergency Squad</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Deployment Availability Status
                </label>
                <select
                  value={volunteerForm.status}
                  onChange={(e) => setVolunteerForm({ ...volunteerForm, status: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none transition font-bold"
                >
                  <option value="Active">Active on Ground</option>
                  <option value="Available">Available for Dispatch</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-extrabold text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 rounded-xl shadow-md shadow-amber-700/20 ring-1 ring-amber-400/30 transition transform hover:-translate-y-0.5"
              >
                Register Fellow
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* 5. RECORD EXPENSE VOUCHER MODAL */}
      {modalType === 'expense' && (
        <Modal
          isOpen={true}
          onClose={onClose}
          title="Authorize Program Expense Voucher"
          subtitle="Double-entry ledger debit with digital bill attachment and treasurer approval"
        >
          <form onSubmit={handleExpenseSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-bold">
                {error}
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Voucher Purpose / Expenditure Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Field Medical Van Fuel & Maintenance (Jhansi Hub)"
                value={expenseForm.title}
                onChange={(e) => setExpenseForm({ ...expenseForm, title: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 focus:outline-none transition font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Statutory Expense Head *
                </label>
                <select
                  value={expenseForm.category}
                  onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 focus:outline-none transition font-bold"
                >
                  <option value="Relief Supplies">Relief Supplies (Ration/Water)</option>
                  <option value="Operations & Transport">Operations & Transport (Fuel/Transit)</option>
                  <option value="Healthcare & Medical">Healthcare & Medical Equipment</option>
                  <option value="Human Resources">Human Resources & Doctor Honorarium</option>
                  <option value="Capital Assets">Capital Assets & Infrastructure</option>
                  <option value="Audit & Compliance">Audit, Legal & Compliance Fees</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Disbursement Amount (₹) *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="35000"
                  value={expenseForm.amount}
                  onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 focus:outline-none transition font-mono font-black text-rose-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Voucher Date
                </label>
                <input
                  type="date"
                  value={expenseForm.date}
                  onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 focus:outline-none transition font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Auditor Approval Clearance
                </label>
                <select
                  value={expenseForm.approvalStatus}
                  onChange={(e) => setExpenseForm({ ...expenseForm, approvalStatus: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 focus:outline-none transition font-bold"
                >
                  <option value="Approved">Approved (Treasurer Certified)</option>
                  <option value="Pending">Pending Audit Clearance</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                GST Tax Invoice Attachment
              </label>
              <div className="p-4 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 text-center hover:bg-slate-100/70 transition cursor-pointer">
                <UploadCloud className="w-6 h-6 mx-auto text-slate-400 mb-1" />
                <p className="text-xs font-bold text-slate-700 font-mono">
                  {expenseForm.billAttachment}
                </p>
                <span className="text-[10px] text-slate-400">Cryptographically stamped PDF/PNG up to 10MB</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-extrabold text-white bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 rounded-xl shadow-md shadow-rose-700/20 ring-1 ring-rose-400/30 transition transform hover:-translate-y-0.5"
              >
                Post Debit Voucher
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};
