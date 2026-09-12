import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Plus,
  Edit3,
  Trash2,
  Save,
  Check,
  AlertCircle,
  ArrowLeft,
  BookOpen,
  Image as ImageIcon,
  FolderPlus,
  ChevronRight,
  Sparkles,
  Eye,
  RefreshCw,
  FileText,
  Video,
  HelpCircle,
  CheckCircle2,
  Tag,
  Link2,
  X,
  Layers,
  Award,
  Lock,
  Unlock,
  ExternalLink,
  FolderOpen
} from 'lucide-react';
import {
  BamsProfCourse,
  BamsSubject,
  TopLevelCourse,
  AspectRatioType,
  SubjectMaterialItem,
  MaterialType,
  convertGoogleDriveUrl,
  getLocalBamsProffs,
  getLocalTopCourses,
  syncBamsProffsToFirestore,
  syncTopCoursesToFirestore,
  subscribeCoursesHierarchy,
  getSubjectStats
} from '../data/coursesHierarchyStore';

export const AdminCoursesManager: React.FC = () => {
  // Navigation view levels: 'top-courses' | 'bams-proffs' | 'bams-subjects'
  const [viewLevel, setViewLevel] = useState<'top-courses' | 'bams-proffs' | 'bams-subjects'>('top-courses');
  const [selectedProffId, setSelectedProffId] = useState<string>('1st');

  // Courses data state
  const [topCourses, setTopCourses] = useState<TopLevelCourse[]>(() => getLocalTopCourses());
  const [bamsProffs, setBamsProffs] = useState<Record<string, BamsProfCourse>>(() => getLocalBamsProffs());
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  // Modals state
  const [editingTopCourse, setEditingTopCourse] = useState<TopLevelCourse | null>(null);
  const [isAddTopCourseModal, setIsAddTopCourseModal] = useState<boolean>(false);

  const [editingProff, setEditingProff] = useState<BamsProfCourse | null>(null);
  const [isAddProffModal, setIsAddProffModal] = useState<boolean>(false);

  const [editingSubject, setEditingSubject] = useState<BamsSubject | null>(null);
  const [isAddSubjectModal, setIsAddSubjectModal] = useState<boolean>(false);
  const [managingMaterialsSubject, setManagingMaterialsSubject] = useState<BamsSubject | null>(null);

  // Image Preview Lightbox
  const [previewImage, setPreviewImage] = useState<{ url: string; title: string } | null>(null);

  // Subscribe to real-time changes
  useEffect(() => {
    const unsubscribe = subscribeCoursesHierarchy(({ bamsProffs: newProffs, topCourses: newTop }) => {
      setBamsProffs(newProffs);
      setTopCourses(newTop);
    });
    return () => unsubscribe();
  }, []);

  const triggerSyncFeedback = (message: string) => {
    setSyncStatus(message);
    setTimeout(() => {
      setSyncStatus(null);
    }, 4000);
  };

  // ==========================================
  // TOP COURSES HANDLERS
  // ==========================================
  const handleSaveTopCourse = async (course: TopLevelCourse) => {
    setIsSyncing(true);
    let updatedCourses: TopLevelCourse[];
    const exists = topCourses.some(c => c.id === course.id);
    if (exists) {
      updatedCourses = topCourses.map(c => c.id === course.id ? course : c);
    } else {
      updatedCourses = [...topCourses, course];
    }
    setTopCourses(updatedCourses);
    await syncTopCoursesToFirestore(updatedCourses);
    setIsSyncing(false);
    setEditingTopCourse(null);
    setIsAddTopCourseModal(false);
    triggerSyncFeedback(`Course "${course.name}" saved permanently!`);
  };

  const handleDeleteTopCourse = async (courseId: string) => {
    if (!window.confirm(`Are you sure you want to delete this course (${courseId})?`)) return;
    setIsSyncing(true);
    const updatedCourses = topCourses.filter(c => c.id !== courseId);
    setTopCourses(updatedCourses);
    await syncTopCoursesToFirestore(updatedCourses);
    setIsSyncing(false);
    triggerSyncFeedback(`Course deleted successfully.`);
  };

  // ==========================================
  // BAMS PROFF HANDLERS
  // ==========================================
  const handleSaveProff = async (proff: BamsProfCourse) => {
    setIsSyncing(true);
    const updatedProffs = { ...bamsProffs, [proff.id]: proff };
    setBamsProffs(updatedProffs);
    await syncBamsProffsToFirestore(updatedProffs);
    setIsSyncing(false);
    setEditingProff(null);
    setIsAddProffModal(false);
    triggerSyncFeedback(`Professional year "${proff.shortTitle}" (${proff.batchName}) saved permanently!`);
  };

  const handleDeleteProff = async (proffId: string) => {
    if (!window.confirm(`Are you sure you want to delete ${proffId} Professional course and all its subjects?`)) return;
    setIsSyncing(true);
    const updatedProffs = { ...bamsProffs };
    delete updatedProffs[proffId];
    setBamsProffs(updatedProffs);
    await syncBamsProffsToFirestore(updatedProffs);
    setIsSyncing(false);
    triggerSyncFeedback(`Professional course deleted.`);
  };

  // ==========================================
  // SUBJECT HANDLERS
  // ==========================================
  const currentProff = bamsProffs[selectedProffId];

  const handleSaveSubject = async (subject: BamsSubject) => {
    if (!currentProff) return;
    setIsSyncing(true);
    const existingSubjects = currentProff.subjects || [];
    let updatedSubjects: BamsSubject[];
    const exists = existingSubjects.some(s => s.id === subject.id);
    if (exists) {
      updatedSubjects = existingSubjects.map(s => s.id === subject.id ? subject : s);
    } else {
      updatedSubjects = [...existingSubjects, subject];
    }

    const updatedProff: BamsProfCourse = {
      ...currentProff,
      subjects: updatedSubjects
    };

    const updatedProffs = {
      ...bamsProffs,
      [selectedProffId]: updatedProff
    };

    setBamsProffs(updatedProffs);
    await syncBamsProffsToFirestore(updatedProffs);
    setIsSyncing(false);
    setEditingSubject(null);
    setIsAddSubjectModal(false);
    triggerSyncFeedback(`Subject "${subject.name}" saved with thumbnail!`);
  };

  const handleDeleteSubject = async (subjectId: string) => {
    if (!currentProff) return;
    if (!window.confirm(`Are you sure you want to delete this subject course?`)) return;
    setIsSyncing(true);
    const updatedSubjects = (currentProff.subjects || []).filter(s => s.id !== subjectId);
    const updatedProff: BamsProfCourse = {
      ...currentProff,
      subjects: updatedSubjects
    };
    const updatedProffs = {
      ...bamsProffs,
      [selectedProffId]: updatedProff
    };
    setBamsProffs(updatedProffs);
    await syncBamsProffsToFirestore(updatedProffs);
    setIsSyncing(false);
    triggerSyncFeedback(`Subject deleted.`);
  };

  const handleSaveSubjectMaterials = async (subjectId: string, updatedMaterials: SubjectMaterialItem[]) => {
    if (!currentProff) return;
    setIsSyncing(true);
    const existingSubjects = currentProff.subjects || [];
    const updatedSubjects = existingSubjects.map((s) => {
      if (s.id === subjectId) {
        const lectures = updatedMaterials.filter((m) => m.type === 'lecture').length;
        const notes = updatedMaterials.filter((m) => m.type === 'note').length;
        const tests = updatedMaterials.filter((m) => m.type === 'test').length;
        return {
          ...s,
          materials: updatedMaterials,
          lecturesCount: lectures,
          notesCount: notes,
          testsCount: tests,
        };
      }
      return s;
    });

    const updatedProff: BamsProfCourse = {
      ...currentProff,
      subjects: updatedSubjects,
    };

    const updatedProffs = {
      ...bamsProffs,
      [selectedProffId]: updatedProff,
    };

    setBamsProffs(updatedProffs);
    await syncBamsProffsToFirestore(updatedProffs);
    setIsSyncing(false);

    // Update managingMaterialsSubject in state if open
    setManagingMaterialsSubject((prev) => {
      if (!prev || prev.id !== subjectId) return prev;
      return {
        ...prev,
        materials: updatedMaterials,
        lecturesCount: updatedMaterials.filter((m) => m.type === 'lecture').length,
        notesCount: updatedMaterials.filter((m) => m.type === 'note').length,
        testsCount: updatedMaterials.filter((m) => m.type === 'test').length,
      };
    });

    triggerSyncFeedback(`Materials updated for subject! (${updatedMaterials.length} items synced)`);
  };

  // Helper for aspect ratio styling
  const getAspectClass = (ratio: AspectRatioType) => {
    switch (ratio) {
      case '1:1':
        return 'aspect-square';
      case '4:3':
        return 'aspect-[4/3]';
      case '16:9':
        return 'aspect-video';
      default:
        return 'aspect-square';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* HEADER & BREADCRUMBS */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#e2dacf] shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-stone-500 mb-1">
              <button
                type="button"
                onClick={() => setViewLevel('top-courses')}
                className={`hover:text-[#1b4332] cursor-pointer ${viewLevel === 'top-courses' ? 'text-[#1b4332] font-black' : ''}`}
              >
                All Courses
              </button>
              {viewLevel !== 'top-courses' && (
                <>
                  <ChevronRight className="w-3 h-3 text-stone-400" />
                  <button
                    type="button"
                    onClick={() => setViewLevel('bams-proffs')}
                    className={`hover:text-[#1b4332] cursor-pointer ${viewLevel === 'bams-proffs' ? 'text-[#1b4332] font-black' : ''}`}
                  >
                    BAMS Proff Courses
                  </button>
                </>
              )}
              {viewLevel === 'bams-subjects' && (
                <>
                  <ChevronRight className="w-3 h-3 text-stone-400" />
                  <span className="text-amber-800 font-black">
                    {currentProff?.shortTitle} ({currentProff?.batchName}) Subjects
                  </span>
                </>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-black font-serif text-stone-900 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-[#1b4332]" />
              <span>
                {viewLevel === 'top-courses' && 'Course Curriculum & Hierarchy Manager'}
                {viewLevel === 'bams-proffs' && 'BAMS Professional Years (Proff-wise Courses)'}
                {viewLevel === 'bams-subjects' && `${currentProff?.shortTitle} Subject-wise Courses & Thumbnails`}
              </span>
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              {viewLevel === 'top-courses' && 'Manage top-level courses (BAMS, AIAPGET, AYUSH MO). Click into BAMS to manage Proffs and Subject thumbnails.'}
              {viewLevel === 'bams-proffs' && 'Add, edit, or remove professional year courses (1st, 2nd, Final Proff). Customize poster cards with Google Drive links and 1:1, 4:3, or 16:9 ratios.'}
              {viewLevel === 'bams-subjects' && `Manage all subject courses inside ${currentProff?.shortTitle}. Upload subject thumbnails via Google Drive links and choose aspect ratio (1:1, 4:3, 16:9).`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {viewLevel !== 'top-courses' && (
              <button
                type="button"
                onClick={() => {
                  if (viewLevel === 'bams-subjects') setViewLevel('bams-proffs');
                  else setViewLevel('top-courses');
                }}
                className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            )}

            {viewLevel === 'top-courses' && (
              <button
                type="button"
                onClick={() => setIsAddTopCourseModal(true)}
                className="px-4 py-2 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-amber-300 text-xs font-black inline-flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Course Category</span>
              </button>
            )}

            {viewLevel === 'bams-proffs' && (
              <button
                type="button"
                onClick={() => setIsAddProffModal(true)}
                className="px-4 py-2 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-amber-300 text-xs font-black inline-flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Proff Course</span>
              </button>
            )}

            {viewLevel === 'bams-subjects' && (
              <button
                type="button"
                onClick={() => setIsAddSubjectModal(true)}
                className="px-4 py-2 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-amber-300 text-xs font-black inline-flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Subject Course</span>
              </button>
            )}
          </div>
        </div>

        {/* Sync Status Banner */}
        {syncStatus && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-900 font-bold flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{syncStatus}</span>
            </div>
            <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md font-mono">
              Firebase Synced
            </span>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* LEVEL 1: TOP-LEVEL COURSES (BAMS, AIAPGET, AYUSH MO)      */}
      {/* ========================================================= */}
      {viewLevel === 'top-courses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topCourses.map((course) => {
            const isBams = course.id.toUpperCase().includes('BAMS');
            const convertedImg = convertGoogleDriveUrl(course.thumbnailUrl || '');
            const aspectClass = getAspectClass(course.aspectRatio || '16:9');

            return (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-[#e2dacf] overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail Banner */}
                  <div className={`relative w-full ${aspectClass} bg-stone-900 overflow-hidden`}>
                    {convertedImg ? (
                      <img
                        src={convertedImg}
                        alt={course.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-stone-400 p-4 text-center">
                        <GraduationCap className="w-10 h-10 mb-1 text-amber-300" />
                        <span className="text-xs">{course.name}</span>
                      </div>
                    )}

                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/75 text-amber-300 text-[10px] font-black uppercase tracking-wider backdrop-blur-xs">
                      {course.aspectRatio || '16:9'}
                    </div>

                    <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-white/90 text-stone-900 text-[10px] font-bold shadow-xs">
                      {course.category}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#1b4332] border border-emerald-200 text-[10px] font-bold">
                        {course.badge}
                      </span>
                      <span className="text-xs font-black text-amber-700">
                        {course.studentsCount}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-black text-stone-900 leading-tight">
                        {course.name}
                      </h3>
                      <p className="text-xs text-[#2d6a4f] font-semibold mt-0.5">
                        {course.tagline}
                      </p>
                    </div>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>

                    {course.activeBatch && (
                      <div className="flex items-center gap-1 text-[11px] text-amber-900 font-bold bg-amber-50 p-2 rounded-lg border border-amber-200">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>Active: {course.activeBatch}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-5 pt-0 border-t border-stone-100 mt-2 space-y-2">
                  {isBams ? (
                    <button
                      type="button"
                      onClick={() => setViewLevel('bams-proffs')}
                      className="w-full py-2.5 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-amber-300 text-xs font-black inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    >
                      <Layers className="w-4 h-4" />
                      <span>Manage Proffs &amp; Subjects ({Object.keys(bamsProffs).length})</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  ) : null}

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingTopCourse(course)}
                      className="flex-1 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold inline-flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Course</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteTopCourse(course.id)}
                      className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors cursor-pointer"
                      title="Delete Course"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================= */}
      {/* LEVEL 2: BAMS PROFESSIONAL COURSES (1st, 2nd, Final Proff)*/}
      {/* ========================================================= */}
      {viewLevel === 'bams-proffs' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-amber-50/70 border border-amber-200 p-4 rounded-xl text-xs text-amber-900">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>
                <strong>BAMS Hierarchy Mode:</strong> Each professional year has its own master poster card (with customizable ratio 1:1, 4:3, 16:9) and subject-wise curriculum.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setViewLevel('top-courses')}
              className="text-[#1b4332] font-bold hover:underline cursor-pointer"
            >
              ← Return to All Courses
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(bamsProffs).map(([profKey, rawProff]) => {
              const proff = rawProff as BamsProfCourse;
              const convertedCardImg = convertGoogleDriveUrl(proff.cardImage || '');
              const aspectClass = getAspectClass(proff.aspectRatio || '1:1');

              return (
                <div
                  key={profKey}
                  className="bg-white rounded-2xl border border-[#e2dacf] overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    {/* Card Poster Image with Aspect Ratio */}
                    <div 
                      className={`relative w-full ${aspectClass} bg-stone-900 overflow-hidden cursor-pointer group`}
                      onClick={() => setPreviewImage({ url: convertedCardImg, title: `BAMS ${proff.shortTitle} Poster` })}
                      title="Click to view full poster"
                    >
                      {convertedCardImg ? (
                        <img
                          src={convertedCardImg}
                          alt={`BAMS ${proff.shortTitle}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-stone-400 p-4 text-center">
                          <BookOpen className="w-10 h-10 mb-1 text-amber-300" />
                          <span className="text-xs">BAMS {proff.shortTitle}</span>
                        </div>
                      )}

                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/75 text-amber-300 text-[10px] font-black uppercase tracking-wider backdrop-blur-xs">
                        Ratio: {proff.aspectRatio || '1:1'}
                      </div>

                      <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-[#1b4332] text-amber-200 text-[10px] font-black uppercase tracking-wider border border-amber-300/30">
                        {proff.batchName}
                      </div>

                      <div className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                        <Eye className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Proff Details */}
                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-[#1b4332] uppercase tracking-wider">
                          {proff.batchName}
                        </span>
                        <span className="text-xs font-bold text-stone-500">
                          {proff.duration}
                        </span>
                      </div>

                      <h3 className="text-lg font-black font-serif text-stone-900 leading-snug">
                        BAMS {proff.shortTitle}
                      </h3>

                      <p className="text-xs text-stone-600 line-clamp-2">
                        {proff.subtitle}
                      </p>

                      <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                        <div>
                          <span className="text-stone-400 line-through mr-1.5">₹{proff.originalPrice}</span>
                          <span className="text-base font-black text-amber-700">₹{proff.discountedPrice}</span>
                          <span className="ml-1 text-[10px] font-extrabold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                            {proff.discountPercentage}% OFF
                          </span>
                        </div>
                        <span className="text-[11px] font-bold text-stone-500">
                          {proff.subjects?.length || 0} Subjects Pack
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-5 pt-0 border-t border-stone-100 mt-2 space-y-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedProffId(profKey);
                        setViewLevel('bams-subjects');
                      }}
                      className="w-full py-2.5 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-amber-300 text-xs font-black inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Manage Subjects ({proff.subjects?.length || 0})</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingProff(proff)}
                        className="flex-1 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold inline-flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Proff Details</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteProff(profKey)}
                        className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors cursor-pointer"
                        title="Delete Professional Year"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* LEVEL 3: SUBJECT-WISE COURSES FOR SELECTED PROFF          */}
      {/* ========================================================= */}
      {viewLevel === 'bams-subjects' && currentProff && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-emerald-50/70 border border-emerald-200 p-4 rounded-xl text-xs text-emerald-950">
            <div>
              <span className="font-bold text-emerald-900 block text-sm">
                BAMS {currentProff.shortTitle} ({currentProff.batchName}) - Subject-wise Courses
              </span>
              <span className="text-stone-600 text-xs">
                Each subject has its own dedicated card thumbnail, customizable aspect ratio (1:1, 4:3, 16:9), syllabus highlights, lecture count, and test stats.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setViewLevel('bams-proffs')}
              className="text-[#1b4332] font-bold hover:underline cursor-pointer shrink-0"
            >
              ← Back to All Proffs
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(currentProff.subjects || []).map((subject) => {
              const convertedSubjectImg = convertGoogleDriveUrl(subject.thumbnailUrl || '');
              const aspectClass = getAspectClass(subject.aspectRatio || '4:3');
              const stats = getSubjectStats(subject);

              return (
                <div
                  key={subject.id}
                  className="bg-white rounded-2xl border border-[#e2dacf] overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    {/* Subject Thumbnail Image with chosen Aspect Ratio */}
                    <div 
                      className={`relative w-full ${aspectClass} bg-stone-900 overflow-hidden cursor-pointer group`}
                      onClick={() => setPreviewImage({ url: convertedSubjectImg, title: `${subject.name} (${subject.hindiName})` })}
                      title="Click to view subject thumbnail full size"
                    >
                      {convertedSubjectImg ? (
                        <img
                          src={convertedSubjectImg}
                          alt={subject.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-stone-400 p-4 text-center">
                          <BookOpen className="w-10 h-10 mb-1 text-amber-300" />
                          <span className="text-xs">{subject.name}</span>
                        </div>
                      )}

                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/75 text-amber-300 text-[10px] font-black uppercase tracking-wider backdrop-blur-xs">
                        Ratio: {subject.aspectRatio || '4:3'}
                      </div>

                      <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-[#1b4332] text-white text-[10px] font-bold shadow-xs">
                        {subject.syllabusCode}
                      </div>

                      <div className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                        <Eye className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Subject Details */}
                    <div className="p-5 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black text-stone-500 font-serif">
                          {subject.hindiName}
                        </span>
                        {subject.badge && (
                          <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-bold">
                            {subject.badge}
                          </span>
                        )}
                      </div>

                      <h4 className="text-base font-bold text-stone-900 leading-tight">
                        {subject.name}
                      </h4>

                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {subject.description}
                      </p>

                      {/* Subject Price and Discount */}
                      <div className="flex items-center justify-between py-1 px-2.5 bg-amber-50/60 rounded-xl border border-amber-200/60 text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-stone-500 font-bold">Fee:</span>
                          <span className="font-black text-[#1b4332] text-sm">₹{subject.discountedPrice ?? 499}</span>
                          <span className="text-stone-400 line-through text-[11px]">₹{subject.originalPrice ?? 999}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                          {subject.discountPercentage ?? 50}% OFF
                        </span>
                      </div>

                      {/* Stats Pills (shows 0 when no materials uploaded) */}
                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-stone-100 text-center">
                        <div className="p-1.5 bg-stone-50 rounded-lg border border-stone-200">
                          <span className="text-[10px] text-stone-500 block">Lectures</span>
                          <span className="text-xs font-bold text-stone-800">{stats.lecturesCount}</span>
                        </div>
                        <div className="p-1.5 bg-stone-50 rounded-lg border border-stone-200">
                          <span className="text-[10px] text-stone-500 block">Notes</span>
                          <span className="text-xs font-bold text-stone-800">{stats.notesCount}</span>
                        </div>
                        <div className="p-1.5 bg-stone-50 rounded-lg border border-stone-200">
                          <span className="text-[10px] text-stone-500 block">Tests</span>
                          <span className="text-xs font-bold text-stone-800">{stats.testsCount}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-5 pt-0 border-t border-stone-100 mt-2 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => setManagingMaterialsSubject(subject)}
                      className="w-full py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-black inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    >
                      <FolderOpen className="w-4 h-4 text-stone-900" />
                      <span>Manage Lectures &amp; Notes ({stats.totalMaterialsCount})</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingSubject(subject)}
                        className="flex-1 py-1.5 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-amber-300 text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Subject &amp; Price</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteSubject(subject.id)}
                        className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors cursor-pointer"
                        title="Delete Subject"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD / EDIT TOP-LEVEL COURSE                        */}
      {/* ========================================================= */}
      {(editingTopCourse || isAddTopCourseModal) && (
        <TopCourseModal
          initialData={editingTopCourse}
          onClose={() => {
            setEditingTopCourse(null);
            setIsAddTopCourseModal(false);
          }}
          onSave={handleSaveTopCourse}
        />
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD / EDIT BAMS PROFF COURSE                       */}
      {/* ========================================================= */}
      {(editingProff || isAddProffModal) && (
        <BamsProffModal
          initialData={editingProff}
          onClose={() => {
            setEditingProff(null);
            setIsAddProffModal(false);
          }}
          onSave={handleSaveProff}
        />
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD / EDIT BAMS SUBJECT COURSE                     */}
      {/* ========================================================= */}
      {(editingSubject || isAddSubjectModal) && (
        <BamsSubjectModal
          initialData={editingSubject}
          proffTitle={currentProff?.shortTitle || 'BAMS'}
          onClose={() => {
            setEditingSubject(null);
            setIsAddSubjectModal(false);
          }}
          onSave={handleSaveSubject}
        />
      )}

      {/* ========================================================= */}
      {/* MODAL: MANAGE SUBJECT MATERIALS (LECTURES, NOTES, TESTS)  */}
      {/* ========================================================= */}
      {managingMaterialsSubject && (
        <SubjectMaterialsModal
          subject={managingMaterialsSubject}
          proffTitle={currentProff?.shortTitle || 'BAMS'}
          onClose={() => setManagingMaterialsSubject(null)}
          onSaveMaterials={handleSaveSubjectMaterials}
        />
      )}

      {/* ========================================================= */}
      {/* LIGHTBOX PREVIEW MODAL                                    */}
      {/* ========================================================= */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-stone-900 rounded-2xl overflow-hidden shadow-2xl border border-stone-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3.5 bg-stone-950 border-b border-stone-800 text-white">
              <span className="text-xs font-bold text-amber-300">{previewImage.title}</span>
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-3 bg-stone-950 flex items-center justify-center">
              <img
                src={previewImage.url}
                alt={previewImage.title}
                className="max-h-[75vh] w-auto object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

// =========================================================================
// SUB-MODAL 1: TOP-LEVEL COURSE MODAL
// =========================================================================
interface TopCourseModalProps {
  initialData: TopLevelCourse | null;
  onClose: () => void;
  onSave: (course: TopLevelCourse) => void;
}

const TopCourseModal: React.FC<TopCourseModalProps> = ({ initialData, onClose, onSave }) => {
  const [formData, setFormData] = useState<TopLevelCourse>(() => {
    return initialData || {
      id: `course_${Date.now()}`,
      name: '',
      badge: 'All India Batch',
      tagline: '',
      description: '',
      category: 'Ayurveda Courses',
      thumbnailUrl: '',
      aspectRatio: '16:9',
      studentsCount: '1,000+ Enrolled',
      originalPrice: 4999,
      discountedPrice: 2499,
      activeBatch: '2026 Batch',
      features: ['Live & Recorded Sessions', 'PDF Study Materials', 'Mock Test Series']
    };
  });

  const convertedImg = convertGoogleDriveUrl(formData.thumbnailUrl || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter course name');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-stone-300 shadow-2xl overflow-hidden my-8">
        <div className="flex items-center justify-between p-4 bg-[#1b4332] text-white">
          <h3 className="text-base font-bold flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-amber-300" />
            <span>{initialData ? 'Edit Course Category' : 'Add New Course Category'}</span>
          </h3>
          <button onClick={onClose} className="text-stone-300 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Course ID / Identifier</label>
              <input
                type="text"
                disabled={!!initialData}
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value.toUpperCase() })}
                placeholder="e.g. BAMS, AIAPGET, AYUSH_MO"
                className="w-full px-3 py-2 text-xs border rounded-xl bg-stone-50 font-mono"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Course Title</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. BAMS Degree Masterclasses"
                className="w-full px-3 py-2 text-xs border rounded-xl"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g. Degree Foundation, Competitive PG"
                className="w-full px-3 py-2 text-xs border rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Badge</label>
              <input
                type="text"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="e.g. 1st, 2nd & Final Proff"
                className="w-full px-3 py-2 text-xs border rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Tagline</label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              placeholder="e.g. NCISM Comprehensive University Syllabus"
              className="w-full px-3 py-2 text-xs border rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 text-xs border rounded-xl"
              placeholder="Detailed course description..."
            />
          </div>

          {/* THUMBNAIL / DRIVE LINK & ASPECT RATIO */}
          <div className="bg-[#fbfaf6] p-4 rounded-xl border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-[#2d6a4f]" />
                <span>Thumbnail / Card Image (Google Drive or Direct URL)</span>
              </span>
              <span className="text-[10px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded font-bold">
                Auto-Converts Drive Links
              </span>
            </div>

            <input
              type="text"
              value={formData.thumbnailUrl || ''}
              onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
              placeholder="Paste Google Drive link or Image URL..."
              className="w-full px-3 py-2 text-xs border rounded-xl bg-white"
            />

            {/* Aspect Ratio Selector */}
            <div>
              <label className="block text-[11px] font-bold text-stone-600 mb-1.5">Select Image Aspect Ratio:</label>
              <div className="flex items-center gap-2">
                {(['1:1', '4:3', '16:9'] as AspectRatioType[]).map((ratio) => (
                  <button
                    key={ratio}
                    type="button"
                    onClick={() => setFormData({ ...formData, aspectRatio: ratio })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                      formData.aspectRatio === ratio
                        ? 'bg-[#1b4332] text-amber-300 shadow-xs'
                        : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    {ratio} {ratio === '1:1' ? '(Square)' : ratio === '4:3' ? '(Standard)' : '(Widescreen)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Preview Box */}
            {convertedImg && (
              <div className="mt-3">
                <span className="text-[10px] font-bold text-stone-500 block mb-1">Live Ratio Preview ({formData.aspectRatio}):</span>
                <div className={`w-44 ${formData.aspectRatio === '1:1' ? 'aspect-square' : formData.aspectRatio === '4:3' ? 'aspect-[4/3]' : 'aspect-video'} rounded-xl overflow-hidden border border-stone-300 bg-stone-900`}>
                  <img
                    src={convertedImg}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Original Price (₹)</label>
              <input
                type="number"
                value={formData.originalPrice || 0}
                onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs border rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Discounted Price (₹)</label>
              <input
                type="number"
                value={formData.discountedPrice || 0}
                onChange={(e) => setFormData({ ...formData, discountedPrice: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs border rounded-xl"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-amber-300 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Save className="w-4 h-4" />
              <span>Save Course</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

// =========================================================================
// SUB-MODAL 2: BAMS PROFF MODAL
// =========================================================================
interface BamsProffModalProps {
  initialData: BamsProfCourse | null;
  onClose: () => void;
  onSave: (proff: BamsProfCourse) => void;
}

const BamsProffModal: React.FC<BamsProffModalProps> = ({ initialData, onClose, onSave }) => {
  const [formData, setFormData] = useState<BamsProfCourse>(() => {
    return initialData || {
      id: `proff_${Date.now()}`,
      shortTitle: 'New Proff.',
      batchName: 'Atreya Batch',
      cardImage: '',
      aspectRatio: '1:1',
      title: 'BAMS Professional Complete Masterclass',
      subtitle: 'NCISM Competency-Based Academic Track',
      duration: '18 Months University Track',
      originalPrice: 5999,
      discountedPrice: 2999,
      discountPercentage: 50,
      savings: 3000,
      validity: 'Full Professional Academic Cycle',
      codePrefix: 'BAMS',
      acceptedCodes: ['AYURVEEZ', 'BAMS2026'],
      bannerGradient: 'from-[#143d2b] via-[#1b4332] to-[#0f281e]',
      accentColor: '#2d6a4f',
      accentBorder: '#c4dec8',
      ncismBatch: 'NCISM New Syllabus Aligned',
      enrolledStudentsCount: '1,000+ Enrolled',
      highlights: ['Recorded & live lectures', 'Chapter-wise notes', 'Solved question banks'],
      subjects: []
    };
  });

  const convertedImg = convertGoogleDriveUrl(formData.cardImage || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.shortTitle.trim()) {
      alert('Please enter short title (e.g. 1st Proff.)');
      return;
    }
    const savings = Math.max(0, (formData.originalPrice || 0) - (formData.discountedPrice || 0));
    const discountPercentage = formData.originalPrice ? Math.round((savings / formData.originalPrice) * 100) : 0;
    
    onSave({
      ...formData,
      savings,
      discountPercentage
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-stone-300 shadow-2xl overflow-hidden my-8">
        <div className="flex items-center justify-between p-4 bg-[#1b4332] text-white">
          <h3 className="text-base font-bold flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-300" />
            <span>{initialData ? `Edit BAMS ${initialData.shortTitle}` : 'Add New BAMS Professional Year'}</span>
          </h3>
          <button onClick={onClose} className="text-stone-300 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Proff Identifier (Key)</label>
              <input
                type="text"
                disabled={!!initialData}
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value.toLowerCase() })}
                placeholder="e.g. 1st, 2nd, final, or custom"
                className="w-full px-3 py-2 text-xs border rounded-xl bg-stone-50 font-mono"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Short Title</label>
              <input
                type="text"
                value={formData.shortTitle}
                onChange={(e) => setFormData({ ...formData, shortTitle: e.target.value })}
                placeholder="e.g. 1st Proff., 2nd Proff., Final Proff."
                className="w-full px-3 py-2 text-xs border rounded-xl"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Batch Name</label>
              <input
                type="text"
                value={formData.batchName}
                onChange={(e) => setFormData({ ...formData, batchName: e.target.value })}
                placeholder="e.g. Atreya Batch, Agnivesh Batch, Charaka Batch"
                className="w-full px-3 py-2 text-xs border rounded-xl"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Duration &amp; Validity</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="e.g. 18 Months University Track"
                className="w-full px-3 py-2 text-xs border rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Full Course Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. BAMS 1st Professional Complete Masterclass"
              className="w-full px-3 py-2 text-xs border rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Subtitle / Curriculum Overview</label>
            <textarea
              rows={2}
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              placeholder="Key subjects and competencies covered..."
              className="w-full px-3 py-2 text-xs border rounded-xl"
            />
          </div>

          {/* CARD POSTER / DRIVE LINK & RATIO */}
          <div className="bg-[#fbfaf6] p-4 rounded-xl border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-[#2d6a4f]" />
                <span>Card Poster Image (Google Drive link or Image URL)</span>
              </span>
              <span className="text-[10px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded font-bold">
                1:1 Recommended
              </span>
            </div>

            <input
              type="text"
              value={formData.cardImage || ''}
              onChange={(e) => setFormData({ ...formData, cardImage: e.target.value })}
              placeholder="Paste Google Drive share link (e.g. https://drive.google.com/file/d/...)..."
              className="w-full px-3 py-2 text-xs border rounded-xl bg-white"
            />

            {/* Aspect Ratio Selector */}
            <div>
              <label className="block text-[11px] font-bold text-stone-600 mb-1.5">Poster Aspect Ratio:</label>
              <div className="flex items-center gap-2">
                {(['1:1', '4:3', '16:9'] as AspectRatioType[]).map((ratio) => (
                  <button
                    key={ratio}
                    type="button"
                    onClick={() => setFormData({ ...formData, aspectRatio: ratio })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                      formData.aspectRatio === ratio
                        ? 'bg-[#1b4332] text-amber-300 shadow-xs'
                        : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    {ratio} {ratio === '1:1' ? '(Square Card)' : ratio === '4:3' ? '(Standard)' : '(Widescreen)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Preview Box */}
            {convertedImg && (
              <div className="mt-3">
                <span className="text-[10px] font-bold text-stone-500 block mb-1">Live Ratio Preview ({formData.aspectRatio}):</span>
                <div className={`w-44 ${formData.aspectRatio === '1:1' ? 'aspect-square' : formData.aspectRatio === '4:3' ? 'aspect-[4/3]' : 'aspect-video'} rounded-xl overflow-hidden border border-stone-300 bg-stone-900`}>
                  <img
                    src={convertedImg}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Original Price (₹)</label>
              <input
                type="number"
                value={formData.originalPrice || 0}
                onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs border rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Discounted Price (₹)</label>
              <input
                type="number"
                value={formData.discountedPrice || 0}
                onChange={(e) => setFormData({ ...formData, discountedPrice: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs border rounded-xl"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-amber-300 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Save className="w-4 h-4" />
              <span>Save Proff Details</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

// =========================================================================
// SUB-MODAL 3: BAMS SUBJECT MODAL (WITH DRIVE LINK & 1:1, 4:3, 16:9 SELECTOR)
// =========================================================================
interface BamsSubjectModalProps {
  initialData: BamsSubject | null;
  proffTitle: string;
  onClose: () => void;
  onSave: (subject: BamsSubject) => void;
}

const BamsSubjectModal: React.FC<BamsSubjectModalProps> = ({ initialData, proffTitle, onClose, onSave }) => {
  const [formData, setFormData] = useState<BamsSubject>(() => {
    if (initialData) {
      const orig = initialData.originalPrice ?? 999;
      const disc = initialData.discountedPrice ?? 499;
      const pct = initialData.discountPercentage ?? (orig > disc ? Math.round(((orig - disc) / orig) * 100) : 0);
      return {
        ...initialData,
        originalPrice: orig,
        discountedPrice: disc,
        discountPercentage: pct,
        materials: initialData.materials || []
      };
    }
    return {
      id: `sub_${Date.now()}`,
      name: '',
      hindiName: '',
      codeName: '',
      syllabusCode: 'AyUG-',
      lecturesCount: 0,
      notesCount: 0,
      testsCount: 0,
      badge: 'Core Subject',
      thumbnailUrl: '',
      aspectRatio: '4:3',
      color: '#1b4332',
      description: '',
      syllabusHighlights: ['Unit 1: Classical Foundations', 'Unit 2: Clinical Applications'],
      originalPrice: 999,
      discountedPrice: 499,
      discountPercentage: 50,
      materials: []
    };
  });

  const handleOriginalPriceChange = (val: number) => {
    const orig = Math.max(0, val);
    const disc = formData.discountedPrice ?? 0;
    const pct = orig > disc ? Math.round(((orig - disc) / orig) * 100) : 0;
    setFormData({ ...formData, originalPrice: orig, discountPercentage: pct });
  };

  const handleDiscountedPriceChange = (val: number) => {
    const disc = Math.max(0, val);
    const orig = formData.originalPrice ?? 0;
    const pct = orig > disc ? Math.round(((orig - disc) / orig) * 100) : 0;
    setFormData({ ...formData, discountedPrice: disc, discountPercentage: pct });
  };

  const convertedImg = convertGoogleDriveUrl(formData.thumbnailUrl || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter subject name');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-stone-300 shadow-2xl overflow-hidden my-8">
        <div className="flex items-center justify-between p-4 bg-[#1b4332] text-white">
          <h3 className="text-base font-bold flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-300" />
            <span>{initialData ? `Edit Subject (${formData.name})` : `Add Subject to ${proffTitle}`}</span>
          </h3>
          <button onClick={onClose} className="text-stone-300 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Subject Name (English)</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Samhita Adhyayan 1, Kriya Sharir"
                className="w-full px-3 py-2 text-xs border rounded-xl"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Sanskrit / Hindi Name</label>
              <input
                type="text"
                value={formData.hindiName}
                onChange={(e) => setFormData({ ...formData, hindiName: e.target.value })}
                placeholder="e.g. संहिता अध्ययन १, क्रिया शारीर"
                className="w-full px-3 py-2 text-xs border rounded-xl font-serif"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">NCISM Syllabus Code</label>
              <input
                type="text"
                value={formData.syllabusCode}
                onChange={(e) => setFormData({ ...formData, syllabusCode: e.target.value })}
                placeholder="e.g. AyUG-SA1, AyUG-KS"
                className="w-full px-3 py-2 text-xs border rounded-xl font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Subject Badge / Sub-category</label>
              <input
                type="text"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="e.g. Core Samhita, Clinical Physiology"
                className="w-full px-3 py-2 text-xs border rounded-xl"
              />
            </div>
          </div>

          {/* SUBJECT-WISE PRICING & DISCOUNT SECTION */}
          <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-[#1b4332]" />
                <span>Subject-Wise Pricing &amp; Student Fee</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Single Subject Purchase
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Subject Original Price (₹)</label>
                <input
                  type="number"
                  min={0}
                  value={formData.originalPrice ?? 999}
                  onChange={(e) => handleOriginalPriceChange(Number(e.target.value))}
                  placeholder="999"
                  className="w-full px-3 py-2 text-xs border rounded-xl bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Subject Discounted Price (₹)</label>
                <input
                  type="number"
                  min={0}
                  value={formData.discountedPrice ?? 499}
                  onChange={(e) => handleDiscountedPriceChange(Number(e.target.value))}
                  placeholder="499"
                  className="w-full px-3 py-2 text-xs border rounded-xl bg-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-amber-200/60 text-xs">
              <span className="text-stone-600 font-medium">Applied Student Discount:</span>
              <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {formData.discountPercentage ?? 50}% OFF (Saves ₹{Math.max(0, (formData.originalPrice ?? 999) - (formData.discountedPrice ?? 499))})
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Textual Scope / Code Name</label>
            <input
              type="text"
              value={formData.codeName}
              onChange={(e) => setFormData({ ...formData, codeName: e.target.value })}
              placeholder="e.g. Charaka Sutrasthana Ch. 1-12 & Ashtanga Hridaya Ch. 1-15"
              className="w-full px-3 py-2 text-xs border rounded-xl"
            />
          </div>

          {/* SUBJECT THUMBNAIL (GOOGLE DRIVE LINK + RATIO SELECTOR) */}
          <div className="bg-[#fbfaf6] p-4 rounded-xl border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-[#2d6a4f]" />
                <span>Subject Thumbnail (Google Drive Link or Image URL)</span>
              </span>
              <span className="text-[10px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded font-bold">
                Drive Link Auto-Sync
              </span>
            </div>

            <input
              type="text"
              value={formData.thumbnailUrl || ''}
              onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
              placeholder="Paste Google Drive share link (e.g. https://drive.google.com/file/d/...)..."
              className="w-full px-3 py-2 text-xs border rounded-xl bg-white"
            />

            {/* Aspect Ratio Selector (1:1, 4:3, 16:9) */}
            <div>
              <label className="block text-[11px] font-bold text-stone-600 mb-1.5">
                Select Subject Thumbnail Size / Aspect Ratio:
              </label>
              <div className="flex items-center gap-2">
                {(['1:1', '4:3', '16:9'] as AspectRatioType[]).map((ratio) => (
                  <button
                    key={ratio}
                    type="button"
                    onClick={() => setFormData({ ...formData, aspectRatio: ratio })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                      formData.aspectRatio === ratio
                        ? 'bg-[#1b4332] text-amber-300 shadow-xs'
                        : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    {ratio} {ratio === '1:1' ? '(Square)' : ratio === '4:3' ? '(Standard Card)' : '(Widescreen)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Preview Box */}
            {convertedImg && (
              <div className="mt-3">
                <span className="text-[10px] font-bold text-stone-500 block mb-1">Live Preview ({formData.aspectRatio}):</span>
                <div className={`w-44 ${formData.aspectRatio === '1:1' ? 'aspect-square' : formData.aspectRatio === '4:3' ? 'aspect-[4/3]' : 'aspect-video'} rounded-xl overflow-hidden border border-stone-300 bg-stone-900`}>
                  <img
                    src={convertedImg}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Subject Description</label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Summary of subject curriculum and clinical importance..."
              className="w-full px-3 py-2 text-xs border rounded-xl"
            />
          </div>

          {/* Counts Info */}
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
            <span className="font-bold text-stone-700 block">Content Counts Notice:</span>
            <span className="text-stone-500 text-[11px] block leading-relaxed">
              Lectures, Notes, and Tests counts update automatically as you add materials via &quot;Manage Lectures &amp; Notes&quot; on the subject card. If no files are uploaded, it accurately displays zero to students.
            </span>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-amber-300 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Save className="w-4 h-4" />
              <span>Save Subject Course</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

// =========================================================================
// SUB-MODAL 4: SUBJECT MATERIALS MODAL (LECTURES, NOTES, TESTS - FREE & PAID)
// =========================================================================
interface SubjectMaterialsModalProps {
  subject: BamsSubject;
  proffTitle: string;
  onClose: () => void;
  onSaveMaterials: (subjectId: string, materials: SubjectMaterialItem[]) => void;
}

const SubjectMaterialsModal: React.FC<SubjectMaterialsModalProps> = ({
  subject,
  proffTitle,
  onClose,
  onSaveMaterials,
}) => {
  const [materials, setMaterials] = useState<SubjectMaterialItem[]>(() => subject.materials || []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'lecture' | 'note' | 'test' | 'free' | 'locked'>('all');
  const [showAddForm, setShowAddForm] = useState<boolean>(() => (subject.materials || []).length === 0);

  // Form state
  const [formTitle, setFormTitle] = useState('');
  const [formType, setFormType] = useState<MaterialType>('lecture');
  const [formUrl, setFormUrl] = useState('');
  const [formIsFree, setFormIsFree] = useState(false);
  const [formDurationOrPages, setFormDurationOrPages] = useState('');
  const [formChapter, setFormChapter] = useState('');
  const [formDescription, setFormDescription] = useState('');

  const stats = getSubjectStats({ ...subject, materials });

  const resetForm = () => {
    setEditingId(null);
    setFormTitle('');
    setFormType('lecture');
    setFormUrl('');
    setFormIsFree(false);
    setFormDurationOrPages('');
    setFormChapter('');
    setFormDescription('');
  };

  const startEdit = (item: SubjectMaterialItem) => {
    setEditingId(item.id);
    setFormTitle(item.title);
    setFormType(item.type);
    setFormUrl(item.url);
    setFormIsFree(item.isFree);
    setFormDurationOrPages(item.durationOrPages || '');
    setFormChapter(item.chapter || '');
    setFormDescription(item.description || '');
    setShowAddForm(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      alert('Please enter a title for the material');
      return;
    }

    if (editingId) {
      const updated = materials.map((m) =>
        m.id === editingId
          ? {
              ...m,
              title: formTitle.trim(),
              type: formType,
              url: formUrl.trim(),
              isFree: formIsFree,
              durationOrPages: formDurationOrPages.trim() || undefined,
              chapter: formChapter.trim() || undefined,
              description: formDescription.trim() || undefined,
            }
          : m
      );
      setMaterials(updated);
      onSaveMaterials(subject.id, updated);
      resetForm();
    } else {
      const newItem: SubjectMaterialItem = {
        id: `mat_${Date.now()}`,
        title: formTitle.trim(),
        type: formType,
        url: formUrl.trim(),
        isFree: formIsFree,
        durationOrPages: formDurationOrPages.trim() || undefined,
        chapter: formChapter.trim() || undefined,
        description: formDescription.trim() || undefined,
        uploadedAt: new Date().toISOString(),
      };
      const updated = [...materials, newItem];
      setMaterials(updated);
      onSaveMaterials(subject.id, updated);
      resetForm();
    }
  };

  const handleDeleteItem = (id: string) => {
    if (!window.confirm('Are you sure you want to delete this material?')) return;
    const updated = materials.filter((m) => m.id !== id);
    setMaterials(updated);
    onSaveMaterials(subject.id, updated);
    if (editingId === id) resetForm();
  };

  const handleToggleFree = (id: string) => {
    const updated = materials.map((m) => (m.id === id ? { ...m, isFree: !m.isFree } : m));
    setMaterials(updated);
    onSaveMaterials(subject.id, updated);
  };

  const filteredMaterials = materials.filter((m) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'free') return m.isFree;
    if (activeFilter === 'locked') return !m.isFree;
    return m.type === activeFilter;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full border border-stone-300 shadow-2xl overflow-hidden my-8 flex flex-col max-h-[90vh]">
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between p-4 bg-[#1b4332] text-white">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-300" />
              <h3 className="text-base font-bold text-white">
                Manage Course Materials &amp; Access Control
              </h3>
            </div>
            <p className="text-xs text-amber-200/90 mt-0.5">
              {subject.name} ({subject.hindiName}) • {proffTitle}
            </p>
          </div>
          <button onClick={onClose} className="text-stone-300 hover:text-white cursor-pointer p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SUMMARY STATS STRIP */}
        <div className="bg-[#fbfaf6] p-4 border-b border-stone-200 grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
          <div className="p-2 bg-white rounded-xl border border-stone-200">
            <span className="text-[10px] text-stone-500 block">Total Items</span>
            <span className="text-base font-black text-stone-900">{materials.length}</span>
          </div>
          <div className="p-2 bg-white rounded-xl border border-stone-200">
            <span className="text-[10px] text-amber-700 block flex items-center justify-center gap-1">
              <Video className="w-3 h-3 text-amber-600" />
              Lectures
            </span>
            <span className="text-base font-black text-amber-900">{stats.lecturesCount}</span>
          </div>
          <div className="p-2 bg-white rounded-xl border border-stone-200">
            <span className="text-[10px] text-emerald-700 block flex items-center justify-center gap-1">
              <FileText className="w-3 h-3 text-emerald-600" />
              Notes (PDF)
            </span>
            <span className="text-base font-black text-emerald-900">{stats.notesCount}</span>
          </div>
          <div className="p-2 bg-white rounded-xl border border-stone-200">
            <span className="text-[10px] text-indigo-700 block flex items-center justify-center gap-1">
              <HelpCircle className="w-3 h-3 text-indigo-600" />
              Tests (MCQ)
            </span>
            <span className="text-base font-black text-indigo-900">{stats.testsCount}</span>
          </div>
          <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-200 col-span-2 sm:col-span-1">
            <span className="text-[10px] text-emerald-800 font-bold block">✨ Free Demo</span>
            <span className="text-base font-black text-emerald-700">{stats.freeItemsCount}</span>
          </div>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* TOGGLE ADD FORM BUTTON */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
              {editingId ? 'Edit Material Item' : 'Materials Catalog'}
            </span>
            <button
              type="button"
              onClick={() => {
                if (showAddForm && !editingId) {
                  setShowAddForm(false);
                } else {
                  resetForm();
                  setShowAddForm(true);
                }
              }}
              className="px-3 py-1.5 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-amber-300 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{showAddForm && !editingId ? 'Hide Add Form' : '+ Add New Lecture / Note / Test'}</span>
            </button>
          </div>

          {/* ADD / EDIT MATERIAL FORM */}
          {showAddForm && (
            <form onSubmit={handleFormSubmit} className="p-4 bg-emerald-50/40 rounded-2xl border border-emerald-200 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-emerald-200/80">
                <span className="text-xs font-black text-emerald-950 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  <span>{editingId ? 'Edit Material Item' : 'Add New Subject Material'}</span>
                </span>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-stone-500 hover:text-stone-700 text-xs font-bold underline cursor-pointer"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              {/* Type and Access Level */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Material Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormType('lecture')}
                      className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border cursor-pointer ${
                        formType === 'lecture'
                          ? 'bg-[#1b4332] text-amber-300 border-[#1b4332]'
                          : 'bg-white text-stone-700 border-stone-300'
                      }`}
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Lecture</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormType('note')}
                      className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border cursor-pointer ${
                        formType === 'note'
                          ? 'bg-[#1b4332] text-amber-300 border-[#1b4332]'
                          : 'bg-white text-stone-700 border-stone-300'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>PDF Note</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormType('test')}
                      className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border cursor-pointer ${
                        formType === 'test'
                          ? 'bg-[#1b4332] text-amber-300 border-[#1b4332]'
                          : 'bg-white text-stone-700 border-stone-300'
                      }`}
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>MCQ Test</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Access Permission</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormIsFree(true)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border cursor-pointer ${
                        formIsFree
                          ? 'bg-emerald-700 text-white border-emerald-700 shadow-2xs'
                          : 'bg-white text-stone-700 border-stone-300'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Free Demo</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormIsFree(false)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border cursor-pointer ${
                        !formIsFree
                          ? 'bg-[#1b4332] text-amber-300 border-[#1b4332] shadow-2xs'
                          : 'bg-white text-stone-700 border-stone-300'
                      }`}
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Locked / Paid</span>
                    </button>
                  </div>
                  <span className="text-[10px] text-stone-500 mt-1 block">
                    {formIsFree
                      ? '✨ Free Demo: Visible to all students immediately.'
                      : '🔒 Locked: Student must enter activation code to open.'}
                  </span>
                </div>
              </div>

              {/* Title & Chapter */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Chapter 1: Ayu Lakshana & Dosha Vijnana"
                    className="w-full px-3 py-2 text-xs border rounded-xl bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Chapter / Unit Tag (Optional)</label>
                  <input
                    type="text"
                    value={formChapter}
                    onChange={(e) => setFormChapter(e.target.value)}
                    placeholder="e.g. Charaka Sutrasthana Ch. 1"
                    className="w-full px-3 py-2 text-xs border rounded-xl bg-white"
                  />
                </div>
              </div>

              {/* URL / Google Drive link & Duration/Pages */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Google Drive Link or File URL
                  </label>
                  <input
                    type="text"
                    value={formUrl}
                    onChange={(e) => setFormUrl(e.target.value)}
                    placeholder="https://drive.google.com/file/d/... or video link"
                    className="w-full px-3 py-2 text-xs border rounded-xl bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Duration / Pages / MCQs
                  </label>
                  <input
                    type="text"
                    value={formDurationOrPages}
                    onChange={(e) => setFormDurationOrPages(e.target.value)}
                    placeholder="e.g. 45 mins / 22 pages"
                    className="w-full px-3 py-2 text-xs border rounded-xl bg-white"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Short Description / Key Notes (Optional)</label>
                <input
                  type="text"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="e.g. Detailed Sanskrit anvaya with Chakrapani commentary"
                  className="w-full px-3 py-2 text-xs border rounded-xl bg-white"
                />
              </div>

              {/* Submit Form Button */}
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-amber-300 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{editingId ? 'Update Material Item' : 'Add Material to Subject'}</span>
                </button>
              </div>
            </form>
          )}

          {/* FILTER PILLS */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2">
            <span className="text-[11px] font-bold text-stone-500 mr-1">Filter:</span>
            {[
              { key: 'all', label: `All (${materials.length})` },
              { key: 'lecture', label: `Lectures (${stats.lecturesCount})` },
              { key: 'note', label: `Notes (${stats.notesCount})` },
              { key: 'test', label: `Tests (${stats.testsCount})` },
              { key: 'free', label: `✨ Free Demo (${stats.freeItemsCount})` },
              { key: 'locked', label: `🔒 Locked (${materials.length - stats.freeItemsCount})` },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveFilter(tab.key as any)}
                className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                  activeFilter === tab.key
                    ? 'bg-[#1b4332] text-white shadow-2xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* MATERIALS LIST */}
          {materials.length === 0 ? (
            <div className="p-8 text-center bg-stone-50 rounded-2xl border border-stone-200 text-stone-500 space-y-2">
              <FolderOpen className="w-10 h-10 mx-auto text-stone-400" />
              <p className="text-sm font-bold text-stone-700">No materials uploaded yet</p>
              <p className="text-xs max-w-md mx-auto">
                Currently 0 lectures, 0 notes, and 0 tests are uploaded. Students will see 0 until you add demo or paid materials above.
              </p>
              <button
                type="button"
                onClick={() => setShowAddForm(true)}
                className="mt-2 px-4 py-2 bg-[#1b4332] text-amber-300 text-xs font-bold rounded-xl inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add First Material Now</span>
              </button>
            </div>
          ) : filteredMaterials.length === 0 ? (
            <div className="p-6 text-center bg-stone-50 rounded-xl border border-stone-200 text-stone-500 text-xs">
              No materials match the filter &quot;{activeFilter}&quot;.
            </div>
          ) : (
            <div className="space-y-2.5">
              {filteredMaterials.map((item, idx) => {
                const converted = item.url ? convertGoogleDriveUrl(item.url) : '';
                return (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl border border-stone-200 bg-white hover:border-[#2d6a4f]/50 hover:shadow-2xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      {/* Icon */}
                      <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center shrink-0 mt-0.5">
                        {item.type === 'lecture' && <Video className="w-4 h-4 text-amber-600" />}
                        {item.type === 'note' && <FileText className="w-4 h-4 text-[#2d6a4f]" />}
                        {item.type === 'test' && <HelpCircle className="w-4 h-4 text-indigo-600" />}
                      </div>

                      {/* Info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                            #{idx + 1} {item.type}
                          </span>
                          {item.chapter && (
                            <span className="text-[10px] bg-stone-100 text-stone-600 px-1.5 py-0.2 rounded font-medium">
                              {item.chapter}
                            </span>
                          )}
                          {item.durationOrPages && (
                            <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.2 rounded font-semibold">
                              {item.durationOrPages}
                            </span>
                          )}
                        </div>

                        <h5 className="text-xs font-bold text-stone-900 mt-0.5 truncate">
                          {item.title}
                        </h5>

                        {item.description && (
                          <p className="text-[11px] text-stone-500 truncate mt-0.5">
                            {item.description}
                          </p>
                        )}

                        {item.url && (
                          <div className="flex items-center gap-2 mt-1">
                            <a
                              href={converted || item.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[10px] text-[#2d6a4f] hover:underline flex items-center gap-1 font-mono truncate max-w-xs"
                            >
                              <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                              <span className="truncate">{item.url}</span>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions & Access Toggle */}
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      {/* One-click Free / Locked Toggle */}
                      <button
                        type="button"
                        onClick={() => handleToggleFree(item.id)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer flex items-center gap-1 ${
                          item.isFree
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                            : 'bg-stone-100 text-stone-700 border-stone-300 hover:bg-stone-200'
                        }`}
                        title="Click to toggle between Free Demo and Locked"
                      >
                        {item.isFree ? (
                          <>
                            <Sparkles className="w-3 h-3 text-emerald-600" />
                            <span>Free Demo</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-3 h-3 text-stone-600" />
                            <span>Locked</span>
                          </>
                        )}
                      </button>

                      {/* Edit Button */}
                      <button
                        type="button"
                        onClick={() => startEdit(item)}
                        className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
                        title="Edit Item"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors cursor-pointer"
                        title="Delete Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-500">
            Changes save automatically to Firestore &amp; local cache.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-amber-300 text-xs font-bold cursor-pointer shadow-xs"
          >
            Done &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
};
