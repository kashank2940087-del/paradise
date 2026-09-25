import React from 'react';

export const DeveloperShineBox: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
      <div className="relative group overflow-hidden rounded-2xl p-[2px] transition-all duration-500 hover:scale-[1.01]">
        {/* Continuous animated glowing shine gradient border */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-yellow-400 via-pink-500 via-[#ff4a58] to-red-600 rounded-2xl animate-spin-slow opacity-75 blur-sm group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#d31027] via-amber-300 to-[#d31027] rounded-2xl animate-pulse"></div>

        {/* Shiny Box Content Container */}
        <div className="relative rounded-2xl bg-gradient-to-r from-[#0d0c10] via-[#16151c] to-[#0d0c10] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border border-red-500/40 shadow-[0_0_35px_rgba(211,16,39,0.35)]">
          {/* Holographic light streak effect */}
          <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-amber-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(211,16,39,0.8)] border border-yellow-300/40 shrink-0">
              <span className="material-symbols-outlined text-2xl animate-pulse">code</span>
            </div>

            <div className="flex flex-col text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="font-outfit text-base sm:text-lg font-black tracking-wider uppercase bg-gradient-to-r from-white via-yellow-200 to-[#ff4a58] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                  DEVELOPED BY SHAYAN
                </span>
                <span className="px-2 py-0.5 rounded-full bg-red-950 text-red-300 text-[10px] font-mono-code font-bold border border-red-500/50 shadow-sm">
                  CERTIFIED LEAD
                </span>
              </div>
              <span className="font-mono-code text-[11px] text-[#e6bdba]">
                High-Performance Full-Stack Engineering • Paradise Institute Technical Systems
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono-code text-xs">
            <div className="px-3 py-1.5 rounded-lg bg-[#18171c] border border-red-500/30 flex items-center gap-1.5 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-white font-bold">System Status: Optimal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
