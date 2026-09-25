import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { TeacherOpening, JobApplication } from '../types';
import { ConfettiEffect } from '../components/ConfettiEffect';
import { ApplicationCheckerBox } from '../components/ApplicationCheckerBox';

export const CareersPage: React.FC = () => {
  const {
    teacherOpenings,
    selectedJobForApplication,
    submitJobApplication,
    lastSubmittedJobApp,
    setLastSubmittedJobApp,
    setCurrentRoute
  } = useApp();

  const [selectedJobId, setSelectedJobId] = useState<string>(
    selectedJobForApplication ? selectedJobForApplication.id : teacherOpenings[0]?.id || 'job-cit-01'
  );

  const [candidateName, setCandidateName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [cnic, setCnic] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [cityArea, setCityArea] = useState('Shershah, Karachi');
  const [highestDegree, setHighestDegree] = useState('BSCS / MCS / Computer Science');
  const [teachingExperienceYears, setTeachingExperienceYears] = useState('2-3 Years');
  const [pastInstitutes, setPastInstitutes] = useState('');
  const [coreSkills, setCoreSkills] = useState('');
  const [portfolioOrCvLink, setPortfolioOrCvLink] = useState('');
  const [availableShift, setAvailableShift] = useState<JobApplication['availableShift']>('Morning Shift');
  const [expectedSalary, setExpectedSalary] = useState('Rs. 40,000 - 50,000');

  const [formSubmitted, setFormSubmitted] = useState<JobApplication | null>(lastSubmittedJobApp);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedJobId, setCopiedJobId] = useState(false);
  const [copiedPin, setCopiedPin] = useState(false);

  useEffect(() => {
    if (selectedJobForApplication) {
      setSelectedJobId(selectedJobForApplication.id);
    }
  }, [selectedJobForApplication]);

  const activeJob = teacherOpenings.find(j => j.id === selectedJobId) || teacherOpenings[0];

  const experienceOptions = [
    'Fresh / Less than 1 Year',
    '1-2 Years Teaching Experience',
    '2-3 Years Teaching Experience',
    '3-5 Years Teaching Experience',
    '5+ Years Senior Instructor'
  ];

  const degreeOptions = [
    'Intermediate / DIT / Certified Trainer',
    'Graduation (BA / B.Com / B.Sc)',
    'BSCS / BS Software Engineering / IT',
    'MCS / MS Computer Science',
    'Bachelor of Visual Arts / Graphic Design Degree',
    'Diploma in Nursing / Medical Lab Tech / MBBS / Pharm-D'
  ];

  const karachiAreas = [
    'Shershah, Karachi',
    'SITE Industrial Area',
    'Lyari / Kharadar',
    'Baldia Town / Saeedabad',
    'Orangi Town / Banaras',
    'Saddar / Tower',
    'Nazimabad / Golimar',
    'North Nazimabad / Federal B Area'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName.trim() || !fatherName.trim() || !phone.trim()) {
      alert('Please fill out mandatory candidate details.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newJob = submitJobApplication({
        candidateName: candidateName.trim(),
        fatherName: fatherName.trim(),
        gender,
        cnic: cnic.trim() || 'Pending Verification',
        phone: phone.trim(),
        whatsapp: (whatsapp.trim() || phone.trim()),
        email: email.trim(),
        cityArea,
        jobOpeningId: activeJob.id,
        jobTitle: activeJob.title,
        highestDegree,
        teachingExperienceYears,
        pastInstitutes: pastInstitutes.trim() || 'Private coaching / Freelance training',
        coreSkills: coreSkills.trim() || 'Practical Lab Instruction & Curriculum Delivery',
        portfolioOrCvLink: portfolioOrCvLink.trim(),
        availableShift,
        expectedSalary: expectedSalary.trim(),
        notes: `Applied for ${activeJob.title}. Exp: ${teachingExperienceYears}. Degree: ${highestDegree}.`
      });

      setFormSubmitted(newJob);
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 700);
  };

  const handleCopy = () => {
    if (formSubmitted) {
      navigator.clipboard.writeText(formSubmitted.applicationNumber);
      setCopiedJobId(true);
      setTimeout(() => setCopiedJobId(false), 2000);
    }
  };

  const handleReset = () => {
    setFormSubmitted(null);
    setLastSubmittedJobApp(null);
    setCandidateName('');
    setFatherName('');
    setCnic('');
    setPhone('');
    setWhatsapp('');
    setEmail('');
    setPastInstitutes('');
    setCoreSkills('');
    setPortfolioOrCvLink('');
  };

  const logoSrc = "https://lh3.googleusercontent.com/aida-public/AB6AXuBsnhho_RfSW76AJ4zSKPX14du6gNZ1nr3iiGidABdnnysvsrGNQo7P0b8BrJ8MJuzc0EWFI20P0PW5RJRYv99MsAWoZJ1DEYH4hYVWinR0N_ZfMqsLrpNSQ5Jj7veZqZ7kXM64w07sNpBFJQRXJWa7FgCaGiYAyOxB7Pb7ydZqfpmWyJedzkDNEQZUmq7eNxjrdaFz4zVAbjH5bm-1ucfb7FuGoiGKG5QSb0iitMbU_o7cQtmOkrvnxarkvWrYMFCCpg";

  return (
    <div className="w-full bg-[#09090b] py-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">

        {/* ========================================================================= */}
        {/* IF APPLICATION SUBMITTED: CELEBRATORY TEACHING SUCCESS SCREEN */}
        {/* ========================================================================= */}
        {formSubmitted ? (
          <>
            <ConfettiEffect />
            <div className="flex flex-col gap-8 animate-in fade-in zoom-in-95 duration-500 max-w-4xl mx-auto w-full">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-950/80 via-[#18171c] to-emerald-950/80 border-2 border-red-500/50 p-8 shadow-[0_0_50px_rgba(211,16,39,0.4)] text-center flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.5)] animate-bounce">
                  <span className="material-symbols-outlined text-4xl text-emerald-400 font-bold">
                    badge
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 font-mono-code text-xs font-bold border border-emerald-500/40 uppercase tracking-widest">
                    Faculty Application Registered
                  </span>
                  <h1 className="font-outfit text-3xl sm:text-4xl text-white font-black mt-2">
                    Application Received, {formSubmitted.candidateName}!
                  </h1>
                  <p className="font-sans-body text-sm text-[#e6bdba] mt-1 max-w-lg">
                    Your teaching application for <strong className="text-white">{formSubmitted.jobTitle}</strong> has been transmitted to Paradise Institute Campus Administration.
                  </p>
                </div>

                {/* Reference ID and 6-Digit PIN cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                  <div className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-[#09090b]/90 border border-red-500/40">
                    <span className="font-mono-code text-[11px] text-[#e6bdba]">FACULTY TRACKING ID:</span>
                    <span className="font-mono-code text-lg sm:text-xl font-extrabold text-[#ff4a58] tracking-wider my-0.5">
                      {formSubmitted.applicationNumber}
                    </span>
                    <button
                      onClick={handleCopy}
                      className="px-2.5 py-0.5 rounded-lg bg-[#222126] hover:bg-[#323038] text-white font-mono-code text-[11px] flex items-center gap-1 border border-[#2d2c33] transition-colors cursor-pointer mt-1"
                    >
                      <span className="material-symbols-outlined text-xs">
                        {copiedJobId ? 'check' : 'content_copy'}
                      </span>
                      <span>{copiedJobId ? 'Copied' : 'Copy Tracking ID'}</span>
                    </button>
                  </div>

                  <div className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                    <span className="font-mono-code text-[11px] text-cyan-300 font-bold">6-DIGIT VERIFICATION PIN:</span>
                    <span className="font-mono-code text-2xl font-black text-cyan-400 tracking-widest my-0.5">
                      {formSubmitted.securityPin}
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(formSubmitted.securityPin);
                        setCopiedPin(true);
                        setTimeout(() => setCopiedPin(false), 2000);
                      }}
                      className="px-2.5 py-0.5 rounded-lg bg-cyan-900/60 hover:bg-cyan-800 text-cyan-200 font-mono-code text-[11px] flex items-center gap-1 border border-cyan-500/40 transition-colors cursor-pointer mt-1"
                    >
                      <span className="material-symbols-outlined text-xs">
                        {copiedPin ? 'check' : 'content_copy'}
                      </span>
                      <span>{copiedPin ? 'Copied' : 'Copy 6-Digit PIN'}</span>
                    </button>
                  </div>
                </div>

                {/* WhatsApp Direct HR Contact & Status Check */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <a
                    href={`https://wa.me/923209061656?text=${encodeURIComponent(
                      `Assalam-o-Alaikum Paradise Institute HR & Administration!\n\n` +
                      `I have submitted my Teaching Job Application for Academic Session 2026.\n` +
                      `📋 Reference ID: ${formSubmitted.applicationNumber}\n` +
                      `🔑 6-Digit Security PIN: ${formSubmitted.securityPin}\n` +
                      `👤 Name: ${formSubmitted.candidateName}\n` +
                      `💼 Position: ${formSubmitted.jobTitle}\n` +
                      `🎓 Qualification: ${formSubmitted.highestDegree}\n` +
                      `⏳ Experience: ${formSubmitted.teachingExperienceYears}\n` +
                      `🕒 Available Shift: ${formSubmitted.availableShift}\n\n` +
                      `I am attaching my detailed resume/CV for your review.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-outfit text-sm font-bold shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-lg">chat</span>
                    <span>Send CV on WhatsApp (0320-9061656)</span>
                  </a>

                  <button
                    onClick={() => setCurrentRoute('tracker')}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-outfit text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-lg">fact_check</span>
                    <span>Track Status &amp; Submit Questions</span>
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="px-5 py-3 rounded-xl bg-white text-black hover:bg-gray-200 font-outfit text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-lg">print</span>
                    <span>Print Application Slip</span>
                  </button>
                </div>
              </div>

              {/* Printable Application Dossier */}
              <div className="p-8 rounded-3xl bg-[#111114] border-2 border-red-500/50 shadow-2xl flex flex-col gap-5 print:bg-white print:text-black print:border-black">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-[#222126] print:border-gray-400">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-black flex items-center justify-center border-2 border-red-500 shadow-md shrink-0">
                      <img src={logoSrc} alt="Logo" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h2 className="font-outfit text-lg font-black text-white print:text-black">
                        PARADISE INSTITUTE OF COMPUTER EDUCATION
                      </h2>
                      <span className="font-mono-code text-xs text-[#ff4a58] font-bold block">
                        FACULTY RECRUITMENT &amp; TEACHING APPLICATION DOSSIER (2026)
                      </span>
                    </div>
                  </div>

                  <div className="text-right font-mono-code p-2.5 bg-[#18171c] print:bg-gray-100 rounded-xl border border-[#2d2c33]">
                    <div className="text-[10px] text-[#e6bdba] print:text-gray-500">APPLICATION NO</div>
                    <div className="text-lg text-[#ff4a58] print:text-red-700 font-bold">{formSubmitted.applicationNumber}</div>
                    <div className="text-[10px] text-cyan-400 font-bold">PIN: {formSubmitted.securityPin}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 font-mono-code text-xs">
                  <div className="p-3 rounded-xl bg-[#18171c] border border-[#2d2c33]">
                    <span className="text-[#e6bdba] text-[10px] block">CANDIDATE NAME</span>
                    <span className="text-white font-bold">{formSubmitted.candidateName}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#18171c] border border-[#2d2c33]">
                    <span className="text-[#e6bdba] text-[10px] block">APPLIED POSITION</span>
                    <span className="text-[#ff4a58] font-bold">{formSubmitted.jobTitle}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#18171c] border border-[#2d2c33]">
                    <span className="text-[#e6bdba] text-[10px] block">TEACHING EXPERIENCE</span>
                    <span className="text-white font-bold">{formSubmitted.teachingExperienceYears}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#18171c] border border-[#2d2c33]">
                    <span className="text-[#e6bdba] text-[10px] block">HIGHEST QUALIFICATION</span>
                    <span className="text-white font-bold">{formSubmitted.highestDegree}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#18171c] border border-[#2d2c33]">
                    <span className="text-[#e6bdba] text-[10px] block">CONTACT CELL</span>
                    <span className="text-white font-bold">{formSubmitted.phone}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#18171c] border border-[#2d2c33]">
                    <span className="text-[#e6bdba] text-[10px] block">PREFERRED SHIFT</span>
                    <span className="text-white font-bold">{formSubmitted.availableShift}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#18171c] border border-[#2d2c33] font-mono-code text-xs">
                  <span className="text-[#e6bdba] text-[10px] block mb-1">CORE EXPERTISE &amp; PREVIOUS INSTITUTES</span>
                  <p className="text-white">{formSubmitted.coreSkills} — {formSubmitted.pastInstitutes}</p>
                </div>

                <div className="pt-2 flex justify-between items-center print:hidden">
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 rounded-lg bg-[#18171c] hover:bg-[#222126] text-white text-xs font-outfit border border-[#2d2c33] cursor-pointer"
                  >
                    + Submit Another Teacher Application
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* ========================================================================= */
          /* TEACHING CAREERS SHOWCASE & APPLICATION FORM */
          /* ========================================================================= */
          <>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#222126] pb-6">
              <div>
                <div className="flex items-center gap-2 font-mono-code text-xs text-[#ff4a58] uppercase font-bold tracking-wider">
                  <span>// FACULTY RECRUITMENT 2026</span>
                </div>
                <h1 className="font-outfit text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold mt-1">
                  Teachers &amp; Instructors Required
                </h1>
                <p className="font-sans-body text-sm text-[#e6bdba] mt-2 max-w-2xl">
                  Join Karachi's premier IT &amp; professional skills institution. We are expanding our academic faculty for computer technologies, graphic arts, healthcare, and artificial intelligence.
                </p>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18171c] border border-emerald-500/40">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="font-mono-code text-xs text-white font-bold">
                  {teacherOpenings.filter(j => j.isOpen).length} Active Positions Open
                </span>
              </div>
            </div>

            {/* OPEN POSITIONS SHOWCASE CARDS */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="font-outfit text-xl font-bold text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#ff4a58]">work</span>
                  <span>Current Teaching Vacancies (Shershah Campus)</span>
                </h2>
                <span className="font-mono-code text-xs text-[#e6bdba]">Walk-in Demo Classes Available</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teacherOpenings.map(job => {
                  const isSelected = selectedJobId === job.id;
                  return (
                    <div
                      key={job.id}
                      className={`p-6 rounded-3xl border transition-all flex flex-col justify-between gap-4 ${
                        isSelected
                          ? 'bg-gradient-to-br from-red-950/60 to-[#18171c] border-[#ff4a58] shadow-[0_0_25px_rgba(211,16,39,0.3)] ring-1 ring-[#ff4a58]'
                          : 'bg-[#111114] border-[#222126] hover:border-red-500/40'
                      }`}
                    >
                      <div className="flex flex-col gap-2.5">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="px-2.5 py-1 rounded-md bg-[#18171c] border border-red-500/40 text-[#ff4a58] font-mono-code text-[11px] font-bold">
                              {job.department}
                            </span>
                            <h3 className="font-outfit text-lg font-bold text-white mt-2 leading-snug">
                              {job.title}
                            </h3>
                          </div>
                          <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono-code font-bold ${
                            job.isOpen ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' : 'bg-red-950 text-red-400 border border-red-500/40'
                          }`}>
                            {job.isOpen ? 'HIRING NOW' : 'FILLED'}
                          </span>
                        </div>

                        <p className="font-sans-body text-xs text-[#e6bdba] leading-relaxed">
                          {job.description}
                        </p>

                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#222126] font-mono-code text-[11px]">
                          <div>
                            <span className="text-[#e6bdba] block text-[10px]">EXPERIENCE:</span>
                            <span className="text-white font-semibold">{job.experienceRequired}</span>
                          </div>
                          <div>
                            <span className="text-[#e6bdba] block text-[10px]">SALARY PACKAGE:</span>
                            <span className="text-[#ff4a58] font-bold">{job.salaryRange}</span>
                          </div>
                          <div>
                            <span className="text-[#e6bdba] block text-[10px]">QUALIFICATION:</span>
                            <span className="text-white font-semibold">{job.qualificationRequired}</span>
                          </div>
                          <div>
                            <span className="text-[#e6bdba] block text-[10px]">BATCH SHIFTS:</span>
                            <span className="text-white font-semibold">{job.shifts}</span>
                          </div>
                        </div>

                        {/* Requirements bullets */}
                        <div className="flex flex-col gap-1 pt-1">
                          <span className="font-mono-code text-[10px] text-[#ff4a58] font-bold uppercase">Candidate Profile:</span>
                          {job.keyRequirements.map((req, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-xs text-[#e6bdba] font-sans-body">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#ff4a58] shrink-0"></span>
                              <span>{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedJobId(job.id);
                          const formEl = document.getElementById('teacher-application-form');
                          if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`w-full py-2.5 rounded-xl font-outfit text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'bg-[#d31027] text-white shadow-[0_0_15px_rgba(211,16,39,0.5)]'
                            : 'bg-[#18171c] hover:bg-[#222126] text-white border border-[#2d2c33]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm">edit_note</span>
                        <span>{isSelected ? 'Selected Position (Fill Form Below)' : 'Apply for this Teaching Job'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ========================================================================= */}
            {/* TEACHER APPLICATION FORM (MATCHING ATTRACTIVE ADMISSION FORM STYLE) */}
            {/* ========================================================================= */}
            <div id="teacher-application-form" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6">
              <form onSubmit={handleSubmit} className="lg:col-span-8 flex flex-col gap-6">

                {/* Step 1: Position Verification */}
                <div className="p-6 sm:p-7 rounded-3xl bg-[#111114] border border-[#222126] shadow-xl flex flex-col gap-4">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-[#222126]">
                    <span className="w-7 h-7 rounded-full bg-[#d31027] text-white font-mono-code text-xs flex items-center justify-center font-bold shadow-md">
                      1
                    </span>
                    <h3 className="font-outfit text-lg text-white font-bold">
                      Teaching Role Applied For
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono-code text-xs text-[#e6bdba] mb-1.5 font-semibold">
                        Select Vacancy *
                      </label>
                      <select
                        value={selectedJobId}
                        onChange={(e) => setSelectedJobId(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#18171c] border border-[#2d2c33] text-white font-sans-body text-xs focus:outline-none focus:border-[#ff4a58]"
                      >
                        {teacherOpenings.map(job => (
                          <option key={job.id} value={job.id}>{job.title}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-mono-code text-xs text-[#e6bdba] mb-1.5 font-semibold">
                        Your Teaching Availability *
                      </label>
                      <select
                        value={availableShift}
                        onChange={(e) => setAvailableShift(e.target.value as any)}
                        className="w-full px-4 py-3 rounded-xl bg-[#18171c] border border-[#2d2c33] text-white font-sans-body text-xs focus:outline-none focus:border-[#ff4a58]"
                      >
                        <option value="Morning Shift">Morning Shift (9:00 AM - 1:00 PM)</option>
                        <option value="Afternoon Shift">Afternoon Shift (1:00 PM - 5:00 PM)</option>
                        <option value="Evening Shift">Evening Shift (4:00 PM - 9:00 PM)</option>
                        <option value="Any Shift">Flexible / Any Shift</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Step 2: Personal Details */}
                <div className="p-6 sm:p-7 rounded-3xl bg-[#111114] border border-[#222126] shadow-xl flex flex-col gap-4">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-[#222126]">
                    <span className="w-7 h-7 rounded-full bg-[#d31027] text-white font-mono-code text-xs flex items-center justify-center font-bold shadow-md">
                      2
                    </span>
                    <h3 className="font-outfit text-lg text-white font-bold">
                      Instructor Personal Identification
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono-code text-xs text-[#e6bdba] mb-1.5 font-semibold">
                        Teacher Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={candidateName}
                        onChange={(e) => setCandidateName(e.target.value)}
                        placeholder="e.g. Engr. Muhammad Tariq"
                        className="w-full px-4 py-3 rounded-xl bg-[#18171c] border border-[#2d2c33] text-white font-sans-body text-xs focus:outline-none focus:border-[#ff4a58]"
                      />
                    </div>

                    <div>
                      <label className="block font-mono-code text-xs text-[#e6bdba] mb-1.5 font-semibold">
                        Father / Guardian Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fatherName}
                        onChange={(e) => setFatherName(e.target.value)}
                        placeholder="e.g. Abdul Ghaffar"
                        className="w-full px-4 py-3 rounded-xl bg-[#18171c] border border-[#2d2c33] text-white font-sans-body text-xs focus:outline-none focus:border-[#ff4a58]"
                      />
                    </div>

                    <div>
                      <label className="block font-mono-code text-xs text-[#e6bdba] mb-1.5 font-semibold">
                        Gender
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setGender('male')}
                          className={`py-2.5 px-3 rounded-xl font-mono-code text-xs flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                            gender === 'male'
                              ? 'bg-[#d31027] text-white border-red-400 font-bold shadow-md'
                              : 'bg-[#18171c] text-[#e6bdba] border-[#2d2c33]'
                          }`}
                        >
                          <span className="material-symbols-outlined text-sm">male</span>
                          <span>Male</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setGender('female')}
                          className={`py-2.5 px-3 rounded-xl font-mono-code text-xs flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                            gender === 'female'
                              ? 'bg-[#d31027] text-white border-red-400 font-bold shadow-md'
                              : 'bg-[#18171c] text-[#e6bdba] border-[#2d2c33]'
                          }`}
                        >
                          <span className="material-symbols-outlined text-sm">female</span>
                          <span>Female</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono-code text-xs text-[#e6bdba] mb-1.5 font-semibold">
                        CNIC Number *
                      </label>
                      <input
                        type="text"
                        required
                        value={cnic}
                        onChange={(e) => setCnic(e.target.value)}
                        placeholder="42401-XXXXXXX-X"
                        className="w-full px-4 py-3 rounded-xl bg-[#18171c] border border-[#2d2c33] text-white font-sans-body text-xs focus:outline-none focus:border-[#ff4a58]"
                      />
                    </div>

                    <div>
                      <label className="block font-mono-code text-xs text-[#e6bdba] mb-1.5 font-semibold">
                        Contact Cell Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0320-XXXXXXX"
                        className="w-full px-4 py-3 rounded-xl bg-[#18171c] border border-[#2d2c33] text-white font-sans-body text-xs focus:outline-none focus:border-[#ff4a58]"
                      />
                    </div>

                    <div>
                      <label className="block font-mono-code text-xs text-[#e6bdba] mb-1.5 font-semibold">
                        WhatsApp Number (for Demo schedule)
                      </label>
                      <input
                        type="tel"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="0320-XXXXXXX"
                        className="w-full px-4 py-3 rounded-xl bg-[#18171c] border border-[#2d2c33] text-white font-sans-body text-xs focus:outline-none focus:border-[#ff4a58]"
                      />
                    </div>
                  </div>
                </div>

                {/* Step 3: Teaching Credentials & Experience Details */}
                <div className="p-6 sm:p-7 rounded-3xl bg-[#111114] border border-[#222126] shadow-xl flex flex-col gap-4">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-[#222126]">
                    <span className="w-7 h-7 rounded-full bg-[#d31027] text-white font-mono-code text-xs flex items-center justify-center font-bold shadow-md">
                      3
                    </span>
                    <h3 className="font-outfit text-lg text-white font-bold">
                      Teaching Experience &amp; Academic Credentials
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono-code text-xs text-[#e6bdba] mb-1.5 font-semibold">
                        Years of Teaching Experience *
                      </label>
                      <select
                        value={teachingExperienceYears}
                        onChange={(e) => setTeachingExperienceYears(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#18171c] border border-[#2d2c33] text-white font-sans-body text-xs focus:outline-none focus:border-[#ff4a58]"
                      >
                        {experienceOptions.map((exp, idx) => (
                          <option key={idx} value={exp}>{exp}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-mono-code text-xs text-[#e6bdba] mb-1.5 font-semibold">
                        Highest Academic Degree *
                      </label>
                      <select
                        value={highestDegree}
                        onChange={(e) => setHighestDegree(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#18171c] border border-[#2d2c33] text-white font-sans-body text-xs focus:outline-none focus:border-[#ff4a58]"
                      >
                        {degreeOptions.map((deg, idx) => (
                          <option key={idx} value={deg}>{deg}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono-code text-xs text-[#e6bdba] mb-1.5 font-semibold">
                      Previous Institutes / Academies Taught At
                    </label>
                    <input
                      type="text"
                      value={pastInstitutes}
                      onChange={(e) => setPastInstitutes(e.target.value)}
                      placeholder="e.g. Arena Multimedia, Shershah Academy, Aptech, etc."
                      className="w-full px-4 py-3 rounded-xl bg-[#18171c] border border-[#2d2c33] text-white font-sans-body text-xs focus:outline-none focus:border-[#ff4a58]"
                    />
                  </div>

                  <div>
                    <label className="block font-mono-code text-xs text-[#e6bdba] mb-1.5 font-semibold">
                      Key Software &amp; Subject Competencies *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={coreSkills}
                      onChange={(e) => setCoreSkills(e.target.value)}
                      placeholder="e.g. Advanced MS Excel, Access databases, Python programming, Adobe Illustrator, or Phlebotomy diagnostic practicals..."
                      className="w-full px-4 py-3 rounded-xl bg-[#18171c] border border-[#2d2c33] text-white font-sans-body text-xs focus:outline-none focus:border-[#ff4a58]"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono-code text-xs text-[#e6bdba] mb-1.5 font-semibold">
                        Expected Monthly Salary (PKR)
                      </label>
                      <input
                        type="text"
                        value={expectedSalary}
                        onChange={(e) => setExpectedSalary(e.target.value)}
                        placeholder="e.g. Rs. 45,000"
                        className="w-full px-4 py-3 rounded-xl bg-[#18171c] border border-[#2d2c33] text-white font-sans-body text-xs focus:outline-none focus:border-[#ff4a58]"
                      />
                    </div>

                    <div>
                      <label className="block font-mono-code text-xs text-[#e6bdba] mb-1.5 font-semibold">
                        Portfolio / CV / LinkedIn Link
                      </label>
                      <input
                        type="url"
                        value={portfolioOrCvLink}
                        onChange={(e) => setPortfolioOrCvLink(e.target.value)}
                        placeholder="https://drive.google.com/... or linkedin.com/in/..."
                        className="w-full px-4 py-3 rounded-xl bg-[#18171c] border border-[#2d2c33] text-white font-sans-body text-xs focus:outline-none focus:border-[#ff4a58]"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Application Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#d31027] via-[#ff4a58] to-[#d31027] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 text-white font-outfit text-base font-black uppercase tracking-wider shadow-[0_0_35px_rgba(211,16,39,0.7)] transition-all flex items-center justify-center gap-2 border border-red-400/50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
                      <span>Processing Faculty Application...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Teaching Application</span>
                      <span className="material-symbols-outlined text-xl">send</span>
                    </>
                  )}
                </button>
              </form>

              {/* Sidebar: Requirements & Interview Process */}
              <div className="lg:col-span-4 flex flex-col gap-6 sticky top-24">
                <div className="p-6 rounded-3xl bg-[#111114] border border-[#222126] shadow-xl flex flex-col gap-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-[#222126]">
                    <span className="material-symbols-outlined text-[#ff4a58]">verified_user</span>
                    <h3 className="font-outfit text-base text-white font-bold">
                      Hiring Standards &amp; Process
                    </h3>
                  </div>

                  <div className="flex flex-col gap-3 font-mono-code text-xs text-[#e6bdba]">
                    <div className="p-3 rounded-xl bg-[#18171c] border border-[#2d2c33] flex flex-col gap-1">
                      <span className="text-white font-bold text-xs">1. Online Application Screening</span>
                      <span className="text-[11px]">Academic team reviews your credentials within 24 hours.</span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#18171c] border border-[#2d2c33] flex flex-col gap-1">
                      <span className="text-white font-bold text-xs">2. 15-Minute Demo Lecture</span>
                      <span className="text-[11px]">Conduct a practical topic demo in our Shershah computer lab.</span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#18171c] border border-[#2d2c33] flex flex-col gap-1">
                      <span className="text-white font-bold text-xs">3. Formal Contract &amp; Induction</span>
                      <span className="text-[11px]">Competitive salary package with punctuality bonuses.</span>
                    </div>
                  </div>

                  <div className="pt-2 text-center font-mono-code text-[11px] text-[#e6bdba]">
                    Campus Address: Street #63, Urdu Bazar, Shershah, Karachi.
                  </div>
                </div>

                {/* Direct HR Line Card */}
                <div className="p-6 rounded-3xl bg-[#111114] border border-[#222126] flex flex-col gap-3">
                  <span className="font-mono-code text-xs text-[#ff4a58] font-bold">
                    Faculty Coordinator Desk
                  </span>
                  <p className="font-sans-body text-xs text-[#e6bdba]">
                    Contact campus director Sir Tariq for immediate faculty queries:
                  </p>
                  <a
                    href="tel:03209061656"
                    className="p-3 rounded-xl bg-[#18171c] hover:bg-[#222126] text-white flex items-center justify-between border border-[#2d2c33] font-mono-code text-xs"
                  >
                    <span>Direct Helpline:</span>
                    <span className="text-[#ff4a58] font-bold">0320-9061656</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Embedded Application Checker Box */}
            <div className="mt-8 pt-8 border-t border-[#222126]">
              <ApplicationCheckerBox />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
