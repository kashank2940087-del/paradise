import React from 'react';
import { useApp } from '../context/AppContext';

export const TopBanner: React.FC = () => {
  const { announcementBanner, setCurrentRoute } = useApp();

  if (!announcementBanner.enabled) return null;

  return (
    <div className="w-full bg-gradient-to-r from-red-950 via-[#d31027] to-red-950 text-white py-2 px-4 border-b border-red-500/40 relative z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <span className="px-2 py-0.5 rounded-full bg-white text-[#d31027] font-mono-code text-[10px] font-black tracking-wider uppercase shadow-sm">
            {announcementBanner.badge || 'CAMPUS NOTICE'}
          </span>
          <span className="font-sans-body text-xs text-white font-medium">
            {announcementBanner.message}
          </span>
        </div>

        {announcementBanner.linkText && (
          <button
            onClick={() => setCurrentRoute(announcementBanner.linkRoute || 'jobs')}
            className="px-3 py-1 rounded-md bg-black/60 hover:bg-black text-white hover:text-[#ff4a58] font-mono-code text-[11px] font-bold border border-red-400/40 transition-all flex items-center gap-1 cursor-pointer shrink-0"
          >
            <span>{announcementBanner.linkText}</span>
            <span className="material-symbols-outlined text-xs">arrow_forward</span>
          </button>
        )}
      </div>
    </div>
  );
};
