import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { AdmissionApplication, JobApplication, AnnouncementBanner } from '../types';
import { getLockoutState } from '../utils/security';

export const AdminPage: React.FC = () => {
  const {
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    changeAdminPassword,
    applications,
    updateApplicationStatus,
    teacherOpenings,
    toggleTeacherOpening,
    addTeacherOpening,
    deleteTeacherOpening,
    jobApplications,
    updateJobApplicationStatus,
    announcementBanner,
    updateAnnouncementBanner,
    inquiries,
    updateInquiryStatus,
    courses,
    toggleCourseAdmission,
    updateCourseFee,
    auditLogs,
    replyToApplicationQuery
  } = useApp();

  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [lockoutSeconds, setLockoutSeconds] = useState(0);

  type AdminTab = 'applications' | 'faculty' | 'teacher_openings' | 'banner' | 'courses' | 'ai_courses' | 'inquiries' | 'security';
  const [activeTab, setActiveTab] = useState<AdminTab>('applications');

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [jobStatusFilter, setJobStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppModal, setSelectedAppModal] = useState<AdmissionApplication | null>(null);
  const [selectedJobModal, setSelectedJobModal] = useState<JobApplication | null>(null);

  // New Job Opening State
  const [showAddJobModal, setShowAddJobModal] = useState(false);
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newJobDept, setNewJobDept] = useState('Information Technology');
  const [newJobShifts, setNewJobShifts] = useState('Morning & Evening Shifts');
  const [newJobExp, setNewJobExp] = useState('2+ Years teaching experience');
  const [newJobQual, setNewJobQual] = useState('BSCS / MCS / Relevant Certification');
  const [newJobSalary, setNewJobSalary] = useState('Rs. 35,000 - 50,000');
  const [newJobDesc, setNewJobDesc] = useState('');
  const [newJobReqs, setNewJobReqs] = useState('Strong teaching skills, Lab management, Punctuality');

  // Quick reply state for modal
  const [modalReplyText, setModalReplyText] = useState('');
  const [modalReplySuccess, setModalReplySuccess] = useState(false);

  // Banner edit state
  const [bannerConfig, setBannerConfig] = useState<AnnouncementBanner>(announcementBanner);
  const [bannerSaveNotice, setBannerSaveNotice] = useState(false);

  // Change password form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changeKeyMsg, setChangeKeyMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Check lockout on mount
  useEffect(() => {
    const lockout = getLockoutState();
    if (lockout.isLocked) {
      setLockoutSeconds(lockout.remainingSeconds);
    }
  }, [isAdminAuthenticated]);

  // Countdown timer for lockout
  useEffect(() => {
    if (lockoutSeconds <= 0) return;
    const timer = setInterval(() => {
      setLockoutSeconds(prev => {
        if (prev <= 1) {
          setAuthError('');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [lockoutSeconds]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutSeconds > 0) return;

    setAuthError('');
    setIsVerifying(true);

    try {
      const res = await loginAdmin(passwordInput);
      setIsVerifying(false);
      if (!res.success) {
        setAuthError(res.error || 'Access denied. Unauthorized key.');
        if (res.lockoutSeconds) {
          setLockoutSeconds(res.lockoutSeconds);
        }
      } else {
        setPasswordInput('');
      }
    } catch {
      setIsVerifying(false);
      setAuthError('Authentication verification failed.');
    }
  };

  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    updateAnnouncementBanner(bannerConfig);
    setBannerSaveNotice(true);
    setTimeout(() => setBannerSaveNotice(false), 3000);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setChangeKeyMsg(null);

    if (newPassword !== confirmPassword) {
      setChangeKeyMsg({ type: 'error', text: 'New keys do not match.' });
      return;
    }

    if (newPassword.length < 8) {
      setChangeKeyMsg({ type: 'error', text: 'Key must be at least 8 characters long.' });
      return;
    }

    const res = await changeAdminPassword(currentPassword, newPassword);
    if (res.success) {
      setChangeKeyMsg({ type: 'success', text: res.message });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setChangeKeyMsg({ type: 'error', text: res.message });
    }
  };

  // If not authenticated, render login screen
  if (!isAdminAuthenticated) {
    return (
      <div className="w-full min-h-[75vh] flex items-center justify-center p-4 bg-[#09090b]">
        <div className="w-full max-w-md p-8 rounded-3xl bg-[#111114] border border-red-500/50 shadow-2xl flex flex-col gap-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#222126]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-red-950 flex items-center justify-center border border-red-500/50">
                <span className="material-symbols-outlined text-yellow-400 text-2xl">security</span>
              </div>
              <div>
                <h2 className="font-outfit text-xl font-bold text-white">Paradise Admin Console</h2>
                <span className="font-mono-code text-xs text-[#ff4a58]">Secure Terminal Access</span>
              </div>
            </div>

            {/* HIGH-ENCRYPTION BADGE */}
            <div className="px-2.5 py-1 rounded-full bg-red-950/90 border border-red-500/60 shadow-[0_0_12px_rgba(211,16,39,0.4)] flex items-center gap-1.5 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-mono-code text-[10px] font-black text-white tracking-widest uppercase">
                HIGH-ENCRYPTION
              </span>
            </div>
          </div>

          <p className="font-sans-body text-xs text-[#e6bdba] leading-relaxed">
            Restricted campus administrative node. Access attempts are cryptographically verified and audited with rate-limiting protection.
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block font-mono-code text-xs text-white mb-1.5 font-semibold">
                Master Security Key
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  disabled={lockoutSeconds > 0 || isVerifying}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter administrator security key..."
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-[#18171c] border border-red-500/30 text-white font-mono-code text-sm focus:outline-none focus:border-[#ff4a58] focus:ring-1 focus:ring-[#ff4a58] disabled:opacity-50"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-2.5 text-[#e6bdba] hover:text-white"
                >
                  <span className="material-symbols-outlined text-lg">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {lockoutSeconds > 0 ? (
              <div className="p-3 rounded-lg bg-red-950/90 border border-red-500 text-red-200 text-xs font-mono-code flex items-center gap-2">
                <span className="material-symbols-outlined text-base animate-pulse">lock_clock</span>
                <span>Security lockout active. Please wait {lockoutSeconds}s</span>
              </div>
            ) : authError ? (
              <div className="p-3 rounded-lg bg-red-950/80 border border-red-500/50 text-red-200 text-xs font-mono-code">
                {authError}
              </div>
            ) : null}

            <div className="flex items-center justify-between text-[11px] font-mono-code text-[#e6bdba]">
              <span>Security Protocol:</span>
              <span className="text-[#ff4a58] font-semibold">SHA-256 Hash Guard</span>
            </div>

            <button
              type="submit"
              disabled={lockoutSeconds > 0 || isVerifying}
              className="w-full py-3 rounded-xl bg-[#d31027] hover:bg-[#ff4a58] disabled:bg-gray-800 disabled:text-gray-500 text-white font-outfit text-sm font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(211,16,39,0.5)] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {isVerifying ? (
                <>
                  <span className="material-symbols-outlined text-base animate-spin">progress_activity</span>
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-base">lock_open</span>
                  <span>Authenticate Console</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Filtered applications
  const filteredApplications = applications.filter(app => {
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesSearch =
      app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.fatherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.phone.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  const filteredJobs = jobApplications.filter(job => {
    const matchesStatus = jobStatusFilter === 'all' || job.status === jobStatusFilter;
    return matchesStatus;
  });

  const pendingJobCount = jobApplications.filter(j => j.status === 'pending').length;
  const newInquiriesCount = inquiries.filter(i => i.status === 'new').length;
  const pendingAdmissionCount = applications.filter(a => a.status === 'pending').length;

  return (
    <div className="w-full bg-[#09090b] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
        {/* Top Control Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-[#111114] border border-[#222126] shadow-xl">
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <div>
              <h1 className="font-outfit text-xl font-bold text-white flex items-center gap-2">
                <span>Paradise Management Console</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono-code text-[11px] border border-emerald-500/40">
                  SHERSHAH CAMPUS NODE
                </span>
              </h1>
              <span className="font-mono-code text-xs text-[#e6bdba]">
                Authenticated as Administrator • Master Key Session Active
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-full bg-red-950/80 border border-red-500/60 text-red-200 font-mono-code text-[11px] font-black tracking-widest uppercase flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>HIGH-ENCRYPTION ACTIVE</span>
            </span>

            <button
              onClick={logoutAdmin}
              className="px-3.5 py-2 rounded-xl bg-red-950/80 hover:bg-red-900 text-red-200 font-mono-code text-xs border border-red-500/40 flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">logout</span>
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* KPI Cards Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-[#111114] border border-[#222126] flex flex-col gap-1">
            <span className="font-mono-code text-xs text-[#e6bdba]">Student Applicants</span>
            <span className="font-outfit text-2xl text-white font-extrabold">{applications.length}</span>
            <span className="font-mono-code text-[11px] text-[#ff4a58]">{pendingAdmissionCount} pending</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#111114] border border-[#222126] flex flex-col gap-1">
            <span className="font-mono-code text-xs text-[#e6bdba]">Teacher Job Applicants</span>
            <span className="font-outfit text-2xl text-emerald-400 font-extrabold">{jobApplications.length}</span>
            <span className="font-mono-code text-[11px] text-yellow-400">{pendingJobCount} pending review</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#111114] border border-[#222126] flex flex-col gap-1">
            <span className="font-mono-code text-xs text-[#e6bdba]">AI Tech Tracks</span>
            <span className="font-outfit text-2xl text-purple-400 font-extrabold">{courses.filter(c => c.isAiCourse).length}</span>
            <span className="font-mono-code text-[11px] text-[#e6bdba]">Generative &amp; Python ML</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#111114] border border-[#222126] flex flex-col gap-1">
            <span className="font-mono-code text-xs text-[#e6bdba]">Support Inquiries</span>
            <span className="font-outfit text-2xl text-[#ff4a58] font-extrabold">{inquiries.length}</span>
            <span className="font-mono-code text-[11px] text-yellow-400">{newInquiriesCount} new messages</span>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex border-b border-[#222126] gap-1 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-3.5 py-2.5 font-outfit text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'applications' ? 'border-[#ff4a58] text-white' : 'border-transparent text-[#e6bdba] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-base">school</span>
            <span>Student Admissions</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#18171c] text-[10px] font-mono-code text-[#ff4a58]">
              {applications.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('faculty')}
            className={`px-3.5 py-2.5 font-outfit text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'faculty' ? 'border-[#ff4a58] text-white' : 'border-transparent text-[#e6bdba] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-base">person_search</span>
            <span>Faculty Applicants</span>
            {pendingJobCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-red-950 text-[10px] font-mono-code text-[#ff4a58] font-bold">
                {pendingJobCount} new
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('teacher_openings')}
            className={`px-3.5 py-2.5 font-outfit text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'teacher_openings' ? 'border-[#ff4a58] text-white' : 'border-transparent text-[#e6bdba] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-base">work</span>
            <span>Teacher Vacancies</span>
          </button>

          <button
            onClick={() => setActiveTab('banner')}
            className={`px-3.5 py-2.5 font-outfit text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'banner' ? 'border-[#ff4a58] text-white' : 'border-transparent text-[#e6bdba] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-base">campaign</span>
            <span>Notice Banner</span>
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            className={`px-3.5 py-2.5 font-outfit text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'courses' ? 'border-[#ff4a58] text-white' : 'border-transparent text-[#e6bdba] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-base">menu_book</span>
            <span>Courses &amp; Fees</span>
          </button>

          <button
            onClick={() => setActiveTab('ai_courses')}
            className={`px-3.5 py-2.5 font-outfit text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'ai_courses' ? 'border-[#ff4a58] text-white' : 'border-transparent text-[#e6bdba] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-base">smart_toy</span>
            <span>AI Courses Hub</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-3.5 py-2.5 font-outfit text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'inquiries' ? 'border-[#ff4a58] text-white' : 'border-transparent text-[#e6bdba] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-base">mail</span>
            <span>Inquiries</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`px-3.5 py-2.5 font-outfit text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'security' ? 'border-[#ff4a58] text-white' : 'border-transparent text-[#e6bdba] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-base">shield</span>
            <span>Security &amp; Key</span>
          </button>
        </div>

        {/* TAB 1: STUDENT ADMISSIONS */}
        {activeTab === 'applications' && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {['all', 'pending', 'verified', 'fee_paid', 'enrolled', 'cancelled'].map(st => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-xl font-mono-code text-xs capitalize cursor-pointer transition-colors ${
                      statusFilter === st
                        ? 'bg-[#d31027] text-white font-bold'
                        : 'bg-[#18171c] text-[#e6bdba] hover:bg-[#222126] border border-[#2d2c33]'
                    }`}
                  >
                    {st.replace('_', ' ')}
                  </button>
                ))}
              </div>

              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search student, roll, phone..."
                className="w-full sm:w-72 px-3 py-2 rounded-xl bg-[#18171c] border border-[#2d2c33] text-white font-mono-code text-xs focus:outline-none focus:border-[#ff4a58]"
              />
            </div>

            <div className="overflow-x-auto rounded-3xl bg-[#111114] border border-[#222126]">
              <table className="w-full text-left font-mono-code text-xs">
                <thead className="bg-[#18171c] text-[#e6bdba] border-b border-[#222126]">
                  <tr>
                    <th className="p-3">Ref ID</th>
                    <th className="p-3">Student Name</th>
                    <th className="p-3">Father Name</th>
                    <th className="p-3">Course Track</th>
                    <th className="p-3">Shift</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#222126] text-white">
                  {filteredApplications.map(app => (
                    <tr key={app.id} className="hover:bg-[#18171c]/50 transition-colors">
                      <td className="p-3 font-bold text-[#ff4a58]">{app.applicationNumber}</td>
                      <td className="p-3 font-semibold">{app.studentName}</td>
                      <td className="p-3 text-[#e6bdba]">{app.fatherName}</td>
                      <td className="p-3 max-w-[180px] truncate">{app.courseTitle}</td>
                      <td className="p-3 text-[#e6bdba] text-[11px]">{app.preferredShift.split(' ')[0]}</td>
                      <td className="p-3"><a href={`tel:${app.phone}`}>{app.phone}</a></td>
                      <td className="p-3">
                        <select
                          value={app.status}
                          onChange={(e) => updateApplicationStatus(app.id, e.target.value as any)}
                          className="px-2 py-1 rounded-lg text-[11px] font-semibold bg-[#18171c] border border-[#2d2c33] text-white"
                        >
                          <option value="pending">Pending</option>
                          <option value="verified">Verified</option>
                          <option value="fee_paid">Fee Paid</option>
                          <option value="enrolled">Enrolled</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedAppModal(app)}
                            className="p-1.5 rounded-lg hover:bg-[#222126] text-[#e6bdba] hover:text-white"
                          >
                            <span className="material-symbols-outlined text-base">visibility</span>
                          </button>
                          <a
                            href={`https://wa.me/92${app.whatsapp.replace(/[^0-9]/g, '').replace(/^0/, '')}?text=Assalam-o-Alaikum%20${encodeURIComponent(app.studentName)}%2C%20regarding%20your%20Paradise%20Institute%20admission.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg hover:bg-emerald-950 text-emerald-400"
                          >
                            <span className="material-symbols-outlined text-base">chat</span>
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: FACULTY APPLICANTS (APPROVE & DECLINE) */}
        {activeTab === 'faculty' && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex gap-1.5">
                {['all', 'pending', 'approved', 'interview_scheduled', 'declined'].map(st => (
                  <button
                    key={st}
                    onClick={() => setJobStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-xl font-mono-code text-xs capitalize cursor-pointer ${
                      jobStatusFilter === st
                        ? 'bg-[#d31027] text-white font-bold'
                        : 'bg-[#18171c] text-[#e6bdba] border border-[#2d2c33]'
                    }`}
                  >
                    {st.replace('_', ' ')}
                  </button>
                ))}
              </div>

              <span className="text-xs font-mono-code text-[#e6bdba]">
                Total Faculty Applicants: {filteredJobs.length}
              </span>
            </div>

            <div className="overflow-x-auto rounded-3xl bg-[#111114] border border-[#222126]">
              <table className="w-full text-left font-mono-code text-xs">
                <thead className="bg-[#18171c] text-[#e6bdba] border-b border-[#222126]">
                  <tr>
                    <th className="p-3">Ref ID</th>
                    <th className="p-3">Candidate</th>
                    <th className="p-3">Applied Role</th>
                    <th className="p-3">Experience</th>
                    <th className="p-3">Degree</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Approve / Decline Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#222126] text-white">
                  {filteredJobs.map(job => (
                    <tr key={job.id} className="hover:bg-[#18171c]/50">
                      <td className="p-3 font-bold text-[#ff4a58]">{job.applicationNumber}</td>
                      <td className="p-3 font-semibold">{job.candidateName}</td>
                      <td className="p-3 max-w-[180px] truncate text-[#e6bdba]">{job.jobTitle}</td>
                      <td className="p-3 text-white">{job.teachingExperienceYears}</td>
                      <td className="p-3 text-[#e6bdba] text-[11px]">{job.highestDegree}</td>
                      <td className="p-3"><a href={`tel:${job.phone}`}>{job.phone}</a></td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                          job.status === 'approved'
                            ? 'bg-emerald-950 text-emerald-400 border-emerald-500/40'
                            : job.status === 'interview_scheduled'
                            ? 'bg-blue-950 text-blue-400 border-blue-500/40'
                            : job.status === 'declined'
                            ? 'bg-red-950 text-red-400 border-red-500/40'
                            : 'bg-yellow-950 text-yellow-400 border-yellow-500/40'
                        }`}>
                          {job.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Approve Button */}
                          <button
                            onClick={() => updateJobApplicationStatus(job.id, 'approved', 'Approved by Campus Management')}
                            title="Approve for Faculty Position"
                            className="px-2.5 py-1 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-xs">check</span>
                            <span>Approve</span>
                          </button>

                          {/* Decline Button */}
                          <button
                            onClick={() => updateJobApplicationStatus(job.id, 'declined', 'Declined based on requirement mismatch')}
                            title="Decline Application"
                            className="px-2.5 py-1 rounded-lg bg-red-950 hover:bg-red-900 text-red-300 border border-red-500/40 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-xs">close</span>
                            <span>Decline</span>
                          </button>

                          {/* View details */}
                          <button
                            onClick={() => setSelectedJobModal(job)}
                            className="p-1 rounded-lg hover:bg-[#222126] text-[#e6bdba]"
                            title="View Full Profile"
                          >
                            <span className="material-symbols-outlined text-base">visibility</span>
                          </button>

                          {/* WhatsApp */}
                          <a
                            href={`https://wa.me/92${job.whatsapp.replace(/[^0-9]/g, '').replace(/^0/, '')}?text=Assalam-o-Alaikum%20${encodeURIComponent(job.candidateName)}%2C%20Paradise%20Institute%20Karachi%20calling%20regarding%20your%20teaching%20application.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded-lg hover:bg-emerald-950 text-emerald-400"
                            title="WhatsApp Candidate"
                          >
                            <span className="material-symbols-outlined text-base">chat</span>
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredJobs.length === 0 && (
                <div className="p-8 text-center text-xs text-[#e6bdba]">
                  No faculty applications matching filter.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: TEACHER VACANCIES OPENINGS */}
        {activeTab === 'teacher_openings' && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between flex-wrap gap-3 p-4 rounded-2xl bg-[#111114] border border-[#222126]">
              <div>
                <h3 className="font-outfit text-base font-bold text-white">Faculty Vacancies &amp; Openings</h3>
                <span className="font-mono-code text-xs text-[#e6bdba]">Manage active instructor requirements displayed on public web portal</span>
              </div>
              <button
                onClick={() => setShowAddJobModal(true)}
                className="px-4 py-2 rounded-xl bg-[#d31027] hover:bg-[#ff4a58] text-white font-outfit text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
              >
                <span className="material-symbols-outlined text-base">add_circle</span>
                <span>Post New Teacher Opening</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teacherOpenings.map(opening => (
                <div key={opening.id} className="p-6 rounded-3xl bg-[#111114] border border-[#222126] flex flex-col justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="font-mono-code text-[11px] text-[#ff4a58] font-bold">{opening.department}</span>
                        <h3 className="font-outfit text-base font-bold text-white mt-1">{opening.title}</h3>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => toggleTeacherOpening(opening.id)}
                          className={`px-3 py-1 rounded-lg font-mono-code text-xs font-bold cursor-pointer ${
                            opening.isOpen
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                              : 'bg-red-950 text-red-400 border border-red-500/40'
                          }`}
                        >
                          {opening.isOpen ? 'HIRING OPEN' : 'CLOSED'}
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete opening "${opening.title}"?`)) {
                              deleteTeacherOpening(opening.id);
                            }
                          }}
                          className="p-1 rounded-lg hover:bg-red-950 text-red-400 hover:text-red-300"
                          title="Delete Opening"
                        >
                          <span className="material-symbols-outlined text-base">delete</span>
                        </button>
                      </div>
                    </div>
                    <p className="font-sans-body text-xs text-[#e6bdba] line-clamp-2">{opening.description}</p>
                    <div className="p-2.5 rounded-xl bg-[#18171c] font-mono-code text-xs text-[#e6bdba] flex justify-between">
                      <span>Pay Range: <strong className="text-white">{opening.salaryRange}</strong></span>
                      <span>Shift: <strong className="text-[#ff4a58]">{opening.shifts}</strong></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal to Add New Faculty Opening */}
            {showAddJobModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
                <div className="w-full max-w-lg rounded-3xl bg-[#111114] p-6 shadow-2xl flex flex-col gap-4 border border-red-500/50">
                  <div className="flex items-center justify-between pb-3 border-b border-[#222126]">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#ff4a58]">post_add</span>
                      <h3 className="font-outfit text-base font-bold text-white">Create New Teacher Opening</h3>
                    </div>
                    <button onClick={() => setShowAddJobModal(false)} className="text-[#e6bdba] hover:text-white">
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!newJobTitle.trim() || !newJobDesc.trim()) return;
                      addTeacherOpening({
                        title: newJobTitle.trim(),
                        department: newJobDept.trim(),
                        shifts: newJobShifts.trim(),
                        experienceRequired: newJobExp.trim(),
                        qualificationRequired: newJobQual.trim(),
                        salaryRange: newJobSalary.trim(),
                        description: newJobDesc.trim(),
                        keyRequirements: newJobReqs.split(',').map(r => r.trim()).filter(Boolean)
                      });
                      setShowAddJobModal(false);
                      setNewJobTitle('');
                      setNewJobDesc('');
                    }}
                    className="flex flex-col gap-3 font-mono-code text-xs"
                  >
                    <div>
                      <label className="text-[#e6bdba] block mb-1">Job Title *</label>
                      <input
                        type="text"
                        required
                        value={newJobTitle}
                        onChange={(e) => setNewJobTitle(e.target.value)}
                        placeholder="e.g. Senior Python & AI Instructor"
                        className="w-full px-3 py-2 rounded-xl bg-[#18171c] border border-[#2d2c33] text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[#e6bdba] block mb-1">Department</label>
                        <input
                          type="text"
                          required
                          value={newJobDept}
                          onChange={(e) => setNewJobDept(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#18171c] border border-[#2d2c33] text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[#e6bdba] block mb-1">Shift Timings</label>
                        <input
                          type="text"
                          required
                          value={newJobShifts}
                          onChange={(e) => setNewJobShifts(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#18171c] border border-[#2d2c33] text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[#e6bdba] block mb-1">Experience Required</label>
                        <input
                          type="text"
                          required
                          value={newJobExp}
                          onChange={(e) => setNewJobExp(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#18171c] border border-[#2d2c33] text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[#e6bdba] block mb-1">Salary Range</label>
                        <input
                          type="text"
                          required
                          value={newJobSalary}
                          onChange={(e) => setNewJobSalary(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#18171c] border border-[#2d2c33] text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[#e6bdba] block mb-1">Qualification Required</label>
                      <input
                        type="text"
                        required
                        value={newJobQual}
                        onChange={(e) => setNewJobQual(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#18171c] border border-[#2d2c33] text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[#e6bdba] block mb-1">Job Description *</label>
                      <textarea
                        rows={2}
                        required
                        value={newJobDesc}
                        onChange={(e) => setNewJobDesc(e.target.value)}
                        placeholder="Brief overview of teaching duties and classroom lab oversight..."
                        className="w-full px-3 py-2 rounded-xl bg-[#18171c] border border-[#2d2c33] text-white font-sans-body"
                      ></textarea>
                    </div>

                    <div>
                      <label className="text-[#e6bdba] block mb-1">Key Requirements (comma-separated)</label>
                      <input
                        type="text"
                        value={newJobReqs}
                        onChange={(e) => setNewJobReqs(e.target.value)}
                        placeholder="MS Office, Urdu clarity, Lab discipline..."
                        className="w-full px-3 py-2 rounded-xl bg-[#18171c] border border-[#2d2c33] text-white"
                      />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="submit"
                        className="flex-1 py-2.5 rounded-xl bg-[#d31027] hover:bg-[#ff4a58] text-white font-outfit text-xs font-bold"
                      >
                        Publish Vacancy to Web
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: BANNER SYSTEM MANAGER */}
        {activeTab === 'banner' && (
          <div className="max-w-2xl mx-auto w-full p-7 rounded-3xl bg-[#111114] border border-[#222126] shadow-xl flex flex-col gap-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#222126]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ff4a58]">campaign</span>
                <h3 className="font-outfit text-lg text-white font-bold">
                  Top Announcement Banner System
                </h3>
              </div>
              <label className="flex items-center gap-2 text-xs font-mono-code text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={bannerConfig.enabled}
                  onChange={(e) => setBannerConfig({ ...bannerConfig, enabled: e.target.checked })}
                  className="accent-[#d31027] w-4 h-4"
                />
                <span>Banner Visible</span>
              </label>
            </div>

            <form onSubmit={handleSaveBanner} className="flex flex-col gap-4">
              <div>
                <label className="block font-mono-code text-xs text-[#e6bdba] mb-1 font-semibold">
                  Badge Tag (e.g. CAMPUS NOTICE, FACULTY HIRING, ADMISSIONS)
                </label>
                <input
                  type="text"
                  required
                  value={bannerConfig.badge}
                  onChange={(e) => setBannerConfig({ ...bannerConfig, badge: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#18171c] border border-[#2d2c33] text-white font-mono-code text-xs"
                />
              </div>

              <div>
                <label className="block font-mono-code text-xs text-[#e6bdba] mb-1 font-semibold">
                  Banner Text Message
                </label>
                <textarea
                  rows={2}
                  required
                  value={bannerConfig.message}
                  onChange={(e) => setBannerConfig({ ...bannerConfig, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#18171c] border border-[#2d2c33] text-white font-sans-body text-xs"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono-code text-xs text-[#e6bdba] mb-1 font-semibold">
                    Button Label
                  </label>
                  <input
                    type="text"
                    value={bannerConfig.linkText}
                    onChange={(e) => setBannerConfig({ ...bannerConfig, linkText: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#18171c] border border-[#2d2c33] text-white font-mono-code text-xs"
                  />
                </div>

                <div>
                  <label className="block font-mono-code text-xs text-[#e6bdba] mb-1 font-semibold">
                    Target Screen Route
                  </label>
                  <select
                    value={bannerConfig.linkRoute}
                    onChange={(e) => setBannerConfig({ ...bannerConfig, linkRoute: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#18171c] border border-[#2d2c33] text-white font-mono-code text-xs"
                  >
                    <option value="jobs">Teaching Jobs Page (/jobs)</option>
                    <option value="admission">Admission Portal (/admission)</option>
                    <option value="courses">Courses Catalog (/courses)</option>
                    <option value="inquiries">Support &amp; Inquiry (/inquiries)</option>
                  </select>
                </div>
              </div>

              {/* Live Preview */}
              <div className="flex flex-col gap-1.5 pt-2">
                <span className="font-mono-code text-[11px] text-[#e6bdba]">Live Banner Preview:</span>
                <div className="p-3 rounded-xl bg-gradient-to-r from-red-950 via-[#d31027] to-red-950 text-white flex items-center justify-between text-xs border border-red-500/40">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-white text-[#d31027] font-mono-code text-[10px] font-black uppercase">
                      {bannerConfig.badge}
                    </span>
                    <span className="font-sans-body text-xs">{bannerConfig.message}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-black/60 font-mono-code text-[10px] border border-red-400/40">
                    {bannerConfig.linkText}
                  </span>
                </div>
              </div>

              {bannerSaveNotice && (
                <div className="p-3 rounded-xl bg-emerald-950 text-emerald-300 font-mono-code text-xs border border-emerald-500/40">
                  ✓ Top announcement banner updated in real-time!
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#d31027] hover:bg-[#ff4a58] text-white font-outfit text-sm font-bold shadow-md cursor-pointer"
              >
                Save Announcement Banner
              </button>
            </form>
          </div>
        )}

        {/* TAB 5: COURSES & FEES */}
        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <div key={course.id} className="p-5 rounded-3xl bg-[#111114] border border-[#222126] flex flex-col gap-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#222126]">
                  <div>
                    <span className="font-mono-code text-[11px] text-[#ff4a58] font-bold">{course.shortCode}</span>
                    <h3 className="font-outfit text-base font-bold text-white">{course.title}</h3>
                  </div>
                  <button
                    onClick={() => toggleCourseAdmission(course.id)}
                    className={`px-2.5 py-1 rounded-lg font-mono-code text-[11px] font-bold cursor-pointer ${
                      course.isAdmissionsOpen
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                        : 'bg-red-950 text-red-400 border border-red-500/40'
                    }`}
                  >
                    {course.isAdmissionsOpen ? 'OPEN' : 'CLOSED'}
                  </button>
                </div>

                <div className="flex flex-col gap-2 font-mono-code text-xs">
                  <div className="flex justify-between items-center text-[#e6bdba]">
                    <span>Admission Fee (PKR):</span>
                    <input
                      type="number"
                      defaultValue={course.admissionFee}
                      onBlur={(e) => updateCourseFee(course.id, course.monthlyFee, parseInt(e.target.value) || course.admissionFee)}
                      className="w-24 px-2 py-1 rounded-lg bg-[#18171c] border border-[#2d2c33] text-right font-bold text-white text-xs"
                    />
                  </div>
                  <div className="flex justify-between items-center text-[#e6bdba]">
                    <span>Monthly Tuition (PKR):</span>
                    <input
                      type="number"
                      defaultValue={course.monthlyFee}
                      onBlur={(e) => updateCourseFee(course.id, parseInt(e.target.value) || course.monthlyFee)}
                      className="w-24 px-2 py-1 rounded-lg bg-[#18171c] border border-[#2d2c33] text-right font-bold text-white text-xs"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 6: AI COURSES HUB */}
        {activeTab === 'ai_courses' && (
          <div className="flex flex-col gap-6">
            <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-950/40 via-[#18171c] to-red-950/40 border border-purple-500/40 flex items-center justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-900 text-purple-300 font-mono-code text-xs font-bold uppercase">
                  AI ACADEMY HUB
                </span>
                <h3 className="font-outfit text-xl font-bold text-white mt-1">
                  Artificial Intelligence &amp; Generative Models Lab
                </h3>
                <p className="font-sans-body text-xs text-[#e6bdba]">
                  Manage specialized AI syllabus tracks, admission fee structures, and seat allocations.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {courses.filter(c => c.isAiCourse).map(aiCourse => (
                <div key={aiCourse.id} className="p-6 rounded-3xl bg-[#111114] border border-purple-500/30 flex flex-col justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="font-mono-code text-[11px] text-purple-400 font-bold">{aiCourse.badge}</span>
                    <h4 className="font-outfit text-base font-bold text-white">{aiCourse.title}</h4>
                    <p className="font-sans-body text-xs text-[#e6bdba] line-clamp-2">{aiCourse.description}</p>
                    <div className="p-3 rounded-2xl bg-[#18171c] border border-[#2d2c33] font-mono-code text-xs flex justify-between mt-2">
                      <span>Admission Fee:</span>
                      <span className="text-[#ff4a58] font-bold">Rs. {aiCourse.admissionFee.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="overflow-x-auto rounded-3xl bg-[#111114] border border-[#222126]">
            <table className="w-full text-left font-mono-code text-xs">
              <thead className="bg-[#18171c] text-[#e6bdba] border-b border-[#222126]">
                <tr>
                  <th className="p-3">Received</th>
                  <th className="p-3">Applicant Name</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Topic</th>
                  <th className="p-3">Message</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#222126] text-white">
                {inquiries.map(inq => (
                  <tr key={inq.id} className="hover:bg-[#18171c]/50">
                    <td className="p-3 text-[#e6bdba] text-[11px]">{inq.createdAt}</td>
                    <td className="p-3 font-semibold">{inq.name}</td>
                    <td className="p-3"><a href={`tel:${inq.phone}`}>{inq.phone}</a></td>
                    <td className="p-3 text-[#ff4a58] uppercase font-bold text-[10px]">{inq.topic}</td>
                    <td className="p-3 max-w-sm truncate text-[#e6bdba]">{inq.message}</td>
                    <td className="p-3">
                      <select
                        value={inq.status}
                        onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                        className="px-2 py-1 rounded-lg text-[11px] bg-[#18171c] border border-[#2d2c33] text-white"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </td>
                    <td className="p-3 text-right">
                      <a
                        href={`https://wa.me/92${inq.phone.replace(/[^0-9]/g, '').replace(/^0/, '')}?text=Assalam-o-Alaikum%20${encodeURIComponent(inq.name)}%2C%20Paradise%20Institute.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-500/40 inline-flex items-center gap-1 text-[11px]"
                      >
                        <span className="material-symbols-outlined text-xs">chat</span>
                        <span>WhatsApp</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 8: SECURITY & KEY */}
        {activeTab === 'security' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 p-6 rounded-3xl bg-[#111114] border border-[#222126] shadow-xl flex flex-col gap-4">
              <h3 className="font-outfit text-base text-white font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-yellow-400">key</span>
                <span>Update Master Key</span>
              </h3>
              <form onSubmit={handleChangePassword} className="flex flex-col gap-3">
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Current master key..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#18171c] border border-[#2d2c33] text-white font-mono-code text-xs"
                />
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New key (min. 8 characters)..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#18171c] border border-[#2d2c33] text-white font-mono-code text-xs"
                />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new key..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#18171c] border border-[#2d2c33] text-white font-mono-code text-xs"
                />
                {changeKeyMsg && (
                  <div className={`p-2.5 rounded-xl text-xs font-mono-code ${changeKeyMsg.type === 'success' ? 'bg-emerald-950 text-emerald-300' : 'bg-red-950 text-red-300'}`}>
                    {changeKeyMsg.text}
                  </div>
                )}
                <button type="submit" className="w-full py-2.5 rounded-xl bg-[#d31027] hover:bg-[#ff4a58] text-white font-outfit text-xs font-bold">
                  Save New Key
                </button>
              </form>
            </div>

            <div className="lg:col-span-6 p-6 rounded-3xl bg-[#111114] border border-[#222126] shadow-xl flex flex-col gap-3">
              <h3 className="font-outfit text-base text-white font-bold">Security Audit Log</h3>
              <div className="flex flex-col gap-2 max-h-80 overflow-y-auto">
                {auditLogs.map(log => (
                  <div key={log.id} className="p-2.5 rounded-xl bg-[#18171c] border border-[#2d2c33] text-[11px] font-mono-code flex flex-col">
                    <div className="flex justify-between text-[#e6bdba]">
                      <span className="text-white font-bold">{log.type}</span>
                      <span>{log.timestamp}</span>
                    </div>
                    <span className="text-[#e6bdba] mt-0.5">{log.details}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal for Faculty Applicant */}
      {selectedJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="w-full max-w-xl rounded-3xl bg-[#111114] p-6 shadow-2xl flex flex-col gap-4 border border-red-500/40">
            <div className="flex items-center justify-between pb-3 border-b border-[#222126]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono-code text-xs text-[#ff4a58] font-bold">{selectedJobModal.applicationNumber}</span>
                  <span className="font-mono-code text-[11px] text-cyan-400 font-bold px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40">
                    PIN: {selectedJobModal.securityPin}
                  </span>
                </div>
                <h3 className="font-outfit text-lg font-bold text-white mt-1">Teacher Applicant Dossier</h3>
              </div>
              <button onClick={() => { setSelectedJobModal(null); setModalReplySuccess(false); setModalReplyText(''); }} className="text-[#e6bdba] hover:text-white p-1">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 font-mono-code text-xs">
              <div className="p-2.5 rounded-xl bg-[#18171c] border border-[#2d2c33]">
                <span className="text-[#e6bdba] text-[10px] block">NAME</span>
                <span className="text-white font-bold">{selectedJobModal.candidateName}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#18171c] border border-[#2d2c33]">
                <span className="text-[#e6bdba] text-[10px] block">POSITION</span>
                <span className="text-[#ff4a58] font-bold">{selectedJobModal.jobTitle}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#18171c] border border-[#2d2c33]">
                <span className="text-[#e6bdba] text-[10px] block">EXPERIENCE</span>
                <span className="text-white font-bold">{selectedJobModal.teachingExperienceYears}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#18171c] border border-[#2d2c33]">
                <span className="text-[#e6bdba] text-[10px] block">QUALIFICATION</span>
                <span className="text-white font-bold">{selectedJobModal.highestDegree}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#18171c] border border-[#2d2c33]">
                <span className="text-[#e6bdba] text-[10px] block">EXPECTED SALARY</span>
                <span className="text-white font-bold">{selectedJobModal.expectedSalary}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#18171c] border border-[#2d2c33]">
                <span className="text-[#e6bdba] text-[10px] block">AVAILABLE SHIFT</span>
                <span className="text-white font-bold">{selectedJobModal.availableShift}</span>
              </div>
              <div className="col-span-2 p-2.5 rounded-xl bg-[#18171c] border border-[#2d2c33]">
                <span className="text-[#e6bdba] text-[10px] block">SKILLS &amp; PAST INSTITUTES</span>
                <span className="text-white">{selectedJobModal.coreSkills} — {selectedJobModal.pastInstitutes}</span>
              </div>
            </div>

            {/* Candidate Question & Admin Reply Box */}
            <div className="p-3 rounded-2xl bg-[#18171c] border border-[#2d2c33] flex flex-col gap-2 font-mono-code text-xs">
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">contact_support</span>
                <span>Applicant Inquiry / Question Desk:</span>
              </span>
              <p className="text-white italic">
                {selectedJobModal.inquiryQuery ? `"${selectedJobModal.inquiryQuery}"` : 'No candidate issue reported yet.'}
              </p>

              {selectedJobModal.inquiryReply && (
                <div className="text-emerald-400 text-[11px] pt-1">
                  <span>Current Staff Reply: </span>
                  <span className="text-white">{selectedJobModal.inquiryReply}</span>
                </div>
              )}

              <div className="flex gap-2 mt-1">
                <input
                  type="text"
                  value={modalReplyText}
                  onChange={(e) => setModalReplyText(e.target.value)}
                  placeholder="Type official reply to applicant..."
                  className="flex-1 px-3 py-1.5 rounded-xl bg-[#111114] border border-[#2d2c33] text-white text-xs"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!modalReplyText.trim()) return;
                    replyToApplicationQuery(selectedJobModal.id, modalReplyText.trim(), 'job');
                    selectedJobModal.inquiryReply = modalReplyText.trim();
                    setModalReplyText('');
                    setModalReplySuccess(true);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-cyan-700 hover:bg-cyan-600 text-white font-bold text-xs"
                >
                  Send Reply
                </button>
              </div>
              {modalReplySuccess && <span className="text-emerald-400 text-[10px]">Reply updated in candidate portal!</span>}
            </div>

            <div className="flex gap-2 pt-2 border-t border-[#222126]">
              <button
                onClick={() => {
                  updateJobApplicationStatus(selectedJobModal.id, 'approved', 'Approved by Staff');
                  setSelectedJobModal(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-mono-code text-xs font-bold"
              >
                Approve Applicant
              </button>
              <button
                onClick={() => {
                  updateJobApplicationStatus(selectedJobModal.id, 'declined', 'Declined by Staff');
                  setSelectedJobModal(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-red-900 hover:bg-red-800 text-white font-mono-code text-xs font-bold"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal for Student Application */}
      {selectedAppModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="w-full max-w-xl rounded-3xl bg-[#111114] p-6 shadow-2xl flex flex-col gap-4 border border-red-500/40">
            <div className="flex items-center justify-between pb-3 border-b border-[#222126]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono-code text-xs text-[#ff4a58] font-bold">{selectedAppModal.applicationNumber}</span>
                  <span className="font-mono-code text-[11px] text-emerald-400 font-bold px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40">
                    PIN: {selectedAppModal.securityPin}
                  </span>
                </div>
                <h3 className="font-outfit text-lg font-bold text-white mt-1">Student Application Record</h3>
              </div>
              <button onClick={() => { setSelectedAppModal(null); setModalReplySuccess(false); setModalReplyText(''); }} className="text-[#e6bdba] hover:text-white p-1">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 font-mono-code text-xs">
              <div className="p-2.5 rounded-xl bg-[#18171c] border border-[#2d2c33]">
                <span className="text-[#e6bdba] text-[10px] block">STUDENT</span>
                <span className="text-white font-bold">{selectedAppModal.studentName}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#18171c] border border-[#2d2c33]">
                <span className="text-[#e6bdba] text-[10px] block">COURSE TRACK</span>
                <span className="text-[#ff4a58] font-bold">{selectedAppModal.courseTitle}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#18171c] border border-[#2d2c33]">
                <span className="text-[#e6bdba] text-[10px] block">SHIFT</span>
                <span className="text-white font-bold">{selectedAppModal.preferredShift}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#18171c] border border-[#2d2c33]">
                <span className="text-[#e6bdba] text-[10px] block">PHONE</span>
                <span className="text-white font-bold">{selectedAppModal.phone}</span>
              </div>
            </div>

            {/* Student Inquiry & Admin Reply Box */}
            <div className="p-3 rounded-2xl bg-[#18171c] border border-[#2d2c33] flex flex-col gap-2 font-mono-code text-xs">
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">contact_support</span>
                <span>Student Inquiry / Query Desk:</span>
              </span>
              <p className="text-white italic">
                {selectedAppModal.inquiryQuery ? `"${selectedAppModal.inquiryQuery}"` : 'No student inquiry lodged yet.'}
              </p>

              {selectedAppModal.inquiryReply && (
                <div className="text-emerald-400 text-[11px] pt-1">
                  <span>Current Staff Reply: </span>
                  <span className="text-white">{selectedAppModal.inquiryReply}</span>
                </div>
              )}

              <div className="flex gap-2 mt-1">
                <input
                  type="text"
                  value={modalReplyText}
                  onChange={(e) => setModalReplyText(e.target.value)}
                  placeholder="Type official reply to student..."
                  className="flex-1 px-3 py-1.5 rounded-xl bg-[#111114] border border-[#2d2c33] text-white text-xs"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!modalReplyText.trim()) return;
                    replyToApplicationQuery(selectedAppModal.id, modalReplyText.trim(), 'student');
                    selectedAppModal.inquiryReply = modalReplyText.trim();
                    setModalReplyText('');
                    setModalReplySuccess(true);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-red-700 hover:bg-red-600 text-white font-bold text-xs"
                >
                  Send Reply
                </button>
              </div>
              {modalReplySuccess && <span className="text-emerald-400 text-[10px]">Reply sent to student tracker!</span>}
            </div>

            <div className="flex gap-2 pt-2 border-t border-[#222126]">
              <button
                onClick={() => setSelectedAppModal(null)}
                className="w-full py-2.5 rounded-xl bg-[#18171c] hover:bg-[#222126] text-white font-mono-code text-xs"
              >
                Close Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
