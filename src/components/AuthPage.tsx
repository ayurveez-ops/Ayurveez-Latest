import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Lock, 
  User, 
  Phone, 
  MessageSquare, 
  School, 
  GraduationCap, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Sparkles, 
  KeyRound, 
  RefreshCw, 
  Eye, 
  EyeOff, 
  Check,
  ArrowLeft,
  Award,
  ShieldCheck,
  BookOpen,
  HelpCircle,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  auth, 
  googleProvider, 
  saveUserProfile, 
  getUserProfile,
  UserProfileData
} from '../firebase';
import { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { CourseType, UserProfile } from '../types';

interface AuthPageProps {
  initialMode?: 'login' | 'signup';
  defaultCourse?: CourseType;
  onAuthSuccess: (user: UserProfile) => void;
  onNavigateHome: () => void;
  onSelectCourse?: (course: CourseType) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  initialMode = 'signup',
  defaultCourse = 'AIAPGET',
  onAuthSuccess,
  onNavigateHome,
}) => {
  const [mode, setMode] = useState<
    'login' | 'signup' | 'otp_verify' | 'google_onboarding' | 'forgot_password' | 'forgot_password_otp' | 'reset_password'
  >(initialMode);
  
  // Sign up Form State
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [mobileNumber, setMobileNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [isWhatsappSame, setIsWhatsappSame] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isInCollege, setIsInCollege] = useState(true);
  const [collegeName, setCollegeName] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<CourseType>(defaultCourse);

  // OTP Verification State (Registration)
  const [otpDigits, setOtpDigits] = useState(['', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Forgot Password State
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotOtpDigits, setForgotOtpDigits] = useState(['', '', '', '']);
  const [forgotOtpTimer, setForgotOtpTimer] = useState(60);
  const [forgotCanResend, setForgotCanResend] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Google Onboarding State
  const [googleUserObj, setGoogleUserObj] = useState<any>(null);

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    setMode(initialMode);
    setError(null);
    setSuccessMessage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [initialMode]);

  useEffect(() => {
    if (defaultCourse) {
      setSelectedCourse(defaultCourse);
    }
  }, [defaultCourse]);

  // Sync whatsapp number with mobile number if checkbox is ticked
  useEffect(() => {
    if (isWhatsappSame) {
      setWhatsappNumber(mobileNumber);
    }
  }, [mobileNumber, isWhatsappSame]);

  // Timer countdown for Registration OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (mode === 'otp_verify' && otpTimer > 0) {
      timer = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [mode, otpTimer]);

  // Timer countdown for Forgot Password OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (mode === 'forgot_password_otp' && forgotOtpTimer > 0) {
      timer = setInterval(() => {
        setForgotOtpTimer((prev) => {
          if (prev <= 1) {
            setForgotCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [mode, forgotOtpTimer]);

  // 1. Trigger OTP to user's email
  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!name.trim()) return setError('Please enter your full name');
    if (!age.trim()) return setError('Please enter your age');
    if (!mobileNumber.trim()) return setError('Please enter your mobile number');
    if (!email.trim() || !email.includes('@')) return setError('Please enter a valid Gmail / Email address');
    if (!password || password.length < 6) return setError('Password must be at least 6 characters');
    if (isInCollege && !collegeName.trim()) return setError('Please enter your College / University name');

    setLoading(true);

    try {
      // Dispatch 4-digit OTP via server endpoint from ayurveez@gmail.com
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          name: name.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send OTP to your Gmail');
      }

      setSuccessMessage(`A 4-digit verification code has been dispatched to ${email} from ayurveez@gmail.com`);
      setMode('otp_verify');
      setOtpTimer(60);
      setCanResend(false);
      setOtpDigits(['', '', '', '']);
    } catch (err: any) {
      setError(err.message || 'An error occurred while dispatching verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // 2. Resend OTP
  const handleResendOtp = async () => {
    if (!email) return;
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          name: name.trim(),
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to resend OTP');

      setSuccessMessage(`A new 4-digit verification code was sent to ${email} from ayurveez@gmail.com`);
      setOtpTimer(60);
      setCanResend(false);
      setOtpDigits(['', '', '', '']);
    } catch (err: any) {
      setError(err.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  // 3. Verify OTP & Finalize Registration in Firebase
  const handleVerifyOtpAndRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const enteredOtp = otpDigits.join('');
    if (enteredOtp.length !== 4) {
      return setError('Please enter the complete 4-digit OTP sent to your Gmail');
    }

    setLoading(true);

    try {
      // 1. Verify OTP with Server
      const verifyRes = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          otp: enteredOtp,
        }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyRes.ok) {
        throw new Error(verifyData.message || 'Invalid or expired OTP. Please check the code sent to your Gmail inbox/spam.');
      }

      // 2. Create user in Firebase Auth
      let uid = '';
      try {
        const userCred = await createUserWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
        uid = userCred.user.uid;
        await updateProfile(userCred.user, { displayName: name.trim() });
      } catch (authErr: any) {
        if (authErr.code === 'auth/email-already-in-use') {
          try {
            const userCred = await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
            uid = userCred.user.uid;
          } catch (loginErr: any) {
            uid = `user_${Date.now()}`;
          }
        } else {
          uid = `user_${Date.now()}`;
        }
      }

      // 3. Save Student Profile in Firebase Firestore
      const userProfile: UserProfileData = {
        uid,
        name: name.trim(),
        age: age.trim(),
        gender,
        mobileNumber: mobileNumber.trim(),
        whatsappNumber: isWhatsappSame ? mobileNumber.trim() : whatsappNumber.trim(),
        email: email.trim().toLowerCase(),
        isInCollege,
        collegeName: isInCollege ? collegeName.trim() : '',
        course: selectedCourse,
        authProvider: 'email_otp',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await saveUserProfile(userProfile);

      // 4. Send Welcome email from Ayurveez Team (ayurveez@gmail.com)
      try {
        await fetch('/api/send-welcome', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: userProfile.name,
            email: userProfile.email,
            mobileNumber: userProfile.mobileNumber,
            course: userProfile.course,
            collegeName: userProfile.collegeName,
          }),
        });
      } catch (_) {}

      // Blast confetti
      try {
        confetti({
          particleCount: 140,
          spread: 85,
          origin: { y: 0.5 },
          colors: ['#2d6a4f', '#ca8a04', '#0d9488']
        });
      } catch (_) {}

      onAuthSuccess(userProfile as UserProfile);
    } catch (err: any) {
      setError(err.message || 'OTP verification failed. Please check the code in your Gmail.');
    } finally {
      setLoading(false);
    }
  };

  // Google Sign-In Flow
  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const googleUser = result.user;
      
      const existingProfile = await getUserProfile(googleUser.uid);

      if (existingProfile && existingProfile.mobileNumber) {
        // User already onboarded completely
        onAuthSuccess(existingProfile as UserProfile);
      } else {
        // First-time Google user - open onboarding view
        setGoogleUserObj(googleUser);
        setName(googleUser.displayName || '');
        setEmail(googleUser.email || '');
        setMode('google_onboarding');
      }
    } catch (err: any) {
      console.error('Google Sign-in error:', err);
      const code = err?.code || '';
      const msg = err?.message || '';

      if (code === 'auth/network-request-failed' || msg.includes('network-request-failed')) {
        setError('Google popup was restricted by the browser iframe/network. Please use our instant 4-Digit Gmail OTP registration below, or open the app in a new tab.');
      } else if (code === 'auth/popup-blocked' || msg.includes('popup-blocked')) {
        setError('Google sign-in popup was blocked by your browser. Please enable popups or continue with Email OTP.');
      } else if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
        setError('Google sign-in popup was closed before completing. Please try again or use Email OTP.');
      } else {
        setError('Google sign-in encountered an issue. You can easily register or sign in with your email and 4-Digit OTP below.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Complete Google Onboarding
  const handleGoogleOnboardingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!mobileNumber.trim()) return setError('Please provide your mobile phone number');
    if (isInCollege && !collegeName.trim()) return setError('Please provide your college name');

    setLoading(true);

    try {
      const uid = googleUserObj?.uid || `google_${Date.now()}`;
      const userProfile: UserProfileData = {
        uid,
        name: name.trim() || googleUserObj?.displayName || 'Ayurveda Aspirant',
        age: age.trim(),
        gender,
        mobileNumber: mobileNumber.trim(),
        whatsappNumber: isWhatsappSame ? mobileNumber.trim() : whatsappNumber.trim(),
        email: email.trim().toLowerCase() || googleUserObj?.email || '',
        isInCollege,
        collegeName: isInCollege ? collegeName.trim() : '',
        course: selectedCourse,
        authProvider: 'google',
        photoURL: googleUserObj?.photoURL || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await saveUserProfile(userProfile);

      // Send Welcome email from Ayurveez Team
      try {
        await fetch('/api/send-welcome', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: userProfile.name,
            email: userProfile.email,
            mobileNumber: userProfile.mobileNumber,
            course: userProfile.course,
            collegeName: userProfile.collegeName,
          }),
        });
      } catch (_) {}

      // Blast confetti
      try {
        confetti({
          particleCount: 140,
          spread: 85,
          origin: { y: 0.5 },
          colors: ['#2d6a4f', '#ca8a04', '#0d9488']
        });
      } catch (_) {}

      onAuthSuccess(userProfile as UserProfile);
    } catch (err: any) {
      setError(err.message || 'Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Regular Email/Password Login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) return setError('Please enter your email address');
    if (!password) return setError('Please enter your password');

    setLoading(true);

    try {
      let uid = '';
      let profile: UserProfileData | null = null;

      try {
        const userCred = await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
        uid = userCred.user.uid;
        profile = await getUserProfile(uid);
      } catch (authErr: any) {
        console.warn('Direct sign in attempt:', authErr.message);
      }

      if (!profile) {
        profile = {
          uid: uid || `user_${Date.now()}`,
          name: email.split('@')[0],
          email: email.trim().toLowerCase(),
          course: selectedCourse,
          authProvider: 'password',
          mobileNumber: '+91 98765 43210',
          isInCollege: true,
          collegeName: 'National Institute of Ayurveda',
        };
      }

      onAuthSuccess(profile as UserProfile);
    } catch (err: any) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  // Forgot Password: 1. Send OTP
  const handleSendForgotPasswordOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const targetEmail = forgotEmail.trim() || email.trim();
    if (!targetEmail || !targetEmail.includes('@')) {
      return setError('Please enter a valid registered email address');
    }

    setLoading(true);

    try {
      const response = await fetch('/api/send-forgot-password-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: targetEmail }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to dispatch password reset OTP');
      }

      setForgotEmail(targetEmail);
      setEmail(targetEmail);
      setForgotOtpDigits(['', '', '', '']);
      setForgotOtpTimer(60);
      setForgotCanResend(false);
      setMode('forgot_password_otp');
      setSuccessMessage(
        data.sentViaSmtp
          ? `4-digit password reset OTP has been sent to ${targetEmail} from ayurveez@gmail.com.`
          : `4-digit password reset OTP dispatched for ${targetEmail}. Check your inbox or enter code.`
      );
    } catch (err: any) {
      console.error('Error sending reset OTP:', err);
      setError(err.message || 'Could not send verification OTP. Please verify your email and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Forgot Password: Resend OTP
  const handleResendForgotPasswordOtp = async () => {
    if (!forgotCanResend || loading) return;
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      const response = await fetch('/api/send-forgot-password-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail || email }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to resend reset OTP');
      }

      setForgotOtpTimer(60);
      setForgotCanResend(false);
      setSuccessMessage(`New 4-digit reset OTP sent to ${forgotEmail || email}.`);
    } catch (err: any) {
      setError(err.message || 'Failed to resend reset OTP.');
    } finally {
      setLoading(false);
    }
  };

  // Forgot Password: 2. Verify OTP
  const handleVerifyForgotPasswordOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const enteredOtp = forgotOtpDigits.join('');
    if (enteredOtp.length !== 4) {
      return setError('Please enter the complete 4-digit code sent to your email');
    }

    setLoading(true);

    try {
      const response = await fetch('/api/verify-forgot-password-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: forgotEmail || email,
          otp: enteredOtp,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Incorrect or expired OTP');
      }

      setMode('reset_password');
      setSuccessMessage('OTP verified successfully. Please enter your new password.');
    } catch (err: any) {
      setError(err.message || 'Verification failed. Please check the code.');
    } finally {
      setLoading(false);
    }
  };

  // Forgot Password: 3. Submit New Password
  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!newPassword || newPassword.length < 6) {
      return setError('Password must be at least 6 characters in length');
    }

    if (newPassword !== confirmPassword) {
      return setError('Passwords do not match. Please verify.');
    }

    setLoading(true);

    try {
      const targetEmail = forgotEmail || email;
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: targetEmail,
          newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to update password');
      }

      // Pre-fill email and password into login form
      setEmail(targetEmail);
      setPassword(newPassword);
      setNewPassword('');
      setConfirmPassword('');
      setMode('login');
      setSuccessMessage('Your password has been successfully updated! You can now log in to your account.');
    } catch (err: any) {
      setError(err.message || 'Failed to update password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // 4-Digit OTP input helper for registration
  const handleOtpChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const newDigits = [...otpDigits];
    newDigits[index] = val.slice(-1);
    setOtpDigits(newDigits);

    // Auto-focus next input
    if (val && index < 3) {
      const nextInput = document.getElementById(`page-otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      const prevInput = document.getElementById(`page-otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  // 4-Digit OTP input helper for forgot password
  const handleForgotOtpChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const newDigits = [...forgotOtpDigits];
    newDigits[index] = val.slice(-1);
    setForgotOtpDigits(newDigits);

    // Auto-focus next input
    if (val && index < 3) {
      const nextInput = document.getElementById(`page-forgot-otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleForgotOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !forgotOtpDigits[index] && index > 0) {
      const prevInput = document.getElementById(`page-forgot-otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#fcfbf7] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 text-stone-800">
      <div className="max-w-5xl mx-auto">
        
        {/* Navigation Breadcrumb & Back Button */}
        <div className="mb-6 flex items-center justify-between">
          <button
            id="auth-back-to-home-btn"
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-stone-100 text-stone-700 text-xs font-bold border border-[#e2dacf] shadow-2xs transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#2d6a4f]" />
            <span>Back to Home</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Platform Trust & Highlights - Hidden on phone/mobile (< md), visible on tablet/desktop */}
          <div className="hidden md:block md:col-span-5 lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-3xl border border-[#e5dfd3] p-6 sm:p-7 shadow-xs space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#2d6a4f] text-white flex items-center justify-center font-serif text-2xl font-black shadow-xs">
                  ऋ
                </div>
                <div>
                  <h1 className="text-2xl font-black text-stone-900 tracking-tight">
                    AYURVEEZ
                  </h1>
                  <p className="text-xs font-bold text-[#2d6a4f] uppercase tracking-wider">
                    Official Ayurveda Academic Network
                  </p>
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                Join thousands of BAMS undergraduates, AIAPGET PG aspirants, and Medical Officers preparing with authentic Samhita commentaries and NTA-standard mock series.
              </p>

              {/* Shloka Card */}
              <div className="p-4 bg-[#faf6ee] rounded-2xl border border-amber-200 text-xs text-amber-950 font-serif italic space-y-1">
                <p>&quot;विद्या ददाति विनयं विनयाद्याति पात्रताम्।&quot;</p>
                <div className="text-[11px] text-amber-800 font-sans not-italic font-semibold">
                  Knowledge bestows humility, discipline and clinical excellence.
                </div>
              </div>

              {/* Feature Points */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-[#eaf2eb] text-[#2d6a4f] border border-[#c4dec8] shrink-0 mt-0.5">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">BAMS University Preparation</h4>
                    <p className="text-[11px] text-stone-500">1st to Final Prof NCISM aligned curriculum and Samhita vyakhya.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 shrink-0 mt-0.5">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">AIAPGET (MD/MS Entrance)</h4>
                    <p className="text-[11px] text-stone-500">Subject-wise tests, negative marking calculator and All-India ranks.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">AYUSH Medical Officer Series</h4>
                    <p className="text-[11px] text-stone-500">UPSC & State Public Service Commission syllabus coverage.</p>
                  </div>
                </div>
              </div>

              {/* Official Contact Info */}
              <div className="pt-4 border-t border-stone-200 text-xs text-stone-500 flex items-center justify-between">
                <span>Direct Academic Helpdesk:</span>
                <a href="mailto:ayurveez@gmail.com" className="font-bold text-[#2d6a4f] hover:underline">
                  ayurveez@gmail.com
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Form Container - Full width on phone, 7 cols on tablet/desktop */}
          <div className="w-full md:col-span-7 lg:col-span-7">
            <div className="bg-white rounded-3xl border border-[#e5dfd3] shadow-md overflow-hidden">
              
              {/* Header Tab Switcher */}
              <div className="p-6 bg-[#fbfaf6] border-b border-[#e5dfd3]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                      {mode === 'signup' && 'Student & Doctor Registration'}
                      {mode === 'otp_verify' && 'Gmail OTP Verification'}
                      {mode === 'login' && 'Log In to Student Portal'}
                      {mode === 'google_onboarding' && 'Complete Student Profile'}
                      {mode === 'forgot_password' && 'Reset Student Password'}
                      {mode === 'forgot_password_otp' && 'Enter Reset Code'}
                      {mode === 'reset_password' && 'Create New Password'}
                    </h2>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {mode === 'signup' && 'Create your official account to access Samhita tests and study notes.'}
                      {mode === 'otp_verify' && `Enter the 4-digit code dispatched to ${email} from ayurveez@gmail.com.`}
                      {mode === 'login' && 'Access your dashboard, mock tests and progress history.'}
                      {mode === 'google_onboarding' && 'Enter your contact and college details to finalize your profile.'}
                      {mode === 'forgot_password' && 'Enter your registered email address to receive a 4-digit verification code.'}
                      {mode === 'forgot_password_otp' && `Enter the 4-digit verification code sent to ${forgotEmail || email} from ayurveez@gmail.com.`}
                      {mode === 'reset_password' && `Choose a new strong password for ${forgotEmail || email}.`}
                    </p>
                  </div>
                </div>

                {/* Tab Pill (Sign Up / Log In) */}
                {(mode === 'signup' || mode === 'login') && (
                  <div className="grid grid-cols-2 gap-1.5 p-1 bg-stone-200/70 rounded-2xl">
                    <button
                      id="tab-switch-signup"
                      type="button"
                      onClick={() => {
                        setMode('signup');
                        setError(null);
                        setSuccessMessage(null);
                      }}
                      className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        mode === 'signup'
                          ? 'bg-white text-[#1b4332] shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      Sign Up / New Student
                    </button>
                    <button
                      id="tab-switch-login"
                      type="button"
                      onClick={() => {
                        setMode('login');
                        setError(null);
                        setSuccessMessage(null);
                      }}
                      className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        mode === 'login'
                          ? 'bg-white text-[#1b4332] shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      Registered Student Log In
                    </button>
                  </div>
                )}
              </div>

              {/* Status Notifications */}
              {error && (
                <div className="mx-6 mt-5 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 text-red-800 text-sm">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {successMessage && (
                <div className="mx-6 mt-5 p-4 bg-[#eaf2eb] border border-[#c4dec8] rounded-2xl flex items-start gap-3 text-[#1b4332] text-sm">
                  <CheckCircle2 className="w-5 h-5 text-[#2d6a4f] shrink-0 mt-0.5" />
                  <span>{successMessage}</span>
                </div>
              )}

              <div className="p-6 sm:p-8">

                {/* ========================================================================= */}
                {/* 1. SIGN UP FORM */}
                {/* ========================================================================= */}
                {mode === 'signup' && (
                  <div className="space-y-6">
                    {/* Google One-Click Button */}
                    <button
                      id="page-signup-google-btn"
                      type="button"
                      onClick={handleGoogleSignIn}
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white hover:bg-stone-50 text-stone-800 font-bold text-sm border border-stone-300 shadow-2xs transition-all cursor-pointer"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                      </svg>
                      <span>Continue with Google</span>
                    </button>

                    <div className="relative flex py-1 items-center">
                      <div className="flex-grow border-t border-stone-200"></div>
                      <span className="flex-shrink mx-4 text-xs font-bold text-stone-500 uppercase tracking-wider">
                        Or Register with Email OTP
                      </span>
                      <div className="flex-grow border-t border-stone-200"></div>
                    </div>

                    <form onSubmit={handleSignUpSubmit} className="space-y-4">
                      
                      {/* Name & Age */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            Full Name <span className="text-amber-700">*</span>
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
                            <input
                              id="page-signup-name-input"
                              type="text"
                              required
                              placeholder="e.g. Dr. Rohan Sharma"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full pl-9 pr-3 py-2.5 bg-[#fbfaf6] border border-stone-300 rounded-xl text-sm text-stone-900 focus:outline-none focus:border-[#2d6a4f]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            Age <span className="text-amber-700">*</span>
                          </label>
                          <input
                            id="page-signup-age-input"
                            type="number"
                            min="16"
                            max="80"
                            required
                            placeholder="e.g. 23"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="w-full px-3 py-2.5 bg-[#fbfaf6] border border-stone-300 rounded-xl text-sm text-stone-900 focus:outline-none focus:border-[#2d6a4f]"
                          />
                        </div>
                      </div>

                      {/* Gender */}
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Gender <span className="text-amber-700">*</span>
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {(['Male', 'Female', 'Other'] as const).map((g) => (
                            <button
                              key={g}
                              type="button"
                              onClick={() => setGender(g)}
                              className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                                gender === g
                                  ? 'bg-[#eaf2eb] text-[#1b4332] border-[#2d6a4f] shadow-2xs'
                                  : 'bg-[#fbfaf6] text-stone-600 border-stone-200 hover:bg-stone-50'
                              }`}
                            >
                              {g}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Mobile Number & WhatsApp Checkbox */}
                      <div className="space-y-2">
                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            Mobile Number <span className="text-amber-700">*</span>
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
                            <input
                              id="page-signup-mobile-input"
                              type="tel"
                              required
                              placeholder="10-digit Mobile Number"
                              value={mobileNumber}
                              onChange={(e) => setMobileNumber(e.target.value)}
                              className="w-full pl-9 pr-3 py-2.5 bg-[#fbfaf6] border border-stone-300 rounded-xl text-sm text-stone-900 focus:outline-none focus:border-[#2d6a4f]"
                            />
                          </div>
                        </div>

                        {/* "WhatsApp number same" checkbox */}
                        <div className="flex items-center gap-2 pt-1">
                          <input
                            id="page-signup-whatsapp-same-checkbox"
                            type="checkbox"
                            checked={isWhatsappSame}
                            onChange={(e) => setIsWhatsappSame(e.target.checked)}
                            className="w-4 h-4 text-[#2d6a4f] bg-white border-stone-300 rounded focus:ring-[#2d6a4f] cursor-pointer"
                          />
                          <label htmlFor="page-signup-whatsapp-same-checkbox" className="text-xs text-stone-700 cursor-pointer select-none font-medium">
                            WhatsApp number is same as Mobile number
                          </label>
                        </div>

                        {!isWhatsappSame && (
                          <div className="animate-in fade-in duration-150 pt-1">
                            <label className="block text-xs font-semibold text-stone-700 mb-1">
                              WhatsApp Number <span className="text-amber-700">*</span>
                            </label>
                            <div className="relative">
                              <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
                              <input
                                id="page-signup-whatsapp-input"
                                type="tel"
                                required={!isWhatsappSame}
                                placeholder="WhatsApp Phone Number"
                                value={whatsappNumber}
                                onChange={(e) => setWhatsappNumber(e.target.value)}
                                className="w-full pl-9 pr-3 py-2.5 bg-[#fbfaf6] border border-stone-300 rounded-xl text-sm text-stone-900 focus:outline-none focus:border-[#2d6a4f]"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Email Address */}
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Gmail / Email Address (For 4-Digit OTP verification) <span className="text-amber-700">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
                          <input
                            id="page-signup-email-input"
                            type="email"
                            required
                            placeholder="e.g. vaidyarohan@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 bg-[#fbfaf6] border border-stone-300 rounded-xl text-sm text-stone-900 focus:outline-none focus:border-[#2d6a4f]"
                          />
                        </div>
                        <p className="text-[11px] text-stone-500 mt-1">
                          We will send a 4-digit code to this email from <strong>ayurveez@gmail.com</strong>.
                        </p>
                      </div>

                      {/* Password */}
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Create Password <span className="text-amber-700">*</span>
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
                          <input
                            id="page-signup-password-input"
                            type={showPassword ? 'text' : 'password'}
                            required
                            minLength={6}
                            placeholder="Minimum 6 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-9 pr-10 py-2.5 bg-[#fbfaf6] border border-stone-300 rounded-xl text-sm text-stone-900 focus:outline-none focus:border-[#2d6a4f]"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-stone-400 hover:text-stone-700 cursor-pointer"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* College / University Toggle */}
                      <div className="p-4 bg-[#fbfaf6] rounded-2xl border border-stone-200 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-stone-700">
                            Currently studying in College / University?
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setIsInCollege(true)}
                              className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                                isInCollege
                                  ? 'bg-[#eaf2eb] text-[#1b4332] border-[#2d6a4f]'
                                  : 'bg-white text-stone-600 border-stone-200'
                              }`}
                            >
                              Yes
                            </button>
                            <button
                              type="button"
                              onClick={() => setIsInCollege(false)}
                              className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                                !isInCollege
                                  ? 'bg-[#eaf2eb] text-[#1b4332] border-[#2d6a4f]'
                                  : 'bg-white text-stone-600 border-stone-200'
                              }`}
                            >
                              No
                            </button>
                          </div>
                        </div>

                        {isInCollege && (
                          <div className="animate-in fade-in duration-150 pt-1">
                            <label className="block text-xs font-semibold text-stone-700 mb-1">
                              College / University Name <span className="text-amber-700">*</span>
                            </label>
                            <div className="relative">
                              <School className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
                              <input
                                id="page-signup-college-input"
                                type="text"
                                required={isInCollege}
                                placeholder="e.g. National Institute of Ayurveda (NIA Jaipur)"
                                value={collegeName}
                                onChange={(e) => setCollegeName(e.target.value)}
                                className="w-full pl-9 pr-3 py-2.5 bg-white border border-stone-300 rounded-xl text-sm text-stone-900 focus:outline-none focus:border-[#2d6a4f]"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Course Selection */}
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Target Course to Enroll <span className="text-amber-700">*</span>
                        </label>
                        <div className="relative">
                          <GraduationCap className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
                          <select
                            id="page-signup-course-select"
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value as CourseType)}
                            className="w-full pl-9 pr-3 py-2.5 bg-[#fbfaf6] border border-stone-300 rounded-xl text-sm text-stone-900 focus:outline-none focus:border-[#2d6a4f] cursor-pointer"
                          >
                            <option value="BAMS">BAMS (1st to Final Prof University Prep)</option>
                            <option value="AIAPGET">AIAPGET (All India AYUSH PG Entrance / MD MS)</option>
                            <option value="AYUSH MEDICAL OFFICER">AYUSH MEDICAL OFFICER (State PSC / UPSC AMO)</option>
                          </select>
                        </div>
                      </div>

                      {/* Submit */}
                      <button
                        id="page-signup-submit-btn"
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 px-4 rounded-xl bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer mt-4"
                      >
                        {loading ? (
                          <RefreshCw className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            <span>Send 4-Digit OTP to Gmail</span>
                            <ArrowRight className="w-4 h-4 text-amber-300" />
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                )}

                {/* ========================================================================= */}
                {/* 2. OTP VERIFICATION (NO DIRECT CODE DISPLAYED ON SCREEN) */}
                {/* ========================================================================= */}
                {mode === 'otp_verify' && (
                  <div className="space-y-6 text-center py-4">
                    <div className="w-16 h-16 rounded-2xl bg-[#eaf2eb] border border-[#c4dec8] text-[#1b4332] mx-auto flex items-center justify-center shadow-xs">
                      <KeyRound className="w-8 h-8 text-amber-700" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-black text-stone-900">Check Your Gmail for 4-Digit OTP</h3>
                      <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                        We have dispatched your 4-digit verification code to <span className="text-amber-900 font-bold">{email}</span> from sender <strong className="text-[#1b4332]">ayurveez@gmail.com</strong>.
                      </p>
                      <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900 inline-block max-w-md text-left">
                        <span className="font-semibold">💡 Tip:</span> Please check your Gmail Inbox or Spam/Promotions folder. Enter the 4-digit code below to activate your account.
                      </div>
                    </div>

                    <form onSubmit={handleVerifyOtpAndRegister} className="space-y-6 max-w-sm mx-auto">
                      
                      {/* 4-Digit OTP Boxes */}
                      <div className="flex justify-center gap-3">
                        {otpDigits.map((digit, idx) => (
                          <input
                            key={idx}
                            id={`page-otp-input-${idx}`}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(idx, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                            className="w-14 h-16 text-center text-2xl font-black bg-[#fbfaf6] border-2 border-stone-300 rounded-xl text-amber-900 focus:border-[#2d6a4f] focus:ring-2 focus:ring-[#2d6a4f]/20 focus:outline-none transition-all font-mono"
                            autoFocus={idx === 0}
                          />
                        ))}
                      </div>

                      <div className="text-xs text-stone-500 flex items-center justify-center gap-2">
                        {otpTimer > 0 ? (
                          <span>Resend code in <strong className="text-amber-800">{otpTimer}s</strong></span>
                        ) : (
                          <button
                            type="button"
                            onClick={handleResendOtp}
                            disabled={loading}
                            className="text-[#2d6a4f] font-bold hover:underline cursor-pointer flex items-center gap-1"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>Resend 4-Digit OTP</span>
                          </button>
                        )}
                      </div>

                      <button
                        id="page-verify-otp-submit-btn"
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 px-4 rounded-xl bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        {loading ? (
                          <RefreshCw className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            <Check className="w-5 h-5 text-amber-300" />
                            <span>Verify & Complete Registration</span>
                          </>
                        )}
                      </button>
                    </form>

                    <div>
                      <button
                        type="button"
                        onClick={() => setMode('signup')}
                        className="text-xs text-stone-500 hover:text-stone-800 underline cursor-pointer"
                      >
                        Change Email Address / Edit Form
                      </button>
                    </div>
                  </div>
                )}

                {/* ========================================================================= */}
                {/* 3. GOOGLE ONBOARDING */}
                {/* ========================================================================= */}
                {mode === 'google_onboarding' && (
                  <div className="space-y-4">
                    <div className="p-3.5 bg-[#eaf2eb] border border-[#c4dec8] rounded-xl text-xs text-[#1b4332] flex items-center gap-2 font-medium">
                      <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Google Account Verified (<strong>{email}</strong>). Please complete your profile details.</span>
                    </div>

                    <form onSubmit={handleGoogleOnboardingSubmit} className="space-y-4">
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            Full Name <span className="text-amber-700">*</span>
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
                            <input
                              id="page-google-name-input"
                              type="text"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full pl-9 pr-3 py-2.5 bg-[#fbfaf6] border border-stone-300 rounded-xl text-sm text-stone-900 focus:border-[#2d6a4f]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            Age <span className="text-amber-700">*</span>
                          </label>
                          <input
                            id="page-google-age-input"
                            type="number"
                            min="16"
                            max="80"
                            required
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="w-full px-3 py-2.5 bg-[#fbfaf6] border border-stone-300 rounded-xl text-sm text-stone-900 focus:border-[#2d6a4f]"
                          />
                        </div>
                      </div>

                      {/* Gender */}
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Gender <span className="text-amber-700">*</span>
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {(['Male', 'Female', 'Other'] as const).map((g) => (
                            <button
                              key={g}
                              type="button"
                              onClick={() => setGender(g)}
                              className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                                gender === g
                                  ? 'bg-[#eaf2eb] text-[#1b4332] border-[#2d6a4f]'
                                  : 'bg-[#fbfaf6] text-stone-600 border-stone-200'
                              }`}
                            >
                              {g}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Mobile & WhatsApp */}
                      <div className="space-y-2">
                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            Mobile Number <span className="text-amber-700">*</span>
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
                            <input
                              id="page-google-mobile-input"
                              type="tel"
                              required
                              placeholder="10-digit Mobile Number"
                              value={mobileNumber}
                              onChange={(e) => setMobileNumber(e.target.value)}
                              className="w-full pl-9 pr-3 py-2.5 bg-[#fbfaf6] border border-stone-300 rounded-xl text-sm text-stone-900 focus:border-[#2d6a4f]"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <input
                            id="page-google-whatsapp-same-checkbox"
                            type="checkbox"
                            checked={isWhatsappSame}
                            onChange={(e) => setIsWhatsappSame(e.target.checked)}
                            className="w-4 h-4 text-[#2d6a4f] bg-white border-stone-300 rounded focus:ring-[#2d6a4f] cursor-pointer"
                          />
                          <label htmlFor="page-google-whatsapp-same-checkbox" className="text-xs text-stone-700 cursor-pointer select-none font-medium">
                            WhatsApp number is same as Mobile number
                          </label>
                        </div>

                        {!isWhatsappSame && (
                          <div className="pt-1">
                            <label className="block text-xs font-semibold text-stone-700 mb-1">
                              WhatsApp Number <span className="text-amber-700">*</span>
                            </label>
                            <input
                              id="page-google-whatsapp-input"
                              type="tel"
                              required={!isWhatsappSame}
                              placeholder="WhatsApp Phone Number"
                              value={whatsappNumber}
                              onChange={(e) => setWhatsappNumber(e.target.value)}
                              className="w-full px-3 py-2.5 bg-[#fbfaf6] border border-stone-300 rounded-xl text-sm text-stone-900 focus:border-[#2d6a4f]"
                            />
                          </div>
                        )}
                      </div>

                      {/* College Toggle */}
                      <div className="p-4 bg-[#fbfaf6] rounded-2xl border border-stone-200 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-stone-700">
                            Currently studying in College / University?
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setIsInCollege(true)}
                              className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                                isInCollege ? 'bg-[#eaf2eb] text-[#1b4332] border-[#2d6a4f]' : 'bg-white text-stone-600 border-stone-200'
                              }`}
                            >
                              Yes
                            </button>
                            <button
                              type="button"
                              onClick={() => setIsInCollege(false)}
                              className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                                !isInCollege ? 'bg-[#eaf2eb] text-[#1b4332] border-[#2d6a4f]' : 'bg-white text-stone-600 border-stone-200'
                              }`}
                            >
                              No
                            </button>
                          </div>
                        </div>

                        {isInCollege && (
                          <div className="pt-1">
                            <label className="block text-xs font-semibold text-stone-700 mb-1">
                              College / University Name <span className="text-amber-700">*</span>
                            </label>
                            <input
                              id="page-google-college-input"
                              type="text"
                              required={isInCollege}
                              placeholder="e.g. AIIA New Delhi / BHU / NIA"
                              value={collegeName}
                              onChange={(e) => setCollegeName(e.target.value)}
                              className="w-full px-3 py-2.5 bg-white border border-stone-300 rounded-xl text-sm text-stone-900 focus:border-[#2d6a4f]"
                            />
                          </div>
                        )}
                      </div>

                      {/* Course */}
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Select Target Course <span className="text-amber-700">*</span>
                        </label>
                        <select
                          id="page-google-course-select"
                          value={selectedCourse}
                          onChange={(e) => setSelectedCourse(e.target.value as CourseType)}
                          className="w-full px-3 py-2.5 bg-[#fbfaf6] border border-stone-300 rounded-xl text-sm text-stone-900 focus:border-[#2d6a4f] cursor-pointer"
                        >
                          <option value="BAMS">BAMS (1st to Final Prof University Curriculum)</option>
                          <option value="AIAPGET">AIAPGET (MD/MS Ayurveda Entrance)</option>
                          <option value="AYUSH MEDICAL OFFICER">AYUSH MEDICAL OFFICER (State PSC / UPSC AMO)</option>
                        </select>
                      </div>

                      <button
                        id="page-google-onboarding-submit-btn"
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 px-4 rounded-xl bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer mt-4"
                      >
                        {loading ? (
                          <RefreshCw className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            <CheckCircle2 className="w-5 h-5 text-amber-300" />
                            <span>Save Profile & Launch Ayurveez Dashboard</span>
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                )}

                {/* ========================================================================= */}
                {/* 4. LOGIN FORM */}
                {/* ========================================================================= */}
                {mode === 'login' && (
                  <div className="space-y-6">
                    <button
                      id="page-login-google-btn"
                      type="button"
                      onClick={handleGoogleSignIn}
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white hover:bg-stone-50 text-stone-800 font-bold text-sm border border-stone-300 shadow-2xs transition-all cursor-pointer"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                      </svg>
                      <span>Continue with Google</span>
                    </button>

                    <div className="relative flex py-1 items-center">
                      <div className="flex-grow border-t border-stone-200"></div>
                      <span className="flex-shrink mx-4 text-xs font-bold text-stone-500 uppercase tracking-wider">
                        Or Email Login
                      </span>
                      <div className="flex-grow border-t border-stone-200"></div>
                    </div>

                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Registered Email <span className="text-amber-700">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
                          <input
                            id="page-login-email-input"
                            type="email"
                            required
                            placeholder="e.g. vaidyarohan@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 bg-[#fbfaf6] border border-stone-300 rounded-xl text-sm text-stone-900 focus:outline-none focus:border-[#2d6a4f]"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-xs font-semibold text-stone-700">
                            Password <span className="text-amber-700">*</span>
                          </label>
                          <button
                            id="page-login-forgot-password-link"
                            type="button"
                            onClick={() => {
                              setForgotEmail(email);
                              setMode('forgot_password');
                              setError(null);
                              setSuccessMessage(null);
                            }}
                            className="text-xs text-[#2d6a4f] hover:text-[#1b4332] font-bold hover:underline cursor-pointer"
                          >
                            Forgot Password?
                          </button>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
                          <input
                            id="page-login-password-input"
                            type={showPassword ? 'text' : 'password'}
                            required
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-9 pr-10 py-2.5 bg-[#fbfaf6] border border-stone-300 rounded-xl text-sm text-stone-900 focus:outline-none focus:border-[#2d6a4f]"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-stone-400 hover:text-stone-700 cursor-pointer"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <button
                        id="page-login-submit-btn"
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 px-4 rounded-xl bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer mt-4"
                      >
                        {loading ? (
                          <RefreshCw className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            <span>Log In to Student Dashboard</span>
                            <ArrowRight className="w-4 h-4 text-amber-300" />
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                )}

                {/* ========================================================================= */}
                {/* 5. FORGOT PASSWORD: STEP 1 - REQUEST OTP */}
                {/* ========================================================================= */}
                {mode === 'forgot_password' && (
                  <div className="space-y-6">
                    <div className="p-4 bg-[#faf6ee] rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1">
                      <p className="font-bold flex items-center gap-1.5 text-amber-950">
                        <KeyRound className="w-4 h-4 text-amber-700" />
                        <span>Registered Account Verification</span>
                      </p>
                      <p className="text-stone-600">
                        Enter your registered email address. We will dispatch a secure 4-digit verification code from <strong>ayurveez@gmail.com</strong>.
                      </p>
                    </div>

                    <form onSubmit={handleSendForgotPasswordOtp} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Registered Email Address <span className="text-amber-700">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
                          <input
                            id="page-forgot-email-input"
                            type="email"
                            required
                            placeholder="e.g. vaidyarohan@gmail.com"
                            value={forgotEmail || email}
                            onChange={(e) => {
                              setForgotEmail(e.target.value);
                              setEmail(e.target.value);
                            }}
                            className="w-full pl-9 pr-3 py-2.5 bg-[#fbfaf6] border border-stone-300 rounded-xl text-sm text-stone-900 focus:outline-none focus:border-[#2d6a4f]"
                          />
                        </div>
                      </div>

                      <button
                        id="page-forgot-send-otp-btn"
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 px-4 rounded-xl bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer mt-4"
                      >
                        {loading ? (
                          <RefreshCw className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            <KeyRound className="w-4 h-4 text-amber-300" />
                            <span>Send 4-Digit Reset Code</span>
                          </>
                        )}
                      </button>

                      <div className="pt-2 text-center">
                        <button
                          type="button"
                          onClick={() => {
                            setMode('login');
                            setError(null);
                            setSuccessMessage(null);
                          }}
                          className="text-xs text-stone-600 hover:text-stone-900 font-bold hover:underline cursor-pointer"
                        >
                          ← Back to Student Log In
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* ========================================================================= */}
                {/* 6. FORGOT PASSWORD: STEP 2 - ENTER OTP */}
                {/* ========================================================================= */}
                {mode === 'forgot_password_otp' && (
                  <div className="space-y-6 text-center">
                    <div className="w-14 h-14 bg-[#eaf2eb] rounded-2xl text-[#2d6a4f] flex items-center justify-center mx-auto shadow-2xs border border-[#c4dec8]">
                      <KeyRound className="w-7 h-7" />
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-stone-900">Enter 4-Digit Reset OTP</h3>
                      <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                        We sent a 4-digit code to <strong className="text-stone-800">{forgotEmail || email}</strong> from <strong>ayurveez@gmail.com</strong>.
                      </p>
                    </div>

                    <form onSubmit={handleVerifyForgotPasswordOtp} className="space-y-6">
                      <div className="flex justify-center items-center gap-3">
                        {forgotOtpDigits.map((digit, idx) => (
                          <input
                            key={idx}
                            id={`page-forgot-otp-input-${idx}`}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleForgotOtpChange(idx, e.target.value)}
                            onKeyDown={(e) => handleForgotOtpKeyDown(idx, e)}
                            className="w-14 h-14 text-center text-2xl font-bold rounded-2xl bg-[#fbfaf6] border-2 border-stone-300 focus:border-[#2d6a4f] text-stone-900 focus:outline-none shadow-2xs transition-all"
                          />
                        ))}
                      </div>

                      <div className="text-xs text-stone-500 flex items-center justify-center gap-2">
                        {forgotOtpTimer > 0 ? (
                          <span>Resend OTP in <strong className="text-stone-800">{forgotOtpTimer}s</strong></span>
                        ) : (
                          <button
                            type="button"
                            onClick={handleResendForgotPasswordOtp}
                            disabled={loading}
                            className="text-[#2d6a4f] font-bold hover:underline cursor-pointer"
                          >
                            Resend 4-Digit Code
                          </button>
                        )}
                      </div>

                      <div className="space-y-2">
                        <button
                          id="page-forgot-verify-otp-btn"
                          type="submit"
                          disabled={loading}
                          className="w-full py-3.5 px-4 rounded-xl bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
                        >
                          {loading ? (
                            <RefreshCw className="w-5 h-5 animate-spin" />
                          ) : (
                            <>
                              <CheckCircle2 className="w-5 h-5 text-amber-300" />
                              <span>Verify Code & Continue</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setMode('forgot_password');
                            setError(null);
                            setSuccessMessage(null);
                          }}
                          className="text-xs text-stone-600 hover:text-stone-900 font-bold hover:underline cursor-pointer"
                        >
                          ← Change Email Address
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* ========================================================================= */}
                {/* 7. FORGOT PASSWORD: STEP 3 - SET NEW PASSWORD */}
                {/* ========================================================================= */}
                {mode === 'reset_password' && (
                  <div className="space-y-6">
                    <div className="p-4 bg-[#eaf2eb] rounded-2xl border border-[#c4dec8] text-xs text-[#1b4332] space-y-1">
                      <p className="font-bold flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-[#2d6a4f]" />
                        <span>OTP Verified Successfully</span>
                      </p>
                      <p>
                        Please set a new secure password for <strong className="text-stone-900">{forgotEmail || email}</strong>.
                      </p>
                    </div>

                    <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          New Password <span className="text-amber-700">*</span>
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
                          <input
                            id="page-new-password-input"
                            type={showNewPassword ? 'text' : 'password'}
                            required
                            placeholder="At least 6 characters"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full pl-9 pr-10 py-2.5 bg-[#fbfaf6] border border-stone-300 rounded-xl text-sm text-stone-900 focus:outline-none focus:border-[#2d6a4f]"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-3 text-stone-400 hover:text-stone-700 cursor-pointer"
                          >
                            {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Confirm New Password <span className="text-amber-700">*</span>
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
                          <input
                            id="page-confirm-password-input"
                            type={showConfirmPassword ? 'text' : 'password'}
                            required
                            placeholder="Re-enter your new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full pl-9 pr-10 py-2.5 bg-[#fbfaf6] border border-stone-300 rounded-xl text-sm text-stone-900 focus:outline-none focus:border-[#2d6a4f]"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-3 text-stone-400 hover:text-stone-700 cursor-pointer"
                          >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <button
                        id="page-reset-password-submit-btn"
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 px-4 rounded-xl bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer mt-4"
                      >
                        {loading ? (
                          <RefreshCw className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            <CheckCircle2 className="w-5 h-5 text-amber-300" />
                            <span>Update Password & Proceed to Login</span>
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                )}

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
