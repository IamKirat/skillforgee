'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Zap,
  Users2,
  ArrowRight,
  Plus,
  FileCheck2,
  ExternalLink,
  Award,
  Sparkles,
  Check,
  AlertCircle,
  Play,
  Layers,
  ChevronRight,
  Mail,
  Info,
  Search,
  Cpu,
  GitBranch,
  Sliders,
  Code2,
  Lock,
  ArrowUpRight,
  Gem,
  RefreshCw,
  Upload,
  Globe,
  FileText,
} from 'lucide-react';
import { useSkillForge } from '@/lib/store';
import { DashboardLayout } from '@/components/DashboardLayout';
import { VerificationBadge } from '@/components/VerificationBadge';
import { EvidenceAuditModal } from '@/components/EvidenceAuditModal';
import { EvidenceUploadModal } from '@/components/EvidenceUploadModal';
import { ResumeMatchAuditModal } from '@/components/ResumeMatchAuditModal';
import { SupabaseStatusBadge } from '@/components/SupabaseStatusBadge';
import {
  getSkillEvidenceReport,
  SkillEvidenceReport,
  VERIFICATION_LEVELS,
  VerificationLevel,
} from '@/lib/verificationFramework';
import { SkillItem } from '@/lib/types';

// The 13 standardized skills for the searchable claim dialog
const PRESET_SKILLS = [
  { name: 'React', slug: 'react', category: 'frontend' as const, level: 'Advanced', description: 'Components, hooks, virtual DOM, and React 19 actions' },
  { name: 'Python', slug: 'python', category: 'backend' as const, level: 'Advanced', description: 'Asyncio, object-oriented design, and data processing' },
  { name: 'JavaScript', slug: 'javascript', category: 'frontend' as const, level: 'Intermediate', description: 'ESNext, event loop, closures, and async promises' },
  { name: 'TypeScript', slug: 'typescript', category: 'frontend' as const, level: 'Advanced', description: 'Generics, utility types, and strict type safety' },
  { name: 'Node.js', slug: 'nodejs', category: 'backend' as const, level: 'Intermediate', description: 'Event-driven I/O, Express/Fastify, and microservices' },
  { name: 'Java', slug: 'java', category: 'backend' as const, level: 'Intermediate', description: 'JVM architecture, Spring Boot, and enterprise OOP' },
  { name: 'C++', slug: 'cpp', category: 'backend' as const, level: 'Advanced', description: 'Memory management, pointers, and high-performance algorithms' },
  { name: 'Git', slug: 'git', category: 'devops' as const, level: 'Intermediate', description: 'Interactive rebase, branching strategies, and conflict resolution' },
  { name: 'Machine Learning', slug: 'machine-learning', category: 'ai' as const, level: 'Advanced', description: 'Model evaluation, overfitting mitigation, and embeddings' },
  { name: 'Data Science', slug: 'data-science', category: 'ai' as const, level: 'Intermediate', description: 'Exploratory data analysis, statistical modeling, and pandas' },
  { name: 'UI/UX', slug: 'ui-ux', category: 'frontend' as const, level: 'Intermediate', description: 'Design systems, accessibility WCAG, and user flows' },
  { name: 'Cloud Computing', slug: 'cloud-computing', category: 'devops' as const, level: 'Advanced', description: 'AWS, containerization, serverless architectures, and CI/CD' },
  { name: 'Cybersecurity', slug: 'cybersecurity', category: 'devops' as const, level: 'Intermediate', description: 'Threat modeling, encryption, OAuth, and web vulnerability testing' },
  { name: 'Ruby', slug: 'ruby', category: 'backend' as const, level: 'Beginner', description: 'Object-oriented programming, Rails, and scripting' },
];

export default function DashboardPage() {
  const router = useRouter();
  const {
    candidate,
    claimSkill,
    resolveSkillEvidence,
    removeClaimedSkill,
    invites,
    isAnalyzingEvidence,
    latestResumeMatchReport,
    connectedSources,
    triggerResumeMatchAnalysis,
  } = useSkillForge();
  
  // Modals state
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [resumeAuditOpen, setResumeAuditOpen] = useState(false);
  const [claimSearch, setClaimSearch] = useState('');
  const [claimedSuccess, setClaimedSuccess] = useState<{
    name: string;
    slug: string;
  } | null>(null);
  const [auditReport, setAuditReport] = useState<SkillEvidenceReport | null>(null);

  // Ladder and filter states
  const [selectedLadderLevel, setSelectedLadderLevel] = useState<VerificationLevel>(3);
  const [tierFilter, setTierFilter] = useState<'ALL' | VerificationLevel>('ALL');

  // Candidate skills sorted by level descending
  const sortedSkills = useMemo(() => {
    return [...candidate.skills].sort((a, b) => {
      const lvlA = a.verificationLevel ?? (a.status === 'VERIFIED' ? 4 : 1);
      const lvlB = b.verificationLevel ?? (b.status === 'VERIFIED' ? 4 : 1);
      return lvlB - lvlA;
    });
  }, [candidate.skills]);

  // Count by level
  const levelCounts = useMemo(() => {
    const counts: Record<VerificationLevel, number> = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    sortedSkills.forEach(s => {
      const lvl = (s.verificationLevel ?? (s.status === 'VERIFIED' ? 4 : 1)) as VerificationLevel;
      counts[lvl] = (counts[lvl] || 0) + 1;
    });
    return counts;
  }, [sortedSkills]);

  // Filtered skills according to user selection
  const displayedSkills = useMemo(() => {
    if (tierFilter === 'ALL') return sortedSkills;
    return sortedSkills.filter(s => {
      const lvl = s.verificationLevel ?? (s.status === 'VERIFIED' ? 4 : 1);
      return lvl === tierFilter;
    });
  }, [sortedSkills, tierFilter]);

  // Unsupported claims count
  const unsupportedCount = useMemo(() => {
    return sortedSkills.filter(s => s.isUnsupported).length;
  }, [sortedSkills]);

  // Filter skills in claim dialog
  const filteredPresetSkills = useMemo(() => {
    return PRESET_SKILLS.filter(s =>
      s.name.toLowerCase().includes(claimSearch.toLowerCase()) ||
      s.description.toLowerCase().includes(claimSearch.toLowerCase()) ||
      s.category.toLowerCase().includes(claimSearch.toLowerCase())
    );
  }, [claimSearch]);

  const handleClaimSpecificSkill = (skill: typeof PRESET_SKILLS[number]) => {
    claimSkill(skill.name, skill.category);
    setClaimedSuccess({ name: skill.name, slug: skill.slug });
  };

  const handleOpenClaimModal = () => {
    setClaimSearch('');
    setClaimedSuccess(null);
    setClaimModalOpen(true);
  };

  const handleOpenAudit = (skillName: string) => {
    const report = getSkillEvidenceReport(skillName, candidate.skills);
    setAuditReport(report);
  };

  // Top stats
  const verifiedCount = sortedSkills.filter(s => (s.verificationLevel ?? 0) >= 2).length;
  const averageTrust = Math.round(
    sortedSkills.reduce((acc, s) => acc + (s.trustScore ?? 50), 0) / (sortedSkills.length || 1)
  );

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto pb-16 text-[#0A0A0A]">
        {/* ========================================================= */}
        {/* 1. TOP HERO SECTION: WELCOME & TRUST IDENTITY             */}
        {/* ========================================================= */}
        <section className="relative overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-subtle">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br from-[#635BFF]/10 via-amber-50/40 to-transparent blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Left: Greetings & Subtitle */}
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#635BFF]/20 bg-[#635BFF]/5 text-[#635BFF] text-xs font-semibold">
                  <span className="flex h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
                  <span>Skill Evidence Engine Active</span>
                  <span className="text-[#6B7280]">•</span>
                  <span className="font-mono text-[#0A0A0A]">Powered by Resume-Match</span>
                </div>
                <SupabaseStatusBadge />
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-[#0A0A0A] tracking-tight">
                Welcome back, {candidate.name.split(' ')[0]} 👋
              </h1>

              <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
                SkillForge integrates <span className="font-semibold text-[#635BFF]">Resume-Match</span> to automatically analyze your Resume, GitHub, Portfolio, and LinkedIn. Digital evidence is cross-referenced against your claimed skills to detect authentic competence and flag unsupported claims.
              </p>

              {/* Trust Score & Profile Completeness Bar */}
              <div className="pt-2 max-w-lg space-y-2">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-[#0A0A0A] flex items-center gap-1.5">
                    <Sparkles size={14} className="text-[#635BFF]" />
                    <span className="font-semibold">SkillForge Trust Index:</span>
                    <span className="font-mono text-[#10B981] font-bold">{averageTrust}/100</span>
                  </span>
                  <span className="font-mono text-xs text-[#635BFF] font-bold">
                    {verifiedCount} of {candidate.skills.length} skills verified
                  </span>
                </div>

                <div className="h-2.5 w-full bg-[#F8FAFC] rounded-full overflow-hidden p-0.5 border border-[#E5E7EB]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#635BFF] via-indigo-500 to-[#10B981] transition-all duration-700"
                    style={{ width: `${Math.min(100, Math.max(20, averageTrust))}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#6B7280]">
                  <span className="flex items-center gap-1">
                    <Info size={12} className="text-[#635BFF]" />
                    <span>Python: Level 3 (Evidence Verified) • 89/100 Trust</span>
                  </span>
                  {unsupportedCount > 0 && (
                    <span className="text-amber-700 font-bold flex items-center gap-1">
                      <AlertCircle size={12} />
                      <span>{unsupportedCount} Unsupported Claim Flagged</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Primary CTAs */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
              {/* Connect Evidence & Run Resume-Match */}
              <button
                type="button"
                onClick={() => setUploadModalOpen(true)}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-[#635BFF] to-[#4F46E5] hover:from-[#5346E0] hover:to-[#4338CA] text-white font-semibold text-sm shadow-subtle hover:shadow-card transition-all cursor-pointer group"
              >
                <Upload size={16} className="text-white group-hover:-translate-y-0.5 transition-transform" />
                <span>Connect Evidence</span>
                <span className="text-[10px] bg-white/20 font-mono px-1.5 py-0.5 rounded font-bold">
                  AUTO
                </span>
              </button>

              {/* View Resume-Match Audit */}
              <button
                type="button"
                onClick={() => setResumeAuditOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#635BFF] border border-[#635BFF]/30 hover:border-[#635BFF] font-semibold text-sm transition-all cursor-pointer shadow-subtle"
              >
                <Sparkles size={15} className="text-[#635BFF]" />
                <span>Resume-Match Audit</span>
              </button>

              {/* Claim Skill */}
              <button
                type="button"
                onClick={handleOpenClaimModal}
                className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-[#F8FAFC] hover:bg-white text-[#0A0A0A] border border-[#E5E7EB] font-medium text-xs transition-all cursor-pointer shadow-subtle"
              >
                <Plus size={14} />
                <span>+ Claim Skill</span>
              </button>

              <Link
                href={`/passport/${candidate.username}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#6B7280] hover:text-[#0A0A0A] border border-[#E5E7EB] font-medium text-xs transition-all shadow-subtle"
              >
                <FileCheck2 size={14} className="text-[#10B981]" />
                <span>View Public Passport</span>
                <ExternalLink size={12} className="text-[#6B7280]" />
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. AUTOMATED RESUME-MATCH EVIDENCE STATUS BAR             */}
        {/* ========================================================= */}
        <section className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10 shrink-0">
              {isAnalyzingEvidence ? (
                <RefreshCw size={20} className="text-[#635BFF] animate-spin" />
              ) : (
                <Cpu size={20} className="text-emerald-400" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  Resume-Match Automated Engine
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                  {isAnalyzingEvidence ? 'ANALYZING FOOTPRINT...' : 'BACKGROUND MONITOR ACTIVE'}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Automatically parses uploaded resumes and GitHub commits in the background to recalculate trust scores.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-200">
              <CheckCircle2 size={13} className="text-emerald-400" />
              <span>GitHub (4 Repos)</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-200">
              <CheckCircle2 size={13} className="text-emerald-400" />
              <span>Resume PDF (Parsed)</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-200">
              <CheckCircle2 size={13} className="text-emerald-400" />
              <span>Portfolio (6 Projects)</span>
            </div>

            <button
              type="button"
              disabled={isAnalyzingEvidence}
              onClick={() => triggerResumeMatchAnalysis()}
              className="px-3.5 py-1.5 rounded-xl bg-[#635BFF] hover:bg-[#5346E0] text-white font-semibold text-xs transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
            >
              <RefreshCw size={12} className={isAnalyzingEvidence ? 'animate-spin' : ''} />
              <span>Re-Scan Footprint</span>
            </button>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. THE 5-TIER VERIFICATION FLOW LADDER                     */}
        {/* ========================================================= */}
        <section className="rounded-3xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-subtle space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#635BFF]/10 text-[#635BFF] text-xs font-semibold mb-1">
                <Layers size={13} />
                <span>5-Tier Verification Architecture</span>
              </div>
              <h2 className="text-xl font-bold text-[#0A0A0A] tracking-tight">
                SkillForge Trust Ladder
              </h2>
              <p className="text-xs text-[#6B7280] mt-0.5">
                Every skill advances through 5 progressive trust stages based on automated Resume-Match evidence and practical assessments.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setResumeAuditOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer self-start md:self-auto"
            >
              <Sparkles size={14} className="text-[#635BFF]" />
              <span>Inspect Resume-Match Telemetry</span>
            </button>
          </div>

          {/* Stepper (5 Tiers) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {([1, 2, 3, 4, 5] as VerificationLevel[]).map(lvl => {
              const def = VERIFICATION_LEVELS[lvl];
              const isSelected = selectedLadderLevel === lvl;
              const countAtLevel = levelCounts[lvl] || 0;

              return (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSelectedLadderLevel(lvl)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 relative overflow-hidden ${
                    isSelected
                      ? 'border-[#635BFF] bg-[#635BFF]/5 ring-2 ring-[#635BFF]/20 shadow-subtle'
                      : 'border-[#E5E7EB] bg-[#F8FAFC] hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#6B7280]">
                      Level {lvl}
                    </span>
                    {countAtLevel > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white border border-[#E5E7EB] text-[#0A0A0A]">
                        {countAtLevel} {countAtLevel === 1 ? 'skill' : 'skills'}
                      </span>
                    )}
                  </div>

                  <div>
                    <VerificationBadge
                      level={lvl}
                      trustScore={(def.trustScoreRange[0] + def.trustScoreRange[1]) / 2}
                      size="sm"
                      showScore={false}
                    />
                  </div>

                  <div className="text-[11px] text-[#6B7280] leading-snug">
                    {def.tagline}
                  </div>

                  <div className="text-[10px] font-mono text-[#635BFF] font-bold">
                    Trust: {def.trustScoreRange[0]}–{def.trustScoreRange[1]}/100
                  </div>

                  {isSelected && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#635BFF]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Selected Ladder Level Details */}
          {(() => {
            const def = VERIFICATION_LEVELS[selectedLadderLevel];
            const skillsInTier = sortedSkills.filter(
              s => (s.verificationLevel ?? (s.status === 'VERIFIED' ? 4 : 1)) === selectedLadderLevel
            );

            return (
              <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-[#E5E7EB]">
                  <div className="flex items-center gap-3">
                    <VerificationBadge
                      level={selectedLadderLevel}
                      trustScore={(def.trustScoreRange[0] + def.trustScoreRange[1]) / 2}
                      size="md"
                    />
                    <div>
                      <h3 className="text-base font-bold text-[#0A0A0A]">
                        Level {selectedLadderLevel} — {def.title}
                      </h3>
                      <p className="text-xs text-[#6B7280]">{def.description}</p>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-[#6B7280]">
                    Trust Score Range: <strong className="text-[#0A0A0A]">{def.trustScoreRange[0]}–{def.trustScoreRange[1]}/100</strong>
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  {/* Column 1: Requirements */}
                  <div className="p-3.5 rounded-xl bg-white border border-[#E5E7EB] space-y-2">
                    <span className="text-[10px] font-mono uppercase text-[#6B7280] font-bold block">
                      Audit Requirements
                    </span>
                    <ul className="space-y-1.5 text-[#0A0A0A]">
                      {def.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 size={13} className="text-[#10B981] shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Column 2: Sources */}
                  <div className="p-3.5 rounded-xl bg-white border border-[#E5E7EB] space-y-2">
                    <span className="text-[10px] font-mono uppercase text-[#6B7280] font-bold block">
                      Evidence Sources Audited
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {def.evidenceSources.map((source, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-[#F8FAFC] border border-[#E5E7EB] text-[11px] font-mono text-[#0A0A0A]"
                        >
                          ✓ {source}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Column 3: Skills at this Tier */}
                  <div className="p-3.5 rounded-xl bg-white border border-[#E5E7EB] space-y-2">
                    <span className="text-[10px] font-mono uppercase text-[#6B7280] font-bold block">
                      Candidate Skills at Level {selectedLadderLevel} ({skillsInTier.length})
                    </span>
                    {skillsInTier.length > 0 ? (
                      <div className="space-y-1.5">
                        {skillsInTier.map(s => (
                          <div
                            key={s.id}
                            className="flex items-center justify-between p-2 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB]"
                          >
                            <span className="font-bold text-xs text-[#0A0A0A]">{s.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-[#635BFF]">
                                {s.trustScore}/100
                              </span>
                              <button
                                type="button"
                                onClick={() => handleOpenAudit(s.name)}
                                className="text-[11px] text-[#635BFF] hover:underline font-semibold cursor-pointer"
                              >
                                Audit →
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-[#6B7280] text-xs py-2">
                        No candidate skills currently at this level.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}
        </section>

        {/* ========================================================= */}
        {/* 4. CANDIDATE SKILLS INVENTORY (EXACT SPEC DISPLAY)        */}
        {/* ========================================================= */}
        <section className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E5E7EB]">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-[#0A0A0A] tracking-tight">
                  Skills Inventory & Verified Telemetry
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#635BFF]/10 text-[#635BFF] border border-[#635BFF]/20">
                  {candidate.skills.length} Competencies
                </span>
              </div>
              <p className="text-xs text-[#6B7280] mt-0.5">
                Every skill displays Trust Score, Evidence Confidence, Projects Found, Repositories Found, and Verification Level.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setTierFilter('ALL')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  tierFilter === 'ALL'
                    ? 'bg-[#0A0A0A] text-white'
                    : 'bg-white border border-[#E5E7EB] text-[#6B7280] hover:text-[#0A0A0A]'
                }`}
              >
                All ({candidate.skills.length})
              </button>
              {([5, 4, 3, 2, 1] as VerificationLevel[]).map(lvl => {
                const count = levelCounts[lvl] || 0;
                if (count === 0 && tierFilter !== lvl) return null;
                const def = VERIFICATION_LEVELS[lvl];
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setTierFilter(lvl)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      tierFilter === lvl
                        ? 'bg-[#635BFF] text-white'
                        : 'bg-white border border-[#E5E7EB] text-[#6B7280] hover:text-[#0A0A0A]'
                    }`}
                  >
                    <span>L{lvl} {def.badgeName}</span>
                    <span className="text-[10px] font-mono px-1 rounded bg-black/10">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid of Exact Telemetry Skill Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedSkills.map(skill => {
              const level = (skill.verificationLevel ?? (skill.status === 'VERIFIED' ? 4 : 1)) as VerificationLevel;
              const def = VERIFICATION_LEVELS[level] || VERIFICATION_LEVELS[1];
              const trustScore = skill.trustScore ?? (level === 5 ? 98 : level === 4 ? 92 : level === 3 ? 89 : level === 2 ? 62 : 30);
              const evidenceConfidence = skill.evidenceConfidence ?? (level === 5 ? 96 : level === 4 ? 90 : level === 3 ? 92 : level === 2 ? 75 : 38);
              const projectsFound = skill.projectsFound ?? (skill.evidenceCounts?.projects || (level >= 3 ? 6 : level === 2 ? 2 : 1));
              const reposFound = skill.repositoriesFound ?? (skill.evidenceCounts?.repos || (level >= 3 ? 4 : level === 2 ? 3 : 0));
              const isUnsupported = !!skill.isUnsupported;

              return (
                <div
                  key={skill.id}
                  className={`rounded-2xl border bg-white p-5 shadow-subtle hover:shadow-card transition-all flex flex-col justify-between space-y-4 group ${
                    isUnsupported
                      ? 'border-amber-400 bg-amber-50/20'
                      : 'border-[#E5E7EB] hover:border-[#635BFF]/50'
                  }`}
                >
                  <div>
                    {/* Header: Skill Name & Verification Badge */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B7280] font-semibold block mb-0.5">
                          {skill.category.toUpperCase()} • {skill.skillMaturity || 'Competent'}
                        </span>
                        <h3 className="text-xl font-bold text-[#0A0A0A] group-hover:text-[#635BFF] transition-colors">
                          {skill.name}
                        </h3>
                      </div>

                      <VerificationBadge
                        level={level}
                        trustScore={trustScore}
                        size="sm"
                        showScore={false}
                      />
                    </div>

                    {/* UNSUPPORTED CLAIM WARNING (If Flagged) */}
                    {isUnsupported && (
                      <div className="p-3 rounded-xl bg-amber-100/70 border border-amber-300 text-amber-900 text-xs space-y-2 mb-4">
                        <div className="flex items-center gap-1.5 font-bold">
                          <AlertCircle size={14} className="text-amber-700 shrink-0" />
                          <span>Unsupported Claim Flagged</span>
                        </div>
                        <p className="text-[11px] leading-relaxed text-amber-800">
                          {skill.unsupportedReason || 'Skill claimed on profile, but 0 references detected in Resume text, GitHub repositories, or linked projects.'}
                        </p>
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => resolveSkillEvidence(skill.name)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
                          >
                            <Sparkles size={11} />
                            <span>Verify Evidence</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => removeClaimedSkill(skill.name)}
                            className="px-2 py-1 rounded-lg bg-white border border-amber-300 hover:bg-amber-100 text-amber-900 text-[11px] font-semibold transition-colors cursor-pointer"
                          >
                            Remove Claim
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Exact User Requested Output Format */}
                    <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] mb-4 text-xs font-mono space-y-1.5">
                      <div className="flex items-center justify-between py-0.5 border-b border-[#E5E7EB]/70">
                        <span className="text-[#6B7280]">Skill:</span>
                        <strong className="text-[#0A0A0A] font-bold">{skill.name}</strong>
                      </div>
                      <div className="flex items-center justify-between py-0.5 border-b border-[#E5E7EB]/70">
                        <span className="text-[#6B7280]">Trust Score:</span>
                        <strong className="text-[#635BFF] font-bold">{trustScore}/100</strong>
                      </div>
                      <div className="flex items-center justify-between py-0.5 border-b border-[#E5E7EB]/70">
                        <span className="text-[#6B7280]">Evidence Confidence:</span>
                        <strong className="text-[#10B981] font-bold">{evidenceConfidence}%</strong>
                      </div>
                      <div className="flex items-center justify-between py-0.5 border-b border-[#E5E7EB]/70">
                        <span className="text-[#6B7280]">Projects Found:</span>
                        <strong className="text-[#0A0A0A]">{projectsFound}</strong>
                      </div>
                      <div className="flex items-center justify-between py-0.5 border-b border-[#E5E7EB]/70">
                        <span className="text-[#6B7280]">Repositories Found:</span>
                        <strong className="text-[#0A0A0A]">{reposFound}</strong>
                      </div>
                      <div className="flex items-center justify-between py-0.5">
                        <span className="text-[#6B7280]">Verification Level:</span>
                        <strong className={`font-bold ${
                          level === 5 ? 'text-cyan-700' :
                          level === 4 ? 'text-indigo-700' :
                          level === 3 ? 'text-amber-700' :
                          level === 2 ? 'text-slate-700' : 'text-amber-800'
                        }`}>
                          Level {level} — {def.badgeName}
                        </strong>
                      </div>
                    </div>

                    {/* Trust Gauge Bar */}
                    <div className="space-y-1 mb-3">
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#6B7280]">
                        <span>Level {level} Trust Gauge</span>
                        <span className="font-semibold text-[#0A0A0A]">{trustScore} pts</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#E5E7EB] rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            level === 5 ? 'bg-gradient-to-r from-cyan-400 to-blue-600' :
                            level === 4 ? 'bg-gradient-to-r from-indigo-500 to-purple-600' :
                            level === 3 ? 'bg-gradient-to-r from-amber-400 to-orange-500' :
                            level === 2 ? 'bg-gradient-to-r from-slate-400 to-slate-600' : 'bg-amber-600'
                          }`}
                          style={{ width: `${Math.min(100, Math.max(10, trustScore))}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom: Audit Proof Graph & Level Up CTA */}
                  <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenAudit(skill.name)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#635BFF] hover:text-[#5346E0] hover:underline cursor-pointer"
                    >
                      <Cpu size={13} />
                      <span>Audit Proof Graph</span>
                    </button>

                    {level === 5 ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-cyan-700 bg-cyan-50 px-2 py-1 rounded-lg border border-cyan-200">
                        <Gem size={12} />
                        <span>Industry Proven</span>
                      </span>
                    ) : level === 4 ? (
                      <button
                        type="button"
                        onClick={() => setUploadModalOpen(true)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-50 hover:bg-cyan-100 text-cyan-700 text-[11px] font-semibold transition-colors cursor-pointer"
                      >
                        <span>Add Open-Source PR</span>
                      </button>
                    ) : level === 3 ? (
                      <Link
                        href={`/assessment/${skill.slug}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[11px] font-semibold transition-colors"
                      >
                        <Play size={10} className="fill-current" />
                        <span>Take Assessment</span>
                      </Link>
                    ) : level === 2 ? (
                      <button
                        type="button"
                        onClick={() => setUploadModalOpen(true)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-[11px] font-semibold transition-colors cursor-pointer"
                      >
                        <span>Upload Resume/Portfolio</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setUploadModalOpen(true)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-semibold transition-colors cursor-pointer"
                      >
                        <span>Connect GitHub</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. RESUME-MATCH ANALYSIS DRAWER & EXTRACTION REPORT       */}
        {/* ========================================================= */}
        {latestResumeMatchReport && (
          <section className="rounded-3xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-subtle space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E5E7EB]">
              <div>
                <h2 className="text-lg font-bold text-[#0A0A0A] tracking-tight flex items-center gap-2">
                  <Sparkles size={16} className="text-[#635BFF]" />
                  <span>Resume-Match Technology Extraction</span>
                </h2>
                <p className="text-xs text-[#6B7280] mt-0.5">
                  Extracted from candidate resume text, GitHub repository language breakdowns, and project tags.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setResumeAuditOpen(true)}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#635BFF] hover:underline cursor-pointer"
              >
                <span>View Full Comparison Table →</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(latestResumeMatchReport.technologyExtraction).slice(0, 3).map(([domain, skills]) => (
                <div key={domain} className="p-4 rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] space-y-2">
                  <span className="text-[10px] font-mono uppercase text-[#6B7280] font-bold block">
                    {domain} ({skills.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map(skill => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md bg-white border border-[#E5E7EB] text-xs font-mono font-medium text-[#0A0A0A]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================= */}
        {/* 6. ASSESSMENT HISTORY SECTION                             */}
        {/* ========================================================= */}
        <section className="space-y-4">
          <div className="pb-2 border-b border-[#E5E7EB] flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#0A0A0A] tracking-tight">
                Assessment History & Proof Audit
              </h2>
              <p className="text-xs text-[#6B7280]">
                Cryptographic audit trail of all standardized practical benchmarks taken on SkillForge.
              </p>
            </div>

            <span className="text-xs font-mono text-[#10B981] font-semibold flex items-center gap-1.5">
              <Lock size={12} />
              <span>ECDSA Tamper-Resistant</span>
            </span>
          </div>

          <div className="rounded-2xl bg-white border border-[#E5E7EB] shadow-subtle overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAFC] border-b border-[#E5E7EB] text-[#6B7280] font-mono uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">Skill</th>
                  <th className="py-3 px-4">Score</th>
                  <th className="py-3 px-4">Verification Level</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Audit Proof</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {candidate.assessmentHistory.map(item => (
                  <tr key={item.id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-[#0A0A0A]">
                      {item.skillName}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#0A0A0A]">
                      {item.score}%
                    </td>
                    <td className="py-3.5 px-4 font-mono">
                      {item.status === 'Passed' ? (
                        <span className="inline-flex items-center gap-1 text-indigo-700 font-semibold">
                          <Award size={13} />
                          <span>Level 4 — Skill Verified</span>
                        </span>
                      ) : (
                        <span className="text-[#6B7280]">Level 3 — Queued</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-mono text-[11px] ${
                        item.status === 'Passed'
                          ? 'bg-[#10B981]/10 text-[#10B981] font-semibold'
                          : 'bg-amber-500/10 text-amber-700 font-semibold'
                      }`}>
                        {item.status === 'Passed' ? <CheckCircle2 size={11} /> : <Clock size={11} />}
                        <span>{item.status}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#6B7280] font-mono">
                      {item.date}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-[11px]">
                      <button
                        type="button"
                        onClick={() => handleOpenAudit(item.skillName)}
                        className="text-[#635BFF] hover:underline font-semibold cursor-pointer"
                      >
                        Inspect Hash →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Evidence Upload Modal (Resume-Match automated runner) */}
      <EvidenceUploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onViewReport={() => {
          setUploadModalOpen(false);
          setResumeAuditOpen(true);
        }}
      />

      {/* Resume-Match In-Depth Audit Modal */}
      <ResumeMatchAuditModal
        isOpen={resumeAuditOpen}
        onClose={() => setResumeAuditOpen(false)}
      />

      {/* Searchable Claim Skill Dialog */}
      {claimModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-xl rounded-3xl bg-white border border-[#E5E7EB] p-6 shadow-floating space-y-4 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
              <div>
                <h3 className="text-base font-bold text-[#0A0A0A]">
                  Claim a Technical Skill
                </h3>
                <p className="text-xs text-[#6B7280]">
                  Select a standardized skill to add to your profile at Level 1 (Self Claimed).
                </p>
              </div>
              <button
                type="button"
                onClick={() => setClaimModalOpen(false)}
                className="text-[#6B7280] hover:text-[#0A0A0A] p-1 rounded-lg hover:bg-[#F8FAFC] cursor-pointer"
              >
                ✕
              </button>
            </div>

            {claimedSuccess ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#10B981]/10 text-[#10B981] mx-auto flex items-center justify-center">
                  <CheckCircle2 size={28} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#0A0A0A]">Skill added to profile</h4>
                  <p className="text-xs text-[#6B7280] mt-1">
                    {claimedSuccess.name} is now listed. Resume-Match has cross-checked digital evidence.
                  </p>
                </div>
                <div className="flex justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setClaimModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-[#E5E7EB] text-xs font-semibold text-[#0A0A0A] cursor-pointer"
                  >
                    Done
                  </button>
                  <Link
                    href={`/assessment/${claimedSuccess.slug}`}
                    className="px-5 py-2 rounded-xl bg-[#635BFF] hover:bg-[#5346E0] text-white text-xs font-bold shadow-subtle"
                  >
                    Take SkillForge Assessment
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="relative">
                  <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                  <input
                    type="text"
                    value={claimSearch}
                    onChange={e => setClaimSearch(e.target.value)}
                    placeholder="Search 14 standardized skills..."
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-xs text-[#0A0A0A] focus:outline-none focus:border-[#635BFF]"
                  />
                </div>

                <div className="overflow-y-auto flex-1 space-y-2 pr-1 max-h-80">
                  {filteredPresetSkills.map(skill => (
                    <div
                      key={skill.slug}
                      className="p-3.5 rounded-xl border border-[#E5E7EB] hover:border-[#635BFF]/40 hover:bg-[#F8FAFC] transition-all flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-[#0A0A0A]">{skill.name}</span>
                          <span className="px-2 py-0.2 rounded text-[10px] font-mono bg-[#E5E7EB] text-[#6B7280] uppercase">
                            {skill.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#6B7280] mt-0.5">{skill.description}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleClaimSpecificSkill(skill)}
                        className="px-3.5 py-1.5 rounded-lg bg-[#635BFF] hover:bg-[#5346E0] text-white text-xs font-semibold shadow-subtle shrink-0 cursor-pointer"
                      >
                        Claim Skill
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Verify a Skill Modal */}
      {verifyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-3xl bg-white border border-[#E5E7EB] p-6 shadow-floating space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
              <div>
                <h3 className="text-base font-bold text-[#0A0A0A]">
                  Select Skill to Verify
                </h3>
                <p className="text-xs text-[#6B7280]">
                  5-minute practical benchmark evaluating Coding, Debugging, and System Design.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setVerifyModalOpen(false)}
                className="text-[#6B7280] hover:text-[#0A0A0A] p-1 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5">
              <Link
                href="/assessment/react"
                className="flex items-center justify-between p-3.5 rounded-xl border border-[#E5E7EB] hover:border-[#635BFF] hover:bg-[#F8FAFC] transition-all group"
              >
                <div>
                  <p className="text-xs font-bold text-[#0A0A0A] group-hover:text-[#635BFF]">React Micro-Assessment</p>
                  <p className="text-[11px] text-[#6B7280]">5 scenarios • ~5 minutes • Unlocks Level 4/5</p>
                </div>
                <ArrowRight size={14} className="text-[#6B7280] group-hover:text-[#635BFF]" />
              </Link>

              <Link
                href="/assessment/machine-learning"
                className="flex items-center justify-between p-3.5 rounded-xl border border-[#E5E7EB] hover:border-[#635BFF] hover:bg-[#F8FAFC] transition-all group"
              >
                <div>
                  <p className="text-xs font-bold text-[#0A0A0A] group-hover:text-[#635BFF]">Machine Learning Benchmark</p>
                  <p className="text-[11px] text-[#6B7280]">4 scenarios • ~5 minutes • Unlocks Level 4</p>
                </div>
                <ArrowRight size={14} className="text-[#6B7280] group-hover:text-[#635BFF]" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Evidence Audit Modal */}
      <EvidenceAuditModal
        isOpen={!!auditReport}
        onClose={() => setAuditReport(null)}
        report={auditReport}
        onNavigateAssessment={slug => router.push(`/assessment/${slug}`)}
      />
    </DashboardLayout>
  );
}
