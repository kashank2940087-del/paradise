import React from 'react';
import { useApp } from '../context/AppContext';
import { DeveloperShineBox } from './DeveloperShineBox';

export const Footer: React.FC = () => {
  const { setCurrentRoute, isAdminAuthenticated, setShowAdminAuthModal } = useApp();

  const handleAdminLink = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAdminAuthenticated) {
      setShowAdminAuthModal(true);
    } else {
      setCurrentRoute('admin');
    }
  };

  const handleNav = (route: any, e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentRoute(route);
  };

  const logoSrc = "https://lh3.googleusercontent.com/aida-public/AB6AXuBmsuEMCAt5uLxAtuprhMgY8lWP3SiewUz3C5gp1yCvl2yELTulNnZXIedkTvI82plATm0bUY_zZu0CswEok0Ka3iKTC2jePOmaGKRyYoWNNf9YNkDvQolHwHW2a3G1POFSLhxmDi2a-FpgkP5GrEufVjewvkETdT2jHIPrWS3TAgMjB8wNftNud9cdqGlSEBr14AivcSQudRlMT4_cw3GzJ7QG8EzpOumNusiasen9M2N2g-Sf6XiLCfVHnMTXRDBzQw";

  return (
    <footer className="w-full bg-[#050507] text-[#e6bdba] py-12 relative z-10 shadow-[0_-2px_24px_rgba(0,0,0,0.95)] border-t border-red-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Footer Logo & Intro */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-black flex items-center justify-center border border-red-500 shadow-md shadow-red-600/40 ring-1 ring-[#ff4a58]/40 shrink-0">
                <img
                  src={logoSrc}
                  alt="Paradise Institute Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-outfit text-base text-white font-bold leading-tight">
                  PARADISE INSTITUTE
                </span>
                <span className="font-mono-code text-[11px] text-[#ff4a58]">
                  OF COMPUTER EDUCATION
                </span>
              </div>
            </div>
            <p className="font-sans-body text-xs text-[#e6bdba] leading-relaxed">
              Pioneering professional computer technology, artificial intelligence, software engineering, digital media, and certified medical programs in Karachi for Academic Session 2026.
            </p>
            <div className="flex items-center gap-2">
              <a
                href="https://www.tiktok.com/@paradise_shershah"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#18171c] text-white hover:text-[#ff4a58] transition-colors border border-[#2d2c33]"
              >
                <span className="material-symbols-outlined text-sm">play_arrow</span>
                <span className="font-mono-code text-xs">@paradise_shershah</span>
              </a>
            </div>
          </div>

          {/* Campus & Desk */}
          <div className="flex flex-col gap-2.5">
            <h3 className="font-sans-body text-sm text-white font-semibold uppercase tracking-wider">
              Campus &amp; Desk
            </h3>
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[#ff4a58] text-base mt-0.5">location_on</span>
              <span className="font-sans-body text-xs text-[#e6bdba]">
                Street #63, Urdu Bazar, Shershah, Karachi, Sindh, Pakistan
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ff4a58] text-base">call</span>
              <a
                href="tel:03209061656"
                className="font-sans-body text-xs text-[#e6bdba] hover:text-white transition-colors"
              >
                0320-9061656
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ff4a58] text-base">phone_iphone</span>
              <a
                href="tel:03199819503"
                className="font-sans-body text-xs text-[#e6bdba] hover:text-white transition-colors"
              >
                0319-9819503
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ff4a58] text-base">schedule</span>
              <span className="font-sans-body text-xs text-[#e6bdba]">
                Mon - Sat: 9:00 AM - 9:00 PM
              </span>
            </div>
          </div>

          {/* Academic Tracks */}
          <div className="flex flex-col gap-2.5">
            <h3 className="font-sans-body text-sm text-white font-semibold uppercase tracking-wider">
              Academic Tracks 2026
            </h3>
            <ul className="flex flex-col gap-1.5 text-xs text-[#e6bdba]">
              <li className="hover:text-white transition-colors cursor-pointer" onClick={(e) => handleNav('courses', e)}>
                CIT &amp; Information Tech Diploma
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={(e) => handleNav('courses', e)}>
                Artificial Intelligence &amp; Prompt Engineering
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={(e) => handleNav('courses', e)}>
                Full-Stack Web &amp; Python Dev
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={(e) => handleNav('courses', e)}>
                Graphic Design &amp; Digital Media
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={(e) => handleNav('courses', e)}>
                Medical Lab &amp; Nursing Assistance
              </li>
            </ul>
          </div>

          {/* Quick Navigation */}
          <div className="flex flex-col gap-2.5">
            <h3 className="font-sans-body text-sm text-white font-semibold uppercase tracking-wider">
              Quick Navigation
            </h3>
            <div className="flex flex-col gap-1.5 text-xs">
              <a
                href="/"
                onClick={(e) => handleNav('home', e)}
                className="text-[#e6bdba] hover:text-white transition-colors"
              >
                Home Terminal
              </a>
              <a
                href="/courses"
                onClick={(e) => handleNav('courses', e)}
                className="text-[#e6bdba] hover:text-white transition-colors"
              >
                Courses &amp; Certifications
              </a>
              <a
                href="/admission"
                onClick={(e) => handleNav('admission', e)}
                className="text-[#e6bdba] hover:text-white transition-colors"
              >
                Admission Portal 2026
              </a>
              <a
                href="/jobs"
                onClick={(e) => handleNav('jobs', e)}
                className="text-[#ff4a58] hover:text-white transition-colors flex items-center gap-1 font-semibold"
              >
                <span className="material-symbols-outlined text-xs">work</span>
                Teaching Jobs (Required)
              </a>
              <a
                href="/tracker"
                onClick={(e) => handleNav('tracker', e)}
                className="text-amber-400 hover:text-white transition-colors flex items-center gap-1 font-semibold"
              >
                <span className="material-symbols-outlined text-xs">pin</span>
                Check Application Status (6-Digit PIN)
              </a>
              <a
                href="/inquiries"
                onClick={(e) => handleNav('inquiries', e)}
                className="text-[#e6bdba] hover:text-white transition-colors"
              >
                Support &amp; Inquiries
              </a>
              <a
                href="/admin"
                onClick={handleAdminLink}
                className="text-gray-400 hover:text-gray-200 transition-colors flex items-center gap-1 font-mono-code text-[11px] pt-1"
              >
                <span className="material-symbols-outlined text-xs">lock</span>
                Staff Portal
              </a>
            </div>
          </div>
        </div>

        {/* DEVELOPED BY SHAYAN SHINE BOX (IN SHINE BOX ON EVERY PAGE END) */}
        <div className="pt-2">
          <DeveloperShineBox />
        </div>

        {/* Bottom Bar with Discreet Staff Button */}
        <div className="pt-6 border-t border-[#222126] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono-code text-xs text-[#e6bdba] text-center sm:text-left">
            &copy; 2026 Paradise Institute of Computer Education. Street #63, Urdu Bazar, Shershah, Karachi.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5 font-mono-code text-xs text-[#e6bdba]">
              <span className="w-2 h-2 rounded-full bg-[#ff4a58] animate-pulse"></span>
              Active Admissions Open 2026
            </span>
            <button
              onClick={handleAdminLink}
              title="Staff Terminal"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#141318] hover:bg-[#1e1c24] text-[#8e8d96] hover:text-white border border-[#26242e] font-mono-code text-xs transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-xs">lock</span>
              <span>Staff Node</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
