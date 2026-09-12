import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Search, 
  Clock, 
  Bookmark, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  X, 
  Check, 
  Share2, 
  GraduationCap,
  Award,
  ShieldCheck,
  Send,
  MessageCircle,
  Folder,
  FolderOpen
} from 'lucide-react';
import { StudyNote, CourseType, BamsFolder } from '../types';
import { STUDY_MATERIALS_DATA } from '../data/mockData';

interface FreeMaterialsProps {
  selectedCourseFilter: string | null;
  onOpenSignUp: () => void;
}

// 4 Main BAMS Professional Years Folders
const BAMS_MAIN_FOLDERS: { id: BamsFolder; name: string }[] = [
  { id: '1st Professional', name: '1st Professional' },
  { id: '2nd Professional', name: '2nd Professional' },
  { id: '3rd/Final Professional', name: '3rd/Final Professional' },
  { id: 'Others', name: 'Others' },
];

// Subject folders for each professional year
const BAMS_SUBJECT_FOLDERS: Record<BamsFolder, string[]> = {
  '1st Professional': [
    'Padartha Vijnan & Samhita Adhyayan',
    'Kriya Sharir',
    'Rachana Sharir',
    'Sanskrit & Samhita Patha',
  ],
  '2nd Professional': [
    'Dravyaguna Vijnana',
    'Rasa Shastra & Bhaishajya Kalpana',
    'Roga Nidan & Vikriti Vijnana',
    'Agada Tantra & Vyavahara Ayurveda',
  ],
  '3rd/Final Professional': [
    'Kayachikitsa',
    'Panchakarma',
    'Shalya Tantra',
    'Shalakya Tantra',
    'Prasuti Tantra & Stri Roga',
    'Kaumarbhritya (Bala Roga)',
  ],
  'Others': [
    'NCISM Exam Blueprints & Model Papers',
    'Brihattrayi High-Yield Shlokas & Anvaya',
    'Ayurvedic Synonyms & Botanical Tables',
    'Revision & Study Planners',
  ],
};

type FolderTheme = 'gold' | 'emerald' | 'amber' | 'teal' | 'purple';

interface ThemeConfig {
  tabBg: string;
  tabBorder: string;
  backBg: string;
  backBorder: string;
  frontGradient: string;
  frontBorderTop: string;
  frontBorderBottom: string;
  shadow: string;
  hoverShadow: string;
  iconBg: string;
  iconColor: string;
  textColor: string;
  cardHoverBorder: string;
}

const FOLDER_THEMES: Record<FolderTheme, ThemeConfig> = {
  gold: {
    tabBg: 'bg-[#d5a04e]',
    tabBorder: 'border-[#be8a39]',
    backBg: 'bg-[#c59141]',
    backBorder: 'border-[#b47f30]',
    frontGradient: 'bg-gradient-to-b from-[#ebb96a] via-[#e2ad58] to-[#ce9640]',
    frontBorderTop: 'border-[#f7d18d]',
    frontBorderBottom: 'border-[#a97528]',
    shadow: 'shadow-[0_8px_16px_rgba(169,117,40,0.35)]',
    hoverShadow: 'group-hover:shadow-[0_12px_22px_rgba(169,117,40,0.45)]',
    iconBg: 'bg-[#b88533]/40',
    iconColor: 'text-amber-950/80 fill-amber-950/20',
    textColor: 'text-stone-900 group-hover:text-amber-900',
    cardHoverBorder: 'hover:border-amber-500',
  },
  emerald: {
    tabBg: 'bg-[#2d6a4f]',
    tabBorder: 'border-[#1b4332]',
    backBg: 'bg-[#1b4332]',
    backBorder: 'border-[#143628]',
    frontGradient: 'bg-gradient-to-b from-[#40916c] via-[#2d6a4f] to-[#1b4332]',
    frontBorderTop: 'border-[#52b788]',
    frontBorderBottom: 'border-[#081c15]',
    shadow: 'shadow-[0_8px_16px_rgba(27,67,50,0.35)]',
    hoverShadow: 'group-hover:shadow-[0_12px_22px_rgba(27,67,50,0.45)]',
    iconBg: 'bg-[#143628]/60',
    iconColor: 'text-emerald-100 fill-emerald-100/30',
    textColor: 'text-stone-900 group-hover:text-[#1b4332]',
    cardHoverBorder: 'hover:border-[#2d6a4f]',
  },
  amber: {
    tabBg: 'bg-[#c2410c]',
    tabBorder: 'border-[#9a3412]',
    backBg: 'bg-[#9a3412]',
    backBorder: 'border-[#7c2d12]',
    frontGradient: 'bg-gradient-to-b from-[#ea580c] via-[#c2410c] to-[#9a3412]',
    frontBorderTop: 'border-[#fb923c]',
    frontBorderBottom: 'border-[#7c2d12]',
    shadow: 'shadow-[0_8px_16px_rgba(194,65,12,0.35)]',
    hoverShadow: 'group-hover:shadow-[0_12px_22px_rgba(194,65,12,0.45)]',
    iconBg: 'bg-[#7c2d12]/60',
    iconColor: 'text-orange-100 fill-orange-100/30',
    textColor: 'text-stone-900 group-hover:text-orange-800',
    cardHoverBorder: 'hover:border-orange-500',
  },
  teal: {
    tabBg: 'bg-[#0f766e]',
    tabBorder: 'border-[#115e59]',
    backBg: 'bg-[#115e59]',
    backBorder: 'border-[#134e4a]',
    frontGradient: 'bg-gradient-to-b from-[#14b8a6] via-[#0f766e] to-[#115e59]',
    frontBorderTop: 'border-[#2dd4bf]',
    frontBorderBottom: 'border-[#134e4a]',
    shadow: 'shadow-[0_8px_16px_rgba(15,118,110,0.35)]',
    hoverShadow: 'group-hover:shadow-[0_12px_22px_rgba(15,118,110,0.45)]',
    iconBg: 'bg-[#134e4a]/60',
    iconColor: 'text-teal-100 fill-teal-100/30',
    textColor: 'text-stone-900 group-hover:text-teal-800',
    cardHoverBorder: 'hover:border-teal-500',
  },
  purple: {
    tabBg: 'bg-[#6d28d9]',
    tabBorder: 'border-[#5b21b6]',
    backBg: 'bg-[#5b21b6]',
    backBorder: 'border-[#4c1d95]',
    frontGradient: 'bg-gradient-to-b from-[#8b5cf6] via-[#6d28d9] to-[#5b21b6]',
    frontBorderTop: 'border-[#a78bfa]',
    frontBorderBottom: 'border-[#4c1d95]',
    shadow: 'shadow-[0_8px_16px_rgba(109,40,217,0.35)]',
    hoverShadow: 'group-hover:shadow-[0_12px_22px_rgba(109,40,217,0.45)]',
    iconBg: 'bg-[#4c1d95]/60',
    iconColor: 'text-purple-100 fill-purple-100/30',
    textColor: 'text-stone-900 group-hover:text-purple-800',
    cardHoverBorder: 'hover:border-purple-500',
  }
};

// Mapping of activeFolder to its distinct subject folder theme
const SUBJECT_FOLDER_THEME_MAP: Record<BamsFolder, FolderTheme> = {
  '1st Professional': 'emerald',
  '2nd Professional': 'amber',
  '3rd/Final Professional': 'teal',
  'Others': 'purple',
};

// Realistic, Elegant Responsive Folder Graphic Component
const RealisticFolderGraphic: React.FC<{
  title: string;
  onClick: () => void;
  id: string;
  theme?: FolderTheme;
}> = ({ title, onClick, id, theme = 'gold' }) => {
  const currentTheme = FOLDER_THEMES[theme] || FOLDER_THEMES.gold;

  return (
    <div
      id={id}
      onClick={onClick}
      className={`group cursor-pointer flex flex-col items-center justify-between p-2.5 xs:p-3 sm:p-4 md:p-5 bg-white hover:bg-[#faf8f4] border border-[#e5dfd3] ${currentTheme.cardHoverBorder} rounded-2xl sm:rounded-3xl transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:scale-[0.98] select-none min-h-[130px] xs:min-h-[150px] sm:min-h-[180px] md:min-h-[210px] w-full`}
    >
      {/* Folder Graphic with Dynamic Responsive Scaling */}
      <div className="relative w-20 xs:w-28 sm:w-36 md:w-44 h-14 xs:h-18 sm:h-24 md:h-28 flex items-center justify-center shrink-0">
        {/* Back Cover & Top Tab */}
        <div className="absolute inset-0 flex flex-col justify-end">
          {/* Top Folder Tab */}
          <div className={`w-9 xs:w-12 sm:w-18 md:w-22 h-3 xs:h-4 sm:h-5 md:h-6 rounded-t-md sm:rounded-t-xl ${currentTheme.tabBg} border-t border-l border-r ${currentTheme.tabBorder} ml-1.5 sm:ml-2.5 flex items-center px-1 sm:px-1.5 shadow-2xs`}>
            <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-white/40" />
          </div>
          {/* Back Body */}
          <div className={`w-full h-11 xs:h-15 sm:h-20 md:h-24 rounded-lg sm:rounded-2xl ${currentTheme.backBg} border ${currentTheme.backBorder} relative overflow-hidden`}>
            {/* Sheet Papers Peeking Out */}
            <div className="absolute top-0.5 sm:top-1 left-1.5 sm:left-2.5 right-1.5 sm:right-2.5 h-4 sm:h-7 bg-white/95 rounded-t-sm sm:rounded-t-md border-t border-x border-stone-200/80 shadow-2xs group-hover:-translate-y-1 transition-transform duration-200 flex flex-col gap-0.5 p-0.5 sm:p-1.5">
              <div className="w-3/4 h-0.5 sm:h-1 bg-stone-300 rounded-full" />
              <div className="w-1/2 h-0.5 sm:h-1 bg-stone-200 rounded-full" />
            </div>
          </div>
        </div>

        {/* Front Folder Flap with 3D Bevel & Shadow */}
        <div className={`absolute bottom-0 left-0 right-0 h-10 xs:h-14 sm:h-18 md:h-22 rounded-lg sm:rounded-2xl ${currentTheme.frontGradient} border-t ${currentTheme.frontBorderTop} border-b ${currentTheme.frontBorderBottom} ${currentTheme.shadow} ${currentTheme.hoverShadow} transition-all duration-200 flex items-center justify-center overflow-hidden`}>
          {/* Folder Texture lines */}
          <div className="absolute inset-0 bg-radial from-white/20 via-transparent to-black/10 opacity-70 pointer-events-none" />
          <div className="absolute -right-4 -bottom-4 w-12 sm:w-20 h-12 sm:h-20 rounded-full bg-white/10 blur-xs sm:blur-sm pointer-events-none" />
          
          {/* Center Folder Symbol */}
          <div className={`w-5 h-5 xs:w-7 xs:h-7 sm:w-9 sm:h-9 rounded-md sm:rounded-xl ${currentTheme.iconBg} border border-white/25 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform`}>
            <Folder className={`w-2.5 h-2.5 xs:w-3.5 xs:h-3.5 sm:w-4.5 sm:h-4.5 ${currentTheme.iconColor}`} />
          </div>
        </div>
      </div>

      {/* Clean Folder Name with Mobile Responsive Sizing */}
      <h3 className={`mt-1.5 xs:mt-2 sm:mt-3 text-[11px] xs:text-xs sm:text-sm md:text-base font-bold sm:font-black text-center tracking-tight font-serif ${currentTheme.textColor} transition-colors line-clamp-2 px-0.5 leading-tight`}>
        {title}
      </h3>
    </div>
  );
};

export const FreeMaterialsSection: React.FC<FreeMaterialsProps> = ({
  selectedCourseFilter,
  onOpenSignUp,
}) => {
  // Course State: BAMS | AIAPGET | AYUSH MEDICAL OFFICER
  const [selectedCourse, setSelectedCourse] = useState<CourseType>('BAMS');

  // Hierarchy Navigation State:
  // Level 1: activeFolder === null (Shows the 4 main folders: 1st Prof, 2nd Prof, 3rd/Final Prof, Others)
  // Level 2: activeFolder !== null && activeSubject === null (Shows subject folders for activeFolder)
  // Level 3: activeFolder !== null && activeSubject !== null (Shows notes list for that subject)
  const [activeFolder, setActiveFolder] = useState<BamsFolder | null>(null);
  const [activeSubject, setActiveSubject] = useState<string | null>(null);

  // Search & Filter inside notes view
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [activeNote, setActiveNote] = useState<StudyNote | null>(null);
  const [copied, setCopied] = useState(false);
  const [savedNotes, setSavedNotes] = useState<{ [id: string]: boolean }>({});

  // Sync with prop when selectedCourseFilter changes
  useEffect(() => {
    if (selectedCourseFilter && (selectedCourseFilter === 'BAMS' || selectedCourseFilter === 'AIAPGET' || selectedCourseFilter === 'AYUSH MEDICAL OFFICER')) {
      setSelectedCourse(selectedCourseFilter as CourseType);
    }
  }, [selectedCourseFilter]);

  const categories = [
    'ALL',
    'Samhita Summary',
    'Dravyaguna Chart',
    'Rasa Shastra',
    'Clinical Pearl',
    'Previous Year Analysis'
  ];

  // Notes filtered by current folder, subject, search & category
  const filteredNotes = STUDY_MATERIALS_DATA.filter((note) => {
    if (note.course !== 'BAMS') return false;
    if (activeFolder && note.folder !== activeFolder) return false;
    if (activeSubject && note.subject !== activeSubject) return false;

    const matchesSearch = 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = categoryFilter === 'ALL' || note.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const toggleBookmark = (id: string) => {
    setSavedNotes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCopyCitation = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-10 bg-[#fbfaf6] text-stone-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#eaf2eb] border border-[#c4dec8] text-[#1b4332] text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Open Access Ayurveda Repository</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight font-serif">
            Free Study Materials & Samhita Notes
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            High-yield Samhita summaries, Dravyaguna herb charts, Rasa Shastra formulation keys, and NCISM university exam notes curated by Ayurveda gold medalists.
          </p>
        </div>

        {/* Primary Course Filter Switcher */}
        <div className="flex items-center justify-center">
          <div className="inline-flex p-1.5 bg-white border border-[#dfd6c5] rounded-2xl shadow-xs gap-1.5">
            {/* BAMS Button */}
            <button
              id="select-course-bams-btn"
              onClick={() => {
                setSelectedCourse('BAMS');
                setActiveFolder(null);
                setActiveSubject(null);
                setSearchQuery('');
              }}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                selectedCourse === 'BAMS'
                  ? 'bg-[#1b4332] text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>BAMS</span>
            </button>

            {/* AIAPGET Button */}
            <button
              id="select-course-aiapget-btn"
              onClick={() => {
                setSelectedCourse('AIAPGET');
                setActiveFolder(null);
                setActiveSubject(null);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                selectedCourse === 'AIAPGET'
                  ? 'bg-[#1b4332] text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Award className="w-4 h-4 text-amber-600" />
              <span>AIAPGET</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-extrabold uppercase ${
                selectedCourse === 'AIAPGET' ? 'bg-amber-400 text-stone-950' : 'bg-amber-100 text-amber-900'
              }`}>
                Upcoming
              </span>
            </button>

            {/* AYUSH MEDICAL OFFICER Button */}
            <button
              id="select-course-ayush-mo-btn"
              onClick={() => {
                setSelectedCourse('AYUSH MEDICAL OFFICER');
                setActiveFolder(null);
                setActiveSubject(null);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                selectedCourse === 'AYUSH MEDICAL OFFICER'
                  ? 'bg-[#1b4332] text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>AYUSH Medical Officer</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-extrabold uppercase ${
                selectedCourse === 'AYUSH MEDICAL OFFICER' ? 'bg-teal-300 text-teal-950' : 'bg-teal-100 text-teal-900'
              }`}>
                Upcoming
              </span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CASE 1: BAMS SELECTED -> FOLDER HIERARCHICAL SYSTEM                       */}
        {/* ========================================================================= */}
        {selectedCourse === 'BAMS' && (
          <div className="space-y-6">

            {/* --------------------------------------------------------------------- */}
            {/* LEVEL 1: MAIN 4 FOLDERS VIEW (1st Prof, 2nd Prof, 3rd/Final Prof, Others)*/}
            {/* --------------------------------------------------------------------- */}
            {activeFolder === null && (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 lg:gap-6 pt-2 sm:pt-4">
                {BAMS_MAIN_FOLDERS.map((folder) => (
                  <RealisticFolderGraphic
                    key={folder.id}
                    id={`bams-folder-${folder.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    title={folder.name}
                    theme="gold"
                    onClick={() => {
                      setActiveFolder(folder.id);
                      setActiveSubject(null);
                      setSearchQuery('');
                    }}
                  />
                ))}
              </div>
            )}

            {/* --------------------------------------------------------------------- */}
            {/* LEVEL 2: SUBJECT FOLDERS VIEW (When a professional year is clicked)   */}
            {/* --------------------------------------------------------------------- */}
            {activeFolder !== null && activeSubject === null && (
              <div className="space-y-6">
                {/* Navigation Header */}
                <div className="bg-white border border-[#e5dfd3] rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 shadow-xs">
                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                    <button
                      id="back-to-bams-folders-btn"
                      onClick={() => {
                        setActiveFolder(null);
                        setActiveSubject(null);
                        setSearchQuery('');
                      }}
                      className="px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>Back to BAMS Folders</span>
                    </button>
                    <div className="h-4 w-px bg-stone-300 hidden sm:block" />
                    <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
                      <Folder className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-400" />
                      <span>BAMS</span>
                      <span className="text-stone-400">/</span>
                      <span className="font-bold text-[#1b4332] bg-[#eaf2eb] px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-lg border border-[#c4dec8]">
                        {activeFolder}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Subject Folders Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6 pt-1 sm:pt-2">
                  {BAMS_SUBJECT_FOLDERS[activeFolder].map((subjectName, idx) => (
                    <RealisticFolderGraphic
                      key={idx}
                      id={`subject-folder-${subjectName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      title={subjectName}
                      theme={SUBJECT_FOLDER_THEME_MAP[activeFolder]}
                      onClick={() => {
                        setActiveSubject(subjectName);
                        setSearchQuery('');
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* --------------------------------------------------------------------- */}
            {/* LEVEL 3: NOTES LIST VIEW (When a subject folder is clicked)           */}
            {/* --------------------------------------------------------------------- */}
            {activeFolder !== null && activeSubject !== null && (
              <div className="space-y-6">
                {/* Breadcrumbs & Navigation Bar */}
                <div className="bg-white border border-[#e5dfd3] rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      id="back-to-subjects-btn"
                      onClick={() => {
                        setActiveSubject(null);
                        setSearchQuery('');
                      }}
                      className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to {activeFolder} Subjects</span>
                    </button>
                    <div className="h-4 w-px bg-stone-300 hidden sm:block" />
                    <div className="flex flex-wrap items-center gap-1 text-xs text-stone-500 font-medium">
                      <span>{activeFolder}</span>
                      <span className="text-stone-400">/</span>
                      <span className="font-bold text-[#1b4332] bg-[#eaf2eb] px-3 py-1 rounded-lg border border-[#c4dec8]">
                        {activeSubject}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Search & Category Filter Controls inside Active Subject */}
                <div className="bg-white border border-[#e5dfd3] rounded-3xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-xs">
                  {/* Search Box */}
                  <div className="relative w-full md:w-80">
                    <Search className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
                    <input
                      id="subject-material-search-input"
                      type="text"
                      placeholder={`Search in ${activeSubject}...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-[#fbfaf6] border border-stone-200 rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#2d6a4f]"
                    />
                  </div>

                  {/* Category Chips */}
                  <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        id={`filter-cat-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}-btn`}
                        onClick={() => setCategoryFilter(cat)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          categoryFilter === cat
                            ? 'bg-[#2d6a4f] text-white border-[#2d6a4f] shadow-xs'
                            : 'bg-[#fbfaf6] text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {cat === 'ALL' ? 'All Types' : cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes Grid */}
                {filteredNotes.length === 0 ? (
                  <div className="p-12 text-center bg-white border border-[#e5dfd3] rounded-3xl space-y-3">
                    <FolderOpen className="w-10 h-10 text-stone-400 mx-auto" />
                    <h4 className="text-base font-bold text-stone-800">No Materials Found in this Subject</h4>
                    <p className="text-xs text-stone-500 max-w-md mx-auto">
                      Try clearing your search query or selecting &quot;All Types&quot; to see all available study resources.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setCategoryFilter('ALL');
                      }}
                      className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl cursor-pointer"
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredNotes.map((note) => {
                      const isSaved = savedNotes[note.id];
                      return (
                        <div
                          key={note.id}
                          id={`note-card-${note.id}`}
                          className="bg-white border border-[#e5dfd3] hover:border-[#2d6a4f] rounded-3xl p-6 flex flex-col justify-between transition-all duration-200 shadow-2xs hover:shadow-md space-y-4"
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <span className="px-2.5 py-0.5 rounded-lg bg-[#eaf2eb] text-[#1b4332] border border-[#c4dec8] text-[11px] font-bold">
                                  {note.subject}
                                </span>
                                <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                                  {note.category}
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="text-xs text-stone-500 flex items-center gap-1">
                                  <Clock className="w-3 h-3" /> {note.readTime}
                                </span>
                                <button
                                  onClick={() => toggleBookmark(note.id)}
                                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                                    isSaved 
                                      ? 'bg-amber-100 text-amber-800 border-amber-300' 
                                      : 'bg-[#fbfaf6] text-stone-400 border-stone-200 hover:text-stone-700'
                                  }`}
                                  title="Save note"
                                >
                                  <Bookmark className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            <h3 
                              className="text-base sm:text-lg font-bold text-stone-900 hover:text-[#2d6a4f] transition-colors cursor-pointer" 
                              onClick={() => setActiveNote(note)}
                            >
                              {note.title}
                            </h3>

                            <p className="text-xs text-stone-600 leading-relaxed">
                              {note.summary}
                            </p>

                            {/* Classical Shloka Snippet Box */}
                            {note.shlokaReference && (
                              <div className="p-3 bg-[#faf6ee] rounded-2xl border border-amber-200/80 text-amber-900 font-serif text-xs italic">
                                &quot;{note.shlokaReference.sanskrit}&quot;
                                <div className="text-[10px] text-amber-800 font-sans not-italic font-semibold mt-1">
                                  {note.shlokaReference.citation}
                                </div>
                              </div>
                            )}

                            {/* Bullet Highlights */}
                            <div className="space-y-1.5 pt-1">
                              {note.keyPoints.slice(0, 3).map((pt, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f] shrink-0 mt-1.5" />
                                  <span className="leading-normal">{pt}</span>
                                </div>
                              ))}
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {note.tags.map((t, idx) => (
                                <span key={idx} className="text-[10px] px-2 py-0.5 bg-[#fbfaf6] text-stone-600 rounded-md border border-stone-200">
                                  #{t}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                            <span className="text-[11px] font-semibold text-stone-500 truncate max-w-[50%]">{note.samhita}</span>
                            <button
                              id={`read-note-${note.id}-btn`}
                              onClick={() => setActiveNote(note)}
                              className="px-4 py-2 bg-[#eaf2eb] hover:bg-[#2d6a4f] text-[#1b4332] hover:text-white border border-[#c4dec8] rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <span>Read Full Note</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* CASE 2: AIAPGET CHOSEN -> JUST SHOW UPCOMING                             */}
        {/* ========================================================================= */}
        {selectedCourse === 'AIAPGET' && (
          <div className="bg-white border border-[#e5dfd3] rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-xs space-y-6">
            {/* Upcoming Graphic Badge */}
            <div className="w-16 h-16 rounded-3xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center mx-auto shadow-2xs">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-950 border border-amber-300 text-xs font-black uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                <span>UPCOMING</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight font-serif">
                AIAPGET (MD/MS Entrance) Study Materials
              </h3>
              <p className="text-sm text-stone-600 max-w-xl mx-auto leading-relaxed">
                Our All-India AIAPGET master revision notes, Brihattrayi & Laghuttrayi compendiums, high-yield shloka tables, and NTA question banks are currently in final preparation and launching soon.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                id="aiapget-switch-bams-btn"
                onClick={() => {
                  setSelectedCourse('BAMS');
                  setActiveFolder(null);
                  setActiveSubject(null);
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-bold rounded-xl text-xs cursor-pointer shadow-2xs transition-colors"
              >
                Browse BAMS Free Materials Instead
              </button>

              <a
                href="https://t.me/ayurveez"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-[#229ED9]" />
                <span>Get Launch Alerts on Telegram</span>
              </a>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* CASE 3: AYUSH MEDICAL OFFICER CHOSEN -> JUST SHOW UPCOMING               */}
        {/* ========================================================================= */}
        {selectedCourse === 'AYUSH MEDICAL OFFICER' && (
          <div className="bg-white border border-[#e5dfd3] rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-xs space-y-6">
            {/* Upcoming Graphic Badge */}
            <div className="w-16 h-16 rounded-3xl bg-teal-50 border border-teal-200 text-teal-800 flex items-center justify-center mx-auto shadow-2xs">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-950 border border-teal-300 text-xs font-black uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-teal-800" />
                <span>UPCOMING</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight font-serif">
                AYUSH Medical Officer (PSC/UPSC) Study Materials
              </h3>
              <p className="text-sm text-stone-600 max-w-xl mx-auto leading-relaxed">
                State Public Service Commission (UPPSC, MPPSC, RPSC, BPSC, GPSC, HPSC) and UPSC AYUSH Medical Officer notes, National Health Mission protocols, and solved papers are currently in preparation and launching soon.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                id="ayush-mo-switch-bams-btn"
                onClick={() => {
                  setSelectedCourse('BAMS');
                  setActiveFolder(null);
                  setActiveSubject(null);
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-bold rounded-xl text-xs cursor-pointer shadow-2xs transition-colors"
              >
                Browse BAMS Free Materials Instead
              </button>

              <a
                href="https://wa.me/918271890090"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>Ask on WhatsApp: 8271890090</span>
              </a>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* Note Reader Modal                                                        */}
        {/* ========================================================================= */}
        {activeNote && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <div className="relative bg-white border border-[#e5dfd3] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl text-stone-800">
              
              {/* Top Action Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-[#eaf2eb] text-[#1b4332] border border-[#c4dec8] rounded-lg text-xs font-bold">
                    {activeNote.subject}
                  </span>
                  <span className="text-xs text-amber-800 font-semibold">{activeNote.category}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleBookmark(activeNote.id)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      savedNotes[activeNote.id]
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : 'bg-stone-100 text-stone-700 border-stone-300'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{savedNotes[activeNote.id] ? 'Bookmarked' : 'Save'}</span>
                  </button>
                  <button
                    onClick={() => setActiveNote(null)}
                    className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Title & Subject */}
              <div>
                <h3 className="text-2xl font-black text-stone-900 font-serif">{activeNote.title}</h3>
                <p className="text-xs text-[#2d6a4f] font-semibold mt-1">Source: {activeNote.samhita}</p>
              </div>

              {/* Shloka Feature Box */}
              {activeNote.shlokaReference && (
                <div className="p-5 bg-[#faf6ee] rounded-2xl border border-amber-200 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                    <span>Sanskrit Citation & Meaning</span>
                    <button
                      onClick={() => handleCopyCitation(activeNote.shlokaReference?.sanskrit || '')}
                      className="text-[11px] text-stone-600 hover:text-amber-900 flex items-center gap-1 cursor-pointer"
                    >
                      {copied ? <Check className="w-3 h-3 text-[#2d6a4f]" /> : <Share2 className="w-3 h-3" />}
                      <span>{copied ? 'Copied' : 'Copy Shloka'}</span>
                    </button>
                  </div>
                  <p className="font-serif text-amber-950 text-base italic leading-relaxed">
                    &quot;{activeNote.shlokaReference.sanskrit}&quot;
                  </p>
                  <p className="text-xs text-stone-700 leading-relaxed border-t border-amber-200/60 pt-2">
                    <strong>English Anvaya:</strong> {activeNote.shlokaReference.englishMeaning}
                  </p>
                </div>
              )}

              {/* High Yield Keypoints */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>High-Yield Examination Bullet Points</span>
                </h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {activeNote.keyPoints.map((kp, idx) => (
                    <div key={idx} className="p-3 bg-[#fbfaf6] rounded-xl border border-stone-200 text-xs text-stone-800 flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-md bg-[#eaf2eb] text-[#1b4332] border border-[#c4dec8] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{kp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extended Content */}
              <div className="p-4 bg-[#fbfaf6] rounded-2xl border border-stone-200 text-xs text-stone-700 space-y-2">
                <h5 className="font-bold text-stone-900">Study Notes & Conceptual Clarity:</h5>
                <p className="whitespace-pre-line leading-relaxed">{activeNote.content}</p>
              </div>

              {/* Footer CTA */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs text-stone-500">Want full question bank on this topic?</span>
                <button
                  onClick={() => {
                    setActiveNote(null);
                    onOpenSignUp();
                  }}
                  className="px-4 py-2 bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-bold rounded-xl text-xs cursor-pointer shadow-sm"
                >
                  Unlock All Samhita MCQs & Full Access
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
