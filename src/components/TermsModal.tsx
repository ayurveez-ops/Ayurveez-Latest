import React from 'react';
import { 
  ShieldAlert, 
  X, 
  Lock, 
  AlertTriangle, 
  Scale, 
  FileText, 
  CheckCircle2,
  Ban
} from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative bg-white border border-[#e5dfd3] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl text-stone-800">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-red-50 text-red-700 border border-red-200 shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-stone-900 tracking-tight">
                Terms & Conditions • Intellectual Property Notice
              </h3>
              <p className="text-xs text-stone-500 font-medium">
                Ayurveez Academic Systems & Content Protection Policy
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
            aria-label="Close Terms Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Severe Warning Callout Banner */}
        <div className="p-4 sm:p-5 bg-red-50/90 border-2 border-red-300 rounded-2xl space-y-2 text-red-950">
          <div className="flex items-center gap-2 text-sm font-black text-red-800 uppercase tracking-wide">
            <AlertTriangle className="w-5 h-5 text-red-700 shrink-0" />
            <span>Strict Zero-Tolerance Anti-Piracy Warning</span>
          </div>
          <p className="text-xs sm:text-sm font-semibold leading-relaxed">
            Circulating, recording, sharing, downloading, re-uploading, or selling our paid lectures, Samhita notes, mock test series, or study resources is strictly illegal and will trigger immediate legal action.
          </p>
        </div>

        {/* Structured Terms Content */}
        <div className="space-y-5 text-xs sm:text-sm text-stone-700 leading-relaxed">
          
          {/* Section 1 */}
          <div className="space-y-2">
            <h4 className="font-bold text-stone-900 flex items-center gap-2 text-sm sm:text-base">
              <Lock className="w-4 h-4 text-[#2d6a4f]" />
              <span>1. Proprietary Rights & License Scope</span>
            </h4>
            <p className="text-stone-600">
              All video lectures, audio recitations, chapter notes, Samhita commentaries, question banks, test series architectures, mnemonics, and test interfaces hosted on AYURVEEZ are the exclusive intellectual property of AYURVEEZ. Enrolled students are granted a non-transferable, single-user, personal educational license only.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-2">
            <h4 className="font-bold text-stone-900 flex items-center gap-2 text-sm sm:text-base">
              <Ban className="w-4 h-4 text-red-600" />
              <span>2. Express Prohibitions & Anti-Circulation Mandate</span>
            </h4>
            <p className="text-stone-600">
              Users are strictly prohibited from:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-stone-600">
              <li>Screen-recording, downloading, capturing, or cloning paid video lectures and live streaming sessions.</li>
              <li>Sharing or circulating proprietary PDFs, notes, question papers, or solutions on Telegram channels, WhatsApp groups, Google Drive folders, Mega, Discord, or any social media platform.</li>
              <li>Engaging in account sharing, credential selling, group-buying, or pooled subscriptions.</li>
              <li>Printing or redistributing copyrighted Ayurveez test papers and study booklets for commercial or institutional use.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="space-y-2">
            <h4 className="font-bold text-stone-900 flex items-center gap-2 text-sm sm:text-base">
              <Scale className="w-4 h-4 text-amber-800" />
              <span>3. Legal Action, Criminal Prosecution & Civil Damages</span>
            </h4>
            <p className="text-stone-600">
              Any infringement or unauthorized dissemination detected will result in:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-[#fbfaf6] border border-red-200 rounded-xl space-y-1">
                <strong className="text-xs font-bold text-red-800 block">Immediate Account Termination</strong>
                <p className="text-[11px] text-stone-600">
                  Instant and permanent revocation of account access, test series, and dashboard without refund.
                </p>
              </div>
              <div className="p-3 bg-[#fbfaf6] border border-red-200 rounded-xl space-y-1">
                <strong className="text-xs font-bold text-red-800 block">Criminal & Cyber Crime FIR</strong>
                <p className="text-[11px] text-stone-600">
                  Police complaint (FIR) filed under the Indian Copyright Act, 1957 and Section 66 of the Information Technology Act, 2000.
                </p>
              </div>
              <div className="p-3 bg-[#fbfaf6] border border-red-200 rounded-xl space-y-1">
                <strong className="text-xs font-bold text-red-800 block">Civil Lawsuits for Damages</strong>
                <p className="text-[11px] text-stone-600">
                  Legal proceedings claiming commercial compensation, punitive damages, and recovery of legal costs.
                </p>
              </div>
              <div className="p-3 bg-[#fbfaf6] border border-red-200 rounded-xl space-y-1">
                <strong className="text-xs font-bold text-red-800 block">Institutional Reporting</strong>
                <p className="text-[11px] text-stone-600">
                  Reporting intellectual property theft and academic misconduct to relevant university authorities and NCISM.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="space-y-2">
            <h4 className="font-bold text-stone-900 flex items-center gap-2 text-sm sm:text-base">
              <FileText className="w-4 h-4 text-[#2d6a4f]" />
              <span>4. Digital Forensics & Forensic Watermarking</span>
            </h4>
            <p className="text-stone-600">
              All digital lecture streams, PDF materials, and test sessions are encoded with dynamic user-specific watermarks containing registered IP addresses, phone numbers, and timestamps. Leaked materials are immediately mapped to the offending registered account.
            </p>
          </div>

        </div>

        {/* Footer Action */}
        <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-stone-500 text-center sm:text-left">
            By registering or using Ayurveez, you agree to abide by these strict conditions.
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            I Understand & Agree
          </button>
        </div>

      </div>
    </div>
  );
};
