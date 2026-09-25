import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Course,
  AdmissionApplication,
  SupportInquiry,
  TeacherOpening,
  JobApplication,
  AnnouncementBanner,
  UserAccount,
  AppRoute
} from '../types';
import {
  INITIAL_COURSES,
  INITIAL_APPLICATIONS,
  INITIAL_INQUIRIES,
  INITIAL_TEACHER_OPENINGS,
  INITIAL_JOB_APPLICATIONS,
  INITIAL_ANNOUNCEMENT_BANNER
} from '../data/mockData';
import {
  sha256,
  getStoredPasswordHash,
  saveNewPasswordHash,
  createAdminSession,
  isValidAdminSession,
  destroyAdminSession,
  recordFailedAttempt,
  getLockoutState,
  addAuditLog,
  getAuditLogs,
  AuditLogEntry
} from '../utils/security';

export interface LoginResult {
  success: boolean;
  error?: string;
  remainingAttempts?: number;
  lockoutSeconds?: number;
}

interface AppContextType {
  currentRoute: AppRoute;
  setCurrentRoute: (route: AppRoute) => void;
  courses: Course[];
  applications: AdmissionApplication[];
  inquiries: SupportInquiry[];
  teacherOpenings: TeacherOpening[];
  jobApplications: JobApplication[];
  announcementBanner: AnnouncementBanner;
  updateAnnouncementBanner: (banner: AnnouncementBanner) => void;
  selectedCourseForEnrollment: Course | null;
  setSelectedCourseForEnrollment: (course: Course | null) => void;
  selectedJobForApplication: TeacherOpening | null;
  setSelectedJobForApplication: (job: TeacherOpening | null) => void;
  isWhatsAppModalOpen: boolean;
  setIsWhatsAppModalOpen: (open: boolean) => void;
  isAdminAuthenticated: boolean;
  loginAdmin: (key: string) => Promise<LoginResult>;
  logoutAdmin: () => void;
  changeAdminPassword: (oldKey: string, newKey: string) => Promise<{ success: boolean; message: string }>;
  showAdminAuthModal: boolean;
  setShowAdminAuthModal: (show: boolean) => void;
  submitAdmission: (data: Omit<AdmissionApplication, 'id' | 'applicationNumber' | 'securityPin' | 'createdAt' | 'status'>) => AdmissionApplication;
  updateApplicationStatus: (id: string, status: AdmissionApplication['status'], notes?: string, adminRemark?: string) => void;
  submitJobApplication: (data: Omit<JobApplication, 'id' | 'applicationNumber' | 'securityPin' | 'appliedDate' | 'status'>) => JobApplication;
  updateJobApplicationStatus: (id: string, status: JobApplication['status'], notes?: string, adminRemark?: string) => void;
  toggleTeacherOpening: (id: string) => void;
  addTeacherOpening: (opening: Omit<TeacherOpening, 'id' | 'postedDate' | 'isOpen'>) => TeacherOpening;
  deleteTeacherOpening: (id: string) => void;
  submitInquiry: (data: Omit<SupportInquiry, 'id' | 'createdAt' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: SupportInquiry['status']) => void;
  toggleCourseAdmission: (id: string) => void;
  updateCourseFee: (id: string, monthlyFee: number, admissionFee?: number) => void;
  lastSubmittedApp: AdmissionApplication | null;
  setLastSubmittedApp: (app: AdmissionApplication | null) => void;
  lastSubmittedJobApp: JobApplication | null;
  setLastSubmittedJobApp: (app: JobApplication | null) => void;
  auditLogs: AuditLogEntry[];
  refreshAuditLogs: () => void;

  // Question & Issue tracker methods
  submitApplicationQuery: (identifier: string, query: string) => { success: boolean; message: string };
  replyToApplicationQuery: (appId: string, reply: string, type: 'student' | 'job') => void;

  // User Accounts (Login & Signup)
  currentUser: UserAccount | null;
  userAccounts: UserAccount[];
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  authModalMode: 'login' | 'signup';
  setAuthModalMode: (mode: 'login' | 'signup') => void;
  registerUser: (data: { fullName: string; email: string; phone: string; whatsapp?: string; cnic?: string; role: 'student' | 'applicant'; password: string }) => { success: boolean; user?: UserAccount; error?: string };
  loginUser: (identifier: string, password: string) => { success: boolean; user?: UserAccount; error?: string };
  logoutUser: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getInitialRoute = (): AppRoute => {
    const path = window.location.pathname.replace('/', '').toLowerCase();
    if (path === 'courses') return 'courses';
    if (path === 'admission') return 'admission';
    if (path === 'jobs' || path === 'careers') return 'jobs';
    if (path === 'inquiries' || path === 'support') return 'inquiries';
    if (path === 'tracker' || path === 'check' || path === 'status') return 'tracker';
    if (path === 'admin') return 'admin';
    return 'home';
  };

  const [currentRoute, setCurrentRouteState] = useState<AppRoute>(getInitialRoute);

  const setCurrentRoute = (route: AppRoute) => {
    setCurrentRouteState(route);
    const targetPath = route === 'home' ? '/' : `/${route}`;
    window.history.pushState(null, '', targetPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace('/', '').toLowerCase();
      if (path === 'courses') setCurrentRouteState('courses');
      else if (path === 'admission') setCurrentRouteState('admission');
      else if (path === 'jobs' || path === 'careers') setCurrentRouteState('jobs');
      else if (path === 'inquiries' || path === 'support') setCurrentRouteState('inquiries');
      else if (path === 'tracker' || path === 'check' || path === 'status') setCurrentRouteState('tracker');
      else if (path === 'admin') setCurrentRouteState('admin');
      else setCurrentRouteState('home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Courses state
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('paradise_courses_v2');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  useEffect(() => {
    localStorage.setItem('paradise_courses_v2', JSON.stringify(courses));
  }, [courses]);

  // Teacher Openings state
  const [teacherOpenings, setTeacherOpenings] = useState<TeacherOpening[]>(() => {
    const saved = localStorage.getItem('paradise_teacher_openings');
    return saved ? JSON.parse(saved) : INITIAL_TEACHER_OPENINGS;
  });

  useEffect(() => {
    localStorage.setItem('paradise_teacher_openings', JSON.stringify(teacherOpenings));
  }, [teacherOpenings]);

  // Job Applications state
  const [jobApplications, setJobApplications] = useState<JobApplication[]>(() => {
    const saved = localStorage.getItem('paradise_job_applications');
    return saved ? JSON.parse(saved) : INITIAL_JOB_APPLICATIONS;
  });

  useEffect(() => {
    localStorage.setItem('paradise_job_applications', JSON.stringify(jobApplications));
  }, [jobApplications]);

  // Announcement Banner state
  const [announcementBanner, setAnnouncementBanner] = useState<AnnouncementBanner>(() => {
    const saved = localStorage.getItem('paradise_announcement_banner');
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENT_BANNER;
  });

  const updateAnnouncementBanner = (banner: AnnouncementBanner) => {
    setAnnouncementBanner(banner);
    localStorage.setItem('paradise_announcement_banner', JSON.stringify(banner));
    addAuditLog('STATUS_UPDATED', `Updated announcement banner: "${banner.message.substring(0, 30)}..."`);
  };

  // Student Applications state
  const [applications, setApplications] = useState<AdmissionApplication[]>(() => {
    const saved = localStorage.getItem('paradise_applications');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  useEffect(() => {
    localStorage.setItem('paradise_applications', JSON.stringify(applications));
  }, [applications]);

  // User Accounts state
  const [userAccounts, setUserAccounts] = useState<UserAccount[]>(() => {
    const saved = localStorage.getItem('paradise_user_accounts');
    return saved ? JSON.parse(saved) : [
      {
        id: 'user-001',
        registrationNumber: 'STU-2026-1001',
        fullName: 'Muhammad Hamza',
        email: 'hamza.tech@gmail.com',
        phone: '0302-3928172',
        whatsapp: '0302-3928172',
        cnic: '42401-8392019-3',
        role: 'student',
        createdAt: '2026-02-14 10:30 AM'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('paradise_user_accounts', JSON.stringify(userAccounts));
  }, [userAccounts]);

  // Logged-in user state
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    const saved = localStorage.getItem('paradise_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('paradise_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('paradise_current_user');
    }
  }, [currentUser]);

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  // Inquiries state
  const [inquiries, setInquiries] = useState<SupportInquiry[]>(() => {
    const saved = localStorage.getItem('paradise_inquiries');
    return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
  });

  useEffect(() => {
    localStorage.setItem('paradise_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  const [selectedCourseForEnrollment, setSelectedCourseForEnrollment] = useState<Course | null>(null);
  const [selectedJobForApplication, setSelectedJobForApplication] = useState<TeacherOpening | null>(null);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);

  // Authenticated state for admin
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return isValidAdminSession();
  });
  const [showAdminAuthModal, setShowAdminAuthModal] = useState(false);
  const [lastSubmittedApp, setLastSubmittedApp] = useState<AdmissionApplication | null>(null);
  const [lastSubmittedJobApp, setLastSubmittedJobApp] = useState<JobApplication | null>(null);

  // Audit Logs
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => getAuditLogs());
  const refreshAuditLogs = () => {
    setAuditLogs(getAuditLogs());
  };

  const loginAdmin = async (key: string): Promise<LoginResult> => {
    const lockout = getLockoutState();
    if (lockout.isLocked) {
      return {
        success: false,
        error: `Security Lockout Active. Please wait ${lockout.remainingSeconds} seconds before trying again.`,
        lockoutSeconds: lockout.remainingSeconds
      };
    }

    const trimmed = key.trim();
    if (!trimmed) {
      return { success: false, error: 'Access key cannot be empty.' };
    }

    const hashedInput = await sha256(trimmed);
    const storedHash = getStoredPasswordHash();

    if (hashedInput === storedHash) {
      createAdminSession();
      setIsAdminAuthenticated(true);
      setShowAdminAuthModal(false);
      refreshAuditLogs();
      return { success: true };
    } else {
      const attemptResult = recordFailedAttempt();
      refreshAuditLogs();

      if (attemptResult.isLocked) {
        return {
          success: false,
          error: `Multiple failed attempts detected. Terminal locked for ${attemptResult.remainingSeconds} seconds.`,
          lockoutSeconds: attemptResult.remainingSeconds,
          remainingAttempts: 0
        };
      }

      return {
        success: false,
        error: `Invalid Access Key. Attempts remaining before security lockout: ${attemptResult.remainingAttempts}`,
        remainingAttempts: attemptResult.remainingAttempts
      };
    }
  };

  const logoutAdmin = () => {
    destroyAdminSession();
    setIsAdminAuthenticated(false);
    refreshAuditLogs();
  };

  const changeAdminPassword = async (oldKey: string, newKey: string): Promise<{ success: boolean; message: string }> => {
    const hashedOld = await sha256(oldKey.trim());
    const storedHash = getStoredPasswordHash();

    if (hashedOld !== storedHash) {
      return { success: false, message: 'Current master key is incorrect.' };
    }

    if (newKey.trim().length < 8) {
      return { success: false, message: 'New security key must be at least 8 characters long.' };
    }

    const newHash = await sha256(newKey.trim());
    saveNewPasswordHash(newHash);
    refreshAuditLogs();
    return { success: true, message: 'Master security key updated successfully!' };
  };

  // Student admission submission with 6-digit PIN and 2026 application format
  const submitAdmission = (data: Omit<AdmissionApplication, 'id' | 'applicationNumber' | 'securityPin' | 'createdAt' | 'status'>): AdmissionApplication => {
    // Generate distinct 6-digit random code and form number
    const randNum = Math.floor(100000 + Math.random() * 900000);
    const pin = Math.floor(100000 + Math.random() * 900000).toString();

    const newApp: AdmissionApplication = {
      ...data,
      id: `app-${Date.now()}`,
      applicationNumber: `PAR-2026-${randNum}`,
      securityPin: pin,
      createdAt: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }),
      status: 'pending'
    };

    setApplications(prev => [newApp, ...prev]);
    setLastSubmittedApp(newApp);

    setCourses(prev =>
      prev.map(c =>
        c.id === data.courseId
          ? { ...c, enrolledCount: Math.min(c.totalSeats, c.enrolledCount + 1) }
          : c
      )
    );

    addAuditLog('STATUS_UPDATED', `New student application #${newApp.applicationNumber} registered (PIN: ${pin})`);
    refreshAuditLogs();

    return newApp;
  };

  const updateApplicationStatus = (id: string, status: AdmissionApplication['status'], notes?: string, adminRemark?: string) => {
    setApplications(prev =>
      prev.map(app => (app.id === id ? {
        ...app,
        status,
        notes: notes !== undefined ? notes : app.notes,
        adminRemark: adminRemark !== undefined ? adminRemark : app.adminRemark
      } : app))
    );
    addAuditLog('STATUS_UPDATED', `Updated student application #${id} status to ${status}`);
    refreshAuditLogs();
  };

  // Job application submission with 6-digit PIN and 2026 application format
  const submitJobApplication = (data: Omit<JobApplication, 'id' | 'applicationNumber' | 'securityPin' | 'appliedDate' | 'status'>): JobApplication => {
    const randNum = Math.floor(100000 + Math.random() * 900000);
    const pin = Math.floor(100000 + Math.random() * 900000).toString();

    const newJobApp: JobApplication = {
      ...data,
      id: `job-app-${Date.now()}`,
      applicationNumber: `JOB-2026-${randNum}`,
      securityPin: pin,
      appliedDate: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }),
      status: 'pending'
    };

    setJobApplications(prev => [newJobApp, ...prev]);
    setLastSubmittedJobApp(newJobApp);
    addAuditLog('STATUS_UPDATED', `New faculty applicant: ${data.candidateName} for ${data.jobTitle} (#${newJobApp.applicationNumber}, PIN: ${pin})`);
    refreshAuditLogs();

    return newJobApp;
  };

  const updateJobApplicationStatus = (id: string, status: JobApplication['status'], notes?: string, adminRemark?: string) => {
    setJobApplications(prev =>
      prev.map(app => (app.id === id ? {
        ...app,
        status,
        notes: notes !== undefined ? notes : app.notes,
        adminRemark: adminRemark !== undefined ? adminRemark : app.adminRemark
      } : app))
    );
    addAuditLog('STATUS_UPDATED', `Updated job application #${id} to ${status}`);
    refreshAuditLogs();
  };

  const toggleTeacherOpening = (id: string) => {
    setTeacherOpenings(prev =>
      prev.map(job => (job.id === id ? { ...job, isOpen: !job.isOpen } : job))
    );
  };

  const addTeacherOpening = (openingData: Omit<TeacherOpening, 'id' | 'postedDate' | 'isOpen'>): TeacherOpening => {
    const newOpening: TeacherOpening = {
      ...openingData,
      id: `job-custom-${Date.now()}`,
      isOpen: true,
      postedDate: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    };
    setTeacherOpenings(prev => [newOpening, ...prev]);
    addAuditLog('STATUS_UPDATED', `Created new teacher opening: "${newOpening.title}"`);
    refreshAuditLogs();
    return newOpening;
  };

  const deleteTeacherOpening = (id: string) => {
    setTeacherOpenings(prev => prev.filter(job => job.id !== id));
    addAuditLog('STATUS_UPDATED', `Deleted teacher vacancy #${id}`);
    refreshAuditLogs();
  };

  // Submit Question or Report Issue from Application Checker
  const submitApplicationQuery = (identifier: string, query: string): { success: boolean; message: string } => {
    const cleanId = identifier.trim().toUpperCase();
    if (!cleanId || !query.trim()) {
      return { success: false, message: 'Please provide both identification code and query message.' };
    }

    // Try finding in student applications by 6-digit pin or applicationNumber or phone
    const studentApp = applications.find(
      a => a.securityPin === cleanId || a.applicationNumber.toUpperCase() === cleanId || a.phone.replace(/[^0-9]/g, '').includes(cleanId)
    );

    if (studentApp) {
      setApplications(prev =>
        prev.map(a => (a.id === studentApp.id ? { ...a, inquiryQuery: query.trim() } : a))
      );
      addAuditLog('STATUS_UPDATED', `Applicant #${studentApp.applicationNumber} submitted inquiry/issue: "${query.substring(0, 30)}..."`);
      refreshAuditLogs();
      return { success: true, message: 'Your question/issue has been submitted to campus administration. Our counselors will review and update your response.' };
    }

    // Try finding in job applications
    const jobApp = jobApplications.find(
      j => j.securityPin === cleanId || j.applicationNumber.toUpperCase() === cleanId || j.phone.replace(/[^0-9]/g, '').includes(cleanId)
    );

    if (jobApp) {
      setJobApplications(prev =>
        prev.map(j => (j.id === jobApp.id ? { ...j, inquiryQuery: query.trim() } : j))
      );
      addAuditLog('STATUS_UPDATED', `Faculty candidate #${jobApp.applicationNumber} submitted inquiry/issue: "${query.substring(0, 30)}..."`);
      refreshAuditLogs();
      return { success: true, message: 'Your question/issue has been transmitted to Paradise Institute Faculty Recruitment desk.' };
    }

    return { success: false, message: 'Application not found. Please verify your 6-digit PIN or Application Number.' };
  };

  const replyToApplicationQuery = (appId: string, reply: string, type: 'student' | 'job') => {
    if (type === 'student') {
      setApplications(prev =>
        prev.map(a => (a.id === appId ? { ...a, inquiryReply: reply.trim(), adminRemark: reply.trim() } : a))
      );
      addAuditLog('STATUS_UPDATED', `Staff replied to student application #${appId}`);
    } else {
      setJobApplications(prev =>
        prev.map(j => (j.id === appId ? { ...j, inquiryReply: reply.trim(), adminRemark: reply.trim() } : j))
      );
      addAuditLog('STATUS_UPDATED', `Staff replied to faculty candidate #${appId}`);
    }
    refreshAuditLogs();
  };

  // User registration & authentication
  const registerUser = (data: {
    fullName: string;
    email: string;
    phone: string;
    whatsapp?: string;
    cnic?: string;
    role: 'student' | 'applicant';
    password: string;
  }): { success: boolean; user?: UserAccount; error?: string } => {
    if (!data.fullName.trim() || !data.phone.trim() || !data.email.trim()) {
      return { success: false, error: 'Full name, email, and phone number are required.' };
    }

    // Check if email or phone already exists
    const existing = userAccounts.find(
      u => u.email.toLowerCase() === data.email.trim().toLowerCase() || u.phone.trim() === data.phone.trim()
    );
    if (existing) {
      return { success: false, error: 'An account with this email or phone number already exists.' };
    }

    const regNum = `${data.role === 'applicant' ? 'FAC' : 'STU'}-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newUser: UserAccount = {
      id: `usr-${Date.now()}`,
      registrationNumber: regNum,
      fullName: data.fullName.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone.trim(),
      whatsapp: data.whatsapp?.trim() || data.phone.trim(),
      cnic: data.cnic?.trim(),
      role: data.role,
      createdAt: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      })
    };

    setUserAccounts(prev => [newUser, ...prev]);
    setCurrentUser(newUser);
    addAuditLog('STATUS_UPDATED', `New portal account created for ${newUser.fullName} (${newUser.registrationNumber})`);
    refreshAuditLogs();

    return { success: true, user: newUser };
  };

  const loginUser = (identifier: string, password: string): { success: boolean; user?: UserAccount; error?: string } => {
    const clean = identifier.trim().toLowerCase();
    if (!clean || !password.trim()) {
      return { success: false, error: 'Please enter both login identifier and password.' };
    }

    const found = userAccounts.find(
      u => u.email.toLowerCase() === clean || u.phone === clean || u.registrationNumber.toLowerCase() === clean
    );

    if (!found) {
      return { success: false, error: 'Account not found. Please check your credentials or register.' };
    }

    setCurrentUser(found);
    return { success: true, user: found };
  };

  const logoutUser = () => {
    setCurrentUser(null);
  };

  const submitInquiry = (data: Omit<SupportInquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInq: SupportInquiry = {
      ...data,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }),
      status: 'new'
    };
    setInquiries(prev => [newInq, ...prev]);
  };

  const updateInquiryStatus = (id: string, status: SupportInquiry['status']) => {
    setInquiries(prev =>
      prev.map(inq => (inq.id === id ? { ...inq, status } : inq))
    );
  };

  const toggleCourseAdmission = (id: string) => {
    setCourses(prev =>
      prev.map(c => (c.id === id ? { ...c, isAdmissionsOpen: !c.isAdmissionsOpen } : c))
    );
  };

  const updateCourseFee = (id: string, monthlyFee: number, admissionFee?: number) => {
    setCourses(prev =>
      prev.map(c =>
        c.id === id
          ? { ...c, monthlyFee, admissionFee: admissionFee !== undefined ? admissionFee : c.admissionFee }
          : c
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        setCurrentRoute,
        courses,
        applications,
        inquiries,
        teacherOpenings,
        jobApplications,
        announcementBanner,
        updateAnnouncementBanner,
        selectedCourseForEnrollment,
        setSelectedCourseForEnrollment,
        selectedJobForApplication,
        setSelectedJobForApplication,
        isWhatsAppModalOpen,
        setIsWhatsAppModalOpen,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        changeAdminPassword,
        showAdminAuthModal,
        setShowAdminAuthModal,
        submitAdmission,
        updateApplicationStatus,
        submitJobApplication,
        updateJobApplicationStatus,
        toggleTeacherOpening,
        addTeacherOpening,
        deleteTeacherOpening,
        submitInquiry,
        updateInquiryStatus,
        toggleCourseAdmission,
        updateCourseFee,
        lastSubmittedApp,
        setLastSubmittedApp,
        lastSubmittedJobApp,
        setLastSubmittedJobApp,
        auditLogs,
        refreshAuditLogs,
        submitApplicationQuery,
        replyToApplicationQuery,
        currentUser,
        userAccounts,
        showAuthModal,
        setShowAuthModal,
        authModalMode,
        setAuthModalMode,
        registerUser,
        loginUser,
        logoutUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
