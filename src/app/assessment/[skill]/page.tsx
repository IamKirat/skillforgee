'use client';

import React, { use, useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import {
  Play,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ShieldCheck,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronDown,
  Terminal,
  Code2,
  FileCheck2,
  Check,
  X,
  Cpu,
  ArrowRight,
  Eye,
  AlertCircle,
  Copy,
  Layers,
  Wand2,
  Save,
  Lock,
} from 'lucide-react';
import {
  SUPPORTED_LANGUAGES,
  MULTI_LANG_CHALLENGES,
  getChallengeForLanguage,
  LanguageChallenge,
  TestCase,
} from '@/lib/multiLangAssessments';
import { calculateFairnessScores, FairnessScores } from '@/lib/fairnessEngine';
import { executeSandboxedCode, ExecutionResponse, TestResult } from '@/lib/codeExecution';
import { useAntiCheat } from '@/lib/antiCheat';
import { useSkillForge } from '@/lib/store';
import { ThemeToggle } from '@/components/ThemeToggle';

interface PageProps {
  params: Promise<{ skill: string }>;
}

export default function MultiLanguageAssessmentEngine({ params }: PageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const initialSkillSlug = resolvedParams.skill.toLowerCase();
  const { recordAssessmentResult, showToast } = useSkillForge();

  // Active language and challenge
  const [selectedLangSlug, setSelectedLangSlug] = useState<string>(initialSkillSlug);
  const challenge: LanguageChallenge = getChallengeForLanguage(selectedLangSlug);

  // Editor states
  const [userCode, setUserCode] = useState<string>(challenge.starterCode);
  const [hasAutoSaved, setHasAutoSaved] = useState(true);
  const [lastSavedTime, setLastSavedTime] = useState<string>('Just now');
  const [copiedCode, setCopiedCode] = useState(false);

  // Execution & Testing states
  const [activeTab, setActiveTab] = useState<'problem' | 'fairness' | 'submissions' | 'recruiter'>('problem');
  const [consoleTab, setConsoleTab] = useState<'testcases' | 'compiler' | 'logs' | 'custom'>('testcases');
  const [selectedTestCaseIndex, setSelectedTestCaseIndex] = useState(0);
  const [customInput, setCustomInput] = useState('{"key": "test_token_1", "ttl": 5}');
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [executionResult, setExecutionResult] = useState<ExecutionResponse | null>(null);

  // Fairness scores & submission modal
  const [fairnessScores, setFairnessScores] = useState<FairnessScores | null>(null);
  const [showPassportModal, setShowPassportModal] = useState(false);
  const [submissionHistory, setSubmissionHistory] = useState<
    { id: string; time: string; passed: number; total: number; latency: number; status: string }[]
  >([]);

  // Timer: 30 minutes
  const [secondsRemaining, setSecondsRemaining] = useState(30 * 60);
  const [isTimerPaused, setIsTimerPaused] = useState(false);

  // Anti-cheat monitor
  const { tabSwitches, pasteCount, recordPaste, getAuditReport } = useAntiCheat(!showPassportModal);
  const [antiCheatWarning, setAntiCheatWarning] = useState(false);

  // Synchronize challenge when language changes
  useEffect(() => {
    const newChallenge = getChallengeForLanguage(selectedLangSlug);
    setUserCode(newChallenge.starterCode);
    setExecutionResult(null);
    setSelectedTestCaseIndex(0);
  }, [selectedLangSlug]);

  // Tab switch anti-cheat warning
  useEffect(() => {
    if (tabSwitches > 0) {
      setAntiCheatWarning(true);
      const timer = setTimeout(() => setAntiCheatWarning(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [tabSwitches]);

  // Timer countdown
  useEffect(() => {
    if (isTimerPaused || showPassportModal) return;
    const interval = setInterval(() => {
      setSecondsRemaining(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerPaused, showPassportModal]);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  // Code editor change & auto-save
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserCode(e.target.value);
    setHasAutoSaved(false);
  };

  // Auto-save debouncer
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAutoSaved(true);
      setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1200);
    return () => clearTimeout(timer);
  }, [userCode]);

  // Handle Paste detection
  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const text = e.clipboardData.getData('text');
    recordPaste(text.length);
  };

  // Quick fill optimal solution (copilot / demo feature)
  const handleFillSolution = () => {
    setUserCode(challenge.solutionCode);
    showToast('Applied optimal verified solution benchmark.');
  };

  // Reset starter code
  const handleResetCode = () => {
    setUserCode(challenge.starterCode);
    showToast('Reset to initial starter template.');
  };

  // Run Code against public test cases
  const handleRunCode = async () => {
    setIsRunning(true);
    setConsoleTab('testcases');

    const result = await executeSandboxedCode(challenge.slug, userCode, challenge.testCases, false);
    setExecutionResult(result);
    setIsRunning(false);

    if (result.success) {
      showToast('All sample test cases passed.');
    } else {
      showToast('Sample execution finished with errors.');
    }
  };

  // Full Submission against public + hidden test cases
  const handleSubmitSolution = async () => {
    setIsSubmitting(true);
    setConsoleTab('testcases');

    const result = await executeSandboxedCode(challenge.slug, userCode, challenge.testCases, true);
    setExecutionResult(result);

    // Compute language fairness normalization scores
    const scores = calculateFairnessScores({
      languageSlug: challenge.slug,
      code: userCode,
      passedTests: result.passCount,
      totalTests: result.totalCount,
      executionTimeMs: result.totalExecutionTimeMs,
      memoryUsageMb: result.peakMemoryMb,
      tabSwitches,
      pasteEvents: pasteCount,
    });

    setFairnessScores(scores);
    setIsSubmitting(false);

    // Add to submission history
    setSubmissionHistory(prev => [
      {
        id: `sub-${Date.now()}`,
        time: new Date().toLocaleTimeString(),
        passed: result.passCount,
        total: result.totalCount,
        latency: result.totalExecutionTimeMs,
        status: result.allPassed ? 'Accepted' : 'Partial Pass',
      },
      ...prev,
    ]);

    // Record assessment result in global store
    recordAssessmentResult(
      challenge.slug,
      scores.normalizedFinalScore
    );

    // Trigger celebration & open Skill Passport generation modal
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    setShowPassportModal(true);
  };

  // Calculate line numbers
  const lineCount = Math.max(22, userCode.split('\n').length);
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-[#090D16] text-[#0A0A0A] dark:text-[#F8FAFC] min-h-[calc(100vh-4rem)] transition-colors duration-300">
      {/* ========================================================= */}
      {/* 1. TOP BENCHMARK TOOLBAR                                  */}
      {/* ========================================================= */}
      <div className="h-14 px-4 sm:px-6 border-b border-[#E5E7EB] dark:border-[#1E293B] bg-white/90 dark:bg-[#0F172A]/90 backdrop-blur-md flex items-center justify-between gap-4 sticky top-16 z-30">
        {/* Left: Language Selector & Challenge Metadata */}
        <div className="flex items-center gap-3 overflow-x-auto">
          {/* Language Selector Dropdown */}
          <div className="relative flex items-center gap-2">
            <span className="text-[11px] font-mono text-[#6B7280] dark:text-[#94A3B8] uppercase font-bold hidden sm:inline">
              Language:
            </span>
            <select
              value={selectedLangSlug}
              onChange={e => {
                setSelectedLangSlug(e.target.value);
                router.push(`/assessment/${e.target.value}`);
              }}
              className="px-3 py-1.5 rounded-xl border border-[#E5E7EB] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#0A0F1D] text-xs font-bold font-mono text-[#0A0A0A] dark:text-[#F8FAFC] focus:outline-none focus:border-[#635BFF] cursor-pointer shadow-2xs"
            >
              {SUPPORTED_LANGUAGES.map(lang => (
                <option key={lang.id} value={lang.slug}>
                  {lang.name} ({lang.compiler})
                </option>
              ))}
            </select>
          </div>

          <div className="h-4 w-px bg-[#E5E7EB] dark:bg-[#1E293B] hidden md:block" />

          {/* Difficulty & Fairness Factor Pill */}
          <div className="hidden md:flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#635BFF]/10 text-[#635BFF] border border-[#635BFF]/20">
              {challenge.difficulty}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
              Fairness Weight: {challenge.complexityWeight.toFixed(2)}x
            </span>
          </div>
        </div>

        {/* Right: Anti-Cheat Shield, Timer, Theme Toggle, Run & Submit */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Anti-Cheat Live Monitor Pill */}
          <div
            className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-mono font-medium border ${
              tabSwitches === 0
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-400'
                : 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/40 text-amber-700 dark:text-amber-400'
            }`}
            title="Monitors window blur, tab switching, and abnormal bulk pasting"
          >
            <ShieldCheck size={13} />
            <span>Shield: {tabSwitches === 0 ? 'Verified' : `${tabSwitches} Deviations`}</span>
          </div>

          {/* Countdown Timer */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#F8FAFC] dark:bg-[#0A0F1D] border border-[#E5E7EB] dark:border-[#1E293B] text-xs font-mono font-bold text-[#0A0A0A] dark:text-[#F8FAFC]">
            <Clock size={13} className="text-[#635BFF]" />
            <span>{formatTimer(secondsRemaining)}</span>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Run Code Button */}
          <button
            type="button"
            onClick={handleRunCode}
            disabled={isRunning || isSubmitting}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-[#E5E7EB] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#0A0F1D] hover:bg-white dark:hover:bg-[#1E293B] text-xs font-bold text-[#0A0A0A] dark:text-[#F8FAFC] shadow-2xs transition-all cursor-pointer disabled:opacity-50"
            title="Execute code against public test cases (Ctrl + Enter)"
          >
            {isRunning ? (
              <span className="w-3.5 h-3.5 border-2 border-[#635BFF] border-t-transparent rounded-full animate-spin" />
            ) : (
              <Play size={12} className="fill-current text-[#10B981]" />
            )}
            <span className="hidden sm:inline">Run Code</span>
          </button>

          {/* Submit Solution Button */}
          <button
            type="button"
            onClick={handleSubmitSolution}
            disabled={isRunning || isSubmitting}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#635BFF] hover:bg-[#5248E5] text-white text-xs font-bold shadow-sm hover:shadow transition-all cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <CheckCircle2 size={13} />
            )}
            <span>Submit Solution</span>
          </button>
        </div>
      </div>

      {/* Anti-Cheat Alert Banner */}
      {antiCheatWarning && (
        <div className="px-6 py-2 bg-amber-500/10 border-b border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-mono flex items-center justify-between animate-in slide-in-from-top-1">
          <div className="flex items-center gap-2">
            <AlertTriangle size={14} className="text-amber-600 dark:text-amber-400" />
            <span>
              Anti-Cheat Alert: Tab switch detected. Integrity score normalized ({tabSwitches} recorded). Stay on this window during assessment.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setAntiCheatWarning(false)}
            className="text-amber-600 dark:text-amber-400 hover:text-[#0A0A0A] dark:hover:text-white"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. SPLIT INTERFACE: LEFT SPECS / RIGHT CODE EDITOR        */}
      {/* ========================================================= */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* ======================================================= */}
        {/* LEFT PANEL: PROBLEM SPECS & FAIRNESS ENGINE TABS        */}
        {/* ======================================================= */}
        <div className="w-full lg:w-[45%] xl:w-[40%] flex flex-col border-r border-[#E5E7EB] dark:border-[#1E293B] bg-white dark:bg-[#090D16] overflow-y-auto">
          {/* Spec Navigation Tabs */}
          <div className="flex items-center border-b border-[#E5E7EB] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#0F172A] px-3 pt-2 gap-1 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('problem')}
              className={`px-3.5 py-2 rounded-t-xl font-bold transition-colors cursor-pointer border-t border-x ${
                activeTab === 'problem'
                  ? 'bg-white dark:bg-[#090D16] text-[#0A0A0A] dark:text-[#F8FAFC] border-[#E5E7EB] dark:border-[#1E293B] -mb-px'
                  : 'border-transparent text-[#6B7280] dark:text-[#94A3B8] hover:text-[#0A0A0A] dark:hover:text-white'
              }`}
            >
              Problem Specs
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('fairness')}
              className={`px-3.5 py-2 rounded-t-xl font-bold transition-colors cursor-pointer border-t border-x ${
                activeTab === 'fairness'
                  ? 'bg-white dark:bg-[#090D16] text-[#0A0A0A] dark:text-[#F8FAFC] border-[#E5E7EB] dark:border-[#1E293B] -mb-px'
                  : 'border-transparent text-[#6B7280] dark:text-[#94A3B8] hover:text-[#0A0A0A] dark:hover:text-white'
              }`}
            >
              Fairness Engine
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('submissions')}
              className={`px-3.5 py-2 rounded-t-xl font-bold transition-colors cursor-pointer border-t border-x ${
                activeTab === 'submissions'
                  ? 'bg-white dark:bg-[#090D16] text-[#0A0A0A] dark:text-[#F8FAFC] border-[#E5E7EB] dark:border-[#1E293B] -mb-px'
                  : 'border-transparent text-[#6B7280] dark:text-[#94A3B8] hover:text-[#0A0A0A] dark:hover:text-white'
              }`}
            >
              History ({submissionHistory.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('recruiter')}
              className={`px-3.5 py-2 rounded-t-xl font-bold transition-colors cursor-pointer border-t border-x ${
                activeTab === 'recruiter'
                  ? 'bg-white dark:bg-[#090D16] text-[#0A0A0A] dark:text-[#F8FAFC] border-[#E5E7EB] dark:border-[#1E293B] -mb-px'
                  : 'border-transparent text-[#6B7280] dark:text-[#94A3B8] hover:text-[#0A0A0A] dark:hover:text-white'
              }`}
            >
              Recruiter View
            </button>
          </div>

          {/* Tab 1: Problem Description */}
          {activeTab === 'problem' && (
            <div className="p-6 space-y-6 text-sm leading-relaxed">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#635BFF] uppercase tracking-wider">
                    {challenge.category}
                  </span>
                  <span className="text-xs text-[#9CA3AF]">•</span>
                  <span className="text-xs font-mono text-[#6B7280] dark:text-[#94A3B8]">
                    ~{challenge.estimatedMinutes} Mins
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-[#0A0A0A] dark:text-[#F8FAFC] tracking-tight">
                  {challenge.title}
                </h1>
              </div>

              {/* Real World Scenario Callout */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-[#1E293B] space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#635BFF]">
                  <Sparkles size={13} />
                  <span>Real-World Engineering Scenario</span>
                </div>
                <p className="text-xs text-[#4B5563] dark:text-[#94A3B8] leading-relaxed">
                  {challenge.realWorldScenario}
                </p>
              </div>

              {/* Problem Statement */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-[#6B7280] dark:text-[#94A3B8]">
                  Task Description
                </h3>
                <p className="text-xs text-[#374151] dark:text-[#CBD5E1] leading-relaxed">
                  {challenge.description}
                </p>
              </div>

              {/* Learning & Evaluation Objectives */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-[#6B7280] dark:text-[#94A3B8]">
                  Evaluation Benchmarks
                </h3>
                <ul className="space-y-2 text-xs text-[#4B5563] dark:text-[#94A3B8]">
                  {challenge.learningObjectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={13} className="text-[#635BFF] shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Constraints */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-[#6B7280] dark:text-[#94A3B8]">
                  Constraints & Requirements
                </h3>
                <div className="space-y-1.5 font-mono text-xs text-[#374151] dark:text-[#CBD5E1] bg-[#F8FAFC] dark:bg-[#0F172A] p-3.5 rounded-2xl border border-[#E5E7EB] dark:border-[#1E293B]">
                  {challenge.constraints.map((c, i) => (
                    <div key={i} className="flex items-baseline gap-2">
                      <span className="text-[#635BFF]">•</span>
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Language Fairness Engine */}
          {activeTab === 'fairness' && (
            <div className="p-6 space-y-5 text-xs leading-relaxed">
              <div className="space-y-1.5">
                <h2 className="text-lg font-bold text-[#0A0A0A] dark:text-[#F8FAFC]">
                  Multi-Language Fairness Normalization
                </h2>
                <p className="text-[#6B7280] dark:text-[#94A3B8]">
                  SkillForge normalizes scoring across languages so that writing complex systems in Rust or C++ is evaluated fairly against higher-level languages like Python or JavaScript.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono">
                <div className="p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-[#1E293B]">
                  <span className="text-[10px] text-[#6B7280] dark:text-[#94A3B8] block">Selected Language</span>
                  <span className="text-sm font-bold text-[#635BFF]">{challenge.language}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-[#1E293B]">
                  <span className="text-[10px] text-[#6B7280] dark:text-[#94A3B8] block">Complexity Multiplier</span>
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    {challenge.complexityWeight.toFixed(2)}x
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="font-bold text-[#0A0A0A] dark:text-[#F8FAFC] uppercase font-mono text-[11px]">
                  5 Evaluation Dimensions
                </h4>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl border border-[#E5E7EB] dark:border-[#1E293B]">
                    <p className="font-bold text-[#0A0A0A] dark:text-[#F8FAFC]">1. Technical Score</p>
                    <p className="text-[#6B7280] dark:text-[#94A3B8] text-[11px]">
                      Test assertion pass rate normalized by language syntax complexity.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl border border-[#E5E7EB] dark:border-[#1E293B]">
                    <p className="font-bold text-[#0A0A0A] dark:text-[#F8FAFC]">2. Code Quality Score</p>
                    <p className="text-[#6B7280] dark:text-[#94A3B8] text-[11px]">
                      Cyclomatic complexity, modularity, and adherence to language idioms.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl border border-[#E5E7EB] dark:border-[#1E293B]">
                    <p className="font-bold text-[#0A0A0A] dark:text-[#F8FAFC]">3. Problem Solving Score</p>
                    <p className="text-[#6B7280] dark:text-[#94A3B8] text-[11px]">
                      Handling of edge cases, capacity constraints, and memory limits.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl border border-[#E5E7EB] dark:border-[#1E293B]">
                    <p className="font-bold text-[#0A0A0A] dark:text-[#F8FAFC]">4. Language Proficiency Score</p>
                    <p className="text-[#6B7280] dark:text-[#94A3B8] text-[11px]">
                      Use of standard library, memory ordering, and native constructs.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl border border-[#E5E7EB] dark:border-[#1E293B]">
                    <p className="font-bold text-[#0A0A0A] dark:text-[#F8FAFC]">5. Confidence Score</p>
                    <p className="text-[#6B7280] dark:text-[#94A3B8] text-[11px]">
                      Final weighted confidence factoring in anti-cheat behavioral telemetry.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Submissions History */}
          {activeTab === 'submissions' && (
            <div className="p-6 space-y-4 text-xs font-mono">
              <h3 className="font-bold text-[#0A0A0A] dark:text-[#F8FAFC] uppercase text-xs">
                Submission Log
              </h3>
              {submissionHistory.length > 0 ? (
                <div className="space-y-2">
                  {submissionHistory.map((sub, i) => (
                    <div
                      key={sub.id}
                      className="p-3 rounded-xl border border-[#E5E7EB] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#0F172A] flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-bold ${
                              sub.status === 'Accepted' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600'
                            }`}
                          >
                            {sub.status}
                          </span>
                          <span className="text-[#9CA3AF]">#{submissionHistory.length - i}</span>
                        </div>
                        <p className="text-[#6B7280] dark:text-[#94A3B8] text-[11px] mt-0.5">
                          {sub.passed}/{sub.total} tests passed • {sub.latency}ms latency
                        </p>
                      </div>
                      <span className="text-[11px] text-[#9CA3AF]">{sub.time}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-[#9CA3AF] border border-dashed border-[#E5E7EB] dark:border-[#1E293B] rounded-2xl">
                  No submissions recorded yet. Click &quot;Submit Solution&quot; to test your code.
                </div>
              )}
            </div>
          )}

          {/* Tab 4: Recruiter View Preview */}
          {activeTab === 'recruiter' && (
            <div className="p-6 space-y-4 text-xs">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#0A0A0A] dark:text-[#F8FAFC]">
                  Recruiter Audit View
                </h3>
                <p className="text-[#6B7280] dark:text-[#94A3B8]">
                  This is how your verified performance displays to engineering hiring partners.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-[#E5E7EB] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#0F172A] space-y-3 font-mono">
                <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB] dark:border-[#1E293B]">
                  <span className="font-bold text-[#0A0A0A] dark:text-[#F8FAFC]">Alex Morgan</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">Top 5% Tier</span>
                </div>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-[#6B7280] dark:text-[#94A3B8]">Primary Language:</span>
                    <span className="font-bold text-[#0A0A0A] dark:text-[#F8FAFC]">{challenge.language}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280] dark:text-[#94A3B8]">Verified Level:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">Advanced</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280] dark:text-[#94A3B8]">Confidence Score:</span>
                    <span className="font-bold text-[#635BFF]">94%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280] dark:text-[#94A3B8]">Anti-Cheat Audit:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">PASSED (0 Flags)</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ======================================================= */}
        {/* RIGHT PANEL: MONACO-STYLE CODE EDITOR & TEST SUITE      */}
        {/* ======================================================= */}
        <div className="w-full lg:w-[55%] xl:w-[60%] flex flex-col bg-[#F8FAFC] dark:bg-[#0A0F1D] overflow-hidden">
          {/* Editor Header Bar */}
          <div className="h-10 px-4 border-b border-[#E5E7EB] dark:border-[#1E293B] bg-white dark:bg-[#0F172A] flex items-center justify-between gap-3 text-xs">
            {/* File Tab */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-t-lg bg-[#F8FAFC] dark:bg-[#0A0F1D] border-t border-x border-[#E5E7EB] dark:border-[#1E293B] font-mono text-[11px] font-bold text-[#635BFF] flex items-center gap-1.5">
                <Code2 size={13} />
                <span>solution.{challenge.slug === 'rust' ? 'rs' : challenge.slug === 'cpp' ? 'cpp' : challenge.slug === 'javascript' ? 'js' : challenge.slug === 'typescript' ? 'ts' : challenge.slug === 'go' ? 'go' : challenge.slug === 'java' ? 'java' : challenge.slug === 'csharp' ? 'cs' : challenge.slug === 'kotlin' ? 'kt' : challenge.slug === 'swift' ? 'swift' : 'py'}</span>
              </span>
              <span className="text-[10px] text-[#9CA3AF] font-mono hidden sm:inline">
                {hasAutoSaved ? `Auto-saved (${lastSavedTime})` : 'Saving...'}
              </span>
            </div>

            {/* Quick Demo Assist Actions */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleFillSolution}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold bg-[#635BFF]/10 text-[#635BFF] hover:bg-[#635BFF]/20 transition-colors cursor-pointer"
                title="Fill in optimal solution to test full pipeline"
              >
                <Wand2 size={12} />
                <span>Fill Solution</span>
              </button>

              <button
                type="button"
                onClick={handleResetCode}
                className="p-1.5 rounded-lg text-[#6B7280] dark:text-[#94A3B8] hover:text-[#0A0A0A] dark:hover:text-white hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors cursor-pointer"
                title="Reset to starter code"
              >
                <RotateCcw size={13} />
              </button>
            </div>
          </div>

          {/* Code Editor Body */}
          <div className="flex-1 flex overflow-hidden relative font-mono text-xs leading-relaxed bg-[#F8FAFC] dark:bg-[#090D16]">
            {/* Line Numbers Gutter */}
            <div className="w-11 py-4 pr-3 text-right text-[#9CA3AF] select-none border-r border-[#E5E7EB] dark:border-[#1E293B] bg-white/50 dark:bg-[#0F172A]/50 shrink-0 font-mono text-[11px] leading-[1.6]">
              {lineNumbers.map(n => (
                <div key={n}>{n}</div>
              ))}
            </div>

            {/* Code Input Area */}
            <div className="flex-1 relative overflow-auto">
              <textarea
                value={userCode}
                onChange={handleCodeChange}
                onPaste={handlePaste}
                spellCheck={false}
                className="w-full h-full p-4 bg-transparent resize-none focus:outline-none font-mono text-xs sm:text-sm text-[#0A0A0A] dark:text-[#F8FAFC] leading-[1.6] whitespace-pre tab-4"
                style={{ tabSize: 4 }}
              />
            </div>
          </div>

          {/* ======================================================= */}
          {/* BOTTOM PANEL: TEST CASES, EXECUTION LOGS & COMPILER    */}
          {/* ======================================================= */}
          <div className="h-64 border-t border-[#E5E7EB] dark:border-[#1E293B] bg-white dark:bg-[#0F172A] flex flex-col">
            {/* Console Tabs */}
            <div className="h-9 px-4 border-b border-[#E5E7EB] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#0A0F1D] flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setConsoleTab('testcases')}
                  className={`px-3 py-1 rounded-md font-bold font-mono text-xs cursor-pointer ${
                    consoleTab === 'testcases'
                      ? 'bg-white dark:bg-[#1E293B] text-[#635BFF] shadow-2xs'
                      : 'text-[#6B7280] dark:text-[#94A3B8] hover:text-[#0A0A0A] dark:hover:text-white'
                  }`}
                >
                  Test Cases ({challenge.testCases.length})
                </button>

                <button
                  type="button"
                  onClick={() => setConsoleTab('compiler')}
                  className={`px-3 py-1 rounded-md font-bold font-mono text-xs cursor-pointer ${
                    consoleTab === 'compiler'
                      ? 'bg-white dark:bg-[#1E293B] text-[#635BFF] shadow-2xs'
                      : 'text-[#6B7280] dark:text-[#94A3B8] hover:text-[#0A0A0A] dark:hover:text-white'
                  }`}
                >
                  Compiler Output
                </button>

                <button
                  type="button"
                  onClick={() => setConsoleTab('logs')}
                  className={`px-3 py-1 rounded-md font-bold font-mono text-xs cursor-pointer ${
                    consoleTab === 'logs'
                      ? 'bg-white dark:bg-[#1E293B] text-[#635BFF] shadow-2xs'
                      : 'text-[#6B7280] dark:text-[#94A3B8] hover:text-[#0A0A0A] dark:hover:text-white'
                  }`}
                >
                  Runtime Logs
                </button>

                <button
                  type="button"
                  onClick={() => setConsoleTab('custom')}
                  className={`px-3 py-1 rounded-md font-bold font-mono text-xs cursor-pointer ${
                    consoleTab === 'custom'
                      ? 'bg-white dark:bg-[#1E293B] text-[#635BFF] shadow-2xs'
                      : 'text-[#6B7280] dark:text-[#94A3B8] hover:text-[#0A0A0A] dark:hover:text-white'
                  }`}
                >
                  Custom Test
                </button>
              </div>

              {executionResult && (
                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <span
                    className={`font-bold px-2 py-0.5 rounded ${
                      executionResult.allPassed
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
                        : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400'
                    }`}
                  >
                    {executionResult.passCount}/{executionResult.totalCount} Passed
                  </span>
                  <span className="text-[#9CA3AF]">
                    {executionResult.totalExecutionTimeMs}ms • {executionResult.peakMemoryMb.toFixed(1)}MB
                  </span>
                </div>
              )}
            </div>

            {/* Console Content */}
            <div className="flex-1 p-4 overflow-y-auto font-mono text-xs">
              {consoleTab === 'testcases' && (
                <div className="space-y-3">
                  {/* Test case selection chips */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {challenge.testCases.map((tc, idx) => {
                      const res = executionResult?.testResults.find(r => r.testCaseId === tc.id);
                      return (
                        <button
                          key={tc.id}
                          type="button"
                          onClick={() => setSelectedTestCaseIndex(idx)}
                          className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                            selectedTestCaseIndex === idx
                              ? 'bg-[#635BFF] text-white shadow-2xs'
                              : 'bg-[#F1F5F9] dark:bg-[#0A0F1D] text-[#6B7280] dark:text-[#94A3B8] hover:bg-[#E2E8F0]'
                          }`}
                        >
                          {res && (
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                res.status === 'PASSED' ? 'bg-emerald-400' : 'bg-red-400'
                              }`}
                            />
                          )}
                          <span>Case {idx + 1}</span>
                          {!tc.isPublic && <Lock size={10} className="text-amber-300" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected Test Case Inspection */}
                  {challenge.testCases[selectedTestCaseIndex] && (
                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="text-[10px] text-[#9CA3AF] uppercase block">Input:</span>
                        <div className="p-2.5 rounded-xl bg-[#F8FAFC] dark:bg-[#0A0F1D] border border-[#E5E7EB] dark:border-[#1E293B]">
                          {challenge.testCases[selectedTestCaseIndex].input}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-[10px] text-[#9CA3AF] uppercase block">Expected:</span>
                          <div className="p-2 rounded-xl bg-[#F8FAFC] dark:bg-[#0A0F1D] border border-[#E5E7EB] dark:border-[#1E293B] text-emerald-700 dark:text-emerald-400 font-bold">
                            {challenge.testCases[selectedTestCaseIndex].expectedOutput}
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] text-[#9CA3AF] uppercase block">Actual Output:</span>
                          <div className="p-2 rounded-xl bg-[#F8FAFC] dark:bg-[#0A0F1D] border border-[#E5E7EB] dark:border-[#1E293B]">
                            {executionResult?.testResults[selectedTestCaseIndex]?.actualOutput || 'Not evaluated yet. Click Run Code.'}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {consoleTab === 'compiler' && (
                <div className="space-y-1 text-slate-700 dark:text-slate-300">
                  <div className="text-[10px] text-[#9CA3AF] uppercase">Compiler Diagnostic Stream:</div>
                  <pre className="p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#0A0F1D] border border-[#E5E7EB] dark:border-[#1E293B] whitespace-pre-wrap leading-relaxed text-xs">
                    {executionResult?.compilerOutput || `${challenge.language} Compiler ready. Zero errors detected.`}
                  </pre>
                </div>
              )}

              {consoleTab === 'logs' && (
                <div className="space-y-1.5">
                  <div className="text-[10px] text-[#9CA3AF] uppercase">Runtime Execution Container Logs:</div>
                  <div className="space-y-1">
                    {(executionResult?.runtimeLogs || [
                      '[SANDBOX] Secure container initialized.',
                      '[SANDBOX] Ready to execute test cases.',
                    ]).map((log, i) => (
                      <div key={i} className="text-[#6B7280] dark:text-[#94A3B8]">
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {consoleTab === 'custom' && (
                <div className="space-y-2">
                  <div className="text-[10px] text-[#9CA3AF] uppercase">Provide Custom Test Case Arguments:</div>
                  <textarea
                    value={customInput}
                    onChange={e => setCustomInput(e.target.value)}
                    rows={3}
                    className="w-full p-2.5 rounded-xl bg-[#F8FAFC] dark:bg-[#0A0F1D] border border-[#E5E7EB] dark:border-[#1E293B] text-xs focus:outline-none focus:border-[#635BFF]"
                  />
                  <button
                    type="button"
                    onClick={handleRunCode}
                    className="px-3 py-1.5 rounded-xl bg-[#635BFF] text-white font-bold text-xs"
                  >
                    Execute With Custom Input
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. POST-SUBMISSION: SKILL PASSPORT CREDENTIAL MODAL       */}
      {/* ========================================================= */}
      {showPassportModal && fairnessScores && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl rounded-3xl bg-white dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-[#1E293B] p-6 sm:p-8 shadow-floating space-y-6 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#E5E7EB] dark:border-[#1E293B]">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40 flex items-center gap-1.5 w-fit">
                  <ShieldCheck size={13} />
                  Verification Certified • {challenge.language}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0A] dark:text-[#F8FAFC] tracking-tight">
                  SkillForge Verified Passport Generated
                </h2>
                <p className="text-xs text-[#6B7280] dark:text-[#94A3B8]">
                  Assessment results normalized across multi-language fairness parameters.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowPassportModal(false)}
                className="text-[#9CA3AF] hover:text-[#0A0A0A] dark:hover:text-white p-1 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            {/* Credential Card Overview */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] dark:from-[#090D16] dark:to-[#131D33] border border-[#E5E7EB] dark:border-[#1E293B] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#6B7280] dark:text-[#94A3B8] uppercase">
                    Credential Subject
                  </span>
                  <h3 className="text-base font-bold text-[#0A0A0A] dark:text-[#F8FAFC]">Alex Morgan</h3>
                  <p className="text-xs text-[#635BFF] font-semibold font-mono">
                    {challenge.language} — {fairnessScores.verifiedLevel}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                    {fairnessScores.confidenceScore}%
                  </span>
                  <span className="block text-[10px] font-mono text-[#9CA3AF]">Confidence</span>
                </div>
              </div>

              {/* 4 Score Gauges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[#E5E7EB] dark:border-[#1E293B] font-mono text-xs">
                <div className="p-2.5 rounded-xl bg-white dark:bg-[#0A0F1D] border border-[#E5E7EB] dark:border-[#1E293B]">
                  <span className="text-[10px] text-[#6B7280] dark:text-[#94A3B8] block">Technical</span>
                  <span className="font-bold text-[#0A0A0A] dark:text-[#F8FAFC]">{fairnessScores.technicalScore}%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-[#0A0F1D] border border-[#E5E7EB] dark:border-[#1E293B]">
                  <span className="text-[10px] text-[#6B7280] dark:text-[#94A3B8] block">Code Quality</span>
                  <span className="font-bold text-[#0A0A0A] dark:text-[#F8FAFC]">{fairnessScores.codeQualityScore}%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-[#0A0F1D] border border-[#E5E7EB] dark:border-[#1E293B]">
                  <span className="text-[10px] text-[#6B7280] dark:text-[#94A3B8] block">Problem Solving</span>
                  <span className="font-bold text-[#0A0A0A] dark:text-[#F8FAFC]">{fairnessScores.problemSolvingScore}%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-[#0A0F1D] border border-[#E5E7EB] dark:border-[#1E293B]">
                  <span className="text-[10px] text-[#6B7280] dark:text-[#94A3B8] block">Proficiency</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{fairnessScores.languageProficiencyScore}%</span>
                </div>
              </div>

              {/* Strengths & Areas to Improve */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#6B7280] dark:text-[#94A3B8] font-bold block mb-1">
                    Verified Strengths:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {challenge.strengths.map((s, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 text-[11px] font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase text-[#6B7280] dark:text-[#94A3B8] font-bold block mb-1">
                    Areas to Improve:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {challenge.areasToImprove.map((a, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-[#F1F5F9] dark:bg-[#1E293B] text-[#6B7280] dark:text-[#94A3B8] text-[11px] font-medium"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-[#6B7280] dark:text-[#94A3B8] italic">
                {fairnessScores.summaryRationale}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-2.5 pt-2">
              <Link
                href="/passport/alex"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-[#334155] text-xs font-bold text-[#0A0A0A] dark:text-[#F8FAFC] hover:bg-[#F8FAFC] transition-colors"
              >
                <span>View on Public Passport</span>
                <ExternalLink size={13} />
              </Link>

              <Link
                href="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#635BFF] hover:bg-[#5248E5] text-white text-xs font-bold shadow-sm transition-all"
              >
                <span>Return to Dashboard</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
