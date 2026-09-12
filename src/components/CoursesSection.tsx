import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  BookOpen, 
  Clock, 
  FileCheck, 
  Sparkles, 
  ArrowRight, 
  ChevronRight,
  Bookmark,
  Users,
  Target
} from 'lucide-react';
import { CourseType } from '../types';
import { COURSES_DATA } from '../data/mockData';

interface CoursesSectionProps {
  selectedCourseFilter: string | null;
  onSelectCourse: (course: CourseType) => void;
  onStartMockTest: (course: CourseType) => void;
  onOpenSignUp: (course?: CourseType) => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({
  selectedCourseFilter,
  onSelectCourse,
  onStartMockTest,
  onOpenSignUp,
}) => {
  const [activeCourseId, setActiveCourseId] = useState<CourseType>(
    (selectedCourseFilter as CourseType) || 'AIAPGET'
  );

  useEffect(() => {
    if (selectedCourseFilter && (selectedCourseFilter === 'BAMS' || selectedCourseFilter === 'AIAPGET' || selectedCourseFilter === 'AYUSH MEDICAL OFFICER')) {
      setActiveCourseId(selectedCourseFilter as CourseType);
    }
  }, [selectedCourseFilter]);

  const currentCourse = COURSES_DATA[activeCourseId] || COURSES_DATA['AIAPGET'];

  const getIcon = (id: CourseType) => {
    switch (id) {
      case 'BAMS':
        return <GraduationCap className="w-5 h-5" />;
      case 'AIAPGET':
        return <Award className="w-5 h-5" />;
      case 'AYUSH MEDICAL OFFICER':
        return <ShieldCheck className="w-5 h-5" />;
    }
  };

  return (
    <section className="py-12 bg-[#fbfaf6] text-stone-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#eaf2eb] border border-[#c4dec8] text-[#1b4332] text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Curriculum & Program Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Specialized Ayurveda Courses
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2">
            Engineered with deep Samhita authenticity, NCISM syllabus mapping, and actual competitive test metrics.
          </p>
        </div>

        {/* 3 Course Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-1.5 bg-white rounded-2xl border border-[#e5dfd3] mb-10 shadow-xs">
          {(['BAMS', 'AIAPGET', 'AYUSH MEDICAL OFFICER'] as const).map((courseKey) => {
            const course = COURSES_DATA[courseKey];
            const isActive = activeCourseId === courseKey;
            return (
              <button
                key={courseKey}
                id={`course-tab-${courseKey.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => {
                  if (courseKey === 'BAMS') {
                    onSelectCourse('BAMS');
                    return;
                  }
                  setActiveCourseId(courseKey);
                  onSelectCourse(courseKey);
                }}
                className={`flex items-center justify-between p-4 rounded-xl text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#eaf2eb] border border-[#2d6a4f] text-[#1b4332] shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl border ${
                    isActive 
                      ? 'bg-[#2d6a4f] text-white border-[#2d6a4f]' 
                      : 'bg-[#f4f0e6] text-stone-700 border-[#e2dacf]'
                  }`}>
                    {getIcon(courseKey)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-stone-900">{courseKey}</span>
                      {course.isUpcoming && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-black uppercase tracking-wider animate-pulse">
                          Upcoming
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-stone-500">
                      {course.isUpcoming ? 'Launching Soon' : `${course.stats.studentsEnrolled} Aspirants`}
                    </div>
                  </div>
                </div>
                {isActive && <span className="w-2 h-2 rounded-full bg-[#2d6a4f]"></span>}
              </button>
            );
          })}
        </div>

        {/* Active Course Overview Detail Panel */}
        <div className="bg-white border border-[#e5dfd3] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-md space-y-8 animate-in fade-in duration-200">
          
          {/* Header Banner */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-stone-100">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                {currentCourse.isUpcoming ? (
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    <span>Upcoming Program • Pre-Registration Open</span>
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-[#1b4332] border border-[#c4dec8] text-xs font-bold uppercase tracking-wider">
                    {currentCourse.badge}
                  </span>
                )}
                <span className="text-xs text-[#2d6a4f] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Success Rate: {currentCourse.stats.successRate}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-stone-900">
                {currentCourse.name}
              </h3>
              <p className="text-sm text-stone-600 max-w-3xl leading-relaxed">
                {currentCourse.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                id="course-enroll-action-btn"
                onClick={() => onOpenSignUp(activeCourseId)}
                className={`px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-transform hover:scale-105 cursor-pointer flex items-center gap-2 ${
                  currentCourse.isUpcoming
                    ? 'bg-amber-600 hover:bg-amber-700 text-white'
                    : 'bg-[#2d6a4f] hover:bg-[#1b4332] text-white'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>
                  {currentCourse.isUpcoming ? `Pre-Register for ${activeCourseId} (Upcoming)` : `Enroll in ${activeCourseId}`}
                </span>
              </button>
              <button
                id="course-mock-test-action-btn"
                onClick={() => onStartMockTest(activeCourseId)}
                className="px-5 py-3 rounded-xl bg-white hover:bg-stone-50 text-[#1b4332] font-bold text-sm border border-[#c4dec8] flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Clock className="w-4 h-4 text-[#2d6a4f]" />
                <span>Explore Mock Tests</span>
              </button>
            </div>
          </div>

          {/* Key Program Highlights & Exam Pattern */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Highlights List */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <Target className="w-4 h-4 text-[#2d6a4f]" />
                <span>Program Highlights & Study Features</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentCourse.features.map((feature, idx) => (
                  <div key={idx} className="p-3.5 bg-[#fbfaf6] rounded-xl border border-[#e5dfd3] flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#2d6a4f] shrink-0 mt-0.5" />
                    <span className="text-xs text-stone-700 font-medium leading-normal">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Exam Pattern Specs */}
            <div className="p-5 bg-[#faf6ee] rounded-2xl border border-amber-200/80 space-y-3">
              <h4 className="text-sm font-bold text-amber-900 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-amber-700" />
                <span>Standard Examination Metric</span>
              </h4>
              <div className="space-y-2 text-xs divide-y divide-amber-200/50">
                <div className="pt-2 flex justify-between">
                  <span className="text-stone-600">Total Marks:</span>
                  <span className="font-bold text-stone-900">{currentCourse.examPattern.totalMarks}</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-stone-600">Questions Format:</span>
                  <span className="font-bold text-stone-900">{currentCourse.examPattern.questionsCount}</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-stone-600">Exam Duration:</span>
                  <span className="font-bold text-stone-900">{currentCourse.examPattern.duration}</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-stone-600">Marking Scheme:</span>
                  <span className="font-bold text-amber-800">{currentCourse.examPattern.markingScheme}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Subjects & Subtopics Breakdown */}
          <div className="space-y-4 pt-4 border-t border-stone-100">
            <h4 className="text-base font-bold text-stone-900 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#2d6a4f]" />
                <span>Subject & Samhita Syllabus Breakdown</span>
              </span>
              <span className="text-xs text-stone-500 font-normal">
                {currentCourse.subjects.length} Major Subject Clusters
              </span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentCourse.subjects.map((sub, idx) => (
                <div key={idx} className="p-4 bg-[#fbfaf6] rounded-xl border border-[#e5dfd3] hover:border-[#2d6a4f] transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-sm font-bold text-stone-900">{sub.name}</h5>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#eaf2eb] text-[#1b4332] border border-[#c4dec8]">
                      {sub.weightage}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {sub.subtopics.map((topic, tidx) => (
                      <span key={tidx} className="text-[11px] px-2 py-1 bg-white text-stone-700 rounded-md border border-[#e2dacf]">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Target Audience Advice */}
          <div className="p-4 bg-[#faf6ee] border border-amber-300/80 rounded-2xl text-xs text-amber-900 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-amber-700 shrink-0" />
              <span><strong>Ideal For:</strong> {currentCourse.targetAudience}</span>
            </div>
            <button
              onClick={() => onOpenSignUp(activeCourseId)}
              className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-xl shrink-0 transition-colors cursor-pointer shadow-xs"
            >
              Get Started Now
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
