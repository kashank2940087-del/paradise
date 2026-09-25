export type ShiftType = 'morning' | 'afternoon' | 'evening';

export type AppRoute = 'home' | 'courses' | 'admission' | 'jobs' | 'inquiries' | 'tracker' | 'admin';

export interface Course {
  id: string;
  title: string;
  shortCode: string;
  badge: string;
  category: 'it' | 'graphic' | 'medical' | 'ecommerce' | 'ai';
  duration: string;
  schedule: string;
  monthlyFee: number;
  admissionFee: number;
  description: string;
  syllabus: string[];
  prerequisites: string;
  certification: string;
  image: string;
  isAdmissionsOpen: boolean;
  totalSeats: number;
  enrolledCount: number;
  isAiCourse?: boolean;
}

export interface TeacherOpening {
  id: string;
  title: string;
  department: string;
  shifts: string;
  experienceRequired: string;
  qualificationRequired: string;
  salaryRange: string;
  description: string;
  keyRequirements: string[];
  isOpen: boolean;
  postedDate: string;
}

export interface JobApplication {
  id: string;
  applicationNumber: string; // e.g. "JOB-2026-839201"
  securityPin: string; // 6-digit numeric verification code
  candidateName: string;
  fatherName: string;
  gender: 'male' | 'female';
  cnic: string;
  phone: string;
  whatsapp: string;
  email?: string;
  cityArea: string;
  jobOpeningId: string;
  jobTitle: string;
  highestDegree: string;
  teachingExperienceYears: string;
  pastInstitutes: string;
  coreSkills: string;
  portfolioOrCvLink?: string;
  availableShift: 'Morning Shift' | 'Afternoon Shift' | 'Evening Shift' | 'Any Shift';
  expectedSalary: string;
  status: 'pending' | 'approved' | 'interview_scheduled' | 'declined';
  appliedDate: string;
  notes?: string;
  adminRemark?: string;
  inquiryQuery?: string;
  inquiryReply?: string;
}

export interface AdmissionApplication {
  id: string;
  applicationNumber: string; // e.g. "PAR-2026-728190"
  securityPin: string; // 6-digit numeric verification code
  studentName: string;
  fatherName: string;
  gender: 'male' | 'female';
  cnicOrBForm: string;
  phone: string;
  whatsapp: string;
  email?: string;
  address: string;
  cityArea: string;
  lastEducation: string;
  courseId: string;
  courseTitle: string;
  preferredShift: 'Morning (9:00 AM - 11:00 AM)' | 'Afternoon (11:30 AM - 1:30 PM)' | 'Evening Shift A (4:00 PM - 6:00 PM)' | 'Evening Shift B (6:30 PM - 8:30 PM)';
  status: 'pending' | 'verified' | 'fee_paid' | 'enrolled' | 'cancelled';
  createdAt: string;
  notes?: string;
  feeAmount: number;
  adminRemark?: string;
  inquiryQuery?: string;
  inquiryReply?: string;
}

export interface AnnouncementBanner {
  enabled: boolean;
  badge: string;
  message: string;
  linkText: string;
  linkRoute: 'jobs' | 'admission' | 'courses' | 'inquiries' | 'tracker';
}

export interface SupportInquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  topic: 'admission' | 'fees' | 'medical_courses' | 'cit_diploma' | 'general';
  message: string;
  status: 'new' | 'contacted' | 'resolved';
  createdAt: string;
}

export interface UserAccount {
  id: string;
  registrationNumber: string; // e.g. "STU-2026-9281"
  fullName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  cnic?: string;
  role: 'student' | 'applicant';
  createdAt: string;
}
