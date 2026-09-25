import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AppRoute } from '../types';

export const Navbar: React.FC = () => {
  const {
    currentRoute,
    setCurrentRoute,
    isAdminAuthenticated,
    setShowAdminAuthModal,
    currentUser,
    logoutUser,
    setShowAuthModal,
    setAuthModalMode
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleNavClick = (route: AppRoute, e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentRoute(route);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  // Discreet low-profile Admin access icon click (not highlighted too much)
  const handleAdminIconClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAdminAuthenticated) {
      setShowAdminAuthModal(true);
    } else {
      setCurrentRoute('admin');
    }
    setMobileMenuOpen(false);
  };

  const logoSrc = "https://lh3.googleusercontent.com/aida-public/AB6AXuAV3oODNAIeOB1PSPJvar25A3ezDvaebjEfHlGs-D7nC3bQGX4rprPRv6roGpOJVSkRw1o4iJ0M4KN_XOXzzlc-cx2GjYyjGFj7Li4DIj2noUY8ShYDjpci3-DYQrkqPYTMf5s0II0DkYDO3OOwR_RbI6sfw7CMZFwLIWm1iZywLfPI8Bf_GDSjxI2H2yphnsatEICGjRuZ-6A6-9MZGy0-xElcuyua024UQnMCuZ3a_pQbkjXCE7A26VgEVlMyEMdvtA";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#09090b]/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.85)] border-b border-[#ff4a58]/20">
        <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Identity with verified logo */}
          <a
            href="/"
            onClick={(e) => handleNavClick('home', e)}
            className="flex items-center gap-3 group cursor-pointer shrink-0"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-black flex items-center justify-center border border-red-500 shadow-md shadow-red-600/50 ring-2 ring-[#ff4a58]/40 group-hover:scale-105 transition-transform duration-300 shrink-0">
              <img
                src={logoSrc}
                alt="Paradise Institute Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-outfit text-base md:text-lg text-[#f5f5f7] tracking-tight uppercase leading-none font-bold group-hover:text-[#ff4a58] transition-colors">
                PARADISE INSTITUTE
              </span>
              <span className="font-mono-code text-[10px] md:text-[11px] text-[#ff4a58] tracking-widest leading-none mt-1 font-semibold">
                OF COMPUTER EDUCATION
              </span>
            </div>
          </a>

          {/* Nav Desktop Links */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            <a
              href="/"
              onClick={(e) => handleNavClick('home', e)}
              className={`transition-colors duration-200 py-1.5 px-3 text-sm font-semibold rounded-lg ${
                currentRoute === 'home'
                  ? 'bg-[#d31027] text-white shadow-[0_0_12px_rgba(211,16,39,0.4)]'
                  : 'text-[#e6bdba] hover:text-white hover:bg-[#18171c]'
              }`}
            >
              Home
            </a>
            <a
              href="/courses"
              onClick={(e) => handleNavClick('courses', e)}
              className={`transition-colors duration-200 py-1.5 px-3 text-sm font-semibold rounded-lg ${
                currentRoute === 'courses'
                  ? 'bg-[#d31027] text-white shadow-[0_0_12px_rgba(211,16,39,0.4)]'
                  : 'text-[#e6bdba] hover:text-white hover:bg-[#18171c]'
              }`}
            >
              Courses
            </a>
            <a
              href="/admission"
              onClick={(e) => handleNavClick('admission', e)}
              className={`transition-colors duration-200 py-1.5 px-3 text-sm font-semibold rounded-lg ${
                currentRoute === 'admission'
                  ? 'bg-[#d31027] text-white shadow-[0_0_12px_rgba(211,16,39,0.4)]'
                  : 'text-[#e6bdba] hover:text-white hover:bg-[#18171c]'
              }`}
            >
              Admission
            </a>
            <a
              href="/jobs"
              onClick={(e) => handleNavClick('jobs', e)}
              className={`transition-colors duration-200 py-1.5 px-3 text-sm font-semibold rounded-lg flex items-center gap-1.5 ${
                currentRoute === 'jobs'
                  ? 'bg-[#d31027] text-white shadow-[0_0_12px_rgba(211,16,39,0.4)]'
                  : 'text-[#e6bdba] hover:text-white hover:bg-[#18171c]'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Teachers Required</span>
            </a>
            <a
              href="/tracker"
              onClick={(e) => handleNavClick('tracker', e)}
              className={`transition-colors duration-200 py-1.5 px-3 text-sm font-semibold rounded-lg flex items-center gap-1.5 ${
                currentRoute === 'tracker'
                  ? 'bg-[#d31027] text-white shadow-[0_0_12px_rgba(211,16,39,0.4)]'
                  : 'text-[#e6bdba] hover:text-white hover:bg-[#18171c]'
              }`}
            >
              <span className="material-symbols-outlined text-base">pin</span>
              <span>Check Status</span>
            </a>
            <a
              href="/inquiries"
              onClick={(e) => handleNavClick('inquiries', e)}
              className={`transition-colors duration-200 py-1.5 px-3 text-sm font-semibold rounded-lg ${
                currentRoute === 'inquiries'
                  ? 'bg-[#d31027] text-white shadow-[0_0_12px_rgba(211,16,39,0.4)]'
                  : 'text-[#e6bdba] hover:text-white hover:bg-[#18171c]'
              }`}
            >
              Support
            </a>
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2">
            {/* Student/Faculty Portal Login or Avatar */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#18171c] hover:bg-[#222126] border border-red-500/30 text-white font-mono-code text-xs cursor-pointer transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-[11px]">
                    {currentUser.fullName.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline-block max-w-[100px] truncate">{currentUser.fullName}</span>
                  <span className="material-symbols-outlined text-sm text-[#e6bdba]">arrow_drop_down</span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-[#111114] border border-[#2d2c33] shadow-2xl p-2 z-50 flex flex-col gap-1 font-mono-code text-xs">
                    <div className="px-3 py-2 border-b border-[#222126]">
                      <div className="text-white font-bold truncate">{currentUser.fullName}</div>
                      <div className="text-[10px] text-amber-400 font-semibold">{currentUser.registrationNumber}</div>
                    </div>
                    <button
                      onClick={(e) => handleNavClick('tracker', e)}
                      className="px-3 py-2 text-left rounded-lg hover:bg-[#18171c] text-[#e6bdba] hover:text-white flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-sm">fact_check</span>
                      <span>My Application Status</span>
                    </button>
                    <button
                      onClick={() => {
                        logoutUser();
                        setUserDropdownOpen(false);
                      }}
                      className="px-3 py-2 text-left rounded-lg hover:bg-red-950/60 text-red-400 hover:text-red-300 flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-sm">logout</span>
                      <span>Logout Account</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => {
                  setAuthModalMode('login');
                  setShowAuthModal(true);
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#18171c] hover:bg-[#25242c] text-[#e6bdba] hover:text-white border border-[#2d2c33] font-mono-code text-xs transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">account_circle</span>
                <span>Portal Login</span>
              </button>
            )}

            {/* Apply Now Primary CTA */}
            <a
              href="/admission"
              onClick={(e) => handleNavClick('admission', e)}
              className="hidden sm:inline-flex items-center justify-center font-outfit text-xs sm:text-sm px-4 py-2 rounded-xl bg-[#d31027] text-white shadow-[0_0_20px_rgba(211,16,39,0.5)] hover:shadow-[0_0_30px_rgba(211,16,39,0.8)] transition-all transform hover:scale-[1.02] border border-[#ff4a58]/50 font-bold tracking-wide"
            >
              Apply Now
            </a>

            {/* ========================================================================= */}
            {/* DISCREET ADMIN PANEL ACCESS ICON (SUBTLE & NOT OVER-HIGHLIGHTED) */}
            {/* ========================================================================= */}
            <button
              onClick={handleAdminIconClick}
              title="Portal Administration (Staff Only)"
              aria-label="Staff Terminal Access"
              className="w-9 h-9 rounded-xl bg-[#141318] hover:bg-[#1f1d24] text-[#8e8d96] hover:text-white border border-[#26242e] hover:border-gray-600 transition-all flex items-center justify-center cursor-pointer shrink-0 shadow-sm"
            >
              <span className="material-symbols-outlined text-base">
                {isAdminAuthenticated ? 'admin_panel_settings' : 'lock'}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="lg:hidden p-2 rounded-lg text-[#e6bdba] hover:text-[#f5f5f7] hover:bg-[#18171c] transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER NAVIGATION */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 transition-opacity duration-300">
          <div
            className="fixed inset-0 bg-[#09090b]/85 backdrop-blur-md"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#111114] p-5 shadow-[0_0_40px_rgba(0,0,0,0.95)] flex flex-col justify-between z-10 border-l border-[#222126]">
            <div className="flex flex-col">
              <div className="flex items-center justify-between pb-4 border-b border-[#222126]">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-black flex items-center justify-center border border-red-500 shadow-md">
                    <img
                      src={logoSrc}
                      alt="Paradise Institute Logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-outfit text-base font-bold text-[#f5f5f7] tracking-wider">
                    PARADISE
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="p-1.5 rounded-lg text-[#e6bdba] hover:text-[#f5f5f7] hover:bg-[#18171c]"
                >
                  <span className="material-symbols-outlined text-2xl">close</span>
                </button>
              </div>

              <nav className="flex flex-col gap-1.5 pt-4">
                <a
                  href="/"
                  onClick={(e) => handleNavClick('home', e)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentRoute === 'home'
                      ? 'bg-[#d31027] text-white font-semibold shadow-md'
                      : 'text-[#e6bdba] hover:bg-[#222126] hover:text-[#f5f5f7]'
                  }`}
                >
                  Home
                </a>
                <a
                  href="/courses"
                  onClick={(e) => handleNavClick('courses', e)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentRoute === 'courses'
                      ? 'bg-[#d31027] text-white font-semibold shadow-md'
                      : 'text-[#e6bdba] hover:bg-[#222126] hover:text-[#f5f5f7]'
                  }`}
                >
                  Courses
                </a>
                <a
                  href="/admission"
                  onClick={(e) => handleNavClick('admission', e)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentRoute === 'admission'
                      ? 'bg-[#d31027] text-white font-semibold shadow-md'
                      : 'text-[#e6bdba] hover:bg-[#222126] hover:text-[#f5f5f7]'
                  }`}
                >
                  Admission
                </a>
                <a
                  href="/jobs"
                  onClick={(e) => handleNavClick('jobs', e)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-between ${
                    currentRoute === 'jobs'
                      ? 'bg-[#d31027] text-white font-semibold shadow-md'
                      : 'text-[#e6bdba] hover:bg-[#222126] hover:text-[#f5f5f7]'
                  }`}
                >
                  <span>Teachers Required</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-mono-code border border-emerald-500/40">
                    HIRING
                  </span>
                </a>
                <a
                  href="/tracker"
                  onClick={(e) => handleNavClick('tracker', e)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-between ${
                    currentRoute === 'tracker'
                      ? 'bg-[#d31027] text-white font-semibold shadow-md'
                      : 'text-[#e6bdba] hover:bg-[#222126] hover:text-[#f5f5f7]'
                  }`}
                >
                  <span>Check Status (PIN)</span>
                  <span className="px-2 py-0.5 rounded-full bg-red-950 text-[#ff4a58] text-[10px] font-mono-code border border-red-500/40">
                    6-DIGIT
                  </span>
                </a>
                <a
                  href="/inquiries"
                  onClick={(e) => handleNavClick('inquiries', e)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentRoute === 'inquiries'
                      ? 'bg-[#d31027] text-white font-semibold shadow-md'
                      : 'text-[#e6bdba] hover:bg-[#222126] hover:text-[#f5f5f7]'
                  }`}
                >
                  Support &amp; Inquiry
                </a>

                {/* Portal account button in mobile */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowAuthModal(true);
                  }}
                  className="px-3 py-2 rounded-lg text-sm font-medium bg-[#18171c] hover:bg-[#25242c] text-white flex items-center gap-2 mt-2 border border-[#2d2c33]"
                >
                  <span className="material-symbols-outlined text-base">account_circle</span>
                  <span>{currentUser ? `Account (${currentUser.fullName})` : 'Student / Faculty Login'}</span>
                </button>

                {/* Subtle Staff Link in Drawer */}
                <button
                  onClick={handleAdminIconClick}
                  className="px-3 py-2 rounded-lg font-mono-code text-xs text-[#8e8d96] hover:text-white bg-[#141318] border border-[#26242e] hover:border-gray-600 transition-all flex items-center gap-2 mt-2"
                >
                  <span className="material-symbols-outlined text-sm">lock</span>
                  <span>Staff Node</span>
                </button>
              </nav>
            </div>

            <div className="pt-4 flex flex-col gap-3">
              <a
                href="/admission"
                onClick={(e) => handleNavClick('admission', e)}
                className="w-full py-2.5 text-center font-outfit text-sm rounded-lg bg-[#d31027] text-white shadow-[0_0_20px_rgba(211,16,39,0.5)] font-semibold"
              >
                Apply for Admission 2026
              </a>
              <div className="text-center font-mono-code text-[11px] text-[#e6bdba]">
                Street #63, Urdu Bazar, Shershah, Karachi
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
