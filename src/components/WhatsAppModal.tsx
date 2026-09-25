import React from 'react';
import { useApp } from '../context/AppContext';

export const WhatsAppModal: React.FC = () => {
  const { isWhatsAppModalOpen, setIsWhatsAppModalOpen } = useApp();

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        <button
          onClick={() => setIsWhatsAppModalOpen(!isWhatsAppModalOpen)}
          aria-label="Chat on WhatsApp"
          type="button"
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#1f1e24] text-[#ff4a58] shadow-[0_0_24px_rgba(211,16,39,0.5)] hover:shadow-[0_0_36px_rgba(211,16,39,0.9)] hover:scale-105 transition-all duration-300 backdrop-blur-xl border border-red-500/40 group cursor-pointer"
        >
          <span className="material-symbols-outlined text-2xl group-hover:animate-pulse text-[#ff4a58]">
            chat
          </span>
          <span className="hidden sm:inline font-mono-code text-xs font-bold tracking-wider text-white">
            SUPPORT CHAT
          </span>
        </button>
      </div>

      {/* Interactive Modal Component */}
      {isWhatsAppModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-2xl bg-[#111114] p-6 shadow-2xl flex flex-col gap-4 relative border border-red-500/40">
            <div className="flex items-center justify-between pb-3 border-b border-[#222126]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                <h3 className="font-outfit text-lg text-white font-bold">
                  Paradise WhatsApp Concierge
                </h3>
              </div>
              <button
                onClick={() => setIsWhatsAppModalOpen(false)}
                className="text-[#e6bdba] hover:text-white p-1 rounded-lg hover:bg-[#18171c] transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <p className="font-sans-body text-xs text-[#e6bdba]">
              Select your query topic to route instantly to an authorized institute counselor on WhatsApp line{' '}
              <span className="text-[#ff4a58] font-bold">0320-9061656</span>:
            </p>

            <div className="flex flex-col gap-2">
              <a
                href="https://wa.me/923209061656?text=Assalam-o-Alaikum%20Paradise%20Institute%2C%20I%20want%20to%20know%20details%20about%20New%20Admissions%20and%20Fee%20Structure."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsWhatsAppModalOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl bg-[#18171c] hover:bg-[#d31027] hover:text-white transition-colors group border border-[#2d2c33]"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#ff4a58] group-hover:text-white">
                    school
                  </span>
                  <span className="font-sans-body text-sm font-semibold text-white">
                    Admission Details &amp; Fee Voucher
                  </span>
                </div>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>

              <a
                href="https://wa.me/923209061656?text=Hello%20Paradise%20Institute%2C%20Please%20share%20the%20detailed%20syllabus%20for%20CIT%20and%20Computer%20Courses."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsWhatsAppModalOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl bg-[#18171c] hover:bg-[#d31027] hover:text-white transition-colors group border border-[#2d2c33]"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#ff4a58] group-hover:text-white">
                    menu_book
                  </span>
                  <span className="font-sans-body text-sm font-semibold text-white">
                    Course Syllabus &amp; Class Timings
                  </span>
                </div>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>

              <a
                href="https://wa.me/923209061656?text=Hello%20Paradise%20Institute%2C%20I%20am%20interested%20in%20Medical%20Lab%20and%20Nursing%20Support%20Courses."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsWhatsAppModalOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl bg-[#18171c] hover:bg-[#d31027] hover:text-white transition-colors group border border-[#2d2c33]"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#ff4a58] group-hover:text-white">
                    medical_services
                  </span>
                  <span className="font-sans-body text-sm font-semibold text-white">
                    Medical Courses &amp; Clinical Info
                  </span>
                </div>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>

              <a
                href="https://wa.me/923209061656?text=Hello%20Paradise%20Institute%2C%20I%20have%20a%20general%20question%20about%20your%20campus."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsWhatsAppModalOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl bg-[#18171c] hover:bg-[#d31027] hover:text-white transition-colors group border border-[#2d2c33]"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#ff4a58] group-hover:text-white">
                    help_outline
                  </span>
                  <span className="font-sans-body text-sm font-semibold text-white">
                    General Inquiry / Question
                  </span>
                </div>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>

            <div className="pt-2 text-center font-mono-code text-xs text-[#e6bdba] border-t border-[#222126]">
              Support Helpline: 0320-9061656 | 0319-9819503
            </div>
          </div>
        </div>
      )}
    </>
  );
};
