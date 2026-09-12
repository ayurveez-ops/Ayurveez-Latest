import { db } from '../firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

export type AspectRatioType = '1:1' | '4:3' | '16:9';
export type MaterialType = 'lecture' | 'note' | 'test';

export interface SubjectMaterialItem {
  id: string;
  title: string;
  type: MaterialType; // 'lecture' | 'note' | 'test'
  url: string; // Google Drive link or video/PDF link
  isFree: boolean; // true = Free demo preview, false = Paid/locked
  durationOrPages?: string; // e.g. "45 mins", "24 pages", "50 MCQs"
  chapter?: string;
  description?: string;
  uploadedAt?: string;
}

export interface BamsSubject {
  id: string;
  name: string;
  hindiName: string;
  codeName: string;
  syllabusCode: string;
  lecturesCount: number;
  notesCount: number;
  testsCount: number;
  badge: string;
  description: string;
  syllabusHighlights: string[];
  thumbnailUrl: string;
  driveLink?: string;
  aspectRatio: AspectRatioType;
  color?: string;
  // Subject pricing
  originalPrice?: number;
  discountedPrice?: number;
  discountPercentage?: number;
  // Subject materials
  materials?: SubjectMaterialItem[];
}

export interface BamsProfCourse {
  id: string; // '1st' | '2nd' | 'final' | custom
  shortTitle: string;
  batchName: string;
  cardImage: string;
  driveLink?: string;
  aspectRatio: AspectRatioType;
  title: string;
  subtitle: string;
  duration: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  savings: number;
  validity: string;
  codePrefix: string;
  acceptedCodes: string[];
  bannerGradient: string;
  accentColor: string;
  accentBorder: string;
  ncismBatch: string;
  enrolledStudentsCount: string;
  highlights: string[];
  subjects: BamsSubject[];
}

export interface TopLevelCourse {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  description: string;
  category: string;
  thumbnailUrl?: string;
  driveLink?: string;
  aspectRatio?: AspectRatioType;
  studentsCount?: string;
  originalPrice?: number;
  discountedPrice?: number;
  activeBatch?: string;
  externalRegistrationUrl?: string;
  features?: string[];
}

// Helper to convert any Google Drive URL into a direct, embeddable image URL
export function convertGoogleDriveUrl(inputUrl: string): string {
  if (!inputUrl) return '';
  const trimmed = inputUrl.trim();
  
  // If it's already a direct image path or local path
  if (
    trimmed.startsWith('/images') || 
    trimmed.startsWith('data:image') || 
    trimmed.startsWith('blob:') ||
    trimmed.includes('lh3.googleusercontent.com')
  ) {
    return trimmed;
  }

  // Regex patterns for Google Drive share links
  const fileMatch = 
    trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
    trimmed.match(/id=([a-zA-Z0-9_-]+)/) ||
    trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/) ||
    (trimmed.length > 20 && !trimmed.includes('/') ? [null, trimmed] : null);

  if (fileMatch && fileMatch[1]) {
    const fileId = fileMatch[1];
    // Google's official user content CDN format that embeds without authentication
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }

  return trimmed;
}

// Local storage keys
const STORAGE_KEYS = {
  BAMS_PROFFS: 'ayurveez_bams_proffs_hierarchy_v2',
  TOP_COURSES: 'ayurveez_top_courses_hierarchy_v2'
};

// Initial default Top-Level Courses
export const DEFAULT_TOP_COURSES: TopLevelCourse[] = [
  {
    id: 'BAMS',
    name: 'BAMS Degree Masterclasses',
    badge: '1st, 2nd & Final Proff',
    tagline: 'Comprehensive University Syllabus & Classical Samhita Adhyayan',
    description: 'NCISM competency-based complete foundation across all professional academic years with integrated clinical correlations and solved exam question banks.',
    category: 'Degree Foundation',
    thumbnailUrl: '/images/bams/1st_proff_1_1.png',
    aspectRatio: '1:1',
    studentsCount: '8,400+ Students',
    originalPrice: 5999,
    discountedPrice: 2999,
    activeBatch: 'Atreya, Agnivesh & Charaka Batches',
    features: [
      'Comprehensive coverage for 1st, 2nd & Final Proff.',
      'Classical Samhita Shloka Anvaya & Tikakara commentaries',
      'Downloadable chapter-wise notes & high-yield charts',
      'NCISM question bank and university solved test series'
    ]
  },
  {
    id: 'AIAPGET',
    name: 'AIAPGET (Ayurveda PG Entrance)',
    badge: 'Top Rank Guarantee',
    tagline: 'All India AYUSH Post Graduate Entrance Test Master Track',
    description: 'Intensive Samhita-wise drill, subject capsules, high-yield comparative tables, and 10,000+ assertion-reasoning clinical MCQ question bank.',
    category: 'Competitive PG',
    thumbnailUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
    aspectRatio: '16:9',
    studentsCount: '12,500+ Aspirants',
    originalPrice: 14999,
    discountedPrice: 7999,
    activeBatch: 'Sushruta Target 2026 Batch',
    features: [
      'Daily live clinical doubt & high-yield revision',
      '10,000+ AIAPGET pattern NTA mock questions',
      'Brihattrayi & Laghuttrayi quick revision compendiums',
      'All India rank analytics and performance metrics'
    ]
  },
  {
    id: 'AYUSH MEDICAL OFFICER',
    name: 'AYUSH Medical Officer (AMO/MO)',
    badge: 'Govt. Exam Specialist',
    tagline: 'State PSC, UPSC & NHM Ayurvedic Medical Officer Recruitment',
    description: 'Designed exclusively for state PSC examinations, UPSC medical officers, and national health mission recruitment with focused clinical and administrative modules.',
    category: 'Govt. Recruitment',
    thumbnailUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    aspectRatio: '16:9',
    studentsCount: '5,200+ Officers',
    originalPrice: 11999,
    discountedPrice: 5999,
    activeBatch: 'Dhanwantari State PSC Batch',
    features: [
      'State-specific Ayurvedic Pharmacopoeia & Law',
      'Community health, preventive medicine & national health programs',
      'Subject-wise model papers with negative marking simulation',
      'Interview guidance and previous year solved questions'
    ]
  }
];

// Initial default BAMS Proff Courses
export const DEFAULT_BAMS_PROFFS: Record<string, BamsProfCourse> = {
  '1st': {
    id: '1st',
    shortTitle: '1st Proff.',
    batchName: 'Atreya Batch',
    cardImage: '/images/bams/1st_proff_1_1.png',
    aspectRatio: '1:1',
    title: 'BAMS 1st Professional Complete Masterclass',
    subtitle: 'NCISM Competency-Based Foundation: Classical Samhitas, Anatomy, Physiology & Sanskrit',
    duration: '18 Months University Track',
    originalPrice: 5999,
    discountedPrice: 2999,
    discountPercentage: 50,
    savings: 3000,
    validity: 'Full 1st Professional Academic Cycle + Exam Guarantee',
    codePrefix: 'BAMS1ST',
    acceptedCodes: ['AYURVEEZ1ST', 'BAMS1ST', 'AVZ1ST', 'BAMS2026', 'AYUR1ST'],
    bannerGradient: 'from-[#143d2b] via-[#1b4332] to-[#0f281e]',
    accentColor: '#2d6a4f',
    accentBorder: '#c4dec8',
    ncismBatch: 'NCISM New Syllabus & Exam Pattern Aligned',
    enrolledStudentsCount: '3,840+ Students Enrolled',
    highlights: [
      'Comprehensive coverage of all 5 core first professional subjects',
      'Word-by-word Sanskrit Anvaya with Chakrapani & Arundatta commentary',
      'High-yield Marma Sharir & Modern Anatomy correlation charts',
      'Human Physiology (Kriya Sharir) integrated with Western clinical labs',
      'Previous 5 Years University Solved Question Papers & Model Answers'
    ],
    subjects: [
      {
        id: 'samhita-1',
        name: 'Samhita Adhyayan 1',
        hindiName: 'संहिता अध्ययन १',
        codeName: 'Charaka Samhita Sutrasthana (1-12) & Ashtanga Hridaya Sutrasthana (1-15)',
        syllabusCode: 'AyUG-SA1',
        lecturesCount: 65,
        notesCount: 42,
        testsCount: 15,
        badge: 'Core Samhita Foundation',
        thumbnailUrl: '/images/bams/samhita_1_4_3.jpg',
        aspectRatio: '4:3',
        color: '#1b4332',
        description: 'Complete classical textual study with Sanskrit anvaya, Chakrapani and Arundatta commentaries, and practical clinical applicability for foundational concepts.',
        syllabusHighlights: [
          'Charaka Sutrasthana Ch. 1-12: Dirghanjivitiya, Apamarga, Aragvadhiya, Shadvirechana, Matrashitiya, Tasyashitiya',
          'Ashtanga Hridaya Sutrasthana Ch. 1-15: Ayushkamiya, Dinacharya, Ritucharya, Roganutpadaniya, Doshabhediya',
          'Word-by-word Sanskrit padachheda, grammatical analysis, and anvaya breakdown',
          'Clinical correlations with modern preventive and lifestyle medicine principles'
        ]
      },
      {
        id: 'rachana-sharir',
        name: 'Rachana Sharir',
        hindiName: 'रचना शारीर',
        codeName: 'Human Anatomy with Ayurvedic Classical Sharir & Marma Vigyan',
        syllabusCode: 'AyUG-RS',
        lecturesCount: 80,
        notesCount: 56,
        testsCount: 20,
        badge: 'Dissection & Marma',
        thumbnailUrl: '/images/bams/rachna_4_3.jpg',
        aspectRatio: '4:3',
        color: '#2d6a4f',
        description: 'Detailed Ayurvedic embryology (Garbha Sharir), bone osteology (Asthi), joints (Sandhi), muscles (Peshi), and 107 Marma points correlated with modern human dissection.',
        syllabusHighlights: [
          'Garbha Sharir: Embryogenesis, Shukra-Shonita Prakriti, Garbha Vriddhi, and developmental milestones',
          'Marma Vigyan: 107 vital points classification, anatomical correlation, and injury consequences (Sadyopranahara to Rujakara)',
          'Sira-Dhamani-Srotas: Cardiovascular, lymphatic, and macro-micro circulatory systems comparison',
          'Modern Gross Anatomy: Thorax, Abdomen, Pelvis, Upper Limb, Lower Limb, and Neuroanatomy dissection guides'
        ]
      },
      {
        id: 'kriya-sharir',
        name: 'Kriya Sharir',
        hindiName: 'क्रिया शारीर',
        codeName: 'Human Physiology with Dosha, Dhatu, Mala & Prakriti Assessment',
        syllabusCode: 'AyUG-KS',
        lecturesCount: 75,
        notesCount: 48,
        testsCount: 18,
        badge: 'Clinical Physiology',
        thumbnailUrl: '/images/bams/kriya_4_3.jpg',
        aspectRatio: '4:3',
        color: '#122e21',
        description: 'The foundation of Ayurvedic physiology exploring Vata-Pitta-Kapha dynamics, Sapta Dhatu metabolism, Mala function, and clinical laboratory investigations.',
        syllabusHighlights: [
          'Tridosha Vigyan: Guna, Karma, Sthana, Kshaya-Vriddhi lakshanas, and biological rhythm regulation',
          'Sapta Dhatu & Ojas: Dhatu Poshana Nyaya (Kshira-Dadhi, Kedari-Kulya, Khale-Kapota) and metabolic stages',
          'Agni & Kostha: Pachakagni, Dhatwagni, Bhutagni assessment and dietary digestion kinetics',
          'Modern Systems Physiology: Blood hematology, cardiology, respiration, renal, and neuro-endocrine axes'
        ]
      },
      {
        id: 'padartha-vijnana',
        name: 'Padartha Vijnanam',
        hindiName: 'पदार्थ विज्ञान',
        codeName: 'Fundamental Principles of Ayurveda & Epistemology (Pramana)',
        syllabusCode: 'AyUG-PV',
        lecturesCount: 45,
        notesCount: 30,
        testsCount: 10,
        badge: 'Philosophical Core',
        thumbnailUrl: '/images/bams/pv_4_3.jpg',
        aspectRatio: '4:3',
        color: '#2d6a4f',
        description: 'Epistemological foundations of Ayurveda: Dravya, Guna, Karma, Samanya, Vishesha, Samavaya, and the four valid clinical diagnostics (Pratyaksha, Anumana, Aptopadesha, Yukti).',
        syllabusHighlights: [
          'Shad-Padartha: Deep exposition of Dravya (9 types), 41 Gunas, Karma, Samanya-Vishesha principles',
          'Pramana Vigyan: Clinical decision-making through Aptopadesha, Pratyaksha, Anumana, and Yukti Pramana',
          'Karya-Karana Siddhanta: Satkaryavada, Parinamavada, Vivartavada, and Pilupaka vs Pitharapaka theories',
          'Integration with modern scientific logic and research methodology in clinical medicine'
        ]
      },
      {
        id: 'sanskrit',
        name: 'Sanskrit & Ayurveda Itihas',
        hindiName: 'संस्कृत एवं आयुर्वेद इतिहास',
        codeName: 'Medical Sanskrit Grammar, Shloka Recitation & History of Ayurveda',
        syllabusCode: 'AyUG-SN',
        lecturesCount: 40,
        notesCount: 25,
        testsCount: 8,
        badge: 'Classical Language',
        thumbnailUrl: '/images/bams/sanskrit_4_3.jpg',
        aspectRatio: '4:3',
        color: '#1b4332',
        description: 'Mastery of fundamental Sanskrit grammar (Sandhi, Samasa, Karaka, Vibhakti) needed for Samhita comprehension, paired with the historical evolution of Ayurveda.',
        syllabusHighlights: [
          'Sanskrit Grammar Essentials: Maheshwara Sutras, Subanta, Tinganta, Karaka prakarana, and compound formations',
          'Shloka Chanting & Anvaya: Meter recitation rules and textual decoding techniques',
          'History of Ayurveda: Vedic origins, Samhita period, commentator lineages, and ancient universities',
          'Government commissions, CCIM/NCISM evolution, and global recognition of traditional medicine systems'
        ]
      }
    ]
  },
  '2nd': {
    id: '2nd',
    shortTitle: '2nd Proff.',
    batchName: 'Agnivesh Batch',
    cardImage: '/images/bams/2nd_proff_1_1.png',
    aspectRatio: '1:1',
    title: 'BAMS 2nd Professional Complete Masterclass',
    subtitle: 'Clinical Pharmacology, Diagnostics, Herbo-Mineral Pharmaceutics, Toxicology & Preventive Medicine',
    duration: '18 Months University Track',
    originalPrice: 8999,
    discountedPrice: 4999,
    discountPercentage: 44,
    savings: 4000,
    validity: 'Full 2nd Professional Academic Cycle + Exam Guarantee',
    codePrefix: 'BAMS2ND',
    acceptedCodes: ['AYURVEEZ2ND', 'BAMS2ND', 'AVZ2ND', 'BAMS2ND2026', 'AYUR2ND'],
    bannerGradient: 'from-[#1b4332] via-[#2d6a4f] to-[#122e21]',
    accentColor: '#2d6a4f',
    accentBorder: '#c4dec8',
    ncismBatch: 'NCISM Clinical Pharmacology & Patho-Diagnostics Track',
    enrolledStudentsCount: '2,920+ Students Enrolled',
    highlights: [
      'Comprehensive coverage of all 4 core second professional clinical pillars',
      'High-yield identification charts for 150+ medicinal plants with botanical taxonomy',
      'Rasa Shastra mineral calcination (Bhasma Pariksha) with modern spectroscopy protocols',
      'Rog Nidan Ashtavidha Pariksha paired with modern radiological and pathological labs',
      'Forensic toxicology & NCISM updated clinical medicine guidelines'
    ],
    subjects: [
      {
        id: 'dravyaguna',
        name: 'Dravyaguna Vijnana',
        hindiName: 'द्रव्यगुण विज्ञान',
        codeName: 'Ayurvedic Materia Medica & Modern Pharmacognosy (Paper I & II)',
        syllabusCode: 'AyUG-DG',
        lecturesCount: 95,
        notesCount: 68,
        testsCount: 22,
        badge: 'Clinical Pharmacology',
        thumbnailUrl: '/images/bams/dg_2nd_proff_4_3.jpg',
        aspectRatio: '4:3',
        color: '#1b4332',
        description: 'Comprehensive study of 150+ medicinal flora, Dravya karma, Rasa-Panchaka pharmacology, and Ayurvedic Pharmacopoeia of India (API) standardization standards.',
        syllabusHighlights: [
          'Rasa-Panchaka Science: Detailed Rasa, Guna, Veerya, Vipaka, Prabhava principles and Karma classification',
          'Major Medicinal Plants: 150+ monographs with botanical keys, active phytoconstituents, adulterants and substitutes',
          'Mishraka Gana: Triphala, Trikatu, Dashamoola, Panchavalkala, Ashtavarga formulations and therapeutic rationale',
          'Modern Pharmacognosy: Extraction techniques, chromatography (TLC/HPTLC), dosage posology, and adverse reactions'
        ]
      },
      {
        id: 'rasashastra',
        name: 'Rasa Shastra & Bhaishajya Kalpana',
        hindiName: 'रसशास्त्र एवं भैषज्य कल्पना',
        codeName: 'Iatrochemistry, Mineral Pharmaceutics & Dosage Formulations',
        syllabusCode: 'AyUG-RB',
        lecturesCount: 90,
        notesCount: 64,
        testsCount: 20,
        badge: 'Pharmaceutics & Alchemy',
        thumbnailUrl: '/images/bams/rasa_shastra_4_3.jpg',
        aspectRatio: '4:3',
        color: '#2d6a4f',
        description: 'Processing of metals, minerals, gems and toxic herbo-mineral substances, purification (Shodhana), incineration (Marana), and classical pharmaceutical dosage forms.',
        syllabusHighlights: [
          'Parada (Mercury): Ashtadasha Samskara, Parada Gati, Hingulottha Parada extraction, and Kajjali preparation',
          'Maharasa, Uparasa, Sadharanarasa: Abhraka, Makshika, Vaikranta, Shilajatu, Gandhaka purification and Bhasma Marana',
          'Classical Panchavidha Kashaya Kalpana: Swarasa, Kalka, Kwatha, Hima, Phanta and secondary formulations (Sneha, Asava-Arishta)',
          'GMP regulations, nanomedicine characteristics of Bhasma, heavy metal safety limits, and standardization'
        ]
      },
      {
        id: 'rognidan',
        name: 'Roga Nidana & Vikriti Vijnana',
        hindiName: 'रोग निदान एवं विकृति विज्ञान',
        codeName: 'Clinical Diagnostics, Pathology & Laboratory Medicine (Paper I & II)',
        syllabusCode: 'AyUG-RN',
        lecturesCount: 85,
        notesCount: 58,
        testsCount: 24,
        badge: 'Clinical Diagnostics',
        thumbnailUrl: '/images/bams/rog_nidan_4_3.jpg',
        aspectRatio: '4:3',
        color: '#122e21',
        description: 'Comprehensive diagnostic methodology: Nidana Panchaka (etiology, pathogenesis, prodromes, symptoms, therapeutics) combined with modern medical investigations.',
        syllabusHighlights: [
          'Nidana Panchaka: Hetu, Purvarupa, Rupa, Upashaya-Anupashaya, and Samprapti Ghataka analysis',
          'Rogi Pariksha: Trividha, Shadvidha, and Ashtavidha Pariksha (Nadi, Mutra, Mala, Jihwa, Shabda, Sparsha, Drik, Akriti)',
          'Vyadhi Vijnana: Detailed pathology of Jwara, Raktapitta, Rajayakshma, Prameha, Kushta, Vatavyadhi, and Amavata',
          'Modern Clinical Pathology: Hematology, liver/renal profiles, microbiology, ECG interpretation, and ultrasound basics'
        ]
      },
      {
        id: 'samhita-2',
        name: 'Samhita Adhyayan 2 & Agada Tantra',
        hindiName: 'संहिता अध्ययन २ एवं अगद तन्त्र',
        codeName: 'Charaka Chikitsasthana, Sushruta Toxicology & Medical Jurisprudence',
        syllabusCode: 'AyUG-SA2',
        lecturesCount: 70,
        notesCount: 45,
        testsCount: 16,
        badge: 'Forensics & Therapeutics',
        thumbnailUrl: '/images/bams/agada_4_3.jpg',
        aspectRatio: '4:3',
        color: '#1b4332',
        description: 'Classical therapeutic chapters of Charaka Samhita combined with Agada Tantra toxicology, forensic medicine, and Indian medico-legal statutes.',
        syllabusHighlights: [
          'Charaka Chikitsasthana selected chapters: Jwara, Raktapitta, Gulma, Prameha, Shotha, and Arsha therapeutics',
          'Visha Vigyan: Sthavara (plant/mineral) and Jangama (snake/scorpion/rabies) poisons with 24 Vishopakkrama protocols',
          'Garavisha & Dushivisha: Chronic environmental toxicity, cumulative toxins, and organ protection antidotes',
          'Medical Jurisprudence: Consent, clinical negligence, death certificates, POCSO, and consumer protection acts'
        ]
      }
    ]
  },
  'final': {
    id: 'final',
    shortTitle: 'Final Proff.',
    batchName: 'Charaka Batch',
    cardImage: '/images/bams/3rd_proff_1_1.png',
    aspectRatio: '1:1',
    title: 'BAMS Final Professional Complete Masterclass',
    subtitle: 'Clinical Medicine, Panchakarma, Surgery, ENT-Ophthalmology, Obstetrics, Pediatrics & Research',
    duration: '18 Months University Track',
    originalPrice: 12999,
    discountedPrice: 6999,
    discountPercentage: 46,
    savings: 6000,
    validity: 'Full Final Professional Academic Cycle + Internship Preparation Guarantee',
    codePrefix: 'BAMSFINAL',
    acceptedCodes: ['AYURVEEZFINAL', 'BAMSFINAL', 'AVZFINAL', 'BAMS3RD', 'BAMSFINAL2026', 'AYURFINAL'],
    bannerGradient: 'from-[#0f281e] via-[#143d2b] to-[#1b4332]',
    accentColor: '#1b4332',
    accentBorder: '#c4dec8',
    ncismBatch: 'NCISM Final Year Clinical Practice & Hospital Internship Track',
    enrolledStudentsCount: '4,150+ Students Enrolled',
    highlights: [
      'Complete mastery of all 6 clinical final-year hospital practice departments',
      'Kayachikitsa internal medicine protocols with modern acute care guidelines',
      'Step-by-step Panchakarma clinical procedural videos with Purvakarma & Paschatkarma',
      'Shalya Tantra Ksharasutra ano-rectal techniques and Sushruta surgical skills',
      'Shalakya Tantra Kriyakalpa ocular therapies & modern ophthalmic instrumentation',
      'Stri Roga & Prasuti Tantra ante-natal management and Kaumarbhritya pediatric care'
    ],
    subjects: [
      {
        id: 'kayachikitsa',
        name: 'Kayachikitsa',
        hindiName: 'कायचिकित्सा',
        codeName: 'Internal Medicine, Psychosomatic Disorders & Emergency Protocols',
        syllabusCode: 'AyUG-KC',
        lecturesCount: 110,
        notesCount: 82,
        testsCount: 28,
        badge: 'Clinical Internal Medicine',
        thumbnailUrl: '/images/bams/kriya_4_3.jpg',
        aspectRatio: '4:3',
        color: '#1b4332',
        description: 'The core of Ayurvedic clinical practice: holistic management of chronic, metabolic, degenerative, and psychosomatic disorders.',
        syllabusHighlights: [
          'Chikitsa Siddhanta: Samanya-Vishesha treatment principles, Doshapratyanika and Vyadhipratyanika therapies',
          'Metabolic & Endocrine: Prameha/Madhumeha (Diabetes), Sthaulya (Obesity), Medoroga, and Thyroid disorders',
          'Neuromuscular: Pakshaghata (Stroke), Gridhrasi (Sciatica), Sandhigatavata (Osteoarthritis), and Amavata (RA)',
          'Emergency Management: Emergency stabilization, acute respiratory, cardiovascular, and allergic reactions'
        ]
      },
      {
        id: 'panchakarma',
        name: 'Panchakarma',
        hindiName: 'पञ्चकर्म',
        codeName: 'Bio-Purification, Cleansing Procedures & Physiotherapy',
        syllabusCode: 'AyUG-PK',
        lecturesCount: 80,
        notesCount: 55,
        testsCount: 20,
        badge: 'Purification Therapies',
        thumbnailUrl: '/images/bams/samhita_1_4_3.jpg',
        aspectRatio: '4:3',
        color: '#2d6a4f',
        description: 'Complete hands-on clinical protocols for Vamana, Virechana, Basti, Nasya, and Raktamokshana.',
        syllabusHighlights: [
          'Purvakarma: Snehana (internal/external unction) and Swedana (13 classical fomentations) protocols',
          'Pradhanakarma: Step-by-step Vamana (emesis), Virechana (purgation), and Shirovirechana (Nasya) management',
          'Basti: Niruha, Anuvasana, Matra, and Uttar Basti formulations, administration, and complications management',
          'Raktamokshana: Jalaukavacharana (leech therapy), Siravyadha (venesection), and Shringi-Alabu applications'
        ]
      },
      {
        id: 'shalya',
        name: 'Shalya Tantra',
        hindiName: 'शल्य तन्त्र',
        codeName: 'General Surgery, Orthopedics, Ksharasutra & Wound Healing',
        syllabusCode: 'AyUG-ST',
        lecturesCount: 90,
        notesCount: 65,
        testsCount: 22,
        badge: 'Surgical Techniques',
        thumbnailUrl: '/images/bams/rachna_4_3.jpg',
        aspectRatio: '4:3',
        color: '#122e21',
        description: 'Sushruta surgical foundations: Yantra, Shastra, Ashtavidha Shastra Karma, Ksharasutra, Agnikarma, and modern basic surgical skills.',
        syllabusHighlights: [
          'Sushruta Principles: Yantra (101 instruments), Shastra (20 sharp instruments), and sterilization methods',
          'Anorectal Surgery: Ksharasutra preparation and application in Bhagandara (Fistula-in-ano), Arsha (Piles), and Fissures',
          'Vrana & Wound Care: Dwi-vrana, Shuddha Vrana, Shashti Upakrama (60 wound management steps), and modern dressings',
          'Fractures & Orthopedics: Bhagna classification, Bandhana (bandaging), reduction techniques, and modern orthopedics'
        ]
      },
      {
        id: 'shalakya',
        name: 'Shalakya Tantra',
        hindiName: 'शालाक्य तन्त्र',
        codeName: 'Ophthalmology, ENT, Head & Neck Surgery (Netra, Karna, Nasa, Mukha)',
        syllabusCode: 'AyUG-SK',
        lecturesCount: 85,
        notesCount: 60,
        testsCount: 20,
        badge: 'ENT & Ophthalmology',
        thumbnailUrl: '/images/bams/sanskrit_4_3.jpg',
        aspectRatio: '4:3',
        color: '#2d6a4f',
        description: 'Disorders above the clavicle (Urdhwajatrugata Roga): diseases of eyes, ears, nose, oral cavity, and head with classical Kriyakalpa ocular therapies.',
        syllabusHighlights: [
          'Netra Roga: 76 ocular diseases according to Patala, Mandal, and Sandhi involvement, cataract, and glaucoma',
          'Kriyakalpa: Seka, Aschyotana, Pindi, Bidalaka, Tarpana, Putapaka, and Anjana topical procedures',
          'Karna-Nasa-Gala Roga: Otitis, sinusitis, rhinitis, tonsillitis, and vocal cord pathologies',
          'Mukha-Danta-Shiro Roga: Oral leukoplakia, periodontal disease, alopecia, and headaches (Shiroroga)'
        ]
      },
      {
        id: 'prasuti-stri-roga',
        name: 'Prasuti Tantra & Stri Roga',
        hindiName: 'प्रसूति तन्त्र एवं स्त्री रोग',
        codeName: 'Ayurvedic Obstetrics, Gynecology & Maternal-Fetal Medicine',
        syllabusCode: 'AyUG-PS',
        lecturesCount: 85,
        notesCount: 58,
        testsCount: 20,
        badge: 'Obstetrics & Gynecology',
        thumbnailUrl: '/images/bams/samhita_2_4_3.jpg',
        aspectRatio: '4:3',
        color: '#1b4332',
        description: 'Comprehensive maternal care: Garbhini Paricharya, labor mechanics, puerperal care, and 20 Yonivyapad gynecological conditions.',
        syllabusHighlights: [
          'Masanumashika Garbhini Paricharya: Month-by-month dietary and herbal regimens for normal fetal development',
          'Prasava Vigyan: Normal labor stages, dystocia, puerperium (Sootika Paricharya), and lactation management',
          'Ashta Yonivyapad & Disorders: 20 gynecological diseases, PCOD, endometriosis, infertility (Vandhyatva) treatments',
          'Modern Obstetrics: Antenatal ultrasound assessment, high-risk pregnancy screening, and labor ward management'
        ]
      },
      {
        id: 'swasthavritta',
        name: 'Swasthavritta & Research Methodology',
        hindiName: 'स्वस्थवृत्त एवं योग',
        codeName: 'Preventive Social Medicine, Lifestyle, Yoga & Biostatistics',
        syllabusCode: 'AyUG-SR',
        lecturesCount: 75,
        notesCount: 50,
        testsCount: 18,
        badge: 'Preventive Medicine & Yoga',
        thumbnailUrl: '/images/bams/swasthavritta_4_3.jpg',
        aspectRatio: '4:3',
        color: '#122e21',
        description: 'Dinacharya, Ritucharya, Sadvritta, Therapeutic Yoga, public health epidemiology, and research biostatistics.',
        syllabusHighlights: [
          'Dinacharya & Ritucharya: Daily routines, seasonal regimens, non-suppressible vs suppressible urges (Vega Vigyan)',
          'Therapeutic Yoga & Naturopathy: Asanas, Pranayama, Shatkarma, and mental equilibrium techniques',
          'Public Health & Epidemiology: Water sanitation, communicable disease surveillance, and national health programs',
          'Research Methodology: Study designs, hypothesis testing, sampling methods, and biostatistical tests (t-test, ANOVA)'
        ]
      }
    ]
  }
};

// Functions to load from Firestore and local storage

export function sanitizeBamsProffs(proffs: Record<string, BamsProfCourse>): Record<string, BamsProfCourse> {
  const result: Record<string, BamsProfCourse> = {};
  for (const key of Object.keys(proffs)) {
    const prof = proffs[key];
    if (!prof) continue;
    const sanitizedSubjects = (prof.subjects || []).map((sub) => {
      const mats = sub.materials || [];
      const lec = mats.filter(m => m.type === 'lecture').length;
      const not = mats.filter(m => m.type === 'note').length;
      const tst = mats.filter(m => m.type === 'test').length;
      
      const origPrice = sub.originalPrice ?? 999;
      const discPrice = sub.discountedPrice ?? 499;
      const discPct = sub.discountPercentage ?? Math.round(((origPrice - discPrice) / origPrice) * 100);

      return {
        ...sub,
        materials: mats,
        // Because currently no file video or notes is uploaded then show zero
        lecturesCount: mats.length > 0 ? lec : (sub.materials ? 0 : 0),
        notesCount: mats.length > 0 ? not : (sub.materials ? 0 : 0),
        testsCount: mats.length > 0 ? tst : (sub.materials ? 0 : 0),
        originalPrice: origPrice,
        discountedPrice: discPrice,
        discountPercentage: discPct
      };
    });

    result[key] = {
      ...prof,
      subjects: sanitizedSubjects
    };
  }
  return result;
}

export function getSubjectStats(subject: BamsSubject) {
  const mats = subject.materials || [];
  const lectures = mats.filter(m => m.type === 'lecture').length;
  const notes = mats.filter(m => m.type === 'note').length;
  const tests = mats.filter(m => m.type === 'test').length;
  const freeItems = mats.filter(m => m.isFree).length;
  return {
    lecturesCount: mats.length > 0 ? lectures : (subject.materials ? 0 : 0),
    notesCount: mats.length > 0 ? notes : (subject.materials ? 0 : 0),
    testsCount: mats.length > 0 ? tests : (subject.materials ? 0 : 0),
    freeItemsCount: freeItems,
    totalMaterialsCount: mats.length
  };
}

export function getLocalBamsProffs(): Record<string, BamsProfCourse> {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.BAMS_PROFFS);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) {
        return sanitizeBamsProffs(parsed);
      }
    }
  } catch (e) {
    console.error('Error reading BAMS proffs from storage:', e);
  }
  return sanitizeBamsProffs(DEFAULT_BAMS_PROFFS);
}

export function saveLocalBamsProffs(proffs: Record<string, BamsProfCourse>): void {
  try {
    const sanitized = sanitizeBamsProffs(proffs);
    localStorage.setItem(STORAGE_KEYS.BAMS_PROFFS, JSON.stringify(sanitized));
  } catch (e) {
    console.error('Error writing BAMS proffs to storage:', e);
  }
}

export function getLocalTopCourses(): TopLevelCourse[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.TOP_COURSES);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading top courses from storage:', e);
  }
  return DEFAULT_TOP_COURSES;
}

export function saveLocalTopCourses(courses: TopLevelCourse[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.TOP_COURSES, JSON.stringify(courses));
  } catch (e) {
    console.error('Error writing top courses to storage:', e);
  }
}

// FIRESTORE SYNC HELPERS

// Save BAMS Proffs hierarchy to Firestore
export async function syncBamsProffsToFirestore(proffs: Record<string, BamsProfCourse>): Promise<boolean> {
  // Always update local cache first for instant UX
  saveLocalBamsProffs(proffs);
  try {
    const docRef = doc(db, 'courses_hierarchy', 'bams_proffs');
    await setDoc(docRef, {
      proffs,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (err) {
    console.warn('Could not sync BAMS proffs to Firestore (offline fallback active):', err);
    return false;
  }
}

// Save Top-Level courses hierarchy to Firestore
export async function syncTopCoursesToFirestore(courses: TopLevelCourse[]): Promise<boolean> {
  saveLocalTopCourses(courses);
  try {
    const docRef = doc(db, 'courses_hierarchy', 'main_courses');
    await setDoc(docRef, {
      courses,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (err) {
    console.warn('Could not sync Top courses to Firestore (offline fallback active):', err);
    return false;
  }
}

// Fetch initial data from Firestore (or fallback)
export async function fetchCoursesHierarchyFromFirestore(): Promise<{
  bamsProffs: Record<string, BamsProfCourse>;
  topCourses: TopLevelCourse[];
}> {
  let bamsProffs = getLocalBamsProffs();
  let topCourses = getLocalTopCourses();

  try {
    const bamsDocRef = doc(db, 'courses_hierarchy', 'bams_proffs');
    const bamsSnap = await getDoc(bamsDocRef);
    if (bamsSnap.exists()) {
      const data = bamsSnap.data();
      if (data && data.proffs && typeof data.proffs === 'object') {
        bamsProffs = sanitizeBamsProffs(data.proffs as Record<string, BamsProfCourse>);
        saveLocalBamsProffs(bamsProffs);
      }
    }

    const topDocRef = doc(db, 'courses_hierarchy', 'main_courses');
    const topSnap = await getDoc(topDocRef);
    if (topSnap.exists()) {
      const data = topSnap.data();
      if (data && Array.isArray(data.courses)) {
        topCourses = data.courses as TopLevelCourse[];
        saveLocalTopCourses(topCourses);
      }
    }
  } catch (err) {
    console.warn('Could not fetch from Firestore, using cached/default courses hierarchy:', err);
  }

  return { bamsProffs, topCourses };
}

// Subscribe to real-time updates from Firestore
export function subscribeCoursesHierarchy(
  onUpdate: (data: { bamsProffs: Record<string, BamsProfCourse>; topCourses: TopLevelCourse[] }) => void
): () => void {
  let currentBams = getLocalBamsProffs();
  let currentTop = getLocalTopCourses();

  const unsubBams = onSnapshot(doc(db, 'courses_hierarchy', 'bams_proffs'), (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data && data.proffs && typeof data.proffs === 'object') {
        currentBams = sanitizeBamsProffs(data.proffs as Record<string, BamsProfCourse>);
        saveLocalBamsProffs(currentBams);
        onUpdate({ bamsProffs: currentBams, topCourses: currentTop });
      }
    }
  }, (err) => {
    console.warn('Realtime snapshot listener on bams_proffs error:', err);
  });

  const unsubTop = onSnapshot(doc(db, 'courses_hierarchy', 'main_courses'), (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data && Array.isArray(data.courses)) {
        currentTop = data.courses as TopLevelCourse[];
        saveLocalTopCourses(currentTop);
        onUpdate({ bamsProffs: currentBams, topCourses: currentTop });
      }
    }
  }, (err) => {
    console.warn('Realtime snapshot listener on main_courses error:', err);
  });

  return () => {
    unsubBams();
    unsubTop();
  };
}
