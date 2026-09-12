import React, { useState } from 'react';
import { 
  ChevronDown, 
  HelpCircle, 
  BookOpen, 
  GraduationCap, 
  Award, 
  ShieldCheck, 
  MessageCircle,
  FileText
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'General' | 'BAMS' | 'AIAPGET & AMO' | 'Study Materials & Legality';
}

const FAQS: FAQItem[] = [
  {
    category: 'General',
    question: 'How do I get started with Ayurveez preparation?',
    answer: 'You can create a free student account using your email and target course (BAMS, AIAPGET, or AYUSH Medical Officer). Once registered, you will gain immediate access to free study materials, sample chapter-wise tests, and the interactive mock test hub.',
  },
  {
    category: 'General',
    question: 'How does Ayurveez direct WhatsApp Mentorship support work?',
    answer: 'Students can directly connect with our academic mentors and faculty via our official WhatsApp helpline (+91 8271890090). You can send doubts regarding Samhita shlokas, university exam strategies, or test series guidance.',
  },
  {
    category: 'BAMS',
    question: 'Are the study notes compliant with the NCISM curriculum?',
    answer: 'Yes! All Ayurveez BAMS notes, shloka breakdowns, and university question banks strictly adhere to the latest NCISM (National Commission for Indian System of Medicine) competency-based syllabus from 1st Professional to Final Professional year.',
  },
  {
    category: 'BAMS',
    question: 'Does Ayurveez cover both Ayurvedic Samhitas and Modern Medical correlation?',
    answer: 'Absolutely. Our curriculum covers classical Brihattrayi (Charaka, Sushruta, Ashtanga Hridaya) and Laghuttrayi alongside integrated modern anatomy (Rachana Sharir), physiology (Kriya Sharir), pathology (Roga Nidan), and pharmacology.',
  },
  {
    category: 'AIAPGET & AMO',
    question: 'What features are included in the upcoming AIAPGET and AMO Test Series?',
    answer: 'The upcoming modules feature full-length 120-question NTA-simulated grand tests with authentic negative marking (+4 / -1), Samhita-wise speed tests, all-India percentile ranking, and state PSC/UPSC previous 10 years solved question papers.',
  },
  {
    category: 'AIAPGET & AMO',
    question: 'Will there be commentary/tika-based questions (Chakrapani, Dalhana, Arundatta)?',
    answer: 'Yes, our AIAPGET question repository contains specialized question sets focused on prominent classical commentaries (Chakrapani Datta on Charaka, Dalhana on Sushruta, and Hemadri & Arundatta on Ashtanga Hridaya).',
  },
  {
    category: 'Study Materials & Legality',
    question: 'What is Ayurveez strict policy regarding the unauthorized sharing of paid lectures and notes?',
    answer: 'All Ayurveez paid video lectures, question banks, and notes are strictly protected under copyright law for single-user personal education. Circulating, sharing, recording, group-buying, or redistributing our paid resources on Telegram, WhatsApp, Google Drive, or any public forum is strictly illegal and will result in instant account ban and severe criminal and civil legal action under the Indian Copyright Act, 1957 and Information Technology Act, 2000.',
  },
  {
    category: 'Study Materials & Legality',
    question: 'Can I access the Free Study Materials on my phone or tablet?',
    answer: 'Yes, all our free study summaries, herbarium charts, and formulation notes are fully mobile-responsive and accessible seamlessly across smartphones, tablets, and laptops.',
  }
];

interface FAQSectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  compact?: boolean;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  id = 'faq-section',
  title = 'Frequently Asked Questions (FAQ)',
  subtitle = 'Find quick answers to common queries regarding courses, mock tests, materials, and policies.',
  compact = false,
}) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [selectedCat, setSelectedCat] = useState<string>('ALL');

  const categories = ['ALL', 'General', 'BAMS', 'AIAPGET & AMO', 'Study Materials & Legality'];

  const filteredFaqs = FAQS.filter(
    (faq) => selectedCat === 'ALL' || faq.category === selectedCat
  );

  const toggleAccordion = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div id={id} className="space-y-6">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eaf2eb] border border-[#c4dec8] text-[#1b4332] text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Ayurveez Knowledge Base</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-stone-600">
          {subtitle}
        </p>
      </div>

      {/* Category Tabs */}
      {!compact && (
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCat(cat);
                setOpenIdx(null);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCat === cat
                  ? 'bg-[#1b4332] text-white shadow-xs'
                  : 'bg-white text-stone-700 border border-[#e2dacf] hover:bg-stone-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Accordion List */}
      <div className="max-w-4xl mx-auto space-y-3 pt-2">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                isOpen 
                  ? 'bg-white border-[#2d6a4f] shadow-md' 
                  : 'bg-white/90 border-[#e5dfd3] hover:border-stone-400'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleAccordion(idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-[#eaf2eb] text-[#1b4332] flex items-center justify-center text-xs font-black shrink-0">
                    Q
                  </span>
                  <span className="text-sm sm:text-base font-bold text-stone-900 leading-snug">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-[#2d6a4f] shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-stone-100 text-xs sm:text-sm text-stone-600 leading-relaxed bg-[#fdfcf9]">
                  <p>{faq.answer}</p>
                  <div className="mt-2 text-[10px] font-bold text-[#2d6a4f] uppercase tracking-wider">
                    Category: {faq.category}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
