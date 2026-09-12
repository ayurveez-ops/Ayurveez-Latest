import React, { useState, useEffect } from 'react';
import { 
  User, 
  Folder, 
  FolderOpen, 
  ChevronRight, 
  ArrowLeft, 
  Video, 
  FileText, 
  CheckCircle2, 
  Download, 
  Play, 
  Clock, 
  Award, 
  BookOpen, 
  Sparkles, 
  Search, 
  GraduationCap, 
  Key, 
  Save, 
  Edit3, 
  X, 
  ExternalLink,
  ShieldCheck,
  Check,
  FileCheck,
  Layers,
  HelpCircle
} from 'lucide-react';
import { UserProfile, CourseType } from '../types';
import { saveUserProfile } from '../firebase';
import { 
  BAMS_CURRICULUM_DATA, 
  BamsProfType, 
  SubjectItem, 
  LectureItem, 
  NoteItem, 
  TestItem 
} from '../data/bamsCurriculumData';

interface StudentDashboardProps {
  user: UserProfile;
  initialBamsProf?: BamsProfType;
  onUpdateUser: (updatedUser: UserProfile) => void;
  onStartMockTest: (course: CourseType) => void;
  onExploreMaterials: () => void;
  onNavigate?: (tab: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  user,
  initialBamsProf,
  onUpdateUser,
  onStartMockTest,
  onExploreMaterials,
  onNavigate,
}) => {
  // Navigation tabs within Dashboard
  const [activeView, setActiveView] = useState<'folders' | 'profile'>('folders');

  // Folder Explorer State
  // Level 0: Root (Course Folders like "BAMS 1st Proff Enrolled")
  // Level 1: Inside Course (Subject Folders like "Samhita Adhyayan 1")
  // Level 2: Inside Subject (Resource Folders: "Lectures", "Notes", "Tests")
  // Level 3: Inside Resource Folder (Items List)
  const [selectedCourseFolder, setSelectedCourseFolder] = useState<BamsProfType | null>(() => {
    if (initialBamsProf) return initialBamsProf;
    const stored = localStorage.getItem('ayurveez_active_enrolled_bams_prof') as BamsProfType;
    if (stored && BAMS_CURRICULUM_DATA[stored]) return stored;
    return '1st';
  });

  const [selectedSubjectFolder, setSelectedSubjectFolder] = useState<SubjectItem | null>(null);
  const [selectedResourceFolder, setSelectedResourceFolder] = useState<'lectures' | 'notes' | 'tests' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Video Player Modal State
  const [activeLectureModal, setActiveLectureModal] = useState<LectureItem | null>(null);
  // PDF Viewer Modal State
  const [activeNoteModal, setActiveNoteModal] = useState<NoteItem | null>(null);

  // Profile Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name || 'Ayurveda Scholar');
  const [age, setAge] = useState(user.age?.toString() || '');
  const [gender, setGender] = useState(user.gender || 'Male');
  const [mobileNumber, setMobileNumber] = useState(user.mobileNumber || '');
  const [whatsappNumber, setWhatsappNumber] = useState(user.whatsappNumber || '');
  const [isInCollege, setIsInCollege] = useState(user.isInCollege ?? true);
  const [collegeName, setCollegeName] = useState(user.collegeName || 'National Institute of Ayurveda');
  const [targetCourse, setTargetCourse] = useState<CourseType>((user.course as CourseType) || 'BAMS');
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Unlocked courses from local storage
  const [unlockedProfs, setUnlockedProfs] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem('ayurveez_unlocked_bams_profs');
      if (stored) return JSON.parse(stored);
    } catch (_) {}
    return { '1st': true }; // Default unlocked for student viewing
  });

  useEffect(() => {
    if (initialBamsProf) {
      setSelectedCourseFolder(initialBamsProf);
      setSelectedSubjectFolder(null);
      setSelectedResourceFolder(null);
    }
  }, [initialBamsProf]);

  const currentCourseData = selectedCourseFolder ? BAMS_CURRICULUM_DATA[selectedCourseFolder] : null;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      const updatedData: UserProfile = {
        ...user,
        name: name.trim(),
        age: age.trim(),
        gender,
        mobileNumber: mobileNumber.trim(),
        whatsappNumber: whatsappNumber.trim(),
        isInCollege,
        collegeName: isInCollege ? collegeName.trim() : '',
        course: targetCourse,
        updatedAt: new Date().toISOString(),
      };

      await saveUserProfile(updatedData);
      onUpdateUser(updatedData);
      setSavedSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error('Error updating profile:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="py-8 bg-[#fbfaf6] text-stone-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* ========================================================================= */}
        {/* TOP BAR: STUDENT WELCOME & TOGGLE TABS                                   */}
        {/* ========================================================================= */}
        <div className="bg-white border border-[#e5dfd3] rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1b4332] to-[#2d6a4f] border-2 border-amber-400/50 flex items-center justify-center text-xl font-black text-white shadow-xs shrink-0">
              <GraduationCap className="w-7 h-7 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#eaf2eb] text-[#1b4332] font-bold border border-[#c4dec8]">
                  Enrolled Student Portal
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Licensed Access Verified</span>
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black font-serif text-stone-900 mt-1">
                Welcome, {user.name || 'Ayurveda Scholar'}
              </h1>
              <p className="text-xs text-stone-600">
                Direct academic access to all lecture videos, handwritten notes, and test series.
              </p>
            </div>
          </div>

          {/* Tab Switcher: Course Folders vs Profile */}
          <div className="flex items-center gap-2 p-1.5 bg-[#f4f0e6] border border-[#dfd6c5] rounded-2xl shrink-0">
            <button
              onClick={() => setActiveView('folders')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeView === 'folders'
                  ? 'bg-[#1b4332] text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <Folder className="w-3.5 h-3.5" />
              <span>Enrolled Course Folders</span>
            </button>

            <button
              onClick={() => setActiveView('profile')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeView === 'profile'
                  ? 'bg-[#1b4332] text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>My Profile</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VIEW 1: ENROLLED COURSES IN FOLDER FORMAT                                 */}
        {/* ========================================================================= */}
        {activeView === 'folders' && (
          <div className="space-y-6">
            
            {/* Breadcrumb Navigation Bar */}
            <div className="bg-white border border-[#e5dfd3] rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              
              <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 flex-wrap">
                
                {/* Level 0 Root: Enrolled Courses */}
                <button
                  onClick={() => {
                    setSelectedCourseFolder(null);
                    setSelectedSubjectFolder(null);
                    setSelectedResourceFolder(null);
                  }}
                  className={`flex items-center gap-1.5 hover:text-[#1b4332] transition-colors cursor-pointer ${
                    !selectedCourseFolder ? 'text-[#1b4332] font-black' : ''
                  }`}
                >
                  <Folder className="w-4 h-4 text-amber-500 fill-amber-500/20" />
                  <span>Enrolled Courses</span>
                </button>

                {/* Level 1: Selected Course Folder */}
                {selectedCourseFolder && (
                  <>
                    <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                    <button
                      onClick={() => {
                        setSelectedSubjectFolder(null);
                        setSelectedResourceFolder(null);
                      }}
                      className={`flex items-center gap-1.5 hover:text-[#1b4332] transition-colors cursor-pointer ${
                        !selectedSubjectFolder ? 'text-[#1b4332] font-black' : ''
                      }`}
                    >
                      <Folder className="w-4 h-4 text-emerald-600 fill-emerald-600/20" />
                      <span>BAMS {BAMS_CURRICULUM_DATA[selectedCourseFolder].shortTitle} Enrolled</span>
                    </button>
                  </>
                )}

                {/* Level 2: Selected Subject Folder */}
                {selectedSubjectFolder && (
                  <>
                    <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                    <button
                      onClick={() => {
                        setSelectedResourceFolder(null);
                      }}
                      className={`flex items-center gap-1.5 hover:text-[#1b4332] transition-colors cursor-pointer ${
                        !selectedResourceFolder ? 'text-[#1b4332] font-black' : ''
                      }`}
                    >
                      <Folder className="w-4 h-4 text-amber-600 fill-amber-600/20" />
                      <span>{selectedSubjectFolder.name}</span>
                    </button>
                  </>
                )}

                {/* Level 3: Selected Resource Folder */}
                {selectedResourceFolder && (
                  <>
                    <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                    <span className="flex items-center gap-1.5 text-[#1b4332] font-black uppercase tracking-wider text-[11px]">
                      {selectedResourceFolder === 'lectures' && <Video className="w-3.5 h-3.5 text-amber-600" />}
                      {selectedResourceFolder === 'notes' && <FileText className="w-3.5 h-3.5 text-[#2d6a4f]" />}
                      {selectedResourceFolder === 'tests' && <Award className="w-3.5 h-3.5 text-indigo-600" />}
                      <span>{selectedResourceFolder}</span>
                    </span>
                  </>
                )}

              </div>

              {/* Back button */}
              {(selectedResourceFolder || selectedSubjectFolder || selectedCourseFolder) && (
                <button
                  onClick={() => {
                    if (selectedResourceFolder) {
                      setSelectedResourceFolder(null);
                    } else if (selectedSubjectFolder) {
                      setSelectedSubjectFolder(null);
                    } else if (selectedCourseFolder) {
                      setSelectedCourseFolder(null);
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#f4f0e6] hover:bg-stone-200 text-stone-700 text-xs font-bold transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              )}

            </div>

            {/* ===================================================================== */}
            {/* LEVEL 0: ROOT - ENROLLED COURSES FOLDERS                             */}
            {/* ===================================================================== */}
            {!selectedCourseFolder && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                      <FolderOpen className="w-5 h-5 text-amber-500" />
                      <span>My Enrolled Course Folders</span>
                    </h2>
                    <p className="text-xs text-stone-500">
                      Click any course folder below to open enrolled subjects and materials.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {(['1st', '2nd', 'final'] as const).map((profKey) => {
                    const prof = BAMS_CURRICULUM_DATA[profKey];
                    const isUnlocked = unlockedProfs[profKey] || profKey === '1st';

                    return (
                      <div
                        key={profKey}
                        onClick={() => {
                          setSelectedCourseFolder(profKey);
                          setSelectedSubjectFolder(null);
                          setSelectedResourceFolder(null);
                        }}
                        className="bg-white hover:bg-[#fcfbf9] border border-[#e2dacf] hover:border-[#2d6a4f] rounded-2xl p-5 shadow-xs hover:shadow-md transition-all cursor-pointer group relative flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="w-12 h-12 rounded-2xl bg-[#eaf2eb] group-hover:bg-[#1b4332] text-[#1b4332] group-hover:text-amber-300 flex items-center justify-center transition-colors">
                              <Folder className="w-6 h-6 fill-current" />
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold flex items-center gap-1">
                              <Check className="w-3 h-3" />
                              <span>Enrolled</span>
                            </span>
                          </div>

                          <div>
                            <h3 className="text-base font-bold text-stone-900 group-hover:text-[#1b4332] transition-colors">
                              BAMS {prof.shortTitle} Enrolled
                            </h3>
                            <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                              {prof.subtitle}
                            </p>
                          </div>

                          <div className="p-2.5 bg-[#fbfaf6] rounded-xl border border-stone-200 text-xs text-stone-700 flex items-center justify-between">
                            <span>{prof.subjects.length} Major Subjects</span>
                            <span className="font-bold text-[#2d6a4f]">Open Folder →</span>
                          </div>
                        </div>

                        <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                          <span>Validity: 18 Months</span>
                          <span className="font-semibold text-stone-700">NCISM Aligned</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ===================================================================== */}
            {/* LEVEL 1: INSIDE COURSE - SHOW ENROLLED SUBJECTS IN FOLDER FORMAT      */}
            {/* ===================================================================== */}
            {selectedCourseFolder && currentCourseData && !selectedSubjectFolder && (
              <div className="space-y-4">
                
                {/* Subject Folders Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentCourseData.subjects.map((subject) => (
                    <div
                      key={subject.id}
                      onClick={() => {
                        setSelectedSubjectFolder(subject);
                        setSelectedResourceFolder(null);
                      }}
                      className="bg-white hover:bg-[#fcfbf9] border border-[#e2dacf] hover:border-[#2d6a4f] rounded-2xl p-5 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        
                        {/* Folder Header */}
                        <div className="flex items-center justify-between">
                          <div className="w-11 h-11 rounded-xl bg-amber-50 group-hover:bg-[#1b4332] text-amber-700 group-hover:text-amber-300 flex items-center justify-center transition-colors">
                            <Folder className="w-6 h-6 fill-current" />
                          </div>
                        </div>

                        {/* Subject Title */}
                        <div>
                          <h3 className="text-base font-bold text-stone-900 group-hover:text-[#1b4332] transition-colors">
                            {subject.name}
                          </h3>
                          <p className="text-xs text-stone-500 mt-0.5 line-clamp-1">
                            {subject.codeName}
                          </p>
                        </div>

                        {/* Folder Contents Summary Badges */}
                        <div className="grid grid-cols-3 gap-1.5 pt-1 text-center">
                          <div className="p-2 bg-[#fbfaf6] rounded-xl border border-stone-200">
                            <Video className="w-3.5 h-3.5 text-amber-600 mx-auto" />
                            <span className="text-[11px] font-bold text-stone-800 block mt-0.5">
                              {subject.lecturesCount}
                            </span>
                            <span className="text-[9px] text-stone-400 uppercase">Classes</span>
                          </div>

                          <div className="p-2 bg-[#fbfaf6] rounded-xl border border-stone-200">
                            <FileText className="w-3.5 h-3.5 text-[#2d6a4f] mx-auto" />
                            <span className="text-[11px] font-bold text-stone-800 block mt-0.5">
                              {subject.notesCount}
                            </span>
                            <span className="text-[9px] text-stone-400 uppercase">PDFs</span>
                          </div>

                          <div className="p-2 bg-[#fbfaf6] rounded-xl border border-stone-200">
                            <Award className="w-3.5 h-3.5 text-indigo-600 mx-auto" />
                            <span className="text-[11px] font-bold text-stone-800 block mt-0.5">
                              {subject.testsCount}
                            </span>
                            <span className="text-[9px] text-stone-400 uppercase">Tests</span>
                          </div>
                        </div>

                      </div>

                      <div className="pt-3 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#1b4332]">
                        <span>Open Subject Folder</span>
                        <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* ===================================================================== */}
            {/* LEVEL 2: INSIDE SUBJECT - SHOW 3 FOLDERS (LECTURES, NOTES, TESTS)     */}
            {/* ===================================================================== */}
            {selectedCourseFolder && selectedSubjectFolder && !selectedResourceFolder && (
              <div className="space-y-5">
                
                {/* THE 3 RESOURCE FOLDERS (LECTURES, NOTES, TESTS) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  
                  {/* FOLDER 1: LECTURES */}
                  <div
                    onClick={() => setSelectedResourceFolder('lectures')}
                    className="bg-white hover:bg-[#fcfbf9] border-2 border-[#e2dacf] hover:border-amber-500 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-14 h-14 rounded-2xl bg-amber-100 group-hover:bg-amber-500 text-amber-800 group-hover:text-white flex items-center justify-center transition-colors shadow-xs">
                          <Folder className="w-7 h-7 fill-current" />
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold flex items-center gap-1">
                          <Video className="w-3.5 h-3.5" />
                          <span>{selectedSubjectFolder.lecturesCount} Classes</span>
                        </span>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold font-serif text-stone-900 group-hover:text-amber-700 transition-colors">
                          Lectures Folder
                        </h3>
                        <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                          Chapter-wise video classes, shloka recitation, Anvaya analysis, and recorded university lectures.
                        </p>
                      </div>

                      <div className="space-y-1 pt-1 text-xs text-stone-600">
                        <div className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-amber-600" />
                          <span>Full HD Video Lectures</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-amber-600" />
                          <span>Playback Speed &amp; Bookmarks</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-amber-800">
                      <span>Open Lectures Folder</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* FOLDER 2: NOTES */}
                  <div
                    onClick={() => setSelectedResourceFolder('notes')}
                    className="bg-white hover:bg-[#fcfbf9] border-2 border-[#e2dacf] hover:border-[#1b4332] rounded-3xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-14 h-14 rounded-2xl bg-[#eaf2eb] group-hover:bg-[#1b4332] text-[#1b4332] group-hover:text-white flex items-center justify-center transition-colors shadow-xs">
                          <Folder className="w-7 h-7 fill-current" />
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5" />
                          <span>{selectedSubjectFolder.notesCount} PDFs</span>
                        </span>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold font-serif text-stone-900 group-hover:text-[#1b4332] transition-colors">
                          Notes Folder
                        </h3>
                        <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                          Downloadable high-yield handwritten chapter notes, summary flash charts, and solved university question banks.
                        </p>
                      </div>

                      <div className="space-y-1 pt-1 text-xs text-stone-600">
                        <div className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#2d6a4f]" />
                          <span>Printable PDF Handouts</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#2d6a4f]" />
                          <span>5-Year Solved Model Answers</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#1b4332]">
                      <span>Open Notes Folder</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* FOLDER 3: TESTS */}
                  <div
                    onClick={() => setSelectedResourceFolder('tests')}
                    className="bg-white hover:bg-[#fcfbf9] border-2 border-[#e2dacf] hover:border-indigo-600 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-14 h-14 rounded-2xl bg-indigo-50 group-hover:bg-indigo-600 text-indigo-700 group-hover:text-white flex items-center justify-center transition-colors shadow-xs">
                          <Folder className="w-7 h-7 fill-current" />
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200 text-xs font-bold flex items-center gap-1">
                          <Award className="w-3.5 h-3.5" />
                          <span>{selectedSubjectFolder.testsCount} Series</span>
                        </span>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold font-serif text-stone-900 group-hover:text-indigo-700 transition-colors">
                          Tests Folder
                        </h3>
                        <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                          Chapter-wise MCQ question banks, university pattern timed drills, and scoring evaluations.
                        </p>
                      </div>

                      <div className="space-y-1 pt-1 text-xs text-stone-600">
                        <div className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Real Time Exam Simulator</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Instant Score &amp; Explanations</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-indigo-700">
                      <span>Open Tests Folder</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* ===================================================================== */}
            {/* LEVEL 3: INSIDE RESOURCE FOLDER (SHOW LECTURES / NOTES / TESTS)       */}
            {/* ===================================================================== */}
            {selectedCourseFolder && selectedSubjectFolder && selectedResourceFolder && (
              <div className="space-y-4">

                {/* --- LECTURES LIST --- */}
                {selectedResourceFolder === 'lectures' && (
                  <div className="space-y-3">
                    {selectedSubjectFolder.lectures.length > 0 ? (
                      selectedSubjectFolder.lectures.map((lec, idx) => (
                        <div
                          key={lec.id}
                          className="bg-white border border-[#e2dacf] rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div className="flex items-start gap-3.5">
                            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                              {idx + 1}
                            </div>
                            <div>
                              <span className="text-[10px] font-extrabold text-[#2d6a4f] uppercase tracking-wider block">
                                Topic: {lec.topic}
                              </span>
                              <h4 className="text-sm sm:text-base font-bold text-stone-900">
                                {lec.title}
                              </h4>
                              <div className="flex items-center gap-3 text-xs text-stone-500 mt-1">
                                <span className="flex items-center gap-1">
                                  <User className="w-3 h-3" />
                                  <span>{lec.teacher}</span>
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{lec.duration}</span>
                                </span>
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => setActiveLectureModal(lec)}
                            className="px-4 py-2 bg-[#1b4332] hover:bg-[#143d2b] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors shrink-0 cursor-pointer"
                          >
                            <Play className="w-3.5 h-3.5 fill-current text-amber-300" />
                            <span>Watch Lecture</span>
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="bg-white border border-[#e2dacf] rounded-2xl p-8 sm:p-12 text-center space-y-3 shadow-xs">
                        <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
                          <Video className="w-7 h-7" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-base font-bold text-stone-900">0 Video Lectures Uploaded</h3>
                          <p className="text-xs text-stone-500 max-w-md mx-auto">
                            Currently no video lectures have been uploaded for {selectedSubjectFolder.name}. Our faculty is recording NCISM-aligned video classes. They will appear here automatically.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* --- NOTES LIST --- */}
                {selectedResourceFolder === 'notes' && (
                  <div className="space-y-3">
                    {selectedSubjectFolder.notes.length > 0 ? (
                      selectedSubjectFolder.notes.map((note) => (
                        <div
                          key={note.id}
                          className="bg-white border border-[#e2dacf] rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div className="flex items-start gap-3.5">
                            <div className="w-10 h-10 rounded-xl bg-[#eaf2eb] text-[#1b4332] flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] px-2 py-0.2 rounded bg-emerald-100 text-emerald-800 font-extrabold uppercase">
                                  {note.type}
                                </span>
                                <span className="text-xs text-stone-500">
                                  {note.pages} Pages • {note.size}
                                </span>
                              </div>
                              <h4 className="text-sm sm:text-base font-bold text-stone-900 mt-1">
                                {note.title}
                              </h4>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => setActiveNoteModal(note)}
                              className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <BookOpen className="w-3.5 h-3.5 text-stone-600" />
                              <span>Preview</span>
                            </button>

                            <a
                              href={note.downloadUrl}
                              onClick={(e) => {
                                e.preventDefault();
                                alert(`Downloading ${note.title} (${note.size})...\nVerified offline access for BAMS ${currentCourseData.shortTitle}.`);
                              }}
                              className="px-4 py-2 bg-[#1b4332] hover:bg-[#143d2b] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                            >
                              <Download className="w-3.5 h-3.5 text-amber-300" />
                              <span>Download PDF</span>
                            </a>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="bg-white border border-[#e2dacf] rounded-2xl p-8 sm:p-12 text-center space-y-3 shadow-xs">
                        <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 text-[#1b4332] flex items-center justify-center border border-[#c4dec8]">
                          <FileText className="w-7 h-7" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-base font-bold text-stone-900">0 PDF Notes Uploaded</h3>
                          <p className="text-xs text-stone-500 max-w-md mx-auto">
                            Currently no PDF notes have been uploaded for {selectedSubjectFolder.name}. Verified handwritten &amp; typed study materials will appear here once released.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* --- TESTS LIST --- */}
                {selectedResourceFolder === 'tests' && (
                  <div className="space-y-3">
                    {selectedSubjectFolder.tests.length > 0 ? (
                      selectedSubjectFolder.tests.map((test) => (
                        <div
                          key={test.id}
                          className="bg-white border border-[#e2dacf] rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div className="flex items-start gap-3.5">
                            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                              <Award className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] px-2 py-0.2 rounded bg-indigo-100 text-indigo-800 font-extrabold uppercase">
                                  {test.difficulty}
                                </span>
                                <span className="text-xs text-stone-500">
                                  {test.questionsCount} Questions • {test.duration} • Max {test.maxMarks} Marks
                                </span>
                              </div>
                              <h4 className="text-sm sm:text-base font-bold text-stone-900 mt-1">
                                {test.title}
                              </h4>
                            </div>
                          </div>

                          <button
                            onClick={() => onStartMockTest('BAMS')}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-colors shrink-0 cursor-pointer"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Start Test Simulator</span>
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="bg-white border border-[#e2dacf] rounded-2xl p-8 sm:p-12 text-center space-y-3 shadow-xs">
                        <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-200">
                          <Award className="w-7 h-7" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-base font-bold text-stone-900">0 Mock Tests Uploaded</h3>
                          <p className="text-xs text-stone-500 max-w-md mx-auto">
                            Currently no mock tests have been scheduled for {selectedSubjectFolder.name}. Practice tests will appear here once published.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: STUDENT PROFILE & SETTINGS                                        */}
        {/* ========================================================================= */}
        {activeView === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Registered Details */}
            <div className="bg-white border border-[#e5dfd3] rounded-3xl p-6 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#2d6a4f]" />
                  <span>My Student Account</span>
                </h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-xs text-amber-800 hover:text-amber-900 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(false)}
                    className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Cancel</span>
                  </button>
                )}
              </div>

              {savedSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Your profile details have been saved successfully!</span>
                </div>
              )}

              {!isEditing ? (
                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-[#fbfaf6] rounded-xl border border-stone-200 space-y-0.5">
                    <span className="text-stone-500 block text-[11px] font-semibold">Scholar Name</span>
                    <p className="text-sm font-bold text-stone-900">{user.name || 'Dr./Vaidya Student'}</p>
                  </div>

                  <div className="p-3 bg-[#fbfaf6] rounded-xl border border-stone-200 space-y-0.5">
                    <span className="text-stone-500 block text-[11px] font-semibold">Email Address</span>
                    <p className="text-sm font-bold text-[#1b4332] truncate">{user.email || 'scholar@ayurveez.in'}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 bg-[#fbfaf6] rounded-xl border border-stone-200 space-y-0.5">
                      <span className="text-stone-500 block text-[11px] font-semibold">Mobile</span>
                      <p className="text-xs font-bold text-stone-800">{user.mobileNumber || '8271890090'}</p>
                    </div>
                    <div className="p-3 bg-[#fbfaf6] rounded-xl border border-stone-200 space-y-0.5">
                      <span className="text-stone-500 block text-[11px] font-semibold">WhatsApp</span>
                      <p className="text-xs font-bold text-[#2d6a4f]">{user.whatsappNumber || '8271890090'}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-[#fbfaf6] rounded-xl border border-stone-200 space-y-0.5">
                    <span className="text-stone-500 block text-[11px] font-semibold">Ayurveda College</span>
                    <p className="text-xs font-bold text-stone-800">{user.collegeName || 'National Institute of Ayurveda'}</p>
                  </div>

                  <div className="p-3 bg-[#faf6ee] rounded-xl border border-amber-200 space-y-0.5">
                    <span className="text-stone-500 block text-[11px] font-semibold">Enrolled Track</span>
                    <p className="text-xs font-black text-amber-900">BAMS Degree Curriculum</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Scholar Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#fbfaf6] border border-stone-300 rounded-xl text-stone-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">Age</label>
                      <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full px-3 py-2 bg-[#fbfaf6] border border-stone-300 rounded-xl text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">Gender</label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value as any)}
                        className="w-full px-3 py-2 bg-[#fbfaf6] border border-stone-300 rounded-xl text-stone-900"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">WhatsApp Number</label>
                    <input
                      type="tel"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      className="w-full px-3 py-2 bg-[#fbfaf6] border border-stone-300 rounded-xl text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">College / University</label>
                    <input
                      type="text"
                      value={collegeName}
                      onChange={(e) => setCollegeName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#fbfaf6] border border-stone-300 rounded-xl text-stone-900"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full py-2.5 bg-[#1b4332] hover:bg-[#143d2b] text-white font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{saving ? 'Saving...' : 'Save Profile Details'}</span>
                  </button>
                </form>
              )}
            </div>

            {/* Right 2 Columns: Enrolled Licenses & Support */}
            <div className="lg:col-span-2 space-y-6">
              
              <div className="bg-white border border-[#e5dfd3] rounded-3xl p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                    <Key className="w-4 h-4 text-[#2d6a4f]" />
                    <span>Active License Keys &amp; Unlocked Courses</span>
                  </h3>
                  <span className="text-xs text-[#2d6a4f] font-bold">
                    Official AYURVEEZ Verification
                  </span>
                </div>

                <div className="space-y-3">
                  {(['1st', '2nd', 'final'] as const).map((profKey) => {
                    const prof = BAMS_CURRICULUM_DATA[profKey];
                    const isUnlocked = unlockedProfs[profKey] || profKey === '1st';

                    return (
                      <div
                        key={profKey}
                        className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          isUnlocked
                            ? 'bg-[#eaf2eb] border-[#c4dec8]'
                            : 'bg-[#fbfaf6] border-stone-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                            isUnlocked ? 'bg-[#1b4332] text-white' : 'bg-stone-200 text-stone-600'
                          }`}>
                            {prof.shortTitle}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-stone-900">
                              BAMS {prof.shortTitle} Curriculum Pack
                            </h4>
                            <p className="text-[11px] text-stone-500">
                              {prof.subjects.length} Subjects • {prof.validity}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {isUnlocked ? (
                            <span className="px-3 py-1 rounded-full bg-white text-[#1b4332] text-xs font-bold border border-[#c4dec8] flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#2d6a4f]" />
                              <span>Active Access</span>
                            </span>
                          ) : (
                            <button
                              onClick={() => {
                                if (onNavigate) {
                                  onNavigate('bams-courses');
                                }
                              }}
                              className="px-3 py-1 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl cursor-pointer"
                            >
                              Unlock Course
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Support & Ayurveez Helpline */}
              <div className="bg-[#f4f0e6] border border-[#dfd6c5] rounded-3xl p-6 space-y-3">
                <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#2d6a4f]" />
                  <span>Need Academic Guidance or Code Support?</span>
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Our academic council and technical team are available on WhatsApp for university notes questions, syllabus queries, and instant license key delivery.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href="https://wa.me/918271890090?text=Namaste%20Ayurveez%20Team%2C%20I%20need%20assistance%20with%20my%20enrolled%20BAMS%20courses"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <span>Chat on WhatsApp (+91 8271890090)</span>
                  </a>
                  <a
                    href="mailto:ayurveez@gmail.com"
                    className="px-4 py-2 bg-white text-stone-800 border border-[#dfd6c5] text-xs font-bold rounded-xl hover:bg-stone-50 transition-colors"
                  >
                    <span>Email Support (ayurveez@gmail.com)</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* MODAL: VIDEO LECTURE PLAYER PREVIEW                                      */}
      {/* ========================================================================= */}
      {activeLectureModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-stone-900 text-white rounded-3xl border border-stone-700 max-w-3xl w-full overflow-hidden shadow-2xl space-y-0">
            
            {/* Video Player Box */}
            <div className="aspect-video bg-black relative flex items-center justify-center">
              <div className="text-center space-y-3 p-6">
                <div className="w-16 h-16 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center justify-center mx-auto shadow-lg animate-pulse">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-900 text-emerald-300 text-[10px] font-bold border border-emerald-700 uppercase">
                    Ayurveez HD Masterclass Stream
                  </span>
                  <h3 className="text-lg font-bold text-white mt-2">
                    {activeLectureModal.title}
                  </h3>
                  <p className="text-xs text-stone-400 mt-1">
                    {activeLectureModal.teacher} • {activeLectureModal.duration}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveLectureModal(null)}
                className="absolute top-4 right-4 text-stone-400 hover:text-white p-2 rounded-full bg-black/60 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Video Controls & Notes */}
            <div className="p-5 bg-stone-900 flex items-center justify-between border-t border-stone-800 text-xs">
              <span className="text-stone-400">
                NCISM University Video Player • Topic: <strong className="text-white">{activeLectureModal.topic}</strong>
              </span>
              <button
                onClick={() => setActiveLectureModal(null)}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-white font-bold rounded-xl cursor-pointer"
              >
                Close Player
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: PDF NOTE VIEWER PREVIEW                                            */}
      {/* ========================================================================= */}
      {activeNoteModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-stone-900 rounded-3xl border border-stone-300 max-w-2xl w-full overflow-hidden shadow-2xl">
            
            <div className="p-5 bg-white border-b border-stone-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#2d6a4f] uppercase tracking-wider block">
                  Document Preview ({activeNoteModal.type})
                </span>
                <h3 className="text-base font-bold text-stone-900">
                  {activeNoteModal.title}
                </h3>
                <span className="text-xs text-stone-500">
                  {activeNoteModal.pages} Pages • {activeNoteModal.size}
                </span>
              </div>

              <button
                onClick={() => setActiveNoteModal(null)}
                className="text-stone-400 hover:text-stone-600 p-2 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-8 text-center space-y-4 bg-[#fbfaf6]">
              <div className="w-16 h-16 rounded-2xl bg-[#eaf2eb] text-[#1b4332] flex items-center justify-center mx-auto border border-[#c4dec8]">
                <FileText className="w-8 h-8" />
              </div>
              <div className="space-y-1 max-w-md mx-auto">
                <h4 className="text-base font-bold text-stone-900">
                  Official Printable PDF Notes
                </h4>
                <p className="text-xs text-stone-600">
                  This document contains authentic word-by-word Sanskrit anvaya, Chakrapani commentary translations, and chapter-wise exam question answers.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-center gap-3">
                <a
                  href={activeNoteModal.downloadUrl}
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Downloading ${activeNoteModal.title} (${activeNoteModal.size})...\nSaved to your device for offline study.`);
                    setActiveNoteModal(null);
                  }}
                  className="px-5 py-2.5 bg-[#1b4332] hover:bg-[#143d2b] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-amber-300" />
                  <span>Download Full PDF ({activeNoteModal.size})</span>
                </a>

                <button
                  onClick={() => setActiveNoteModal(null)}
                  className="px-4 py-2.5 bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
