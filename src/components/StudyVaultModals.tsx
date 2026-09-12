import React, { useState } from 'react';
import { 
  X, 
  Zap, 
  BookOpenCheck, 
  Trophy, 
  Sparkles, 
  Briefcase, 
  GraduationCap, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Search, 
  Clock, 
  Share2, 
  ChevronRight, 
  RotateCw,
  ExternalLink,
  Building,
  Award
} from 'lucide-react';
import { CourseType } from '../types';

interface StudyVaultModalsProps {
  activeModal: 'rapid-recall' | 'pyq-vault' | 'mock-series' | 'flashcards' | 'ayush-jobs' | null;
  onClose: () => void;
  onNavigateToMockTests: () => void;
  onNavigateToFreeMaterials: () => void;
  onSelectCourse: (course: CourseType) => void;
  onOpenSignUp: () => void;
}

// Sample Data for Rapid Recall Cheat Sheets
const RAPID_RECALL_TOPICS = [
  {
    id: 'rr-1',
    subject: 'Kriya Sharir',
    title: 'Dosha Dhatu Mala Vridhi & Kshaya Lakshanas',
    samhita: 'Ashtanga Hridaya Sutrasthana 11',
    bullets: [
      'Vata Vriddhi: Karshya, Karshnya, Gatroshma, Kampa, Anaha, Shakrit Graha, Bala-Nidra-Indriya Bhransha.',
      'Vata Kshaya: Manda-cheshtata, Alpa-bhashite, Apraharsha, Moodha-sanjnata.',
      'Pitta Vriddhi: Peeta-vin-mutra-netra-tvak, Kshud-Trishna-Daha, Alpa-nidrata.',
      'Pitta Kshaya: Mando-anala, Sheeta-sparsha, Prabha-hani.',
      'Kapha Vriddhi: Agnisada, Praseka, Alasya, Gaurava, Shvaitya, Shaitya, Shlathangatva, Shwasa-Kasa-Atinidrata.',
      'Kapha Kshaya: Bhrama, Shunyashaya, Hrid-drava, Shlatha-sandhita.'
    ]
  },
  {
    id: 'rr-2',
    subject: 'Dravyaguna Vijnana',
    title: 'High-Yield Rasa-Panchaka & Karma Master Chart',
    samhita: 'Charaka & Sushruta Samhita',
    bullets: [
      'Guduchi (Tinospora cordifolia): Tikta-Kashaya Rasa, Ushna Virya, Madhura Vipaka | Tridosha-shamaka, Rasayana, Medhya.',
      'Haritaki (Terminalia chebula): Pancha-rasa (Lavana-varjita), Ushna Virya, Madhura Vipaka | Anulomana, Rasayana.',
      'Amalaki (Phyllanthus emblica): Pancha-rasa (Lavana-varjita), Sheeta Virya, Madhura Vipaka | Tridoshahara (esp. Pitta), Vayasthapana.',
      'Ashwagandha (Withania somnifera): Tikta-Katu-Madhura Rasa, Ushna Virya, Madhura Vipaka | Vata-Kaphashamaka, Balya, Vajikarana.'
    ]
  },
  {
    id: 'rr-3',
    subject: 'Rasa Shastra',
    title: 'Maharasa, Uparasa & Sadharana Rasa Classification & Sodhana',
    samhita: 'Rasa Ratna Samucchaya',
    bullets: [
      'Ashta Maharasa: Makshika, Vimala, Shila, Chapala, Rasaka, Sasyaka, Chapala (Vaikranta), Hingula.',
      'Ashta Uparasa: Gandhaka, Gairika, Kasisa, Kankshi, Haratala, Manashila, Anjana, Kankustha.',
      'Sodhana Media: Gandhaka - Go-dugdha/Ghrita swedana (Dola Yantra) | Parada - Mardana with Rasona & Saindhava | Haratala - Kushmanda Swarasa Swedana.'
    ]
  },
  {
    id: 'rr-4',
    subject: 'Kayachikitsa',
    title: 'Jwara Nidana-Chikitsa & Langhana Principles',
    samhita: 'Charaka Chikitsa 3',
    bullets: [
      'Jwara Pradhana Lakshana: Santapa (Deha-Manasa Santapa), Aruchi, Trishna, Angamarda, Hrid-vyatha.',
      'Amavastha Chikitsa: "Jwaradau Langhanam Proktam Jwaramadhye tu Pachanam | Jwarante Bheshajam Dadyat".',
      'Langhana is contraindicated in Vataja Jwara, Kshayaja Jwara, Bhaya/Krodha/Shokaja Jwara, and Garbhini.'
    ]
  }
];

// Sample University PYQs
const UNIVERSITY_PYQ_DATA = [
  {
    id: 'pyq-1',
    university: 'RGUHS (Karnataka)',
    year: '2024 / 2023',
    subject: 'Padartha Vijnana & Samhita Adhyayan',
    question: 'Describe Karya-Karana Siddhanta according to Nyaya and Vaisheshika Darshana. Explain its practical utility in Ayurvedic Chikitsa with classical examples.',
    marks: '10 Marks (Long Essay)',
    modelAnswerSummary: 'Satkaryavada (Sankhya) vs Asatkaryavada (Nyaya-Vaisheshika). Ayurveda accepts Parinama-vada & Karyakarana Siddhanta for Dhatu-Samya Kriya ("Karyam Dhatu Samyam"). Every disease (Karya) has Hetu (Karana).'
  },
  {
    id: 'pyq-2',
    university: 'MUHS (Maharashtra)',
    year: '2024',
    subject: 'Dravyaguna Vijnana Paper I',
    question: 'Define Vipaka according to Charaka and Vagbhata. Explain the difference between Avasthapaka and Nishthapaka (Vipaka) with suitable examples.',
    marks: '10 Marks (Long Essay)',
    modelAnswerSummary: 'Jatharagnina Yogad Yad Udeti Rasantaram (Charaka). Trividha Vipaka (Madhura, Amla, Katu) according to Charaka & Ashtanga Hridaya. Avasthapaka is intermediate digestion in Amashaya/Pachyamanashaya/Pakvashaya.'
  },
  {
    id: 'pyq-3',
    university: 'BPSC / UPPSC AYUSH Medical Officer',
    year: '2023 Solved Paper',
    subject: 'Ayurvedic Jurisprudence & Public Health',
    question: 'According to Drugs & Cosmetics Act 1940 (Schedule T), describe Good Manufacturing Practices (GMP) requirements for Ayurvedic Pharmacies.',
    marks: 'MCQ & Descriptive',
    modelAnswerSummary: 'Schedule T specifies factory premises, hygiene, raw material testing, QC labs, master formula records, batch manufacturing, and Ayurvedic Pharmacopoeia of India (API) standards.'
  },
  {
    id: 'pyq-4',
    university: 'WBUHS (West Bengal)',
    year: '2023',
    subject: 'Roga Nidan & Vikriti Vijnana',
    question: 'Explain Shatkriyakala according to Sushruta Samhita (Sutra 21) and explain its importance in early diagnosis and Samprapti Vighatana.',
    marks: '10 Marks (Long Essay)',
    modelAnswerSummary: '1. Sanchaya, 2. Prakopa, 3. Prasara, 4. Sthanasamsraya, 5. Vyakti, 6. Bheda. Treatment at early Kriyakala prevents structural organ pathology and Dhatugatadosha.'
  }
];

// Sample Interactive Mnemonic Flashcards
const FLASHCARDS_DATA = [
  {
    id: 'fc-1',
    category: 'Charaka Agrya Aushadha',
    prompt: 'What is the Agrya Dravya for "Deepaneeya, Pachaneeya, Sangrahika & Kapha-Vata Prashamana"?',
    answer: 'NAGARA (Shunthi / Zingiber officinale)',
    shloka: 'नागरं दीपनीयपाचनीयसंग्रहिककफवातप्रशमनानाम् (च. सू. २५)',
    mnemonicTrick: 'Mnemonic: "NAGARA" = No Agni? Good And Rapid Action for Kapha-Vata!'
  },
  {
    id: 'fc-2',
    category: 'Charaka Agrya Aushadha',
    prompt: 'What is the Agrya Dravya for "Vayasthapana (Anti-Aging)" according to Acharya Charaka?',
    answer: 'HARITAKI (Terminalia chebula)',
    shloka: 'हरीतकी वयःस्थापनानाम् (च. सू. २५)',
    mnemonicTrick: 'Mnemonic: "H"arilata = "H"alt Aging with Haritaki!'
  },
  {
    id: 'fc-3',
    category: 'Panchakarma Protocol',
    prompt: 'What is the standard duration (Kala) of Sneha Pana for Mridu, Madhyama, and Krura Koshtha?',
    answer: 'Mridu Koshtha: 3 Days | Madhyama: 5-6 Days | Krura Koshtha: 7 Days (Max 7 days)',
    shloka: 'त्र्यहात् सप्तदिनात् परं स्नेहः सात्मीभवति (वाग्भट)',
    mnemonicTrick: 'Rule of 3-5-7: Never exceed 7 days to avoid Asatmya Sneha.'
  },
  {
    id: 'fc-4',
    category: 'Botanical & Dravyaguna Family',
    prompt: 'Identify the Botanical Name & Family of "Shatavari" & "Ashwagandha"',
    answer: 'Shatavari: Asparagus racemosus (Liliaceae / Asparagaceae) | Ashwagandha: Withania somnifera (Solanaceae)',
    shloka: 'शतावरी बहुसुता धीरा पीवरी सूक्ष्मपत्रिका',
    mnemonicTrick: 'Mnemonic: "A"shwagandha = "S"olanaceae ("AS"), "S"hatavari = "A"sparagus ("SA").'
  }
];

// Sample AYUSH Jobs Data
const AYUSH_JOBS_DATA = [
  {
    id: 'job-1',
    title: 'UPSC AYUSH Medical Officer (Ayurveda)',
    organization: 'Union Public Service Commission (Govt of India)',
    vacancies: '58+ Posts (Central Health Scheme)',
    eligibility: 'BAMS Degree + State/Central Board Registration',
    status: 'Upcoming Cycle / Notification Alert Active',
    badge: 'Central Govt - Group A'
  },
  {
    id: 'job-2',
    title: 'State PSC Ayurveda Medical Officer (UPPSC / BPSC / MPPSC)',
    organization: 'State Public Service Commissions',
    vacancies: '600+ Sanctioned Seats across States',
    eligibility: 'BAMS from recognized NCISM Institute + Internship Completion',
    status: 'Exam Preparation & Syllabus Tracking Active',
    badge: 'Gazetted Officer'
  },
  {
    id: 'job-3',
    title: 'National AYUSH Mission (NAM / NHM) Medical Officer',
    organization: 'National Health Mission & Health Wellness Centers',
    vacancies: 'District Wise Continuous Openings',
    eligibility: 'BAMS with Clinical Internship',
    status: 'State-wise Walk-in & Merit Lists',
    badge: 'Clinical Practice'
  },
  {
    id: 'job-4',
    title: 'CCRAS Research Officer & Medical Consultant',
    organization: 'Central Council for Research in Ayurvedic Sciences',
    vacancies: 'Clinical Research Institutes Pan-India',
    eligibility: 'BAMS / MD (Ayu) preferred',
    status: 'Notification Portal Live',
    badge: 'Research & Academia'
  }
];

export const StudyVaultModals: React.FC<StudyVaultModalsProps> = ({
  activeModal,
  onClose,
  onNavigateToMockTests,
  onNavigateToFreeMaterials,
  onSelectCourse,
  onOpenSignUp,
}) => {
  // State for Rapid Recall Modal
  const [selectedRecallTopic, setSelectedRecallTopic] = useState(RAPID_RECALL_TOPICS[0]);

  // State for University PYQs
  const [selectedUniversityFilter, setSelectedUniversityFilter] = useState('ALL');
  const [activePyqId, setActivePyqId] = useState<string | null>(null);

  // State for Flashcards
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!activeModal) return null;

  const currentFlashcard = FLASHCARDS_DATA[flashcardIndex];

  const handleNextFlashcard = () => {
    setIsFlipped(false);
    setFlashcardIndex((prev) => (prev + 1) % FLASHCARDS_DATA.length);
  };

  const handlePrevFlashcard = () => {
    setIsFlipped(false);
    setFlashcardIndex((prev) => (prev - 1 + FLASHCARDS_DATA.length) % FLASHCARDS_DATA.length);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="relative bg-white border border-[#e5dfd3] rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-5 sm:p-7 space-y-6 shadow-2xl text-stone-800 animate-in fade-in zoom-in-95 duration-200">
        
        {/* ======================================================================= */}
        {/* 1. RAPID RECALL EXAM SERIES MODAL                                       */}
        {/* ======================================================================= */}
        {activeModal === 'rapid-recall' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-stone-900 font-serif">
                    Rapid Recall Exam Crash Notes
                  </h3>
                  <p className="text-xs text-stone-500 font-medium">
                    Specially designed for fast university & competitive exam revisions
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Subject Tabs */}
            <div className="flex flex-wrap gap-1.5">
              {RAPID_RECALL_TOPICS.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setSelectedRecallTopic(topic)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedRecallTopic.id === topic.id
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  {topic.subject}
                </button>
              ))}
            </div>

            {/* Topic Content Card */}
            <div className="bg-[#faf8f5] border border-indigo-100 rounded-2xl p-4 sm:p-5 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-200">
                  {selectedRecallTopic.subject}
                </span>
                <span className="text-xs text-stone-500 font-medium">{selectedRecallTopic.samhita}</span>
              </div>

              <h4 className="text-base font-bold text-stone-900 font-serif">
                {selectedRecallTopic.title}
              </h4>

              <div className="space-y-2.5 pt-1">
                {selectedRecallTopic.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-800 bg-white p-3 rounded-xl border border-stone-200/80">
                    <span className="w-5 h-5 rounded-md bg-indigo-100 text-indigo-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="leading-relaxed">{bullet}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-stone-500 text-center sm:text-left">
                Want 500+ one-page rapid recall sheets for all BAMS years?
              </span>
              <button
                onClick={() => {
                  onClose();
                  onNavigateToFreeMaterials();
                }}
                className="w-full sm:w-auto px-4 py-2.5 bg-[#2d6a4f] hover:bg-[#1b4332] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Browse Full Free Material Folders</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================================= */}
        {/* 2. UNIVERSITY PYQ ARCHIVE MODAL                                         */}
        {/* ======================================================================= */}
        {activeModal === 'pyq-vault' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <BookOpenCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-stone-900 font-serif">
                    University PYQ Vault (Solved Papers)
                  </h3>
                  <p className="text-xs text-stone-500 font-medium">
                    University-wise and state-wise previous year questions & model answers
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* University Filter Buttons */}
            <div className="flex flex-wrap gap-1.5">
              {['ALL', 'RGUHS (Karnataka)', 'MUHS (Maharashtra)', 'BPSC / UPPSC', 'WBUHS'].map((univ) => (
                <button
                  key={univ}
                  onClick={() => setSelectedUniversityFilter(univ)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedUniversityFilter === univ
                      ? 'bg-[#2d6a4f] text-white shadow-xs'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  {univ === 'ALL' ? 'All Universities' : univ}
                </button>
              ))}
            </div>

            {/* Questions List */}
            <div className="space-y-3">
              {UNIVERSITY_PYQ_DATA.filter(q => selectedUniversityFilter === 'ALL' || q.university.includes(selectedUniversityFilter) || (selectedUniversityFilter === 'BPSC / UPPSC' && q.university.includes('BPSC'))).map((item) => {
                const isOpen = activePyqId === item.id;
                return (
                  <div key={item.id} className="bg-white border border-stone-200 rounded-2xl p-4 space-y-2 shadow-2xs hover:border-[#2d6a4f] transition-colors">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-[#1b4332] bg-[#eaf2eb] px-2.5 py-0.5 rounded-md border border-[#c4dec8]">
                        {item.university}
                      </span>
                      <span className="text-[11px] text-amber-900 bg-amber-50 px-2 py-0.5 rounded font-semibold border border-amber-200">
                        {item.marks}
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-stone-900 leading-snug">
                      {item.question}
                    </h4>

                    <div className="pt-2 border-t border-stone-100">
                      <button
                        onClick={() => setActivePyqId(isOpen ? null : item.id)}
                        className="text-xs font-bold text-[#2d6a4f] hover:text-[#1b4332] flex items-center gap-1 cursor-pointer"
                      >
                        <span>{isOpen ? 'Hide Model Answer Key' : 'View Model Answer Key & Analysis'}</span>
                        <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                      </button>

                      {isOpen && (
                        <div className="mt-2.5 p-3.5 bg-[#faf8f5] rounded-xl border border-stone-200 text-xs text-stone-700 leading-relaxed animate-in fade-in duration-150">
                          <strong className="text-stone-900 block mb-1">Key Examination Points:</strong>
                          {item.modelAnswerSummary}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-stone-500 text-center sm:text-left">
                Access chapter-wise question banks inside Free Materials:
              </span>
              <button
                onClick={() => {
                  onClose();
                  onNavigateToFreeMaterials();
                }}
                className="w-full sm:w-auto px-4 py-2.5 bg-[#2d6a4f] hover:bg-[#1b4332] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Go to Free Materials
              </button>
            </div>
          </div>
        )}

        {/* ======================================================================= */}
        {/* 3. MOCK TEST SERIES MODAL                                               */}
        {/* ======================================================================= */}
        {activeModal === 'mock-series' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-stone-900 text-white flex items-center justify-center font-bold">
                  <Trophy className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-stone-900 font-serif">
                    Grand Mock Test Series
                  </h3>
                  <p className="text-xs text-stone-500 font-medium">
                    NTA & NCISM examination simulation with live timer and analytics
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Features Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 bg-[#faf8f5] rounded-2xl border border-stone-200 text-center space-y-1">
                <Clock className="w-5 h-5 text-[#2d6a4f] mx-auto" />
                <div className="text-xs font-bold text-stone-900">Real Exam Timers</div>
                <div className="text-[10px] text-stone-500">120 Minutes & Speed Tests</div>
              </div>
              <div className="p-3.5 bg-[#faf8f5] rounded-2xl border border-stone-200 text-center space-y-1">
                <Award className="w-5 h-5 text-amber-700 mx-auto" />
                <div className="text-xs font-bold text-stone-900">Negative Marking</div>
                <div className="text-[10px] text-stone-500">+4 / -1 NTA Standard</div>
              </div>
              <div className="p-3.5 bg-[#faf8f5] rounded-2xl border border-stone-200 text-center space-y-1">
                <Sparkles className="w-5 h-5 text-indigo-600 mx-auto" />
                <div className="text-xs font-bold text-stone-900">Instant Explanations</div>
                <div className="text-[10px] text-stone-500">Shloka references for all MCQs</div>
              </div>
            </div>

            {/* Available Tests Teaser */}
            <div className="space-y-2.5">
              <div className="p-4 bg-white border border-stone-200 rounded-2xl flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                    All-India Grand Mock 01
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-stone-900 mt-1">
                    Brihattrayi Full Syllabus Grand Simulation Test (120 Questions)
                  </h4>
                  <span className="text-[11px] text-stone-500">Charaka, Sushruta, Vagbhata & Modern Correlation</span>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToMockTests();
                  }}
                  className="px-4 py-2 bg-[#2d6a4f] hover:bg-[#1b4332] text-white text-xs font-bold rounded-xl whitespace-nowrap cursor-pointer shadow-xs"
                >
                  Start Test
                </button>
              </div>

              <div className="p-4 bg-white border border-stone-200 rounded-2xl flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#1b4332] bg-[#eaf2eb] px-2 py-0.5 rounded">
                    Subject Wise Sprint
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-stone-900 mt-1">
                    Dravyaguna & Rasa Shastra 50-MCQ Rapid Challenge
                  </h4>
                  <span className="text-[11px] text-stone-500">Rasa, Virya, Vipaka & Shodhana Formulations</span>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToMockTests();
                  }}
                  className="px-4 py-2 bg-[#2d6a4f] hover:bg-[#1b4332] text-white text-xs font-bold rounded-xl whitespace-nowrap cursor-pointer shadow-xs"
                >
                  Start Test
                </button>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-end">
              <button
                onClick={() => {
                  onClose();
                  onNavigateToMockTests();
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#1b4332] hover:bg-[#143628] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Launch Mock Test Arena</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================================= */}
        {/* 4. MNEMONIC & SHLOKA FLASHCARDS MODAL (Swipe & Learn)                   */}
        {/* ======================================================================= */}
        {activeModal === 'flashcards' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-stone-900 font-serif">
                    Samhita Mnemonic & Shloka Cards
                  </h3>
                  <p className="text-xs text-stone-500 font-medium">
                    Card {flashcardIndex + 1} of {FLASHCARDS_DATA.length} • Tap card to reveal answer
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Interactive Flashcard Card */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="cursor-pointer bg-gradient-to-br from-[#faf6f0] to-[#f4ebe1] border-2 border-rose-200 hover:border-rose-400 rounded-3xl p-6 sm:p-8 min-h-[220px] flex flex-col justify-between items-center text-center transition-all duration-300 shadow-md hover:shadow-lg select-none group"
            >
              <div className="w-full flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-rose-900 bg-rose-100 px-2.5 py-0.5 rounded-full">
                  {currentFlashcard.category}
                </span>
                <span className="text-[11px] text-stone-400 font-medium flex items-center gap-1">
                  <RotateCw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-300" />
                  <span>Click to Flip</span>
                </span>
              </div>

              {/* Front / Back State */}
              <div className="my-auto py-4 space-y-3 w-full">
                {!isFlipped ? (
                  <>
                    <p className="text-xs text-rose-700 font-bold uppercase tracking-wider">QUESTION / PROMPT</p>
                    <h4 className="text-base sm:text-xl font-bold text-stone-900 font-serif leading-snug">
                      {currentFlashcard.prompt}
                    </h4>
                  </>
                ) : (
                  <div className="space-y-2 animate-in fade-in zoom-in-95 duration-200">
                    <p className="text-xs text-emerald-700 font-bold uppercase tracking-wider">ANSWER</p>
                    <h4 className="text-base sm:text-xl font-black text-emerald-950 font-serif">
                      {currentFlashcard.answer}
                    </h4>
                    <p className="text-xs font-serif italic text-stone-600 bg-white/80 p-2 rounded-xl border border-stone-200/80">
                      {currentFlashcard.shloka}
                    </p>
                    <p className="text-xs text-indigo-900 font-bold bg-indigo-50 p-2 rounded-xl border border-indigo-200">
                      💡 {currentFlashcard.mnemonicTrick}
                    </p>
                  </div>
                )}
              </div>

              <div className="text-[11px] text-stone-500 font-medium">
                {isFlipped ? 'Tap card again to see question' : 'Tap to test your recall'}
              </div>
            </div>

            {/* Flashcard Navigation Controls */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={handlePrevFlashcard}
                className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous Card</span>
              </button>

              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                {isFlipped ? 'Hide Answer' : 'Show Answer'}
              </button>

              <button
                onClick={handleNextFlashcard}
                className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <span>Next Card</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================================= */}
        {/* 5. AYUSH JOBS & CAREERS MODAL                                           */}
        {/* ======================================================================= */}
        {activeModal === 'ayush-jobs' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-stone-900 font-serif">
                    AYUSH Jobs, Vacancies & Career Opportunities
                  </h3>
                  <p className="text-xs text-stone-500 font-medium">
                    National & State AYUSH medical recruitment updates for BAMS graduates
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Opportunities List */}
            <div className="space-y-3">
              {AYUSH_JOBS_DATA.map((job) => (
                <div key={job.id} className="bg-white border border-stone-200 rounded-2xl p-4 space-y-2 shadow-2xs hover:border-blue-500 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                      {job.badge}
                    </span>
                    <span className="text-[11px] text-stone-500 font-semibold">{job.vacancies}</span>
                  </div>

                  <h4 className="text-sm font-bold text-stone-900">
                    {job.title}
                  </h4>

                  <p className="text-xs text-stone-600">
                    <strong>Organization:</strong> {job.organization}
                  </p>

                  <p className="text-xs text-stone-600">
                    <strong>Eligibility:</strong> {job.eligibility}
                  </p>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-[#2d6a4f]">
                      Status: {job.status}
                    </span>
                    <a
                      href="https://t.me/ayurveez"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <span>Join Telegram Alerts</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-stone-500 text-center sm:text-left">
                Start Medical Officer preparation today with our AYUSH MO series:
              </span>
              <button
                onClick={() => {
                  onClose();
                  onSelectCourse('AYUSH MEDICAL OFFICER');
                }}
                className="w-full sm:w-auto px-4 py-2.5 bg-[#2d6a4f] hover:bg-[#1b4332] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                View AYUSH MO Course Track
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
