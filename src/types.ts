export type DegreeLevel = 'Bachelors' | 'Masters' | 'PhD' | 'PostDoc' | 'Research Fellowship';
export type FundingType = 'Fully Funded' | 'Partially Funded' | 'Tuition Waiver' | 'Stipend Only';
export type RegionTenant = 'pakistan' | 'south_asia' | 'global';

export interface ScholarshipSource {
  name: string;
  url: string;
  reliability: number; // 0-100%
  lastVerified: string;
}

export interface TrustHistory {
  date: string;
  score: number;
  reason: string;
}

export interface ScholarshipDelta {
  field: string;
  oldValue: string;
  newValue: string;
  changedAt: string;
}

export interface Scholarship {
  id: string;
  title: string;
  provider: string;
  country: string;
  flag: string;
  degreeLevels: DegreeLevel[];
  fundingType: FundingType;
  stipendAmount: string;
  tuitionCoverage: string;
  deadline: string;
  predictedExpiryDays?: number;
  regionTenant: RegionTenant;
  trustScore: number;
  trustSourcesCount: number;
  isCrossVerified: boolean;
  trustHistory: TrustHistory[];
  sources: ScholarshipSource[];
  deltas: ScholarshipDelta[];
  description: string;
  eligibleNationalities: string[];
  gpaRequirement: number; // e.g. 3.0
  ieltsRequirement: number; // e.g. 6.5
  workExpYearsRequired: number;
  requiredDocuments: string[];
  competitivenessRate: number; // estimated acceptance rate % e.g. 8.5%
  tags: string[];
  officialUrl: string;
  scrapedAt: string;
}

export interface UserProfile {
  name: string;
  email: string;
  citizenship: string;
  targetDegree: DegreeLevel;
  fieldOfStudy: string;
  gpa: number;
  maxGpa: number;
  ieltsScore: number;
  workExpYears: number;
  targetCountries: string[];
  budgetNeed: 'Full Scholarship' | 'Partial OK';
  uploadedCvText: string;
  uploadedDocuments: {
    name: string;
    type: 'SOP' | 'Transcript' | 'Recommendation' | 'IELTS' | 'Passport';
    ready: boolean;
  }[];
}

export interface FactorMatch {
  academicFit: number; // 0-100
  financialFit: number;
  competitivenessFit: number;
  timelineFit: number;
  overallMatch: number;
  counterfactualSuggestion?: string;
  academicReason: string;
  financialReason: string;
  competitivenessReason: string;
  timelineReason: string;
}

export interface SopVersion {
  version: number;
  title: string;
  content: string;
  createdAt: string;
  aiCheckResult?: {
    aiPercentage: number;
    readabilityScore: number;
    burstinessRating: 'Human-like' | 'Slightly Synthetic' | 'High AI Signature';
    flags: string[];
    suggestions: string[];
  };
}

export interface Recommender {
  id: string;
  name: string;
  email: string;
  designation: string;
  institution: string;
  status: 'invited' | 'opened' | 'submitted' | 'verified';
  submittedAt?: string;
}

export interface ApplicationMilestone {
  id: string;
  title: string;
  dueDate: string;
  category: 'SOP' | 'Documents' | 'Recommender' | 'Submission' | 'Interview';
  completed: boolean;
}

export type ApplicationStatus = 'exploring' | 'preparing' | 'submitted' | 'interviewing' | 'accepted' | 'rejected' | 'interested' | 'applied' | 'interview' | 'decision';

export interface TrackedApplication {
  id: string;
  scholarshipId: string;
  status: ApplicationStatus;
  addedAt: string;
  targetDeadline: string;
  milestones: ApplicationMilestone[];
  sopVersions: SopVersion[];
  recommenders: Recommender[];
  deadlineRiskAlert?: string;
}

export interface ScraperSource {
  id: string;
  name: string;
  url: string;
  type: 'web_agent' | 'pdf_parser' | 'ocr_noticeboard';
  status: 'healthy' | 'degraded' | 'failing';
  lastScraped: string;
  uptime: number; // e.g. 99.4
  deltaCount: number;
  scrapedCount: number;
}

export interface AnomalyAlert {
  id: string;
  scholarshipId: string;
  scholarshipTitle: string;
  severity: 'low' | 'medium' | 'high';
  reason: string;
  detectedAt: string;
  status: 'open' | 'investigating' | 'resolved';
}

export interface CommunityPost {
  id: string;
  author: string;
  verifiedAlumni: boolean;
  alumniBadge?: string; // e.g. "Chevening Scholar '24 @ Oxford"
  university: string;
  country: string;
  title: string;
  content: string;
  likes: number;
  commentsCount: number;
  createdAt: string;
  tags: string[];
}

export interface CountryGuide {
  code: string;
  name: string;
  flag: string;
  avgLivingCost: string;
  visaType: string;
  topUniversities: string[];
  hecAttestationSteps: string[];
  aiSummary: string;
  faqs: { question: string; answer: string }[];
}
