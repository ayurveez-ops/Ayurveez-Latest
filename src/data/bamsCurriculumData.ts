export type BamsProfType = '1st' | '2nd' | 'final';

export interface LectureItem {
  id: string;
  title: string;
  duration: string;
  teacher: string;
  topic: string;
  isCompleted?: boolean;
}

export interface NoteItem {
  id: string;
  title: string;
  size: string;
  pages: number;
  type: 'PDF' | 'Summary Chart' | 'Formulation Table';
  downloadUrl: string;
}

export interface TestItem {
  id: string;
  title: string;
  questionsCount: number;
  duration: string;
  maxMarks: number;
  difficulty: 'Standard' | 'High-Yield';
}

export interface SubjectItem {
  id: string;
  name: string;
  codeName: string;
  paperCount?: string;
  weightage: string;
  description: string;
  syllabusHighlights: string[];
  notesCount: number;
  lecturesCount: number;
  testsCount: number;
  badge?: string;
  lectures: LectureItem[];
  notes: NoteItem[];
  tests: TestItem[];
}

export interface BamsProfCourse {
  id: BamsProfType;
  shortTitle: string;
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

export const BAMS_CURRICULUM_DATA: Record<BamsProfType, BamsProfCourse> = {
  '1st': {
    id: '1st',
    shortTitle: '1st Proff.',
    title: 'BAMS 1st Professional Complete Masterclass',
    subtitle: 'Comprehensive NCISM Competency-Based Academic Track for 1st Year BAMS Scholars',
    duration: '18 Months University Track',
    originalPrice: 7999,
    discountedPrice: 3999,
    discountPercentage: 50,
    savings: 4000,
    validity: 'Full 1st Professional Academic Cycle + Exam Guarantee',
    codePrefix: 'BAMS1ST',
    acceptedCodes: ['AYURVEEZ1ST', 'BAMS1ST', 'AVZ1ST', 'BAMS1ST2026', 'AYUR1ST'],
    bannerGradient: 'from-[#1b4332] via-[#2d6a4f] to-[#0f281e]',
    accentColor: '#1b4332',
    accentBorder: '#c4dec8',
    ncismBatch: 'NCISM New Syllabus & Competency Guidelines Aligned',
    enrolledStudentsCount: '3,480+ Students Enrolled',
    highlights: [
      'Word-by-word Sanskrit Anvaya with Chakrapani & Arundatta commentary',
      'High-yield Marma Sharir & Modern Anatomy correlation charts',
      'Human Physiology (Kriya Sharir) integrated with Western clinical labs',
      'Previous 5 Years University Solved Question Banks & Model Solutions',
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
        badge: 'High Yield',
        lectures: [],
        notes: [],
        tests: []
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
        badge: 'Foundation',
        lectures: [],
        notes: [],
        tests: []
      },
      {
        id: '1st-padarth-vigyan',
        name: 'Padarth Vigyan',
        codeName: 'Padartha Vijnana evam Ayurveda Itihas',
        paperCount: '',
        weightage: 'Philosophical & Epistemological Core',
        description: 'Deep dive into Ayurvedic epistemology, Shad Darshanas, Pramana Vijnana, and the chronological evolution of Ayurveda through the Vedic to modern eras.',
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
        badge: 'Core Theory',
        lectures: [],
        notes: [],
        tests: []
      },
      {
        id: '1st-rachna-sharir',
        name: 'Rachna Sharir',
        codeName: 'Sharira Rachana (Ayurvedic Anatomy & Modern Gross Anatomy)',
        paperCount: '',
        weightage: 'Structural Anatomy',
        description: 'Integrative anatomical education blending classical Ayurvedic concepts of Garbha Sharir, Marma Sharir, and Srotas with modern gross anatomy, osteology, and neuroanatomy.',
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
        badge: 'Clinical Anatomy',
        lectures: [],
        notes: [],
        tests: []
      },
      {
        id: '1st-kriya-sharir',
        name: 'Kriya Sharir',
        codeName: 'Sharira Kriya (Ayurvedic Physiology & Modern Systemic Physiology)',
        paperCount: '',
        weightage: 'Functional Physiology',
        description: 'Mastery of physiological mechanisms governing Tridosha, Sapta Dhatus, Upadhatus, and Malas alongside modern cardiovascular, respiratory, and neuro-endocrine physiology.',
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
        badge: 'Clinical Physiology',
        lectures: [],
        notes: [],
        tests: []
      }
    ]
  },
  '2nd': {
    id: '2nd',
    shortTitle: '2nd Proff.',
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
    enrolledStudentsCount: '2,950+ Students Enrolled',
    highlights: [
      'Master 200+ medicinal plants with botanical keys, active phytoconstituents & Karma',
      'Rasa Shastra Bhasma preparation, Shodhana, Marana & modern nanoparticle analytics',
      'Roga Nidan clinical pathology, Ashtavidha-Dashavidha Pariksha & modern lab reports',
      'Agadatantra forensic toxicology, Visha Chikitsa & medical jurisprudence',
      'Swasthavritta preventive medicine, Yoga asanas, Naturopathy & public health protocols'
    ],
    subjects: [
      {
        id: '2nd-dravyaguna',
        name: 'Dravyaguna',
        codeName: 'Dravyaguna Vijnana (Materia Medica & Pharmacology)',
        paperCount: '',
        weightage: 'Core Pharmacology',
        description: 'Comprehensive study of medicinal dravyas, Rasapanchaka principles, Karma classification, botanical identification, adulteration, and modern pharmacology.',
        syllabusHighlights: [
          'Dravya-Guna-Rasa-Vipaka-Veerya-Prabhava Siddhanta',
          'Detailed botanical keys, morphology & substitutes of 200+ herbs',
          'Mishraka Gana (Triphala, Trikatu, Dashamoola, Panchavalkala)',
          'Pharmacognosy, extraction methods & standard quality indices',
          'Herbal drug formulations & dosage regimens according to classical texts'
        ],
        notesCount: 0,
        lecturesCount: 0,
        testsCount: 0,
        badge: 'High Yield',
        lectures: [],
        notes: [],
        tests: []
      },
      {
        id: '2nd-roga-nidan',
        name: 'Roga Nidana',
        codeName: 'Roga Nidana evam Vikriti Vijnana (Diagnostics & Pathology)',
        paperCount: '',
        weightage: 'Clinical Diagnostics',
        description: 'Mastery of disease pathogenesis (Samprapti), Nidana Panchaka, systemic clinical examinations (Nadi, Mutra, Mala, Jihva), and laboratory medicine.',
        syllabusHighlights: [
          'Nidana Panchaka: Hetu, Purvarupa, Rupa, Upashaya, Samprapti',
          'Srotas Dushti Lakshana & Vyadhi Hetus for each Srotas',
          'Ashtavidha Pariksha (Nadi Pariksha, Mutra, Mala, Sparsha, etc.)',
          'Modern pathology: CBC, LFT, KFT, lipid profile & diagnostic imaging',
          'Shat Kriya Kala & clinical intervention windows in disease progression'
        ],
        notesCount: 0,
        lecturesCount: 0,
        testsCount: 0,
        badge: 'Clinical Diagnostics',
        lectures: [],
        notes: [],
        tests: []
      },
      {
        id: '2nd-rasashastra',
        name: 'Rasa Shastra',
        codeName: 'Rasashastra evam Bhaishajya Kalpana (Pharmaceutics)',
        paperCount: '',
        weightage: 'Pharmaceutics & Alchemy',
        description: 'Herbo-mineral pharmaceutics, Parada Samskaras, Shodhana, Marana, preparation of Bhasmas, Kupipakwa Rasayanas, Asava-Arishta, and GMP guidelines.',
        syllabusHighlights: [
          'Parada Ashtadasha Samskaras, Doshas & purification (Shodhana)',
          'Maharasa, Uparasa, Sadharanarasa & Dhatu Bhasma preparation',
          'Bhaishajya Kalpana: Panchavidha Kashaya Kalpana (Swarasa to Phanta)',
          'Secondary Kalpanas: Sneha Paka (Taila, Ghrita), Avaleha, Vati, Guggulu',
          'Quality control, Ayush Pharmacopoeial standards & nanomedicine'
        ],
        notesCount: 0,
        lecturesCount: 0,
        testsCount: 0,
        badge: 'Pharmaceutics',
        lectures: [],
        notes: [],
        tests: []
      },
      {
        id: '2nd-agadatantra',
        name: 'Agada Tantra',
        codeName: 'Agadatantra, Vyavahara Ayurveda evam Vidhivaidyaka',
        paperCount: '',
        weightage: 'Toxicology & Jurisprudence',
        description: 'Ayurvedic toxicology, plant and animal poisons, classical Visha Chikitsa, modern forensic medicine, post-mortem examination, and medical jurisprudence.',
        syllabusHighlights: [
          'Visha Utpatti, Guna, Gati, Sthavara & Jangama Visha classification',
          'Chaturvimshati Upakrama (24 treatment modalities for poison)',
          'Sarpa Damsha (Snakebite), Vrishchika, Keeta Visha management',
          'Medical jurisprudence, consent, medical negligence & IPC sections',
          'Forensic traumatology, asphyxial deaths & post-mortem changes'
        ],
        notesCount: 0,
        lecturesCount: 0,
        testsCount: 0,
        badge: 'Forensics',
        lectures: [],
        notes: [],
        tests: []
      },
      {
        id: '2nd-swasthavritta',
        name: 'Swasthavritta',
        codeName: 'Swasthavritta evam Yoga (Preventive Medicine & Public Health)',
        paperCount: '',
        weightage: 'Preventive Medicine & Yoga',
        description: 'Personal hygiene, Dinacharya, Ritucharya, Sadvritta, community medicine, environmental health, classical Yoga therapy, Naturopathy, and public health policies.',
        syllabusHighlights: [
          'Dinacharya, Ratricharya & Ritucharya for health preservation',
          'Ahara Vidhi Visheshayatana, dietary guidelines & nutrition',
          'Yoga: Ashtanga Yoga, therapeutic Asanas, Pranayama & Shatkarma',
          'Naturopathy principles: Hydrotherapy, Mud therapy & Heliotherapy',
          'Epidemiology, Janapadodhwamsa (Pandemics) & National Health Programs'
        ],
        notesCount: 0,
        lecturesCount: 0,
        testsCount: 0,
        badge: 'Public Health',
        lectures: [],
        notes: [],
        tests: []
      },
      {
        id: '2nd-charak-purvardha',
        name: 'Charak Purvardha',
        codeName: 'Charaka Samhita Purvardha (Nidana, Vimana, Sharira & Indriya Sthana)',
        paperCount: '',
        weightage: 'Samhita Adhyayana 2',
        description: 'In-depth textual study of Charaka Nidanasthana (8 chapters), Vimanasthana (8 chapters), Sharirasthana (8 chapters), and Indriyasthana (12 prognosis chapters).',
        syllabusHighlights: [
          'Nidanasthana: Jwara, Raktapitta, Gulma, Prameha, Kushta pathogenesis',
          'Vimanasthana: Rasa Vimana, Trividha Rogavishesha Vijnana, Srotas Vimana',
          'Sharirasthana: Katidhapurusha, Atulyagotriya, Garbhavakranti',
          'Indriyasthana: Arishta Lakshana (Prognostic signs of imminent death)',
          'Chakrapani commentary dissection on high-yield university questions'
        ],
        notesCount: 0,
        lecturesCount: 0,
        testsCount: 0,
        badge: 'Classical Text',
        lectures: [],
        notes: [],
        tests: []
      }
    ]
  },
  'final': {
    id: 'final',
    shortTitle: 'Final Proff.',
    title: 'BAMS Final Professional Complete Masterclass',
    subtitle: 'Internal Medicine, Surgery, ENT & Ophthalmology, Gynecology, Pediatrics, Panchakarma & Research',
    duration: '18 Months University Track',
    originalPrice: 12999,
    discountedPrice: 6999,
    discountPercentage: 46,
    savings: 6000,
    validity: 'Full Final Professional Academic Cycle + Exam Guarantee',
    codePrefix: 'BAMSFINAL',
    acceptedCodes: ['AYURVEEZFINAL', 'BAMSFINAL', 'AVZFINAL', 'BAMSFINAL2026', 'AYURFINAL'],
    bannerGradient: 'from-[#0f281e] via-[#1b4332] to-[#2d6a4f]',
    accentColor: '#1b4332',
    accentBorder: '#c4dec8',
    ncismBatch: 'NCISM New Syllabus & Exam Pattern Aligned',
    enrolledStudentsCount: '4,120+ Students Enrolled',
    highlights: [
      'Kayachikitsa internal medicine protocols for Vata-vyadhi, metabolic & chronic disorders',
      'Panchakarma practical SOPs: Vamana, Virechana, Basti, Nasya, Raktamokshana',
      'Shalya Tantra surgical principles, Ksharasutra, Jalaukavacharana & wound healing',
      'Prasuti Tantra & Stri Roga obstetrics, garbhini paricharya & gynecological disorders',
      'Kaumarbhritya pediatric nutrition, milestones, neonatal resuscitation & disorders'
    ],
    subjects: [
      {
        id: 'final-samhita-3',
        name: 'Samhita Adhyayan 3',
        codeName: 'Charaka Chikitsasthana 9-30, Kalpa & Siddhisthana',
        paperCount: '',
        weightage: 'Clinical Brihattrayi',
        description: 'Advanced classical analysis of Charaka Chikitsa chapters 9 to 30, Kalpasthana formulations, and Siddhisthana panchakarma complications and management.',
        syllabusHighlights: [
          'Charaka Chikitsasthana: Unmada, Apasmara, Shotha, Udara, Arsha',
          'Vatavyadhi & Vatarakta Chikitsa protocols',
          'Kalpasthana: Madana Phala, Jimutaka & Vamana-Virechana formulations',
          'Siddhisthana: 12 Siddhis, Basti Vyapad, and therapeutic protocols',
          'Chakrapani commentary on critical clinical junctions'
        ],
        notesCount: 0,
        lecturesCount: 0,
        testsCount: 0,
        badge: 'High Yield',
        lectures: [],
        notes: [],
        tests: []
      },
      {
        id: 'final-kaya-chikitsa',
        name: 'Kaya Chikitsa',
        codeName: 'Kayachikitsa (Internal Medicine & Therapeutics)',
        paperCount: '',
        weightage: 'Clinical Internal Medicine',
        description: 'Comprehensive internal medicine covering etiopathology, clinical presentation, and evidence-based Ayurvedic management of systemic illnesses.',
        syllabusHighlights: [
          'Chikitsa Siddhanta: Shodhana vs Shamana, Langhana, Brimhana',
          'Jwara Chikitsa, Pandu, Kamala, Prameha, Rajayakshma protocols',
          'Cardiovascular (Hridroga), Respiratory (Tamaka Shwasa, Kasa) therapeutics',
          'Neurological disorders: Pakshaghata, Gridhrasi, Ardita, Kampavata',
          'Emergency management in Ayurveda & integrative pharmacology'
        ],
        notesCount: 0,
        lecturesCount: 0,
        testsCount: 0,
        badge: 'Primary Clinical',
        lectures: [],
        notes: [],
        tests: []
      },
      {
        id: 'final-prasuti-tantra',
        name: 'Prasuti Tantra',
        codeName: 'Prasuti Tantra & Stri Roga (Obstetrics & Gynecology)',
        paperCount: '',
        weightage: 'Obstetrics & Gynecology',
        description: 'Ayurvedic and modern obstetrics and gynecology, Garbhini Paricharya, labor management, post-natal care (Sutika), and 20 Yoni Vyapats.',
        syllabusHighlights: [
          'Masanumasika Garbhini Paricharya & Garbha Vyapad management',
          'Normal Labor (Prasava) stages, dystocia & post-partum care (Sutika)',
          '20 Yoni Vyapad: Etiology, symptoms & clinical treatment',
          'Artava Dushti, Asrigdara, Vandhyatva (Infertility) protocols',
          'Modern gynecological screening, USG & obstetric procedures'
        ],
        notesCount: 0,
        lecturesCount: 0,
        testsCount: 0,
        badge: 'Women Health',
        lectures: [],
        notes: [],
        tests: []
      },
      {
        id: 'final-panchkarma',
        name: 'Panchkarma',
        codeName: 'Panchakarma (Purificatory & Detoxification Therapies)',
        paperCount: '',
        weightage: 'Core Clinical Therapy',
        description: 'Theoretical, classical, and practical mastery of Shodhana therapies: Snehana, Swedana, Vamana, Virechana, Basti, Nasya, and Raktamokshana.',
        syllabusHighlights: [
          'Purvakarma: Deepana-Pachana, Snehana (Accha vs Vicharana), Swedana',
          'Pradhanakarma: Vamana & Virechana SOP, signs of Samyak yoga & Vyapad',
          'Basti: Niruha & Anuvasana formulation recipes & administration',
          'Nasya Vidhi and Raktamokshana (Siravedha, Jalaukavacharana)',
          'Paschatkarma: Samsarjana Krama, Tarpanadi Krama & dietetics'
        ],
        notesCount: 0,
        lecturesCount: 0,
        testsCount: 0,
        badge: 'Hands-on SOP',
        lectures: [],
        notes: [],
        tests: []
      },
      {
        id: 'final-kaumarbhritya',
        name: 'Kaumarbhritya',
        codeName: 'Kaumarbhritya (Pediatrics & Neonatology)',
        paperCount: '',
        weightage: 'Ayurvedic Pediatrics',
        description: 'Neonatal care, Navajata Shishu Paricharya, infant nutrition, developmental milestones, childhood diseases (Balaroga), and Kaumarbhritya therapeutics.',
        syllabusHighlights: [
          'Prana Pratyagamana (Neonatal resuscitation) & Navajata Shishu Paricharya',
          'Stanya Pariksha, Dushti, Shodhana & infant feeding protocols',
          'Developmental milestones from infancy to adolescence',
          'Balaroga: Phakka, Parigarbhika, Balashosha, Ksheeralasaka',
          'Pediatric immunization & modern childhood infections'
        ],
        notesCount: 0,
        lecturesCount: 0,
        testsCount: 0,
        badge: 'Pediatrics',
        lectures: [],
        notes: [],
        tests: []
      },
      {
        id: 'final-research-stats',
        name: 'Research & Statistics',
        codeName: 'Research Methodology & Medical Statistics',
        paperCount: '',
        weightage: 'Methodology & Analytics',
        description: 'Modern clinical research designs, ethical clearances (IEC), GCP guidelines, and medical biostatistics tailored for AYUSH practitioners.',
        syllabusHighlights: [
          'Ayurvedic Research fundamentals & Literary vs Clinical research',
          'Clinical trial designs: RCT, Observational, Cohort & Case-Control studies',
          'Ethical guidelines: Helsinki declaration, ICMR & GCP-AYUSH',
          'Biostatistics: Measures of central tendency, Probability, p-value',
          'Parametric & Non-parametric tests: Student t-test, Chi-square, ANOVA'
        ],
        notesCount: 0,
        lecturesCount: 0,
        testsCount: 0,
        badge: 'Research',
        lectures: [],
        notes: [],
        tests: []
      },
      {
        id: 'final-shalakya-tantra',
        name: 'Shalakya Tantra',
        codeName: 'Shalakya Tantra (Ophthalmology, ENT & Oro-Dental)',
        paperCount: '',
        weightage: 'ENT & Ophthalmology',
        description: 'Diseases of the organs above the clavicle (Urdhvajatrugata Roga), Netra Rogas (76 eye diseases), Kriyakalpas (Tarpana, Putapaka, Aschyotana), and ENT disorders.',
        syllabusHighlights: [
          'Netra Sharir & 76 Netra Rogas according to Sushruta Samhita',
          'Netra Kriyakalpa: Tarpana, Putapaka, Aschyotana, Seka, Anjana',
          'Karna Rogas: Karnasrava, Karnanada, Badhirya & therapeutic wash',
          'Nasa Rogas: Pratishyaya, Dushta Pratishyaya, Peenasa',
          'Mukha Rogas (Danta, Jihva, Talu, Kantha, Sarvasara) & modern ENT'
        ],
        notesCount: 0,
        lecturesCount: 0,
        testsCount: 0,
        badge: 'ENT & Eye',
        lectures: [],
        notes: [],
        tests: []
      },
      {
        id: 'final-shalya-tantra',
        name: 'Shalya Tantra',
        codeName: 'Shalya Tantra (Ayurvedic & General Surgery)',
        paperCount: '',
        weightage: 'Ayurvedic Surgery',
        description: 'Surgical foundations derived from Sushruta Samhita, Yantra-Shastra, Ashtavidha Shastra Karma, Ksharasutra in anorectal disorders, and emergency wound care.',
        syllabusHighlights: [
          '101 Yantras and 20 Shastras: Design, sterilization & handling',
          'Ashtavidha Shastra Karma (Chedana, Bhedana, Lekhana, Vedhana, etc.)',
          'Kshara Karma, Ksharasutra preparation & Arsho-Bhagandara management',
          'Jalaukavacharana (Leech Therapy) & Agnikarma SOP',
          'Pre-operative, Operative & Post-operative care with modern OT asepsis'
        ],
        notesCount: 0,
        lecturesCount: 0,
        testsCount: 0,
        badge: 'Surgical Core',
        lectures: [],
        notes: [],
        tests: []
      }
    ]
  }
};
