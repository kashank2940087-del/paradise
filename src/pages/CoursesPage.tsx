import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Course } from '../types';

export const CoursesPage: React.FC = () => {
  const { courses, setCurrentRoute, setSelectedCourseForEnrollment } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCourseDetail, setActiveCourseDetail] = useState<Course | null>(null);

  const categories = [
    { id: 'all', label: 'All Career Tracks' },
    { id: 'it', label: 'Information Technology' },
    { id: 'graphic', label: 'Graphic & Digital Media' },
    { id: 'medical', label: 'Healthcare & Medical' },
    { id: 'ecommerce', label: 'E-Commerce & Freelance' },
    { id: 'ai', label: '🤖 AI & Machine Learning' }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.shortCode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleEnrollNow = (course: Course) => {
    setSelectedCourseForEnrollment(course);
    setCurrentRoute('admission');
  };

  return (
    <div className="w-full bg-[#09090b] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#222126] pb-8">
          <div>
            <div className="flex items-center gap-2 font-mono-code text-xs text-[#ff4a58] uppercase font-bold tracking-wider">
              <span>// ACADEMIC PROGRAMS &amp; DIPLOMAS</span>
            </div>
            <h1 className="font-outfit text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold mt-1">
              Career Certifications &amp; Diplomas
            </h1>
            <p className="font-sans-body text-sm text-[#e6bdba] mt-2 max-w-2xl">
              Govt.-aligned, market-proven syllabi structured for hands-on mastery. Learn in Karachi's dedicated high-performance computer laboratories.
            </p>
          </div>

          <button
            onClick={() => setCurrentRoute('admission')}
            className="px-6 py-3 rounded-lg bg-[#d31027] hover:bg-[#ff4a58] text-white font-outfit text-sm font-bold shadow-[0_0_20px_rgba(211,16,39,0.5)] transition-all cursor-pointer self-start md:self-auto"
          >
            Apply for Admission
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-lg font-outfit text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#d31027] text-white shadow-[0_0_12px_rgba(211,16,39,0.5)]'
                    : 'bg-[#18171c] text-[#e6bdba] hover:bg-[#222126] hover:text-white border border-[#2d2c33]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#e6bdba] text-lg">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses, keywords..."
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#18171c] border border-[#2d2c33] text-white font-sans-body text-xs focus:outline-none focus:border-[#ff4a58]"
            />
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => {
            const seatsRemaining = course.totalSeats - course.enrolledCount;
            const occupancyPercentage = Math.round((course.enrolledCount / course.totalSeats) * 100);

            return (
              <div
                key={course.id}
                className="flex flex-col rounded-2xl bg-[#111114] overflow-hidden border border-[#222126] card-tilt-hover justify-between"
              >
                <div>
                  {/* Card Thumbnail */}
                  <div className="relative h-48 w-full bg-[#222126] overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111114] via-[#111114]/30 to-transparent"></div>
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-[#09090b]/90 border border-red-500/40 font-mono-code text-[11px] text-[#ff4a58] font-bold">
                        {course.badge}
                      </span>
                      {course.isAdmissionsOpen ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-950/90 text-emerald-400 border border-emerald-500/40 font-mono-code text-[10px] font-semibold">
                          OPEN
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-red-950/90 text-red-400 border border-red-500/40 font-mono-code text-[10px] font-semibold">
                          CLOSED
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex flex-col gap-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono-code text-[#ff4a58] font-semibold">{course.duration}</span>
                      <span className="font-mono-code text-[#e6bdba]">{course.schedule}</span>
                    </div>

                    <h3 className="font-outfit text-lg text-white font-bold leading-snug">
                      {course.title}
                    </h3>

                    <p className="font-sans-body text-xs text-[#e6bdba] line-clamp-3 leading-relaxed">
                      {course.description}
                    </p>

                    {/* Seat Occupancy Meter */}
                    <div className="flex flex-col gap-1 pt-1">
                      <div className="flex justify-between font-mono-code text-[11px]">
                        <span className="text-[#e6bdba]">Batch Enrollment:</span>
                        <span className="text-[#ff4a58] font-semibold">
                          {course.enrolledCount}/{course.totalSeats} seats ({seatsRemaining} left)
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-[#18171c] overflow-hidden">
                        <div
                          className="h-full bg-[#d31027] rounded-full"
                          style={{ width: `${occupancyPercentage}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Fees Breakdown */}
                    <div className="p-3 rounded-xl bg-[#18171c] border border-[#2d2c33] flex items-center justify-between font-mono-code text-xs">
                      <div>
                        <span className="text-[#e6bdba] block text-[10px]">Monthly Tuition</span>
                        <span className="text-white font-bold text-sm">Rs. {course.monthlyFee.toLocaleString()}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[#e6bdba] block text-[10px]">Admission Fee</span>
                        <span className="text-[#ff4a58] font-semibold">Rs. {course.admissionFee.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="p-5 pt-0 flex gap-2">
                  <button
                    onClick={() => setActiveCourseDetail(course)}
                    className="flex-1 py-2 px-3 rounded-lg bg-[#222126] hover:bg-[#2d2c33] text-white font-outfit text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>View Syllabus</span>
                    <span className="material-symbols-outlined text-xs">visibility</span>
                  </button>
                  <button
                    onClick={() => handleEnrollNow(course)}
                    disabled={!course.isAdmissionsOpen}
                    className="flex-1 py-2 px-3 rounded-lg bg-[#d31027] hover:bg-[#ff4a58] disabled:bg-gray-800 disabled:text-gray-500 text-white font-outfit text-xs font-bold transition-all shadow-[0_0_12px_rgba(211,16,39,0.4)] flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Enroll Now</span>
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCourses.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-[#111114] border border-[#222126] flex flex-col items-center gap-3">
            <span className="material-symbols-outlined text-4xl text-[#ff4a58]">search_off</span>
            <h3 className="font-outfit text-lg text-white font-bold">No courses match your search</h3>
            <p className="font-sans-body text-xs text-[#e6bdba]">
              Try searching with another keyword or select "All Career Tracks" above.
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="mt-2 px-4 py-2 rounded-lg bg-[#222126] text-white text-xs font-mono-code"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* SYLLABUS & DETAILS MODAL */}
      {activeCourseDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#111114] p-6 shadow-2xl flex flex-col gap-5 border border-red-500/40 relative">
            <div className="flex items-start justify-between pb-3 border-b border-[#222126]">
              <div>
                <span className="font-mono-code text-xs text-[#ff4a58] font-bold">
                  {activeCourseDetail.badge} • {activeCourseDetail.shortCode}
                </span>
                <h2 className="font-outfit text-xl sm:text-2xl text-white font-extrabold mt-0.5">
                  {activeCourseDetail.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveCourseDetail(null)}
                className="text-[#e6bdba] hover:text-white p-1 rounded-lg hover:bg-[#18171c]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Quick Summary Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-[#18171c] border border-[#2d2c33]">
                <span className="font-mono-code text-[10px] text-[#e6bdba] block">Duration</span>
                <span className="font-outfit text-sm text-white font-bold">{activeCourseDetail.duration}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#18171c] border border-[#2d2c33]">
                <span className="font-mono-code text-[10px] text-[#e6bdba] block">Shifts Available</span>
                <span className="font-outfit text-sm text-white font-bold">{activeCourseDetail.schedule}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#18171c] border border-[#2d2c33]">
                <span className="font-mono-code text-[10px] text-[#e6bdba] block">Monthly Tuition</span>
                <span className="font-outfit text-sm text-[#ff4a58] font-bold">Rs. {activeCourseDetail.monthlyFee.toLocaleString()}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#18171c] border border-[#2d2c33]">
                <span className="font-mono-code text-[10px] text-[#e6bdba] block">Admission Fee</span>
                <span className="font-outfit text-sm text-white font-bold">Rs. {activeCourseDetail.admissionFee.toLocaleString()}</span>
              </div>
            </div>

            {/* Syllabus Modules */}
            <div>
              <h4 className="font-outfit text-sm text-white font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#ff4a58] text-base">format_list_bulleted</span>
                <span>Structured Curriculum Modules</span>
              </h4>
              <div className="flex flex-col gap-2">
                {activeCourseDetail.syllabus.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#18171c] border border-[#2d2c33] flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#222126] border border-red-500/30 text-[#ff4a58] font-mono-code text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="font-sans-body text-xs text-[#f5f5f7] leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prerequisites & Certification */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-[#18171c] border border-[#2d2c33]">
                <span className="font-mono-code text-[11px] text-[#ff4a58] font-bold block mb-1">
                  Eligibility &amp; Prerequisites:
                </span>
                <p className="font-sans-body text-xs text-[#e6bdba] leading-relaxed">
                  {activeCourseDetail.prerequisites}
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#18171c] border border-[#2d2c33]">
                <span className="font-mono-code text-[11px] text-[#ff4a58] font-bold block mb-1">
                  Issued Certification:
                </span>
                <p className="font-sans-body text-xs text-[#e6bdba] leading-relaxed">
                  {activeCourseDetail.certification}
                </p>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-[#222126] flex items-center justify-between gap-3">
              <span className="font-mono-code text-xs text-[#e6bdba]">
                Shershah Campus • Verified Computer Lab Bench
              </span>
              <button
                onClick={() => {
                  const course = activeCourseDetail;
                  setActiveCourseDetail(null);
                  handleEnrollNow(course);
                }}
                className="px-6 py-2.5 rounded-lg bg-[#d31027] hover:bg-[#ff4a58] text-white font-outfit text-sm font-bold shadow-[0_0_15px_rgba(211,16,39,0.5)] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Proceed to Admission Form</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
