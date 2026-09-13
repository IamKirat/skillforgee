'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { Candidate, SkillItem, AssessmentHistoryItem, TeamInvite, Team } from './types';
import { INITIAL_CANDIDATE, MOCK_CANDIDATES, INITIAL_INVITES, MOCK_TEAMS } from './mockData';
import {
  runResumeMatchAnalysis,
  ResumeMatchReport,
  EvidenceInput,
  SAMPLE_RESUME_TEXT,
  SAMPLE_GITHUB_REPOS,
  SAMPLE_PORTFOLIO_PROJECTS,
} from './resumeMatchEngine';
import {
  fetchCandidateFromSupabase,
  fetchTeamsFromSupabase,
  recordAssessmentInSupabase,
  createTeamInviteInSupabase,
} from './supabaseService';

interface ConnectedSources {
  github: boolean;
  resume: boolean;
  portfolio: boolean;
  linkedin: boolean;
}

interface SkillForgeContextType {
  candidate: Candidate;
  allCandidates: Candidate[];
  teams: Team[];
  invites: TeamInvite[];
  isAnalyzingEvidence: boolean;
  latestResumeMatchReport: ResumeMatchReport | null;
  connectedSources: ConnectedSources;
  currentResumeText: string;
  currentGithubUser: string;
  currentGithubRepos: Array<{
    name: string;
    description: string;
    languages: Record<string, number>;
    commitsCount: number;
    stars: number;
  }>;
  currentPortfolioUrl: string;
  currentLinkedinUrl: string;
  setResumeText: (text: string) => void;
  claimSkill: (name: string, category: SkillItem['category']) => void;
  resolveSkillEvidence: (skillName: string) => Promise<void>;
  removeClaimedSkill: (skillName: string) => Promise<void>;
  recordAssessmentResult: (skillSlug: string, score: number) => void;
  updateProfile: (updated: Partial<Candidate>) => void;
  respondToInvite: (inviteId: string, accept: boolean) => void;
  sendTeamInvite: (candidateUsername: string, teamName: string, role: string, note: string) => void;
  triggerResumeMatchAnalysis: (overrideInput?: Partial<EvidenceInput>) => Promise<ResumeMatchReport>;
  connectGitHub: (username: string) => Promise<void>;
  uploadEvidenceDocument: (type: 'resume' | 'portfolio' | 'linkedin', content?: string) => Promise<void>;
  resetToDefault: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  hideToast: () => void;
}

const SkillForgeContext = createContext<SkillForgeContextType | undefined>(undefined);

const STORAGE_KEY = 'skillforge_candidate_state_v3';
const INVITES_KEY = 'skillforge_invites_state_v3';
const REPORT_KEY = 'skillforge_resumematch_report_v3';
const RESUME_KEY = 'skillforge_resume_text_v3';
const GITHUB_USER_KEY = 'skillforge_github_user_v3';

export function SkillForgeProvider({ children }: { children: React.ReactNode }) {
  const [candidate, setCandidate] = useState<Candidate>(INITIAL_CANDIDATE);
  const [invites, setInvites] = useState<TeamInvite[]>(INITIAL_INVITES);
  const [teams, setTeams] = useState<Team[]>(MOCK_TEAMS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  
  // Dynamic Resume & Footprint States
  const [currentResumeText, setCurrentResumeText] = useState<string>(SAMPLE_RESUME_TEXT);
  const [currentGithubUser, setCurrentGithubUser] = useState<string>('alexmorgan');
  const [currentGithubRepos, setCurrentGithubRepos] = useState(SAMPLE_GITHUB_REPOS);
  const [currentPortfolioProjects, setCurrentPortfolioProjects] = useState(SAMPLE_PORTFOLIO_PROJECTS);
  const [currentPortfolioUrl, setCurrentPortfolioUrl] = useState('https://alexmorgan.dev');
  const [currentLinkedinUrl, setCurrentLinkedinUrl] = useState('https://linkedin.com/in/alexmorgan-dev');

  // Resume-Match engine state
  const [isAnalyzingEvidence, setIsAnalyzingEvidence] = useState(false);
  const [latestResumeMatchReport, setLatestResumeMatchReport] = useState<ResumeMatchReport | null>(null);
  const [connectedSources, setConnectedSources] = useState<ConnectedSources>({
    github: true,
    resume: true,
    portfolio: true,
    linkedin: true,
  });

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCandidate = localStorage.getItem(STORAGE_KEY);
      if (savedCandidate) {
        setCandidate(JSON.parse(savedCandidate));
      }
      const savedInvites = localStorage.getItem(INVITES_KEY);
      if (savedInvites) {
        setInvites(JSON.parse(savedInvites));
      }
      const savedResume = localStorage.getItem(RESUME_KEY);
      if (savedResume) {
        setCurrentResumeText(savedResume);
      }
      const savedGithubUser = localStorage.getItem(GITHUB_USER_KEY);
      if (savedGithubUser) {
        setCurrentGithubUser(savedGithubUser);
      }
      const savedReport = localStorage.getItem(REPORT_KEY);
      if (savedReport) {
        setLatestResumeMatchReport(JSON.parse(savedReport));
      } else {
        // Initial baseline run
        const initialReport = runResumeMatchAnalysis({
          resumeText: savedResume || SAMPLE_RESUME_TEXT,
          githubRepos: SAMPLE_GITHUB_REPOS,
          portfolioProjects: SAMPLE_PORTFOLIO_PROJECTS,
          claimedSkills: INITIAL_CANDIDATE.skills.map(s => s.name),
        });
        setLatestResumeMatchReport(initialReport);
      }
    } catch (e) {
      console.warn('Failed to parse localStorage', e);
    }
    setIsHydrated(true);

    // Live Supabase Sync on Mount
    fetchCandidateFromSupabase('alex')
      .then(res => {
        if (res.profile && res.skills.length > 0) {
          setCandidate(prev => {
            const dbSkills: SkillItem[] = res.skills.map(s => {
              const matchedPrev = prev.skills.find(p => p.name.toLowerCase() === s.name.toLowerCase());
              return {
                id: s.id || matchedPrev?.id || `skill-${s.name.toLowerCase()}`,
                name: s.name,
                slug: s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                category: (s.category || matchedPrev?.category || 'backend') as SkillItem['category'],
                status: (s.trust_score >= 60 ? 'VERIFIED' : 'CLAIMED') as 'VERIFIED' | 'CLAIMED',
                verificationLevel: parseInt(s.level?.match(/\d+/)?.[0] || '3', 10) as any,
                trustScore: s.trust_score,
                confidenceScore: s.evidence_confidence,
                evidenceConfidence: s.evidence_confidence,
                projectsFound: s.projects_found,
                repositoriesFound: s.repositories_found,
                isUnsupported: Boolean(s.is_unsupported),
                unsupportedReason: s.unsupported_reason || undefined,
                skillMaturity: matchedPrev?.skillMaturity || 'Advanced',
                yearsOfExposure: matchedPrev?.yearsOfExposure || 3,
                lastActiveDate: 'Sep 2026',
                level: matchedPrev?.level || 'Advanced',
                evidenceCounts: { projects: s.projects_found, repos: s.repositories_found, certifications: 1 },
                evidenceSources: matchedPrev?.evidenceSources || ['Resume', 'GitHub', 'Portfolio', 'LinkedIn'],
                icon: matchedPrev?.icon || 'Layers',
              };
            });
            return {
              ...prev,
              overallConfidence: res.profile.overall_trust_score || prev.overallConfidence,
              skills: dbSkills,
            };
          });
        }
      })
      .catch(() => {});

    fetchTeamsFromSupabase()
      .then(dbTeams => {
        if (dbTeams.length > 0) setTeams(dbTeams);
      })
      .catch(() => {});
  }, []);

  // Save candidate changes
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(candidate));
    } catch (e) {
      console.error(e);
    }
  }, [candidate, isHydrated]);

  // Save invites changes
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(INVITES_KEY, JSON.stringify(invites));
    } catch (e) {
      console.error(e);
    }
  }, [invites, isHydrated]);

  // Save report changes
  useEffect(() => {
    if (!isHydrated || !latestResumeMatchReport) return;
    try {
      localStorage.setItem(REPORT_KEY, JSON.stringify(latestResumeMatchReport));
    } catch (e) {
      console.error(e);
    }
  }, [latestResumeMatchReport, isHydrated]);

  const setResumeText = (text: string) => {
    setCurrentResumeText(text);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(RESUME_KEY, text);
      } catch (e) {}
    }
  };

  /**
   * Automatic background trigger for Resume-Match engine analysis.
   */
  const triggerResumeMatchAnalysis = async (overrideInput?: Partial<EvidenceInput>): Promise<ResumeMatchReport> => {
    setIsAnalyzingEvidence(true);

    // Simulate realistic background scanning latency (400ms)
    await new Promise(resolve => setTimeout(resolve, 400));

    const claimedSkillNames = candidate.skills.map(s => s.name);
    const resumeToUse = overrideInput?.resumeText !== undefined ? overrideInput.resumeText : currentResumeText;
    const reposToUse = overrideInput?.githubRepos !== undefined ? overrideInput.githubRepos : (connectedSources.github ? currentGithubRepos : []);
    const portfolioToUse = overrideInput?.portfolioProjects !== undefined ? overrideInput.portfolioProjects : (connectedSources.portfolio ? currentPortfolioProjects : []);

    const report = runResumeMatchAnalysis({
      resumeText: resumeToUse,
      githubRepos: reposToUse,
      portfolioProjects: portfolioToUse,
      claimedSkills: claimedSkillNames,
      passedAssessments: {
        react: 92,
        python: 88,
        'machine-learning': 90,
      },
      ...overrideInput,
    });

    setLatestResumeMatchReport(report);

    // Update candidate skills with the newly generated telemetry
    let updatedSkillsToSync: any[] = [];
    setCandidate(prev => {
      const updatedSkills = prev.skills.map(skill => {
        const canonical = skill.name.toLowerCase().replace(/[^a-z0-9+#]+/g, '');
        const detected = report.detectedSkills.find(
          d => d.canonicalKey === canonical || d.displayName.toLowerCase() === skill.name.toLowerCase()
        );

        if (detected) {
          // If already Level 5 or Level 4 verified, keep assessment level but enrich telemetry
          const currentLevel = skill.verificationLevel || 1;
          const assignedLevel = currentLevel >= 4 ? currentLevel : detected.verificationLevel;

          return {
            ...skill,
            evidenceConfidence: detected.evidenceConfidence,
            projectsFound: detected.projectsFound,
            repositoriesFound: detected.repositoriesFound,
            trustScore: skill.trustScore || detected.trustScore,
            verificationLevel: assignedLevel,
            isUnsupported: false,
            unsupportedReason: undefined,
            evidenceCounts: {
              projects: detected.projectsFound,
              repos: detected.repositoriesFound,
              certifications: skill.evidenceCounts?.certifications || 1,
            },
          };
        } else {
          // Unsupported claim! Flag it
          return {
            ...skill,
            isUnsupported: true,
            unsupportedReason: `Skill claimed on profile, but 0 references detected in Resume text, GitHub repositories, or linked projects.`,
            evidenceConfidence: 12,
            projectsFound: 0,
            repositoriesFound: 0,
            trustScore: Math.min(25, skill.trustScore || 18),
            verificationLevel: 1 as const,
          };
        }
      });

      updatedSkillsToSync = updatedSkills;
      return {
        ...prev,
        overallConfidence: report.overallConfidence,
        skills: updatedSkills,
      };
    });

    setIsAnalyzingEvidence(false);
    showToast(`Resume-Match complete: ${report.detectedSkills.length} skills extracted (${report.skillMatchScore}% match, Trust: ${report.overallTrustScore}/100)`);

    // Automated background synchronization with Supabase PostgreSQL
    if (typeof window !== 'undefined' && updatedSkillsToSync.length > 0) {
      fetch('/api/supabase/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skills: updatedSkillsToSync }),
      }).catch(err => console.debug('Supabase sync queued:', err));
    }

    return report;
  };

  /**
   * Connect GitHub and automatically run Resume-Match analysis.
   */
  const connectGitHub = async (username: string) => {
    setConnectedSources(prev => ({ ...prev, github: true }));
    setCurrentGithubUser(username);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(GITHUB_USER_KEY, username);
      } catch (e) {}
    }

    // Dynamic repo generation / fetching based on the username
    let reposForUser = currentGithubRepos;
    try {
      const cleanUser = username.trim().replace(/^@/, '');
      const response = await fetch(`https://api.github.com/users/${encodeURIComponent(cleanUser)}/repos?sort=updated&per_page=6`);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          reposForUser = data.map((r: any) => {
            const langMap: Record<string, number> = r.language
              ? { [String(r.language)]: 85, Shell: 15 }
              : { TypeScript: 60, JavaScript: 40 };
            return {
              name: String(r.name),
              description: String(r.description || `Repository maintained by @${cleanUser}`),
              languages: langMap,
              commitsCount: Math.floor(Math.random() * 80) + 20,
              stars: Number(r.stargazers_count) || 0,
            };
          });
        }
      } else {
        throw new Error('GitHub API rate limited or user not found');
      }
    } catch {
      // Dynamic fallback tailored to username
      const clean = username.trim().toLowerCase().replace(/[^a-z0-9]+/g, '');
      reposForUser = [
        {
          name: `${clean}-core-services`,
          description: `High throughput backend architecture maintained by @${username}`,
          languages: { Python: 82, Go: 12, Dockerfile: 6 },
          commitsCount: 78,
          stars: 14,
        },
        {
          name: `${clean}-web-platform`,
          description: `Next.js and TypeScript frontend application by @${username}`,
          languages: { TypeScript: 74, React: 16, CSS: 10 },
          commitsCount: 95,
          stars: 28,
        },
        {
          name: `ai-data-pipelines`,
          description: `Machine learning model training and ETL pipeline by @${username}`,
          languages: { Python: 90, Jupyter: 10 },
          commitsCount: 52,
          stars: 19,
        },
      ];
    }

    setCurrentGithubRepos(reposForUser);
    showToast(`GitHub @${username} connected (${reposForUser.length} repos parsed). Running Resume-Match evidence audit...`);
    await triggerResumeMatchAnalysis({ githubRepos: reposForUser });
  };

  /**
   * Upload resume / portfolio / LinkedIn and automatically run Resume-Match analysis.
   */
  const uploadEvidenceDocument = async (type: 'resume' | 'portfolio' | 'linkedin', content?: string) => {
    setConnectedSources(prev => ({ ...prev, [type]: true }));

    if (type === 'resume') {
      const text = content || currentResumeText;
      setCurrentResumeText(text);
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(RESUME_KEY, text);
        } catch (e) {}
      }
      showToast(`Resume uploaded & parsed. Running Resume-Match evidence engine...`);
      await triggerResumeMatchAnalysis({ resumeText: text });
    } else if (type === 'portfolio') {
      const url = content || currentPortfolioUrl;
      setCurrentPortfolioUrl(url);
      const dynamicPortfolio = [
        {
          title: `Platform Portfolio (${url.replace(/^https?:\/\//, '').split('/')[0]})`,
          description: `Production web service and real-time data engine verified on ${url}`,
          techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
        },
      ];
      setCurrentPortfolioProjects(dynamicPortfolio);
      showToast(`Portfolio ${url} connected. Running Resume-Match audit...`);
      await triggerResumeMatchAnalysis({ portfolioProjects: dynamicPortfolio });
    } else if (type === 'linkedin') {
      const url = content || currentLinkedinUrl;
      setCurrentLinkedinUrl(url);
      showToast(`LinkedIn profile ${url} verified. Running Resume-Match audit...`);
      await triggerResumeMatchAnalysis();
    }
  };

  const claimSkill = (name: string, category: SkillItem['category']) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const existing = candidate.skills.find(s => s.slug === slug || s.name.toLowerCase() === name.toLowerCase());
    if (existing) return;

    // Check against latest Resume-Match report to see if evidence exists
    const canonical = name.toLowerCase().replace(/[^a-z0-9+#]+/g, '');
    const detectedInReport = latestResumeMatchReport?.detectedSkills.find(
      d => d.canonicalKey === canonical || d.displayName.toLowerCase() === name.toLowerCase()
    );

    const isSupported = !!detectedInReport;

    const newSkill: SkillItem = {
      id: `skill-${Date.now()}`,
      name,
      slug,
      category,
      status: 'CLAIMED',
      verificationLevel: isSupported ? detectedInReport.verificationLevel : 1,
      trustScore: isSupported ? detectedInReport.trustScore : 20,
      confidenceScore: isSupported ? detectedInReport.evidenceConfidence : 25,
      evidenceConfidence: isSupported ? detectedInReport.evidenceConfidence : 15,
      projectsFound: isSupported ? detectedInReport.projectsFound : 0,
      repositoriesFound: isSupported ? detectedInReport.repositoriesFound : 0,
      isUnsupported: !isSupported,
      unsupportedReason: !isSupported
        ? `Skill claimed on profile, but 0 references detected in Resume text, GitHub repositories, or linked projects.`
        : undefined,
      skillMaturity: isSupported ? 'Competent' : 'Novice',
      yearsOfExposure: isSupported ? 1.5 : 0.2,
      lastActiveDate: 'Recent',
      evidenceSources: isSupported ? detectedInReport.evidenceSources : ['Profile Self-Claim'],
      level: 'Intermediate',
    };

    setCandidate(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));

    if (!isSupported) {
      showToast(`Skill "${name}" added as Level 1 (Self Claimed). ⚠️ Flagged: Unsupported claim.`);
    } else {
      showToast(`Skill "${name}" matched in Resume-Match digital footprint! Assigned ${detectedInReport.verificationLevelTitle}.`);
    }
  };

  const resolveSkillEvidence = async (skillName: string) => {
    let updatedSkills: SkillItem[] = [];
    setCandidate(prev => {
      updatedSkills = prev.skills.map(s => {
        if (s.name.toLowerCase() === skillName.toLowerCase() || s.slug.toLowerCase() === skillName.toLowerCase()) {
          return {
            ...s,
            status: 'VERIFIED',
            verificationLevel: 3 as const,
            trustScore: 86,
            confidenceScore: 88,
            evidenceConfidence: 88,
            projectsFound: 3,
            repositoriesFound: 2,
            isUnsupported: false,
            unsupportedReason: undefined,
            skillMaturity: 'Advanced' as const,
            yearsOfExposure: 2.8,
            lastActiveDate: 'Sep 2026',
            level: 'Advanced',
            evidenceCounts: { projects: 3, repos: 2, certifications: 1 },
            evidenceSources: ['Resume', 'GitHub', 'Portfolio', 'LinkedIn'],
          };
        }
        return s;
      });
      return {
        ...prev,
        skills: updatedSkills,
      };
    });

    await triggerResumeMatchAnalysis();
    showToast(`Resolved "${skillName}"! Level 3 — Evidence Verified with 86/100 Trust Score.`);

    if (typeof window !== 'undefined') {
      fetch('/api/supabase/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skills: updatedSkills }),
      }).catch(() => {});
    }
  };

  const removeClaimedSkill = async (skillName: string) => {
    let updatedSkills: SkillItem[] = [];
    setCandidate(prev => {
      updatedSkills = prev.skills.filter(
        s => s.name.toLowerCase() !== skillName.toLowerCase() && s.slug.toLowerCase() !== skillName.toLowerCase()
      );
      return {
        ...prev,
        skills: updatedSkills,
      };
    });

    await triggerResumeMatchAnalysis({
      claimedSkills: updatedSkills.map(s => s.name),
    });

    showToast(`Removed claim "${skillName}". Profile integrity restored.`);

    if (typeof window !== 'undefined') {
      fetch('/api/supabase/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skills: updatedSkills }),
      }).catch(() => {});
    }
  };

  const recordAssessmentResult = (skillSlug: string, score: number) => {
    const passed = score >= 70;
    const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const randomHash = '0x' + Math.random().toString(16).substring(2, 6) + '...' + Math.random().toString(16).substring(2, 6);
    const certId = 'CERT-SF-' + Math.floor(10000 + Math.random() * 90000);

    setCandidate(prev => {
      let updatedSkills = [...prev.skills];
      const existingIndex = updatedSkills.findIndex(s => s.slug === skillSlug);

      if (existingIndex >= 0) {
        updatedSkills[existingIndex] = {
          ...updatedSkills[existingIndex],
          status: passed ? 'VERIFIED' : 'CLAIMED',
          verificationLevel: passed ? 4 : updatedSkills[existingIndex].verificationLevel || 1,
          trustScore: passed ? Math.min(94, Math.max(85, Math.round(score * 0.96))) : (updatedSkills[existingIndex].trustScore || 30),
          confidenceScore: passed ? score : updatedSkills[existingIndex].confidenceScore,
          assessmentScore: score,
          verifiedAt: passed ? new Date().toISOString().split('T')[0] : undefined,
          verificationHash: passed ? randomHash : undefined,
        };
      } else {
        const skillName = skillSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        updatedSkills.push({
          id: `skill-${Date.now()}`,
          name: skillName,
          slug: skillSlug,
          category: 'backend',
          status: passed ? 'VERIFIED' : 'CLAIMED',
          verificationLevel: passed ? 4 : 1,
          trustScore: passed ? Math.min(94, Math.max(85, Math.round(score * 0.96))) : 30,
          confidenceScore: passed ? score : undefined,
          assessmentScore: score,
          verifiedAt: passed ? new Date().toISOString().split('T')[0] : undefined,
          verificationHash: passed ? randomHash : undefined,
          level: 'Advanced',
        });
      }

      const historyItem: AssessmentHistoryItem = {
        id: `hist-${Date.now()}`,
        skillName: updatedSkills.find(s => s.slug === skillSlug)?.name || skillSlug,
        slug: skillSlug,
        score,
        status: passed ? 'Passed' : 'Failed',
        date: dateStr,
        confidenceScore: passed ? score : undefined,
        certificateId: passed ? certId : undefined,
        verificationHash: passed ? randomHash : undefined,
      };

      const newHistory = [historyItem, ...prev.assessmentHistory.filter(h => h.slug !== skillSlug || h.status !== 'Pending')];

      const verified = updatedSkills.filter(s => s.status === 'VERIFIED' && s.confidenceScore !== undefined);
      const totalScore = verified.reduce((acc, curr) => acc + (curr.confidenceScore || 0), 0);
      const avgConfidence = verified.length > 0 ? Math.round(totalScore / verified.length) : prev.overallConfidence;

      return {
        ...prev,
        skills: updatedSkills,
        assessmentHistory: newHistory,
        overallConfidence: avgConfidence,
        verifiedSkillsCount: updatedSkills.filter(s => s.status === 'VERIFIED').length,
      };
    });

    showToast(`Assessment ${passed ? 'Passed' : 'Completed'}: ${score}% on ${skillSlug}. Credential recorded.`);
  };

  const updateProfile = (updated: Partial<Candidate>) => {
    setCandidate(prev => ({ ...prev, ...updated }));
    showToast('Candidate profile updated successfully.');
  };

  const respondToInvite = (inviteId: string, accept: boolean) => {
    setInvites(prev =>
      prev.map(inv =>
        inv.id === inviteId
          ? { ...inv, status: accept ? ('accepted' as const) : ('declined' as const) }
          : inv
      )
    );
    showToast(accept ? 'Team invitation accepted!' : 'Team invitation declined.');
  };

  const sendTeamInvite = (candidateUsername: string, teamName: string, role: string, message: string) => {
    const newInvite: TeamInvite = {
      id: `inv-${Date.now()}`,
      teamId: `team-${Date.now()}`,
      teamName,
      teamAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
      invitedCandidateUsername: candidateUsername,
      role,
      hackathon: 'SkillSprint 2026',
      status: 'pending',
      sentAt: 'Just now',
      message,
    };
    setInvites(prev => [newInvite, ...prev]);
  };

  const resetToDefault = () => {
    setCandidate(INITIAL_CANDIDATE);
    setInvites(INITIAL_INVITES);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(INVITES_KEY);
      localStorage.removeItem(REPORT_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const hideToast = () => {
    setToastMessage(null);
  };

  // Replace candidate in candidates list with reactive candidate
  const allCandidates = MOCK_CANDIDATES.map(c =>
    c.username === candidate.username ? candidate : c
  );

  return (
    <SkillForgeContext.Provider
      value={{
        candidate,
        allCandidates,
        teams,
        invites,
        isAnalyzingEvidence,
        latestResumeMatchReport,
        connectedSources,
        currentResumeText,
        currentGithubUser,
        currentGithubRepos,
        currentPortfolioUrl,
        currentLinkedinUrl,
        setResumeText,
        claimSkill,
        resolveSkillEvidence,
        removeClaimedSkill,
        recordAssessmentResult,
        updateProfile,
        respondToInvite,
        sendTeamInvite,
        triggerResumeMatchAnalysis,
        connectGitHub,
        uploadEvidenceDocument,
        resetToDefault,
        toastMessage,
        showToast,
        hideToast,
      }}
    >
      {children}

      {/* Global Lightweight Notification Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-slate-900/95 border border-[#635BFF]/40 text-white shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-5 duration-200 max-w-lg"
        >
          <div className="w-8 h-8 rounded-xl bg-[#635BFF]/20 border border-[#635BFF]/40 text-[#635BFF] flex items-center justify-center shrink-0 shadow-sm">
            <Sparkles size={16} />
          </div>
          <div className="space-y-0.5 flex-1">
            <p className="text-xs font-semibold text-white tracking-tight leading-snug">{toastMessage}</p>
            <p className="text-[10px] text-slate-400 font-mono">Resume-Match Engine Telemetry</p>
          </div>
          <button
            type="button"
            onClick={hideToast}
            className="text-slate-400 hover:text-white text-xs p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}
    </SkillForgeContext.Provider>
  );
}

export function useSkillForge() {
  const context = useContext(SkillForgeContext);
  if (!context) {
    throw new Error('useSkillForge must be used within a SkillForgeProvider');
  }
  return context;
}
