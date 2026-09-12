'use client';

import React, { useState } from 'react';
import {
  X,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Layers,
  FileText,
  GitBranch,
  Copy,
  Check,
  Award,
  Globe,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { useSkillForge } from '@/lib/store';
import { VerificationBadge } from './VerificationBadge';

interface ResumeMatchAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeMatchAuditModal({
  isOpen,
  onClose,
}: ResumeMatchAuditModalProps) {
  const { latestResumeMatchReport, candidate } = useSkillForge();
  const [activeTab, setActiveTab] = useState<'metrics' | 'claims' | 'technologies' | 'passport'>('metrics');
  const [copied, setCopied] = useState(false);

  if (!isOpen || !latestResumeMatchReport) return null;

  const handleCopyCard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pythonSkill = candidate.skills.find(s => s.name.toLowerCase() === 'python');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-4xl rounded-3xl bg-white border border-[#E5E7EB] shadow-floating flex flex-col max-h-[92vh] overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-[#E5E7EB] flex items-center justify-between bg-gradient-to-r from-slate-50 via-white to-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#635BFF]/10 text-[#635BFF] flex items-center justify-center border border-[#635BFF]/20 shadow-sm">
              <Sparkles size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-[#0A0A0A]">
                  Resume-Match Skill Evidence Audit
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#635BFF]/10 text-[#635BFF] border border-[#635BFF]/25">
                  Engine v2.0
                </span>
              </div>
              <p className="text-xs text-[#6B7280]">
                Curated technical vocabulary & multi-source evidence extraction from Jaskirat-2004/resume-match.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-[#6B7280] hover:text-[#0A0A0A] p-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E5E7EB] px-6 bg-[#F8FAFC]">
          {[
            { id: 'metrics', label: '5 Core Metrics' },
            { id: 'claims', label: 'Claimed vs. Detected Skills' },
            { id: 'technologies', label: 'Extracted Technologies' },
            { id: 'passport', label: 'Skill Passport Output' },
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3.5 px-4 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[#635BFF] text-[#635BFF] bg-white'
                  : 'border-transparent text-[#6B7280] hover:text-[#0A0A0A]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* TAB 1: 5 CORE METRICS */}
          {activeTab === 'metrics' && (
            <div className="space-y-6">
              {/* 5 Big Score Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {/* Metric 1: Skill Match Score */}
                <div className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-subtle space-y-1 text-center">
                  <span className="text-[10px] font-mono uppercase text-[#6B7280] font-bold block">
                    1. SKILL MATCH
                  </span>
                  <span className="text-3xl font-bold font-mono text-[#635BFF]">
                    {latestResumeMatchReport.skillMatchScore}%
                  </span>
                  <p className="text-[10px] text-[#6B7280]">
                    Claimed skills backed by evidence
                  </p>
                </div>

                {/* Metric 2: Evidence Confidence */}
                <div className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-subtle space-y-1 text-center">
                  <span className="text-[10px] font-mono uppercase text-[#6B7280] font-bold block">
                    2. CONFIDENCE
                  </span>
                  <span className="text-3xl font-bold font-mono text-[#10B981]">
                    {latestResumeMatchReport.overallConfidence}%
                  </span>
                  <p className="text-[10px] text-[#6B7280]">
                    Cross-source recurrence
                  </p>
                </div>

                {/* Metric 3: Technologies Extracted */}
                <div className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-subtle space-y-1 text-center">
                  <span className="text-[10px] font-mono uppercase text-[#6B7280] font-bold block">
                    3. EXTRACTED
                  </span>
                  <span className="text-3xl font-bold font-mono text-[#0A0A0A]">
                    {latestResumeMatchReport.totalDetectedSkills}
                  </span>
                  <p className="text-[10px] text-[#6B7280]">
                    Whitelisted tech tokens
                  </p>
                </div>

                {/* Metric 4: Project Relevance Score */}
                <div className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-subtle space-y-1 text-center">
                  <span className="text-[10px] font-mono uppercase text-[#6B7280] font-bold block">
                    4. RELEVANCE
                  </span>
                  <span className="text-3xl font-bold font-mono text-[#0A0A0A]">
                    {latestResumeMatchReport.projectRelevanceScore}%
                  </span>
                  <p className="text-[10px] text-[#6B7280]">
                    Contextual implementation
                  </p>
                </div>

                {/* Metric 5: Experience Depth Score */}
                <div className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-subtle space-y-1 text-center">
                  <span className="text-[10px] font-mono uppercase text-[#6B7280] font-bold block">
                    5. DEPTH
                  </span>
                  <span className="text-3xl font-bold font-mono text-cyan-600">
                    {latestResumeMatchReport.experienceDepthScore}%
                  </span>
                  <p className="text-[10px] text-[#6B7280]">
                    Frequency & commit depth
                  </p>
                </div>
              </div>

              {/* Summary Banner */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-[#0A0A0A]">
                  <Sparkles size={14} className="text-[#635BFF]" />
                  <span>Resume-Match Engine Summary</span>
                </div>
                <p className="text-[#6B7280] leading-relaxed">
                  {latestResumeMatchReport.summary}
                </p>
              </div>

              {/* Verification Flow Standard */}
              <div className="p-4 rounded-2xl bg-white border border-[#E5E7EB] space-y-3 text-xs">
                <span className="text-[10px] font-mono uppercase font-bold text-[#6B7280] block">
                  5-Level Verification Flow Applied
                </span>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                  <div className="p-2.5 rounded-xl border border-amber-300 bg-amber-50/50">
                    <span className="text-[10px] font-mono font-bold text-amber-800 block">Level 1</span>
                    <strong className="text-xs text-[#0A0A0A]">Self Claimed</strong>
                    <p className="text-[10px] text-[#6B7280] mt-0.5">Manually listed on profile</p>
                  </div>
                  <div className="p-2.5 rounded-xl border border-slate-300 bg-slate-50">
                    <span className="text-[10px] font-mono font-bold text-slate-700 block">Level 2</span>
                    <strong className="text-xs text-[#0A0A0A]">Git Verified</strong>
                    <p className="text-[10px] text-[#6B7280] mt-0.5">GitHub repos analyzed</p>
                  </div>
                  <div className="p-2.5 rounded-xl border border-amber-400 bg-amber-500/10">
                    <span className="text-[10px] font-mono font-bold text-amber-700 block">Level 3</span>
                    <strong className="text-xs text-[#0A0A0A]">Evidence Verified</strong>
                    <p className="text-[10px] text-[#6B7280] mt-0.5">Resume, Repos, Portfolio, Certs</p>
                  </div>
                  <div className="p-2.5 rounded-xl border border-indigo-300 bg-indigo-50">
                    <span className="text-[10px] font-mono font-bold text-indigo-700 block">Level 4</span>
                    <strong className="text-xs text-[#0A0A0A]">Skill Verified</strong>
                    <p className="text-[10px] text-[#6B7280] mt-0.5">SkillForge assessment passed</p>
                  </div>
                  <div className="p-2.5 rounded-xl border border-cyan-300 bg-cyan-50">
                    <span className="text-[10px] font-mono font-bold text-cyan-700 block">Level 5</span>
                    <strong className="text-xs text-[#0A0A0A]">Industry Proven</strong>
                    <p className="text-[10px] text-[#6B7280] mt-0.5">Real-world production / hackathon</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CLAIMED VS DETECTED SKILLS */}
          {activeTab === 'claims' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#0A0A0A]">
                    Claimed vs. Detected Skills Audit
                  </h3>
                  <p className="text-xs text-[#6B7280]">
                    Compares candidate asserted skills against detected digital evidence. Unsupported claims are flagged.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="flex items-center gap-1 text-[#10B981]">
                    <CheckCircle2 size={13} />
                    <span>Supported ({latestResumeMatchReport.claimedVsDetected.filter(c => c.isSupported).length})</span>
                  </span>
                  <span className="text-[#6B7280]">•</span>
                  <span className="flex items-center gap-1 text-amber-600">
                    <AlertCircle size={13} />
                    <span>Unsupported ({latestResumeMatchReport.unsupportedClaims.length})</span>
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-[#E5E7EB] overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F8FAFC] border-b border-[#E5E7EB] text-[#6B7280] font-mono uppercase text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Claimed Skill</th>
                      <th className="py-3 px-4">Evidence Status</th>
                      <th className="py-3 px-4">Verification Level</th>
                      <th className="py-3 px-4">Trust Score</th>
                      <th className="py-3 px-4">Detection Notes / Flag Reason</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB]">
                    {latestResumeMatchReport.claimedVsDetected.map((item, idx) => (
                      <tr key={idx} className="hover:bg-[#F8FAFC] transition-colors">
                        <td className="py-3 px-4 font-bold text-[#0A0A0A]">
                          {item.claimed}
                        </td>
                        <td className="py-3 px-4">
                          {item.isSupported ? (
                            <span className="inline-flex items-center gap-1 text-[#10B981] font-semibold">
                              <CheckCircle2 size={12} />
                              <span>Supported</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full font-bold">
                              <AlertCircle size={12} />
                              <span>Unsupported Claim</span>
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <VerificationBadge
                            level={item.verificationLevel}
                            trustScore={item.trustScore}
                            size="xs"
                            showScore={false}
                          />
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-[#0A0A0A]">
                          {item.trustScore}/100
                        </td>
                        <td className="py-3 px-4 text-[#6B7280] text-[11px]">
                          {item.isSupported ? (
                            <span>Verified in: {item.detectedMatches.join(', ')}</span>
                          ) : (
                            <span className="text-amber-700 font-medium">
                              ⚠️ {item.unsupportedReason}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: EXTRACTED TECHNOLOGIES */}
          {activeTab === 'technologies' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-[#0A0A0A]">
                  Technologies Extracted by Domain
                </h3>
                <p className="text-xs text-[#6B7280]">
                  Whitelisted tokens matched from Resume, GitHub Repos, Portfolio, and Certifications.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(latestResumeMatchReport.technologyExtraction).map(([domain, skills]) => (
                  <div key={domain} className="p-4 rounded-2xl border border-[#E5E7EB] bg-white space-y-2">
                    <span className="text-[10px] font-mono uppercase text-[#6B7280] font-bold block">
                      {domain} ({skills.length})
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.map(skill => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded-md bg-[#F8FAFC] border border-[#E5E7EB] text-xs font-mono font-medium text-[#0A0A0A]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: EXACT SKILL PASSPORT OUTPUT */}
          {activeTab === 'passport' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#0A0A0A]">
                    Standardized Skill Passport Display
                  </h3>
                  <p className="text-xs text-[#6B7280]">
                    Exact display format requested: Skill, Trust Score, Evidence Confidence, Projects Found, Repositories Found, Verification Level.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleCopyCard(`Skill: Python\nTrust Score: 89/100\nEvidence Confidence: 92%\nProjects Found: 6\nRepositories Found: 4\nVerification Level: Level 3 — Evidence Verified`)
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E5E7EB] hover:bg-slate-50 text-xs font-semibold text-[#0A0A0A] transition-colors cursor-pointer"
                >
                  {copied ? <Check size={13} className="text-[#10B981]" /> : <Copy size={13} />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Telemetry'}</span>
                </button>
              </div>

              {/* Exact Python Example Card */}
              <div className="p-6 rounded-3xl border-2 border-amber-400/80 bg-gradient-to-br from-amber-50/40 via-white to-amber-50/20 shadow-subtle space-y-5 max-w-xl mx-auto">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-700 font-bold block mb-1">
                      SKILL PASSPORT CREDENTIAL
                    </span>
                    <h2 className="text-2xl font-bold text-[#0A0A0A]">Python</h2>
                  </div>

                  <VerificationBadge
                    level={3}
                    trustScore={89}
                    size="md"
                    showScore={false}
                  />
                </div>

                {/* Telemetry Block */}
                <div className="space-y-2 p-4 rounded-2xl bg-white border border-[#E5E7EB] font-mono text-xs">
                  <div className="flex justify-between py-1 border-b border-[#E5E7EB]">
                    <span className="text-[#6B7280]">Skill:</span>
                    <strong className="text-[#0A0A0A]">Python</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#E5E7EB]">
                    <span className="text-[#6B7280]">Trust Score:</span>
                    <strong className="text-[#635BFF]">89/100</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#E5E7EB]">
                    <span className="text-[#6B7280]">Evidence Confidence:</span>
                    <strong className="text-[#10B981]">92%</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#E5E7EB]">
                    <span className="text-[#6B7280]">Projects Found:</span>
                    <strong className="text-[#0A0A0A]">6</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#E5E7EB]">
                    <span className="text-[#6B7280]">Repositories Found:</span>
                    <strong className="text-[#0A0A0A]">4</strong>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#6B7280]">Verification Level:</span>
                    <strong className="text-amber-700">Level 3 — Evidence Verified</strong>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#6B7280] font-mono">
                  <span>Audited via Resume-Match Engine</span>
                  <span className="text-[#10B981] font-semibold">✓ Multi-Evidence Backed</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#E5E7EB] bg-[#F8FAFC] flex items-center justify-between text-xs">
          <span className="text-[#6B7280]">
            SkillForge Skill Evidence Engine powered by Jaskirat-2004/resume-match.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close Audit
          </button>
        </div>
      </div>
    </div>
  );
}
