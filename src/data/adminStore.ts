import { UserProfile, YouTubeMedia, DriveResource, ExternalFormLink, AnnouncementItem, CourseDetail } from '../types';
import { COURSES_DATA } from './mockData';

// Master Admin Configuration
export const ADMIN_CONFIG = {
  email: 'ayurveez@gmail.com',
  defaultPassword: 'Founder@TheRsk',
  recoveryEmail: 'rk867000@gmail.com',
};

// Initial Seed of Registered Users: Strictly Real Registered Students Only (Zero by default)
const INITIAL_USERS: UserProfile[] = [];

// Standard Courses and Subjects for Admin Uploads (Videos, Notes, Tests)
export const ADMIN_COURSES_LIST = [
  '1st Proff',
  '2nd Proff',
  '3rd Proff',
  'AIAPGET',
  'AYUSH Medical Officer'
] as const;

export type AdminCourseType = typeof ADMIN_COURSES_LIST[number];

export const ADMIN_COURSE_SUBJECTS: Record<string, string[]> = {
  '1st Proff': [
    'Samhita Adhyayan 1 (Charaka & Ashtanga)',
    'Rachana Sharir (Anatomy)',
    'Kriya Sharir (Physiology)',
    'Padartha Vijnana & Ayurveda Itihas',
    'Sanskritam evam Ayurved Itihas'
  ],
  '2nd Proff': [
    'Dravyaguna Vijnana (Pharmacology)',
    'Roga Nidan evam Vikriti Vijnana (Pathology)',
    'Rasa Shastra evam Bhaishajya Kalpana',
    'Charaka Samhita Uttarardha',
    'Agada Tantra & Forensic Medicine',
    'Swasthavritta & Yoga (Preventive Medicine)'
  ],
  '3rd Proff': [
    'Kayachikitsa (Internal Medicine)',
    'Shalya Tantra (General Surgery)',
    'Shalakya Tantra (ENT & Ophthalmology)',
    'Prasuti Tantra & Stri Roga (Obstetrics & Gynae)',
    'Kaumarbhritya (Pediatrics)',
    'Panchakarma (Detox & Therapies)',
    'Research Methodology & Medical Statistics'
  ],
  'AIAPGET': [
    'Charaka Samhita',
    'Sushruta Samhita',
    'Ashtanga Hridaya & Sangraha',
    'Dravyaguna & Rasashastra',
    'Clinical Ayurveda & High-Yield',
    'General Medicine & Research'
  ],
  'AYUSH Medical Officer': [
    'Public Health & National Health Programs',
    'Pharmacology & Essential Ayurvedic Formulations',
    'Clinical Case Management & Protocols',
    'Previous Year Questions (PYQs) & State PSC'
  ]
};

// Initial Seed of YouTube Videos and Reels
const INITIAL_VIDEOS: YouTubeMedia[] = [
  {
    id: 'yt_vid_01',
    title: 'Charaka Samhita Sutrasthana Ch 1: Trisutra Ayurveda & Padartha Vijnana Decoding',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeId: 'dQw4w9WgXcQ',
    type: 'video',
    category: 'Charaka Samhita',
    duration: '42:15',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    description: 'Complete high-yield line-by-line Sanskrit anvaya, Chakrapani Tika insights, and 20 probable AIAPGET MCQs from Dirghanjivitiya Adhyaya.',
    dateAdded: '2026-08-18',
    isFeatured: true,
    viewsCount: '12.4K',
    driveLinkUrl: 'https://drive.google.com',
    formLinkUrl: 'https://forms.google.com',
  },
  {
    id: 'yt_vid_02',
    title: 'AIAPGET 2026 Top 50 Agrya Aushadha (Charaka Sutra 25) Memory Tricks & Mnemonics',
    videoUrl: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
    youtubeId: '3JZ_D3ELwOQ',
    type: 'reel',
    category: 'AIAPGET High-Yield',
    duration: '00:58',
    thumbnailUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
    description: 'Instant recall flash trick for 50 Agryas: Haritaki, Amalaki, Pippali, Chitraka, Rasna, Shringavera and their specific Rogaghnatva.',
    dateAdded: '2026-08-19',
    isFeatured: true,
    viewsCount: '28.9K',
  },
  {
    id: 'yt_vid_03',
    title: 'BAMS 2nd Prof Dravyaguna: 200+ Herbs Botanical Names, Families & Active Principles',
    videoUrl: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
    youtubeId: 'kJQP7kiw5Fk',
    type: 'video',
    category: 'Dravyaguna & Herbology',
    duration: '34:20',
    thumbnailUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
    description: 'Master Dravyaguna paper 1 & 2 taxonomy, classical paryayas, Rasapanchaka tables, and API quality standards.',
    dateAdded: '2026-08-15',
    isFeatured: true,
    viewsCount: '18.1K',
    driveLinkUrl: 'https://drive.google.com',
  },
  {
    id: 'yt_vid_04',
    title: 'AYUSH Medical Officer (UPPSC / BPSC) 100 Clinical MCQs Solved with Explanations',
    videoUrl: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ',
    youtubeId: 'fJ9rUzIMcZQ',
    type: 'video',
    category: 'AYUSH MO Updates',
    duration: '51:10',
    thumbnailUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
    description: 'Live step-by-step resolution of previous year Medical Officer question papers with national health programs & emergency protocols.',
    dateAdded: '2026-08-17',
    isFeatured: false,
    viewsCount: '9.6K',
  },
  {
    id: 'yt_vid_05',
    title: 'Sushruta Samhita Sharirasthana: 107 Marmas Quick Classification Reel',
    videoUrl: 'https://www.youtube.com/watch?v=L_LUpnjgPso',
    youtubeId: 'L_LUpnjgPso',
    type: 'reel',
    category: 'NCISM Syllabus',
    duration: '00:45',
    thumbnailUrl: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80',
    description: 'Sadhyopranahara, Kalantarapranahara, Vishalyaghna, Vaikalyakara, and Rujakara Marmas mapped with surface anatomy.',
    dateAdded: '2026-08-20',
    isFeatured: true,
    viewsCount: '34.2K',
  },
  {
    id: 'yt_vid_06',
    title: 'Kayachikitsa Differential Diagnosis: Jwara, Amavata & Sandhigatavata Clinical Cases',
    videoUrl: 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
    youtubeId: 'JGwWNGJdvx8',
    type: 'video',
    category: 'Medical Officer',
    duration: '28:40',
    thumbnailUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    description: 'Clinical OPD protocol for Ayurvedic doctors: investigative markers, Dosha-Dushya assessment, and prescription formulas.',
    dateAdded: '2026-08-16',
    isFeatured: false,
    viewsCount: '15.3K',
  },
  {
    id: 'yt_vid_07',
    title: 'AACCC AYUSH NEET PG 2026 Counseling, Seat Matrix & College Cutoffs Guide',
    videoUrl: 'https://www.youtube.com/watch?v=7wtfhZwyrcc',
    youtubeId: '7wtfhZwyrcc',
    type: 'video',
    category: 'Admission',
    duration: '21:15',
    thumbnailUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    description: 'Step-by-step guidance for All India AIAPGET MD/MS Ayurveda counseling, stipend details, bond criteria, and top national institutes.',
    dateAdded: '2026-08-19',
    isFeatured: true,
    viewsCount: '24.1K',
    driveLinkUrl: 'https://drive.google.com',
    formLinkUrl: 'https://forms.google.com',
  },
  {
    id: 'yt_vid_08',
    title: 'From BAMS Backlogs to AIR 14 AIAPGET Ranker: Unfiltered Journey & Daily Schedule',
    videoUrl: 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
    youtubeId: 'ysz5S6PUM-U',
    type: 'video',
    category: 'Motivation',
    duration: '18:50',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80',
    description: 'How to overcome exam fear, master Sanskrit Samhita recitation, maintain a 10-hour daily focus streak, and crack competitive exams.',
    dateAdded: '2026-08-17',
    isFeatured: true,
    viewsCount: '41.5K',
  },
  {
    id: 'yt_vid_09',
    title: 'Career Paths After BAMS: MD/MS, UPSC Medical Officer, Clinical Research & Global Practice',
    videoUrl: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ',
    youtubeId: 'fJ9rUzIMcZQ',
    type: 'video',
    category: 'Career',
    duration: '31:40',
    thumbnailUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    description: 'Complete breakdown of salary structures, private clinic setups, pharma consultancies, hospital management, and international licensing exams.',
    dateAdded: '2026-08-14',
    isFeatured: false,
    viewsCount: '32.8K',
  },
  {
    id: 'yt_vid_10',
    title: 'NCISM New BAMS Curriculum Updates, Competency-Based Electives & Exam Pattern 2026',
    videoUrl: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
    youtubeId: '3JZ_D3ELwOQ',
    type: 'video',
    category: 'News',
    duration: '15:20',
    thumbnailUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
    description: 'Latest official gazette notification on NCISM marks distribution, internal assessments, and practical clinical logbook guidelines.',
    dateAdded: '2026-08-20',
    isFeatured: true,
    viewsCount: '19.7K',
  },
  {
    id: 'yt_vid_11',
    title: 'BAMS 1st Prof Rachana Sharir: Heart & Embryology (Garbha Sharir) Quick Revision',
    videoUrl: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
    youtubeId: 'kJQP7kiw5Fk',
    type: 'video',
    category: 'BAMS',
    duration: '26:30',
    thumbnailUrl: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80',
    description: 'Crucial diagrams, Garbhotpadaka Bhavas, Masanumasika Vriddhi, and university viva questions.',
    dateAdded: '2026-08-16',
    isFeatured: false,
    viewsCount: '14.2K',
  },
  {
    id: 'yt_vid_12',
    title: 'AIAPGET 2026 Sharangadhara Samhita Kalpana Formulas 60s Reel',
    videoUrl: 'https://www.youtube.com/watch?v=L_LUpnjgPso',
    youtubeId: 'L_LUpnjgPso',
    type: 'reel',
    category: 'AIAPGET',
    duration: '00:52',
    thumbnailUrl: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=800&q=80',
    description: 'Kashaya, Svarasa, Hima, Phanta, and Asava-Arishta sandhana proportions with instant mnemonics.',
    dateAdded: '2026-08-19',
    isFeatured: true,
    viewsCount: '27.4K',
  }
];

// Initial Seed of Google Drive Resources
const INITIAL_DRIVE_RESOURCES: DriveResource[] = [
  {
    id: 'drv_res_01',
    title: 'NCISM BAMS 1st Prof Hand-Annotated Notes & Shloka Compendium',
    course: 'BAMS',
    folderCategory: '1st Prof Notes',
    driveUrl: 'https://drive.google.com/drive/folders/ayurveez_bams_1st_prof',
    description: 'Complete PDF chapter binders for Padartha Vijnan, Rachana Sharir, Kriya Sharir & Sanskrit Anvaya.',
    fileType: 'Folder',
    dateAdded: '2026-08-10',
    badge: '1st Prof NCISM',
  },
  {
    id: 'drv_res_02',
    title: 'BAMS 2nd Prof Dravyaguna Herbarium & Rasa Shastra Flowcharts',
    course: 'BAMS',
    folderCategory: '2nd Prof Notes',
    driveUrl: 'https://drive.google.com/drive/folders/ayurveez_bams_2nd_prof',
    description: 'High-definition color plates of 200+ medicinal plants, Bhasma preparation tables, and Roga Nidan charts.',
    fileType: 'PDF',
    dateAdded: '2026-08-12',
    badge: '2nd Prof Comprehensive',
  },
  {
    id: 'drv_res_03',
    title: 'AIAPGET 2026 Samhita-Wise MCQ Bank & Chakrapani Tika Notes',
    course: 'AIAPGET',
    folderCategory: 'AIAPGET Q-Banks',
    driveUrl: 'https://drive.google.com/drive/folders/ayurveez_aiapget_vault',
    description: '5,000+ Samhita MCQs, Laghuttrayi questions, Research Methodology modules, and All India Test solutions.',
    fileType: 'Folder',
    dateAdded: '2026-08-15',
    badge: 'AIAPGET Target AIR 100',
  },
  {
    id: 'drv_res_04',
    title: 'State PSC & UPSC AYUSH Medical Officer 10-Year Solved Papers',
    course: 'AYUSH MEDICAL OFFICER',
    folderCategory: 'AYUSH MO Pyqs',
    driveUrl: 'https://drive.google.com/drive/folders/ayurveez_ayush_mo_papers',
    description: 'UPPSC, MPPSC, BPSC, GPSC, OPSC, and UPSC Medical Officer authentic question papers with answer keys.',
    fileType: 'PDF',
    dateAdded: '2026-08-18',
    badge: 'Govt PSC Solved',
  }
];

// Initial Seed of External Google Forms
const INITIAL_FORMS: ExternalFormLink[] = [
  {
    id: 'form_01',
    title: 'Ayurveez All-India Scholarship & Early Bird Batch Registration',
    formUrl: 'https://forms.gle/ayurveezScholarship2026',
    description: 'Apply for 100% merit-based scholarship for AIAPGET & AYUSH Medical Officer intensive batch.',
    targetAudience: 'BAMS Interns & Final Year Students',
    badge: 'Scholarship Form',
    isActive: true,
    buttonText: 'Apply for Scholarship',
  },
  {
    id: 'form_02',
    title: 'BAMS University Distinction Masterclass & Mentorship Enrollment',
    formUrl: 'https://forms.gle/ayurveezBamsMentorship',
    description: 'Register for 1-on-1 personal mentorship with MD/MS rankers for university theory and clinical practicals.',
    targetAudience: '1st, 2nd, 3rd, and Final Prof Students',
    badge: 'Live Mentorship',
    isActive: true,
    buttonText: 'Register for Mentorship',
  },
  {
    id: 'form_03',
    title: 'Ayurveez Daily Grand Mock Test Feedback & Doubt Clearing Portal',
    formUrl: 'https://forms.gle/ayurveezDoubtSubmissions',
    description: 'Submit complex Samhita doubts, disputed question reviews, and request specific topic lectures.',
    targetAudience: 'All Enrolled Aspirants',
    badge: 'Doubt Submission',
    isActive: true,
    buttonText: 'Submit Your Doubt',
  }
];

// Storage keys
const STORAGE_KEYS = {
  USERS: 'ayurveez_admin_real_users_v3',
  VIDEOS: 'ayurveez_admin_videos_v2',
  DRIVE: 'ayurveez_admin_drive_v2',
  FORMS: 'ayurveez_admin_forms_v2',
  PASSWORD: 'ayurveez_admin_custom_password_v2',
  COURSES: 'ayurveez_admin_courses_v2',
  ANNOUNCEMENTS: 'ayurveez_admin_announcements_v2',
  TESTS: 'ayurveez_admin_tests_v2',
};

// Extract standard YouTube ID
export function extractYouTubeId(urlOrId: string): string {
  if (!urlOrId) return 'dQw4w9WgXcQ';
  const trimmed = urlOrId.trim();
  
  // Direct 11 char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  
  // youtube.com/watch?v=ID
  const watchMatch = trimmed.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/i);
  if (watchMatch && watchMatch[1]) {
    return watchMatch[1];
  }
  
  return trimmed;
}

// Generate high quality YouTube thumbnail URL
export function getYouTubeThumbnail(youtubeId: string, fallback?: string): string {
  if (!youtubeId) return fallback || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80';
  return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
}

// -------------------------------------------------------------
// USER MANAGEMENT METHODS
// -------------------------------------------------------------

export function getRegisteredUsers(): UserProfile[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.USERS);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        // Exclude any legacy mock seed items
        return parsed.filter(u => !u.uid?.startsWith('ayur_usr_0') && !u.email?.endsWith('.muhs@gmail.com'));
      }
    }
  } catch (_) {}
  return [];
}

export function saveRegisteredUsers(users: UserProfile[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  } catch (_) {}
}

export function addNewUser(user: Omit<UserProfile, 'uid'>): UserProfile {
  const users = getRegisteredUsers();
  const newUser: UserProfile = {
    ...user,
    uid: `ayur_usr_${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isLocked: false,
    role: user.role || 'student',
    lastActive: 'Just registered',
    mockAttemptsCount: 0,
  };
  const updated = [newUser, ...users];
  saveRegisteredUsers(updated);
  return newUser;
}

export function updateUser(uid: string, updates: Partial<UserProfile>): UserProfile | null {
  const users = getRegisteredUsers();
  const index = users.findIndex(u => u.uid === uid);
  if (index === -1) return null;
  
  const updatedUser: UserProfile = {
    ...users[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  users[index] = updatedUser;
  saveRegisteredUsers(users);
  return updatedUser;
}

export function toggleLockUser(uid: string): boolean {
  const users = getRegisteredUsers();
  const index = users.findIndex(u => u.uid === uid);
  if (index === -1) return false;
  
  users[index].isLocked = !users[index].isLocked;
  users[index].updatedAt = new Date().toISOString();
  saveRegisteredUsers(users);
  return users[index].isLocked || false;
}

export function deleteUser(uid: string): boolean {
  const users = getRegisteredUsers();
  const filtered = users.filter(u => u.uid !== uid);
  saveRegisteredUsers(filtered);
  return true;
}

// -------------------------------------------------------------
// YOUTUBE VIDEOS & REELS MANAGEMENT
// -------------------------------------------------------------

export function getYouTubeVideos(): YouTubeMedia[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.VIDEOS);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (_) {}
  return INITIAL_VIDEOS;
}

export function saveYouTubeVideos(videos: YouTubeMedia[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.VIDEOS, JSON.stringify(videos));
  } catch (_) {}
}

export function addYouTubeVideo(video: Omit<YouTubeMedia, 'id' | 'youtubeId'>): YouTubeMedia {
  const videos = getYouTubeVideos();
  const youtubeId = extractYouTubeId(video.videoUrl);
  const newVideo: YouTubeMedia = {
    ...video,
    id: `yt_vid_${Date.now()}`,
    youtubeId,
    thumbnailUrl: video.thumbnailUrl || getYouTubeThumbnail(youtubeId),
    dateAdded: new Date().toISOString().split('T')[0],
  };
  const updated = [newVideo, ...videos];
  saveYouTubeVideos(updated);
  return newVideo;
}

export function updateYouTubeVideo(id: string, updates: Partial<YouTubeMedia>): YouTubeMedia | null {
  const videos = getYouTubeVideos();
  const index = videos.findIndex(v => v.id === id);
  if (index === -1) return null;
  
  const current = videos[index];
  const youtubeId = updates.videoUrl ? extractYouTubeId(updates.videoUrl) : current.youtubeId;
  
  const updatedVideo: YouTubeMedia = {
    ...current,
    ...updates,
    youtubeId,
    thumbnailUrl: updates.thumbnailUrl || getYouTubeThumbnail(youtubeId, current.thumbnailUrl),
  };
  videos[index] = updatedVideo;
  saveYouTubeVideos(videos);
  return updatedVideo;
}

export function deleteYouTubeVideo(id: string): boolean {
  const videos = getYouTubeVideos();
  const filtered = videos.filter(v => v.id !== id);
  saveYouTubeVideos(filtered);
  return true;
}

// -------------------------------------------------------------
// GOOGLE DRIVE RESOURCES MANAGEMENT
// -------------------------------------------------------------

export function getDriveResources(): DriveResource[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.DRIVE);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (_) {}
  return INITIAL_DRIVE_RESOURCES;
}

export function saveDriveResources(resources: DriveResource[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.DRIVE, JSON.stringify(resources));
  } catch (_) {}
}

export function addDriveResource(resource: Omit<DriveResource, 'id'>): DriveResource {
  const resources = getDriveResources();
  const newResource: DriveResource = {
    ...resource,
    id: `drv_res_${Date.now()}`,
    dateAdded: new Date().toISOString().split('T')[0],
  };
  const updated = [newResource, ...resources];
  saveDriveResources(updated);
  return newResource;
}

export function updateDriveResource(id: string, updates: Partial<DriveResource>): DriveResource | null {
  const resources = getDriveResources();
  const index = resources.findIndex(r => r.id === id);
  if (index === -1) return null;
  
  const updatedResource = { ...resources[index], ...updates };
  resources[index] = updatedResource;
  saveDriveResources(resources);
  return updatedResource;
}

export function deleteDriveResource(id: string): boolean {
  const resources = getDriveResources();
  const filtered = resources.filter(r => r.id !== id);
  saveDriveResources(filtered);
  return true;
}

// -------------------------------------------------------------
// EXTERNAL GOOGLE FORMS MANAGEMENT
// -------------------------------------------------------------

export function getExternalForms(): ExternalFormLink[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.FORMS);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (_) {}
  return INITIAL_FORMS;
}

export function saveExternalForms(forms: ExternalFormLink[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.FORMS, JSON.stringify(forms));
  } catch (_) {}
}

export function addExternalForm(form: Omit<ExternalFormLink, 'id'>): ExternalFormLink {
  const forms = getExternalForms();
  const newForm: ExternalFormLink = {
    ...form,
    id: `form_${Date.now()}`,
  };
  const updated = [newForm, ...forms];
  saveExternalForms(updated);
  return newForm;
}

export function updateExternalForm(id: string, updates: Partial<ExternalFormLink>): ExternalFormLink | null {
  const forms = getExternalForms();
  const index = forms.findIndex(f => f.id === id);
  if (index === -1) return null;
  
  const updatedForm = { ...forms[index], ...updates };
  forms[index] = updatedForm;
  saveExternalForms(forms);
  return updatedForm;
}

export function deleteExternalForm(id: string): boolean {
  const forms = getExternalForms();
  const filtered = forms.filter(f => f.id !== id);
  saveExternalForms(filtered);
  return true;
}

// -------------------------------------------------------------
// COURSES MANAGEMENT
// -------------------------------------------------------------

export function getCoursesConfig(): Record<string, CourseDetail> {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.COURSES);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (typeof parsed === 'object' && parsed !== null) return parsed;
    }
  } catch (_) {}
  return COURSES_DATA;
}

export function saveCoursesConfig(courses: Record<string, CourseDetail>): void {
  try {
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
  } catch (_) {}
}

export function updateCourseConfig(courseId: string, updates: Partial<CourseDetail>): CourseDetail | null {
  const courses = getCoursesConfig();
  if (!courses[courseId]) return null;
  
  courses[courseId] = { ...courses[courseId], ...updates };
  saveCoursesConfig(courses);
  return courses[courseId];
}

// -------------------------------------------------------------
// ADMIN AUTH & FORGOT PASSWORD LOGIC
// -------------------------------------------------------------

export function getAdminPassword(): string {
  try {
    const custom = localStorage.getItem(STORAGE_KEYS.PASSWORD);
    if (custom) return custom;
  } catch (_) {}
  return ADMIN_CONFIG.defaultPassword;
}

export function setAdminPassword(password: string): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PASSWORD, password);
  } catch (_) {}
}

export function isAdminAuthenticated(): boolean {
  try {
    return sessionStorage.getItem('ayurveez_admin_session') === 'true' || 
           localStorage.getItem('ayurveez_admin_session') === 'true';
  } catch (_) {
    return false;
  }
}

export function setAdminAuthenticated(authenticated: boolean): void {
  try {
    if (authenticated) {
      sessionStorage.setItem('ayurveez_admin_session', 'true');
      localStorage.setItem('ayurveez_admin_session', 'true');
    } else {
      sessionStorage.removeItem('ayurveez_admin_session');
      localStorage.removeItem('ayurveez_admin_session');
    }
  } catch (_) {}
}

export function instantAdminLogin(): boolean {
  setAdminAuthenticated(true);
  return true;
}

export function logAdminOut(): void {
  setAdminAuthenticated(false);
}

export function verifyAdminCredentials(email: string, pass: string): boolean {
  const normalizedEmail = email.trim().toLowerCase();
  const adminEmail = ADMIN_CONFIG.email.toLowerCase();
  
  if (normalizedEmail !== adminEmail) return false;
  
  const validPass = getAdminPassword();
  const isMatch = (pass === validPass) || (pass === ADMIN_CONFIG.defaultPassword);
  if (isMatch) {
    setAdminAuthenticated(true);
  }
  return isMatch;
}

// Live active visitor simulation generator
export function getLiveActiveUsersCount(): number {
  const base = 28;
  const minuteVariance = Math.floor(Math.sin(Date.now() / 60000) * 8);
  const randomBump = Math.floor((Math.random() * 5) - 2);
  const count = base + minuteVariance + randomBump;
  return Math.max(14, Math.min(count, 54));
}

// -------------------------------------------------------------
// ADMIN TESTS MANAGEMENT
// -------------------------------------------------------------
export interface AdminTestResource {
  id: string;
  title: string;
  testUrl: string; // Test / Google Form / Quiz link
  course: string;
  subject: string;
  description: string;
  durationMinutes?: number;
  totalMarks?: number;
  difficulty?: string;
  createdAt: string;
}

export function getAdminTests(): AdminTestResource[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.TESTS);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (_) {}
  return [];
}

export function saveAdminTests(tests: AdminTestResource[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.TESTS, JSON.stringify(tests));
  } catch (_) {}
}

export function addAdminTest(testData: Omit<AdminTestResource, 'id' | 'createdAt'>): AdminTestResource {
  const existing = getAdminTests();
  const newTest: AdminTestResource = {
    ...testData,
    id: `test_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  const updated = [newTest, ...existing];
  saveAdminTests(updated);
  return newTest;
}

export function deleteAdminTest(id: string): void {
  const existing = getAdminTests();
  const updated = existing.filter(t => t.id !== id);
  saveAdminTests(updated);
}

