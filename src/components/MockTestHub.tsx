import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Award, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  HelpCircle, 
  Bookmark, 
  RotateCcw, 
  Play, 
  FileText, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Sparkles,
  BarChart3,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CourseType, MockTest, Question, TestAttemptResult, UserProfile } from '../types';
import { MOCK_TESTS_DATA } from '../data/mockData';
import { saveTestResult } from '../firebase';

interface MockTestHubProps {
  user: UserProfile | null;
  selectedCourseFilter: string | null;
  onOpenAuth: () => void;
}

export const MockTestHub: React.FC<MockTestHubProps> = ({
  user,
  selectedCourseFilter,
  onOpenAuth,
}) => {
  const [courseFilter, setCourseFilter] = useState<string>(selectedCourseFilter || 'ALL');
  const [activeTest, setActiveTest] = useState<MockTest | null>(null);
  
  // Active Test State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [questionId: string]: number }>({});
  const [markedForReview, setMarkedForReview] = useState<{ [questionId: string]: boolean }>({});
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(0);
  const [isTestSubmitted, setIsTestSubmitted] = useState(false);
  const [testResult, setTestResult] = useState<TestAttemptResult | null>(null);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<'ALL' | 'CORRECT' | 'WRONG' | 'SKIPPED'>('ALL');

  useEffect(() => {
    if (selectedCourseFilter) {
      setCourseFilter(selectedCourseFilter);
    }
  }, [selectedCourseFilter]);

  // Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeTest && !isTestSubmitted && timeRemainingSeconds > 0) {
      interval = setInterval(() => {
        setTimeRemainingSeconds((prev) => {
          if (prev <= 1) {
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeTest, isTestSubmitted, timeRemainingSeconds]);

  const filteredTests = courseFilter === 'ALL'
    ? MOCK_TESTS_DATA
    : MOCK_TESTS_DATA.filter((t) => t.course === courseFilter);

  // Start Test
  const handleStartTest = (test: MockTest) => {
    setActiveTest(test);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setMarkedForReview({});
    setTimeRemainingSeconds(test.durationMinutes * 60);
    setIsTestSubmitted(false);
    setTestResult(null);
    setShowConfirmSubmit(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isTestSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleClearResponse = (questionId: string) => {
    if (isTestSubmitted) return;
    setUserAnswers((prev) => {
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
  };

  const handleToggleMarkForReview = (questionId: string) => {
    setMarkedForReview((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const handleAutoSubmit = () => {
    if (!activeTest || isTestSubmitted) return;
    calculateAndSaveResults();
  };

  const calculateAndSaveResults = async () => {
    if (!activeTest) return;

    let correct = 0;
    let wrong = 0;
    let unanswered = 0;
    let totalScore = 0;

    activeTest.questions.forEach((q) => {
      const chosen = userAnswers[q.id];
      if (chosen === undefined) {
        unanswered++;
      } else if (chosen === q.correctIndex) {
        correct++;
        totalScore += activeTest.marksPerCorrect;
      } else {
        wrong++;
        totalScore -= activeTest.negativeMark;
      }
    });

    const totalQuestions = activeTest.questions.length;
    const attempted = correct + wrong;
    const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
    const timeTaken = (activeTest.durationMinutes * 60) - timeRemainingSeconds;

    const result: TestAttemptResult = {
      userId: user?.uid || 'guest_aspirant',
      userName: user?.name || 'Aspirant',
      userEmail: user?.email || 'guest@ayurveez.com',
      testId: activeTest.id,
      testTitle: activeTest.title,
      course: activeTest.course,
      score: Math.max(0, totalScore),
      totalMarks: activeTest.totalMarks,
      correctAnswers: correct,
      wrongAnswers: wrong,
      unanswered,
      totalQuestions,
      accuracy,
      timeTakenSeconds: timeTaken,
      completedAt: new Date().toISOString(),
      userAnswers,
    };

    setTestResult(result);
    setIsTestSubmitted(true);
    setShowConfirmSubmit(false);

    // Save to Firebase Firestore
    if (user?.uid) {
      await saveTestResult(result);
    }

    // Confetti on good score
    if (accuracy >= 60) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (_) {}
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  // =========================================================================
  // RENDER: LIVE ACTIVE TEST INTERACTION
  // =========================================================================
  if (activeTest) {
    const currentQ = activeTest.questions[currentQuestionIndex];
    const isAnswered = userAnswers[currentQ?.id] !== undefined;
    const isMarked = markedForReview[currentQ?.id];

    return (
      <div className="min-h-screen bg-[#fbfaf6] text-stone-800 py-6 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Active Test Top Bar */}
          <div className="bg-white border border-[#e5dfd3] rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-lg bg-[#eaf2eb] text-[#1b4332] border border-[#c4dec8] text-xs font-bold">
                  {activeTest.course}
                </span>
                <span className="text-xs text-stone-500 font-semibold">{activeTest.category}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-stone-900">{activeTest.title}</h2>
            </div>

            {/* Timer & Submit Trigger */}
            <div className="flex items-center gap-4">
              {!isTestSubmitted && (
                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-mono font-bold text-base ${
                  timeRemainingSeconds < 300 
                    ? 'bg-red-50 text-red-700 border-red-300 animate-pulse' 
                    : 'bg-[#faf6ee] text-amber-900 border-amber-200'
                }`}>
                  <Clock className="w-4 h-4 text-amber-700" />
                  <span>{formatTime(timeRemainingSeconds)}</span>
                </div>
              )}

              {!isTestSubmitted ? (
                <button
                  id="submit-test-trigger-btn"
                  onClick={() => setShowConfirmSubmit(true)}
                  className="px-5 py-2.5 rounded-xl bg-[#2d6a4f] hover:bg-[#1b4332] text-white text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
                >
                  Submit Test
                </button>
              ) : (
                <button
                  id="exit-test-results-btn"
                  onClick={() => setActiveTest(null)}
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-stone-50 text-stone-800 text-sm font-bold border border-stone-300 cursor-pointer shadow-xs"
                >
                  Back to Test List
                </button>
              )}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RESULT SCORECARD & RATIONALE REVIEW */}
          {/* ========================================================================= */}
          {isTestSubmitted && testResult && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Scorecard Hero Box */}
              <div className="bg-white border border-[#e5dfd3] rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eaf2eb] text-[#1b4332] border border-[#c4dec8] text-xs font-bold uppercase mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      Test Completed Successfully
                    </div>
                    <h3 className="text-2xl font-black text-stone-900">Performance Scorecard & Analysis</h3>
                    <p className="text-xs text-stone-500 mt-0.5">Attempted by {testResult.userName}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleStartTest(activeTest)}
                      className="px-4 py-2 rounded-xl bg-[#faf6ee] hover:bg-[#f3ede0] text-amber-900 text-xs font-bold border border-amber-200 flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Re-Take Test</span>
                    </button>
                  </div>
                </div>

                {/* 4 Score Metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-[#fbfaf6] rounded-2xl border border-[#e5dfd3] text-center">
                    <div className="text-xs font-bold text-stone-500">Total Score</div>
                    <div className="text-3xl font-black text-amber-800 mt-1">
                      {testResult.score} <span className="text-xs text-stone-500 font-normal">/ {testResult.totalMarks}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-[#fbfaf6] rounded-2xl border border-[#e5dfd3] text-center">
                    <div className="text-xs font-bold text-stone-500">Accuracy</div>
                    <div className="text-3xl font-black text-[#2d6a4f] mt-1">
                      {testResult.accuracy}%
                    </div>
                  </div>

                  <div className="p-4 bg-[#fbfaf6] rounded-2xl border border-[#e5dfd3] text-center">
                    <div className="text-xs font-bold text-stone-500">Correct / Wrong</div>
                    <div className="text-2xl font-black text-stone-800 mt-1">
                      <span className="text-[#2d6a4f]">{testResult.correctAnswers}</span> / <span className="text-red-600">{testResult.wrongAnswers}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-[#fbfaf6] rounded-2xl border border-[#e5dfd3] text-center">
                    <div className="text-xs font-bold text-stone-500">Time Taken</div>
                    <div className="text-2xl font-black text-teal-800 mt-1">
                      {formatTime(testResult.timeTakenSeconds)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Questions Review List with Samhita Shlokas */}
              <div className="bg-white border border-[#e5dfd3] rounded-3xl p-6 sm:p-8 space-y-6 shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
                  <h4 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-amber-700" />
                    <span>Detailed Samhita Answer Key & Rationale</span>
                  </h4>

                  {/* Filter tabs for Review */}
                  <div className="flex items-center gap-1.5 p-1 bg-[#f4f0e6] rounded-xl border border-[#e2dacf] text-xs">
                    {(['ALL', 'CORRECT', 'WRONG', 'SKIPPED'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setReviewFilter(tab)}
                        className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                          reviewFilter === tab
                            ? 'bg-[#2d6a4f] text-white'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  {activeTest.questions.map((q, qIndex) => {
                    const userAnswer = userAnswers[q.id];
                    const isCorrect = userAnswer === q.correctIndex;
                    const isSkipped = userAnswer === undefined;

                    if (reviewFilter === 'CORRECT' && !isCorrect) return null;
                    if (reviewFilter === 'WRONG' && (isCorrect || isSkipped)) return null;
                    if (reviewFilter === 'SKIPPED' && !isSkipped) return null;

                    return (
                      <div 
                        key={q.id}
                        className={`p-5 rounded-2xl border ${
                          isCorrect 
                            ? 'bg-[#f4f8f4] border-[#c4dec8]' 
                            : isSkipped 
                            ? 'bg-[#fbfaf6] border-stone-200' 
                            : 'bg-red-50/70 border-red-200'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="w-7 h-7 rounded-lg bg-stone-100 text-stone-800 flex items-center justify-center font-bold text-xs border border-stone-300">
                              Q{qIndex + 1}
                            </span>
                            <span className="text-xs font-semibold text-stone-600">{q.subject}</span>
                          </div>

                          {isCorrect && (
                            <span className="px-2.5 py-0.5 rounded bg-[#eaf2eb] text-[#1b4332] border border-[#c4dec8] text-xs font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#2d6a4f]" /> Correct (+{activeTest.marksPerCorrect})
                            </span>
                          )}
                          {!isCorrect && !isSkipped && (
                            <span className="px-2.5 py-0.5 rounded bg-red-50 text-red-700 border border-red-200 text-xs font-bold flex items-center gap-1">
                              <XCircle className="w-3.5 h-3.5 text-red-600" /> Incorrect (-{activeTest.negativeMark})
                            </span>
                          )}
                          {isSkipped && (
                            <span className="px-2.5 py-0.5 rounded bg-stone-100 text-stone-600 text-xs font-bold">
                              Unattempted (0)
                            </span>
                          )}
                        </div>

                        {/* Sanskrit Shloka Reference if present */}
                        {q.shloka && (
                          <div className="mb-3 p-3 bg-[#faf6ee] rounded-xl border border-amber-200 text-amber-900 text-xs font-serif italic">
                            {q.shloka}
                            <div className="text-[10px] text-amber-800 font-sans mt-1 font-semibold">
                              Ref: {q.samhitaReference}
                            </div>
                          </div>
                        )}

                        <p className="text-sm font-bold text-stone-900 mb-4 leading-relaxed">
                          {q.question}
                        </p>

                        {/* Options List with Highlight */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                          {q.options.map((opt, oIdx) => {
                            const isChosen = userAnswer === oIdx;
                            const isTheCorrectOne = q.correctIndex === oIdx;

                            return (
                              <div
                                key={oIdx}
                                className={`p-3 rounded-xl text-xs font-medium border flex items-center justify-between ${
                                  isTheCorrectOne
                                    ? 'bg-[#eaf2eb] border-[#2d6a4f] text-[#1b4332] font-bold'
                                    : isChosen
                                    ? 'bg-red-50 border-red-300 text-red-800'
                                    : 'bg-white border-stone-200 text-stone-700'
                                }`}
                              >
                                <span>{String.fromCharCode(65 + oIdx)}. {opt}</span>
                                {isTheCorrectOne && <Check className="w-4 h-4 text-[#2d6a4f] shrink-0" />}
                                {isChosen && !isTheCorrectOne && <XCircle className="w-4 h-4 text-red-600 shrink-0" />}
                              </div>
                            );
                          })}
                        </div>

                        {/* Explanation Box */}
                        <div className="p-3.5 bg-[#faf6ee] rounded-xl border border-amber-200/70 text-xs text-stone-800 space-y-1">
                          <div className="font-bold text-amber-900 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                            <span>Samhita Rationale & Clinical Pearl:</span>
                          </div>
                          <p className="leading-relaxed text-stone-700">{q.explanation}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* ACTIVE TEST QUESTION BOARD & PALETTE */}
          {/* ========================================================================= */}
          {!isTestSubmitted && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Question Screen (Left 2 cols) */}
              <div className="lg:col-span-2 bg-white border border-[#e5dfd3] rounded-3xl p-6 sm:p-8 space-y-6 shadow-md">
                
                {/* Header with question number and review toggle */}
                <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-[#eaf2eb] text-[#1b4332] rounded-lg text-xs font-black border border-[#c4dec8]">
                      Question {currentQuestionIndex + 1} of {activeTest.questions.length}
                    </span>
                    <span className="text-xs text-stone-500 font-semibold">{currentQ.subject}</span>
                  </div>

                  <button
                    onClick={() => handleToggleMarkForReview(currentQ.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors flex items-center gap-1.5 cursor-pointer ${
                      isMarked 
                        ? 'bg-purple-50 text-purple-800 border-purple-300' 
                        : 'bg-stone-50 text-stone-600 border-stone-200 hover:text-stone-900'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{isMarked ? 'Marked for Review' : 'Mark for Review'}</span>
                  </button>
                </div>

                {/* Shloka Citation if present */}
                {currentQ.shloka && (
                  <div className="p-4 bg-[#faf6ee] rounded-2xl border border-amber-200 text-amber-900 font-serif text-sm italic leading-relaxed">
                    &quot;{currentQ.shloka}&quot;
                    <div className="text-[11px] text-amber-800 font-sans mt-2 font-semibold not-italic">
                      Classical Citation: {currentQ.samhitaReference}
                    </div>
                  </div>
                )}

                {/* Question Statement */}
                <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-relaxed">
                  {currentQ.question}
                </h3>

                {/* 4 Answer Options */}
                <div className="space-y-3">
                  {currentQ.options.map((option, idx) => {
                    const isSelected = userAnswers[currentQ.id] === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(currentQ.id, idx)}
                        className={`w-full p-4 rounded-xl text-left text-sm font-medium border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#eaf2eb] text-[#1b4332] border-[#2d6a4f] shadow-xs ring-1 ring-[#2d6a4f]'
                            : 'bg-[#fbfaf6] text-stone-800 border-stone-200 hover:border-stone-400 hover:bg-stone-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                            isSelected ? 'bg-[#2d6a4f] text-white' : 'bg-stone-200 text-stone-700'
                          }`}>
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{option}</span>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-[#2d6a4f]" />}
                      </button>
                    );
                  })}
                </div>

                {/* Bottom Action Controls */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-stone-100">
                  <div className="flex items-center gap-2">
                    {isAnswered && (
                      <button
                        onClick={() => handleClearResponse(currentQ.id)}
                        className="px-3 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold border border-stone-200 cursor-pointer"
                      >
                        Clear Response
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      disabled={currentQuestionIndex === 0}
                      onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                      className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 disabled:opacity-40 text-stone-700 text-xs font-bold border border-stone-300 flex items-center gap-1 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </button>

                    <button
                      disabled={currentQuestionIndex === activeTest.questions.length - 1}
                      onClick={() => setCurrentQuestionIndex((prev) => Math.min(activeTest.questions.length - 1, prev + 1))}
                      className="px-5 py-2 rounded-xl bg-[#2d6a4f] hover:bg-[#1b4332] disabled:opacity-40 text-white text-xs font-bold flex items-center gap-1 shadow-sm cursor-pointer"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>

              {/* Question Palette Sidebar (Right col) */}
              <div className="bg-white border border-[#e5dfd3] rounded-3xl p-6 space-y-5 shadow-md">
                <h4 className="text-sm font-bold text-stone-900 pb-3 border-b border-stone-100">
                  Question Palette ({activeTest.questions.length} Items)
                </h4>

                {/* Legend */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-600 pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-[#2d6a4f]"></span>
                    <span>Answered ({Object.keys(userAnswers).length})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-stone-200"></span>
                    <span>Not Answered</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-purple-600"></span>
                    <span>Marked Review</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded border border-amber-600"></span>
                    <span>Current Active</span>
                  </div>
                </div>

                {/* Palette Grid */}
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 max-h-72 overflow-y-auto pr-1">
                  {activeTest.questions.map((q, idx) => {
                    const answered = userAnswers[q.id] !== undefined;
                    const marked = markedForReview[q.id];
                    const isCurrent = currentQuestionIndex === idx;

                    let bgClass = 'bg-stone-100 text-stone-600 border-stone-200';
                    if (answered && marked) bgClass = 'bg-purple-100 text-purple-900 border-purple-300 font-bold';
                    else if (answered) bgClass = 'bg-[#2d6a4f] text-white border-[#2d6a4f] font-bold';
                    else if (marked) bgClass = 'bg-purple-50 text-purple-700 border-purple-200';

                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentQuestionIndex(idx)}
                        className={`h-10 rounded-xl text-xs font-bold border transition-all cursor-pointer ${bgClass} ${
                          isCurrent ? 'ring-2 ring-amber-500 scale-105' : ''
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-stone-100">
                  <button
                    onClick={() => setShowConfirmSubmit(true)}
                    className="w-full py-3 rounded-xl bg-[#2d6a4f] hover:bg-[#1b4332] text-white text-xs font-bold shadow-md cursor-pointer"
                  >
                    Submit All & View Results
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* Confirm Submission Modal */}
          {showConfirmSubmit && (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white border border-[#e5dfd3] rounded-2xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 mx-auto flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-stone-900">Submit Mock Test?</h3>
                <div className="p-4 bg-[#fbfaf6] rounded-xl text-xs text-stone-700 space-y-1.5 text-left border border-[#e2dacf]">
                  <div className="flex justify-between">
                    <span>Total Questions:</span>
                    <strong className="text-stone-900">{activeTest.questions.length}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Answered:</span>
                    <strong className="text-[#2d6a4f]">{Object.keys(userAnswers).length}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Unanswered / Skipped:</span>
                    <strong className="text-amber-800">{activeTest.questions.length - Object.keys(userAnswers).length}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Marked for Review:</span>
                    <strong className="text-purple-700">{Object.keys(markedForReview).filter(k => markedForReview[k]).length}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => setShowConfirmSubmit(false)}
                    className="py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold cursor-pointer"
                  >
                    Resume Test
                  </button>
                  <button
                    onClick={calculateAndSaveResults}
                    className="py-2.5 rounded-xl bg-[#2d6a4f] hover:bg-[#1b4332] text-white text-xs font-bold shadow-md cursor-pointer"
                  >
                    Yes, Submit Test
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    );
  }

  // =========================================================================
  // RENDER: MOCK TEST CATALOG / DIRECTORY
  // =========================================================================
  return (
    <section className="py-12 bg-[#fbfaf6] text-stone-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Clock className="w-3.5 h-3.5" />
            <span>Simulated Examination Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Mock Test Series Hub
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2">
            Practice timed NTA & PSC format question papers with negative marking, Sanskrit shloka references, and live accuracy analysis.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {(['ALL', 'BAMS', 'AIAPGET', 'AYUSH MEDICAL OFFICER'] as const).map((filterKey) => (
            <button
              key={filterKey}
              id={`mock-filter-${filterKey.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setCourseFilter(filterKey)}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                courseFilter === filterKey
                  ? 'bg-[#2d6a4f] text-white border-[#2d6a4f] shadow-xs'
                  : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
              }`}
            >
              {filterKey === 'ALL' ? 'All Test Series' : filterKey}
            </button>
          ))}
        </div>

        {/* Test Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test) => (
            <div
              key={test.id}
              className="bg-white border border-[#e5dfd3] hover:border-[#2d6a4f] rounded-3xl p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-sm hover:shadow-md"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-[#eaf2eb] text-[#1b4332] border border-[#c4dec8] text-[11px] font-bold">
                    {test.course}
                  </span>
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                    {test.difficulty}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-stone-900 group-hover:text-[#2d6a4f] transition-colors">
                    {test.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                    {test.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100 text-xs">
                  <div className="p-2.5 bg-[#fbfaf6] rounded-xl text-stone-700 border border-stone-100">
                    <span className="text-stone-500 block text-[10px]">Total Questions</span>
                    <strong className="text-stone-900">{test.questions.length} MCQs</strong>
                  </div>
                  <div className="p-2.5 bg-[#fbfaf6] rounded-xl text-stone-700 border border-stone-100">
                    <span className="text-stone-500 block text-[10px]">Time Duration</span>
                    <strong className="text-stone-900">{test.durationMinutes} Minutes</strong>
                  </div>
                  <div className="p-2.5 bg-[#fbfaf6] rounded-xl text-stone-700 border border-stone-100">
                    <span className="text-stone-500 block text-[10px]">Marking Scheme</span>
                    <strong className="text-amber-800">+{test.marksPerCorrect} / -{test.negativeMark}</strong>
                  </div>
                  <div className="p-2.5 bg-[#fbfaf6] rounded-xl text-stone-700 border border-stone-100">
                    <span className="text-stone-500 block text-[10px]">Total Marks</span>
                    <strong className="text-stone-900">{test.totalMarks} Marks</strong>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100">
                <button
                  id={`start-test-btn-${test.id}`}
                  onClick={() => handleStartTest(test)}
                  className="w-full py-3 rounded-xl bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.02]"
                >
                  <Play className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                  <span>Start Free Mock Test Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
