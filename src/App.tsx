import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SpotlightVideoSection } from './components/SpotlightVideoSection';
import { CoursesSection } from './components/CoursesSection';
import { BamsCoursesPage } from './components/BamsCoursesPage';
import { MockTestHub } from './components/MockTestHub';
import { FreeMaterialsSection } from './components/FreeMaterialsSection';
import { ContactPage } from './components/ContactPage';
import { AyushJobsPage } from './components/AyushJobsPage';
import { StudentDashboard } from './components/StudentDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminLoginModal } from './components/AdminLoginModal';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { AuthPage } from './components/AuthPage';
import { CourseType, UserProfile } from './types';
import { BamsProfType } from './data/bamsCurriculumData';
import { auth, getUserProfile } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { isAdminAuthenticated, logAdminOut } from './data/adminStore';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<CourseType | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('signup');
  const [targetAuthCourse, setTargetAuthCourse] = useState<CourseType>('AIAPGET');
  const [activeDashboardProf, setActiveDashboardProf] = useState<BamsProfType | undefined>(() => {
    const stored = localStorage.getItem('ayurveez_active_enrolled_bams_prof') as BamsProfType;
    return stored || undefined;
  });

  // Master Admin State
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Check admin session on initial load
  useEffect(() => {
    setIsAdminLoggedIn(isAdminAuthenticated());
  }, []);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const profile = await getUserProfile(firebaseUser.uid);
        if (profile) {
          setUser(profile as UserProfile);
        } else {
          setUser({
            uid: firebaseUser.uid,
            name: firebaseUser.displayName || 'Vaidya Aspirant',
            email: firebaseUser.email || '',
            course: 'AIAPGET',
            authProvider: 'google',
          });
        }
      }
    });

    // Check cached local user profile as fallback
    const cachedUid = localStorage.getItem('ayurveez_current_uid');
    if (cachedUid) {
      const localData = localStorage.getItem(`ayurveez_user_${cachedUid}`);
      if (localData) {
        try {
          setUser(JSON.parse(localData));
        } catch (_) {}
      }
    }

    return () => unsubscribe();
  }, []);

  const handleOpenAuth = (mode: 'login' | 'signup' = 'signup', course?: CourseType) => {
    setAuthModalMode(mode);
    if (course) setTargetAuthCourse(course);
    setCurrentTab(mode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthSuccess = (authenticatedUser: UserProfile) => {
    setUser(authenticatedUser);
    localStorage.setItem('ayurveez_current_uid', authenticatedUser.uid);
    localStorage.setItem(`ayurveez_user_${authenticatedUser.uid}`, JSON.stringify(authenticatedUser));
    setAuthModalOpen(false);
    // Navigate directly to student dashboard
    setCurrentTab('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToDashboard = (prof?: BamsProfType) => {
    if (prof) {
      setActiveDashboardProf(prof);
      localStorage.setItem('ayurveez_active_enrolled_bams_prof', prof);
    }
    if (!user) {
      const guestScholar: UserProfile = {
        uid: 'bams-scholar-' + Date.now(),
        name: 'Enrolled BAMS Scholar',
        email: 'scholar@ayurveez.com',
        course: 'BAMS',
        authProvider: 'email_otp',
        role: 'student',
        createdAt: new Date().toISOString()
      };
      setUser(guestScholar);
      localStorage.setItem('ayurveez_current_uid', guestScholar.uid);
      localStorage.setItem(`ayurveez_user_${guestScholar.uid}`, JSON.stringify(guestScholar));
    }
    setCurrentTab('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (_) {}
    localStorage.removeItem('ayurveez_current_uid');
    setUser(null);
    if (currentTab === 'dashboard' || currentTab === 'signup' || currentTab === 'login') {
      setCurrentTab('home');
    }
  };

  const handleOpenAdminPortal = () => {
    if (isAdminAuthenticated()) {
      setIsAdminLoggedIn(true);
      setCurrentTab('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setAdminModalOpen(true);
    }
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setCurrentTab('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLogout = () => {
    logAdminOut();
    setIsAdminLoggedIn(false);
    setCurrentTab('home');
  };

  const handleSelectCourse = (course: CourseType) => {
    setSelectedCourseFilter(course);
    if (course === 'BAMS') {
      setCurrentTab('bams-courses');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentTab('courses');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStartMockTest = (course: CourseType) => {
    setSelectedCourseFilter(course);
    setCurrentTab('mock-tests');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreMaterials = () => {
    setCurrentTab('free-materials');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f9f7f2] font-sans text-stone-800 flex flex-col selection:bg-[#1b4332] selection:text-white overflow-x-hidden max-w-full">
      
      {/* Top Navigation Bar with Hamburger Menu & Dropdowns */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        selectedCourseFilter={selectedCourseFilter}
        setSelectedCourseFilter={setSelectedCourseFilter}
        user={user}
        onOpenAuth={handleOpenAuth}
        onSignOut={handleSignOut}
        onSelectCourse={handleSelectCourse}
        onOpenProfile={() => {
          if (!user) {
            handleNavigateToDashboard();
          } else {
            setCurrentTab('dashboard');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
      />

      {/* Main Content Area based on Selected Tab */}
      <main className="flex-grow max-w-full overflow-x-hidden">
        {currentTab === 'home' && (
          <div className="space-y-0">
            <Hero
              onSelectCourse={(course) => {
                setSelectedCourseFilter(course);
                setCurrentTab('courses');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreMockTests={() => {
                setCurrentTab('mock-tests');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreMaterials={handleExploreMaterials}
              onExploreJobs={() => {
                setCurrentTab('jobs');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenSignUp={() => handleOpenAuth('signup')}
            />

            {/* Hot Topics & Updates: Spotlight Video & Reels Section (Admin Manageable) */}
            <SpotlightVideoSection />
          </div>
        )}

        {/* Master Admin Portal Dashboard */}
        {currentTab === 'admin' && (
          isAdminLoggedIn ? (
            <AdminDashboard
              onExitAdmin={handleAdminLogout}
            />
          ) : (
            <div className="py-20 text-center space-y-5 max-w-lg mx-auto px-4">
              <div className="w-14 h-14 rounded-2xl bg-[#143d2b] text-amber-300 mx-auto flex items-center justify-center shadow-lg border border-amber-400/40">
                <span className="text-2xl font-bold">⚡</span>
              </div>
              <h2 className="text-2xl font-bold text-stone-900">Administrator Access</h2>
              <p className="text-stone-600 text-sm">
                Directly access the Ayurveez Master Admin Dashboard with 1-Click to view real registered students, manage YouTube spotlight media, Drive notes, and courses.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  id="btn-app-one-click-admin-login"
                  onClick={() => {
                    handleAdminLoginSuccess();
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 text-stone-950 font-black rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>⚡ 1-Click Admin Access (Instant)</span>
                </button>
                <button
                  onClick={() => setAdminModalOpen(true)}
                  className="w-full sm:w-auto px-5 py-3.5 bg-[#143d2b] hover:bg-[#1b4332] text-amber-300 font-bold rounded-xl text-xs shadow-md transition-all cursor-pointer"
                >
                  Admin Credentials Modal
                </button>
              </div>
            </div>
          )
        )}

        {/* Dedicated Sign-Up & Log-In Page Views */}
        {(currentTab === 'signup' || currentTab === 'login') && (
          <AuthPage
            initialMode={currentTab as 'signup' | 'login'}
            defaultCourse={targetAuthCourse}
            onAuthSuccess={handleAuthSuccess}
            onNavigateHome={() => {
              setCurrentTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectCourse={handleSelectCourse}
          />
        )}

        {currentTab === 'bams-courses' && (
          <BamsCoursesPage
            onSelectCourse={handleSelectCourse}
            onOpenSignUp={(course) => handleOpenAuth('signup', course)}
            onNavigateToDashboard={handleNavigateToDashboard}
          />
        )}

        {currentTab === 'courses' && (
          <CoursesSection
            selectedCourseFilter={selectedCourseFilter}
            onSelectCourse={handleSelectCourse}
            onStartMockTest={handleStartMockTest}
            onOpenSignUp={(course) => handleOpenAuth('signup', course)}
          />
        )}

        {currentTab === 'mock-tests' && (
          <MockTestHub
            user={user}
            selectedCourseFilter={selectedCourseFilter}
            onOpenAuth={() => handleOpenAuth('signup')}
          />
        )}

        {currentTab === 'jobs' && (
          <AyushJobsPage
            onSelectCourse={handleSelectCourse}
            onOpenSignUp={() => handleOpenAuth('signup')}
          />
        )}

        {currentTab === 'free-materials' && (
          <FreeMaterialsSection
            selectedCourseFilter={selectedCourseFilter}
            onOpenSignUp={() => handleOpenAuth('signup')}
          />
        )}

        {currentTab === 'contact' && (
          <ContactPage
            onOpenSignUp={() => handleOpenAuth('signup')}
          />
        )}

        {currentTab === 'dashboard' && (
          user ? (
            <StudentDashboard
              user={user}
              initialBamsProf={activeDashboardProf}
              onUpdateUser={(updated) => setUser(updated)}
              onStartMockTest={handleStartMockTest}
              onExploreMaterials={handleExploreMaterials}
              onNavigate={(tab) => {
                setCurrentTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ) : (
            <div className="py-20 text-center space-y-4 max-w-lg mx-auto px-4">
              <h2 className="text-2xl font-bold text-stone-900">Please Log In to View Your Dashboard</h2>
              <p className="text-stone-600 text-sm">Access your enrolled courses, test scores, and personalized Samhita tracking.</p>
              <button
                onClick={() => handleOpenAuth('login')}
                className="px-6 py-3 bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-bold rounded-xl text-sm shadow-md cursor-pointer"
              >
                Log In to Account
              </button>
            </div>
          )
        )}
      </main>

      {/* Redesigned Compact Ayurvedic Footer with Admin Portal trigger */}
      <Footer
        onSelectCourse={handleSelectCourse}
        onNavigate={(tab) => {
          if (tab === 'admin') {
            handleOpenAdminPortal();
          } else {
            setCurrentTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        onOpenSignUp={() => handleOpenAuth('signup')}
      />

      {/* Master Admin Login & Forgot Password Modal */}
      <AdminLoginModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        onAdminLoginSuccess={handleAdminLoginSuccess}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
        defaultCourse={targetAuthCourse}
        onAuthSuccess={handleAuthSuccess}
      />

    </div>
  );
}
