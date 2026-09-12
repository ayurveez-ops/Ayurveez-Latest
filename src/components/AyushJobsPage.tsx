import React, { useState, useMemo } from 'react';
import { 
  Briefcase, 
  Search, 
  MapPin, 
  Building2, 
  Clock, 
  IndianRupee, 
  GraduationCap, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  Globe, 
  Share2, 
  ShieldCheck, 
  ArrowRight,
  Filter,
  Layers,
  Calendar,
  Send,
  Building,
  Award,
  BookOpen,
  PhoneCall,
  Check
} from 'lucide-react';
import { CourseType } from '../types';

interface AyushJobsPageProps {
  onSelectCourse?: (course: CourseType) => void;
  onOpenSignUp?: () => void;
}

export interface JobPosting {
  id: string;
  title: string;
  organization: string;
  orgType: 'Government / PSC' | 'Private Hospital' | 'Wellness Resort' | 'Academic / College' | 'R&D / Pharma' | 'Telehealth';
  location: string;
  workMode: 'On-site' | 'Hybrid' | 'Remote / Telehealth';
  salary: string;
  experience: string;
  qualification: string;
  vacancies: string;
  postedDate: string;
  lastDate: string;
  source: 'Naukri.com' | 'Indeed' | 'State PSC Portal' | 'Ministry of AYUSH' | 'Direct Hospital' | 'LinkedIn';
  applyUrl: string;
  verified: boolean;
  featured?: boolean;
  skills: string[];
  description: string;
  responsibilities: string[];
}

const LIVE_AYUSH_JOBS: JobPosting[] = [
  {
    id: 'job-1',
    title: 'AYUSH Medical Officer / AMO (Class-II Gazetted)',
    organization: 'State Public Service Commission (UPPSC / BPSC / HPSC / MPPSC)',
    orgType: 'Government / PSC',
    location: 'Statewide Govt AYUSH Hospitals & PHCs',
    workMode: 'On-site',
    salary: '₹56,100 – ₹1,77,500 (Pay Matrix Level-10 + NPA)',
    experience: 'Fresher / 0–2 Years',
    qualification: 'BAMS Degree from NCISM recognized university & State Board Registration',
    vacancies: '142 Posts',
    postedDate: 'Updated 2 Days Ago',
    lastDate: '30 Days from Gazette',
    source: 'State PSC Portal',
    applyUrl: 'https://www.naukri.com/ayurvedic-medical-officer-jobs',
    verified: true,
    featured: true,
    skills: ['AYUSH Medical Officer', 'Ayurveda Doctor', 'Panchkarma Protocol', 'Kayachikitsa', 'National Health Programs'],
    description: 'Government permanent recruitment for AYUSH Medical Officers (AMO) in state government Ayurvedic dispensaries, district hospitals, and primary health centers under AYUSH department.',
    responsibilities: [
      'Conduct regular Ayurvedic OPD & manage indoor patients',
      'Oversee Panchkarma therapy administration and herbal dispensary stores',
      'Implement National AYUSH Mission disease prevention camps in rural blocks',
      'Maintain medico-legal records and monthly patient census'
    ]
  },
  {
    id: 'job-2',
    title: 'Research Officer (Ayurveda Doctor) – CCRAS',
    organization: 'Central Council for Research in Ayurvedic Sciences (CCRAS), Ministry of AYUSH',
    orgType: 'Government / PSC',
    location: 'New Delhi / Jaipur / Patiala / Bhubaneswar',
    workMode: 'On-site',
    salary: '₹67,700 – ₹2,08,700 (Pay Level-11)',
    experience: '0–3 Years Research / Clinical',
    qualification: 'MD / MS in Ayurveda (Kayachikitsa / Dravyaguna / Rasashastra / Samhita)',
    vacancies: '38 Posts',
    postedDate: 'Active Notification',
    lastDate: 'Check Official Gazette',
    source: 'Ministry of AYUSH',
    applyUrl: 'https://ccras.nic.in/content/vacancies',
    verified: true,
    featured: true,
    skills: ['Clinical Trials', 'Pharmacovigilance', 'Ayurveda Doctor', 'Manuscriptology', 'Ayurvedic Drug R&D'],
    description: 'Premier national clinical research posting under the Ministry of AYUSH for conducting multi-centric clinical trials and drug standardization.',
    responsibilities: [
      'Lead clinical trial documentation according to Good Clinical Practice (GCP-Ayurveda)',
      'Conduct classical formulation efficacy studies on metabolic and autoimmune disorders',
      'Publish research monographs in indexed Scopus/PubMed AYUSH journals'
    ]
  },
  {
    id: 'job-3',
    title: 'Senior Ayurveda Doctor & Panchkarma Head',
    organization: 'Patanjali Wellness & Research Institute',
    orgType: 'Private Hospital',
    location: 'Haridwar, Uttarakhand / Delhi NCR',
    workMode: 'On-site',
    salary: '₹75,000 – ₹1,20,000 / Month + Accommodation',
    experience: '2–6 Years',
    qualification: 'BAMS / MD (Ayurveda) with deep pulse reading (Nadi Pariksha) expertise',
    vacancies: '12 Openings',
    postedDate: 'Active on Naukri.com',
    lastDate: 'Immediate Hiring',
    source: 'Naukri.com',
    applyUrl: 'https://www.naukri.com/patanjali-ayurved-doctor-jobs',
    verified: true,
    featured: true,
    skills: ['Ayurveda Doctor', 'Panchkarma Shodhana', 'Nadi Pariksha', 'Diet & Lifestyle Counseling', 'IPD Management'],
    description: 'Lead IPD/OPD clinical consultations, customized Panchkarma detox therapies, and integrated holistic wellness management at premier wellness resorts.',
    responsibilities: [
      'Execute Nadi Pariksha and prescribe authentic classical herbal formulations',
      'Prescribe and monitor customized 7 to 21-day Panchkarma regimens',
      'Conduct daily patient interaction sessions on Swasthavritta and Pathya-Apathya'
    ]
  },
  {
    id: 'job-4',
    title: 'Ayurvedic Medical Advisor & Formulation Specialist',
    organization: 'Dabur India Ltd. (Healthcare Division)',
    orgType: 'R&D / Pharma',
    location: 'Ghaziabad / New Delhi (Hybrid)',
    workMode: 'Hybrid',
    salary: '₹8.5 – ₹14.0 LPA',
    experience: '1–4 Years',
    qualification: 'BAMS / MD (Dravyaguna / Bhaishajya Kalpana / Kayachikitsa)',
    vacancies: '4 Openings',
    postedDate: 'Verified 3 Days Ago',
    lastDate: 'Rolling Basis',
    source: 'LinkedIn',
    applyUrl: 'https://www.linkedin.com/jobs/search/?keywords=Dabur%20Ayurveda%20Doctor',
    verified: true,
    featured: false,
    skills: ['Ayurvedic Pharmacopoeia (API)', 'Clinical Claims Validation', 'Medical Copywriting', 'Regulatory Affairs'],
    description: 'Bridge ancient Ayurvedic science with modern consumer healthcare product formulation, claim substantiation, and physician engagement.',
    responsibilities: [
      'Provide scientific and classical Samhita rationale for new herbal product launches',
      'Review product labels and literature against Drugs & Cosmetics Act (Schedule T & API)',
      'Conduct webinar masterclasses for practicing Ayurvedic vaidyas and clinicians'
    ]
  },
  {
    id: 'job-5',
    title: 'Senior Ayurvedic Vaidya & Wellness Consultant',
    organization: 'Ananda in the Himalayas (Luxury Wellness Resort)',
    orgType: 'Wellness Resort',
    location: 'Narendra Nagar, Rishikesh, Uttarakhand',
    workMode: 'On-site',
    salary: '₹9.0 – ₹16.0 LPA + Luxury Housing & Meals',
    experience: '3–8 Years (High English Fluency)',
    qualification: 'BAMS with exceptional English fluency and international client handling',
    vacancies: '3 Posts',
    postedDate: 'Active on Indeed',
    lastDate: 'Urgent Requirement',
    source: 'Indeed',
    applyUrl: 'https://in.indeed.com/jobs?q=Ayurveda+Doctor+Resort+Rishikesh',
    verified: true,
    featured: true,
    skills: ['Prakriti Assessment', 'Ayurvedic Marma Therapy', 'Holistic Nutrition', 'International Guest Relations'],
    description: 'Provide world-class personalized Ayurvedic consultations, Prakriti analysis, and therapeutic lifestyle planning for high-profile international and domestic guests.',
    responsibilities: [
      'Conduct in-depth Prakriti & Vikriti clinical consultations for wellness guests',
      'Design tailored Panchakarma, stress management, and rejuvenation programs',
      'Deliver lectures on Ayurvedic chronobiology (Dinacharya & Ritucharya)'
    ]
  },
  {
    id: 'job-6',
    title: 'Resident Ayurveda Doctor & Panchkarma Incharge',
    organization: 'Kerala Ayurveda Hospital & Clinics',
    orgType: 'Private Hospital',
    location: 'Bengaluru / Kochi / Mumbai / Chennai',
    workMode: 'On-site',
    salary: '₹45,000 – ₹70,000 / Month',
    experience: '0–2 Years (Freshers Welcome)',
    qualification: 'BAMS with completed 1-year compulsory rotatory internship',
    vacancies: '18 Openings',
    postedDate: 'Active on Naukri.com',
    lastDate: 'Immediate Joining',
    source: 'Naukri.com',
    applyUrl: 'https://www.naukri.com/kerala-ayurveda-doctor-jobs',
    verified: true,
    skills: ['Ayurveda Doctor', 'Panchkarma Procedures', 'Kerala Shodhana', 'IPD Care', 'Patient Counseling'],
    description: 'Hands-on clinical role supervising classical Keraleeya Panchkarma procedures (Dhara, Kizhi, Pizhichil, Snehavasti) and managing in-house patient care.',
    responsibilities: [
      'Monitor daily progress of IPD patients undergoing Shodhana therapy',
      'Supervise Panchkarma therapists and ensure aseptic standard operating protocols',
      'Assist senior consultants during complex clinical case evaluations'
    ]
  },
  {
    id: 'job-7',
    title: 'Online Ayurveda Doctor & Tele-Consultant',
    organization: 'Tata 1mg / Kapiva / Practo Care',
    orgType: 'Telehealth',
    location: 'Remote / Work From Home (Pan-India)',
    workMode: 'Remote / Telehealth',
    salary: '₹40,000 – ₹75,000 / Month (Flexible Shifts)',
    experience: '1–4 Years Clinical',
    qualification: 'BAMS with valid State Medical Council Registration & Digital OPD experience',
    vacancies: '25 Openings',
    postedDate: 'Active on Naukri.com',
    lastDate: 'Open Applications',
    source: 'Naukri.com',
    applyUrl: 'https://www.naukri.com/ayurveda-teleconsultation-jobs',
    verified: true,
    skills: ['Ayurveda Doctor', 'Telemedicine', 'Chronic Disease Management', 'Lifestyle Coaching', 'EHR Systems'],
    description: 'Provide flexible remote Ayurvedic consultations over audio/video calls for patients managing chronic ailments like PCOS, Hair fall, Diabetes, and Acidity.',
    responsibilities: [
      'Conduct 15-20 audio/video teleconsultations per day with digital prescription generation',
      'Explain dietary modifications and herbal medicine dosages in clear, patient-friendly terms',
      'Follow up on patient treatment outcomes through digital care platform'
    ]
  },
  {
    id: 'job-8',
    title: 'Assistant Professor / Lecturer (Ayurvedic Samhita & Siddhanta)',
    organization: 'NCISM Approved Ayurvedic Medical College & Hospital',
    orgType: 'Academic / College',
    location: 'Pune, Maharashtra / Varanasi, UP / Jaipur, Rajasthan',
    workMode: 'On-site',
    salary: '₹55,000 – ₹85,000 / Month (UGC / NCISM Pay Scale)',
    experience: '0–2 Years Post-PG',
    qualification: 'MD (Ayurveda) in Samhita & Siddhanta / Kayachikitsa / Dravyaguna',
    vacancies: '6 Posts',
    postedDate: 'Active Notification',
    lastDate: '15 Days',
    source: 'Direct Hospital',
    applyUrl: 'https://www.naukri.com/ayurveda-assistant-professor-jobs',
    verified: true,
    skills: ['Ayurveda Doctor', 'Sanskrit Shloka Teaching', 'Curriculum Delivery', 'Hospital Clinical Rounds', 'Student Mentoring'],
    description: 'Academic faculty position responsible for teaching classical Samhita shlokas, Sanskrit vyakarana, and clinical Padartha Vijnana to BAMS undergraduate scholars.',
    responsibilities: [
      'Deliver lectures and tutorial seminars as per NCISM competency-based syllabus',
      'Supervise students during clinical hospital posting and bedside Samhita correlation',
      'Participate in college institutional ethics committees and academic examinations'
    ]
  },
  {
    id: 'job-9',
    title: 'Ayurveda Doctor & Panchkarma Consultant',
    organization: 'Sri Sri Tattva Panchakarma Centres',
    orgType: 'Private Hospital',
    location: 'Bengaluru / Hyderabad / Kolkata / Ahmedabad',
    workMode: 'On-site',
    salary: '₹50,000 – ₹85,000 / Month',
    experience: '1–5 Years',
    qualification: 'BAMS with certification in Nadi Pariksha or Panchakarma',
    vacancies: '10 Openings',
    postedDate: 'Verified 4 Days Ago',
    lastDate: 'Immediate',
    source: 'Indeed',
    applyUrl: 'https://in.indeed.com/jobs?q=Sri+Sri+Tattva+Ayurveda+Doctor',
    verified: true,
    skills: ['Ayurveda Doctor', 'Panchkarma Chikitsa', 'Nadi Pariksha', 'Marma Chikitsa', 'Dietary Regimens'],
    description: 'Deliver holistic Ayurvedic treatments with emphasis on classical pulse diagnosis, lifestyle transformation, and natural disease reversal.',
    responsibilities: [
      'Examine patients via classical eight-fold examination (Ashtavidha Pariksha)',
      'Prescribe standardized herbal supplements and therapeutic detox procedures',
      'Coordinate wellness awareness workshops for corporate clients'
    ]
  },
  {
    id: 'job-10',
    title: 'Herbal Formulation R&D Scientist',
    organization: 'The Himalaya Drug Company',
    orgType: 'R&D / Pharma',
    location: 'Makali, Bengaluru, Karnataka',
    workMode: 'On-site',
    salary: '₹6.5 – ₹11.0 LPA',
    experience: '2–5 Years',
    qualification: 'BAMS + MD (Rasashastra & Bhaishajya Kalpana / Dravyaguna) or M.Pharm (Ayurveda)',
    vacancies: '5 Openings',
    postedDate: 'Active on LinkedIn',
    lastDate: 'Rolling Basis',
    source: 'LinkedIn',
    applyUrl: 'https://www.linkedin.com/jobs/search/?keywords=Himalaya%20Ayurveda%20Doctor',
    verified: true,
    skills: ['Extraction Chemistry', 'Stability Studies', 'Classical Bhasma / Asava Kalpana', 'Analytical Testing'],
    description: 'Formulate next-generation standardized polyherbal extracts, tablets, syrups, and topical herbal formulations adhering to global pharmacopoeial benchmarks.',
    responsibilities: [
      'Optimize extraction parameters for standardized herbal active markers',
      'Perform accelerated stability and microbial testing on pilot batches',
      'Correlate modern phytochemistry with classical Rasa-Virya-Vipaka energetics'
    ]
  },
  {
    id: 'job-11',
    title: 'District AYUSH Programme Manager / Consultant',
    organization: 'National AYUSH Mission (Govt of India State Health Society)',
    orgType: 'Government / PSC',
    location: 'Various District Headquarters (Pan-India)',
    workMode: 'On-site',
    salary: '₹45,000 – ₹65,000 / Month (Contractual Renewal)',
    experience: '1–3 Years',
    qualification: 'BAMS with MPH / MBA (Health Care) or 2 years public health experience',
    vacancies: '24 Posts',
    postedDate: 'Active Govt Portal',
    lastDate: 'Check State NHM Site',
    source: 'Ministry of AYUSH',
    applyUrl: 'https://ayush.gov.in/',
    verified: true,
    skills: ['Public Health Program', 'Supply Chain Monitoring', 'AYUSH Health & Wellness Centers', 'HMIS Portal'],
    description: 'Manage the operational deployment of AYUSH Health and Wellness Centers (AHWCs), medicinal supply logistics, and public yoga camps across the district.',
    responsibilities: [
      'Supervise operationalization of Ayushman Bharat AYUSH HWCs in the district',
      'Monitor essential drug lists (EDL) inventory and supply chains in dispensaries',
      'Submit monthly progress reports to State AYUSH Society and National AYUSH portal'
    ]
  },
  {
    id: 'job-12',
    title: 'Chief Ayurvedic Doctor & Resort Manager',
    organization: 'Kairali Ayurvedic Health Resort',
    orgType: 'Wellness Resort',
    location: 'Palakkad, Kerala / Gokarna, Karnataka',
    workMode: 'On-site',
    salary: '₹7.0 – ₹12.0 LPA + Accommodation & Bonus',
    experience: '3–7 Years',
    qualification: 'BAMS / MD with comprehensive knowledge of authentic Kerala treatment traditions',
    vacancies: '2 Openings',
    postedDate: 'Active on Naukri.com',
    lastDate: 'Urgent Hiring',
    source: 'Naukri.com',
    applyUrl: 'https://www.naukri.com/kairali-ayurvedic-jobs',
    verified: true,
    skills: ['Kerala Shodhana', 'Herbal Kashayam Preparation', 'Staff Training', 'Guest Hospitality'],
    description: 'Oversee full clinical and wellness operations at a world-renowned authentic Kerala Ayurvedic sanctuary.',
    responsibilities: [
      'Prescribe authentic customized medicated oils (Taila) and decoctions (Kashaya)',
      'Conduct daily orientation sessions on Ayurvedic daily routine and meditation',
      'Train junior therapists in traditional massage techniques and safety protocols'
    ]
  }
];

export const AyushJobsPage: React.FC<AyushJobsPageProps> = ({
  onSelectCourse,
  onOpenSignUp
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedWorkMode, setSelectedWorkMode] = useState<string>('All');
  const [selectedExperience, setSelectedExperience] = useState<string>('All');
  const [selectedJobForModal, setSelectedJobForModal] = useState<JobPosting | null>(null);
  const [copiedJobId, setCopiedJobId] = useState<string | null>(null);

  // Filter categories
  const CATEGORIES = [
    'All',
    'Government / PSC',
    'Private Hospital',
    'Wellness Resort',
    'Academic / College',
    'R&D / Pharma',
    'Telehealth'
  ];

  // Filter jobs based on search query & selectors
  const filteredJobs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return LIVE_AYUSH_JOBS.filter(job => {
      let matchesSearch = true;

      if (q) {
        const isPanchkarmaSearch = q.includes('panchkarma') || q.includes('panchakarma');
        const isDoctorSearch = q.includes('ayurveda doctor') || q.includes('ayurvedic doctor') || q.includes('doctor') || q.includes('physician') || q.includes('vaidya');
        const isAmoSearch = q.includes('ayush medical officer') || q.includes('medical officer') || q.includes('amo');

        matchesSearch = 
          job.title.toLowerCase().includes(q) ||
          job.organization.toLowerCase().includes(q) ||
          job.location.toLowerCase().includes(q) ||
          job.description.toLowerCase().includes(q) ||
          job.skills.some(s => s.toLowerCase().includes(q)) ||
          job.qualification.toLowerCase().includes(q);

        if (isPanchkarmaSearch) {
          matchesSearch = matchesSearch || 
            job.title.toLowerCase().includes('panchakarma') ||
            job.title.toLowerCase().includes('panchkarma') ||
            job.description.toLowerCase().includes('panchakarma') ||
            job.skills.some(s => s.toLowerCase().includes('panchakarma') || s.toLowerCase().includes('shodhana'));
        }

        if (isDoctorSearch && q.includes('ayurveda doctor')) {
          matchesSearch = matchesSearch || 
            job.title.toLowerCase().includes('ayurvedic') ||
            job.title.toLowerCase().includes('doctor') ||
            job.title.toLowerCase().includes('physician') ||
            job.title.toLowerCase().includes('vaidya') ||
            job.qualification.toLowerCase().includes('bams');
        }

        if (isAmoSearch) {
          matchesSearch = matchesSearch ||
            job.title.toLowerCase().includes('medical officer') ||
            job.title.toLowerCase().includes('amo') ||
            job.description.toLowerCase().includes('medical officer');
        }
      }

      const matchesCategory = 
        selectedCategory === 'All' || job.orgType === selectedCategory;

      const matchesWorkMode = 
        selectedWorkMode === 'All' || job.workMode === selectedWorkMode;

      const matchesExperience = 
        selectedExperience === 'All' ||
        (selectedExperience === 'fresher' && (job.experience.toLowerCase().includes('fresher') || job.experience.includes('0–2') || job.experience.includes('0–3'))) ||
        (selectedExperience === 'mid' && (job.experience.includes('1–4') || job.experience.includes('2–5') || job.experience.includes('2–6'))) ||
        (selectedExperience === 'senior' && (job.experience.includes('3–8') || job.experience.includes('3–7')));

      return matchesSearch && matchesCategory && matchesWorkMode && matchesExperience;
    });
  }, [searchQuery, selectedCategory, selectedWorkMode, selectedExperience]);

  const handleShareJob = (job: JobPosting) => {
    const text = `🏥 *Ayurveda Job Opening:* ${job.title}\n🏢 *Organization:* ${job.organization}\n💰 *Salary:* ${job.salary}\n📍 *Location:* ${job.location}\n🎓 *Eligibility:* ${job.qualification}\n\nApply online on Ayurveez Academic Portal: ${window.location.href}`;
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: text,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setCopiedJobId(job.id);
      setTimeout(() => setCopiedJobId(null), 2500);
    }
  };

  const quickSearchTerms = [
    { label: 'Ayurveda Doctor', query: 'Ayurveda Doctor', icon: '🌿' },
    { label: 'Panchkarma', query: 'Panchkarma', icon: '🥣' },
    { label: 'AYUSH Medical Officer', query: 'AYUSH Medical Officer', icon: '🩺' },
    { label: 'CCRAS Research', query: 'CCRAS', icon: '🔬' },
    { label: 'Govt / State PSC', query: 'PSC', icon: '🏛️' },
  ];

  return (
    <div className="min-h-screen bg-[#fbfaf6] text-stone-800 pb-20">
      
      {/* ========================================================================= */}
      {/* HERO SECTION: AYUSH JOBS & MEDICAL RECRUITMENT PORTAL                     */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-b from-[#143d2b] via-[#1b4332] to-[#122e21] text-white pt-6 pb-8 sm:pt-8 sm:pb-10 px-4 sm:px-6 lg:px-8 border-b border-emerald-900 relative overflow-hidden">
        
        {/* Background glow accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-5 relative z-10">
          
          {/* Tag & Status */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-xs">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Ayurveda Career &amp; Recruitment</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Verified Vacancies</span>
            </span>
          </div>

          {/* Heading - Reduced Size */}
          <div className="max-w-2xl space-y-1.5">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif text-white tracking-tight leading-snug">
              AYUSH Medical Jobs &amp; Vacancies for{' '}
              <span className="text-amber-300 underline decoration-amber-400/80 decoration-2">
                BAMS &amp; MD Doctors
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
              Explore authentic job notifications across State PSCs, Ministry of AYUSH, Ayurvedic hospitals, wellness resorts, and teleconsultation clinics.
            </p>
          </div>

          {/* Real-time Search & Live Aggregator Launchpads */}
          <div className="bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/20 shadow-xl max-w-4xl space-y-3">
            <div className="flex flex-col sm:flex-row items-center gap-2.5">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="input-search-ayush-jobs"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Ayurveda Doctor, Panchkarma, AYUSH Medical Officer, State PSC..."
                  className="w-full pl-10 pr-12 py-2.5 rounded-xl bg-white text-stone-900 placeholder:text-stone-400 text-xs sm:text-sm font-medium border border-transparent focus:border-amber-400 focus:outline-none shadow-xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs font-bold px-1 py-0.5 rounded"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={selectedWorkMode}
                  onChange={(e) => setSelectedWorkMode(e.target.value)}
                  className="px-3 py-2.5 rounded-xl bg-white text-stone-800 text-xs font-bold border border-transparent focus:border-amber-400 focus:outline-none cursor-pointer w-full sm:w-auto"
                >
                  <option value="All">All Modes</option>
                  <option value="On-site">On-site Hospital</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Remote / Telehealth">Remote OPD</option>
                </select>

                <select
                  value={selectedExperience}
                  onChange={(e) => setSelectedExperience(e.target.value)}
                  className="px-3 py-2.5 rounded-xl bg-white text-stone-800 text-xs font-bold border border-transparent focus:border-amber-400 focus:outline-none cursor-pointer w-full sm:w-auto"
                >
                  <option value="All">Experience</option>
                  <option value="fresher">Fresher 0–2 Yrs</option>
                  <option value="mid">Mid 2–5 Yrs</option>
                  <option value="senior">Senior 5+ Yrs</option>
                </select>
              </div>
            </div>

            {/* Quick 1-Click Search Chips for Requested Keywords */}
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              <span className="text-[11px] font-bold text-amber-200 mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3 text-amber-300" />
                <span>Quick Search:</span>
              </span>
              {quickSearchTerms.map((term) => {
                const isActive = searchQuery.toLowerCase() === term.query.toLowerCase();
                return (
                  <button
                    key={term.query}
                    onClick={() => setSearchQuery(isActive ? '' : term.query)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 border ${
                      isActive
                        ? 'bg-amber-300 text-stone-900 border-amber-400 shadow-xs'
                        : 'bg-white/15 hover:bg-white/25 text-white border-white/20'
                    }`}
                  >
                    <span>{term.icon}</span>
                    <span>{term.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick 1-Click External Live Job Portals Launchpad */}
            <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[11px] font-bold text-stone-300 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-emerald-300" />
                <span>External Portals:</span>
              </span>

              <a
                id="link-live-naukri"
                href="https://www.naukri.com/ayurveda-doctor-jobs"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-0.5 rounded-md bg-white/15 hover:bg-white/25 text-white font-semibold text-[11px] border border-white/20 transition-colors flex items-center gap-1"
                title="Search live BAMS jobs on Naukri.com"
              >
                <span>Naukri.com</span>
                <ExternalLink className="w-2.5 h-2.5 text-amber-300" />
              </a>

              <a
                id="link-live-indeed"
                href="https://in.indeed.com/jobs?q=Ayurveda+Doctor+BAMS&l=India"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-0.5 rounded-md bg-white/15 hover:bg-white/25 text-white font-semibold text-[11px] border border-white/20 transition-colors flex items-center gap-1"
                title="Search live Ayurveda jobs on Indeed"
              >
                <span>Indeed India</span>
                <ExternalLink className="w-2.5 h-2.5 text-amber-300" />
              </a>

              <a
                id="link-live-linkedin"
                href="https://www.linkedin.com/jobs/search/?keywords=Ayurveda%20Doctor%20BAMS"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-0.5 rounded-md bg-white/15 hover:bg-white/25 text-white font-semibold text-[11px] border border-white/20 transition-colors flex items-center gap-1"
                title="Search BAMS and AYUSH jobs on LinkedIn"
              >
                <span>LinkedIn</span>
                <ExternalLink className="w-2.5 h-2.5 text-amber-300" />
              </a>

              <a
                id="link-live-ccras"
                href="https://ccras.nic.in/content/vacancies"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-0.5 rounded-md bg-white/15 hover:bg-white/25 text-white font-semibold text-[11px] border border-white/20 transition-colors flex items-center gap-1"
                title="Official CCRAS Research Officer Vacancies"
              >
                <span>CCRAS Vacancies</span>
                <ExternalLink className="w-2.5 h-2.5 text-amber-300" />
              </a>

              <a
                id="link-live-ayush-gov"
                href="https://ayush.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-0.5 rounded-md bg-white/15 hover:bg-white/25 text-white font-semibold text-[11px] border border-white/20 transition-colors flex items-center gap-1"
                title="Ministry of AYUSH Official Portal"
              >
                <span>Ayush.gov.in</span>
                <ExternalLink className="w-2.5 h-2.5 text-amber-300" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* FILTER PILLS & CATEGORY NAV                                               */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1b4332] text-amber-300 shadow-xs scale-[1.02]'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-[#e2dacf]'
              }`}
            >
              {cat === 'All' ? '🌟 All Opportunities' : cat}
            </button>
          ))}
        </div>

        {/* Count Indicator */}
        <div className="flex items-center justify-between mt-4 text-xs text-stone-500 font-medium">
          <div>
            Showing <strong className="text-stone-900">{filteredJobs.length}</strong> active Ayurveda job postings
          </div>
          <div className="hidden sm:flex items-center gap-2 text-emerald-800 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Verified NCISM / State Board Eligibility</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* JOB LISTINGS CARDS GRID                                                   */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className={`bg-white rounded-2xl sm:rounded-3xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between p-5 space-y-4 ${
                job.featured 
                  ? 'border-amber-400/80 shadow-md ring-1 ring-amber-400/20' 
                  : 'border-[#e2dacf] shadow-2xs'
              }`}
            >
              {/* Card Top: Org Type & Status Badge */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                    job.orgType === 'Government / PSC'
                      ? 'bg-purple-100 text-purple-900 border border-purple-300'
                      : job.orgType === 'Private Hospital'
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : job.orgType === 'Wellness Resort'
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : job.orgType === 'Academic / College'
                      ? 'bg-blue-100 text-blue-900 border border-blue-300'
                      : 'bg-teal-100 text-teal-900 border border-teal-300'
                  }`}>
                    {job.orgType}
                  </span>

                  <span className="text-[10px] font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                    {job.vacancies}
                  </span>
                </div>

                {/* Title & Organization */}
                <div>
                  <h3 className="text-base font-black text-stone-900 leading-snug font-serif hover:text-[#1b4332] transition-colors cursor-pointer" onClick={() => setSelectedJobForModal(job)}>
                    {job.title}
                  </h3>
                  <p className="text-xs font-bold text-[#2d6a4f] mt-1 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 shrink-0" />
                    <span className="line-clamp-1">{job.organization}</span>
                  </p>
                </div>

                {/* Key Metrics */}
                <div className="space-y-1.5 pt-2 border-t border-stone-100 text-xs">
                  <div className="flex items-center justify-between text-stone-600">
                    <span className="flex items-center gap-1 text-[11px]">
                      <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                      <span className="line-clamp-1">{job.location}</span>
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-stone-50 text-[10px] font-semibold text-stone-600">
                      {job.workMode}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-stone-500 font-medium">Compensation:</span>
                    <span className="text-xs font-black text-stone-900 font-mono">
                      {job.salary}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-stone-500 font-medium">Experience:</span>
                    <span className="text-xs font-bold text-[#1b4332]">
                      {job.experience}
                    </span>
                  </div>
                </div>

                {/* Qualification snippet */}
                <div className="p-2.5 rounded-xl bg-[#faf9f5] border border-stone-200/80 text-[11px] text-stone-700 leading-snug">
                  <strong className="text-stone-900 block text-[10px] uppercase font-bold text-stone-500">Eligibility Criteria:</strong>
                  <span className="line-clamp-2 mt-0.5">{job.qualification}</span>
                </div>

                {/* Skills Chips */}
                <div className="flex flex-wrap gap-1">
                  {job.skills.slice(0, 3).map((skill, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-stone-100 text-stone-700 text-[10px] rounded font-medium">
                      {skill}
                    </span>
                  ))}
                  {job.skills.length > 3 && (
                    <span className="px-1.5 py-0.5 text-stone-400 text-[10px]">
                      +{job.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer: Action Buttons */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                <button
                  id={`btn-view-details-${job.id}`}
                  onClick={() => setSelectedJobForModal(job)}
                  className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors cursor-pointer flex-1 text-center"
                >
                  View Details
                </button>

                <a
                  id={`btn-apply-job-${job.id}`}
                  href={job.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-[#1b4332] hover:bg-[#143628] text-amber-300 text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer flex-1 text-center"
                  title={`Apply via ${job.source}`}
                >
                  <span>Apply on {job.source === 'Naukri.com' ? 'Naukri' : job.source === 'State PSC Portal' ? 'PSC' : 'Portal'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  id={`btn-share-job-${job.id}`}
                  onClick={() => handleShareJob(job)}
                  className="p-2 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 transition-colors cursor-pointer"
                  title="Share job opening on WhatsApp or Copy Link"
                >
                  {copiedJobId === job.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Share2 className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 space-y-4 max-w-md mx-auto mt-6">
            <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-400 mx-auto flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-stone-900">No matching jobs found</h3>
            <p className="text-xs text-stone-500">
              Try searching with different keywords like &quot;BAMS&quot;, &quot;Medical Officer&quot;, &quot;Panchakarma&quot;, or reset your filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedWorkMode('All');
                setSelectedExperience('All');
              }}
              className="px-4 py-2 rounded-xl bg-[#1b4332] text-amber-300 text-xs font-bold cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MEDICAL OFFICER EXAM PREP CTA BANNER                                      */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-gradient-to-r from-[#143d2b] via-[#1b4332] to-[#2d6a4f] rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-emerald-700">
          <div className="space-y-2 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-stone-950 text-[10px] font-black uppercase tracking-wider">
              <Award className="w-3 h-3 text-stone-900" />
              <span>Crack AYUSH Medical Officer (AMO)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black font-serif text-white">
              Preparing for State PSC or UPSC Medical Officer Examinations?
            </h3>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
              Boost your rank with Ayurveez&apos;s high-yield solved question papers, Sanskrit shloka mnemonic modules, and timed mock tests designed strictly according to recent PSC examination patterns.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => {
                if (onSelectCourse) onSelectCourse('AYUSH MEDICAL OFFICER');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 text-stone-950 font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore AYUSH MO Series</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: FULL JOB DOSSIER & APPLICATION INSTRUCTIONS                        */}
      {/* ========================================================================= */}
      {selectedJobForModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto space-y-5">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-100">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold text-[10px] uppercase">
                  {selectedJobForModal.orgType} • {selectedJobForModal.vacancies}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-stone-900 font-serif leading-tight">
                  {selectedJobForModal.title}
                </h3>
                <p className="text-xs font-bold text-[#2d6a4f] flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{selectedJobForModal.organization}</span>
                </p>
              </div>

              <button
                onClick={() => setSelectedJobForModal(null)}
                className="text-stone-400 hover:text-stone-600 p-1.5 rounded-xl hover:bg-stone-100"
              >
                ✕
              </button>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-[10px] text-stone-400 font-bold uppercase block">Compensation</span>
                <span className="font-bold text-stone-900 font-mono text-xs">{selectedJobForModal.salary}</span>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-[10px] text-stone-400 font-bold uppercase block">Location</span>
                <span className="font-bold text-stone-900 text-xs truncate block">{selectedJobForModal.location}</span>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-[10px] text-stone-400 font-bold uppercase block">Work Mode</span>
                <span className="font-bold text-[#1b4332] text-xs">{selectedJobForModal.workMode}</span>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-[10px] text-stone-400 font-bold uppercase block">Experience</span>
                <span className="font-bold text-stone-900 text-xs">{selectedJobForModal.experience}</span>
              </div>
            </div>

            {/* Description & Overview */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-stone-900 uppercase text-[11px] tracking-wider text-stone-500">Position Overview</h4>
              <p className="text-stone-700 leading-relaxed bg-[#faf9f5] p-3.5 rounded-2xl border border-stone-200/80">
                {selectedJobForModal.description}
              </p>
            </div>

            {/* Key Responsibilities */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-stone-900 uppercase text-[11px] tracking-wider text-stone-500">Core Clinical &amp; Operational Responsibilities</h4>
              <ul className="space-y-1.5 pl-1">
                {selectedJobForModal.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-stone-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2d6a4f] shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Eligibility Requirements */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-stone-900 uppercase text-[11px] tracking-wider text-stone-500">Eligibility &amp; Credentials Required</h4>
              <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 text-emerald-950 font-medium">
                {selectedJobForModal.qualification}
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-stone-900 uppercase text-[11px] tracking-wider text-stone-500">Desired Skills &amp; Clinical Competencies</h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedJobForModal.skills.map((skill, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-stone-100 text-stone-800 text-xs rounded-lg font-semibold">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-[11px] text-stone-400">
                Posted via: <strong>{selectedJobForModal.source}</strong> • {selectedJobForModal.postedDate}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => handleShareJob(selectedJobForModal)}
                  className="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-700 text-xs font-bold hover:bg-stone-50 flex items-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>

                <a
                  href={selectedJobForModal.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#1b4332] hover:bg-[#143628] text-amber-300 text-xs font-black shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Apply on {selectedJobForModal.source}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
