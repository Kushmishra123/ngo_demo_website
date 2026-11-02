import React from 'react';
import { CheckCircle2, AlertCircle, Info, X, Sparkles } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

export const ToastContainer = () => {
  const { toasts, removeToast } = useDashboard();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-md w-full px-4 sm:px-0 pointer-events-none select-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isInfo = toast.type === 'info';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto transform transition-all duration-300 ease-out shadow-2xl rounded-2xl border p-4.5 flex items-start gap-3.5 backdrop-blur-2xl animate-in slide-in-from-bottom-5 fade-in duration-200 relative overflow-hidden ${
              isSuccess
                ? 'bg-[#061712]/95 border-emerald-500/35 text-white ring-1 ring-emerald-500/20'
                : isError
                ? 'bg-[#1a0709]/95 border-rose-500/35 text-white ring-1 ring-rose-500/20'
                : 'bg-[#090D16]/95 border-slate-700/60 text-white ring-1 ring-white/10'
            }`}
          >
            {/* Ambient corner glow */}
            <div
              className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl pointer-events-none ${
                isSuccess
                  ? 'bg-emerald-500/15'
                  : isError
                  ? 'bg-rose-500/15'
                  : 'bg-indigo-500/15'
              }`}
            />

            <div className="mt-0.5 shrink-0">
              {isSuccess && (
                <div className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}
              {isError && (
                <div className="p-1 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  <AlertCircle className="w-4 h-4" />
                </div>
              )}
              {isInfo && (
                <div className="p-1 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30">
                  <Info className="w-4 h-4" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0 z-10">
              <h4 className="text-xs font-black tracking-tight text-white uppercase font-mono">
                {toast.title}
              </h4>
              {toast.message && (
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed font-normal">
                  {toast.message}
                </p>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white shrink-0 p-1 rounded-lg hover:bg-white/10 transition z-10"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
