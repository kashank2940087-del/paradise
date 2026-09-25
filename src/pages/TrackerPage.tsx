import React from 'react';
import { useApp } from '../context/AppContext';
import { ApplicationCheckerBox } from '../components/ApplicationCheckerBox';

export const TrackerPage: React.FC = () => {
  const { setCurrentRoute } = useApp();

  return (
    <div className="w-full bg-[#09090b] py-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#222126] pb-6">
          <div>
            <div className="flex items-center gap-2 font-mono-code text-xs text-[#ff4a58] uppercase font-bold tracking-wider">
              <span>// CENTRAL APPLICATION VERIFICATION &amp; TRACKING</span>
            </div>
            <h1 className="font-outfit text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold mt-1">
              Application Status Checker
            </h1>
            <p className="font-sans-body text-sm text-[#e6bdba] mt-2 max-w-2xl">
              Track student admission enrollment, challan payment verification, and faculty recruitment decisions in real-time using your personal 6-digit PIN or Application Number.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentRoute('admission')}
              className="px-4 py-2.5 rounded-xl bg-[#d31027] hover:bg-[#ff4a58] text-white text-xs font-outfit font-bold shadow-md transition-all"
            >
              New Admission
            </button>
            <button
              onClick={() => setCurrentRoute('jobs')}
              className="px-4 py-2.5 rounded-xl bg-[#18171c] hover:bg-[#25242c] text-white border border-[#2d2c33] text-xs font-outfit font-bold transition-all"
            >
              Faculty Jobs
            </button>
          </div>
        </div>

        {/* Application Checker Box Component */}
        <ApplicationCheckerBox
          onNavigateAdmission={() => setCurrentRoute('admission')}
          onNavigateJobs={() => setCurrentRoute('jobs')}
        />

        {/* Informational Guidance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-3xl bg-[#111114] border border-[#222126] flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-500/40 flex items-center justify-center text-[#ff4a58]">
              <span className="material-symbols-outlined text-xl">pin</span>
            </div>
            <h3 className="font-outfit text-base font-bold text-white">Unique 6-Digit PIN</h3>
            <p className="font-sans-body text-xs text-[#e6bdba] leading-relaxed">
              Every applicant automatically receives a distinct 6-digit verification code (e.g. 582194) upon submitting their admission or job application. Keep this code safe.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#111114] border border-[#222126] flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <span className="material-symbols-outlined text-xl">contact_support</span>
            </div>
            <h3 className="font-outfit text-base font-bold text-white">Ask Questions &amp; Issues</h3>
            <p className="font-sans-body text-xs text-[#e6bdba] leading-relaxed">
              Have questions regarding class shifts, fee concession requests, or demo lecture schedules? You can submit your inquiry directly inside the checker box.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#111114] border border-[#222126] flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <span className="material-symbols-outlined text-xl">lock_clock</span>
            </div>
            <h3 className="font-outfit text-base font-bold text-white">High-Encryption Storage</h3>
            <p className="font-sans-body text-xs text-[#e6bdba] leading-relaxed">
              Candidate and student records are maintained under hardened SHA-256 encrypted protocols. Only authorized campus counselors and the applicant can view these files.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
