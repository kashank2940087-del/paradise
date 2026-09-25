import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ApplicationCheckerBox } from '../components/ApplicationCheckerBox';

export const HomePage: React.FC = () => {
  const { setCurrentRoute, setSelectedCourseForEnrollment, courses, setIsWhatsAppModalOpen, setShowAdminAuthModal } = useApp();
  const [terminalLineIndex, setTerminalLineIndex] = useState(0);

  const heroLogo = "https://lh3.googleusercontent.com/aida-public/AB6AXuBsnhho_RfSW76AJ4zSKPX14du6gNZ1nr3iiGidABdnnysvsrGNQo7P0b8BrJ8MJuzc0EWFI20P0PW5RJRYv99MsAWoZJ1DEYH4hYVWinR0N_ZfMqsLrpNSQ5Jj7veZqZ7kXM64w07sNpBFJQRXJWa7FgCaGiYAyOxB7Pb7ydZqfpmWyJedzkDNEQZUmq7eNxjrdaFz4zVAbjH5bm-1ucfb7FuGoiGKG5QSb0iitMbU_o7cQtmOkrvnxarkvWrYMFCCpg";

  const handleEnroll = (courseId: string) => {
    const course = courses.find(c => c.id === courseId) || null;
    setSelectedCourseForEnrollment(course);
    setCurrentRoute('admission');
  };

  return (
    <div className="flex flex-col w-full bg-[#09090b]">
      {/* CINEMATIC HERO SECTION */}
      <section className="relative w-full pt-10 sm:pt-16 pb-16 overflow-hidden bg-[#09090b]">
        {/* Dynamic glow circles and telemetry atmospheric background */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[750px] h-[550px] bg-red-600/20 blur-[140px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-red-800/15 blur-[130px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Hero Left Column */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="flex items-center gap-2 self-start px-3 py-1 rounded-full bg-[#222126]/90 border border-red-500/30 backdrop-blur-md shadow-lg shadow-red-950/50">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                <span className="font-mono-code text-xs text-red-400 uppercase font-semibold tracking-wider">
                  Admissions Open • Academic Session 2026
                </span>
              </div>

              <div className="flex flex-col">
                <span className="font-mono-code text-xs text-[#e6bdba] tracking-widest uppercase">
                  Shershah Urdu Bazar • Karachi Academic Campus
                </span>
                <h1 className="font-outfit text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-[1.08] mt-2 font-black">
                  BUILD YOUR <span className="text-[#ff4a58] underline decoration-red-500/50 underline-offset-8">FUTURE</span> WITH PARADISE
                </h1>
              </div>

              <p className="font-sans-body text-sm sm:text-base text-[#e6bdba] max-w-2xl leading-relaxed">
                Karachi's premier computer and professional skills academy, delivering industry-grade practical IT diplomas, modern digital media suites, software coding, and certified medical programs.
              </p>

              {/* Quick Micro Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111114] border border-[#2d2c33] text-[#f5f5f7] font-mono-code text-xs shadow-sm">
                  <span className="material-symbols-outlined text-[#ff4a58] text-base">science</span>
                  <span>100% Practical Labs</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111114] border border-[#2d2c33] text-[#f5f5f7] font-mono-code text-xs shadow-sm">
                  <span className="material-symbols-outlined text-[#ff4a58] text-base">verified</span>
                  <span>Govt. Aligned Syllabus</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111114] border border-[#2d2c33] text-[#f5f5f7] font-mono-code text-xs shadow-sm">
                  <span className="material-symbols-outlined text-[#ff4a58] text-base">access_time</span>
                  <span>Morning &amp; Evening Shifts</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111114] border border-[#2d2c33] text-[#f5f5f7] font-mono-code text-xs shadow-sm">
                  <span className="material-symbols-outlined text-[#ff4a58] text-base">person_celebrate</span>
                  <span>1:1 Career Mentorship</span>
                </div>
              </div>

              {/* Main Call to Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <button
                  onClick={() => setCurrentRoute('admission')}
                  className="px-6 py-3 rounded-lg bg-[#d31027] text-white font-outfit text-sm font-bold uppercase tracking-wider shadow-[0_0_28px_rgba(211,16,39,0.65)] hover:shadow-[0_0_40px_rgba(211,16,39,0.95)] hover:scale-[1.02] transition-all flex items-center gap-2 border border-red-400/40 cursor-pointer"
                >
                  <span>Apply for Admission</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
                <button
                  onClick={() => setCurrentRoute('courses')}
                  className="px-5 py-3 rounded-lg bg-[#222126] hover:bg-[#323038] text-white font-outfit text-sm font-semibold transition-all shadow-md flex items-center gap-2 border border-[#2d2c33] cursor-pointer"
                >
                  <span>Explore All Courses</span>
                  <span className="material-symbols-outlined text-sm">visibility</span>
                </button>
                <button
                  onClick={() => setIsWhatsAppModalOpen(true)}
                  className="px-4 py-3 rounded-lg bg-[#18171c] hover:bg-[#1f1e24] text-[#ff4a58] font-sans-body text-sm font-medium transition-colors flex items-center gap-2 shadow-sm border border-red-500/20 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">chat</span>
                  <span className="font-mono-code text-xs text-[#f5f5f7]">Ask on WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Hero Right Column: OFFICIAL LOGO FOCAL POINT WITH AURA & FLOATING BADGES */}
            <div className="lg:col-span-5 relative flex items-center justify-center pt-8 lg:pt-0">
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center">
                {/* Animated rotating outer border halo */}
                <div className="absolute inset-0 rounded-full border border-dashed border-red-500/40 animate-spin-slow"></div>
                {/* Pulsing ambient glow circle */}
                <div className="absolute inset-4 rounded-full bg-red-600/25 blur-3xl animate-pulse"></div>

                {/* Centered Glowing Emblem Container */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-red-500 shadow-[0_0_60px_rgba(211,16,39,0.7)] overflow-hidden bg-black flex items-center justify-center animate-pulse-glow z-10">
                  <img
                    alt="Paradise Institute Logo"
                    className="w-full h-full object-cover p-2 hover:scale-105 transition-transform duration-500"
                    src={heroLogo}
                  />
                </div>

                {/* Floating Orbital Badge 1: CIT Diploma */}
                <div
                  onClick={() => handleEnroll('cit-diploma')}
                  className="absolute -top-4 -left-6 sm:-left-8 px-3.5 py-1.5 rounded-xl bg-[#222126]/95 backdrop-blur-md shadow-2xl border border-red-500/40 flex items-center gap-2 animate-float z-20 cursor-pointer hover:border-[#ff4a58]"
                >
                  <span className="material-symbols-outlined text-[#ff4a58] text-lg">terminal</span>
                  <div className="flex flex-col text-left">
                    <span className="font-outfit text-sm text-white font-bold leading-none">CIT Diploma</span>
                    <span className="font-mono-code text-[10px] text-[#ff4a58]">Info Tech Track</span>
                  </div>
                </div>

                {/* Floating Orbital Badge 2: Graphic Suite */}
                <div
                  onClick={() => handleEnroll('graphic-branding')}
                  className="absolute top-10 -right-6 sm:-right-8 px-3.5 py-1.5 rounded-xl bg-[#222126]/95 backdrop-blur-md shadow-2xl border border-red-500/40 flex items-center gap-2 animate-float-reverse z-20 cursor-pointer hover:border-[#ff4a58]"
                >
                  <span className="material-symbols-outlined text-red-400 text-lg">palette</span>
                  <div className="flex flex-col text-left">
                    <span className="font-outfit text-sm text-white font-bold leading-none">Graphic Suite</span>
                    <span className="font-mono-code text-[10px] text-[#e6bdba]">Photoshop / AI</span>
                  </div>
                </div>

                {/* Floating Orbital Badge 3: Web & Python */}
                <div
                  onClick={() => handleEnroll('web-python')}
                  className="absolute -bottom-6 -left-4 sm:-left-6 px-3.5 py-1.5 rounded-xl bg-[#222126]/95 backdrop-blur-md shadow-2xl border border-red-500/40 flex items-center gap-2 animate-float z-20 cursor-pointer hover:border-[#ff4a58]"
                >
                  <span className="material-symbols-outlined text-[#ff4a58] text-lg">code</span>
                  <div className="flex flex-col text-left">
                    <span className="font-outfit text-sm text-white font-bold leading-none">Web &amp; Python</span>
                    <span className="font-mono-code text-[10px] text-[#ff4a58]">Full-Stack Lab</span>
                  </div>
                </div>

                {/* Floating Orbital Badge 4: Medical Desk */}
                <div
                  onClick={() => handleEnroll('medical-nursing')}
                  className="absolute bottom-6 -right-6 sm:-right-10 px-3.5 py-1.5 rounded-xl bg-[#222126]/95 backdrop-blur-md shadow-2xl border border-red-500/40 flex items-center gap-2 animate-float-reverse z-20 cursor-pointer hover:border-[#ff4a58]"
                >
                  <span className="material-symbols-outlined text-red-300 text-lg">medical_services</span>
                  <div className="flex flex-col text-left">
                    <span className="font-outfit text-sm text-white font-bold leading-none">Medical Desk</span>
                    <span className="font-mono-code text-[10px] text-red-300">Clinical Training</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK METRICS RIBBON */}
      <section className="w-full bg-[#111114] py-6 border-y border-[#222126]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <span className="font-outfit text-3xl sm:text-4xl text-[#ff4a58] font-bold">12+</span>
              <span className="font-mono-code text-xs text-[#e6bdba] uppercase mt-1">Years Technical Heritage</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-outfit text-3xl sm:text-4xl text-white font-bold">4,500+</span>
              <span className="font-mono-code text-xs text-[#e6bdba] uppercase mt-1">Graduated Students</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-outfit text-3xl sm:text-4xl text-[#ff4a58] font-bold">100%</span>
              <span className="font-mono-code text-xs text-[#e6bdba] uppercase mt-1">Hands-on Workstations</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-outfit text-3xl sm:text-4xl text-white font-bold">16+</span>
              <span className="font-mono-code text-xs text-[#e6bdba] uppercase mt-1">Career Certifications</span>
            </div>
          </div>
        </div>
      </section>

      {/* INSTITUTIONAL CAPABILITIES & MISSION */}
      <section className="w-full py-16 bg-[#09090b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col max-w-2xl">
              <div className="flex items-center gap-1.5 font-mono-code text-xs text-[#ff4a58] uppercase font-bold tracking-wider">
                <span>// INSTITUTIONAL CAPABILITIES</span>
              </div>
              <h2 className="font-outfit text-2xl sm:text-3xl lg:text-4xl text-white font-bold mt-1">
                Engineered for Real-World Competence
              </h2>
              <p className="font-sans-body text-sm text-[#e6bdba] mt-2">
                Located in Urdu Bazar, Shershah, Paradise Institute bridges the gap between academic theory and practical market execution through modern hardware benches, real freelancing assignments, and certified mentors.
              </p>
            </div>
            <button
              onClick={() => setCurrentRoute('admission')}
              className="self-start md:self-auto px-4 py-2 rounded-lg bg-[#222126] hover:bg-[#d31027] hover:text-white text-[#f5f5f7] font-outfit text-sm font-semibold transition-colors flex items-center gap-2 border border-red-500/20 cursor-pointer"
            >
              <span>Admissions Guideline</span>
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </button>
          </div>

          {/* Feature Grid: 4 Interactive Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col justify-between p-6 rounded-2xl bg-[#111114] border border-[#222126] card-tilt-hover">
              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#222126] flex items-center justify-center text-[#ff4a58] shadow-md border border-red-500/20">
                  <span className="material-symbols-outlined text-2xl">badge</span>
                </div>
                <h3 className="font-outfit text-lg text-white font-bold">Industry Certified Instructors</h3>
                <p className="font-sans-body text-xs text-[#e6bdba] leading-relaxed">
                  Taught by active developers, digital designers, and hospital laboratory technicians with direct practical experience in Karachi's corporate landscape.
                </p>
              </div>
              <div className="pt-4 flex items-center gap-1 font-mono-code text-xs text-[#ff4a58]">
                <span>Verified Credentials</span>
                <span className="material-symbols-outlined text-xs">done_all</span>
              </div>
            </div>

            <div className="flex flex-col justify-between p-6 rounded-2xl bg-[#111114] border border-[#222126] card-tilt-hover">
              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#222126] flex items-center justify-center text-[#ff4a58] shadow-md border border-red-500/20">
                  <span className="material-symbols-outlined text-2xl">memory</span>
                </div>
                <h3 className="font-outfit text-lg text-white font-bold">Hardware &amp; Diagnostic Lab</h3>
                <p className="font-sans-body text-xs text-[#e6bdba] leading-relaxed">
                  Equipped with dedicated troubleshooting rigs, motherboard diagnostics, networking switches, and high-spec graphic rendering workstations.
                </p>
              </div>
              <div className="pt-4 flex items-center gap-1 font-mono-code text-xs text-[#ff4a58]">
                <span>Dual Monitor Setups</span>
                <span className="material-symbols-outlined text-xs">lan</span>
              </div>
            </div>

            <div className="flex flex-col justify-between p-6 rounded-2xl bg-[#111114] border border-[#222126] card-tilt-hover">
              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#222126] flex items-center justify-center text-[#ff4a58] shadow-md border border-red-500/20">
                  <span className="material-symbols-outlined text-2xl">currency_exchange</span>
                </div>
                <h3 className="font-outfit text-lg text-white font-bold">Freelance Launchpad</h3>
                <p className="font-sans-body text-xs text-[#e6bdba] leading-relaxed">
                  Step-by-step account setups on Upwork, Fiverr, and Daraz Seller Center. Learn bidding tactics, client communication, and local payout processing.
                </p>
              </div>
              <div className="pt-4 flex items-center gap-1 font-mono-code text-xs text-[#ff4a58]">
                <span>Monetize in 60 Days</span>
                <span className="material-symbols-outlined text-xs">trending_up</span>
              </div>
            </div>

            <div className="flex flex-col justify-between p-6 rounded-2xl bg-[#111114] border border-[#222126] card-tilt-hover">
              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#222126] flex items-center justify-center text-[#ff4a58] shadow-md border border-red-500/20">
                  <span className="material-symbols-outlined text-2xl">workspace_premium</span>
                </div>
                <h3 className="font-outfit text-lg text-white font-bold">Job Placement Support</h3>
                <p className="font-sans-body text-xs text-[#e6bdba] leading-relaxed">
                  Resume grooming, mock corporate interviews, and direct employer references across Karachi's trade hubs, medical centers, and tech agencies.
                </p>
              </div>
              <div className="pt-4 flex items-center gap-1 font-mono-code text-xs text-[#ff4a58]">
                <span>Alumni Placement Desk</span>
                <span className="material-symbols-outlined text-xs">handshake</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROGRAMS SNAPSHOT */}
      <section className="w-full py-16 bg-[#050507]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col">
              <span className="font-mono-code text-xs text-[#ff4a58] uppercase font-bold tracking-wider">
                // ACADEMIC CATALOG
              </span>
              <h2 className="font-outfit text-2xl sm:text-3xl lg:text-4xl text-white font-bold mt-1">
                Featured Career Tracks
              </h2>
            </div>
            <button
              onClick={() => setCurrentRoute('courses')}
              className="px-5 py-2.5 rounded-lg bg-[#d31027] text-white font-outfit text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2 border border-red-400/40 cursor-pointer"
            >
              <span>View Full Catalog</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          {/* Course Cards Mosaic with Rich Visual Context */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Course 1: CIT */}
            <div className="flex flex-col rounded-2xl bg-[#111114] overflow-hidden border border-[#222126] card-tilt-hover">
              <div className="relative h-48 w-full bg-[#222126] overflow-hidden">
                <img
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  alt="CIT Lab"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQGl2_8szNFWc5bHcQwcsdKl46xz9R4eO6alUcsphuwBLNBVjC9G8E7W51bFB7F5lBo46hWGi4Fxhz-XKrPmtwKQtO-LyYLf16sfL2fwPeP8cJppfyMnkJCuQEpm8nMGCCRfaj-u-dZQowMB1Ik7pkyzgavpUlqO28oISxit3l8sJe5r4qalomJSii9qmCjGD6riSgCyS6RRhOg2I01ScaRh_BMltUDgi_u-ABm3rcYhtnLRSie69g"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111114] via-[#111114]/40 to-transparent"></div>
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#09090b]/90 border border-red-500/40 font-mono-code text-[11px] text-[#ff4a58] font-bold">
                  1-YEAR DIPLOMA
                </span>
              </div>
              <div className="p-5 flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono-code text-[#e6bdba]">SBTE / Aligned Syllabus</span>
                  <span className="font-mono-code text-[#ff4a58] font-semibold">Morning &amp; Evening</span>
                </div>
                <h3 className="font-outfit text-base sm:text-lg text-white font-bold">
                  CIT (Certificate in Information Technology)
                </h3>
                <p className="font-sans-body text-xs text-[#e6bdba] line-clamp-2">
                  Comprehensive baseline covering MS Office Suite, advanced spreadsheet telemetry, database foundations, operating systems, and computer hardware diagnostics.
                </p>
                <div className="pt-2 flex items-center justify-between border-t border-[#222126]">
                  <button
                    onClick={() => handleEnroll('cit-diploma')}
                    className="font-outfit text-sm text-[#ff4a58] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Enroll in CIT</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                  <span className="font-mono-code text-xs text-[#e6bdba]">Fee: Rs. 2,500/mo</span>
                </div>
              </div>
            </div>

            {/* Course 2: Graphic Designing */}
            <div className="flex flex-col rounded-2xl bg-[#111114] overflow-hidden border border-[#222126] card-tilt-hover">
              <div className="relative h-48 w-full bg-[#222126] overflow-hidden">
                <img
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  alt="Graphic Design Suite"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXn70XiNzPizy76zyuJo1MwzPkK7pvXMlqN-coBr-bLwvAs2BRLS1MZTSFVv2VP83lwFUFNIov2p3GHaN3BStAIbaFwUtGd76NfO-3sRnpLgkyxfI3C3BPSIJZ5SA9u6rBMn8TYpNNe2F3aRkaVO_PfnhX6oNgwAYxkqy59JtHgqWkXNOKzRTYD0JkOOeIEH4kaADGut14-87ztIyXGFdY5sJw1MIeu5BDK4J1k7jrsa0GDk35TPCK"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111114] via-[#111114]/40 to-transparent"></div>
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#09090b]/90 border border-red-500/40 font-mono-code text-[11px] text-red-300 font-bold">
                  4-MONTH MASTERCLASS
                </span>
              </div>
              <div className="p-5 flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono-code text-[#e6bdba]">UI/UX &amp; Vector Arts</span>
                  <span className="font-mono-code text-red-300 font-semibold">Portfolio Driven</span>
                </div>
                <h3 className="font-outfit text-base sm:text-lg text-white font-bold">
                  Graphic Design &amp; Digital Branding
                </h3>
                <p className="font-sans-body text-xs text-[#e6bdba] line-clamp-2">
                  Master Adobe Photoshop, Illustrator, Premiere Pro, and typography layout systems. Build professional packaging, social media commercials, and brand identity portfolios.
                </p>
                <div className="pt-2 flex items-center justify-between border-t border-[#222126]">
                  <button
                    onClick={() => handleEnroll('graphic-branding')}
                    className="font-outfit text-sm text-[#ff4a58] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Enroll in Design</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                  <span className="font-mono-code text-xs text-[#e6bdba]">Includes Freelancing</span>
                </div>
              </div>
            </div>

            {/* Course 3: Medical Assistant */}
            <div className="flex flex-col rounded-2xl bg-[#111114] overflow-hidden border border-[#222126] card-tilt-hover">
              <div className="relative h-48 w-full bg-[#222126] overflow-hidden">
                <img
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  alt="Medical Care Clinic"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxJmFu9Q1PpL_ItFrPivTC0KqDNYTd1S8UuI6KB0Z_FZm7_XaQ4xU_4FebOkD4jrn79MWLyIXniURlGkBEuy2TdjMxOQ-ehO5yys9rhE816Pfj7q_Lt69TrtLkl1vVJrMQLnGZba058JzaHPQ3-trn-BGDB0qVsGk_d3-ZOcsfzdlZ0_A1tJDs-brlJeDDb3HEVsI9Kn2X7mSnmoUUuIMrvQ36TPBWZMYDusHq6dgptORN9N62J9j8"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111114] via-[#111114]/40 to-transparent"></div>
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#09090b]/90 border border-red-500/40 font-mono-code text-[11px] text-red-300 font-bold">
                  HEALTHCARE CERTIFICATION
                </span>
              </div>
              <div className="p-5 flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono-code text-[#e6bdba]">Hospital &amp; Clinical Prep</span>
                  <span className="font-mono-code text-red-300 font-semibold">Hands-on Practicum</span>
                </div>
                <h3 className="font-outfit text-base sm:text-lg text-white font-bold">
                  Medical Laboratory &amp; Nursing Care
                </h3>
                <p className="font-sans-body text-xs text-[#e6bdba] line-clamp-2">
                  Vital signs recording, pharmacy software basics, diagnostic phlebotomy samples handling, first aid response, and clinical assistant operational ethics.
                </p>
                <div className="pt-2 flex items-center justify-between border-t border-[#222126]">
                  <button
                    onClick={() => handleEnroll('medical-nursing')}
                    className="font-outfit text-sm text-[#ff4a58] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Enroll in Medical</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                  <span className="font-mono-code text-xs text-[#e6bdba]">Clinical Hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEDICATED ARTIFICIAL INTELLIGENCE & NEXT-GEN TECH SECTION */}
      <section className="w-full py-16 bg-[#09090b] relative overflow-hidden border-t border-red-500/20">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-900/10 blur-[130px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 font-mono-code text-xs text-[#ff4a58] uppercase font-bold tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#ff4a58] animate-ping"></span>
                <span>// NEXT-GEN COMPUTING &amp; INTELLIGENCE</span>
              </div>
              <h2 className="font-outfit text-2xl sm:text-3xl lg:text-4xl text-white font-extrabold mt-1">
                Artificial Intelligence &amp; Machine Learning Lab
              </h2>
              <p className="font-sans-body text-sm text-[#e6bdba] mt-2 max-w-2xl">
                Bridge the modern AI divide. Master LLM prompt formulation, autonomous agent development, computer vision, and machine learning with Python.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentRoute('courses')}
                className="px-5 py-2.5 rounded-xl bg-[#18171c] hover:bg-[#222126] text-white font-outfit text-xs font-semibold border border-[#2d2c33] cursor-pointer"
              >
                Explore All Tracks
              </button>
              <button
                onClick={() => setCurrentRoute('admission')}
                className="px-5 py-2.5 rounded-xl bg-[#d31027] hover:bg-[#ff4a58] text-white font-outfit text-xs font-bold shadow-[0_0_20px_rgba(211,16,39,0.5)] cursor-pointer"
              >
                Enroll in AI Track
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.filter(c => c.isAiCourse).map(aiCourse => (
              <div
                key={aiCourse.id}
                className="p-6 rounded-3xl bg-gradient-to-b from-[#18171c] to-[#111114] border border-red-500/30 hover:border-red-500/70 transition-all flex flex-col justify-between gap-4 shadow-xl card-tilt-hover"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-[#09090b] border border-red-500/40 text-[#ff4a58] font-mono-code text-[11px] font-bold">
                      {aiCourse.badge}
                    </span>
                    <span className="text-xs font-mono-code text-[#e6bdba]">{aiCourse.duration}</span>
                  </div>

                  <h3 className="font-outfit text-lg text-white font-bold leading-snug">
                    {aiCourse.title}
                  </h3>

                  <p className="font-sans-body text-xs text-[#e6bdba] leading-relaxed line-clamp-3">
                    {aiCourse.description}
                  </p>

                  <div className="p-3 rounded-2xl bg-[#09090b]/80 border border-[#222126] flex items-center justify-between text-xs font-mono-code">
                    <span className="text-[#e6bdba]">Admission Fee:</span>
                    <span className="text-[#ff4a58] font-bold text-sm">
                      Rs. {aiCourse.admissionFee.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-[#222126]">
                  <span className="font-mono-code text-[11px] text-[#e6bdba]">Hands-on AI Lab</span>
                  <button
                    onClick={() => handleEnroll(aiCourse.id)}
                    className="px-4 py-2 rounded-xl bg-[#d31027] hover:bg-[#ff4a58] text-white font-outfit text-xs font-bold flex items-center gap-1 shadow-md transition-all cursor-pointer"
                  >
                    <span>Apply Now</span>
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE SKILLS MATRIX & LAB TELEMETRY */}
      <section className="w-full py-16 bg-[#09090b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Telemetry Info */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="flex items-center gap-1.5 font-mono-code text-xs text-[#ff4a58] uppercase font-bold tracking-wider">
                <span>// PERFORMANCE METRICS</span>
              </div>
              <h2 className="font-outfit text-2xl sm:text-3xl lg:text-4xl text-white font-bold">
                Lab Competency Telemetry
              </h2>
              <p className="font-sans-body text-sm text-[#e6bdba]">
                Every Paradise student passes rigor tests evaluated by internal mentors and live industry review boards before receiving diplomas. Here is our graduate benchmark accuracy.
              </p>

              {/* Progress Bar Telemetry */}
              <div className="flex flex-col gap-3 pt-2">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between font-mono-code text-xs">
                    <span className="text-white font-semibold">Office Suite &amp; Data Analysis</span>
                    <span className="text-[#ff4a58] font-bold">98% Mastery</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-[#222126] overflow-hidden border border-red-950">
                    <div className="h-full bg-[#d31027] rounded-full transition-all duration-1000" style={{ width: '98%' }}></div>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between font-mono-code text-xs">
                    <span className="text-white font-semibold">Computer Hardware &amp; Troubleshooting</span>
                    <span className="text-[#ff4a58] font-bold">95% Mastery</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-[#222126] overflow-hidden border border-red-950">
                    <div className="h-full bg-[#d31027] rounded-full transition-all duration-1000" style={{ width: '95%' }}></div>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between font-mono-code text-xs">
                    <span className="text-white font-semibold">Graphic Suite (Photoshop &amp; Illustrator)</span>
                    <span className="text-[#ff4a58] font-bold">92% Mastery</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-[#222126] overflow-hidden border border-red-950">
                    <div className="h-full bg-[#d31027] rounded-full transition-all duration-1000" style={{ width: '92%' }}></div>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between font-mono-code text-xs">
                    <span className="text-white font-semibold">Digital Ads &amp; E-Commerce Store Management</span>
                    <span className="text-[#ff4a58] font-bold">90% Mastery</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-[#222126] overflow-hidden border border-red-950">
                    <div className="h-full bg-[#d31027] rounded-full transition-all duration-1000" style={{ width: '90%' }}></div>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between font-mono-code text-xs">
                    <span className="text-white font-semibold">Direct Freelance Marketplace Readiness</span>
                    <span className="text-[#ff4a58] font-bold">95% Success</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-[#222126] overflow-hidden border border-red-950">
                    <div className="h-full bg-[#ff4a58] rounded-full transition-all duration-1000" style={{ width: '95%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Telemetry Data Ring Visual & Code Shell Mockup */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="p-6 rounded-2xl bg-[#111114] border border-[#222126] shadow-2xl flex flex-col gap-4 card-tilt-hover">
                <div className="flex items-center justify-between pb-2 border-b border-[#222126]/60">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#d31027] animate-pulse"></span>
                    <span className="w-3 h-3 rounded-full bg-[#2d2c33]"></span>
                    <span className="w-3 h-3 rounded-full bg-[#2d2c33]"></span>
                    <span className="font-mono-code text-xs text-[#e6bdba] ml-2">paradise-telemetry-console v2.4</span>
                  </div>
                  <span className="font-mono-code text-[11px] text-[#ff4a58] uppercase font-bold">LIVE METRIC</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  {/* Radial SVG Gauge */}
                  <div className="relative flex flex-col items-center justify-center p-4 bg-[#18171c] rounded-xl border border-red-900/30">
                    <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 120 120">
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="transparent"
                        stroke="#222126"
                        strokeWidth="10"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="transparent"
                        stroke="#d31027"
                        strokeWidth="10"
                        strokeDasharray="314"
                        strokeDashoffset="15.7"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-outfit text-3xl text-white font-extrabold leading-none">95%</span>
                      <span className="font-mono-code text-[10px] text-[#ff4a58] uppercase mt-1">Lab Efficiency</span>
                    </div>
                  </div>

                  {/* Terminal Diagnostic Stream */}
                  <div className="flex flex-col gap-1.5 font-mono-code text-xs text-[#e6bdba] bg-black p-4 rounded-xl border border-red-950">
                    <div className="text-[#ff4a58] font-bold">$ sys.verify_graduates()</div>
                    <div className="text-white">&gt; CIT Lab Benches: ACTIVE</div>
                    <div className="text-white">&gt; Graphic Stations: ONLINE</div>
                    <div className="text-white">&gt; Direct Wi-Fi Backbone: OK</div>
                    <div className="text-white">&gt; Power Backup Genset: READY</div>
                    <div className="text-red-200 mt-1 font-semibold">&gt;&gt; Ready for Next Batch</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#18171c] flex items-center justify-between border border-[#2d2c33]">
                  <span className="font-sans-body text-xs text-[#f5f5f7]">Experience individual attention on high-speed PC workstations.</span>
                  <button
                    onClick={() => setCurrentRoute('admission')}
                    className="px-3 py-1.5 rounded bg-[#d31027] text-white font-mono-code text-xs font-bold hover:scale-105 transition-transform shadow-[0_0_12px_rgba(211,16,39,0.5)] cursor-pointer"
                  >
                    Claim Desk
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CENTRAL APPLICATION CHECKER BOX */}
      <section className="w-full py-10 bg-[#09090b] border-t border-[#222126]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ApplicationCheckerBox
            onNavigateAdmission={() => setCurrentRoute('admission')}
            onNavigateJobs={() => setCurrentRoute('jobs')}
          />
        </div>
      </section>

      {/* CAMPUS, SOCIAL & CONTACT SECTION */}
      <section className="w-full py-16 bg-[#050507]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
          <div className="flex flex-col max-w-2xl">
            <span className="font-mono-code text-xs text-[#ff4a58] uppercase font-bold tracking-wider">
              // PHYSICAL LOCATION &amp; HELPDESK
            </span>
            <h2 className="font-outfit text-2xl sm:text-3xl lg:text-4xl text-white font-bold mt-1">
              Visit Paradise Institute Campus
            </h2>
            <p className="font-sans-body text-sm text-[#e6bdba] mt-1">
              Located centrally at Street #63, Urdu Bazar, Shershah, Karachi. Walk in during visiting hours for free career counseling with faculty heads.
            </p>
          </div>

          {/* Campus Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Interactive Map Container */}
            <div className="lg:col-span-7 rounded-2xl overflow-hidden shadow-2xl relative min-h-[360px] bg-[#18171c] border border-[#222126]">
              <div
                className="w-full h-full min-h-[360px] bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBtK-j4DBE6p-ZMB5Lls5_g2YVHKbQajdaA8YT8tTK9TkMfca_8GQKeZvNJ9H77-5uLmoyl1H9TWvOmtoTE1yEZtijuXDBacgtkEIdyYhB_-GWth-LDB8RlAxe8nd8UM3VXWcQaFuo39Skg5BCHkvHWCYtpUFqIzbqWcw0Hla0tUerz0Z7JI-iQ-EA606iNcmCd_ZhhFeGaGaGVjjB_FFnAZ8DQrl2C1l-tb7mfUeFz3VCKKKmuvp2w')`
                }}
              ></div>
              <div className="absolute top-4 left-4 p-3 rounded-xl bg-black/90 backdrop-blur-md shadow-xl flex items-center gap-3 border border-red-500/40">
                <span className="w-3 h-3 rounded-full bg-red-500 animate-ping"></span>
                <div className="flex flex-col">
                  <span className="font-outfit text-sm text-white font-bold">Paradise Institute Building</span>
                  <span className="font-mono-code text-[11px] text-[#e6bdba]">Street #63, Urdu Bazar, Shershah, Karachi</span>
                </div>
              </div>
            </div>

            {/* Contact Cards & Timings */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              <div className="p-6 rounded-2xl bg-[#111114] border border-[#222126] shadow-md flex flex-col gap-4">
                <div className="flex items-center gap-3 pb-3 border-b border-[#222126]/60">
                  <span className="material-symbols-outlined text-[#ff4a58] text-2xl">pin_drop</span>
                  <div className="flex flex-col">
                    <span className="font-outfit text-sm text-white font-bold">Official Campus Address</span>
                    <span className="font-sans-body text-xs text-[#e6bdba]">Street #63, Urdu Bazar, Shershah, Karachi</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#18171c] border border-[#2d2c33] flex flex-col gap-1">
                    <span className="font-mono-code text-xs text-[#ff4a58] font-semibold">Direct Helpline</span>
                    <a href="tel:03209061656" className="font-outfit text-base text-white hover:text-[#ff4a58] font-bold transition-colors">
                      0320-9061656
                    </a>
                    <span className="font-sans-body text-xs text-[#e6bdba]">Academic Counselor</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#18171c] border border-[#2d2c33] flex flex-col gap-1">
                    <span className="font-mono-code text-xs text-[#ff4a58] font-semibold">Secondary Line</span>
                    <a href="tel:03199819503" className="font-outfit text-base text-white hover:text-[#ff4a58] font-bold transition-colors">
                      0319-9819503
                    </a>
                    <span className="font-sans-body text-xs text-[#e6bdba]">Helpdesk &amp; Inquiry</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-[#18171c] border border-[#2d2c33]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#ff4a58] text-base">schedule</span>
                    <span className="font-sans-body text-xs text-white font-medium">Visiting Hours:</span>
                  </div>
                  <span className="font-mono-code text-xs text-[#ff4a58] font-bold">Mon - Sat: 9:00 AM - 9:00 PM</span>
                </div>
              </div>

              {/* Official TikTok Banner */}
              <div className="p-5 rounded-2xl bg-[#111114] border border-[#222126] shadow-md flex items-center justify-between gap-4 card-tilt-hover">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#222126] border border-red-500/30 flex items-center justify-center text-[#ff4a58] shadow-md shrink-0">
                    <span className="material-symbols-outlined text-2xl">movie</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-outfit text-sm text-white font-bold">TikTok Official Campus</span>
                    <span className="font-mono-code text-xs text-[#ff4a58]">@paradise_shershah</span>
                    <span className="font-sans-body text-[11px] text-[#e6bdba]">Follow lab clips, student projects &amp; award ceremonies.</span>
                  </div>
                </div>
                <a
                  href="https://www.tiktok.com/@paradise_shershah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-[#d31027] text-white font-outfit text-xs font-bold hover:scale-105 transition-transform flex items-center gap-1 shadow-md border border-red-400/40 shrink-0"
                >
                  <span>Follow</span>
                  <span className="material-symbols-outlined text-xs">open_in_new</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAMPUS SYSTEM STATUS STRIP */}
      <section className="w-full bg-[#0a0a0d] py-3 border-t border-[#1e1c24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-mono-code text-xs text-[#8e8d96]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Campus Terminal Online • Academic Session 2026 • Street #63 Shershah</span>
          </div>
          <button
            onClick={() => setShowAdminAuthModal(true)}
            className="flex items-center gap-1.5 font-mono-code text-xs text-[#8e8d96] hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-xs">lock</span>
            <span>Staff Node</span>
          </button>
        </div>
      </section>
    </div>
  );
};
