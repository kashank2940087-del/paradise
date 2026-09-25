import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ConfettiEffect } from './ConfettiEffect';

export const AuthModal: React.FC = () => {
  const {
    showAuthModal,
    setShowAuthModal,
    authModalMode,
    setAuthModalMode,
    registerUser,
    loginUser,
    currentUser,
    setCurrentRoute
  } = useApp();

  // Registration Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [cnic, setCnic] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'student' | 'applicant'>('student');

  // Login Form State
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // UI state
  const [errorMsg, setErrorMsg] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [registeredUserNumber, setRegisteredUserNumber] = useState('');
  const [registeredUserName, setRegisteredUserName] = useState('');

  if (!showAuthModal) return null;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password should be at least 6 characters long.');
      return;
    }

    const res = registerUser({
      fullName,
      email,
      phone,
      whatsapp: whatsapp || phone,
      cnic,
      role,
      password
    });

    if (!res.success) {
      setErrorMsg(res.error || 'Registration failed.');
      return;
    }

    if (res.user) {
      setRegisteredUserNumber(res.user.registrationNumber);
      setRegisteredUserName(res.user.fullName);
      setShowCelebration(true);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const res = loginUser(loginIdentifier, loginPassword);
    if (!res.success) {
      setErrorMsg(res.error || 'Invalid credentials.');
      return;
    }

    setShowAuthModal(false);
  };

  const handleClose = () => {
    setShowAuthModal(false);
    setShowCelebration(false);
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      {/* Background click to close */}
      <div className="fixed inset-0" onClick={handleClose}></div>

      <div className="relative w-full max-w-lg rounded-3xl bg-[#111114] border-2 border-red-500/50 shadow-[0_0_60px_rgba(211,16,39,0.4)] overflow-hidden z-10 flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#222126] bg-[#0c0c0f]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-950 flex items-center justify-center border border-red-500/50 text-[#ff4a58]">
              <span className="material-symbols-outlined text-lg">account_circle</span>
            </div>
            <span className="font-outfit text-sm font-bold text-white tracking-wide">
              Paradise Institute • Student &amp; Faculty Portal
            </span>
          </div>

          <button
            onClick={handleClose}
            className="p-1 rounded-lg text-[#e6bdba] hover:text-white hover:bg-[#18171c] transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* CONGRATULATIONS CELEBRATION SIGN (UPON ACCOUNT CREATION) */}
        {/* ========================================================================= */}
        {showCelebration ? (
          <div className="p-8 flex flex-col items-center text-center gap-5 overflow-y-auto">
            <ConfettiEffect />

            {/* Glowing Trophy / Celebration Badge */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 via-red-500 to-emerald-400 p-[3px] animate-bounce shadow-[0_0_40px_rgba(245,158,11,0.6)]">
                <div className="w-full h-full rounded-full bg-[#111114] flex items-center justify-center text-4xl">
                  🎉
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 font-mono-code text-xs font-black uppercase tracking-widest border border-emerald-500/40">
                REGISTRATION CONFIRMED • SESSION 2026
              </span>
              <h2 className="font-outfit text-3xl font-black text-white mt-2">
                Congratulations, {registeredUserName}!
              </h2>
              <p className="font-sans-body text-xs sm:text-sm text-[#e6bdba] mt-1 max-w-sm">
                Your portal account has been officially registered with <strong className="text-white">Paradise Institute of Computer Education</strong>.
              </p>
            </div>

            {/* Personalized Registration ID Card */}
            <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-red-950/70 via-[#18171c] to-emerald-950/70 border border-red-500/40 flex flex-col items-center gap-1 shadow-inner">
              <span className="font-mono-code text-[11px] text-[#e6bdba] uppercase">YOUR OFFICIAL REGISTRATION ID:</span>
              <span className="font-mono-code text-2xl font-black text-amber-300 tracking-wider">
                {registeredUserNumber}
              </span>
              <span className="font-mono-code text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">verified</span>
                <span>256-Bit Encrypted Portal Account Active</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full pt-2">
              <button
                onClick={() => {
                  handleClose();
                  setCurrentRoute('admission');
                }}
                className="p-3 rounded-xl bg-[#d31027] hover:bg-[#ff4a58] text-white font-outfit text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                Apply for Admission
              </button>

              <button
                onClick={() => {
                  handleClose();
                  setCurrentRoute('jobs');
                }}
                className="p-3 rounded-xl bg-[#18171c] hover:bg-[#25242c] text-white border border-[#2d2c33] font-outfit text-xs font-bold transition-all cursor-pointer"
              >
                Apply for Faculty
              </button>

              <button
                onClick={() => {
                  handleClose();
                  setCurrentRoute('tracker');
                }}
                className="p-3 rounded-xl bg-[#18171c] hover:bg-[#25242c] text-amber-300 border border-amber-500/40 font-outfit text-xs font-bold transition-all cursor-pointer"
              >
                Track Status
              </button>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* REGULAR LOGIN / SIGNUP FORMS */
          /* ========================================================================= */
          <div className="p-6 sm:p-8 flex flex-col gap-6 overflow-y-auto">
            {/* Tabs for Login vs Signup */}
            <div className="flex rounded-2xl bg-[#18171c] p-1.5 border border-[#2d2c33]">
              <button
                onClick={() => {
                  setAuthModalMode('login');
                  setErrorMsg('');
                }}
                className={`flex-1 py-2 text-center font-outfit text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                  authModalMode === 'login'
                    ? 'bg-[#d31027] text-white shadow-md'
                    : 'text-[#e6bdba] hover:text-white'
                }`}
              >
                Student / Faculty Login
              </button>

              <button
                onClick={() => {
                  setAuthModalMode('signup');
                  setErrorMsg('');
                }}
                className={`flex-1 py-2 text-center font-outfit text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                  authModalMode === 'signup'
                    ? 'bg-[#d31027] text-white shadow-md'
                    : 'text-[#e6bdba] hover:text-white'
                }`}
              >
                Create New Account
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-950/80 border border-red-500 text-red-200 text-xs font-mono-code">
                {errorMsg}
              </div>
            )}

            {/* TAB: LOGIN */}
            {authModalMode === 'login' ? (
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div>
                  <label className="block font-mono-code text-xs text-[#e6bdba] mb-1 font-semibold">
                    Email, Phone Number, or Registration ID
                  </label>
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="e.g. 0302-3928172 or student@gmail.com or STU-2026-1001"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#18171c] border border-[#2d2c33] focus:border-[#ff4a58] text-white font-mono-code text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono-code text-xs text-[#e6bdba] mb-1 font-semibold">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter account password..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#18171c] border border-[#2d2c33] focus:border-[#ff4a58] text-white font-mono-code text-xs focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono-code text-[#e6bdba]">
                  <span>Default test: hamza.tech@gmail.com</span>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginIdentifier('0302-3928172');
                      setLoginPassword('123456');
                    }}
                    className="text-[#ff4a58] hover:underline"
                  >
                    Auto-Fill Demo
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#d31027] hover:bg-[#ff4a58] text-white font-outfit text-sm font-bold uppercase tracking-wider shadow-[0_0_25px_rgba(211,16,39,0.5)] transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  <span className="material-symbols-outlined text-base">login</span>
                  <span>Sign In to Portal</span>
                </button>
              </form>
            ) : (
              /* TAB: SIGN UP (CREATE ACCOUNT) */
              <form onSubmit={handleRegister} className="flex flex-col gap-3.5">
                <div>
                  <label className="block font-mono-code text-xs text-[#e6bdba] mb-1 font-semibold">
                    Account Category
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRole('student')}
                      className={`py-2 px-3 rounded-xl font-mono-code text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        role === 'student'
                          ? 'bg-red-950 text-white border-red-500 shadow-sm'
                          : 'bg-[#18171c] text-[#e6bdba] border-[#2d2c33]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">school</span>
                      <span>Student Account</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('applicant')}
                      className={`py-2 px-3 rounded-xl font-mono-code text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        role === 'applicant'
                          ? 'bg-cyan-950 text-white border-cyan-500 shadow-sm'
                          : 'bg-[#18171c] text-[#e6bdba] border-[#2d2c33]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">work</span>
                      <span>Faculty Applicant</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-mono-code text-xs text-[#e6bdba] mb-1 font-semibold">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Kashan Khan"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#18171c] border border-[#2d2c33] focus:border-[#ff4a58] text-white font-sans-body text-xs focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono-code text-xs text-[#e6bdba] mb-1 font-semibold">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0320-XXXXXXX"
                      className="w-full px-3.5 py-2 rounded-xl bg-[#18171c] border border-[#2d2c33] focus:border-[#ff4a58] text-white font-mono-code text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono-code text-xs text-[#e6bdba] mb-1 font-semibold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@gmail.com"
                      className="w-full px-3.5 py-2 rounded-xl bg-[#18171c] border border-[#2d2c33] focus:border-[#ff4a58] text-white font-mono-code text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono-code text-xs text-[#e6bdba] mb-1 font-semibold">
                    CNIC / B-Form Number (Optional)
                  </label>
                  <input
                    type="text"
                    value={cnic}
                    onChange={(e) => setCnic(e.target.value)}
                    placeholder="42401-XXXXXXX-X"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#18171c] border border-[#2d2c33] focus:border-[#ff4a58] text-white font-mono-code text-xs focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono-code text-xs text-[#e6bdba] mb-1 font-semibold">
                      Create Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min 6 characters..."
                      className="w-full px-3.5 py-2 rounded-xl bg-[#18171c] border border-[#2d2c33] focus:border-[#ff4a58] text-white font-mono-code text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono-code text-xs text-[#e6bdba] mb-1 font-semibold">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter password..."
                      className="w-full px-3.5 py-2 rounded-xl bg-[#18171c] border border-[#2d2c33] focus:border-[#ff4a58] text-white font-mono-code text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-[#d31027] hover:from-red-500 hover:to-red-600 text-white font-outfit text-sm font-bold uppercase tracking-wider shadow-[0_0_25px_rgba(211,16,39,0.5)] transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  <span className="material-symbols-outlined text-base">person_add</span>
                  <span>Create Account &amp; Get Student ID</span>
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
