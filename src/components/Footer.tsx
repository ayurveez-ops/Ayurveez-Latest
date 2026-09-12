import React, { useState } from 'react';
import { 
  GraduationCap, 
  Award, 
  ShieldCheck, 
  Mail, 
  BookOpen,
  Send,
  Youtube,
  Instagram,
  MessageCircle,
  HelpCircle,
  ShieldAlert,
  Lock,
  Scale
} from 'lucide-react';
import { CourseType } from '../types';
import { TermsModal } from './TermsModal';

interface FooterProps {
  onSelectCourse: (course: CourseType) => void;
  onNavigate: (tab: string) => void;
  onOpenSignUp: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCourse,
  onNavigate,
  onOpenSignUp,
}) => {
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  const handleFAQClick = () => {
    onNavigate('contact');
    setTimeout(() => {
      const el = document.getElementById('faq-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      <footer className="bg-[#f2eee3] text-stone-700 border-t border-[#dfd6c5] py-8 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Top Row: Brand & Socials */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-5 border-b border-[#dfd6c5]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#1b4332] text-amber-300 flex items-center justify-center font-serif text-base font-black shadow-2xs">
                आयु
              </div>
              <div>
                <span className="text-lg font-black text-stone-900 tracking-tight font-serif block leading-none">
                  AYURVEEZ
                </span>
                <span className="text-[10px] font-bold text-[#2d6a4f] uppercase tracking-wider block mt-0.5">
                  Ayurvedic Academic Network
                </span>
              </div>
            </div>

            {/* Social Channels */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <a
                href="https://www.instagram.com/ayurveez_bams/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-white border border-[#e2dacf] text-stone-800 hover:text-[#E1306C] hover:border-pink-300 transition-all shadow-2xs text-[11px] font-bold flex items-center gap-1.5"
                title="Follow on Instagram"
              >
                <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
                <span>Instagram</span>
              </a>

              <a
                href="https://www.youtube.com/@ayurveez"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-white border border-[#e2dacf] text-stone-800 hover:text-[#FF0000] hover:border-red-300 transition-all shadow-2xs text-[11px] font-bold flex items-center gap-1.5"
                title="Subscribe on YouTube"
              >
                <Youtube className="w-3.5 h-3.5 text-[#FF0000]" />
                <span>YouTube</span>
              </a>

              <a
                href="https://t.me/ayurveez"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-white border border-[#e2dacf] text-stone-800 hover:text-[#229ED9] hover:border-sky-300 transition-all shadow-2xs text-[11px] font-bold flex items-center gap-1.5"
                title="Join Telegram Group"
              >
                <Send className="w-3.5 h-3.5 text-[#229ED9]" />
                <span>Telegram</span>
              </a>

              <a
                href="https://wa.me/918271890090"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-white border border-[#e2dacf] text-stone-800 hover:text-[#25D366] hover:border-emerald-300 transition-all shadow-2xs text-[11px] font-bold flex items-center gap-1.5"
                title="Message on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Compact Links & Contact Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            
            {/* Column 1: Academic Prep */}
            <div className="space-y-2">
              <h4 className="text-[11px] font-bold text-[#1b4332] uppercase tracking-wider">
                Courses & Series
              </h4>
              <ul className="space-y-1.5">
                <li>
                  <button
                    onClick={() => {
                      onSelectCourse('BAMS');
                      onNavigate('bams-courses');
                    }}
                    className="hover:text-[#1b4332] text-stone-700 transition-colors cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-[#2d6a4f] shrink-0" />
                    <span>BAMS (1st, 2nd &amp; Final Prof)</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onSelectCourse('AIAPGET');
                      onNavigate('courses');
                    }}
                    className="hover:text-amber-800 text-stone-700 transition-colors cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <Award className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>AIAPGET (MD/MS)</span>
                    <span className="px-1 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-300 text-[8px] font-bold uppercase">Upcoming</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onSelectCourse('AYUSH MEDICAL OFFICER');
                      onNavigate('courses');
                    }}
                    className="hover:text-teal-800 text-stone-700 transition-colors cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                    <span>AYUSH Medical Officer</span>
                    <span className="px-1 py-0.2 rounded bg-teal-100 text-teal-900 border border-teal-300 text-[8px] font-bold uppercase">Upcoming</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: Free Resources & Mock Tests */}
            <div className="space-y-2">
              <h4 className="text-[11px] font-bold text-[#1b4332] uppercase tracking-wider">
                Study Hub
              </h4>
              <ul className="space-y-1.5">
                <li>
                  <button
                    onClick={() => onNavigate('jobs')}
                    className="hover:text-blue-700 text-stone-700 transition-colors cursor-pointer text-left flex items-center gap-1.5 font-bold"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                    <span>AYUSH Jobs & Vacancies</span>
                    <span className="px-1 py-0.2 rounded bg-blue-100 text-blue-800 text-[8px] font-black uppercase">Live</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('free-materials')}
                    className="hover:text-[#1b4332] text-stone-700 transition-colors cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#2d6a4f] shrink-0" />
                    <span>Free Study Materials</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('mock-tests')}
                    className="hover:text-[#1b4332] text-stone-700 transition-colors cursor-pointer text-left"
                  >
                    <span>All-India Mock Test Series</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleFAQClick}
                    className="hover:text-[#1b4332] text-stone-700 transition-colors cursor-pointer text-left flex items-center gap-1.5 font-medium"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-[#2d6a4f] shrink-0" />
                    <span>FAQ & Support</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact Channels */}
            <div className="space-y-2">
              <h4 className="text-[11px] font-bold text-[#1b4332] uppercase tracking-wider">
                Helpdesk Desk
              </h4>
              <ul className="space-y-1.5 text-xs">
                <li>
                  <a
                    href="https://wa.me/918271890090"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-700 text-stone-700 transition-colors flex items-center gap-1.5 font-medium"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>WhatsApp: <strong>8271890090</strong></span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:ayurveez@gmail.com"
                    className="hover:text-[#1b4332] text-stone-700 transition-colors flex items-center gap-1.5 font-medium"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#2d6a4f] shrink-0" />
                    <span>ayurveez@gmail.com</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Anti-Piracy Warning Card */}
            <div>
              <button
                onClick={() => setTermsModalOpen(true)}
                className="w-full text-left p-2.5 bg-red-50 hover:bg-red-100/90 rounded-xl border border-red-200 text-red-900 transition-all cursor-pointer space-y-1 block shadow-2xs"
              >
                <div className="flex items-center gap-1.5 font-bold text-[11px] text-red-800">
                  <ShieldAlert className="w-3.5 h-3.5 text-red-700 shrink-0" />
                  <span>Terms & Legal Policy</span>
                </div>
                <p className="text-[10px] text-red-700 leading-tight">
                  Circulating paid lectures, notes & resources results in legal actions.
                </p>
                <span className="text-[10px] font-bold text-red-800 underline block pt-0.5">
                  Read Full Terms →
                </span>
              </button>
            </div>

          </div>

          {/* Bottom Copyright and Navigation Bar */}
          <div className="pt-4 border-t border-[#dfd6c5] flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[11px] text-stone-500">
            <div>
              © {new Date().getFullYear()} <strong className="text-stone-700">AYURVEEZ</strong>. All rights reserved.
            </div>

            <div className="flex flex-wrap items-center gap-3 text-[11px]">
              <button
                onClick={handleFAQClick}
                className="text-stone-600 hover:text-[#1b4332] font-semibold cursor-pointer underline decoration-stone-300"
              >
                FAQ
              </button>
              <span className="text-stone-300">•</span>
              <button
                onClick={() => setTermsModalOpen(true)}
                className="text-stone-600 hover:text-red-700 font-semibold cursor-pointer underline decoration-stone-300"
              >
                Terms & Conditions
              </button>
              <span className="text-stone-300">•</span>
              <button
                onClick={() => onNavigate('contact')}
                className="text-stone-600 hover:text-[#1b4332] font-semibold cursor-pointer underline decoration-stone-300"
              >
                Contact Helpdesk
              </button>
              <span className="text-stone-300">•</span>
              <button
                id="footer-admin-portal-btn"
                onClick={() => onNavigate('admin')}
                className="text-amber-800 hover:text-[#1b4332] font-bold cursor-pointer inline-flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded border border-amber-200"
              >
                <Lock className="w-3 h-3 text-amber-700" />
                <span>Admin Portal</span>
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* Terms & Conditions Modal */}
      <TermsModal
        isOpen={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
      />
    </>
  );
};
