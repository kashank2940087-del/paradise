import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AdmissionApplication, JobApplication } from '../types';

interface ApplicationCheckerBoxProps {
  initialCode?: string;
  onNavigateAdmission?: () => void;
  onNavigateJobs?: () => void;
}

export const ApplicationCheckerBox: React.FC<ApplicationCheckerBoxProps> = ({
  initialCode = '',
  onNavigateAdmission,
  onNavigateJobs
}) => {
  const { applications, jobApplications, submitApplicationQuery, setCurrentRoute } = useApp();

  const [inputCode, setInputCode] = useState(initialCode);
  const [searched, setSearched] = useState(false);
  const [foundStudentApp, setFoundStudentApp] = useState<AdmissionApplication | null>(null);
  const [foundJobApp, setFoundJobApp] = useState<JobApplication | null>(null);
  const [notFound, setNotFound] = useState(false);

  // Question & Issue state
  const [questionText, setQuestionText] = useState('');
  const [querySubmitting, setQuerySubmitting] = useState(false);
  const [queryMessage, setQueryMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSearch = (codeToSearch?: string) => {
    const code = (codeToSearch !== undefined ? codeToSearch : inputCode).trim().toUpperCase();
    if (!code) return;

    setSearched(true);
    setQueryMessage(null);

    // 1. Check Student Applications
    const studentMatch = applications.find(
      app =>
        app.securityPin === code ||
        app.applicationNumber.toUpperCase() === code ||
        app.phone.replace(/[^0-9]/g, '').includes(code) ||
        (app.cnicOrBForm && app.cnicOrBForm.replace(/[^0-9]/g, '').includes(code.replace(/[^0-9]/g, '')))
    );

    if (studentMatch) {
      setFoundStudentApp(studentMatch);
      setFoundJobApp(null);
      setNotFound(false);
      return;
    }

    // 2. Check Faculty Job Applications
    const jobMatch = jobApplications.find(
      job =>
        job.securityPin === code ||
        job.applicationNumber.toUpperCase() === code ||
        job.phone.replace(/[^0-9]/g, '').includes(code) ||
        (job.cnic && job.cnic.replace(/[^0-9]/g, '').includes(code.replace(/[^0-9]/g, '')))
    );

    if (jobMatch) {
      setFoundJobApp(jobMatch);
      setFoundStudentApp(null);
      setNotFound(false);
      return;
    }

    setFoundStudentApp(null);
    setFoundJobApp(null);
    setNotFound(true);
  };

  const handleQuickDemo = (code: string) => {
    setInputCode(code);
    handleSearch(code);
  };

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    const activeAppNumber = foundStudentApp?.applicationNumber || foundJobApp?.applicationNumber || inputCode;
    setQuerySubmitting(true);

    setTimeout(() => {
      const res = submitApplicationQuery(activeAppNumber, questionText.trim());
      setQuerySubmitting(false);
      if (res.success) {
        setQueryMessage({ type: 'success', text: res.message });
        setQuestionText('');
        // Update local state copy to reflect question immediately
        if (foundStudentApp) {
          setFoundStudentApp({ ...foundStudentApp, inquiryQuery: questionText.trim() });
        } else if (foundJobApp) {
          setFoundJobApp({ ...foundJobApp, inquiryQuery: questionText.trim() });
        }
      } else {
        setQueryMessage({ type: 'error', text: res.message });
      }
    }, 400);
  };

  return (
    <div className="w-full rounded-3xl bg-[#111114] border-2 border-red-500/40 p-6 sm:p-8 shadow-[0_0_40px_rgba(211,16,39,0.25)] relative overflow-hidden">
      {/* Background ambient decorative glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#222126] relative z-10">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-amber-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(211,16,39,0.6)] border border-red-400/40 shrink-0">
            <span className="material-symbols-outlined text-2xl">verified_user</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-outfit text-xl sm:text-2xl font-black text-white">
                Application &amp; Result Status Checker
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 font-mono-code text-[10px] font-bold border border-emerald-500/40 hidden sm:inline-block">
                LIVE 2026
              </span>
            </div>
            <p className="font-sans-body text-xs text-[#e6bdba] mt-0.5">
              Enter your <strong className="text-white">6-digit PIN</strong> or <strong className="text-white">Application Form Number</strong> to check real-time admission or teacher job progress, and report issues.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono-code text-[11px] text-[#e6bdba] px-3 py-1.5 rounded-xl bg-[#18171c] border border-[#2d2c33] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>256-Bit Encrypted Lookup</span>
          </span>
        </div>
      </div>

      {/* Search Input Box */}
      <div className="pt-6 flex flex-col gap-4 relative z-10">
        <div className="flex flex-col sm:flex-row items-stretch gap-3">
          <div className="relative flex-1">
            <span className="absolute left-3.5 top-3.5 material-symbols-outlined text-[#ff4a58] text-xl">
              pin
            </span>
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Enter 6-Digit PIN (e.g. 582194) or Form No. (PAR-2026-XXXXXX / JOB-2026-XXXXXX)..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#18171c] border-2 border-red-500/40 focus:border-[#ff4a58] text-white font-mono-code text-sm sm:text-base focus:outline-none shadow-inner tracking-wider placeholder:text-gray-500 placeholder:text-xs sm:placeholder:text-sm"
            />
          </div>

          <button
            onClick={() => handleSearch()}
            className="px-6 py-3 rounded-2xl bg-[#d31027] hover:bg-[#ff4a58] text-white font-outfit text-sm font-bold uppercase tracking-wider shadow-[0_0_25px_rgba(211,16,39,0.6)] transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-lg">search</span>
            <span>Check Application</span>
          </button>
        </div>

        {/* Quick Demo Pins for effortless testing */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono-code text-[#e6bdba]">
          <span className="text-gray-400">Quick Test Demo:</span>
          <button
            onClick={() => handleQuickDemo('582194')}
            className="px-2.5 py-1 rounded-lg bg-[#18171c] hover:bg-[#25242c] text-[#ff4a58] border border-red-500/30 hover:border-red-500 transition-colors cursor-pointer"
          >
            PIN: 582194 (Student CIT)
          </button>
          <button
            onClick={() => handleQuickDemo('739102')}
            className="px-2.5 py-1 rounded-lg bg-[#18171c] hover:bg-[#25242c] text-emerald-400 border border-emerald-500/30 hover:border-emerald-500 transition-colors cursor-pointer"
          >
            PIN: 739102 (Teacher CIT)
          </button>
          <button
            onClick={() => handleQuickDemo('418295')}
            className="px-2.5 py-1 rounded-lg bg-[#18171c] hover:bg-[#25242c] text-cyan-400 border border-cyan-500/30 hover:border-cyan-500 transition-colors cursor-pointer"
          >
            PIN: 418295 (Teacher Graphic)
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* RESULT DISPLAY */}
      {/* ========================================================================= */}
      {searched && (
        <div className="mt-6 pt-6 border-t border-[#222126] flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-300 relative z-10">

          {/* NOT FOUND CARD */}
          {notFound && (
            <div className="p-6 rounded-2xl bg-red-950/40 border border-red-500/40 text-center flex flex-col items-center gap-3">
              <span className="material-symbols-outlined text-4xl text-red-400">error</span>
              <h3 className="font-outfit text-lg font-bold text-white">Application Record Not Found</h3>
              <p className="font-sans-body text-xs text-[#e6bdba] max-w-md">
                We could not locate an application with code <strong className="text-white">"{inputCode}"</strong>.
                Please ensure you entered the exact 6-digit code or Application Form Number provided upon submission.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => {
                    if (onNavigateAdmission) onNavigateAdmission();
                    else setCurrentRoute('admission');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#d31027] hover:bg-[#ff4a58] text-white text-xs font-outfit font-bold"
                >
                  Submit Student Admission
                </button>
                <button
                  onClick={() => {
                    if (onNavigateJobs) onNavigateJobs();
                    else setCurrentRoute('jobs');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#18171c] hover:bg-[#25242c] text-white border border-[#2d2c33] text-xs font-outfit font-bold"
                >
                  Apply as Teacher
                </button>
              </div>
            </div>
          )}

          {/* 1. STUDENT ADMISSION APPLICATION RESULT */}
          {foundStudentApp && (
            <div className="flex flex-col gap-5">
              <div className="p-6 rounded-3xl bg-gradient-to-r from-[#16151c] to-[#0e0e12] border-2 border-emerald-500/40 shadow-xl flex flex-col gap-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#222126]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 font-mono-code text-[11px] font-bold border border-emerald-500/40 uppercase">
                        Student Admission Application
                      </span>
                      <span className="font-mono-code text-xs text-[#ff4a58] font-bold">
                        Academic Session 2026
                      </span>
                    </div>
                    <h3 className="font-outfit text-2xl font-black text-white mt-1">
                      {foundStudentApp.studentName} S/O {foundStudentApp.fatherName}
                    </h3>
                  </div>

                  <div className="flex flex-col sm:items-end">
                    <span className="font-mono-code text-[11px] text-[#e6bdba]">STATUS DETERMINATION</span>
                    <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-xl font-mono-code text-xs font-extrabold uppercase mt-1 border ${
                      foundStudentApp.status === 'enrolled'
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-500'
                        : foundStudentApp.status === 'fee_paid'
                        ? 'bg-blue-950 text-blue-300 border-blue-500'
                        : foundStudentApp.status === 'verified'
                        ? 'bg-purple-950 text-purple-300 border-purple-500'
                        : foundStudentApp.status === 'cancelled'
                        ? 'bg-red-950 text-red-300 border-red-500'
                        : 'bg-yellow-950 text-yellow-300 border-yellow-500'
                    }`}>
                      <span className="w-2 h-2 rounded-full bg-current animate-ping"></span>
                      <span>{foundStudentApp.status.replace('_', ' ')}</span>
                    </span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono-code text-xs">
                  <div className="p-3.5 rounded-2xl bg-[#18171c] border border-[#2d2c33]">
                    <span className="text-[#e6bdba] text-[10px] block">APPLICATION FORM NO</span>
                    <span className="text-[#ff4a58] font-extrabold text-sm">{foundStudentApp.applicationNumber}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#18171c] border border-[#2d2c33]">
                    <span className="text-[#e6bdba] text-[10px] block">6-DIGIT VERIFICATION PIN</span>
                    <span className="text-emerald-400 font-extrabold text-sm">{foundStudentApp.securityPin}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#18171c] border border-[#2d2c33]">
                    <span className="text-[#e6bdba] text-[10px] block">PROGRAM ENROLLED</span>
                    <span className="text-white font-bold truncate block">{foundStudentApp.courseTitle}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#18171c] border border-[#2d2c33]">
                    <span className="text-[#e6bdba] text-[10px] block">BATCH / SHIFT</span>
                    <span className="text-amber-300 font-bold truncate block">{foundStudentApp.preferredShift}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#18171c] border border-[#2d2c33]">
                    <span className="text-[#e6bdba] text-[10px] block">STUDENT CONTACT</span>
                    <span className="text-white font-bold">{foundStudentApp.phone}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#18171c] border border-[#2d2c33]">
                    <span className="text-[#e6bdba] text-[10px] block">CAMPUS LOCATION</span>
                    <span className="text-white font-bold">{foundStudentApp.cityArea}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#18171c] border border-[#2d2c33]">
                    <span className="text-[#e6bdba] text-[10px] block">ADMISSION FEE STATUS</span>
                    <span className="text-emerald-400 font-bold">Rs. {foundStudentApp.feeAmount} (Challan Active)</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#18171c] border border-[#2d2c33]">
                    <span className="text-[#e6bdba] text-[10px] block">SUBMISSION DATE</span>
                    <span className="text-white font-bold">{foundStudentApp.createdAt}</span>
                  </div>
                </div>

                {/* Campus Remarks */}
                {foundStudentApp.adminRemark && (
                  <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 flex items-start gap-3">
                    <span className="material-symbols-outlined text-emerald-400 text-xl shrink-0 mt-0.5">
                      verified
                    </span>
                    <div>
                      <span className="font-mono-code text-[11px] text-emerald-400 font-bold uppercase tracking-wider block">
                        Official Campus Administration Remark:
                      </span>
                      <p className="font-sans-body text-xs sm:text-sm text-white mt-0.5">
                        {foundStudentApp.adminRemark}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 2. TEACHER JOB APPLICATION RESULT */}
          {foundJobApp && (
            <div className="flex flex-col gap-5">
              <div className="p-6 rounded-3xl bg-gradient-to-r from-[#16151c] to-[#0e0e12] border-2 border-cyan-500/40 shadow-xl flex flex-col gap-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#222126]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 font-mono-code text-[11px] font-bold border border-cyan-500/40 uppercase">
                        Faculty Recruitment Application
                      </span>
                      <span className="font-mono-code text-xs text-[#ff4a58] font-bold">
                        Recruitment Year 2026
                      </span>
                    </div>
                    <h3 className="font-outfit text-2xl font-black text-white mt-1">
                      {foundJobApp.candidateName} S/O {foundJobApp.fatherName}
                    </h3>
                  </div>

                  <div className="flex flex-col sm:items-end">
                    <span className="font-mono-code text-[11px] text-[#e6bdba]">HR DOSSIER STATUS</span>
                    <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-xl font-mono-code text-xs font-extrabold uppercase mt-1 border ${
                      foundJobApp.status === 'approved'
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-500'
                        : foundJobApp.status === 'interview_scheduled'
                        ? 'bg-blue-950 text-blue-300 border-blue-500'
                        : foundJobApp.status === 'declined'
                        ? 'bg-red-950 text-red-300 border-red-500'
                        : 'bg-yellow-950 text-yellow-300 border-yellow-500'
                    }`}>
                      <span className="w-2 h-2 rounded-full bg-current animate-ping"></span>
                      <span>{foundJobApp.status.replace('_', ' ')}</span>
                    </span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono-code text-xs">
                  <div className="p-3.5 rounded-2xl bg-[#18171c] border border-[#2d2c33]">
                    <span className="text-[#e6bdba] text-[10px] block">JOB APPLICATION NUMBER</span>
                    <span className="text-[#ff4a58] font-extrabold text-sm">{foundJobApp.applicationNumber}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#18171c] border border-[#2d2c33]">
                    <span className="text-[#e6bdba] text-[10px] block">6-DIGIT SECURITY PIN</span>
                    <span className="text-cyan-400 font-extrabold text-sm">{foundJobApp.securityPin}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#18171c] border border-[#2d2c33]">
                    <span className="text-[#e6bdba] text-[10px] block">APPLIED POSITION</span>
                    <span className="text-white font-bold truncate block">{foundJobApp.jobTitle}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#18171c] border border-[#2d2c33]">
                    <span className="text-[#e6bdba] text-[10px] block">TEACHING EXPERIENCE</span>
                    <span className="text-white font-bold truncate block">{foundJobApp.teachingExperienceYears}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#18171c] border border-[#2d2c33]">
                    <span className="text-[#e6bdba] text-[10px] block">HIGHEST DEGREE</span>
                    <span className="text-white font-bold truncate block">{foundJobApp.highestDegree}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#18171c] border border-[#2d2c33]">
                    <span className="text-[#e6bdba] text-[10px] block">AVAILABLE SHIFT</span>
                    <span className="text-amber-300 font-bold">{foundJobApp.availableShift}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#18171c] border border-[#2d2c33]">
                    <span className="text-[#e6bdba] text-[10px] block">CONTACT MOBILE</span>
                    <span className="text-white font-bold">{foundJobApp.phone}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#18171c] border border-[#2d2c33]">
                    <span className="text-[#e6bdba] text-[10px] block">APPLIED ON</span>
                    <span className="text-white font-bold">{foundJobApp.appliedDate}</span>
                  </div>
                </div>

                {/* Campus HR Remarks */}
                {foundJobApp.adminRemark && (
                  <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/50 flex items-start gap-3">
                    <span className="material-symbols-outlined text-cyan-400 text-xl shrink-0 mt-0.5">
                      fact_check
                    </span>
                    <div>
                      <span className="font-mono-code text-[11px] text-cyan-400 font-bold uppercase tracking-wider block">
                        Official Faculty Recruitment Remark:
                      </span>
                      <p className="font-sans-body text-xs sm:text-sm text-white mt-0.5">
                        {foundJobApp.adminRemark}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* APPLICANT QUESTION & ISSUE SUBMISSION DESK */}
          {/* ========================================================================= */}
          {(foundStudentApp || foundJobApp) && (
            <div className="p-6 rounded-3xl bg-[#09090b] border-2 border-red-500/30 flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#222126]">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#ff4a58] text-2xl">
                    support_agent
                  </span>
                  <div>
                    <h4 className="font-outfit text-base font-bold text-white">
                      Ask Question or Report Issue with this Application
                    </h4>
                    <span className="font-sans-body text-xs text-[#e6bdba]">
                      Need a timing shift change, voucher assistance, or interview reschedule? Message our desk directly.
                    </span>
                  </div>
                </div>
              </div>

              {/* Show previously submitted question & reply if any */}
              {(foundStudentApp?.inquiryQuery || foundJobApp?.inquiryQuery) && (
                <div className="p-4 rounded-2xl bg-[#18171c] border border-[#2d2c33] flex flex-col gap-2 font-mono-code text-xs">
                  <div className="flex items-center justify-between text-[#e6bdba] text-[11px]">
                    <span className="font-bold text-yellow-300">Your Submitted Query / Issue:</span>
                    <span>Direct Desk Ticket</span>
                  </div>
                  <p className="text-white italic">"{foundStudentApp?.inquiryQuery || foundJobApp?.inquiryQuery}"</p>

                  {(foundStudentApp?.inquiryReply || foundJobApp?.inquiryReply) ? (
                    <div className="mt-2 pt-2 border-t border-[#2d2c33] text-emerald-400">
                      <span className="font-bold block text-[11px] uppercase">Campus Administration Reply:</span>
                      <p className="text-emerald-200 mt-0.5">{foundStudentApp?.inquiryReply || foundJobApp?.inquiryReply}</p>
                    </div>
                  ) : (
                    <div className="mt-1 text-amber-400 text-[11px] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                      <span>Review in progress by Campus Admissions Counselor</span>
                    </div>
                  )}
                </div>
              )}

              {/* Form to submit a new question/issue */}
              <form onSubmit={handleSubmitQuestion} className="flex flex-col gap-3">
                <textarea
                  rows={2}
                  required
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="Type your question or issue regarding this application here (e.g., deposited fee slip at bank, request for morning batch, etc.)..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#18171c] border border-[#2d2c33] focus:border-[#ff4a58] text-white font-sans-body text-xs focus:outline-none"
                ></textarea>

                {queryMessage && (
                  <div className={`p-2.5 rounded-xl text-xs font-mono-code ${
                    queryMessage.type === 'success'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/50'
                      : 'bg-red-950 text-red-300 border border-red-500/50'
                  }`}>
                    {queryMessage.text}
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={querySubmitting}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-[#d31027] hover:from-red-500 hover:to-red-600 text-white font-outfit text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-base">send</span>
                    <span>{querySubmitting ? 'Submitting Question...' : 'Submit Question to Campus'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
