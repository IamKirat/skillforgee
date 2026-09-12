'use client';

import React, { useState } from 'react';
import {
  X,
  Sparkles,
  ShieldCheck,
  Cpu,
  Layers,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  RefreshCw,
  Sliders,
  FileText,
  GitBranch,
  Users,
  Award,
} from 'lucide-react';
import {
  runAIVerificationEngine,
  SkillEvidenceReport,
  VERIFICATION_LEVELS,
} from '@/lib/verificationFramework';
import { VerificationBadge } from './VerificationBadge';

interface AIVerificationSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSkill?: string;
}

export function AIVerificationSimulatorModal({
  isOpen,
  onClose,
  initialSkill = 'Python',
}: AIVerificationSimulatorModalProps) {
  const [skillName, setSkillName] = useState(initialSkill);
  const [hasResumeClaim, setHasResumeClaim] = useState(true);
  const [githubReposCount, setGithubReposCount] = useState(2);
  const [portfolioProjectsCount, setPortfolioProjectsCount] = useState(3);
  const [publicCommitsCount, setPublicCommitsCount] = useState(96);
  const [certificationsCount, setCertificationsCount] = useState(1);
  const [passedAssessment, setPassedAssessment] = useState(true);
  const [assessmentScore, setAssessmentScore] = useState(88);
  const [hasTeamValidation, setHasTeamValidation] = useState(false);
  const [yearsOfExposure, setYearsOfExposure] = useState(3.8);

  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [report, setReport] = useState<SkillEvidenceReport | null>(() =>
    runAIVerificationEngine({
      skillName: 'Python',
      hasResumeClaim: true,
      resumeEvidenceItems: ['Data Science Project', 'Web Scraper', 'AI Research Internship'],
      githubReposCount: 2,
      portfolioProjectsCount: 3,
      publicCommitsCount: 96,
      certificationsCount: 1,
      passedAssessment: true,
      assessmentScore: 88,
      hasTeamValidation: false,
      yearsOfExposure: 3.8,
    })
  );

  const [copiedCard, setCopiedCard] = useState(false);

  if (!isOpen) return null;

  const handleRunEngine = () => {
    setIsScanning(true);
    setScanStep(1);

    setTimeout(() => setScanStep(2), 350);
    setTimeout(() => setScanStep(3), 700);
    setTimeout(() => setScanStep(4), 1050);
    setTimeout(() => {
      setIsScanning(false);
      setScanStep(0);
      const generated = runAIVerificationEngine({
        skillName,
        hasResumeClaim,
        portfolioProjectsCount,
        githubReposCount,
        publicCommitsCount,
        certificationsCount,
        passedAssessment,
        assessmentScore,
        hasTeamValidation,
        yearsOfExposure,
      });
      setReport(generated);
    }, 1300);
  };

  const handleApplyPreset = (preset: 'python-l4' | 'ml-l3' | 'python-l2' | 'react-l5' | 'node-l1' | 'cloud-l0') => {
    if (preset === 'python-l4') {
      setSkillName('Python');
      setHasResumeClaim(true);
      setPortfolioProjectsCount(3);
      setGithubReposCount(2);
      setPublicCommitsCount(96);
      setCertificationsCount(1);
      setPassedAssessment(true);
      setAssessmentScore(88);
      setHasTeamValidation(false);
      setYearsOfExposure(3.8);
      setReport(
        runAIVerificationEngine({
          skillName: 'Python',
          hasResumeClaim: true,
          resumeEvidenceItems: ['Data Science Project', 'Web Scraper', 'AI Research Internship'],
          portfolioProjectsCount: 3,
          githubReposCount: 2,
          publicCommitsCount: 96,
          certificationsCount: 1,
          passedAssessment: true,
          assessmentScore: 88,
          hasTeamValidation: false,
          yearsOfExposure: 3.8,
        })
      );
    } else if (preset === 'ml-l3') {
      setSkillName('Machine Learning');
      setHasResumeClaim(true);
      setPortfolioProjectsCount(2);
      setGithubReposCount(2);
      setPublicCommitsCount(67);
      setCertificationsCount(1);
      setPassedAssessment(false);
      setAssessmentScore(0);
      setHasTeamValidation(false);
      setYearsOfExposure(2.2);
      setReport(
        runAIVerificationEngine({
          skillName: 'Machine Learning',
          hasResumeClaim: true,
          resumeEvidenceItems: ['KNN Project', 'Decision Tree Project', 'Orange Data Mining', 'AI Coursework'],
          portfolioProjectsCount: 2,
          githubReposCount: 2,
          publicCommitsCount: 67,
          certificationsCount: 1,
          passedAssessment: false,
          hasTeamValidation: false,
          yearsOfExposure: 2.2,
        })
      );
    } else if (preset === 'python-l2') {
      setSkillName('Python');
      setHasResumeClaim(true);
      setPortfolioProjectsCount(1);
      setGithubReposCount(0);
      setPublicCommitsCount(12);
      setCertificationsCount(0);
      setPassedAssessment(false);
      setAssessmentScore(0);
      setHasTeamValidation(false);
      setYearsOfExposure(1.8);
      setReport(
        runAIVerificationEngine({
          skillName: 'Python',
          hasResumeClaim: true,
          resumeEvidenceItems: ['Data Science Project', 'Web Scraper', 'AI Research Internship'],
          portfolioProjectsCount: 1,
          githubReposCount: 0,
          publicCommitsCount: 12,
          certificationsCount: 0,
          passedAssessment: false,
          hasTeamValidation: false,
          yearsOfExposure: 1.8,
        })
      );
    } else if (preset === 'react-l5') {
      setSkillName('React');
      setHasResumeClaim(true);
      setPortfolioProjectsCount(3);
      setGithubReposCount(3);
      setPublicCommitsCount(142);
      setCertificationsCount(1);
      setPassedAssessment(true);
      setAssessmentScore(92);
      setHasTeamValidation(true);
      setYearsOfExposure(4.5);
      setReport(
        runAIVerificationEngine({
          skillName: 'React',
          hasResumeClaim: true,
          resumeEvidenceItems: ['Infinite Grid', 'CRDT Canvas', 'Component Primitives'],
          portfolioProjectsCount: 3,
          githubReposCount: 3,
          publicCommitsCount: 142,
          certificationsCount: 1,
          passedAssessment: true,
          assessmentScore: 92,
          hasTeamValidation: true,
          teamFeedback: 'Endorsed by CodeForge Squad (SkillSprint 2026)',
          yearsOfExposure: 4.5,
        })
      );
    } else if (preset === 'node-l1') {
      setSkillName('Node.js');
      setHasResumeClaim(true);
      setPortfolioProjectsCount(0);
      setGithubReposCount(0);
      setPublicCommitsCount(0);
      setCertificationsCount(0);
      setPassedAssessment(false);
      setAssessmentScore(0);
      setHasTeamValidation(false);
      setYearsOfExposure(1.5);
      setReport(
        runAIVerificationEngine({
          skillName: 'Node.js',
          hasResumeClaim: true,
          portfolioProjectsCount: 0,
          githubReposCount: 0,
          publicCommitsCount: 0,
          certificationsCount: 0,
          passedAssessment: false,
          hasTeamValidation: false,
          yearsOfExposure: 1.5,
        })
      );
    } else if (preset === 'cloud-l0') {
      setSkillName('Cloud Computing (AWS)');
      setHasResumeClaim(false);
      setPortfolioProjectsCount(0);
      setGithubReposCount(0);
      setPublicCommitsCount(0);
      setCertificationsCount(0);
      setPassedAssessment(false);
      setAssessmentScore(0);
      setHasTeamValidation(false);
      setYearsOfExposure(0.5);
      setReport(
        runAIVerificationEngine({
          skillName: 'Cloud Computing (AWS)',
          hasResumeClaim: false,
          portfolioProjectsCount: 0,
          githubReposCount: 0,
          publicCommitsCount: 0,
          certificationsCount: 0,
          passedAssessment: false,
          hasTeamValidation: false,
          yearsOfExposure: 0.5,
        })
      );
    }
  };

  const handleCopyCard = () => {
    if (!report) return;
    const text = `${report.skillName}\n\nVerification Level:\n${report.levelTitle}\n\nTrust Score:\n${report.trustScore}/100\n\nEvidence Sources:\n${report.evidenceSources.map(s => `${s.verified ? '✓' : '✗'} ${s.source}`).join('\n')}\n\nSupporting Evidence:\n${report.supportingProjects.length} Projects\n${report.supportingRepositories.length} Repositories\n${report.supportingCertifications.length} Certification\n\nConfidence:\n${report.confidenceScore}%\n\nStatus:\n${report.status}`;
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(text);
      setCopiedCard(true);
      setTimeout(() => setCopiedCard(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl bg-white dark:bg-[#090D16] border border-[#E5E7EB] dark:border-[#1E293B] shadow-2xl overflow-hidden text-[#0A0A0A] dark:text-[#F8FAFC]">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-b from-[#F8FAFC] to-white dark:from-[#0F172A] dark:to-[#090D16] border-b border-[#E5E7EB] dark:border-[#1E293B] flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#635BFF]/10 text-[#635BFF] border border-[#635BFF]/20 flex items-center gap-1">
                <Sparkles size={11} />
                Live Verification Protocol
              </span>
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                Multi-Tier Trust Calibration
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0A] dark:text-white tracking-tight">
              AI Verification Engine Simulator
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280] dark:text-slate-400">
              Measure not only whether someone claims a skill, but whether evidence across their digital footprint supports that claim.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-[#6B7280] hover:text-[#0A0A0A] dark:text-slate-400 dark:hover:text-white bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Quick Presets Bar */}
        <div className="px-6 py-2.5 bg-[#F8FAFC]/80 dark:bg-[#0D1322] border-b border-[#E5E7EB] dark:border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[#6B7280] font-mono text-[11px] shrink-0 font-semibold uppercase">
            Quick Examples:
          </span>
          <button
            type="button"
            onClick={() => handleApplyPreset('python-l4')}
            className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-indigo-400/40 text-indigo-700 dark:text-indigo-300 font-mono font-bold hover:bg-indigo-50 shrink-0 cursor-pointer"
          >
            L4 Python (Practical Verified)
          </button>
          <button
            type="button"
            onClick={() => handleApplyPreset('ml-l3')}
            className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-amber-400/40 text-amber-700 dark:text-amber-300 font-mono font-bold hover:bg-amber-50 shrink-0 cursor-pointer"
          >
            L3 ML (Semantic 84%)
          </button>
          <button
            type="button"
            onClick={() => handleApplyPreset('python-l2')}
            className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-400/40 text-slate-700 dark:text-slate-300 font-mono font-bold hover:bg-slate-50 shrink-0 cursor-pointer"
          >
            L2 Python (Confidence 68%)
          </button>
          <button
            type="button"
            onClick={() => handleApplyPreset('react-l5')}
            className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-emerald-400/40 text-emerald-700 dark:text-emerald-300 font-mono font-bold hover:bg-emerald-50 shrink-0 cursor-pointer"
          >
            L5 React (Field Proven)
          </button>
          <button
            type="button"
            onClick={() => handleApplyPreset('node-l1')}
            className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-amber-800/40 text-amber-900 dark:text-amber-300 font-mono font-bold hover:bg-amber-950/20 shrink-0 cursor-pointer"
          >
            L1 Node.js (Claimed)
          </button>
          <button
            type="button"
            onClick={() => handleApplyPreset('cloud-l0')}
            className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 text-slate-500 font-mono font-bold hover:bg-slate-100 shrink-0 cursor-pointer"
          >
            L0 Cloud AWS (Unverified)
          </button>
        </div>

        {/* Modal Main Body: Controls on Left, Live Passport Card on Right */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: SIGNAL INPUT CONTROLS (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-slate-800 space-y-4">
              <h3 className="text-xs font-mono uppercase text-[#635BFF] dark:text-indigo-400 font-bold flex items-center gap-1.5">
                <Sliders size={13} />
                <span>Configure Candidate Digital Footprint</span>
              </h3>

              {/* Skill Name */}
              <div>
                <label className="block text-xs font-bold text-[#0A0A0A] dark:text-white mb-1">
                  Target Skill Name
                </label>
                <input
                  type="text"
                  value={skillName}
                  onChange={e => setSkillName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 text-sm font-semibold focus:outline-none focus:border-[#635BFF]"
                  placeholder="e.g. Python, Machine Learning, React"
                />
              </div>

              {/* Toggles Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Resume Claim */}
                <label className="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 cursor-pointer hover:border-[#635BFF]/40">
                  <input
                    type="checkbox"
                    checked={hasResumeClaim}
                    onChange={e => setHasResumeClaim(e.target.checked)}
                    className="w-4 h-4 rounded text-[#635BFF] focus:ring-0"
                  />
                  <div>
                    <span className="font-bold text-[#0A0A0A] dark:text-white block">Resume Claim</span>
                    <span className="text-[10px] text-[#6B7280]">Found in candidate profile or bio</span>
                  </div>
                </label>

                {/* Practical Assessment */}
                <label className="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 cursor-pointer hover:border-[#635BFF]/40">
                  <input
                    type="checkbox"
                    checked={passedAssessment}
                    onChange={e => setPassedAssessment(e.target.checked)}
                    className="w-4 h-4 rounded text-[#635BFF] focus:ring-0"
                  />
                  <div>
                    <span className="font-bold text-[#0A0A0A] dark:text-white block">Practical Assessment</span>
                    <span className="text-[10px] text-[#6B7280]">Passed sandbox benchmark</span>
                  </div>
                </label>

                {/* Team Validation */}
                <label className="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 cursor-pointer hover:border-[#635BFF]/40">
                  <input
                    type="checkbox"
                    checked={hasTeamValidation}
                    onChange={e => setHasTeamValidation(e.target.checked)}
                    className="w-4 h-4 rounded text-[#635BFF] focus:ring-0"
                  />
                  <div>
                    <span className="font-bold text-[#0A0A0A] dark:text-white block">Team Validation</span>
                    <span className="text-[10px] text-[#6B7280]">Hackathon squad peer review</span>
                  </div>
                </label>

                {/* Years Exposure */}
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800">
                  <span className="font-bold text-[#0A0A0A] dark:text-white block mb-1">
                    Years of Exposure: {yearsOfExposure} yrs
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="8"
                    step="0.5"
                    value={yearsOfExposure}
                    onChange={e => setYearsOfExposure(Number(e.target.value))}
                    className="w-full accent-[#635BFF]"
                  />
                </div>
              </div>

              {/* Number Counters */}
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800">
                  <span className="text-[10px] text-[#6B7280] font-mono block">GitHub Repos</span>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={githubReposCount}
                    onChange={e => setGithubReposCount(Number(e.target.value))}
                    className="w-full font-mono font-bold text-lg text-[#0A0A0A] dark:text-white bg-transparent focus:outline-none"
                  />
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800">
                  <span className="text-[10px] text-[#6B7280] font-mono block">Portfolio Projects</span>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={portfolioProjectsCount}
                    onChange={e => setPortfolioProjectsCount(Number(e.target.value))}
                    className="w-full font-mono font-bold text-lg text-[#0A0A0A] dark:text-white bg-transparent focus:outline-none"
                  />
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800">
                  <span className="text-[10px] text-[#6B7280] font-mono block">Assessment Score</span>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={passedAssessment ? assessmentScore : 0}
                    disabled={!passedAssessment}
                    onChange={e => setAssessmentScore(Number(e.target.value))}
                    className="w-full font-mono font-bold text-lg text-[#10B981] bg-transparent focus:outline-none disabled:text-slate-400"
                  />
                </div>
              </div>

              {/* Run Engine Button */}
              <button
                type="button"
                onClick={handleRunEngine}
                disabled={isScanning}
                className="w-full py-3 rounded-xl bg-[#635BFF] hover:bg-[#5248E5] text-white font-bold text-xs shadow-subtle flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
              >
                {isScanning ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    <span>
                      {scanStep === 1 && 'Parsing Resume & ATS Keywords...'}
                      {scanStep === 2 && 'Executing ResumeMatch Semantic Similarity...'}
                      {scanStep === 3 && 'Auditing Code AST & Assessment Telemetry...'}
                      {scanStep === 4 && 'Generating Calibrated Cryptographic Badge...'}
                    </span>
                  </>
                ) : (
                  <>
                    <Sparkles size={14} />
                    <span>Run AI Verification Engine</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* RIGHT: SKILL PASSPORT OUTPUT CARD (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[#6B7280] dark:text-slate-400 font-bold">
                Skill Passport Output
              </span>

              {report && (
                <button
                  type="button"
                  onClick={handleCopyCard}
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-[#635BFF] hover:underline"
                >
                  {copiedCard ? <Check size={11} className="text-emerald-500" /> : <Copy size={11} />}
                  <span>{copiedCard ? 'Copied' : 'Copy'}</span>
                </button>
              )}
            </div>

            {report ? (
              <div className="p-6 rounded-3xl bg-[#F8FAFC] dark:bg-[#0F172A] border-2 border-[#E5E7EB] dark:border-slate-800 shadow-xl space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-black text-[#0A0A0A] dark:text-white">
                      {report.skillName}
                    </h3>
                    <p className="text-[10px] font-mono text-[#635BFF] font-semibold">
                      SkillForge Technical Credential
                    </p>
                  </div>
                  <VerificationBadge
                    level={report.verificationLevel}
                    size="sm"
                    showScore={true}
                    trustScore={report.trustScore}
                  />
                </div>

                <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800">
                  <div className="text-[10px] font-mono text-[#6B7280] dark:text-slate-400 uppercase">
                    Verification Level:
                  </div>
                  <div className="text-xs font-bold text-[#0A0A0A] dark:text-white">
                    {report.levelTitle}
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 font-mono text-xs">
                  <span className="text-[10px] text-[#6B7280] dark:text-slate-400 uppercase">
                    Trust Score:
                  </span>
                  <span className="text-base font-extrabold text-[#0A0A0A] dark:text-white">
                    {report.trustScore}/100
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="text-[10px] font-mono text-[#6B7280] dark:text-slate-400 uppercase font-semibold">
                    Evidence Sources:
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 text-xs font-mono">
                    {report.evidenceSources.map((src, i) => (
                      <div
                        key={i}
                        className={`flex items-center gap-1.5 p-1.5 rounded-lg border text-[11px] ${
                          src.verified
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 text-emerald-800 dark:text-emerald-300 font-semibold'
                            : 'bg-slate-100 dark:bg-slate-800 border-slate-200 text-slate-400 line-through'
                        }`}
                      >
                        <span>{src.verified ? '✓' : '✗'}</span>
                        <span className="truncate">{src.source}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 space-y-1">
                  <div className="text-[10px] font-mono text-[#6B7280] dark:text-slate-400 uppercase font-semibold">
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

                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800">
                    <span className="text-[9px] text-[#6B7280] uppercase block">Confidence:</span>
                    <span className="text-sm font-bold text-[#10B981]">{report.confidenceScore}%</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800">
                    <span className="text-[9px] text-[#6B7280] uppercase block">Status:</span>
                    <span className={`text-sm font-bold ${report.status === 'Verified' ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {report.status}
                    </span>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F8FAFC] dark:bg-[#0F172A] border-t border-[#E5E7EB] dark:border-slate-800 flex items-center justify-between text-xs font-mono">
          <span className="text-[#6B7280]">
            SkillForge Verification Protocol v2.6 • LinkedIn Badge Equivalent
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#0A0A0A] dark:bg-white text-white dark:text-[#0A0A0A] font-bold cursor-pointer"
          >
            Close Simulator
          </button>
        </div>
      </div>
    </div>
  );
}
