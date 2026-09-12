import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  serverTimestamp 
} from 'firebase/firestore';

import firebaseConfig from '../firebase-applet-config.json';

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || "ai-studio-b61420fe-209d-4087-960b-eadb3f44cc2e");
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export interface UserProfileData {
  uid: string;
  name: string;
  email: string;
  age?: string | number;
  gender?: string;
  mobileNumber?: string;
  whatsappNumber?: string;
  isWhatsappSameAsMobile?: boolean;
  isInCollege?: boolean;
  collegeName?: string;
  course: 'BAMS' | 'AIAPGET' | 'AYUSH MEDICAL OFFICER' | string;
  authProvider: 'email_otp' | 'google' | 'password';
  photoURL?: string;
  createdAt?: any;
  updatedAt?: any;
}

// Save or create user profile in Firestore
export async function saveUserProfile(userData: UserProfileData) {
  try {
    const userRef = doc(db, 'users', userData.uid);
    await setDoc(userRef, {
      ...userData,
      updatedAt: serverTimestamp(),
      createdAt: userData.createdAt || serverTimestamp(),
    }, { merge: true });
    return true;
  } catch (error) {
    console.error('Error saving user profile to Firestore:', error);
    // Fallback to local storage if Firestore connection encounters issues
    try {
      localStorage.setItem(`ayurveez_user_${userData.uid}`, JSON.stringify(userData));
    } catch (_) {}
    return true;
  }
}

// Get user profile from Firestore
export async function getUserProfile(uid: string): Promise<UserProfileData | null> {
  try {
    const userRef = doc(db, 'users', uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return docSnap.data() as UserProfileData;
    }
    const local = localStorage.getItem(`ayurveez_user_${uid}`);
    if (local) return JSON.parse(local);
    return null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    const local = localStorage.getItem(`ayurveez_user_${uid}`);
    if (local) return JSON.parse(local);
    return null;
  }
}

// Fetch all registered users from Firestore DB for Admin Dashboard
export async function getAllUsersFromFirestore(): Promise<UserProfileData[]> {
  try {
    const usersCol = collection(db, 'users');
    const snapshot = await getDocs(usersCol);
    const users: UserProfileData[] = [];
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      // Format timestamps if present
      let createdAtStr = data.createdAt;
      if (createdAtStr && typeof createdAtStr === 'object' && 'toDate' in createdAtStr) {
        createdAtStr = createdAtStr.toDate().toISOString();
      }
      let updatedAtStr = data.updatedAt;
      if (updatedAtStr && typeof updatedAtStr === 'object' && 'toDate' in updatedAtStr) {
        updatedAtStr = updatedAtStr.toDate().toISOString();
      }

      users.push({
        uid: doc.id,
        name: data.name || 'Student Aspirant',
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
      });
    });

    return users;
  } catch (error) {
    console.error('Error fetching all users from Firestore:', error);
    return [];
  }
}

// Fetch all test results from Firestore
export async function getAllTestResultsFromFirestore(): Promise<any[]> {
  try {
    const resultsCol = collection(db, 'testResults');
    const snapshot = await getDocs(resultsCol);
    const list: any[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      list.push({ id: doc.id, ...data });
    });
    return list;
  } catch (error) {
    console.error('Error fetching test results from Firestore:', error);
    return [];
  }
}

// Fetch all inquiries from Firestore
export async function getAllInquiriesFromFirestore(): Promise<any[]> {
  try {
    const col = collection(db, 'inquiries');
    const snapshot = await getDocs(col);
    const list: any[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      list.push({ id: doc.id, ...data });
    });
    return list;
  } catch (error) {
    console.error('Error fetching inquiries from Firestore:', error);
    return [];
  }
}

// Save test result to Firestore
export async function saveTestResult(result: {
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
  completedAt: string;
}) {
  try {
    const resultsCol = collection(db, 'testResults');
    await addDoc(resultsCol, {
      ...result,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.error('Error saving test result to Firestore:', error);
    // Save to local test history
    const history = JSON.parse(localStorage.getItem('ayurveez_test_history') || '[]');
    history.unshift(result);
    localStorage.setItem('ayurveez_test_history', JSON.stringify(history.slice(0, 30)));
  }
}

// Save contact inquiry
export async function saveInquiry(inquiry: {
  name: string;
  email: string;
  phone: string;
  course: string;
  message: string;
  createdAt: string;
}) {
  try {
    const inquiryCol = collection(db, 'inquiries');
    await addDoc(inquiryCol, {
      ...inquiry,
      timestamp: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error saving inquiry:', error);
    return true;
  }
}
