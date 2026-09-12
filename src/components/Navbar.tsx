import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  BookOpen, 
  GraduationCap, 
  Award, 
  ShieldCheck, 
  FileText, 
  HelpCircle, 
  ChevronDown, 
  User as UserIcon, 
  LogOut, 
  LogIn,
  Sparkles,
  PhoneCall,
  LayoutDashboard,
  CheckCircle,
  UserPlus,
  ChevronRight
} from 'lucide-react';
import { UserProfile, CourseType } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  selectedCourseFilter: string | null;
  setSelectedCourseFilter: (course: CourseType | null) => void;
  user: UserProfile | null;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
  onSignOut: () => void;
  onSelectCourse: (course: CourseType) => void;
  onOpenProfile?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  selectedCourseFilter,
  setSelectedCourseFilter,
  user,
  onOpenAuth,
  onSignOut,
  onSelectCourse,
  onOpenProfile,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [guestDropdownOpen, setGuestDropdownOpen] = useState(false);

  // Check if student is logged in OR has entered activation code
  const isStudentEnrolledOrLoggedIn = Boolean(
    user ||
    (() => {
      try {
        const u = localStorage.getItem('ayurveez_unlocked_bams_profs');
        if (u) {
          const p = JSON.parse(u);
          if (p['1st'] || p['2nd'] || p['final']) return true;
        }
        const activeProf = localStorage.getItem('ayurveez_active_enrolled_bams_prof');
        if (activeProf) return true;
      } catch (_) {}
      return false;
    })()
  );

  const handleNavClick = (tab: string) => {
    setCurrentTab(tab);
    setMobileMenuOpen(false);
    setCoursesDropdownOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCourseSelect = (course: CourseType) => {
    onSelectCourse(course);
    setSelectedCourseFilter(course);
    if (course === 'BAMS') {
      setCurrentTab('bams-courses');
    } else {
      setCurrentTab('courses');
    }
    setCoursesDropdownOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#fbfaf6]/95 backdrop-blur-md border-b border-[#e6dfd1] text-stone-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            id="brand-logo"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#2d6a4f] to-[#1b4332] p-0.5 shadow-sm shadow-emerald-950/20 group-hover:scale-105 transition-transform duration-200 flex items-center justify-center border border-amber-400/40">
              <div className="w-full h-full bg-[#1b4332] rounded-[10px] flex items-center justify-center">
                <span className="text-xl font-black text-amber-300 tracking-tighter">आयु</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-stone-900 group-hover:text-[#2d6a4f] transition-colors">
                AYURVEEZ
              </span>
              <span className="text-[11px] font-semibold text-[#2d6a4f] tracking-wide">
                BAMS • AIAPGET • AYUSH MO
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            <button
              id="nav-home-btn"
              onClick={() => handleNavClick('home')}
              className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                currentTab === 'home'
                  ? 'bg-[#eaf2eb] text-[#1b4332] border border-[#c4dec8] shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/80'
              }`}
            >
              Home
            </button>

            {/* Courses Dropdown */}
            <div className="relative">
              <button
                id="nav-courses-dropdown-btn"
                onClick={() => setCoursesDropdownOpen(!coursesDropdownOpen)}
                onMouseEnter={() => setCoursesDropdownOpen(true)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  currentTab === 'courses' || currentTab === 'bams-courses'
                    ? 'bg-[#eaf2eb] text-[#1b4332] border border-[#c4dec8]'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/80'
                }`}
              >
                <span>Courses</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${coursesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {coursesDropdownOpen && (
                <div 
                  onMouseLeave={() => setCoursesDropdownOpen(false)}
                  className="absolute left-0 mt-1.5 w-80 bg-white border border-[#e2dacf] rounded-2xl shadow-xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="px-3 py-1.5 text-[11px] font-bold text-stone-500 uppercase tracking-wider border-b border-stone-100">
                    Select Target Preparation
                  </div>
                  
                  <button
                    id="dropdown-course-bams"
                    onClick={() => handleCourseSelect('BAMS')}
                    className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#f4f8f4] text-left transition-colors group mt-1.5 cursor-pointer"
                  >
                    <div className="p-2 rounded-xl bg-[#eaf2eb] text-[#1b4332] border border-[#c4dec8] group-hover:bg-[#2d6a4f] group-hover:text-white transition-colors shrink-0">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-stone-900 group-hover:text-[#1b4332]">BAMS University (1st, 2nd, Final Prof)</div>
                      <div className="text-xs text-stone-500">1st Proff., 2nd Proff. &amp; Final Proff. Courses</div>
                    </div>
                  </button>

                  <button
                    id="dropdown-course-aiapget"
                    onClick={() => handleCourseSelect('AIAPGET')}
                    className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#fdf8ee] text-left transition-colors group cursor-pointer"
                  >
                    <div className="p-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 group-hover:bg-amber-700 group-hover:text-white transition-colors shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-stone-900 group-hover:text-amber-800">AIAPGET</span>
                        <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-300 text-[9px] font-black uppercase">Upcoming</span>
                      </div>
                      <div className="text-xs text-stone-500">MD/MS Samhita MCQs, NTA Pattern & Ranking</div>
                    </div>
                  </button>

                  <button
                    id="dropdown-course-ayush-mo"
                    onClick={() => handleCourseSelect('AYUSH MEDICAL OFFICER')}
                    className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#f0f7f6] text-left transition-colors group cursor-pointer"
                  >
                    <div className="p-2 rounded-xl bg-teal-50 text-teal-800 border border-teal-200 group-hover:bg-teal-700 group-hover:text-white transition-colors shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-stone-900 group-hover:text-teal-800">AYUSH Medical Officer</span>
                        <span className="px-1.5 py-0.2 rounded bg-teal-100 text-teal-900 border border-teal-300 text-[9px] font-black uppercase">Upcoming</span>
                      </div>
                      <div className="text-xs text-stone-500">State PSC, UPSC & Medical Officer Exam series</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Mock Tests */}
            <button
              id="nav-mock-tests-btn"
              onClick={() => handleNavClick('mock-tests')}
              className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                currentTab === 'mock-tests'
                  ? 'bg-[#eaf2eb] text-[#1b4332] border border-[#c4dec8] shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/80'
              }`}
            >
              Mock Tests
            </button>

            {/* Free Materials */}
            <button
              id="nav-free-materials-btn"
              onClick={() => handleNavClick('free-materials')}
              className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                currentTab === 'free-materials'
                  ? 'bg-[#eaf2eb] text-[#1b4332] border border-[#c4dec8] shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/80'
              }`}
            >
              Free Materials
            </button>

            {/* Contact Us */}
            <button
              id="nav-contact-btn"
              onClick={() => handleNavClick('contact')}
              className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                currentTab === 'contact'
                  ? 'bg-[#eaf2eb] text-[#1b4332] border border-[#c4dec8] shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/80'
              }`}
            >
              Contact Us
            </button>
          </nav>

          {/* Desktop Right Action (Login / Profile) */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  id="user-profile-menu-btn"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl bg-white border border-[#e2dacf] hover:border-[#2d6a4f] transition-colors shadow-xs cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#1b4332] text-white font-bold flex items-center justify-center text-xs shadow-xs">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'V'}
                  </div>
                  <div className="text-left hidden sm:block">
                    <div className="text-xs font-bold text-stone-900 truncate max-w-[120px]">{user.name}</div>
                    <div className="text-[10px] text-[#1b4332] font-semibold">{user.course}</div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
                </button>

                {userDropdownOpen && (
                  <div 
                    onMouseLeave={() => setUserDropdownOpen(false)}
                    className="absolute right-0 mt-2 w-64 bg-white border border-[#e2dacf] rounded-2xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  >
                    <div className="p-3 border-b border-stone-100 bg-[#fbfaf6] rounded-xl mb-1">
                      <div className="text-xs font-bold text-stone-900">{user.name}</div>
                      <div className="text-[11px] text-stone-500 truncate">{user.email}</div>
                      <div className="mt-1.5 flex items-center gap-1 text-[10px] font-bold text-[#1b4332] bg-[#eaf2eb] px-2 py-0.5 rounded border border-[#c4dec8]">
                        <CheckCircle className="w-3 h-3" />
                        <span>Enrolled in {user.course}</span>
                      </div>
                    </div>

                    <button
                      id="menu-my-profile-btn"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        if (onOpenProfile) onOpenProfile();
                        else handleNavClick('dashboard');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-stone-700 hover:text-[#1b4332] hover:bg-[#f4f8f4] text-left transition-colors cursor-pointer"
                    >
                      <UserIcon className="w-4 h-4 text-[#2d6a4f]" />
                      <span>My Profile</span>
                    </button>

                    <button
                      id="menu-dashboard-btn"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        handleNavClick('dashboard');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-stone-700 hover:text-[#1b4332] hover:bg-[#f4f8f4] text-left transition-colors cursor-pointer"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#2d6a4f]" />
                      <span>Student Dashboard</span>
                    </button>

                    <button
                      id="menu-signout-btn"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onSignOut();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 text-left transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Profile Icon Button for Guest Users (Desktop) */
              <div className="relative">
                <button
                  id="nav-profile-auth-btn"
                  onClick={() => setGuestDropdownOpen(!guestDropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white hover:bg-[#eaf2eb] border border-[#e2dacf] hover:border-[#2d6a4f] text-stone-700 hover:text-[#1b4332] transition-all shadow-2xs cursor-pointer group"
                  title="Profile & Student Login"
                  aria-label="Student Profile and Login"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#eaf2eb] group-hover:bg-[#2d6a4f] text-[#2d6a4f] group-hover:text-white flex items-center justify-center transition-colors">
                    <UserIcon className="w-4 h-4" />
                  </div>
                  <div className="text-left hidden xl:block">
                    <div className="text-xs font-bold text-stone-800 group-hover:text-[#1b4332] leading-tight">Student Portal</div>
                    <div className="text-[10px] text-stone-500 leading-tight">Log In / Sign Up</div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#1b4332] transition-transform" />
                </button>

                {guestDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-[#e2dacf] p-2 space-y-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-2 border-b border-stone-100">
                      <p className="text-xs font-bold text-stone-900">Ayurveda Student Portal</p>
                      <p className="text-[11px] text-stone-500">Access mock tests, notes & tracking</p>
                    </div>

                    <button
                      id="guest-menu-login-btn"
                      onClick={() => {
                        setGuestDropdownOpen(false);
                        onOpenAuth('login');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-[#1b4332] bg-[#f4f8f4] hover:bg-[#eaf2eb] text-left transition-colors cursor-pointer"
                    >
                      <LogIn className="w-4 h-4 text-[#2d6a4f]" />
                      <span>Registered Student Log In</span>
                    </button>

                    <button
                      id="guest-menu-signup-btn"
                      onClick={() => {
                        setGuestDropdownOpen(false);
                        onOpenAuth('signup');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-stone-700 hover:text-stone-900 hover:bg-stone-50 text-left transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>New Student Sign Up</span>
                    </button>

                    <div className="pt-1 border-t border-stone-100">
                      <button
                        id="guest-menu-admin-btn"
                        onClick={() => {
                          setGuestDropdownOpen(false);
                          handleNavClick('admin');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-amber-900 bg-amber-50/80 hover:bg-amber-100/90 text-left transition-colors cursor-pointer"
                      >
                        <ShieldCheck className="w-4 h-4 text-amber-700" />
                        <span>Master Admin Portal</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Profile & Hamburger Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            {!user ? (
              <button
                id="mobile-nav-profile-auth-btn"
                onClick={() => onOpenAuth('login')}
                className="p-2.5 rounded-xl bg-white border border-[#e2dacf] text-stone-700 hover:text-[#1b4332] hover:bg-[#eaf2eb] shadow-2xs cursor-pointer flex items-center justify-center group"
                title="Profile & Student Login"
                aria-label="Profile and Login"
              >
                <UserIcon className="w-5 h-5 text-stone-700 group-hover:text-[#1b4332]" />
              </button>
            ) : (
              <button
                onClick={() => handleNavClick('dashboard')}
                className="w-9 h-9 rounded-xl bg-[#2d6a4f] text-white font-bold flex items-center justify-center text-xs shadow-xs cursor-pointer"
                title="Student Dashboard"
              >
                {user.name ? user.name.charAt(0).toUpperCase() : 'V'}
              </button>
            )}
            <button
              id="hamburger-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white border border-[#e2dacf] text-stone-700 hover:text-stone-900 cursor-pointer shadow-xs"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE HAMBURGER FLOATING DRAWER & BACKDROP                               */}
      {/* ========================================================================= */}
      {mobileMenuOpen && (
        <>
          {/* Subtle Dim Backdrop - Click to Close */}
          <div 
            id="mobile-menu-backdrop"
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-2xs z-40 lg:hidden animate-in fade-in duration-150"
          />

          {/* Floating Mobile Menu Container (Does NOT cover the full screen) */}
          <div 
            id="mobile-drawer-menu"
            className="fixed top-16 right-3 w-[88vw] max-w-xs sm:max-w-sm bg-[#fbfaf6] border border-[#e2dacf] rounded-2xl p-3.5 space-y-3 shadow-2xl z-50 max-h-[calc(100vh-5rem)] overflow-y-auto animate-in slide-in-from-top-2 zoom-in-95 duration-150 lg:hidden"
          >
            {/* User Header if Logged In */}
            {user && (
              <div className="p-3 bg-white rounded-xl border border-[#e2dacf] space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#2d6a4f] text-white font-bold flex items-center justify-center text-xs shadow-xs">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'V'}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-900">{user.name}</div>
                      <div className="text-[10px] text-stone-500 truncate max-w-[140px]">{user.email}</div>
                    </div>
                  </div>
                  <button
                    onClick={onSignOut}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                    title="Log out"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex items-center justify-between pt-1.5 border-t border-stone-100 text-[11px]">
                  <span className="text-stone-500">Track:</span>
                  <strong className="text-[#1b4332]">{user.course}</strong>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <div className="space-y-1 text-xs">
              <button
                id="mobile-nav-home"
                onClick={() => handleNavClick('home')}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl font-bold transition-colors ${
                  currentTab === 'home'
                    ? 'bg-[#eaf2eb] text-[#1b4332] border border-[#c4dec8]'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span>Home</span>
              </button>

              {/* Mobile Courses Accordion */}
              <div className="space-y-1 pt-1">
                <div className="px-2 py-1 text-[10px] font-bold text-stone-500 uppercase tracking-wider flex items-center justify-between">
                  <span>Courses Catalog</span>
                  <BookOpen className="w-3 h-3 text-[#2d6a4f]" />
                </div>
                
                <div className="grid grid-cols-1 gap-1 pl-1">
                  <button
                    id="mobile-course-bams"
                    onClick={() => handleCourseSelect('BAMS')}
                    className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-[#e2dacf] text-stone-800 text-left text-xs font-bold hover:bg-[#f4f8f4]"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-[#2d6a4f] shrink-0" />
                    <span className="truncate">BAMS (1st to Final Prof)</span>
                  </button>

                  <button
                    id="mobile-course-aiapget"
                    onClick={() => handleCourseSelect('AIAPGET')}
                    className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-[#e2dacf] text-stone-800 text-left text-xs font-bold hover:bg-[#fdf8ee]"
                  >
                    <Award className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span className="truncate">AIAPGET (MD/MS PG Series)</span>
                  </button>

                  <button
                    id="mobile-course-ayush-mo"
                    onClick={() => handleCourseSelect('AYUSH MEDICAL OFFICER')}
                    className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-[#e2dacf] text-stone-800 text-left text-xs font-bold hover:bg-[#f0f7f6]"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                    <span className="truncate">AYUSH Medical Officer (PSC)</span>
                  </button>
                </div>
              </div>

              <button
                id="mobile-nav-mock-tests"
                onClick={() => handleNavClick('mock-tests')}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl font-bold transition-colors ${
                  currentTab === 'mock-tests'
                    ? 'bg-[#eaf2eb] text-[#1b4332] border border-[#c4dec8]'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span>Mock Tests</span>
              </button>

              <button
                id="mobile-nav-free-materials"
                onClick={() => handleNavClick('free-materials')}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl font-bold transition-colors ${
                  currentTab === 'free-materials'
                    ? 'bg-[#eaf2eb] text-[#1b4332] border border-[#c4dec8]'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span>Free Study Materials</span>
              </button>

              <button
                id="mobile-nav-contact"
                onClick={() => handleNavClick('contact')}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl font-bold transition-colors ${
                  currentTab === 'contact'
                    ? 'bg-[#eaf2eb] text-[#1b4332] border border-[#c4dec8]'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span>Contact Us</span>
              </button>

              {/* Master Admin Portal: ONLY visible until student login / activation because it is only for admin */}
              {!isStudentEnrolledOrLoggedIn && (
                <button
                  id="mobile-nav-admin"
                  onClick={() => handleNavClick('admin')}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl font-bold transition-colors ${
                    currentTab === 'admin'
                      ? 'bg-amber-100 text-amber-950 border border-amber-300'
                      : 'text-amber-900 bg-amber-50/70 hover:bg-amber-100/80 border border-amber-200/60'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                    <span>Master Admin Portal</span>
                  </div>
                  <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-amber-200 text-amber-900">
                    Staff
                  </span>
                </button>
              )}

              {/* After student login or enter activation code: show My Profile & Student Dashboard in hamburger menu */}
              {isStudentEnrolledOrLoggedIn && (
                <>
                  <button
                    id="mobile-nav-my-profile"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (onOpenProfile) {
                        onOpenProfile();
                      } else {
                        handleNavClick('dashboard');
                      }
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl font-bold bg-[#1b4332] text-amber-300 border border-amber-400/40 shadow-xs cursor-pointer hover:bg-[#143628] transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center font-black text-xs shrink-0">
                        {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
                      </div>
                      <span className="text-white">My Profile</span>
                    </div>
                    <span className="text-[10px] font-bold text-amber-300 flex items-center gap-1">
                      <span>{user?.name ? user.name.split(' ')[0] : 'Enrolled'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </button>

                  <button
                    id="mobile-nav-dashboard"
                    onClick={() => handleNavClick('dashboard')}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl font-bold transition-colors ${
                      currentTab === 'dashboard'
                        ? 'bg-[#eaf2eb] text-[#1b4332] border border-[#c4dec8]'
                        : 'text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-[#1b4332]" />
                      <span>Student Dashboard</span>
                    </div>
                  </button>
                </>
              )}
            </div>

            {/* Bottom Auth CTA in Mobile Menu */}
            {!user ? (
              <div className="pt-2 border-t border-stone-200 grid grid-cols-2 gap-2">
                <button
                  id="mobile-drawer-login-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="py-2 px-2.5 rounded-xl bg-white border border-[#2d6a4f] text-[#1b4332] text-xs font-bold shadow-2xs cursor-pointer flex items-center justify-center gap-1"
                >
                  <LogIn className="w-3 h-3" />
                  <span>Log In</span>
                </button>
                <button
                  id="mobile-drawer-signup-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('signup');
                  }}
                  className="py-2 px-2.5 rounded-xl bg-[#1b4332] hover:bg-[#143628] text-white text-xs font-bold shadow-2xs cursor-pointer flex items-center justify-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>Sign Up</span>
                </button>
              </div>
            ) : (
              <div className="pt-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onSignOut();
                  }}
                  className="w-full py-2 rounded-xl border border-red-200 bg-red-50 text-red-700 text-xs font-bold cursor-pointer"
                >
                  Log Out
                </button>
              </div>
            )}

          </div>
        </>
      )}
    </header>
  );
};
