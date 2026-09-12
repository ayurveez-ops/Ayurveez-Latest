import React, { useState } from 'react';
import { 
  GraduationCap, 
  Award, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Zap,
  BookOpenCheck,
  Trophy,
  Briefcase,
  Clock,
  Video,
  FileText,
  Layers
} from 'lucide-react';
import { CourseType } from '../types';
import { StudyVaultModals } from './StudyVaultModals';

interface HeroProps {
  onSelectCourse: (course: CourseType) => void;
  onExploreMockTests: () => void;
  onExploreMaterials: () => void;
  onExploreJobs?: () => void;
  onOpenSignUp: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSelectCourse,
  onExploreMockTests,
  onExploreMaterials,
  onExploreJobs,
  onOpenSignUp,
}) => {
  const [activeVaultModal, setActiveVaultModal] = useState<'rapid-recall' | 'pyq-vault' | 'mock-series' | 'flashcards' | 'ayush-jobs' | null>(null);

  return (
    <div className="relative overflow-hidden bg-[#fbfaf6] text-stone-800 border-b border-[#e6dfd1] max-w-full">
      
      {/* Background Subtle Natural Tints */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(45,106,79,0.08),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 sm:w-96 h-80 sm:h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 sm:w-96 h-80 sm:h-96 bg-[#2d6a4f]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-8 pb-14 sm:pt-12 sm:pb-18 lg:pt-16 lg:pb-20 relative z-10">
        
        {/* Sanskrit Motto Badge */}
        <div className="flex justify-center mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#eaf2eb] border border-[#c4dec8] shadow-2xs text-[11px] sm:text-xs font-bold text-[#1b4332] text-center max-w-full">
            <span className="font-serif">प्रयोजनं चास्य स्वस्थस्य स्वास्थ्यरक्षणम् आतुरस्य विकारप्रशमनं च।</span>
          </div>
        </div>

        {/* Hero Title & Subheading */}
        <div className="text-center max-w-4xl mx-auto space-y-4 sm:space-y-5">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-stone-900 leading-tight break-words">
            India&apos;s Dedicated Study & Mock Test Hub for{' '}
            <span className="text-[#2d6a4f] underline decoration-amber-400/80 decoration-4 block sm:inline">
              BAMS, AIAPGET & AYUSH MO
            </span>
          </h1>

          <p className="text-xs xs:text-sm sm:text-base lg:text-lg text-stone-600 leading-relaxed max-w-3xl mx-auto px-1">
            Master classical Brihattrayi & Laghuttrayi Samhitas, NCISM university syllabus, and competitive examinations with high-yield notes, NTA-simulated mock tests, and Sanskrit shloka commentaries.
          </p>

          {/* Action CTAs */}
          <div className="pt-3 sm:pt-4 max-w-xl mx-auto w-full space-y-2.5">
            {/* Top row: Exactly Two Buttons Together in Single Row */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full">
              <button
                id="hero-start-prep-btn"
                onClick={onOpenSignUp}
                className="w-full px-2.5 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-bold text-[11px] xs:text-xs sm:text-sm shadow-md hover:shadow-lg transition-all hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 text-center"
              >
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 shrink-0" />
                <span className="line-clamp-1">Enroll &amp; Start Prep</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 hidden sm:inline-block" />
              </button>

              <button
                id="hero-mock-tests-btn"
                onClick={onExploreMockTests}
                className="w-full px-2.5 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-white hover:bg-stone-50 text-[#1b4332] font-bold text-[11px] xs:text-xs sm:text-sm border border-[#c4dec8] shadow-2xs flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer text-center hover:scale-[1.01]"
              >
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2d6a4f] shrink-0" />
                <span className="line-clamp-1">Take Free Mock Test</span>
              </button>
            </div>

            {/* Below row: Third Button below these two buttons */}
            <button
              id="hero-free-notes-btn"
              onClick={onExploreMaterials}
              className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-[#f4f0e6] hover:bg-[#ede7d8] text-stone-800 font-bold text-xs sm:text-sm border border-[#dfd6c5] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs hover:border-[#2d6a4f] hover:text-[#1b4332]"
            >
              <BookOpen className="w-4 h-4 text-[#2d6a4f] shrink-0" />
              <span>Free Study Materials</span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-500" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4 CORE PROGRAM CARDS                                                      */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mt-10 sm:mt-14">
          
          {/* Card 1: BAMS UNIVERSITY PREP */}
          <div
            id="hero-card-bams-prep"
            onClick={() => onSelectCourse('BAMS')}
            className="bg-white border border-[#e5dfd3] hover:border-[#2d6a4f] rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col items-center justify-center text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer group space-y-3"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#1b4332] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            
            <div className="space-y-1 w-full">
              <h3 className="text-xs xs:text-sm sm:text-base font-black text-stone-900 group-hover:text-[#2d6a4f] transition-colors leading-tight uppercase">
                BAMS University Prep
              </h3>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#eaf2eb] text-[#1b4332] border border-[#c4dec8] text-[10px] sm:text-xs font-bold">
                1st - Final Prof
              </span>
            </div>
          </div>

          {/* Card 2: AIAPGET PG ENTRANCE */}
          <div
            id="hero-card-aiapget-prep"
            onClick={() => onSelectCourse('AIAPGET')}
            className="bg-white border border-[#e5dfd3] hover:border-amber-500 rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col items-center justify-center text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer group space-y-3"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#d97706] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Award className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            
            <div className="space-y-1 w-full">
              <h3 className="text-xs xs:text-sm sm:text-base font-black text-stone-900 group-hover:text-amber-800 transition-colors leading-tight uppercase">
                AIAPGET PG Entrance
              </h3>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-[10px] sm:text-xs font-bold">
                MD / MS Ayurveda
              </span>
            </div>
          </div>

          {/* Card 3: AYUSH MEDICAL OFFICER */}
          <div
            id="hero-card-ayush-mo-prep"
            onClick={() => onSelectCourse('AYUSH MEDICAL OFFICER')}
            className="bg-white border border-[#e5dfd3] hover:border-purple-600 rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col items-center justify-center text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer group space-y-3"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#7c3aed] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            
            <div className="space-y-1 w-full">
              <h3 className="text-xs xs:text-sm sm:text-base font-black text-stone-900 group-hover:text-purple-700 transition-colors leading-tight uppercase">
                AYUSH Medical Officer
              </h3>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-900 border border-purple-200 text-[10px] sm:text-xs font-bold">
                State PSC &amp; UPSC
              </span>
            </div>
          </div>

          {/* Card 4: AYUSH JOBS */}
          <div
            id="hero-card-ayush-jobs"
            onClick={() => {
              if (onExploreJobs) {
                onExploreJobs();
              } else {
                setActiveVaultModal('ayush-jobs');
              }
            }}
            className="bg-white border border-[#e5dfd3] hover:border-blue-500 rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col items-center justify-center text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer group space-y-3"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Briefcase className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            
            <div className="space-y-1 w-full">
              <h3 className="text-xs xs:text-sm sm:text-base font-black text-stone-900 group-hover:text-blue-600 transition-colors leading-tight uppercase">
                AYUSH Jobs
              </h3>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200 text-[10px] sm:text-xs font-bold">
                Live Vacancies
              </span>
            </div>
          </div>
        </div>

        {/* Live Platform Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-8 sm:mt-10 p-4 sm:p-6 bg-white border border-[#e5dfd3] rounded-2xl sm:rounded-3xl shadow-2xs">
          <div className="text-center space-y-1 border-r border-stone-100 last:border-0">
            <div className="text-xl sm:text-2xl lg:text-3xl font-black text-[#2d6a4f]">240+</div>
            <div className="text-[11px] sm:text-xs text-stone-500 font-semibold">Ayurveda Aspirants</div>
          </div>
          <div className="text-center space-y-1 border-r border-stone-100 last:border-0">
            <div className="text-xl sm:text-2xl lg:text-3xl font-black text-amber-700">20+</div>
            <div className="text-[11px] sm:text-xs text-stone-500 font-semibold">Grand Mock Tests</div>
          </div>
          <div className="text-center space-y-1 border-r border-stone-100 last:border-0">
            <div className="text-xl sm:text-2xl lg:text-3xl font-black text-[#2d6a4f]">560+</div>
            <div className="text-[11px] sm:text-xs text-stone-500 font-semibold">Samhita Notes &amp; Lectures</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-xl sm:text-2xl lg:text-3xl font-black text-teal-800">99.4%</div>
            <div className="text-[11px] sm:text-xs text-stone-500 font-semibold">Satisfaction Rate</div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* AUTO-SLIDING HORIZONTAL RECTANGLE BAR: AYURVEEZ HUB                       */}
        {/* ========================================================================= */}
        <div className="mt-4 bg-[#1b4332] text-white border border-[#2d6a4f] rounded-2xl p-2.5 sm:p-3 shadow-md overflow-hidden flex items-center gap-2.5 sm:gap-3 max-w-full">
          <div className="shrink-0 flex items-center gap-1.5 px-2.5 sm:px-3 py-1 bg-amber-400 text-stone-950 font-black text-[10px] sm:text-[11px] uppercase tracking-wider rounded-xl shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-stone-900" />
            <span>AYURVEEZ HUB</span>
          </div>

          <div className="overflow-hidden relative w-full select-none">
            <div className="animate-marquee items-center gap-3 sm:gap-4 text-[11px] sm:text-xs font-semibold text-stone-100">
              {/* Group 1 */}
              <span className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-lg bg-white/10 border border-white/10 whitespace-nowrap">
                <Video className="w-3.5 h-3.5 text-amber-300" />
                <span>Video Lectures</span>
              </span>
              <span className="text-amber-400 font-bold">|</span>

              <span className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-lg bg-white/10 border border-white/10 whitespace-nowrap">
                <Layers className="w-3.5 h-3.5 text-emerald-300" />
                <span>Exam Series Content</span>
              </span>
              <span className="text-amber-400 font-bold">|</span>

              <span className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-lg bg-white/10 border border-white/10 whitespace-nowrap">
                <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                <span>Free Study Materials</span>
              </span>
              <span className="text-amber-400 font-bold">|</span>

              <span className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-lg bg-white/10 border border-white/10 whitespace-nowrap">
                <Clock className="w-3.5 h-3.5 text-emerald-300" />
                <span>NTA-Pattern Mock Tests</span>
              </span>
              <span className="text-amber-400 font-bold">|</span>

              <span className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-lg bg-white/10 border border-white/10 whitespace-nowrap">
                <FileText className="w-3.5 h-3.5 text-amber-300" />
                <span>Previous Year Questions (PYQs)</span>
              </span>
              <span className="text-amber-400 font-bold">|</span>

              <span className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-lg bg-white/10 border border-white/10 whitespace-nowrap">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-300" />
                <span>Samhita Vyakhya Notes</span>
              </span>
              <span className="text-amber-400 font-bold">|</span>

              <span className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-lg bg-white/10 border border-white/10 whitespace-nowrap">
                <Award className="w-3.5 h-3.5 text-amber-300" />
                <span>AIAPGET & AYUSH MO Series</span>
              </span>
              <span className="text-amber-400 font-bold">|</span>

              {/* Group 2 (Duplicate for seamless continuous loop) */}
              <span className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-lg bg-white/10 border border-white/10 whitespace-nowrap">
                <Video className="w-3.5 h-3.5 text-amber-300" />
                <span>Video Lectures</span>
              </span>
              <span className="text-amber-400 font-bold">|</span>

              <span className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-lg bg-white/10 border border-white/10 whitespace-nowrap">
                <Layers className="w-3.5 h-3.5 text-emerald-300" />
                <span>Exam Series Content</span>
              </span>
              <span className="text-amber-400 font-bold">|</span>

              <span className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-lg bg-white/10 border border-white/10 whitespace-nowrap">
                <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                <span>Free Study Materials</span>
              </span>
              <span className="text-amber-400 font-bold">|</span>

              <span className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-lg bg-white/10 border border-white/10 whitespace-nowrap">
                <Clock className="w-3.5 h-3.5 text-emerald-300" />
                <span>NTA-Pattern Mock Tests</span>
              </span>
              <span className="text-amber-400 font-bold">|</span>

              <span className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-lg bg-white/10 border border-white/10 whitespace-nowrap">
                <FileText className="w-3.5 h-3.5 text-amber-300" />
                <span>Previous Year Questions (PYQs)</span>
              </span>
              <span className="text-amber-400 font-bold">|</span>

              <span className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-lg bg-white/10 border border-white/10 whitespace-nowrap">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-300" />
                <span>Samhita Vyakhya Notes</span>
              </span>
              <span className="text-amber-400 font-bold">|</span>

              <span className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-lg bg-white/10 border border-white/10 whitespace-nowrap">
                <Award className="w-3.5 h-3.5 text-amber-300" />
                <span>AIAPGET & AYUSH MO Series</span>
              </span>
              <span className="text-amber-400 font-bold">|</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SMART STUDY ZONE: AYURVEEZ HIGH-YIELD STUDY VAULT (IMAGE 2 STYLE)          */}
        {/* ========================================================================= */}
        <section className="mt-12 sm:mt-16 pt-8 border-t border-[#e6dfd1] max-w-full">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-[11px] font-black uppercase tracking-wider shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Curated Academic Vault</span>
            </div>

            <h2 className="text-2xl xs:text-3xl sm:text-4xl font-black text-stone-900 tracking-tight font-serif">
              Ayurveez High-Yield Study Vault
            </h2>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl mx-auto">
              Specially designed high-yield study modules with chapter-wise rapid revision notes, university-wise PYQ archives, live mock simulations, and mnemonic flashcards for rapid exam-day mastery.
            </p>
          </div>

          {/* 4 High-Yield Cards Grid: Professional, balanced vertical cards on mobile & desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-6">
            
            {/* Card 1: Exam Series (Rapid Revision) */}
            <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-6 flex flex-col justify-between shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border border-indigo-400/30 group space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-wider backdrop-blur-xs border border-white/20">
                    RAPID REVISION
                  </span>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-xs group-hover:scale-110 transition-transform shrink-0">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base sm:text-base lg:text-lg font-black text-white font-serif tracking-tight leading-snug">
                    Rapid Recall Exam Series
                  </h3>
                  <p className="text-xs text-indigo-100/90 leading-relaxed line-clamp-2 sm:line-clamp-3">
                    Specially designed for exam-time prep and rapid revision with high-yield 1-page short notes &amp; chapter summaries.
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="px-2 py-0.5 rounded-md bg-indigo-950/60 text-indigo-200 text-[10px] font-semibold">
                    1-Page Summaries
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-indigo-950/60 text-indigo-200 text-[10px] font-semibold">
                    High Yield
                  </span>
                </div>
              </div>

              <button
                id="vault-card-rapid-recall-btn"
                onClick={() => setActiveVaultModal('rapid-recall')}
                className="w-full py-2.5 px-4 rounded-xl bg-white text-indigo-900 hover:bg-indigo-50 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs shrink-0"
              >
                <span>Start Rapid Revision</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 2: University-Wise PYQ Vault */}
            <div className="bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-950 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-6 flex flex-col justify-between shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border border-emerald-400/30 group space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-white/20 text-amber-200 text-[10px] font-black uppercase tracking-wider backdrop-blur-xs border border-white/20">
                    PREV.YEAR QUES
                  </span>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-xs group-hover:scale-110 transition-transform shrink-0">
                    <BookOpenCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-200" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base sm:text-base lg:text-lg font-black text-white font-serif tracking-tight leading-snug">
                    University PYQ Archive
                  </h3>
                  <p className="text-xs text-emerald-100/90 leading-relaxed line-clamp-2 sm:line-clamp-3">
                    Year-wise &amp; university-wise solved previous year question papers (RGUHS, MUHS, WBUHS, BPSC) with model answers.
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-950/60 text-emerald-200 text-[10px] font-semibold">
                    10-Yr Solved Papers
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-950/60 text-emerald-200 text-[10px] font-semibold">
                    Model Answers
                  </span>
                </div>
              </div>

              <button
                id="vault-card-pyq-btn"
                onClick={() => setActiveVaultModal('pyq-vault')}
                className="w-full py-2.5 px-4 rounded-xl bg-white text-[#1b4332] hover:bg-emerald-50 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs shrink-0"
              >
                <span>Explore PYQ Vault</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 3: Mock Tests (Simulation) */}
            <div className="bg-gradient-to-br from-stone-900 via-stone-800 to-slate-950 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-6 flex flex-col justify-between shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border border-stone-700/50 group space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-wider backdrop-blur-xs border border-white/20">
                    ALL INDIA RANK
                  </span>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-xs group-hover:scale-110 transition-transform shrink-0">
                    <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base sm:text-base lg:text-lg font-black text-white font-serif tracking-tight leading-snug">
                    Grand Mock Test Series
                  </h3>
                  <p className="text-xs text-stone-300 leading-relaxed line-clamp-2 sm:line-clamp-3">
                    Simulated live exams with negative marking, timers, clinical MCQ patterns, and instant percentile analytics.
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="px-2 py-0.5 rounded-md bg-stone-950/60 text-stone-300 text-[10px] font-semibold">
                    Live NTA Simulator
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-stone-950/60 text-stone-300 text-[10px] font-semibold">
                    Rank &amp; Percentile
                  </span>
                </div>
              </div>

              <button
                id="vault-card-mock-btn"
                onClick={() => setActiveVaultModal('mock-series')}
                className="w-full py-2.5 px-4 rounded-xl bg-white text-stone-900 hover:bg-stone-100 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs shrink-0"
              >
                <span>Take Mock Test</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 4: Samhita Mnemonics & Cards */}
            <div className="bg-gradient-to-br from-rose-900 via-rose-800 to-pink-950 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-6 flex flex-col justify-between shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border border-rose-400/30 group space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-wider backdrop-blur-xs border border-white/20">
                    MEMORY TRICKS
                  </span>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-xs group-hover:scale-110 transition-transform shrink-0">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-pink-200" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base sm:text-base lg:text-lg font-black text-white font-serif tracking-tight leading-snug">
                    Samhita Mnemonics &amp; Cards
                  </h3>
                  <p className="text-xs text-rose-100/90 leading-relaxed line-clamp-2 sm:line-clamp-3">
                    Interactive flip cards &amp; recall tricks for Charaka Agryas, Botanical synonyms, Rasapanchaka, and Shloka anvaya.
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="px-2 py-0.5 rounded-md bg-rose-950/60 text-rose-200 text-[10px] font-semibold">
                    Shloka Flashcards
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-rose-950/60 text-rose-200 text-[10px] font-semibold">
                    Agrya Tricks
                  </span>
                </div>
              </div>

              <button
                id="vault-card-flashcards-btn"
                onClick={() => setActiveVaultModal('flashcards')}
                className="w-full py-2.5 px-4 rounded-xl bg-white text-rose-900 hover:bg-rose-50 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs shrink-0"
              >
                <span>Launch Flashcards</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* Bottom Explore CTA Bar */}
          <div className="mt-8 text-center">
            <button
              onClick={onExploreMaterials}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-stone-50 text-[#1b4332] font-bold text-xs sm:text-sm border border-[#c4dec8] shadow-2xs transition-all cursor-pointer hover:border-[#2d6a4f]"
            >
              <BookOpen className="w-4 h-4 text-[#2d6a4f]" />
              <span>Explore All Study Modules & Free Folders</span>
              <ArrowRight className="w-4 h-4 text-[#2d6a4f]" />
            </button>
          </div>

        </section>

      </div>

      {/* Interactive Modal Popups for High-Yield Vault */}
      <StudyVaultModals
        activeModal={activeVaultModal}
        onClose={() => setActiveVaultModal(null)}
        onNavigateToMockTests={onExploreMockTests}
        onNavigateToFreeMaterials={onExploreMaterials}
        onSelectCourse={onSelectCourse}
        onOpenSignUp={onOpenSignUp}
      />

    </div>
  );
};
