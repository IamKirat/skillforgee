'use client';

import React, { use, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Share2,
  Check,
  Award,
  GraduationCap,
  MapPin,
  Globe,
  QrCode,
  Lock,
  UserPlus,
  ArrowLeft,
  Sparkles,
  Layers,
  FileCheck2,
  Swords,
  Clock,
  AlertCircle,
  Info,
  Calendar,
  Filter,
  Gem,
  Cpu,
  Search,
  UserCheck,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';
import { useSkillForge } from '@/lib/store';
import { InviteToTeamModal } from '@/components/InviteToTeamModal';
import { VerificationBadge } from '@/components/VerificationBadge';
import { EvidenceAuditModal } from '@/components/EvidenceAuditModal';
import { AIVerificationSimulatorModal } from '@/components/AIVerificationSimulatorModal';
import {
  VERIFICATION_LEVELS,
  VerificationLevel,
  getSkillEvidenceReport,
  SkillEvidenceReport,
} from '@/lib/verificationFramework';

interface PageProps {
  params: Promise<{ username: string }>;
}

export default function PassportPage({ params }: PageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const usernameParam = resolvedParams.username.toLowerCase();
  const { allCandidates, candidate: currentCandidate, showToast } = useSkillForge();

  // Find candidate by username or fallback to Alex Morgan for 'alex' or 'alexmorgan'
  const isAlex = usernameParam === 'alex' || usernameParam === 'alexmorgan';
  const profile = isAlex
    ? currentCandidate
    : allCandidates.find(c => c.username.toLowerCase() === usernameParam) || currentCandidate;

  const [copiedLink, setCopiedLink] = useState(false);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [challengeModalOpen, setChallengeModalOpen] = useState(false);
  const [simulatorModalOpen, setSimulatorModalOpen] = useState(false);
  const [simulatorSkill, setSimulatorSkill] = useState('Python');
  const [selectedAuditReport, setSelectedAuditReport] = useState<SkillEvidenceReport | null>(null);
  const [activeLevelFilter, setActiveLevelFilter] = useState<VerificationLevel | 'all'>('all');

  // Challenge state matching exact user requirements
  const [challengeSkill, setChallengeSkill] = useState('React');
  const [challengeType, setChallengeType] = useState<'Quick Quiz' | 'Coding Task' | 'Discussion'>('Quick Quiz');
  const [challengeMessage, setChallengeMessage] = useState('');
  const [challengeDeadline, setChallengeDeadline] = useState<'24 hours' | '48 hours' | '3 days'>('48 hours');
  const [challengeSent, setChallengeSent] = useState(false);

  const handleCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      showToast('Skill Passport link copied to clipboard.');
      setTimeout(() => setCopiedLink(false), 2200);
    }
  };

  const handleSendChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    setChallengeSent(true);
    showToast('Challenge sent successfully.');
    setTimeout(() => {
      setChallengeSent(false);
      setChallengeModalOpen(false);
    }, 1400);
  };

  // Categorize profile skills
  const verifiedSkills = profile.skills.filter(s => s.status === 'VERIFIED');
  const claimedSkills = profile.skills.filter(s => s.status === 'CLAIMED');
  const pendingSkills = profile.skills.filter(s => s.status === 'PENDING');

  return (
    <div className="min-h-[calc(100vh-4rem)] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] text-[#0A0A0A]">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Top Breadcrumbs & Cryptographic Status */}
        <div className="flex items-center justify-between">
          <Link
            href="/discover"
            className="inline-flex items-center gap-1.5 text-xs text-[#6B7280] hover:text-[#0A0A0A] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Builder Discovery</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5E7EB] text-[11px] font-mono text-[#0A0A0A] shadow-subtle">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span>Audited Cryptographic Passport</span>
          </div>
        </div>

        {/* Master Passport Card */}
        <div className="rounded-3xl bg-white border border-[#E5E7EB] shadow-floating p-6 sm:p-10 space-y-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-6 pb-8 border-b border-[#E5E7EB]">
            <div className="flex items-start gap-5">
              <div className="relative shrink-0">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-[#E5E7EB] shadow-subtle bg-[#F8FAFC]"
                />
                <span className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-[#10B981] border-2 border-white flex items-center justify-center text-white" title="Verified Credential Holder">
                  <CheckCircle2 size={13} className="stroke-[3]" />
                </span>
              </div>

              <div className="space-y-2">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#0A0A0A] tracking-tight">
                      {profile.name}
                    </h1>
                    <span className="text-xs font-mono text-[#6B7280]">
                      @{profile.username}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-[#635BFF]">{profile.role}</p>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-[#6B7280]">
                  <span className="flex items-center gap-1">
                    <GraduationCap size={13} className="text-[#6B7280]" />
                    <span>Tech University</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin size={13} className="text-[#6B7280]" />
                    <span>San Francisco, CA</span>
                  </span>
                </div>

                <p className="text-xs text-[#0A0A0A] max-w-lg leading-relaxed pt-1">
                  "{profile.bio}"
                </p>

                {/* Social & Portfolio Links */}
                <div className="flex flex-wrap items-center gap-2.5 pt-2 text-xs">
                  <a
                    href="https://github.com/alexmorgan"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB] text-[#0A0A0A] hover:border-[#635BFF] transition-colors"
                  >
                    <GithubIcon size={13} />
                    <span>github.com/alexmorgan</span>
                  </a>

                  <a
                    href="https://alexmorgan.dev"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB] text-[#0A0A0A] hover:border-[#635BFF] transition-colors"
                  >
                    <Globe size={13} className="text-[#635BFF]" />
                    <span>alexmorgan.dev</span>
                  </a>

                  <a
                    href="https://linkedin.com/in/alexmorgan-dev"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB] text-[#0A0A0A] hover:border-[#635BFF] transition-colors"
                  >
                    <LinkedinIcon size={13} className="text-[#635BFF]" />
                    <span>linkedin.com/in/alexmorgan</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Action Buttons */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-auto shrink-0">
              <button
                type="button"
                onClick={() => {
                  setSimulatorSkill('Python');
                  setSimulatorModalOpen(true);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#635BFF] via-indigo-600 to-purple-600 hover:from-[#5346E0] hover:to-purple-700 text-white text-xs font-bold shadow-subtle hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
              >
                <Sparkles size={14} />
                <span>AI Verification Engine</span>
              </button>

              <button
                type="button"
                onClick={() => setInviteModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#0A0A0A] border border-[#E5E7EB] text-xs font-semibold shadow-subtle hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
              >
                <UserPlus size={14} className="text-[#635BFF]" />
                <span>Invite to Team</span>
              </button>

              <button
                type="button"
                onClick={() => setChallengeModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#0A0A0A] border border-[#E5E7EB] text-xs font-semibold shadow-subtle hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
              >
                <Swords size={14} className="text-[#635BFF]" />
                <span>Send Challenge</span>
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0A0A0A] border border-[#E5E7EB] text-xs font-semibold transition-all cursor-pointer"
              >
                {copiedLink ? <Check size={14} className="text-[#10B981]" /> : <Share2 size={14} />}
                <span>{copiedLink ? 'Link Copied!' : 'Share Passport'}</span>
              </button>
            </div>
          </div>

          {/* Prominent SkillForge Trust Score (Deterministic, Not AI) */}
          <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#635BFF] font-bold flex items-center gap-1.5 mb-1">
                  <Sparkles size={14} />
                  <span>SkillForge Trust Score</span>
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-extrabold font-mono text-[#0A0A0A] tracking-tight">
                    89
                  </span>
                  <span className="text-base text-[#6B7280] font-mono">/ 100</span>
                  <span className="ml-2 px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
                    Top 5% Verified Rank
                  </span>
                </div>
              </div>

              <div className="text-xs text-[#6B7280] max-w-xs leading-relaxed sm:text-right">
                <p className="font-semibold text-[#0A0A0A]">Deterministic Formula</p>
                <p>Based primarily on SkillForge assessments and verified skill evidence.</p>
              </div>
            </div>

            {/* Score weight breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[#E5E7EB] text-xs">
              <div className="p-3 rounded-xl bg-white border border-[#E5E7EB]">
                <div className="flex justify-between font-mono mb-1">
                  <span className="text-[#6B7280]">Practical Benchmarks</span>
                  <span className="font-bold text-[#10B981]">70% Weight</span>
                </div>
                <p className="text-[11px] text-[#6B7280]">Avg 87% across React, Python, Git</p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#E5E7EB]">
                <div className="flex justify-between font-mono mb-1">
                  <span className="text-[#6B7280]">Team Challenges</span>
                  <span className="font-bold text-[#635BFF]">20% Weight</span>
                </div>
                <p className="text-[11px] text-[#6B7280]">2 successful squad validations</p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#E5E7EB]">
                <div className="flex justify-between font-mono mb-1">
                  <span className="text-[#6B7280]">Consistency Score</span>
                  <span className="font-bold text-[#0A0A0A]">10% Weight</span>
                </div>
                <p className="text-[11px] text-[#6B7280]">Zero flagged data leakage</p>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* NEXT-GENERATION 6-LEVEL VERIFICATION FRAMEWORK MATRIX     */}
          {/* ========================================================= */}
          <div className="space-y-4 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#E5E7EB]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#635BFF] animate-pulse" />
                  <h2 className="text-base font-bold text-[#0A0A0A] tracking-tight">
                    SkillForge Multi-Tier Verification Framework
                  </h2>
                </div>
                <p className="text-xs text-[#6B7280] mt-0.5">
                  The LinkedIn verification badge equivalent for technical skills. Measures whether digital footprints genuinely prove claimed competencies.
                </p>
              </div>

              {/* Level Filter Pill */}
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <span className="text-[#6B7280]">Filter:</span>
                <select
                  value={activeLevelFilter}
                  onChange={e => setActiveLevelFilter(e.target.value === 'all' ? 'all' : (Number(e.target.value) as VerificationLevel))}
                  className="px-2.5 py-1 rounded-lg bg-white border border-[#E5E7EB] text-xs font-semibold text-[#0A0A0A] focus:outline-none focus:border-[#635BFF]"
                >
                  <option value="all">All Levels (0–5)</option>
                  <option value="5">Level 5 — Field Proven (Diamond)</option>
                  <option value="4">Level 4 — Practical Verified (Platinum)</option>
                  <option value="3">Level 3 — Semantic Verified (Gold)</option>
                  <option value="2">Level 2 — Evidence Supported (Silver)</option>
                  <option value="1">Level 1 — Profile Claimed (Bronze)</option>
                  <option value="0">Level 0 — Unverified (Gray)</option>
                </select>
              </div>
            </div>

            {/* 6-Level Interactive Matrix Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-xs">
              {([0, 1, 2, 3, 4, 5] as VerificationLevel[]).map(lvl => {
                const def = VERIFICATION_LEVELS[lvl];
                const isSelected = activeLevelFilter === lvl;
                return (
                  <div
                    key={lvl}
                    onClick={() => setActiveLevelFilter(prev => prev === lvl ? 'all' : lvl)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-1.5 ${
                      isSelected
                        ? 'ring-2 ring-[#635BFF] border-[#635BFF] bg-white shadow-subtle'
                        : 'bg-white hover:bg-[#F8FAFC] border-[#E5E7EB]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono font-bold text-[10px] text-[#6B7280]">
                          LEVEL {lvl}
                        </span>
                        <span className="font-mono text-[9px] font-bold px-1.5 py-0.2 rounded-md bg-[#F8FAFC] border border-[#E5E7EB] text-[#6B7280]">
                          {def.trustScoreRange[0]}–{def.trustScoreRange[1]}
                        </span>
                      </div>
                      <p className="font-bold text-[12px] text-[#0A0A0A] leading-tight truncate">
                        {def.badgeName}
                      </p>
                      <p className="text-[10px] text-[#6B7280] line-clamp-2 mt-1 leading-snug">
                        {def.tagline}
                      </p>
                    </div>

                    <div className="pt-1.5 border-t border-[#E5E7EB]/60">
                      <VerificationBadge level={lvl} size="xs" showLevelNumber={false} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ========================================================= */}
          {/* SKILL PASSPORT OUTPUT: VERIFIED SKILL CARDS               */}
          {/* ========================================================= */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-[#0A0A0A] tracking-tight">
                  Skill Passport Output
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#635BFF]/10 text-[#635BFF] border border-[#635BFF]/25">
                  {profile.skills.length} Evaluated Skills
                </span>
              </div>
              <span className="text-xs font-mono text-[#6B7280] hidden sm:inline">
                Click any skill to inspect ATS Evidence Proof Graph
              </span>
            </div>

            {/* Grid of Skill Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {profile.skills
                .map(skill => {
                  const report = getSkillEvidenceReport(skill.slug, profile.skills);
                  return { skill, report };
                })
                .filter(({ report }) => {
                  if (activeLevelFilter === 'all') return true;
                  return report.verificationLevel === activeLevelFilter;
                })
                .map(({ skill, report }) => {
                  const levelDef = VERIFICATION_LEVELS[report.verificationLevel];
                  const isVerified = report.verificationLevel >= 2;

                  return (
                    <div
                      key={skill.id}
                      onClick={() => setSelectedAuditReport(report)}
                      className="p-5 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#635BFF]/60 hover:shadow-card transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
                    >
                      {/* Top Skill Header */}
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <span className="text-[10px] font-mono uppercase text-[#6B7280] font-semibold block mb-0.5">
                              {report.category}
                            </span>
                            <h3 className="text-xl font-extrabold text-[#0A0A0A] group-hover:text-[#635BFF] transition-colors">
                              {report.skillName}
                            </h3>
                          </div>

                          <VerificationBadge
                            level={report.verificationLevel}
                            size="sm"
                            trustScore={report.trustScore}
                            showScore={true}
                          />
                        </div>

                        {/* Exact User-Specified Skill Passport Telemetry Block */}
                        <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] mb-3 text-xs font-mono space-y-1.5">
                          <div className="flex items-center justify-between py-0.5 border-b border-[#E5E7EB]/70">
                            <span className="text-[#6B7280]">Skill:</span>
                            <strong className="text-[#0A0A0A] font-bold">{report.skillName}</strong>
                          </div>
                          <div className="flex items-center justify-between py-0.5 border-b border-[#E5E7EB]/70">
                            <span className="text-[#6B7280]">Trust Score:</span>
                            <strong className="text-[#635BFF] font-bold">{skill.trustScore ?? report.trustScore}/100</strong>
                          </div>
                          <div className="flex items-center justify-between py-0.5 border-b border-[#E5E7EB]/70">
                            <span className="text-[#6B7280]">Evidence Confidence:</span>
                            <strong className="text-[#10B981] font-bold">{skill.evidenceConfidence ?? report.evidenceConfidence ?? report.confidenceScore}%</strong>
                          </div>
                          <div className="flex items-center justify-between py-0.5 border-b border-[#E5E7EB]/70">
                            <span className="text-[#6B7280]">Projects Found:</span>
                            <strong className="text-[#0A0A0A]">{skill.projectsFound ?? report.projectsFound ?? report.supportingProjects.length}</strong>
                          </div>
                          <div className="flex items-center justify-between py-0.5 border-b border-[#E5E7EB]/70">
                            <span className="text-[#6B7280]">Repositories Found:</span>
                            <strong className="text-[#0A0A0A]">{skill.repositoriesFound ?? report.repositoriesFound ?? report.supportingRepositories.length}</strong>
                          </div>
                          <div className="flex items-center justify-between py-0.5">
                            <span className="text-[#6B7280]">Verification Level:</span>
                            <strong className="font-bold text-[#0A0A0A]">
                              {report.levelTitle}
                            </strong>
                          </div>
                        </div>

                        {/* Evidence Sources Checklist */}
                        <div className="space-y-1.5 mb-3">
                          <span className="text-[10px] font-mono uppercase text-[#6B7280] font-semibold block">
                            Evidence Sources:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {report.evidenceSources.slice(0, 4).map((s, idx) => (
                              <span
                                key={idx}
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono ${
                                  s.verified
                                    ? 'bg-[#10B981]/10 text-[#10B981] font-semibold'
                                    : 'bg-slate-100 text-slate-400 line-through'
                                }`}
                              >
                                <span>{s.verified ? '✓' : '✗'}</span>
                                <span>{s.source}</span>
                              </span>
                            ))}
                          </div>
                        </div>

                        {skill.isUnsupported && (
                          <div className="p-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-mono">
                            ⚠️ Unsupported Claim: 0 references in Resume or GitHub.
                          </div>
                        )}
                      </div>

                      {/* Card Bottom Meta & CTA */}
                      <div className="pt-3 border-t border-[#E5E7EB] space-y-2">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-[#6B7280]">Confidence:</span>
                          <span className="font-bold text-[#10B981]">{report.confidenceScore}%</span>
                        </div>

                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-[#6B7280]">Status:</span>
                          <span
                            className={`font-bold ${
                              isVerified ? 'text-[#10B981]' : 'text-amber-700'
                            }`}
                          >
                            {isVerified ? 'Verified' : 'Claimed'}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedAuditReport(report);
                          }}
                          className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#F8FAFC] group-hover:bg-[#635BFF] group-hover:text-white text-[#635BFF] border border-[#E5E7EB] group-hover:border-[#635BFF] text-xs font-semibold transition-all cursor-pointer"
                        >
                          <FileCheck2 size={13} />
                          <span>Inspect Digital Evidence</span>
                          <ArrowLeft size={11} className="rotate-180" />
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Footer Cryptographic Audit Stamp */}
          <div className="pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] font-mono text-[#6B7280]">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-[#10B981]" />
              <span>Signature: 0x991c...de32 (ECDSA Certified)</span>
            </div>
            <span>Passport ID: SF-PASS-8821-A9</span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* EVIDENCE AUDIT MODAL (DEEP PROOF GRAPH)                   */}
      {/* ========================================================= */}
      <EvidenceAuditModal
        isOpen={!!selectedAuditReport}
        onClose={() => setSelectedAuditReport(null)}
        report={selectedAuditReport}
        onNavigateAssessment={(skillSlug) => {
          setSelectedAuditReport(null);
          router.push(`/assessment/${skillSlug}`);
        }}
      />

      {/* AI Verification Engine Simulator Modal */}
      <AIVerificationSimulatorModal
        isOpen={simulatorModalOpen}
        onClose={() => setSimulatorModalOpen(false)}
        initialSkill={simulatorSkill}
      />

      {/* Team Invitation Modal */}
      <InviteToTeamModal
        isOpen={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        candidateName={profile.name}
        candidateUsername={profile.username}
        initialRole="Frontend Developer"
        initialMessage="We're looking for someone strong in React. Your verified profile looks like a good fit."
      />

      {/* ========================================================= */}
      {/* MODAL: SEND OPTIONAL SKILL CHALLENGE                      */}
      {/* ========================================================= */}
      {challengeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg rounded-3xl bg-white border border-[#E5E7EB] p-6 sm:p-7 shadow-floating space-y-5">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#635BFF]/10 text-[#635BFF] flex items-center justify-center">
                  <Swords size={18} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0A0A0A]">
                    Send Optional Skill Challenge
                  </h3>
                  <p className="text-xs text-[#6B7280]">
                    Challenge {profile.name} to demonstrate practical execution.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setChallengeModalOpen(false)}
                className="text-[#6B7280] hover:text-[#0A0A0A] text-sm p-1 rounded-lg hover:bg-[#F8FAFC]"
              >
                ✕
              </button>
            </div>

            {challengeSent ? (
              /* Success Confirmation */
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#10B981]/10 text-[#10B981] mx-auto flex items-center justify-center">
                  <CheckCircle2 size={32} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-bold text-[#0A0A0A]">
                    Challenge sent successfully.
                  </h4>
                  <p className="text-xs text-[#6B7280] max-w-sm mx-auto leading-relaxed">
                    Your <span className="font-semibold text-[#635BFF]">{challengeType}</span> challenge for <span className="font-semibold text-[#0A0A0A]">{challengeSkill}</span> has been dispatched to {profile.name} with a {challengeDeadline} completion window.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setChallengeSent(false);
                    setChallengeModalOpen(false);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#0A0A0A] hover:bg-[#262626] text-white text-xs font-semibold"
                >
                  Done
                </button>
              </div>
            ) : (
              /* Challenge Form */
              <form onSubmit={handleSendChallenge} className="space-y-4 text-xs">
                {/* Mandatory Protocol Explanatory Text */}
                <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] text-[#6B7280] flex items-start gap-2.5 leading-relaxed">
                  <Info size={16} className="text-[#635BFF] shrink-0 mt-0.5" />
                  <p>
                    Challenges provide teams with an additional signal and do not determine SkillForge Verified status.
                  </p>
                </div>

                {/* 1. Skill Dropdown (React, Python, Git) */}
                <div>
                  <label className="block font-semibold text-[#0A0A0A] mb-1.5 font-mono">
                    Skill
                  </label>
                  <select
                    value={challengeSkill}
                    onChange={e => setChallengeSkill(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-xs text-[#0A0A0A] focus:outline-none focus:border-[#635BFF]"
                  >
                    <option value="React">React</option>
                    <option value="Python">Python</option>
                    <option value="Git">Git</option>
                  </select>
                </div>

                {/* 2. Challenge Type (Quick Quiz, Coding Task, Discussion) */}
                <div>
                  <label className="block font-semibold text-[#0A0A0A] mb-1.5 font-mono">
                    Challenge Type
                  </label>
                  <select
                    value={challengeType}
                    onChange={e => setChallengeType(e.target.value as typeof challengeType)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-xs text-[#0A0A0A] focus:outline-none focus:border-[#635BFF]"
                  >
                    <option value="Quick Quiz">Quick Quiz</option>
                    <option value="Coding Task">Coding Task</option>
                    <option value="Discussion">Discussion</option>
                  </select>
                </div>

                {/* 3. Message (optional textarea) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-semibold text-[#0A0A0A] font-mono">
                      Message
                    </label>
                    <span className="text-[#6B7280]">Optional</span>
                  </div>
                  <textarea
                    rows={3}
                    value={challengeMessage}
                    onChange={e => setChallengeMessage(e.target.value)}
                    placeholder="Add optional context, instructions, or repo links for this challenge..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-xs text-[#0A0A0A] placeholder-[#6B7280] focus:outline-none focus:border-[#635BFF] leading-relaxed"
                  />
                </div>

                {/* 4. Deadline (24 hours, 48 hours, 3 days) */}
                <div>
                  <label className="block font-semibold text-[#0A0A0A] mb-1.5 font-mono">
                    Deadline
                  </label>
                  <select
                    value={challengeDeadline}
                    onChange={e => setChallengeDeadline(e.target.value as typeof challengeDeadline)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-xs text-[#0A0A0A] focus:outline-none focus:border-[#635BFF]"
                  >
                    <option value="24 hours">24 hours</option>
                    <option value="48 hours">48 hours</option>
                    <option value="3 days">3 days</option>
                  </select>
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-end gap-2.5 pt-3 border-t border-[#E5E7EB]">
                  <button
                    type="button"
                    onClick={() => setChallengeModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-xs font-semibold text-[#6B7280] hover:text-[#0A0A0A]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#635BFF] hover:bg-[#5346E0] text-xs font-bold text-white shadow-subtle cursor-pointer"
                  >
                    <Swords size={14} />
                    <span>Send Challenge</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
