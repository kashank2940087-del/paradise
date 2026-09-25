import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const InquiryPage: React.FC = () => {
  const { submitInquiry, setIsWhatsAppModalOpen } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState<'admission' | 'fees' | 'medical_courses' | 'cit_diploma' | 'general'>('admission');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) {
      alert('Please fill out Name, Phone, and your Inquiry Message.');
      return;
    }

    submitInquiry({
      name,
      phone,
      email,
      topic,
      message
    });

    setSubmitted(true);
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
  };

  const faqs = [
    {
      q: 'Are Paradise Institute diplomas recognized by the Sindh Board (SBTE)?',
      a: 'Yes, our 1-Year CIT (Certificate in Information Technology) and vocational tracks follow the official curriculum guidelines of the Sindh Board of Technical Education (SBTE) and Trade Testing Board (TTB), enabling students to apply for government IT jobs and private sector positions.'
    },
    {
      q: 'Are there separate morning classes and lab timings for female students?',
      a: 'Yes, we provide dedicated, comfortable morning shift timings (9:00 AM to 11:00 AM and 11:30 AM to 1:30 PM) with female instructors and separate seating provisions for female students.'
    },
    {
      q: 'Can students pay course fees in monthly installments?',
      a: 'Absolutely. We believe education should be accessible to all. All multi-month diploma courses (CIT, Graphic Design, Web Development, Medical Lab) can be paid in easy monthly installments after an initial admission registration voucher.'
    },
    {
      q: 'What are the computer laboratory hardware specifications?',
      a: 'Our Shershah campus lab features high-speed Core i5/i7 workstations equipped with 16GB RAM, dual monitors, dedicated SSD storage, high-speed fiber-optic Wi-Fi, and heavy-duty backup generator power to ensure uninterrupted coding and design sessions.'
    },
    {
      q: 'Do you help students set up freelance profiles on Fiverr and Upwork?',
      a: 'Yes! Every design and coding track includes a 2-week practical Freelance Launchpad module where instructors guide students on gig setup, portfolio creation on Behance/GitHub, buyer requests bidding, and local payment withdrawal via JazzCash/Bank accounts.'
    }
  ];

  return (
    <div className="w-full bg-[#09090b] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#222126] pb-8">
          <div>
            <div className="flex items-center gap-2 font-mono-code text-xs text-[#ff4a58] uppercase font-bold tracking-wider">
              <span>// HELP &amp; COUNSELING DESK</span>
            </div>
            <h1 className="font-outfit text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold mt-1">
              Support &amp; Student Inquiries
            </h1>
            <p className="font-sans-body text-sm text-[#e6bdba] mt-2 max-w-2xl">
              Have questions regarding course schedules, fee vouchers, or admission criteria? Send us an inquiry or connect with our academic counseling team directly.
            </p>
          </div>

          <button
            onClick={() => setIsWhatsAppModalOpen(true)}
            className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-outfit text-xs font-bold flex items-center gap-2 shadow-lg cursor-pointer self-start md:self-auto"
          >
            <span className="material-symbols-outlined text-base">chat</span>
            <span>Live WhatsApp Helpdesk</span>
          </button>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inquiry Form */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#111114] border border-[#222126] shadow-xl flex flex-col gap-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#222126]">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#ff4a58]">mail</span>
                  <h3 className="font-outfit text-lg text-white font-bold">
                    Send Direct Inquiry to Admissions
                  </h3>
                </div>
                <span className="font-mono-code text-[11px] text-[#e6bdba]">Avg reply: &lt; 2 hrs</span>
              </div>

              {submitted ? (
                <div className="p-6 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 flex flex-col items-center text-center gap-3">
                  <span className="material-symbols-outlined text-4xl text-emerald-400">task_alt</span>
                  <h4 className="font-outfit text-lg font-bold text-white">Inquiry Received Successfully!</h4>
                  <p className="font-sans-body text-xs text-emerald-300 max-w-md">
                    Our academic counselor will contact you via phone / WhatsApp shortly. You can also visit our campus in Urdu Bazar, Shershah.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 px-4 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-mono-code cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono-code text-xs text-[#e6bdba] mb-1 font-semibold">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Asad Ullah"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#18171c] border border-[#2d2c33] text-white font-sans-body text-xs focus:outline-none focus:border-[#ff4a58]"
                      />
                    </div>
                    <div>
                      <label className="block font-mono-code text-xs text-[#e6bdba] mb-1 font-semibold">
                        Mobile Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0320-XXXXXXX"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#18171c] border border-[#2d2c33] text-white font-sans-body text-xs focus:outline-none focus:border-[#ff4a58]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono-code text-xs text-[#e6bdba] mb-1 font-semibold">
                        Query Category
                      </label>
                      <select
                        value={topic}
                        onChange={(e) => setTopic(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#18171c] border border-[#2d2c33] text-white font-sans-body text-xs focus:outline-none focus:border-[#ff4a58]"
                      >
                        <option value="admission">New Admission Details</option>
                        <option value="fees">Fee Voucher &amp; Installments</option>
                        <option value="cit_diploma">CIT 1-Year Diploma Information</option>
                        <option value="medical_courses">Medical Lab &amp; Nursing Courses</option>
                        <option value="general">Campus Visiting &amp; Timing</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-mono-code text-xs text-[#e6bdba] mb-1 font-semibold">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="student@example.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#18171c] border border-[#2d2c33] text-white font-sans-body text-xs focus:outline-none focus:border-[#ff4a58]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono-code text-xs text-[#e6bdba] mb-1 font-semibold">
                      Your Message or Question *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please mention your question regarding batch timings, prerequisites, or fee breakdown..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#18171c] border border-[#2d2c33] text-white font-sans-body text-xs focus:outline-none focus:border-[#ff4a58]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-[#d31027] hover:bg-[#ff4a58] text-white font-outfit text-sm font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(211,16,39,0.5)] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Send Inquiry Message</span>
                    <span className="material-symbols-outlined text-sm">send</span>
                  </button>
                </form>
              )}
            </div>

            {/* Campus Contact Card */}
            <div className="p-6 rounded-2xl bg-[#111114] border border-[#222126] flex flex-col gap-4">
              <h3 className="font-outfit text-base text-white font-bold">
                Shershah Campus Academic Helplines
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-[#18171c] border border-[#2d2c33] flex flex-col gap-1">
                  <span className="font-mono-code text-xs text-[#ff4a58] font-bold">
                    Primary Academic Line
                  </span>
                  <a href="tel:03209061656" className="font-outfit text-lg text-white font-black hover:text-[#ff4a58]">
                    0320-9061656
                  </a>
                  <span className="font-sans-body text-xs text-[#e6bdba]">Counselor: Sir Tariq &amp; Team</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#18171c] border border-[#2d2c33] flex flex-col gap-1">
                  <span className="font-mono-code text-xs text-[#ff4a58] font-bold">
                    Helpdesk &amp; Verification
                  </span>
                  <a href="tel:03199819503" className="font-outfit text-lg text-white font-black hover:text-[#ff4a58]">
                    0319-9819503
                  </a>
                  <span className="font-sans-body text-xs text-[#e6bdba]">Accounts &amp; Admissions Desk</span>
                </div>
              </div>
            </div>
          </div>

          {/* FAQs and Location Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Campus Timings & Location Card */}
            <div className="p-6 rounded-2xl bg-[#111114] border border-[#222126] shadow-xl flex flex-col gap-4">
              <div className="flex items-center gap-2 pb-2 border-b border-[#222126]">
                <span className="material-symbols-outlined text-[#ff4a58]">location_on</span>
                <h3 className="font-outfit text-base text-white font-bold">
                  Walk-in Campus Information
                </h3>
              </div>

              <div className="flex flex-col gap-2 text-xs">
                <span className="font-mono-code text-[#ff4a58] font-bold">Official Campus Location:</span>
                <p className="font-sans-body text-white font-medium">
                  Street #63, Urdu Bazar, Shershah, Karachi, Sindh, Pakistan.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#18171c] border border-[#2d2c33] flex flex-col gap-1.5 font-mono-code text-xs">
                <div className="flex justify-between text-white font-semibold">
                  <span>Monday - Saturday:</span>
                  <span className="text-[#ff4a58]">9:00 AM - 9:00 PM</span>
                </div>
                <div className="flex justify-between text-[#e6bdba]">
                  <span>Sunday:</span>
                  <span>Closed (Emergency calls only)</span>
                </div>
              </div>

              <p className="font-sans-body text-xs text-[#e6bdba]">
                Free career counseling sessions are available daily without any prior appointment. Visit the reception desk on the ground floor.
              </p>
            </div>

            {/* Frequently Asked Questions */}
            <div className="p-6 rounded-2xl bg-[#111114] border border-[#222126] shadow-xl flex flex-col gap-4">
              <div className="flex items-center gap-2 pb-2 border-b border-[#222126]">
                <span className="material-symbols-outlined text-[#ff4a58]">quiz</span>
                <h3 className="font-outfit text-base text-white font-bold">
                  Frequently Asked Questions
                </h3>
              </div>

              <div className="flex flex-col gap-3">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-xl bg-[#18171c] border border-[#2d2c33] overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full p-3.5 text-left flex items-center justify-between gap-2 hover:bg-[#222126] transition-colors cursor-pointer"
                      >
                        <span className="font-outfit text-xs sm:text-sm text-white font-bold">
                          {faq.q}
                        </span>
                        <span className="material-symbols-outlined text-sm text-[#ff4a58] shrink-0">
                          {isOpen ? 'expand_less' : 'expand_more'}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="p-3.5 pt-0 font-sans-body text-xs text-[#e6bdba] leading-relaxed border-t border-[#222126]/60">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
