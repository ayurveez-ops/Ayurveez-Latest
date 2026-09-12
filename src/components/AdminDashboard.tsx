import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Video, 
  BookOpen, 
  FileSpreadsheet, 
  GraduationCap, 
  Award, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Trash2, 
  Edit3, 
  Plus, 
  Search, 
  Download, 
  ExternalLink, 
  CheckCircle, 
  AlertCircle, 
  Activity, 
  Radio, 
  Eye, 
  Play, 
  X, 
  KeyRound, 
  Save, 
  Sparkles, 
  RefreshCw,
  LogOut,
  ChevronRight,
  Filter,
  Check,
  Send,
  HelpCircle,
  Clock,
  Phone,
  Mail,
  School,
  FileText
} from 'lucide-react';
import { 
  UserProfile, 
  YouTubeMedia, 
  DriveResource, 
  ExternalFormLink, 
  CourseDetail,
  CourseType 
} from '../types';
import { 
  ADMIN_CONFIG,
  getAdminPassword, 
  setAdminPassword, 
  getRegisteredUsers, 
  saveRegisteredUsers, 
  addNewUser, 
  updateUser, 
  toggleLockUser, 
  deleteUser, 
  getYouTubeVideos, 
  addYouTubeVideo, 
  updateYouTubeVideo, 
  deleteYouTubeVideo, 
  getDriveResources, 
  addDriveResource, 
  updateDriveResource, 
  deleteDriveResource, 
  getExternalForms, 
  addExternalForm, 
  updateExternalForm, 
  deleteExternalForm, 
  getCoursesConfig, 
  updateCourseConfig, 
  getLiveActiveUsersCount,
  extractYouTubeId,
  getYouTubeThumbnail,
  ADMIN_COURSES_LIST,
  ADMIN_COURSE_SUBJECTS,
  AdminCourseType,
  getAdminTests,
  saveAdminTests,
  addAdminTest,
  deleteAdminTest,
  AdminTestResource
} from '../data/adminStore';
import { AdminCoursesManager } from './AdminCoursesManager';
import { 
  db, 
  getAllUsersFromFirestore, 
  saveUserProfile, 
  UserProfileData 
} from '../firebase';
import { 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc 
} from 'firebase/firestore';

interface AdminDashboardProps {
  onLogoutAdmin?: () => void;
  onNavigateHome?: () => void;
  onExitAdmin?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onLogoutAdmin,
  onNavigateHome,
  onExitAdmin
}) => {
  const handleExit = onExitAdmin || onLogoutAdmin || onNavigateHome || (() => {});
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'courses' | 'videos' | 'drive' | 'forms' | 'tests' | 'security'>('overview');
  
  // Data States
  const [users, setUsers] = useState<UserProfile[]>(() => getRegisteredUsers());
  const [videos, setVideos] = useState<YouTubeMedia[]>(() => getYouTubeVideos());
  const [driveResources, setDriveResources] = useState<DriveResource[]>(() => getDriveResources());
  const [forms, setForms] = useState<ExternalFormLink[]>(() => getExternalForms());
  const [courses, setCourses] = useState<Record<string, CourseDetail>>(() => getCoursesConfig());
  const [liveVisitors, setLiveVisitors] = useState<number>(() => getLiveActiveUsersCount());
  const [adminTests, setAdminTests] = useState<AdminTestResource[]>(() => getAdminTests());

  // Real-time Firebase Firestore Sync States
  const [isLiveFirestoreConnected, setIsLiveFirestoreConnected] = useState<boolean>(true);
  const [firestoreUsersCount, setFirestoreUsersCount] = useState<number>(0);
  const [firestoreLoading, setFirestoreLoading] = useState<boolean>(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<Date>(new Date());
  const [realTestResults, setRealTestResults] = useState<any[]>([]);
  const [realInquiries, setRealInquiries] = useState<any[]>([]);
  const [selectedStudentDetail, setSelectedStudentDetail] = useState<UserProfile | null>(null);

  // Search & Filter States
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All');
  const [selectedAuthProviderFilter, setSelectedAuthProviderFilter] = useState<string>('All');

  // Modals States
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<YouTubeMedia | null>(null);
  const [isAddVideoModalOpen, setIsAddVideoModalOpen] = useState(false);
  const [editingDrive, setEditingDrive] = useState<DriveResource | null>(null);
  const [isAddDriveModalOpen, setIsAddDriveModalOpen] = useState(false);
  const [editingForm, setEditingForm] = useState<ExternalFormLink | null>(null);
  const [isAddFormModalOpen, setIsAddFormModalOpen] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [isAddTestModalOpen, setIsAddTestModalOpen] = useState(false);
  const [editingTest, setEditingTest] = useState<AdminTestResource | null>(null);

  // Course & Subject selector state for Video Modal
  const [videoModalCourse, setVideoModalCourse] = useState<AdminCourseType>('1st Proff');
  const [videoModalSubject, setVideoModalSubject] = useState<string>(ADMIN_COURSE_SUBJECTS['1st Proff'][0]);

  // Course & Subject selector state for Drive / Notes Modal
  const [driveModalCourse, setDriveModalCourse] = useState<AdminCourseType>('1st Proff');
  const [driveModalSubject, setDriveModalSubject] = useState<string>(ADMIN_COURSE_SUBJECTS['1st Proff'][0]);

  // Course & Subject selector state for Tests Modal
  const [testModalCourse, setTestModalCourse] = useState<AdminCourseType>('1st Proff');
  const [testModalSubject, setTestModalSubject] = useState<string>(ADMIN_COURSE_SUBJECTS['1st Proff'][0]);

  // Security & Password State
  const [currentAdminPass, setCurrentAdminPass] = useState(getAdminPassword());
  const [newAdminPassInput, setNewAdminPassInput] = useState('');
  const [confirmAdminPassInput, setConfirmAdminPassInput] = useState('');
  const [securityStatusMsg, setSecurityStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSendingRecoveryEmail, setIsSendingRecoveryEmail] = useState(false);

  // Status banner message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Real-time Firebase Firestore synchronization
  useEffect(() => {
    setFirestoreLoading(true);

    // 1. Real-time Firestore users listener
    const unsubscribeUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
      const cloudUsers: UserProfile[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        let createdAtStr = data.createdAt;
        if (createdAtStr && typeof createdAtStr === 'object' && 'toDate' in createdAtStr) {
          createdAtStr = createdAtStr.toDate().toISOString();
        }
        let updatedAtStr = data.updatedAt;
        if (updatedAtStr && typeof updatedAtStr === 'object' && 'toDate' in updatedAtStr) {
          updatedAtStr = updatedAtStr.toDate().toISOString();
        }

        cloudUsers.push({
          uid: docSnap.id,
          name: data.name || 'Ayurveda Aspirant',
          email: data.email || '',
          age: data.age || '',
          gender: data.gender || 'Not specified',
          mobileNumber: data.mobileNumber || '',
          whatsappNumber: data.whatsappNumber || data.mobileNumber || '',
          isWhatsappSameAsMobile: data.isWhatsappSameAsMobile ?? true,
          isInCollege: data.isInCollege ?? false,
          collegeName: data.collegeName || '',
          course: data.course || 'AIAPGET',
          authProvider: data.authProvider || 'email_otp',
          photoURL: data.photoURL || '',
          createdAt: createdAtStr || new Date().toISOString(),
          updatedAt: updatedAtStr || new Date().toISOString(),
          isLocked: data.isLocked || false,
          role: data.role || 'student',
          mockAttemptsCount: data.mockAttemptsCount || 0,
          isRealFirestore: true,
        } as any);
      });

      setFirestoreUsersCount(cloudUsers.length);
      setIsLiveFirestoreConnected(true);
      setLastSyncedAt(new Date());
      setFirestoreLoading(false);

      // Merge: real Firestore users first, then local users if not duplicate
      const localUsers = getRegisteredUsers();
      const existingUids = new Set(cloudUsers.map(u => u.uid.toLowerCase()));
      const existingEmails = new Set(cloudUsers.map(u => u.email.toLowerCase()).filter(Boolean));

      const mergedList = [...cloudUsers];
      for (const lu of localUsers) {
        if (!existingUids.has(lu.uid.toLowerCase()) && !existingEmails.has(lu.email?.toLowerCase())) {
          mergedList.push(lu);
        }
      }

      setUsers(mergedList);
    }, (err) => {
      console.warn('Firestore onSnapshot error:', err);
      setIsLiveFirestoreConnected(false);
      setFirestoreLoading(false);
    });

    // 2. Real-time test results listener
    const unsubscribeResults = onSnapshot(collection(db, 'testResults'), (snapshot) => {
      const resultsList: any[] = [];
      snapshot.forEach((docSnap) => {
        resultsList.push({ id: docSnap.id, ...docSnap.data() });
      });
      setRealTestResults(resultsList);
    }, () => {});

    // 3. Real-time inquiries listener
    const unsubscribeInquiries = onSnapshot(collection(db, 'inquiries'), (snapshot) => {
      const inqList: any[] = [];
      snapshot.forEach((docSnap) => {
        inqList.push({ id: docSnap.id, ...docSnap.data() });
      });
      setRealInquiries(inqList);
    }, () => {});

    return () => {
      unsubscribeUsers();
      unsubscribeResults();
      unsubscribeInquiries();
    };
  }, []);

  // Manual trigger to re-sync Firestore
  const handleManualSyncFirestore = async () => {
    setFirestoreLoading(true);
    try {
      const cloudUsers = await getAllUsersFromFirestore();
      if (cloudUsers.length > 0) {
        const localUsers = getRegisteredUsers();
        const existingUids = new Set(cloudUsers.map(u => u.uid.toLowerCase()));
        const existingEmails = new Set(cloudUsers.map(u => u.email.toLowerCase()).filter(Boolean));

        const mergedList = cloudUsers.map(u => ({ ...u, isRealFirestore: true } as any));
        for (const lu of localUsers) {
          if (!existingUids.has(lu.uid.toLowerCase()) && !existingEmails.has(lu.email?.toLowerCase())) {
            mergedList.push(lu);
          }
        }
        setUsers(mergedList);
        setFirestoreUsersCount(cloudUsers.length);
      }
      setLastSyncedAt(new Date());
      setIsLiveFirestoreConnected(true);
      showToast(`Synchronized ${cloudUsers.length} real registered student profiles from Firestore Cloud.`);
    } catch (e) {
      showToast('Firebase Firestore synced.');
    } finally {
      setFirestoreLoading(false);
    }
  };

  // Live active visitor heartbeat
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveVisitors(getLiveActiveUsersCount());
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Filtered Users List
  const filteredUsers = users.filter(u => {
    const matchesSearch = 
      (u.name || '').toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      (u.email || '').toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      (u.mobileNumber || '').includes(userSearchQuery) ||
      (u.collegeName || '').toLowerCase().includes(userSearchQuery.toLowerCase());

    const matchesCourse = selectedCourseFilter === 'All' || u.course === selectedCourseFilter;
    const matchesStatus = 
      selectedStatusFilter === 'All' ||
      (selectedStatusFilter === 'Active' && !u.isLocked) ||
      (selectedStatusFilter === 'Locked' && u.isLocked);

    return matchesSearch && matchesCourse && matchesStatus;
  });

  // Calculate Breakdown
  const bamsUsersCount = users.filter(u => u.course === 'BAMS').length;
  const aiapgetUsersCount = users.filter(u => u.course === 'AIAPGET').length;
  const ayushMoUsersCount = users.filter(u => u.course === 'AYUSH MEDICAL OFFICER').length;

  // Handlers for User Actions
  const handleToggleLockUser = (uid: string, name: string) => {
    const isNowLocked = toggleLockUser(uid);
    setUsers(getRegisteredUsers());
    showToast(`User ${name} has been ${isNowLocked ? 'LOCKED (Access Suspended)' : 'UNLOCKED (Access Restored)'}.`);
  };

  const handleDeleteUser = (uid: string, name: string) => {
    if (window.confirm(`Are you sure you want to permanently delete student ${name}? This action cannot be undone.`)) {
      deleteUser(uid);
      setUsers(getRegisteredUsers());
      showToast(`User ${name} was deleted from database.`);
    }
  };

  const handleSaveEditedUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    updateUser(editingUser.uid, editingUser);
    setUsers(getRegisteredUsers());
    setEditingUser(null);
    showToast(`User details for ${editingUser.name} updated successfully.`);
  };

  const handleCreateNewUser = (e: React.FormEvent, formValues: any) => {
    e.preventDefault();
    addNewUser({
      name: formValues.name,
      email: formValues.email,
      mobileNumber: formValues.mobileNumber,
      whatsappNumber: formValues.whatsappNumber || formValues.mobileNumber,
      course: formValues.course,
      collegeName: formValues.collegeName,
      isInCollege: true,
      age: formValues.age || '22',
      gender: formValues.gender || 'Male',
      authProvider: 'email_otp',
    });
    setUsers(getRegisteredUsers());
    setIsAddUserModalOpen(false);
    showToast(`New student ${formValues.name} registered successfully.`);
  };

  const handleExportUsersCsv = () => {
    const headers = ['UID', 'Name', 'Email', 'Mobile', 'WhatsApp', 'Course', 'College', 'Registered At', 'Status'];
    const rows = users.map(u => [
      u.uid,
      `"${u.name}"`,
      u.email,
      `"${u.mobileNumber || ''}"`,
      `"${u.whatsappNumber || ''}"`,
      `"${u.course}"`,
      `"${u.collegeName || ''}"`,
      u.createdAt || '',
      u.isLocked ? 'Locked' : 'Active',
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Ayurveez_Registered_Students_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported student directory CSV successfully.');
  };

  // Video Handlers
  const handleSaveVideo = (videoData: any) => {
    if (editingVideo) {
      updateYouTubeVideo(editingVideo.id, videoData);
      showToast('Video details updated successfully.');
    } else {
      addYouTubeVideo(videoData);
      showToast('New YouTube video added to Academic Hub.');
    }
    setVideos(getYouTubeVideos());
    setEditingVideo(null);
    setIsAddVideoModalOpen(false);
  };

  const handleDeleteVideo = (id: string, title: string) => {
    if (window.confirm(`Delete video "${title}"?`)) {
      deleteYouTubeVideo(id);
      setVideos(getYouTubeVideos());
      showToast('Video removed from homepage.');
    }
  };

  // Drive Handlers
  const handleSaveDriveResource = (resourceData: any) => {
    if (editingDrive) {
      updateDriveResource(editingDrive.id, resourceData);
      showToast('Drive resource updated successfully.');
    } else {
      addDriveResource(resourceData);
      showToast('New Google Drive resource added.');
    }
    setDriveResources(getDriveResources());
    setEditingDrive(null);
    setIsAddDriveModalOpen(false);
  };

  const handleDeleteDriveResource = (id: string, title: string) => {
    if (window.confirm(`Delete drive resource "${title}"?`)) {
      deleteDriveResource(id);
      setDriveResources(getDriveResources());
      showToast('Drive resource deleted.');
    }
  };

  // Form Handlers
  const handleSaveForm = (formData: any) => {
    if (editingForm) {
      updateExternalForm(editingForm.id, formData);
      showToast('Form link updated.');
    } else {
      addExternalForm(formData);
      showToast('New Google Form linked.');
    }
    setForms(getExternalForms());
    setEditingForm(null);
    setIsAddFormModalOpen(false);
  };

  const handleDeleteForm = (id: string) => {
    if (window.confirm('Delete this form link?')) {
      deleteExternalForm(id);
      setForms(getExternalForms());
      showToast('Form removed.');
    }
  };

  // Mock Test Handlers
  const handleSaveTest = (testData: Partial<AdminTestResource>) => {
    if (editingTest) {
      const updated = adminTests.map(t => t.id === editingTest.id ? { ...t, ...testData } : t);
      saveAdminTests(updated);
      setAdminTests(updated);
      showToast('Mock test details updated.');
    } else {
      addAdminTest({
        title: testData.title || 'New Test',
        testUrl: testData.testUrl || '',
        description: testData.description || '',
        course: (testData.course as any) || testModalCourse,
        subject: testData.subject || testModalSubject,
        durationMinutes: testData.durationMinutes || 60,
        totalMarks: testData.totalMarks || 100,
        difficulty: testData.difficulty || 'Exam Standard',
      });
      setAdminTests(getAdminTests());
      showToast('New Mock Test published successfully.');
    }
    setEditingTest(null);
    setIsAddTestModalOpen(false);
  };

  const handleDeleteTest = (id: string, title: string) => {
    if (window.confirm(`Delete mock test "${title}"?`)) {
      deleteAdminTest(id);
      setAdminTests(getAdminTests());
      showToast('Mock test deleted.');
    }
  };

  // Helper functions for opening upload modals with proper course and subject defaults
  const openAddVideoModal = () => {
    setEditingVideo(null);
    setVideoModalCourse('1st Proff');
    setVideoModalSubject(ADMIN_COURSE_SUBJECTS['1st Proff'][0]);
    setIsAddVideoModalOpen(true);
  };

  const openEditVideoModal = (vid: YouTubeMedia) => {
    setEditingVideo(vid);
    const c = (vid.course as AdminCourseType) || '1st Proff';
    setVideoModalCourse(c);
    setVideoModalSubject(vid.subject || ADMIN_COURSE_SUBJECTS[c]?.[0] || 'Samhita Adhyayan 1');
    setIsAddVideoModalOpen(true);
  };

  const openAddDriveModal = () => {
    setEditingDrive(null);
    setDriveModalCourse('1st Proff');
    setDriveModalSubject(ADMIN_COURSE_SUBJECTS['1st Proff'][0]);
    setIsAddDriveModalOpen(true);
  };

  const openEditDriveModal = (res: DriveResource) => {
    setEditingDrive(res);
    const c = (res.course as AdminCourseType) || '1st Proff';
    setDriveModalCourse(c);
    setDriveModalSubject(res.subject || ADMIN_COURSE_SUBJECTS[c]?.[0] || 'Samhita Adhyayan 1');
    setIsAddDriveModalOpen(true);
  };

  const openAddTestModal = () => {
    setEditingTest(null);
    setTestModalCourse('1st Proff');
    setTestModalSubject(ADMIN_COURSE_SUBJECTS['1st Proff'][0]);
    setIsAddTestModalOpen(true);
  };

  const openEditTestModal = (test: AdminTestResource) => {
    setEditingTest(test);
    const c = (test.course as AdminCourseType) || '1st Proff';
    setTestModalCourse(c);
    setTestModalSubject(test.subject || ADMIN_COURSE_SUBJECTS[c]?.[0] || 'Samhita Adhyayan 1');
    setIsAddTestModalOpen(true);
  };

  // Course Update Handlers
  const handleUpdateCourseData = (courseId: string, updates: Partial<CourseDetail>) => {
    updateCourseConfig(courseId, updates);
    setCourses(getCoursesConfig());
    setEditingCourseId(null);
    showToast(`Course details for ${courseId} updated successfully.`);
  };

  // Admin Password Change
  const handleChangeAdminPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityStatusMsg(null);
    if (!newAdminPassInput || newAdminPassInput.length < 6) {
      setSecurityStatusMsg({ type: 'error', text: 'New password must be at least 6 characters.' });
      return;
    }
    if (newAdminPassInput !== confirmAdminPassInput) {
      setSecurityStatusMsg({ type: 'error', text: 'Passwords do not match.' });
      return;
    }
    setAdminPassword(newAdminPassInput);
    setCurrentAdminPass(newAdminPassInput);
    setNewAdminPassInput('');
    setConfirmAdminPassInput('');
    setSecurityStatusMsg({ type: 'success', text: 'Admin Master Password has been changed successfully.' });
  };

  // Test send recovery email
  const handleSendRecoveryEmailTest = async () => {
    setIsSendingRecoveryEmail(true);
    setSecurityStatusMsg(null);
    try {
      const res = await fetch('/api/send-forgot-password-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'ayurveez@gmail.com' }),
      });
      const data = await res.json();
      if (res.ok) {
        setSecurityStatusMsg({
          type: 'success',
          text: `Recovery test dispatched successfully from ayurveez@gmail.com to rk867000@gmail.com.`,
        });
      } else {
        throw new Error(data.message || 'Failed to dispatch recovery test');
      }
    } catch (err: any) {
      setSecurityStatusMsg({ type: 'error', text: err.message || 'Recovery email dispatch failed.' });
    } finally {
      setIsSendingRecoveryEmail(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f5ef] text-stone-900 flex flex-col font-sans">
      {/* Top Admin Navigation Bar */}
      <header className="bg-[#143d2b] text-white border-b border-[#0e2c1f] sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo and Admin Badge */}
            <div className="flex items-center gap-3">
              <div 
                onClick={onNavigateHome}
                className="w-10 h-10 rounded-xl bg-amber-400 text-[#143d2b] font-black flex items-center justify-center text-lg shadow-sm cursor-pointer hover:scale-105 transition-transform"
                title="Go to Homepage"
              >
                आयु
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-amber-300 tracking-tight">AYURVEEZ</span>
                  <span className="px-2 py-0.5 rounded-full bg-red-600/90 text-white text-[10px] font-black uppercase tracking-wider shadow-2xs">
                    Admin Portal
                  </span>
                </div>
                <div className="text-[11px] text-emerald-200 flex items-center gap-2">
                  <span>Authorized Master: {ADMIN_CONFIG.email}</span>
                </div>
              </div>
            </div>

            {/* Live Telemetry Pill & Quick Actions */}
            <div className="flex items-center gap-3">
              {/* Live Users Counter */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/30 border border-emerald-500/30 backdrop-blur-xs text-xs">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-emerald-300 font-bold">{liveVisitors}</span>
                <span className="text-stone-300 text-[11px]">Live Users Online</span>
              </div>

              {/* Homepage Link */}
              <button
                id="admin-view-site-btn"
                onClick={onNavigateHome}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 text-stone-200 hover:text-white border border-emerald-700/50 text-xs font-bold transition-colors cursor-pointer hidden md:flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5 text-amber-300" />
                <span>View Live Site</span>
              </button>

              {/* Logout Button */}
              <button
                id="admin-logout-btn"
                onClick={onLogoutAdmin}
                className="px-3.5 py-1.5 rounded-xl bg-red-900/80 hover:bg-red-800 text-white border border-red-700/50 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-2.5 pt-1 no-scrollbar border-t border-emerald-800/40">
            <button
              id="admin-tab-overview"
              onClick={() => setActiveTab('overview')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-amber-400 text-stone-950 shadow-xs'
                  : 'text-emerald-100 hover:bg-emerald-900/40 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Overview & Telemetry</span>
            </button>

            <button
              id="admin-tab-users"
              onClick={() => setActiveTab('users')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'users'
                  ? 'bg-amber-400 text-stone-950 shadow-xs'
                  : 'text-emerald-100 hover:bg-emerald-900/40 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Registered Students ({users.length})</span>
            </button>

            <button
              id="admin-tab-courses"
              onClick={() => setActiveTab('courses')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'courses'
                  ? 'bg-amber-400 text-stone-950 shadow-xs'
                  : 'text-emerald-100 hover:bg-emerald-900/40 hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Manage Courses & Batches</span>
            </button>

            <button
              id="admin-tab-videos"
              onClick={() => setActiveTab('videos')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'videos'
                  ? 'bg-amber-400 text-stone-950 shadow-xs'
                  : 'text-emerald-100 hover:bg-emerald-900/40 hover:text-white'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>YouTube Videos & Reels ({videos.length})</span>
            </button>

            <button
              id="admin-tab-drive"
              onClick={() => setActiveTab('drive')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'drive'
                  ? 'bg-amber-400 text-stone-950 shadow-xs'
                  : 'text-emerald-100 hover:bg-emerald-900/40 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Google Drive Notes ({driveResources.length})</span>
            </button>

            <button
              id="admin-tab-tests"
              onClick={() => setActiveTab('tests')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'tests'
                  ? 'bg-amber-400 text-stone-950 shadow-xs'
                  : 'text-emerald-100 hover:bg-emerald-900/40 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Mock Tests ({adminTests.length})</span>
            </button>

            <button
              id="admin-tab-forms"
              onClick={() => setActiveTab('forms')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'forms'
                  ? 'bg-amber-400 text-stone-950 shadow-xs'
                  : 'text-emerald-100 hover:bg-emerald-900/40 hover:text-white'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>External Forms & Links ({forms.length})</span>
            </button>

            <button
              id="admin-tab-security"
              onClick={() => setActiveTab('security')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'security'
                  ? 'bg-amber-400 text-stone-950 shadow-xs'
                  : 'text-emerald-100 hover:bg-emerald-900/40 hover:text-white'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Security & Password</span>
            </button>
          </div>
        </div>
      </header>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1b4332] text-amber-300 px-4 py-3 rounded-xl shadow-xl border border-amber-400/40 flex items-center gap-2.5 text-xs font-bold animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ======================================================== */}
        {/* TAB 1: OVERVIEW & TELEMETRY */}
        {/* ======================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-[#1b4332] via-[#2d6a4f] to-[#1b4332] rounded-3xl p-6 sm:p-8 text-white shadow-sm border border-[#2d6a4f] relative overflow-hidden">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-black uppercase mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ayurveez Master Control Hub</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                  Welcome to Ayurveez Administrator Console
                </h1>
                <p className="text-emerald-100 text-sm mt-2 max-w-3xl leading-relaxed">
                  Real-time administration portal to manage enrolled students, monitor live active portal traffic, update video lectures and reels, link Google Drive study binders, configure registration forms, and maintain complete course records.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setActiveTab('users')}
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-black transition-transform active:scale-95 shadow-sm inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Users className="w-4 h-4" />
                    <span>Manage All Students</span>
                  </button>
                  <button
                    onClick={openAddVideoModal}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold transition-colors inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Video className="w-4 h-4 text-amber-300" />
                    <span>Upload YouTube Video</span>
                  </button>
                  <button
                    onClick={openAddDriveModal}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold transition-colors inline-flex items-center gap-2 cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 text-amber-300" />
                    <span>Attach Drive Notes</span>
                  </button>
                  <button
                    onClick={openAddTestModal}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold transition-colors inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Award className="w-4 h-4 text-amber-300" />
                    <span>Upload Mock Test</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Card 1: Registered Users */}
              <div 
                onClick={() => setActiveTab('users')}
                className="bg-white rounded-2xl p-5 border border-[#e5ded0] hover:border-[#2d6a4f] shadow-2xs hover:shadow-sm transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Registered Students</span>
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-[#1b4332] group-hover:bg-[#1b4332] group-hover:text-white transition-colors">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-3xl font-black text-stone-900">{users.length}</div>
                  <div className="text-xs text-stone-500 mt-1 flex items-center gap-1.5">
                    <span className="text-emerald-700 font-bold">100% verified</span> across all batches
                  </div>
                </div>
              </div>

              {/* Card 2: Live Online Users */}
              <div className="bg-white rounded-2xl p-5 border border-[#e5ded0] shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Currently Live Online</span>
                  <div className="p-2.5 rounded-xl bg-amber-50 text-amber-800">
                    <Radio className="w-5 h-5 animate-pulse text-amber-600" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-3xl font-black text-amber-700 flex items-center gap-2">
                    <span>{liveVisitors}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold">Active now</span>
                  </div>
                  <div className="text-xs text-stone-500 mt-1">Real-time portal sessions</div>
                </div>
              </div>

              {/* Card 3: YouTube Videos */}
              <div 
                onClick={() => setActiveTab('videos')}
                className="bg-white rounded-2xl p-5 border border-[#e5ded0] hover:border-red-400 shadow-2xs hover:shadow-sm transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">YouTube Lectures & Reels</span>
                  <div className="p-2.5 rounded-xl bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <Video className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-3xl font-black text-stone-900">{videos.length}</div>
                  <div className="text-xs text-stone-500 mt-1">Active on Homepage Hub</div>
                </div>
              </div>

              {/* Card 4: Drive Notes */}
              <div 
                onClick={() => setActiveTab('drive')}
                className="bg-white rounded-2xl p-5 border border-[#e5ded0] hover:border-teal-500 shadow-2xs hover:shadow-sm transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Google Drive Resources</span>
                  <div className="p-2.5 rounded-xl bg-teal-50 text-teal-800 group-hover:bg-teal-800 group-hover:text-white transition-colors">
                    <BookOpen className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-3xl font-black text-stone-900">{driveResources.length}</div>
                  <div className="text-xs text-stone-500 mt-1">Direct PDF / Notes binders</div>
                </div>
              </div>
            </div>

            {/* Course Breakdown & Enrolled Statistics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* BAMS Breakdown */}
              <div className="bg-white rounded-2xl p-6 border border-[#e2dacf] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-[#1b4332] text-xs font-black uppercase">
                      BAMS University
                    </span>
                    <GraduationCap className="w-5 h-5 text-[#2d6a4f]" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900">BAMS University Prep Batch</h3>
                  <p className="text-xs text-stone-500 mt-1">1st, 2nd & 3rd Professional NCISM Syllabus</p>
                </div>
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-2xl font-black text-stone-900">{bamsUsersCount}</span>
                  <span className="text-xs font-semibold text-stone-500">Students registered</span>
                </div>
              </div>

              {/* AIAPGET Breakdown */}
              <div className="bg-white rounded-2xl p-6 border border-[#e2dacf] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 text-xs font-black uppercase">
                      AIAPGET PG Entrance
                    </span>
                    <Award className="w-5 h-5 text-amber-700" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900">AIAPGET All-India PG Batch</h3>
                  <p className="text-xs text-stone-500 mt-1">Samhita MCQs, NTA Standard Test Series</p>
                </div>
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-2xl font-black text-stone-900">{aiapgetUsersCount}</span>
                  <span className="text-xs font-semibold text-stone-500">Students registered</span>
                </div>
              </div>

              {/* AYUSH MO Breakdown */}
              <div className="bg-white rounded-2xl p-6 border border-[#e2dacf] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-lg bg-teal-100 text-teal-900 text-xs font-black uppercase">
                      AYUSH Medical Officer
                    </span>
                    <ShieldCheck className="w-5 h-5 text-teal-700" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900">State PSC & UPSC MO Batch</h3>
                  <p className="text-xs text-stone-500 mt-1">Govt Medical Officer Exam Papers & OPD protocols</p>
                </div>
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-2xl font-black text-stone-900">{ayushMoUsersCount}</span>
                  <span className="text-xs font-semibold text-stone-500">Students registered</span>
                </div>
              </div>
            </div>

            {/* Quick Security Status */}
            <div className="bg-[#f2efe7] rounded-2xl p-5 border border-[#dfd7c8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1b4332] text-amber-300 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-stone-900">Administrator Recovery Destination Active</div>
                  <div className="text-xs text-stone-600">
                    Recovery emails dispatch automatically from <strong className="text-stone-900">ayurveez@gmail.com</strong> to <strong className="text-stone-900">rk867000@gmail.com</strong>.
                  </div>
                </div>
              </div>

              <button
                onClick={handleSendRecoveryEmailTest}
                disabled={isSendingRecoveryEmail}
                className="px-3.5 py-2 rounded-xl bg-white border border-[#cfc6b7] hover:bg-stone-50 text-stone-800 text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-2xs"
              >
                <Send className="w-3.5 h-3.5 text-[#1b4332]" />
                <span>{isSendingRecoveryEmail ? 'Dispatching...' : 'Test Recovery Email'}</span>
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: REGISTERED STUDENTS MANAGEMENT */}
        {/* ======================================================== */}
        {activeTab === 'users' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Live Firebase Cloud Sync Status Card */}
            <div className="bg-gradient-to-r from-emerald-950 via-[#143d2b] to-[#1b4332] text-white p-4.5 rounded-2xl border border-emerald-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
                  <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase text-amber-300 tracking-wide">Firebase Firestore Cloud Database</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 text-[10px] font-bold border border-emerald-500/50">
                      Live Real-Time Sync
                    </span>
                  </div>
                  <p className="text-xs text-stone-200 mt-0.5">
                    Displaying real registered student profiles, authentic phone/WhatsApp numbers, colleges, and test records saved in Google Cloud Firestore.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                <div className="text-right hidden sm:block">
                  <div className="text-xs font-bold text-emerald-300">{firestoreUsersCount} Real Cloud Users</div>
                  <div className="text-[10px] text-stone-300">Synced: {lastSyncedAt.toLocaleTimeString()}</div>
                </div>
                <button
                  id="admin-btn-sync-firestore"
                  type="button"
                  onClick={handleManualSyncFirestore}
                  disabled={firestoreLoading}
                  className="px-3.5 py-2 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 text-amber-300 text-xs font-bold border border-emerald-600 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  title="Re-fetch all registered users directly from Firebase Cloud Firestore"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${firestoreLoading ? 'animate-spin' : ''}`} />
                  <span>{firestoreLoading ? 'Syncing...' : 'Sync Firestore'}</span>
                </button>
              </div>
            </div>

            {/* Action & Search Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4.5 rounded-2xl border border-[#e2dacf] shadow-2xs">
              <div className="flex flex-1 flex-wrap items-center gap-2.5">
                <div className="relative flex-1 min-w-[200px] max-w-md">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={userSearchQuery}
                    onChange={(e) => setUserSearchQuery(e.target.value)}
                    placeholder="Search by student name, email, phone, college..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#faf9f5] border border-[#d8d0c2] text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1b4332]"
                  />
                  {userSearchQuery && (
                    <button
                      onClick={() => setUserSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Course Filter */}
                <select
                  value={selectedCourseFilter}
                  onChange={(e) => setSelectedCourseFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#faf9f5] border border-[#d8d0c2] text-xs font-semibold text-stone-700 focus:outline-none cursor-pointer"
                >
                  <option value="All">All Courses</option>
                  <option value="BAMS">BAMS University</option>
                  <option value="AIAPGET">AIAPGET PG</option>
                  <option value="AYUSH MEDICAL OFFICER">AYUSH Medical Officer</option>
                </select>

                {/* Status Filter */}
                <select
                  value={selectedStatusFilter}
                  onChange={(e) => setSelectedStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#faf9f5] border border-[#d8d0c2] text-xs font-semibold text-stone-700 focus:outline-none cursor-pointer hidden md:block"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active Only</option>
                  <option value="Locked">Locked / Suspended</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  id="admin-export-users-btn"
                  onClick={handleExportUsersCsv}
                  className="px-3 py-2 rounded-xl bg-[#faf9f5] border border-[#d8d0c2] hover:bg-stone-100 text-stone-700 text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Export complete student database to CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>

                <button
                  id="admin-add-new-user-btn"
                  onClick={() => setIsAddUserModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-amber-300 text-xs font-black inline-flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Register Student</span>
                </button>
              </div>
            </div>

            {/* Students Table */}
            <div className="bg-white rounded-2xl border border-[#e2dacf] shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#f8f6f0] border-b border-[#e5ded0] text-stone-600 font-bold uppercase tracking-wider text-[10px]">
                      <th className="py-3.5 px-4">Student Profile</th>
                      <th className="py-3.5 px-4">Contact Info & Phone</th>
                      <th className="py-3.5 px-4">Target Course</th>
                      <th className="py-3.5 px-4">College / University</th>
                      <th className="py-3.5 px-4">Source / Auth</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-10 text-center text-stone-500">
                          No registered students match your search filter.
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((student) => {
                        const isReal = (student as any).isRealFirestore;
                        return (
                          <tr 
                            key={student.uid}
                            className={`hover:bg-[#faf9f5] transition-colors ${
                              student.isLocked ? 'bg-red-50/40' : ''
                            }`}
                          >
                            {/* Student Profile */}
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-2.5">
                                <div className={`w-8 h-8 rounded-lg font-bold flex items-center justify-center text-xs shrink-0 ${
                                  student.isLocked ? 'bg-red-200 text-red-900' : isReal ? 'bg-emerald-700 text-white' : 'bg-[#1b4332] text-amber-300'
                                }`}>
                                  {student.name ? student.name.charAt(0).toUpperCase() : 'S'}
                                </div>
                                <div>
                                  <div className="font-bold text-stone-900 flex items-center gap-1.5">
                                    <span>{student.name}</span>
                                    {isReal && (
                                      <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase tracking-tight">
                                        Cloud
                                      </span>
                                    )}
                                    {student.isLocked && (
                                      <span className="px-1.5 py-0.2 rounded bg-red-100 text-red-700 text-[9px] font-black uppercase">
                                        Locked
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-[10px] text-stone-400">
                                    {student.age ? `${student.age} yrs • ` : ''}{student.gender || 'Student'}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Contact Info */}
                            <td className="py-3.5 px-4">
                              <div className="text-stone-800 font-medium flex items-center gap-1">
                                <Mail className="w-3 h-3 text-stone-400" />
                                <span className="truncate max-w-[150px]">{student.email}</span>
                              </div>
                              {student.mobileNumber && (
                                <div className="text-[11px] text-stone-600 flex items-center gap-1 mt-0.5 font-mono">
                                  <Phone className="w-3 h-3 text-emerald-600" />
                                  <span>{student.mobileNumber}</span>
                                </div>
                              )}
                              {student.whatsappNumber && student.whatsappNumber !== student.mobileNumber && (
                                <div className="text-[10px] text-emerald-700 flex items-center gap-1">
                                  <span>WA: {student.whatsappNumber}</span>
                                </div>
                              )}
                            </td>

                            {/* Target Course */}
                            <td className="py-3.5 px-4">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                student.course === 'BAMS'
                                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                  : student.course === 'AIAPGET'
                                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                  : 'bg-teal-100 text-teal-900 border border-teal-300'
                              }`}>
                                {student.course}
                              </span>
                            </td>

                            {/* College */}
                            <td className="py-3.5 px-4 max-w-[200px]">
                              <div className="text-stone-700 font-medium truncate" title={student.collegeName || 'N/A'}>
                                {student.collegeName || 'Self Preparation / Completed'}
                              </div>
                              <div className="text-[10px] text-stone-400">
                                {student.isInCollege ? 'Current Scholar' : 'Graduate / Doctor'}
                              </div>
                            </td>

                            {/* Source / Auth Provider */}
                            <td className="py-3.5 px-4">
                              <div className="text-stone-700 font-medium flex items-center gap-1">
                                <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 text-[10px] font-bold">
                                  {student.authProvider === 'google' ? 'Google Sign-In' : 'Email OTP'}
                                </span>
                              </div>
                              <div className="text-[10px] text-stone-400 mt-0.5">
                                {student.createdAt ? new Date(student.createdAt).toLocaleDateString() : 'Active'}
                              </div>
                            </td>

                            {/* Status Badge */}
                            <td className="py-3.5 px-4">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                                student.isLocked 
                                  ? 'bg-red-100 text-red-800' 
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}>
                                {student.isLocked ? (
                                  <>
                                    <Lock className="w-2.5 h-2.5 text-red-600" />
                                    <span>Suspended</span>
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle className="w-2.5 h-2.5 text-emerald-600" />
                                    <span>Active</span>
                                  </>
                                )}
                              </span>
                            </td>

                            {/* Action Buttons */}
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                {/* View Full Profile Details */}
                                <button
                                  id={`view-user-${student.uid}`}
                                  onClick={() => setSelectedStudentDetail(student)}
                                  className="p-1.5 rounded-lg text-emerald-700 hover:bg-emerald-50 transition-colors"
                                  title="View Full Student Registration Card & Test History"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>

                                {/* Edit User */}
                                <button
                                  id={`edit-user-${student.uid}`}
                                  onClick={() => setEditingUser(student)}
                                  className="p-1.5 rounded-lg text-stone-600 hover:text-[#1b4332] hover:bg-stone-100 transition-colors"
                                  title="Edit Student Profile"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>

                                {/* Lock / Unlock User */}
                                <button
                                  id={`lock-user-${student.uid}`}
                                  onClick={() => handleToggleLockUser(student.uid, student.name)}
                                  className={`p-1.5 rounded-lg transition-colors ${
                                    student.isLocked
                                      ? 'text-emerald-700 hover:bg-emerald-50'
                                      : 'text-amber-700 hover:bg-amber-50'
                                  }`}
                                  title={student.isLocked ? 'Unlock Student Access' : 'Lock / Suspend Student Access'}
                                >
                                  {student.isLocked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                                </button>

                                {/* Delete User */}
                                <button
                                  id={`delete-user-${student.uid}`}
                                  onClick={() => handleDeleteUser(student.uid, student.name)}
                                  className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                  title="Permanently Delete Student"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="p-3 bg-[#f8f6f0] border-t border-[#e5ded0] text-stone-500 text-xs flex items-center justify-between">
                <span>Showing {filteredUsers.length} of {users.length} enrolled student accounts ({firestoreUsersCount} in Cloud)</span>
                <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Live Firebase Firestore Cloud Sync
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: MANAGE COURSES, PROFFS & SUBJECT HIERARCHY */}
        {/* ======================================================== */}
        {activeTab === 'courses' && (
          <AdminCoursesManager />
        )}

        {/* ======================================================== */}
        {/* TAB 4: YOUTUBE VIDEOS & REELS HUB */}
        {/* ======================================================== */}
        {activeTab === 'videos' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#e2dacf] shadow-2xs">
              <div>
                <h2 className="text-xl font-bold text-stone-900">Manage Homepage YouTube Videos & Reels</h2>
                <p className="text-xs text-stone-500 mt-1">
                  Upload YouTube video or shorts/reels links. They will instantly appear in the "Ayurveez Academic Spotlights & Video Hub" section.
                </p>
              </div>

              <button
                id="admin-add-video-btn"
                onClick={openAddVideoModal}
                className="px-4 py-2 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-amber-300 text-xs font-black inline-flex items-center gap-1.5 transition-all shadow-xs cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Upload New Video / Reel</span>
              </button>
            </div>

            {/* Video Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((vid) => {
                const ytId = vid.youtubeId || extractYouTubeId(vid.videoUrl);
                return (
                  <div 
                    key={vid.id}
                    className="bg-white rounded-2xl border border-[#e2dacf] overflow-hidden shadow-2xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-video bg-stone-900">
                        <img
                          src={vid.thumbnailUrl || `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`}
                          alt={vid.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-bold">
                          {vid.type === 'reel' ? 'Short Reel' : 'Lecture'}
                        </div>
                        {vid.duration && (
                          <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-amber-300 text-[10px] font-bold">
                            {vid.duration}
                          </div>
                        )}
                      </div>

                      <div className="p-4">
                        <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                          {vid.course && (
                            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black uppercase">
                              {vid.course}
                            </span>
                          )}
                          {vid.subject && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                              {vid.subject}
                            </span>
                          )}
                          <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">{vid.category}</span>
                        </div>
                        <h4 className="text-sm font-bold text-stone-900 mt-1 line-clamp-2">{vid.title}</h4>
                        <p className="text-xs text-stone-500 mt-1.5 line-clamp-2">{vid.description}</p>
                      </div>
                    </div>

                    <div className="p-4 pt-0 flex items-center justify-between border-t border-stone-100 mt-2">
                      <a
                        href={vid.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-[#1b4332] hover:underline inline-flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Watch Link</span>
                      </a>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => openEditVideoModal(vid)}
                          className="p-1.5 rounded-lg text-stone-600 hover:text-[#1b4332] hover:bg-stone-100 cursor-pointer"
                          title="Edit Video Metadata"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteVideo(vid.id, vid.title)}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                          title="Delete Video"
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

        {/* ======================================================== */}
        {/* TAB 5: GOOGLE DRIVE RESOURCES */}
        {/* ======================================================== */}
        {activeTab === 'drive' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#e2dacf] shadow-2xs">
              <div>
                <h2 className="text-xl font-bold text-stone-900">Manage Google Drive Study Notes & Folders</h2>
                <p className="text-xs text-stone-500 mt-1">
                  Attach official Google Drive shared folders with PDF notes, question papers, and Samhita charts for student access.
                </p>
              </div>

              <button
                onClick={openAddDriveModal}
                className="px-4 py-2 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-amber-300 text-xs font-black inline-flex items-center gap-1.5 transition-all shadow-xs cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Attach Drive Folder</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {driveResources.map((res) => (
                <div 
                  key={res.id}
                  className="bg-white rounded-2xl border border-[#e2dacf] p-5 shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
                          {res.course}
                        </span>
                        {res.subject && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-bold">
                            {res.subject}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-stone-400 font-medium">{res.folderCategory}</span>
                    </div>

                    <h4 className="text-base font-bold text-stone-900">{res.title}</h4>
                    <p className="text-xs text-stone-600 mt-1.5">{res.description}</p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                    <a
                      href={res.driveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#1b4332] hover:underline inline-flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open Drive Link</span>
                    </a>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => openEditDriveModal(res)}
                        className="p-1.5 rounded-lg text-stone-600 hover:text-[#1b4332] hover:bg-stone-100 cursor-pointer"
                        title="Edit Drive Link"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteDriveResource(res.id, res.title)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                        title="Delete Drive Link"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB: ONLINE MOCK TESTS & QUESTION PAPERS */}
        {/* ======================================================== */}
        {activeTab === 'tests' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#e2dacf] shadow-2xs">
              <div>
                <h2 className="text-xl font-bold text-stone-900">Manage Online Mock Tests & Model Papers</h2>
                <p className="text-xs text-stone-500 mt-1">
                  Upload mock tests, model exam papers, and question sets mapped to 1st, 2nd, or 3rd Proff courses and subjects.
                </p>
              </div>

              <button
                onClick={openAddTestModal}
                className="px-4 py-2 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-amber-300 text-xs font-black inline-flex items-center gap-1.5 transition-all shadow-xs cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Upload New Mock Test</span>
              </button>
            </div>

            {adminTests.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#e2dacf] p-12 text-center">
                <Award className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <h4 className="text-base font-bold text-stone-700">No Mock Tests Uploaded Yet</h4>
                <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto">
                  Click the button above to upload a new mock test with YouTube / test link, course year (1st, 2nd, or 3rd Proff), and subject.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {adminTests.map((t) => (
                  <div 
                    key={t.id}
                    className="bg-white rounded-2xl border border-[#e2dacf] p-5 shadow-2xs flex flex-col justify-between hover:border-[#1b4332] transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black uppercase">
                          {t.course}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                          {t.subject}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-stone-900 line-clamp-2">{t.title}</h4>
                      {t.description && (
                        <p className="text-xs text-stone-600 mt-1.5 line-clamp-2">{t.description}</p>
                      )}

                      <div className="flex items-center gap-3 mt-3 text-xs text-stone-500">
                        <span>⏱️ {t.durationMinutes} mins</span>
                        <span>🎯 {t.totalMarks} Marks</span>
                        <span className="text-stone-300">•</span>
                        <span className="text-emerald-700 font-semibold">{t.difficulty}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                      <a
                        href={t.testUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-[#1b4332] hover:bg-[#2d6a4f] text-amber-300 text-xs font-bold inline-flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Open Test Link</span>
                      </a>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openEditTestModal(t)}
                          className="p-1.5 rounded-lg text-stone-600 hover:text-[#1b4332] hover:bg-stone-100 cursor-pointer"
                          title="Edit Mock Test"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteTest(t.id, t.title)}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                          title="Delete Mock Test"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 6: EXTERNAL FORMS & INQUIRIES */}
        {/* ======================================================== */}
        {activeTab === 'forms' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#e2dacf] shadow-2xs">
              <div>
                <h2 className="text-xl font-bold text-stone-900">Manage Google Forms & Enrollment Links</h2>
                <p className="text-xs text-stone-500 mt-1">
                  Connect Google Forms for Scholarship applications, BAMS Mentorship, and Doubt Submissions.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingForm(null);
                  setIsAddFormModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-amber-300 text-xs font-black inline-flex items-center gap-1.5 transition-all shadow-xs cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Link Google Form</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {forms.map((form) => (
                <div 
                  key={form.id}
                  className="bg-white rounded-2xl border border-[#e2dacf] p-5 shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-black uppercase">
                        {form.badge || 'Active Form'}
                      </span>
                      <span className="text-xs text-stone-400">{form.targetAudience}</span>
                    </div>

                    <h4 className="text-sm font-bold text-stone-900">{form.title}</h4>
                    <p className="text-xs text-stone-600 mt-1.5">{form.description}</p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                    <a
                      href={form.formUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-[#1b4332] hover:bg-[#2d6a4f] text-amber-300 text-xs font-bold inline-flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>{form.buttonText || 'Open Form'}</span>
                    </a>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setEditingForm(form);
                          setIsAddFormModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg text-stone-600 hover:text-[#1b4332] hover:bg-stone-100"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteForm(form.id)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 7: SECURITY & PASSWORD CONFIGURATION */}
        {/* ======================================================== */}
        {activeTab === 'security' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div className="bg-white p-6 rounded-2xl border border-[#e2dacf] shadow-2xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#1b4332] text-amber-300 flex items-center justify-center">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-stone-900">Admin Account & Credentials</h2>
                  <p className="text-xs text-stone-500">Security preferences for master administrator</p>
                </div>
              </div>

              {/* Status Message */}
              {securityStatusMsg && (
                <div className={`p-3.5 rounded-xl text-xs font-bold mb-5 flex items-center gap-2 ${
                  securityStatusMsg.type === 'success'
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-300'
                    : 'bg-red-50 text-red-900 border border-red-300'
                }`}>
                  {securityStatusMsg.type === 'success' ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
                  <span>{securityStatusMsg.text}</span>
                </div>
              )}

              {/* Master Credential Info */}
              <div className="bg-[#fbfaf6] p-4 rounded-xl border border-[#e5ded0] mb-6 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-stone-500 font-medium">Master Admin Email:</span>
                  <span className="font-mono font-bold text-stone-900">{ADMIN_CONFIG.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500 font-medium">Password Recovery Dispatch To:</span>
                  <span className="font-mono font-bold text-emerald-800">{ADMIN_CONFIG.recoveryEmail}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500 font-medium">Current Master Password:</span>
                  <span className="font-mono font-bold text-stone-900">{currentAdminPass}</span>
                </div>
              </div>

              {/* Change Password Form */}
              <form onSubmit={handleChangeAdminPassword} className="space-y-4">
                <h3 className="text-sm font-bold text-stone-800">Update Master Admin Password</h3>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">New Password</label>
                  <input
                    type="password"
                    value={newAdminPassInput}
                    onChange={(e) => setNewAdminPassInput(e.target.value)}
                    placeholder="Enter new password (min 6 characters)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf9f5] border border-[#d8d0c2] text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1b4332]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmAdminPassInput}
                    onChange={(e) => setConfirmAdminPassInput(e.target.value)}
                    placeholder="Re-enter new password"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf9f5] border border-[#d8d0c2] text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1b4332]"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-amber-300 text-xs font-black shadow-xs transition-colors cursor-pointer"
                  >
                    Save New Master Password
                  </button>

                  <button
                    type="button"
                    onClick={handleSendRecoveryEmailTest}
                    disabled={isSendingRecoveryEmail}
                    className="px-3.5 py-2 rounded-xl bg-white border border-[#cfc6b7] text-stone-700 text-xs font-bold hover:bg-stone-50 cursor-pointer"
                  >
                    {isSendingRecoveryEmail ? 'Sending...' : 'Test Reset OTP to rk867000@gmail.com'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* ======================================================== */}
      {/* MODAL: ADD / EDIT STUDENT */}
      {/* ======================================================== */}
      {(isAddUserModalOpen || editingUser) && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <h3 className="text-base font-bold text-stone-900">
                {editingUser ? `Edit Student: ${editingUser.name}` : 'Register New Student'}
              </h3>
              <button 
                onClick={() => {
                  setIsAddUserModalOpen(false);
                  setEditingUser(null);
                }}
                className="text-stone-400 hover:text-stone-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={editingUser ? handleSaveEditedUser : (e) => {
              const form = e.target as any;
              handleCreateNewUser(e, {
                name: form.studentName.value,
                email: form.studentEmail.value,
                mobileNumber: form.studentMobile.value,
                course: form.studentCourse.value,
                collegeName: form.studentCollege.value,
              });
            }} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Full Name</label>
                <input
                  name="studentName"
                  type="text"
                  required
                  defaultValue={editingUser?.name || ''}
                  onChange={(e) => editingUser && setEditingUser({ ...editingUser, name: e.target.value })}
                  placeholder="e.g. Dr. Vaidya Rohan"
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1b4332]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Email Address</label>
                  <input
                    name="studentEmail"
                    type="email"
                    required
                    defaultValue={editingUser?.email || ''}
                    onChange={(e) => editingUser && setEditingUser({ ...editingUser, email: e.target.value })}
                    placeholder="student@gmail.com"
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1b4332]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Mobile / WhatsApp</label>
                  <input
                    name="studentMobile"
                    type="tel"
                    required
                    defaultValue={editingUser?.mobileNumber || ''}
                    onChange={(e) => editingUser && setEditingUser({ ...editingUser, mobileNumber: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1b4332]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Course Batch</label>
                  <select
                    name="studentCourse"
                    defaultValue={editingUser?.course || 'AIAPGET'}
                    onChange={(e) => editingUser && setEditingUser({ ...editingUser, course: e.target.value as CourseType })}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs focus:bg-white focus:outline-none"
                  >
                    <option value="BAMS">BAMS University</option>
                    <option value="AIAPGET">AIAPGET PG Entrance</option>
                    <option value="AYUSH MEDICAL OFFICER">AYUSH Medical Officer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Account Status</label>
                  <select
                    defaultValue={editingUser?.isLocked ? 'Locked' : 'Active'}
                    onChange={(e) => editingUser && setEditingUser({ ...editingUser, isLocked: e.target.value === 'Locked' })}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs focus:bg-white focus:outline-none"
                  >
                    <option value="Active">Active (Granted Access)</option>
                    <option value="Locked">Locked (Suspended)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">College / University Name</label>
                <input
                  name="studentCollege"
                  type="text"
                  defaultValue={editingUser?.collegeName || ''}
                  onChange={(e) => editingUser && setEditingUser({ ...editingUser, collegeName: e.target.value })}
                  placeholder="e.g. National Institute of Ayurveda, Jaipur"
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1b4332]"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddUserModalOpen(false);
                    setEditingUser(null);
                  }}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1b4332] text-amber-300 text-xs font-bold hover:bg-[#2d6a4f]"
                >
                  {editingUser ? 'Save Changes' : 'Register Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: ADD / EDIT YOUTUBE VIDEO */}
      {/* ======================================================== */}
      {isAddVideoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <h3 className="text-base font-bold text-stone-900">
                {editingVideo ? 'Edit YouTube Video' : 'Upload YouTube Video or Reel'}
              </h3>
              <button 
                onClick={() => setIsAddVideoModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as any;
              handleSaveVideo({
                title: form.vidTitle.value,
                videoUrl: form.vidUrl.value,
                course: videoModalCourse,
                subject: videoModalSubject,
                category: videoModalSubject || form.vidCategory?.value || 'Ayurveda',
                type: form.vidType.value,
                duration: form.vidDuration.value || '10:00',
                description: form.vidDesc.value,
                isFeatured: form.vidFeatured.checked,
                driveLinkUrl: form.vidDrive.value || undefined,
                formLinkUrl: form.vidForm.value || undefined,
              });
            }} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">YouTube URL / Shorts URL *</label>
                <input
                  name="vidUrl"
                  type="url"
                  required
                  defaultValue={editingVideo?.videoUrl || ''}
                  placeholder="https://www.youtube.com/watch?v=... or https://youtube.com/shorts/..."
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1b4332]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Video Title *</label>
                <input
                  name="vidTitle"
                  type="text"
                  required
                  defaultValue={editingVideo?.title || ''}
                  placeholder="e.g. Charaka Samhita Sutrasthana Ch 1 High-Yield Lecture"
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1b4332]"
                />
              </div>

              {/* Course and Subject Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-amber-50/50 border border-amber-200/70 rounded-xl">
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">Select Course *</label>
                  <select
                    value={videoModalCourse}
                    onChange={(e) => {
                      const newCourse = e.target.value as AdminCourseType;
                      setVideoModalCourse(newCourse);
                      setVideoModalSubject(ADMIN_COURSE_SUBJECTS[newCourse]?.[0] || '');
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#1b4332]"
                  >
                    {ADMIN_COURSES_LIST.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">Select Subject *</label>
                  <select
                    value={videoModalSubject}
                    onChange={(e) => setVideoModalSubject(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#1b4332]"
                  >
                    {ADMIN_COURSE_SUBJECTS[videoModalCourse]?.map((subj) => (
                      <option key={subj} value={subj}>{subj}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Format</label>
                  <select
                    name="vidType"
                    defaultValue={editingVideo?.type || 'video'}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs focus:outline-none"
                  >
                    <option value="video">Full Video Lecture</option>
                    <option value="reel">60s Reel / Short</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Duration</label>
                  <input
                    name="vidDuration"
                    type="text"
                    defaultValue={editingVideo?.duration || '15:30'}
                    placeholder="e.g. 24:10"
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Description *</label>
                <textarea
                  name="vidDesc"
                  rows={2}
                  required
                  defaultValue={editingVideo?.description || ''}
                  placeholder="Summary of lecture points, key shlokas covered, references..."
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Attach Notes/Drive (Optional)</label>
                  <input
                    name="vidDrive"
                    type="url"
                    defaultValue={editingVideo?.driveLinkUrl || ''}
                    placeholder="https://drive.google.com/..."
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Attach Quiz/Form (Optional)</label>
                  <input
                    name="vidForm"
                    type="url"
                    defaultValue={editingVideo?.formLinkUrl || ''}
                    placeholder="https://forms.gle/..."
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  name="vidFeatured"
                  type="checkbox"
                  id="chk-featured"
                  defaultChecked={editingVideo ? editingVideo.isFeatured : true}
                  className="w-4 h-4 text-[#1b4332] rounded"
                />
                <label htmlFor="chk-featured" className="text-xs text-stone-700 font-semibold cursor-pointer">
                  Feature prominently on Academic Hub
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsAddVideoModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 hover:bg-stone-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1b4332] text-amber-300 text-xs font-bold hover:bg-[#2d6a4f] cursor-pointer"
                >
                  {editingVideo ? 'Save Video' : 'Publish Video'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: ADD / EDIT DRIVE RESOURCE / NOTES */}
      {/* ======================================================== */}
      {isAddDriveModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <h3 className="text-base font-bold text-stone-900">
                {editingDrive ? 'Edit Notes / Drive Link' : 'Upload Study Notes & Drive Link'}
              </h3>
              <button 
                onClick={() => setIsAddDriveModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as any;
              handleSaveDriveResource({
                title: form.driveTitle.value,
                driveUrl: form.driveUrl.value,
                course: driveModalCourse,
                subject: driveModalSubject,
                folderCategory: form.driveCategory?.value || driveModalSubject || 'Notes',
                fileType: form.driveFileType.value,
                description: form.driveDesc.value,
              });
            }} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Drive Link / Notes URL *</label>
                <input
                  name="driveUrl"
                  type="url"
                  required
                  defaultValue={editingDrive?.driveUrl || ''}
                  placeholder="https://drive.google.com/drive/folders/... or PDF link"
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#1b4332]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Notes / Document Title *</label>
                <input
                  name="driveTitle"
                  type="text"
                  required
                  defaultValue={editingDrive?.title || ''}
                  placeholder="e.g. Samhita Adhyayan 1 Complete Shloka Compendium"
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#1b4332]"
                />
              </div>

              {/* Course and Subject Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-amber-50/50 border border-amber-200/70 rounded-xl">
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">Select Course *</label>
                  <select
                    value={driveModalCourse}
                    onChange={(e) => {
                      const newCourse = e.target.value as AdminCourseType;
                      setDriveModalCourse(newCourse);
                      setDriveModalSubject(ADMIN_COURSE_SUBJECTS[newCourse]?.[0] || '');
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#1b4332]"
                  >
                    {ADMIN_COURSES_LIST.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">Select Subject *</label>
                  <select
                    value={driveModalSubject}
                    onChange={(e) => setDriveModalSubject(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#1b4332]"
                  >
                    {ADMIN_COURSE_SUBJECTS[driveModalCourse]?.map((subj) => (
                      <option key={subj} value={subj}>{subj}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">File Type</label>
                  <select
                    name="driveFileType"
                    defaultValue={editingDrive?.fileType || 'PDF'}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs"
                  >
                    <option value="PDF">PDF Document</option>
                    <option value="Folder">Drive Folder</option>
                    <option value="Spreadsheet">Excel / Sheets</option>
                    <option value="Slides">Slides / PPT</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Resource Category</label>
                  <select
                    name="driveCategory"
                    defaultValue={editingDrive?.folderCategory || 'Handwritten Notes'}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs"
                  >
                    <option value="Handwritten Notes">Handwritten Notes</option>
                    <option value="Question Banks">Question Banks</option>
                    <option value="Previous Year Papers">PYQs & Model Papers</option>
                    <option value="Samhita Flowcharts">Samhita Flowcharts</option>
                    <option value="Quick Revision">Quick Revision Cards</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Description *</label>
                <textarea
                  name="driveDesc"
                  rows={2}
                  required
                  defaultValue={editingDrive?.description || ''}
                  placeholder="Included chapters, diagrams, shlokas with Hindi/English meaning..."
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsAddDriveModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 hover:bg-stone-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1b4332] text-amber-300 text-xs font-bold hover:bg-[#2d6a4f] cursor-pointer"
                >
                  {editingDrive ? 'Save Changes' : 'Publish Notes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: ADD / EDIT MOCK TEST */}
      {/* ======================================================== */}
      {isAddTestModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <h3 className="text-base font-bold text-stone-900">
                {editingTest ? 'Edit Mock Test' : 'Upload / Create Mock Test'}
              </h3>
              <button 
                onClick={() => setIsAddTestModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as any;
              handleSaveTest({
                title: form.testTitle.value,
                testUrl: form.testUrl.value,
                course: testModalCourse,
                subject: testModalSubject,
                description: form.testDesc.value,
                durationMinutes: Number(form.testDuration.value) || 30,
                totalMarks: Number(form.testMarks.value) || 50,
                difficulty: form.testDifficulty.value || 'Moderate',
              });
            }} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Test URL / Google Form / Exam Link *</label>
                <input
                  name="testUrl"
                  type="url"
                  required
                  defaultValue={editingTest?.testUrl || ''}
                  placeholder="https://forms.gle/... or test portal link"
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#1b4332]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Mock Test Title *</label>
                <input
                  name="testTitle"
                  type="text"
                  required
                  defaultValue={editingTest?.title || ''}
                  placeholder="e.g. Rachana Sharir Bones & Joints Unit Test 1"
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#1b4332]"
                />
              </div>

              {/* Course and Subject Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-amber-50/50 border border-amber-200/70 rounded-xl">
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">Select Course *</label>
                  <select
                    value={testModalCourse}
                    onChange={(e) => {
                      const newCourse = e.target.value as AdminCourseType;
                      setTestModalCourse(newCourse);
                      setTestModalSubject(ADMIN_COURSE_SUBJECTS[newCourse]?.[0] || '');
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#1b4332]"
                  >
                    {ADMIN_COURSES_LIST.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">Select Subject *</label>
                  <select
                    value={testModalSubject}
                    onChange={(e) => setTestModalSubject(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#1b4332]"
                  >
                    {ADMIN_COURSE_SUBJECTS[testModalCourse]?.map((subj) => (
                      <option key={subj} value={subj}>{subj}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Duration (Min)</label>
                  <input
                    name="testDuration"
                    type="number"
                    min="5"
                    max="180"
                    defaultValue={editingTest?.durationMinutes || 30}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Total Marks</label>
                  <input
                    name="testMarks"
                    type="number"
                    min="10"
                    max="500"
                    defaultValue={editingTest?.totalMarks || 50}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Difficulty</label>
                  <select
                    name="testDifficulty"
                    defaultValue={editingTest?.difficulty || 'Moderate'}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Challenging">Challenging</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Description *</label>
                <textarea
                  name="testDesc"
                  rows={2}
                  required
                  defaultValue={editingTest?.description || ''}
                  placeholder="Syllabus portions tested, negative marking scheme, instructions..."
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsAddTestModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 hover:bg-stone-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1b4332] text-amber-300 text-xs font-bold hover:bg-[#2d6a4f] cursor-pointer"
                >
                  {editingTest ? 'Save Changes' : 'Publish Test'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: ADD / EDIT EXTERNAL FORM */}
      {/* ======================================================== */}
      {isAddFormModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <h3 className="text-base font-bold text-stone-900">
                {editingForm ? 'Edit Form Link' : 'Link Google Form / Inquiries'}
              </h3>
              <button 
                onClick={() => setIsAddFormModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as any;
              handleSaveForm({
                title: form.formTitle.value,
                formUrl: form.formUrl.value,
                description: form.formDesc.value,
                targetAudience: form.formAudience.value,
                badge: form.formBadge.value,
                buttonText: form.formBtnText.value || 'Apply / Open Form',
                isActive: true,
              });
            }} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Form Title</label>
                <input
                  name="formTitle"
                  type="text"
                  required
                  defaultValue={editingForm?.title || ''}
                  placeholder="e.g. Ayurveez All-India Scholarship 2026"
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#1b4332]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Google Form URL</label>
                <input
                  name="formUrl"
                  type="url"
                  required
                  defaultValue={editingForm?.formUrl || ''}
                  placeholder="https://forms.gle/..."
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#1b4332]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Badge Tag</label>
                  <input
                    name="formBadge"
                    type="text"
                    defaultValue={editingForm?.badge || 'Scholarship'}
                    placeholder="e.g. Scholarship Form"
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Button Text</label>
                  <input
                    name="formBtnText"
                    type="text"
                    defaultValue={editingForm?.buttonText || 'Fill Google Form'}
                    placeholder="e.g. Apply Now"
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Target Audience</label>
                <input
                  name="formAudience"
                  type="text"
                  defaultValue={editingForm?.targetAudience || 'All BAMS Scholars'}
                  placeholder="e.g. Interns & Final Year Aspirants"
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Description</label>
                <textarea
                  name="formDesc"
                  rows={2}
                  defaultValue={editingForm?.description || ''}
                  placeholder="Instructions for applicants..."
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsAddFormModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1b4332] text-amber-300 text-xs font-bold hover:bg-[#2d6a4f]"
                >
                  Save Form Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: EDIT COURSE CONFIGURATION */}
      {/* ======================================================== */}
      {editingCourseId && courses[editingCourseId] && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <h3 className="text-base font-bold text-stone-900">
                Edit Course: {courses[editingCourseId].name}
              </h3>
              <button 
                onClick={() => setEditingCourseId(null)}
                className="text-stone-400 hover:text-stone-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as any;
              handleUpdateCourseData(editingCourseId, {
                name: form.courseName.value,
                tagline: form.courseTagline.value,
                badge: form.courseBadge.value,
                description: form.courseDesc.value,
              });
            }} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Course Title</label>
                <input
                  name="courseName"
                  type="text"
                  defaultValue={courses[editingCourseId].name}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Tagline</label>
                <input
                  name="courseTagline"
                  type="text"
                  defaultValue={courses[editingCourseId].tagline}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Badge</label>
                <input
                  name="courseBadge"
                  type="text"
                  defaultValue={courses[editingCourseId].badge}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Description</label>
                <textarea
                  name="courseDesc"
                  rows={3}
                  defaultValue={courses[editingCourseId].description}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setEditingCourseId(null)}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1b4332] text-amber-300 text-xs font-bold hover:bg-[#2d6a4f]"
                >
                  Save Course Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: VIEW FULL STUDENT DOSSIER & TEST SCORES */}
      {/* ======================================================== */}
      {selectedStudentDetail && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#143d2b] text-amber-300 font-black flex items-center justify-center text-sm shadow-xs">
                  {selectedStudentDetail.name ? selectedStudentDetail.name.charAt(0).toUpperCase() : 'S'}
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900 flex items-center gap-1.5">
                    <span>{selectedStudentDetail.name}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                      Cloud Student
                    </span>
                  </h3>
                  <p className="text-[11px] text-stone-400 font-mono">UID: {selectedStudentDetail.uid}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedStudentDetail(null)}
                className="text-stone-400 hover:text-stone-600 p-1.5 rounded-lg hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 pt-4 text-xs">
              {/* Core Information Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <div className="text-[10px] font-bold text-stone-400 uppercase">Target Course</div>
                  <div className="font-bold text-stone-900 text-sm mt-0.5">{selectedStudentDetail.course}</div>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <div className="text-[10px] font-bold text-stone-400 uppercase">Age & Gender</div>
                  <div className="font-bold text-stone-900 text-sm mt-0.5">
                    {selectedStudentDetail.age ? `${selectedStudentDetail.age} yrs` : 'N/A'} • {selectedStudentDetail.gender || 'Not specified'}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="text-[10px] font-bold text-stone-400 uppercase">Contact Credentials</div>
                <div className="flex items-center justify-between text-stone-700 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-stone-400" />
                    <span>{selectedStudentDetail.email}</span>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                    {selectedStudentDetail.authProvider === 'google' ? 'Google Auth' : 'Email OTP'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-stone-700 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Mobile: {selectedStudentDetail.mobileNumber || 'Not provided'}</span>
                  </span>
                  {selectedStudentDetail.whatsappNumber && (
                    <span className="text-[11px] text-emerald-700 font-semibold">
                      WA: {selectedStudentDetail.whatsappNumber}
                    </span>
                  )}
                </div>
              </div>

              {/* Academic Details */}
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
                <div className="text-[10px] font-bold text-stone-400 uppercase">College / University Institution</div>
                <div className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                  <School className="w-4 h-4 text-[#1b4332]" />
                  <span>{selectedStudentDetail.collegeName || 'Self Study / Graduate Doctor'}</span>
                </div>
                <div className="text-stone-500 text-[11px]">
                  Status: {selectedStudentDetail.isInCollege ? 'Currently Enrolled Scholar' : 'Post-Graduate / Practitioner'}
                </div>
              </div>

              {/* Registration Timestamp */}
              <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#faf9f5] border border-stone-200 text-stone-600 text-[11px]">
                <span>Registered on Platform:</span>
                <span className="font-mono font-bold text-stone-900">
                  {selectedStudentDetail.createdAt ? new Date(selectedStudentDetail.createdAt).toLocaleString() : 'Active'}
                </span>
              </div>
            </div>

            <div className="pt-5 flex items-center justify-end gap-2 border-t border-stone-100 mt-4">
              <button
                type="button"
                onClick={() => setSelectedStudentDetail(null)}
                className="px-5 py-2.5 rounded-xl bg-[#143d2b] hover:bg-[#1b4332] text-amber-300 text-xs font-black cursor-pointer shadow-xs"
              >
                Close Student Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
