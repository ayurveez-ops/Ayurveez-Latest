export type CourseType = 'BAMS' | 'AIAPGET' | 'AYUSH MEDICAL OFFICER';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  age?: string | number;
  gender?: 'Male' | 'Female' | 'Other' | string;
  mobileNumber?: string;
  whatsappNumber?: string;
  isWhatsappSameAsMobile?: boolean;
  isInCollege?: boolean;
  collegeName?: string;
  course: CourseType | string;
  authProvider: 'email_otp' | 'google' | 'password';
  createdAt?: string;
  updatedAt?: string;
  photoURL?: string;
  isLocked?: boolean;
  role?: 'student' | 'admin';
  lastActive?: string;
  mockAttemptsCount?: number;
}

export interface YouTubeMedia {
  id: string;
  title: string;
  videoUrl: string;
  youtubeId: string;
  course?: string;
  subject?: string;
  type: 'video' | 'reel' | 'shorts';
  category: 'Charaka Samhita' | 'AIAPGET High-Yield' | 'NCISM Syllabus' | 'Dravyaguna & Herbology' | 'Clinical Case Studies' | 'AYUSH MO Updates' | 'General' | 'BAMS' | 'AIAPGET' | 'Medical Officer' | 'Admission' | 'Motivation' | 'Career' | 'News' | string;
  duration?: string;
  thumbnailUrl?: string;
  description: string;
  dateAdded: string;
  isFeatured: boolean;
  viewsCount?: string;
  driveLinkUrl?: string;
  formLinkUrl?: string;
}

export interface DriveResource {
  id: string;
  title: string;
  course: CourseType | 'All Courses' | string;
  subject?: string;
  folderCategory: '1st Prof Notes' | '2nd Prof Notes' | 'Final Prof Notes' | 'AIAPGET Q-Banks' | 'AYUSH MO Pyqs' | 'Samhita Charts' | 'General' | string;
  driveUrl: string;
  description: string;
  fileType: 'PDF' | 'Folder' | 'Spreadsheet' | 'Slides';
  dateAdded: string;
  badge?: string;
}

export interface ExternalFormLink {
  id: string;
  title: string;
  formUrl: string;
  description: string;
  targetAudience: string;
  badge?: string;
  isActive: boolean;
  buttonText: string;
}

export interface AnnouncementItem {
  id: string;
  text: string;
  badge: string;
  linkUrl?: string;
  isActive: boolean;
}

export interface AdminDashboardStats {
  totalUsers: number;
  liveActiveUsers: number;
  totalVideos: number;
  totalDriveResources: number;
  totalMockAttempts: number;
  courseBreakdown: {
    bams: number;
    aiapget: number;
    ayushMo: number;
  };
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  samhitaReference?: string;
  shloka?: string;
  subject: string;
  yearOrTarget?: string;
}

export interface MockTest {
  id: string;
  title: string;
  course: CourseType;
  category: 'Full Mock' | 'Subject Wise' | 'Samhita Special' | 'Previous Year' | 'High-Yield Speed Test';
  durationMinutes: number;
  totalMarks: number;
  marksPerCorrect: number;
  negativeMark: number;
  difficulty: 'Easy' | 'Moderate' | 'Advanced' | 'Exam Standard';
  description: string;
  questions: Question[];
  totalAttempts?: number;
}

export interface TestAttemptResult {
  id?: string;
  userId: string;
  userName: string;
  userEmail: string;
  testId: string;
  testTitle: string;
  course: string;
  score: number;
  totalMarks: number;
  correctAnswers: number;
  wrongAnswers: number;
  unanswered: number;
  totalQuestions: number;
  accuracy: number;
  timeTakenSeconds: number;
  completedAt: string;
  userAnswers: { [questionId: string]: number }; // questionId -> selectedIndex
}

export type BamsFolder = '1st Professional' | '2nd Professional' | '3rd/Final Professional' | 'Others';

export interface StudyNote {
  id: string;
  title: string;
  course: CourseType;
  folder?: BamsFolder | string;
  subject: string;
  samhita: string;
  category: 'Samhita Summary' | 'Dravyaguna Chart' | 'Rasa Shastra' | 'AIAPGET Mnemonic' | 'Clinical Pearl' | 'Previous Year Analysis';
  readTime: string;
  summary: string;
  keyPoints: string[];
  shlokaReference?: {
    sanskrit: string;
    englishMeaning: string;
    citation: string;
  };
  content: string;
  tags: string[];
}

export interface CourseDetail {
  id: CourseType;
  name: string;
  tagline: string;
  badge: string;
  isUpcoming?: boolean;
  iconName: string;
  description: string;
  features: string[];
  subjects: {
    name: string;
    subtopics: string[];
    weightage: string;
  }[];
  examPattern: {
    totalMarks: string;
    questionsCount: string;
    duration: string;
    markingScheme: string;
  };
  targetAudience: string;
  stats: {
    studentsEnrolled: string;
    mockTestsCount: number;
    studyNotesCount: number;
    successRate: string;
  };
}
