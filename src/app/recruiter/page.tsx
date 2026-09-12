'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  UserPlus,
  Swords,
  ExternalLink,
  Download,
  Building2,
  Sparkles,
  ArrowUpRight,
  FileCheck2,
} from 'lucide-react';
import { useSkillForge } from '@/lib/store';
import { DashboardLayout } from '@/components/DashboardLayout';
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

export default function RecruiterDashboardPage() {
  const { allCandidates, sendTeamInvite, showToast } = useSkillForge();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<string>('all');
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<VerificationLevel | 'all'>('all');
  const [minTrustScore, setMinTrustScore] = useState<number>(70);

  // Modals state
  const [selectedInviteCandidate, setSelectedInviteCandidate] = useState<{ name: string; username: string } | null>(null);
  const [selectedAuditReport, setSelectedAuditReport] = useState<SkillEvidenceReport | null>(null);
  const [simulatorModalOpen, setSimulatorModalOpen] = useState(false);
  const [simulatorSkill, setSimulatorSkill] = useState('Python');

  // Challenge Modal State
  const [challengeCandidate, setChallengeCandidate] = useState<{ name: string; username: string } | null>(null);
  const [challengeSkill, setChallengeSkill] = useState('React');
  const [challengeType, setChallengeType] = useState<'Quick Quiz' | 'Coding Task' | 'Discussion'>('Quick Quiz');
  const [challengeDeadline, setChallengeDeadline] = useState('48 hours');
  const [challengeMessage, setChallengeMessage] = useState('');
  const [challengeSuccess, setChallengeSuccess] = useState(false);

  // Filter candidates
  const filteredCandidates = useMemo(() => {
    return allCandidates.filter(c => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.university.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSkill =
        selectedSkill === 'all' ||
        c.skills.some(s => s.name.toLowerCase() === selectedSkill.toLowerCase());

      const matchesLevel =
        selectedLevelFilter === 'all' ||
        c.skills.some(s => (s.verificationLevel ?? (s.status === 'VERIFIED' ? 4 : 1)) === selectedLevelFilter);

      const matchesTrust = c.overallConfidence >= minTrustScore;

      return matchesSearch && matchesSkill && matchesLevel && matchesTrust;
    });
  }, [allCandidates, searchQuery, selectedSkill, selectedLevelFilter, minTrustScore]);

  const handleSendChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    setChallengeSuccess(true);
    showToast('Challenge sent successfully.');
    setTimeout(() => {
      setChallengeSuccess(false);
      setChallengeCandidate(null);
    }, 1200);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 text-[#0A0A0A] dark:text-slate-100">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E5E7EB] dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <span className="w-8 h-8 rounded-lg bg-[#635BFF] text-white flex items-center justify-center font-bold text-xs">
                <Building2 size={16} />
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#0A0A0A] dark:text-white tracking-tight">
                Recruiter Intelligence
              </h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-mono bg-[#635BFF]/10 text-[#635BFF] border border-[#635BFF]/20 font-semibold">
                Multi-Tier Verification Protocol
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#6B7280] dark:text-slate-400">
              Evaluate verified candidate digital footprints across ResumeMatch, AST analysis, sandboxed coding benchmarks, and team validation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => {
                setSimulatorSkill('Python');
                setSimulatorModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#635BFF] to-indigo-600 hover:from-[#5248E5] hover:to-indigo-700 text-white text-xs font-bold shadow-subtle transition-all cursor-pointer"
            >
              <Sparkles size={13} />
              <span>AI Verification Engine</span>
            </button>

            <button
              type="button"
              onClick={() => showToast('Pipeline export generated in CSV & ATS format.')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-[#F8FAFC] text-[#0A0A0A] dark:text-slate-200 border border-[#E5E7EB] dark:border-slate-700 text-xs font-semibold shadow-subtle transition-all cursor-pointer"
            >
              <Download size={14} className="text-[#6B7280]" />
              <span>Export Pipeline</span>
            </button>
          </div>
        </div>

        {/* Executive Metrics Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 shadow-subtle space-y-1">
            <p className="text-xs font-mono uppercase tracking-wider text-[#6B7280] dark:text-slate-400">Screened Cohort</p>
            <p className="text-3xl font-bold font-mono text-[#0A0A0A] dark:text-white">142</p>
            <p className="text-[11px] text-[#10B981] font-medium">+18 this week</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 shadow-subtle space-y-1">
            <p className="text-xs font-mono uppercase tracking-wider text-[#6B7280] dark:text-slate-400">Avg Time-to-Hire</p>
            <p className="text-3xl font-bold font-mono text-[#635BFF]">4.2d</p>
            <p className="text-[11px] text-[#6B7280]">73% faster than resume screening</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 shadow-subtle space-y-1">
            <p className="text-xs font-mono uppercase tracking-wider text-[#6B7280] dark:text-slate-400">Benchmark Accuracy</p>
            <p className="text-3xl font-bold font-mono text-[#10B981]">98.2%</p>
            <p className="text-[11px] text-[#6B7280]">Calibrated practical correlation</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 shadow-subtle space-y-1">
            <p className="text-xs font-mono uppercase tracking-wider text-[#6B7280] dark:text-slate-400">Verified Pipeline</p>
            <p className="text-3xl font-bold font-mono text-[#0A0A0A] dark:text-white">88%</p>
            <p className="text-[11px] text-[#6B7280]">Level 3+ Semantic/Practical Verified</p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 shadow-subtle flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280]" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by name, role, university..."
              className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 text-xs text-[#0A0A0A] dark:text-white placeholder-[#6B7280] focus:outline-none focus:border-[#635BFF] transition-colors"
            />
          </div>

          {/* Skill & Verification Tier Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto text-xs">
            <div className="flex items-center gap-2">
              <span className="font-medium text-[#6B7280] dark:text-slate-400">Skill:</span>
              <select
                value={selectedSkill}
                onChange={e => setSelectedSkill(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 text-xs text-[#0A0A0A] dark:text-white focus:outline-none focus:border-[#635BFF]"
              >
                <option value="all">All Skills</option>
                <option value="React">React</option>
                <option value="Python">Python</option>
                <option value="Git">Git</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="PyTorch">PyTorch</option>
                <option value="Solidity">Solidity</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-medium text-[#6B7280] dark:text-slate-400">Verification Level:</span>
              <select
                value={selectedLevelFilter}
                onChange={e => setSelectedLevelFilter(e.target.value === 'all' ? 'all' : (Number(e.target.value) as VerificationLevel))}
                className="px-3 py-1.5 rounded-xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 text-xs text-[#0A0A0A] dark:text-white focus:outline-none focus:border-[#635BFF]"
              >
                <option value="all">All Tiers (1–5)</option>
                <option value="5">L5 — Industry Proven (Diamond)</option>
                <option value="4">L4 — Skill Verified (Platinum)</option>
                <option value="3">L3 — Evidence Verified (Gold)</option>
                <option value="2">L2 — Git Verified (Silver)</option>
                <option value="1">L1 — Self Claimed (Bronze)</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-medium text-[#6B7280] dark:text-slate-400">Min Trust:</span>
              <span className="font-mono font-bold text-[#635BFF]">{minTrustScore}%</span>
              <input
                type="range"
                min="40"
                max="95"
                step="5"
                value={minTrustScore}
                onChange={e => setMinTrustScore(Number(e.target.value))}
                className="w-24 accent-[#635BFF]"
              />
            </div>
          </div>
        </div>

        {/* Candidate Table */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 shadow-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAFC] dark:bg-slate-800/60 border-b border-[#E5E7EB] dark:border-slate-800 text-[#6B7280] dark:text-slate-400 font-mono uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">Candidate</th>
                  <th className="py-3 px-4">Overall Trust</th>
                  <th className="py-3 px-4">Verified Competency Badges</th>
                  <th className="py-3 px-4">Audit Proof Graph</th>
                  <th className="py-3 px-4 text-right">Recruitment Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB] dark:divide-slate-800">
                {filteredCandidates.map(c => {
                  return (
                    <tr key={c.id} className="hover:bg-[#F8FAFC] dark:hover:bg-slate-800/40 transition-colors">
                      {/* Candidate Column */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={c.avatar}
                            alt={c.name}
                            className="w-10 h-10 rounded-xl object-cover border border-[#E5E7EB] dark:border-slate-800 bg-[#F8FAFC]"
                          />
                          <div>
                            <Link
                              href={`/passport/${c.username}`}
                              className="font-bold text-[#0A0A0A] dark:text-white hover:text-[#635BFF] transition-colors flex items-center gap-1"
                            >
                              <span>{c.name}</span>
                              <ExternalLink size={11} className="text-[#6B7280]" />
                            </Link>
                            <p className="text-[11px] text-[#6B7280] dark:text-slate-400">{c.role} • {c.university}</p>
                          </div>
                        </div>
                      </td>

                      {/* Trust Score */}
                      <td className="py-3.5 px-4">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#635BFF]/10 border border-[#635BFF]/25 text-[#635BFF] dark:text-indigo-400 font-mono font-bold">
                          <span>{c.overallConfidence}%</span>
                          <span className="text-[10px] opacity-75">Trust</span>
                        </div>
                      </td>

                      {/* Verified Benchmarks with 6-level badges */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1.5">
                          {c.skills.map(s => {
                            const report = getSkillEvidenceReport(s.slug, c.skills);
                            return (
                              <div
                                key={s.id}
                                onClick={() => setSelectedAuditReport(report)}
                                className="cursor-pointer hover:opacity-90 transition-opacity"
                                title={`Click to audit ${s.name} evidence`}
                              >
                                <VerificationBadge
                                  level={report.verificationLevel}
                                  size="xs"
                                  showScore={true}
                                  trustScore={report.trustScore}
                                  showLevelNumber={true}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </td>

                      {/* Verification Audit */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-0.5 text-[11px] font-mono">
                          <span className="text-[#10B981] flex items-center gap-1 font-semibold">
                            <ShieldCheck size={13} />
                            <span>ECDSA Audited</span>
                          </span>
                          <p className="text-[#6B7280] dark:text-slate-400 text-[10px] truncate max-w-[140px]">{c.passportId}</p>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setChallengeCandidate({ name: c.name, username: c.username })}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-[#F8FAFC] border border-[#E5E7EB] dark:border-slate-700 text-[#0A0A0A] dark:text-white text-xs font-semibold shadow-subtle transition-colors cursor-pointer"
                          >
                            <Swords size={12} className="text-[#635BFF]" />
                            <span>Challenge</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setSelectedInviteCandidate({ name: c.name, username: c.username })}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#635BFF] hover:bg-[#5248E5] text-white text-xs font-semibold shadow-subtle transition-colors cursor-pointer"
                          >
                            <UserPlus size={12} />
                            <span>Invite</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Audit Modal */}
      <EvidenceAuditModal
        isOpen={!!selectedAuditReport}
        onClose={() => setSelectedAuditReport(null)}
        report={selectedAuditReport}
      />

      {/* AI Verification Engine Simulator */}
      <AIVerificationSimulatorModal
        isOpen={simulatorModalOpen}
        onClose={() => setSimulatorModalOpen(false)}
        initialSkill={simulatorSkill}
      />

      {/* Team Invite Modal */}
      <InviteToTeamModal
        isOpen={!!selectedInviteCandidate}
        onClose={() => setSelectedInviteCandidate(null)}
        candidateName={selectedInviteCandidate?.name || ''}
        candidateUsername={selectedInviteCandidate?.username || ''}
        initialRole="Software Engineer"
        initialMessage="We audited your SkillForge practical benchmarks and would love to interview you."
      />

      {/* Challenge Modal */}
      {challengeCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 p-6 space-y-4 shadow-floating">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] dark:border-slate-800">
              <h3 className="font-bold text-base text-[#0A0A0A] dark:text-white">
                Dispatch Technical Challenge to {challengeCandidate.name}
              </h3>
              <button
                type="button"
                onClick={() => setChallengeCandidate(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendChallenge} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">Target Skill</label>
                <input
                  type="text"
                  value={challengeSkill}
                  onChange={e => setChallengeSkill(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E5E7EB] dark:border-slate-800 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Challenge Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Quick Quiz', 'Coding Task', 'Discussion'] as const).map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setChallengeType(type)}
                      className={`p-2 rounded-xl border font-semibold ${
                        challengeType === type
                          ? 'border-[#635BFF] bg-[#635BFF]/10 text-[#635BFF]'
                          : 'border-[#E5E7EB] dark:border-slate-800'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#635BFF] hover:bg-[#5248E5] text-white font-bold cursor-pointer"
              >
                Dispatch Challenge (48h Window)
              </button>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
