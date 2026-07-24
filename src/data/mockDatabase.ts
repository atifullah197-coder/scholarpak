import { Scholarship, UserProfile, TrackedApplication, ScraperSource, AnomalyAlert, CommunityPost, CountryGuide } from '../types';

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Hamza Khan',
  email: 'hamza.scholar@pakscholar.org',
  citizenship: 'Pakistan',
  targetDegree: 'Masters',
  fieldOfStudy: 'Computer Science & AI',
  gpa: 3.42,
  maxGpa: 4.0,
  ieltsScore: 6.5,
  workExpYears: 2,
  targetCountries: ['Germany', 'United Kingdom', 'United States', 'Japan', 'Turkey'],
  budgetNeed: 'Full Scholarship',
  uploadedCvText: `Hamza Khan - Software Engineer & ML Researcher
Education: BS Computer Science from NUST, GPA 3.42/4.0.
Work Experience: 2 years full-stack engineer at TechLogix. Developed React & Express pipelines.
Projects: AI Document Parser, Sentiment Analysis for Urdu NLP.
IELTS: Overall 6.5 (R: 7.0, L: 6.5, S: 6.0, W: 6.5).
Goal: Seeking Masters in AI/Data Science with full stipend funding in Europe/UK/US.`,
  uploadedDocuments: [
    { name: 'NUST BS Transcript (Attested)', type: 'Transcript', ready: true },
    { name: 'IELTS Academic Scorecard (6.5)', type: 'IELTS', ready: true },
    { name: 'Statement of Purpose Draft v1', type: 'SOP', ready: false },
    { name: 'Recommendation Letter 1 (NUST Prof)', type: 'Recommendation', ready: true },
    { name: 'Recommendation Letter 2 (TechLogix Lead)', type: 'Recommendation', ready: false },
    { name: 'Passport Copy', type: 'Passport', ready: true },
  ],
};

export const INITIAL_SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'sch-daad-epos',
    title: 'DAAD EPOS Postgraduate Scholarship',
    provider: 'German Academic Exchange Service (DAAD)',
    country: 'Germany',
    flag: '🇩🇪',
    degreeLevels: ['Masters', 'PhD'],
    fundingType: 'Fully Funded',
    stipendAmount: '€934 - €1,300 / month',
    tuitionCoverage: '100% Free Tuition + Health Insurance + Travel Allowance',
    deadline: '2026-09-30',
    predictedExpiryDays: 68,
    regionTenant: 'pakistan',
    trustScore: 98,
    trustSourcesCount: 3,
    isCrossVerified: true,
    trustHistory: [
      { date: '2026-07-01', score: 98, reason: 'Cross-verified across DAAD portal & German Embassy Islamabad' },
      { date: '2026-05-15', score: 95, reason: 'Initial scraper discovery on DAAD EPOS brochure' },
    ],
    sources: [
      { name: 'DAAD Official Portal', url: 'https://www.daad.de/en/study-and-research-in-germany/scholarships/', reliability: 99, lastVerified: '2026-07-22' },
      { name: 'German Embassy Islamabad', url: 'https://islamabad.diplo.de/pk-en/vertretungen/botschaft', reliability: 98, lastVerified: '2026-07-20' },
      { name: 'DAAD Information Center Pakistan', url: 'https://www.daad.de/pakistan', reliability: 96, lastVerified: '2026-07-21' },
    ],
    deltas: [
      { field: 'Stipend Amount', oldValue: '€861 / month', newValue: '€934 - €1,300 / month', changedAt: '2026-06-10' },
      { field: 'Deadline', oldValue: '2026-10-15', newValue: '2026-09-30', changedAt: '2026-07-05' },
    ],
    description: 'Supports young professionals from developing countries to pursue postgraduate study at select German state universities with complete living allowance, travel, and health coverage.',
    eligibleNationalities: ['Pakistan', 'India', 'Bangladesh', 'Sri Lanka', 'Nepal', 'Developing Nations'],
    gpaRequirement: 3.0,
    ieltsRequirement: 6.5,
    workExpYearsRequired: 2,
    requiredDocuments: ['SOP', 'Transcript', '2 Recommendation Letters', 'IELTS/TOEFL', 'CV in Europass format', 'Work Experience Certificate'],
    competitivenessRate: 9.2,
    tags: ['Germany', 'DAAD', 'Fully Funded', '2 Years Work Exp Required', 'State Universities'],
    officialUrl: 'https://www.daad.de/en/study-and-research-in-germany/scholarships/epos/',
    scrapedAt: '2026-07-23',
  },
  {
    id: 'sch-chevening-uk',
    title: 'Chevening UK Government Scholarship',
    provider: 'UK Foreign, Commonwealth & Development Office (FCDO)',
    country: 'United Kingdom',
    flag: '🇬🇧',
    degreeLevels: ['Masters'],
    fundingType: 'Fully Funded',
    stipendAmount: '£1,348 - £1,672 / month',
    tuitionCoverage: '100% Full Tuition + Return Flights + Visa Fee Waiver',
    deadline: '2026-11-03',
    predictedExpiryDays: 102,
    regionTenant: 'global',
    trustScore: 99,
    trustSourcesCount: 4,
    isCrossVerified: true,
    trustHistory: [
      { date: '2026-07-10', score: 99, reason: 'Verified via FCDO UK & British High Commission Islamabad' },
    ],
    sources: [
      { name: 'Chevening Official Portal', url: 'https://www.chevening.org/apply/', reliability: 100, lastVerified: '2026-07-23' },
      { name: 'British High Commission PK', url: 'https://www.gov.uk/world/organisations/british-high-commission-islamabad', reliability: 98, lastVerified: '2026-07-18' },
    ],
    deltas: [],
    description: 'The UK government’s global scholarship program aimed at future leaders, influencers, and decision-makers. Covers full 1-year Master’s degree at any UK university.',
    eligibleNationalities: ['Pakistan', 'India', 'Nigeria', 'Kenya', 'Global Chevening Eligible Countries'],
    gpaRequirement: 3.2,
    ieltsRequirement: 6.5,
    workExpYearsRequired: 2,
    requiredDocuments: ['4 Chevening Leadership Essays', '2 References', 'Unconditional UK Offer Letter', 'Passports & Transcripts'],
    competitivenessRate: 3.1,
    tags: ['United Kingdom', 'Chevening', 'Leadership', 'Fully Funded', '1-Year Masters'],
    officialUrl: 'https://www.chevening.org/scholarship/pakistan/',
    scrapedAt: '2026-07-23',
  },
  {
    id: 'sch-fulbright-us',
    title: 'Fulbright Master’s & PhD Program',
    provider: 'United States Educational Foundation in Pakistan (USEFP) / US Dept of State',
    country: 'United States',
    flag: '🇺🇸',
    degreeLevels: ['Masters', 'PhD'],
    fundingType: 'Fully Funded',
    stipendAmount: '$1,800 - $2,600 / month',
    tuitionCoverage: '100% Tuition + Textbooks + Health Insurance + Roundtrip Airfare',
    deadline: '2026-05-20',
    predictedExpiryDays: 300,
    regionTenant: 'pakistan',
    trustScore: 97,
    trustSourcesCount: 2,
    isCrossVerified: true,
    trustHistory: [
      { date: '2026-06-01', score: 97, reason: 'USEFP official announcement published' }
    ],
    sources: [
      { name: 'USEFP Official Website', url: 'https://www.usefp.org/scholarships/fulbright.cf', reliability: 99, lastVerified: '2026-07-22' },
      { name: 'US Embassy Islamabad', url: 'https://pk.usembassy.gov/', reliability: 97, lastVerified: '2026-07-15' },
    ],
    deltas: [
      { field: 'GRE Requirement', oldValue: 'GRE General Required (138+ Quant)', newValue: 'GRE Waiver for select fields (Computer Science still requires GRE)', changedAt: '2026-04-12' }
    ],
    description: 'The flagship academic exchange program between the US and Pakistan, managed by USEFP. Covers tuition, textbook allowance, monthly stipend, health insurance, and airfare for Master’s and PhD studies.',
    eligibleNationalities: ['Pakistan'],
    gpaRequirement: 3.0,
    ieltsRequirement: 7.0,
    workExpYearsRequired: 0,
    requiredDocuments: ['GRE General Scorecard', '3 Letters of Recommendation', 'Personal Statement', 'Research Objective', 'Attested Transcripts'],
    competitivenessRate: 4.8,
    tags: ['USA', 'USEFP', 'Fulbright', 'GRE Required', 'Fully Funded'],
    officialUrl: 'https://www.usefp.org/scholarships/fulbright-masters-phd.cf',
    scrapedAt: '2026-07-23',
  },
  {
    id: 'sch-erasmus-mundus',
    title: 'Erasmus Mundus Joint Master Degrees (EMJMD)',
    provider: 'European Commission (EACEA)',
    country: 'European Union (Multi-Country)',
    flag: '🇪🇺',
    degreeLevels: ['Masters'],
    fundingType: 'Fully Funded',
    stipendAmount: '€1,400 / month',
    tuitionCoverage: '100% Tuition Fees + Installation Allowance (€1,000) + Travel €3,000/yr',
    deadline: '2027-01-15',
    predictedExpiryDays: 175,
    regionTenant: 'south_asia',
    trustScore: 99,
    trustSourcesCount: 3,
    isCrossVerified: true,
    trustHistory: [
      { date: '2026-07-15', score: 99, reason: 'EU EACEA Master Catalogue sync confirmed' }
    ],
    sources: [
      { name: 'Erasmus Mundus Catalogue', url: 'https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-catalogue_en', reliability: 100, lastVerified: '2026-07-23' },
      { name: 'Erasmus Pakistan Association', url: 'https://erasmuspakistan.org/', reliability: 94, lastVerified: '2026-07-19' },
    ],
    deltas: [
      { field: 'Stipend Amount', oldValue: '€1,000 / month', newValue: '€1,400 / month (Harmonized Erasmus+ Rule)', changedAt: '2026-01-10' }
    ],
    description: 'Study across 2 to 3 European countries in top consortium universities. Includes full €1,400 monthly allowance, zero tuition fees, and mobility installation grants.',
    eligibleNationalities: ['Global', 'Pakistan', 'India', 'Bangladesh', 'Nepal', 'Sri Lanka'],
    gpaRequirement: 3.0,
    ieltsRequirement: 6.5,
    workExpYearsRequired: 0,
    requiredDocuments: ['Europass CV', 'Motivation Letter', '2 Academic References', 'Degree & Transcript', 'IELTS/TOEFL Scorecard', 'Proof of Residence'],
    competitivenessRate: 6.4,
    tags: ['Europe', 'Erasmus Mundus', 'Multi-Country Mobility', 'Fully Funded'],
    officialUrl: 'https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-catalogue_en',
    scrapedAt: '2026-07-23',
  },
  {
    id: 'sch-mext-japan',
    title: 'MEXT Japan Embassy Recommendation Scholarship',
    provider: 'Ministry of Education, Culture, Sports, Science and Technology (MEXT)',
    country: 'Japan',
    flag: '🇯🇵',
    degreeLevels: ['Bachelors', 'Masters', 'PhD'],
    fundingType: 'Fully Funded',
    stipendAmount: '143,000 - 145,000 JPY / month (~$1,000)',
    tuitionCoverage: '100% Entrance & Tuition Fee Waiver + Roundtrip Flight Ticket',
    deadline: '2026-05-30',
    predictedExpiryDays: 310,
    regionTenant: 'pakistan',
    trustScore: 96,
    trustSourcesCount: 2,
    isCrossVerified: true,
    trustHistory: [
      { date: '2026-05-01', score: 96, reason: 'Verified via Embassy of Japan in Pakistan' }
    ],
    sources: [
      { name: 'Embassy of Japan in Pakistan', url: 'https://www.pk.emb-japan.go.jp/itpr_en/education.html', reliability: 98, lastVerified: '2026-07-14' },
      { name: 'MEXT Japan Official', url: 'https://www.mext.go.jp/a_menu/koutou/ryugaku/boshu/1417202.htm', reliability: 99, lastVerified: '2026-07-02' },
    ],
    deltas: [],
    description: 'Comprehensive Japanese Government Scholarship covering preparatory Japanese language training, university admission, monthly stipend, and airfare without obligating return service.',
    eligibleNationalities: ['Pakistan', 'Global Countries with Japanese Diplomatic Relations'],
    gpaRequirement: 3.2,
    ieltsRequirement: 6.0,
    workExpYearsRequired: 0,
    requiredDocuments: ['Application Form', 'Placement Preference Form', 'Field of Study Plan', 'Medical Certificate', 'Academic Transcripts'],
    competitivenessRate: 5.2,
    tags: ['Japan', 'MEXT', 'Embassy Route', 'Fully Funded', 'Research Student'],
    officialUrl: 'https://www.pk.emb-japan.go.jp/itpr_en/education.html',
    scrapedAt: '2026-07-23',
  },
  {
    id: 'sch-turkiye-burslari',
    title: 'Türkiye Bursları Government Scholarship',
    provider: 'Presidency for Turks Abroad and Related Communities (YTB)',
    country: 'Turkey',
    flag: '🇹🇷',
    degreeLevels: ['Bachelors', 'Masters', 'PhD'],
    fundingType: 'Fully Funded',
    stipendAmount: '1,700 - 3,000 TRY / month + Free Dormitory',
    tuitionCoverage: '100% University Tuition + 1-Year Turkish Language Course + Flights',
    deadline: '2027-02-20',
    predictedExpiryDays: 210,
    regionTenant: 'global',
    trustScore: 95,
    trustSourcesCount: 2,
    isCrossVerified: true,
    trustHistory: [
      { date: '2026-02-10', score: 95, reason: 'Official YTB Application Portal sync' }
    ],
    sources: [
      { name: 'Türkiye Bursları Portal', url: 'https://turkiyeburslari.gov.tr/', reliability: 99, lastVerified: '2026-07-21' }
    ],
    deltas: [],
    description: 'A government-funded, competitive scholarship program awarded to outstanding students to pursue full-time or short-term programs at top Turkish universities.',
    eligibleNationalities: ['All Countries except Turkish Citizens'],
    gpaRequirement: 2.8,
    ieltsRequirement: 5.5,
    workExpYearsRequired: 0,
    requiredDocuments: ['Diploma/Transcripts', 'Letter of Intent', 'Academic Recommendations', 'National ID / Passport'],
    competitivenessRate: 7.8,
    tags: ['Turkey', 'Turkiye Burslari', 'Free Dormitory', 'Fully Funded'],
    officialUrl: 'https://turkiyeburslari.gov.tr/',
    scrapedAt: '2026-07-23',
  },
];

export const INITIAL_TRACKED_APPLICATIONS: TrackedApplication[] = [
  {
    id: 'app-daad-01',
    scholarshipId: 'sch-daad-epos',
    status: 'preparing',
    addedAt: '2026-07-10',
    targetDeadline: '2026-09-30',
    deadlineRiskAlert: '⚠️ Warning: 2 documents incomplete (SOP v2 & 2nd Recommendation Letter). Only 68 days left for Europass certification.',
    milestones: [
      { id: 'm1', title: 'Complete NUST Transcript Attestation via HEC & MoFA', dueDate: '2026-07-28', category: 'Documents', completed: true },
      { id: 'm2', title: 'Draft tailored DAAD EPOS Statement of Purpose', dueDate: '2026-08-05', category: 'SOP', completed: false },
      { id: 'm3', title: 'Request 2nd Recommendation Letter from TechLogix Lead', dueDate: '2026-08-10', category: 'Recommender', completed: false },
      { id: 'm4', title: 'IELTS Band Upgrade Prep (Target 7.0)', dueDate: '2026-08-25', category: 'Documents', completed: false },
      { id: 'm5', title: 'Final DAAD Portal Online Application Submission', dueDate: '2026-09-25', category: 'Submission', completed: false },
    ],
    sopVersions: [
      {
        version: 1,
        title: 'Initial General Motivation Draft',
        content: `I am writing to express my eager interest in applying for the DAAD EPOS Masters scholarship in Germany. Having graduated with a Bachelor of Science in Computer Science from NUST Pakistan with a 3.42 GPA, I have spent the last two years working as a software developer at TechLogix. My passion lies in applying artificial intelligence to solve infrastructure challenges in developing nations. Germany offers world-class education in engineering and computing...`,
        createdAt: '2026-07-12',
        aiCheckResult: {
          aiPercentage: 24,
          readabilityScore: 82,
          burstinessRating: 'Human-like',
          flags: ['Slightly generic opening paragraph', 'Need explicit connection to DAAD EPOS sustainable development goals (SDGs)'],
          suggestions: [
            'Mention specific SDG goals (e.g. SDG 9 - Industry, Innovation & Infrastructure).',
            'Detail exact software projects developed at TechLogix and how they map to German university curriculum.'
          ],
        }
      }
    ],
    recommenders: [
      {
        id: 'rec-01',
        name: 'Dr. Arshad Mahmood',
        email: 'arshad.mahmood@seecs.nust.edu.pk',
        designation: 'Professor & Department Chair',
        institution: 'NUST SEECS',
        status: 'submitted',
        submittedAt: '2026-07-18',
      },
      {
        id: 'rec-02',
        name: 'Usman Chaudhry',
        email: 'usman.c@techlogix.com',
        designation: 'Senior Engineering Manager',
        institution: 'TechLogix Pakistan',
        status: 'invited',
      }
    ]
  },
  {
    id: 'app-chevening-01',
    scholarshipId: 'sch-chevening-uk',
    status: 'exploring',
    addedAt: '2026-07-20',
    targetDeadline: '2026-11-03',
    milestones: [
      { id: 'cm1', title: 'Outline 4 Chevening Essay Prompts (Leadership, Networking, Studying in UK, Career Plan)', dueDate: '2026-08-15', category: 'SOP', completed: false },
      { id: 'cm2', title: 'Identify 3 UK Target Universities (Imperial, Edinburgh, Manchester)', dueDate: '2026-08-30', category: 'Documents', completed: true },
      { id: 'cm3', title: 'Submit UCAS/Direct UK University Applications', dueDate: '2026-09-15', category: 'Submission', completed: false },
    ],
    sopVersions: [],
    recommenders: []
  }
];

export const INITIAL_SCRAPERS: ScraperSource[] = [
  {
    id: 'src-daad',
    name: 'DAAD EPOS Germany Scraper Agent',
    url: 'https://www.daad.de/en/study-and-research-in-germany/scholarships/',
    type: 'web_agent',
    status: 'healthy',
    lastScraped: '2026-07-23 21:14',
    uptime: 99.8,
    deltaCount: 14,
    scrapedCount: 142,
  },
  {
    id: 'src-chevening',
    name: 'UK Chevening FCDO Portal Crawler',
    url: 'https://www.chevening.org/apply/',
    type: 'web_agent',
    status: 'healthy',
    lastScraped: '2026-07-23 22:30',
    uptime: 99.5,
    deltaCount: 8,
    scrapedCount: 98,
  },
  {
    id: 'src-pdf-hec',
    name: 'HEC Pakistan Overseas Scholarship PDF Engine',
    url: 'https://www.hec.gov.pk/english/scholarships/overseas/Pages/default.aspx',
    type: 'pdf_parser',
    status: 'healthy',
    lastScraped: '2026-07-23 18:45',
    uptime: 98.2,
    deltaCount: 3,
    scrapedCount: 45,
  },
  {
    id: 'src-ocr-embassy',
    name: 'Embassy Notice Board OCR Vision Agent',
    url: 'https://islamabad.diplo.de/pk-en/noticeboard-ocr',
    type: 'ocr_noticeboard',
    status: 'degraded',
    lastScraped: '2026-07-23 15:10',
    uptime: 94.1,
    deltaCount: 2,
    scrapedCount: 19,
  },
];

export const INITIAL_ANOMALIES: AnomalyAlert[] = [
  {
    id: 'anom-01',
    scholarshipId: 'sch-turkiye-burslari',
    scholarshipTitle: 'Türkiye Burslari Government Scholarship',
    severity: 'medium',
    reason: '3 users reported a dead portal link for the medical stream sub-page. Trust score adjusted temporarily from 98 to 95.',
    detectedAt: '2026-07-21 14:20',
    status: 'investigating'
  },
  {
    id: 'anom-02',
    scholarshipId: 'sch-fulbright-us',
    scholarshipTitle: 'Fulbright Master’s & PhD Program',
    severity: 'low',
    reason: 'Unusually high traffic surge (+340%) following USEFP Facebook live session announcement.',
    detectedAt: '2026-07-22 09:15',
    status: 'resolved'
  }
];

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-01',
    author: 'Zainab Ahmed',
    verifiedAlumni: true,
    alumniBadge: "Chevening Scholar '25 @ Oxford University",
    university: 'University of Oxford',
    country: 'United Kingdom',
    title: 'How I structured my Chevening Leadership & Networking essays with 2 years PK experience',
    content: `When applying from Pakistan, many applicants struggle to demonstrate 'Leadership' if they don't have a managerial job title. Here's how I framed my leadership: 1) Leading student societies at NUST, 2) Initiating an open-source data project for flood relief in Sindh, and 3) Mentoring junior engineers at Systems Ltd. Chevening values impact over title!`,
    likes: 142,
    commentsCount: 38,
    createdAt: '2026-07-18',
    tags: ['Chevening', 'Leadership Essay', 'UK', 'Verified Alumni']
  },
  {
    id: 'post-02',
    author: 'Dr. Bilal Qureshi',
    verifiedAlumni: true,
    alumniBadge: "DAAD EPOS Fellow '24 @ TU Munich",
    university: 'TU Munich',
    country: 'Germany',
    title: 'HEC Degree Attestation & MoFA Checklist for German Embassy Visa Appointments in Islamabad',
    content: `Crucial update for Pakistani DAAD candidates: Ensure your HEC attestation has the QR code sticker, and MoFA attestation is done within 6 months of your visa interview date at the German Embassy Islamabad. Book your VFS appointment as soon as you get your admission letter!`,
    likes: 215,
    commentsCount: 56,
    createdAt: '2026-07-15',
    tags: ['DAAD', 'Germany Visa', 'HEC Attestation', 'Islamabad Embassy']
  },
  {
    id: 'post-03',
    author: 'Sana Fatima',
    verifiedAlumni: true,
    alumniBadge: "Erasmus Mundus Scholar '25 (BDMA Consortium)",
    university: 'UPC Barcelona & ULB Brussels',
    country: 'European Union',
    title: 'Is IELTS 6.5 enough for Erasmus Mundus BDMA or Big Data programs?',
    content: `Yes! I applied with IELTS 6.5 (Reading 7.0, Listening 6.5, Writing 6.5, Speaking 6.0). The most critical part is showing strong math & CS foundations in your Europass CV and aligning your motivation letter with the specific university modules.`,
    likes: 98,
    commentsCount: 19,
    createdAt: '2026-07-10',
    tags: ['Erasmus Mundus', 'IELTS', 'Computer Science']
  }
];

export const COUNTRY_GUIDES: CountryGuide[] = [
  {
    code: 'DE',
    name: 'Germany',
    flag: '🇩🇪',
    avgLivingCost: '€934 / month (Sperrkonto / Blocked Account requirement)',
    visaType: 'National Visa (Category D) - Student / Scholar',
    topUniversities: ['TU Munich', 'LMU Munich', 'RWTH Aachen', 'TU Berlin', 'Heidelberg University'],
    hecAttestationSteps: [
      'Step 1: Apply online on HEC e-portal (eservices.hec.gov.pk).',
      'Step 2: Walk-in or courier degree + transcript to HEC regional office (Islamabad/Lahore/Karachi/Peshawar/Quetta).',
      'Step 3: MoFA (Ministry of Foreign Affairs) stamp on attested documents.',
      'Step 4: German Embassy VFS Global document verification.'
    ],
    aiSummary: 'Germany offers tuition-free public university education for international students. The DAAD EPOS & Deutschlandstipendium cover full living stipends. Post-study work visa is valid for 18 months.',
    faqs: [
      { question: 'Do I need German language proficiency for English-taught Masters?', answer: 'No, but basic A1/A2 German is strongly recommended for daily life and student job search.' },
      { question: 'Is Blocked Account (Sperrkonto) needed if I have a DAAD scholarship?', answer: 'No! Your official DAAD Award Letter serves as proof of financial support for visa issuance.' }
    ]
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    avgLivingCost: '£1,023 / month (£1,334 / month in London)',
    visaType: 'Student Visa (formerly Tier 4) + Graduate Route (2-year PSW)',
    topUniversities: ['University of Oxford', 'University of Cambridge', 'Imperial College London', 'UCL', 'University of Edinburgh'],
    hecAttestationSteps: [
      'Step 1: HEC Degree Attestation on official portal.',
      'Step 2: IBCC attestation for Matric / FSC certificates.',
      'Step 3: Tuberculosis (TB) Medical Test at designated IOM clinics in Pakistan.',
      'Step 4: VFS Global UK Visa Application Submission.'
    ],
    aiSummary: '1-year Master’s degree duration makes UK highly efficient. Chevening & Commonwealth cover 100% of costs. 2-year Graduate Route allows work experience post-graduation.',
    faqs: [
      { question: 'Can I apply for Chevening before getting a university offer?', answer: 'Yes! You select 3 courses during Chevening application and submit unconditional offers later in the process.' },
      { question: 'What is the TB test requirement for Pakistani applicants?', answer: 'Pakistani citizens applying for UK visas over 6 months must obtain a TB certificate from an IOM Pakistan clinic.' }
    ]
  },
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    avgLivingCost: '$1,500 - $2,500 / month depending on state',
    visaType: 'J-1 Visa for Fulbright Scholars / F-1 Student Visa',
    topUniversities: ['MIT', 'Stanford University', 'Harvard University', 'UC Berkeley', 'Carnegie Mellon'],
    hecAttestationSteps: [
      'Step 1: HEC Attestation of BS/MS degrees.',
      'Step 2: WES / ECE Evaluation if university requests US credit conversion.',
      'Step 3: USEFP Fulbright interview or direct university I-20 issuance.',
      'Step 4: US Embassy DS-160 & Visa Interview.'
    ],
    aiSummary: 'Fulbright US is the largest funding body in Pakistan. Covers tuition, health, living stipends, and flights. OPT (Optional Practical Training) grants up to 3 years post-grad work authorization in STEM fields.',
    faqs: [
      { question: 'Is GRE compulsory for US universities?', answer: 'Many departments dropped GRE post-2023, but Fulbright Pakistan still requires GRE General for CS/Engineering fields.' },
      { question: 'What is the 2-year home residency requirement for Fulbright J-1 visa?', answer: 'Fulbright scholars must return to Pakistan for 2 years after graduation before acquiring US immigrant status.' }
    ]
  }
];
