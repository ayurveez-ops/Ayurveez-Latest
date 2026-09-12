import { CourseDetail, MockTest, StudyNote } from '../types';

export const COURSES_DATA: Record<string, CourseDetail> = {
  'BAMS': {
    id: 'BAMS',
    name: 'BAMS Professional University Curriculum',
    tagline: 'Comprehensive 1st to Final Professional Syllabus & Exam Mastery',
    badge: 'University & NCISM Standard',
    iconName: 'GraduationCap',
    description: 'Designed specifically for Bachelor of Ayurvedic Medicine and Surgery undergraduates. Includes chapter-by-chapter Samhita analysis, Sanskrit shloka interpretations, modern anatomical correlations, and university model question banks.',
    features: [
      'NCISM Competency-Based Dynamic Syllabus',
      'Year-wise Shloka Recitation & Detailed Anvaya',
      'Modern Pathology & Anatomy Integration',
      'University Theory & Practical Model Papers',
      'Dravyaguna Herbarium & Rasa Shastra Formulations'
    ],
    subjects: [
      { name: 'Padartha Vijnan & Samhita Adhyayan', weightage: '1st Prof', subtopics: ['Darshana Siddhanta', 'Pramana Vijnana', 'Padartha Vijnana', 'Charaka Sutrasthana 1-12'] },
      { name: 'Kriya Sharir (Ayurvedic & Modern Physiology)', weightage: '1st Prof', subtopics: ['Tridosha Vijnana', 'Dhatu & Mala Poshana', 'Srotas Vijnana', 'Modern Hematology & Endocrine'] },
      { name: 'Rachana Sharir (Anatomy & Garbha Sharir)', weightage: '1st Prof', subtopics: ['Marma Sharir', 'Snayu & Sira', 'Kostha & Ashaya', 'Dissection & Surface Anatomy'] },
      { name: 'Dravyaguna Vijnana', weightage: '2nd Prof', subtopics: ['Rasapanchaka Siddhanta', 'Karma & Prayoga of 200+ Herbs', 'Pratinidhi Dravya', 'Modern Pharmacology'] },
      { name: 'Rasa Shastra & Bhaishajya Kalpana', weightage: '2nd Prof', subtopics: ['Rasa-Uparasa-Maharasa Shodhana & Marana', 'Kashaya Kalpana', 'Asava-Arishta', 'Quality Control & Nanoparticles (Bhasma)'] },
      { name: 'Roga Nidan & Vikriti Vijnana', weightage: '2nd Prof', subtopics: ['Nidanpanchaka', 'Ashtavidha & Dashavidha Pariksha', 'Vyadhi Nidan', 'Modern Diagnostic Labs'] },
      { name: 'Kayachikitsa & Panchakarma', weightage: 'Final Prof', subtopics: ['Jwara, Prameha, Vatavyadhi Chikitsa', 'Snehana, Swedana, Vamana, Virechana, Basti', 'Emergency Ayurvedic Care'] },
      { name: 'Shalya Tantra & Shalakya Tantra', weightage: 'Final Prof', subtopics: ['Sushruta Yantra-Shastra', 'Ksharasutra & Jalaukavacharana', 'Netra-Karna-Nasa-Mukha Rogas', 'Vrana Shodhana & Ropana'] }
    ],
    examPattern: {
      totalMarks: '100 Marks per Paper',
      questionsCount: 'MCQs (20) + Short Answers (8) + Long Essays (4)',
      duration: '3 Hours',
      markingScheme: 'University grading with internal assessment weightage'
    },
    targetAudience: '1st, 2nd, 3rd and Final Year BAMS students seeking university distinction and conceptual clarity.',
    stats: {
      studentsEnrolled: '14,200+',
      mockTestsCount: 45,
      studyNotesCount: 180,
      successRate: '98.4%'
    }
  },
  'AIAPGET': {
    id: 'AIAPGET',
    name: 'AIAPGET (Ayurveda PG Entrance)',
    tagline: 'Target All India Rank Under 100 with Samhita-Centric NTA Simulation',
    badge: 'Upcoming • NTA Standard AIAPGET',
    isUpcoming: true,
    iconName: 'Award',
    description: 'The pinnacle coaching module for All India AYUSH Post Graduate Entrance Test (MD/MS Ayurveda). Master Charaka Samhita, Sushruta Samhita, Ashtanga Hridaya, Kashyapa, Sharangadhara, with high-yield numericals, modern research, and authentic negative marking.',
    features: [
      '100% High-Yield Samhita-Wise MCQ Bank',
      'Charaka & Sushruta Tika (Chakrapani & Dalhana) Insights',
      'Research Methodology & Medical Statistics Modules',
      'Full-Length 120 Questions All India Mock Simulator',
      'AI Ranking & Weak-Topic Diagnostic Matrix'
    ],
    subjects: [
      { name: 'Brihattrayi (Charaka, Sushruta, Ashtanga Hridaya)', weightage: '55% Exam Weight', subtopics: ['Charaka Sutra, Nidana, Chikitsa, Kalpa, Siddhi', 'Sushruta Sutra, Sharira, Chikitsa, Uttaratantra', 'Ashtanga Hridaya Sutrasthana & Chikitsasthana'] },
      { name: 'Laghuttrayi (Madhav Nidana, Sharangadhara, Bhavaprakasha)', weightage: '15% Exam Weight', subtopics: ['Kashyapa Khila Sthana & Phala Srotas', 'Sharangadhara Nadi Pariksha & Kalpana', 'Bhavaprakasha Nighantu botanical keys', 'Bhaishajya Ratnavali formulations'] },
      { name: 'Clinical Ayurveda & Contemporary Subjects', weightage: '20% Exam Weight', subtopics: ['Dravyaguna synonyms & Guna-karma', 'Rasa Shastra Bhasma colors & tests', 'Panchakarma Matra & Vyapad Chikitsa', 'Kayachikitsa Yoga combinations'] },
      { name: 'Research Methodology, Statistics & Modern Medicine', weightage: '10% Exam Weight', subtopics: ['Clinical trials phases & GCP', 'Mean, Median, Standard Deviation, p-value', 'Recent AYUSH Guidelines & Pharmacopoeia'] }
    ],
    examPattern: {
      totalMarks: '480 Marks',
      questionsCount: '120 Multiple Choice Questions (Single Correct)',
      duration: '120 Minutes (2 Hours)',
      markingScheme: '+4 for Correct Answer, -1 for Incorrect Answer'
    },
    targetAudience: 'BAMS Interns, BAMS Graduates, and Post-BAMS Doctors targeting top MD/MS institutes like NIA Jaipur, AIIA New Delhi, ITRA Jamnagar, and BHU Varanasi.',
    stats: {
      studentsEnrolled: '9,850+',
      mockTestsCount: 75,
      studyNotesCount: 260,
      successRate: '94.2%'
    }
  },
  'AYUSH MEDICAL OFFICER': {
    id: 'AYUSH MEDICAL OFFICER',
    name: 'AYUSH Medical Officer (AMO) & PSC/UPSC',
    tagline: 'State PSC, UPSC & National AYUSH Mission Recruitment Preparation',
    badge: 'Upcoming • Gazetted Officer Preparation',
    isUpcoming: true,
    iconName: 'ShieldCheck',
    description: 'Dedicated preparation for State Public Service Commission (UPPSC, MPPSC, RPSC, OPSC, BPSC, GPSC, HPSC) and UPSC AYUSH Medical Officer examinations. Covers Ayurvedic clinical management, National Health Programs, public health, forensic medicine, and General Studies.',
    features: [
      'State-Wise PSC Previous 10 Years Solved Papers',
      'National AYUSH Mission & Public Health Initiatives',
      'Clinical Case-Based Scenarios & Drug Formularies',
      'Forensic Medicine, Medical Jurisprudence & Ethics',
      'General Knowledge, State Specific GK & Current Affairs'
    ],
    subjects: [
      { name: 'Ayurvedic Core Principles & Clinical Management', weightage: '50% Exam Weight', subtopics: ['Kayachikitsa protocols for OPD/IPD', 'Rasayana & Vajikarana protocols in geriatric care', 'Panchakarma in government dispensaries', 'Ayurvedic management of NCDs (Diabetes, Hypertension, Osteoarthritis)'] },
      { name: 'Swasthavritta, Yoga & Public Health', weightage: '20% Exam Weight', subtopics: ['Dinacharya & Ritucharya principles', 'Epidemiology of communicable diseases', 'National Health Programs & AYUSH integration', 'Dietary guidelines & Pathyapathya'] },
      { name: 'Pharmacology, Quality Control & Legal Acts', weightage: '15% Exam Weight', subtopics: ['Drugs and Cosmetics Act 1940 & Rules 1945', 'Essential AYUSH Drug List', 'Standard Operating Procedures in Dispensaries', 'Ayurvedic Pharmacopoeia of India (API)'] },
      { name: 'Forensic Medicine, Toxicology & General Studies', weightage: '15% Exam Weight', subtopics: ['Agadatantra & Visha Chikitsa (Sarpavisha, Keetavisha)', 'Medical Ethics & Consumer Protection Act', 'General Knowledge & Current Health Developments'] }
    ],
    examPattern: {
      totalMarks: '150 - 300 Marks (State Specific)',
      questionsCount: '100 - 150 Objective Questions',
      duration: '2 Hours',
      markingScheme: '+1 or +2 per correct, 0.25 to 0.33 negative marking'
    },
    targetAudience: 'Qualified Ayurvedic Doctors aiming for permanent Gazetted Medical Officer positions in Central and State Government Health Services.',
    stats: {
      studentsEnrolled: '6,400+',
      mockTestsCount: 50,
      studyNotesCount: 140,
      successRate: '91.8%'
    }
  }
};

export const MOCK_TESTS_DATA: MockTest[] = [
  {
    id: 'aiapget-grand-mock-1',
    title: 'AIAPGET All India Grand Mock Test #1',
    course: 'AIAPGET',
    category: 'Full Mock',
    durationMinutes: 120,
    totalMarks: 480,
    marksPerCorrect: 4,
    negativeMark: 1,
    difficulty: 'Exam Standard',
    totalAttempts: 3420,
    description: 'Exact NTA AIAPGET pattern covering Brihattrayi (Charaka, Sushruta, Vagbhata), Laghuttrayi, Research Methodology, and Modern correlations with strict negative marking.',
    questions: [
      {
        id: 'q1',
        subject: 'Charaka Samhita',
        samhitaReference: 'Charaka Sutrasthana 1/41',
        shloka: 'सर्वदा सर्वभावानां सामान्यं वृद्धिpieकारणम्। ह्रासहेतुर्विशेषश्च प्रवृत्तिरुभयस्य तु॥',
        question: 'According to Charaka Sutrasthana Chapter 1, which principle is responsible for the increase of all Dravyas and Bhavas?',
        options: [
          'Vishesha (विशेष)',
          'Samanya (सामान्य)',
          'Samavaya (समवाय)',
          'Abhava (अभाव)'
        ],
        correctIndex: 1,
        explanation: 'According to Charaka Sutrasthana 1/41, "Samanya" (General/Similarity) is the cause for increase (Vriddhi) of all entities, whereas "Vishesha" (Difference) causes depletion (Hrasa).'
      },
      {
        id: 'q2',
        subject: 'Sushruta Samhita',
        samhitaReference: 'Sushruta Sutrasthana 25/5',
        shloka: 'अष्टविधं शस्त्रकर्म: छेद्यं भेद्यं लेख्यं वेध्यमेष्यमाहार्यं विस्राव्यं सीव्यमिति।',
        question: 'According to Acharya Sushruta, how many types of Shastra Karma (operative surgical procedures) are described?',
        options: [
          '6 types',
          '7 types',
          '8 types (Ashtavidha)',
          '10 types'
        ],
        correctIndex: 2,
        explanation: 'Acharya Sushruta describes Ashtavidha Shastra Karma (8 surgical procedures): Chedana, Bhedana, Lekhana, Vedhana, Eshana, Aharya, Visravana, and Seevana.'
      },
      {
        id: 'q3',
        subject: 'Dravyaguna Vijnana',
        samhitaReference: 'Bhavaprakasha Nighantu - Haritakyadi Varga',
        shloka: 'यस्य यस्य च द्रव्यस्य यावती रसवीर्ययोः।',
        question: 'Which of the following is the therapeutic dose of Guggulu (Purified Commiphora mukul) for internal administration as per API/classical texts?',
        options: [
          '125 mg to 250 mg',
          '2 to 4 grams (1/2 to 1 Karsha)',
          '10 to 20 grams',
          '50 to 100 mg'
        ],
        correctIndex: 1,
        explanation: 'Classical therapeutic internal dosage of Shuddha Guggulu is generally 2 to 4 grams (or 1/2 to 1 Karsha) with suitable Anupana (warm water, honey, or decoction).'
      },
      {
        id: 'q4',
        subject: 'Rasa Shastra',
        samhitaReference: 'Rasaratna Samucchaya 1/68',
        shloka: 'हिंगुलोत्थः पारदः श्रेष्ठः शुद्धिकर्मविवर्जितः।',
        question: 'Which variety of Parada (Mercury) is considered superior and does not require extensive classical 8 Samskaras for general medicinal preparations?',
        options: [
          'Rasa Karpura',
          'Hingulottha Parada (extracted from Cinnabar)',
          'Naga-baddha Parada',
          'Shulva Parada'
        ],
        correctIndex: 1,
        explanation: 'Hingulottha Parada (obtained via distillation/sublimation from pure Hingula) is naturally free from Saptakanchuka Doshas and considered pristine for Rasashastra preparations.'
      },
      {
        id: 'q5',
        subject: 'Panchakarma',
        samhitaReference: 'Charaka Siddhisthana 1/15',
        shloka: 'बस्तिर्वातहराणां श्रेष्ठः',
        question: 'Which Basti is administered in a sequence of 30 Bastis (1 Annuvasana, 12 Niruha, 17 Anuvasana)?',
        options: [
          'Yoga Basti (8 Bastis)',
          'Matra Basti (Daily Single)',
          'Karma Basti (30 Bastis)',
          'Kala Basti (16 Bastis)'
        ],
        correctIndex: 2,
        explanation: 'Karma Basti consists of a complete course of 30 Bastis (1 Anuvasana start, 12 alternate Niruha + 12 Anuvasana, and 5 concluding Anuvasana = 18 Anuvasana + 12 Niruha = 30 total).'
      },
      {
        id: 'q6',
        subject: 'Ashtanga Hridaya',
        samhitaReference: 'Ashtanga Hridaya Sutrasthana 1/19',
        shloka: 'उत्साहोच्छ्वासनिःश्वासचेष्टावेगप्रवर्तनैः। सम्यग्गत्या च धातूनामक्षाणां पाटवेन च॥',
        question: 'The above quotation from Vagbhata describes the normal physiological functions of which Dosha?',
        options: [
          'Pitta Dosha in Prakrita Avastha',
          'Vata Dosha in Prakrita Avastha',
          'Kapha Dosha in Prakrita Avastha',
          'Rakta Dhatu in Samyavastha'
        ],
        correctIndex: 1,
        explanation: 'This shloka enumerates the Karma of Prakrita Vata: Utsaha (enthusiasm), Ucchvasa-Nishvasa (respiration), Cheshta (voluntary/involuntary motor movements), Vega Pravartana, proper dhatu transportation, and sensory acuity.'
      },
      {
        id: 'q7',
        subject: 'Research Methodology & Medical Statistics',
        samhitaReference: 'AYUSH PG Syllabus Section 4',
        question: 'In a clinical trial comparing Punarnavadi Kwatha against an active control in Edema patients, which statistical test is most suitable for comparing mean blood urea levels before and after treatment in the same group?',
        options: [
          'Chi-Square test',
          'Paired Student t-test',
          'Log-rank survival test',
          'Fisher exact test'
        ],
        correctIndex: 1,
        explanation: 'For quantitative parametric continuous data evaluated in the same cohort before and after an intervention, the Paired Student t-test is the standard statistical test.'
      },
      {
        id: 'q8',
        subject: 'Prasuti Tantra & Stri Roga',
        samhitaReference: 'Charaka Sharirasthana 8/22',
        shloka: 'सद्योगृहीतगर्भाया लक्षणानि',
        question: 'Which of the following is considered a primary classical symptom of Sadyo-Grahita Garbha (immediate conception) according to Charaka and Sushruta?',
        options: [
          'Hrillasa and Chhardi (Nausea and vomiting)',
          'Shrama, Glani, Pipasa, and Sphurana in Yoni',
          'Stana Krishna Chuchuka (Hyperpigmentation of areola)',
          'Praseka and Aruchi'
        ],
        correctIndex: 1,
        explanation: 'Acharyas describe Shrama (fatigue without exertion), Glani, Pipasa (thirst), Sakthi Sadana (heaviness in thighs), and Sphurana/Garbhashaya Beejagrahanam in Yoni as Sadyo Grahita Garbha Lakshana.'
      }
    ]
  },
  {
    id: 'bams-prof-mock-1',
    title: 'BAMS Professional University Benchmark Exam',
    course: 'BAMS',
    category: 'Subject Wise',
    durationMinutes: 90,
    totalMarks: 100,
    marksPerCorrect: 2,
    negativeMark: 0,
    difficulty: 'Moderate',
    totalAttempts: 5120,
    description: 'Tailored for undergraduate BAMS semester examinations focusing on Dravyaguna, Rachana Sharir, Kriya Sharir, and Charaka Samhita with detailed Sanskrit commentary.',
    questions: [
      {
        id: 'bq1',
        subject: 'Rachana Sharir',
        samhitaReference: 'Sushruta Sharirasthana 6/3',
        shloka: 'सप्तोत्तरं मर्मशतम्',
        question: 'According to Sushruta, what is the total number of Marmas in the human body, and how many are Sadhyo Pranahara Marmas?',
        options: [
          '107 total Marmas, 19 Sadhyo Pranahara',
          '108 total Marmas, 18 Sadhyo Pranahara',
          '64 total Marmas, 12 Sadhyo Pranahara',
          '107 total Marmas, 33 Sadhyo Pranahara'
        ],
        correctIndex: 0,
        explanation: 'Sushruta classifies 107 Marmas: Sadhyo Pranahara (19), Kalantara Pranahara (33), Vishalyaghna (3), Vaikalyakara (44), and Rujakara (8).'
      },
      {
        id: 'bq2',
        subject: 'Kriya Sharir',
        samhitaReference: 'Charaka Sutrasthana 17/62',
        shloka: 'रसाद्रक्तं ततो मांसं मांसान्मेदः प्रजायते। मेदसोऽस्थि ततो मज्जा मज्ज्ञः शुक्रं प्रजायते॥',
        question: 'According to Ksheeradadhi Nyaya, the sequential transformation of Sapta Dhatus proceeds in which order?',
        options: [
          'Rasa -> Rakta -> Meda -> Mamsa -> Majja -> Asthi -> Shukra',
          'Rasa -> Rakta -> Mamsa -> Meda -> Asthi -> Majja -> Shukra',
          'Rasa -> Mamsa -> Rakta -> Meda -> Asthi -> Majja -> Shukra',
          'Rasa -> Rakta -> Asthi -> Mamsa -> Meda -> Majja -> Ojas'
        ],
        correctIndex: 1,
        explanation: 'The classic sequence is Rasa -> Rakta -> Mamsa -> Meda -> Asthi -> Majja -> Shukra, with Ojas as the ultimate essence (Sara).'
      },
      {
        id: 'bq3',
        subject: 'Dravyaguna',
        samhitaReference: 'Dravyaguna Vijnana Part II',
        question: 'What are the Rasapanchaka properties of Ashwagandha (Withania somnifera)?',
        options: [
          'Tikta-Kashaya Rasa, Sheeta Veerya, Madhura Vipaka',
          'Tikta-Katu-Kashaya Rasa, Ushna Veerya, Madhura Vipaka',
          'Madhura-Amla Rasa, Ushna Veerya, Amla Vipaka',
          'Katu-Tikta Rasa, Sheeta Veerya, Katu Vipaka'
        ],
        correctIndex: 1,
        explanation: 'Ashwagandha has Tikta, Katu, Kashaya Rasa; Ushna Veerya; Madhura Vipaka; and acts as Balya, Rasayana, and Vata-Kapha Shamaka.'
      },
      {
        id: 'bq4',
        subject: 'Kayachikitsa',
        samhitaReference: 'Charaka Chikitsasthana 3/140',
        question: 'In the management of Navajwara (acute fever within first 7 days), which therapeutic measure is strictly indicated as prime treatment?',
        options: [
          'Snehana and Ghritapana',
          'Langhana (fasting) and Pachana Kwatha',
          'Brimhana and Mamsarasa',
          'Shirovirechana'
        ],
        correctIndex: 1,
        explanation: '"आमाशयसमुत्थोऽग्निं निहन्ति... लंघनं लघ्वशनं वा नवामज्वरिते हितम्।" Langhana and warm water/shadanga paneeya are prime in Navajwara.'
      }
    ]
  },
  {
    id: 'ayush-mo-psc-mock-1',
    title: 'State AYUSH Medical Officer (AMO) & UPSC Mock Paper',
    course: 'AYUSH MEDICAL OFFICER',
    category: 'Full Mock',
    durationMinutes: 120,
    totalMarks: 150,
    marksPerCorrect: 1.5,
    negativeMark: 0.5,
    difficulty: 'Exam Standard',
    totalAttempts: 2840,
    description: 'Simulated recruitment test for Ayurvedic Medical Officer vacancies across State PSCs, UPSC AMO, and NHM with clinical cases, pharmacology laws, and public health policies.',
    questions: [
      {
        id: 'moq1',
        subject: 'Public Health & National AYUSH Mission',
        question: 'Under the National AYUSH Mission (NAM), what is the targeted setup for co-locating AYUSH facilities at Primary Health Centres (PHCs) and Community Health Centres (CHCs)?',
        options: [
          'Mainstreaming of AYUSH with National Health Mission (NHM)',
          'Setting up completely separate standalone non-allopathic dispensaries only',
          'Exclusively urban tertiary hospital setups',
          'Private clinic franchising'
        ],
        correctIndex: 0,
        explanation: 'Mainstreaming of AYUSH involves integrating AYUSH doctors, medicines, and clinics into existing PHCs, CHCs, and District Hospitals under the National Health Mission.'
      },
      {
        id: 'moq2',
        subject: 'Regulatory Laws & Ethics',
        question: 'Under Schedule E (1) of the Drugs and Cosmetics Rules 1945, which of the following substances is classified as a poisonous plant requiring cautionary labeling in Ayurvedic medicines?',
        options: [
          'Shatavari (Asparagus racemosus)',
          'Vatsanabha (Aconitum ferox)',
          'Amalaki (Phyllanthus emblica)',
          'Haritaki (Terminalia chebula)'
        ],
        correctIndex: 1,
        explanation: 'Vatsanabha (Aconitum ferox), along with Gunja, Bhallataka, Dhattura, and Jayapala, is listed under Schedule E(1) of poisonous substance regulations requiring Shodhana and statutory warnings.'
      },
      {
        id: 'moq3',
        subject: 'Clinical Emergency & Protocol',
        question: 'A 50-year-old diabetic patient presents to the AYUSH OPD with burning sensation in palms and soles (Karatala-Padatala Daha) and polyuria. As per classical Charaka Chikitsa, what is the prime formulation of choice?',
        options: [
          'Vasantakusumakara Rasa with Shilajatu and Haridra-Amalaki Kwatha',
          'Triphala Guggulu with lukewarm water',
          'Lavangadi Vati',
          'Sitopaladi Churna'
        ],
        correctIndex: 0,
        explanation: 'Vasantakusumakara Rasa (Rasayana & Pramehaghna) combined with Nishamalaki (Haridra + Amalaki) and Shilajatu is the premier classical gold-standard protocol for diabetic neuropathy.'
      },
      {
        id: 'moq4',
        subject: 'Epidemiology & Swasthavritta',
        question: 'According to Charaka Vimanasthana Chapter 3 (Janapadodhvamsa Vimana), what are the four vitiated factors causing widespread epidemics?',
        options: [
          'Vata, Pitta, Kapha, and Rakta',
          'Vayu (Air), Jala (Water), Desha (Land/Geography), and Kala (Season/Time)',
          'Anna, Pana, Nidra, and Brahmacharya',
          'Guru, Laghu, Sheeta, and Ushna'
        ],
        correctIndex: 1,
        explanation: 'Acharya Charaka in Janapadodhvamsa identifies Vayu (air pollution), Udaka/Jala (water contamination), Desha (environmental terrain), and Kala (seasonal abnormal deviations) as the 4 environmental vectors of epidemics.'
      }
    ]
  }
];

export const STUDY_MATERIALS_DATA: StudyNote[] = [
  // ================= 1st Professional =================
  {
    id: 'padartha-darshana-pramana',
    title: 'Padartha Vijnan: 6 Shad Darshanas & Pramana Vijnana Essentials',
    course: 'BAMS',
    folder: '1st Professional',
    subject: 'Padartha Vijnan & Samhita Adhyayan',
    samhita: 'Charaka Sutrasthana Ch 1 & Nyaya-Vaisheshika Darshana',
    category: 'Samhita Summary',
    readTime: '10 min read',
    summary: 'Core philosophical foundations of Ayurveda: Astika & Nastika Darshanas, 4 Ayurvedic Pramanas (Aptopadesha, Pratyaksha, Anumana, Yukti), and Padartha Lakshana.',
    keyPoints: [
      'Astika Darshanas (Veda Believers): Nyaya, Vaisheshika, Samkhya, Yoga, Mimamsa, Vedanta.',
      'Nastika Darshanas: Charvaka, Bauddha, Jaina.',
      'Karya-Karana Siddhanta: Satkaryavada (Samkhya), Asatkaryavada / Arambhavada (Nyaya-Vaisheshika), Parinamavada, Vivartavada.',
      'Chaturvidha Pramana (Charaka): Aptopadesha (Authoritative testimony), Pratyaksha (Direct observation), Anumana (Inference), Yukti (Intellectual reasoning & combinatorial logic).'
    ],
    shlokaReference: {
      sanskrit: 'द्विविधमेव खलु सर्वं सच्चासच्च; तस्य चतुर्विधा परीक्षा- आप्तोपदेशः, प्रत्यक्षम्, अनुमानं, युक्तिश्चेति॥',
      englishMeaning: 'Everything in the universe is divided into Sat (real/existent) and Asat (non-existent); and the examination methods are four: Aptopadesha, Pratyaksha, Anumana, and Yukti.',
      citation: 'Charaka Sutrasthana 11/17'
    },
    tags: ['Padartha', 'Darshana', 'Pramana', 'BAMS 1st Prof', 'Yukti'],
    content: `### 1. Pramana Vijnana in Clinical Medicine
Pramana is the valid means of obtaining true knowledge (Prama). While Western epistemology focuses on deduction and empirical perception, Ayurveda introduces **Yukti Pramana** (conceptualized uniquely by Acharya Charaka) to evaluate multi-factorial etiology and tailored therapeutic polypharmacy.

#### Four Valid Pramanas:
1. **Aptopadesha**: Words of unattached, truthful masters free from Rajas and Tamas.
2. **Pratyaksha**: Direct contact of Atma, Manas, Indriya, and Indriyartha.
3. **Anumana**: Inference based on prior direct observation (Pratyaksha-poorvakam), classified into Poorvavat, Sheshavat, and Samanyatodrishta.
4. **Yukti**: Integration of multiple causative factors to arrive at conclusive therapeutic decisions.`
  },
  {
    id: 'kriya-sharir-dhatu-poshana',
    title: 'Kriya Sharir: Sapta Dhatu Poshana Nyayas & Tridosha Physiology',
    course: 'BAMS',
    folder: '1st Professional',
    subject: 'Kriya Sharir',
    samhita: 'Charaka Sutrasthana 28 & Ashtanga Hridaya Sutrasthana 1',
    category: 'Samhita Summary',
    readTime: '12 min read',
    summary: 'The physiological dynamics of tissue transformation: Ksheeradadhi Nyaya, Kedari Kulya Nyaya, Khale Kapota Nyaya, Dhatvagni vyapara, and Upadhatu-Mala formation.',
    keyPoints: [
      'Ksheeradadhi Nyaya (Law of Milk-to-Curd Transformation): Total conversion of precursor tissue into subsequent tissue.',
      'Kedari Kulya Nyaya (Law of Irrigation Channel): Sequential irrigation and nourishment of tissue beds.',
      'Khale Kapota Nyaya (Law of Selective Pigeons Pecking Grain): Selective nutrition absorption via specific srotas channels.',
      'Dhatu Poshana Kala: Acharya Charaka states tissue turnover completes continuously; Sushruta specifies 3015 Kala (approx 30 days).'
    ],
    shlokaReference: {
      sanskrit: 'रसाद्रक्तं ततो मांसं मांसान्मेदः प्रजायते। मेदसोऽस्थि ततो मज्जा मज्ज्ञः शुक्रं प्रजायते॥',
      englishMeaning: 'From Rasa is formed Rakta; from Rakta originates Mamsa; from Mamsa comes Meda; from Meda Asthi; from Asthi Majja; and from Majja is generated Shukra.',
      citation: 'Charaka Chikitsasthana 15/16'
    },
    tags: ['Kriya Sharir', 'Sapta Dhatu', 'Dhatu Poshana', 'BAMS 1st Prof', 'Ojas'],
    content: `### Dhatu Poshana Nyayas (Theories of Tissue Nourishment)
The ingestion of Ahara undergoes transformation by Jatharagni, Bhutagni, and 7 Dhatvagnis to nourish the Saptadhatus, Upadhatus, and Malas.

1. **Ksheeradadhi Nyaya (Sarvatmagata Parinama)**: Analogous to milk turning wholly into curd, one dhatu transforms completely into the next dhatu.
2. **Kedari Kulya Nyaya (Kramashah Poshana)**: Like water canal irrigating crops step-by-step, Rasa dhatu nourishes Rakta, then Mamsa, sequentially.
3. **Khale Kapota Nyaya (Viyuktayana / Selective Absorption)**: Like pigeons picking specific grains from a field, each Dhatu extracts its specific nutrients through its designated Srotas.`
  },
  {
    id: 'rachana-sharir-marma-matrix',
    title: 'Rachana Sharir: 107 Marma Classification & Sadyopranahara Anatomy',
    course: 'BAMS',
    folder: '1st Professional',
    subject: 'Rachana Sharir',
    samhita: 'Sushruta Sharirasthana Chapter 6 (Pratyeka Marma Nirdesha)',
    category: 'Samhita Summary',
    readTime: '14 min read',
    summary: 'Comprehensive surgical anatomy of 107 vital points (Marmas): Shadanga distribution, structural composition (Mamsa, Sira, Snayu, Asthi, Sandhi), and prognostic trauma outcomes.',
    keyPoints: [
      'Total Marmas: 107 (Shakha: 44, Koshta/Trunk: 26, Urdhwa Jatrugata/Head & Neck: 37).',
      'Prognostic Classification (Parinamabhedena): Sadyopranahara (19), Kalantara Pranahara (33), Vishalyaghna (3), Vaikalyakara (44), Rujakara (8).',
      'Mahamarma (Trimarma): Hridaya, Basti, Shiras (Charaka).',
      'Structural components at Marma sites: Mamsa, Sira, Snayu, Asthi, Sandhi confluence holding Prana.'
    ],
    shlokaReference: {
      sanskrit: 'सप्तोत्तरं मर्मशतम्। तानि पञ्चविधानि भवन्ति; तद्यथा- मांसमर्माणि, सिरामर्माणि, स्नायुमर्माणि, अस्थिमर्माणि, सन्धिमर्माणीति॥',
      englishMeaning: 'There are 107 Marmas categorized into 5 structural types: Mamsa Marma, Sira Marma, Snayu Marma, Asthi Marma, and Sandhi Marma.',
      citation: 'Sushruta Sharirasthana 6/3'
    },
    tags: ['Rachana Sharir', '107 Marma', 'Sadyopranahara', 'BAMS 1st Prof', 'Anatomy'],
    content: `### Classification of 107 Vital Points
Acharya Sushruta defines Marma as the anatomical seat where Mamsa, Sira, Snayu, Asthi, and Sandhi coalesce and where life energy (Prana) resides inherently.

#### Parinama Bheda (Traumatic Prognosis):
- **Sadyopranahara (19 Marmas)**: Causes death within 7 days (Agni Mahabhuta predominance). E.g., Shringataka, Adhipati, Shankha, Kanthanaadi, Hridaya, Basti, Guda.
- **Kalantara Pranahara (33 Marmas)**: Causes death within 15-30 days (Agni + Soma). E.g., Apastambha, Hridaya parshva, Kshipra.
- **Vishalyaghna (3 Marmas)**: Utkshepa (2) & Sthapani (1) (Vayu dominant) - death occurs upon foreign body (Shalya) extraction.
- **Vaikalyakara (44 Marmas)**: Causes permanent structural/functional deformity (Soma dominant). E.g., Kurpara, Janu, Ani, Urvi.
- **Rujakara (8 Marmas)**: Causes excruciating pain (Agni + Vayu). E.g., Gulpha (2), Manibandha (2), Kurchashira (4).`
  },
  {
    id: 'sanskrit-samhita-grammar',
    title: 'Sanskrit & Samhita Patha: Sandhi, Samasa & Karaka Rules for Shloka Recitation',
    course: 'BAMS',
    folder: '1st Professional',
    subject: 'Sanskrit & Samhita Patha',
    samhita: 'Panini Ashtadhyayi & Laghusiddhanta Kaumudi',
    category: 'Samhita Summary',
    readTime: '9 min read',
    summary: 'Essential Sanskrit grammatical tools: Sandhi vichheda, Tatpurusha & Bahuvrihi Samasas, and 6 Karakas for breaking down classical Samhita shlokas.',
    keyPoints: [
      'Sandhi Rules: Ach Sandhi (Vowels), Hal Sandhi (Consonants), Visarga Sandhi.',
      'Samasa (Compounds): Avyayibhava, Tatpurusha, Karmadharaya, Dwigu, Dwandwa, Bahuvrihi.',
      'Shat Karakas: Karta (Nominative), Karma (Accusative), Karana (Instrumental), Sampradana (Dative), Apadana (Ablative), Adhikarana (Locative).',
      'Anvaya Rachana: Reordering poetic Sanskrit shloka verses into logical grammatical sequence.'
    ],
    shlokaReference: {
      sanskrit: 'वर्णमेलनं सन्धिः। नानापदानाम् एकपदीभवनं समासः॥',
      englishMeaning: 'The fusion of sounds/letters is Sandhi; the merging of multiple words into a single compound is Samasa.',
      citation: 'Laghusiddhanta Kaumudi'
    },
    tags: ['Sanskrit', 'Sandhi', 'Samasa', 'BAMS 1st Prof', 'Grammar'],
    content: `### Importance of Sanskrit in Samhita Study
Ayurvedic knowledge is codified in compact metric verses. Mastering Padachheda (word splitting), Sandhi recognition, and Samasa decomposition is required to interpret the commentaries (Teekas) of Chakrapani Datta and Dalhana accurately.`
  },

  // ================= 2nd Professional =================
  {
    id: 'dravyaguna-rasapanchaka-cheatsheet',
    title: 'Dravyaguna: 50 Essential Drugs Rasapanchaka & Botanical Identity',
    course: 'BAMS',
    folder: '2nd Professional',
    subject: 'Dravyaguna Vijnana',
    samhita: 'Bhavaprakasha & Dhanwantari Nighantu',
    category: 'Dravyaguna Chart',
    readTime: '15 min read',
    summary: 'Consolidated botanical names, families, Sanskrit synonyms, Rasa, Guna, Veerya, Vipaka, Prabhava, and therapeutic indications for top 50 exam-favorite plants.',
    keyPoints: [
      'Guduchi (Tinospora cordifolia, Menispermaceae): Tikta-Kashaya Rasa, Ushna Veerya, Madhura Vipaka, Rasayana & Jwaraghna.',
      'Amalaki (Phyllanthus emblica, Euphorbiaceae): Pancharasa (Lavana-varjita), Sheeta Veerya, Madhura Vipaka, Vayasthapana.',
      'Haritaki (Terminalia chebula, Combretaceae): Pancharasa (Lavana-varjita, Kashaya pradhana), Ushna Veerya, Madhura Vipaka, Anulomana.',
      'Shunthi (Zingiber officinale, Zingiberaceae): Katu Rasa, Ushna Veerya, Madhura Vipaka, Deepana-Pachana.'
    ],
    shlokaReference: {
      sanskrit: 'हरीतकी मनुष्याणां मातेव हितकारिणी। कदाचित्कुप्यते माता नोदरस्था हरीतकी॥',
      englishMeaning: 'Haritaki is beneficial to mankind like a loving mother; even a biological mother may get angry at times, but Haritaki in the abdomen never harms.',
      citation: 'Bhavaprakasha Nighantu'
    },
    tags: ['Dravyaguna', 'Herbs', 'BAMS 2nd Prof', 'Rasapanchaka', 'Botanical'],
    content: `### Rasapanchaka Principles
In Ayurvedic pharmacology, a drug exerts its action through 5 primary pharmacokinetic and pharmacodynamic modalities:
- **Rasa** (Taste perception on tongue)
- **Guna** (Physicochemical qualities)
- **Veerya** (Potency - Ushna / Sheeta)
- **Vipaka** (Post-digestive metabolic transformation - Madhura / Amla / Katu)
- **Prabhava** (Specific idiosyncratic pharmacodynamic action not explained by Rasa-Veerya)`
  },
  {
    id: 'rasa-shastra-marana-bhasma',
    title: 'Rasa Shastra: Shodhana, Marana & Classical Bhasma Pariksha',
    course: 'BAMS',
    folder: '2nd Professional',
    subject: 'Rasa Shastra & Bhaishajya Kalpana',
    samhita: 'Rasaratna Samucchaya & Rasendra Sara Sangraha',
    category: 'Rasa Shastra',
    readTime: '10 min read',
    summary: 'Step-by-step methods of mineral purification (Samanya & Vishesha Shodhana), Puta heating systems, and standardized classical Bhasma quality testing.',
    keyPoints: [
      'Varitara Test: Bhasma floating on still water without sinking (indicates ultra-fine particle size).',
      'Unama Test: Placing a rice grain on the floating Bhasma without it sinking.',
      'Rekhapurnata: Bhasma particles entering the epidermal furrows of fingers.',
      'Niruttha: Heating Bhasma with silver foil (Raupya) - no silver alloy weight increase if completely incinerated.',
      'Apunarbhava: Incinerated metal cannot be reduced back to its metallic state when heated with Mitra Panchaka.'
    ],
    shlokaReference: {
      sanskrit: 'वारितरं भवेत् यत्तु तोये तिष्ठति वारिवत्। अङ्गुष्ठतर्जनीघृष्टं यत्तद्रेखाप्रपूरकम्॥',
      englishMeaning: 'That which floats on water is Varitara; that which fills the papillary ridges of fingers is Rekhapurnata.',
      citation: 'Rasaratna Samucchaya 8/26'
    },
    tags: ['Rasa Shastra', 'Bhasma', 'Puta', 'BAMS 2nd Prof', 'Quality Testing'],
    content: `### Standard Classical Tests (Bhasma Pariksha)
1. **Varitara**: Test for light specific gravity and fine particulate suspension.
2. **Rekhapurnata**: Test for sub-micron nano-particle size.
3. **Slakshnatva**: Smooth tactile feel.
4. **Niruttha**: Absence of free unreacted metallic grains.
5. **Nirdhoomatva**: No smoke or volatile release on heating.`
  },
  {
    id: 'roga-nidan-ashtavidha-pariksha',
    title: 'Roga Nidan: Ashtavidha Rogi Pariksha & Nidana Panchaka Matrix',
    course: 'BAMS',
    folder: '2nd Professional',
    subject: 'Roga Nidan & Vikriti Vijnana',
    samhita: 'Yogaratnakara & Madhava Nidana',
    category: 'Clinical Pearl',
    readTime: '11 min read',
    summary: 'Master the 8 diagnostic modalities of Yogaratnakara (Nadi, Mutra, Mala, Jihva, Shabda, Sparsha, Druk, Akruti) and the 5 diagnostic pillars (Nidana Panchaka).',
    keyPoints: [
      'Nidana Panchaka: Nidana (Etiology), Poorvaroopa (Premonitory symptoms), Roopa (Clinical presentation), Upashaya/Anupashaya (Therapeutic diagnostics), Samprapti (Pathogenesis).',
      'Ashtavidha Pariksha (Yogaratnakara): Nadi (Pulse), Mutra (Urine taila-bindu pariksha), Mala (Stool jalapluta pariksha), Jihva (Tongue coating), Shabda (Voice & bowel sounds), Sparsha (Temperature & tactile), Druk (Sclera & vision), Akruti (Body habitus).',
      'Taila Bindu Pariksha: Drop of sesame oil floating in morning midstream urine indicating Curability (spreads evenly), Incurability (sinks), or Difficulty (breaks into drops).'
    ],
    shlokaReference: {
      sanskrit: 'रोगमादौ परीक्षेत ततोऽनन्तरमौषधम्। ततः कर्म भिषक् पश्चात् ज्ञानपूर्वं समाचरेत्॥',
      englishMeaning: 'First diagnose the disease thoroughly, then select the appropriate drug, and only thereafter initiate clinical intervention with full understanding.',
      citation: 'Charaka Sutrasthana 20/20'
    },
    tags: ['Roga Nidan', 'Ashtavidha', 'Nadi Pariksha', 'BAMS 2nd Prof', 'Diagnostics'],
    content: `### The Five Diagnostics (Nidana Panchaka)
Accurate clinical treatment requires thorough investigation of all 5 pathogenetic vectors:
1. **Nidana**: Sannikrishta (immediate), Viprakrishta (distant), Pradhanika (potent poison), Vyabhichari (weak).
2. **Poorvaroopa**: Samanya (general warning) vs Vishishta (pathognomonic precursor).
3. **Roopa**: Fully blossomed disease symptomatology.
4. **Upashaya**: Relief afforded by diet, medicine, or regimen acting opposite to cause (Hetu Vipareeta) or disease (Vyadhi Vipareeta).
5. **Samprapti**: Chronological six stages of disease evolution (Shat Kriya Kala: Chaya, Prakopa, Prasara, Sthana Samshraya, Vyakti, Bheda).`
  },
  {
    id: 'agada-tantra-visha-chikitsa',
    title: 'Agada Tantra: 24 Visha Upakrama, Sarpavisha & Forensic Toxicology',
    course: 'BAMS',
    folder: '2nd Professional',
    subject: 'Agada Tantra & Vyavahara Ayurveda',
    samhita: 'Charaka Chikitsasthana 23 & Sushruta Kalpasthana',
    category: 'Clinical Pearl',
    readTime: '12 min read',
    summary: 'Complete emergency protocol for poisoning (Chaturvimshati Upakrama), distinction between Darveekara, Mandali & Rajimanta snake bites, and forensic death signs.',
    keyPoints: [
      '24 Upakramas (Charaka): Arishta (tourniquet), Utkartana (incision), Nishpeedana (suction), Chushana, Agnikarma, Parisheka, Vamana, Virechana, etc.',
      'Sarpavisha Types: Darveekara (Vata dominant - Cobra), Mandali (Pitta dominant - Viper), Rajimanta (Kapha dominant - Krait).',
      'Visha Guna (10 Qualities): Laghu, Ruksha, Ashu, Vishada, Vyavayi, Teekshna, Vikasi, Sookshma, Ushna, Anirdeshya Rasa.',
      'Universal Antidote formulations: Mritasanjivani Agada, Mahagada, Dooshivishari Agada.'
    ],
    shlokaReference: {
      sanskrit: 'मन्त्रोऽरिष्टोत्कर्तननिष्पीडनचूषणाग्निपरिषेकाः। अवगाहोरक्तमोक्षणवमनविरेकोपधानानि॥',
      englishMeaning: 'Mantra, Arishta-bandhana (tourniquet), Utkartana, Nishpeedana, Chushana, Agnikarma, Parisheka, Raktamokshana, Vamana, Virechana are prime in poisoning.',
      citation: 'Charaka Chikitsasthana 23/35'
    },
    tags: ['Agada Tantra', 'Toxicology', 'Sarpavisha', 'BAMS 2nd Prof', 'Forensic'],
    content: `### Emergency Management of Acute Poisoning
Acharya Charaka provides 24 specific clinical measures (Chaturvimshati Upakrama) for managing Visha. The primary goal is halting systemic diffusion (Vyavayi and Vikasi Guna) through prompt tourniquet placement (Arishta-bandhana), local suction (Chushana), and Rakta Shodhana.`
  },

  // ================= 3rd / Final Professional =================
  {
    id: 'kayachikitsa-jwara-prameha',
    title: 'Kayachikitsa: Navajwara, Jirnajwara & Prameha Chikitsa Protocols',
    course: 'BAMS',
    folder: '3rd/Final Professional',
    subject: 'Kayachikitsa',
    samhita: 'Charaka Chikitsasthana Chapter 3 (Jwara) & Chapter 6 (Prameha)',
    category: 'Clinical Pearl',
    readTime: '16 min read',
    summary: 'Clinical management guidelines for acute & chronic fevers (Langhana, Pachana Kwathas, Shadanga Paneeya, Ghritapana) and 20 Pramehas with formulations like Vasantakusumakara.',
    keyPoints: [
      'Navajwara Protocol: First 7 days strictly Langhana, warm Shadanga Paneeya, Swedana; avoid Ghritapana and Shodhana.',
      'Jirnajwara (After 21 days): Indication of Tikta Sarpi (Kalyanaka Ghrita, Mahatiktaka Ghrita, Vasa Ghrita) and Ksheerapana.',
      '20 Pramehas: 10 Kaphaja (Sadhya), 6 Pittaja (Yapya), 4 Vataja (Asadhya - Madhumeha, Vasameha, Majjameha, Hastimeha).',
      'Drug of choice in Prameha: Shilajatu, Haridra-Amalaki (Nishamalaki), Chandraprabha Vati, Lodhrasava.'
    ],
    shlokaReference: {
      sanskrit: 'ज्वरे लङ्घनमेवादौ कुर्यादामप्रशान्तये। आमाशयस्थे दोषे हि लङ्घनं परमौषधम्॥',
      englishMeaning: 'In Navajwara, Langhana (fasting) is the paramount first step to pacify Ama; for Ama localized in Amashaya, Langhana is the supreme remedy.',
      citation: 'Charaka Chikitsasthana 3/139'
    },
    tags: ['Kayachikitsa', 'Jwara', 'Prameha', 'BAMS Final Prof', 'Formulations'],
    content: `### Clinical Principles of Kayachikitsa
Kayachikitsa is the branch dedicated to restoring Agni and treating systemic diseases.

#### Stepwise Jwara Management:
- **Days 1 to 7 (Ama Jwara)**: Langhana, Shadanga Paneeya (Musta, Parpataka, Usheera, Chandana, Udichya, Nagara), Pachana Kwathas (Amrutottaram).
- **Days 8 to 14 (Pachyamana Jwara)**: Light diet (Manda, Peya, Vilepi), Jwaraghna Kwathas (Sudarshana Churna).
- **Days 15 to 21 (Pakwa Jwara)**: Shamana Aushadhis, mild Virechana if Dosha is stimulated.
- **Beyond 21 Days (Jirna Jwara)**: Tikta Ghritapana to protect Dhatus and extinguish deep-seated Dhatugata fever.`
  },
  {
    id: 'panchakarma-shodhana-protocols',
    title: 'Panchakarma: Shadvidha Upakrama, Vamana-Virechana & Basti Matra',
    course: 'BAMS',
    folder: '3rd/Final Professional',
    subject: 'Panchakarma',
    samhita: 'Charaka Siddhisthana & Sushruta Chikitsasthana',
    category: 'Clinical Pearl',
    readTime: '13 min read',
    summary: 'Clinical standards for 5 purification procedures: Purvakarma (Snehana-Swedana criteria), Vamana-Virechana Vega counts, Basti types (Niruha, Anuvasana, Matra), and Samsarjana Krama.',
    keyPoints: [
      'Vamana Vega Assessment: Pravara (8 Vegas), Madhyama (6 Vegas), Avara (4 Vegas) terminating in Pittanta (vomiting concludes with bile).',
      'Virechana Vega Assessment: Pravara (30 Vegas), Madhyama (20 Vegas), Avara (10 Vegas) terminating in Kaphanta (purgation concludes with mucus).',
      'Basti Dosage: Niruha Basti standard volume 12 Prasrita (approx 960ml); Anuvasana 3 Prasrita (240ml); Matra Basti 1.5 Prasrita (120ml).',
      'Samsarjana Krama: Post-shodhana sequential dietary gradation: Peya -> Vilepi -> Akrita Yusha -> Krita Yusha -> Akrita Mamsarasa -> Krita Mamsarasa.'
    ],
    shlokaReference: {
      sanskrit: 'वमने तु कफान्तोऽयं पित्तान्तो विरेचने। विरेके तु कफं दृष्ट्वा वमने पित्तमेव च॥',
      englishMeaning: 'Proper Vamana terminates when Pitta is observed in the vomit; proper Virechana terminates when Kapha is observed in the stool.',
      citation: 'Charaka Siddhisthana 1/14'
    },
    tags: ['Panchakarma', 'Vamana', 'Virechana', 'Basti', 'BAMS Final Prof'],
    content: `### The Gold Standards of Panchakarma
Panchakarma eliminates deep-rooted metabolic toxins (Doshas) from their root sites, preventing recurring relapses.

#### Five Core Karmas:
1. **Vamana**: For Kapha predominant disorders (Kaphaja Kasa, Shwasa, Sthaulya).
2. **Virechana**: For Pitta predominant disorders (Raktapitta, Kamala, Twak Vikara).
3. **Basti (Niruha & Anuvasana)**: "Ardha Chikitsa" for all 80 types of Nanatmaja Vatavyadhi.
4. **Nasya**: "Nasa hi Shiraso Dvaram" for all Urdhwajatrugata disorders.
5. **Raktamokshana**: Shringi, Alabu, Jalauka, Siravedha for Pitta-Rakta diseases.`
  },
  {
    id: 'sushruta-shalya-ksharasutra',
    title: 'Shalya Tantra: Sushruta 8 Shastrakarmas & Ksharasutra Protocol',
    course: 'BAMS',
    folder: '3rd/Final Professional',
    subject: 'Shalya Tantra',
    samhita: 'Sushruta Samhita Chikitsasthana Chapter 17 & Sutrasthana 25',
    category: 'Clinical Pearl',
    readTime: '11 min read',
    summary: 'The standardized CCRAS manufacturing protocol for Ksharasutra, surgical coatings (Snuhi, Apamarga Kshara, Haridra), and clinical application in Bhagandara (Anal Fistula).',
    keyPoints: [
      'Linen Thread Size: Barbour linen surgical thread #20 on specialized stretching hangers.',
      'Total Coatings: 21 coatings in 3 distinct progressive phases.',
      'First Phase (11 coatings): Fresh latex of Snuhi (Euphorbia neriifolia).',
      'Second Phase (7 coatings): Snuhi Ksheera + Apamarga Kshara (Achyranthes aspera ash alkaline extract).',
      'Third Phase (3 coatings): Snuhi Ksheera + Fine Haridra Churna (Curcuma longa powder).'
    ],
    shlokaReference: {
      sanskrit: 'क्षारेण सूत्रं संविध्य भगन्दरे प्रवेशयेत्। तच्छिनत्ति शनैर्मार्गं व्रणं च विशोधयेत्॥',
      englishMeaning: 'The thread prepared with Kshara is threaded through the fistula tract; it cuts the tract slowly while simultaneously cleansing and healing the wound.',
      citation: 'Chakradatta Bhagandara Chikitsa'
    },
    tags: ['Shalya', 'Ksharasutra', 'Sushruta', 'BAMS Final Prof', 'Clinical'],
    content: `### Clinical Significance of Kshara Sutra
Kshara Sutra is a minimally invasive, WHO-acknowledged Ayurvedic parasurgical modality for Fistula-in-Ano (Bhagandara), Arsha (Haemorrhoids), and Pilonidal Sinus (Nadi Vrana) with near-zero recurrence rates and preservation of anal sphincter continence.`
  },
  {
    id: 'shalakya-netra-kriyakalpa',
    title: 'Shalakya Tantra: 76 Netra Rogas & Ashta Netra Kriyakalpa Procedures',
    course: 'BAMS',
    folder: '3rd/Final Professional',
    subject: 'Shalakya Tantra',
    samhita: 'Sushruta Samhita Uttaratantra Chapters 1-19',
    category: 'Clinical Pearl',
    readTime: '12 min read',
    summary: 'Diagnostic categorization of 76 eye disorders (Sandhigata, Vartmagata, Shuklagata, Krishnagata, Sarvagata, Drishtigata) and ocular topical therapies (Tarpana, Putapaka, Seka, Aschyotana, Anjana).',
    keyPoints: [
      '76 Eye Diseases: Sandhigata (9), Vartmagata (21), Shuklagata (11), Krishnagata (4), Sarvagata (17), Drishtigata (6), Bahyaja (8).',
      'Netra Kriyakalpas (Sushruta & Sharangadhara): Seka, Aschyotana, Pindi, Bidalaka, Tarpana, Putapaka, Anjana.',
      'Netra Tarpana: Masha flour ring around orbit filled with medicated lukewarm Ghrita (Triphala Ghrita, Jeevantyadi Ghrita) for Timira & Computer Vision Syndrome.',
      'Aschyotana Drops: 10-12 drops instilled from 2 Angula height in open eye.'
    ],
    shlokaReference: {
      sanskrit: 'सेकश्चाश्च्योतनं पिण्डी बिडालकस्तर्पणं तथा। पुटपाकस्तथाऽञ्जनं च सप्तैते नेत्रकल्पनाः॥',
      englishMeaning: 'Seka, Aschyotana, Pindi, Bidalaka, Tarpana, Putapaka, and Anjana are the seven prime topical ocular therapeutic procedures.',
      citation: 'Sharangadhara Samhita Uttarakhanda 13/1'
    },
    tags: ['Shalakya', 'Netra Roga', 'Tarpana', 'BAMS Final Prof', 'Ophthalmology'],
    content: `### Ocular Therapeutics in Shalakya Tantra
The eye (Netra) is Tejo-Mahabhuta dominant and susceptible to Kapha vitiation ("सर्वतः चक्षुस्तेजोमयं विशेषात्तु श्लेष्मतो भयं भवेत्"). Kriyakalpas allow localized transmucosal ocular bioavailability without systemic drug first-pass metabolism.`
  },
  {
    id: 'prasuti-garbhini-paricharya',
    title: 'Prasuti & Stri Roga: Masanumashika Garbhini Paricharya & Ashta Yoni Vyapad',
    course: 'BAMS',
    folder: '3rd/Final Professional',
    subject: 'Prasuti Tantra & Stri Roga',
    samhita: 'Charaka Sharirasthana 8 & Sushruta Sharirasthana 10',
    category: 'Clinical Pearl',
    readTime: '13 min read',
    summary: 'Month-wise maternal regimen from 1st to 9th month of pregnancy, fetal development milestones, Garbhopaghatakara Bhavas, and 20 Yoni Vyapad clinical distinctions.',
    keyPoints: [
      '1st Month: Cold milk (Sheeta Ksheera) and sweet dietary substances.',
      '4th Month: Milk with fresh unsalted butter (Navaneeta) for stabilizing embryonic heart.',
      '8th Month: Asthapana & Anuvasana Basti with Madhura drugs to ensure uninhibited pelvic autonomic tone for delivery.',
      '9th Month: Anuvasana Basti with Taila & vaginal cotton swab (Yoni Pichu) soaked in Sukhamarana Taila.'
    ],
    shlokaReference: {
      sanskrit: 'नवमे तु मासि सूतिकागारं प्रविशेत्; स्निग्धं सुखकरं चान्नं भुञ्जीत॥',
      englishMeaning: 'In the ninth month, the expectant mother should enter the dedicated maternity home (Sootikagara) and partake nourishing, soothing, unctuous diet.',
      citation: 'Charaka Sharirasthana 8/35'
    },
    tags: ['Prasuti', 'Garbhini', 'Stri Roga', 'BAMS Final Prof', 'Gynecology'],
    content: `### Masanumashika Garbhini Paricharya
Masanumashika Paricharya provides systematic nutritional, pharmacological, and physiological protection to both mother and developing fetus, reducing maternal morbidity and ensuring normal spontaneous vaginal delivery without complications.`
  },
  {
    id: 'kaumarbhritya-swarnaprashana',
    title: 'Kaumarbhritya: Swarnaprashana, Lehana & Pediatric Developmental Milestones',
    course: 'BAMS',
    folder: '3rd/Final Professional',
    subject: 'Kaumarbhritya (Bala Roga)',
    samhita: 'Kashyapa Samhita Sutrasthana & Charaka Sharirasthana',
    category: 'Clinical Pearl',
    readTime: '10 min read',
    summary: 'Pediatric Ayurveda fundamentals: Kashyapa\'s formulation of Swarnaprashana (Gold ash with honey and Medhya Ghrita), Lehana indications, Dentition (Dantodbheda), and neonatal resuscitation.',
    keyPoints: [
      'Swarnaprashana: Pure gold incinerated/rubbed on stone with water, honey, and Ghrita on Pushya Nakshatra for Medha, Agni, and Bala promotion.',
      'Benefits within 1 month: Child becomes extremely intelligent and immune to routine childhood pathogens (Param Medhavi & Vyadhinam Na Sa Baadhyate).',
      'Benefits within 6 months: Child attains Srutadhara (exceptional auditory memory retention).',
      'Dentition & Health: Dantodbheda Jwara and Atisara management using Praval Pishti and Musta.'
    ],
    shlokaReference: {
      sanskrit: 'सुवर्णप्राशनं ह्येतन्मेधाग्निबलवर्धनम्। आयुष्यं मङ्गलं पुण्यं वृष्यं वर्ण्यं ग्रहापहम्॥',
      englishMeaning: 'Swarnaprashana increases intellect, digestive fire, physical stamina; confers longevity, auspiciousness, righteousness, improves complexion, and wards off pathological planetary afflictions.',
      citation: 'Kashyapa Samhita Sutrasthana'
    },
    tags: ['Kaumarbhritya', 'Swarnaprashana', 'Kashyapa', 'BAMS Final Prof', 'Pediatrics'],
    content: `### Pediatric Immunization & Cognitive Augmentation in Ayurveda
Acharya Kashyapa, the father of Kaumarbhritya, highlights Swarnaprashana as an evidence-based Ayurvedic nano-gold immunomodulator and nootropic formulation for infants and growing children.`
  },

  // ================= Others =================
  {
    id: 'ncism-model-question-format',
    title: 'NCISM Model Exam Pattern & Marking Scheme Blueprint',
    course: 'BAMS',
    folder: 'Others',
    subject: 'NCISM Exam Blueprints & Model Papers',
    samhita: 'National Commission for Indian System of Medicine (NCISM)',
    category: 'Previous Year Analysis',
    readTime: '8 min read',
    summary: 'Complete architectural breakdown of NCISM competency-based examinations: MCQ weightages, 5-mark short answers, 10-mark long essays, and shloka scoring rubrics.',
    keyPoints: [
      'Paper Structure: 100 Marks divided into Section A (50 Marks) & Section B (50 Marks).',
      'Question Types: 20 Multiple Choice Questions (1 Mark each), 8 Short Answer Questions (5 Marks each), 4 Long Essay Questions (10 Marks each).',
      'Shloka Scoring Criteria: 2 bonus marks for Sanskrit shloka with Padachheda, Anvaya, and modern clinical correlation.',
      'Internal Assessment: 3 periodic unit tests + logbook submission accounting for 20% aggregate weightage.'
    ],
    shlokaReference: {
      sanskrit: 'शास्त्रं ज्योतिः प्रकाशार्थं दर्शनं बुद्धिरात्मनः। ताभ्यां भिषक् सुयुक्तो हि नापराध्यति कर्हिचित्॥',
      englishMeaning: 'Medical scripture is like a guiding lamp for enlightenment; one\'s own intellect is the eye; a physician equipped with both never errs.',
      citation: 'Charaka Sutrasthana 9/24'
    },
    tags: ['NCISM', 'Exam Pattern', 'Blueprint', 'Others', 'BAMS Guide'],
    content: `### NCISM Competency-Based Assessment Guidelines
Under NCISM regulations, BAMS examinations transition from rote memorization to clinical competency and diagnostic problem-solving:

1. **Section A (Theory & Classical Foundations)**:
   - Evaluates Samhita memorization, shloka anvaya, and classical commentator Tikakara viewpoints (Chakrapani, Dalhana, Arundatta, Hemadri).
2. **Section B (Clinical Application & Modern Integration)**:
   - Focuses on clinical vignettes, emergency protocols, differential diagnosis, laboratory investigations, and modern pharmacological cross-references.`
  },
  {
    id: 'ayurveda-shloka-recitation-compendium',
    title: 'High-Yield Sanskrit Shloka Compendium for BAMS Distinction',
    course: 'BAMS',
    folder: 'Others',
    subject: 'Brihattrayi High-Yield Shlokas & Anvaya',
    samhita: 'Brihattrayi (Charaka, Sushruta, Ashtanga Hridaya)',
    category: 'Samhita Summary',
    readTime: '15 min read',
    summary: 'A curated compendium of 100 mandatory viva and theory shlokas across all 4 years with Sanskrit meter (Anushtup Chhanda), Sandhi breakdown, and English meanings.',
    keyPoints: [
      'Definition of Ayu: "शरीरेन्द्रियसत्त्वात्मसंयोगो धारि जीवितम्। नित्यगश्चानुबन्धश्च पर्यायैरायुरुच्यते॥"',
      'Definition of Swastha: "समदोषः समाग्निश्च समधातुमलक्रियः। प्रसन्नात्मेन्द्रियमनाः स्वस्थ इत्यभिधीयते॥"',
      'Chikitsa Chatushpada: "भिषग्द्रव्याण्युपस्थाता रोगी पादचतुष्टयम्। गुणवत् कारणं ज्ञेयं विकारव्युपशान्तये॥"',
      'Trisutra Ayurveda: "हेतुलिङ्गौषधज्ञानं स्वस्थातुरपरायणम्। त्रिसूत्रं शाश्वतं पुण्यं बुबुधे यं पितामहः॥"'
    ],
    shlokaReference: {
      sanskrit: 'समदोषः समाग्निश्च समधातुमलक्रियः। प्रसन्नात्मेन्द्रियमनाः स्वस्थ इत्यभिधीयते॥',
      englishMeaning: 'One who has balanced Doshas, balanced Agni, balanced Dhatus and Malas, and whose soul, senses, and mind are clear and serene is termed Swastha (Healthy).',
      citation: 'Sushruta Sutrasthana 15/48'
    },
    tags: ['Shloka', 'Recitation', 'Viva', 'Swastha', 'Brihattrayi', 'Others'],
    content: `### Why Shloka Recitation is Mandatory for BAMS Success
Reciting classical shlokas gives students the precise definitions established by ancient Acharyas without semantic dilution:
- **Anushtup Chhanda (8 syllables per quarter)** enables effortless rhythm and memory retention.
- Adding Sanskrit citations in theory answers instantly elevates university answer sheets from average to distinction grade.`
  },
  {
    id: 'ayurvedic-drug-synonyms-table',
    title: 'Ayurvedic Botanical Synonyms (Paryaya) & API Standardization Table',
    course: 'BAMS',
    folder: 'Others',
    subject: 'Ayurvedic Synonyms & Botanical Tables',
    samhita: 'Ayurvedic Pharmacopoeia of India (API)',
    category: 'Dravyaguna Chart',
    readTime: '11 min read',
    summary: 'Quick reference chart of classical synonyms (Amrita, Chinnaruha, Kundalini, Tapasvini, Katurohini, Vayastha) and botanical nomenclature.',
    keyPoints: [
      'Guduchi Synonyms: Amrita, Chinnaruha, Tantrika, Vatsadani, Chakralakshanika, Kundali.',
      'Haritaki Synonyms: Abhaya, Pathya, Kayastha, Putana, Amrita, Chetaki, Rohini, Vijaya.',
      'Amalaki Synonyms: Dhatri, Vayastha, Shiva, Amrita, Vrishya, Karshaphala.',
      'Kumari Synonyms: Grihakanya, Ghritakumarika, Tarani, Bahupatri.'
    ],
    shlokaReference: {
      sanskrit: 'नामरूपज्ञानं च द्रव्याणां तच्चिकीर्षितम्। पर्यायाश्च गुणाश्चैव विज्ञेयास्तत्त्वदर्शिभिः॥',
      englishMeaning: 'The true physician must thoroughly master the botanical names, physical appearances, classical synonyms, and pharmacological qualities of all medicinal substances.',
      citation: 'Dhanwantari Nighantu'
    },
    tags: ['Synonyms', 'API', 'Paryaya', 'Dravyaguna', 'Others'],
    content: `### Significance of Botanical Synonyms in Clinical Practice
Ayurvedic texts use morphological, ecological, and physiological synonyms (Paryayas). Recognizing these names in formulation compositions (Yogas) prevents dispensing incorrect substitutions.`
  },
  {
    id: 'bams-daily-study-planner',
    title: 'BAMS University Distinction Strategy & Daily Samhita Revision Planner',
    course: 'BAMS',
    folder: 'Others',
    subject: 'Revision & Study Planners',
    samhita: 'Ayurveez Academic Board',
    category: 'Previous Year Analysis',
    readTime: '7 min read',
    summary: 'A structured day-by-day revision schedule combining early morning shloka recitation, midday conceptual pathology, and evening MCQ practice.',
    keyPoints: [
      'Golden Hour (6:00 AM - 7:30 AM): Recitation of 5 classical shlokas with Sandhi-vichheda and anvaya.',
      'Theory Core (2:00 PM - 5:00 PM): Padartha / Dravyaguna / Kayachikitsa chapter notes with diagrammatic flowcharts.',
      'Night Simulation (8:30 PM - 10:00 PM): 30 NCISM pattern model questions and weekly grand mock tests.',
      'Active Recall: Preparing 1-page summary sheets for each Samhita chapter.'
    ],
    shlokaReference: {
      sanskrit: 'सतताध्ययनं वादः परतन्त्रावलोकनम्। तद्विद्याचार्यसेवा च बुद्धिमेधाकरो गणः॥',
      englishMeaning: 'Continuous study, academic debate and discussion, reviewing allied scriptures, and dedicated service of learned masters expand one\'s intellect and wisdom.',
      citation: 'Sushruta Sharirasthana 10/68'
    },
    tags: ['Study Planner', 'Revision', 'Strategy', 'Distinction', 'Others'],
    content: `### The Ayurveez Systematic Study Framework
Achieving university honors and top AIAPGET ranks starts during undergraduate BAMS years through daily consistency and disciplined Samhita study.`
  }
];
