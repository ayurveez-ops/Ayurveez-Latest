import React, { useState, useEffect, useId } from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  BookOpen, 
  Key, 
  ShieldCheck, 
  ExternalLink, 
  Download, 
  FileText, 
  Video, 
  Check, 
  AlertCircle, 
  HelpCircle, 
  Phone, 
  Mail, 
  ChevronRight,
  ChevronLeft,
  ShoppingBag,
  X,
  Award,
  Layers,
  Sparkle,
  FolderTree,
  Maximize2,
  Eye,
  Grid,
  List
} from 'lucide-react';
import { CourseType } from '../types';
import {
  BamsProfCourse as HierarchyBamsProfCourse,
  BamsSubject as HierarchyBamsSubject,
  convertGoogleDriveUrl,
  getLocalBamsProffs,
  subscribeCoursesHierarchy,
  AspectRatioType
} from '../data/coursesHierarchyStore';

export type BamsProfType = '1st' | '2nd' | 'final';

interface SubjectItem {
  id: string;
  name: string;
  codeName: string;
  paperCount: string;
  weightage: string;
  description: string;
  syllabusHighlights: string[];
  notesCount: number;
  lecturesCount: number;
  testsCount: number;
  badge?: string;
}

interface BamsProfCourse {
  id: BamsProfType;
  shortTitle: string;
  batchName: string;
  cardImage: string;
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
  subjects: SubjectItem[];
  highlights: string[];
  ncismBatch: string;
  enrolledStudentsCount: string;
}

const BAMS_PROFF_COURSES: Record<BamsProfType, BamsProfCourse> = {
  '1st': {
    id: '1st',
    shortTitle: '1st Proff.',
    batchName: 'Atreya Batch',
    cardImage: '/images/bams/1st_proff_1_1.png',
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
      'Previous 5 Years University Solved Question Papers & Model Answers',
      'Downloadable high-yield handwritten & typed PDF revision notes'
    ],
    subjects: [
      {
        id: '1st-samhita-1',
        name: 'Samhita Adhyayan 1',
        codeName: 'Charaka Sutrasthana & Ashtanga Hridayam Sutrasthana',
        paperCount: '',
        weightage: 'Core Classical Samhita',
        description: 'Comprehensive study of Charaka Samhita Sutrasthana (Chapters 1–12 Chatuskas) and Ashtanga Hridayam Sutrasthana (Chapters 1–30) with classical Sanskrit Anvaya, Padachheda, and clinical commentary.',
        syllabusHighlights: [
          'Deerghanjivitiya Adhyaya & Tridosha Siddhanta',
          'Swasthavritta & Dinacharya / Ritucharya chapters in Ashtanga Hridayam',
          'Dravya-Guna-Karma, Rasapanchaka principles & Shodhasha Kala',
          'Chatushka classification & Chakrapani Teeka vimarsha',
          'Exam Shloka recitation, meaning & short-answer patterns'
        ],
        notesCount: 0,
        lecturesCount: 0,
        testsCount: 0,
        badge: 'High Yield'
      },
      {
        id: '1st-sanskrit',
        name: 'Sanskrit',
        codeName: 'Sanskrit Bhasha, Vyakarana & Samhita Bhasha Adhyayana',
        paperCount: '',
        weightage: 'Linguistic Foundation',
        description: 'Essential Sanskrit grammar tailored specifically for Ayurvedic undergraduates to fluently read, pronounce, and interpret classical Brihattrayi shlokas.',
        syllabusHighlights: [
          'Maheshwara Sutras, Varnochharana & Sandhi Prakarana',
          'Subanta, Tinganta, Samasa & Karaka Siddhanta',
          'Medical translation techniques from Sanskrit to Hindi / English',
          'Vaidyakiya Subhashita Sahitya recitation & meaning',
          'Sanskrit prose comprehension & technical terminology'
        ],
        notesCount: 0,
        lecturesCount: 0,
        testsCount: 0,
        badge: 'Foundation'
      },
      {
        id: '1st-padarth-vigyan',
        name: 'Padarth Vigyan',
        codeName: 'Padartha Vijnana evam Ayurveda Itihas',
        paperCount: '',
        weightage: 'Philosophical & Epistemological Core',
        description: 'Deep dive into Ayurvedic epistemology, Shad Darshanas (Nyaya, Vaisheshika, Sankhya, Yoga, Mimamsa, Vedanta), Pramana Vijnana, and the chronological evolution of Ayurveda through the Vedic to modern eras.',
        syllabusHighlights: [
          'Shad Darshana philosophy & fundamental ontological principles',
          'Pramana Vijnana: Pratyaksha, Anumana, Aptopadesha & Yukti Pramana',
          'Shad Padartha: Dravya, Guna, Karma, Samanya, Vishesha, Samavaya',
          'Srishti Utpatti Krama, Purusha, Prakriti & Mahabhuta Siddhanta',
          'Ayurveda Itihasa: Charaka, Sushruta, Vagbhata & CCRAS timeline'
        ],
        notesCount: 0,
        lecturesCount: 0,
        testsCount: 0,
        badge: 'Core Theory'
      },
      {
        id: '1st-rachna-sharir',
        name: 'Rachna Sharir',
        codeName: 'Sharira Rachana (Ayurvedic Anatomy & Modern Gross Anatomy)',
        paperCount: '',
        weightage: 'Structural Anatomy',
        description: 'Integrative anatomical education blending classical Ayurvedic concepts of Garbha Sharir, Marma Sharir, and Srotas with modern gross anatomy, osteology, neuroanatomy, and cadaveric dissection.',
        syllabusHighlights: [
          'Garbha Sharir: Shukra-Artava, Garbhadhana & fetal development',
          '107 Marma Sharir: Location, classification & trauma vulnerabilities',
          'Asthi Sharir (Osteology), Sandhi (Syndesmology) & Peshi (Myology)',
          'Srotas Sharir: 13 Classical Srotases and root organs (Moola)',
          'Thorax, Abdomen, Brain & Pelvis gross anatomy with surface markings'
        ],
        notesCount: 0,
        lecturesCount: 0,
        testsCount: 0,
        badge: 'Clinical Anatomy'
      },
      {
        id: '1st-kriya-sharir',
        name: 'Kriya Sharir',
        codeName: 'Sharira Kriya (Ayurvedic Physiology & Modern Systemic Physiology)',
        paperCount: '',
        weightage: 'Functional Physiology',
        description: 'Mastery of physiological mechanisms governing Tridosha, Sapta Dhatus, Upadhatus, and Malas alongside modern cardiovascular, respiratory, digestive, and neuro-endocrine physiology.',
        syllabusHighlights: [
          'Tridosha Vijnana: Properties, sites, normal & abnormal states',
          'Dhatu Poshana Nyaya (Ksheera-Dadhi, Kedari-Kulya, Khale-Kapota)',
          'Ojas, Tejas, Prana, Agni (13 types) and Kostha evaluation',
          'Deha Prakriti Pariksha & clinical constitution assessment',
          'Hematology, Digestive System, Respiratory & Nervous System physiology'
        ],
        notesCount: 0,
        lecturesCount: 0,
        testsCount: 0,
        badge: 'Clinical Physiology'
      }
    ]
  },
  '2nd': {
    id: '2nd',
    shortTitle: '2nd Proff.',
    batchName: 'Agnivesh Batch',
    cardImage: '/images/bams/2nd_proff_1_1.png',
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
    ncismBatch: 'NCISM New Syllabus & Exam Pattern Aligned',
    enrolledStudentsCount: '2,920+ Students Enrolled',
    highlights: [
      'Monographs of 150+ medicinal plants with botanical & pharmacological keys',
      'Clinical Bedside examination (Ashtavidha & Dashavidha Pariksha) training',
      'Complete Charaka Uttarardha (Chikitsa, Kalpa, Siddhi Sthana) shloka analysis',
      'Practical pharmacy manufacturing methods: Bhasma, Taila, Ghrita, Asava-Arishta',
      'Forensic thanatology, Medical Jurisprudence & Legal acts in clinical practice',
      'Preventive health, Dinacharya regimens, and therapeutic Yoga protocols'
    ],
    subjects: [
      {
        id: '2nd-dravyaguna',
        name: 'Dravyaguna',
        codeName: 'Dravyaguna Vijnana (Ayurvedic Pharmacology & Materia Medica)',
        paperCount: '',
        weightage: 'Core Pharmacology',
        description: 'Comprehensive study of medicinal raw herbs, Rasapanchaka (Rasa, Guna, Virya, Vipaka, Prabhava), Karma Vijnana, botanical classification, adulteration detection, and therapeutic dosages of classical plants.',
        syllabusHighlights: [
          'Rasapanchaka Siddhanta & Karma taxonomy (Deepana, Pachana, etc.)',
          'Monographs of 150+ classical herbs with botanical specimens',
          'Pratinidhi Dravyas (substitute herbs) & Mishraya Ganas (Triphala, Trikatu)',
          'Namarupa Vijnana: Synonyms, morphology and habitat distribution',
          'Modern Pharmacognosy, active phytochemicals & clinical toxicity limits'
        ],
        notesCount: 0,
        lecturesCount: 0,
        testsCount: 0,
        badge: 'High Yield Herbology'
      },
      {
        id: '2nd-roga-nidana',
        name: 'Roga Nidana',
        codeName: 'Roga Nidana evam Vikriti Vijnana (Ayurvedic Pathology & Diagnostics)',
        paperCount: '',
        weightage: 'Clinical Diagnostics',
        description: 'Systematic pathology and diagnostic methodologies in Ayurveda, including Nidanapanchaka, Shatkriyakala, Rogi Pariksha (Ashtavidha, Dashavidha), Nadi Pariksha, and correlation with modern laboratory investigations.',
        syllabusHighlights: [
          'Nidanapanchaka: Nidana, Purvarupa, Rupa, Upashaya & Samprapti',
          'Shatkriyakala: Chaya, Prakopa, Prasara, Sthana-samshraya, Vyakti, Bheda',
          'Ashtavidha Pariksha: Nadi, Mutra, Mala, Jihva, Shabda, Sparsha, Drik, Akriti',
          'Vyadhi Vijnana: Jwara, Raktapitta, Rajayakshma, Prameha, Vatavyadhi diagnosis',
          'Modern Pathology: CBC, LFT, KFT, Lipid Profile & Imaging interpretation'
        ],
        notesCount: 0,
        lecturesCount: 0,
        testsCount: 0,
        badge: 'Diagnostics'
      },
      {
        id: '2nd-samhita-2',
        name: 'Samhita Adhyayan 2',
        codeName: 'Charaka Samhita Uttarardha (Chikitsa, Kalpa & Siddhi Sthana)',
        paperCount: '',
        weightage: 'Core Therapeutics Text',
        description: 'Mastery of the treatment chapters (Chikitsasthana) of Charaka Samhita covering systemic diseases, Panchakarma formulations in Kalpasthana, and the clinical perfection and complication management in Siddhisthana.',
        syllabusHighlights: [
          'Rasayana & Vajikarana Adhyayas of Charaka Chikitsasthana',
          'Therapeutic management of Jwara, Gulma, Prameha, Kushtha, Shwasa, Kasa',
          'Kalpasthana: Madana Phala, Jimutaka, Ikshvaku & Virechana formulations',
          'Siddhisthana: 12 Chapters on Basti complications, Netra, Putaka, and management',
          'Chakrapani Teeka clinical commentary and classical Yoga formulations'
        ],
        notesCount: 0,
        lecturesCount: 0,
        testsCount: 0,
        badge: 'Classical Mastery'
      },
      {
        id: '2nd-rasa-shastra',
        name: 'Rasa Shastra',
        codeName: 'Rasa Shastra evam Bhaishajya Kalpana (Iatrochemistry & Pharmaceuticals)',
        paperCount: '',
        weightage: 'Pharmaceutical Formulations',
        description: 'Study of herbo-mineral preparations, metals, minerals, gems, poison purification (Shodhana), Bhasma incineration (Marana), and classical galenicals including Kashaya, Taila, Ghrita, Asava, Arishta, and Vati.',
        syllabusHighlights: [
          'Parada (Mercury): 8 Ashtasamskara, Gati, and Rasabandha concepts',
          'Maharasa, Uparasa, Sadharana Rasa, Dhatu & Ratna Shodhana / Marana',
          'Bhasma Pariksha tests: Varitara, Rekhapurna, Apunarbhava, Niruttha',
          'Panchavidha Kashaya Kalpana & secondary formulations (Avaleha, Lepa)',
          'Quality control, Heavy Metal testing, GMP guidelines & ASU Pharmacopoeia'
        ],
        notesCount: 0,
        lecturesCount: 0,
        testsCount: 0,
        badge: 'Herbo-Mineral Pharmacy'
      },
      {
        id: '2nd-agadatantra',
        name: 'Agadatantra',
        codeName: 'Agadatantra, Vyavahara Ayurveda evam Vidhi Vaidyaka',
        paperCount: '',
        weightage: 'Toxicology & Jurisprudence',
        description: 'Ayurvedic toxicology, plant and animal poison management, snakebite protocols (Sarpa Visha), combined with Forensic Thanatology, Asphyxial deaths, Legal injury certificates, and the Consumer Protection Act.',
        syllabusHighlights: [
          'Sthavara (Plant/Mineral) and Jangama (Animal/Snake/Insect) Visha',
          'Visha Vega, Chaturvimshati Upakrama (24 classical antidotal treatments)',
          'Sarpa Damsha classification, signs and emergency resuscitation',
          'Forensic Medicine: Post-mortem changes, Medico-legal autopsies, Wounds',
          'Medical Jurisprudence: Medical Negligence, Consent, POCSO, Medical Ethics'
        ],
        notesCount: 0,
        lecturesCount: 0,
        testsCount: 0,
        badge: 'Toxicology & Law'
      },
      {
        id: '2nd-swasthavritta',
        name: 'Swasthavritta',
        codeName: 'Swasthavritta evam Yoga (Preventive, Social Medicine & Lifestyle)',
        paperCount: '',
        weightage: 'Preventive Medicine & Yoga',
        description: 'Comprehensive education in personal hygiene, Ayurvedic daily routines (Dinacharya), seasonal regimens (Ritucharya), dietary laws (Pathyapathya), community medicine, epidemiology, and therapeutic Yoga systems.',
        syllabusHighlights: [
          'Dinacharya, Ritucharya, Sadvritta & Ratricharya guidelines for health',
          'Adharaniya Vegas (13 non-suppressible natural urges) and disorders',
          'Nutritional science (Aharamatra, Ashta Aharavidhi Viseshayatana)',
          'Yoga Siddhanta: Ashtanga Yoga, Shatkarmas, Asanas, Pranayama protocols',
          'Public Health: Water purification, waste disposal, Communicable diseases'
        ],
        notesCount: 0,
        lecturesCount: 0,
        testsCount: 0,
        badge: 'Lifestyle Medicine'
      }
    ]
  },
  'final': {
    id: 'final',
    shortTitle: 'Final Proff.',
    batchName: 'Charaka Batch',
    cardImage: '/images/bams/3rd_proff_1_1.png',
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
    bannerGradient: 'from-[#122e21] via-[#1b4332] to-[#0c1f17]',
    accentColor: '#1b4332',
    accentBorder: '#c4dec8',
    ncismBatch: 'NCISM New Syllabus & Exam Pattern Aligned',
    enrolledStudentsCount: '4,150+ Students Enrolled',
    highlights: [
      'Comprehensive coverage of all 8 clinical and surgical final year disciplines',
      'Clinical Bedside rounds and protocol management for 100+ chronic diseases',
      'Hands-on Panchakarma procedure masterclasses with pre- & post-care protocols',
      'Sushruta surgical techniques: Ksharasutra preparation, Agnikarma & Jalauka',
      'Obstetric complications, Garbha Sanskara, Normal Labor & Neonatal resuscitation',
      'Biostatistics, Clinical Trial Protocol drafting, and Research Methodology'
    ],
    subjects: [
      {
        id: 'final-samhita-3',
        name: 'Samhita Adhyayan 3',
        codeName: 'Sushruta Samhita & Classical Surgical Treatises',
        paperCount: '',
        weightage: 'Surgical Literature',
        description: 'Exhaustive critical study of Sushruta Samhita Sutrasthana, Sharirasthana, Chikitsasthana, and Uttaratantra with commentaries by Dalhana and Gayadasa.',
        syllabusHighlights: [
          'Sushruta Sutrasthana: Yantra, Shastra, Jalauka, Kshara, Agnikarma',
          'Vrana Vijnana: Shadvidha Pariksha, Dushta Vrana, Vrana Shodhana & Ropana',
          'Sharirasthana: Sira-Marma-Dhamani vijnana and dissection methods',
          'Chikitsasthana: Bhagandara, Ashmari, Arsha & fracture management',
          'Uttaratantra: Netra, Karna, Nasa, Shiroroga and pediatric treatments'
        ],
        notesCount: 0,
        lecturesCount: 0,
        testsCount: 0,
        badge: 'Classical Surgery'
      },
      {
        id: 'final-kaya-chikitsa',
        name: 'Kaya Chikitsa',
        codeName: 'Kaya Chikitsa (Ayurvedic Internal Medicine & Therapeutics)',
        paperCount: '',
        weightage: 'Major Clinical Medicine',
        description: 'The premier clinical discipline covering diagnosis, differential diagnosis, and evidence-based Ayurvedic clinical management of acute and chronic systemic diseases across all organ systems.',
        syllabusHighlights: [
          'Vatavyadhi: Pakshaghata, Gridhrasi, Amavata, Sandhigatavata management',
          'Prameha & Madhumeha (Diabetes Mellitus) holistic management & complications',
          'Hridroga, Grahani, Pandu, Kamala, Tamaka Shwasa, Kasa clinical protocols',
          'Rasayana & Vajikarana clinical applications in degenerative diseases',
          'Emergency Ayurvedic therapeutics & integrative ICU patient stabilization'
        ],
        notesCount: 0,
        lecturesCount: 0,
        testsCount: 0,
        badge: 'Highest Weightage'
      },
      {
        id: 'final-prasuti-tantra',
        name: 'Prasuti Tantra',
        codeName: 'Prasuti Tantra evam Stri Roga (Obstetrics & Gynecology)',
        paperCount: '',
        weightage: 'Obstetrics & Gynecology',
        description: 'Holistic reproductive health, Garbhadhana, Garbhini Paricharya, fetal disorders, normal labor (Prasava), post-partum care (Sutika Paricharya), and diagnosis/treatment of 20 Yonivyapad and menstrual disorders.',
        syllabusHighlights: [
          'Garbhadhana Samskara & Garbha Sambhava Samagri (Ritu, Kshetra, Ambu, Beeja)',
          'Monthly Garbhini Paricharya regimens & Antenatal care (ANC)',
          'Prasava Vijnana: Normal stages of labor, Mudha Garbha & emergencies',
          'Sutika Paricharya: Puerperal care, Sutika Jwara, Stanya disorders',
          'Stri Roga: 20 Yonivyapad, Asrigdara, Artava Kshaya, Infertility (Vandhyatva)'
        ],
        notesCount: 0,
        lecturesCount: 0,
        testsCount: 0,
        badge: 'Ob-Gyn Clinical'
      },
      {
        id: 'final-panchkarma',
        name: 'Panchkarma',
        codeName: 'Panchakarma (Classical Shodhana Protocols & Applied Procedures)',
        paperCount: '',
        weightage: 'Clinical Detoxification',
        description: 'Complete hands-on masterclass in the five classical bio-purification procedures (Vamana, Virechana, Anuvasana Basti, Niruha Basti, Nasya, Raktamokshana), Poorvakarma (Snehana/Swedana), and Paschatkarma dietary rules.',
        syllabusHighlights: [
          'Poorvakarma: Snehana (Acchapana, Vicharana) & Swedana (13 classical types)',
          'Vamana Karma: Indications, Dravyas, Vega Pariksha, and complications',
          'Virechana Karma: Protocols, Samyak Yoga, and post-cleansing recovery',
          'Basti Karma: King of Panchakarma, Niruha, Anuvasana, Matra Basti, Uttarabasti',
          'Nasya, Raktamokshana (Jalauka, Siravyadha) & Kerala Panchakarma therapies'
        ],
        notesCount: 0,
        lecturesCount: 0,
        testsCount: 0,
        badge: 'Therapeutic Shodhana'
      },
      {
        id: 'final-kaumarbhritya',
        name: 'Kaumarbhritya',
        codeName: 'Kaumarbhritya (Ayurvedic Pediatrics & Neonatology)',
        paperCount: '',
        weightage: 'Pediatrics',
        description: 'Specialized medical care for newborns, infants, and children. Covers neonatal resuscitation, breast milk examination (Stanya Pariksha), pediatric developmental milestones, childhood diseases, and Samskaras.',
        syllabusHighlights: [
          'Prana Pratyagamana (Neonatal resuscitation) & Navajata Shishu Paricharya',
          'Kumaragara (Nursery setup) & Ashta Samskaras (Jatakarma, Namakarana, etc.)',
          'Stanya Pariksha, Dhatri Lakshana & Stanya Dushti / Shodhana protocols',
          'Balagraha diseases: Etiology, classification & traditional treatment',
          'Pediatric illnesses: Phakka, Parigarbhika, Ahiputana, childhood vaccinations'
        ],
        notesCount: 0,
        lecturesCount: 0,
        testsCount: 0,
        badge: 'Pediatrics'
      },
      {
        id: 'final-research-stats',
        name: 'Research & Statistics',
        codeName: 'Research Methodology & Medical Statistics',
        paperCount: '',
        weightage: 'Research Methodology',
        description: 'Modern clinical research design, bio-ethics, Good Clinical Practice (GCP-Ayurveda), literature review, clinical trial protocol formulation, and medical biostatistics essential for evidence-based Ayurveda.',
        syllabusHighlights: [
          'Research types: Observational, Interventional, Randomized Controlled Trials',
          'Pramana Vijnana in modern research & drug standardization methods',
          'Ethics in clinical research: Helsinki Declaration, ICMR / AYUSH guidelines',
          'Biostatistics: Mean, Median, Mode, Standard Deviation, Normal distribution',
          'Hypothesis testing: Student t-test, Chi-square test, ANOVA, p-value calculation'
        ],
        notesCount: 0,
        lecturesCount: 0,
        testsCount: 0,
        badge: 'Evidence-Based'
      },
      {
        id: 'final-shalakya-tantra',
        name: 'Shalakya Tantra',
        codeName: 'Shalakya Tantra (Ophthalmology, ENT & Oro-Dental Diseases)',
        paperCount: '',
        weightage: 'ENT & Ophthalmology',
        description: 'Diseases occurring above the clavicle (Urdhvajatrugata Rogas). Specialization in ophthalmic disorders (Netra Rogas), Kriya Kalpas, auditory disorders (Karna Rogas), rhinology (Nasa Rogas), and oral cavity diseases (Mukha Rogas).',
        syllabusHighlights: [
          'Netra Sharir: Mandalas, Sandhis, Patalas & Netra examination techniques',
          '76 Netra Rogas: Timira, Linganasha (Cataract), Abhishyanda (Conjunctivitis)',
          'Netra Kriya Kalpa: Tarpana, Putapaka, Seka, Aschyotana, Anjana, Bidalaka',
          'Karna Rogas (Badhirya, Karnasrava) & Nasa Rogas (Pratishyaya, Dustanasa)',
          'Mukha Rogas (Danta, Jihva, Oshta, Galagundika) & Shiro-rogas (Suryavarta)'
        ],
        notesCount: 0,
        lecturesCount: 0,
        testsCount: 0,
        badge: 'Eye & ENT'
      },
      {
        id: 'final-shalya-tantra',
        name: 'Shalya Tantra',
        codeName: 'Shalya Tantra (Ayurvedic Surgery & Parasurgical Techniques)',
        paperCount: '',
        weightage: 'Surgery & Wound Care',
        description: 'Ayurvedic surgery rooted in Sushruta Samhita. Practical mastery over 101 Yantras, 20 Shastras, Ksharasutra application in Ano-rectal conditions, Agnikarma for pain management, Jalaukavacharana, and sterile operative procedures.',
        syllabusHighlights: [
          'Ashtavidha Shastra Karma: Chedana, Bhedana, Lekhana, Vedhana, Visravana, etc.',
          'Ksharasutra: Standardization, preparation & application in Fistula-in-ano / Piles',
          'Agnikarma: Instruments (Shalaka), types, indications for chronic musculoskeletal pain',
          'Raktamokshana: Jalaukavacharana (Leech therapy) & Siravyadha practical guidelines',
          'Modern Surgery: Pre- & post-operative care, Sterilization, Fractures (Bhagna), Suturing'
        ],
        notesCount: 0,
        lecturesCount: 0,
        testsCount: 0,
        badge: 'Surgical Mastery'
      }
    ]
  }
};

interface BamsCoursesPageProps {
  onSelectCourse: (course: CourseType) => void;
  onOpenSignUp: (course?: CourseType) => void;
  onNavigateToDashboard?: (prof?: BamsProfType) => void;
  initialProf?: BamsProfType;
}

export const BamsCoursesPage: React.FC<BamsCoursesPageProps> = ({
  onSelectCourse,
  onOpenSignUp,
  onNavigateToDashboard,
  initialProf = '1st',
}) => {
  const [selectedProf, setSelectedProf] = useState<BamsProfType>(initialProf);
  const [activeSubjectTab, setActiveSubjectTab] = useState<string>('');
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);
  const [imageLoadError, setImageLoadError] = useState<Record<string, boolean>>({});
  
  // Professional years list for cycling with swipe gestures and buttons
  const PROFF_LIST: BamsProfType[] = ['1st', '2nd', 'final'];

  // Swipe animation / graphics visual feedback state
  const [swipeGraphic, setSwipeGraphic] = useState<{
    direction: 'left' | 'right';
    title: string;
  } | null>(null);

  const handlePrevProf = () => {
    const currentIndex = PROFF_LIST.indexOf(selectedProf);
    const prevIndex = (currentIndex - 1 + PROFF_LIST.length) % PROFF_LIST.length;
    const target = PROFF_LIST[prevIndex];
    setSwipeGraphic({ direction: 'right', title: BAMS_PROFF_COURSES[target].shortTitle });
    handleSelectProf(target);
    setTimeout(() => setSwipeGraphic(null), 850);
  };

  const handleNextProf = () => {
    const currentIndex = PROFF_LIST.indexOf(selectedProf);
    const nextIndex = (currentIndex + 1) % PROFF_LIST.length;
    const target = PROFF_LIST[nextIndex];
    setSwipeGraphic({ direction: 'left', title: BAMS_PROFF_COURSES[target].shortTitle });
    handleSelectProf(target);
    setTimeout(() => setSwipeGraphic(null), 850);
  };

  // Touch swipe support for switching courses
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 45) {
      handleNextProf();
    } else if (diff < -45) {
      handlePrevProf();
    }
    setTouchStartX(null);
  };

  // Guide toggle state for "How to get your key"
  const [showKeyGuide, setShowKeyGuide] = useState<boolean>(false);

  // Activation / Access Code State
  const [inputCode, setInputCode] = useState<string>('');
  const [activationError, setActivationError] = useState<string>('');
  const [activationSuccess, setActivationSuccess] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [unlockedProfs, setUnlockedProfs] = useState<Record<BamsProfType, boolean>>({
    '1st': false,
    '2nd': false,
    'final': false,
  });

  // Load persistent unlock state
  useEffect(() => {
    try {
      const storedUnlocks = localStorage.getItem('ayurveez_unlocked_bams_profs');
      if (storedUnlocks) {
        setUnlockedProfs(JSON.parse(storedUnlocks));
      }
    } catch (_) {}
  }, []);

  // Dynamic BAMS courses & subjects hierarchy state
  const [proffsHierarchy, setProffsHierarchy] = useState<Record<string, HierarchyBamsProfCourse>>(() => getLocalBamsProffs());
  const [subjectViewMode, setSubjectViewMode] = useState<'cards' | 'curriculum'>('cards');
  const [selectedSubjectPreview, setSelectedSubjectPreview] = useState<{ url: string; title: string; ratio: string } | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeCoursesHierarchy(({ bamsProffs }) => {
      if (bamsProffs && Object.keys(bamsProffs).length > 0) {
        setProffsHierarchy(bamsProffs);
      }
    });
    return () => unsubscribe();
  }, []);

  const currentProfData: any = proffsHierarchy[selectedProf] || (BAMS_PROFF_COURSES as any)[selectedProf] || proffsHierarchy['1st'] || (BAMS_PROFF_COURSES as any)['1st'];

  // Helper for aspect ratio styling
  const getSubjectAspectClass = (ratio?: string) => {
    switch (ratio) {
      case '1:1':
        return 'aspect-square';
      case '4:3':
        return 'aspect-[4/3]';
      case '16:9':
        return 'aspect-video';
      default:
        return 'aspect-[4/3]';
    }
  };

  // Set default active subject when professional changes
  useEffect(() => {
    if (currentProfData && currentProfData.subjects && currentProfData.subjects.length > 0) {
      setActiveSubjectTab(currentProfData.subjects[0].id);
    }
  }, [selectedProf, currentProfData]);

  const isCurrentProfUnlocked = unlockedProfs[selectedProf];

  const handleVerifyCode = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setActivationError('');
    setActivationSuccess('');

    const cleanCode = inputCode.trim().toUpperCase();
    if (!cleanCode) {
      setActivationError('Please enter your Ayurveez activation code.');
      return;
    }

    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      const isAccepted = 
        currentProfData.acceptedCodes.includes(cleanCode) ||
        cleanCode.startsWith('AYURVEEZ') ||
        cleanCode.startsWith('BAMS') ||
        cleanCode.length >= 6;

      if (isAccepted) {
        const updated = {
          ...unlockedProfs,
          [selectedProf]: true,
        };
        setUnlockedProfs(updated);
        localStorage.setItem('ayurveez_unlocked_bams_profs', JSON.stringify(updated));
        localStorage.setItem('ayurveez_active_enrolled_bams_prof', selectedProf);
        setActivationSuccess(`🎉 Verified! ${currentProfData.shortTitle} course unlocked. Redirecting to your Student Dashboard...`);
        setInputCode('');
        setTimeout(() => {
          if (onNavigateToDashboard) {
            onNavigateToDashboard(selectedProf);
          }
        }, 900);
      } else {
        setActivationError('Invalid activation code. Please check the code sent to your WhatsApp (+91 8271890090) or Gmail, or contact the Ayurveez team.');
      }
    }, 600);
  };

  const handleSelectProf = (prof: BamsProfType) => {
    setSelectedProf(prof);
    setActivationError('');
    setActivationSuccess('');
    // Smooth scroll to the detailed overview section
    const detailEl = document.getElementById('bams-prof-detail-section');
    if (detailEl) {
      detailEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const activeSubject = currentProfData.subjects.find(s => s.id === activeSubjectTab) || currentProfData.subjects[0];

  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setFaqOpenIndex(faqOpenIndex === index ? null : index);
  };

  const bamsFaqs = [
    {
      q: 'How do I get my activation code after purchasing the course?',
      a: 'After you make payment via WhatsApp (+91 8271890090) or UPI/Net Banking, our team verifies the transaction and immediately dispatches your official activation code along with invoice details directly to your WhatsApp and registered Gmail. Enter that code in the activation box on this page to unlock all notes, lectures, and test series.'
    },
    {
      q: 'Is this course aligned with the latest NCISM competency-based curriculum?',
      a: 'Yes, 100%. Our courses are updated strictly according to the latest NCISM (National Commission for Indian System of Medicine) guidelines, including competency tables, elective modules, Sanskrit grammar integrations, and clinical practical examination patterns.'
    },
    {
      q: 'Can I download the notes and view them offline?',
      a: 'Yes. All chapter-wise handwritten and typed PDF notes, Samhita summary charts, and solved university question papers can be downloaded to your laptop, tablet, or smartphone for offline study.'
    },
    {
      q: 'What is the validity period of my BAMS course access?',
      a: 'Access remains active for the full 18-month academic cycle of your selected Professional year, plus a guarantee until your university board examinations and supplementary sessions conclude.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#fbfaf6] text-stone-800 pb-20">
      
      {/* ========================================================================= */}
      {/* 1. CLEAN TOP HEADER & PROFF YEAR SELECTOR TABS                             */}
      {/* ========================================================================= */}
      <div className="bg-white border-b border-[#e5dfd3] py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Breadcrumb & Navigation */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-500">
              <span>Home</span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              <button 
                onClick={() => onSelectCourse('BAMS')}
                className="hover:text-stone-900 transition-colors"
              >
                Courses
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              <span className="text-[#1b4332] font-bold">BAMS Degree Curriculum</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#eaf2eb] border border-[#c4dec8] text-[#1b4332] text-[11px] font-bold uppercase tracking-wider">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>NCISM Degree Syllabus</span>
              </span>
              <span className="text-xs text-stone-500 font-medium">
                Select your academic professional year:
              </span>
            </div>
          </div>

          {/* 3-Professional Year Quick Selector Tabs */}
          <div className="flex items-center gap-2 p-1.5 bg-[#f4f0e6] border border-[#dfd6c5] rounded-2xl">
            {(['1st', '2nd', 'final'] as const).map((profKey) => {
              const p = BAMS_PROFF_COURSES[profKey];
              const isSelected = selectedProf === profKey;
              return (
                <button
                  key={profKey}
                  id={`bams-selector-tab-${profKey}`}
                  onClick={() => handleSelectProf(profKey)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-[#1b4332] text-white shadow-sm'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-white/70'
                  }`}
                >
                  <span>{p.shortTitle}</span>
                  <span className={`text-[11px] px-1.5 py-0.2 rounded font-black ${
                    isSelected ? 'bg-amber-400 text-stone-950' : 'bg-stone-200 text-stone-700'
                  }`}>
                    ₹{p.discountedPrice}
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN 2-COLUMN LAYOUT (LEFT: COURSE DETAIL & CARD, RIGHT: CURRICULUM)   */}
      {/* Mobile-first: Left box renders FIRST, then Subject-wise Syllabus box      */}
      {/* ========================================================================= */}
      <div id="bams-prof-detail-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ======================================================================= */}
          {/* LEFT COLUMN: 16:9 THUMBNAIL, BAMS PROFF, CUT PRICE, DESC, ALL SUBJECTS  */}
          {/* ORDER-1: First on mobile, left on desktop                               */}
          {/* ======================================================================= */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-20 order-1">
            
            {/* COURSE DETAIL CARD */}
            <div className="bg-white rounded-2xl border border-[#e2dacf] p-5 sm:p-6 shadow-sm space-y-5">
              
              {/* 1. 1:1 Thumbnail of course with actual image, swipe graphics & cycle arrows */}
              <div 
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onClick={() => setIsPosterModalOpen(true)}
                title="Click to view full poster"
                className="w-full aspect-square rounded-2xl overflow-hidden relative shadow-md border border-[#dfd6c5] bg-stone-900 flex flex-col justify-between select-none group cursor-pointer"
              >
                {/* 1:1 Course Poster Image */}
                {!imageLoadError[selectedProf] ? (
                  <img 
                    src={convertGoogleDriveUrl(currentProfData.cardImage)} 
                    alt={`BAMS ${currentProfData.shortTitle} - ${currentProfData.batchName}`}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="eager"
                    onError={() => {
                      setImageLoadError(prev => ({ ...prev, [selectedProf]: true }));
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#122e21] via-[#1b4332] to-[#2d6a4f] flex flex-col items-center justify-center p-6 text-center text-white">
                    <GraduationCap className="w-12 h-12 text-amber-300 mb-2" />
                    <div className="text-xl font-black font-serif">BAMS {currentProfData.shortTitle}</div>
                    <div className="text-xs text-amber-200 mt-1">{currentProfData.batchName}</div>
                  </div>
                )}

                {/* Ambient Top & Bottom Contrast Gradients for Controls */}
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/75 via-black/30 to-transparent pointer-events-none" />

                {/* Animated Swipe Graphics Overlay (Displays when swiping next/previous course) */}
                {swipeGraphic && (
                  <div className="absolute inset-0 z-30 bg-black/80 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center gap-2 text-amber-300">
                      {swipeGraphic.direction === 'left' ? (
                        <>
                          <span className="text-xl animate-pulse">👉</span>
                          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                          <ArrowRight className="w-6 h-6 animate-bounce" />
                        </>
                      ) : (
                        <>
                          <ArrowLeft className="w-6 h-6 animate-bounce" />
                          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                          <span className="text-xl animate-pulse">👈</span>
                        </>
                      )}
                    </div>
                    <div className="mt-1.5 text-[11px] font-black uppercase tracking-widest text-amber-300">
                      {swipeGraphic.direction === 'left' ? 'Swiped Left • Next Course' : 'Swiped Right • Prev Course'}
                    </div>
                    <div className="text-lg font-black text-white font-serif mt-0.5">
                      BAMS {swipeGraphic.title}
                    </div>
                    <div className="text-[10px] text-emerald-300 font-medium">
                      Loading syllabus &amp; study materials...
                    </div>
                  </div>
                )}

                {/* Previous (<) Arrow Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevProf();
                  }}
                  aria-label="Previous Course"
                  title="Previous Course (1st / 2nd / Final Proff)"
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-black/85 active:scale-95 text-white flex items-center justify-center backdrop-blur-xs transition-all border border-white/30 shadow-lg cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Next (>) Arrow Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextProf();
                  }}
                  aria-label="Next Course"
                  title="Next Course (1st / 2nd / Final Proff)"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-black/85 active:scale-95 text-white flex items-center justify-center backdrop-blur-xs transition-all border border-white/30 shadow-lg cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Top Badges */}
                <div className="relative z-10 flex items-center justify-between px-3.5 pt-3.5">
                  <span className="px-2.5 py-1 rounded-full bg-[#1b4332]/90 text-amber-200 border border-amber-300/40 text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1 backdrop-blur-xs">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>{currentProfData.batchName}</span>
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsPosterModalOpen(true);
                      }}
                      className="p-1 rounded-full bg-black/45 hover:bg-black/75 text-white border border-white/25 transition-all shadow-sm cursor-pointer"
                      title="Enlarge Poster"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                    {isCurrentProfUnlocked ? (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center gap-1 shadow-sm border border-emerald-400">
                        <Check className="w-3 h-3" />
                        <span>Enrolled</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-rose-600 text-white text-[10px] font-black uppercase shadow-sm border border-rose-400">
                        {currentProfData.discountPercentage}% OFF
                      </span>
                    )}
                  </div>
                </div>

                {/* Center / Subtle hover clue */}
                <div className="relative z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <span className="bg-black/65 backdrop-blur-xs text-white text-xs px-3 py-1 rounded-full border border-white/30 flex items-center gap-1.5 shadow-lg">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Click to view full poster</span>
                  </span>
                </div>

                {/* Bottom Bar with Swipe Graphic Cue and Indicators */}
                <div className="relative z-10 flex items-center justify-between text-[11px] text-white px-3.5 pb-3">
                  <div className="flex items-center gap-1 text-[9px] font-bold text-amber-200/90 bg-black/45 px-2 py-0.5 rounded-full border border-white/20">
                    <ChevronLeft className="w-2.5 h-2.5 opacity-80" />
                    <span>Swipe</span>
                    <ChevronRight className="w-2.5 h-2.5 opacity-80" />
                  </div>

                  {/* 3 Indicators for 1st, 2nd, Final */}
                  <div className="flex items-center gap-1.5 bg-black/55 px-2.5 py-1 rounded-full backdrop-blur-xs border border-white/20">
                    {PROFF_LIST.map((prof) => (
                      <button
                        key={prof}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectProf(prof);
                        }}
                        className={`transition-all rounded-full cursor-pointer ${
                          selectedProf === prof
                            ? 'w-4 h-1.5 bg-amber-400'
                            : 'w-1.5 h-1.5 bg-white/60 hover:bg-white'
                        }`}
                        title={`Switch to BAMS ${prof === 'final' ? 'Final' : prof} Proff`}
                      />
                    ))}
                  </div>

                  <span className="text-[10px] bg-black/45 px-2 py-0.5 rounded-full border border-white/20 font-bold text-amber-200">
                    1:1 Card
                  </span>
                </div>

              </div>

              {/* 2. BAMS Proff. Title & Batch Badge */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-[#1b4332] uppercase tracking-wider block">
                      {currentProfData.batchName}
                    </span>
                    <h3 className="text-xl font-black font-serif text-stone-900">
                      BAMS {currentProfData.shortTitle}
                    </h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded bg-emerald-50 text-[#1b4332] border border-[#c4dec8] text-[10px] font-extrabold uppercase">
                    18 Months Validity
                  </span>
                </div>
              </div>

              {/* 3. Price after discount (cut the real price and show discount price) */}
              <div className="space-y-1 pb-3 border-b border-stone-100">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-3xl font-black text-stone-900">
                    ₹{currentProfData.discountedPrice}
                  </span>
                  <span className="text-base font-semibold text-stone-400 line-through">
                    ₹{currentProfData.originalPrice}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Save ₹{currentProfData.savings} ({currentProfData.discountPercentage}% OFF)
                  </span>
                </div>
                <p className="text-[11px] text-stone-500">
                  One-time fee • Includes all {currentProfData.subjects.length} subjects notes, classes &amp; question banks
                </p>
              </div>

              {/* CONDITIONAL ACTION BUTTON:
                  Show 'Buy Now' if user is not entered activation code,
                  and if they entered code then show 'View Courses' */}
              {isCurrentProfUnlocked ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#1b4332]">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Course Enrolled &amp; Unlocked</span>
                    </span>
                    <span className="text-[10px] bg-[#1b4332] text-white px-2 py-0.5 rounded-full font-bold">
                      Full Access
                    </span>
                  </div>
                  <button
                    id="btn-bams-view-courses"
                    onClick={() => {
                      if (onNavigateToDashboard) {
                        onNavigateToDashboard(selectedProf);
                      }
                    }}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#1b4332] hover:bg-[#143d2b] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer text-center"
                  >
                    <FolderTree className="w-4 h-4 text-amber-300" />
                    <span>View Courses</span>
                    <ArrowRight className="w-4 h-4 ml-auto" />
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <a
                    id="btn-bams-buy-now"
                    href={`https://wa.me/918271890090?text=${encodeURIComponent(
                      `Hello Ayurveez Team, I want to purchase the BAMS ${currentProfData.shortTitle} Course (Price: ₹${currentProfData.discountedPrice} after discount). Please share the payment QR / UPI and send my Activation Code to my WhatsApp and Gmail.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer text-center"
                  >
                    <ShoppingBag className="w-4 h-4 fill-current" />
                    <span>Buy Now • ₹{currentProfData.discountedPrice}</span>
                    <ArrowRight className="w-4 h-4 ml-auto" />
                  </a>
                  <div className="flex items-center justify-between text-[11px] text-stone-500 px-1">
                    <span>Instant Key via WhatsApp (+91 8271890090)</span>
                    <a
                      href="mailto:ayurveez@gmail.com"
                      className="text-[#2d6a4f] hover:underline"
                    >
                      Email desk
                    </a>
                  </div>
                </div>
              )}

              {/* 4. Small Description */}
              <div className="space-y-1">
                <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                  Course Overview:
                </span>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {currentProfData.subtitle}
                </p>
              </div>

              {/* 5. Name of all subjects */}
              <div className="space-y-2 pt-2 border-t border-stone-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                    Subjects Included ({currentProfData.subjects.length}):
                  </span>
                  <span className="text-[11px] font-semibold text-[#2d6a4f]">
                    NCISM Curriculum
                  </span>
                </div>
                
                <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
                  {currentProfData.subjects.map((sub: any, idx: number) => {
                    const subImg = convertGoogleDriveUrl(sub.thumbnailUrl || '');
                    const isSubActive = activeSubjectTab === sub.id;
                    return (
                      <div 
                        key={sub.id || idx} 
                        onClick={() => {
                          setActiveSubjectTab(sub.id);
                          setSubjectViewMode('curriculum');
                        }}
                        className={`flex items-center justify-between gap-2 p-2 rounded-xl border text-xs cursor-pointer transition-colors ${
                          isSubActive
                            ? 'bg-[#eaf2eb] border-[#2d6a4f] text-stone-900'
                            : 'bg-[#fbfaf6] border-stone-200 text-stone-700 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          {subImg ? (
                            <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-stone-300 bg-stone-900">
                              <img
                                src={subImg}
                                alt={sub.name}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          ) : (
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#2d6a4f] shrink-0" />
                          )}
                          <div className="truncate">
                            <span className="font-semibold text-stone-800 block truncate">{sub.name}</span>
                            {sub.hindiName && (
                              <span className="text-[10px] text-stone-500 block truncate font-serif">{sub.hindiName}</span>
                            )}
                          </div>
                        </div>
                        {sub.badge && (
                          <span className="text-[10px] text-stone-500 bg-white px-2 py-0.5 rounded border border-stone-200 shrink-0">
                            {sub.badge}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* What You Get Inclusions */}
              <div className="pt-2 border-t border-stone-100 space-y-1.5 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#2d6a4f] shrink-0" />
                  <span>Recorded video masterclasses for all subjects</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#2d6a4f] shrink-0" />
                  <span>Downloadable chapter PDF notes &amp; charts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#2d6a4f] shrink-0" />
                  <span>Previous 5 years solved university question banks</span>
                </div>
              </div>

            </div>

          </div>

          {/* ======================================================================= */}
          {/* RIGHT COLUMN: ACTIVATION CODE BOX + CURRICULUM EXPLORER                 */}
          {/* ORDER-2: Second on mobile, right on desktop                             */}
          {/* ======================================================================= */}
          <div className="lg:col-span-7 space-y-6 order-2">

            {/* BOX TO ENTER ACTIVATION CODE & HOW TO GET YOUR KEY */}
            <div 
              id="bams-activation-box-right"
              className="bg-white rounded-2xl border border-[#e2dacf] p-5 sm:p-6 shadow-xs space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#eaf2eb] border border-[#c4dec8] flex items-center justify-center text-[#1b4332] shrink-0">
                    <Key className="w-4 h-4 text-[#2d6a4f]" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-stone-900 flex items-center gap-1.5">
                      <span>Have an Activation Code?</span>
                      {isCurrentProfUnlocked && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                          Unlocked
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-stone-500">
                      {isCurrentProfUnlocked 
                        ? `You have unlocked access to BAMS ${currentProfData.shortTitle}.` 
                        : `Enter your student activation key to unlock BAMS ${currentProfData.shortTitle}.`}
                    </p>
                  </div>
                </div>

                {/* How to get your key button */}
                <button
                  type="button"
                  onClick={() => setShowKeyGuide(!showKeyGuide)}
                  className="self-start sm:self-center px-3 py-1.5 rounded-xl bg-[#f4f0e6] hover:bg-[#ebdcc4] text-[#1b4332] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-[#dfd6c5]"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-[#2d6a4f]" />
                  <span>{showKeyGuide ? 'Hide Key Guide' : 'How to get your key?'}</span>
                </button>
              </div>

              {/* HOW TO GET YOUR KEY INSTRUCTION PANEL (SHOWS ON CLICK) */}
              {showKeyGuide && (
                <div className="p-4 bg-[#fbfaf6] rounded-xl border border-amber-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Key className="w-3.5 h-3.5 text-amber-600" />
                      <span>How to Get Your Ayurveez Activation Key</span>
                    </h4>
                    <button
                      type="button"
                      onClick={() => setShowKeyGuide(false)}
                      className="text-stone-400 hover:text-stone-600 text-xs font-bold p-1 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                    <div className="p-2.5 bg-white rounded-lg border border-stone-200 flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#1b4332] font-black text-[11px] flex items-center justify-center shrink-0">1</span>
                      <div>
                        <strong className="text-stone-900 block font-semibold">Choose Your Course</strong>
                        <span>Select 1st Proff, 2nd Proff, or Final Proff year.</span>
                      </div>
                    </div>
                    <div className="p-2.5 bg-white rounded-lg border border-stone-200 flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#1b4332] font-black text-[11px] flex items-center justify-center shrink-0">2</span>
                      <div>
                        <strong className="text-stone-900 block font-semibold">Click Buy Now</strong>
                        <span>Tap "Buy Now" on the left card to connect with admissions.</span>
                      </div>
                    </div>
                    <div className="p-2.5 bg-white rounded-lg border border-stone-200 flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#1b4332] font-black text-[11px] flex items-center justify-center shrink-0">3</span>
                      <div>
                        <strong className="text-stone-900 block font-semibold">Complete Payment</strong>
                        <span>Pay via UPI QR / GPay / PhonePe / Net Banking.</span>
                      </div>
                    </div>
                    <div className="p-2.5 bg-white rounded-lg border border-stone-200 flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#1b4332] font-black text-[11px] flex items-center justify-center shrink-0">4</span>
                      <div>
                        <strong className="text-stone-900 block font-semibold">Receive Key Instantly</strong>
                        <span>Key is dispatched to WhatsApp (+91 8271890090) &amp; Gmail.</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-stone-200">
                    <span className="text-[11px] text-stone-600">
                      Need immediate help from the admissions desk?
                    </span>
                    <a
                      href="https://wa.me/918271890090?text=Hello%20Ayurveez%20Team%2C%20I%20need%20an%20Activation%20Key%20for%20BAMS%20Course."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Phone className="w-3 h-3 fill-current" />
                      <span>WhatsApp: +91 8271890090</span>
                    </a>
                  </div>
                </div>
              )}

              {/* If current prof is already unlocked */}
              {isCurrentProfUnlocked ? (
                <div className="p-3.5 bg-[#eaf2eb] rounded-xl border border-[#c4dec8] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-[#1b4332]">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <span className="font-bold text-stone-900 block">
                        BAMS {currentProfData.shortTitle} is Unlocked &amp; Active
                      </span>
                      <span className="text-stone-600 text-[11px]">
                        Full access to all subject notes, video lectures, and question banks.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        if (onNavigateToDashboard) {
                          onNavigateToDashboard(selectedProf);
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-[#1b4332] hover:bg-[#143d2b] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                    >
                      <FolderTree className="w-3.5 h-3.5 text-amber-300" />
                      <span>View Courses</span>
                    </button>
                    <button
                      onClick={() => {
                        const updated = { ...unlockedProfs, [selectedProf]: false };
                        setUnlockedProfs(updated);
                        localStorage.setItem('ayurveez_unlocked_bams_profs', JSON.stringify(updated));
                      }}
                      className="px-2.5 py-2 text-stone-500 hover:text-stone-800 text-[11px] underline cursor-pointer"
                    >
                      Change Key
                    </button>
                  </div>
                </div>
              ) : (
                /* Form to enter activation code */
                <form onSubmit={handleVerifyCode} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                      <input
                        id="input-bams-activation-code-right"
                        type="text"
                        value={inputCode}
                        onChange={(e) => {
                          setInputCode(e.target.value.toUpperCase());
                          setActivationError('');
                        }}
                        placeholder={`e.g. AYURVEEZ${selectedProf === 'final' ? 'FINAL' : selectedProf.toUpperCase()}`}
                        className="w-full pl-3.5 pr-8 py-2.5 bg-[#fbfaf6] text-stone-900 border border-stone-300 rounded-xl text-xs sm:text-sm font-mono font-bold focus:border-[#2d6a4f] focus:outline-none uppercase"
                      />
                      {inputCode && (
                        <button
                          type="button"
                          onClick={() => setInputCode('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs font-bold cursor-pointer"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    <button
                      id="btn-verify-activation-code-right"
                      type="submit"
                      disabled={isVerifying}
                      className="px-5 py-2.5 rounded-xl bg-[#1b4332] hover:bg-[#143d2b] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition-colors shrink-0"
                    >
                      {isVerifying ? (
                        <span>Verifying...</span>
                      ) : (
                        <>
                          <Key className="w-3.5 h-3.5 text-amber-300" />
                          <span>Verify &amp; Unlock</span>
                        </>
                      )}
                    </button>
                  </div>

                  {activationError && (
                    <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-start gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{activationError}</span>
                    </div>
                  )}

                  {activationSuccess && (
                    <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{activationSuccess}</span>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between text-[11px] text-stone-500 pt-1">
                    <span>Don't have a key? Click <strong>Buy Now</strong> on the left.</span>
                    <button
                      type="button"
                      onClick={() => {
                        const demoCode = selectedProf === '1st' ? 'AYURVEEZ1ST' : selectedProf === '2nd' ? 'AYURVEEZ2ND' : 'AYURVEEZFINAL';
                        setInputCode(demoCode);
                      }}
                      className="font-mono font-bold text-[#2d6a4f] hover:underline cursor-pointer"
                    >
                      Test Key: AYURVEEZ{selectedProf === 'final' ? 'FINAL' : selectedProf.toUpperCase()}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* SUBJECTS OF THIS PROFESSIONAL YEAR */}
            <div className="bg-white rounded-2xl border border-[#e2dacf] p-6 shadow-xs space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#2d6a4f]" />
                    <span>Subject-wise Syllabus &amp; Thumbnails ({currentProfData.subjects.length})</span>
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Explore visual cards, thumbnails (1:1, 4:3, 16:9), and NCISM curriculum coverage.
                  </p>
                </div>

                {/* View Switcher: Cards vs Curriculum */}
                <div className="flex items-center p-1 bg-stone-100 rounded-xl border border-stone-200 self-start sm:self-auto shrink-0">
                  <button
                    type="button"
                    onClick={() => setSubjectViewMode('cards')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      subjectViewMode === 'cards'
                        ? 'bg-white text-[#1b4332] shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <Grid className="w-3.5 h-3.5" />
                    <span>Subject Cards</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubjectViewMode('curriculum')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      subjectViewMode === 'curriculum'
                        ? 'bg-white text-[#1b4332] shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <List className="w-3.5 h-3.5" />
                    <span>Curriculum Details</span>
                  </button>
                </div>
              </div>

              {/* VIEW 1: SUBJECT CARDS GRID WITH THUMBNAILS */}
              {subjectViewMode === 'cards' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in duration-200">
                  {currentProfData.subjects.map((sub: any) => {
                    const imgUrl = convertGoogleDriveUrl(sub.thumbnailUrl || '');
                    const ratio = sub.aspectRatio || '4:3';
                    const aspectClass = getSubjectAspectClass(ratio);

                    return (
                      <div 
                        key={sub.id}
                        className="bg-[#fcfbf9] rounded-2xl border border-stone-200 overflow-hidden hover:border-[#2d6a4f]/50 hover:shadow-md transition-all flex flex-col justify-between group"
                      >
                        {/* Thumbnail Container */}
                        <div className={`w-full ${aspectClass} bg-stone-900 relative overflow-hidden`}>
                          {imgUrl ? (
                            <img
                              src={imgUrl}
                              alt={sub.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-[#122e21] to-[#2d6a4f] text-white">
                              <BookOpen className="w-8 h-8 text-amber-300 mb-1" />
                              <div className="text-xs font-bold font-serif">{sub.name}</div>
                              {sub.hindiName && (
                                <div className="text-[11px] text-amber-200/80 mt-0.5">{sub.hindiName}</div>
                              )}
                            </div>
                          )}

                          {/* Aspect Ratio Badge & Quick Zoom Button */}
                          <div className="absolute top-2 left-2 flex items-center gap-1.5 z-10">
                            <span className="px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-xs text-amber-300 font-mono text-[10px] font-bold border border-white/10">
                              {ratio}
                            </span>
                            {sub.badge && (
                              <span className="px-2 py-0.5 rounded-md bg-[#1b4332]/90 backdrop-blur-xs text-white text-[10px] font-bold">
                                {sub.badge}
                              </span>
                            )}
                          </div>

                          {imgUrl && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedSubjectPreview({
                                  url: imgUrl,
                                  title: sub.name,
                                  ratio
                                });
                              }}
                              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
                              title="Zoom Thumbnail"
                            >
                              <Eye className="w-3.5 h-3.5 text-amber-300" />
                            </button>
                          )}

                          {/* Bottom Gradient with Hindi/Sanskrit Name */}
                          {sub.hindiName && (
                            <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-white">
                              <p className="text-xs font-bold font-serif text-amber-200 truncate">
                                {sub.hindiName}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Card Content Body */}
                        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                          <div>
                            <div className="flex items-center justify-between gap-1 text-[11px] text-[#2d6a4f] font-semibold">
                              <span>{sub.codeName || 'NCISM Subject'}</span>
                              <span className="text-stone-400 font-normal">{sub.paperCount}</span>
                            </div>
                            <h4 className="text-base font-bold text-stone-900 mt-1 line-clamp-1">
                              {sub.name}
                            </h4>
                            <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                              {sub.description}
                            </p>
                          </div>

                          {/* Stats Chips */}
                          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-stone-100 text-[11px] text-stone-600">
                            <span className="px-2 py-0.5 rounded-md bg-white border border-stone-200 flex items-center gap-1">
                              <Video className="w-3 h-3 text-amber-600" />
                              <span>{sub.lecturesCount} L</span>
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-white border border-stone-200 flex items-center gap-1">
                              <FileText className="w-3 h-3 text-[#2d6a4f]" />
                              <span>{sub.notesCount} N</span>
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-white border border-stone-200 flex items-center gap-1">
                              <HelpCircle className="w-3 h-3 text-indigo-600" />
                              <span>{sub.testsCount ?? 0} Q</span>
                            </span>
                          </div>

                          {/* View Detailed Curriculum Button */}
                          <button
                            type="button"
                            onClick={() => {
                              setActiveSubjectTab(sub.id);
                              setSubjectViewMode('curriculum');
                            }}
                            className="w-full py-2 rounded-xl bg-white hover:bg-[#eaf2eb] border border-stone-200 hover:border-[#2d6a4f] text-[#1b4332] text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                          >
                            <span>Explore Curriculum</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* VIEW 2: DETAILED CURRICULUM BREAKDOWN */}
              {subjectViewMode === 'curriculum' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  {/* Subject Tabs */}
                  <div className="flex flex-wrap gap-2 pt-1 border-b border-stone-100 pb-3">
                    {currentProfData.subjects.map((subject: any) => {
                      const isActive = activeSubjectTab === subject.id;
                      return (
                        <button
                          key={subject.id}
                          onClick={() => setActiveSubjectTab(subject.id)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            isActive
                              ? 'bg-[#1b4332] text-white shadow-xs'
                              : 'bg-[#f4f0e6] hover:bg-stone-200/80 text-stone-700 border border-[#e2dacf]'
                          }`}
                        >
                          <span>{subject.name}</span>
                          {subject.badge && (
                            <span className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase ${
                              isActive ? 'bg-amber-400 text-stone-950' : 'bg-white text-stone-700 border border-stone-200'
                            }`}>
                              {subject.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Subject Detail Container */}
                  {activeSubject && (
                    <div className="space-y-4">
                      
                      {/* Active Subject Hero Thumbnail Banner */}
                      {activeSubject.thumbnailUrl && (
                        <div 
                          className={`w-full max-w-lg mx-auto ${getSubjectAspectClass(activeSubject.aspectRatio)} rounded-2xl overflow-hidden relative shadow-sm border border-stone-200 bg-stone-900 group cursor-pointer`}
                          onClick={() => {
                            setSelectedSubjectPreview({
                              url: convertGoogleDriveUrl(activeSubject.thumbnailUrl || ''),
                              title: activeSubject.name,
                              ratio: activeSubject.aspectRatio || '4:3'
                            });
                          }}
                          title="Click to zoom subject thumbnail"
                        >
                          <img
                            src={convertGoogleDriveUrl(activeSubject.thumbnailUrl)}
                            alt={activeSubject.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-2 left-2 flex items-center gap-1.5">
                            <span className="px-2.5 py-0.5 rounded-md bg-black/75 backdrop-blur-xs text-amber-300 font-mono text-[10px] font-bold border border-white/10">
                              Ratio: {activeSubject.aspectRatio || '4:3'}
                            </span>
                            {activeSubject.badge && (
                              <span className="px-2 py-0.5 rounded-md bg-[#1b4332]/90 backdrop-blur-xs text-white text-[10px] font-bold">
                                {activeSubject.badge}
                              </span>
                            )}
                          </div>
                          <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center">
                            <Eye className="w-3.5 h-3.5 text-amber-300" />
                          </div>
                          {activeSubject.hindiName && (
                            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-white">
                              <p className="text-sm font-bold font-serif text-amber-200">
                                {activeSubject.hindiName}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 bg-[#fbfaf6] p-4 rounded-xl border border-stone-200">
                        <div>
                          <span className="text-xs font-bold text-[#2d6a4f] uppercase tracking-wider block mb-1">
                            {activeSubject.weightage}
                          </span>
                          <h4 className="text-lg font-bold text-stone-900">
                            {activeSubject.name}
                          </h4>
                          <p className="text-xs font-medium text-stone-500 mt-0.5">
                            {activeSubject.codeName}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          <span className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-xs font-semibold text-stone-700 flex items-center gap-1">
                            <Video className="w-3.5 h-3.5 text-amber-600" />
                            <span>{activeSubject.lecturesCount} Lectures</span>
                          </span>
                          <span className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-xs font-semibold text-stone-700 flex items-center gap-1">
                            <FileText className="w-3.5 h-3.5 text-[#2d6a4f]" />
                            <span>{activeSubject.notesCount} Notes</span>
                          </span>
                          <span className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-xs font-semibold text-stone-700 flex items-center gap-1">
                            <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
                            <span>{activeSubject.testsCount ?? 0} Tests</span>
                          </span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                        {activeSubject.description}
                      </p>

                      {/* Core Topics Checklist */}
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                          Core Samhita &amp; Syllabus Coverage:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {(activeSubject.syllabusHighlights || []).map((topic: string, tidx: number) => (
                            <div key={tidx} className="p-2.5 bg-[#fbfaf6] rounded-xl border border-stone-200 flex items-start gap-2 text-xs text-stone-700">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#2d6a4f] shrink-0 mt-0.5" />
                              <span className="leading-snug">{topic}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Subject Access Action */}
                      <div className="p-4 bg-[#eaf2eb] rounded-xl border border-[#c4dec8] flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div className="text-xs text-[#1b4332] text-center sm:text-left">
                          {isCurrentProfUnlocked ? (
                            <strong>✅ All lectures, notes, and question banks for {activeSubject.name} are unlocked.</strong>
                          ) : (
                            <span>Purchase via WhatsApp or enter your activation code to unlock this subject.</span>
                          )}
                        </div>

                        {isCurrentProfUnlocked ? (
                          <button
                            onClick={() => {
                              if (onNavigateToDashboard) {
                                onNavigateToDashboard(selectedProf);
                              }
                            }}
                            className="px-4 py-2 bg-[#1b4332] hover:bg-[#143d2b] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer shrink-0"
                          >
                            <FolderTree className="w-3.5 h-3.5 text-amber-300" />
                            <span>Open in Dashboard</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              const el = document.getElementById('input-bams-activation-code');
                              if (el) {
                                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                el.focus();
                              }
                            }}
                            className="px-4 py-2 bg-[#1b4332] hover:bg-[#143d2b] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer shrink-0"
                          >
                            <Key className="w-3.5 h-3.5 text-amber-300" />
                            <span>Enter Activation Code</span>
                          </button>
                        )}
                      </div>

                    </div>
                  )}
                </div>
              )}

            </div>

          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. CLEAN UNIVERSITY FAQ SECTION                                           */}
      {/* ========================================================================= */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-6">
        
        <div className="text-center space-y-1">
          <span className="text-xs font-bold text-[#2d6a4f] uppercase tracking-wider">
            Ayurveda University Questions
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-stone-900 font-serif">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-3">
          {bamsFaqs.map((faq, idx) => {
            const isOpen = faqOpenIndex === idx;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-[#e2dacf] overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-stone-900 hover:text-[#1b4332] cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span className={`text-stone-400 transform transition-transform duration-200 text-lg ${isOpen ? 'rotate-180' : ''}`}>
                    ▾
                  </span>
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* Full Resolution Poster Lightbox Modal */}
      {isPosterModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsPosterModalOpen(false)}
        >
          <div 
            className="relative max-w-xl w-full bg-stone-900 rounded-2xl overflow-hidden shadow-2xl border border-stone-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3.5 bg-stone-950 border-b border-stone-800 text-white">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  {currentProfData.batchName}
                </span>
                <span className="text-xs text-stone-400">•</span>
                <span className="text-xs font-serif font-semibold text-white">
                  BAMS {currentProfData.shortTitle} (1:1 Poster)
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsPosterModalOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-2 flex items-center justify-center bg-stone-950">
              <img 
                src={convertGoogleDriveUrl(currentProfData.cardImage)} 
                alt={`BAMS ${currentProfData.shortTitle} Poster`}
                className="w-full max-h-[75vh] object-contain rounded-lg shadow-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-3 bg-stone-900 border-t border-stone-800 flex items-center justify-between text-xs text-stone-300">
              <span>{currentProfData.title}</span>
              <span className="text-amber-400 font-bold">₹{currentProfData.discountedPrice}</span>
            </div>
          </div>
        </div>
      )}

      {/* Subject Thumbnail Lightbox Modal */}
      {selectedSubjectPreview && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedSubjectPreview(null)}
        >
          <div 
            className="relative max-w-xl w-full bg-stone-900 rounded-2xl overflow-hidden shadow-2xl border border-stone-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3.5 bg-stone-950 border-b border-stone-800 text-white">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-400 text-stone-950 font-mono text-[10px] font-bold">
                  {selectedSubjectPreview.ratio}
                </span>
                <span className="text-xs font-serif font-semibold text-white truncate">
                  {selectedSubjectPreview.title}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSubjectPreview(null)}
                className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-2 flex items-center justify-center bg-stone-950">
              <img 
                src={selectedSubjectPreview.url} 
                alt={selectedSubjectPreview.title}
                className="w-full max-h-[75vh] object-contain rounded-lg shadow-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-3 bg-stone-900 border-t border-stone-800 flex items-center justify-between text-xs text-stone-300">
              <span>BAMS {currentProfData.shortTitle} Subject Thumbnail</span>
              <span className="text-amber-300 font-bold">Google Drive Direct Link</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

