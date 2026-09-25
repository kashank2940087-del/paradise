import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { AdmissionApplication } from '../types';
import { ConfettiEffect } from '../components/ConfettiEffect';
import { ApplicationCheckerBox } from '../components/ApplicationCheckerBox';

export const AdmissionPage: React.FC = () => {
  const {
    courses,
    selectedCourseForEnrollment,
    submitAdmission,
    lastSubmittedApp,
    setLastSubmittedApp,
    setCurrentRoute
  } = useApp();

  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    selectedCourseForEnrollment ? selectedCourseForEnrollment.id : courses[0]?.id || 'cit-diploma'
  );

  const [studentName, setStudentName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [cnicOrBForm, setCnicOrBForm] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [cityArea, setCityArea] = useState('Shershah, Karachi');
  const [lastEducation, setLastEducation] = useState('Matriculation (Computer / General)');
  const [preferredShift, setPreferredShift] = useState<AdmissionApplication['preferredShift']>('Morning (9:00 AM - 11:00 AM)');

  const [formSubmitted, setFormSubmitted] = useState<AdmissionApplication | null>(lastSubmittedApp);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedAppId, setCopiedAppId] = useState(false);
  const [copiedPin, setCopiedPin] = useState(false);

  useEffect(() => {
    if (selectedCourseForEnrollment) {
      setSelectedCourseId(selectedCourseForEnrollment.id);
    }
  }, [selectedCourseForEnrollment]);

  const activeCourse = courses.find(c => c.id === selectedCourseId) || courses[0];

  const karachiAreas = [
    'Shershah, Karachi',
    'SITE Industrial Area',
    'Lyari / Kharadar',
    'Baldia Town / Saeedabad',
    'Orangi Town / Banaras',
    'Saddar / Tower',
    'Nazimabad / Golimar',
    'Keamari / Mauripur'
  ];

  const educationOptions = [
    'Middle / Primary Pass',
    'Matriculation (Computer / General)',
    'Matriculation (Science)',
    'Intermediate (ICS / Pre-Engineering)',
    'Intermediate (Pre-Medical / Arts)',
    'DAE Technical Diploma',
    'Bachelors / Graduation Degree'
  ];

  const shifts = [
    {
      id: 'Morning (9:00 AM - 11:00 AM)',
      label: 'Morning Shift',
      time: '9:00 AM - 11:00 AM',
      icon: 'wb_sunny',
      badge: 'Best for Fresh Matric/Inter'
    },
    {
      id: 'Afternoon (11:30 AM - 1:30 PM)',
      label: 'Afternoon Shift',
      time: '11:30 AM - 1:30 PM',
      icon: 'light_mode',
      badge: 'Girls & Combined Batch'
    },
    {
      id: 'Evening Shift A (4:00 PM - 6:00 PM)',
      label: 'Evening Shift A',
      time: '4:00 PM - 6:00 PM',
      icon: 'schedule',
      badge: 'Professional & Students'
    },
    {
      id: 'Evening Shift B (6:30 PM - 8:30 PM)',
      label: 'Evening Shift B',
      time: '6:30 PM - 8:30 PM',
      icon: 'dark_mode',
      badge: 'Job Holders & Freelancers'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !fatherName.trim() || !phone.trim()) {
      alert('Please fill out all mandatory fields: Student Name, Father Name, and Contact Cell Number.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newApp = submitAdmission({
        studentName: studentName.trim(),
        fatherName: fatherName.trim(),
        gender,
        cnicOrBForm: cnicOrBForm.trim() || 'To be verified at campus',
        phone: phone.trim(),
        whatsapp: (whatsapp.trim() || phone.trim()),
        email: email.trim(),
        address: address.trim() || 'Shershah, Karachi',
        cityArea,
        lastEducation,
        courseId: activeCourse.id,
        courseTitle: activeCourse.title,
        preferredShift,
        feeAmount: activeCourse.admissionFee, // ONLY Admission Fee is charged on admission
        notes: `Registered online for ${activeCourse.title}. Admission Fee: Rs. ${activeCourse.admissionFee}. Shift: ${preferredShift}.`
      });

      setFormSubmitted(newApp);
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 700);
  };

  const handleCopyId = () => {
    if (formSubmitted) {
      navigator.clipboard.writeText(formSubmitted.applicationNumber);
      setCopiedAppId(true);
      setTimeout(() => setCopiedAppId(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleResetForm = () => {
    setFormSubmitted(null);
    setLastSubmittedApp(null);
    setStudentName('');
    setFatherName('');
    setCnicOrBForm('');
    setPhone('');
    setWhatsapp('');
    setEmail('');
    setAddress('');
  };

  const logoSrc = "https://lh3.googleusercontent.com/aida-public/AB6AXuBsnhho_RfSW76AJ4zSKPX14du6gNZ1nr3iiGidABdnnysvsrGNQo7P0b8BrJ8MJuzc0EWFI20P0PW5RJRYv99MsAWoZJ1DEYH4hYVWinR0N_ZfMqsLrpNSQ5Jj7veZqZ7kXM64w07sNpBFJQRXJWa7FgCaGiYAyOxB7Pb7ydZqfpmWyJedzkDNEQZUmq7eNxjrdaFz4zVAbjH5bm-1ucfb7FuGoiGKG5QSb0iitMbU_o7cQtmOkrvnxarkvWrYMFCCpg";

  return (
    <div className="w-full bg-[#09090b] py-10 relative">
      {/* Background glow highlights */}
      <div className="absolute top-10 left-1/3 w-[500px] h-[350px] bg-red-600/10 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 relative z-10">

        {/* ========================================================================= */}
        {/* IF APPLICATION IS SUBMITTED: CELEBRATORY SUCCESS SCREEN & OFFICIAL VOUCHER */}
        {/* ========================================================================= */}
        {formSubmitted ? (
          <>
            <ConfettiEffect />
            <div className="flex flex-col gap-8 animate-in fade-in zoom-in-95 duration-500 max-w-4xl mx-auto w-full">
              {/* Celebratory Banner */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-950/80 via-[#18171c] to-emerald-950/80 border-2 border-red-500/50 p-8 shadow-[0_0_50px_rgba(211,16,39,0.4)] text-center flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.5)] animate-bounce">
                  <span className="material-symbols-outlined text-4xl text-emerald-400 font-bold">
                    check_circle
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 font-mono-code text-xs font-bold border border-emerald-500/40 uppercase tracking-widest">
                    Application Verified &amp; Generated
                  </span>
                  <h1 className="font-outfit text-3xl sm:text-4xl text-white font-black mt-2">
                    Congratulations, {formSubmitted.studentName}!
                  </h1>
                  <p className="font-sans-body text-sm text-[#e6bdba] mt-1 max-w-lg">
                    Your online admission application for <strong className="text-white">{formSubmitted.courseTitle}</strong> has been registered with Paradise Institute of Computer Education.
                  </p>
                </div>

                {/* Reference ID and 6-Digit Code cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                  <div className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-[#09090b]/90 border border-red-500/40">
                    <span className="font-mono-code text-[11px] text-[#e6bdba]">APPLICATION NO:</span>
                    <span className="font-mono-code text-lg sm:text-xl font-extrabold text-[#ff4a58] tracking-wider my-0.5">
                      {formSubmitted.applicationNumber}
                    </span>
                    <button
                      onClick={handleCopyId}
                      className="px-2.5 py-0.5 rounded-lg bg-[#222126] hover:bg-[#323038] text-white font-mono-code text-[11px] flex items-center gap-1 border border-[#2d2c33] transition-colors cursor-pointer mt-1"
                    >
                      <span className="material-symbols-outlined text-xs">
                        {copiedAppId ? 'check' : 'content_copy'}
                      </span>
                      <span>{copiedAppId ? 'Copied' : 'Copy Form No'}</span>
                    </button>
                  </div>

                  <div className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                    <span className="font-mono-code text-[11px] text-emerald-300 font-bold">6-DIGIT TRACKER PIN:</span>
                    <span className="font-mono-code text-2xl font-black text-emerald-400 tracking-widest my-0.5">
                      {formSubmitted.securityPin}
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(formSubmitted.securityPin);
                        setCopiedPin(true);
                        setTimeout(() => setCopiedPin(false), 2000);
                      }}
                      className="px-2.5 py-0.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 font-mono-code text-[11px] flex items-center gap-1 border border-emerald-500/40 transition-colors cursor-pointer mt-1"
                    >
                      <span className="material-symbols-outlined text-xs">
                        {copiedPin ? 'check' : 'content_copy'}
                      </span>
                      <span>{copiedPin ? 'Copied' : 'Copy 6-Digit PIN'}</span>
                    </button>
                  </div>
                </div>

                {/* WhatsApp One-Click & Tracker Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <a
                    href={`https://wa.me/923209061656?text=${encodeURIComponent(
                      `Assalam-o-Alaikum Paradise Institute Shershah! I have submitted my Online Admission Application for Session 2026.\n\n` +
                      `📋 Application ID: ${formSubmitted.applicationNumber}\n` +
                      `🔑 6-Digit Verification PIN: ${formSubmitted.securityPin}\n` +
                      `👤 Student Name: ${formSubmitted.studentName}\n` +
                      `👨‍👦 Father Name: ${formSubmitted.fatherName}\n` +
                      `💻 Applied Course: ${formSubmitted.courseTitle}\n` +
                      `🕒 Selected Shift: ${formSubmitted.preferredShift}\n` +
                      `🎟️ Admission Fee: Rs. ${activeCourse.admissionFee}\n\n` +
                      `Please confirm my workstation allocation at Shershah Campus.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-outfit text-sm font-bold shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-lg">chat</span>
                    <span>Confirm on WhatsApp (0320-9061656)</span>
                  </a>

                  <button
                    onClick={() => setCurrentRoute('tracker')}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-outfit text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-lg">fact_check</span>
                    <span>Track Status &amp; Ask Questions</span>
                  </button>

                  <button
                    onClick={handlePrint}
                    className="px-5 py-3 rounded-xl bg-white text-black hover:bg-gray-200 font-outfit text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-lg">print</span>
                    <span>Print Official Challan Voucher</span>
                  </button>
                </div>
              </div>

              {/* ========================================================= */}
              {/* OFFICIAL PRINTABLE ADMISSION VOUCHER (SHOWS ONLY ADMISSION FEE) */}
              {/* ========================================================= */}
              <div className="p-8 rounded-3xl bg-[#111114] border-2 border-red-500/50 shadow-2xl flex flex-col gap-6 print:bg-white print:text-black print:border-black">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-[#222126] print:border-gray-400">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-black flex items-center justify-center border-2 border-red-500 shadow-md shrink-0">
                      <img src={logoSrc} alt="Logo" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h2 className="font-outfit text-xl font-black text-white print:text-black tracking-wide">
                        PARADISE INSTITUTE OF COMPUTER EDUCATION
                      </h2>
                      <span className="font-mono-code text-xs text-[#ff4a58] font-bold block">
                        CAMPUS ADMISSION FEE CHALLAN (ACADEMIC YEAR 2026)
                      </span>
                      <span className="font-sans-body text-xs text-[#e6bdba] print:text-gray-600 block">
                        Street #63, Urdu Bazar, Shershah, Karachi • Contact: 0320-9061656 / 0319-9819503
                      </span>
                    </div>
                  </div>

                  <div className="text-right font-mono-code p-3 bg-[#18171c] print:bg-gray-100 rounded-xl border border-[#2d2c33] print:border-gray-300">
                    <div className="text-[11px] text-[#e6bdba] print:text-gray-500 uppercase">CHALLAN NUMBER</div>
                    <div className="text-xl text-[#ff4a58] print:text-red-700 font-black">{formSubmitted.applicationNumber}</div>
                    <div className="text-[11px] text-emerald-400 print:text-emerald-700 font-bold">PIN: {formSubmitted.securityPin}</div>
                    <div className="text-[10px] text-white print:text-gray-700">{formSubmitted.createdAt}</div>
                  </div>
                </div>

                {/* PROMINENT NOTE AS REQUESTED */}
                <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/50 text-center font-mono-code text-xs text-red-300 print:border-black print:text-black print:bg-gray-100">
                  ⚠️ <strong className="text-white print:text-black uppercase">Important Note:</strong> We charge different fees for different courses.
                </div>

                {/* Candidate Information Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 font-mono-code text-xs">
                  <div className="p-3 rounded-xl bg-[#18171c] print:bg-gray-50 border border-[#2d2c33] print:border-gray-300">
                    <span className="text-[#e6bdba] print:text-gray-500 text-[10px] block">STUDENT FULL NAME</span>
                    <span className="text-white print:text-black font-bold text-sm">{formSubmitted.studentName}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#18171c] print:bg-gray-50 border border-[#2d2c33] print:border-gray-300">
                    <span className="text-[#e6bdba] print:text-gray-500 text-[10px] block">FATHER / GUARDIAN</span>
                    <span className="text-white print:text-black font-bold text-sm">{formSubmitted.fatherName}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#18171c] print:bg-gray-50 border border-[#2d2c33] print:border-gray-300">
                    <span className="text-[#e6bdba] print:text-gray-500 text-[10px] block">CNIC / B-FORM NO</span>
                    <span className="text-white print:text-black font-bold text-sm">{formSubmitted.cnicOrBForm}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#18171c] print:bg-gray-50 border border-[#2d2c33] print:border-gray-300">
                    <span className="text-[#e6bdba] print:text-gray-500 text-[10px] block">REGISTERED PROGRAM</span>
                    <span className="text-[#ff4a58] print:text-red-700 font-bold text-sm">{formSubmitted.courseTitle}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#18171c] print:bg-gray-50 border border-[#2d2c33] print:border-gray-300">
                    <span className="text-[#e6bdba] print:text-gray-500 text-[10px] block">SELECTED SHIFT</span>
                    <span className="text-white print:text-black font-bold text-sm">{formSubmitted.preferredShift}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#18171c] print:bg-gray-50 border border-[#2d2c33] print:border-gray-300">
                    <span className="text-[#e6bdba] print:text-gray-500 text-[10px] block">CONTACT CELL</span>
                    <span className="text-white print:text-black font-bold text-sm">{formSubmitted.phone}</span>
                  </div>
                </div>

                {/* ADMISSION FEE EXCLUSIVE BREAKDOWN */}
                <div className="border border-red-500/40 print:border-gray-400 rounded-2xl overflow-hidden">
                  <div className="bg-[#18171c] print:bg-gray-100 p-3.5 border-b border-[#2d2c33] print:border-gray-300 flex items-center justify-between font-mono-code text-xs">
                    <span className="text-[#e6bdba] print:text-gray-700 font-bold uppercase">Payable Fee Component</span>
                    <span className="text-[#e6bdba] print:text-gray-700 font-bold uppercase">Amount (PKR)</span>
                  </div>
                  <div className="p-4 flex flex-col gap-3 font-mono-code">
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <span className="text-white print:text-black font-bold block">
                          Admission &amp; Registration Fee: {activeCourse.title}
                        </span>
                        <span className="text-xs text-[#e6bdba] print:text-gray-600 block mt-0.5">
                          Includes student ID enrollment, dedicated PC lab bench assignment, and orientation kit.
                        </span>
                      </div>
                      <span className="text-lg font-black text-white print:text-black">
                        Rs. {activeCourse.admissionFee.toLocaleString()}
                      </span>
                    </div>

                    <div className="pt-3 border-t border-[#222126] print:border-gray-300 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="font-outfit text-sm text-[#ff4a58] print:text-red-700 font-bold uppercase">
                          TOTAL ADMISSION FEE PAYABLE AT DESK:
                        </span>
                        <span className="text-[11px] text-[#e6bdba] print:text-gray-500">
                          (Note: We charge different fees for different courses)
                        </span>
                      </div>
                      <span className="font-outfit text-2xl font-black text-white print:text-black bg-red-950/60 print:bg-transparent px-3 py-1 rounded-lg border border-red-500/40 print:border-none">
                        Rs. {activeCourse.admissionFee.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Next Steps & Verification Stamp */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center pt-2 font-mono-code text-xs text-[#e6bdba] print:text-gray-600">
                  <div className="flex flex-col gap-1.5">
                    <span className="font-bold text-white print:text-black">Campus Desk Instructions:</span>
                    <p>1. Deposit this Admission Fee challan at Paradise Institute Shershah Campus desk.</p>
                    <p>2. Bring 2 recent passport-size photos and 1 copy of CNIC or B-Form.</p>
                    <p>3. Online payment can also be transferred via JazzCash/Easypaisa to 0320-9061656.</p>
                  </div>

                  <div className="flex flex-col items-center sm:items-end justify-center">
                    <div className="w-52 h-20 border-2 border-dashed border-red-500/50 print:border-gray-400 rounded-xl flex flex-col items-center justify-center text-center p-2">
                      <span className="text-[9px] text-[#e6bdba] print:text-gray-400 uppercase">OFFICIAL VERIFICATION STAMP</span>
                      <span className="text-xs text-[#ff4a58] print:text-black font-bold">PARADISE ADMISSION CELL</span>
                      <span className="text-[9px] text-[#e6bdba] print:text-gray-500">SHERSHAH, KARACHI</span>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#222126] print:hidden">
                  <button
                    onClick={handleResetForm}
                    className="px-5 py-2.5 rounded-xl bg-[#18171c] hover:bg-[#222126] text-white font-outfit text-xs font-semibold border border-[#2d2c33] cursor-pointer"
                  >
                    + Enroll Another Student
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrint}
                      className="px-5 py-2.5 rounded-xl bg-white text-black font-outfit text-xs font-bold hover:bg-gray-200 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">print</span>
                      <span>Print Voucher Copy</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (

          /* ========================================================================= */
          /* MAIN ADMISSION FORM: HIGHLY ATTRACTIVE & MODERN WITH DEDICATED FEE NOTICES */
          /* ========================================================================= */
          <>
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#222126] pb-6">
              <div>
                <div className="flex items-center gap-2 font-mono-code text-xs text-[#ff4a58] uppercase font-bold tracking-wider">
                  <span>// ONLINE ADMISSION DESK 2026</span>
                </div>
                <h1 className="font-outfit text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold mt-1">
                  Candidate Admission &amp; Enrollment
                </h1>
                <p className="font-sans-body text-sm text-[#e6bdba] mt-2 max-w-2xl">
                  Reserve your workstation bench at Karachi's leading technical computer academy. Fill out your details below to generate your official admission challan.
                </p>
              </div>

              {/* Admission Open Badge */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18171c] border border-red-500/40">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="font-mono-code text-xs text-white font-semibold">
                  Lab Workstations Available
                </span>
              </div>
            </div>

            {/* MANDATORY PROMINENT NOTE BANNER */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950/70 via-[#18171c] to-red-950/70 border border-red-500/60 shadow-[0_0_25px_rgba(211,16,39,0.3)] flex items-center gap-3">
              <span className="material-symbols-outlined text-2xl text-[#ff4a58] shrink-0 animate-pulse">
                campaign
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 w-full">
                <div className="font-mono-code text-xs sm:text-sm text-white">
                  <span className="font-bold text-[#ff4a58]">NOTE: </span>
                  We charge different fees for different courses. Your specific Admission Fee is displayed below based on your selected program.
                </div>
                <span className="px-2.5 py-1 rounded bg-black/60 text-red-300 font-mono-code text-[11px] border border-red-500/40 shrink-0 font-bold">
                  Course-Specific Fees
                </span>
              </div>
            </div>

            {/* Form Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Form Left Column */}
              <form onSubmit={handleSubmit} className="lg:col-span-8 flex flex-col gap-6">

                {/* STEP 1: INTERACTIVE COURSE SELECTOR CARDS */}
                <div className="p-6 sm:p-7 rounded-3xl bg-[#111114] border border-[#222126] shadow-xl flex flex-col gap-5">
                  <div className="flex items-center justify-between pb-3 border-b border-[#222126]">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-full bg-[#d31027] text-white font-mono-code text-xs flex items-center justify-center font-bold shadow-md">
                        1
                      </span>
                      <h3 className="font-outfit text-lg text-white font-bold">
                        Select Academic Program
                      </h3>
                    </div>
                    <span className="font-mono-code text-xs text-[#ff4a58] font-semibold">
                      Admission Fee: Rs. {activeCourse.admissionFee.toLocaleString()}
                    </span>
                  </div>

                  {/* Course Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {courses.map(course => {
                      const isSelected = selectedCourseId === course.id;
                      return (
                        <div
                          key={course.id}
                          onClick={() => setSelectedCourseId(course.id)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                            isSelected
                              ? 'bg-gradient-to-br from-red-950/50 to-[#18171c] border-[#ff4a58] shadow-[0_0_20px_rgba(211,16,39,0.35)] ring-1 ring-[#ff4a58]'
                              : 'bg-[#18171c] border-[#2d2c33] hover:border-[#ff4a58]/50 hover:bg-[#222126]'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex flex-col">
                              <span className="font-mono-code text-[11px] text-[#ff4a58] font-bold">
                                {course.shortCode} • {course.duration}
                              </span>
                              <h4 className="font-outfit text-sm font-bold text-white mt-0.5 leading-snug">
                                {course.title}
                              </h4>
                            </div>
                            <span className={`material-symbols-outlined text-xl ${isSelected ? 'text-[#ff4a58]' : 'text-gray-600'}`}>
                              {isSelected ? 'check_circle' : 'radio_button_unchecked'}
                            </span>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-[#222126]/80 text-xs font-mono-code">
                            <span className="text-[#e6bdba] text-[11px]">Admission Fee:</span>
                            <span className="font-bold text-[#ff4a58] text-sm">
                              Rs. {course.admissionFee.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Selected Course Note */}
                  <div className="p-3 rounded-xl bg-[#18171c] border border-red-500/30 flex items-center justify-between text-xs font-mono-code">
                    <span className="text-[#e6bdba]">
                      Selected: <strong className="text-white">{activeCourse.title}</strong>
                    </span>
                    <span className="text-[#ff4a58] font-bold">
                      Admission Fee: Rs. {activeCourse.admissionFee.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* STEP 2: SHIFT TIMINGS SELECTION */}
                <div className="p-6 sm:p-7 rounded-3xl bg-[#111114] border border-[#222126] shadow-xl flex flex-col gap-5">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-[#222126]">
                    <span className="w-7 h-7 rounded-full bg-[#d31027] text-white font-mono-code text-xs flex items-center justify-center font-bold shadow-md">
                      2
                    </span>
                    <h3 className="font-outfit text-lg text-white font-bold">
                      Choose Your Preferred Lab Shift
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {shifts.map(shift => {
                      const isShiftSelected = preferredShift === shift.id;
                      return (
                        <div
                          key={shift.id}
                          onClick={() => setPreferredShift(shift.id as any)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                            isShiftSelected
                              ? 'bg-gradient-to-br from-red-950/40 to-[#18171c] border-[#ff4a58] shadow-[0_0_15px_rgba(211,16,39,0.3)] ring-1 ring-[#ff4a58]'
                              : 'bg-[#18171c] border-[#2d2c33] hover:border-[#ff4a58]/50'
                          }`}
                        >
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                            isShiftSelected ? 'bg-[#d31027] text-white' : 'bg-[#222126] text-[#ff4a58]'
                          }`}>
                            <span className="material-symbols-outlined text-xl">{shift.icon}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-outfit text-sm font-bold text-white leading-tight">
                              {shift.label}
                            </span>
                            <span className="font-mono-code text-xs text-[#ff4a58] font-semibold mt-0.5">
                              {shift.time}
                            </span>
                            <span className="font-sans-body text-[11px] text-[#e6bdba]">
                              {shift.badge}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* STEP 3: CANDIDATE PERSONAL INFORMATION */}
                <div className="p-6 sm:p-7 rounded-3xl bg-[#111114] border border-[#222126] shadow-xl flex flex-col gap-5">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-[#222126]">
                    <span className="w-7 h-7 rounded-full bg-[#d31027] text-white font-mono-code text-xs flex items-center justify-center font-bold shadow-md">
                      3
                    </span>
                    <h3 className="font-outfit text-lg text-white font-bold">
                      Student Personal Details
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono-code text-xs text-[#e6bdba] mb-1.5 font-semibold">
                        Student Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="e.g. Muhammad Kashan"
                        className="w-full px-4 py-3 rounded-xl bg-[#18171c] border border-[#2d2c33] text-white font-sans-body text-xs focus:outline-none focus:border-[#ff4a58] focus:ring-1 focus:ring-[#ff4a58] transition-all"
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
                        placeholder="e.g. Muhammad Aslam"
                        className="w-full px-4 py-3 rounded-xl bg-[#18171c] border border-[#2d2c33] text-white font-sans-body text-xs focus:outline-none focus:border-[#ff4a58] focus:ring-1 focus:ring-[#ff4a58] transition-all"
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
                              : 'bg-[#18171c] text-[#e6bdba] border-[#2d2c33] hover:text-white'
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
                              : 'bg-[#18171c] text-[#e6bdba] border-[#2d2c33] hover:text-white'
                          }`}
                        >
                          <span className="material-symbols-outlined text-sm">female</span>
                          <span>Female</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono-code text-xs text-[#e6bdba] mb-1.5 font-semibold">
                        CNIC / B-Form Number
                      </label>
                      <input
                        type="text"
                        value={cnicOrBForm}
                        onChange={(e) => setCnicOrBForm(e.target.value)}
                        placeholder="42401-XXXXXXX-X"
                        className="w-full px-4 py-3 rounded-xl bg-[#18171c] border border-[#2d2c33] text-white font-sans-body text-xs focus:outline-none focus:border-[#ff4a58] focus:ring-1 focus:ring-[#ff4a58] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono-code text-xs text-[#e6bdba] mb-1.5 font-semibold">
                        Primary Cell Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0320-XXXXXXX"
                        className="w-full px-4 py-3 rounded-xl bg-[#18171c] border border-[#2d2c33] text-white font-sans-body text-xs focus:outline-none focus:border-[#ff4a58] focus:ring-1 focus:ring-[#ff4a58] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block font-mono-code text-xs text-[#e6bdba] mb-1.5 font-semibold">
                        WhatsApp Number (for Challan copy)
                      </label>
                      <input
                        type="tel"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="0320-XXXXXXX"
                        className="w-full px-4 py-3 rounded-xl bg-[#18171c] border border-[#2d2c33] text-white font-sans-body text-xs focus:outline-none focus:border-[#ff4a58] focus:ring-1 focus:ring-[#ff4a58] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono-code text-xs text-[#e6bdba] mb-1.5 font-semibold">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#18171c] border border-[#2d2c33] text-white font-sans-body text-xs focus:outline-none focus:border-[#ff4a58] focus:ring-1 focus:ring-[#ff4a58] transition-all"
                    />
                  </div>
                </div>

                {/* STEP 4: ACADEMIC LEVEL & KARACHI LOCATION */}
                <div className="p-6 sm:p-7 rounded-3xl bg-[#111114] border border-[#222126] shadow-xl flex flex-col gap-5">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-[#222126]">
                    <span className="w-7 h-7 rounded-full bg-[#d31027] text-white font-mono-code text-xs flex items-center justify-center font-bold shadow-md">
                      4
                    </span>
                    <h3 className="font-outfit text-lg text-white font-bold">
                      Education &amp; Karachi Campus Vicinity
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono-code text-xs text-[#e6bdba] mb-1.5 font-semibold">
                        Prior Educational Qualification
                      </label>
                      <select
                        value={lastEducation}
                        onChange={(e) => setLastEducation(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#18171c] border border-[#2d2c33] text-white font-sans-body text-xs focus:outline-none focus:border-[#ff4a58] transition-all"
                      >
                        {educationOptions.map((edu, idx) => (
                          <option key={idx} value={edu}>{edu}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-mono-code text-xs text-[#e6bdba] mb-1.5 font-semibold">
                        Karachi Residential Area
                      </label>
                      <select
                        value={cityArea}
                        onChange={(e) => setCityArea(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#18171c] border border-[#2d2c33] text-white font-sans-body text-xs focus:outline-none focus:border-[#ff4a58] transition-all"
                      >
                        {karachiAreas.map((area, idx) => (
                          <option key={idx} value={area}>{area}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Area Quick Selector Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="text-[11px] font-mono-code text-[#e6bdba] self-center mr-1">Quick Select:</span>
                    {karachiAreas.slice(0, 5).map((a, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setCityArea(a)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-mono-code transition-colors ${
                          cityArea === a
                            ? 'bg-[#d31027] text-white font-bold'
                            : 'bg-[#18171c] text-[#e6bdba] hover:text-white border border-[#2d2c33]'
                        }`}
                      >
                        {a.split(',')[0]}
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="block font-mono-code text-xs text-[#e6bdba] mb-1.5 font-semibold">
                      Full Street / House Address
                    </label>
                    <textarea
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. Street #63, Near Jamia Masjid, Urdu Bazar, Shershah..."
                      className="w-full px-4 py-3 rounded-xl bg-[#18171c] border border-[#2d2c33] text-white font-sans-body text-xs focus:outline-none focus:border-[#ff4a58] transition-all"
                    ></textarea>
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#d31027] via-[#ff4a58] to-[#d31027] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 text-white font-outfit text-base font-black uppercase tracking-wider shadow-[0_0_35px_rgba(211,16,39,0.7)] transition-all flex items-center justify-center gap-2 border border-red-400/50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
                      <span>Generating Official Admission Challan...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Application &amp; View Admission Challan</span>
                      <span className="material-symbols-outlined text-xl">arrow_forward</span>
                    </>
                  )}
                </button>
              </form>

              {/* Sidebar Right Column: ADMISSION FEE EXCLUSIVE HIGHLIGHT */}
              <div className="lg:col-span-4 flex flex-col gap-6 sticky top-24">
                {/* Dedicated Admission Fee Highlight Box */}
                <div className="p-6 rounded-3xl bg-gradient-to-br from-[#18171c] to-[#111114] border-2 border-red-500/50 shadow-2xl flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#222126]">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#ff4a58] text-2xl">confirmation_number</span>
                      <h3 className="font-outfit text-base text-white font-bold">
                        Admission Fee Details
                      </h3>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-red-950 text-red-300 font-mono-code text-[10px] font-bold border border-red-500/40">
                      ON-SPOT
                    </span>
                  </div>

                  {/* PROMINENT NOTE AGAIN IN SIDEBAR */}
                  <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-[11px] font-mono-code text-red-200 leading-snug">
                    📌 <strong>Note:</strong> We charge different fees for different courses.
                  </div>

                  <div className="flex flex-col gap-3 font-mono-code text-xs">
                    <div className="flex justify-between items-center text-[#e6bdba]">
                      <span>Course Program:</span>
                      <span className="text-white font-bold text-right max-w-[170px] truncate">
                        {activeCourse.title}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-[#e6bdba]">
                      <span>Program Duration:</span>
                      <span className="text-white font-semibold">{activeCourse.duration}</span>
                    </div>

                    <div className="flex justify-between items-center text-[#e6bdba]">
                      <span>Workstation Lab Bench:</span>
                      <span className="text-emerald-400 font-semibold">Included</span>
                    </div>

                    {/* ONLY ADMISSION FEE DISPLAYED */}
                    <div className="pt-3 border-t border-[#222126] flex flex-col gap-1">
                      <span className="text-xs text-[#e6bdba] uppercase">
                        Admission Fee for this Course:
                      </span>
                      <div className="flex items-baseline justify-between">
                        <span className="font-outfit text-3xl font-black text-[#ff4a58]">
                          Rs. {activeCourse.admissionFee.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-white font-mono-code">One-Time</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#09090b] border border-[#2d2c33] text-[11px] font-sans-body text-[#e6bdba] leading-relaxed">
                    ✓ Official Student Roll &amp; Workstation assigned.<br />
                    ✓ All lab practical software suites included.<br />
                    ✓ Govt. aligned course certification.
                  </div>
                </div>

                {/* Campus Visiting & Helpline Card */}
                <div className="p-6 rounded-3xl bg-[#111114] border border-[#222126] shadow-xl flex flex-col gap-3">
                  <span className="font-mono-code text-xs text-[#ff4a58] font-bold uppercase tracking-wider">
                    Need Guidance on Admissions?
                  </span>
                  <p className="font-sans-body text-xs text-[#e6bdba]">
                    Walk-in counseling is free daily from 9:00 AM to 9:00 PM at Street #63, Urdu Bazar, Shershah.
                  </p>
                  <div className="flex flex-col gap-2 font-mono-code text-xs">
                    <a
                      href="tel:03209061656"
                      className="p-3 rounded-xl bg-[#18171c] hover:bg-[#222126] text-white flex items-center justify-between border border-[#2d2c33] transition-colors"
                    >
                      <span className="text-[#e6bdba]">Admissions Line:</span>
                      <span className="text-[#ff4a58] font-bold">0320-9061656</span>
                    </a>
                    <a
                      href="tel:03199819503"
                      className="p-3 rounded-xl bg-[#18171c] hover:bg-[#222126] text-white flex items-center justify-between border border-[#2d2c33] transition-colors"
                    >
                      <span className="text-[#e6bdba]">Campus Helpdesk:</span>
                      <span className="text-[#ff4a58] font-bold">0319-9819503</span>
                    </a>
                  </div>
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
