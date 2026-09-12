export type SkillStatus = 'VERIFIED' | 'CLAIMED' | 'PENDING';
export type VerificationLevel = 1 | 2 | 3 | 4 | 5;

export interface SkillItem {
  id: string;
  name: string;
  slug: string;
  category: 'frontend' | 'backend' | 'ai' | 'devops' | 'mobile' | 'web3';
  status: SkillStatus;
  verificationLevel?: VerificationLevel; // 1 to 5
  trustScore?: number; // 0 to 100
  confidenceScore?: number; // 0 - 100
  evidenceConfidence?: number; // 0 - 100 (from Resume-Match engine)
  projectsFound?: number; // e.g. 6
  repositoriesFound?: number; // e.g. 4
  isUnsupported?: boolean; // Flagged when claimed without evidence
  unsupportedReason?: string;
  resumeMatchScore?: number; // 0 - 100
  projectRelevanceScore?: number; // 0 - 100
  experienceDepthScore?: number; // 0 - 100
  assessmentScore?: number; // percentage
  verifiedAt?: string;
  verificationHash?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  skillMaturity?: 'Novice' | 'Competent' | 'Proficient' | 'Advanced' | 'Expert' | 'Mastery';
  yearsOfExposure?: number;
  lastActiveDate?: string;
  evidenceCounts?: {
    projects: number;
    repos: number;
    certifications: number;
  };
  evidenceSources?: string[];
  evidenceScore?: number;
  semanticMatchScore?: number;
  assessmentEvaluation?: {
    coding: number;
    debugging: number;
    systemDesign: number;
    problemSolving: number;
    communication: number;
  };
  icon?: string;
}

export interface AssessmentQuestion {
  id: string;
  questionNumber: number;
  title: string;
  type: 'code-debugging' | 'multiple-choice' | 'architecture';
  difficulty: 'Medium' | 'Hard';
  scenario: string;
  codeSnippet?: string;
  language?: string;
  options: {
    id: string;
    label: string;
    text: string;
    explanation?: string;
  }[];
  correctOptionId: string;
  hint?: string;
}

export interface Assessment {
  id: string;
  skillName: string;
  slug: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedMinutes: number;
  totalQuestions: number;
  passThreshold: number; // e.g. 75
  description: string;
  whatIsTested: string[];
  questions: AssessmentQuestion[];
}

export interface AssessmentHistoryItem {
  id: string;
  skillName: string;
  slug: string;
  score: number;
  status: 'Passed' | 'Failed' | 'Pending';
  date: string;
  confidenceScore?: number;
  certificateId?: string;
  verificationHash?: string;
}

export interface Candidate {
  id: string;
  username: string;
  name: string;
  avatar: string;
  role: string;
  university: string;
  bio: string;
  location: string;
  githubUrl: string;
  portfolioUrl: string;
  email: string;
  skills: SkillItem[];
  assessmentHistory: AssessmentHistoryItem[];
  overallConfidence: number;
  verifiedSkillsCount: number;
  lookingForTeam: boolean;
  hackathon: string;
  passportId: string;
  issuedAt: string;
  signature: string;
}

export interface TeamMember {
  id: string;
  candidateId: string;
  name: string;
  username: string;
  avatar: string;
  role: string;
  primarySkill: string;
  confidence: number;
  isLead: boolean;
}

export interface Team {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  hackathon: string;
  avatar: string;
  lookingFor: string[];
  members: TeamMember[];
  skillCoverage: {
    category: string;
    percentage: number;
    skills: string[];
  }[];
  openSpots: number;
}

export interface TeamInvite {
  id: string;
  teamId: string;
  teamName: string;
  teamAvatar: string;
  invitedCandidateUsername: string;
  role: string;
  hackathon: string;
  status: 'pending' | 'accepted' | 'declined';
  sentAt: string;
  message: string;
}

export type { ResumeMatchReport, EvidenceInput, DetectedSkillItem } from './resumeMatchEngine';
