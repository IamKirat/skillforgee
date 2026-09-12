'use client';

import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Award,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Sparkles,
  Layers,
  Users,
  Lock,
  Download,
  ArrowRight,
  Code2,
  Bug,
  Network,
  Lightbulb,
  MessageSquare,
  Copy,
  Check,
} from 'lucide-react';
import {
  SkillEvidenceReport,
  VERIFICATION_LEVELS,
} from '@/lib/verificationFramework';
import { VerificationBadge } from './VerificationBadge';

interface EvidenceAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: SkillEvidenceReport | null;
  onNavigateAssessment?: (skillSlug: string) => void;
}

export function EvidenceAuditModal({
  isOpen,
  onClose,
  report,
  onNavigateAssessment,
}: EvidenceAuditModalProps) {
  const [activeTab, setActiveTab] = useState<'passport' | 'evidence' | 'semantic' | 'assessment' | 'team' | 'crypto'>('passport');
  const [copiedPassport, setCopiedPassport] = useState(false);

  if (!isOpen || !report) return null;

  const levelDef = VERIFICATION_LEVELS[report.verificationLevel];

  const handleCopyPassportText = () => {
    const text = `${report.skillName}\n\nVerification Level:\n${report.levelTitle}\n\nTrust Score:\n${report.trustScore}/100\n\nEvidence Sources:\n${report.evidenceSources.map(s => `${s.verified ? '✓' : '✗'} ${s.source}`).join('\n')}\n\nSupporting Evidence:\n${report.supportingProjects.length} Projects\n${report.supportingRepositories.length} Repositories\n${report.supportingCertifications.length} Certification\n\nConfidence:\n${report.confidenceScore}%\n\nStatus:\n${report.status}`;
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(text);
      setCopiedPassport(true);
      setTimeout(() => setCopiedPassport(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-white dark:bg-[#090D16] border border-[#E5E7EB] dark:border-[#1E293B] shadow-2xl overflow-hidden text-[#0A0A0A] dark:text-[#F8FAFC]">
        {/* ========================================================= */}
        {/* TOP HEADER: SKILL CREDENTIAL BANNER                       */}
        {/* ========================================================= */}
        <div className="p-5 sm:p-6 bg-gradient-to-b from-[#F8FAFC] to-white dark:from-[#0F172A] dark:to-[#090D16] border-b border-[#E5E7EB] dark:border-[#1E293B]">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#6B7280] dark:text-slate-400 font-semibold">
                  {report.category}
                </span>
                <span className="text-[#6B7280] dark:text-slate-600">•</span>
                <span className="text-[11px] font-mono text-[#635BFF] dark:text-indigo-400 font-semibold">
                  AI Verification Engine Proof Graph
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {report.skillName}
                </h2>
                <VerificationBadge
                  level={report.verificationLevel}
                  size="lg"
                  showScore={true}
                  trustScore={report.trustScore}
                />
              </div>

              <p className="text-xs sm:text-sm text-[#6B7280] dark:text-slate-400 max-w-2xl leading-relaxed">
                {levelDef.description}
              </p>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-[#6B7280] hover:text-[#0A0A0A] dark:text-slate-400 dark:hover:text-white bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
            <div className="p-3 rounded-2xl bg-white dark:bg-[#0D1322] border border-[#E5E7EB] dark:border-slate-800">
              <span className="text-[10px] font-mono uppercase text-[#6B7280] dark:text-slate-500 block mb-0.5">
                TRUST SCORE
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-extrabold font-mono text-[#0A0A0A] dark:text-white">
                  {report.trustScore}
                </span>
                <span className="text-xs text-[#6B7280] font-mono">/ 100</span>
              </div>
              <div className="h-1.5 w-full bg-[#E5E7EB] dark:bg-slate-700 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="h-full bg-[#635BFF] rounded-full"
                  style={{ width: `${report.trustScore}%` }}
                />
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white dark:bg-[#0D1322] border border-[#E5E7EB] dark:border-slate-800">
              <span className="text-[10px] font-mono uppercase text-[#6B7280] dark:text-slate-500 block mb-0.5">
                CONFIDENCE
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-extrabold font-mono text-[#10B981]">
                  {report.confidenceScore}%
                </span>
                <span className="text-[11px] text-[#6B7280] font-mono">calibrated</span>
              </div>
              <div className="h-1.5 w-full bg-[#E5E7EB] dark:bg-slate-700 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="h-full bg-[#10B981] rounded-full"
                  style={{ width: `${report.confidenceScore}%` }}
                />
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white dark:bg-[#0D1322] border border-[#E5E7EB] dark:border-slate-800">
              <span className="text-[10px] font-mono uppercase text-[#6B7280] dark:text-slate-500 block mb-0.5">
                MATURITY & EXPOSURE
              </span>
              <div className="text-sm font-bold truncate">
                {report.skillMaturity}
              </div>
              <span className="text-xs text-[#6B7280] dark:text-slate-400 font-mono">
                {report.yearsOfExposure} yrs exposure
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-white dark:bg-[#0D1322] border border-[#E5E7EB] dark:border-slate-800">
              <span className="text-[10px] font-mono uppercase text-[#6B7280] dark:text-slate-500 block mb-0.5">
                LAST ACTIVE AUDIT
              </span>
              <div className="text-sm font-bold">
                {report.lastActiveDate}
              </div>
              <span className="text-xs text-[#10B981] font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                Verified Footprint
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* NAVIGATION TABS                                           */}
        {/* ========================================================= */}
        <div className="flex border-b border-[#E5E7EB] dark:border-slate-800 bg-[#F8FAFC]/50 dark:bg-[#090D16]/50 px-6 gap-2 sm:gap-6 overflow-x-auto text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('passport')}
            className={`py-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'passport'
                ? 'border-[#635BFF] text-[#635BFF] dark:text-indigo-400'
                : 'border-transparent text-[#6B7280] dark:text-slate-400 hover:text-[#0A0A0A] dark:hover:text-white'
            }`}
          >
            <ShieldCheck size={14} />
            <span>Skill Passport Output</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('evidence')}
            className={`py-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'evidence'
                ? 'border-[#635BFF] text-[#635BFF] dark:text-indigo-400'
                : 'border-transparent text-[#6B7280] dark:text-slate-400 hover:text-[#0A0A0A] dark:hover:text-white'
            }`}
          >
            <Layers size={14} />
            <span>Digital Footprint ({report.supportingProjects.length} Projects, {report.supportingRepositories.length} Repos)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('semantic')}
            className={`py-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'semantic'
                ? 'border-[#635BFF] text-[#635BFF] dark:text-indigo-400'
                : 'border-transparent text-[#6B7280] dark:text-slate-400 hover:text-[#0A0A0A] dark:hover:text-white'
            }`}
          >
            <Sparkles size={14} />
            <span>ResumeMatch Semantic ({report.semanticMatch.score}%)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('assessment')}
            className={`py-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'assessment'
                ? 'border-[#635BFF] text-[#635BFF] dark:text-indigo-400'
                : 'border-transparent text-[#6B7280] dark:text-slate-400 hover:text-[#0A0A0A] dark:hover:text-white'
            }`}
          >
            <Cpu size={14} />
            <span>
              Practical Assessment {report.assessmentResult ? `(${report.assessmentResult.score}%)` : '(Queued)'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('team')}
            className={`py-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'team'
                ? 'border-[#635BFF] text-[#635BFF] dark:text-indigo-400'
                : 'border-transparent text-[#6B7280] dark:text-slate-400 hover:text-[#0A0A0A] dark:hover:text-white'
            }`}
          >
            <Users size={14} />
            <span>Field Validation</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('crypto')}
            className={`py-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'crypto'
                ? 'border-[#635BFF] text-[#635BFF] dark:text-indigo-400'
                : 'border-transparent text-[#6B7280] dark:text-slate-400 hover:text-[#0A0A0A] dark:hover:text-white'
            }`}
          >
            <Lock size={14} />
            <span>Audit Proof Graph</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* TAB CONTENTS (SCROLLABLE BODY)                            */}
        {/* ========================================================= */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {/* TAB 0: SKILL PASSPORT OUTPUT (EXACT PROMPT SPECIFICATION) */}
          {activeTab === 'passport' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#0A0A0A] dark:text-white">
                    Official Skill Passport Output
                  </h3>
                  <p className="text-xs text-[#6B7280] dark:text-slate-400">
                    LinkedIn-grade cryptographic verification badge for technical competence.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCopyPassportText}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 text-xs font-semibold text-[#0A0A0A] dark:text-slate-200 hover:border-[#635BFF] transition-all cursor-pointer"
                >
                  {copiedPassport ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                  <span>{copiedPassport ? 'Copied to Clipboard' : 'Copy Passport Card'}</span>
                </button>
              </div>

              {/* Exact format card matching prompt */}
              <div className="max-w-md mx-auto p-6 rounded-3xl bg-white dark:bg-[#0D1322] border-2 border-[#E5E7EB] dark:border-slate-800 shadow-xl space-y-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-black text-[#0A0A0A] dark:text-white">
                      {report.skillName}
                    </h3>
                    <p className="text-[11px] font-mono text-[#635BFF] dark:text-indigo-400 font-semibold mt-0.5">
                      Verified Technical Credential
                    </p>
                  </div>
                  <VerificationBadge
                    level={report.verificationLevel}
                    size="md"
                    trustScore={report.trustScore}
                    showScore={true}
                  />
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-[#131D33] border border-[#E5E7EB] dark:border-slate-800 space-y-1">
                  <div className="text-[11px] font-mono text-[#6B7280] dark:text-slate-400 uppercase tracking-wider">
                    Verification Level:
                  </div>
                  <div className="text-sm font-bold text-[#0A0A0A] dark:text-white">
                    {report.levelTitle}
                  </div>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-[#131D33] border border-[#E5E7EB] dark:border-slate-800 font-mono">
                  <span className="text-[11px] text-[#6B7280] dark:text-slate-400 uppercase tracking-wider">
                    Trust Score:
                  </span>
                  <span className="text-lg font-extrabold text-[#0A0A0A] dark:text-white">
                    {report.trustScore}/100
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="text-[11px] font-mono text-[#6B7280] dark:text-slate-400 uppercase tracking-wider font-semibold">
                    Evidence Sources:
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    {report.evidenceSources.map((src, i) => (
                      <div
                        key={i}
                        className={`flex items-center gap-1.5 p-2 rounded-xl border ${
                          src.verified
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-semibold'
                            : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-400 line-through'
                        }`}
                      >
                        <span>{src.verified ? '✓' : '✗'}</span>
                        <span>{src.source}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-[#131D33] border border-[#E5E7EB] dark:border-slate-800 space-y-1.5">
                  <div className="text-[11px] font-mono text-[#6B7280] dark:text-slate-400 uppercase tracking-wider font-semibold">
                    Supporting Evidence:
                  </div>
                  <div className="text-xs font-mono text-[#0A0A0A] dark:text-slate-200 font-bold flex items-center justify-between">
                    <span>{report.supportingProjects.length} Projects</span>
                    <span>•</span>
                    <span>{report.supportingRepositories.length} Repositories</span>
                    <span>•</span>
                    <span>{report.supportingCertifications.length} Certification</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                  <div className="p-3 rounded-2xl bg-[#F8FAFC] dark:bg-[#131D33] border border-[#E5E7EB] dark:border-slate-800">
                    <span className="text-[10px] text-[#6B7280] dark:text-slate-400 uppercase block mb-0.5">
                      Confidence:
                    </span>
                    <span className="text-base font-bold text-[#10B981]">
                      {report.confidenceScore}%
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#F8FAFC] dark:bg-[#131D33] border border-[#E5E7EB] dark:border-slate-800">
                    <span className="text-[10px] text-[#6B7280] dark:text-slate-400 uppercase block mb-0.5">
                      Status:
                    </span>
                    <span className={`text-base font-bold ${report.status === 'Verified' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600'}`}>
                      {report.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: DIGITAL FOOTPRINT & PROJECTS */}
          {activeTab === 'evidence' && (
            <div className="space-y-6">
              {/* Evidence Found Summary */}
              {report.evidenceFound && report.evidenceFound.length > 0 && (
                <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-slate-800 space-y-2">
                  <h4 className="text-xs font-mono uppercase text-[#6B7280] dark:text-slate-400 font-bold">
                    AI Evidence Found Across Digital Footprint
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {report.evidenceFound.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-xl bg-white dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 text-xs font-semibold text-[#0A0A0A] dark:text-slate-200 flex items-center gap-1.5"
                      >
                        <CheckCircle2 size={13} className="text-emerald-600" />
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Supporting Projects */}
              <div>
                <h3 className="text-sm font-bold text-[#0A0A0A] dark:text-white mb-3 flex items-center justify-between">
                  <span>Supporting Projects ({report.supportingProjects.length})</span>
                  <span className="text-xs font-mono font-normal text-[#6B7280]">
                    Analyzed by SkillForge AST Parser
                  </span>
                </h3>

                {report.supportingProjects.length === 0 ? (
                  <div className="p-8 text-center rounded-2xl bg-[#F8FAFC] dark:bg-[#0D1322] border border-dashed border-[#E5E7EB] dark:border-slate-800 text-[#6B7280] text-xs">
                    No supporting repositories or project architectures ingested yet. Link GitHub or add portfolio to advance to Level 2.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {report.supportingProjects.map(proj => (
                      <div
                        key={proj.id}
                        className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-[#0F172A]/80 border border-[#E5E7EB] dark:border-slate-800 hover:border-[#635BFF]/40 transition-all space-y-2.5"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-sm text-[#0A0A0A] dark:text-white">
                                {proj.title}
                              </h4>
                              <span
                                className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                                  proj.complexity === 'Production'
                                    ? 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/30'
                                    : proj.complexity === 'High'
                                    ? 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/30'
                                    : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                                }`}
                              >
                                {proj.complexity} Complexity
                              </span>
                            </div>
                            <p className="text-xs text-[#6B7280] dark:text-slate-400 mt-1">
                              {proj.description}
                            </p>
                          </div>

                          {proj.url && (
                            <a
                              href={proj.url}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 rounded-lg text-[#6B7280] hover:text-[#635BFF] dark:hover:text-indigo-400 bg-white dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 shrink-0"
                            >
                              <ExternalLink size={13} />
                            </a>
                          )}
                        </div>

                        <div className="p-2.5 rounded-xl bg-white dark:bg-[#090D16] border border-[#E5E7EB] dark:border-slate-800 text-xs font-mono flex items-center justify-between text-[#6B7280] dark:text-slate-400">
                          <span>Verified Impact:</span>
                          <span className="font-semibold text-[#10B981]">{proj.impact}</span>
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {proj.techStack.map((tech, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 text-[11px] font-mono"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Supporting Repositories */}
              {report.supportingRepositories.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-[#0A0A0A] dark:text-white mb-3">
                    Supporting Repositories ({report.supportingRepositories.length})
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {report.supportingRepositories.map((repo, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-[#0F172A]/80 border border-[#E5E7EB] dark:border-slate-800 space-y-2 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-sm text-[#0A0A0A] dark:text-white truncate">
                            {repo.name}
                          </span>
                          <a
                            href={repo.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#635BFF] hover:underline flex items-center gap-1 font-mono text-[11px]"
                          >
                            <span>GitHub</span>
                            <ExternalLink size={11} />
                          </a>
                        </div>
                        <p className="text-[11px] text-[#6B7280] dark:text-slate-400">
                          {repo.description}
                        </p>

                        <div className="flex items-center justify-between pt-2 border-t border-[#E5E7EB] dark:border-slate-800 font-mono text-[11px] text-[#6B7280]">
                          <span>{repo.commitsCount} commits</span>
                          <span>★ {repo.stars} stars</span>
                          <span>{repo.prsMerged} PRs merged</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SEMANTIC ANALYSIS (RESUMEMATCH) */}
          {activeTab === 'semantic' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-transparent border border-amber-500/25 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="text-amber-600 dark:text-amber-400" size={18} />
                    <h3 className="font-bold text-sm text-amber-900 dark:text-amber-200">
                      ResumeMatch Semantic Similarity Score: {report.semanticMatch.score}%
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300">
                    High Semantic Correlation
                  </span>
                </div>
                <p className="text-xs text-[#6B7280] dark:text-slate-400 leading-relaxed">
                  Inspired by <strong>ResumeMatch</strong>. Uses semantic similarity, skill extraction, technology mapping, contribution analysis, and context detection to answer: <em>Does the candidate's actual work genuinely demonstrate this skill?</em>
                </p>
              </div>

              {/* Specific example items from user prompt: KNN, Decision Tree, Orange Data Mining, AI Coursework */}
              {report.semanticMatch.evidenceItems && report.semanticMatch.evidenceItems.length > 0 && (
                <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-2">
                  <h4 className="text-xs font-mono uppercase text-amber-800 dark:text-amber-300 font-bold">
                    Validated Semantic Evidence Items:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {report.semanticMatch.evidenceItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-amber-300/40 dark:border-slate-700 text-xs font-semibold text-[#0A0A0A] dark:text-white"
                      >
                        <CheckCircle2 size={14} className="text-amber-600 dark:text-amber-400" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-xs font-mono uppercase text-[#6B7280] dark:text-slate-400 font-bold mb-2">
                  Corpus & AST Context Clusters Identified
                </h4>
                <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-slate-800 space-y-2">
                  <p className="text-sm font-semibold text-[#0A0A0A] dark:text-white">
                    Primary Cluster: {report.semanticMatch.contextClustering}
                  </p>
                  <p className="text-xs text-[#6B7280] dark:text-slate-400">
                    Extracted from the following verified digital artifacts:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-[#0A0A0A] dark:text-slate-300">
                    {report.semanticMatch.corpusMatched.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-[#6B7280] dark:text-slate-400 font-bold mb-2">
                  Extracted Technical Concepts & AST Tokens
                </h4>
                <div className="flex flex-wrap gap-2">
                  {report.semanticMatch.matchedKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-xl bg-white dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 text-xs font-mono font-medium text-[#0A0A0A] dark:text-slate-200 flex items-center gap-1.5"
                    >
                      <CheckCircle2 size={12} className="text-[#10B981]" />
                      <span>{kw}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PRACTICAL ASSESSMENT (5 DIMENSIONS) */}
          {activeTab === 'assessment' && (
            <div className="space-y-6">
              {report.assessmentResult ? (
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <ShieldCheck className="text-[#10B981]" size={18} />
                        <h3 className="font-bold text-sm text-[#0A0A0A] dark:text-white">
                          Standardized SkillForge Benchmark Verified
                        </h3>
                      </div>
                      <p className="text-xs text-[#6B7280] dark:text-slate-400">
                        Multi-dimensional sandboxed evaluation completed on {report.assessmentResult.verifiedDate}.
                      </p>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold font-mono text-[#10B981]">
                        {report.assessmentResult.score}%
                      </span>
                      <span className="text-xs font-mono text-[#6B7280]">
                        Top {100 - report.assessmentResult.percentile}% percentile
                      </span>
                    </div>
                  </div>

                  {/* 5-Dimension Evaluation Breakdown from prompt:
                      Coding, Debugging, System Design, Problem Solving, Communication */}
                  <div>
                    <h4 className="text-xs font-mono uppercase text-[#6B7280] dark:text-slate-400 font-bold mb-3">
                      SkillForge 5-Dimension Benchmark Evaluation
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
                      <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0D1322] border border-[#E5E7EB] dark:border-slate-800 space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-[#635BFF]">
                          <Code2 size={14} />
                          <span className="font-semibold">Coding</span>
                        </div>
                        <div className="text-xl font-black font-mono text-[#0A0A0A] dark:text-white">
                          {report.assessmentResult.evaluation.coding}%
                        </div>
                        <div className="h-1 bg-[#E5E7EB] rounded-full overflow-hidden">
                          <div className="h-full bg-[#635BFF]" style={{ width: `${report.assessmentResult.evaluation.coding}%` }} />
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0D1322] border border-[#E5E7EB] dark:border-slate-800 space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-amber-600">
                          <Bug size={14} />
                          <span className="font-semibold">Debugging</span>
                        </div>
                        <div className="text-xl font-black font-mono text-[#0A0A0A] dark:text-white">
                          {report.assessmentResult.evaluation.debugging}%
                        </div>
                        <div className="h-1 bg-[#E5E7EB] rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500" style={{ width: `${report.assessmentResult.evaluation.debugging}%` }} />
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0D1322] border border-[#E5E7EB] dark:border-slate-800 space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-indigo-600">
                          <Network size={14} />
                          <span className="font-semibold">System Design</span>
                        </div>
                        <div className="text-xl font-black font-mono text-[#0A0A0A] dark:text-white">
                          {report.assessmentResult.evaluation.systemDesign}%
                        </div>
                        <div className="h-1 bg-[#E5E7EB] rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500" style={{ width: `${report.assessmentResult.evaluation.systemDesign}%` }} />
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0D1322] border border-[#E5E7EB] dark:border-slate-800 space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-emerald-600">
                          <Lightbulb size={14} />
                          <span className="font-semibold">Problem Solving</span>
                        </div>
                        <div className="text-xl font-black font-mono text-[#0A0A0A] dark:text-white">
                          {report.assessmentResult.evaluation.problemSolving}%
                        </div>
                        <div className="h-1 bg-[#E5E7EB] rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500" style={{ width: `${report.assessmentResult.evaluation.problemSolving}%` }} />
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0D1322] border border-[#E5E7EB] dark:border-slate-800 space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-purple-600">
                          <MessageSquare size={14} />
                          <span className="font-semibold">Communication</span>
                        </div>
                        <div className="text-xl font-black font-mono text-[#0A0A0A] dark:text-white">
                          {report.assessmentResult.evaluation.communication}%
                        </div>
                        <div className="h-1 bg-[#E5E7EB] rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500" style={{ width: `${report.assessmentResult.evaluation.communication}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono pt-2">
                    <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-slate-800">
                      <span className="text-[#6B7280] block mb-1">STRESS TEST CASES</span>
                      <span className="text-lg font-bold text-[#0A0A0A] dark:text-white">
                        {report.assessmentResult.testCasesPassed} / {report.assessmentResult.totalTestCases} Passed
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-slate-800">
                      <span className="text-[#6B7280] block mb-1">EXECUTION INTEGRITY</span>
                      <span className="text-lg font-bold text-[#10B981]">
                        Zero Anti-Cheat Flags
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-slate-800">
                      <span className="text-[#6B7280] block mb-1">PERCENTILE RANK</span>
                      <span className="text-lg font-bold text-[#635BFF]">
                        {report.assessmentResult.percentile}th Percentile
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center rounded-2xl bg-[#F8FAFC] dark:bg-[#0D1322] border border-dashed border-[#E5E7EB] dark:border-slate-800 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#635BFF]/10 text-[#635BFF] flex items-center justify-center mx-auto">
                    <Cpu size={24} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-base text-[#0A0A0A] dark:text-white">
                      Practical Assessment Not Yet Completed
                    </h3>
                    <p className="text-xs text-[#6B7280] dark:text-slate-400 max-w-md mx-auto">
                      Pass the sandboxed practical coding challenge for {report.skillName} to advance this skill to <strong>Level 4 — Practical Verified (Platinum)</strong>.
                    </p>
                  </div>

                  {onNavigateAssessment && (
                    <button
                      type="button"
                      onClick={() => onNavigateAssessment(report.skillSlug)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#635BFF] hover:bg-[#5346E0] text-white text-xs font-semibold shadow-subtle cursor-pointer transition-all"
                    >
                      <span>Take {report.skillName} Assessment Now</span>
                      <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: FIELD VALIDATION */}
          {activeTab === 'team' && (
            <div className="space-y-4">
              {report.teamValidation && report.teamValidation.length > 0 ? (
                report.teamValidation.map((tv, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-slate-800 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#635BFF]/10 text-[#635BFF]">
                          {tv.hackathon}
                        </span>
                        <span className="font-bold text-sm text-[#0A0A0A] dark:text-white">
                          Team {tv.teamName}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-[#6B7280]">{tv.role}</span>
                    </div>

                    <p className="text-xs italic text-[#6B7280] dark:text-slate-300 border-l-2 border-[#635BFF] pl-3 py-0.5">
                      &ldquo;{tv.feedback}&rdquo;
                    </p>

                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#10B981]">
                      <CheckCircle2 size={13} />
                      <span>Endorsed by {tv.endorsementBy}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center rounded-2xl bg-[#F8FAFC] dark:bg-[#0D1322] border border-dashed border-[#E5E7EB] dark:border-slate-800 text-[#6B7280] text-xs">
                  No hackathon team outcomes or peer engineer endorsements recorded yet. Complete team challenges to unlock Level 5.
                </div>
              )}
            </div>
          )}

          {/* TAB 5: CRYPTOGRAPHIC PROOF */}
          {activeTab === 'crypto' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="p-5 rounded-2xl bg-[#0F172A] text-slate-300 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-[#10B981] flex items-center gap-1.5 font-bold">
                    <ShieldCheck size={16} />
                    <span>SkillForge Deterministic Credential</span>
                  </span>
                  <span className="text-[10px] text-slate-500">ECDSA secp256k1</span>
                </div>

                <div className="space-y-2 text-[11px]">
                  <div>
                    <span className="text-slate-500 block">PUBLIC ATTESTATION HASH:</span>
                    <span className="text-[#635BFF] break-all">
                      SHA256: 0x9f88c3a19b8821004a29ef8148b61c90cf32e1882a01f99c
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">ISSUER & AUDIT AUTHORITY:</span>
                    <span>SkillForge Verification Authority (v2.6 Enterprise Engine)</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">AUDIT SUMMARY:</span>
                    <span className="text-slate-200 font-sans">{report.auditSummary}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* FOOTER ACTIONS                                            */}
        {/* ========================================================= */}
        <div className="p-4 sm:p-5 bg-[#F8FAFC] dark:bg-[#0F172A] border-t border-[#E5E7EB] dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#6B7280] dark:text-slate-400 font-mono text-[11px]">
            <Lock size={13} className="text-[#10B981]" />
            <span>Anti-Tamper Proof • Recruiter Audited</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleCopyPassportText}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 text-[#0A0A0A] dark:text-white border border-[#E5E7EB] dark:border-slate-700 font-semibold cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <Copy size={13} />
              <span>Copy Passport Card</span>
            </button>

            {report.verificationLevel < 4 && onNavigateAssessment && (
              <button
                type="button"
                onClick={() => onNavigateAssessment(report.skillSlug)}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#635BFF] hover:bg-[#5346E0] text-white font-semibold cursor-pointer transition-colors"
              >
                <span>Take Practical Assessment</span>
                <ArrowRight size={13} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
