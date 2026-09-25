import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getLockoutState } from '../utils/security';

export const AdminKeyModal: React.FC = () => {
  const { showAdminAuthModal, setShowAdminAuthModal, loginAdmin, setCurrentRoute } = useApp();
  const [keyInput, setKeyInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [lockoutCountdown, setLockoutCountdown] = useState<number>(0);

  useEffect(() => {
    const lockout = getLockoutState();
    if (lockout.isLocked) {
      setLockoutCountdown(lockout.remainingSeconds);
    }
  }, [showAdminAuthModal]);

  useEffect(() => {
    if (lockoutCountdown <= 0) return;
    const interval = setInterval(() => {
      setLockoutCountdown(prev => {
        if (prev <= 1) {
          setErrorMsg('');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutCountdown]);

  if (!showAdminAuthModal) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutCountdown > 0) return;

    setErrorMsg('');
    setIsVerifying(true);

    try {
      const result = await loginAdmin(keyInput);
      setIsVerifying(false);

      if (result.success) {
        setCurrentRoute('admin');
        setKeyInput('');
      } else {
        setErrorMsg(result.error || 'Access denied.');
        if (result.lockoutSeconds) {
          setLockoutCountdown(result.lockoutSeconds);
        }
      }
    } catch {
      setIsVerifying(false);
      setErrorMsg('An error occurred during cryptographic verification.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-2xl bg-[#111114] p-6 shadow-2xl flex flex-col gap-4 border border-red-500/50">
        <div className="flex items-center justify-between pb-3 border-b border-[#222126]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-950 flex items-center justify-center border border-red-500/50 text-yellow-400">
              <span className="material-symbols-outlined text-xl">shield</span>
            </div>
            <div>
              <h3 className="font-outfit text-base font-bold text-white leading-tight">
                Staff Terminal Access
              </h3>
              <span className="font-mono-code text-[10px] text-red-400 font-bold uppercase tracking-wider block">
                [ HIGH-ENCRYPTION // 256-BIT SHA ]
              </span>
            </div>
          </div>
          <button
            onClick={() => setShowAdminAuthModal(false)}
            className="text-[#e6bdba] hover:text-white p-1 rounded-lg hover:bg-[#18171c]"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <p className="font-sans-body text-xs text-[#e6bdba] leading-relaxed">
          Authorized personnel only. Access attempts are cryptographically verified and logged with rate-limiting protection.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block font-mono-code text-xs text-white mb-1.5 font-semibold">
              Master Security Key
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                disabled={lockoutCountdown > 0 || isVerifying}
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder="Enter authorized key..."
                className="w-full pl-3.5 pr-10 py-2.5 rounded-lg bg-[#18171c] border border-red-500/30 text-white font-mono-code text-sm focus:outline-none focus:border-[#ff4a58] focus:ring-1 focus:ring-[#ff4a58] disabled:opacity-50"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-2.5 text-[#e6bdba] hover:text-white"
                title={showPassword ? 'Hide key' : 'Show key'}
              >
                <span className="material-symbols-outlined text-lg">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {lockoutCountdown > 0 ? (
            <div className="p-3 rounded-lg bg-red-950/90 border border-red-500 text-red-200 text-xs font-mono-code flex items-center gap-2">
              <span className="material-symbols-outlined text-base animate-pulse">lock_clock</span>
              <span>Terminal locked. Cool-down: {lockoutCountdown}s</span>
            </div>
          ) : errorMsg ? (
            <div className="p-2.5 rounded-lg bg-red-950/80 border border-red-500/50 text-red-200 text-xs font-mono-code">
              {errorMsg}
            </div>
          ) : null}

          <div className="flex items-center justify-between text-[11px] font-mono-code text-[#e6bdba]">
            <span>Encryption Standard:</span>
            <span className="text-[#ff4a58] font-bold">SHA-256 Secured</span>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAdminAuthModal(false)}
              className="flex-1 py-2.5 rounded-lg bg-[#18171c] hover:bg-[#222126] text-white font-sans-body text-sm font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={lockoutCountdown > 0 || isVerifying}
              className="flex-1 py-2.5 rounded-lg bg-[#d31027] hover:bg-[#ff4a58] disabled:bg-gray-800 disabled:text-gray-500 text-white font-sans-body text-sm font-bold shadow-[0_0_15px_rgba(211,16,39,0.5)] transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              {isVerifying ? (
                <>
                  <span className="material-symbols-outlined text-base animate-spin">progress_activity</span>
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-base">lock_open</span>
                  <span>Authorize</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
