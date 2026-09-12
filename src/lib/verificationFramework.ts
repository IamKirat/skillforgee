export type VerificationLevel = 0 | 1 | 2 | 3 | 4 | 5;

export type BadgeColor = 'gray' | 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

export interface LevelDefinition {
  level: VerificationLevel;
  title: string;
  badgeName: string;
  badgeColor: BadgeColor;
  trustScoreRange: [number, number];
  tagline: string;
  description: string;
  evidenceSources: string[];
  requirements: string[];
  styling: {
    bgLight: string;
    borderLight: string;
    textLight: string;
    bgDark: string;
    borderDark: string;
    textDark: string;
    gradient: string;
    glow: string;
  };
}

export const VERIFICATION_LEVELS: Record<VerificationLevel, LevelDefinition> = {
  0: {
    level: 0,
    title: 'Unverified',
    badgeName: 'Unverified',
    badgeColor: 'gray',
    trustScoreRange: [0, 20],
    tagline: 'Skill is merely listed. No supporting evidence found.',
    description: 'Skill is merely listed on profile. No digital footprints, repositories, code samples, or assessments found.',
    evidenceSources: ['Self-Reported List'],
    requirements: ['Skill added to profile', 'No validation performed', 'Zero supporting digital footprint'],
    styling: {
      bgLight: 'bg-slate-100',
      borderLight: 'border-slate-300',
      textLight: 'text-slate-600',
      bgDark: 'dark:bg-slate-800/60',
      borderDark: 'dark:border-slate-700',
      textDark: 'dark:text-slate-400',
      gradient: 'from-slate-400 to-slate-600',
      glow: 'shadow-none',
    },
  },
  1: {
    level: 1,
    title: 'Self Claimed',
    badgeName: 'Self Claimed',
    badgeColor: 'bronze',
    trustScoreRange: [15, 35],
    tagline: 'User manually adds a skill.',
    description: 'User manually claims the skill on their profile or resume. No external validation, code repositories, or benchmarks have been performed.',
    evidenceSources: ['Profile Self-Claim', 'Resume Mention'],
    requirements: ['Profile assertion', 'No validation performed'],
    styling: {
      bgLight: 'bg-amber-50',
      borderLight: 'border-amber-300',
      textLight: 'text-amber-800',
      bgDark: 'dark:bg-amber-950/40',
      borderDark: 'dark:border-amber-800/60',
      textDark: 'dark:text-amber-300',
      gradient: 'from-amber-600 to-amber-800',
      glow: 'shadow-amber-500/10',
    },
  },
  2: {
    level: 2,
    title: 'Git Verified',
    badgeName: 'Git Verified',
    badgeColor: 'silver',
    trustScoreRange: [40, 65],
    tagline: 'GitHub repositories imported and analyzed.',
    description: 'Candidate connected GitHub. Public repositories, code commits, languages, and pull requests have been imported and analyzed by the verification engine.',
    evidenceSources: ['GitHub Repositories', 'Public Code Commits', 'Pull Requests', 'Language Breakdown'],
    requirements: [
      'GitHub account connected & synced',
      'Public repositories analyzed for code contributions',
      'Verified commits and exposure calculated',
    ],
    styling: {
      bgLight: 'bg-slate-50',
      borderLight: 'border-slate-400',
      textLight: 'text-slate-800',
      bgDark: 'dark:bg-slate-800/80',
      borderDark: 'dark:border-slate-600',
      textDark: 'dark:text-slate-200',
      gradient: 'from-slate-300 via-slate-400 to-slate-600',
      glow: 'shadow-slate-400/20',
    },
  },
  3: {
    level: 3,
    title: 'Evidence Verified',
    badgeName: 'Evidence Verified',
    badgeColor: 'gold',
    trustScoreRange: [70, 89],
    tagline: 'Resume-Match analyzes: Resume, Portfolio, LinkedIn, GitHub, Certifications.',
    description: 'Resume-Match engine conducts multi-evidence analysis across Resume, Portfolio projects, LinkedIn profile, GitHub repositories, and Certifications. Computes Skill Match Score, Evidence Confidence, Project Relevance, and Experience Depth.',
    evidenceSources: ['Resume', 'Portfolio', 'LinkedIn', 'GitHub', 'Certifications'],
    requirements: [
      'Resume-Match multi-source extraction',
      'Evidence Confidence >= 80%',
      'Relevant project portfolio implementations confirmed',
      'Cross-checked against claimed competencies (unsupported claims flagged)',
    ],
    styling: {
      bgLight: 'bg-amber-500/10',
      borderLight: 'border-amber-400',
      textLight: 'text-amber-700',
      bgDark: 'dark:bg-amber-500/10',
      borderDark: 'dark:border-amber-400/60',
      textDark: 'dark:text-amber-400',
      gradient: 'from-amber-400 via-yellow-500 to-amber-600',
      glow: 'shadow-amber-400/30',
    },
  },
  4: {
    level: 4,
    title: 'Skill Verified',
    badgeName: 'Skill Verified',
    badgeColor: 'platinum',
    trustScoreRange: [85, 94],
    tagline: 'User passes SkillForge assessment.',
    description: 'Candidate completes and passes a SkillForge practical assessment. Rigorous multi-dimensional sandbox benchmark evaluating Coding, Debugging, System Design, Problem Solving, and Communication.',
    evidenceSources: ['SkillForge Practical Assessment', 'Code Execution Telemetry', 'Multi-Dimensional Benchmark', 'Anti-Cheat Audit'],
    requirements: [
      'Passed SkillForge practical assessment (score >= 70%)',
      'Rigorous evaluation across 5 dimensions: Coding, Debugging, System Design, Problem Solving, Communication',
      'Performance Score, Confidence Score & Percentile Ranking certified',
    ],
    styling: {
      bgLight: 'bg-indigo-50',
      borderLight: 'border-indigo-400',
      textLight: 'text-indigo-700',
      bgDark: 'dark:bg-indigo-950/40',
      borderDark: 'dark:border-indigo-500/50',
      textDark: 'dark:text-indigo-300',
      gradient: 'from-indigo-400 via-purple-400 to-indigo-600',
      glow: 'shadow-indigo-500/25',
    },
  },
  5: {
    level: 5,
    title: 'Industry Proven',
    badgeName: 'Industry Proven',
    badgeColor: 'diamond',
    trustScoreRange: [95, 100],
    tagline: 'Validated through real-world contributions, achievements, open-source work, research, hackathons, or industry experience.',
    description: 'Highest trust tier. Practical assessment passed combined with real-world production contributions, open-source pull requests, hackathon achievements, verified research, or industry experience with peer endorsements.',
    evidenceSources: ['Assessment Passed', 'Real-World Production Contributions', 'Open-Source Pull Requests', 'Hackathon Achievements', 'Research & Industry Experience', 'Peer Endorsements'],
    requirements: [
      'SkillForge Practical Assessment Passed',
      'Real-world production code or open-source repository contributions',
      'Validated hackathon squad endorsement or industry peer review',
      'Maximum platform trust index',
    ],
    styling: {
      bgLight: 'bg-cyan-500/10',
      borderLight: 'border-cyan-400',
      textLight: 'text-cyan-700',
      bgDark: 'dark:bg-cyan-950/40',
      borderDark: 'dark:border-cyan-400/60',
      textDark: 'dark:text-cyan-300',
      gradient: 'from-cyan-400 via-teal-400 to-blue-600',
      glow: 'shadow-cyan-500/30',
    },
  },
};

export interface SupportingProject {
  id: string;
  title: string;
  description: string;
  role: string;
  complexity: 'Low' | 'Medium' | 'High' | 'Production';
  impact: string;
  techStack: string[];
  url?: string;
}

export interface SupportingRepository {
  name: string;
  url: string;
  commitsCount: number;
  stars: number;
  prsMerged: number;
  languages: Record<string, number>;
  lastCommitDate: string;
  description: string;
}

export interface SupportingCertification {
  title: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  verificationUrl?: string;
}

export interface TeamValidationSignal {
  teamName: string;
  hackathon: string;
  role: string;
  feedback: string;
  endorsementBy: string;
}

export interface AssessmentEvaluationBreakdown {
  coding: number;
  debugging: number;
  systemDesign: number;
  problemSolving: number;
  communication: number;
}

export interface AssessmentResultDetails {
  score: number;
  performanceScore: number;
  confidenceScore: number;
  percentile: number;
  verifiedDate: string;
  testCasesPassed: number;
  totalTestCases: number;
  hash: string;
  evaluation: AssessmentEvaluationBreakdown;
}

export interface SkillEvidenceReport {
  skillName: string;
  skillSlug: string;
  category: string;
  verificationLevel: VerificationLevel;
  levelTitle: string;
  badgeName: string;
  badgeColor: BadgeColor;
  trustScore: number;
  confidenceScore: number;
  evidenceConfidence?: number;
  projectsFound?: number;
  repositoriesFound?: number;
  isUnsupported?: boolean;
  unsupportedReason?: string;
  evidenceScore?: number;
  status: 'Verified' | 'Claimed' | 'Unverified';
  skillMaturity: 'Novice' | 'Competent' | 'Proficient' | 'Advanced' | 'Expert' | 'Mastery';
  yearsOfExposure: number;
  lastActiveDate: string;
  evidenceSources: {
    source: string;
    verified: boolean;
    date?: string;
    note?: string;
  }[];
  evidenceFound?: string[];
  supportingProjects: SupportingProject[];
  supportingRepositories: SupportingRepository[];
  supportingCertifications: SupportingCertification[];
  semanticMatch: {
    score: number;
    matchedKeywords: string[];
    contextClustering: string;
    corpusMatched: string[];
    evidenceItems?: string[];
  };
  assessmentResult?: AssessmentResultDetails;
  teamValidation?: TeamValidationSignal[];
  auditSummary: string;
}

export const SKILL_EVIDENCE_DATABASE: Record<string, SkillEvidenceReport> = {
  // =========================================================================
  // 1. REACT: LEVEL 5 — INDUSTRY PROVEN (Diamond)
  // =========================================================================
  react: {
    skillName: 'React',
    skillSlug: 'react',
    category: 'Frontend Engineering',
    verificationLevel: 5,
    levelTitle: 'Level 5 — Industry Proven',
    badgeName: 'Industry Proven',
    badgeColor: 'diamond',
    trustScore: 98,
    confidenceScore: 96,
    evidenceConfidence: 96,
    projectsFound: 5,
    repositoriesFound: 4,
    evidenceScore: 95,
    status: 'Verified',
    skillMaturity: 'Mastery',
    yearsOfExposure: 4.5,
    lastActiveDate: 'Sep 2026',
    evidenceSources: [
      { source: 'Resume', verified: true, date: 'May 2026', note: 'Senior Frontend Developer, Nexus AI' },
      { source: 'GitHub Repositories', verified: true, date: 'Sep 2026', note: '184 commits across 4 repositories' },
      { source: 'Portfolio', verified: true, date: 'Jul 2026', note: 'Production e-commerce & dashboard applications' },
      { source: 'SkillForge Assessment', verified: true, date: 'Sep 9, 2026', note: 'Passed Advanced Component Architecture: 92%' },
      { source: 'Team Validation', verified: true, date: 'Aug 2026', note: 'Endorsed by HackGenesis Squad Lead' },
    ],
    evidenceFound: [
      'Production Component Systems',
      'Custom React 19 Hooks',
      'Virtual DOM Performance Tuning',
      'Cross-Team Design System Integration',
    ],
    supportingProjects: [
      {
        id: 'p-react-01',
        title: 'Nexus Enterprise Design System & UI Kit',
        description: 'Engineered a multi-tenant component library with 40+ accessible primitives in React 19 and Tailwind CSS.',
        role: 'Lead UI Architect',
        complexity: 'Production',
        impact: 'Reduced frontend bundle size by 34% and standardized UI consistency across 8 engineering teams.',
        techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Radix UI', 'Storybook'],
        url: 'https://github.com/alexmorgan/nexus-ui',
      },
      {
        id: 'p-react-02',
        title: 'Real-Time Telemetry & Crypto Asset Terminal',
        description: 'High-frequency dashboard visualizing real-time order books using WebSocket streams and React Canvas.',
        role: 'Full Stack Developer',
        complexity: 'High',
        impact: 'Maintains 60fps rendering under 1,500 state updates per second with zero frame drops.',
        techStack: ['React', 'Next.js 15', 'WebSockets', 'Canvas API', 'Zustand'],
        url: 'https://github.com/alexmorgan/crypto-terminal',
      },
    ],
    supportingRepositories: [
      {
        name: 'alexmorgan/nexus-ui',
        url: 'https://github.com/alexmorgan/nexus-ui',
        commitsCount: 112,
        stars: 240,
        prsMerged: 28,
        languages: { TypeScript: 84, CSS: 12, HTML: 4 },
        lastCommitDate: 'Sep 4, 2026',
        description: 'Modern, accessible UI primitives for next-gen web applications.',
      },
      {
        name: 'alexmorgan/crypto-terminal',
        url: 'https://github.com/alexmorgan/crypto-terminal',
        commitsCount: 72,
        stars: 94,
        prsMerged: 11,
        languages: { TypeScript: 92, JavaScript: 8 },
        lastCommitDate: 'Aug 28, 2026',
        description: 'Real-time financial analytics dashboard with WebSockets.',
      },
    ],
    supportingCertifications: [
      {
        title: 'Meta Certified Frontend Developer Professional Certificate',
        issuer: 'Meta / Coursera',
        issueDate: 'Jan 2025',
        credentialId: 'META-FRONTEND-99214',
        verificationUrl: 'https://coursera.org/verify/META-99214',
      },
    ],
    semanticMatch: {
      score: 95,
      matchedKeywords: ['React 19', 'Hooks', 'Server Actions', 'Virtual DOM', 'State Management', 'Tailwind', 'SSR'],
      contextClustering: 'Advanced Frontend Architecture & Systems Engineering',
      corpusMatched: ['Resume Work Experience', 'Public GitHub Commits', 'SkillForge Sandbox Code Execution'],
      evidenceItems: ['Nexus Enterprise Design System', 'Real-Time Telemetry Terminal', 'Custom React 19 Hooks'],
    },
    assessmentResult: {
      score: 92,
      performanceScore: 92,
      confidenceScore: 96,
      percentile: 96,
      verifiedDate: 'Sep 9, 2026',
      testCasesPassed: 5,
      totalTestCases: 5,
      hash: '0x7c49...32e1',
      evaluation: {
        coding: 95,
        debugging: 94,
        systemDesign: 90,
        problemSolving: 93,
        communication: 88,
      },
    },
    teamValidation: [
      {
        teamName: 'HackGenesis',
        hackathon: 'HackGenesis 2026',
        role: 'Frontend Lead',
        feedback: 'Alex delivered our entire real-time React dashboard 12 hours ahead of schedule with zero UI regressions.',
        endorsementBy: 'Sam K. (Backend Engineer, CodeForge)',
      },
    ],
    auditSummary: 'Highest tier validation attained. Practical assessment passed with top 4% cohort score, combined with active production repositories, merged library PRs, and cross-team hackathon endorsement.',
  },

  // =========================================================================
  // 2. PYTHON: LEVEL 3 — EVIDENCE VERIFIED (Gold)
  // Exact user prompt specification:
  // Skill: Python
  // Trust Score: 89/100
  // Evidence Confidence: 92%
  // Projects Found: 6
  // Repositories Found: 4
  // Verification Level: Level 3 — Evidence Verified
  // =========================================================================
  python: {
    skillName: 'Python',
    skillSlug: 'python',
    category: 'Backend & Data Systems',
    verificationLevel: 3,
    levelTitle: 'Level 3 — Evidence Verified',
    badgeName: 'Evidence Verified',
    badgeColor: 'gold',
    trustScore: 89,
    confidenceScore: 92,
    evidenceConfidence: 92,
    projectsFound: 6,
    repositoriesFound: 4,
    evidenceScore: 92,
    status: 'Verified',
    skillMaturity: 'Advanced',
    yearsOfExposure: 3.8,
    lastActiveDate: 'Sep 2026',
    evidenceSources: [
      { source: 'Resume', verified: true, date: 'Mar 2026', note: 'FastAPI microservices & ML pipelines' },
      { source: 'GitHub', verified: true, date: 'Aug 2026', note: '4 repositories & 148 commits analyzed' },
      { source: 'Portfolio', verified: true, date: 'Feb 2026', note: '6 production projects verified' },
      { source: 'LinkedIn', verified: true, date: 'Jan 2026', note: 'Backend Engineer experience & endorsements' },
      { source: 'Certifications', verified: true, date: 'Nov 2024', note: 'PCAP Python Institute Certified' },
    ],
    evidenceFound: [
      'Data Science Project',
      'Web Scraper & Crawler',
      'AI Research Internship',
      'FastAPI Rate Limiting Microservice',
      'Real-Time Analytics Pipeline',
      'Distributed LRU Cache',
    ],
    supportingProjects: [
      {
        id: 'p-py-01',
        title: 'High-Throughput In-Memory Caching & Analytics Engine',
        description: 'Engineered a production-grade LRU Cache with wall-clock TTL expiration and telemetry tracking.',
        role: 'Backend Developer',
        complexity: 'High',
        impact: 'Achieved 48,000 ops/sec with sub-millisecond p99 latency in sandbox benchmarking.',
        techStack: ['Python 3.12', 'collections.OrderedDict', 'cProfile', 'FastAPI'],
        url: 'https://github.com/alexmorgan/py-lru-engine',
      },
      {
        id: 'p-py-02',
        title: 'Asynchronous Web Scraper & Data Normalizer',
        description: 'Concurrent pipeline scraping 500k product listings with exponential backoff and rotating proxy pools.',
        role: 'Data Engineer',
        complexity: 'Medium',
        impact: 'Extracted 12GB clean dataset utilized in ML recommendation model.',
        techStack: ['Python', 'asyncio', 'httpx', 'BeautifulSoup4', 'Polars'],
        url: 'https://github.com/alexmorgan/async-crawler',
      },
      {
        id: 'p-py-03',
        title: 'REST API Authentication & Rate Limiting Microservice',
        description: 'Token bucket rate limiter middleware with JWT token verification and Redis backing.',
        role: 'API Engineer',
        complexity: 'High',
        impact: 'Defended test gateway against 10,000 req/min simulated DDoS attacks.',
        techStack: ['FastAPI', 'Pydantic v2', 'Redis', 'Pytest'],
        url: 'https://github.com/alexmorgan/fastapi-ratelimit',
      },
    ],
    supportingRepositories: [
      {
        name: 'alexmorgan/py-lru-engine',
        url: 'https://github.com/alexmorgan/py-lru-engine',
        commitsCount: 46,
        stars: 78,
        prsMerged: 8,
        languages: { Python: 94, Dockerfile: 6 },
        lastCommitDate: 'Aug 29, 2026',
        description: 'Low-latency in-memory cache implementation with TTL invalidation.',
      },
      {
        name: 'alexmorgan/fastapi-ratelimit',
        url: 'https://github.com/alexmorgan/fastapi-ratelimit',
        commitsCount: 50,
        stars: 62,
        prsMerged: 5,
        languages: { Python: 100 },
        lastCommitDate: 'Aug 14, 2026',
        description: 'Drop-in rate limiting middleware with sliding window algorithm.',
      },
    ],
    supportingCertifications: [
      {
        title: 'Python Institute Certified Associate in Python Programming (PCAP)',
        issuer: 'Python Institute',
        issueDate: 'Nov 2024',
        credentialId: 'PCAP-31-03-8821',
        verificationUrl: 'https://verify.pythoninstitute.org/cert/8821',
      },
    ],
    semanticMatch: {
      score: 92,
      matchedKeywords: ['asyncio', 'collections', 'Type Hints', 'OrderedDict', 'FastAPI', 'Memory Profiling', 'Pytest'],
      contextClustering: 'High-Throughput Backend & Systems Engineering',
      corpusMatched: ['Resume Work Experience', 'GitHub Repositories', 'Passed SkillForge Assessment Telemetry'],
      evidenceItems: ['Data Science Project', 'Web Scraper', 'AI Research Internship'],
    },
    assessmentResult: {
      score: 88,
      performanceScore: 88,
      confidenceScore: 94,
      percentile: 91,
      verifiedDate: 'Sep 5, 2026',
      testCasesPassed: 4,
      totalTestCases: 4,
      hash: '0x3a19...90cf',
      evaluation: {
        coding: 94,
        debugging: 92,
        systemDesign: 88,
        problemSolving: 90,
        communication: 86,
      },
    },
    teamValidation: [
      {
        teamName: 'NeuralSync',
        hackathon: 'HackGenesis 2026',
        role: 'Data Engineer',
        feedback: 'Alex built the FastAPI backend and ingestion script that fed our neural network in real-time.',
        endorsementBy: 'Maya L. (Lead Architect)',
      },
    ],
    auditSummary: 'Certified through live SkillForge code execution and repository analysis. Demonstrates idiomatic Python, memory management, and data structures. Evaluation across Coding, Debugging, System Design, Problem Solving, and Communication ranked in the 91st percentile.',
  },

  // =========================================================================
  // RUBY: LEVEL 3 — EVIDENCE VERIFIED (Blue)
  // =========================================================================
  ruby: {
    skillName: 'Ruby',
    skillSlug: 'ruby',
    category: 'Backend Engineering',
    verificationLevel: 3,
    levelTitle: 'Level 3 — Evidence Verified',
    badgeName: 'Evidence Verified',
    badgeColor: 'silver',
    trustScore: 86,
    confidenceScore: 88,
    evidenceConfidence: 88,
    projectsFound: 3,
    repositoriesFound: 2,
    evidenceScore: 86,
    status: 'Verified',
    skillMaturity: 'Advanced',
    yearsOfExposure: 2.8,
    lastActiveDate: 'Sep 2026',
    isUnsupported: false,
    evidenceSources: [
      { source: 'Resume', verified: true, date: 'Sep 2026', note: 'Ruby on Rails microservices and webhook processor' },
      { source: 'GitHub Repositories', verified: true, date: 'Aug 2026', note: 'rails-api-boilerplate (48 commits)' },
      { source: 'Portfolio', verified: true, date: 'Jul 2026', note: 'Ruby on Rails microservices platform' },
      { source: 'LinkedIn Profile', verified: true, date: 'Sep 2026', note: 'Backend developer endorsements' },
    ],
    supportingProjects: [
      {
        id: 'proj-ruby-rails',
        title: 'Ruby on Rails Microservices Platform',
        description: 'Production e-commerce and checkout API built with Ruby on Rails 7, Sidekiq queues, and PostgreSQL.',
        techStack: ['Ruby', 'Rails', 'PostgreSQL', 'Redis'],
        role: 'Lead Backend Developer',
        complexity: 'Production',
        impact: 'Processed 500k+ webhook events with 99.9% uptime',
        url: 'https://github.com/alexmorgan/rails-api-boilerplate',
      },
    ],
    supportingRepositories: [
      {
        name: 'rails-api-boilerplate',
        description: 'Production-ready Ruby on Rails 7 API with Devise JWT and PostgreSQL.',
        languages: { Ruby: 84, Shell: 10, Dockerfile: 6 },
        commitsCount: 48,
        stars: 22,
        prsMerged: 12,
        url: 'https://github.com/alexmorgan/rails-api-boilerplate',
        lastCommitDate: 'Aug 2026',
      },
    ],
    supportingCertifications: [
      {
        title: 'Ruby on Rails Web Architecture Specialist',
        issuer: 'The Odin Project / Ruby Association',
        issueDate: 'May 2025',
        credentialId: 'ROA-RUBY-9912',
      },
    ],
    semanticMatch: {
      score: 88,
      matchedKeywords: ['Ruby', 'Rails', 'ActiveRecord', 'Sidekiq', 'RSpec', 'Gems'],
      contextClustering: 'Backend Microservices & API Architecture',
      corpusMatched: ['Resume Work Experience', 'GitHub Repositories', 'Portfolio Projects'],
    },
    auditSummary: 'Verified by Resume-Match across resume work history, GitHub repository (rails-api-boilerplate), and portfolio architecture documentation. Supported by 3 projects and 2 repositories.',
  },

  // =========================================================================
  // 3. MACHINE LEARNING: LEVEL 3 — SEMANTIC VERIFIED (Gold)
  // Exact user prompt specification:
  // Claims: Machine Learning
  // Evidence: ✓ KNN Project ✓ Decision Tree Project ✓ Orange Data Mining ✓ AI Coursework
  // Semantic Match: 84%
  // Badge: Gold
  // Trust Score: 60–80 (74)
  // Confidence: 84%
  // =========================================================================
  'machine-learning': {
    skillName: 'Machine Learning',
    skillSlug: 'machine-learning',
    category: 'Artificial Intelligence & Data Science',
    verificationLevel: 3,
    levelTitle: 'Level 3 — Semantic Verified',
    badgeName: 'Semantic Verified',
    badgeColor: 'gold',
    trustScore: 74,
    confidenceScore: 84,
    evidenceScore: 82,
    status: 'Verified',
    skillMaturity: 'Proficient',
    yearsOfExposure: 2.2,
    lastActiveDate: 'Jul 2026',
    evidenceSources: [
      { source: 'Resume', verified: true, date: 'May 2026', note: 'AI Research Assistant & coursework listed' },
      { source: 'GitHub Repositories', verified: true, date: 'Jul 2026', note: 'KNN and Decision Tree code repositories validated' },
      { source: 'Documentation & Reports', verified: true, date: 'Jun 2026', note: 'Orange Data Mining project reports and clustering notes' },
      { source: 'Technical Blogs & Coursework', verified: true, date: 'Apr 2026', note: 'AI Coursework lab submissions and mathematical derivations' },
    ],
    evidenceFound: [
      'KNN Project',
      'Decision Tree Project',
      'Orange Data Mining',
      'AI Coursework',
    ],
    supportingProjects: [
      {
        id: 'p-ml-01',
        title: 'Algorithmic KNN & Decision Tree Classifier from Scratch',
        description: 'Implemented K-Nearest Neighbors and CART Decision Trees in pure NumPy to benchmark against scikit-learn.',
        role: 'Academic Researcher',
        complexity: 'Medium',
        impact: 'Matched scikit-learn accuracy on Iris and Wine benchmark sets with custom Euclidean distance matrix.',
        techStack: ['Python', 'NumPy', 'Math'],
        url: 'https://github.com/alexmorgan/ml-algorithms-scratch',
      },
      {
        id: 'p-ml-02',
        title: 'Customer Segmentation via Orange Data Mining',
        description: 'Hierarchical clustering and t-SNE visualization of customer demographic purchase patterns using Orange workflows.',
        role: 'Data Analyst',
        complexity: 'Medium',
        impact: 'Identified 4 distinct purchasing clusters for retail case competition.',
        techStack: ['Orange Data Mining', 'k-Means', 'PCA', 'Python'],
      },
      {
        id: 'p-ml-03',
        title: 'Credit Card Fraud Classification Model',
        description: 'Imbalanced classification model utilizing Random Forests and XGBoost with SMOTE oversampling.',
        role: 'ML Developer',
        complexity: 'High',
        impact: 'Attained 0.94 ROC-AUC on 284,000 transaction dataset.',
        techStack: ['Scikit-Learn', 'XGBoost', 'Pandas', 'Matplotlib'],
        url: 'https://github.com/alexmorgan/fraud-detector-ml',
      },
    ],
    supportingRepositories: [
      {
        name: 'alexmorgan/ml-algorithms-scratch',
        url: 'https://github.com/alexmorgan/ml-algorithms-scratch',
        commitsCount: 29,
        stars: 21,
        prsMerged: 2,
        languages: { Python: 95, Shell: 5 },
        lastCommitDate: 'May 12, 2026',
        description: 'From-scratch mathematical implementations of foundational ML algorithms (KNN, CART Decision Trees).',
      },
      {
        name: 'alexmorgan/fraud-detector-ml',
        url: 'https://github.com/alexmorgan/fraud-detector-ml',
        commitsCount: 38,
        stars: 34,
        prsMerged: 3,
        languages: { Python: 89, 'Jupyter Notebook': 11 },
        lastCommitDate: 'Jul 19, 2026',
        description: 'Supervised classification pipeline for imbalanced transaction datasets.',
      },
    ],
    supportingCertifications: [
      {
        title: 'Deep Learning Specialization',
        issuer: 'DeepLearning.AI',
        issueDate: 'Dec 2025',
        credentialId: 'DLAI-ML-49219',
        verificationUrl: 'https://coursera.org/verify/specialization/DLAI-ML-49219',
      },
    ],
    semanticMatch: {
      score: 84,
      matchedKeywords: ['KNN', 'Decision Tree', 'Orange Data Mining', 'AI Coursework', 'Supervised Learning', 'Confusion Matrix', 'ROC-AUC'],
      contextClustering: 'Foundational Supervised Learning & Applied Data Mining',
      corpusMatched: ['Resume Claims: Machine Learning', 'GitHub: /ml-algorithms-scratch', 'Orange Data Mining Reports', 'University AI Coursework'],
      evidenceItems: ['KNN Project', 'Decision Tree Project', 'Orange Data Mining', 'AI Coursework'],
    },
    auditSummary: 'ResumeMatch semantic engine confirms strong conceptual and code alignment (84% semantic match). Digital footprint cross-verifies KNN implementation, Decision Trees, Orange Data Mining workflows, and AI coursework.',
  },

  // =========================================================================
  // 4. GIT: LEVEL 2 — EVIDENCE SUPPORTED (Silver)
  // AI analyzes: Resume, Portfolio, LinkedIn, Certifications, Project Descriptions, Public Contributions
  // Extracts: Skill mentions, Related technologies, Years of exposure, Project complexity
  // Generates: Evidence Score, Confidence Score
  // Trust Score: 40–60 (58)
  // =========================================================================
  git: {
    skillName: 'Git',
    skillSlug: 'git',
    category: 'DevOps & Version Control',
    verificationLevel: 2,
    levelTitle: 'Level 2 — Evidence Supported',
    badgeName: 'Evidence Supported',
    badgeColor: 'silver',
    trustScore: 58,
    confidenceScore: 68,
    evidenceScore: 72,
    status: 'Verified',
    skillMaturity: 'Competent',
    yearsOfExposure: 3.0,
    lastActiveDate: 'Sep 2026',
    evidenceSources: [
      { source: 'Resume', verified: true, date: 'Mar 2026', note: 'Git branching models and CI/CD automation' },
      { source: 'Portfolio', verified: true, date: 'Feb 2026', note: 'Open source project repositories linked' },
      { source: 'LinkedIn', verified: true, date: 'Feb 2026', note: 'Endorsed by 8 engineering colleagues' },
      { source: 'Certifications', verified: true, date: 'Mar 2025', note: 'Linux Foundation Version Control certified' },
      { source: 'Public Contributions', verified: true, date: 'Sep 2026', note: '312 public commits analyzed in the last 12 months' },
    ],
    evidenceFound: [
      'Multi-Branch GitFlow & Trunk CI Automation',
      'Monorepo Subtree & Cherry-Pick Migration',
      '312 Public Contributions across 4 Organizations',
    ],
    supportingProjects: [
      {
        id: 'p-git-01',
        title: 'Multi-Branch GitFlow & Trunk CI Automation',
        description: 'Configured GitHub Actions workflow for linting, testing, and preview deployments on pull requests.',
        role: 'DevOps Integrator',
        complexity: 'Medium',
        impact: 'Cut PR merge cycles from 2 hours to 8 minutes.',
        techStack: ['Git', 'GitHub Actions', 'YAML', 'Docker'],
      },
      {
        id: 'p-git-02',
        title: 'Monorepo Subtree & Cherry-Pick Migration',
        description: 'Consolidated 3 separate client and API repositories into a unified Turborepo while preserving commit history.',
        role: 'System Integrator',
        complexity: 'Medium',
        impact: 'Preserved full 2-year commit ancestry for all modules.',
        techStack: ['Git subtree', 'Git rebase', 'Shell'],
      },
    ],
    supportingRepositories: [
      {
        name: 'alexmorgan/devops-ci-templates',
        url: 'https://github.com/alexmorgan/devops-ci-templates',
        commitsCount: 22,
        stars: 18,
        prsMerged: 4,
        languages: { Shell: 60, YAML: 40 },
        lastCommitDate: 'Jun 10, 2026',
        description: 'Reusable GitHub Actions workflows for Next.js and Python microservices.',
      },
    ],
    supportingCertifications: [
      {
        title: 'Git Version Control Professional',
        issuer: 'Linux Foundation',
        issueDate: 'Mar 2025',
        credentialId: 'LF-GIT-28491',
      },
    ],
    semanticMatch: {
      score: 72,
      matchedKeywords: ['branching strategies', 'interactive rebase', 'cherry-pick', 'merge conflict resolution', 'git hooks'],
      contextClustering: 'Collaborative Version Control & CI/CD Hygiene',
      corpusMatched: ['GitHub Commit History Analysis', 'Resume Work Experience', 'LinkedIn Endorsements'],
      evidenceItems: ['Multi-Branch CI Automation', 'Monorepo Migration', '312 Contributions'],
    },
    auditSummary: 'Automated evidence extraction analyzed 312 commits across public repositories, confirming consistent branch hygiene, commit messaging, and pull request workflows. Evidence score: 72, Confidence: 68%.',
  },

  // =========================================================================
  // 5. NODE.JS: LEVEL 1 — PROFILE CLAIMED (Bronze)
  // User claims the skill in Profile, Bio, Resume. No validation performed.
  // Badge: Bronze
  // Trust Score: 20–40 (32)
  // Confidence: 38%
  // =========================================================================
  nodejs: {
    skillName: 'Node.js',
    skillSlug: 'nodejs',
    category: 'Backend & Runtime Systems',
    verificationLevel: 1,
    levelTitle: 'Level 1 — Profile Claimed',
    badgeName: 'Profile Claimed',
    badgeColor: 'bronze',
    trustScore: 32,
    confidenceScore: 38,
    evidenceScore: 25,
    status: 'Claimed',
    skillMaturity: 'Competent',
    yearsOfExposure: 1.5,
    lastActiveDate: 'Jan 2026',
    evidenceSources: [
      { source: 'Profile', verified: true, date: 'Mar 2026', note: 'Claimed in headline and profile summary' },
      { source: 'Bio', verified: true, date: 'Mar 2026', note: 'Asserts backend JavaScript / Node.js familiarity' },
      { source: 'Resume', verified: true, date: 'Jan 2026', note: 'Listed as secondary backend runtime' },
    ],
    evidenceFound: [
      'Profile Bio Mention',
      'Resume Skills List',
      'No external code repositories validated yet',
    ],
    supportingProjects: [
      {
        id: 'p-node-01',
        title: 'Express REST Boilerplate',
        description: 'Starter Express server template with CORS and basic security headers.',
        role: 'Self-directed Project',
        complexity: 'Low',
        impact: 'Used as sandbox for prototype authentication flows.',
        techStack: ['Node.js', 'Express', 'JavaScript'],
      },
    ],
    supportingRepositories: [],
    supportingCertifications: [],
    semanticMatch: {
      score: 41,
      matchedKeywords: ['express', 'npm', 'package.json', 'node'],
      contextClustering: 'Surface-Level Scripting & Tooling',
      corpusMatched: ['Profile Claim', 'Resume Keywords'],
      evidenceItems: ['Profile Bio', 'Resume Mention'],
    },
    auditSummary: 'User claims skill on profile and resume. No external code validation or practical benchmark performed yet. Candidate is queued for Level 2 evidence extraction or Level 4 assessment.',
  },

  // =========================================================================
  // 6. CLOUD COMPUTING (AWS): LEVEL 0 — UNVERIFIED (Gray)
  // Skill is merely listed. No supporting evidence found.
  // Badge: Gray
  // Trust Score: 0–20 (14)
  // Confidence: 18%
  // =========================================================================
  'cloud-computing': {
    skillName: 'Cloud Computing (AWS)',
    skillSlug: 'cloud-computing',
    category: 'Infrastructure & Cloud Architecture',
    verificationLevel: 0,
    levelTitle: 'Level 0 — Unverified',
    badgeName: 'Unverified',
    badgeColor: 'gray',
    trustScore: 14,
    confidenceScore: 18,
    evidenceScore: 10,
    status: 'Unverified',
    skillMaturity: 'Novice',
    yearsOfExposure: 0.5,
    lastActiveDate: 'Nov 2025',
    evidenceSources: [
      { source: 'Profile Tag', verified: false, note: 'Listed as an interest area on profile' },
    ],
    evidenceFound: [],
    supportingProjects: [],
    supportingRepositories: [],
    supportingCertifications: [],
    semanticMatch: {
      score: 18,
      matchedKeywords: ['aws', 'cloud'],
      contextClustering: 'No Supporting Digital Footprint',
      corpusMatched: ['Listed Tag'],
      evidenceItems: [],
    },
    auditSummary: 'Skill is merely listed on profile. Zero supporting code repositories, documentation, project descriptions, or assessments found. Trust score reflects unverified status.',
  },

  // =========================================================================
  // 7. SOLIDITY: LEVEL 4 — PRACTICAL VERIFIED (Platinum)
  // =========================================================================
  solidity: {
    skillName: 'Solidity',
    skillSlug: 'solidity',
    category: 'Web3 & Distributed Systems',
    verificationLevel: 4,
    levelTitle: 'Level 4 — Practical Verified',
    badgeName: 'Practical Verified',
    badgeColor: 'platinum',
    trustScore: 92,
    confidenceScore: 93,
    evidenceScore: 90,
    status: 'Verified',
    skillMaturity: 'Advanced',
    yearsOfExposure: 2.8,
    lastActiveDate: 'Mar 2026',
    evidenceSources: [
      { source: 'Resume', verified: true, date: 'Feb 2026', note: 'Smart contract security audits & DeFi protocol' },
      { source: 'GitHub', verified: true, date: 'Mar 2026', note: 'EVM bytecode gas optimization repo' },
      { source: 'Portfolio', verified: true, date: 'Feb 2026', note: 'Mainnet contracts deployed' },
      { source: 'Assessment', verified: true, date: 'Mar 2026', note: 'Score: 92% (Top 5% Web3 cohort)' },
    ],
    supportingProjects: [
      {
        id: 'p-sol-01',
        title: 'Reentrancy-Guarded Liquidity Vault',
        description: 'ERC-4626 compliant yield vault with checks-effects-interactions and invariant testing.',
        role: 'Smart Contract Auditor',
        complexity: 'High',
        impact: 'Secured $1.4M simulated TVL during HackGenesis audit.',
        techStack: ['Solidity 0.8.24', 'Foundry', 'Slither'],
      },
    ],
    supportingRepositories: [
      {
        name: 'marcusvance-sec/solidity-vault-core',
        url: 'https://github.com/marcusvance-sec/solidity-vault-core',
        commitsCount: 62,
        stars: 84,
        prsMerged: 6,
        languages: { Solidity: 88, Rust: 12 },
        lastCommitDate: 'Mar 1, 2026',
        description: 'Formally verified ERC-4626 vault with Foundry fuzzing test suite.',
      },
    ],
    supportingCertifications: [],
    semanticMatch: {
      score: 93,
      matchedKeywords: ['reentrancy', 'EIP-712', 'ERC-4626', 'Yul', 'Gas optimization', 'Foundry'],
      contextClustering: 'DeFi Security & EVM Architecture',
      corpusMatched: ['Resume Claims', 'Foundry Test Suite', 'Audit Reports'],
    },
    assessmentResult: {
      score: 92,
      performanceScore: 92,
      confidenceScore: 93,
      percentile: 94,
      verifiedDate: 'Mar 1, 2026',
      testCasesPassed: 5,
      totalTestCases: 5,
      hash: '0x4f12...ba99',
      evaluation: {
        coding: 95,
        debugging: 94,
        systemDesign: 90,
        problemSolving: 92,
        communication: 86,
      },
    },
    auditSummary: 'Passed SkillForge Solidity evaluation testing reentrancy defense, flash loan protection, and gas minimization.',
  },

  // =========================================================================
  // 8. PYTORCH: LEVEL 5 — FIELD PROVEN (Diamond)
  // =========================================================================
  pytorch: {
    skillName: 'PyTorch',
    skillSlug: 'pytorch',
    category: 'Artificial Intelligence & Deep Learning',
    verificationLevel: 5,
    levelTitle: 'Level 5 — Field Proven',
    badgeName: 'Field Proven',
    badgeColor: 'diamond',
    trustScore: 97,
    confidenceScore: 96,
    evidenceScore: 95,
    status: 'Verified',
    skillMaturity: 'Mastery',
    yearsOfExposure: 4.0,
    lastActiveDate: 'Mar 2026',
    evidenceSources: [
      { source: 'Resume', verified: true, date: 'Mar 2026', note: 'AI Research Engineer, LLM finetuning' },
      { source: 'GitHub', verified: true, date: 'Mar 2026', note: 'Distributed DDP training scripts, 240+ stars' },
      { source: 'Assessment', verified: true, date: 'Mar 2026', note: 'SkillForge PyTorch Benchmark: 96%' },
      { source: 'Team Validation', verified: true, date: 'Feb 2026', note: 'Endorsed by HackGenesis Winning Team' },
    ],
    supportingProjects: [
      {
        id: 'p-pt-01',
        title: 'Distributed Multi-GPU LoRA Quantized Fine-Tuner',
        description: 'Engineered PyTorch pipeline leveraging FSDP and bitsandbytes for 70B parameter models.',
        role: 'Research Engineer',
        complexity: 'Production',
        impact: 'Cut training memory by 64% with zero loss degradation.',
        techStack: ['PyTorch 2.4', 'CUDA', 'HuggingFace', 'DeepSpeed'],
      },
    ],
    supportingRepositories: [
      {
        name: 'sarahchen-ai/pytorch-quant-tuner',
        url: 'https://github.com/sarahchen-ai/pytorch-quant-tuner',
        commitsCount: 94,
        stars: 260,
        prsMerged: 14,
        languages: { Python: 91, Cuda: 9 },
        lastCommitDate: 'Mar 8, 2026',
        description: 'High performance quantized training pipeline in PyTorch.',
      },
    ],
    supportingCertifications: [],
    semanticMatch: {
      score: 97,
      matchedKeywords: ['autograd', 'torch.compile', 'DistributedDataParallel', 'FlashAttention', 'CUDA kernels'],
      contextClustering: 'Deep Learning Acceleration & High Performance Computing',
      corpusMatched: ['Research Publications', 'GitHub Open Source', 'Benchmark Logs'],
    },
    assessmentResult: {
      score: 96,
      performanceScore: 96,
      confidenceScore: 96,
      percentile: 99,
      verifiedDate: 'Mar 10, 2026',
      testCasesPassed: 5,
      totalTestCases: 5,
      hash: '0x88bb...2100',
      evaluation: {
        coding: 98,
        debugging: 96,
        systemDesign: 95,
        problemSolving: 97,
        communication: 92,
      },
    },
    teamValidation: [
      {
        teamName: 'AgentX',
        hackathon: 'HackGenesis 2026',
        role: 'AI Lead',
        feedback: 'Sarah fine-tuned our multimodal agent in under 4 hours, scoring 1st place in the AI category.',
        endorsementBy: 'David Z. (Product Lead)',
      },
    ],
    auditSummary: 'Ranked in the 99th percentile across PyTorch autograd, custom CUDA extensions, and distributed tensor parallelism.',
  },
};

export const getSkillEvidenceReport = (skillSlug: string, candidateSkills?: any[]): SkillEvidenceReport => {
  const normalized = skillSlug.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  if (SKILL_EVIDENCE_DATABASE[normalized]) {
    return SKILL_EVIDENCE_DATABASE[normalized];
  }

  // Generate a realistic report based on match
  const fallbackLevel: VerificationLevel =
    normalized.includes('rust') ? 4 :
    normalized.includes('cpp') ? 4 :
    normalized.includes('go') ? 3 :
    normalized.includes('type') ? 4 :
    normalized.includes('dock') ? 3 : 1;

  const def = VERIFICATION_LEVELS[fallbackLevel];
  const trust = Math.floor((def.trustScoreRange[0] + def.trustScoreRange[1]) / 2);

  return {
    skillName: skillSlug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
    skillSlug: normalized,
    category: 'Technical Engineering',
    verificationLevel: fallbackLevel,
    levelTitle: `Level ${fallbackLevel} — ${def.title}`,
    badgeName: def.badgeName,
    badgeColor: def.badgeColor,
    trustScore: trust,
    confidenceScore: fallbackLevel >= 4 ? 92 : fallbackLevel === 3 ? 80 : 65,
    evidenceScore: fallbackLevel >= 4 ? 88 : 60,
    status: fallbackLevel >= 2 ? 'Verified' : 'Claimed',
    skillMaturity: fallbackLevel >= 4 ? 'Advanced' : fallbackLevel === 3 ? 'Proficient' : 'Competent',
    yearsOfExposure: fallbackLevel >= 4 ? 3.0 : 1.8,
    lastActiveDate: 'Aug 2026',
    evidenceSources: [
      { source: 'Resume', verified: true, date: '2026', note: 'Mentioned in project history' },
      { source: 'Profile', verified: true, date: '2026', note: 'Candidate asserted competency' },
      ...(fallbackLevel >= 2 ? [{ source: 'GitHub Repositories', verified: true, date: '2026', note: 'Public code samples analyzed' }] : []),
      ...(fallbackLevel >= 4 ? [{ source: 'Assessment', verified: true, date: '2026', note: 'Practical benchmark completed' }] : []),
    ],
    evidenceFound: [
      `${skillSlug.toUpperCase()} Core Implementation`,
      'Repository code commits',
    ],
    supportingProjects: [
      {
        id: `p-${normalized}-01`,
        title: `${skillSlug.toUpperCase()} Core Implementation`,
        description: `Practical systems implementation and integration module for ${skillSlug}.`,
        role: 'Developer',
        complexity: 'Medium',
        impact: 'Tested and verified through prototype benchmarking.',
        techStack: [skillSlug, 'Git', 'Testing'],
      },
    ],
    supportingRepositories: fallbackLevel >= 2 ? [
      {
        name: `alexmorgan/${normalized}-samples`,
        url: `https://github.com/alexmorgan/${normalized}-samples`,
        commitsCount: 32,
        stars: 14,
        prsMerged: 3,
        languages: { [skillSlug]: 90, Shell: 10 },
        lastCommitDate: 'Aug 10, 2026',
        description: `Reference implementation and algorithms in ${skillSlug}.`,
      },
    ] : [],
    supportingCertifications: [],
    semanticMatch: {
      score: fallbackLevel >= 3 ? 82 : 64,
      matchedKeywords: [normalized, 'architecture', 'implementation', 'testing'],
      contextClustering: 'General Technical Exposure & Application',
      corpusMatched: ['Resume Claims', 'Profile Extraction', 'GitHub Repository Analysis'],
      evidenceItems: [`${skillSlug} Core Implementation`],
    },
    assessmentResult: fallbackLevel >= 4 ? {
      score: 86,
      performanceScore: 86,
      confidenceScore: 92,
      percentile: 88,
      verifiedDate: 'Aug 15, 2026',
      testCasesPassed: 4,
      totalTestCases: 4,
      hash: '0x88ea...11fa',
      evaluation: {
        coding: 90,
        debugging: 88,
        systemDesign: 84,
        problemSolving: 87,
        communication: 82,
      },
    } : undefined,
    auditSummary: `Automated assessment analysis for ${skillSlug}. Level ${fallbackLevel} assigned based on digital footprint correlation.`,
  };
};

/**
 * =========================================================================
 * AI VERIFICATION ENGINE SIMULATOR
 * =========================================================================
 * Evaluates digital footprint across Resume, Portfolio, GitHub, LinkedIn,
 * Practical Assessments, and Team Endorsements to produce a comprehensive
 * verification report matching the next-generation 6-level framework.
 */
export function runAIVerificationEngine(params: {
  skillName: string;
  hasResumeClaim?: boolean;
  resumeEvidenceItems?: string[];
  portfolioProjectsCount?: number;
  githubReposCount?: number;
  publicCommitsCount?: number;
  certificationsCount?: number;
  passedAssessment?: boolean;
  assessmentScore?: number;
  assessmentEvaluation?: AssessmentEvaluationBreakdown;
  hasTeamValidation?: boolean;
  teamFeedback?: string;
  yearsOfExposure?: number;
}): SkillEvidenceReport {
  const normalizedSlug = params.skillName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const years = params.yearsOfExposure ?? 2.5;

  // Determine Level according to strict framework rules:
  // Level 5: Assessment Passed + Real Projects + Team Validation + Peer Endorsement
  // Level 4: Assessment Passed (Coding, Debugging, System Design, Problem Solving, Communication)
  // Level 3: Semantic Verified (ResumeMatch semantic similarity >= 75% across repos, reports, blogs)
  // Level 2: Evidence Supported (AI extracted mentions, related tech, years exposure, project complexity)
  // Level 1: Profile Claimed (User claims in profile/bio/resume, no validation)
  // Level 0: Unverified (Skill merely listed, no evidence)
  let level: VerificationLevel = 0;

  if (params.passedAssessment && params.hasTeamValidation && (params.githubReposCount ?? 0) >= 1) {
    level = 5;
  } else if (params.passedAssessment) {
    level = 4;
  } else if ((params.githubReposCount ?? 0) >= 1 && (params.resumeEvidenceItems?.length ?? 0) >= 2) {
    level = 3;
  } else if ((params.portfolioProjectsCount ?? 0) >= 1 || (params.publicCommitsCount ?? 0) >= 20 || (params.certificationsCount ?? 0) >= 1) {
    level = 2;
  } else if (params.hasResumeClaim) {
    level = 1;
  } else {
    level = 0;
  }

  const def = VERIFICATION_LEVELS[level];

  // Calculate Trust Score based on level range
  let trustScore = 0;
  if (level === 5) {
    trustScore = Math.min(100, Math.max(95, Math.round(95 + ((params.assessmentScore ?? 90) - 75) * 0.2)));
  } else if (level === 4) {
    trustScore = Math.min(94, Math.max(80, Math.round(80 + ((params.assessmentScore ?? 85) - 75) * 0.7)));
  } else if (level === 3) {
    trustScore = 74;
  } else if (level === 2) {
    trustScore = 54;
  } else if (level === 1) {
    trustScore = 32;
  } else {
    trustScore = 14;
  }

  const confidenceScore =
    level === 5 ? 96 :
    level === 4 ? (params.assessmentScore ? Math.min(96, Math.max(88, params.assessmentScore + 4)) : 92) :
    level === 3 ? 84 :
    level === 2 ? 68 :
    level === 1 ? 38 : 18;

  const evidenceSources = [
    {
      source: 'Resume',
      verified: !!params.hasResumeClaim,
      date: '2026',
      note: params.hasResumeClaim ? 'Parsed by SkillForge ATS Skill Extraction' : 'No resume mention found',
    },
    {
      source: 'GitHub',
      verified: (params.githubReposCount ?? 0) > 0 || (params.publicCommitsCount ?? 0) > 0,
      date: '2026',
      note: (params.githubReposCount ?? 0) > 0 ? `${params.githubReposCount} repositories & ${params.publicCommitsCount ?? 45} commits audited` : 'No code repositories found',
    },
    {
      source: 'Portfolio',
      verified: (params.portfolioProjectsCount ?? 0) > 0,
      date: '2026',
      note: (params.portfolioProjectsCount ?? 0) > 0 ? `${params.portfolioProjectsCount} portfolio implementations linked` : 'No portfolio links verified',
    },
    {
      source: 'Assessment',
      verified: !!params.passedAssessment,
      date: '2026',
      note: params.passedAssessment ? `Passed SkillForge Assessment: ${params.assessmentScore ?? 88}%` : 'Assessment pending candidate dispatch',
    },
    ...(level === 5 ? [{
      source: 'Team Validation',
      verified: true,
      date: '2026',
      note: params.teamFeedback || 'Validated by hackathon squad peers',
    }] : []),
  ];

  const defaultEvaluation: AssessmentEvaluationBreakdown = params.assessmentEvaluation || {
    coding: 92,
    debugging: 90,
    systemDesign: 86,
    problemSolving: 88,
    communication: 84,
  };

  const supportingProjects: SupportingProject[] = (params.portfolioProjectsCount ?? 0) > 0 || level >= 2
    ? [
        {
          id: `proj-${normalizedSlug}-01`,
          title: `${params.skillName} Production Service`,
          description: `Engineered end-to-end implementation and architecture utilizing ${params.skillName}.`,
          role: 'Core Engineer',
          complexity: level >= 4 ? 'Production' : 'High',
          impact: 'Benchmarked with continuous integration and integration testing.',
          techStack: [params.skillName, 'Git', 'TypeScript'],
        },
      ]
    : [];

  const supportingRepositories: SupportingRepository[] = (params.githubReposCount ?? 0) > 0
    ? [
        {
          name: `candidate/${normalizedSlug}-service`,
          url: `https://github.com/candidate/${normalizedSlug}-service`,
          commitsCount: params.publicCommitsCount ?? 48,
          stars: 32,
          prsMerged: 5,
          languages: { [params.skillName]: 92, Shell: 8 },
          lastCommitDate: 'Sep 2026',
          description: `Production-grade ${params.skillName} repository with automated CI and unit tests.`,
        },
      ]
    : [];

  const supportingCertifications: SupportingCertification[] = (params.certificationsCount ?? 0) > 0
    ? [
        {
          title: `${params.skillName} Certified Professional`,
          issuer: 'SkillForge Academy & Partner Consortium',
          issueDate: 'Jan 2026',
          credentialId: `SF-${normalizedSlug.toUpperCase()}-7721`,
        },
      ]
    : [];

  return {
    skillName: params.skillName,
    skillSlug: normalizedSlug,
    category: 'Engineering Competency',
    verificationLevel: level,
    levelTitle: `Level ${level} — ${def.title}`,
    badgeName: def.badgeName,
    badgeColor: def.badgeColor,
    trustScore,
    confidenceScore,
    evidenceScore: level >= 4 ? 91 : level === 3 ? 84 : level === 2 ? 68 : 30,
    status: level >= 2 ? 'Verified' : level === 1 ? 'Claimed' : 'Unverified',
    skillMaturity: level === 5 ? 'Mastery' : level === 4 ? 'Advanced' : level === 3 ? 'Proficient' : level === 2 ? 'Competent' : 'Novice',
    yearsOfExposure: years,
    lastActiveDate: 'Sep 2026',
    evidenceSources,
    evidenceFound: params.resumeEvidenceItems || [
      `${params.skillName} Core Implementation`,
      'Repository code commits',
    ],
    supportingProjects,
    supportingRepositories,
    supportingCertifications,
    semanticMatch: {
      score: level >= 4 ? 92 : level === 3 ? 84 : level === 2 ? 68 : 35,
      matchedKeywords: [params.skillName.toLowerCase(), 'architecture', 'optimization', 'testing'],
      contextClustering: 'Contextual Code Demonstration & Technology Footprint',
      corpusMatched: ['Resume Claims', 'GitHub Commit Analysis', 'SkillForge Evaluation Telemetry'],
      evidenceItems: params.resumeEvidenceItems,
    },
    assessmentResult: params.passedAssessment ? {
      score: params.assessmentScore ?? 88,
      performanceScore: params.assessmentScore ?? 88,
      confidenceScore,
      percentile: params.assessmentScore ? Math.min(99, Math.max(80, params.assessmentScore + 3)) : 91,
      verifiedDate: 'Sep 2026',
      testCasesPassed: 5,
      totalTestCases: 5,
      hash: '0x' + Math.random().toString(16).substring(2, 10) + '...verified',
      evaluation: defaultEvaluation,
    } : undefined,
    teamValidation: params.hasTeamValidation ? [
      {
        teamName: 'HackGenesis Squad',
        hackathon: 'HackGenesis 2026',
        role: 'Lead Developer',
        feedback: params.teamFeedback || 'Demonstrated practical competence under tight hackathon sprint deadlines.',
        endorsementBy: 'Engineering Lead',
      },
    ] : undefined,
    auditSummary: `AI Verification Engine evaluated digital footprint across ResumeMatch, AST code extraction, and assessment telemetry. Assigned Level ${level} (${def.badgeName}) with a Trust Score of ${trustScore}/100 and ${confidenceScore}% confidence.`,
  };
}
