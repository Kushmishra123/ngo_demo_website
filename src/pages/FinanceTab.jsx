import React, { useState } from 'react';
import {
  Receipt,
  Plus,
  Trash2,
  TrendingUp,
  TrendingDown,
  Paperclip,
  CheckCircle2,
  Clock,
  Download,
  Filter,
  FileSpreadsheet,
  Wallet,
  Building,
  Landmark,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { StatusBadge } from '../components/common/StatusBadge';

export const FinanceTab = ({ onOpenModal }) => {
  const { transactions, deleteTransaction, searchQuery, metrics, addToast } = useDashboard();
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.voucherNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.recordedBy && t.recordedBy.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = typeFilter === 'All' || t.type === typeFilter;
    const matchesStatus = statusFilter === 'All' || t.approvalStatus === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  const incomeTotal = transactions
    .filter((t) => t.type === 'Income')
    .reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  const expenseTotal = transactions
    .filter((t) => t.type === 'Expense')
    .reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  const netBalance = incomeTotal - expenseTotal;

  return (
    <div className="space-y-6">
      {/* Top Banking / Reserve Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/95 rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Statutory Income</span>
            <h3 className="text-2xl font-black text-emerald-600 font-mono">
              ₹{incomeTotal.toLocaleString('en-IN')}
            </h3>
            <span className="text-[11px] text-slate-500 font-medium">CSR Grants & Wire Clearances</span>
          </div>
          <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 border border-emerald-100">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white/95 rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Audited Disbursements</span>
            <h3 className="text-2xl font-black text-rose-600 font-mono">
              ₹{expenseTotal.toLocaleString('en-IN')}
            </h3>
            <span className="text-[11px] text-slate-500 font-medium">Field Operations & Relief Vouchers</span>
          </div>
          <div className="p-3 bg-rose-50 rounded-2xl text-rose-600 border border-rose-100">
            <TrendingDown className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white/95 rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Net Operating Liquid Reserve</span>
            <h3 className="text-2xl font-black text-slate-900 font-mono">
              ₹{netBalance.toLocaleString('en-IN')}
            </h3>
            <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Tax Compliant (12A/80G)
            </span>
          </div>
          <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600 border border-indigo-100">
            <Wallet className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Action & Filter Bar */}
      <div className="bg-white/95 rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
              Statutory Voucher Ledger & Financial Audit Trail
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200 font-mono">
              {filteredTransactions.length} Vouchers
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Cryptographic ledger trail with attached invoices and treasurer authorization
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center bg-slate-100/90 p-1 rounded-xl text-xs font-bold text-slate-600 border border-slate-200/60">
            {['All', 'Income', 'Expense'].map((type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  typeFilter === type ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <button
            onClick={() => onOpenModal('expense')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-extrabold text-white bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 rounded-xl shadow-md shadow-rose-700/20 ring-1 ring-rose-400/30 transition transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            <span>Record Expense Voucher</span>
          </button>
        </div>
      </div>

      {/* Main Transactions Table */}
      <div className="bg-white/95 rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-400 uppercase tracking-wider text-[10px] font-bold border-b border-slate-200/80">
              <tr>
                <th className="py-3.5 px-5">Voucher Reference & Purpose</th>
                <th className="py-3.5 px-4">Ledger Type</th>
                <th className="py-3.5 px-4">Expense Head</th>
                <th className="py-3.5 px-4">Net Amount (₹)</th>
                <th className="py-3.5 px-4">Invoice / Bill Attachment</th>
                <th className="py-3.5 px-4">Authorized Date</th>
                <th className="py-3.5 px-4 text-center">Audit Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-14 text-center text-slate-400">
                    <Receipt className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                    <p className="font-bold text-sm text-slate-700">No ledger transactions found</p>
                    <p className="text-xs text-slate-400 mt-1">Click "Record Expense Voucher" to log new items.</p>
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((txn) => {
                  const isExpense = txn.type === 'Expense';

                  return (
                    <tr key={txn.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="py-3.5 px-5">
                        <div className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition">
                          {txn.title}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-slate-400 text-[11px]">
                          <span className="font-mono text-slate-600 font-bold bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200">
                            {txn.voucherNo}
                          </span>
                          <span>•</span>
                          <span className="text-slate-500">{txn.recordedBy || 'Finance Dept'}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <StatusBadge status={txn.type} />
                      </td>

                      <td className="py-3.5 px-4 font-semibold text-slate-700">
                        {txn.category}
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`font-mono text-sm font-black tabular-nums ${
                            isExpense ? 'text-rose-600' : 'text-emerald-600'
                          }`}
                        >
                          {isExpense ? '- ' : '+ '}₹{Number(txn.amount).toLocaleString('en-IN')}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        {txn.billAttachment ? (
                          <button
                            onClick={() =>
                              addToast(
                                'info',
                                'Voucher Document Attached',
                                `Verified statutory invoice: "${txn.billAttachment}" (Ref: ${txn.voucherNo})`
                              )
                            }
                            className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 hover:text-indigo-700 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-md border border-slate-200 transition shadow-2xs"
                            title="Click to inspect digital invoice"
                          >
                            <Paperclip className="w-3.5 h-3.5 text-slate-400" />
                            <span className="truncate max-w-[130px] font-mono">{txn.billAttachment}</span>
                          </button>
                        ) : (
                          <span className="text-slate-400 text-[11px]">No Attachment</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 font-mono text-slate-600 text-[11px]">
                        {txn.date}
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <StatusBadge status={txn.approvalStatus || 'Approved'} />
                      </td>

                      <td className="py-3.5 px-5 text-right">
                        <button
                          onClick={() => deleteTransaction(txn.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          title="Delete Voucher"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
