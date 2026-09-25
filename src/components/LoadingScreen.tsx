import React, { useState, useEffect } from 'react';

export const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing Academic Core...');
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const statuses = [
      { at: 15, text: 'Mounting Shershah Campus Lab Telemetry...' },
      { at: 40, text: 'Calibrating Workstation Bench Nodes...' },
      { at: 70, text: 'Loading Academic Catalog & Fee Vouchers...' },
      { at: 90, text: 'Securing High-Speed Network Terminal...' },
      { at: 100, text: 'Welcome to Paradise Institute' }
    ];

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 5;
        if (next >= 100) {
          clearInterval(timer);
          setStatusText('Welcome to Paradise Institute');
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => {
              onComplete();
            }, 600);
          }, 400);
          return 100;
        }

        const match = statuses.find((s) => s.at <= next);
        if (match) setStatusText(match.text);

        return next;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onComplete]);

  const logoSrc = "https://lh3.googleusercontent.com/aida-public/AB6AXuBsnhho_RfSW76AJ4zSKPX14du6gNZ1nr3iiGidABdnnysvsrGNQo7P0b8BrJ8MJuzc0EWFI20P0PW5RJRYv99MsAWoZJ1DEYH4hYVWinR0N_ZfMqsLrpNSQ5Jj7veZqZ7kXM64w07sNpBFJQRXJWa7FgCaGiYAyOxB7Pb7ydZqfpmWyJedzkDNEQZUmq7eNxjrdaFz4zVAbjH5bm-1ucfb7FuGoiGKG5QSb0iitMbU_o7cQtmOkrvnxarkvWrYMFCCpg";

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#09090b] transition-all duration-700 ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Dynamic atmospheric backdrops */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-red-600/20 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 text-center gap-6">
        {/* Glowing rotating brand logo */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-dashed border-red-500/50 animate-spin-slow"></div>
          <div className="absolute inset-2 rounded-full border border-red-600/30 animate-pulse"></div>
          <div className="w-28 h-28 rounded-full border-2 border-red-500 shadow-[0_0_50px_rgba(211,16,39,0.85)] bg-black overflow-hidden flex items-center justify-center p-2 animate-pulse-glow">
            <img src={logoSrc} alt="Paradise Logo" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Title branding */}
        <div className="flex flex-col gap-1">
          <h1 className="font-outfit text-2xl font-black text-white tracking-wider uppercase leading-none">
            PARADISE INSTITUTE
          </h1>
          <span className="font-mono-code text-xs text-[#ff4a58] tracking-widest uppercase font-semibold">
            OF COMPUTER EDUCATION
          </span>
          <span className="font-sans-body text-[11px] text-[#e6bdba] mt-0.5">
            Street #63, Urdu Bazar, Shershah, Karachi
          </span>
        </div>

        {/* Loading Progress Bar */}
        <div className="w-full flex flex-col gap-2">
          <div className="w-full h-2 rounded-full bg-[#18171c] p-0.5 border border-[#2d2c33] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#d31027] via-[#ff4a58] to-red-400 rounded-full transition-all duration-150 ease-out shadow-[0_0_12px_rgba(211,16,39,0.8)]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono-code">
            <span className="text-[#e6bdba] text-[11px] truncate max-w-[240px]">
              {statusText}
            </span>
            <span className="text-[#ff4a58] font-bold">{progress}%</span>
          </div>
        </div>

        {/* Live system node tag */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#111114] border border-red-500/30 text-[10px] font-mono-code text-[#e6bdba]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span>Karachi Academic Server • Node 63</span>
        </div>
      </div>
    </div>
  );
};
